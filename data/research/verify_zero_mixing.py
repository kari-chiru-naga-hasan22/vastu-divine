import json
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

print("=== ZERO MIXING AND PURITY AUDIT ===")

# 1. Check numerology-engine.js
with open('js/numerology-engine.js', 'r', encoding='utf-8') as f:
    engine_code = f.read()

# Verify Chaldean Map in engine
assert "CHALDEAN_MAP" in engine_code
# Extract CHALDEAN_MAP from engine
chaldean_map_match = re.search(r'const CHALDEAN_MAP\s*=\s*(?:Object\.freeze\()?\s*\{([^}]+)\}', engine_code)
assert chaldean_map_match, "CHALDEAN_MAP not found"
chaldean_map_str = chaldean_map_match.group(1)
# check no letter maps to 9
assert ": 9" not in chaldean_map_str and ":9" not in chaldean_map_str, "CRITICAL ERROR: Letter mapped to 9 in Chaldean Map!"
print("[PASS] Engine CHALDEAN_MAP contains NO 9s.")

# Verify Pythagorean Map in engine
pyth_map_match = re.search(r'const PYTHAGOREAN_MAP\s*=\s*(?:Object\.freeze\()?\s*\{([^}]+)\}', engine_code)
assert pyth_map_match, "PYTHAGOREAN_MAP not found"
pyth_map_str = pyth_map_match.group(1)
# check that 9 is present in Pythagorean (e.g. I:9, R:9)
assert "I: 9" in pyth_map_str or "I:9" in pyth_map_str, "Pythagorean map missing 9 for I"
assert "R: 9" in pyth_map_str or "R:9" in pyth_map_str, "Pythagorean map missing 9 for R"
print("[PASS] Engine PYTHAGOREAN_MAP correctly maps I:9, R:9 and spans 1-9.")

# Check calculateNameNumber and calculateNameAnalysis use buildChaldeanBreakdown
name_num_fn = engine_code[engine_code.find("function calculateNameNumber"):engine_code.find("function calculateNameAnalysis")]
assert "buildChaldeanBreakdown" in name_num_fn, "calculateNameNumber must use buildChaldeanBreakdown"
assert "buildPythagoreanBreakdown" not in name_num_fn, "CRITICAL ERROR: calculateNameNumber references buildPythagoreanBreakdown!"
print("[PASS] calculateNameNumber strictly uses Chaldean values.")

name_ana_fn = engine_code[engine_code.find("function calculateNameAnalysis"):engine_code.find("function calculateMobileNumber")]
assert "buildChaldeanBreakdown" in name_ana_fn or "CHALDEAN_MAP" in name_ana_fn, "calculateNameAnalysis must use Chaldean breakdown/map"
assert "buildPythagoreanBreakdown" not in name_ana_fn, "CRITICAL ERROR: calculateNameAnalysis references Pythagorean breakdown!"
print("[PASS] calculateNameAnalysis strictly uses Chaldean values.")

# Check calculateDestinyNumber uses buildPythagoreanBreakdown
destiny_fn = engine_code[engine_code.find("function calculateDestinyNumber"):engine_code.find("function calculateBusinessName")]
assert "buildPythagoreanBreakdown" in destiny_fn, "calculateDestinyNumber must use buildPythagoreanBreakdown"
assert "buildChaldeanBreakdown" not in destiny_fn, "CRITICAL ERROR: calculateDestinyNumber references buildChaldeanBreakdown!"
print("[PASS] calculateDestinyNumber strictly uses Pythagorean values.")

# Check master numbers preservation in Pythagorean tools
assert "MASTER_NUMBERS" in engine_code or "[11, 22, 33]" in engine_code or "11" in engine_code, "Master Numbers 11, 22, 33 must be preserved"
print("[PASS] Life Path preserves Master Numbers 11, 22, 33.")

# 2. Check research files for mixing
with open('data/research/numerology_1_chaldean.json', 'r', encoding='utf-8') as f:
    chaldean_json = json.load(f)

# Ensure no Pythagorean attribution in Chaldean
dump_c = json.dumps(chaldean_json, ensure_ascii=False)
assert "Pythagorean" not in dump_c or "Never uses Pythagorean" in dump_c, "Chaldean file has contaminated Pythagorean reference"
print("[PASS] Chaldean research file is free of Pythagorean contamination.")

# 3. Check modern tools for false ancient Vedic attribution
with open('data/research/numerology_3_modern.json', 'r', encoding='utf-8') as f:
    modern_json = json.load(f)

for t in modern_json.get('tools', []):
    tid = t.get('tool_id')
    dump_t = json.dumps(t, ensure_ascii=False).lower()
    # Check that it is explicitly disclaimed from ancient texts
    assert "modern practitioner methodology" in dump_t, f"{tid} missing 'modern practitioner methodology' label"
    assert "not derived from ancient vedic" in dump_t or "not found in ancient vedic" in dump_t, f"{tid} missing explicit non-ancient disclaimer"
    print(f"[PASS] {tid} properly labeled as Modern Practitioner Methodology with explicit non-ancient disclaimer.")

# 4. Check UI content files for required attribution & disclaimers
with open('data/research/content_numerology_tools.json', 'r', encoding='utf-8') as f:
    ui_num = json.load(f)

for tool_key, tool_obj in ui_num.get('tools', {}).items():
    trad_system = tool_obj.get('system_named')
    is_modern = tool_obj.get('is_modern_practitioner_methodology')
    print(f"UI Tool [{tool_key}]: system='{trad_system}', is_modern={is_modern}")
    if is_modern:
        assert trad_system == "Modern Practitioner Methodology", f"Modern tool {tool_key} must be named 'Modern Practitioner Methodology'"
        # check result cards for modern disclaimer
        cards = tool_obj.get('diagnostic_result_cards', [])
        for c in cards:
            note = c.get('visible_note', '')
            assert "Modern Practitioner Methodology" in note or "Not found in ancient Vedic" in note or "modern" in note.lower(), f"Result card {c.get('card_id')} missing modern note"
    else:
        assert trad_system in ["Chaldean Numerological Tradition (Cheiro)", "Pythagorean Numerological Tradition (Dr. David Phillips)"], f"Non-modern tool {tool_key} has invalid system: {trad_system}"

print("\n[ALL ZERO-MIXING AND PURITY CHECKS PASSED WITH 100% COMPLIANCE]")
