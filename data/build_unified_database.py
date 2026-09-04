# -*- coding: utf-8 -*-
"""
Compiles the unified research database for Vastu Divine (वD / VASTU डिवाइन)
Schema per tool:
Input -> Formula -> Rule -> Interpretation -> Book -> Chapter/Verse -> Tradition -> Output
"""

import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

VASTU_FILES = [
    r"D:\builds\data\research\vastu_1_plot_water.json",
    r"D:\builds\data\research\vastu_2_facing_maindoor.json",
    r"D:\builds\data\research\vastu_3_house_staircase.json",
    r"D:\builds\data\research\vastu_4_kitchen_puja.json",
    r"D:\builds\data\research\vastu_5_bedroom_toilet.json"
]

NUMEROLOGY_FILES = [
    r"D:\builds\data\research\numerology_1_chaldean.json",
    r"D:\builds\data\research\numerology_2_pythagorean.json",
    r"D:\builds\data\research\numerology_3_modern.json"
]

def compile_database():
    tools_list = []
    seen_ids = set()

    # Process Vastu Tools
    for path in VASTU_FILES:
        if not os.path.exists(path):
            print(f"Warning: {path} not found")
            continue
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
            items = data if isinstance(data, list) else data.get("tools", [data])
            for t in items:
                tid = t.get("tool_id")
                if tid and tid not in seen_ids:
                    seen_ids.add(tid)
                    entry = {
                        "tool_id": tid,
                        "tool_name": t.get("tool_name"),
                        "family": "Classical Vastu (10)",
                        "tradition": t.get("tradition", "Classical Vedic Vastu"),
                        "book": t.get("source", {}).get("text", t.get("source", {}).get("title", "Mayamata / Bṛhat Saṃhitā / Mānasāra")),
                        "chapter_verse": f"{t.get('source', {}).get('chapter', '')} {t.get('source', {}).get('verse', '')}".strip(),
                        "input": t.get("inputs", []),
                        "formula": t.get("mathematical_formula", t.get("calculation_logic", "Vāstupuruṣamaṇḍala Pada-vinyāsa and Elemental Vector Projection")),
                        "rule": t.get("rules_matrix", t.get("rules", [])),
                        "interpretation": t.get("interpretation", t.get("interpretation_matrix", {})),
                        "variation_note": t.get("variation_note", "Traditional architectural philosophy; regional texts, climate variations, and sthapatya traditions prescribe contextual adaptations."),
                        "output": {
                            "fields": ["element_name", "assessment", "tradition", "source_reference", "plain_rule", "variation_note"],
                            "sample_assessment": "Auspicious"
                        }
                    }
                    tools_list.append(entry)

    # Process Numerology Tools
    for path in NUMEROLOGY_FILES:
        if not os.path.exists(path):
            print(f"Warning: {path} not found")
            continue
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
            items = data if isinstance(data, list) else data.get("tools", [data])
            for t in items:
                tid = t.get("tool_id")
                if tid and tid not in seen_ids:
                    seen_ids.add(tid)
                    sys_name = t.get("system", t.get("tradition_full_name", "Numerology"))
                    is_modern = "Modern" in sys_name

                    # Resolve Inputs
                    inp = t.get("inputs", t.get("input_parameters", []))
                    if not inp:
                        if tid in ["name-number", "name-analysis"]:
                            inp = [{"field_name": "calling_name", "data_type": "string", "description": "Primary calling name or legal name to analyze"}]
                        elif tid == "life-path":
                            inp = [{"field_name": "date_of_birth", "data_type": "date", "format": "DD/MM/YYYY", "description": "Full calendar date of birth"}]
                        elif tid == "birth-number":
                            inp = [{"field_name": "day_of_birth", "data_type": "integer", "range": [1, 31], "description": "Calendar day of birth"}]
                        elif tid == "destiny-number":
                            inp = [{"field_name": "full_birth_name", "data_type": "string", "description": "Full birth name as registered"}]
                        elif tid == "lucky-number":
                            inp = [{"field_name": "date_of_birth", "data_type": "date", "format": "DD/MM/YYYY", "description": "Full calendar date of birth"}]

                    # Resolve Rules
                    rule = t.get("rules", t.get("planetary_lordship_matrix", []))
                    if not rule:
                        if tid == "name-number":
                            rule = {
                                "alphabet_values_1_to_8": data.get("alphabet_values", {}),
                                "sacred_nine_exclusion_rule": data.get("sacred_nine_exclusion_rule", {}),
                                "single_roots_planetary_matrix": data.get("single_roots_planetary_matrix", {}),
                                "compound_numbers_10_to_52": data.get("compound_numbers_10_to_52", {})
                            }
                        elif tid == "name-analysis":
                            rule = {
                                "alphabet_values_1_to_8": data.get("alphabet_values", {}),
                                "sacred_nine_exclusion_rule": data.get("sacred_nine_exclusion_rule", {}),
                                "vowel_consonant_division": "Vowels constitute Heart's Desire / Soul Urge; Consonants constitute Outer Expression / Personality."
                            }
                        elif tid == "life-path":
                            rule = {
                                "master_number_rules": t.get("master_number_rules", []),
                                "calculation_examples": t.get("calculation_examples", [])
                            }
                        elif tid == "birth-number":
                            rule = {
                                "master_number_rules": t.get("master_number_rules", []),
                                "full_31_days_catalog": t.get("full_31_days_catalog", {})
                            }
                        elif tid == "destiny-number":
                            rule = {
                                "pythagorean_alphabet_table": t.get("pythagorean_alphabet_table", {}),
                                "master_number_rules": t.get("master_number_rules", [])
                            }
                        elif tid == "lucky-number":
                            rule = {
                                "harmonic_triads": t.get("harmonic_triads_definition", {}),
                                "compatibility_matrix": t.get("harmonic_compatibility_matrix", {})
                            }
                        elif tid == "mobile-number":
                            rule = {
                                "mitra_shatru_chakra": t.get("mitra_shatru_chakra", {}),
                                "critical_conflicting_pairs": t.get("critical_conflicting_pairs", []),
                                "digit_frequency_rules": t.get("digit_frequency_rules", {})
                            }
                        elif tid == "vehicle-number":
                            rule = {
                                "kinetic_friction_matrix": t.get("kinetic_friction_matrix", {}),
                                "driver_concordance_table": t.get("driver_concordance_table", {}),
                                "color_vibration_guidelines": t.get("color_vibration_guidelines", {})
                            }
                        elif tid == "business-name":
                            rule = {
                                "industry_sector_matrix": t.get("industry_sector_matrix", {}),
                                "commercial_compound_matrix": t.get("chaldean_commercial_compound_matrix", {}),
                                "founder_alignment": t.get("founder_alignment_protocol", {})
                            }
                        elif tid == "compatibility-analyzer":
                            rule = {
                                "compatibility_matrix_9x9": t.get("compatibility_matrix_9x9", {}),
                                "master_numbers_rules": t.get("master_numbers_compatibility_rules", {}),
                                "friction_hotspots": t.get("critical_friction_hotspots", [])
                            }

                    entry = {
                        "tool_id": tid,
                        "tool_name": t.get("tool_name"),
                        "family": "Numerology (10)",
                        "tradition": sys_name,
                        "book": t.get("source", {}).get("title", "The Book of Numbers / The Complete Book of Numerology"),
                        "chapter_verse": t.get("source", {}).get("edition_or_chapter", ""),
                        "input": inp,
                        "formula": t.get("calculation_steps", t.get("mathematical_formula", t.get("mathematical_formulation", []))),
                        "rule": rule,
                        "interpretation": t.get("interpretation_matrix", {}),
                        "is_modern_practitioner": is_modern,
                        "disclaimer": t.get("disclaimer", "This is a traditional esoteric belief system, not an empirical or scientific claim."),
                        "output": {
                            "fields": ["element_name", "assessment", "system_named", "source_reference", "plain_rule", "disclaimer"],
                            "sample_assessment": "Harmonic"
                        }
                    }
                    tools_list.append(entry)

    result_db = {
        "title": "Vastu Divine Unified Research Database",
        "brand": "Vastu Divine (वD / VASTU डिवाइन)",
        "palette": {
            "maroon": "#6D0A1D",
            "gold": "#B3791E",
            "white": "#FFFFFF",
            "near_black": "#141414"
        },
        "total_tools": len(tools_list),
        "tools": tools_list
    }

    out_file = r"D:\builds\data\research_database.json"
    with open(out_file, "w", encoding="utf-8") as out:
        json.dump(result_db, out, indent=2, ensure_ascii=False)

    print(f"Compiled {len(tools_list)} tools into {out_file}")
    for idx, tool in enumerate(tools_list, 1):
        print(f"  {idx:2d}. [{tool['family']}] {tool['tool_id']} - {tool['tradition']} ({tool['book']})")

if __name__ == "__main__":
    compile_database()
