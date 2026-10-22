"""Validate the repository-wide WebP migration and every published image reference."""

from __future__ import annotations

import base64
import hashlib
import io
import json
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
LIBRARY = ROOT / "library"
MANIFEST = json.loads((ROOT / "scripts/image-compression-manifest.json").read_text(encoding="utf-8"))


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def assert_webp(data: bytes, label: str) -> None:
    with Image.open(io.BytesIO(data)) as image:
        if image.format != "WEBP":
            raise AssertionError(f"{label} decodes as {image.format}, not WebP")
        image.load()


def main() -> None:
    legacy = [
        path.relative_to(ROOT).as_posix()
        for path in LIBRARY.rglob("*")
        if path.is_file() and path.suffix.lower() in {".png", ".jpg", ".jpeg"}
    ]
    if legacy:
        raise AssertionError(f"legacy published raster images remain: {legacy[:10]}")

    referenced: set[str] = set()
    for world_path in sorted(LIBRARY.glob("*.pwk")):
        world = json.loads(world_path.read_text(encoding="utf-8"))
        for blob in world.get("blobs", []):
            url = blob.get("url", "")
            if not url.startswith("library/"):
                continue
            path = ROOT / url
            if not path.exists():
                raise AssertionError(f"{world_path.name} references missing {url}")
            if path.suffix.lower() == ".webp" and blob.get("mimeType") != "image/webp":
                raise AssertionError(f"{world_path.name} has stale MIME type for {url}")
            if path.suffix.lower() == ".webp":
                assert_webp(path.read_bytes(), url)
            referenced.add(url)

    manifest_files = {record["file"]: record for record in MANIFEST["assets"]}
    for relative, record in manifest_files.items():
        path = ROOT / relative
        data = path.read_bytes()
        if digest(data) != record["sha256"]:
            raise AssertionError(f"manifest hash drift: {relative}")
        if len(data) != record["compressedBytes"]:
            raise AssertionError(f"manifest byte drift: {relative}")
        if record["psnrDb"] < MANIFEST["policy"]["minimumPsnrDb"]:
            raise AssertionError(f"fidelity floor violated: {relative}")

    embedded_count = 0
    embedded_by_key = {
        (record["bundle"], record["blobId"]): record for record in MANIFEST["embeddedAssets"]
    }
    for bundle_path in sorted(LIBRARY.glob("*.pwb")):
        bundle = json.loads(bundle_path.read_text(encoding="utf-8"))
        for blob in bundle.get("blobs", []):
            encoded = blob.get("dataBase64")
            if not encoded:
                continue
            data = base64.b64decode(encoded)
            assert_webp(data, f"{bundle_path.name}:{blob['id']}")
            if blob.get("mimeType") != "image/webp":
                raise AssertionError(f"stale embedded MIME type: {bundle_path.name}:{blob['id']}")
            record = embedded_by_key[(bundle_path.relative_to(ROOT).as_posix(), blob["id"])]
            if digest(data) != record["sha256"] or len(data) != record["compressedBytes"]:
                raise AssertionError(f"embedded manifest drift: {bundle_path.name}:{blob['id']}")
            embedded_count += 1

    totals = MANIFEST["totals"]
    compressed = sum(int(record["compressedBytes"]) for record in manifest_files.values())
    if compressed != totals["compressedBytes"]:
        raise AssertionError("manifest compressed total drift")
    reduction = (1 - compressed / totals["originalBytes"]) * 100
    print(
        f"Library images PASS: {len(manifest_files)} linked files and {embedded_count} embedded files; "
        f"{totals['originalBytes']} -> {compressed} bytes ({reduction:.1f}% smaller); "
        f"{len(referenced)} distinct local URLs decode; PSNR >= {MANIFEST['policy']['minimumPsnrDb']} dB."
    )


if __name__ == "__main__":
    main()
