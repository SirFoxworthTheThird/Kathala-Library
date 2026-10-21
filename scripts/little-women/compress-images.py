from pathlib import Path
from PIL import Image, __version__ as pillow_version, features


ROOT = Path(__file__).resolve().parents[2]
BOOK = ROOT / "library" / "little-women"
SOURCES = Path(__file__).resolve().parent / "image-sources"


def encode(source: Path, destination: Path, quality: int) -> None:
    image = Image.open(source).convert("RGB")
    destination.parent.mkdir(parents=True, exist_ok=True)
    image.save(destination, "WEBP", quality=quality, method=6, exact=True)


def main() -> None:
    print(f"Encoder: Pillow {pillow_version}, libwebp {features.version('webp')}")
    sources = sorted(SOURCES.rglob("*.png"))
    for source in sources:
        relative = source.relative_to(SOURCES)
        destination = (BOOK / relative).with_suffix(".webp")
        quality = 85
        encode(source, destination, quality)
        print(
            f"{destination.relative_to(ROOT)}: "
            f"{source.stat().st_size} -> {destination.stat().st_size} bytes "
            f"({destination.stat().st_size / source.stat().st_size:.1%})"
        )


if __name__ == "__main__":
    main()
