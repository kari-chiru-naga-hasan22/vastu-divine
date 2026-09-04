# -*- coding: utf-8 -*-
"""
Standalone validation script for numerology_3_modern.json
Verifies strict adherence to:
1. System tagging: "Modern Practitioner Methodology"
2. Historical clarification: "Modern practitioner methodology; not derived from ancient Vedic or classical antique texts, which predated telecommunications, automobiles, and modern corporate incorporation."
3. Traditional disclaimer: "This is a traditional esoteric belief system, not an empirical or scientific claim."
4. Single-system purity & Chaldean/Pythagorean separation
5. Schema compliance: Input -> Formula -> Rule -> Interpretation -> Book -> Chapter/Verse -> Tradition -> Output
"""

import json
import os
import sys

def validate_modern_research():
    json_path = r"D:\builds\data\research\numerology_3_modern.json"
    assert os.path.exists(json_path), f"File not found: {json_path}"

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    print("JSON loaded successfully.")

    # 1. Metadata Checks
    assert "subagent_metadata" in data, "Missing subagent_metadata"
    meta = data["subagent_metadata"]
    assert meta["tradition_name"] == "Modern Practitioner Methodology"
    
    historical_clarification = (
        "Modern practitioner methodology; not derived from ancient Vedic or classical antique texts, "
        "which predated telecommunications, automobiles, and modern corporate incorporation."
    )
    assert historical_clarification in meta["historical_clarification"]

    # 2. Tool Count & IDs
    tools = data.get("tools", [])
    print(f"Tool count: {len(tools)}")
    assert len(tools) == 4, f"Expected 4 tools, found {len(tools)}"

    expected_ids = ["mobile-number", "vehicle-number", "business-name", "compatibility-analyzer"]
    actual_ids = [t["tool_id"] for t in tools]
    print(f"Tool IDs: {actual_ids}")
    assert actual_ids == expected_ids, f"Tool IDs mismatch: {actual_ids} != {expected_ids}"

    disclaimer_text = "This is a traditional esoteric belief system, not an empirical or scientific claim."

    for t in tools:
        tid = t["tool_id"]
        tname = t["tool_name"]
        print(f"\nAuditing Tool: {tid} - {tname}")

        # Check system tag
        assert t["system"] == "Modern Practitioner Methodology", f"System tag invalid for {tid}: {t['system']}"

        # Check historical disclaimer
        assert historical_clarification in t["historical_clarification"], f"Historical clarification missing in {tid}"
        assert t["disclaimer"] == disclaimer_text, f"Disclaimer mismatch in {tid}"

        # Check source citation
        src = t["source"]
        assert "title" in src and len(src["title"]) > 0
        assert "author" in src and len(src["author"]) > 0
        assert "edition_or_chapter" in src and len(src["edition_or_chapter"]) > 0
        assert historical_clarification in src["historical_derivation_note"]

        # Check calculation steps
        steps = t["calculation_steps"]
        assert isinstance(steps, list) and len(steps) >= 4, f"Insufficient calculation steps in {tid}"
        for s in steps:
            assert "step_number" in s
            assert "step_name" in s
            assert "description" in s
            assert "formula" in s

        # Check inputs and outputs
        assert "inputs" in t and len(t["inputs"]) > 0
        assert "output_schema" in t

    # 3. Tool-Specific Deep Audits
    tools_by_id = data["tools_by_id"]

    # Tool 1: Mobile Number
    t1 = tools_by_id["mobile-number"]
    assert "mitra_shatru_chakra" in t1, "Missing planetary friendship in mobile-number"
    assert "critical_conflicting_pairs" in t1, "Missing conflicting pairs in mobile-number"
    assert "digit_frequency_rules" in t1, "Missing zero/repetition rules in mobile-number"
    assert "interpretation_matrix" in t1, "Missing interpretation matrix in mobile-number"
    for d in range(1, 10):
        sd = str(d)
        assert sd in t1["interpretation_matrix"], f"Missing root {sd} in mobile-number interpretation"
    print("Tool 1 (Mobile Number) validated with Mitra-Shatru chakra and 1-9 roots.")

    # Tool 2: Vehicle Number
    t2 = tools_by_id["vehicle-number"]
    assert "kinetic_friction_matrix" in t2, "Missing kinetic friction matrix in vehicle-number"
    assert "driver_concordance_table" in t2, "Missing driver concordance table in vehicle-number"
    assert "chaldean_plate_alphabet_table" in t2, "Missing chaldean plate table in vehicle-number"
    for d in range(1, 10):
        sd = str(d)
        assert sd in t2["kinetic_friction_matrix"], f"Missing root {sd} in vehicle friction matrix"
        assert sd in t2["driver_concordance_table"], f"Missing driver {sd} in driver concordance table"
    print("Tool 2 (Vehicle Number) validated with kinetic friction matrix and driver concordance.")

    # Tool 3: Business Name
    t3 = tools_by_id["business-name"]
    assert "chaldean_alphabet_table" in t3, "Missing Chaldean table in business-name"
    assert "pythagorean_alphabet_table" in t3, "Missing Pythagorean table in business-name"
    assert "industry_sector_matrix" in t3, "Missing industry sector matrix in business-name"
    assert "chaldean_commercial_compound_matrix" in t3, "Missing commercial compound matrix in business-name"
    # Purity check: Chaldean table must have 1-8 only, Pythagorean 1-9
    assert set(t3["chaldean_alphabet_table"].keys()) == {"1", "2", "3", "4", "5", "6", "7", "8"}
    assert set(t3["pythagorean_alphabet_table"].keys()) == {"1", "2", "3", "4", "5", "6", "7", "8", "9"}
    print("Tool 3 (Business Name) validated with dual single-system purity tables and sector matrix.")

    # Tool 4: Compatibility Analyzer
    t4 = tools_by_id["compatibility-analyzer"]
    assert "compatibility_matrix_9x9" in t4, "Missing 9x9 matrix in compatibility-analyzer"
    matrix = t4["compatibility_matrix_9x9"]
    for i in range(1, 10):
        for j in range(1, 10):
            assert str(i) in matrix and str(j) in matrix[str(i)]
            cell = matrix[str(i)][str(j)]
            assert 0 <= cell["score"] <= 100
            assert len(cell["tier"]) > 0
    print("Tool 4 (Compatibility) validated with complete 81-pair 9x9 matrix.")

    print("\n=======================================================")
    print("ALL MODERN PRACTITIONER NUMEROLOGY AUDITS PASSED 100%!")
    print("=======================================================")

if __name__ == "__main__":
    validate_modern_research()
