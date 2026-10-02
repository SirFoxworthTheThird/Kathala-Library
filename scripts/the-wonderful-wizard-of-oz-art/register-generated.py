"""Copy a reviewed built-in imagegen PNG to its manifest slot."""

import json
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MANIFEST = Path(__file__).with_name("manifest.json")
number = int(sys.argv[1])
source = Path(sys.argv[2])
data = json.loads(MANIFEST.read_text(encoding="utf-8"))
slot = data["slots"][number - 1]
if slot["number"] != number or slot["status"] != "pending":
    raise SystemExit(f"Slot {number} is unavailable")
target = (ROOT / slot["path"]).with_suffix(".png")
target.parent.mkdir(parents=True, exist_ok=True)
shutil.copy2(source, target)
slot["masterPath"] = target.relative_to(ROOT).as_posix()
slot["status"] = "generated_png"
MANIFEST.write_bytes((json.dumps(data, ensure_ascii=False, indent=2) + "\n").encode("utf-8"))
print(target)
