# -*- coding: utf-8 -*-
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("=== INDEX.HTML INTEGRITY CHECK ===")
print(f"File size: {len(html)} bytes")
print("Has vastu-engine.js:", "vastu-engine.js" in html)
print("Has numerology-engine.js:", "numerology-engine.js" in html)
print("Has astrolabe.js:", "astrolabe.js" in html)
print("Has sketchbook.js:", "sketchbook.js" in html)
print("Has astrolabe.css:", "astrolabe.css" in html)
print("Has sketchbook.css:", "sketchbook.css" in html)
print("Has main.css:", "main.css" in html)

# Count tools defined in ALL_20_TOOLS array in JS
match = re.search(r'const ALL_20_TOOLS = \[(.*?)\];', html, re.DOTALL)
if match:
    tools_block = match.group(1)
    tool_ids = re.findall(r"id:\s*'([a-z0-9-]+)'", tools_block)
    print(f"Total tools defined in ALL_20_TOOLS: {len(tool_ids)}")
    print("Tool IDs:")
    for idx, tid in enumerate(tool_ids, 1):
        print(f"  {idx:2d}. {tid}")
else:
    print("ALL_20_TOOLS block not found")

# Check brand colors
for color in ["#6D0A1D", "#B3791E", "#FFFFFF", "#141414"]:
    print(f"Brand color {color} present:", color.lower() in html.lower())

# Check classical citations
for author in ["Mānasāra", "Mayamata", "Bṛhat Saṃhitā", "Samarāṅgaṇa", "Manuṣyālaya"]:
    print(f"Author {author} present:", author in html)

# Check modern practitioner disclaimer
print("Has Modern Practitioner disclaimer:", "Modern Practitioner Methodology" in html)
