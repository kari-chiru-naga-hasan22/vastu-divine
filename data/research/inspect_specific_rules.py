import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('data/research/vastu_5_bedroom_toilet.json', 'r', encoding='utf-8') as f:
    v5 = json.load(f)

toilet = next(t for t in v5 if t['tool_id'] == 'toilet-bathroom-vastu')
for r in toilet['rules_matrix']:
    if 'North-East' in r.get('zone', '') or 'Brahmasth' in r.get('zone', ''):
        print(f"TOILET ZONE: {r.get('zone')}")
        print(f"  Assessment: {r.get('suitability_ranking')} | Severity: {r.get('dosha_severity')}")
        print(f"  Classical Citation: {r.get('classical_citation')}")
        print(f"  Description: {r.get('description')[:120]}...\n")

bedroom = next(t for t in v5 if t['tool_id'] == 'bedroom-vastu')
for r in bedroom['rules_matrix']:
    if 'Sleeping Direction' in r.get('rule_category', ''):
        print(f"SLEEPING DIR: {r.get('direction')}")
        print(f"  Assessment: {r.get('suitability')} | Score: {r.get('suitability_score')}")
        print(f"  Classical Verse: {r.get('classical_verse')}")
        print(f"  Phala: {r.get('classical_phala')}\n")

with open('data/research/vastu_4_kitchen_puja.json', 'r', encoding='utf-8') as f:
    v4 = json.load(f)

kitchen = next(t for t in v4 if t['tool_id'] == 'kitchen-vastu')
for r in kitchen['rules_matrix']:
    if r.get('zone_key') in ['NE', 'Brahmasthāna']:
        print(f"KITCHEN ZONE: {r.get('zone_key')} ({r.get('zone_name_sanskrit')})")
        print(f"  Assessment: {r.get('suitability_level')} | Score: {r.get('suitability_score')}")
        print(f"  Citation: {r.get('primary_citation')}")
        print(f"  Phala: {r.get('classical_phala_sanskrit')} ({r.get('consequence_description')[:100]}...)\n")
