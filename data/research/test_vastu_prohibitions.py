import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("=== CHECKING CLASSICAL PROHIBITIONS IN RESEARCH & ENGINE ===")

# 1. Toilet in NE / Brahmasthan
with open('data/research/vastu_5_bedroom_toilet.json', 'r', encoding='utf-8') as f:
    v5 = json.load(f)

toilet_tool = next((t for t in v5 if t['tool_id'] == 'toilet-bathroom-vastu'), None)
toilet_rules = toilet_tool.get('rules_matrix', [])

print("\n--- TOILET / BATHROOM PROHIBITIONS ---")
for r in toilet_rules:
    zone = r.get('zone_direction') or r.get('zone')
    status = r.get('assessment') or r.get('status')
    conseq = r.get('consequence') or r.get('classical_phala') or r.get('description')
    if any(z in str(zone) for z in ['NE', 'North-East', 'Īśāna', 'Brahmasthan', 'Center', 'Madhya']):
        print(f"Zone: {zone} -> Assessment: {status} | Consequence: {str(conseq)[:100]}...")

# 2. Kitchen in NE
with open('data/research/vastu_4_kitchen_puja.json', 'r', encoding='utf-8') as f:
    v4 = json.load(f)

kitchen_tool = next((t for t in v4 if t['tool_id'] == 'kitchen-vastu'), None)
kitchen_rules = kitchen_tool.get('rules_matrix', [])
print("\n--- KITCHEN PROHIBITIONS ---")
for r in kitchen_rules:
    zone = r.get('zone_direction') or r.get('zone') or r.get('direction')
    status = r.get('assessment') or r.get('status')
    conseq = r.get('consequence') or r.get('classical_phala') or r.get('description')
    if any(z in str(zone) for z in ['NE', 'North-East', 'Īśāna', 'Center', 'Brahmasthan', 'Brahma']):
        print(f"Zone: {zone} -> Assessment: {status} | Consequence: {str(conseq)[:100]}...")

# 3. Bedroom / Sleeping head to North
bedroom_tool = next((t for t in v5 if t['tool_id'] == 'bedroom-vastu'), None)
bedroom_rules = bedroom_tool.get('rules_matrix', [])
print("\n--- BEDROOM / HEAD DIRECTION PROHIBITIONS ---")
for r in bedroom_rules:
    elem = r.get('element_aspect') or r.get('aspect') or r.get('zone_direction')
    head_dir = r.get('head_direction') or r.get('sleeping_direction') or r.get('value')
    status = r.get('assessment') or r.get('status')
    conseq = r.get('consequence') or r.get('classical_phala') or r.get('description')
    rule_txt = json.dumps(r, ensure_ascii=False)
    if 'North' in rule_txt or 'Uttara' in rule_txt:
        print(f"Rule: {elem} / {head_dir} -> Status: {status} | Snippet: {rule_txt[:120]}...")

# 4. Regional Variations Note across all 10 Vastu tools in unified db
with open('data/research_database.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

print("\n--- REGIONAL VARIATIONS NOTE IN UNIFIED DB ---")
vastu_db_tools = [t for t in db.get('tools', []) if t.get('family') == 'Classical Vastu (10)']
print(f"Found {len(vastu_db_tools)} Vastu tools in DB.")
for t in vastu_db_tools:
    note = t.get('variation_note')
    print(f"[{t.get('tool_id')}] Variation note present? {bool(note)}: {str(note)[:80]}...")

