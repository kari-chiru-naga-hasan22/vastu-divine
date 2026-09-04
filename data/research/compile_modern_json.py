# -*- coding: utf-8 -*-
"""
Compiler script: compile_modern_json.py
Assembles numerology_3_modern.json containing the 4 Modern Practitioner Numerology tools:
1. mobile-number
2. vehicle-number
3. business-name
4. compatibility-analyzer
"""

import json
import os
import sys

# Import our tool generators
sys.path.append(r"D:\builds\data\research")
from build_mobile_data import get_mobile_number_tool
from build_vehicle_data import get_vehicle_number_tool
from build_business_data import get_business_name_tool
from build_compatibility_data import get_compatibility_tool

HISTORICAL_CLARIFICATION = (
    "Modern practitioner methodology; not derived from ancient Vedic or classical antique texts, "
    "which predated telecommunications, automobiles, and modern corporate incorporation."
)

DISCLAIMER_TEXT = "This is a traditional esoteric belief system, not an empirical or scientific claim."

HISTORICAL_CONTEXT_ESSAY = (
    "Modern practitioner methodology; not derived from ancient Vedic or classical antique texts, "
    "which predated telecommunications, automobiles, and modern corporate incorporation. "
    "Ancient Sanskrit architectural treatises (Mānasāra, Mayamata, Bṛhat Saṃhitā) and antique "
    "esoteric schools (Chaldean antiquity, Greek Pythagoreanism) possessed no conceptual or textual "
    "frameworks for mobile telephone strings, vehicular motor licensing, joint-stock corporate brand "
    "trademarks, or multi-tiered Western-Vedic syncretic compatibility algorithms. These applications "
    "were developed in the 20th and 21st centuries by contemporary professional numerologists who "
    "projected classical planetary archetypes (Graha symbolism), numeric reduction formulas, and "
    "harmonic vibration tables onto modern technological, industrial, and commercial artifacts."
)

def compile_and_validate():
    tool_mobile = get_mobile_number_tool()
    tool_vehicle = get_vehicle_number_tool()
    tool_business = get_business_name_tool()
    tool_compatibility = get_compatibility_tool()

    tools_list = [tool_mobile, tool_vehicle, tool_business, tool_compatibility]

    # Build tools_by_id with canonical IDs and convenient aliases
    tools_by_id = {}
    for t in tools_list:
        tid = t["tool_id"]
        tools_by_id[tid] = t
        # Also map alias with underscores or suffixes
        underscore_id = tid.replace("-", "_")
        if underscore_id != tid:
            tools_by_id[underscore_id] = t
        if not tid.endswith("-analyzer"):
            tools_by_id[f"{tid}-analyzer"] = t
            tools_by_id[f"{underscore_id}_analyzer"] = t

    full_research_data = {
        "schema_version": "1.0.0",
        "subagent_metadata": {
            "subagent_id": "numerology-research-subagent-3",
            "role": "Modern Practitioner Methodology Specialist",
            "tradition_name": "Modern Practitioner Methodology",
            "historical_clarification": HISTORICAL_CLARIFICATION,
            "historical_context_essay": HISTORICAL_CONTEXT_ESSAY,
            "disclaimer": DISCLAIMER_TEXT,
            "primary_applications_covered": [
                "1. Mobile Number Analyzer (Telecommunication Digit Resonance & Planetary Friendship)",
                "2. Vehicle Number Analyzer (Alphanumeric Registration Reduction & Kinetic Friction)",
                "3. Business / Company Name Numerology (Corporate Brand Compound Resonance & Industry Fit)",
                "4. Name + DOB Compatibility (Multi-Tiered Interpersonal Synchronicity Analysis)"
            ],
            "classical_antiquity_disavowal": (
                "Explicit Scholarly Statement: None of these four tools make any claim of origin in ancient Vedic Śruti/Smṛti, "
                "Pythagorean Greek fragments, or biblical antique Chaldean texts. All calculations represent contemporary applied "
                "esotericism codified by professional practitioners between 1950 and 2025."
            )
        },
        "tools": tools_list,
        "tools_by_id": tools_by_id
    }

    output_path = r"D:\builds\data\research\numerology_3_modern.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(full_research_data, f, indent=2, ensure_ascii=False)

    print(f"Successfully compiled {output_path}")
    size_bytes = os.path.getsize(output_path)
    print(f"File size: {size_bytes} bytes ({size_bytes / 1024:.2f} KB)")

    # Run thorough automated assertions
    print("\n--- Running Rigorous Automated Validation ---")
    with open(output_path, "r", encoding="utf-8") as f:
        loaded = json.load(f)

    assert "subagent_metadata" in loaded, "Missing subagent_metadata"
    meta = loaded["subagent_metadata"]
    assert meta["tradition_name"] == "Modern Practitioner Methodology", "Invalid tradition_name in metadata"
    assert "not derived from ancient vedic or classical antique texts" in meta["historical_clarification"].lower()

    tools = loaded["tools"]
    assert len(tools) == 4, f"Expected 4 tools, got {len(tools)}"

    expected_ids = ["mobile-number", "vehicle-number", "business-name", "compatibility-analyzer"]
    found_ids = [t["tool_id"] for t in tools]
    assert found_ids == expected_ids, f"Tool IDs mismatch: {found_ids} != {expected_ids}"

    for t in tools:
        tid = t["tool_id"]
        tname = t["tool_name"]
        print(f"Validating {tid} ({tname})...")
        
        # System check
        assert t["system"] == "Modern Practitioner Methodology", f"System tag failed for {tid}: {t['system']}"
        
        # Historical clarification check
        assert HISTORICAL_CLARIFICATION in t["historical_clarification"], f"Missing historical clarification in {tid}"
        
        # Disclaimer check
        assert t["disclaimer"] == DISCLAIMER_TEXT, f"Disclaimer mismatch in {tid}"
        
        # Source check
        assert "source" in t, f"Missing source in {tid}"
        assert "title" in t["source"] and "author" in t["source"] and "edition_or_chapter" in t["source"]
        
        # Calculation steps check
        assert "calculation_steps" in t and len(t["calculation_steps"]) >= 4, f"Calculation steps insufficient in {tid}"
        
        # Inputs check
        assert "inputs" in t and len(t["inputs"]) >= 1, f"Missing inputs in {tid}"
        
        # Output schema check
        assert "output_schema" in t, f"Missing output_schema in {tid}"

    # Specific Tool 1 (Mobile Number) checks
    mobile = loaded["tools_by_id"]["mobile-number"]
    assert "mitra_shatru_chakra" in mobile, "Missing mitra_shatru_chakra in mobile-number"
    assert "critical_conflicting_pairs" in mobile, "Missing critical_conflicting_pairs in mobile-number"
    assert "1-8_or_8-1" in mobile["critical_conflicting_pairs"], "Missing 1-8 pair in mobile-number"
    assert "digit_frequency_rules" in mobile, "Missing digit_frequency_rules in mobile-number"
    assert "interpretation_matrix" in mobile, "Missing interpretation_matrix in mobile-number"
    for d in ["1", "2", "3", "4", "5", "6", "7", "8", "9"]:
        assert d in mobile["interpretation_matrix"], f"Missing digit {d} in mobile interpretation_matrix"

    # Specific Tool 2 (Vehicle Number) checks
    vehicle = loaded["tools_by_id"]["vehicle-number"]
    assert "kinetic_friction_matrix" in vehicle, "Missing kinetic_friction_matrix in vehicle-number"
    assert "driver_concordance_table" in vehicle, "Missing driver_concordance_table in vehicle-number"
    for d in ["1", "2", "3", "4", "5", "6", "7", "8", "9"]:
        assert d in vehicle["kinetic_friction_matrix"], f"Missing digit {d} in vehicle kinetic_friction_matrix"
        assert d in vehicle["driver_concordance_table"], f"Missing driver {d} in vehicle driver_concordance_table"
    assert "chaldean_plate_alphabet_table" in vehicle, "Missing chaldean_plate_alphabet_table in vehicle-number"

    # Specific Tool 3 (Business Name) checks
    business = loaded["tools_by_id"]["business-name"]
    assert "chaldean_alphabet_table" in business, "Missing chaldean_alphabet_table in business-name"
    assert "pythagorean_alphabet_table" in business, "Missing pythagorean_alphabet_table in business-name"
    assert "industry_sector_matrix" in business, "Missing industry_sector_matrix in business-name"
    assert "chaldean_commercial_compound_matrix" in business, "Missing compound matrix in business-name"
    for r in ["1", "3", "5", "6", "8"]:
        assert r in business["industry_sector_matrix"], f"Missing root {r} in industry_sector_matrix"

    # Specific Tool 4 (Compatibility) checks
    compat = loaded["tools_by_id"]["compatibility-analyzer"]
    assert "compatibility_matrix_9x9" in compat, "Missing compatibility_matrix_9x9 in compatibility-analyzer"
    matrix = compat["compatibility_matrix_9x9"]
    for i in range(1, 10):
        si = str(i)
        assert si in matrix, f"Missing row {si} in 9x9 matrix"
        for j in range(1, 10):
            sj = str(j)
            assert sj in matrix[si], f"Missing cell ({si}, {sj}) in 9x9 matrix"
            assert "score" in matrix[si][sj], f"Missing score in ({si}, {sj})"
            assert "tier" in matrix[si][sj], f"Missing tier in ({si}, {sj})"

    print("\nALL VERIFICATION AND SCHEMA ASSERTIONS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    compile_and_validate()
