import json
import sys

def validate():
    path = r"D:\builds\data\research\numerology_2_pythagorean.json"
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    print("JSON successfully loaded.")
    tools = data.get("tools", [])
    print(f"Number of tools: {len(tools)}")
    assert len(tools) == 4, "Expected 4 tools"

    expected_tool_ids = ["life-path", "birth-number", "destiny-number", "lucky-number"]
    found_ids = [t["tool_id"] for t in tools]
    print(f"Tool IDs found: {found_ids}")
    assert found_ids == expected_tool_ids, f"Expected {expected_tool_ids}, got {found_ids}"

    disclaimer_text = "This is a traditional esoteric belief system, not an empirical or scientific claim."

    for t in tools:
        tid = t["tool_id"]
        print(f"\nChecking tool: {tid}")
        assert t["system"] == "Pythagorean", f"Invalid system in {tid}"
        assert t["disclaimer"] == disclaimer_text, f"Disclaimer mismatch in {tid}"
        assert "chaldean" in t["chaldean_exclusion_statement"].lower(), f"Missing chaldean exclusion in {tid}"
        assert "source" in t, f"Missing source in {tid}"
        assert "calculation_steps" in t and len(t["calculation_steps"]) > 0, f"Missing calc steps in {tid}"
        assert "interpretation_matrix" in t, f"Missing interpretation matrix in {tid}"
        
        matrix = t["interpretation_matrix"]
        required_keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "22", "33"]
        for k in required_keys:
            assert k in matrix, f"Missing key {k} in interpretation matrix of {tid}"
        print(f"Tool {tid} passed all basic checks with interpretation keys: {list(matrix.keys())}")

    # Check lucky number harmonic matrix
    lucky_tool = data["tools_by_id"]["lucky-number"]
    assert "harmonic_compatibility_matrix" in lucky_tool, "Missing harmonic compatibility matrix in lucky-number"
    h_matrix = lucky_tool["harmonic_compatibility_matrix"]
    for k in ["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "22", "33"]:
        assert k in h_matrix, f"Missing key {k} in harmonic matrix"
        assert "consonant_lucky_numbers" in h_matrix[k], f"Missing consonant_lucky_numbers in {k}"
        assert "discordant_tension_numbers" in h_matrix[k], f"Missing discordant_tension_numbers in {k}"
    print("Harmonic compatibility matrix validated successfully.")

    # Check alphabet table
    destiny_tool = data["tools_by_id"]["destiny-number"]
    assert "pythagorean_alphabet_table" in destiny_tool
    table = destiny_tool["pythagorean_alphabet_table"]
    assert table["1"] == ["A", "J", "S"]
    assert table["9"] == ["I", "R"]
    print("Pythagorean alphabet table validated successfully.")

    print("\nALL CHECKS PASSED!")

if __name__ == "__main__":
    validate()
