#!/usr/bin/env python3
"""Refresh checked-in art metadata after the deterministic WebP migration."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
COMPRESSION_MANIFEST = ROOT / "scripts" / "image-compression-manifest.json"


def main() -> None:
    manifest = json.loads(COMPRESSION_MANIFEST.read_text(encoding="utf-8"))
    assets = manifest["assets"]
    by_path = {}
    replacements = {}
    for asset in assets:
        by_path[asset["file"].replace("\\", "/")] = asset
        replacements[asset["source"].replace("\\", "/")] = asset["file"].replace("\\", "/")

    changed_files = []
    json_paths = list((ROOT / "scripts").rglob("*.json")) + list((ROOT / "library").rglob("*.json"))
    for json_path in sorted(json_paths):
        if json_path == COMPRESSION_MANIFEST:
            continue
        original = json_path.read_text(encoding="utf-8")
        try:
            data = json.loads(original)
        except json.JSONDecodeError:
            continue
        changed = refresh(data, by_path, replacements)
        if changed:
            with json_path.open("w", encoding="utf-8", newline="\n") as output:
                output.write(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
            changed_files.append(json_path.relative_to(ROOT).as_posix())

    print(f"Updated compressed asset metadata in {len(changed_files)} JSON files.")
    for filename in changed_files:
        print(filename)


def refresh(value, by_path: dict, replacements: dict) -> bool:
    changed = False
    if isinstance(value, list):
        for item in value:
            if refresh(item, by_path, replacements):
                changed = True
        return changed
    if not isinstance(value, dict):
        return False

    for key, child in list(value.items()):
        normalized_key = key.replace("\\", "/")
        if normalized_key in replacements:
            new_key = replacements[normalized_key]
            value[new_key] = value.pop(key)
            key = new_key
            child = value[key]
            normalized_key = new_key
            changed = True
        if normalized_key in by_path and isinstance(child, dict):
            asset = by_path[normalized_key]
            if "sha256" in child and child["sha256"] != asset["sha256"]:
                child["sha256"] = asset["sha256"]
                changed = True
        if isinstance(child, str):
            normalized = child.replace("\\", "/")
            if normalized in replacements:
                value[key] = replacements[normalized]
                changed = True
            elif key in {"path", "finalPath", "masterPath", "newUrl"} and normalized.startswith("library/"):
                webp_path = reextension(normalized)
                if webp_path and (ROOT / webp_path).is_file():
                    value[key] = webp_path
                    changed = True
        elif refresh(child, by_path, replacements):
            changed = True

    local_path = None
    for path_key in ("finalPath", "path", "file"):
        candidate = value.get(path_key)
        if isinstance(candidate, str) and candidate.replace("\\", "/") in by_path:
            local_path = candidate.replace("\\", "/")
            break
    if local_path:
        asset = by_path[local_path]
        updates = {
            "sha256": asset["sha256"],
            "bytes": asset["compressedBytes"],
            "width": asset["width"],
            "height": asset["height"],
        }
        for key, replacement in updates.items():
            if key in value and value[key] != replacement:
                value[key] = replacement
                changed = True
    return changed


def reextension(path: str) -> str | None:
    suffix = Path(path).suffix.lower()
    return str(Path(path).with_suffix(".webp")).replace("\\", "/") if suffix in {".png", ".jpg", ".jpeg"} else None


if __name__ == "__main__":
    main()
