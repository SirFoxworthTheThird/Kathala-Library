"""Build labelled contact sheets for Inferno artwork QA."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "scripts" / "inferno" / "qa"
OUT.mkdir(parents=True, exist_ok=True)


def sheet(name: str, files: list[Path], columns: int = 5) -> None:
    thumb_w, thumb_h, label_h = 300, 200, 32
    rows = (len(files) + columns - 1) // columns
    canvas = Image.new("RGB", (columns * thumb_w, rows * (thumb_h + label_h)), "#17130f")
    draw = ImageDraw.Draw(canvas)
    font = ImageFont.load_default(size=18)
    for index, file in enumerate(files):
        image = Image.open(file).convert("RGB")
        image.thumbnail((thumb_w, thumb_h))
        x = (index % columns) * thumb_w + (thumb_w - image.width) // 2
        y = (index // columns) * (thumb_h + label_h) + (thumb_h - image.height) // 2
        canvas.paste(image, (x, y))
        draw.text(((index % columns) * thumb_w + 8, y + thumb_h + 5), file.stem, fill="#f1dfb9", font=font)
    canvas.save(OUT / f"{name}.jpg", quality=90)


sheet("characters", sorted((ROOT / "library/inferno/art/characters").glob("*.png")), 5)
sheet("locations", sorted((ROOT / "library/inferno/art/locations").glob("*.png")), 5)
sheet("items", sorted((ROOT / "library/inferno/art/items").glob("*.png")), 4)
sheet("maps", sorted((ROOT / "library/inferno/maps").glob("*.png")), 3)
sheet("world", [ROOT / "library/inferno/art/world.png"], 1)
