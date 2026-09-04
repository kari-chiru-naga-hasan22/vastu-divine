"""
Validation script for vastu_3_house_staircase.json
Verifies schema conformity, textual citations, 16 zones completeness, and staircase rules.
"""

import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

def validate():
    file_path = r"D:\builds\data\research\vastu_3_house_staircase.json"
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    print("JSON successfully loaded.")
    assert "tools" in data, "Missing 'tools' field"
    assert len(data["tools"]) == 2, f"Expected 2 tools, found {len(data['tools'])}"

    tools_by_id = {t["tool_id"]: t for t in data["tools"]}
    assert "house-vastu-analyzer" in tools_by_id, "Missing 'house-vastu-analyzer'"
    assert "staircase-vastu" in tools_by_id, "Missing 'staircase-vastu'"

    required_schema_keys = [
        "tool_id", "tool_name", "tradition", "source", "inputs",
        "rules_matrix", "interpretation", "variation_note"
    ]

    for tool in data["tools"]:
        for key in required_schema_keys:
            assert key in tool, f"Tool {tool.get('tool_id')} missing required key: {key}"
        assert tool["tradition"] == "Classical Vedic Vastu", f"Tradition mismatch in {tool['tool_id']}"
        assert isinstance(tool["inputs"], list) and len(tool["inputs"]) > 0, f"Inputs missing in {tool['tool_id']}"
        assert isinstance(tool["rules_matrix"], list) and len(tool["rules_matrix"]) > 0, f"Rules matrix missing in {tool['tool_id']}"
        assert len(tool["interpretation"]) > 50, f"Interpretation too short in {tool['tool_id']}"
        assert len(tool["variation_note"]) > 50, f"Variation note too short in {tool['tool_id']}"

    # Verify House Vastu Analyzer 16 Zones
    house_tool = tools_by_id["house-vastu-analyzer"]
    zones = [r["zone_code"] for r in house_tool["rules_matrix"]]
    expected_zones = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "BRAHMASTHANA"]
    for ez in expected_zones:
        assert ez in zones, f"Missing zone {ez} in house-vastu-analyzer rules_matrix"
    print(f"Verified all 16 zones + Brahmasthana present in house-vastu-analyzer ({len(zones)} zones total).")

    # Verify Staircase Vastu
    stair_tool = tools_by_id["staircase-vastu"]
    matrix_categories = [c["category"] for c in stair_tool["rules_matrix"]]
    print(f"Staircase categories: {matrix_categories}")
    assert any("Location" in c for c in matrix_categories), "Missing Location evaluation in staircase"
    assert any("Ascent" in c or "Rotation" in c for c in matrix_categories), "Missing Ascent evaluation in staircase"
    assert any("Step Count" in c for c in matrix_categories), "Missing Step Count evaluation in staircase"
    assert any("Under-Stair" in c for c in matrix_categories), "Missing Under-Stair evaluation in staircase"

    # Verify Citations
    all_text = json.dumps(data, ensure_ascii=False)
    citations_to_check = [
        "Manuṣyālaya Candrikā",
        "Śilparatna",
        "Bṛhat Saṃhitā",
        "Mayamata",
        "D.N. Shukla",
        "Chapter 2",
        "Chapter 3",
        "Chapter 16",
        "Chapter 53",
        "Chapter 25",
        "Chapter 29",
        "Indu",
        "Jaya",
        "Vyaya",
        "Pradakṣiṇā"
    ]
    for cit in citations_to_check:
        assert cit in all_text, f"Missing expected citation or keyword: {cit}"
        print(f"Citation verified: {cit}")

    print("\nALL CHECKS PASSED PERFECTLY!")

if __name__ == "__main__":
    validate()
