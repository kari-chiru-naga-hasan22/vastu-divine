import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("================================================================================")
print("AUDIT SECTION 2: NUMEROLOGY SEPARATION AND PURITY VERIFICATION")
print("================================================================================")

# 1. Inspect Chaldean Research File
with open('data/research/numerology_1_chaldean.json', 'r', encoding='utf-8') as f:
    chaldean_data = json.load(f)

print(f"System: {chaldean_data.get('system')} | Name: {chaldean_data.get('system_name')}")
print(f"Purity Statement: {chaldean_data.get('system_purity_statement')}")
print(f"Source: {chaldean_data.get('source', {}).get('title')} by {chaldean_data.get('source', {}).get('author')}")

# Verify Chaldean Alphabet Table (1-8 only, 9 excluded)
alpha_map = chaldean_data.get('alphabet_values', {})
print("\nChaldean Alphabet Map:")
flat_chaldean = {}
for val_str, letters in alpha_map.items():
    val = int(val_str)
    print(f"  Value {val}: {', '.join(letters)}")
    for l in letters:
        flat_chaldean[l.upper()] = val

# Check 9 is absent from values
assert '9' not in alpha_map, "FAIL: 9 is present as a letter value in Chaldean alphabet_values!"
assert 9 not in flat_chaldean.values(), "FAIL: 9 found in letter mappings!"
print(f"Total mapped letters: {len(flat_chaldean)} (Expected 26)")
assert len(flat_chaldean) == 26, f"Expected 26 letters, got {len(flat_chaldean)}"

# Standard Chaldean mappings check
expected_chaldean = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 8, 'G': 3, 'H': 5, 'I': 1,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 7, 'P': 8, 'Q': 1, 'R': 2,
    'S': 3, 'T': 4, 'U': 6, 'V': 6, 'W': 6, 'X': 5, 'Y': 1, 'Z': 7
}
mismatches = []
for letter, exp_val in expected_chaldean.items():
    actual_val = flat_chaldean.get(letter)
    if actual_val != exp_val:
        mismatches.append((letter, exp_val, actual_val))

if not mismatches:
    print("PASS: Chaldean alphabet letter values 100% match standard Cheiro tradition (1-8, no 9).")
else:
    print(f"FAIL: Chaldean letter mismatches: {mismatches}")

# Verify Cheiro Compound Numbers (10 to 52)
compound_map = chaldean_data.get('compound_numbers_10_to_52', {})
print(f"\nCheiro Compound Numbers present: {len(compound_map)} items (Range {min(int(k) for k in compound_map.keys())} to {max(int(k) for k in compound_map.keys())})")
for c in range(10, 53):
    assert str(c) in compound_map, f"Missing compound number {c} in Cheiro meanings!"
print("PASS: All Cheiro compound numbers 10 through 52 are fully articulated.")

# Check Tools in Chaldean
tools = chaldean_data.get('tools', [])
print(f"\nChaldean Tools defined: {[t.get('tool_id') for t in tools]}")
for t in tools:
    print(f"  Tool: {t.get('tool_id')} - {t.get('tool_name')}")
    print(f"    Tradition: {t.get('tradition')}")
    print(f"    Source: {t.get('source', {}).get('title')} ({t.get('source', {}).get('author')})")

print("\n" + "="*80)
print("AUDIT SECTION 3: PYTHAGOREAN TOOLS VERIFICATION")
print("="*80)

with open('data/research/numerology_2_pythagorean.json', 'r', encoding='utf-8') as f:
    pyth_data = json.load(f)

pyth_tools = pyth_data.get('tools', [])
print(f"Pythagorean Tools defined: {[t.get('tool_id') for t in pyth_tools]}")
for t in pyth_tools:
    print(f"  Tool: {t.get('tool_id')} - {t.get('tool_name')}")
    print(f"    Tradition: {t.get('tradition_full_name')}")
    print(f"    Source: {t.get('source', {}).get('title')} ({t.get('source', {}).get('author')})")
    # Check alphabet table
    alpha_tab = t.get('alphabet_letter_values_pythagorean_1_to_9', {})
    if alpha_tab:
        print(f"    Alphabet values: 1 to {len(alpha_tab)} levels")
    # Check master numbers
    rules = json.dumps(t, ensure_ascii=False)
    has_11 = "11" in rules
    has_22 = "22" in rules
    has_33 = "33" in rules
    print(f"    Master numbers referenced (11, 22, 33): 11={has_11}, 22={has_22}, 33={has_33}")
    print(f"    David Phillips cited: {'David A. Phillips' in rules or 'David Phillips' in rules}")

print("\n" + "="*80)
print("AUDIT SECTION 4: MODERN PRACTITIONER METHODOLOGY LABELING")
print("="*80)

with open('data/research/numerology_3_modern.json', 'r', encoding='utf-8') as f:
    mod_data = json.load(f)

mod_tools = mod_data.get('tools', [])
print(f"Modern Tools defined: {[t.get('tool_id') for t in mod_tools]}")
for t in mod_tools:
    tid = t.get('tool_id')
    name = t.get('tool_name')
    trad = t.get('tradition_full_name') or t.get('tradition')
    sys_type = t.get('system_type')
    has_vedic_claim = t.get('historical_vedic_claim', True)
    modern_label = t.get('is_modern_practitioner_methodology')
    print(f"  Tool: {tid} - {name}")
    print(f"    Tradition: {trad}")
    print(f"    System Type: {sys_type}")
    print(f"    Historical Vedic Claim False? {has_vedic_claim is False}")
    print(f"    Explicit Modern Methodology? {modern_label is True}")
    # Verify no false ancient attribution
    dump = json.dumps(t, ensure_ascii=False).lower()
    bad_attributions = ["ancient vedic text for mobile", "atharva veda vehicle", "rig veda mobile phone"]
    for bad in bad_attributions:
        assert bad not in dump, f"Found invalid attribution: {bad}"

# Check in research_database.json for modern tools
print("\nChecking Modern Tools in unified research_database.json:")
for t in db.get('tools', []):
    if t.get('tool_id') in ['mobile-number', 'vehicle-number', 'business-name', 'compatibility-analyzer']:
        print(f"  [{t.get('tool_id')}]")
        print(f"    Tradition: {t.get('tradition')}")
        print(f"    is_modern_practitioner: {t.get('is_modern_practitioner')}")
        print(f"    Disclaimer: {t.get('disclaimer')}")

