import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Load vastu_2
with open('data/research/vastu_2_facing_maindoor.json', 'r', encoding='utf-8') as f:
    v2 = json.load(f)

main_door = next((t for t in v2['tools'] if t['tool_id'] == 'main-door-vastu'), None)
padas_research = main_door.get('rules_matrix', [])

print(f"=== 32 PADAS IN RESEARCH FILE (vastu_2) === (Count: {len(padas_research)})")

research_padas_by_code = {}
for p in padas_research:
    code = p.get('pada_code')
    num = p.get('pada_number')
    deity = p.get('deity_sanskrit')
    status = p.get('auspiciousness')
    phala = p.get('classical_phala_english')
    verse = p.get('source_verse')
    research_padas_by_code[code] = p
    print(f"[{code:2s}|#{num:2d}] {deity:<25} | {status:<20} | {verse[:40]:<40} | {phala[:50]}...")

# Now check vastu-engine.js
with open('js/vastu-engine.js', 'r', encoding='utf-8') as f:
    engine_text = f.read()

# Extract PADA_DATABASE from vastu-engine.js
# It looks like:
# const PADA_DATABASE = [ ... ];
match = re.search(r'const PADA_DATABASE\s*=\s*(\[\s*\{.*?\}\s*\]);', engine_text, re.DOTALL)
if not match:
    # try broader match
    start_idx = engine_text.find('const PADA_DATABASE = [')
    end_idx = engine_text.find('];', start_idx) + 2
    pada_db_raw = engine_text[start_idx:end_idx]
    print(f"\nFound PADA_DATABASE string in js/vastu-engine.js from char {start_idx} to {end_idx}")

# Let's verify via node.js by running a small script that requires vastu-engine.js
node_test_script = """
const engine = require('./js/vastu-engine.js');
console.log('Total Padas in VastuEngine:', engine.padas.length);
engine.padas.forEach(p => {
  console.log(`[${p.id}|#${p.index}] Deity: ${p.deity} | Quality: ${p.quality} | Score: ${p.score} | Source: ${p.source}`);
});
"""
with open('data/research/test_padas_engine.js', 'w', encoding='utf-8') as f:
    f.write(node_test_script)

print("\nNode test script created for testing vastu-engine.js padas.")
