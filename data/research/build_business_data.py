# -*- coding: utf-8 -*-
"""
Module: build_business_data.py
Generates Tool 3: Business / Company Name Numerology research specification.
Tagged: Modern Practitioner Methodology
"""

HISTORICAL_CLARIFICATION = (
    "Modern practitioner methodology; not derived from ancient Vedic or classical antique texts, "
    "which predated telecommunications, automobiles, and modern corporate incorporation."
)

DISCLAIMER_TEXT = "This is a traditional esoteric belief system, not an empirical or scientific claim."

def get_business_name_tool():
    # Chaldean alphabet table for business names (1 to 8 only)
    chaldean_alphabet_table = {
        "1": ["A", "I", "J", "Q", "Y"],
        "2": ["B", "K", "R"],
        "3": ["C", "G", "L", "S"],
        "4": ["D", "M", "T"],
        "5": ["E", "H", "N", "X"],
        "6": ["U", "V", "W"],
        "7": ["O", "Z"],
        "8": ["F", "P"]
    }

    # Pythagorean alphabet table for business names (1 to 9)
    pythagorean_alphabet_table = {
        "1": ["A", "J", "S"],
        "2": ["B", "K", "T"],
        "3": ["C", "L", "U"],
        "4": ["D", "M", "V"],
        "5": ["E", "N", "W"],
        "6": ["F", "O", "X"],
        "7": ["G", "P", "Y"],
        "8": ["H", "Q", "Z"],
        "9": ["I", "R"]
    }

    return {
        "tool_id": "business-name",
        "tool_name": "Business / Company Name Numerology",
        "system": "Modern Practitioner Methodology",
        "tradition_full_name": "Modern Practitioner Numerology (Corporate Brand & Nomenclature Esotericism)",
        "historical_clarification": HISTORICAL_CLARIFICATION,
        "disclaimer": DISCLAIMER_TEXT,
        "source": {
            "title": "Corporate Brand Numerology and Commercial Nomenclature Vibrations",
            "author": "Consensus of Modern Corporate Brand Numerologists and Commercial Analysts",
            "edition_or_chapter": "Commercial Nomenclature Compound Vibrations, Market Sector Symbology, and Incorporation Synchronicity",
            "historical_derivation_note": HISTORICAL_CLARIFICATION
        },
        "philosophical_basis": (
            "Modern corporate brand numerology emerged during the late 20th-century expansion of global capitalism, "
            "corporate branding, and trademark registration. Ancient civilizational texts contained no concept of limited liability "
            "corporations, joint-stock entities, registered trademarks, or stock ticker symbols. Modern practitioners synthesized "
            "classical phonetic tables (predominantly the Chaldean compound system 10-52 popularized by Cheiro, alongside Western "
            "Pythagorean expression methods) into a specialized methodology for designing brand names that attract capital, harmonize "
            "with industry sectors, and resonate auspiciously with the company's founders."
        ),
        "single_system_purity_protocol": (
            "CRITICAL PROTOCOL: In accordance with traditional purity rules, this tool supports two distinct calculation modes "
            "that must NEVER be blended in a single calculation: "
            "1) Chaldean Commercial Mode: Employs the 1-8 letter table (excluding 9) and evaluates compound sums (10-52) "
            "strictly according to Cheiro's classical esoteric compound interpretations; "
            "2) Pythagorean Corporate Mode: Employs the 1-9 letter table and Western Master Numbers (11, 22, 33). "
            "The calculation engine enforces single-system execution per request."
        ),
        "chaldean_alphabet_table": chaldean_alphabet_table,
        "pythagorean_alphabet_table": pythagorean_alphabet_table,
        "inputs": [
            {
                "field_name": "brand_name",
                "data_type": "string",
                "format": "Public trade or brand name (e.g., 'Vastu Divine', 'Apple', 'Reliance', 'Tata Motors')",
                "description": "The primary public-facing brand, trade, or consumer name used in marketing and signage.",
                "required": True
            },
            {
                "field_name": "legal_entity_name",
                "data_type": "string",
                "format": "Full legal registered corporate name (e.g., 'Vastu Divine Consultancy Private Limited')",
                "description": "The full statutory incorporated name including legal entity suffixes (Pvt Ltd, LLC, Inc, Corp).",
                "required": False
            },
            {
                "field_name": "industry_sector",
                "data_type": "string",
                "format": "enum: [tech_innovation_ai, banking_finance_wealth, education_media_publishing, real_estate_heavy_industry, hospitality_luxury_fashion, healthcare_pharma_wellness, trading_ecommerce_logistics, legal_consulting_advisory, non_profit_humanitarian]",
                "description": "The primary industrial and commercial domain in which the enterprise operates.",
                "required": True
            },
            {
                "field_name": "founder_birth_day",
                "data_type": "integer",
                "format": "Day of birth (1 to 31)",
                "description": "The calendar day of birth of the primary founder, CEO, or principal equity owner (1-9).",
                "required": False
            },
            {
                "field_name": "founder_life_path",
                "data_type": "integer",
                "format": "Reduced Life Path (1 to 9, or Master 11/22/33)",
                "description": "The reduced life path of the founder or primary decision-maker.",
                "required": False
            },
            {
                "field_name": "system_mode",
                "data_type": "string",
                "format": "enum: [Chaldean, Pythagorean]",
                "default": "Chaldean",
                "description": "The calculation system selected. Modern practitioners predominantly prefer Chaldean for commercial branding due to its rich 10-52 compound vibration lore.",
                "required": False
            }
        ],
        "calculation_steps": [
            {
                "step_number": 1,
                "step_name": "Text Cleansing & Word Segmentation",
                "description": (
                    "Sanitize the brand string by stripping punctuation, ampersands, numbers, and diacritics. "
                    "Convert all characters to uppercase. Segment the brand into constituent words: W_1, W_2, ..., W_k."
                ),
                "formula": "Words = Clean(brand_name).split(' ')"
            },
            {
                "step_number": 2,
                "step_name": "Word-Level Numerical Breakdown",
                "description": (
                    "For each word W_k, map each letter c_{j,k} to its numeric value according to the chosen system table "
                    "(Chaldean 1-8 or Pythagorean 1-9). Sum the letter values to determine the Word Compound Sum (S_{W_k}) "
                    "and reduce each word to its single-digit Word Root (R_{W_k})."
                ),
                "formula": "S_{W_k} = sum(Table[c_{j,k}]); R_{W_k} = Reduce(S_{W_k})"
            },
            {
                "step_number": 3,
                "step_name": "Total Brand Compound Sum (S_brand)",
                "description": (
                    "Sum all constituent word compounds: S_brand = sum(S_{W_k}). "
                    "In Chaldean mode, this compound number is critically evaluated against the 10-52 occult interpretations "
                    "to determine its inherent commercial destiny, financial fortune, or legal vulnerability."
                ),
                "formula": "S_brand = sum(S_{W_k} for k in 1..N_words)"
            },
            {
                "step_number": 4,
                "step_name": "Brand Root Number Reduction (R_brand)",
                "description": (
                    "Reduce S_brand to its single-digit root (1-9). "
                    "If Pythagorean mode is selected and S_brand equals 11, 22, or 33, preserve as a Master Brand Vibration."
                ),
                "formula": "Chaldean: R_brand = (S_brand - 1) % 9 + 1; Pythagorean: Preserve {11, 22, 33} else (S_brand - 1) % 9 + 1"
            },
            {
                "step_number": 5,
                "step_name": "Industry Sector Harmonic Compatibility Assessment",
                "description": (
                    "Evaluate whether R_brand naturally governs or harmonizes with the chosen industry sector. "
                    "Compare against the practitioner industry-resonance matrix: "
                    "Number 1 for tech/innovation; 3 for media/education; 5 for trade/commerce; 6 for hospitality/luxury; 8 for real estate/heavy industry."
                ),
                "formula": "Sector_Fit = Industry_Matrix[R_brand][industry_sector] -> Categorized as Natural, Supportive, Neutral, or Discordant"
            },
            {
                "step_number": 6,
                "step_name": "Founder Synchronization & Planetary Concordance",
                "description": (
                    "Cross-tabulate R_brand with the founder's Birth Number (B_founder) and Life Path Number (LP_founder). "
                    "If R_brand is an enemy of the founder (e.g. Brand 8 with Founder 1), the founder may suffer burnout, executive alienation, "
                    "or legal friction with board members. If friendly (e.g. Brand 1 with Founder 2, 3, or 9), the founder naturally embodies the brand's mission."
                ),
                "formula": "Founder_Sync = Mitra_Shatru_Matrix[B_founder][R_brand]"
            },
            {
                "step_number": 7,
                "step_name": "Composite Commercial Viability Index & Spelling Optimization",
                "description": (
                    "Generate an overall commercial brand score (0 to 100%) incorporating compound auspiciousness (40%), "
                    "industry alignment (35%), and founder synchronicity (25%). "
                    "If the brand possesses an afflicted compound (e.g., 18, 26, 28, 43, 44), provide practitioner spelling adjustments "
                    "(e.g. vowel elongation, doubling a consonant, or suffix modification) to transition the compound into a royal commercial number (23, 37, 41, 45)."
                ),
                "formula": "Commercial_Score = 0.40 * S_compound + 0.35 * S_industry + 0.25 * S_founder"
            }
        ],
        "industry_sector_matrix": {
            "1": {
                "root": 1,
                "ruling_planet": "Sun (Surya)",
                "archetype": "The Pioneer, Sovereign, Disruptor, Market Leader",
                "optimal_sectors": [
                    "tech_innovation_ai",
                    "pioneering_startups",
                    "executive_consulting",
                    "government_contracting",
                    "defense_aerospace"
                ],
                "sector_resonance_notes": "Ideal for companies that aim to be first-to-market, category creators, or premium authoritative brands.",
                "brand_vibe": "Prestige, leadership, innovation, uncompromising excellence, singular authority."
            },
            "2": {
                "root": 2,
                "ruling_planet": "Moon (Chandra)",
                "archetype": "The Collaborator, Caregiver, Mediator, Fluid Channel",
                "optimal_sectors": [
                    "healthcare_pharma_wellness",
                    "childcare_parenting",
                    "dairy_food_beverage",
                    "human_resources_mediation",
                    "cooperative_platforms"
                ],
                "sector_resonance_notes": "Ideal for service-oriented, nurturing, or community-driven businesses that thrive on interpersonal empathy.",
                "brand_vibe": "Gentle, welcoming, trustworthy, nurturing, relationship-focused."
            },
            "3": {
                "root": 3,
                "ruling_planet": "Jupiter (Guru)",
                "archetype": "The Sage, Educator, Publisher, Creative Visionary",
                "optimal_sectors": [
                    "education_media_publishing",
                    "legal_consulting_advisory",
                    "advertising_creative_arts",
                    "training_academies",
                    "higher_learning"
                ],
                "sector_resonance_notes": "Ideal for enterprises centered on knowledge transfer, legal authority, scholarly prestige, and media storytelling.",
                "brand_vibe": "Authoritative, educational, inspiring, expansive, intellectually distinguished."
            },
            "4": {
                "root": 4,
                "ruling_planet": "Rahu",
                "archetype": "The Architect, Systems Engineer, Unconventional Strategist",
                "optimal_sectors": [
                    "cybersecurity_infrastructure",
                    "civil_engineering_construction",
                    "fintech_disruption",
                    "specialized_logistics",
                    "data_warehousing"
                ],
                "sector_resonance_notes": "Thrives in complex, highly technical, and foundational systemic industries; requires meticulous regulatory compliance.",
                "brand_vibe": "Robust, structural, secure, cutting-edge, uncompromisingly methodical."
            },
            "5": {
                "root": 5,
                "ruling_planet": "Mercury (Budha)",
                "archetype": "The Merchant, Networker, Swift Communicator, Multi-Platform Trader",
                "optimal_sectors": [
                    "trading_ecommerce_logistics",
                    "marketing_public_relations",
                    "travel_tourism_aviation",
                    "fast_moving_consumer_goods",
                    "telecommunications_media"
                ],
                "sector_resonance_notes": "The universally celebrated commercial number; excels in high transaction volume, global trade, and agile marketing.",
                "brand_vibe": "Fast, versatile, modern, exciting, commercially magnetic, customer-friendly."
            },
            "6": {
                "root": 6,
                "ruling_planet": "Venus (Shukra)",
                "archetype": "The Connoisseur, Esthete, Gracious Host, Luxury Creator",
                "optimal_sectors": [
                    "hospitality_luxury_fashion",
                    "interior_design_architecture",
                    "cosmetics_beauty_wellness",
                    "fine_dining_restaurants",
                    "jewelry_gemstones",
                    "entertainment_arts"
                ],
                "sector_resonance_notes": "The supreme vibration for luxury, high-ticket consumer lifestyle, hospitality, and sensory indulgence.",
                "brand_vibe": "Glamorous, opulent, harmonious, elegant, premium, deeply appealing."
            },
            "7": {
                "root": 7,
                "ruling_planet": "Ketu",
                "archetype": "The Researcher, Mystic, Bio-Scientist, Specialized Analyst",
                "optimal_sectors": [
                    "scientific_biotech_rd",
                    "pharmaceutical_discovery",
                    "spiritual_esoteric_platforms",
                    "specialized_audit_forensics",
                    "independent_think_tanks"
                ],
                "sector_resonance_notes": "Best suited for specialized research institutes, niche intellectual services, and consciousness platforms.",
                "brand_vibe": "Mysterious, profound, elite research pedigree, solitary excellence, visionary insight."
            },
            "8": {
                "root": 8,
                "ruling_planet": "Saturn (Shani)",
                "archetype": "The Master Builder, Corporate Baron, Institutional Trustee",
                "optimal_sectors": [
                    "real_estate_heavy_industry",
                    "banking_finance_wealth",
                    "mining_metals_manufacturing",
                    "private_equity_infrastructure",
                    "legal_institutional_governance"
                ],
                "sector_resonance_notes": "The ultimate corporate titan vibration; built for generational wealth, massive physical assets, and heavy industry.",
                "brand_vibe": "Monumental, unyielding, institutional, disciplined, enduring, immensely solid."
            },
            "9": {
                "root": 9,
                "ruling_planet": "Mars (Mangala)",
                "archetype": "The Champion, Protector, Dynamic Innovator, Humanitarian Crusader",
                "optimal_sectors": [
                    "non_profit_humanitarian",
                    "sports_fitness_apparel",
                    "defense_security_tactical",
                    "emergency_medicine_disaster_relief",
                    "heavy_machinery"
                ],
                "sector_resonance_notes": "Excels in mission-driven global causes, physical fitness, sports brands, and dynamic defense enterprises.",
                "brand_vibe": "Courageous, urgent, passionate, protective, globally transformative."
            },
            "11": {
                "root": 11,
                "ruling_planet": "Master Spiritual Octave (Pythagorean)",
                "archetype": "The Illumined Visionary, Intuitive Catalyst",
                "optimal_sectors": [
                    "conscious_media_platforms",
                    "transformational_education",
                    "spiritual_wellness_networks",
                    "inspirational_brands"
                ],
                "sector_resonance_notes": "Preserved in Pythagorean mode; represents brands that inspire higher human consciousness.",
                "brand_vibe": "Visionary, uplifting, illuminating, transcendent."
            },
            "22": {
                "root": 22,
                "ruling_planet": "Master Architect Octave (Pythagorean)",
                "archetype": "The Master Builder of Global Civilization",
                "optimal_sectors": [
                    "transnational_infrastructure",
                    "global_engineering_consortiums",
                    "international_foundations",
                    "green_energy_grids"
                ],
                "sector_resonance_notes": "Preserved in Pythagorean mode; designed for institutions building generational global infrastructure.",
                "brand_vibe": "Colossal scale, universal utility, historic impact, unassailable mastery."
            },
            "33": {
                "root": 33,
                "ruling_planet": "Master Healing Octave (Pythagorean)",
                "archetype": "The Cosmic Healer and Universal Philanthropist",
                "optimal_sectors": [
                    "global_health_initiatives",
                    "world_peace_foundations",
                    "humanitarian_food_networks",
                    "universal_cultural_heritage"
                ],
                "sector_resonance_notes": "Preserved in Pythagorean mode; represents the pinnacle of selfless global service and cultural preservation.",
                "brand_vibe": "Universal love, unconditional service, spiritual refuge, transcendent compassion."
            }
        },
        "chaldean_commercial_compound_matrix": {
            "golden_commercial_compounds": {
                "15": {
                    "compound": 15,
                    "root": 6,
                    "name": "The Magician of the Pentacle",
                    "commercial_destiny": "Supreme wealth attractor; bestows verbal eloquence, lucrative commercial deals, affluent patrons, and artistic magnetism.",
                    "suitability": "Superb for luxury fashion, hospitality, jewelry, media agencies, and high-end consumer retail."
                },
                "19": {
                    "compound": 19,
                    "root": 1,
                    "name": "The Prince of Heaven",
                    "commercial_destiny": "Regarded by Cheiro as one of the most fortunate vibrations in existence. Symbolizes solar triumph, unshakeable public honor, expanding enterprise, and wealth accumulation.",
                    "suitability": "Universal commercial excellence; ideal for flagship tech firms, pioneer brands, and market leaders."
                },
                "23": {
                    "compound": 23,
                    "root": 5,
                    "name": "The Royal Star of the Lion",
                    "commercial_destiny": "A promise of success, assistance from influential authorities, and protection against commercial adversaries. Highly favored by corporate strategists.",
                    "suitability": "Outstanding for investment banking, venture capital, international trade, and media conglomerates."
                },
                "24": {
                    "compound": 24,
                    "root": 6,
                    "name": "The Fortunate Alliance",
                    "commercial_destiny": "Brings fruitful partnerships with affluent backers; guarantees steady commercial growth, public goodwill, and protection from financial ruin.",
                    "suitability": "Ideal for hospitality chains, luxury goods, design consultancies, and family enterprises."
                },
                "33": {
                    "compound": 33,
                    "root": 6,
                    "name": "The Creative Master Alliance",
                    "commercial_destiny": "In Chaldean compound lore, identical in fortune to 24 but intensified in creative scale; guarantees influential patrons, public affection, and wealth generation.",
                    "suitability": "Ideal for entertainment studios, fine dining groups, architectural firms, and luxury lifestyle brands."
                },
                "37": {
                    "compound": 37,
                    "root": 1,
                    "name": "The Royal Seal of Concord",
                    "commercial_destiny": "Indicates good partnerships in business, genuine friendships, high commercial honor, and domestic and corporate peace.",
                    "suitability": "Excellent for co-founded startups, strategic joint ventures, and advisory partnerships."
                },
                "41": {
                    "compound": 41,
                    "root": 5,
                    "name": "The Dynamic Commercial Mind",
                    "commercial_destiny": "A vibration of intellectual speed, prolific commercial ideation, high-speed trading, and profitable media resonance.",
                    "suitability": "Top recommendation for tech startups, e-commerce platforms, digital marketing agencies, and fintech."
                },
                "42": {
                    "compound": 42,
                    "root": 6,
                    "name": "The Venusian Manor",
                    "commercial_destiny": "Endows the brand with gentle commercial grace, enduring customer loyalty, domestic elegance, and secure financial profits.",
                    "suitability": "Outstanding for boutique hotels, real estate brokerages, home decor brands, and gourmet food chains."
                },
                "45": {
                    "compound": 45,
                    "root": 9,
                    "name": "The Strategic Commander",
                    "commercial_destiny": "Combines Mercury's intellectual commerce with Mars's unyielding drive; commands respect, wins competitive public tenders, and overcomes rivals.",
                    "suitability": "Ideal for defense contracting, high-performance tech hardware, civil engineering, and corporate law firms."
                },
                "46": {
                    "compound": 46,
                    "root": 1,
                    "name": "The Crown of Acclaim",
                    "commercial_destiny": "Indicates prominent public distinction, high leadership status, and steady financial expansion through trustworthy business conduct.",
                    "suitability": "Superb for enterprise SaaS, corporate holding entities, and institutional wealth managers."
                },
                "51": {
                    "compound": 51,
                    "root": 6,
                    "name": "The Warrior Sovereign",
                    "commercial_destiny": "Brings tremendous executive power, sudden commercial breakthroughs, and high-velocity expansion; commands vast corporate armies.",
                    "suitability": "Ideal for industrial manufacturers, global logistics giants, and high-growth venture scale-ups."
                }
            },
            "warning_commercial_compounds": {
                "18": {
                    "compound": 18,
                    "root": 9,
                    "name": "Spiritual Bitterness & Deception",
                    "commercial_destiny": "Severely warned against by Cheiro; indicates bitter internal boardroom disputes, partner treachery, sudden litigation, and reputational smear campaigns.",
                    "suitability": "Highly discouraged for commercial enterprises."
                },
                "26": {
                    "compound": 26,
                    "root": 8,
                    "name": "The Partnership Trap",
                    "commercial_destiny": "Brings heavy disaster through unreliable partnerships, ruinous speculation, unexpected audit penalties, and legal entanglements.",
                    "suitability": "Discouraged for joint ventures and consumer brands."
                },
                "28": {
                    "compound": 28,
                    "root": 1,
                    "name": "The Trust Betrayed",
                    "commercial_destiny": "Promises great commercial beginnings that collapse through unfulfilled partner commitments, broken contracts, and sudden capital flight.",
                    "suitability": "Discouraged unless backed by ironclad legal covenants."
                },
                "43": {
                    "compound": 43,
                    "root": 7,
                    "name": "The Revolutionary Disruption",
                    "commercial_destiny": "Indicates sudden organizational upheaval, strike actions, regulatory bans, and revolutionary commercial disruption.",
                    "suitability": "Unstable for mainstream commercial business."
                },
                "44": {
                    "compound": 44,
                    "root": 8,
                    "name": "The Double Heavy Weight",
                    "commercial_destiny": "Double 4 vibration reducing to 8; represents immense physical and financial drag, chronic bureaucratic gridlock, and exhausting operational burdens.",
                    "suitability": "Avoid for startups and commercial consumer brands."
                }
            }
        },
        "founder_alignment_protocol": {
            "evaluation_method": (
                "Cross-check R_brand against Founder's Birth Number (B_founder). "
                "1) Harmonious: Founder feels natural passion, charismatic resonance, and effortless executive flow. "
                "2) Neutral: Functional relationship; commercial transactions are solid, though founder may view it purely as a job. "
                "3) Conflicting: Founder experiences chronic fatigue, cognitive dissonance, boardroom opposition, or imposter syndrome. "
                "Specific Critical Enmities: Founder 1 with Brand 8; Founder 2 with Brand 4 or 8; Founder 8 with Brand 1 or 9; Founder 9 with Brand 4 or 8."
            )
        },
        "spelling_optimization_framework": {
            "practitioner_technique": (
                "When an existing or proposed brand name sums to a difficult compound (e.g. 26 or 28), modern practitioners "
                "do not necessarily discard the brand phonetics. Instead, they apply micro-adjustments: "
                "1) Vowel addition or alteration (e.g. converting an 'I' to a 'Y', or adding an 'E' at the end); "
                "2) Consonant doubling (e.g. 'Tech' -> 'Tekk' or 'Digi' -> 'Digii'); "
                "3) Strategic prefix or suffix appending (e.g. appending 'Global', 'Labs', 'IQ', 'One'). "
                "The goal is to shift the total Chaldean compound into royal vibrations: 19, 23, 33, 37, 41, or 45."
            )
        },
        "output_schema": {
            "brand_name": "string",
            "system_mode": "string (Chaldean | Pythagorean)",
            "word_breakdown": [
                {
                    "word": "string",
                    "letter_values": "array of integers",
                    "word_sum": "integer",
                    "word_root": "integer"
                }
            ],
            "total_brand_compound_sum": "integer",
            "total_brand_root": "integer (1-9, or Master 11/22/33)",
            "compound_assessment": {
                "compound_name": "string",
                "commercial_destiny_summary": "string",
                "auspiciousness_tier": "string (Golden Royal | Favorable | Neutral | High Risk)"
            },
            "industry_sector_fit": {
                "sector_name": "string",
                "fit_tier": "string (Natural Leader | Highly Supportive | Neutral | Discordant)",
                "strategic_recommendations": "string"
            },
            "founder_synchronicity": {
                "founder_birth_number": "integer",
                "alignment_status": "string (Harmonious | Neutral | Inimical)",
                "practical_notes": "string"
            },
            "composite_commercial_score": "integer (0-100%)",
            "spelling_optimization_suggestions": "array of strings",
            "disclaimer": DISCLAIMER_TEXT
        }
    }

if __name__ == "__main__":
    tool = get_business_name_tool()
    print(f"Tool {tool['tool_id']} compiled successfully.")
