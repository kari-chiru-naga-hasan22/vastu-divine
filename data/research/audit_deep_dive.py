import json
import os
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

print("================================================================================")
print("AUDIT DEEP DIVE: VASTU DIVINE RESEARCH DATABASE, CONTENT, AND ENGINES")
print("================================================================================")

# Load unified database
with open('data/research_database.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

# Load research files
vastu_files = {
    "vastu_1": json.load(open('data/research/vastu_1_plot_water.json', 'r', encoding='utf-8')),
    "vastu_2": json.load(open('data/research/vastu_2_facing_maindoor.json', 'r', encoding='utf-8')),
    "vastu_3": json.load(open('data/research/vastu_3_house_staircase.json', 'r', encoding='utf-8')),
    "vastu_4": json.load(open('data/research/vastu_4_kitchen_puja.json', 'r', encoding='utf-8')),
    "vastu_5": json.load(open('data/research/vastu_5_bedroom_toilet.json', 'r', encoding='utf-8')),
}

num_files = {
    "chaldean": json.load(open('data/research/numerology_1_chaldean.json', 'r', encoding='utf-8')),
    "pythagorean": json.load(open('data/research/numerology_2_pythagorean.json', 'r', encoding='utf-8')),
    "modern": json.load(open('data/research/numerology_3_modern.json', 'r', encoding='utf-8'))
}

ui_files = {
    "landing": json.load(open('data/research/content_landing.json', 'r', encoding='utf-8')),
    "vastu_tools": json.load(open('data/research/content_vastu_tools.json', 'r', encoding='utf-8')),
    "num_tools": json.load(open('data/research/content_numerology_tools.json', 'r', encoding='utf-8'))
}

print(f"Loaded DB with {db.get('total_tools')} tools.")
print(f"Loaded 5 Vastu files, 3 Numerology files, 3 UI content files.")

# SECTION 1: CITATIONS AUDIT (Mānasāra, Mayamata, Bṛhat Saṃhitā, D.N. Shukla, Manuṣyālaya Candrikā)
print("\n" + "="*80)
print("SECTION 1: CLASSICAL VASTU CANONICAL TEXT CITATIONS AUDIT")
print("="*80)

required_authors_texts = [
    "Mānasāra",
    "Mayamata",
    "Bṛhat Saṃhitā",
    "D.N. Shukla",
    "Manuṣyālaya Candrikā"
]

all_vastu_text_dump = ""
for k, v in vastu_files.items():
    all_vastu_text_dump += json.dumps(v, ensure_ascii=False) + "\n"

# Also check unified db
for t in db.get('tools', []):
    if t.get('family') == 'Classical Vastu (10)':
        all_vastu_text_dump += json.dumps(t, ensure_ascii=False) + "\n"

# Also check content_vastu_tools.json
all_vastu_text_dump += json.dumps(ui_files["vastu_tools"], ensure_ascii=False) + "\n"
all_vastu_text_dump += json.dumps(ui_files["landing"], ensure_ascii=False) + "\n"

for req in required_authors_texts:
    # search case-insensitively or with normalized text
    # handle variations like Manasara, Brihat Samhita, Manushyalaya Chandrika, DN Shukla
    patterns = [req]
    if "Mānasāra" in req:
        patterns = ["Mānasāra", "Manasara"]
    elif "Mayamata" in req:
        patterns = ["Mayamata"]
    elif "Bṛhat Saṃhitā" in req:
        patterns = ["Bṛhat Saṃhitā", "Brihat Samhita", "Brhat Samhita", "Varāhamihira", "Varahamihira"]
    elif "D.N. Shukla" in req:
        patterns = ["D.N. Shukla", "DN Shukla", "D. N. Shukla", "Vastu Sastra by Shukla"]
    elif "Manuṣyālaya Candrikā" in req:
        patterns = ["Manuṣyālaya Candrikā", "Manushyalaya Chandrika", "Manusyalaya Candrika"]

    found = False
    match_counts = {}
    for pat in patterns:
        c = len(re.findall(re.escape(pat), all_vastu_text_dump, re.IGNORECASE))
        if c > 0:
            found = True
            match_counts[pat] = c

    print(f"Text requirement '{req}': {'FOUND' if found else 'NOT FOUND'} -> Matches: {match_counts}")

# Check per-tool citations across 10 Vastu tools
vastu_tools_ids = [
    "plot-vastu-analyzer",
    "water-vastu",
    "main-door-vastu",
    "house-facing-calculator",
    "house-vastu-analyzer",
    "staircase-vastu",
    "kitchen-vastu",
    "puja-room-vastu",
    "bedroom-vastu",
    "toilet-bathroom-vastu"
]

print("\nPer-tool citation audit for 10 Classical Vastu Tools:")
for tid in vastu_tools_ids:
    # find in unified db
    tool_db = next((t for t in db.get('tools', []) if t.get('tool_id') == tid), None)
    if tool_db:
        print(f"  [{tid}]")
        print(f"    Name: {tool_db.get('tool_name')}")
        print(f"    Book: {tool_db.get('book')}")
        print(f"    Chapter/Verse: {tool_db.get('chapter_verse')}")
        print(f"    Formula: {str(tool_db.get('formula'))[:100]}...")
        print(f"    Variation Note Present: {'variation_note' in tool_db}")
    else:
        print(f"  [{tid}] MISSING in research_database.json!")

