import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("=== CHECKING ALL FILES ===")

# 1. Check research_database.json
with open('data/research_database.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

print(f"research_database.json total_tools={db.get('total_tools')}, len(tools)={len(db.get('tools', []))}")
for i, t in enumerate(db.get('tools', [])):
    print(f"  {i+1:2d}. [{t.get('family')}] {t.get('tool_id')} : {t.get('tool_name')} | tradition={t.get('tradition')}")

# 2. Check vastu files
vastu_files = [
    'data/research/vastu_1_plot_water.json',
    'data/research/vastu_2_facing_maindoor.json',
    'data/research/vastu_3_house_staircase.json',
    'data/research/vastu_4_kitchen_puja.json',
    'data/research/vastu_5_bedroom_toilet.json'
]
print("\n=== VASTU RESEARCH FILES ===")
for vf in vastu_files:
    with open(vf, 'r', encoding='utf-8') as f:
        data = json.load(f)
        if isinstance(data, list):
            ids = [x.get('tool_id') for x in data]
            print(f"{vf}: LIST with {len(data)} tools -> {ids}")
        elif isinstance(data, dict):
            if 'tools' in data:
                ids = [x.get('tool_id') for x in data['tools']]
                print(f"{vf}: DICT with 'tools' ({len(data['tools'])}) -> {ids}")
            else:
                print(f"{vf}: DICT keys: {list(data.keys())[:5]}")

# 3. Check numerology files
num_files = [
    'data/research/numerology_1_chaldean.json',
    'data/research/numerology_2_pythagorean.json',
    'data/research/numerology_3_modern.json'
]
print("\n=== NUMEROLOGY RESEARCH FILES ===")
for nf in num_files:
    with open(nf, 'r', encoding='utf-8') as f:
        data = json.load(f)
        if isinstance(data, list):
            ids = [x.get('tool_id') for x in data]
            print(f"{nf}: LIST with {len(data)} tools -> {ids}")
        elif isinstance(data, dict):
            if 'tools' in data:
                ids = [x.get('tool_id') for x in data['tools']]
                print(f"{nf}: DICT with 'tools' ({len(data['tools'])}) -> {ids}")
            elif 'tools_by_id' in data:
                print(f"{nf}: DICT with 'tools_by_id' -> {list(data['tools_by_id'].keys())}")
            else:
                print(f"{nf}: DICT keys: {list(data.keys())}")

# 4. Check UI copy files
ui_files = [
    'data/research/content_landing.json',
    'data/research/content_vastu_tools.json',
    'data/research/content_numerology_tools.json'
]
print("\n=== UI COPY FILES ===")
for uf in ui_files:
    with open(uf, 'r', encoding='utf-8') as f:
        data = json.load(f)
        if isinstance(data, dict):
            print(f"{uf}: DICT keys: {list(data.keys())}")
            if 'tools' in data:
                if isinstance(data['tools'], dict):
                    print(f"  tools dict keys ({len(data['tools'])}): {list(data['tools'].keys())}")
                elif isinstance(data['tools'], list):
                    print(f"  tools list ({len(data['tools'])}) ids: {[x.get('tool_id', x.get('id')) for x in data['tools']]}")
