"""Record every Oz image slot, including previously unillustrated entities."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PWK = ROOT / "library/the-wonderful-wizard-of-oz.pwk"
OUT = Path(__file__).with_name("manifest.json")
data = json.loads(PWK.read_text(encoding="utf-8"))
if OUT.exists() and data["world"]["coverImageId"].startswith("oz-generated-"):
    print("Manifest already built")
    raise SystemExit(0)
blobs = {blob["id"]: blob for blob in data["blobs"]}
slots = []


def add(kind, obj, name, description, field):
    number = len(slots) + 1
    old_id = obj.get(field)
    slug = obj["id"].removeprefix("oz-").replace("-", "-")
    slots.append({
        "number": number,
        "kind": kind,
        "objectId": obj["id"],
        "name": name,
        "description": str(description or "")[:700],
        "field": field,
        "oldBlobId": old_id,
        "oldUrl": blobs[old_id]["url"] if old_id else None,
        "newBlobId": f"oz-generated-{number:03d}",
        "path": f"library/the-wonderful-wizard-of-oz/art/generated/{kind}/{number:03d}-{slug[:56]}.jpg",
        "status": "pending",
    })


add("cover", data["world"], data["world"]["name"], data["world"]["description"], "coverImageId")
for kind, collection, field, description in (
    ("characters", "characters", "portraitImageId", "description"),
    ("items", "items", "imageId", "description"),
    ("locations", "locationMarkers", "imageId", "description"),
    ("factions", "factions", "coverImageId", "description"),
    ("lore", "lorePages", "coverImageId", "body"),
):
    for obj in data[collection]:
        add(kind, obj, obj.get("name") or obj.get("title") or obj["id"], obj.get(description), field)

maps = []
for map_layer in data["mapLayers"]:
    old_id = map_layer["imageId"]
    maps.append({
        "mapId": map_layer["id"],
        "name": map_layer["name"],
        "width": map_layer["imageWidth"],
        "height": map_layer["imageHeight"],
        "blobId": old_id,
        "oldUrl": blobs[old_id]["url"],
        "newUrl": ("library/the-wonderful-wizard-of-oz/maps/kansas.jpg" if map_layer["id"] == "oz-map-kansas" else f"library/the-wonderful-wizard-of-oz/maps/generated/{map_layer['id'].removeprefix('oz-map-')}.jpg"),
    })

manifest = {
    "title": data["world"]["name"],
    "policy": "Original book-faithful art; one distinct image per visible slot; no film character designs, green-skinned witch, or ruby shoes. Nine painted literary maps, including Kansas, replace the earlier diagram maps.",
    "slots": slots,
    "maps": maps,
    "oldBlobCount": len(blobs),
}
OUT.write_bytes((json.dumps(manifest, ensure_ascii=False, indent=2) + "\n").encode("utf-8"))
print(f"Wrote {len(slots)} illustration slots and {len(maps)} map records")
