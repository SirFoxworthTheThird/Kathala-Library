from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[2]
SOURCE = Path(__file__).with_name("map-art-source")
OUT = ROOT / "library" / "the-undersong" / "maps"
W, H = 1600, 1000

FONT = Path(r"C:\Windows\Fonts\georgia.ttf")
FONT_BOLD = Path(r"C:\Windows\Fonts\georgiab.ttf")
title_font = ImageFont.truetype(str(FONT_BOLD), 40)
label_font = ImageFont.truetype(str(FONT_BOLD), 22)
small_font = ImageFont.truetype(str(FONT), 17)

MAPS = {
    "coast": {
        "title": "THE NORTH RIDING COAST · 1911",
        "subtitle": "Interpretive topographic chart · north at top",
        "markers": {"Whitby": (410, 255), "Hollin Staithe": (820, 420), "Loftus": (1070, 610)},
        "routes": [[(410, 255), (575, 335), (820, 420), (950, 520), (1070, 610)]],
    },
    "village": {
        "title": "HOLLIN STAITHE · 1911",
        "subtitle": "Fictional village plan reconstructed from the manuscript · north at top",
        "markers": {
            "Surgery": (500, 650), "Cliff Row": (600, 610), "Hesketh House": (740, 565),
            "School": (880, 650), "Agnes's House": (1000, 610), "St Oswald's": (1020, 760),
            "Churchyard": (1100, 735), "Memorial": (1060, 700), "Staithe": (650, 360),
            "Long Scar": (820, 270), "Exposed Seabed": (1080, 180), "Village Square": (830, 685),
            "Whitby Road": (1260, 700), "Saltwick Drift": (420, 285),
        },
        "routes": [[(1260,700),(1020,680),(830,685),(650,540),(650,360),(820,270),(1080,180)],
                   [(830,685),(740,565),(600,610),(500,650)], [(650,360),(420,285)]],
    },
    "drift": {
        "title": "SALTWICK DRIFT · 1911",
        "subtitle": "Interpretive mine plan reconstructed from the manuscript · north at top",
        "markers": {"Adit": (280, 680), "Fourth Heading": (1000, 420), "The Hollow": (1320, 400)},
        "routes": [[(280,680),(460,620),(670,540),(835,470),(1000,420),(1160,410),(1320,400)]],
    },
}

def xy(point):
    return point[0], H - point[1]

def fit_base(path):
    image = Image.open(path).convert("RGB")
    return ImageOps.fit(image, (W, H), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))

def label(draw, text, point):
    x, y = xy(point)
    r = 9
    draw.ellipse((x-r, y-r, x+r, y+r), fill=(117,45,31,255), outline=(246,232,190,255), width=3)
    box = draw.textbbox((0,0), text, font=label_font, stroke_width=1)
    tw, th = box[2]-box[0], box[3]-box[1]
    tx = min(max(16, x + 15), W - tw - 20)
    ty = min(max(92, y - th//2), H - th - 35)
    draw.rounded_rectangle((tx-7,ty-4,tx+tw+7,ty+th+5), radius=5, fill=(244,233,201,220), outline=(79,67,50,210), width=1)
    draw.text((tx,ty), text, font=label_font, fill=(38,31,24,255), stroke_width=1, stroke_fill=(244,233,201,255))

def render(key, spec):
    image = fit_base(SOURCE / f"{key}-base.png").convert("RGBA")
    overlay = Image.new("RGBA", image.size, (0,0,0,0))
    draw = ImageDraw.Draw(overlay)
    for route in spec["routes"]:
        pts = [xy(p) for p in route]
        draw.line(pts, fill=(246,232,190,225), width=9, joint="curve")
        draw.line(pts, fill=(119,52,36,245), width=4, joint="curve")
    draw.rectangle((0,0,W,78), fill=(39,37,30,255))
    draw.text((25,13), spec["title"], font=title_font, fill=(245,232,194,255))
    draw.text((W-690,29), spec["subtitle"], font=small_font, fill=(231,220,190,255))
    # Compass and scale cue are editorial, not claims of exact surveyed distance.
    draw.ellipse((W-92, H-92, W-28, H-28), fill=(244,233,201,220), outline=(55,48,38,255), width=2)
    draw.polygon([(W-60,H-84),(W-69,H-55),(W-51,H-55)], fill=(117,45,31,255))
    draw.text((W-67,H-51), "N", font=label_font, fill=(38,31,24,255))
    for text_, point in spec["markers"].items():
        label(draw, text_, point)
    result = Image.alpha_composite(image, overlay).convert("RGB")
    OUT.mkdir(parents=True, exist_ok=True)
    result.save(OUT / f"{key}.png", optimize=True)

for map_key, map_spec in MAPS.items():
    render(map_key, map_spec)
print(f"Rendered {len(MAPS)} maps at {W}x{H}")
