# -*- coding: utf-8 -*-
"""
Module: build_compatibility_data.py
Generates Tool 4: Name + DOB Compatibility (Synchronicity Analysis) research specification.
Tagged: Modern Practitioner Methodology
"""

HISTORICAL_CLARIFICATION = (
    "Modern practitioner methodology; not derived from ancient Vedic or classical antique texts, "
    "which predated telecommunications, automobiles, and modern corporate incorporation."
)

DISCLAIMER_TEXT = "This is a traditional esoteric belief system, not an empirical or scientific claim."

def get_compatibility_tool():
    # 9x9 Compatibility Matrix for Life Path and Core Vibrations
    matrix_9x9 = {
        "1": {
            "1": {"tier": "Supportive / Competitive", "score": 75, "nature": "Double Sun; immense visionary drive, mutual ambition, high mutual respect. Risk: Ego clashes, neither partner willing to yield leadership."},
            "2": {"tier": "Natural Harmonious", "score": 92, "nature": "Sun and Moon; classical archetypal polarity. 1 provides direction, protection, and drive; 2 provides emotional nurturing, diplomacy, and graceful support."},
            "3": {"tier": "Natural Harmonious", "score": 90, "nature": "Sun and Jupiter; radiant expansiveness, social charm, creative optimism, shared enthusiasm, mutual encouragement."},
            "4": {"tier": "Challenging / Frictional", "score": 52, "nature": "Sun and Rahu; 1 prefers swift visionary action, 4 insists on meticulous caution and rigid method. Frustrating pacing discrepancies."},
            "5": {"tier": "Supportive / Dynamic", "score": 86, "nature": "Sun and Mercury; dynamic adventure, intellectual sparkle, travel enthusiasm, shared social curiosity. Highly stimulating."},
            "6": {"tier": "Supportive / Stable", "score": 78, "nature": "Sun and Venus; warm domestic loyalty, shared appreciation for comfort and prestige. Occasional disputes over authority vs affection."},
            "7": {"tier": "Neutral / Introspective", "score": 68, "nature": "Sun and Ketu; deep intellectual respect, but 1's outward public drive can feel overwhelming to 7's solitary contemplative nature."},
            "8": {"tier": "Challenging / Power Struggle", "score": 42, "nature": "CRITICAL FRICTION: Sun and Saturn (Surya-Shani enmity). Constant battle for supremacy, conflicting executive styles, unyielding stubbornness."},
            "9": {"tier": "Natural Harmonious", "score": 94, "nature": "Sun and Mars; high-energy heroic alliance, shared courage, visionary idealism, powerful protective loyalty. Must avoid fiery tempers."}
        },
        "2": {
            "1": {"tier": "Natural Harmonious", "score": 92, "nature": "Classical polarity; protective masculine and nurturing receptive energies in balanced rhythm."},
            "2": {"tier": "Supportive / Sensitive", "score": 76, "nature": "Double Moon; deep emotional empathy and psychic intuition. Risk: Shared moodiness, co-dependency, difficulty making tough executive decisions."},
            "3": {"tier": "Supportive / Cheerful", "score": 84, "nature": "Moon and Jupiter; warm, affectionate, culturally rich union. 3 uplifts 2's melancholy; 2 grounds 3's creative scatter."},
            "4": {"tier": "Supportive / Grounding", "score": 80, "nature": "Moon and Earth/Rahu; 4 provides structural security and stability that soothes 2's anxieties. 2 softens 4's rigidity."},
            "5": {"tier": "Challenging / Restless", "score": 55, "nature": "Moon and Mercury; 5's erratic restless unpredictability triggers 2's fear of abandonment. Pacing and emotional inconsistency."},
            "6": {"tier": "Natural Harmonious", "score": 95, "nature": "Moon and Venus; supreme domestic and romantic harmony. Deep affection, parental devotion, aesthetic home life, unconditional support."},
            "7": {"tier": "Supportive / Intuitive", "score": 78, "nature": "Moon and Ketu; quiet, telepathic, introspective connection. Both value privacy, though communication can occasionally dry up."},
            "8": {"tier": "Challenging / Coldness", "score": 46, "nature": "CRITICAL FRICTION: Moon and Saturn (Vish Yoga). 2 feels emotionally starved or judged by 8's pragmatic detachment; 8 views 2 as overly needy."},
            "9": {"tier": "Neutral / Complex", "score": 64, "nature": "Moon and Mars; intense passion alternating with emotional bruising. 9's fiery bluntness can wound 2's sensitive feelings."}
        },
        "3": {
            "1": {"tier": "Natural Harmonious", "score": 90, "nature": "Creative and executive brilliance; mutual inspiration, active social life, great public presence."},
            "2": {"tier": "Supportive / Cheerful", "score": 84, "nature": "Warm affectionate rapport; creative humor and emotional reassurance."},
            "3": {"tier": "Supportive / Playful", "score": 80, "nature": "Double Jupiter; limitless creativity, social charisma, intellectual banter. Risk: Lack of practical financial discipline and routine follow-through."},
            "4": {"tier": "Challenging / Opposites", "score": 50, "nature": "Jupiter and Rahu/Earth; 3 lives in visionary spontaneity, 4 lives in structured routine. Constant irritation over schedules and spending."},
            "5": {"tier": "Natural Harmonious", "score": 92, "nature": "Jupiter and Mercury; the ultimate social and intellectual duo. Prolific conversation, travel, humor, shared projects, boundless curiosity."},
            "6": {"tier": "Supportive / Artistic", "score": 76, "nature": "Jupiter and Venus; rich cultural and artistic synergy. Occasional philosophical tension between 3's free wisdom and 6's domestic rules."},
            "7": {"tier": "Supportive / Philosophical", "score": 82, "nature": "Jupiter and Ketu; deep spiritual and metaphysical exploration. 3 popularizes the wisdom; 7 uncovers esoteric mysteries."},
            "8": {"tier": "Neutral / Commercial", "score": 66, "nature": "Jupiter and Saturn; 8 provides material capital for 3's creative schemes. Functional in business; emotionally sober in romance."},
            "9": {"tier": "Natural Harmonious", "score": 94, "nature": "Jupiter and Mars; profound philosophical and humanitarian alliance. High integrity, boundless enthusiasm, shared noble causes."}
        },
        "4": {
            "1": {"tier": "Challenging / Frictional", "score": 52, "nature": "Clash between rapid solar impulse and methodical structural caution."},
            "2": {"tier": "Supportive / Grounding", "score": 80, "nature": "Practical stability soothing emotional sensitivity; reliable domestic foundation."},
            "3": {"tier": "Challenging / Opposites", "score": 50, "nature": "Creative scatter versus rigid protocol; financial disagreements over frivolous expenditures."},
            "4": {"tier": "Supportive / Solid", "score": 78, "nature": "Double Rahu/4; unshakeable structural fortress, shared work ethic, absolute reliability. Risk: Rigidity, lack of spontaneity and romance."},
            "5": {"tier": "Challenging / Erratic", "score": 48, "nature": "Methodical order versus unpredictable chaos; 4 feels 5 is irresponsible; 5 feels suffocated by 4's predictable routines."},
            "6": {"tier": "Supportive / Harmonious", "score": 84, "nature": "Structure and domestic warmth; 4 builds the house, 6 makes it a beautiful home. Stable, honorable, family-centered."},
            "7": {"tier": "Supportive / Analytical", "score": 82, "nature": "Practical logic meets specialized research; quiet, intellectual, technical collaboration."},
            "8": {"tier": "Supportive / Corporate", "score": 86, "nature": "Rahu and Saturn; powerhouse material and operational alliance. Exceptional in business, real estate, and long-term asset building."},
            "9": {"tier": "Challenging / Explosive", "score": 44, "nature": "CRITICAL FRICTION: Rahu and Mars (Angarak combustion). Ideological battles, short tempers, rigid stubbornness meeting fiery impatience."}
        },
        "5": {
            "1": {"tier": "Supportive / Dynamic", "score": 86, "nature": "High-velocity adventure, intellectual stimulation, and entrepreneurial risk-taking."},
            "2": {"tier": "Challenging / Restless", "score": 55, "nature": "Emotional sensitivity unsettled by perpetual motion and unpredictability."},
            "3": {"tier": "Natural Harmonious", "score": 92, "nature": "Endless laughter, creative brainstorming, high social popularity, travel synergy."},
            "4": {"tier": "Challenging / Erratic", "score": 48, "nature": "Free-spirited wanderer versus disciplined rule-maker; constant friction over structure."},
            "5": {"tier": "Supportive / Electric", "score": 80, "nature": "Double Mercury; exhilarating speed, brilliant conversation, multi-city lifestyle. Risk: Zero grounding, financial instability, restlessness."},
            "6": {"tier": "Supportive / Charming", "score": 74, "nature": "Mercury and Venus; social elegance, entertaining guests, artistic pursuits. 6 desires domestic commitment; 5 seeks personal freedom."},
            "7": {"tier": "Supportive / Intellectual", "score": 85, "nature": "Mental/Intellectual triad resonance; 5 brings worldly information, 7 offers profound philosophical analysis."},
            "8": {"tier": "Supportive / Commercial", "score": 78, "nature": "Mercury and Saturn; 5 conceives rapid commercial deals, 8 executes structural capital management. Great business partnership."},
            "9": {"tier": "Neutral / Active", "score": 68, "nature": "High energy and active pursuits, but 9's righteous intensity can feel burdensome to 5's desire for lighthearted fun."}
        },
        "6": {
            "1": {"tier": "Supportive / Stable", "score": 78, "nature": "Prestige, mutual devotion, refined lifestyle, authoritative yet caring bond."},
            "2": {"tier": "Natural Harmonious", "score": 95, "nature": "Peak romantic and domestic synchronicity; emotional security, caring intimacy, lifelong fidelity."},
            "3": {"tier": "Supportive / Artistic", "score": 76, "nature": "Rich creative lifestyle, social hospitality; minor ideological debates."},
            "4": {"tier": "Supportive / Harmonious", "score": 84, "nature": "Methodical reliability supporting domestic comfort; enduring family dedication."},
            "5": {"tier": "Supportive / Charming", "score": 74, "nature": "Social grace and lively entertaining; requires patience regarding 5's independence."},
            "6": {"tier": "Supportive / Devoted", "score": 82, "nature": "Double Venus; immense love, aesthetic home, selfless dedication to children and family. Risk: Mutual over-protectiveness or marital possessiveness."},
            "7": {"tier": "Neutral / Complex", "score": 62, "nature": "Venus and Ketu; 6 seeks warm affection and physical closeness; 7 requires emotional solitude and spiritual detachment."},
            "8": {"tier": "Supportive / Enduring", "score": 88, "nature": "Venus and Saturn alliance; prosperous, durable marriage and commercial enterprise. 8 protects and finances; 6 enriches and refines."},
            "9": {"tier": "Natural Harmonious", "score": 90, "nature": "Creative and humanitarian triad resonance; 6 nurtures the home, 9 serves the wider world. Passionate, noble, devoted."}
        },
        "7": {
            "1": {"tier": "Neutral / Introspective", "score": 68, "nature": "Intellectual respect; 1 leads outwardly, 7 observes inwardly."},
            "2": {"tier": "Supportive / Intuitive", "score": 78, "nature": "Telepathic, quiet empathy; requires gentle communication to avoid isolation."},
            "3": {"tier": "Supportive / Philosophical", "score": 82, "nature": "Scholarly and esoteric depth; shared quest for truth and meaning."},
            "4": {"tier": "Supportive / Analytical", "score": 82, "nature": "Precise analytical methodology; calm, peaceful, ordered life together."},
            "5": {"tier": "Supportive / Intellectual", "score": 85, "nature": "Mental exploration, progressive discussion, mutual respect for personal autonomy."},
            "6": {"tier": "Neutral / Complex", "score": 62, "nature": "Affectionate demands clashing with solitary retreats; requires clear emotional boundaries."},
            "7": {"tier": "Supportive / Mystical", "score": 80, "nature": "Double Ketu; spiritual sanctuary, quiet intellectual communion. Risk: Total social detachment, living in isolated worlds."},
            "8": {"tier": "Neutral / Pragmatic", "score": 65, "nature": "Material power alongside spiritual depth; workable if domains are strictly respected."},
            "9": {"tier": "Supportive / Transcendent", "score": 84, "nature": "Spiritual truth-seeker meets universal humanitarian; profound shared worldview."}
        },
        "8": {
            "1": {"tier": "Challenging / Power Struggle", "score": 42, "nature": "CRITICAL FRICTION: Surya-Shani rivalry. Supreme executive deadlock, battle of egos, refusal to compromise."},
            "2": {"tier": "Challenging / Coldness", "score": 46, "nature": "CRITICAL FRICTION: Moon-Saturn emotional starvation. 2 feels unloved, 8 feels pressured by emotional demands."},
            "3": {"tier": "Neutral / Commercial", "score": 66, "nature": "Material practicality balancing creative extravagance; functional business alignment."},
            "4": {"tier": "Supportive / Corporate", "score": 86, "nature": "Colossal physical and financial achievement; discipline, loyalty, and generational wealth building."},
            "5": {"tier": "Supportive / Commercial", "score": 78, "nature": "Commercial strategy and agile trade; profitable mercantile syndicate."},
            "6": {"tier": "Supportive / Enduring", "score": 88, "nature": "Prosperous and durable union; material security combined with domestic grace and loyalty."},
            "7": {"tier": "Neutral / Pragmatic", "score": 65, "nature": "Pragmatic tolerance; 8 handles the worldly empire, 7 pursues private research."},
            "8": {"tier": "Supportive / Formidable", "score": 76, "nature": "Double Saturn; unassailable financial powerhouse. Risk: Workaholism, cold emotional environment, inability to relax."},
            "9": {"tier": "Challenging / Combative", "score": 40, "nature": "CRITICAL FRICTION: Saturn and Mars. Heavy immovable object meeting unstoppable destructive force. Severe conflict."}
        },
        "9": {
            "1": {"tier": "Natural Harmonious", "score": 94, "nature": "Heroic, courageous, visionary royal partnership; mutual loyalty and shared triumph."},
            "2": {"tier": "Neutral / Complex", "score": 64, "nature": "Passionate yet volatile; 9 must soften aggressive speech to avoid wounding 2."},
            "3": {"tier": "Natural Harmonious", "score": 94, "nature": "Idealistic, philanthropic, and creative alliance; inspiring, joyful, culturally rich."},
            "4": {"tier": "Challenging / Explosive", "score": 44, "nature": "CRITICAL FRICTION: Mars and Rahu. Short-fused arguments, sudden destructive blowups, unyielding dogmatism."},
            "5": {"tier": "Neutral / Active", "score": 68, "nature": "Lively and energetic, but differing moral priorities can cause friction."},
            "6": {"tier": "Natural Harmonious", "score": 90, "nature": "Cosmic creative triad; profound mutual devotion, social generosity, family warmth."},
            "7": {"tier": "Supportive / Transcendent", "score": 84, "nature": "Noble spiritual quest; 7 provides the esoteric wisdom, 9 crusades for social justice."},
            "8": {"tier": "Challenging / Combative", "score": 40, "nature": "CRITICAL FRICTION: Shani-Mangala clash. Violent arguments, chronic tension, severe professional rivalry."},
            "9": {"tier": "Supportive / Fiery", "score": 82, "nature": "Double Mars; boundless passion, selfless humanitarian crusading. Risk: Inflammable tempers, exhausting domestic drama."}
        }
    }

    return {
        "tool_id": "compatibility-analyzer",
        "tool_name": "Name + DOB Compatibility (Synchronicity Analysis)",
        "system": "Modern Practitioner Methodology",
        "tradition_full_name": "Modern Practitioner Numerology (Interpersonal Synchronicity & Multi-Tiered Compatibility)",
        "historical_clarification": HISTORICAL_CLARIFICATION,
        "disclaimer": DISCLAIMER_TEXT,
        "source": {
            "title": "Interpersonal Synchronicity and Multi-Tiered Numerical Compatibility",
            "author": "Consensus of Modern Relational Numerologists",
            "edition_or_chapter": "Multi-Axis Compatibility Index: Life Path, Expression, Birth Day, and Soul Resonance Harmonization",
            "historical_derivation_note": HISTORICAL_CLARIFICATION
        },
        "philosophical_basis": (
            "Modern compatibility numerology is a 20th-century syncretic discipline. While classical Jyotiṣa provided "
            "the 36-point Aṣṭakūṭa system for Lunar Nakshatras, it possessed no calculation engine for alphabetical name vibrations "
            "or solar Gregorian dates. Similarly, ancient Pythagorean and Chaldean traditions lacked algorithmic relational scoring matrices. "
            "Contemporary practitioners engineered the multi-axis compatibility framework to analyze relationship synchronicity "
            "across four energetic dimensions: existential life trajectory (Life Path), daily behavioral temperament (Birth Day), "
            "outer collaborative teamwork (Destiny/Expression), and inner emotional yearning (Soul Urge)."
        ),
        "inputs": [
            {
                "field_name": "person_a",
                "data_type": "object",
                "properties": {
                    "full_name": "string (Full legal or public name)",
                    "date_of_birth": "string (YYYY-MM-DD)",
                    "role_label": "string (e.g., 'Partner 1', 'Co-Founder A', 'Candidate')"
                },
                "required": True
            },
            {
                "field_name": "person_b",
                "data_type": "object",
                "properties": {
                    "full_name": "string (Full legal or public name)",
                    "date_of_birth": "string (YYYY-MM-DD)",
                    "role_label": "string (e.g., 'Partner 2', 'Co-Founder B', 'Manager')"
                },
                "required": True
            },
            {
                "field_name": "relationship_context",
                "data_type": "string",
                "format": "enum: [romantic_marriage, business_partnership, friendship_social, mentorship_professional]",
                "default": "romantic_marriage",
                "description": "The contextual nature of the relationship, which adjusts the computational weights of the four energetic axes.",
                "required": True
            },
            {
                "field_name": "alphabet_system",
                "data_type": "string",
                "format": "enum: [Pythagorean, Chaldean]",
                "default": "Pythagorean",
                "description": "Alphabet system used for name number calculation. Western relationship compatibility traditionally relies on Pythagorean 1-9 tables.",
                "required": False
            }
        ],
        "calculation_steps": [
            {
                "step_number": 1,
                "step_name": "Individual Core Vibration Derivation",
                "description": (
                    "For both Person A and Person B, calculate four core numerical parameters: "
                    "1) Life Path Number (LP): Gregorian DOB reduced periodically; "
                    "2) Birth Day Number (BD): Calendar day of birth (1-31) reduced to 1-9; "
                    "3) Destiny / Expression Number (EXP): Sum of all letters in full name; "
                    "4) Soul Urge Number (SU): Sum of all vowels in full name."
                ),
                "formula": "A = (LP_A, BD_A, EXP_A, SU_A); B = (LP_B, BD_B, EXP_B, SU_B)"
            },
            {
                "step_number": 2,
                "step_name": "Axis 1: Life Path to Life Path Harmonization (Weight: 40%)",
                "description": (
                    "Compare LP_A and LP_B against the 9x9 Planetary and Harmonic Triad Matrix. "
                    "The Life Path represents the evolutionary highway and overarching spiritual destiny. "
                    "Score ranges: Harmonious (90-100%), Supportive (75-89%), Neutral (60-74%), Frictional / Challenging (35-59%)."
                ),
                "formula": "S_LP = Matrix_9x9[LP_A][LP_B].score"
            },
            {
                "step_number": 3,
                "step_name": "Axis 2: Birth Day Number Temperament Alignment (Weight: 25%)",
                "description": (
                    "Evaluate the planetary friendship between BD_A and BD_B. "
                    "Governs daily habits, instinctive domestic reactions, communicative temper, and household harmony. "
                    "Friendly Grahas yield 85-100%; neutral Grahas 65-80%; enemy Grahas (e.g. 1 & 8, 2 & 8, 4 & 9) yield 35-50%."
                ),
                "formula": "S_BD = Mitra_Shatru_Score(BD_A, BD_B)"
            },
            {
                "step_number": 4,
                "step_name": "Axis 3: Destiny / Expression Collaborative Resonance (Weight: 20%)",
                "description": (
                    "Compare EXP_A and EXP_B. "
                    "Reflects worldly capability, shared project execution, intellectual communication, and outward social presence."
                ),
                "formula": "S_EXP = Matrix_9x9[EXP_A][EXP_B].score"
            },
            {
                "step_number": 5,
                "step_name": "Axis 4: Soul Urge Romantic & Vulnerable Intimacy (Weight: 15%)",
                "description": (
                    "Compare SU_A and SU_B. "
                    "Reflects emotional safety, private romantic longings, spiritual values, and vulnerable heart-to-heart rapport."
                ),
                "formula": "S_SU = Matrix_9x9[SU_A][SU_B].score"
            },
            {
                "step_number": 6,
                "step_name": "Relationship Context Weighting Adaptation",
                "description": (
                    "Adjust the axis weights according to relationship_context: "
                    "1) Romantic / Marriage: Life Path 35%, Birth Day 30%, Soul Urge 20%, Destiny 15%; "
                    "2) Business Partnership: Destiny 35%, Life Path 30%, Birth Day 25%, Soul Urge 10%; "
                    "3) Friendship / Social: Life Path 30%, Birth Day 30%, Destiny 20%, Soul Urge 20%; "
                    "4) Mentorship / Professional: Destiny 40%, Life Path 30%, Birth Day 20%, Soul Urge 10%."
                ),
                "formula": "Composite_Score = w1 * S_LP + w2 * S_BD + w3 * S_EXP + w4 * S_SU"
            },
            {
                "step_number": 7,
                "step_name": "Final Classification & Friction Resolution Protocol",
                "description": (
                    "Classify Composite_Score into four relationship tiers: "
                    "1) Harmonious Synchronicity (85-100%): Natural, effortless bond; "
                    "2) Supportive Collaboration (70-84%): Strong mutual goodwill, easily reconciled differences; "
                    "3) Neutral / Growth Partnership (55-69%): Requires conscious compromise and patience; "
                    "4) Challenging Karmic Friction (<55%): High volatility, severe lessons in boundaries and patience. "
                    "Provide specific practitioner remediation advice for identified friction hotspots."
                ),
                "formula": "Tier = Classify(Composite_Score); Remediation = Generate_Remedies(critical_frictions)"
            }
        ],
        "harmonic_triad_reference": {
            "mental_intellectual_triad": {
                "numbers": [1, 5, 7],
                "qualities": "Thought, curiosity, independence, analytical inquiry, progressive vision",
                "compatibility_within_triad": "Highly stimulating, intellectually respectful, respects personal autonomy."
            },
            "physical_practical_triad": {
                "numbers": [2, 4, 8],
                "qualities": "Tactical execution, material grounding, structural security, operational loyalty",
                "compatibility_within_triad": "Stable, reliable, mutually protective, shared tangible goals."
            },
            "emotional_creative_triad": {
                "numbers": [3, 6, 9],
                "qualities": "Imaginative expression, selfless love, humanitarian ideals, social warmth",
                "compatibility_within_triad": "Deeply affectionate, artistically rich, devoted, inspiring."
            }
        },
        "compatibility_matrix_9x9": matrix_9x9,
        "master_numbers_compatibility_rules": {
            "11": {
                "nature": "Higher octave of 2; visionary intuition and spiritual sensitivity.",
                "best_allies": [11, 2, 7, 22, 33, 1],
                "challenging_friction": [4, 8],
                "dynamics": "Requires an emotionally mature partner who understands spiritual inspiration and high nervous energy."
            },
            "22": {
                "nature": "Higher octave of 4; master architect and international builder.",
                "best_allies": [22, 4, 8, 11, 33],
                "challenging_friction": [3, 5],
                "dynamics": "Thrives with partners who share massive operational ambitions; impatient with superficial distractions."
            },
            "33": {
                "nature": "Higher octave of 6; universal compassion, master teacher, healer.",
                "best_allies": [33, 6, 9, 11, 22, 3],
                "challenging_friction": [8, 4],
                "dynamics": "Requires an emotionally generous partner; must avoid being taken advantage of by selfish or cold individuals."
            }
        },
        "critical_friction_hotspots": {
            "1_and_8": {
                "archetype": "Sun vs Saturn (Power & Dominance Clash)",
                "relationship_hazard": "Ego struggles, battle over household leadership or financial control, unyielding silent treatment.",
                "resolution_protocol": "Explicitly delineate zones of control: Partner A has sole executive authority over domain X, Partner B over domain Y."
            },
            "2_and_8": {
                "archetype": "Moon vs Saturn (Emotional Starvation / Vish Yoga)",
                "relationship_hazard": "Partner 2 feels cold, unvalidated, or emotionally dismissed; Partner 8 feels burdened by constant emotional needs.",
                "resolution_protocol": "Partner 8 must consciously schedule verbal words of affection; Partner 2 must develop independent emotional anchors."
            },
            "4_and_9": {
                "archetype": "Rahu vs Mars (Explosive Volatility / Angarak Yoga)",
                "relationship_hazard": "Explosive temper clashes, rigid stubbornness meeting fiery impatience, sudden slammed doors.",
                "resolution_protocol": "Enforce mandatory 30-minute cooling-off periods during disagreements; avoid debating while physically fatigued."
            },
            "3_and_6": {
                "archetype": "Jupiter vs Venus (Ideological / Lifestyle Clash)",
                "relationship_hazard": "Differences in moral and financial values; disputes over parenting styles or expenditure priorities.",
                "resolution_protocol": "Create a shared written budget and mutually agreed household ground rules; avoid philosophical lecturing."
            }
        },
        "output_schema": {
            "person_a_profile": {
                "name": "string",
                "life_path": "integer",
                "birth_day_number": "integer",
                "destiny_number": "integer",
                "soul_urge_number": "integer"
            },
            "person_b_profile": {
                "name": "string",
                "life_path": "integer",
                "birth_day_number": "integer",
                "destiny_number": "integer",
                "soul_urge_number": "integer"
            },
            "relationship_context": "string",
            "axis_scores": {
                "life_path_axis": {"score": "integer", "weight": "float", "analysis": "string"},
                "birth_day_axis": {"score": "integer", "weight": "float", "analysis": "string"},
                "destiny_axis": {"score": "integer", "weight": "float", "analysis": "string"},
                "soul_urge_axis": {"score": "integer", "weight": "float", "analysis": "string"}
            },
            "composite_synchronicity_score": "integer (0-100%)",
            "relationship_tier": "string (Harmonious Synchronicity | Supportive Collaboration | Neutral Growth | Challenging Karmic Friction)",
            "comprehensive_synthesis": "string",
            "friction_hotspots_identified": "array of objects",
            "practitioner_remedies_and_guidance": "array of strings",
            "disclaimer": DISCLAIMER_TEXT
        }
    }

if __name__ == "__main__":
    tool = get_compatibility_tool()
    print(f"Tool {tool['tool_id']} compiled successfully.")
