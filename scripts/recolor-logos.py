from PIL import Image
import os

# Accenor site brand teal (matches --brand in globals.css)
TARGET = (15, 76, 92)  # #0f4c5c

ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "icons")
FILES = [
    "canvas.png",
    "favicon.png",
    "logo-mark.png",
    "web_logo-removebg.png",
    "web_logo.png",
]


def is_logo_ink(r, g, b, a):
    if a < 20:
        return False
    # Near-black background leftovers
    if r < 25 and g < 25 and b < 25:
        return False
    brightness = (r + g + b) / 3.0
    # Blue/navy ink: cool tone, not washed out white
    if b >= r - 5 and b >= g - 5 and brightness < 200:
        return True
    if brightness < 140 and abs(r - g) < 40 and b >= min(r, g) - 10:
        return True
    return False


def recolor(path):
    img = Image.open(path).convert("RGBA")
    pixels = img.load()
    w, h = img.size
    changed = 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            # Flatten solid black/near-black canvas to transparent for white headers
            if a > 0 and r < 18 and g < 18 and b < 18:
                pixels[x, y] = (0, 0, 0, 0)
                continue
            if is_logo_ink(r, g, b, a):
                pixels[x, y] = (*TARGET, a)
                changed += 1
    img.save(path, optimize=True)
    return changed, w, h


def main():
    for name in FILES:
        path = os.path.normpath(os.path.join(ROOT, name))
        if not os.path.exists(path):
            print("skip missing", name)
            continue
        changed, w, h = recolor(path)
        print(f"updated {name}: {changed} pixels ({w}x{h})")


if __name__ == "__main__":
    main()
