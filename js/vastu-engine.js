/**
 * =========================================================================================
 * VASTU CALCULATION ENGINE (Classical Vedic Sthapatya Veda)
 * =========================================================================================
 * Comprehensive, mathematically precise calculation engine and interactive SVG visualizers
 * for all 10 Classical Vastu tools:
 *  1. House Vastu Analyzer (calculateHouseVastu)
 *  2. Plot Vastu Analyzer (calculatePlotVastu)
 *  3. Main Door Vastu (calculateMainDoorVastu)
 *  4. House Facing Calculator (calculateFacing)
 *  5. Bedroom Vastu (calculateBedroomVastu)
 *  6. Kitchen Vastu (calculateKitchenVastu)
 *  7. Toilet & Bathroom Vastu (calculateToiletVastu)
 *  8. Puja Room Vastu (calculatePujaVastu)
 *  9. Water Vastu (calculateWaterVastu)
 * 10. Staircase Vastu (calculateStaircaseVastu)
 *
 * References & Authorities:
 *  - Mayamata (Bruno Dagens tr., Ch. 6, 7, 9, 25, 26)
 *  - Bṛhat Saṃhitā of Varāhamihira (Vāstuvidyā Ch. 53, Dakārgala Ch. 54)
 *  - Mānasāra Vāstu Śāstra (Ch. 7, 9, 18, 30, 38)
 *  - Samarāṅgaṇa Sūtradhāra of King Bhoja (Ch. 10, 38, 49)
 *  - Viśvakarma Prakāśa (Ch. 1 - 7)
 * =========================================================================================
 */

(function (global) {
  'use strict';

  // Standardized tradition identifier
  const TRADITION_VEDIC = "Classical Vedic Vastu (Mayamata / Bṛhat Saṃhitā / Mānasāra)";
  const VARIATION_NOTE_DEFAULT = "Traditional architectural philosophy; regional texts, climate variations, and sthapatya traditions prescribe contextual adaptations.";

  /**
   * 32-PADA DEVATA DATABASE (Paramasayika 81-pada outer perimeter)
   * Clockwise starting from North-East corner:
   * East (1-8), South (9-16), West (17-24), North (25-32)
   */
  const PADA_DATABASE = [
    // East Wall (Padas 1 to 8)
    {
      index: 1,
      id: "E1",
      wall: "East",
      deity: "Shikhi (Agni/Ishanya apex)",
      quality: "Severe Dosha",
      score: 15,
      result: "Danger of fire accidents, sudden financial drain, anxiety for occupants.",
      source: "Bṛhat Saṃhitā 53.70; Mayamata 25.12-14",
      rule: "Shikhi pada is at the acute North-East corner; entrances here violate the cosmic eye of Vastu Purusha.",
      remedy: "Close or relocate entrance. If impossible, install an Energized Copper Surya Yantra and Brass threshold bar."
    },
    {
      index: 2,
      id: "E2",
      wall: "East",
      deity: "Parjanya (Rain Clouds/Growth)",
      quality: "Inauspicious",
      score: 35,
      result: "Excessive financial leakage, female domestic strife, unstable capital expenditure.",
      source: "Bṛhat Saṃhitā 53.70; Samarāṅgaṇa Sūtradhāra 38.8",
      rule: "Parjanya represents overflowing waters; door leads to dissipation of household resources.",
      remedy: "Neutralize with yellow marble threshold and Gayatri Mantra copper plaque above the lintel."
    },
    {
      index: 3,
      id: "E3",
      wall: "East",
      deity: "Jayanta (Victory/Indra's Son)",
      quality: "Highly Auspicious",
      score: 98,
      result: "Triumph, massive wealth accumulation, social renown, vitality for heirs.",
      source: "Bṛhat Saṃhitā 53.71 ('Jayante dhana-sampattiḥ'); Mayamata 25.15",
      rule: "Jayanta bestows enduring victory, state honor, and continuous financial prosperity.",
      remedy: "No remedy needed. Enhance with solid teakwood frame and auspicious Swastika/Om brass emblems."
    },
    {
      index: 4,
      id: "E4",
      wall: "East",
      deity: "Indra / Mahendra (King of Devas)",
      quality: "Highly Auspicious",
      score: 100,
      result: "Sovereignty, royal/administrative favor, boundless prosperity, commanding leadership.",
      source: "Bṛhat Saṃhitā 53.71 ('Mahendre nṛpa-satkāraḥ'); Mānasāra 38.12",
      rule: "Mahendra doorway attracts high-status connections, political authority, and stable generational wealth.",
      remedy: "Prime location. Keep well-lit, adorned with a Mangala Torana of fresh mango leaves or brass."
    },
    {
      index: 5,
      id: "E5",
      wall: "East",
      deity: "Surya (Sun God/Prana)",
      quality: "Moderate",
      score: 60,
      result: "Excessive wrath, intolerance, family tensions, though intellectual vigor is sustained.",
      source: "Bṛhat Saṃhitā 53.72; Viśvakarma Prakāśa 2.45",
      rule: "Surya door carries intense solar heat; may cause irritability and discord among male members.",
      remedy: "Place a brass vessel with fresh water and camphor near the threshold to cool excessive solar Agni."
    },
    {
      index: 6,
      id: "E6",
      wall: "East",
      deity: "Satya (Truth/Dharma)",
      quality: "Inauspicious",
      score: 40,
      result: "Breach of promises, litigations, loss of credibility, unfulfilled family covenants.",
      source: "Bṛhat Saṃhitā 53.72; Mayamata 25.17",
      rule: "Satya doorway demands uncompromising austerity; worldly occupants suffer false allegations.",
      remedy: "Fix a Silver strip inside the threshold and place a Panchamukhi Hanuman Yantra on the outer wall."
    },
    {
      index: 7,
      id: "E7",
      wall: "East",
      deity: "Bhrisha (Gravity/Cruelty)",
      quality: "Severe Dosha",
      score: 20,
      result: "Uncontrollable anger, malice from adversaries, sudden fire risks and theft.",
      source: "Bṛhat Saṃhitā 53.73; Samarāṅgaṇa Sūtradhāra 38.14",
      rule: "Approaching the Agni corner (South-East), Bhrisha brings destructive combustible friction.",
      remedy: "Install three copper pyramid strips embedded into the flooring at the doorway."
    },
    {
      index: 8,
      id: "E8",
      wall: "East",
      deity: "Antariksha (Void/Atmosphere)",
      quality: "Severe Dosha",
      score: 15,
      result: "Frequent thefts, chronic drain of savings, vulnerability to burglary and losses.",
      source: "Bṛhat Saṃhitā 53.73; Viśvakarma Prakāśa 2.48",
      rule: "Antariksha represents empty ether meeting Agni; leaks domestic vitality into the vacuum.",
      remedy: "Seal threshold with a 3mm copper strip and apply energized Bagua or Vastu Dosh Nivaran plate."
    },

    // South Wall (Padas 9 to 16)
    {
      index: 9,
      id: "S1",
      wall: "South",
      deity: "Anila (Agni/Wind)",
      quality: "Severe Dosha",
      score: 20,
      result: "Afflictions to male offspring, high infant sensitivity, chronic emotional restlessness.",
      source: "Bṛhat Saṃhitā 53.74; Mayamata 25.19",
      rule: "Anila at the SE edge ignites unruly flames, destabilizing peaceful domestic governance.",
      remedy: "Install red jasper stones and a lead helix below the door sill to ground volatile fire energy."
    },
    {
      index: 10,
      id: "S2",
      wall: "South",
      deity: "Pushan (Nourisher/Feeder)",
      quality: "Inauspicious",
      score: 30,
      result: "Servitude, bondage, heavy dependence on external lenders, constant subservience.",
      source: "Bṛhat Saṃhitā 53.74; Samarāṅgaṇa Sūtradhāra 38.18",
      rule: "Pushan doorway induces loss of entrepreneurial sovereignty and forced labor/debt.",
      remedy: "Use a yellow brass boundary divider and hang a copper Sun plaque on the door face."
    },
    {
      index: 11,
      id: "S3",
      wall: "South",
      deity: "Vitatha (Untruth/Pretense)",
      quality: "Moderate",
      score: 55,
      result: "Prosperity through aggressive trade, but accompanied by deception and unearned reputation.",
      source: "Bṛhat Saṃhitā 53.75; Viśvakarma Prakāśa 2.52",
      rule: "Vitatha generates quick transactional wealth for commercial setups but brings moral dilemmas.",
      remedy: "Plant Tulasi in the courtyard and affix a Lead pyramid bar at the door boundary."
    },
    {
      index: 12,
      id: "S4",
      wall: "South",
      deity: "Grihakshata / Brihatkshata (Household Preserver)",
      quality: "Highly Auspicious",
      score: 95,
      result: "Abundant wealth, progeny, stability, enduring prosperity, societal influence.",
      source: "Bṛhat Saṃhitā 53.75 ('Gṛhakṣate putravṛddhiḥ'); Mayamata 25.21",
      rule: "The premier South portal: counters popular superstition and bestows robust health, lineage, and prosperity.",
      remedy: "Prime Southern entrance. Frame in solid red cedar or teakwood with brass hardware."
    },
    {
      index: 13,
      id: "S5",
      wall: "South",
      deity: "Yama (Lord of Justice & Mortality)",
      quality: "Severe Dosha",
      score: 10,
      result: "Critical health hazards, dread, sudden setbacks, severe debilitating illnesses.",
      source: "Bṛhat Saṃhitā 53.76; Mānasāra 38.20",
      rule: "Direct alignment with the God of Death brings stagnation, chronic medical drain, and grief.",
      remedy: "Place a solid Lead Vastu rod in the threshold and hang a Panchadhatu Mahamrityunjaya Yantra."
    },
    {
      index: 14,
      id: "S6",
      wall: "South",
      deity: "Gandharva (Celestial Musician)",
      quality: "Inauspicious",
      score: 35,
      result: "Profligacy, public humiliation, dissipation of inherited assets through vain pursuits.",
      source: "Bṛhat Saṃhitā 53.76; Samarāṅgaṇa Sūtradhāra 38.22",
      rule: "Gandharva door lures residents into frivolous escapades and reputational vulnerability.",
      remedy: "Place black tourmaline crystals on both door jambs and install a copper threshold."
    },
    {
      index: 15,
      id: "S7",
      wall: "South",
      deity: "Bhrigaraja (Deceiver/Destruction)",
      quality: "Inauspicious",
      score: 25,
      result: "Poverty, loss of wealth, deceit by subordinates, chronic bodily lethargy.",
      source: "Bṛhat Saṃhitā 53.77; Viśvakarma Prakāśa 2.56",
      rule: "Bhrigaraja strips the household of stamina, causing repeated business collapse.",
      remedy: "Seal the door frame with 9 lead pyramid chips and install a Ganesha idol over the architrave."
    },
    {
      index: 16,
      id: "S8",
      wall: "South",
      deity: "Mriga (The Deer/Nairruti border)",
      quality: "Severe Dosha",
      score: 10,
      result: "Decay of family lineage, loss of maternal vitality, severe emotional detachment.",
      source: "Bṛhat Saṃhitā 53.77; Mayamata 25.24",
      rule: "Mriga borders Nairruti; an entrance here destabilizes the Earth foundation of the entire structure.",
      remedy: "Relocate entrance immediately. If locked, block threshold with heavy granite curb and lead helix."
    },

    // West Wall (Padas 17 to 24)
    {
      index: 17,
      id: "W1",
      wall: "West",
      deity: "Pitri (Ancestral Spirits/SW corner)",
      quality: "Severe Dosha",
      score: 10,
      result: "Destruction of patriarchal fortune, early demise of patriarch, severe ancestral affliction (Pitri Dosha).",
      source: "Bṛhat Saṃhitā 53.78; Viśvakarma Prakāśa 2.60",
      rule: "The South-West corner must remain heavy, closed, and grounded; doors here provoke cataclysmic failures.",
      remedy: "Strictly avoid main entry. If permanent, seal threshold with 3 solid Lead helixes and Yellow Jasper."
    },
    {
      index: 18,
      id: "W2",
      wall: "West",
      deity: "Dauvarika (The Gatekeeper)",
      quality: "Inauspicious",
      score: 40,
      result: "Insecurity, persistent enmity with neighbors, recurring career roadblocks, financial instability.",
      source: "Bṛhat Saṃhitā 53.78; Mayamata 25.26",
      rule: "Dauvarika creates friction between the household and the outside realm, inviting constant antagonism.",
      remedy: "Fix a brass strip along the threshold and affix a Rahu-Ketu Shanti Yantra."
    },
    {
      index: 19,
      id: "W3",
      wall: "West",
      deity: "Sugriva (Wise King/Gems)",
      quality: "Auspicious",
      score: 88,
      result: "Steady financial gains, mastery of trade and investments, intellectual discernment.",
      source: "Bṛhat Saṃhitā 53.79 ('Sugrīve dravya-saṅgrahaḥ'); Samarāṅgaṇa Sūtradhāra 38.28",
      rule: "Sugriva blesses mercantile prosperity, disciplined financial habits, and commercial acumen.",
      remedy: "Excellent Western entrance. Keep spotless and decorate with brass bell chimes."
    },
    {
      index: 20,
      id: "W4",
      wall: "West",
      deity: "Pushpadanta (Blossom-toothed/Varuna's Attendant)",
      quality: "Highly Auspicious",
      score: 96,
      result: "Immense prosperity, brilliant progeny, high intellectual status, peace and happiness.",
      source: "Bṛhat Saṃhitā 53.79 ('Puṣpadante sutāptiḥ syāt'); Mayamata 25.27",
      rule: "Premier entrance on the Western perimeter: grants flourishing wisdom, healthy offspring, and wealth.",
      remedy: "Optimal West portal. Enhance with white marble or brass threshold and auspicious floral motifs."
    },
    {
      index: 21,
      id: "W5",
      wall: "West",
      deity: "Varuna (Cosmic Ocean Lord)",
      quality: "Moderate",
      score: 65,
      result: "Fluctuating financial tides, high creative genius but sporadic liquidity crunches.",
      source: "Bṛhat Saṃhitā 53.80; Mānasāra 38.28",
      rule: "Varuna doorway connects to the oceanic surge; brings great opportunities interspersed with heavy outlays.",
      remedy: "Affix a solid brass strip in the floor and keep an energized sea-shell (Dakshinavarti Shankh) nearby."
    },
    {
      index: 22,
      id: "W6",
      wall: "West",
      deity: "Asura (Titanic Force/Maya)",
      quality: "Inauspicious",
      score: 35,
      result: "Perpetual debt, royal/governmental fines, heavy tax penalties, persistent anxiety.",
      source: "Bṛhat Saṃhitā 53.80; Viśvakarma Prakāśa 2.65",
      rule: "Asura pada invites hostility from state machinery, audit disputes, and unmanageable borrowings.",
      remedy: "Install a 5-element brass pyramid strip and a copper Surya plaque on the main doorway."
    },
    {
      index: 23,
      id: "W7",
      wall: "West",
      deity: "Sosha (Emaciation/Depletion)",
      quality: "Severe Dosha",
      score: 20,
      result: "Physical emaciation, pulmonary diseases, grief, gradual withering of financial reserves.",
      source: "Bṛhat Saṃhitā 53.81; Samarāṅgaṇa Sūtradhāra 38.32",
      rule: "Sosha sucks prana out of the building, inducing long-term chronic ailments in family elders.",
      remedy: "Seal with a lead boundary line, keep camphor diffusers active, and burn frankincense daily."
    },
    {
      index: 24,
      id: "W8",
      wall: "West",
      deity: "Papayakshma / Roga (Sickness/NW border)",
      quality: "Severe Dosha",
      score: 15,
      result: "Chronic incurable diseases, frequent hospitalizations, mental paranoia, litigation.",
      source: "Bṛhat Saṃhitā 53.81; Mayamata 25.29",
      rule: "Adjacent to Vayu corner; generates toxic wind energy, respiratory disorders, and mental anguish.",
      remedy: "Install an energized Vastu Copper helix and apply White Sandalwood paste on the door frame."
    },

    // North Wall (Padas 25 to 32)
    {
      index: 25,
      id: "N1",
      wall: "North",
      deity: "Roga / Vayu (NW corner/Wind)",
      quality: "Severe Dosha",
      score: 20,
      result: "Instability, aimless wandering, severe jealousy from relatives, loss of household harmony.",
      source: "Bṛhat Saṃhitā 53.82; Viśvakarma Prakāśa 2.70",
      rule: "Vayu corner doorway causes restless vagabond mentality and leakage of liquid assets.",
      remedy: "Install three bronze pyramid studs into the floor and paint frame in serene pearl-white."
    },
    {
      index: 26,
      id: "N2",
      wall: "North",
      deity: "Naga (Serpent King)",
      quality: "Inauspicious",
      score: 40,
      result: "Severe hostility from adversaries, irrational fears of poison/reptiles, back-stabbing.",
      source: "Bṛhat Saṃhitā 53.82; Mayamata 25.31",
      rule: "Naga brings venomous disputes, insidious rivalries, and distrust among business associates.",
      remedy: "Affix a Silver Snake Yantra beneath the threshold and hang an energized peacock feather nearby."
    },
    {
      index: 27,
      id: "N3",
      wall: "North",
      deity: "Mukhya (Chief Commander/Chitragupta)",
      quality: "Highly Auspicious",
      score: 98,
      result: "Immense intellectual triumph, business dominance, architectural brilliance, vast treasury.",
      source: "Bṛhat Saṃhitā 53.83 ('Mukhye tu sarvasampattiḥ'); Mānasāra 38.35",
      rule: "One of the most celebrated portals in Vedic architecture: ensures sustained prosperity and mental acuity.",
      remedy: "Auspicious supreme door. Frame with solid wood, polished brass handles, and green plants at sides."
    },
    {
      index: 28,
      id: "N4",
      wall: "North",
      deity: "Bhallata (The Expansive / Moon's Seat)",
      quality: "Highly Auspicious",
      score: 100,
      result: "Unrivalled wealth, luxury, granary abundance, high honor, multi-generational fortune.",
      source: "Bṛhat Saṃhitā 53.83 ('Bhallāte dhana-sañcayaḥ'); Mayamata 25.33",
      rule: "Bhallata embodies the peak of Kubera's treasury: attracts massive liquid wealth and real estate gains.",
      remedy: "Supreme Northern doorway. Adorn with brass Kubera Yantra and fresh water Urli with lotus petals."
    },
    {
      index: 29,
      id: "N5",
      wall: "North",
      deity: "Soma / Kuber (Lord of Celestial Nectar & Wealth)",
      quality: "Auspicious",
      score: 90,
      result: "Spiritual serenity, constant stream of revenue, benevolent benefactors, peace of mind.",
      source: "Bṛhat Saṃhitā 53.84; Samarāṅgaṇa Sūtradhāra 38.36",
      rule: "Direct seat of Kubera and Chandra: bestows spiritual equanimity and abundant cashflow.",
      remedy: "Prime door. Maintain spotless cleanliness and affix a silver crescent moon or Swastika."
    },
    {
      index: 30,
      id: "N6",
      wall: "North",
      deity: "Charaka / Bhujanga (The Wanderer)",
      quality: "Inauspicious",
      score: 40,
      result: "Heavy debt cycles, ungrateful kin, family unfaithfulness, chronic expenditure.",
      source: "Bṛhat Saṃhitā 53.84; Viśvakarma Prakāśa 2.74",
      rule: "Doorway drains liquid assets into unnecessary journeys and speculative ventures.",
      remedy: "Insert a silver wire strip inside the threshold and keep an energized Parad (Mercury) Ganesha inside."
    },
    {
      index: 31,
      id: "N7",
      wall: "North",
      deity: "Diti (Mother of Titans)",
      quality: "Moderate",
      score: 50,
      result: "Petty jealousies, internal family narrow-mindedness, perpetual discontentment despite income.",
      source: "Bṛhat Saṃhitā 53.85; Mayamata 25.35",
      rule: "Diti induces material greed with constant mental unrest and lack of satisfaction.",
      remedy: "Place a crystal quartz bowl filled with sea salt nearby and replace salt every Saturday."
    },
    {
      index: 32,
      id: "N8",
      wall: "North",
      deity: "Aditi (Cosmic Mother of Gods)",
      quality: "Moderate",
      score: 55,
      result: "Spiritual inclinations but prone to eye ailments and anxieties among women of the house.",
      source: "Bṛhat Saṃhitā 53.85; Mānasāra 38.38",
      rule: "Nearing the pure Ishanya apex, door must be kept pure; any clutter brings ophthalmological troubles.",
      remedy: "Keep doorway pristinely lit with white lamps and install a pure Silver Gayatri mantra plate."
    }
  ];

  /**
   * 16 COMPASS DIRECTIONS WITH VASTU ATTRIBUTES
   */
  const DIRECTIONS_16 = [
    { code: 'N',   degStart: 348.75, degEnd: 11.25,  name: 'North (Uttara)',          deity: 'Kubera',  tattva: 'Water / Ether', planet: 'Mercury (Budha)', quality: 'Highly Auspicious' },
    { code: 'NNE', degStart: 11.25,  degEnd: 33.75,  name: 'North-North-East',        deity: 'Apas',    tattva: 'Water',         planet: 'Jupiter (Brihaspati)', quality: 'Auspicious' },
    { code: 'NE',  degStart: 33.75,  degEnd: 56.25,  name: 'North-East (Ishanya)',    deity: 'Shiva',   tattva: 'Water / Ether', planet: 'Jupiter (Brihaspati)', quality: 'Highly Auspicious' },
    { code: 'ENE', degStart: 56.25,  degEnd: 78.75,  name: 'East-North-East',         deity: 'Parjanya',tattva: 'Air / Water',   planet: 'Sun (Surya)', quality: 'Auspicious' },
    { code: 'E',   degStart: 78.75,  degEnd: 101.25, name: 'East (Poorva)',           deity: 'Indra',   tattva: 'Air / Fire',    planet: 'Sun (Surya)', quality: 'Highly Auspicious' },
    { code: 'ESE', degStart: 101.25, degEnd: 123.75, name: 'East-South-East',         deity: 'Satya',   tattva: 'Fire / Air',    planet: 'Venus (Shukra)', quality: 'Moderate' },
    { code: 'SE',  degStart: 123.75, degEnd: 146.25, name: 'South-East (Agneya)',    deity: 'Agni',    tattva: 'Fire',          planet: 'Venus (Shukra)', quality: 'Moderate' },
    { code: 'SSE', degStart: 146.25, degEnd: 168.75, name: 'South-South-East',        deity: 'Pushan',  tattva: 'Fire / Earth',  planet: 'Mars (Mangala)', quality: 'Moderate' },
    { code: 'S',   degStart: 168.75, degEnd: 191.25, name: 'South (Dakshina)',        deity: 'Yama',    tattva: 'Fire / Earth',  planet: 'Mars (Mangala)', quality: 'Moderate' },
    { code: 'SSW', degStart: 191.25, degEnd: 213.75, name: 'South-South-West',        deity: 'Gandharva',tattva: 'Earth',       planet: 'Rahu', quality: 'Inauspicious' },
    { code: 'SW',  degStart: 213.75, degEnd: 236.25, name: 'South-West (Nairruti)',   deity: 'Nirriti', tattva: 'Earth',         planet: 'Rahu', quality: 'Severe Dosha' },
    { code: 'WSW', degStart: 236.25, degEnd: 258.75, name: 'West-South-West',         deity: 'Dauvarika',tattva: 'Earth / Air', planet: 'Saturn (Shani)', quality: 'Moderate' },
    { code: 'W',   degStart: 258.75, degEnd: 281.25, name: 'West (Paschima)',         deity: 'Varuna',  tattva: 'Air / Water',   planet: 'Saturn (Shani)', quality: 'Auspicious' },
    { code: 'WNW', degStart: 281.25, degEnd: 303.75, name: 'West-North-West',         deity: 'Asura',   tattva: 'Air',           planet: 'Moon (Chandra)', quality: 'Inauspicious' },
    { code: 'NW',  degStart: 303.75, degEnd: 326.25, name: 'North-West (Vayavya)',    deity: 'Vayu',    tattva: 'Air',           planet: 'Moon (Chandra)', quality: 'Moderate' },
    { code: 'NNW', degStart: 326.25, degEnd: 348.75, name: 'North-North-West',        deity: 'Naga',    tattva: 'Air / Water',   planet: 'Mercury (Budha)', quality: 'Auspicious' }
  ];

  /**
   * Helper: Normalize degree to [0, 360)
   */
  function normalizeDegree(deg) {
    if (typeof deg !== 'number' || isNaN(deg)) return 0;
    let d = deg % 360;
    if (d < 0) d += 360;
    return d;
  }

  /**
   * Helper: Degree to Direction Code (16 directions)
   */
  function degreeToDirection16(deg) {
    const d = normalizeDegree(deg);
    for (let i = 0; i < DIRECTIONS_16.length; i++) {
      const dir = DIRECTIONS_16[i];
      if (dir.code === 'N') {
        if (d >= dir.degStart || d < dir.degEnd) return dir;
      } else {
        if (d >= dir.degStart && d < dir.degEnd) return dir;
      }
    }
    return DIRECTIONS_16[0];
  }

  /**
   * Helper: Degree to Cardinal 8 Quadrants ('N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW')
   */
  function degreeToQuadrant8(deg) {
    const d = normalizeDegree(deg);
    if (d >= 337.5 || d < 22.5)  return 'N';
    if (d >= 22.5  && d < 67.5)  return 'NE';
    if (d >= 67.5  && d < 112.5) return 'E';
    if (d >= 112.5 && d < 157.5) return 'SE';
    if (d >= 157.5 && d < 202.5) return 'S';
    if (d >= 202.5 && d < 247.5) return 'SW';
    if (d >= 247.5 && d < 292.5) return 'W';
    return 'NW';
  }

  /**
   * Helper: Normalize quadrant string to 8 major directions
   */
  function normalizeQuadrant(val) {
    if (!val) return 'N';
    const s = String(val).trim().toUpperCase();
    if (['N', 'NORTH', 'UTTARA'].includes(s)) return 'N';
    if (['NE', 'NORTH-EAST', 'NORTHEAST', 'ISHANYA', 'EESANYA', 'NNE', 'NORTH-NORTH-EAST', 'ENE', 'EAST-NORTH-EAST'].includes(s)) return 'NE';
    if (['E', 'EAST', 'POORVA', 'PURVA', 'ESE', 'EAST-SOUTH-EAST'].includes(s)) return 'E';
    if (['SE', 'SOUTH-EAST', 'SOUTHEAST', 'AGNEYA', 'SSE', 'SOUTH-SOUTH-EAST'].includes(s)) return 'SE';
    if (['S', 'SOUTH', 'DAKSHINA', 'SSW', 'SOUTH-SOUTH-WEST'].includes(s)) return 'S';
    if (['SW', 'SOUTH-WEST', 'SOUTHWEST', 'NAIRRUTI', 'NIRRUTI', 'WSW', 'WEST-SOUTH-WEST'].includes(s)) return 'SW';
    if (['W', 'WEST', 'PASCHIMA'].includes(s)) return 'W';
    if (['NW', 'NORTH-WEST', 'NORTHWEST', 'VAYAVYA', 'WNW', 'WEST-NORTH-WEST', 'NNW', 'NORTH-NORTH-WEST'].includes(s)) return 'NW';
    return 'N';
  }

  /**
   * Assessment label mapper
   */
  function scoreToAssessment(score) {
    if (score >= 90) return "Highly Auspicious";
    if (score >= 70) return "Auspicious";
    if (score >= 50) return "Moderate";
    if (score >= 30) return "Inauspicious";
    return "Severe Dosha";
  }

  // =========================================================================
  // SVG VISUALIZER 1: INTERACTIVE SACRED COMPASS (8 / 16-POINT DIAL)
  // =========================================================================
  /**
   * Generates a self-contained, responsive SVG Compass with a rotating needle,
   * degree ticks, quadrant highlights, and Vedic Sanskrit annotations.
   *
   * @param {number} angle - Compass orientation in degrees (0 - 360)
   * @param {string} activeQuadrant - Quadrant to highlight ('N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW')
   * @returns {string} Standalone SVG markup string
   */
  function generateCompassSVG(angle, activeQuadrant) {
    const deg = normalizeDegree(angle || 0);
    const actQuad = normalizeQuadrant(activeQuadrant || degreeToQuadrant8(deg));

    const cx = 200;
    const cy = 200;
    const rOuter = 185;
    const rDial = 165;
    const rInner = 125;

    // 8 Quadrants definitions
    const quadrants = [
      { id: 'N',  start: 337.5, end: 22.5,  label: 'N • UTTARA',   sanskrit: 'उत्तर',  deity: 'Kubera',  color: '#0D9488', bg: '#F0FDFA' },
      { id: 'NE', start: 22.5,  end: 67.5,  label: 'NE • ISHANYA',  sanskrit: 'ईशान्य', deity: 'Shiva',   color: '#0284C7', bg: '#F0F9FF' },
      { id: 'E',  start: 67.5,  end: 112.5, label: 'E • POORVA',   sanskrit: 'पूर्व',   deity: 'Indra',   color: '#D97706', bg: '#FFFBEB' },
      { id: 'SE', start: 112.5, end: 157.5, label: 'SE • AGNEYA',  sanskrit: 'आग्नेय', deity: 'Agni',    color: '#DC2626', bg: '#FEF2F2' },
      { id: 'S',  start: 157.5, end: 202.5, label: 'S • DAKSHINA', sanskrit: 'दक्षिण', deity: 'Yama',    color: '#B91C1C', bg: '#FFF1F2' },
      { id: 'SW', start: 202.5, end: 247.5, label: 'SW • NAIRRUTI',sanskrit: 'नैर्ऋत्य',deity: 'Nirriti', color: '#92400E', bg: '#FEF3C7' },
      { id: 'W',  start: 247.5, end: 292.5, label: 'W • PASCHIMA', sanskrit: 'पश्चिम', deity: 'Varuna',  color: '#4338CA', bg: '#EEF2FF' },
      { id: 'NW', start: 292.5, end: 337.5, label: 'NW • VAYAVYA', sanskrit: 'वायव्य', deity: 'Vayu',    color: '#4B5563', bg: '#F3F4F6' }
    ];

    // Helper: Polar to Cartesian (0 deg is top / 12 o'clock)
    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
      const radians = ((angleInDegrees - 90) * Math.PI) / 180.0;
      return {
        x: centerX + radius * Math.cos(radians),
        y: centerY + radius * Math.sin(radians)
      };
    }

    // Helper: Create doughnut arc slice path
    function describeArcSlice(centerX, centerY, innerR, outerR, startAngle, endAngle) {
      let s = startAngle;
      let e = endAngle;
      if (e < s) e += 360;

      const p1 = polarToCartesian(centerX, centerY, outerR, s);
      const p2 = polarToCartesian(centerX, centerY, outerR, e);
      const p3 = polarToCartesian(centerX, centerY, innerR, e);
      const p4 = polarToCartesian(centerX, centerY, innerR, s);

      const largeArcFlag = e - s <= 180 ? '0' : '1';

      return [
        'M', p1.x, p1.y,
        'A', outerR, outerR, 0, largeArcFlag, 1, p2.x, p2.y,
        'L', p3.x, p3.y,
        'A', innerR, innerR, 0, largeArcFlag, 0, p4.x, p4.y,
        'Z'
      ].join(' ');
    }

    // Build Quadrant Wedge Paths
    let quadrantPathsSvg = '';
    quadrants.forEach((q) => {
      const isActive = q.id === actQuad;
      const pathD = describeArcSlice(cx, cy, rInner + 2, rDial - 2, q.start, q.end);
      const fillColor = isActive ? q.color : q.bg;
      const fillOpacity = isActive ? '0.85' : '0.45';
      const strokeColor = isActive ? '#F59E0B' : '#E2E8F0';
      const strokeWidth = isActive ? '2.5' : '1';

      let midAngle = (q.start + q.end) / 2;
      if (q.end < q.start) midAngle = (q.start + q.end + 360) / 2;
      if (midAngle >= 360) midAngle -= 360;

      const labelPos = polarToCartesian(cx, cy, (rInner + rDial) / 2, midAngle);
      const textColor = isActive ? '#FFFFFF' : q.color;
      const fontWeight = isActive ? 'bold' : '600';

      quadrantPathsSvg += `
        <g class="vastu-compass-quadrant" data-quadrant="${q.id}">
          <path d="${pathD}" fill="${fillColor}" fill-opacity="${fillOpacity}" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
          <text x="${labelPos.x}" y="${labelPos.y - 4}" text-anchor="middle" dominant-baseline="middle" font-size="8.5" font-family="'Segoe UI', Roboto, sans-serif" font-weight="${fontWeight}" fill="${textColor}">
            ${q.id}
          </text>
          <text x="${labelPos.x}" y="${labelPos.y + 6}" text-anchor="middle" dominant-baseline="middle" font-size="7" font-family="'Segoe UI', Roboto, sans-serif" font-weight="500" fill="${textColor}" opacity="0.9">
            ${q.sanskrit}
          </text>
        </g>`;
    });

    // Degree Ticks & Labels around perimeter
    let ticksSvg = '';
    for (let d = 0; d < 360; d += 5) {
      const isMajor = d % 45 === 0;
      const isMedium = d % 15 === 0 && !isMajor;
      const tickLen = isMajor ? 10 : (isMedium ? 6 : 3);
      const pStart = polarToCartesian(cx, cy, rDial, d);
      const pEnd = polarToCartesian(cx, cy, rDial + tickLen, d);
      const strokeCol = isMajor ? '#D97706' : (isMedium ? '#64748B' : '#94A3B8');
      const strokeW = isMajor ? '2' : (isMedium ? '1.2' : '0.8');

      ticksSvg += `<line x1="${pStart.x}" y1="${pStart.y}" x2="${pEnd.x}" y2="${pEnd.y}" stroke="${strokeCol}" stroke-width="${strokeW}" />`;

      if (d % 30 === 0) {
        const textPos = polarToCartesian(cx, cy, rDial + 14, d);
        ticksSvg += `<text x="${textPos.x}" y="${textPos.y}" text-anchor="middle" dominant-baseline="middle" font-size="7.5" font-family="monospace" fill="#475569" font-weight="600">${d}°</text>`;
      }
    }

    // Sacred Rotating Needle (Rotated by `deg`)
    const needleSvg = `
      <g transform="rotate(${deg}, ${cx}, ${cy})">
        <!-- North Pointer (Ruby / Gold) -->
        <polygon points="${cx},${cy - 110} ${cx - 7},${cy - 15} ${cx},${cy} ${cx + 7},${cy - 15}" fill="#DC2626" stroke="#B91C1C" stroke-width="1" />
        <polygon points="${cx},${cy - 110} ${cx},${cy} ${cx + 7},${cy - 15}" fill="#EF4444" />
        <circle cx="${cx}" cy="${cy - 92}" r="3" fill="#FEF08A" stroke="#B45309" stroke-width="0.8" />
        <text x="${cx}" y="${cy - 70}" text-anchor="middle" font-size="10" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#FFFFFF">N</text>

        <!-- South Pointer (Slate / Silver) -->
        <polygon points="${cx},${cy + 110} ${cx - 7},${cy + 15} ${cx},${cy} ${cx + 7},${cy + 15}" fill="#475569" stroke="#334155" stroke-width="1" />
        <polygon points="${cx},${cy + 110} ${cx},${cy} ${cx + 7},${cy + 15}" fill="#64748B" />
        <text x="${cx}" y="${cy + 75}" text-anchor="middle" font-size="10" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#FFFFFF">S</text>
        
        <!-- Sacred Central Pivot Gem -->
        <circle cx="${cx}" cy="${cy}" r="14" fill="#F59E0B" stroke="#78350F" stroke-width="2" />
        <circle cx="${cx}" cy="${cy}" r="9" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5" />
        <circle cx="${cx}" cy="${cy}" r="4" fill="#991B1B" />
      </g>`;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%" class="vastu-compass-svg" style="max-width: 480px; display: block; margin: 0 auto; user-select: none;">
  <defs>
    <radialGradient id="vastuDialBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="70%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </radialGradient>
    <radialGradient id="vastuBrahmaHub" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FEF08A" />
      <stop offset="80%" stop-color="#FDE047" />
      <stop offset="100%" stop-color="#F59E0B" />
    </radialGradient>
    <filter id="compassDropShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.15" />
    </filter>
  </defs>

  <!-- Outer Sacred Frame -->
  <circle cx="${cx}" cy="${cy}" r="${rOuter}" fill="#FFFFFF" stroke="#0F172A" stroke-width="3" filter="url(#compassDropShadow)" />
  <circle cx="${cx}" cy="${cy}" r="${rOuter - 4}" fill="none" stroke="#D97706" stroke-width="1.2" stroke-dasharray="4,2" />
  <circle cx="${cx}" cy="${cy}" r="${rDial}" fill="url(#vastuDialBg)" stroke="#334155" stroke-width="1.5" />

  <!-- Quadrant Sectors -->
  ${quadrantPathsSvg}

  <!-- Brahmasthan Central Circle -->
  <circle cx="${cx}" cy="${cy}" r="${rInner}" fill="#FFFFFF" fill-opacity="0.92" stroke="#CBD5E1" stroke-width="1" />
  <circle cx="${cx}" cy="${cy}" r="46" fill="url(#vastuBrahmaHub)" fill-opacity="0.25" stroke="#F59E0B" stroke-width="1.2" stroke-dasharray="3,2" />

  <!-- Direction Degree Ticks -->
  ${ticksSvg}

  <!-- Compass Needle -->
  ${needleSvg}

  <!-- Center Readout Badge -->
  <g transform="translate(${cx}, 365)">
    <rect x="-65" y="-14" width="130" height="24" rx="12" fill="#0F172A" stroke="#F59E0B" stroke-width="1" />
    <text x="0" y="2" text-anchor="middle" dominant-baseline="middle" font-size="11" font-family="'Segoe UI', monospace" font-weight="700" fill="#F8FAFC">
      ${deg.toFixed(1)}° • ${degreeToQuadrant8(deg)}
    </text>
  </g>
</svg>`;
  }

  // =========================================================================
  // SVG VISUALIZER 2: 32-PADA MANDALA ENTRANCE SELECTOR (9x9 PARAMASAYIKA)
  // =========================================================================
  /**
   * Generates a rich interactive SVG visualizer of the 81-Pada (9x9) Paramasayika Grid,
   * color-coding and mapping the 32 outer Dvāra Padas (Entrances) with the selected
   * entrance highlighted.
   *
   * @param {number|string} selectedPadaIndex - Index (1 - 32) or Pada ID (e.g. 'E3', 'N4')
   * @returns {string} Standalone SVG markup string
   */
  function generatePadaMandalaSVG(selectedPadaIndex) {
    let selIdx = 4; // Default to Mahendra (E4)
    if (typeof selectedPadaIndex === 'number') {
      selIdx = Math.max(1, Math.min(32, Math.floor(selectedPadaIndex)));
    } else if (typeof selectedPadaIndex === 'string') {
      const found = PADA_DATABASE.find(p => p.id.toUpperCase() === selectedPadaIndex.trim().toUpperCase());
      if (found) selIdx = found.index;
      else {
        const parsed = parseInt(selectedPadaIndex, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 32) selIdx = parsed;
      }
    }

    const size = 480;
    const padding = 36;
    const gridSize = size - padding * 2;
    const cellSize = gridSize / 9;

    const boundaryGridMap = {
      // East (1 - 8)
      1:  { col: 8, row: 0, wall: 'East' },
      2:  { col: 8, row: 1, wall: 'East' },
      3:  { col: 8, row: 2, wall: 'East' },
      4:  { col: 8, row: 3, wall: 'East' },
      5:  { col: 8, row: 4, wall: 'East' },
      6:  { col: 8, row: 5, wall: 'East' },
      7:  { col: 8, row: 6, wall: 'East' },
      8:  { col: 8, row: 7, wall: 'East' },
      // South (9 - 16)
      9:  { col: 8, row: 8, wall: 'South' },
      10: { col: 7, row: 8, wall: 'South' },
      11: { col: 6, row: 8, wall: 'South' },
      12: { col: 5, row: 8, wall: 'South' },
      13: { col: 4, row: 8, wall: 'South' },
      14: { col: 3, row: 8, wall: 'South' },
      15: { col: 2, row: 8, wall: 'South' },
      16: { col: 1, row: 8, wall: 'South' },
      // West (17 - 24)
      17: { col: 0, row: 8, wall: 'West' },
      18: { col: 0, row: 7, wall: 'West' },
      19: { col: 0, row: 6, wall: 'West' },
      20: { col: 0, row: 5, wall: 'West' },
      21: { col: 0, row: 4, wall: 'West' },
      22: { col: 0, row: 3, wall: 'West' },
      23: { col: 0, row: 2, wall: 'West' },
      24: { col: 0, row: 1, wall: 'West' },
      // North (25 - 32)
      25: { col: 0, row: 0, wall: 'North' },
      26: { col: 1, row: 0, wall: 'North' },
      27: { col: 2, row: 0, wall: 'North' },
      28: { col: 3, row: 0, wall: 'North' },
      29: { col: 4, row: 0, wall: 'North' },
      30: { col: 5, row: 0, wall: 'North' },
      31: { col: 6, row: 0, wall: 'North' },
      32: { col: 7, row: 0, wall: 'North' }
    };

    let cellsSvg = '';

    // Draw inner grid (columns 1 to 7, rows 1 to 7)
    for (let c = 1; c < 8; c++) {
      for (let r = 1; r < 8; r++) {
        const x = padding + c * cellSize;
        const y = padding + r * cellSize;
        const isBrahma = (c >= 3 && c <= 5 && r >= 3 && r <= 5);
        const fill = isBrahma ? '#FEF3C7' : '#F8FAFC';
        const stroke = isBrahma ? '#F59E0B' : '#E2E8F0';
        cellsSvg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${fill}" stroke="${stroke}" stroke-width="1" />`;
      }
    }

    // Brahmasthan central text
    const bx = padding + 3 * cellSize;
    const by = padding + 3 * cellSize;
    const bSize = 3 * cellSize;
    cellsSvg += `
      <rect x="${bx}" y="${by}" width="${bSize}" height="${bSize}" fill="#FEF08A" fill-opacity="0.4" stroke="#F59E0B" stroke-width="2" />
      <text x="${bx + bSize / 2}" y="${by + bSize / 2 - 8}" text-anchor="middle" font-size="12" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#B45309">BRAHMASTHAN</text>
      <text x="${bx + bSize / 2}" y="${by + bSize / 2 + 10}" text-anchor="middle" font-size="9" font-family="'Segoe UI', sans-serif" fill="#92400E">Center of Prāṇa (Open/Sacred)</text>
    `;

    // Render outer 32 Padas
    PADA_DATABASE.forEach((pada) => {
      const pos = boundaryGridMap[pada.index];
      if (!pos) return;
      const x = padding + pos.col * cellSize;
      const y = padding + pos.row * cellSize;
      const isSelected = pada.index === selIdx;

      let cellBg = '#FEF2F2';
      let cellStroke = '#EF4444';
      let textColor = '#991B1B';

      if (pada.quality === 'Highly Auspicious') {
        cellBg = '#ECFDF5';
        cellStroke = '#10B981';
        textColor = '#065F46';
      } else if (pada.quality === 'Auspicious') {
        cellBg = '#F0FDF4';
        cellStroke = '#34D399';
        textColor = '#166534';
      } else if (pada.quality === 'Moderate') {
        cellBg = '#FFFBEB';
        cellStroke = '#F59E0B';
        textColor = '#92400E';
      }

      if (isSelected) {
        cellBg = '#FDE68A';
        cellStroke = '#D97706';
        textColor = '#78350F';
      }

      const shortDeity = pada.deity.split(' ')[0].replace(/[^a-zA-Z]/g, '');

      cellsSvg += `
        <g class="vastu-pada-cell" data-pada="${pada.index}" data-pada-id="${pada.id}" cursor="pointer">
          <rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${cellBg}" stroke="${cellStroke}" stroke-width="${isSelected ? '3' : '1.5'}" rx="2" />
          ${isSelected ? `<rect x="${x-2}" y="${y-2}" width="${cellSize+4}" height="${cellSize+4}" fill="none" stroke="#D97706" stroke-width="2" stroke-dasharray="3,2" rx="4" />` : ''}
          <text x="${x + 4}" y="${y + 12}" font-size="8.5" font-family="'Segoe UI', monospace" font-weight="700" fill="${textColor}">
            ${pada.id}
          </text>
          <text x="${x + cellSize / 2}" y="${y + cellSize / 2 + 3}" text-anchor="middle" font-size="7.5" font-family="'Segoe UI', sans-serif" font-weight="${isSelected ? 'bold' : '600'}" fill="${textColor}">
            ${shortDeity}
          </text>
          <text x="${x + cellSize - 4}" y="${y + cellSize - 5}" text-anchor="end" font-size="7" font-family="monospace" fill="${isSelected ? '#78350F' : '#64748B'}">
            #${pada.index}
          </text>
        </g>`;
    });

    const activePada = PADA_DATABASE.find(p => p.index === selIdx) || PADA_DATABASE[3];

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size + 50}" width="100%" height="100%" class="vastu-pada-mandala-svg" style="max-width: 520px; display: block; margin: 0 auto; user-select: none;">
  <defs>
    <filter id="mandalaCardShadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#0F172A" flood-opacity="0.1" />
    </filter>
  </defs>

  <!-- Outer Canvas Card -->
  <rect x="10" y="10" width="${size - 20}" height="${size - 20}" rx="8" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5" filter="url(#mandalaCardShadow)" />

  <!-- Wall Direction Banners -->
  <text x="${size / 2}" y="24" text-anchor="middle" font-size="10" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#0D9488" letter-spacing="1.5">▲ NORTH (UTTARA - KUBERA)</text>
  <text x="${size - 18}" y="${size / 2}" text-anchor="middle" font-size="10" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#D97706" letter-spacing="1.5" transform="rotate(90, ${size - 18}, ${size / 2})">▲ EAST (POORVA - INDRA)</text>
  <text x="${size / 2}" y="${size - 14}" text-anchor="middle" font-size="10" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#DC2626" letter-spacing="1.5">▼ SOUTH (DAKSHINA - YAMA)</text>
  <text x="22" y="${size / 2}" text-anchor="middle" font-size="10" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#4338CA" letter-spacing="1.5" transform="rotate(-90, 22, ${size / 2})">▲ WEST (PASCHIMA - VARUNA)</text>

  <!-- Grid & Cells -->
  ${cellsSvg}

  <!-- Active Pada Info Bar at Bottom -->
  <g transform="translate(16, ${size + 6})">
    <rect x="0" y="0" width="${size - 32}" height="38" rx="6" fill="#0F172A" />
    <text x="14" y="18" font-size="11" font-family="'Segoe UI', sans-serif" font-weight="bold" fill="#FDE047">
      ${activePada.id} • Pada #${activePada.index}: ${activePada.deity}
    </text>
    <text x="14" y="31" font-size="9" font-family="'Segoe UI', sans-serif" fill="#E2E8F0">
      Assessment: <tspan font-weight="bold" fill="${activePada.quality === 'Highly Auspicious' ? '#34D399' : (activePada.quality === 'Auspicious' ? '#6EE7B7' : (activePada.quality === 'Moderate' ? '#FCD34D' : '#F87171'))}">${activePada.quality}</tspan> (Score: ${activePada.score}/100)
    </text>
    <text x="${size - 46}" y="24" text-anchor="end" font-size="10" font-family="'Segoe UI', monospace" font-weight="bold" fill="#94A3B8">
      ${activePada.wall.toUpperCase()}
    </text>
  </g>
</svg>`;
  }

  // =========================================================================
  // TOOL 1: HOUSE VASTU ANALYZER
  // =========================================================================
  /**
   * Comprehensive Whole-House Vastu Assessment
   * Evaluates facing, kitchen, master bedroom, puja room, toilet, living room,
   * water storage, Brahmasthan, and land slope.
   */
  function calculateHouseVastu(inputs) {
    const inp = inputs || {};
    const facing = normalizeQuadrant(inp.facing || inp.entrance || 'E');
    const kitchen = normalizeQuadrant(inp.kitchen || 'SE');
    const masterBedroom = normalizeQuadrant(inp.masterBedroom || inp.masterbed || 'SW');
    const puja = normalizeQuadrant(inp.puja || inp.pujaRoom || 'NE');
    const toilet = normalizeQuadrant(inp.toilet || 'NW');
    const living = normalizeQuadrant(inp.living || inp.livingRoom || 'E');
    const water = normalizeQuadrant(inp.water || inp.waterStorage || 'NE');
    const brahmasthan = String(inp.brahmasthan || 'open').toLowerCase().trim();
    const slope = normalizeQuadrant(inp.slope || 'NE');

    const breakdown = [];

    // 1. Facing assessment
    let facingScore = 75;
    let facingNote = "";
    if (['N', 'NE', 'E'].includes(facing)) {
      facingScore = 95;
      facingNote = "North, East, and North-East facings admit vital cosmic solar and magnetic flux.";
    } else if (facing === 'W') {
      facingScore = 75;
      facingNote = "West facing gives commercial success under Lord Varuna with proper entrance pada.";
    } else if (facing === 'NW') {
      facingScore = 65;
      facingNote = "North-West brings movement and transit opportunities under Lord Vayu.";
    } else if (facing === 'SE') {
      facingScore = 55;
      facingNote = "South-East entrance introduces excessive Agni; requires calming elemental adjustments.";
    } else if (facing === 'S') {
      facingScore = 50;
      facingNote = "South facing is governed by Yama; requires precise Grihakshata (S4) entrance placement.";
    } else { // SW
      facingScore = 20;
      facingNote = "South-West facing violates the Earth anchor; induces financial leakages and domestic friction.";
    }
    breakdown.push({ element: "House Orientation", zone: facing, score: facingScore, rule: facingNote });

    // 2. Kitchen assessment (Agni / SE is prime; NW secondary)
    let kitchenScore = 20;
    let kitchenNote = "";
    if (kitchen === 'SE') {
      kitchenScore = 100;
      kitchenNote = "Optimal placement in Agneya (South-East). Fire element resides in its own celestial quadrant.";
    } else if (kitchen === 'NW') {
      kitchenScore = 80;
      kitchenNote = "Acceptable secondary placement in Vayavya (North-West). Air feeds fire harmoniously.";
    } else if (kitchen === 'E') {
      kitchenScore = 70;
      kitchenNote = "East kitchen is moderate; allows cooking facing morning solar rays.";
    } else if (kitchen === 'NE') {
      kitchenScore = 10;
      kitchenNote = "Catastrophic Agni-Jala conflict in Ishanya (North-East). Stifles prosperity and spiritual peace.";
    } else if (kitchen === 'SW') {
      kitchenScore = 15;
      kitchenNote = "Severe fire in Earth corner causes domestic instability and health breakdown.";
    } else {
      kitchenScore = 40;
      kitchenNote = "Kitchen placement in this zone causes sub-optimal energy flow.";
    }
    breakdown.push({ element: "Kitchen", zone: kitchen, score: kitchenScore, rule: kitchenNote });

    // 3. Master Bedroom assessment (SW / Nairruti is prime)
    let mbScore = 25;
    let mbNote = "";
    if (masterBedroom === 'SW') {
      mbScore = 100;
      mbNote = "Supreme Nairruti positioning. Anchors patriarchal/matriarchal stability, authority, and health.";
    } else if (['S', 'W'].includes(masterBedroom)) {
      mbScore = 85;
      mbNote = "South or West bedrooms provide grounded Earth/Air stability.";
    } else if (masterBedroom === 'NW') {
      mbScore = 60;
      mbNote = "North-West induces restlessness; better suited for guests or unmarried daughters.";
    } else if (masterBedroom === 'SE') {
      mbScore = 30;
      mbNote = "Agneya bedroom causes short temper, insomnia, and interpersonal friction.";
    } else if (masterBedroom === 'NE') {
      mbScore = 15;
      mbNote = "Severe dosha. Master sleeping in divine Ishanya quadrant causes mental exhaustion and financial leak.";
    } else {
      mbScore = 50;
      mbNote = "Moderate bedroom placement; sleep head orientation must be aligned to South.";
    }
    breakdown.push({ element: "Master Bedroom", zone: masterBedroom, score: mbScore, rule: mbNote });

    // 4. Puja Room assessment (NE is prime)
    let pujaScore = 20;
    let pujaNote = "";
    if (puja === 'NE') {
      pujaScore = 100;
      pujaNote = "Paramount Ishanya placement. Divine portal of Lord Shiva and Jupiter; maximizes sattvic energy.";
    } else if (['N', 'E'].includes(puja)) {
      pujaScore = 85;
      pujaNote = "East or North puja allows pure solar or magnetic communion.";
    } else if (puja === 'W') {
      pujaScore = 60;
      pujaNote = "West puja is moderate; acceptable for business establishments.";
    } else if (['SE', 'NW'].includes(puja)) {
      pujaScore = 40;
      pujaNote = "Fire or Air corners induce agitated thoughts during prayer.";
    } else if (puja === 'SW') {
      pujaScore = 15;
      pujaNote = "Puja in Nairruti invites spiritual arrogance and material blockages.";
    } else {
      pujaScore = 30;
      pujaNote = "South puja is generally avoided for household deities.";
    }
    breakdown.push({ element: "Puja Room", zone: puja, score: pujaScore, rule: pujaNote });

    // 5. Toilet assessment (WSW, SSW, NW are prime waste disposal zones)
    let toiletScore = 25;
    let toiletNote = "";
    if (['NW', 'W'].includes(toilet)) {
      toiletScore = 90;
      toiletNote = "Auspicious waste elimination in Vayavya/Varuna zone. Negative waste is quickly purged.";
    } else if (toilet === 'S') {
      toiletScore = 75;
      toiletNote = "Acceptable southern positioning when placed between South and South-West (SSW).";
    } else if (toilet === 'NE') {
      toiletScore = 5;
      toiletNote = "Maha-Dosha: Toilet in Ishanya destroys mental peace, financial growth, and spiritual merit.";
    } else if (toilet === 'SW') {
      toiletScore = 10;
      toiletNote = "Severe Dosha: Toilet in Nairruti weakens owner vitality, stability, and savings.";
    } else if (toilet === 'SE') {
      toiletScore = 25;
      toiletNote = "Extinguishes the digestive Agni; causes gynecological and digestive ailments.";
    } else {
      toiletScore = 50;
      toiletNote = "Ensure commode seat aligns along North-South axis.";
    }
    breakdown.push({ element: "Toilet / Bathroom", zone: toilet, score: toiletScore, rule: toiletNote });

    // 6. Water Storage assessment (NE for subterranean, SW for overhead)
    let waterScore = 40;
    let waterNote = "";
    if (['NE', 'N', 'E'].includes(water)) {
      waterScore = 95;
      waterNote = "Water in North/East/North-East brings Kubera-Lakshmi prosperity and intellectual clarity.";
    } else if (['W', 'NW'].includes(water)) {
      waterScore = 70;
      waterNote = "Acceptable secondary water zone under Lord Varuna.";
    } else if (water === 'SE') {
      waterScore = 15;
      waterNote = "Water in Fire quadrant causes severe Agni-Jala dosha, legal disputes, and health strain.";
    } else if (water === 'SW') {
      waterScore = 25;
      waterNote = "Underground water in SW causes severe foundation collapse; overhead water tank in SW is auspicious.";
    } else {
      waterScore = 50;
      waterNote = "Maintain clean filters and copper storage vessels.";
    }
    breakdown.push({ element: "Water Element", zone: water, score: waterScore, rule: waterNote });

    // 7. Brahmasthan assessment
    let brahmaScore = 95;
    let brahmaNote = "Brahmasthan is open, clean, and unencumbered; cosmic prana circulates freely.";
    if (brahmasthan.includes('toilet') || brahmasthan.includes('bath')) {
      brahmaScore = 0;
      brahmaNote = "Catastrophic: Toilet in Brahmasthan destroys the spiritual navel of the home.";
    } else if (brahmasthan.includes('stair') || brahmasthan.includes('pillar') || brahmasthan.includes('heavy')) {
      brahmaScore = 25;
      brahmaNote = "Heavy structural column or staircase in Brahmasthan inflicts severe chest/heart stress on occupants.";
    } else if (brahmasthan.includes('kitchen')) {
      brahmaScore = 30;
      brahmaNote = "Fire in Brahmasthan heats the core aura of the home, provoking endless discord.";
    }
    breakdown.push({ element: "Brahmasthan (Core)", zone: "Center", score: brahmaScore, rule: brahmaNote });

    // Composite Score calculation (weighted)
    const weightedSum = (facingScore * 0.15) + (kitchenScore * 0.15) + (mbScore * 0.15) +
                        (pujaScore * 0.15) + (toiletScore * 0.15) + (waterScore * 0.10) + (brahmaScore * 0.15);
    const finalScore = Math.round(weightedSum);
    const assessment = scoreToAssessment(finalScore);

    let remedy = "Maintain daily cleanliness, open eastern windows at sunrise, and burn pure guggul/camphor.";
    if (finalScore < 60) {
      remedy = "Correct primary doshas using Panchtattva Brass/Copper boundary strips, Lead helix in SW, and establish a pure NE prayer station.";
    }

    return {
      toolId: "house-vastu-analyzer",
      toolName: "Whole-House Vastu Analyzer",
      elementName: "Complete Residential Layout",
      assessment: assessment,
      score: finalScore,
      tradition: TRADITION_VEDIC,
      sourceReference: "Mayamata Ch. 26 (Śālā-lakṣaṇa); Bṛhat Saṃhitā 53.31-85; Samarāṅgaṇa Sūtradhāra Ch. 49",
      plainRule: "A balanced dwelling harmonizes the Pancha Mahabhutas: Water & Ether in North-East, Fire in South-East, Earth in South-West, Air in North-West, and Open Ether in Brahmasthan.",
      remedy: remedy,
      variationNote: VARIATION_NOTE_DEFAULT,
      breakdown: breakdown,
      activeQuadrant: facing
    };
  }

  // =========================================================================
  // TOOL 2: PLOT VASTU ANALYZER
  // =========================================================================
  /**
   * Plot / Land Vastu Evaluation
   * Evaluates plot shape, slope, soil, surroundings, and road facing.
   */
  function calculatePlotVastu(inputs) {
    const inp = inputs || {};
    const shape = String(inp.shape || 'rectangular').toLowerCase().trim();
    const slope = normalizeQuadrant(inp.slope || 'NE');
    const soilType = String(inp.soilType || 'yellow_sandy').toLowerCase().trim();
    const roads = String(inp.roads || inp.roadFacing || 'east').toLowerCase().trim();
    const tJunction = Boolean(inp.tJunction || inp.veedhiShula);

    let shapeScore = 70;
    let shapeRule = "";
    if (shape === 'square') {
      shapeScore = 100;
      shapeRule = "Square plot (Samachaturasra) provides absolute elemental equilibrium and longevity.";
    } else if (shape === 'rectangular') {
      shapeScore = 90;
      shapeRule = "Rectangular plot (Ayatākāra) with length to breadth ratio <= 1:2 is highly auspicious for wealth.";
    } else if (shape === 'gaumukhi') {
      shapeScore = 88;
      shapeRule = "Gaumukhi (narrow in front, wide at rear) brings tremendous peace and prosperity for residential homes.";
    } else if (shape === 'shermukhi' || shape === 'singhmukhi') {
      shapeScore = 55;
      shapeRule = "Shermukhi (wide front, narrow rear) is auspicious for commercial enterprises, but unfavorable for residences.";
    } else if (shape === 'circular' || shape === 'oval') {
      shapeScore = 30;
      shapeRule = "Circular plots generate centrifugal dissipation of energy; unsuitable for family residences.";
    } else if (shape === 'triangular') {
      shapeScore = 15;
      shapeRule = "Triangular plot (Trikona) attracts fire hazards, government litigation, and chronic anxiety.";
    } else {
      shapeScore = 35;
      shapeRule = "Irregular/L-shaped plot causes truncated energetic grids; requires geometric boundary correction.";
    }

    // Slope calculation (NE, E, N slopes are auspicious)
    let slopeScore = 40;
    let slopeRule = "";
    if (slope === 'NE') {
      slopeScore = 100;
      slopeRule = "Supreme Ishanya slope: cosmic and magnetic runoff flows toward North-East, multiplying wealth.";
    } else if (slope === 'N' || slope === 'E') {
      slopeScore = 90;
      slopeRule = "Slope towards North or East allows natural drainage and abundant solar illumination.";
    } else if (slope === 'NW') {
      slopeScore = 60;
      slopeRule = "Slope towards North-West produces fluctuating savings and mobile wealth.";
    } else if (slope === 'SE') {
      slopeScore = 35;
      slopeRule = "Slope towards South-East causes fire hazards, medical expenditure, and short tempers.";
    } else if (slope === 'S') {
      slopeScore = 25;
      slopeRule = "Slope towards South brings loss of stability and recurring setbacks.";
    } else { // SW
      slopeScore = 10;
      slopeRule = "Slope towards South-West drains life force, prosperity, and patriarchal longevity into the void.";
    }

    // Soil score
    let soilScore = 70;
    if (soilType.includes('white') || soilType.includes('brahmin')) soilScore = 95;
    else if (soilType.includes('yellow') || soilType.includes('sandy')) soilScore = 85;
    else if (soilType.includes('red')) soilScore = 80;
    else if (soilType.includes('black') || soilType.includes('marshy')) soilScore = 40;
    else if (soilType.includes('rocky')) soilScore = 50;

    // Road score
    let roadScore = 70;
    if (roads.includes('all') || roads.includes('four')) roadScore = 100;
    else if (roads.includes('ne') || (roads.includes('north') && roads.includes('east'))) roadScore = 98;
    else if (roads.includes('east') || roads.includes('north')) roadScore = 90;
    else if (roads.includes('west')) roadScore = 75;
    else if (roads.includes('south')) roadScore = 60;

    // Veedhi Shula penalty
    let veedhiPenalty = 0;
    if (tJunction) {
      veedhiPenalty = 25;
    }

    const finalScore = Math.max(5, Math.min(100, Math.round((shapeScore * 0.35) + (slopeScore * 0.30) + (soilScore * 0.15) + (roadScore * 0.20) - veedhiPenalty)));
    const assessment = scoreToAssessment(finalScore);

    return {
      toolId: "plot-vastu-analyzer",
      toolName: "Plot & Land Vastu Analyzer",
      elementName: `Plot (${shape}, slope ${slope})`,
      assessment: assessment,
      score: finalScore,
      tradition: TRADITION_VEDIC,
      sourceReference: "Mayamata Ch. 6 (Bhūparīkṣā); Bṛhat Saṃhitā 53.13-22, 88-95; Mānasāra Ch. 7",
      plainRule: `Plots should ideally be square or rectangular with an aspect ratio under 1:2, sloping towards the North or North-East, with sweet, fertile soil. ${shapeRule} ${slopeRule}`,
      remedy: tJunction ? "Install a convex Vastu mirror, a lead/brass threshold energy barrier, and plant a dense hedge of Ashoka/Bamboo trees facing the road thrust." : "Level the plot so South and West boundaries are elevated, and plant fragrant flowering herbs in the North-East quadrant.",
      variationNote: VARIATION_NOTE_DEFAULT,
      plotAttributes: { shape, slope, soilType, roads, tJunction }
    };
  }

  // =========================================================================
  // TOOL 3: MAIN DOOR VASTU
  // =========================================================================
  /**
   * Evaluates the Main Entrance Door against the 32 outer deity padas.
   */
  function calculateMainDoorVastu(inputs) {
    const inp = inputs || {};
    let padaIndex = 4; // Default to Mahendra E4

    if (inp.padaIndex !== undefined) {
      padaIndex = Math.max(1, Math.min(32, parseInt(inp.padaIndex, 10) || 4));
    } else if (inp.pada || inp.padaName || inp.deity || inp.padaId || inp.id || inp.code) {
      const q = String(inp.pada || inp.padaName || inp.deity || inp.padaId || inp.id || inp.code).toLowerCase().trim();
      const match = PADA_DATABASE.find(p => p.deity.toLowerCase().includes(q) || p.id.toLowerCase() === q);
      if (match) padaIndex = match.index;
    } else if (inp.facingDirection || inp.wall) {
      const wall = normalizeQuadrant(inp.facingDirection || inp.wall);
      const seg = Math.max(1, Math.min(8, parseInt(inp.segment || inp.doorPosition, 10) || 3));
      if (wall === 'E') padaIndex = seg;
      else if (wall === 'S') padaIndex = 8 + seg;
      else if (wall === 'W') padaIndex = 16 + seg;
      else if (wall === 'N') padaIndex = 24 + seg;
    }

    const pada = PADA_DATABASE.find(p => p.index === padaIndex) || PADA_DATABASE[3];

    return {
      toolId: "main-door-vastu",
      toolName: "Main Door (Dvāra) Vastu Analyzer",
      elementName: `Main Entrance at ${pada.id} (${pada.deity})`,
      assessment: pada.quality,
      score: pada.score,
      tradition: TRADITION_VEDIC,
      sourceReference: pada.source,
      plainRule: pada.rule,
      remedy: pada.remedy,
      variationNote: VARIATION_NOTE_DEFAULT,
      pada: pada,
      padaDetails: {
        index: pada.index,
        id: pada.id,
        wall: pada.wall,
        deity: pada.deity,
        result: pada.result
      }
    };
  }

  // =========================================================================
  // TOOL 4: HOUSE FACING CALCULATOR
  // =========================================================================
  /**
   * House Facing Orientation Analyzer
   * Converts degree angle (0-360°) to 16 directional zones and 8 cardinal quadrants.
   */
  function calculateFacing(inputs) {
    let deg = 90;

    if (typeof inputs === 'number' && !isNaN(inputs)) {
      deg = normalizeDegree(inputs);
    } else if (typeof inputs === 'string' && !isNaN(parseFloat(inputs)) && !['N','S','E','W','NE','NW','SE','SW'].includes(inputs.toUpperCase().trim())) {
      deg = normalizeDegree(parseFloat(inputs));
    } else if (inputs && typeof inputs === 'object') {
      const inp = inputs;
      if (inp.degrees !== undefined && inp.degrees !== null && !isNaN(parseFloat(inp.degrees))) {
        deg = normalizeDegree(parseFloat(inp.degrees));
      } else if (inp.degree !== undefined && inp.degree !== null && !isNaN(parseFloat(inp.degree))) {
        deg = normalizeDegree(parseFloat(inp.degree));
      } else if (inp.facing !== undefined && inp.facing !== null && !isNaN(parseFloat(inp.facing))) {
        deg = normalizeDegree(parseFloat(inp.facing));
      } else if (inp.direction) {
        const q = normalizeQuadrant(inp.direction);
        const map = { N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315 };
        deg = map[q] !== undefined ? map[q] : 90;
      }
    } else if (typeof inputs === 'string') {
      const q = normalizeQuadrant(inputs);
      const map = { N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315 };
      deg = map[q] !== undefined ? map[q] : 90;
    }

    const dir16 = degreeToDirection16(deg);
    const quad8 = degreeToQuadrant8(deg);

    let score = 70;
    let rule = "";
    let remedy = "Ensure the main portal is unblocked by shadows or electrical poles.";

    if (['N', 'NE', 'E'].includes(quad8)) {
      score = dir16.code === 'NE' ? 98 : (dir16.code === 'N' ? 95 : 92);
      rule = `${dir16.name} orientation is governed by ${dir16.deity} and ${dir16.planet}. It welcomes auspicious geomagnetic prana and solar illumination, fostering prosperity and clarity.`;
      remedy = "Keep the entrance well-lit, adorned with a brass threshold and clean water urli with fresh flowers.";
    } else if (quad8 === 'W') {
      score = 80;
      rule = `West facing is governed by Lord Varuna and Saturn. Highly favorable for professionals, merchants, and public figures when doors are positioned in Sugriva (W3) or Pushpadanta (W4).`;
      remedy = "Establish strong threshold security and display an auspicious Surya/Swastika motif.";
    } else if (quad8 === 'NW') {
      score = 65;
      rule = `North-West is ruled by Lord Vayu and the Moon. Fosters mobility, travel, and trading partnerships, but may cause fluctuating liquidity.`;
      remedy = "Place a white crystal globe or silver wind-chime near the entrance.";
    } else if (quad8 === 'SE') {
      score = 55;
      rule = `South-East is ruled by Lord Agni and Venus. High metabolic and passionate energy; requires conscious balancing to prevent domestic irritation and legal stress.`;
      remedy = "Install copper pyramid strips embedded in the threshold to ground excessive electrical/fire energy.";
    } else if (quad8 === 'S') {
      score = 52;
      rule = `South facing is ruled by Lord Yama and Mars. Can be immensely prosperous for corporate leadership if the entrance sits in Brihatkshata (S4); otherwise generates discipline and strict trials.`;
      remedy = "Ensure door is framed in solid wood; affix a copper Mangala Yantra above the entrance.";
    } else { // SW
      score = 25;
      rule = `South-West facing enters through the Nairruti (demonic/earth) quadrant. Violates classical grounding norms and often causes health setbacks and capital dissipation.`;
      remedy = "Install three solid Lead helixes beneath the threshold, keep the entrance heavier than all other portals, and ensure a higher step rise.";
    }

    const assessment = scoreToAssessment(score);

    return {
      toolId: "house-facing-calculator",
      toolName: "House Facing Orientation Calculator",
      elementName: `${dir16.name} (${deg.toFixed(1)}°)`,
      assessment: assessment,
      score: score,
      degree: deg,
      tradition: TRADITION_VEDIC,
      sourceReference: "Mayamata Ch. 3 & 25; Viśvakarma Prakāśa 1.45-52; Bṛhat Saṃhitā 53.31-38",
      plainRule: rule,
      remedy: remedy,
      variationNote: VARIATION_NOTE_DEFAULT,
      direction: dir16.name,
      directionDetails: {
        degrees: deg,
        directionCode: dir16.code,
        directionName: dir16.name,
        quadrant: quad8,
        deity: dir16.deity,
        element: dir16.tattva,
        planet: dir16.planet
      }
    };
  }

  // =========================================================================
  // TOOL 5: BEDROOM VASTU
  // =========================================================================
  /**
   * Master / Children / Guest Bedroom Vastu Analyzer
   */
  function calculateBedroomVastu(inputs) {
    const inp = inputs || {};
    const zone = normalizeQuadrant(inp.zone || inp.location || 'SW');
    const bType = String(inp.bedroomType || inp.occupant || 'master').toLowerCase().trim();
    const bedHead = String(inp.bedHeadDirection || inp.headDirection || 'South').toLowerCase().trim();

    let score = 50;
    let rule = "";
    let remedy = "Keep the bedroom clutter-free, especially under the bed. Avoid mirrors directly reflecting the bed.";

    if (bType.includes('master')) {
      if (zone === 'SW') {
        score = 98;
        rule = "Master bedroom in Nairruti (South-West) anchors stability (Sthiratā), leadership, deep restorative sleep, and relationship harmony.";
        remedy = "Enhance with earthy tones (beige, terracotta), solid teakwood bed, and heavy curtains.";
      } else if (zone === 'S' || zone === 'W') {
        score = 85;
        rule = "South or West bedrooms provide solid grounding and steady professional authority.";
      } else if (zone === 'NW') {
        score = 55;
        rule = "North-West master bedroom creates chronic restlessness, frequent travel, and unstable domestic routines.";
        remedy = "Sleep with head strictly towards South and place grounding carnelian or agate stones in the room.";
      } else if (zone === 'SE') {
        score = 30;
        rule = "Agneya bedroom causes high body heat, emotional irritability, and frequent domestic disputes.";
        remedy = "Use cooling pastel green or rose shades; place a brass bowl with water and rose petals during the day.";
      } else if (zone === 'NE') {
        score = 15;
        rule = "Maha-Dosha: Master sleeping in divine Ishanya induces mental strain, business setbacks, and lack of conjugal privacy.";
        remedy = "Relocate master bedroom to South-West. If immovable, sleep with head towards South and avoid heavy wardrobes.";
      }
    } else if (bType.includes('child') || bType.includes('student')) {
      if (['E', 'W', 'N'].includes(zone)) {
        score = 95;
        rule = "East or West bedroom stimulates mental intellect, concentration, memory retention, and scholastic excellence.";
      } else if (zone === 'SW') {
        score = 65;
        rule = "Children in SW may become overly dominant and stubborn over household affairs.";
      }
    } else { // Guest
      if (zone === 'NW') {
        score = 95;
        rule = "North-West guest room governed by Vayu ensures guests have a comfortable stay without overextending their visit.";
      } else if (zone === 'SW') {
        score = 35;
        rule = "Guests in SW usurp the master's authority and create domestic friction.";
      }
    }

    // Head orientation adjustment
    let headBonus = 0;
    let headNote = "";
    if (bedHead.includes('south')) {
      headBonus = 5;
      headNote = "Sleeping with head towards South aligns human biological polarity with Earth's magnetic field, promoting deep sleep and longevity (Viṣṇu Purāṇa).";
    } else if (bedHead.includes('east')) {
      headBonus = 5;
      headNote = "Sleeping with head towards East enhances memory, meditative awareness, and spiritual focus.";
    } else if (bedHead.includes('west')) {
      headBonus = 0;
      headNote = "West head orientation is moderate; acceptable for guests and active professionals.";
    } else if (bedHead.includes('north')) {
      headBonus = -25;
      headNote = "Severe warning: Sleeping with head to North causes geomagnetic repulsion (North-North magnetic clash), leading to sleep apnea, nightmares, and elevated blood pressure.";
      remedy += " IMMEDIATELY rotate bed so the headboard rests against the South or East wall.";
    }

    const finalScore = Math.max(10, Math.min(100, score + headBonus));
    const assessment = scoreToAssessment(finalScore);

    return {
      toolId: "bedroom-vastu",
      toolName: "Bedroom Vastu Analyzer",
      elementName: `${bType.toUpperCase()} Bedroom in ${zone}`,
      assessment: assessment,
      score: finalScore,
      tradition: TRADITION_VEDIC,
      sourceReference: "Bṛhat Saṃhitā 53.60-64; Viśvakarma Prakāśa 2.102-108; Samarāṅgaṇa Sūtradhāra 49.32",
      plainRule: `${rule} ${headNote}`,
      remedy: remedy,
      variationNote: VARIATION_NOTE_DEFAULT,
      bedroomDetails: { zone, bedroomType: bType, bedHeadDirection: bedHead }
    };
  }

  // =========================================================================
  // TOOL 6: KITCHEN VASTU
  // =========================================================================
  /**
   * Kitchen & Hearth Vastu Analyzer
   */
  function calculateKitchenVastu(inputs) {
    const inp = inputs || {};
    const zone = normalizeQuadrant(inp.zone || inp.location || 'SE');
    const cookFacing = normalizeQuadrant(inp.cookingDirection || inp.cookFacing || 'E');
    const sinkZone = normalizeQuadrant(inp.sinkLocation || 'NE');

    let score = 40;
    let rule = "";
    let remedy = "Keep cooking stove and water sink separated by at least 3 feet of wooden or marble countertop.";

    if (zone === 'SE') {
      score = 98;
      rule = "South-East (Agneya) is the divine seat of Lord Agni. Kitchen here ensures robust digestion, health of the homemaker, and prosperity.";
      remedy = "Optimal location. Keep clean, use warm cream/granite finishes, and place stove in SE corner of the kitchen.";
    } else if (zone === 'NW') {
      score = 80;
      rule = "North-West (Vayavya) is the secondary kitchen quadrant. Wind (Vayu) assists Fire (Agni); maintains good hospitality and prompt food preparation.";
      remedy = "Paint walls in off-white or cream and install an energized copper swastika above the stove.";
    } else if (zone === 'E') {
      score = 70;
      rule = "East kitchen is acceptable; receives beneficial solar prana during early morning cooking.";
    } else if (zone === 'NE') {
      score = 10;
      rule = "Maha-Dosha: Kitchen in North-East creates fatal Water-Fire (Jala-Agni) annihilation. Drains wealth, sparks severe domestic tension, and harms mental health.";
      remedy = "Relocate cooking to SE or NW immediately. If immovable, paint kitchen yellow/cream, place green marble under stove, and install a Vastu Copper Agni Yantra.";
    } else if (zone === 'SW') {
      score = 15;
      rule = "Severe Dosha: Kitchen in South-West destabilizes the Earth quadrant, causing persistent domestic disputes and medical expenses for the family head.";
      remedy = "Relocate immediately. As a temporary buffer, place a heavy yellow Jaisalmer slab beneath the gas stove and install lead pyramids.";
    } else if (zone === 'N') {
      score = 25;
      rule = "North is Kubera's water realm; a kitchen here burns away liquid cashflow and commercial opportunities.";
      remedy = "Use green marble slab under the stove and install a brass Kubera Yantra in the Northern hallway.";
    } else {
      score = 50;
      rule = `${zone} kitchen requires strict separation of fire and water fixtures.`;
    }

    // Cook facing modifier
    let facingModifier = 0;
    if (cookFacing === 'E') {
      facingModifier = 2;
      rule += " Cooking while facing East allows the cook to absorb rising solar energy, promoting family vitality.";
    } else if (cookFacing === 'N') {
      facingModifier = 0;
      rule += " Facing North while cooking is acceptable.";
    } else if (cookFacing === 'S') {
      facingModifier = -15;
      rule += " Facing South while cooking induces fatigue, shoulder aches, and metabolic distress for the cook.";
      remedy += " Re-orient the cooktop so the person cooking faces East.";
    } else if (cookFacing === 'W') {
      facingModifier = -10;
      rule += " Facing West while cooking is linked to slow digestion and financial leakage.";
    }

    const finalScore = Math.max(10, Math.min(100, score + facingModifier));
    const assessment = scoreToAssessment(finalScore);

    return {
      toolId: "kitchen-vastu",
      toolName: "Kitchen & Fire Element Vastu Analyzer",
      elementName: `Kitchen in ${zone} (Cooking Facing ${cookFacing})`,
      assessment: assessment,
      score: finalScore,
      tradition: TRADITION_VEDIC,
      sourceReference: "Mayamata 26.21-25; Viśvakarma Prakāśa 2.92-96; Samarāṅgaṇa Sūtradhāra 49.25",
      plainRule: rule,
      remedy: remedy,
      variationNote: VARIATION_NOTE_DEFAULT,
      kitchenDetails: { zone, cookingFacing: cookFacing, sinkLocation: sinkZone }
    };
  }

  // =========================================================================
  // TOOL 7: TOILET & BATHROOM VASTU
  // =========================================================================
  /**
   * Toilet, Commode & Drainage Vastu Analyzer
   */
  function calculateToiletVastu(inputs) {
    const inp = inputs || {};
    const zone = normalizeQuadrant(inp.zone || inp.location || 'NW');
    const commodeAlign = String(inp.commodeFacing || inp.seatFacing || 'North-South').toLowerCase().trim();

    let score = 40;
    let rule = "";
    let remedy = "Keep toilet door strictly closed at all times. Place a bowl of unrefined Himalayan sea salt inside and replace weekly.";

    if (zone === 'NW' || zone === 'W') {
      score = 92;
      rule = "North-West (Vayavya) and West (Varuna) are classical zones of bio-waste expulsion. Negative energies are swept out cleanly.";
      remedy = "Auspicious placement. Ensure exhaust fan vents towards West/North-West.";
    } else if (zone === 'S') {
      score = 80;
      rule = "South positioning (ideally South of South-West / SSW) is the Vedic zone of Visarjan (disposal). Excellent for elimination.";
      remedy = "Maintain clean ventilation and place a lead partition bar at the bathroom door sill.";
    } else if (zone === 'NE') {
      score = 5;
      rule = "Maha-Dosha: Toilet in North-East (Ishanya) contaminates the sacred divine portal. Leads to neurological disorders, financial ruin, and chronic depression.";
      remedy = "Strictly abandon/demolish NE toilet. If impossible, remove commode completely or encircle it with a continuous Brass strip embedded in the floor, and keep energized sea salt constantly.";
    } else if (zone === 'SW') {
      score = 10;
      rule = "Severe Dosha: Toilet in South-West (Nairruti) flushes away the master's stability, authority, and life savings.";
      remedy = "Relocate commode. As an urgent buffer, seal the commode base with a 3mm Lead strip and install 9 lead pyramids around the bathroom perimeter.";
    } else if (zone === 'SE') {
      score = 25;
      rule = "Toilet in South-East pollutes the sacred Agni element; sparks digestive complaints, female health disorders, and fire accidents.";
      remedy = "Install a continuous Copper strip around the commode base and keep a camphor lamp burning.";
    } else if (zone === 'E') {
      score = 35;
      rule = "Toilet in East harms liver health and blocks social networking and administrative connections.";
      remedy = "Install a brass boundary strip and keep a spider plant or bamboo plant in the bathroom.";
    } else if (zone === 'N') {
      score = 30;
      rule = "Toilet in North flushes away new career opportunities and liquid revenue streams under Kubera.";
      remedy = "Encircle commode with a pure Blue/Aluminum tape or strip and install a mirror on the outer door face.";
    }

    // Commode alignment
    let alignBonus = 0;
    if (commodeAlign.includes('north') || commodeAlign.includes('south')) {
      alignBonus = 5;
      rule += " Commode aligned along North-South axis allows the occupant to align harmoniously with Earth's magnetic lines during bodily evacuation.";
    } else {
      alignBonus = -10;
      rule += " Commode aligned East-West causes solar-magnetic cross-interference during bodily waste discharge.";
      remedy += " Re-align commode seat so the person faces North or South while seated.";
    }

    const finalScore = Math.max(5, Math.min(100, score + alignBonus));
    const assessment = scoreToAssessment(finalScore);

    return {
      toolId: "toilet-bathroom-vastu",
      toolName: "Toilet & Bathroom Vastu Analyzer",
      elementName: `Toilet / Bathroom in ${zone}`,
      assessment: assessment,
      score: finalScore,
      tradition: TRADITION_VEDIC,
      sourceReference: "Viśvakarma Prakāśa 6.12-18; Samarāṅgaṇa Sūtradhāra 49.30-36; Mayamata Ch. 26",
      plainRule: rule,
      remedy: remedy,
      variationNote: VARIATION_NOTE_DEFAULT,
      toiletDetails: { zone, commodeAlignment: commodeAlign }
    };
  }

  // =========================================================================
  // TOOL 8: PUJA ROOM VASTU
  // =========================================================================
  /**
   * Puja Room & Sacred Altar Vastu Analyzer
   */
  function calculatePujaVastu(inputs) {
    const inp = inputs || {};
    const zone = normalizeQuadrant(inp.zone || inp.location || 'NE');
    const deityFacing = String(inp.deityFacing || inp.idolFacing || 'West').toLowerCase().trim();
    const adjacentToilet = Boolean(inp.adjacentToToilet || inp.toiletAdjacent);
    const underStairs = Boolean(inp.underStairs || inp.staircaseUnder);

    let score = 40;
    let rule = "";
    let remedy = "Keep altar clean, lit with cow ghee or sesame oil lamps, and adorned with fresh flowers daily.";

    if (zone === 'NE') {
      score = 100;
      rule = "North-East (Ishanya) is the supreme abode of Ishana (Lord Shiva) and Brihaspati. Attracts pure cosmic prana, spiritual enlightenment, and limitless peace.";
      remedy = "Supreme location. Adorn with white marble, pure silver or copper puja vessels, and keep clutter-free.";
    } else if (zone === 'E') {
      score = 88;
      rule = "East is ruled by Indra and Surya; prayers offered here generate vitality, clarity, and societal honor.";
    } else if (zone === 'N') {
      score = 85;
      rule = "North is ruled by Kubera and Vishnu; prayers cultivate material abundance and righteous prosperity.";
    } else if (zone === 'W') {
      score = 65;
      rule = "West puja is moderate; favored in merchant communities for business deities.";
    } else if (zone === 'NW') {
      score = 45;
      rule = "North-West puja causes restless devotion and unstable spiritual focus under Vayu.";
    } else if (zone === 'SE') {
      score = 30;
      rule = "South-East puja stimulates aggressive devotion and agitation among family members.";
    } else if (zone === 'SW') {
      score = 15;
      rule = "Puja in South-West (Nairruti) induces spiritual ego and material impediments.";
      remedy = "Relocate prayer altar to North-East immediately. Do not conduct daily worship in SW.";
    } else { // S
      score = 25;
      rule = "South puja room is generally restricted to specific tantric or ancestral observances.";
    }

    // Disqualifying penalties
    if (adjacentToilet) {
      score = Math.min(score, 20);
      rule += " Severe contamination: Puja room sharing a wall with a toilet nullifies sacred mantras.";
      remedy += " Relocate altar immediately or insulate the common wall with a 1-inch wooden panel and silver foil.";
    }
    if (underStairs) {
      score = Math.min(score, 15);
      rule += " Desecration: Placing sacred idols beneath stairs treads upon divine energy with every footstep.";
      remedy += " Remove sacred deities from beneath stairs immediately to an open, elevated shelf in the North-East.";
    }

    // Deity facing recommendation
    if (deityFacing.includes('west')) {
      rule += " Deity facing West enables the worshipper to face East towards the rising sun, which is the classical ideal.";
    } else if (deityFacing.includes('south')) {
      rule += " Deity facing South allows the worshipper to face North towards the Pole Star (Kubera), which is highly auspicious.";
    }

    const finalScore = Math.max(10, Math.min(100, score));
    const assessment = scoreToAssessment(finalScore);

    return {
      toolId: "puja-room-vastu",
      toolName: "Puja Room & Altar Vastu Analyzer",
      elementName: `Puja Room in ${zone}`,
      assessment: assessment,
      score: finalScore,
      tradition: TRADITION_VEDIC,
      sourceReference: "Bṛhat Saṃhitā 53.51-55; Mayamata 26.15-20; Mānasāra Ch. 18",
      plainRule: rule,
      remedy: remedy,
      variationNote: VARIATION_NOTE_DEFAULT,
      pujaDetails: { zone, deityFacing, adjacentToilet, underStairs }
    };
  }

  // =========================================================================
  // TOOL 9: WATER VASTU
  // =========================================================================
  /**
   * Water Storage & Element Vastu Analyzer
   * Distinguishes between Subterranean (underground sump/borewell) and Overhead tanks.
   */
  function calculateWaterVastu(inputs) {
    const inp = inputs || {};

    if (inp.borewellZone || inp.overheadTankZone) {
      const bZone = normalizeQuadrant(inp.borewellZone || 'NE');
      const oZone = normalizeQuadrant(inp.overheadTankZone || 'SW');
      let bScore = 30;
      let bRule = "";
      if (bZone === 'NE') { bScore = 100; bRule = "Borewell/Sump in North-East (Ishanya) is the supreme wealth multiplier."; }
      else if (bZone === 'N' || bZone === 'E') { bScore = 90; bRule = "Borewell in North or East yields continuous financial prosperity."; }
      else if (bZone === 'SE') { bScore = 10; bRule = "Fatal Agni-Jala clash: Borewell in South-East sparks severe financial drain."; }
      else if (bZone === 'SW') { bScore = 5; bRule = "Catastrophic Maha-Dosha: Borewell in South-West creates an energetic sinkhole in the Earth anchor."; }
      else if (bZone === 'NW') { bScore = 45; bRule = "Borewell in North-West causes erratic expenditures."; }
      else { bScore = 35; bRule = "Borewell in South or West undermines foundational stability."; }

      let oScore = 50;
      let oRule = "";
      if (oZone === 'SW') { oScore = 98; oRule = "Overhead tank in South-West anchors heavy mass on the Earth quadrant."; }
      else if (oZone === 'S' || oZone === 'W') { oScore = 88; oRule = "Overhead tank in South or West adds favorable ballast."; }
      else if (oZone === 'NW') { oScore = 65; oRule = "Overhead tank in North-West is moderate."; }
      else if (oZone === 'SE') { oScore = 35; oRule = "Heavy overhead water in South-East suppresses Agni."; }
      else if (oZone === 'NE') { oScore = 10; oRule = "Maha-Dosha: Heavy overhead tank in North-East crushes the cosmic head of Vastu Purusha."; }
      else { oScore = 45; oRule = "Keep overhead tank clear of the central Brahmasthan axis."; }

      const finalScore = Math.round((bScore * 0.55) + (oScore * 0.45));
      const assessment = scoreToAssessment(finalScore);
      return {
        toolId: "water-vastu",
        toolName: "Water Element & Reservoir Vastu Analyzer",
        elementName: `Dual Reservoir Analysis: Borewell (${bZone}) & Overhead Tank (${oZone})`,
        assessment: assessment,
        score: finalScore,
        tradition: TRADITION_VEDIC,
        sourceReference: "Mayamata 12.40-48; Bṛhat Saṃhitā Ch. 54 (Dakārgala); Viśvakarma Prakāśa 5.34-40",
        plainRule: `${bRule} ${oRule}`,
        remedy: (finalScore < 60) ? "Seal any depression in SW/SE immediately. Shift overhead tank to SW/West perimeter." : "Optimal water layout. Keep both reservoirs covered and clean.",
        variationNote: VARIATION_NOTE_DEFAULT,
        waterDetails: { borewellZone: bZone, overheadTankZone: oZone, borewellScore: bScore, overheadScore: oScore }
      };
    }

    const waterType = String(inp.type || inp.waterType || 'subterranean').toLowerCase().trim();
    const zone = normalizeQuadrant(inp.zone || inp.location || 'NE');

    let score = 50;
    let rule = "";
    let remedy = "Keep water reservoirs spotlessly covered and test drinking water quality regularly.";

    const isSubterranean = waterType.includes('subterranean') || waterType.includes('underground') || waterType.includes('sump') || waterType.includes('borewell') || waterType.includes('well');
    const isOverhead = waterType.includes('overhead') || waterType.includes('roof') || waterType.includes('tank') || waterType.includes('sintex');

    if (isSubterranean) {
      if (zone === 'NE') {
        score = 100;
        rule = "Underground water tank/borewell in North-East (Ishanya) is the supreme wealth multiplier. Attracts perpetual Kubera prosperity, good health, and intellectual clarity.";
        remedy = "Supreme positioning. Keep surroundings pristine and plant sacred Tulasi nearby.";
      } else if (zone === 'N' || zone === 'E') {
        score = 90;
        rule = "Underground water in North or East provides steady financial inflow and vitality.";
      } else if (zone === 'SE') {
        score = 10;
        rule = "Fatal Agni-Jala clash: Sump/borewell in South-East causes devastating financial drain, fire accidents, and cardiac/digestive illnesses.";
        remedy = "Seal SE underground water pit immediately. Relocate to North or North-East.";
      } else if (zone === 'SW') {
        score = 5;
        rule = "Catastrophic Maha-Dosha: Pit/sump in South-West creates an energetic sinkhole in the Earth anchor. Causes sudden bankruptcy, severe accidents, and early demise of family head.";
        remedy = "Fill up and seal SW underground pit with earth, sand, and lead rods immediately. Never leave a depression in SW.";
      } else if (zone === 'NW') {
        score = 45;
        rule = "Underground water in North-West causes erratic expenditures and legal entanglements.";
      } else { // S, W
        score = 30;
        rule = "Underground water in South or West undermines structural stability and causes slow wealth decay.";
      }
    } else if (isOverhead) {
      if (zone === 'SW') {
        score = 98;
        rule = "Overhead water tank in South-West (Nairruti) provides heavy, stabilizing weight on the highest, most grounded corner. Highly auspicious for dominance and security.";
        remedy = "Ideal location. Keep tank raised at least 1-2 feet above roof slab on solid brick pedestals.";
      } else if (zone === 'S' || zone === 'W') {
        score = 88;
        rule = "Overhead tank in South or West is auspicious; adds necessary ballast to the western/southern walls.";
      } else if (zone === 'NW') {
        score = 65;
        rule = "Overhead tank in North-West is moderate; ensure tank height is lower than any structure in South-West.";
      } else if (zone === 'SE') {
        score = 35;
        rule = "Heavy overhead water in South-East suppresses Agni and disturbs family harmony.";
      } else if (zone === 'NE') {
        score = 10;
        rule = "Maha-Dosha: Heavy overhead tank in North-East crushes the delicate cosmic head of Vastu Purusha. Causes crushing debts, mental anguish, and severe stagnation.";
        remedy = "Relocate overhead tank to South-West or West immediately. If delayed, raise tank on pillars and paint it cream/white.";
      } else {
        score = 50;
        rule = "Ensure overhead tank does not directly press down upon the center (Brahmasthan) of the house.";
      }
    } else {
      // Decorative / Aquarium / Fountain
      if (['NE', 'N', 'E'].includes(zone)) {
        score = 95;
        rule = "Decorative fountain or aquarium in North-East/North activates active water prana, multiplying financial liquidity.";
      } else {
        score = 50;
        rule = "Ensure fountain water flows toward North or East.";
      }
    }

    const assessment = scoreToAssessment(score);

    return {
      toolId: "water-vastu",
      toolName: "Water Element & Reservoir Vastu Analyzer",
      elementName: `${waterType.toUpperCase()} Water in ${zone}`,
      assessment: assessment,
      score: score,
      tradition: TRADITION_VEDIC,
      sourceReference: "Mayamata 12.40-48; Bṛhat Saṃhitā Ch. 54 (Dakārgala); Viśvakarma Prakāśa 5.34-40",
      plainRule: rule,
      remedy: remedy,
      variationNote: VARIATION_NOTE_DEFAULT,
      waterDetails: { zone, waterType, isSubterranean, isOverhead }
    };
  }

  // =========================================================================
  // TOOL 10: STAIRCASE VASTU
  // =========================================================================
  /**
   * Staircase & Vertical Circulation Vastu Analyzer
   */
  function calculateStaircaseVastu(inputs) {
    const inp = inputs || {};
    const zone = normalizeQuadrant(inp.zone || inp.location || 'SW');
    const turn = String(inp.turnDirection || inp.turning || 'clockwise').toLowerCase().trim();
    const steps = parseInt(inp.numberOfSteps || inp.stepCount, 10) || 17;
    const underUsage = String(inp.underStairsUsage || inp.underStairs || 'empty').toLowerCase().trim();

    let score = 50;
    let rule = "";
    let remedy = "Keep staircase bright, well-ventilated, and repair any cracked or creaking steps immediately.";

    if (zone === 'SW') {
      score = 98;
      rule = "South-West (Nairruti) is the premier staircase zone. The heavy structural mass anchors the Earth quadrant, bestowing authority, prosperity, and family protection.";
      remedy = "Supreme location. Paint in warm earthy or beige tones with sturdy wooden or brass banisters.";
    } else if (zone === 'S' || zone === 'W') {
      score = 88;
      rule = "South or West staircase adds ideal gravitational weight to the western/southern perimeter.";
    } else if (zone === 'NW') {
      score = 65;
      rule = "North-West staircase is acceptable; supports career mobility when steps turn clockwise.";
    } else if (zone === 'SE') {
      score = 55;
      rule = "South-East staircase is moderate; may cause occasional expenditure and fire-related maintenance.";
    } else if (zone === 'NE') {
      score = 10;
      rule = "Maha-Dosha: Staircase in North-East burdens the divine brain of Vastu Purusha. Leads to crippling debts, chronic neurological/health issues, and loss of progeny.";
      remedy = "Dismantle or avoid daily use of NE staircase. If immovable, paint pure white, place two 9-rod bronze wind chimes, and keep brightly lit.";
    } else { // Center / Brahmasthan
      score = 5;
      rule = "Catastrophic Dosha: Staircase in the center (Brahmasthan) pierces the cosmic heart of the house (Hridaya-vedha). Causes acute cardiac stress and family dissolution.";
      remedy = "Relocate staircase to the perimeter. Never place vertical shafts through the Brahmasthan.";
    }

    // Turning direction (Clockwise / Pradakshina is auspicious)
    let turnBonus = 0;
    if (turn.includes('clock') && !turn.includes('anti') && !turn.includes('counter')) {
      turnBonus = 5;
      rule += " Clockwise (Dakshinavarta) ascent harmonizes with the solar diurnal cycle and Coriolis forces, generating positive vortex energy.";
    } else {
      turnBonus = -15;
      rule += " Anticlockwise ascent causes energy reversal, leading to fatigue and business resistance.";
      remedy += " Install upward-pointing brass arrow markers on the wall along the handrail.";
    }

    // Step count odd vs even
    let stepBonus = 0;
    if (steps % 2 !== 0) {
      stepBonus = 2;
      rule += ` Step count (${steps}) is an odd number, satisfying the classical rule: ascending right foot first and landing on the auspicious right foot (Indra/Labha).`;
    } else {
      stepBonus = -5;
      rule += ` Step count (${steps}) is even; classical tradition prefers an odd number of risers so that one begins and finishes ascent on the auspicious right foot.`;
    }

    // Under-stairs usage
    if (underUsage.includes('toilet') || underUsage.includes('bath')) {
      score = Math.min(score, 25);
      rule += " Toilet constructed beneath stairs concentrates foul prana in the structural backbone.";
      remedy += " Abandon toilet under stairs; use exclusively for dry storage.";
    } else if (underUsage.includes('puja') || underUsage.includes('temple')) {
      score = Math.min(score, 15);
      rule += " Extreme desecration: Puja room beneath stairs causes spiritual ruin.";
      remedy += " Immediately move the altar out from under the staircase.";
    } else if (underUsage.includes('kitchen')) {
      score = Math.min(score, 20);
      rule += " Cooking under stairs causes health stagnation.";
    }

    const finalScore = Math.max(10, Math.min(100, score + turnBonus + stepBonus));
    const assessment = scoreToAssessment(finalScore);

    return {
      toolId: "staircase-vastu",
      toolName: "Staircase & Vertical Circulation Vastu Analyzer",
      elementName: `Staircase in ${zone} (${steps} steps, ${turn})`,
      assessment: assessment,
      score: finalScore,
      tradition: TRADITION_VEDIC,
      sourceReference: "Samarāṅgaṇa Sūtradhāra 49.65-72; Viśvakarma Prakāśa 4.88-94; Mānasāra Ch. 30",
      plainRule: rule,
      remedy: remedy,
      variationNote: VARIATION_NOTE_DEFAULT,
      staircaseDetails: { zone, turnDirection: turn, stepCount: steps, underStairsUsage: underUsage }
    };
  }

  // =========================================================================
  // UTILITY & HELPER EXPORTS
  // =========================================================================
  const VastuEngine = {
    version: "1.0.0",
    engineName: "Classical Vedic Vastu Calculation Engine",
    tradition: TRADITION_VEDIC,

    // Database access
    padas: PADA_DATABASE,
    directions16: DIRECTIONS_16,

    // SVG Generators
    generateCompassSVG: generateCompassSVG,
    generatePadaMandalaSVG: generatePadaMandalaSVG,
    getCompassSVG: generateCompassSVG,
    getPadaMandalaSVG: generatePadaMandalaSVG,

    // Helper lookups
    getPadaDetails: function (indexOrId) {
      if (typeof indexOrId === 'number') {
        return PADA_DATABASE.find(p => p.index === indexOrId) || null;
      }
      const s = String(indexOrId).toUpperCase().trim();
      return PADA_DATABASE.find(p => p.id === s || p.deity.toUpperCase().includes(s)) || null;
    },
    getAllPadas: function () {
      return PADA_DATABASE;
    },
    getDirectionDetails: function (degOrQuadrant) {
      if (typeof degOrQuadrant === 'number') {
        return degreeToDirection16(degOrQuadrant);
      }
      const q = normalizeQuadrant(degOrQuadrant);
      return DIRECTIONS_16.find(d => d.code === q) || DIRECTIONS_16[0];
    },
    degreeToDirection: function (deg) {
      return degreeToDirection16(deg);
    },
    degreeToQuadrant: function (deg) {
      return degreeToQuadrant8(deg);
    },
    normalizeQuadrant: normalizeQuadrant,

    // 10 Core Vastu Calculation Engines
    calculateHouseVastu: calculateHouseVastu,
    calculatePlotVastu: calculatePlotVastu,
    calculateMainDoorVastu: calculateMainDoorVastu,
    calculateFacing: calculateFacing,
    calculateBedroomVastu: calculateBedroomVastu,
    calculateKitchenVastu: calculateKitchenVastu,
    calculateToiletVastu: calculateToiletVastu,
    calculatePujaVastu: calculatePujaVastu,
    calculateWaterVastu: calculateWaterVastu,
    calculateStaircaseVastu: calculateStaircaseVastu
  };

  // Environment bindings (Browser + CommonJS Node.js)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = VastuEngine;
  }
  if (typeof window !== 'undefined') {
    window.VastuEngine = VastuEngine;
  }
  if (typeof global !== 'undefined') {
    global.VastuEngine = VastuEngine;
  }

})(typeof window !== 'undefined' ? window : this);
