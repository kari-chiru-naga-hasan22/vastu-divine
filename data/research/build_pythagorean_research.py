import json
import os

def build_research():
    # Alphabet table for Pythagorean system
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

    # Harmonic Triads
    harmonic_triads = {
        "mental_intellectual_triad": {
            "numbers": [1, 5, 7],
            "archetype": "The Seekers of Truth, Thought, and Freedom",
            "qualities": "Analytical power, mental independence, progressive inquiry, visionary curiosity",
            "master_resonance": [11]
        },
        "physical_practical_triad": {
            "numbers": [2, 4, 8],
            "archetype": "The Builders, Organizers, and Harmonizers of Form",
            "qualities": "Sensate perception, tactical execution, structural integrity, material mastery",
            "master_resonance": [22]
        },
        "emotional_creative_triad": {
            "numbers": [3, 6, 9],
            "archetype": "The Artists, Nurturers, and Humanitarians",
            "qualities": "Imaginative expression, selfless love, domestic service, cosmic compassion",
            "master_resonance": [33]
        }
    }

    # Tool 1: Life Path Number
    tool_life_path = {
        "tool_id": "life-path",
        "tool_name": "Life Path Number (The Ruling Number)",
        "system": "Pythagorean",
        "tradition_full_name": "Pythagorean / Western Numerological Tradition",
        "source": {
            "title": "The Complete Book of Numerology",
            "author": "Dr. David A. Phillips",
            "edition_or_chapter": "Chapter 5: The Ruling Numbers (The Life Path) & Chapter 10: The Master Numbers",
            "classical_reference": "Pythagoras of Samos (c. 570–c. 495 BC), The Tetractys and the Cosmic Octaves of Numerical Vibration"
        },
        "philosophical_basis": "In classical Pythagorean cosmology, numbers are living energetic archetypes through which the divine Monad manifests the universe. The date of birth is not a random temporal accident, but a precise cosmological coordinate. The Life Path (designated as the 'Ruling Number' by Dr. David A. Phillips) represents the central highway of human incarnation, outlining the primary purpose, core evolutionary lessons, and unalterable spiritual trajectory of the soul.",
        "chaldean_exclusion_statement": "Explicit confirmation: The Life Path Number calculation is based entirely on the Gregorian calendar date of birth and strict Western/Pythagorean numerical reduction. Absolutely no Chaldean alphabet assignments or Chaldean compound number interpretations (e.g. Cheiro's 10-52 system) are utilized.",
        "master_number_rules": {
            "definition": "Master Numbers (11, 22, and 33) are higher octave spiritual frequencies that possess intensified vibrational potency, profound creative-spiritual potential, and severe karmic responsibility.",
            "calculation_rule": "Master Numbers must NEVER be reduced to a single digit during intermediate or final summation stages. When reducing the month, day, or year, if a sub-sum yields 11, 22, or 33, it is preserved intact. If the final summation yields 11, 22, or 33, it remains a Master Ruling Number.",
            "octave_relationship": {
                "11": "Higher octave of 2 (Spiritual Illuminator / Intuitive Channel). Balances between 11 visionary power and 2 cooperative diplomacy.",
                "22": "Higher octave of 4 (Master Builder / Architect of Civilization). Fuses 22 visionary scale with 4 practical discipline.",
                "33": "Higher octave of 6 (Master Teacher / Cosmic Healer). Merges 33 unconditional cosmic love with 6 domestic and community responsibility."
            }
        },
        "calculation_steps": [
            {
                "step_number": 1,
                "name": "Date Decomposition",
                "description": "Decompose the full calendar date of birth into three distinct temporal units: Month (MM), Day (DD), and Year (YYYY).",
                "formula": "Date = (MM, DD, YYYY)"
            },
            {
                "step_number": 2,
                "name": "Component Reduction (3-Cycle Western Method)",
                "description": "Reduce each component individually while strictly preserving Master Numbers (11, 22, 33):\n- Month (M): If November (11), preserve 11. Otherwise sum digits until 1-9.\n- Day (D): If born on the 11th or 22nd, preserve as Master Number. If 29th (2+9=11), preserve 11. Otherwise sum digits until 1-9.\n- Year (Y): Sum all four digits (e.g. 1984 -> 1+9+8+4 = 22, preserved as Master Number; 1976 -> 1+9+7+6 = 23 -> 2+3 = 5).",
                "formula": "V_M = Reduce(MM, preserve={11}); V_D = Reduce(DD, preserve={11, 22}); V_Y = Reduce(YYYY, preserve={11, 22, 33})"
            },
            {
                "step_number": 3,
                "name": "Final Life Path Summation",
                "description": "Sum the three reduced component vibrations: Total = V_M + V_D + V_Y. If Total equals 11, 22, or 33, retain as Master Life Path Number. Otherwise, reduce Total by summing its digits until a single digit between 1 and 9 is obtained.",
                "formula": "LifePath = Total in {11, 22, 33} ? Total : SingleDigitReduce(Total)"
            },
            {
                "step_number": 4,
                "name": "Alternative Direct Total Method (Dr. David A. Phillips Formulation)",
                "description": "Dr. David A. Phillips also emphasizes summing every single digit of the full birthdate sequentially: Sum = d1 + d2 + m1 + m2 + y1 + y2 + y3 + y4. If Sum equals 11, 22, or 33, it is recognized as a Master Ruling Number. If Sum exceeds 9 and is not a master number, reduce by adding the digits (e.g., May 14, 1976: 1+4+0+5+1+9+7+6 = 33 -> Master 33/6; July 25, 1993: 2+5+0+7+1+9+9+3 = 36 -> 3+6 = 9). Both methods produce concordant archetypal alignments.",
                "formula": "Sum = Sum(digits of DD/MM/YYYY) -> Preserve {11, 22, 33} else SingleDigitReduce"
            }
        ],
        "calculation_examples": [
            {
                "example_case": "Standard Single Digit (Life Path 7)",
                "input_date": "April 25, 1976",
                "breakdown": {
                    "month": "April (04) -> 4",
                    "day": "25 -> 2 + 5 = 7",
                    "year": "1976 -> 1 + 9 + 7 + 6 = 23 -> 2 + 3 = 5",
                    "cycle_sum": "4 + 7 + 5 = 16 -> 1 + 6 = 7",
                    "direct_sum": "0 + 4 + 2 + 5 + 1 + 9 + 7 + 6 = 34 -> 3 + 4 = 7"
                },
                "result": "Life Path 7"
            },
            {
                "example_case": "Master Number 11 (Life Path 11/2)",
                "input_date": "November 19, 1989",
                "breakdown": {
                    "month": "November -> 11 (preserved)",
                    "day": "19 -> 1 + 9 = 10 -> 1",
                    "year": "1989 -> 1 + 9 + 8 + 9 = 27 -> 2 + 7 = 9",
                    "cycle_sum": "11 + 1 + 9 = 21 -> 2 + 1 = 3 (Note: Direct digit sum: 1+1+1+9+1+9+8+9 = 39 -> 3+9 = 12 -> 3)"
                },
                "result": "Life Path 3 (Example showing standard reduction)"
            },
            {
                "example_case": "True Master Number 11 Example",
                "input_date": "October 29, 1980",
                "breakdown": {
                    "month": "October (10) -> 1 + 0 = 1",
                    "day": "29 -> 2 + 9 = 11 (preserved)",
                    "year": "1980 -> 1 + 9 + 8 + 0 = 18 -> 1 + 8 = 9",
                    "cycle_sum": "1 + 11 + 9 = 21 -> 3. Direct digit sum: 1+0+2+9+1+9+8+0 = 30 -> 3."
                },
                "result": "Life Path with strong Master Day 11"
            },
            {
                "example_case": "Direct Master Number 11 Example",
                "input_date": "November 2, 1970",
                "breakdown": {
                    "month": "November -> 11",
                    "day": "02 -> 2",
                    "year": "1970 -> 1 + 9 + 7 + 0 = 17 -> 8",
                    "cycle_sum": "11 + 2 + 8 = 21. Direct sum: 1+1+0+2+1+9+7+0 = 20 -> 2."
                },
                "result": "Life Path 2/11"
            },
            {
                "example_case": "True Master Number 22 (22/4)",
                "input_date": "November 11, 1980",
                "breakdown": {
                    "month": "11 (preserved)",
                    "day": "11 (preserved)",
                    "year": "1980 -> 1 + 9 + 8 + 0 = 18 -> 9",
                    "cycle_sum": "11 + 11 + 9 = 31 -> 4",
                    "direct_sum": "1 + 1 + 1 + 1 + 1 + 9 + 8 + 0 = 22 (Direct Master Builder 22/4)"
                },
                "result": "Master Life Path 22/4"
            },
            {
                "example_case": "True Master Number 33 (33/6)",
                "input_date": "May 14, 1976",
                "breakdown": {
                    "month": "May (05) -> 5",
                    "day": "14 -> 1 + 4 = 5",
                    "year": "1976 -> 1 + 9 + 7 + 6 = 23 -> 5",
                    "cycle_sum": "5 + 5 + 5 = 15 -> 1 + 5 = 6",
                    "direct_sum": "0 + 5 + 1 + 4 + 1 + 9 + 7 + 6 = 33 (Direct Master Teacher 33/6)"
                },
                "result": "Master Life Path 33/6"
            }
        ],
        "interpretation_matrix": {
            "1": {
                "title": "The Pioneer & Originator (The Monad)",
                "archetype": "The Independent Leader & Creative Pioneer",
                "ruling_planet": "Sun (Western Esoteric)",
                "key_traits": ["Self-reliant", "Pioneering", "Original", "Courageous", "Ambitious", "Commanding"],
                "evolutionary_mission": "To master autonomous self-expression, initiate groundbreaking paths, and lead others with integrity without descending into tyranny or self-isolation.",
                "strengths": "Innate executive courage, inventive genius, fierce determination, ability to thrive under solitude and trailblaze uncharted domains.",
                "shadow_aspects": "Authoritarian arrogance, egocentrism, intolerance of others' limitations, stubborn isolation, aggressiveness.",
                "ideal_vocations": ["Entrepreneur", "Executive Director", "Inventor", "Military Strategist", "Autonomous Consultant"],
                "dr_david_phillips_commentary": "In Dr. Phillips's system, 1 represents the pure expression of human individuality and ego. While individuals rarely have a direct Ruling Number 1 under his sum method (which starts at 2/10), those who reduce to 1 (or 10) possess the supreme gift of adaptability and self-determined leadership."
            },
            "2": {
                "title": "The Peacemaker & Diplomat (The Dyad)",
                "archetype": "The Sensitive Harmonizer & Master of Subtlety",
                "ruling_planet": "Moon (Western Esoteric)",
                "key_traits": ["Diplomatic", "Intuitive", "Cooperative", "Empathetic", "Patient", "Devoted"],
                "evolutionary_mission": "To achieve harmony in duality, cultivate emotional poise, and serve as the glue that binds disparate elements through peacemaking and profound receptive insight.",
                "strengths": "Superb emotional intelligence, innate psychic sensitivity, exceptional diplomatic mediation, steadfast loyalty, aesthetic appreciation.",
                "shadow_aspects": "Over-sensitivity to criticism, crippling indecisiveness, codependency, martyrdom, passive-aggressive resentment.",
                "ideal_vocations": ["Diplomat", "Counselor", "Mediator", "Artisan", "Executive Assistant", "Psychologist"],
                "dr_david_phillips_commentary": "Dr. Phillips designates Ruling Number 2 as a rare and exceptionally sensitive vibration. They are gentle, intuitive, and peacemakers who perform best in partnership rather than solitary autocratic leadership."
            },
            "3": {
                "title": "The Communicator & Creative Spark (The Triad)",
                "archetype": "The Expressive Optimist & Master of Synthesis",
                "ruling_planet": "Jupiter (Western Esoteric)",
                "key_traits": ["Artistic", "Witty", "Expressive", "Charismatic", "Optimistic", "Intellectually Quick"],
                "evolutionary_mission": "To elevate human consciousness through authentic self-expression, joyful creativity, verbal articulation, and optimistic synthesis of life's complexities.",
                "strengths": "Brilliant verbal and written eloquence, infectious enthusiasm, spontaneous problem-solving, magnetic social presence.",
                "shadow_aspects": "Scattered mental focus, superficiality, gossip, harsh critical barbs disguised as humor, self-doubt when unpraised.",
                "ideal_vocations": ["Writer", "Actor", "Journalist", "Public Speaker", "Marketing Strategist", "Designer"],
                "dr_david_phillips_commentary": "Dr. Phillips emphasizes that Ruling Number 3 centers on the Mind Plane. They possess a razor-sharp mental capacity, quick wit, and bright intellectual curiosity, but must avoid being hypercritical of others."
            },
            "4": {
                "title": "The Master of Order & Foundation (The Tetrad)",
                "archetype": "The Methodical Builder & Anchor of Reality",
                "ruling_planet": "Earth / Saturn / Uranus (Western Esoteric)",
                "key_traits": ["Methodical", "Dependable", "Practical", "Disciplined", "Constructive", "Logical"],
                "evolutionary_mission": "To ground visionary ideas into concrete, enduring physical structures, establishing order, integrity, and operational mastery in the material realm.",
                "strengths": "Unrivaled work ethic, immense stamina, organizational genius, unwavering reliability, commitment to tangible truth.",
                "shadow_aspects": "Dogmatic rigidity, resistance to inevitable change, obsessive micro-management, workaholism, emotional withholding.",
                "ideal_vocations": ["Architect", "Civil Engineer", "Chief Operations Officer", "Accountant", "Judge", "Software Architect"],
                "dr_david_phillips_commentary": "Dr. Phillips places Ruling Number 4 firmly on the Physical Plane. These individuals are practical, systematic, and hands-on builders who crave material security and demand clear procedures."
            },
            "5": {
                "title": "The Free Spirit & Dynamic Catalyst (The Pentad)",
                "archetype": "The Versatile Adventurer & Champion of Liberty",
                "ruling_planet": "Mercury (Western Esoteric)",
                "key_traits": ["Adventurous", "Versatile", "Progressive", "Curious", "Magnetic", "Adaptable"],
                "evolutionary_mission": "To explore the spectrum of earthly experience, embrace dynamic transformation, champion personal freedom, and inspire humanity to break stagnant boundaries.",
                "strengths": "Exceptional adaptability, multicultural resonance, quick recovery from setbacks, visionary resourcefulness, dynamic communicative charisma.",
                "shadow_aspects": "Restlessness, impulsivity, sensory indulgence, avoidance of deep commitment, reckless risk-taking.",
                "ideal_vocations": ["Travel Journalist", "Foreign Correspondent", "Public Relations Specialist", "Explorer", "Sales Innovator"],
                "dr_david_phillips_commentary": "Dr. Phillips identifies Number 5 as the central node of the Soul Plane and the central bridge of the Pythagorean grid. Ruling Number 5 individuals possess a desperate need for freedom and express deep emotional sensitivity through adventure."
            },
            "6": {
                "title": "The Nurturer & Cosmic Caregiver (The Hexad)",
                "archetype": "The Loving Harmonizer & Guardian of Community",
                "ruling_planet": "Venus (Western Esoteric)",
                "key_traits": ["Nurturing", "Responsible", "Compassionate", "Artistic", "Protective", "Harmonious"],
                "evolutionary_mission": "To anchor unconditional love, heal fractured relationships, provide domestic sanctuary, and elevate human welfare through selfless artistic and emotional service.",
                "strengths": "Profound counseling empathy, aesthetic sensitivity, moral fortitude, willingness to shoulder familial and social responsibility.",
                "shadow_aspects": "Smothering overprotection, self-righteous interference, martyr complex, chronic anxiety over loved ones, perfectionism.",
                "ideal_vocations": ["Doctor", "Teacher", "Interior Architect", "Social Worker", "Family Counselor", "Hospitality Executive"],
                "dr_david_phillips_commentary": "Dr. Phillips highlights Ruling Number 6 as an intensely creative and loving vibration centered in the Soul Plane. They excel in humanitarian care and artistic design, but must beware of excessive worry and over-anxiety."
            },
            "7": {
                "title": "The Mystic & Philosophical Seeker (The Heptad)",
                "archetype": "The Introspective Analyst & Sacred Sage",
                "ruling_planet": "Neptune / Moon (Western Esoteric)",
                "key_traits": ["Analytical", "Philosophical", "Introspective", "Spiritual", "Perceptive", "Solitary"],
                "evolutionary_mission": "To pierce the veil of surface reality, unite empirical intellect with esoteric mysticism, and distill profound cosmic wisdom from life's rigorous trials.",
                "strengths": "Incisive analytical intellect, profound spiritual depth, unshakeable search for fundamental truth, intuitive diagnostic ability.",
                "shadow_aspects": "Cynical skepticism, emotional aloofness, social alienation, secretiveness, melancholy, escapism.",
                "ideal_vocations": ["Philosopher", "Scientific Researcher", "Data Scientist", "Theologian", "Forensic Investigator", "Metaphysician"],
                "dr_david_phillips_commentary": "Dr. Phillips considers Ruling Number 7 one of the most spiritually profound yet challenging vibrations. Number 7 learns its deepest truths through physical sacrifice and personal trial, evolving into an enlightened guide for humanity."
            },
            "8": {
                "title": "The Executive & Master of Abundance (The Ogdoad)",
                "archetype": "The Authoritative Manifestor & Karmic Arbiter",
                "ruling_planet": "Saturn (Western Esoteric)",
                "key_traits": ["Authoritative", "Strategic", "Commercially Astute", "Resilient", "Discerning", "Fair"],
                "evolutionary_mission": "To master the material and financial currents of the physical world, wielding executive power with cosmic justice, abundance, and philanthropic stewardship.",
                "strengths": "Unmatched commercial acumen, natural executive authority, strategic macro-vision, formidable resilience against crisis.",
                "shadow_aspects": "Ruthless materialism, obsession with status and wealth, emotional detachment, abuse of authority, stubborn control.",
                "ideal_vocations": ["Corporate CEO", "Investment Banker", "Real Estate Developer", "High Court Justice", "Industrial Magnate"],
                "dr_david_phillips_commentary": "Dr. Phillips notes that Ruling Number 8 individuals are highly independent and naturally command commercial authority. Located on the Physical Plane, they possess an acute sense of self-discipline, financial insight, and organizational control."
            },
            "9": {
                "title": "The Humanitarian & Universal Completer (The Ennead)",
                "archetype": "The Compassionate Visionary & Elder Soul",
                "ruling_planet": "Mars / Jupiter (Western Esoteric)",
                "key_traits": ["Humanitarian", "Selfless", "Visionary", "Artistic", "Philosophical", "Generous"],
                "evolutionary_mission": "To transcend narrow personal concerns, embody universal compassion, serve global upliftment, and release karmic attachments with selfless dignity.",
                "strengths": "Broad global consciousness, deep human empathy, magnetic dramatic expression, willingness to champion the downtrodden.",
                "shadow_aspects": "Impractical idealism, emotional burnout, bitter disillusionment with human flaws, inability to let go of past grievances.",
                "ideal_vocations": ["International Diplomat", "Philanthropist", "Human Rights Lawyer", "Fine Artist", "Environmental Leader"],
                "dr_david_phillips_commentary": "Dr. Phillips identifies Ruling Number 9 as embodying the highest mental and spiritual responsibilities. They are guided by three major virtues: ambition, responsibility, and idealism, carrying an innate duty to serve humanity."
            },
            "11": {
                "title": "The Spiritual Illuminator (Master Number 11/2)",
                "archetype": "The Master Intuitive & Cosmic Conduit",
                "ruling_planet": "Uranus / Moon (Western Esoteric)",
                "key_traits": ["Intuitive", "Visionary", "Inspirational", "Idealistic", "Sensitive", "Enlightened"],
                "evolutionary_mission": "To act as an electric bridge between the spiritual realms and the physical plane, illuminating truth, awakening consciousness, and inspiring humanity through elevated moral vision.",
                "strengths": "Extraordinary psychic and spiritual intuition, ability to channel higher cosmic inspiration, magnetic spiritual presence, visionary clarity.",
                "shadow_aspects": "Severe nervous exhaustion, overwhelming anxiety, fear of failure, falling into fanatical zealotry or retreating into timid passive dependency (unconscious 2 vibration).",
                "ideal_vocations": ["Spiritual Teacher", "Visionary Philosopher", "Psychic Researcher", "Inspirational Author", "Transformational Speaker"],
                "dr_david_phillips_commentary": "Dr. Phillips devotes Chapter 10 to Master Number 11, emphasizing its rare spiritual calling. An 11 holds immense psychic capacity and must remain grounded, otherwise the high voltage of their vibration causes severe nervous strain."
            },
            "22": {
                "title": "The Master Builder (Master Number 22/4)",
                "archetype": "The Architect of Civilization & Practical Titan",
                "ruling_planet": "Pluto / Earth (Western Esoteric)",
                "key_traits": ["Visionary", "Masterful", "Pragmatic", "Monumental", "Tenacious", "Organized"],
                "evolutionary_mission": "To materialize sweeping, large-scale projects that tangibly alter human civilization for the better, marrying supreme mystical vision with flawless pragmatic execution.",
                "strengths": "Ability to envision grand systemic architectures and simultaneously engineer the intricate practical steps to build them, monumental stamina, institutional leadership.",
                "shadow_aspects": "Crushing self-imposed pressure, megalomania, devastating collapse under stress, regression into rigid bureaucratic pettiness (unconscious 4 vibration).",
                "ideal_vocations": ["Civilization Planner", "International Infrastructure Architect", "Global Enterprise Founder", "World Bank / UN Leader", "Technological Pioneer"],
                "dr_david_phillips_commentary": "Dr. Phillips regards 22/4 as the most powerful single Ruling Number in numerology. Only those with immense dedication and moral grounding can fully live up to its potential without succumbing to materialism or nervous breakdown."
            },
            "33": {
                "title": "The Master Teacher (Master Number 33/6)",
                "archetype": "The Cosmic Avatar of Love & Universal Healer",
                "ruling_planet": "Neptune / Venus (Western Esoteric)",
                "key_traits": ["Compassionate", "Selfless", "Sanctified", "Inspirational", "Protective", "Cosmically Loving"],
                "evolutionary_mission": "To embody Christ-like or Bodhisattva-like compassion, taking on the burdens of collective suffering, teaching universal love through personal example, and uplifting global community consciousness.",
                "strengths": "Limitless spiritual empathy, divine artistic and therapeutic genius, transformative healing energy, absolute moral courage in the defense of innocence.",
                "shadow_aspects": "Martyrdom to the point of complete physical and psychological devastation, overwhelming messiah complex, inability to preserve personal boundaries (unconscious 6 over-interference).",
                "ideal_vocations": ["Universal Spiritual Master", "World Humanitarian Leader", "Holistic Master Healer", "Inspirational Educator", "Foundational Philanthropist"],
                "dr_david_phillips_commentary": "Dr. Phillips highlights Master Number 33 as the supreme vibration of unconditional love and spiritual teaching. It combines the expressive power of 3 with the loving nurturing of 6 raised to the master degree."
            }
        },
        "disclaimer": "This is a traditional esoteric belief system, not an empirical or scientific claim."
    }

    # Tool 2: Birth Number
    tool_birth_number = {
        "tool_id": "birth-number",
        "tool_name": "Birth Number (The Day of Birth Vibration / Day Ruler)",
        "system": "Pythagorean",
        "tradition_full_name": "Pythagorean / Western Numerological Tradition",
        "source": {
            "title": "The Complete Book of Numerology",
            "author": "Dr. David A. Phillips",
            "edition_or_chapter": "Chapter 4: The Day of Birth / The Ruler of the Day",
            "classical_reference": "Classical Western esoteric mathematics, Pythagorean Monad-to-Ennead daily cycles"
        },
        "philosophical_basis": "While the Life Path represents the macrocosmic destiny and ultimate evolutionary curriculum, the Birth Number (the calendar day of birth, 1 to 31) represents the microcosmic toolkit: the instinctive operational personality, direct tactical talents, immediate behavioral style, and reactive temperament that an individual brings into daily life.",
        "chaldean_exclusion_statement": "Explicit confirmation: The Birth Number is derived solely from the calendar day of birth (1-31) and reduced using standard Western Pythagorean base-10 mathematics. No planetary day rulerships or compound number occult meanings from Chaldean/Cheiro traditions are used.",
        "master_number_rules": {
            "definition": "In the daily cycle of 1 to 31, days 11 and 22 are recognized as Master Birth Days. Day 29 reduces directly to 11 (2+9=11), conferring a secondary Master 11 vibration.",
            "operational_rule": "Individuals born on the 11th or 22nd possess an immediate dual-level toolkit: they experience the heightened spiritual, intuitive, and visionary demands of the Master Number, while simultaneously operating through the grounded base root (2 or 4) for daily functional stability."
        },
        "calculation_steps": [
            {
                "step_number": 1,
                "name": "Extract Calendar Day",
                "description": "Extract the integer calendar day of birth (DD) from 1 through 31.",
                "formula": "DD in {1, 2, ..., 31}"
            },
            {
                "step_number": 2,
                "name": "Check for Master Days",
                "description": "If DD is 11 or 22, it is designated as a Master Birth Day (11/2 or 22/4). If DD is 29, 2 + 9 = 11, which carries the secondary Master 11/2 signature.",
                "formula": "IsMaster = DD in {11, 22, 29}"
            },
            {
                "step_number": 3,
                "name": "Single Digit Reduction",
                "description": "For all days from 1 to 31 (except pure preservation of 11 and 22), sum the two digits (d1 + d2) to reveal the primary root vibration from 1 to 9.",
                "formula": "BirthRoot = DD <= 9 ? DD : SingleDigitSum(DD)"
            },
            {
                "step_number": 4,
                "name": "Compound Day Nuance Analysis",
                "description": "Analyze the specific flavor contributed by the compound digits (e.g., Day 10 brings 1 with expanded zero potential; Day 19 brings 1 through karmic completion 1+9=10->1; Day 28 brings 1 through diplomatic-executive synthesis 2+8=10->1).",
                "formula": "Nuance = Table[DD]"
            }
        ],
        "full_31_days_catalog": {
            "1": "Root 1: The pure individualist; independent, original, pioneer.",
            "2": "Root 2: The pure peacemaker; gentle, intuitive, sensitive, cooperative.",
            "3": "Root 3: The pure communicator; witty, artistic, expressive, cheerful.",
            "4": "Root 4: The pure builder; practical, orderly, honest, disciplined.",
            "5": "Root 5: The pure adventurer; freedom-loving, adaptable, magnetic.",
            "6": "Root 6: The pure nurturer; domestic, loving, responsible, aesthetic.",
            "7": "Root 7: The pure seeker; analytical, philosophical, solitary, investigative.",
            "8": "Root 8: The pure executive; ambitious, authoritative, business-minded, resilient.",
            "9": "Root 9: The pure humanitarian; compassionate, idealistic, broad-minded, dramatic.",
            "10": "Root 1: High adaptability, executive power, fearless initiative.",
            "11": "Master 11/2: Heightened spiritual intuition, inspirational guide, sensitive channel.",
            "12": "Root 3: Practical imagination, friendly counselor, creative communicator.",
            "13": "Root 4: The disciplined craftsman; transforms hardship into enduring practical foundation.",
            "14": "Root 5: Dynamic traveler, progressive innovator, learns balance through change.",
            "15": "Root 6: Artistic charmer, magnetic counselor, home and community protector.",
            "16": "Root 7: Deep spiritual analyst; sheds superficiality to attain esoteric wisdom.",
            "17": "Root 8: Financial strategist, independent planner, combining intuition with material power.",
            "18": "Root 9: Humanitarian organizer, strong administrative mind serving social causes.",
            "19": "Root 1: Dynamic pioneer; overcomes isolation to embody compassionate leadership.",
            "20": "Root 2: Peacemaking diplomat, supportive partner, highly intuitive mediator.",
            "21": "Root 3: Charming speaker, creative writer, socially magnetic and artistic.",
            "22": "Master 22/4: The master builder; visionary architect of large practical systems.",
            "23": "Root 5: Quick-witted, versatile problem-solver, highly expressive communicator.",
            "24": "Root 6: Loyal guardian, energetic family anchor, committed peacemaker.",
            "25": "Root 7: Deep contemplative researcher, intuitive thinker, combines analysis with feeling.",
            "26": "Root 8: Practical executive, astute manager, balancing material ambition with family care.",
            "27": "Root 9: Inspiring humanitarian, literary and philosophical talent, universal lover.",
            "28": "Root 1: Collaborative leader; executive strength tempered by diplomatic sensitivity.",
            "29": "Master 11/2 (via 29): Deeply spiritual, visionary mediator, intensely psychic.",
            "30": "Root 3: Playful artist, eloquent orator, uplifting and optimistic social leader.",
            "31": "Root 4: Creative organizer, determined builder, combining mental skill with concrete effort."
        },
        "interpretation_matrix": {
            "1": {
                "title": "Birth Day Vibration 1 (Days 1, 10, 19, 28)",
                "archetype": "The Natural Leader & Autonomous Operator",
                "core_temperament": "Direct, self-motivated, ambitious, assertive, competitive.",
                "practical_talents": "Initiating projects from scratch, taking decisive executive command, thriving without supervision, innovative problem solving.",
                "interpersonal_style": "Authoritative, outspoken, respects competence, dislikes being managed.",
                "growth_area": "Learning to listen patiently to colleagues and moderating autocratic tendencies."
            },
            "2": {
                "title": "Birth Day Vibration 2 (Days 2, 20)",
                "archetype": "The Cooperative Partner & Empathetic Diplomat",
                "core_temperament": "Gentle, reflective, diplomatic, sensitive to environment, peaceful.",
                "practical_talents": "Conflict resolution, subtle negotiation, aesthetic discernment, supportive team integration.",
                "interpersonal_style": "Courteous, reassuring, attentive, avoids open confrontation.",
                "growth_area": "Developing thicker skin against perceived slights and asserting personal needs clearly."
            },
            "3": {
                "title": "Birth Day Vibration 3 (Days 3, 12, 21, 30)",
                "archetype": "The Expressive Communicator & Creative Catalyst",
                "core_temperament": "Enthusiastic, buoyant, articulate, socially engaging, inventive.",
                "practical_talents": "Verbal storytelling, artistic presentation, public relations, creative writing, boosting morale.",
                "interpersonal_style": "Charming, humorous, warm, intellectually curious, thrives in lively dialogue.",
                "growth_area": "Focusing sustained effort to completion and avoiding sarcastic or glib commentary."
            },
            "4": {
                "title": "Birth Day Vibration 4 (Days 4, 13, 31)",
                "archetype": "The Methodical Builder & Reliable Anchor",
                "core_temperament": "Grounded, systematic, steadfast, cautious, industrious.",
                "practical_talents": "Structural planning, process optimization, financial budgeting, meticulous operational follow-through.",
                "interpersonal_style": "Straightforward, honest, dependable, values punctuality and concrete evidence.",
                "growth_area": "Allowing spontaneous flexibility and resisting stubborn resistance to new procedures."
            },
            "5": {
                "title": "Birth Day Vibration 5 (Days 5, 14, 23)",
                "archetype": "The Dynamic Explorer & Resourceful Agent of Change",
                "core_temperament": "Restless, curious, quick-thinking, sensory-oriented, liberty-loving.",
                "practical_talents": "Rapid multitasking, crisis management, cross-cultural networking, promoting cutting-edge concepts.",
                "interpersonal_style": "Magnetic, stimulating, persuasive, thrives in fast-paced unstructured environments.",
                "growth_area": "Cultivating patience with routine tasks and resisting destructive impulsive diversions."
            },
            "6": {
                "title": "Birth Day Vibration 6 (Days 6, 15, 24)",
                "archetype": "The Nurturing Guardian & Harmonious Advisor",
                "core_temperament": "Protective, responsible, community-oriented, artistic, sympathetic.",
                "practical_talents": "Domestic architecture, personal counseling, mediation of family disputes, aesthetic decoration, hospitality.",
                "interpersonal_style": "Generous, hospitable, supportive, deeply concerned with others' wellbeing.",
                "growth_area": "Relinquishing the urge to micromanage others' lives and shedding the martyr complex."
            },
            "7": {
                "title": "Birth Day Vibration 7 (Days 7, 16, 25)",
                "archetype": "The Analytical Sage & Intuitive Specialist",
                "core_temperament": "Introspective, observant, philosophical, discerning, reserved.",
                "practical_talents": "In-depth scientific research, technical analysis, spiritual inquiry, diagnostic problem-solving.",
                "interpersonal_style": "Selective, polite but emotionally guarded, prefers solitary reflection over small talk.",
                "growth_area": "Bridging emotional distance with loved ones and avoiding cynical isolation."
            },
            "8": {
                "title": "Birth Day Vibration 8 (Days 8, 17, 26)",
                "archetype": "The Strategic Executive & Material Architect",
                "core_temperament": "Ambitious, realistic, confident, strong-willed, commercially acute.",
                "practical_talents": "Financial management, organizational leadership, resource allocation, negotiation under high stakes.",
                "interpersonal_style": "Commanding, respectful of authority and merit, goal-oriented, concise.",
                "growth_area": "Balancing material ambitions with genuine emotional warmth and humility."
            },
            "9": {
                "title": "Birth Day Vibration 9 (Days 9, 18, 27)",
                "archetype": "The Universal Humanitarian & Cultured Soul",
                "core_temperament": "Compassionate, generous, broad-minded, dramatic, idealistic.",
                "practical_talents": "Inspiring collective action, artistic direction, philanthropic organization, cross-cultural leadership.",
                "interpersonal_style": "Charismatic, open-hearted, inspiring, views people without petty prejudice.",
                "growth_area": "Accepting practical realities without bitter disillusionment when ideals are not fully realized."
            },
            "11": {
                "title": "Birth Day Master Vibration 11 (Days 11, 29)",
                "archetype": "The Intuitive Channel & Visionary Awakener",
                "core_temperament": "Electrically sensitive, visionary, morally driven, highly perceptive, idealistic.",
                "practical_talents": "Spiritual teaching, intuitive diagnosis, visionary guidance, inspiring moral reform.",
                "interpersonal_style": "Deeply empathetic, intense, magnetic, seeks profound authentic communion.",
                "growth_area": "Grounding physical nervous energy to avoid chronic tension and emotional burnout."
            },
            "22": {
                "title": "Birth Day Master Vibration 22 (Day 22)",
                "archetype": "The Master Manifestor & Pragmatic Visionary",
                "core_temperament": "Monumentally ambitious, practical yet transcendent, deeply disciplined, structured.",
                "practical_talents": "Large-scale institutional planning, engineering complex systems, converting radical dreams into physical reality.",
                "interpersonal_style": "Authoritative, dignified, inspiring through quiet competence, demanding of excellence.",
                "growth_area": "Managing overwhelming expectations and pacing physical stamina over decades."
            },
            "33": {
                "title": "Birth Day Synthetic Master Vibration 33",
                "archetype": "The Universal Healer & Sanctified Guide",
                "core_temperament": "Unconditionally loving, altruistic, creatively expressive, spiritually radiant.",
                "practical_talents": "Profound spiritual counseling, selfless educational leadership, universal artistic service.",
                "interpersonal_style": "Completely welcoming, radiant, elevating others effortlessly.",
                "growth_area": "Guarding emotional and physical reserves against parasitic drain.",
                "note": "While no calendar month contains 33 days, 33 functions as a recognized synthetic master birth harmonic when day calculations interface with compound master configurations."
            }
        },
        "disclaimer": "This is a traditional esoteric belief system, not an empirical or scientific claim."
    }

    # Tool 3: Destiny Number / Expression Number
    tool_destiny_number = {
        "tool_id": "destiny-number",
        "tool_name": "Destiny Number / Expression Number (The Full Name Vibration)",
        "system": "Pythagorean",
        "tradition_full_name": "Pythagorean / Western Numerological Tradition",
        "source": {
            "title": "The Complete Book of Numerology",
            "author": "Dr. David A. Phillips",
            "edition_or_chapter": "Chapter 9: The Expression / Destiny Number and Name Grid & Chapter 10: Master Numbers in the Name",
            "classical_reference": "Pythagorean Gematria / Isopsephy adapted to the Latin/Western 26-letter alphabet"
        },
        "philosophical_basis": "While the date of birth indicates the soul's karmic blueprint and timing, the full name given at birth represents the conscious instrument and personal vehicle through which that life is expressed. In Western Pythagorean numerology, the Expression (or Destiny) Number reveals an individual's worldly abilities, natural vocational talents, communicative output, and the active persona through which they impact human society.",
        "chaldean_exclusion_statement": "Explicit confirmation: Absolutely NO Chaldean letter values (where A=1, B=2, C=3, D=4, E=5, U=6, O=7, F=8, with 9 omitted) are used. This calculation strictly employs the classical 9-fold Western Pythagorean alphabet table where letters A through Z map in sequential order from 1 to 9. The number 9 is fully active (I=9, R=9).",
        "pythagorean_alphabet_table": pythagorean_alphabet_table,
        "master_number_rules": {
            "definition": "When totaling the letters of a full legal birth name, Master Numbers 11, 22, and 33 are preserved at both the individual name level (First, Middle, Last) and the final combined expression sum.",
            "operational_rule": "If the sum of letters in any single name equals 11, 22, or 33, it is held as a master component. If the grand sum of all name components equals 11, 22, or 33, the person is an Expression Master, indicating an extraordinary capacity for spiritual, systemic, or humanitarian leadership in their chosen profession."
        },
        "calculation_steps": [
            {
                "step_number": 1,
                "name": "Full Legal Birth Name Acquisition",
                "description": "Obtain the complete legal birth name exactly as recorded on the original birth certificate, including First Name, all Middle Names, and Surname / Family Name. Do not use married names, assumed aliases, or nicknames for the fundamental Destiny calculation.",
                "formula": "Name = [First, Middle_1, ..., Middle_k, Last]"
            },
            {
                "step_number": 2,
                "name": "Text Normalization & Letter Mapping",
                "description": "Strip all accents, punctuation marks, hyphens, and whitespace. Convert all alphabetical characters to uppercase. Map each letter to its corresponding Pythagorean digit (1 to 9) using the 9-fold table:\n- 1: A, J, S\n- 2: B, K, T\n- 3: C, L, U\n- 4: D, M, V\n- 5: E, N, W\n- 6: F, O, X\n- 7: G, P, Y\n- 8: H, Q, Z\n- 9: I, R",
                "formula": "LetterValue(char) = ((ord(char) - ord('A')) % 9) + 1"
            },
            {
                "step_number": 3,
                "name": "Component Word Reduction",
                "description": "Sum the letter values for each separate name unit:\n- First Name Sum -> Reduce to single digit or preserve {11, 22, 33}\n- Middle Name(s) Sum -> Reduce to single digit or preserve {11, 22, 33}\n- Last Name Sum -> Reduce to single digit or preserve {11, 22, 33}",
                "formula": "ComponentSum = Sum(LetterValues in NamePart) -> Preserve {11, 22, 33} else SingleDigitReduce"
            },
            {
                "step_number": 4,
                "name": "Grand Expression Summation",
                "description": "Sum the reduced values of all name parts. If this grand total equals 11, 22, or 33, retain as the Master Destiny/Expression Number. Otherwise, reduce iteratively to a single digit from 1 to 9.",
                "formula": "DestinyNumber = GrandTotal in {11, 22, 33} ? GrandTotal : SingleDigitReduce(GrandTotal)"
            },
            {
                "step_number": 5,
                "name": "Continuous Total Concordance Check",
                "description": "Alternatively, compute the continuous sum of all letters in the entire name without intermediate unit reduction. Compare concordance; standard Western numerology prioritizes component-reduction to protect Master Number frequencies residing in family or personal lineages.",
                "formula": "ContinuousSum = Sum(all letters) -> Preserve {11, 22, 33} else SingleDigitReduce"
            }
        ],
        "calculation_examples": [
            {
                "example_name": "JOHN WINSTON LENNON",
                "breakdown": {
                    "first_name": "JOHN = J(1) + O(6) + H(8) + N(5) = 20 -> 2 + 0 = 2",
                    "middle_name": "WINSTON = W(5) + I(9) + N(5) + S(1) + T(2) + O(6) + N(5) = 33 -> Master 33 (preserved)",
                    "last_name": "LENNON = L(3) + E(5) + N(5) + N(5) + O(6) + N(5) = 29 -> 2 + 9 = 11 -> Master 11 (preserved)",
                    "total_synthesis": "2 + 33 + 11 = 46 -> 4 + 6 = 10 -> 1",
                    "continuous_sum": "20 + 33 + 29 = 82 -> 8 + 2 = 10 -> 1"
                },
                "result": "Destiny / Expression Number 1 (Trailblazing artistic leader with Master 33 and 11 internal name vibrations)"
            },
            {
                "example_name": "MARY JANE WATSON",
                "breakdown": {
                    "first_name": "MARY = M(4) + A(1) + R(9) + Y(7) = 21 -> 2 + 1 = 3",
                    "middle_name": "JANE = J(1) + A(1) + N(5) + E(5) = 12 -> 1 + 2 = 3",
                    "last_name": "WATSON = W(5) + A(1) + T(2) + S(1) + O(6) + N(5) = 20 -> 2 + 0 = 2",
                    "total_synthesis": "3 + 3 + 2 = 8",
                    "continuous_sum": "21 + 12 + 20 = 53 -> 5 + 3 = 8"
                },
                "result": "Destiny / Expression Number 8"
            }
        ],
        "interpretation_matrix": {
            "1": {
                "title": "Expression 1: The Trailblazer & Executive Pioneer",
                "archetype": "The Leader of Innovation",
                "vocational_expression": "Destined to occupy positions of autonomy, command, and innovative leadership. Expresses natural talent in spearheading new enterprises, pioneering untested technologies, and directing others through personal courage.",
                "working_style": "Decisive, self-starting, confident, thrives with complete creative authority.",
                "shadow_vocation": "Struggles when subordinated to bureaucratic red tape; may clash with authority or display impatient arrogance toward slower colleagues."
            },
            "2": {
                "title": "Expression 2: The Diplomatic Harmonizer & Master Mediator",
                "archetype": "The Arbiter of Peace & Partnership",
                "vocational_expression": "Destined to excel in collaborative fields requiring exceptional diplomacy, psychological nuance, and aesthetic balance. Natural gifts in counseling, mediation, strategic diplomacy, and supportive co-direction.",
                "working_style": "Consensual, gentle, highly observant, masters the fine details that hold organizations together.",
                "shadow_vocation": "Can be paralyzed by fear of offending others; prone to absorbing workplace emotional toxicity."
            },
            "3": {
                "title": "Expression 3: The Creative Virtuoso & Charismatic Articulator",
                "archetype": "The Champion of Expression",
                "vocational_expression": "Destined to uplift society through the spoken or written word, stage performance, visual design, or creative marketing. Exceptional linguistic flair, artistic imagination, and ability to inspire enthusiasm in large audiences.",
                "working_style": "Spontaneous, inspiring, expressive, operates best in colorful, open-ended creative settings.",
                "shadow_vocation": "Prone to squandering brilliant creative gifts across too many unfinished avenues; vulnerable to mood swings."
            },
            "4": {
                "title": "Expression 4: The Systemic Architect & Practical Anchor",
                "archetype": "The Builder of Institutions",
                "vocational_expression": "Destined to build robust systems, enforce structural integrity, and organize complex operations. Unrivaled talent in engineering, law, accounting, logistics, administration, and precision manufacturing.",
                "working_style": "Meticulous, methodical, realistic, committed to the highest standards of workmanship and punctuality.",
                "shadow_vocation": "Can become excessively rigid and resistant to modern streamlining; prone to overworking and alienating colleagues with uncompromising demands."
            },
            "5": {
                "title": "Expression 5: The Dynamic Communicator & Catalyst of Change",
                "archetype": "The Ambassador of Progress",
                "vocational_expression": "Destined to operate at the cutting edge of change, trade, public communication, and intercultural exchange. Exceptional gifts in sales, journalism, travel, public relations, crisis management, and progressive technology.",
                "working_style": "Fast-paced, adaptable, versatile, excels when juggling diverse projects across global networks.",
                "shadow_vocation": "Difficulty tolerating routine maintenance; may jump ship prematurely when tasks become mundane."
            },
            "6": {
                "title": "Expression 6: The Compassionate Counselor & Community Pillar",
                "archetype": "The Guardian of Harmony",
                "vocational_expression": "Destined to care for human well-being, beautify physical environments, and protect vulnerable communities. Natural mastery in medicine, education, interior design, social services, human resources, and the culinary arts.",
                "working_style": "Supportive, responsible, aesthetic, fosters family-like camaraderie in professional teams.",
                "shadow_vocation": "Prone to taking on colleagues' emotional problems; risks exhaustion through over-involvement and perfectionist micromanagement."
            },
            "7": {
                "title": "Expression 7: The Analytical Scholar & Esoteric Specialist",
                "archetype": "The Investigator of Reality",
                "vocational_expression": "Destined to master deep technical, scientific, philosophical, or spiritual domains. Supreme gifts in scientific research, computational algorithms, forensic analysis, literary criticism, theology, and philosophy.",
                "working_style": "Independent, meticulous, analytical, requires quiet sanctuary and autonomy to do deep work.",
                "shadow_vocation": "May isolate from team dynamics; prone to intellectual elitism and difficulty translating complex insights into accessible terms."
            },
            "8": {
                "title": "Expression 8: The Commercial Titan & Executive Director",
                "archetype": "The Arbiter of Material Power",
                "vocational_expression": "Destined to manage large-scale commercial, financial, and governmental enterprises. Natural genius in corporate leadership, investment banking, real estate, judicial administration, and major philanthropic distribution.",
                "working_style": "Strategic, authoritative, focused on bottom-line results, commands natural executive respect.",
                "shadow_vocation": "Risk of prioritizing profit over human welfare; vulnerable to power struggles and commercial hubris."
            },
            "9": {
                "title": "Expression 9: The Global Humanitarian & Cultural Luminary",
                "archetype": "The Universal Philanthropist",
                "vocational_expression": "Destined to serve broad global causes, champion human rights, and elevate culture through high artistic achievement. Exceptional talents in international law, foreign affairs, fine arts, environmental stewardship, and philanthropic foundation leadership.",
                "working_style": "Visionary, broad-minded, dramatic, inspired by ideals rather than mere personal gain.",
                "shadow_vocation": "Can fall into impractical ideological crusade; struggles with mundane administrative details."
            },
            "11": {
                "title": "Expression 11: The Visionary Illuminator (Master 11/2)",
                "archetype": "The Spiritual Catalyst & Cultural Luminary",
                "vocational_expression": "Destined to be an instrument of higher spiritual or cultural illumination. Natural gifts as a transformational author, spiritual philosopher, cutting-edge artistic visionary, or inspirational public figure who elevates collective consciousness.",
                "working_style": "Intuitive, charismatic, electrified, channels concepts ahead of their time.",
                "shadow_vocation": "Excessive nervous tension; risk of imposter syndrome or self-sabotaging doubt if higher ideals are compromise by daily commercialism."
            },
            "22": {
                "title": "Expression 22: The Master Builder of Civilization (Master 22/4)",
                "archetype": "The Grand Architect of Manifestation",
                "vocational_expression": "Destined to build tangible, monumental institutions that endure for generations. Exceptional gifts in leading multinational corporations, designing transcontinental infrastructure, founding enduring educational or civic systems, and executing massive constructive projects.",
                "working_style": "Uncompromisingly practical yet cosmic in scale; commands massive resources with flawless architectural strategy.",
                "shadow_vocation": "Overwhelming burden of responsibility; destructive potential if motivated by selfish megalomania."
            },
            "33": {
                "title": "Expression 33: The Universal Avatar of Compassion (Master 33/6)",
                "archetype": "The Master Healer & Spiritual Educator",
                "vocational_expression": "Destined to embody selfless service on a global scale. Natural genius in world-class humanitarian missions, transformative holistic healing, universal spiritual teaching, and elevating vulnerable humanity through unconditional love.",
                "working_style": "Sacrificial, radiant, utterly devoted, inspires miraculous loyalty and emotional transformation.",
                "shadow_vocation": "Extreme vulnerability to being consumed by the suffering of the masses; martyr exhaustion."
            }
        },
        "disclaimer": "This is a traditional esoteric belief system, not an empirical or scientific claim."
    }

    # Tool 4: Lucky Number (Harmonic Cross-Tabulation)
    tool_lucky_number = {
        "tool_id": "lucky-number",
        "tool_name": "Lucky Number (Harmonic Cross-Tabulation between Life Path and Birth Day Ruler)",
        "system": "Pythagorean",
        "tradition_full_name": "Pythagorean / Western Numerological Tradition",
        "source": {
            "title": "The Complete Book of Numerology",
            "author": "Dr. David A. Phillips",
            "edition_or_chapter": "Chapter 4: The Day of Birth, Chapter 5: The Ruling Numbers, Chapter 7: The Arrows of Individuality and Vibrational Resonance",
            "classical_reference": "Pythagorean Harmonics, Musica Universalis (Music of the Spheres), Nicomachus of Gerasa (Manual of Harmonics)"
        },
        "philosophical_basis": "In classical Pythagorean mathematics, reality is constructed upon consonant numerical ratios. Pythagoras proved with the monochord that musical harmony originates from simple mathematical proportions: the Octave (2:1), the Fifth (3:2), and the Fourth (4:3). Applied to human vibrational constitution, the individual's Life Path Number functions as their 'Fundamental Tonic' (macrocosmic keynote), while their Birth Number (Day Ruler) acts as their 'Active Harmonic Overtone'. A 'Lucky Number' in the authentic Pythagorean tradition is not random superstition, but the Resonant Harmonic Convergence number that produces constructive wave interference between these two primary vibrational pillars, minimizing karmic discord and amplifying energetic consonance.",
        "chaldean_exclusion_statement": "Explicit confirmation: Lucky numbers and harmonic compatibilities are calculated strictly through Pythagorean harmonic ratio theory, triadic resonance, and the Western cross-tabulation matrix between Life Path and Birth Day. No Chaldean planetary day rulers, gemstone correspondences, or Cheiro lucky matrices are used.",
        "harmonic_triads_definition": {
            "mental_triad": [1, 5, 7],
            "physical_practical_triad": [2, 4, 8],
            "emotional_spiritual_triad": [3, 6, 9],
            "master_affinities": {
                "11": "Bridges the 2-4-8 physical axis into the 1-5-7 mental-intuitive realm (octave of 2)",
                "22": "Bridges the 2-4-8 physical axis into universal architectural manifestation (octave of 4)",
                "33": "Bridges the 3-6-9 creative axis into cosmic compassionate service (octave of 6)"
            }
        },
        "calculation_steps": [
            {
                "step_number": 1,
                "name": "Extract Core Vibrations",
                "description": "Obtain the Life Path Number (L) and the Birth Number / Day Ruler (B) using strict Pythagorean calculation.",
                "formula": "L in {1..9, 11, 22, 33}, B in {1..9, 11, 22}"
            },
            {
                "step_number": 2,
                "name": "Base Root Reduction",
                "description": "Identify the base root of both L and B for foundational triadic analysis: if L in {11, 22, 33}, base root is {2, 4, 6} respectively; if B in {11, 22}, base root is {2, 4} respectively.",
                "formula": "L_base = (L == 11 ? 2 : (L == 22 ? 4 : (L == 33 ? 6 : L))); B_base = (B == 11 ? 2 : (B == 22 ? 4 : B))"
            },
            {
                "step_number": 3,
                "name": "Pythagorean Harmonic Synthesis (Primary Lucky Key)",
                "description": "Calculate the primary synthesis number H_primary = L_base + B_base. If H_primary equals 11 or 22, hold as a Master Harmonic. Otherwise, reduce via single-digit summation (1 to 9). This synthesis represents the primary point of constructive interference between destiny and active temperament.",
                "formula": "H_primary = (L_base + B_base) in {11, 22} ? (L_base + B_base) : SingleDigitReduce(L_base + B_base)"
            },
            {
                "step_number": 4,
                "name": "Harmonic Triad Alignment",
                "description": "Identify which Pythagorean Triad governs L_base and B_base:\n- If both belong to the same triad (Intra-Triadic Resonance), all numbers of that triad are highly consonant lucky numbers.\n- If they belong to different triads (Inter-Triadic Bridge), the bridge number that resolves the interval (the shared harmonic or complementary triad) is designated as the secondary lucky vibration.",
                "formula": "Triad(L_base) vs Triad(B_base)"
            },
            {
                "step_number": 5,
                "name": "Full Harmonic Spectrum Categorization",
                "description": "From the cross-tabulation matrix, derive four distinct vibrational tiers for the individual:\n1. Most Harmonious (Consonant Lucky Numbers): Unisons, Octaves, and Perfect Fifths.\n2. Sympathetic Numbers: Compatible vibrations from friendly triads.\n3. Neutral Numbers: Tolerant vibrations that exert neither strong boost nor friction.\n4. Discordant / Tension Numbers: Complex intervals requiring conscious discipline and conscious modulation.",
                "formula": "Spectrum = HarmonicMatrix[L][B]"
            }
        ],
        "interpretation_matrix": {
            "1": {
                "title": "Lucky Resonance 1: The Initiating Key",
                "archetype": "The Sovereign Pioneer & Dynamic Spark",
                "harmonic_effect": "Activates autonomous breakthroughs, decisive executive clarity, and pioneer momentum. Enhances confidence when launching novel enterprises and asserting personal agency.",
                "favorable_spheres": ["New venture launches", "Solo leadership challenges", "Intellectual innovation", "Career advancement"],
                "harmonic_resonance_advice": "Align important decisions with day cycles reducing to 1, 5, or 7; avoid letting rigid external demands dampen initiative."
            },
            "2": {
                "title": "Lucky Resonance 2: The Diplomatic Key",
                "archetype": "The Sensitive Peacemaker & Receptive Harmonizer",
                "harmonic_effect": "Activates subtle intuitive discernment, emotional poise, and seamless cooperative alignment. Dissolves interpersonal friction and fosters deep rapport.",
                "favorable_spheres": ["Partnership agreements", "Mediation and dispute resolution", "Emotional healing", "Artistic and sensitive collaborations"],
                "harmonic_resonance_advice": "Schedule critical meetings on 2, 4, 8, or 11 days. Protect personal energetic boundaries from aggressive environments."
            },
            "3": {
                "title": "Lucky Resonance 3: The Creative Expressive Key",
                "archetype": "The Eloquent Virtuoso & Joyous Catalyst",
                "harmonic_effect": "Activates radiant social magnetism, verbal and literary brilliance, artistic inspiration, and infectious optimism.",
                "favorable_spheres": ["Public presentations", "Literary and artistic publishing", "Media debuts", "Social and promotional campaigns"],
                "harmonic_resonance_advice": "Harness 3, 6, or 9 day vibrations to publish, present, and expand creative social networks."
            },
            "4": {
                "title": "Lucky Resonance 4: The Structural Anchor Key",
                "archetype": "The Foundational Builder & Master of Form",
                "harmonic_effect": "Activates concrete stability, operational endurance, procedural precision, and grounded material security.",
                "favorable_spheres": ["Contract execution", "Real estate investments", "System architecture", "Long-term operational planning"],
                "harmonic_resonance_advice": "Anchor major financial and structural commitments on 4, 8, 2, or 22 days. Avoid volatile improvisations."
            },
            "5": {
                "title": "Lucky Resonance 5: The Catalytic Freedom Key",
                "archetype": "The Dynamic Adventurer & Agent of Progress",
                "harmonic_effect": "Activates rapid adaptability, magnetic persuasion, expansive versatility, and liberation from stale routine.",
                "favorable_spheres": ["International travel", "Public relations and marketing", "Crisis adaptation", "Technology adoption"],
                "harmonic_resonance_advice": "Leverage 5, 1, or 7 day vibrations for speculative brainstorming and transformative transitions."
            },
            "6": {
                "title": "Lucky Resonance 6: The Harmonizing Nurturer Key",
                "archetype": "The Cosmic Caregiver & Domestic Guardian",
                "harmonic_effect": "Activates unconditional compassion, aesthetic elegance, restorative healing, and domestic peace.",
                "favorable_spheres": ["Family reconciliation", "Home acquisitions", "Healthcare and wellness initiatives", "Community outreach"],
                "harmonic_resonance_advice": "Utilize 6, 3, 9, or 33 vibrational timing for life celebrations, design installations, and healing endeavors."
            },
            "7": {
                "title": "Lucky Resonance 7: The Transcendent Sage Key",
                "archetype": "The Sacred Analyst & Truth Seeker",
                "harmonic_effect": "Activates profound spiritual intuition, scholarly focus, technical analysis, and contemplative wisdom.",
                "favorable_spheres": ["Scientific research", "Philosophical and academic writing", "Meditation and spiritual retreats", "Esoteric study"],
                "harmonic_resonance_advice": "Embrace 7, 1, 5, or 11 vibrational windows for deep solitary work, spiritual communion, and deep study."
            },
            "8": {
                "title": "Lucky Resonance 8: The Material Sovereign Key",
                "archetype": "The Authoritative Manifestor & Arbiter of Justice",
                "harmonic_effect": "Activates executive authority, strategic wealth multiplication, organizational efficiency, and karmic equilibrium.",
                "favorable_spheres": ["High-stakes commercial deals", "Major corporate acquisitions", "Judicial and legal matters", "Philanthropic endowment"],
                "harmonic_resonance_advice": "Conduct financial closings and executive reorganizations under 8, 4, 2, or 22 vibrations."
            },
            "9": {
                "title": "Lucky Resonance 9: The Universal Completer Key",
                "archetype": "The Compassionate Visionary & Elder Soul",
                "harmonic_effect": "Activates universal benevolence, philanthropic elevation, artistic climax, and graceful completion of life cycles.",
                "favorable_spheres": ["Global outreach projects", "Charitable foundations", "Artistic retrospectives", "Karmic completion and closure"],
                "harmonic_resonance_advice": "Conclude outworn partnerships and launch humanitarian campaigns on 9, 3, or 6 days."
            },
            "11": {
                "title": "Lucky Resonance 11: The Master Illuminator Key (Master 11/2)",
                "archetype": "The Cosmic Conduit & Visionary Herald",
                "harmonic_effect": "Activates higher spiritual attunement, prophetic insight, electrified charismatic appeal, and transformational inspiration.",
                "favorable_spheres": ["Spiritual masterclasses", "Visionary keynote addresses", "Groundbreaking psychic/intuitive revelations"],
                "harmonic_resonance_advice": "Harness 11, 2, or 7 vibrational timing for transformative spiritual breakthroughs; maintain meditative grounding."
            },
            "22": {
                "title": "Lucky Resonance 22: The Master Builder Key (Master 22/4)",
                "archetype": "The Architect of Civilization & Manifestation Titan",
                "harmonic_effect": "Activates monumental systemic power, large-scale infrastructural realization, and historic institutional leadership.",
                "favorable_spheres": ["Founding global institutions", "Transcontinental infrastructure", "Transformative civic programs"],
                "harmonic_resonance_advice": "Schedule cornerstone ceremonies and enterprise incorporations under 22, 4, or 8 vibrations."
            },
            "33": {
                "title": "Lucky Resonance 33: The Master Cosmic Teacher Key (Master 33/6)",
                "archetype": "The Universal Avatar of Compassion & Spiritual Healer",
                "harmonic_effect": "Activates transcendent altruism, universal healing presence, sacred artistic power, and upliftment of collective humanity.",
                "favorable_spheres": ["Sanctuary openings", "International peace gatherings", "Profound holistic healing initiatives"],
                "harmonic_resonance_advice": "Deploy 33, 6, or 9 vibrational timing for selfless service, universal reconciliation, and compassionate devotion."
            }
        },
        "harmonic_compatibility_matrix": {
            "1": {
                "root": 1,
                "triad": "Mental / Intellectual (1-5-7)",
                "consonant_lucky_numbers": [1, 5, 7],
                "sympathetic_numbers": [3, 9],
                "neutral_numbers": [2, 8, 11],
                "discordant_tension_numbers": [4, 6],
                "harmonic_ratio_analogy": "Unison (1:1) and Perfect Fifth with 5 and 7; dissonant minor second with rigid 4.",
                "practical_application": "Schedule key launches, business registrations, or important initiatives on dates reducing to 1, 5, or 7. Avoid high-stakes contracts under heavy 4 or 6 vibrations without careful structure."
            },
            "2": {
                "root": 2,
                "triad": "Physical / Practical / Sensitive (2-4-8)",
                "consonant_lucky_numbers": [2, 4, 8],
                "sympathetic_numbers": [6, 9, 11],
                "neutral_numbers": [1, 3, 7],
                "discordant_tension_numbers": [5],
                "harmonic_ratio_analogy": "Octave (2:1) with 4 and 8; consonant with 6; jarring tritone tension with restless 5.",
                "practical_application": "Seek collaborations, signing of leases, or mediation sessions on dates reducing to 2, 4, 8, or 11. Exercise extreme emotional boundaries on 5 vibration days."
            },
            "3": {
                "root": 3,
                "triad": "Emotional / Creative / Expressive (3-6-9)",
                "consonant_lucky_numbers": [3, 6, 9],
                "sympathetic_numbers": [1, 5, 33],
                "neutral_numbers": [2, 7],
                "discordant_tension_numbers": [4, 8],
                "harmonic_ratio_analogy": "Perfect Fifth (3:2) with 6 and 9; resonant with creative 1 and 5; friction with rigid material 4 and 8.",
                "practical_application": "Plan creative performances, publishing debuts, marketing campaigns, and social events on dates reducing to 3, 6, 9, or 33. Avoid dry bureaucratic negotiations on 4 or 8 days."
            },
            "4": {
                "root": 4,
                "triad": "Physical / Practical / Structural (2-4-8)",
                "consonant_lucky_numbers": [4, 2, 8],
                "sympathetic_numbers": [6, 22],
                "neutral_numbers": [1, 7],
                "discordant_tension_numbers": [3, 5],
                "harmonic_ratio_analogy": "Diatessaron (4:3) and Double Octave with 2 and 8; harmonious with 22; dissonance with volatile 3 and 5.",
                "practical_application": "Execute legal contracts, foundation stone laying, architectural designs, and corporate restructuring on dates reducing to 4, 8, 2, or 22. Postpone erratic improvisations on 3 or 5 days."
            },
            "5": {
                "root": 5,
                "triad": "Mental / Intellectual / Dynamic (1-5-7)",
                "consonant_lucky_numbers": [5, 1, 7],
                "sympathetic_numbers": [3, 9],
                "neutral_numbers": [6, 8],
                "discordant_tension_numbers": [2, 4],
                "harmonic_ratio_analogy": "Dynamic center of the monochord; harmonizes with mental pioneers 1 and 7; clashes with slow domestic 2 and conservative 4.",
                "practical_application": "Schedule international travel, sales pitches, media broadcasts, and major exploratory journeys on dates reducing to 5, 1, or 7. Exercise caution with long-term restrictive leases on 2 or 4 days."
            },
            "6": {
                "root": 6,
                "triad": "Emotional / Creative / Nurturing (3-6-9)",
                "consonant_lucky_numbers": [6, 3, 9],
                "sympathetic_numbers": [2, 4, 33],
                "neutral_numbers": [5, 8],
                "discordant_tension_numbers": [1, 7],
                "harmonic_ratio_analogy": "Consonant senary proportion; harmonious with 3, 9, and 2; tension with cold intellectual detachment of 7 and autocracy of 1.",
                "practical_application": "Host family gatherings, weddings, clinic openings, interior design installations, and community rallies on dates reducing to 6, 3, 9, or 33. Avoid solitary confrontations on 1 or 7 days."
            },
            "7": {
                "root": 7,
                "triad": "Mental / Intellectual / Introspective (1-5-7)",
                "consonant_lucky_numbers": [7, 1, 5],
                "sympathetic_numbers": [4, 9, 11],
                "neutral_numbers": [2, 3],
                "discordant_tension_numbers": [6, 8],
                "harmonic_ratio_analogy": "Heptadic contemplation; consonant with mental seekers 1 and 5; deep philosophical friction with materialistic 8 and smothering 6.",
                "practical_application": "Undertake academic exams, scientific research retreats, philosophical writing, and meditation vigils on dates reducing to 7, 1, 5, or 11. Avoid heavy commercial bargaining on 8 days."
            },
            "8": {
                "root": 8,
                "triad": "Physical / Practical / Executive (2-4-8)",
                "consonant_lucky_numbers": [8, 2, 4],
                "sympathetic_numbers": [1, 6, 22],
                "neutral_numbers": [5, 9],
                "discordant_tension_numbers": [3, 7],
                "harmonic_ratio_analogy": "Cubic stability (2^3); consonant octave resonance with 2 and 4; inharmonic friction with frivolous 3 and detached 7.",
                "practical_application": "Schedule high-value acquisitions, banking agreements, executive hirings, and court appearances on dates reducing to 8, 4, 2, or 22. Avoid whimsical social entertainment on 3 or 7 days."
            },
            "9": {
                "root": 9,
                "triad": "Emotional / Creative / Universal (3-6-9)",
                "consonant_lucky_numbers": [9, 3, 6],
                "sympathetic_numbers": [1, 5, 7],
                "neutral_numbers": [8, 11],
                "discordant_tension_numbers": [2, 4],
                "harmonic_ratio_analogy": "Enneadic completion (3^2); full sympathetic resonance across the musical 3-6-9 triad; friction with small-scale petty limitations of 4.",
                "practical_application": "Conclude long-term cycles, launch international charity campaigns, debut artistic masterworks, and host philanthropic galas on dates reducing to 9, 3, or 6. Avoid rigid bureaucratic disputes on 4 days."
            },
            "11": {
                "root": 11,
                "triad": "Spiritual Octave / Bridge (Master 11/2)",
                "consonant_lucky_numbers": [11, 2, 7],
                "sympathetic_numbers": [1, 4, 8, 22],
                "neutral_numbers": [3, 9],
                "discordant_tension_numbers": [5],
                "harmonic_ratio_analogy": "High-voltage octave bridging 2 and 7; electric sensitivity; discordant with wild sensory agitation of 5.",
                "practical_application": "Deliver keynotes, channel intuitive insights, publish spiritual treatises, and organize enlightenment workshops on dates reducing to 11, 2, or 7."
            },
            "22": {
                "root": 22,
                "triad": "Master Manifestation Octave (Master 22/4)",
                "consonant_lucky_numbers": [22, 4, 8],
                "sympathetic_numbers": [2, 6, 11, 33],
                "neutral_numbers": [1, 7],
                "discordant_tension_numbers": [3, 5],
                "harmonic_ratio_analogy": "Master architectural resonance; elevates the 2-4-8 physical triad to universal scale; inharmonic with superficial scatter of 3 and 5.",
                "practical_application": "Incorporate global enterprises, sign historic bilateral agreements, lay cornerstone foundations, and launch transcontinental initiatives on dates reducing to 22, 4, or 8."
            },
            "33": {
                "root": 33,
                "triad": "Cosmic Compassion Octave (Master 33/6)",
                "consonant_lucky_numbers": [33, 6, 9],
                "sympathetic_numbers": [3, 2, 11, 22],
                "neutral_numbers": [1, 5],
                "discordant_tension_numbers": [4, 8],
                "harmonic_ratio_analogy": "Supreme spiritual harmonic of unconditional love; resonates fully with 3, 6, 9; tension with rigid cold commercialism of 8.",
                "practical_application": "Conduct sacred healing seminars, open hospitals or educational sanctuaries, and lead universal peace vigils on dates reducing to 33, 6, or 9."
            }
        },
        "disclaimer": "This is a traditional esoteric belief system, not an empirical or scientific claim."
    }

    research_doc = {
        "schema_version": "1.0.0",
        "subagent_metadata": {
            "subagent_id": "numerology-research-subagent-2",
            "role": "Pythagorean / Western Specialist",
            "tradition_name": "Pythagorean / Western Numerological Tradition",
            "primary_authorities_cited": [
                {
                    "author": "Dr. David A. Phillips",
                    "title": "The Complete Book of Numerology",
                    "publisher": "Hay House",
                    "key_chapters": [
                        "Chapter 4: The Day of Birth Number / Ruler of the Day",
                        "Chapter 5: The Ruling Numbers (The Life Path)",
                        "Chapter 7: The Arrows of Individuality and Vibrational Resonance",
                        "Chapter 9: The Expression / Destiny Number and Name Grid",
                        "Chapter 10: The Master Numbers 11, 22, 33"
                    ]
                },
                {
                    "author": "Pythagoras of Samos and classical Western esoteric mathematics",
                    "philosophical_works": "The Tetractys, The Monochord, Musica Universalis (Music of the Spheres), Nicomachus of Gerasa's Introduction to Arithmetic"
                }
            ],
            "chaldean_exclusion_confirmation": "Explicit Confirmation: This entire research document strictly excludes Chaldean letter values (1-8 table) and Chaldean astrological compound number interpretations (10-52). All alphabet calculations exclusively employ the Western 9-fold Pythagorean alphabet table (1-9), and all date reductions follow classical Western periodic reduction and Master Number preservation rules.",
            "master_numbers_protocol": "Master Numbers 11, 22, and 33 represent higher octave spiritual vibrations and are preserved without premature reduction at all intermediate and final calculation stages.",
            "pythagorean_alphabet_reference_table": pythagorean_alphabet_table,
            "pythagorean_harmonic_triads": harmonic_triads
        },
        "tools": [
            tool_life_path,
            tool_birth_number,
            tool_destiny_number,
            tool_lucky_number
        ],
        "tools_by_id": {
            "life-path": tool_life_path,
            "birth-number": tool_birth_number,
            "destiny-number": tool_destiny_number,
            "lucky-number": tool_lucky_number
        }
    }

    target_dir = r"D:\builds\data\research"
    os.makedirs(target_dir, exist_ok=True)
    target_file = os.path.join(target_dir, "numerology_2_pythagorean.json")

    with open(target_file, "w", encoding="utf-8") as f:
        json.dump(research_doc, f, indent=2, ensure_ascii=False)

    print(f"Successfully generated research document at {target_file}")
    print(f"File size: {os.path.getsize(target_file)} bytes")

if __name__ == "__main__":
    build_research()
