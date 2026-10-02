"""Inventory every visible Monte Cristo illustration slot before replacing art."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PWK = ROOT / "library/the-count-of-monte-cristo.pwk"
OUT = Path(__file__).with_name("manifest.json")

data = json.loads(PWK.read_text(encoding="utf-8"))
if OUT.exists() and data["world"]["coverImageId"].startswith("count-of-monte-cristo-image-generated-"):
    existing = json.loads(OUT.read_text(encoding="utf-8"))
    print(f"Manifest already built with {len(existing['slots'])} slots: {OUT}")
    raise SystemExit(0)
blobs = {blob["id"]: blob for blob in data["blobs"]}
slots = []


def add(kind, object_id, name, description, field, old_id):
    if not old_id:
        raise ValueError(f"Missing image: {kind} {name}")
    source = blobs[old_id]
    number = len(slots) + 1
    slug = "".join(c.lower() if c.isalnum() else "-" for c in name)
    slug = "-".join(part for part in slug.split("-") if part)
    slots.append({
        "number": number,
        "kind": kind,
        "objectId": object_id,
        "name": name,
        "description": description,
        "field": field,
        "oldBlobId": old_id,
        "sourceUrl": source["url"],
        "newBlobId": f"count-of-monte-cristo-image-generated-{number:03d}",
        "path": f"library/the-count-of-monte-cristo/art/generated/{kind}/{number:03d}-{slug[:55]}.jpg",
        "status": "pending",
    })


add("cover", data["world"]["id"], data["world"]["name"], data["world"]["description"], "coverImageId", data["world"]["coverImageId"])
for kind, collection, field, desc in (
    ("characters", "characters", "portraitImageId", "description"),
    ("items", "items", "imageId", "description"),
    ("locations", "locationMarkers", "imageId", "description"),
    ("lore", "lorePages", "coverImageId", "body"),
    ("factions", "factions", "coverImageId", "description"),
):
    for obj in data[collection]:
        name = obj.get("name") or obj.get("title") or obj["id"]
        add(kind, obj["id"], name, str(obj.get(desc) or "")[:600], field, obj.get(field))

maps = [{"name": x["name"], "blobId": x["imageId"], "url": blobs[x["imageId"]]["url"]} for x in data["mapLayers"]]
manifest = {
    "title": data["world"]["name"],
    "policy": "One distinct generated image per cover, character, item, location and lore slot. Retain six functional historical maps.",
    "style": "Historically grounded nineteenth-century literary illustration in ink and watercolor on textured paper; coherent restrained palette; no lettering or watermark.",
    "slots": slots,
    "retainedMaps": maps,
    "oldBlobCount": len(blobs),
}
OUT.write_bytes((json.dumps(manifest, ensure_ascii=False, indent=2) + "\n").encode("utf-8"))
print(f"Wrote {len(slots)} unique artwork slots, retaining {len(maps)} maps: {OUT}")
