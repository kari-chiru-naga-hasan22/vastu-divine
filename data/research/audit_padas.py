import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('data/research/vastu_2_facing_maindoor.json', 'r', encoding='utf-8') as f:
    v2 = json.load(f)

# Find main-door-vastu
main_door = next((t for t in v2['tools'] if t['tool_id'] == 'main-door-vastu'), None)
padas_32 = main_door.get('rules_matrix', {}).get('padas_32', [])

print(f"Total padas in vastu_2: {len(padas_32)}")
for p in padas_32:
    print(f"Pada {p.get('pada_index'):2d} [{p.get('pada_code')}]: {p.get('deity_sanskrit')} ({p.get('deity_english')}) | Dir: {p.get('direction')} | Result: {p.get('classical_status')} - {p.get('classical_consequence')[:60]}... | Text: {p.get('classical_reference')}")
