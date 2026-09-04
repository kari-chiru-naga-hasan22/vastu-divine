# -*- coding: utf-8 -*-
"""
Module: build_mobile_data.py
Generates Tool 1: Mobile Number Analyzer research specification.
Tagged: Modern Practitioner Methodology
"""

HISTORICAL_CLARIFICATION = (
    "Modern practitioner methodology; not derived from ancient Vedic or classical antique texts, "
    "which predated telecommunications, automobiles, and modern corporate incorporation."
)

DISCLAIMER_TEXT = "This is a traditional esoteric belief system, not an empirical or scientific claim."

def get_mobile_number_tool():
    return {
        "tool_id": "mobile-number",
        "tool_name": "Mobile Number Analyzer",
        "system": "Modern Practitioner Methodology",
        "tradition_full_name": "Modern Practitioner Numerology (Digital & Telecommunication Vibration Analysis)",
        "historical_clarification": HISTORICAL_CLARIFICATION,
        "disclaimer": DISCLAIMER_TEXT,
        "source": {
            "title": "Modern Telecommunication Numerology and Digital Resonance Analysis",
            "author": "Consensus of Contemporary Indian and Western Applied Numerologists",
            "edition_or_chapter": "Telecommunication Digit Resonance, Consecutive Digit Transitions, and the Mitra-Shatru Chakra",
            "historical_derivation_note": HISTORICAL_CLARIFICATION
        },
        "philosophical_basis": (
            "In modern esoteric practice, a mobile telephone number represents the most frequently transmitted "
            "electromagnetic and vibrational identifier of an individual. Unlike a birth date, which is fixed at incarnation, "
            "a mobile number is an acquired vibrational aura that mediates social, commercial, and personal connectivity. "
            "Modern numerologists apply classical Graha (planetary) friendship systems (Mitra-Shatru-Sama chakra) to evaluate "
            "how the consecutive digits interact, how the cumulative compound frequency resonates with the subscriber's "
            "innate birth vibrations, and how specific digit sequences influence communication clarity, deal flow, and peace of mind."
        ),
        "inputs": [
            {
                "field_name": "mobile_number",
                "data_type": "string",
                "format": "10-digit standard cellular string (e.g., '9876543210' or '9810023456')",
                "description": "The ten-digit mobile telephone number excluding country code prefixes, spaces, or punctuation.",
                "validation": "^[0-9]{10}$"
            },
            {
                "field_name": "owner_birth_day",
                "data_type": "integer",
                "format": "Day of birth (1 to 31)",
                "description": "The calendar day of the subscriber's birth, used to derive the primary Birth Number / Psychic Number (1-9).",
                "required": False
            },
            {
                "field_name": "owner_life_path",
                "data_type": "integer",
                "format": "Reduced Life Path (1 to 9, or Master 11/22/33)",
                "description": "The reduced sum of the subscriber's complete birth date (DD/MM/YYYY).",
                "required": False
            },
            {
                "field_name": "intent_category",
                "data_type": "string",
                "format": "enum: [general_harmony, business_wealth_sales, leadership_executive, creative_media_arts, counseling_healing, technology_analytics]",
                "description": "The primary operational purpose of the cellular line, used to evaluate domain-specific vibrational resonance.",
                "required": False
            }
        ],
        "calculation_steps": [
            {
                "step_number": 1,
                "step_name": "Digit Normalization and Sanitization",
                "description": (
                    "Strip country dialing prefixes (+91, +1, 00, etc.), hyphens, brackets, and spaces. "
                    "Validate that exactly ten operational digits remain: d1, d2, d3, ..., d10."
                ),
                "formula": "D = [d_i for d_i in string if d_i in '0123456789'] (length = 10)"
            },
            {
                "step_number": 2,
                "step_name": "Total Sum & Compound Number Determination",
                "description": (
                    "Sum all ten digits sequentially to compute the total compound number of the mobile string. "
                    "This compound sum (typically ranging between 25 and 75) represents the comprehensive energetic reservoir of the phone."
                ),
                "formula": "S_total = sum(d_i for i in 1..10)"
            },
            {
                "step_number": 3,
                "step_name": "Single-Digit Root Reduction",
                "description": (
                    "Reduce the compound total S_total by recursively adding its digits until a single integer between 1 and 9 is obtained. "
                    "This single digit is the primary Mobile Root Ruler (Planetary Sovereign of the number)."
                ),
                "formula": "R_mobile = (S_total - 1) % 9 + 1"
            },
            {
                "step_number": 4,
                "step_name": "Suffix Resonance Analysis (Last 2, 3, and 4 Digits)",
                "description": (
                    "Modern practitioners assign elevated importance to the terminal digits (d9-d10, and d7-d8-d9-d10). "
                    "The final two digits represent the 'manifestation portal' or outgoing calling aura that the world receives during contact. "
                    "The terminal sub-sum is reduced to identify secondary ruling frequencies."
                ),
                "formula": "S_suffix2 = d9 + d10 -> R_suffix2; S_suffix4 = d7 + d8 + d9 + d10 -> R_suffix4"
            },
            {
                "step_number": 5,
                "step_name": "Consecutive Digit Pair Transitions & Mitra-Shatru Evaluation",
                "description": (
                    "Evaluate each adjacent consecutive pair (d_i, d_{i+1}) across all 9 internal transitions (i=1 to 9). "
                    "Compare the planetary rulers of d_i and d_{i+1} against the classical planetary friendship matrix. "
                    "Count friendly transitions (Mitra), neutral transitions (Sama), and conflicting transitions (Shatru). "
                    "Flag critical high-friction combinations: (1,8)/(8,1), (2,8)/(8,2), (4,8)/(8,4), (9,4)/(4,9), and (3,6)/(6,3)."
                ),
                "formula": "Transitions = [(d_i, d_{i+1}) for i in 1..9]; Classified as Friendly, Neutral, or Inimical"
            },
            {
                "step_number": 6,
                "step_name": "Digit Distribution, Repetition, and Zero Dissipation Check",
                "description": (
                    "Calculate the frequency histogram of digits 0 through 9. "
                    "Identify zeros: in modern cellular numerology, zero is considered a neutralizer or vibrational void. "
                    "More than two zeros (especially in terminal positions) dissipate communicative energy, causing missed opportunities. "
                    "Check for excessive identical repetitions (e.g., 888, 444, 222) which over-concentrate one planetary quality."
                ),
                "formula": "Count(0) > 2 -> Flag(Zero_Dissipation); Count(d_k) >= 3 -> Flag(Excess_Repetition)"
            },
            {
                "step_number": 7,
                "step_name": "Subscriber Concordance & Composite Compatibility Score",
                "description": (
                    "Calculate an overall harmony score (0 to 100%) by weighting four primary factors: "
                    "1) Root Number alignment with subscriber's Birth Number & Life Path (35%); "
                    "2) Ratio of friendly to inimical consecutive pairs (25%); "
                    "3) Auspiciousness of the total compound number (20%); "
                    "4) Suffix resonance and absence of negative flags (20%)."
                ),
                "formula": "Score = 0.35 * S_root + 0.25 * S_pairs + 0.20 * S_compound + 0.20 * S_suffix (scaled 0-100%)"
            }
        ],
        "mitra_shatru_chakra": {
            "1": {
                "ruling_planet": "Sun (Surya)",
                "element": "Fire",
                "nature": "Royal, authoritative, vital, initiating",
                "friends": [2, 3, 9],
                "neutral": [5],
                "enemies": [4, 6, 7, 8],
                "philosophical_note": "The Sun finds natural concord with Moon, Jupiter, and Mars; experiences severe enmity with Saturn (8), Rahu (4), and Ketu (7)."
            },
            "2": {
                "ruling_planet": "Moon (Chandra)",
                "element": "Water",
                "nature": "Emotional, receptive, maternal, fluctuating",
                "friends": [1, 5],
                "neutral": [3, 6, 7, 8, 9],
                "enemies": [4, 8],
                "philosophical_note": "The Moon views Mercury and Sun as friends; severely afflicted by Rahu (4, causing eclipses) and Saturn (8, causing Vish Yoga depression)."
            },
            "3": {
                "ruling_planet": "Jupiter (Guru / Brihaspati)",
                "element": "Ether",
                "nature": "Wisdom, counsel, expansion, benevolence, morality",
                "friends": [1, 2, 9],
                "neutral": [8],
                "enemies": [4, 6, 7],
                "philosophical_note": "Jupiter shares spiritual alliance with Sun, Moon, and Mars; ideological rivalry with Venus (6, Daityaguru vs Devaguru clash)."
            },
            "4": {
                "ruling_planet": "Rahu (North Lunar Node)",
                "element": "Shadow / Air",
                "nature": "Disruption, unconventional innovation, suddenness, worldly ambition",
                "friends": [5, 6, 7, 8],
                "neutral": [3],
                "enemies": [1, 2, 9],
                "philosophical_note": "Rahu allies with material, intellectual, and shadow planets; direct cosmic adversary to Sun (1), Moon (2), and Mars (9)."
            },
            "5": {
                "ruling_planet": "Mercury (Budha)",
                "element": "Earth / Air",
                "nature": "Intellect, trade, commerce, speed, adaptability, verbal wit",
                "friends": [1, 6],
                "neutral": [3, 4, 7, 8, 9],
                "enemies": [2],
                "philosophical_note": "Mercury is the universal merchant; friendly with Sun and Venus; struggles with the emotional inconsistency of Moon (2)."
            },
            "6": {
                "ruling_planet": "Venus (Shukra)",
                "element": "Water / Earth",
                "nature": "Aesthetics, luxury, wealth, pleasure, diplomatic charm",
                "friends": [5, 8],
                "neutral": [1, 7],
                "enemies": [3, 4, 9],
                "philosophical_note": "Venus harmonizes with Saturn and Mercury; in natural tension with Jupiter (3) and explosive discord with Mars (9)."
            },
            "7": {
                "ruling_planet": "Ketu (South Lunar Node)",
                "element": "Shadow / Fire",
                "nature": "Spiritual liberation, research, occult intuition, detachment, introversion",
                "friends": [1, 4, 5, 6],
                "neutral": [3, 8],
                "enemies": [2, 9],
                "philosophical_note": "Ketu supports deep esoteric research; creates emotional isolation with Moon (2) and explosive conflict with Mars (9)."
            },
            "8": {
                "ruling_planet": "Saturn (Shani)",
                "element": "Air / Earth",
                "nature": "Discipline, karma, perseverance, slow endurance, structural justice",
                "friends": [3, 5, 6, 7],
                "neutral": [4],
                "enemies": [1, 2, 9],
                "philosophical_note": "Saturn rewards patient labor; fundamentally inimical to the fiery Sun (1), emotive Moon (2), and aggressive Mars (9)."
            },
            "9": {
                "ruling_planet": "Mars (Mangala)",
                "element": "Fire",
                "nature": "Courage, energy, action, passion, impulsive drive, combativeness",
                "friends": [1, 2, 3],
                "neutral": [7, 8],
                "enemies": [4, 5, 6],
                "philosophical_note": "Mars is the energetic warrior; thrives with Sun, Moon, and Jupiter; volatile with Rahu (4), Mercury (5), and Venus (6)."
            }
        },
        "critical_conflicting_pairs": {
            "1-8_or_8-1": {
                "pair": "1 and 8 (Sun & Saturn)",
                "nature": "Surya-Shani Inimical Tension (Father-Son Mythic Discord)",
                "telecom_manifestation": (
                    "Severe authority clashes, frequent misunderstandings with senior executives, bureaucratic or legal delays, "
                    "and a perception of cold arrogance or stubbornness over telephone communications."
                ),
                "practitioner_recommendation": "Avoid in numbers intended for corporate leadership, legal negotiations, or government dealings."
            },
            "2-8_or_8-2": {
                "pair": "2 and 8 (Moon & Saturn)",
                "nature": "Vish Yoga / Chronic Melancholy Resonance",
                "telecom_manifestation": (
                    "Emotional heaviness, anxiety prior to answering calls, pessimism, delayed responses from correspondents, "
                    "and a tendency for conversations to degenerate into complaints or burdens."
                ),
                "practitioner_recommendation": "Avoid in numbers intended for counseling, customer relations, or personal romance."
            },
            "4-8_or_8-4": {
                "pair": "4 and 8 (Rahu & Saturn)",
                "nature": "Double Malefic Structural Friction",
                "telecom_manifestation": (
                    "Chronic unexpected hurdles, dropped calls, recurring network/hardware glitches, billing disputes, "
                    "and sudden disruptions right before concluding crucial commercial transactions."
                ),
                "practitioner_recommendation": "Strongly discouraged for mainstream commercial or personal lines."
            },
            "9-4_or_4-9": {
                "pair": "9 and 4 (Mars & Rahu)",
                "nature": "Angarak Yoga / Explosive Combustion",
                "telecom_manifestation": (
                    "Rash, short-tempered communication, sudden violent arguments, impatience over voice calls, impulsive text messaging "
                    "that causes reputational damage, and unpredictable severed associations."
                ),
                "practitioner_recommendation": "Avoid for diplomacy, partnership discussions, or sensitive negotiations."
            },
            "3-6_or_6-3": {
                "pair": "3 and 6 (Jupiter & Venus)",
                "nature": "Guru-Shukra Ideological Deadlock",
                "telecom_manifestation": (
                    "High expenses exceeding incoming returns, philosophical disagreements with partners, double standards, "
                    "and promising more than can be practically delivered over commercial calls."
                ),
                "practitioner_recommendation": "Use cautiously; viable for creative luxury, but monitor expenditure commitments."
            }
        },
        "auspicious_pairs": {
            "1-5_or_5-1": {
                "pair": "1 and 5 (Sun & Mercury)",
                "nature": "Budhaditya Commercial Brilliance",
                "telecom_manifestation": "Rapid deal closure, persuasive executive speech, swift negotiations, and successful telephonic trade."
            },
            "3-5_or_5-3": {
                "pair": "3 and 5 (Jupiter & Mercury)",
                "nature": "Expansive Intellect and Eloquence",
                "telecom_manifestation": "Brilliant advisory calls, educational consulting, media outreach, articulate messaging, and positive rapport."
            },
            "5-6_or_6-5": {
                "pair": "5 and 6 (Mercury & Venus)",
                "nature": "Lakshmi-Narayana Commercial Wealth Vibration",
                "telecom_manifestation": "Attracts affluent clientele, pleasant negotiations, luxury retail orders, and harmonious relationship calls."
            },
            "1-9_or_9-1": {
                "pair": "1 and 9 (Sun & Mars)",
                "nature": "Heroic Dynamic Command",
                "telecom_manifestation": "Decisive action, rapid emergency responsiveness, commanding presence, and victory in competitive bidding."
            },
            "2-7_or_7-2": {
                "pair": "2 and 7 (Moon & Ketu)",
                "nature": "Intuitive Depth and Receptivity",
                "telecom_manifestation": "Deep empathetic listening, psychological counseling acumen, spiritual tele-mentorship, and research insight."
            }
        },
        "digit_frequency_rules": {
            "zero_dissipation_protocol": {
                "symbolism": "Zero represents Shunya (the cosmic void); while spiritually profound, in material telecommunications it acts as an energetic drain or neutralizer.",
                "rules": [
                    {"zero_count": 0, "assessment": "Optimal energetic density; full vibrational transmission.", "score_impact": 0},
                    {"zero_count": 1, "assessment": "Acceptable; introduces brief pauses or reflective intervals.", "score_impact": 0},
                    {"zero_count": 2, "assessment": "Moderate dissipation; occasional unanswered calls or postponed follow-ups.", "score_impact": -5},
                    {"zero_count": 3, "assessment": "Significant dissipation; frequent missed connections and lethargic deal flow.", "score_impact": -15},
                    {"zero_count": 4, "assessment": "Severe void; energetic exhaustion, calls repeatedly lead nowhere.", "score_impact": -25}
                ],
                "terminal_zero_warning": "A mobile number ending in '00' or '000' is viewed by practitioners as draining the concluding manifestation of conversations."
            },
            "excessive_repetition_protocol": {
                "repetition_threshold": 3,
                "archetype_effects": {
                    "111": "Extreme ego assertion; caller may dominate conversations and reject input.",
                    "222": "Extreme emotional vacillation; caller becomes hyper-sensitive or indecisive.",
                    "333": "Prolixity; excessively lengthy conversations that wander from core points.",
                    "444": "Severe mental restlessness; erratic communication schedules and sudden cancellations.",
                    "555": "Frenetic multi-tasking; superficial engagement and difficulty staying focused.",
                    "666": "Excessive indulgence or attachment; over-promising luxuries or favors.",
                    "777": "Extreme withdrawal; unreturned voicemails, secrecy, and anti-social periods.",
                    "888": "Heavy karmic burden; non-stop labor, feelings of exhaustion and endless duty.",
                    "999": "High combustion; explosive irritability, impatience, and aggressive dialogue."
                }
            },
            "digit_progression_protocol": {
                "ascending_sequence": "e.g., ...5678 or ...6789 represents upward growth, expanding network reach, and accelerating momentum.",
                "descending_sequence": "e.g., ...9876 or ...6543 represents winding down, contractive focus, or retirement aura.",
                "scattered_sequence": "Balanced standard oscillation; evaluated primarily through adjacent pair friendliness."
            }
        },
        "interpretation_matrix": {
            "1": {
                "root_number": 1,
                "ruling_planet": "Sun (Surya)",
                "vibrational_essence": "Leadership, Executive Authority, Independence, Directness",
                "communication_aura": "Commanding, concise, authoritative, prompt, goal-oriented.",
                "optimal_user_profiles": ["CEOs", "Founders", "Government Liaisons", "Senior Administrators", "Pioneers"],
                "business_suitability": "Superb for high-level decision-making, executive orders, and corporate direction.",
                "potential_pitfalls": "Can project an unapproachable or demanding persona; may intimidate subordinates over voice calls.",
                "harmonic_birth_alignment": [1, 2, 3, 9],
                "conflicting_birth_alignment": [8, 4]
            },
            "2": {
                "root_number": 2,
                "ruling_planet": "Moon (Chandra)",
                "vibrational_essence": "Diplomacy, Emotional Receptivity, Cooperation, Mediation",
                "communication_aura": "Warm, gentle, listening-centered, empathetic, supportive.",
                "optimal_user_profiles": ["Counselors", "HR Managers", "Customer Care Specialists", "Mediators", "Caregivers"],
                "business_suitability": "Ideal for collaborative partnerships, public relations, and client care.",
                "potential_pitfalls": "Vulnerable to emotional fatigue; difficulty saying 'no' to unreasonable caller requests.",
                "harmonic_birth_alignment": [1, 5, 2],
                "conflicting_birth_alignment": [4, 8, 9]
            },
            "3": {
                "root_number": 3,
                "ruling_planet": "Jupiter (Guru)",
                "vibrational_essence": "Wisdom, Advisory, Knowledge Dissemination, Articulate Eloquence",
                "communication_aura": "Inspiring, expansive, scholarly, educational, optimistic.",
                "optimal_user_profiles": ["Professors", "Lawyers", "Consultants", "Spiritual Mentors", "Authors", "Public Speakers"],
                "business_suitability": "Outstanding for coaching, educational institutions, training academies, and legal consultancies.",
                "potential_pitfalls": "Conversations can become overly theoretical or verbose; tends to lecture rather than transact.",
                "harmonic_birth_alignment": [1, 2, 3, 9],
                "conflicting_birth_alignment": [6, 4]
            },
            "4": {
                "root_number": 4,
                "ruling_planet": "Rahu",
                "vibrational_essence": "Technical Precision, Unconventional Strategy, Digital Innovation, Sudden Shifts",
                "communication_aura": "Analytical, disruptive, direct, skeptical, focused on systemic detail.",
                "optimal_user_profiles": ["Software Engineers", "Cybersecurity Analysts", "Forensic Auditors", "Disruptive Marketers"],
                "business_suitability": "Excellent for technical troubleshooting, crisis management, and unconventional tech ventures.",
                "potential_pitfalls": "Subject to sudden network drops, unexpected misunderstandings, and abrupt project cancellations.",
                "harmonic_birth_alignment": [5, 6, 7, 8],
                "conflicting_birth_alignment": [1, 2, 9]
            },
            "5": {
                "root_number": 5,
                "ruling_planet": "Mercury (Budha)",
                "vibrational_essence": "Commercial Mastery, Tele-Sales, Rapid Adaptability, Networking Agility",
                "communication_aura": "Persuasive, brisk, engaging, humorous, quick-thinking, deal-closing.",
                "optimal_user_profiles": ["Traders", "Sales Executives", "Stock Brokers", "Journalists", "E-Commerce Entrepreneurs", "Travel Agents"],
                "business_suitability": "The universally acclaimed business number; maximizes incoming inquiry volume and rapid transaction speeds.",
                "potential_pitfalls": "Can induce restlessness, superficial multitasking, and fragmented concentration if call volume explodes.",
                "harmonic_birth_alignment": [1, 5, 6],
                "conflicting_birth_alignment": [2]
            },
            "6": {
                "root_number": 6,
                "ruling_planet": "Venus (Shukra)",
                "vibrational_essence": "Luxury, Aesthetic Harmony, Hospitality, Domestic Elegance, Affluent Patronage",
                "communication_aura": "Charming, gracious, refined, soothing, hospitable.",
                "optimal_user_profiles": ["Interior Designers", "Fashion Stylists", "Restaurateurs", "Luxury Goods Retailers", "Artists", "Event Planners"],
                "business_suitability": "Attracts high-net-worth clients, premium hospitality bookings, and aesthetic commissions.",
                "potential_pitfalls": "May encourage lavish over-expenditure or emotional over-involvement in clients' personal lives.",
                "harmonic_birth_alignment": [5, 6, 8],
                "conflicting_birth_alignment": [3, 9]
            },
            "7": {
                "root_number": 7,
                "ruling_planet": "Ketu",
                "vibrational_essence": "Specialized Research, Introspection, Intuition, Spiritual Discernment",
                "communication_aura": "Quiet, deep, perceptive, selective, analytical, private.",
                "optimal_user_profiles": ["Data Scientists", "Philosophers", "Esoteric Practitioners", "Spiritual Seekers", "Bio-medical Researchers"],
                "business_suitability": "Superb for private consultations, intellectual research, and solo technical advisory.",
                "potential_pitfalls": "Attracts fewer incoming commercial calls; caller may feel isolated or resist picking up unknown numbers.",
                "harmonic_birth_alignment": [1, 4, 5, 7],
                "conflicting_birth_alignment": [2, 9]
            },
            "8": {
                "root_number": 8,
                "ruling_planet": "Saturn (Shani)",
                "vibrational_essence": "Endurance, Structural Discipline, Heavy Industry, Corporate Governance, Karmic Responsibility",
                "communication_aura": "Serious, pragmatic, unhurried, demanding, formal, sober.",
                "optimal_user_profiles": ["Real Estate Developers", "Mining Executives", "Judges", "Chartered Accountants", "Heavy Logistics Managers"],
                "business_suitability": "Highly effective for institutional finance, long-term capital contracts, and regulatory administration.",
                "potential_pitfalls": "Can feel like an oppressive work line; requires relentless effort and produces delayed results before massive success.",
                "harmonic_birth_alignment": [3, 5, 6, 7],
                "conflicting_birth_alignment": [1, 2, 9]
            },
            "9": {
                "root_number": 9,
                "ruling_planet": "Mars (Mangala)",
                "vibrational_essence": "Dynamic Vigor, Courageous Action, Humanitarian Leadership, Emergency Response",
                "communication_aura": "Passionate, urgent, high-energy, forceful, direct, assertive.",
                "optimal_user_profiles": ["Surgeons", "Emergency Personnel", "Sports Coaches", "Defense Contractors", "Activists", "Real Estate Field Agents"],
                "business_suitability": "Excellent for crisis management, fast physical mobilization, and humanitarian NGO outreach.",
                "potential_pitfalls": "Prone to high-decibel arguments, hasty misunderstandings, and burned bridges if temper is not moderated.",
                "harmonic_birth_alignment": [1, 2, 3, 9],
                "conflicting_birth_alignment": [4, 5, 6, 8]
            }
        },
        "common_compound_matrix": {
            "24": {"sum": 24, "root": 6, "nature": "Fortunate alliance; harmony with authorities, domestic warmth, and steady commercial gain."},
            "28": {"sum": 28, "root": 1, "nature": "Promising inception with high risk of loss through blind trust in business partners; requires contractual rigor."},
            "32": {"sum": 32, "root": 5, "nature": "High social intelligence, verbal charm, and brilliant commercial agility; widely favored by sales professionals."},
            "33": {"sum": 33, "root": 6, "nature": "Master octave of creative and financial alliance; attracts affluent patronage and artistic goodwill."},
            "37": {"sum": 37, "root": 1, "nature": "Courageous leadership, genuine friendships, commercial victory, and auspicious partnership sync."},
            "40": {"sum": 40, "root": 4, "nature": "Sudden disruptions alternating with technical brilliance; rewards meticulous planning, penalizes speculation."},
            "41": {"sum": 41, "root": 5, "nature": "Dynamic intellect, commercial triumph, media resonance, and profitable telecommunication networks."},
            "42": {"sum": 42, "root": 6, "nature": "Venusian domestic peace, gentle trade, hospitality expansion, and affectionate social rapport."},
            "45": {"sum": 45, "root": 9, "nature": "Commanding martial intellect; rapid problem-solving, strategic boldness, and executive authority."},
            "46": {"sum": 46, "root": 1, "nature": "Respected leadership, public acclaim, enduring commercial goodwill, and prominent social status."},
            "50": {"sum": 50, "root": 5, "nature": "Exceptional commercial versatility, multi-currency trade, intellectual freedom, and swift expansion."},
            "51": {"sum": 51, "root": 6, "nature": "The Royal Warrior; immense commercial momentum, triumphant negotiation, and sudden breakthrough."},
            "52": {"sum": 52, "root": 7, "nature": "Deep research intelligence; requires guarded communication to prevent intellectual property leaks."},
            "54": {"sum": 54, "root": 9, "nature": "Energetic humanitarian or industrial enterprise; strong work ethic, high endurance, volatile arguments."},
            "55": {"sum": 55, "root": 1, "nature": "Intense mental speed, leadership through technology, and continuous innovation; risks mental burnout."},
            "59": {"sum": 59, "root": 5, "nature": "Mastery of global trade, cross-border telecommunications, and successful media advertising campaigns."},
            "60": {"sum": 60, "root": 6, "nature": "Refined artistic luxury, social celebration, family happiness, and comfortable financial security."}
        },
        "output_schema": {
            "mobile_number": "string (10 digits)",
            "total_compound_sum": "integer",
            "root_number": "integer (1-9)",
            "root_ruling_planet": "string",
            "root_vibrational_profile": "object",
            "compound_meaning": "string",
            "suffix_analysis": {
                "suffix_digits": "string",
                "suffix_sum": "integer",
                "suffix_root": "integer",
                "suffix_aura": "string"
            },
            "consecutive_pair_assessment": {
                "friendly_pair_count": "integer",
                "neutral_pair_count": "integer",
                "conflicting_pair_count": "integer",
                "critical_warnings_flagged": "array of objects"
            },
            "digit_frequency_report": {
                "zero_count": "integer",
                "zero_impact": "string",
                "repeating_digit_warnings": "array of strings"
            },
            "subscriber_harmony_score": "integer (0-100%)",
            "intent_suitability_assessment": "string",
            "practitioner_recommendations": "array of strings",
            "disclaimer": DISCLAIMER_TEXT
        }
    }

if __name__ == "__main__":
    tool = get_mobile_number_tool()
    print(f"Tool {tool['tool_id']} compiled successfully.")
