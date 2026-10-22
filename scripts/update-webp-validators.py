#!/usr/bin/env python3
"""Migrate book-specific image validators from PNG/JPEG assertions to WebP."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
manifest = json.loads((ROOT / "scripts/image-compression-manifest.json").read_text(encoding="utf-8"))
replacements = {
    asset["source"].replace("/", "\\"): asset["file"].replace("/", "\\")
    for asset in manifest["assets"]
}
replacements.update({asset["source"]: asset["file"] for asset in manifest["assets"]})


def main() -> None:
    changed = []
    for filename in sorted((ROOT / "scripts").rglob("validate*.mjs")):
        text = filename.read_text(encoding="utf-8")
        updated = text
        for source, target in replacements.items():
            updated = updated.replace(source, target)

        updated = updated.replace("image/jpeg", "image/webp").replace("image/png", "image/webp")
        updated = re.sub(r"\.endsWith\((['\"])\.jpe?g\1\)", r".endsWith(\1.webp\1)", updated)
        updated = re.sub(r"\.endsWith\((['\"])\.png\1\)", r".endsWith(\1.webp\1)", updated)

        # Preserve the original boundary-check structure while checking WebP's two signatures.
        updated = re.sub(r"([A-Za-z_$][\w$]*)\.subarray\(0\s*,\s*2\)\.toString\('hex'\)", r"\1.toString('ascii',0,4)", updated)
        updated = re.sub(r"([A-Za-z_$][\w$]*)\.subarray\(-2\)\.toString\('hex'\)", r"\1.toString('ascii',8,12)", updated)
        updated = re.sub(r"([A-Za-z_$][\w$]*)\.toString\('hex'\s*,\s*0\s*,\s*2\)", r"\1.toString('ascii',0,4)", updated)
        updated = re.sub(r"([A-Za-z_$][\w$]*)\.toString\('hex'\s*,\s*0\s*,\s*8\)", r"\1.toString('ascii',0,4)", updated)
        updated = updated.replace("'ffd8'", "'RIFF'").replace('"ffd8"', '"RIFF"')
        updated = updated.replace("'ffd9'", "'WEBP'").replace('"ffd9"', '"WEBP"')
        updated = updated.replace("'89504e470d0a1a0a'", "'RIFF'").replace('"89504e470d0a1a0a"', '"RIFF"')

        # WebP stores dimensions in format-specific chunks, handled by the shared parser.
        dimensions_used = bool(re.search(r"\.readUInt32BE\((?:16|20)\)", updated))
        updated = re.sub(r"([A-Za-z_$][\w$]*)\.readUInt32BE\(16\)", r"webpDimensions(\1)[0]", updated)
        updated = re.sub(r"([A-Za-z_$][\w$]*)\.readUInt32BE\(20\)", r"webpDimensions(\1)[1]", updated)
        if dimensions_used and "from '../lib/webp.mjs'" not in updated and "from \"../lib/webp.mjs\"" not in updated:
            updated = "import {webpDimensions} from '../lib/webp.mjs'\n" + updated

        updated = updated.replace("invalid JPEG", "invalid WebP").replace("not JPEG", "not WebP")
        updated = updated.replace("JPEG signature", "WebP signature").replace("corrupt JPEG", "corrupt WebP")
        if updated != text:
            with filename.open("w", encoding="utf-8", newline="\n") as output:
                output.write(updated)
            changed.append(filename.relative_to(ROOT).as_posix())
    print(f"Updated {len(changed)} validators.")
    for filename in changed:
        print(filename)


if __name__ == "__main__":
    main()
