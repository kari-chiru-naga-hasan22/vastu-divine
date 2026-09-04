# -*- coding: utf-8 -*-
"""
Module: build_vehicle_data.py
Generates Tool 2: Vehicle Number Analyzer research specification.
Tagged: Modern Practitioner Methodology
"""

HISTORICAL_CLARIFICATION = (
    "Modern practitioner methodology; not derived from ancient Vedic or classical antique texts, "
    "which predated telecommunications, automobiles, and modern corporate incorporation."
)

DISCLAIMER_TEXT = "This is a traditional esoteric belief system, not an empirical or scientific claim."

def get_vehicle_number_tool():
    # Chaldean alphabet lookup for plate conversion
    chaldean_plate_table = {
        "A": 1, "I": 1, "J": 1, "Q": 1, "Y": 1,
        "B": 2, "K": 2, "R": 2,
        "C": 3, "G": 3, "L": 3, "S": 3,
        "D": 4, "M": 4, "T": 4,
        "E": 5, "H": 5, "N": 5, "X": 5,
        "U": 6, "V": 6, "W": 6,
        "O": 7, "Z": 7,
        "F": 8, "P": 8
    }

    return {
        "tool_id": "vehicle-number",
        "tool_name": "Vehicle Number Analyzer",
        "system": "Modern Practitioner Methodology",
        "tradition_full_name": "Modern Practitioner Numerology (Automotive Kinetic Dynamics & Safety Vibration)",
        "historical_clarification": HISTORICAL_CLARIFICATION,
        "disclaimer": DISCLAIMER_TEXT,
        "source": {
            "title": "Automotive Vibration Numerology and Kinetic Safety Harmonization",
            "author": "Consensus of Contemporary Applied Numerologists and Kinetic Motion Analysts",
            "edition_or_chapter": "Registration Plate Alphanumeric Reduction, Kinetic Friction Indices, and Driver Concordance",
            "historical_derivation_note": HISTORICAL_CLARIFICATION
        },
        "philosophical_basis": (
            "Modern automotive numerology emerged in the mid-20th century as motor vehicles became the primary instruments "
            "of physical mobility, commerce, and daily transit. Ancient Sanskrit treatises on Vāstu and Jyotiṣa discussed chariots (ratha) "
            "and animal-drawn conveyances, but internal combustion engines, multi-lane highways, and alphanumeric registration plates "
            "are entirely modern artifacts. Practitioners project classical planetary rulerships onto vehicle registrations to evaluate "
            "kinetic safety, mechanical temperament, collision vulnerability, and psychic harmony between the vehicle and its primary driver."
        ),
        "chaldean_plate_alphabet_table": chaldean_plate_table,
        "inputs": [
            {
                "field_name": "registration_plate",
                "data_type": "string",
                "format": "Standard vehicle registration string (e.g., 'MH 02 AB 1234', 'DL 3C AB 9876', 'KA 01 MJ 5555')",
                "description": "The complete state and district alphanumeric registration license plate displayed on the vehicle.",
                "required": True
            },
            {
                "field_name": "driver_birth_day",
                "data_type": "integer",
                "format": "Day of birth (1 to 31)",
                "description": "The calendar day of birth of the primary driver / vehicle owner, reducing to the Driver Birth Number (1-9).",
                "required": True
            },
            {
                "field_name": "driver_life_path",
                "data_type": "integer",
                "format": "Reduced Life Path (1 to 9, or Master 11/22/33)",
                "description": "The reduced sum of the primary driver's full date of birth (DD/MM/YYYY).",
                "required": False
            },
            {
                "field_name": "vehicle_category",
                "data_type": "string",
                "format": "enum: [personal_sedan_suv, two_wheeler_motorcycle, commercial_freight_transport, taxi_fleet, luxury_executive, emergency_medical]",
                "description": "The operational category and physical format of the vehicle.",
                "required": False
            }
        ],
        "calculation_steps": [
            {
                "step_number": 1,
                "step_name": "Plate Segmentation & Decomposition",
                "description": (
                    "Decompose the full license plate string into two distinct computational units: "
                    "1) The numeric sequence (the core 4 digits, e.g. '1234'); "
                    "2) The full alphanumeric string including state/district letters and series identifiers (e.g. 'MH02AB1234'). "
                    "Remove spaces, hyphens, and decorative emblems."
                ),
                "formula": "Plate_Digits = [c for c in Plate if c.isdigit()]; Plate_Alphanum = [c for c in Plate if c.isalnum()]"
            },
            {
                "step_number": 2,
                "step_name": "Numeric Sequence Sum & Root Determination",
                "description": (
                    "Sum all digits in the numeric tail sequence. "
                    "This sub-sum represents the vehicle's immediate kinetic vibration on the road (the number visible from afar). "
                    "Reduce the sum to a single digit (1-9) to obtain R_digits."
                ),
                "formula": "S_digits = sum(int(d) for d in Plate_Digits); R_digits = (S_digits - 1) % 9 + 1"
            },
            {
                "step_number": 3,
                "step_name": "Full Alphanumeric Registration Sum & Root Determination",
                "description": (
                    "Convert every letter in the state, district, and series code into its corresponding numerical value using "
                    "the classical Chaldean alphabet table (A=1, B=2, C=3, D=4, E=5, F=8, G=3, H=5, I=1, J=1, K=2, L=3, M=4, "
                    "N=5, O=7, P=8, Q=1, R=2, S=3, T=4, U=6, V=6, W=6, X=5, Y=1, Z=7). "
                    "Add all letter values to the digit sum to compute the total registration compound number (S_full). "
                    "Reduce S_full to a single digit (1-9) to obtain R_full."
                ),
                "formula": "S_full = sum(Chaldean[c] for c in Plate_Letters) + S_digits; R_full = (S_full - 1) % 9 + 1"
            },
            {
                "step_number": 4,
                "step_name": "Kinetic Friction & Collision Vulnerability Assessment",
                "description": (
                    "Evaluate both R_digits and R_full against the modern automotive friction index. "
                    "Numbers 4 (Rahu) and 8 (Saturn) are classified as high kinetic friction numbers: "
                    "Number 4 introduces erratic sudden stops, unpredictable minor dents, and electronic failures; "
                    "Number 8 introduces slow mechanical sluggishness, heavy wear-and-tear, tire punctures, and costly repairs. "
                    "Number 9 (Mars) introduces high kinetic speed, acceleration temptation, and road rage volatility. "
                    "Numbers 1, 3, 5, and 6 are classified as low friction, smooth transit numbers."
                ),
                "formula": "Friction_Index = Evaluate_Friction(R_digits, R_full, vehicle_category)"
            },
            {
                "step_number": 5,
                "step_name": "Driver-Vehicle Concordance Cross-Tabulation",
                "description": (
                    "Compare the Vehicle Root (R_digits) and Full Registration Root (R_full) with the primary Driver's Birth Number (B_driver). "
                    "Apply the planetary friendship (Mitra-Shatru) matrix. "
                    "Classify alignment into Harmonious (Synergistic connection), Neutral (Functional utility), or Inimical (Hostile friction). "
                    "Flag dangerous driver-vehicle pairings: Driver 1 with Vehicle 8; Driver 2 with Vehicle 4 or 8; Driver 8 with Vehicle 1 or 9; Driver 9 with Vehicle 4 or 8."
                ),
                "formula": "Concordance = Mitra_Shatru_Matrix[B_driver][R_digits]"
            },
            {
                "step_number": 6,
                "step_name": "Vehicle Category Suitability Check",
                "description": (
                    "Assess whether the vehicle's vibration matches its operational role. "
                    "For example, Number 8 is unfavorable for personal luxury cars but outstanding for commercial heavy transport trucks and freight logistics. "
                    "Number 5 is ideal for urban taxis, delivery vans, and courier fleets. "
                    "Number 6 is ideal for luxury sedans and family touring cars."
                ),
                "formula": "Role_Fit = Category_Matrix[R_digits][vehicle_category]"
            },
            {
                "step_number": 7,
                "step_name": "Composite Automotive Safety Score & Remedial Harmonization",
                "description": (
                    "Synthesize the findings into an overall safety and concordance score (0 to 100%). "
                    "Weighting: Driver Concordance (40%), Kinetic Friction Safety (30%), Role Suitability (15%), Full Alphanumeric Root (15%). "
                    "Generate practitioner remedial advice (auspicious vehicle colors, dashboard symbols, interior tonal balancing)."
                ),
                "formula": "Score = 0.40 * S_driver + 0.30 * S_friction + 0.15 * S_role + 0.15 * S_alphanumeric"
            }
        ],
        "kinetic_friction_matrix": {
            "1": {
                "root": 1,
                "ruling_planet": "Sun (Surya)",
                "kinetic_temperament": "Commanding, dignified, reliable ignition, smooth linear acceleration",
                "mechanical_reliability": "High electrical stability, clean battery performance, premium interior durability.",
                "road_presence": "Regal, noticeable, drivers tend to yield space; commands natural respect on highways.",
                "friction_tier": "Low Kinetic Friction (Smooth)",
                "safety_rating": "Very Good (85/100)",
                "vulnerabilities": "Minor overheating if driven in aggressive stop-and-go traffic under midday heat."
            },
            "2": {
                "root": 2,
                "ruling_planet": "Moon (Chandra)",
                "kinetic_temperament": "Gentle, fluid, calm cruising, rhythmic oscillation",
                "mechanical_reliability": "Good fluid dynamics; cooling system and wiper mechanics require regular inspection.",
                "road_presence": "Unassuming, peaceful, quiet road presence; blends into traffic flow without confrontation.",
                "friction_tier": "Moderate Kinetic Friction (Sensitive)",
                "safety_rating": "Fair to Good (72/100)",
                "vulnerabilities": "Driver daydreaming, distraction during nighttime or foggy drives, vulnerability to water-logging or rain delays."
            },
            "3": {
                "root": 3,
                "ruling_planet": "Jupiter (Guru)",
                "kinetic_temperament": "Expansive, stable, buoyant, dignified long-distance cruising",
                "mechanical_reliability": "Sturdy suspension, excellent gearbox endurance, broad chassis comfort.",
                "road_presence": "Imposing, benevolent, highly respected; ideal for spacious SUVs and family vans.",
                "friction_tier": "Low Kinetic Friction (Protective)",
                "safety_rating": "Excellent (92/100)",
                "vulnerabilities": "Tendency for high fuel consumption; vehicle feels heavy during rapid urban maneuvering."
            },
            "4": {
                "root": 4,
                "ruling_planet": "Rahu",
                "kinetic_temperament": "Erratic, sudden stops and starts, unexpected acceleration bursts, jarring vibrations",
                "mechanical_reliability": "Frequent electrical glitches, recurring sensor sensor errors, mysterious dashboard warning lights, battery drain.",
                "road_presence": "Unpredictable; other motorists may misjudge its turn signals or braking distances.",
                "friction_tier": "High Kinetic Friction (Collision Vulnerable)",
                "safety_rating": "Caution Advised (52/100)",
                "vulnerabilities": "Prone to unexpected scratches, fender benders in parking lots, and sudden breakdowns on unfamiliar routes. Rash driving must be strictly avoided."
            },
            "5": {
                "root": 5,
                "ruling_planet": "Mercury (Budha)",
                "kinetic_temperament": "Nimble, agile, quick steering response, rapid acceleration, urban darting",
                "mechanical_reliability": "High fuel economy, responsive transmission, agile electronics; tires experience rapid rotational wear.",
                "road_presence": "Lively, swift, maneuvers easily through congested traffic; popular among modern commuters.",
                "friction_tier": "Low Kinetic Friction (Dynamic)",
                "safety_rating": "Very Good (84/100)",
                "vulnerabilities": "Frequent speeding tickets; driver temptation to make hasty lane changes without signaling."
            },
            "6": {
                "root": 6,
                "ruling_planet": "Venus (Shukra)",
                "kinetic_temperament": "Luxurious, plush, gliding ride, acoustically damped, smooth braking",
                "mechanical_reliability": "Excellent air conditioning and comfort systems; aesthetic paint finish prone to dust or superficial swirling.",
                "road_presence": "Sleek, beautiful, admired by onlookers; enhances the owner's prestige at social arrivals.",
                "friction_tier": "Low Kinetic Friction (Aesthetic Harmony)",
                "safety_rating": "Excellent (90/100)",
                "vulnerabilities": "High maintenance expenses for cosmetic upkeep, detailing, and premium seat upholstery."
            },
            "7": {
                "root": 7,
                "ruling_planet": "Ketu",
                "kinetic_temperament": "Solitary, introspective, quiet engine note, steady pace on open highways",
                "mechanical_reliability": "Odd intermittent mechanical quirks that baffle mechanics before resolving themselves.",
                "road_presence": "Subtle, understated, occasionally overlooked by blind-spot mirrors of large commercial trucks.",
                "friction_tier": "Moderate Kinetic Friction (Spiritual / Isolated)",
                "safety_rating": "Fair (68/100)",
                "vulnerabilities": "Navigational disorientation, missing highway exits, GPS signal loss, or sudden tire deflation in remote areas."
            },
            "8": {
                "root": 8,
                "ruling_planet": "Saturn (Shani)",
                "kinetic_temperament": "Heavy, sluggish, deliberate, slow warm-up, immense mechanical torque and endurance",
                "mechanical_reliability": "Exceptional ironclad durability under harsh conditions; heavy wear on brake pads, clutch plates, and shock absorbers.",
                "road_presence": "Somber, formidable, unyielding; behaves like a tank or freight locomotive.",
                "friction_tier": "High Kinetic Friction (Mechanical Drag)",
                "safety_rating": "Mixed (58/100 for Personal Cars; 88/100 for Heavy Freight Trucks)",
                "vulnerabilities": "Frequent travel delays, slow starts in cold weather, recurrent repair bills for personal cars. Driver can feel physically fatigued after driving."
            },
            "9": {
                "root": 9,
                "ruling_planet": "Mars (Mangala)",
                "kinetic_temperament": "High-powered, aggressive, rapid throttle response, raw mechanical roar",
                "mechanical_reliability": "High engine heat output, radiator strain, fast wear on high-performance brake rotors.",
                "road_presence": "Dominating, assertive, competitive; naturally urges other drivers to clear the fast lane.",
                "friction_tier": "High Kinetic Energy (Volatile)",
                "safety_rating": "Good with Caution (70/100)",
                "vulnerabilities": "Road rage incidents, temptation to retaliate against tailgaters, high-speed collision risks if driver lacks disciplined composure."
            }
        },
        "driver_concordance_table": {
            "1": {
                "driver_birth_number": 1,
                "vehicle_root_matches": {
                    "1": {"status": "Harmonious", "score": 95, "note": "Solar identity resonance; vehicle feels like an extension of the driver's will; executive confidence."},
                    "2": {"status": "Harmonious", "score": 88, "note": "Sun-Moon harmony; peaceful journeys, driver intuition is sharp, pleasant family trips."},
                    "3": {"status": "Harmonious", "score": 92, "note": "Sun-Jupiter alliance; grand journeys, highly protective aura, outstanding safety margin."},
                    "4": {"status": "Conflicting", "score": 45, "note": "Surya-Rahu eclipse tension; unexpected electrical malfunctions, disputes with traffic police, sudden minor collisions."},
                    "5": {"status": "Harmonious", "score": 85, "note": "Budhaditya sync; swift business travel, rapid commutes, efficient navigation."},
                    "6": {"status": "Neutral", "score": 65, "note": "Aesthetic comfort; minor disagreements between luxury preferences and practical utility."},
                    "7": {"status": "Neutral", "score": 60, "note": "Ketu detachment; occasional confusion regarding routes; solitary driving is preferred."},
                    "8": {"status": "Inimical / Conflicting", "score": 35, "note": "CRITICAL CONFLICT: Surya-Shani enmity. Chronic breakdowns, delayed trips, persistent repair expenses, driver feels heavy or irritated behind the wheel."},
                    "9": {"status": "Harmonious", "score": 90, "note": "Sun-Mars martial vigor; confident highway overtaking, prompt arrivals, spirited drive."}
                }
            },
            "2": {
                "driver_birth_number": 2,
                "vehicle_root_matches": {
                    "1": {"status": "Harmonious", "score": 90, "note": "Sun provides steady guidance and confidence to the emotive Moon driver."},
                    "2": {"status": "Neutral", "score": 70, "note": "Double Moon; gentle driving, but driver may be overly hesitant at intersections."},
                    "3": {"status": "Harmonious", "score": 85, "note": "Jupiter provides mental composure, wisdom, and protective travel energy."},
                    "4": {"status": "Inimical / Conflicting", "score": 40, "note": "CRITICAL CONFLICT: Rahu afflicts Moon. High anxiety during night driving, sudden near-misses, mysterious sensor faults."},
                    "5": {"status": "Harmonious", "score": 82, "note": "Mercury brings quick mental alertness and pleasant conversational rides."},
                    "6": {"status": "Harmonious", "score": 84, "note": "Venus-Moon water harmony; beautiful aesthetic cabin, soothing road trips."},
                    "7": {"status": "Neutral", "score": 62, "note": "Introspective driving; caution against losing focus during long solitary stretches."},
                    "8": {"status": "Inimical / Conflicting", "score": 38, "note": "CRITICAL CONFLICT: Chandra-Shani Vish Yoga. Depressive feelings while driving, sluggish mechanical response, cold air-conditioning issues."},
                    "9": {"status": "Conflicting", "score": 48, "note": "Mars aggression rattles Moon sensitivity; vehicle feels too abrupt or harsh for the driver."}
                }
            },
            "3": {
                "driver_birth_number": 3,
                "vehicle_root_matches": {
                    "1": {"status": "Harmonious", "score": 92, "note": "Jupiter-Sun alliance; commanding dignity, safe executive transit."},
                    "2": {"status": "Harmonious", "score": 85, "note": "Peaceful domestic journeys, serene cabin atmosphere."},
                    "3": {"status": "Harmonious", "score": 95, "note": "Double Jupiter; maximum spiritual protection, highly reliable long-distance touring."},
                    "4": {"status": "Conflicting", "score": 50, "note": "Rahu disruption clashing with Guru's order; unpredictable route detours and mechanical confusion."},
                    "5": {"status": "Harmonious", "score": 84, "note": "Expansive intellect and agile transit; great for academic or commercial consultancies."},
                    "6": {"status": "Conflicting", "score": 52, "note": "Guru-Shukra philosophical tension; disproportionate spending on vehicle accessories and detailing."},
                    "7": {"status": "Harmonious", "score": 80, "note": "Spiritual alignment; vehicle serves as a peaceful sanctuary for reflective travel."},
                    "8": {"status": "Neutral", "score": 68, "note": "Saturn provides slow steady utility; manageable with disciplined preventive maintenance."},
                    "9": {"status": "Harmonious", "score": 90, "note": "Jupiter directs Mars energy constructively; energetic, safe, and punctual travel."}
                }
            },
            "4": {
                "driver_birth_number": 4,
                "vehicle_root_matches": {
                    "1": {"status": "Conflicting", "score": 48, "note": "Solar authority conflicts with Rahu driver; frequent parking fines and police scrutiny."},
                    "2": {"status": "Conflicting", "score": 45, "note": "Emotional unease; driver feels restless or dissatisfied with vehicle performance."},
                    "3": {"status": "Neutral", "score": 65, "note": "Jupiter stabilizes erratic impulses, though driver may feel constrained by vehicle size."},
                    "4": {"status": "Neutral", "score": 58, "note": "Double Rahu; intense unconventional styling, but double the unpredictable glitches."},
                    "5": {"status": "Harmonious", "score": 88, "note": "Mercury agility channels Rahu's strategic intellect; excellent navigation and tech integration."},
                    "6": {"status": "Harmonious", "score": 86, "note": "Venus softens Rahu's harshness; comfortable, stylish, and enjoyable commutes."},
                    "7": {"status": "Harmonious", "score": 82, "note": "Ketu-Rahu nodal axis sync; unusual routes, night driving affinity, technical endurance."},
                    "8": {"status": "Neutral / Watchful", "score": 65, "note": "Both Saturn and Rahu share affinity, but combined malefic weight requires strict road safety discipline."},
                    "9": {"status": "Inimical / Conflicting", "score": 38, "note": "CRITICAL CONFLICT: Rahu-Mars explosive volatility. Severe risk of rash driving, road rage confrontations, and high-speed hazards."}
                }
            },
            "5": {
                "driver_birth_number": 5,
                "vehicle_root_matches": {
                    "1": {"status": "Harmonious", "score": 88, "note": "Dynamic commercial speed, executive punctuality, swift arrivals."},
                    "2": {"status": "Neutral", "score": 66, "note": "Driver mood swings occasionally slow down rapid travel schedules."},
                    "3": {"status": "Harmonious", "score": 85, "note": "Knowledge journeys, educational trips, high travel enthusiasm."},
                    "4": {"status": "Harmonious", "score": 82, "note": "Tech-savvy driving, clever shortcut discovery, good digital GPS synergy."},
                    "5": {"status": "Harmonious", "score": 94, "note": "Double Mercury; unmatched urban nimbleness, rapid deliveries, joy of driving."},
                    "6": {"status": "Harmonious", "score": 90, "note": "Lakshmi-Budha resonance; elegant, pleasant, attracts business deals during transit."},
                    "7": {"status": "Neutral", "score": 68, "note": "Curiosity driving; occasional unplanned stops and scenic explorations."},
                    "8": {"status": "Neutral", "score": 64, "note": "Vehicle feels heavier than driver prefers; requires patience in heavy traffic."},
                    "9": {"status": "Neutral", "score": 65, "note": "Fast acceleration; driver must monitor speedometer to avoid traffic citations."}
                }
            },
            "6": {
                "driver_birth_number": 6,
                "vehicle_root_matches": {
                    "1": {"status": "Harmonious", "score": 80, "note": "Prestige combination; elegant exterior, reliable performance."},
                    "2": {"status": "Harmonious", "score": 85, "note": "Gentle, aesthetically pleasing journeys; soothing music and calm atmosphere."},
                    "3": {"status": "Conflicting", "score": 55, "note": "Guru-Shukra values clash; high cost of ownership and decorative modifications."},
                    "4": {"status": "Harmonious", "score": 82, "note": "Rahu brings modern futuristic aesthetics to Venus's love of luxury."},
                    "5": {"status": "Harmonious", "score": 92, "note": "Charming, social, effortless city driving, wonderful for hosting guests."},
                    "6": {"status": "Harmonious", "score": 95, "note": "Double Venus; peak luxury, supreme ride comfort, exquisite aesthetic condition."},
                    "7": {"status": "Harmonious", "score": 78, "note": "Refined artistic solitude; peaceful countryside driving."},
                    "8": {"status": "Harmonious", "score": 86, "note": "Venus-Saturn friendship; durable luxury, vehicle maintains strong resale value."},
                    "9": {"status": "Inimical / Conflicting", "score": 42, "note": "CRITICAL CONFLICT: Shukra-Mangala friction. Passionate driving turns volatile; risk of scratches from aggressive overtakers."}
                }
            },
            "7": {
                "driver_birth_number": 7,
                "vehicle_root_matches": {
                    "1": {"status": "Harmonious", "score": 82, "note": "Sun provides clear direction and purpose to the meditative Ketu driver."},
                    "2": {"status": "Neutral", "score": 60, "note": "Quiet rides, but emotional introspection may reduce road vigilance."},
                    "3": {"status": "Harmonious", "score": 84, "note": "Spiritual pilgrimage synergy; vehicle feels like a peaceful study on wheels."},
                    "4": {"status": "Harmonious", "score": 80, "note": "Unconventional technical affinity; vehicle handles rugged terrain well."},
                    "5": {"status": "Harmonious", "score": 78, "note": "Alert navigation keeps driver connected to practical reality."},
                    "6": {"status": "Harmonious", "score": 80, "note": "Quiet comfort; soothing music, clean minimalist cabin."},
                    "7": {"status": "Harmonious", "score": 88, "note": "Double Ketu; ultimate solitary sanctuary, but check dashboard navigation frequently."},
                    "8": {"status": "Neutral", "score": 70, "note": "Saturn provides disciplined endurance on long lonely highway routes."},
                    "9": {"status": "Conflicting", "score": 46, "note": "Martial impatience clashes with Ketu's contemplative rhythm; abrupt stops."}
                }
            },
            "8": {
                "driver_birth_number": 8,
                "vehicle_root_matches": {
                    "1": {"status": "Inimical / Conflicting", "score": 35, "note": "CRITICAL CONFLICT: Shani-Surya deep enmity. Engine troubles, ego friction with other motorists, frequent official penalties."},
                    "2": {"status": "Inimical / Conflicting", "score": 38, "note": "CRITICAL CONFLICT: Shani-Chandra Vish Yoga. Melancholy moods, delayed journeys, poor AC/heating response, driver fatigue."},
                    "3": {"status": "Neutral", "score": 70, "note": "Jupiter provides moral guidance; vehicle is driven cautiously and responsibly."},
                    "4": {"status": "Neutral / Watchful", "score": 68, "note": "Saturn and Rahu understand hard reality; strong mechanical endurance if maintained."},
                    "5": {"status": "Harmonious", "score": 84, "note": "Mercury brings commerce, speed, and mental alertness to Saturn's heavy discipline."},
                    "6": {"status": "Harmonious", "score": 88, "note": "Venus-Saturn friendship; durable luxury, robust vehicle body, great resale retention."},
                    "7": {"status": "Harmonious", "score": 78, "note": "Quiet endurance, patient highway cruising, minimal unnecessary stops."},
                    "8": {"status": "Harmonious", "score": 86, "note": "Double Saturn; supreme mechanical stamina, tank-like reliability, built for heavy labor."},
                    "9": {"status": "Inimical / Conflicting", "score": 36, "note": "CRITICAL CONFLICT: Shani-Mangala warlike friction. Frequent mechanical breakdowns, brake failures, collision vulnerability due to anger."}
                }
            },
            "9": {
                "driver_birth_number": 9,
                "vehicle_root_matches": {
                    "1": {"status": "Harmonious", "score": 94, "note": "Mars-Sun royal alliance; powerful road command, fearless highway transit, rapid arrivals."},
                    "2": {"status": "Harmonious", "score": 82, "note": "Gentle Moon softens Mars's temper; peaceful drives, good family outings."},
                    "3": {"status": "Harmonious", "score": 92, "note": "Mars-Jupiter righteousness; protected journeys, excellent situational awareness."},
                    "4": {"status": "Inimical / Conflicting", "score": 36, "note": "CRITICAL CONFLICT: Mangala-Rahu Angarak explosion. High risk of high-speed collisions, reckless overtaking, aggressive confrontations."},
                    "5": {"status": "Neutral", "score": 65, "note": "Mercury trade transit; driver must resist aggressive multi-tasking while in motion."},
                    "6": {"status": "Conflicting", "score": 45, "note": "Mars-Venus tension; cosmetic damage from aggressive parking maneuvers."},
                    "7": {"status": "Conflicting", "score": 48, "note": "Ketu detachment frustrates Mars urgency; vehicle seems to encounter slow traffic bottlenecks."},
                    "8": {"status": "Inimical / Conflicting", "score": 34, "note": "CRITICAL CONFLICT: Mangala-Shani friction. High collision vulnerability, mechanical resistance, costly engine repairs."},
                    "9": {"status": "Neutral / Volatile", "score": 60, "note": "Double Mars; ferocious kinetic speed and acceleration, but requires strict emotional discipline to avoid accidents."}
                }
            }
        },
        "color_vibration_guidelines": {
            "1": {"favorable": ["Golden", "Ruby Red", "Bronze", "Bright Amber", "White"], "avoid": ["Black", "Dark Blue"]},
            "2": {"favorable": ["Pearl White", "Silver", "Sea Green", "Cream"], "avoid": ["Deep Black", "Dark Red"]},
            "3": {"favorable": ["Yellow", "Golden Amber", "Light Blue", "Warm White"], "avoid": ["Dark Violet", "Jet Black"]},
            "4": {"favorable": ["Electric Blue", "Smoky Grey", "Silver Metallic"], "avoid": ["Fiery Red", "Deep Black"]},
            "5": {"favorable": ["Emerald Green", "Light Grey", "Silver", "Turquoise"], "avoid": ["Dark Brown", "Deep Orange"]},
            "6": {"favorable": ["Metallic Silver", "Cream", "Sky Blue", "Pastel Shades", "Pearl White"], "avoid": ["Intense Fiery Red", "Matte Black"]},
            "7": {"favorable": ["Smoky White", "Light Olive", "Soft Grey", "Pale Green"], "avoid": ["Bright Crimson Red", "Vivid Yellow"]},
            "8": {"favorable": ["Dark Navy Blue", "Steel Grey", "Charcoal Grey", "Deep Metallic"], "avoid": ["Fiery Red", "Pure White"]},
            "9": {"favorable": ["Crimson Red", "Maroon", "Bright Orange", "Warm Tan"], "avoid": ["Black", "Dark Navy Blue"]}
        },
        "practitioner_remedies": {
            "friction_offset_remedy": (
                "When a vehicle plate reduces to conflicting numbers 4 or 8 for a sensitive driver (Birth Number 1, 2, or 9), "
                "modern practitioners recommend applying a subtle, auspicious numeral sticker (e.g. adding a small '+1' or '+5' numeral decal "
                "on the inside edge of the plate or windshield corner) to energetically elevate the total sum into a friendlier vibration."
            ),
            "interior_tonal_remedy": (
                "Install seat covers, steering wraps, or interior dashboard accents in the driver's most harmonic planetary color "
                "to energetically counter kinetic road friction."
            ),
            "protective_dashboard_symbol": (
                "Place a small consecrated geometric yantra (e.g., Hanuman protective yantra for collision safety, or a Ganapati motif) "
                "on the dashboard to anchor driver mindfulness and mitigate Rahu-Saturn kinetic instability."
            )
        },
        "output_schema": {
            "registration_plate": "string",
            "digits_sequence": "string",
            "digits_sum": "integer",
            "digits_root": "integer (1-9)",
            "alphanumeric_sum": "integer",
            "alphanumeric_root": "integer (1-9)",
            "kinetic_friction_assessment": {
                "friction_tier": "string",
                "safety_rating": "string",
                "mechanical_temperament": "string",
                "vulnerabilities": "string"
            },
            "driver_concordance": {
                "driver_birth_number": "integer",
                "concordance_tier": "string (Harmonious | Neutral | Inimical)",
                "concordance_score": "integer (0-100%)",
                "practitioner_guidance": "string"
            },
            "vehicle_category_fit": "string",
            "color_recommendations": {
                "favorable_colors": "array of strings",
                "unfavorable_colors": "array of strings"
            },
            "practitioner_remedial_measures": "array of strings",
            "disclaimer": DISCLAIMER_TEXT
        }
    }

if __name__ == "__main__":
    tool = get_vehicle_number_tool()
    print(f"Tool {tool['tool_id']} compiled successfully.")
