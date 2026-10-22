"""Convert every published local raster image to WebP and update references.

The migration deliberately leaves SVGs and remote URLs unchanged. Run from the
repository root. Existing WebPs are idempotently skipped.
"""

from __future__ import annotations

import base64
import hashlib
import io
import json
import math
import os
from concurrent.futures import ProcessPoolExecutor
from pathlib import Path

from PIL import Image, ImageChops, ImageStat, __version__ as pillow_version, features


ROOT = Path(__file__).resolve().parents[1]
LIBRARY = ROOT / "library"
RASTER_SUFFIXES = {".png", ".jpg", ".jpeg"}
SOURCE_COMMIT = "6dca6b03e8d1b425d657655740bad6033a8f97f2"


def quality_for(path: Path) -> int:
    lowered = "/".join(path.parts).lower()
    return 90 if "/maps/" in f"/{lowered}/" or path.stem.startswith("map-") else 85


def encode_one(source_text: str) -> dict[str, object]:
    source = Path(source_text)
    destination = source.with_suffix(".webp")
    quality = quality_for(source.relative_to(ROOT))
    with Image.open(source) as opened:
        original = opened.convert("RGB")
    while True:
        original.save(destination, "WEBP", quality=quality, method=6, exact=True)
        with Image.open(destination) as encoded:
            decoded = encoded.convert("RGB")
        difference = ImageChops.difference(original, decoded)
        rms = ImageStat.Stat(difference).rms
        mse = sum(value * value for value in rms) / len(rms)
        psnr = 99.0 if mse == 0 else 20 * math.log10(255 / math.sqrt(mse))
        if psnr >= 35 or quality >= 100:
            break
        quality += 1
    if psnr < 35:
        original.save(destination, "WEBP", lossless=True, method=6, exact=True)
        with Image.open(destination) as encoded:
            decoded = encoded.convert("RGB")
        psnr = 99.0
        quality = "lossless"
    result = {
        "source": source.relative_to(ROOT).as_posix(),
        "file": destination.relative_to(ROOT).as_posix(),
        "quality": quality,
        "width": original.width,
        "height": original.height,
        "originalBytes": source.stat().st_size,
        "compressedBytes": destination.stat().st_size,
        "psnrDb": round(psnr, 2),
        "sha256": hashlib.sha256(destination.read_bytes()).hexdigest(),
    }
    return result


def dump_like(path: Path, value: object, original: str) -> None:
    pretty = '\n  "' in original[:500]
    text = json.dumps(value, ensure_ascii=False, indent=2 if pretty else None,
                      separators=None if pretty else (",", ":")) + "\n"
    path.write_text(text, encoding="utf-8", newline="\n")


def update_text_references(replacements: dict[str, str]) -> list[str]:
    changed: list[str] = []
    extensions = {".mjs", ".js", ".json", ".md", ".py", ".ts"}
    for path in ROOT.joinpath("scripts").rglob("*"):
        if not path.is_file() or path.suffix.lower() not in extensions or path.name == "image-compression-manifest.json":
            continue
        text = path.read_text(encoding="utf-8")
        updated = text
        for old, new in replacements.items():
            updated = updated.replace(old, new)
            if old.startswith("library/"):
                relative_old = "/".join(old.split("/")[2:])
                relative_new = "/".join(new.split("/")[2:])
                if f"scripts/{old.split('/')[1]}/" in path.as_posix():
                    updated = updated.replace(relative_old, relative_new)
        if updated != text:
            path.write_text(updated, encoding="utf-8", newline="\n")
            changed.append(path.relative_to(ROOT).as_posix())
    return changed


def compress_embedded_bundle(path: Path) -> list[dict[str, object]]:
    original_text = path.read_text(encoding="utf-8")
    bundle = json.loads(original_text)
    records: list[dict[str, object]] = []
    for blob in bundle.get("blobs", []):
        encoded = blob.get("dataBase64")
        if not encoded or blob.get("mimeType") not in {"image/png", "image/jpeg"}:
            continue
        source_bytes = base64.b64decode(encoded)
        with Image.open(io.BytesIO(source_bytes)) as opened:
            source = opened.convert("RGB")
            output = io.BytesIO()
            source.save(output, "WEBP", quality=85, method=6, exact=True)
        compressed = output.getvalue()
        with Image.open(io.BytesIO(compressed)) as opened:
            decoded = opened.convert("RGB")
        rms = ImageStat.Stat(ImageChops.difference(source, decoded)).rms
        mse = sum(value * value for value in rms) / len(rms)
        psnr = 99.0 if mse == 0 else 20 * math.log10(255 / math.sqrt(mse))
        if psnr < 35:
            raise ValueError(f"{path}:{blob['id']} is below the 35 dB fidelity floor")
        blob["mimeType"] = "image/webp"
        blob["dataBase64"] = base64.b64encode(compressed).decode("ascii")
        records.append({
            "bundle": path.relative_to(ROOT).as_posix(), "blobId": blob["id"],
            "originalBytes": len(source_bytes), "compressedBytes": len(compressed),
            "psnrDb": round(psnr, 2), "sha256": hashlib.sha256(compressed).hexdigest(),
        })
    if records:
        dump_like(path, bundle, original_text)
    return records


def main() -> None:
    sources = sorted(
        path for path in LIBRARY.rglob("*")
        if path.is_file() and path.suffix.lower() in RASTER_SUFFIXES
        and "little-women" not in path.parts
    )
    targets = [path.with_suffix(".webp") for path in sources]
    if len(set(targets)) != len(targets):
        raise ValueError("two source images resolve to the same WebP path")
    print(f"Encoder: Pillow {pillow_version}, libwebp {features.version('webp')}")
    print(f"Encoding {len(sources)} images with {min(16, os.cpu_count() or 1)} workers")
    with ProcessPoolExecutor(max_workers=min(16, os.cpu_count() or 1)) as pool:
        assets = list(pool.map(encode_one, map(str, sources), chunksize=4))

    replacements = {record["source"]: record["file"] for record in assets}
    by_url = dict(replacements)
    changed_worlds: list[str] = []
    for path in sorted(LIBRARY.glob("*.pwk")):
        original = path.read_text(encoding="utf-8")
        world = json.loads(original)
        touched = False
        for blob in world.get("blobs", []):
            old = blob.get("url")
            if old in by_url:
                blob["url"] = by_url[old]
                blob["mimeType"] = "image/webp"
                touched = True
        if touched:
            dump_like(path, world, original)
            changed_worlds.append(path.stem)

    embedded: list[dict[str, object]] = []
    for path in sorted(LIBRARY.glob("*.pwb")):
        original = path.read_text(encoding="utf-8")
        bundle = json.loads(original)
        touched = False
        for blob in bundle.get("blobs", []):
            old = blob.get("url")
            if old in by_url:
                blob["url"] = by_url[old]
                blob["mimeType"] = "image/webp"
                touched = True
        if touched:
            dump_like(path, bundle, original)
        embedded.extend(compress_embedded_bundle(path))

    index_path = LIBRARY / "index.json"
    index_text = index_path.read_text(encoding="utf-8")
    index = json.loads(index_text)
    for entry in index.get("entries", []):
        if entry.get("cover") in by_url:
            entry["cover"] = by_url[entry["cover"]]
    dump_like(index_path, index, index_text)

    changed_scripts = update_text_references(replacements)
    for source in sources:
        source.unlink()

    manifest = {
        "sourceCommit": SOURCE_COMMIT,
        "encoder": {"pillow": pillow_version, "libwebp": features.version("webp")},
        "policy": {"artQuality": 85, "mapQuality": 90, "minimumPsnrDb": 35},
        "worlds": changed_worlds,
        "assets": assets,
        "embeddedAssets": embedded,
        "updatedScriptFiles": changed_scripts,
        "totals": {
            "files": len(assets),
            "originalBytes": sum(int(record["originalBytes"]) for record in assets),
            "compressedBytes": sum(int(record["compressedBytes"]) for record in assets),
            "embeddedFiles": len(embedded),
            "embeddedOriginalBytes": sum(int(record["originalBytes"]) for record in embedded),
            "embeddedCompressedBytes": sum(int(record["compressedBytes"]) for record in embedded),
        },
    }
    (ROOT / "scripts/image-compression-manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n"
    )
    print(json.dumps(manifest["totals"], indent=2))


if __name__ == "__main__":
    main()
