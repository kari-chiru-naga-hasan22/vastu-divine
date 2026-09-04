import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        low = line.lower()
        if 'sketchbook' in low or 'sacredsketchbook' in low:
            print(f"{i+1}: {line.strip()[:100]}")
