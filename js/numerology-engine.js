/**
 * Numerology Calculation Engine (Modular Vanilla JavaScript)
 * D:\builds\js\numerology-engine.js
 * 
 * Provides interactive, mathematically precise calculation engines for 10 Numerology tools:
 *  1. name-number (Chaldean)
 *  2. name-analysis (Chaldean)
 *  3. mobile-number (Modern Practitioner)
 *  4. lucky-number (Pythagorean)
 *  5. life-path (Pythagorean)
 *  6. birth-number (Pythagorean)
 *  7. destiny-number (Pythagorean)
 *  8. business-name (Modern Practitioner)
 *  9. vehicle-number (Modern Practitioner)
 * 10. name-dob-compatibility (Modern Practitioner)
 * 
 * Complies with strict separation between Chaldean (1-8) and Pythagorean (1-9) tables,
 * Master Number preservation (11, 22, 33), and standardized result object schema.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.NumerologyEngine = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // =========================================================================
  // 1. CONSTANTS & SYSTEM DEFINITIONS
  // =========================================================================

  const SYSTEMS = {
    CHALDEAN: "Chaldean Numerological Tradition (Cheiro)",
    PYTHAGOREAN: "Pythagorean / Western Tradition (Dr. David Phillips)",
    MODERN: "Modern Practitioner Methodology"
  };

  const STANDARD_DISCLAIMER = "This is a traditional esoteric belief system, not an empirical or scientific claim.";

  /**
   * STRICT CHALDEAN TABLE (1-8 ONLY - Number 9 is sacred and excluded from alphabet)
   * 1: A, I, J, Q, Y
   * 2: B, K, R
   * 3: C, G, L, S
   * 4: D, M, T
   * 5: E, H, N, X
   * 6: U, V, W
   * 7: O, Z
   * 8: F, P
   */
  const CHALDEAN_MAP = Object.freeze({
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 7, P: 8, Q: 1, R: 2,
    S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
  });

  /**
   * STRICT PYTHAGOREAN TABLE (1-9 Sequential)
   * 1: A, J, S
   * 2: B, K, T
   * 3: C, L, U
   * 4: D, M, V
   * 5: E, N, W
   * 6: F, O, X
   * 7: G, P, Y
   * 8: H, Q, Z
   * 9: I, R
   */
  const PYTHAGOREAN_MAP = Object.freeze({
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
  });

  const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

  /**
   * Master Numbers preserved under Pythagorean calculations
   */
  const MASTER_NUMBERS = Object.freeze([11, 22, 33]);

  /**
   * Planetary Rulers and Astrological Correspondences
   */
  const PLANET_LORDS = Object.freeze({
    1: "Sun (Surya) — Vitality, Leadership, Authority, Individual Will",
    2: "Moon (Chandra) — Intuition, Sensitivity, Diplomacy, Receptivity",
    3: "Jupiter (Guru) — Expansion, Wisdom, Expression, Optimism, Creative Intellect",
    4: "Rahu / Uranus — Structure, Pragmatism, Originality, Sudden Evolution",
    5: "Mercury (Budha) — Intellect, Adaptability, Communication, Commercial Agility",
    6: "Venus (Shukra) — Harmony, Beauty, Love, Domestic Responsibility, Aesthetics",
    7: "Ketu / Neptune — Spirituality, Analytical Depth, Introspection, Mysticism",
    8: "Saturn (Shani) — Material Mastery, Authority, Karma, Perseverance, Justice",
    9: "Mars (Mangala) — Universal Humanitarianism, Courage, Dynamism, Elevated Passion",
    11: "Master Number 11 (Higher Octave of 2 / Neptune-Moon) — The Spiritual Illuminator & Visionary",
    22: "Master Number 22 (Higher Octave of 4 / Uranus-Earth) — The Master Builder & Systems Architect",
    33: "Master Number 33 (Higher Octave of 6 / Venus-Jupiter) — The Master Teacher & Cosmic Healer"
  });

  /**
   * Cheiro's Classical Interpretations of Compound Numbers (10 to 52 + Master Archetypes)
   */
  const CHEIRO_COMPOUND_MEANINGS = Object.freeze({
    10: "The Wheel of Fortune — Symbolizes honor, faith, self-confidence, and ultimate success. Projects undertaken under this vibration rise to prominence.",
    11: "A Clenched Hand / The Muzzled Lion — High intuitive perception paired with emotional sensitivity; tests of courage and spiritual discernment.",
    12: "The Sacrifice / Inner Elevation — Inner wisdom acquired through patience, yielding personal ego for higher spiritual and philosophical clarity.",
    13: "Regeneration & Transformation — Power through dynamic change, upheaval, and reinvention; overcoming outdated structures to birth new forms.",
    14: "Movement & Challenge — Adaptability in commerce, travel, and exchanges of ideas; requires temperance and disciplined risk management.",
    15: "The Magician & Charmer — Exceptional personal magnetism, creative eloquence, artistic charisma, and material favor; brings persuasive influence.",
    16: "The Shattered Citadel / Awakening — Sudden awakenings that strip away illusions; spiritual growth through radical humility and ethical foundations.",
    17: "The Star of the Magi — Immortality, hope, peace, and enduring legacy; promises triumph over obstacles and lasting public respect.",
    18: "Spiritual Conflict & Discernment — Internal versus external tensions; calls for discernment against deceptive influences and reliance on quiet integrity.",
    19: "The Prince of Heaven — One of the most fortunate vibrations in existence: victory, vitality, expansive honor, happiness, and high worldly standing.",
    20: "The Awakening / The Call — A spiritual summons to renewal, higher purpose, karmic accountability, and constructive transformation.",
    21: "The Crown of the Magi — Complete achievement, long-term mastery, elevation in worldly affairs, and ultimate reward after persistent endeavor.",
    22: "The Master Builder / Vigilant Discernment — Colossal architectural and organizational potential; demands absolute grounding to prevent speculative ruin.",
    23: "The Royal Star of the Lion — Highly auspicious: divine protection, authority, triumph in practical ventures, and magnetic favor from superiors.",
    24: "Love & Association — Steady assistance from benefactors, harmonious partnerships, emotional fulfillment, and creative accomplishment.",
    25: "Discernment through Trial — Intellectual and analytical victory achieved through observation, rigorous study, and spiritual fortitude.",
    26: "Partnership Power & Prudence — Material authority and executive drive; cautions against reckless speculation or unvetted commercial alliances.",
    27: "The Scepter / Command — Clear intellectual command, leadership authority, literary or oratory prominence, and karmic reward for effort.",
    28: "The Trusting Spirit — High creative potential; counsels vigilance in legal and contractual agreements, urging self-reliant initiative.",
    29: "Grace Under Pressure — Deep spiritual intuition and empathy; builds unshakeable resilience through overcoming emotional and social challenges.",
    30: "The Luminous Mind — Intellectual superiority, philosophical depth, sparkling wit, and expansive artistic and social self-expression.",
    31: "The Solitary Thinker — Intellectual independence, self-reliant wisdom, unconventional viewpoints, and quiet philosophical depth.",
    32: "The Gateway of Nations — International connections, diplomatic prowess, versatile communication, and widespread public influence.",
    33: "The Master Teacher / Shield — Highly magnetic, protective aura, dedicated service to humanity, profound blessing and unconditional devotion.",
    34: "Practical Wisdom — Methodical progress, stability built on integrity, domestic security, and the steady accumulation of honor.",
    35: "Harmonious Ventures — Fluctuating early circumstances steadying into creative and commercial satisfaction through adaptable enterprise.",
    36: "The Cosmic Craftsman — Artistic excellence, sustained ambition, and authority earned through dedicated craftsmanship and perseverance.",
    37: "The Sovereign Key — Fortunate partnerships, public goodwill, magnetic fortune, and prosperous alliances in business and romance.",
    38: "The Intuitive Counselor — Diplomatic finesse, gentle persuasion, literary gifts, and intuitive counseling that unites opposing parties.",
    39: "The Healing Light — Humanitarian eloquence, broad social vision, and triumph over early adversity through compassionate leadership.",
    40: "The Foundation Pillar — Steadfast perseverance, institutional authority, deliberate execution, and durable foundational achievements.",
    41: "The Enterprise Star — Dynamic commercial expansion, innovative leadership, swift manifestation, and fortunate industrial enterprise.",
    42: "The Sacred Guardian — Caring leadership, artistic and domestic prosperity, community stewardship, and reliable protective influence.",
    43: "The Phoenix Awakening — Dynamic transformation, unconventional thinking, and the resilience to rise far stronger from setbacks.",
    44: "The Master Architect — Industrial-scale manifestation, colossal discipline, enduring infrastructure, and legacy-building authority.",
    45: "The Vanguard of Light — Public magnetism, intellectual breakthrough, widespread progressive impact, and philanthropic generosity.",
    46: "The Golden Harvest — Harmonious wealth, joyful alliances, gracious living, artistic success, and social popularity.",
    47: "The Mystic Sage — Esoteric contemplation, scientific breakthroughs, deep philosophical honor, and profound inner enlightenment.",
    48: "The Resolute Commander — Executive mastery, administrative discipline, steadfast triumph over challenges, and corporate leadership.",
    49: "The Universal Horizon — Spiritual culmination, humanitarian elevation, broad global horizon, and transcendent philosophical vision.",
    50: "The Sovereign Explorer — Freedom, intellectual eloquence, revolutionary ideas, commercial versatility, and communicative brilliance.",
    51: "The Warrior's Triumph — High courage, military or legal victory, invincible determination, and sudden breakthrough advancement.",
    52: "The Sovereign Council — Accumulated wisdom, strategic advisory prowess, enduring community respect, and mature executive judgment."
  });

  /**
   * Harmonic Compatibility Matrix (Planetary Friends, Neutrals, Enemies)
   */
  const HARMONY_MATRIX = Object.freeze({
    1: { friends: [1, 2, 3, 5, 9], neutral: [4, 7], enemy: [6, 8] },
    2: { friends: [1, 2, 3, 5], neutral: [7, 9], enemy: [4, 6, 8] },
    3: { friends: [1, 2, 3, 9], neutral: [5, 7], enemy: [4, 6, 8] },
    4: { friends: [1, 5, 6, 7], neutral: [8], enemy: [2, 4, 9] },
    5: { friends: [1, 2, 3, 5, 6], neutral: [7, 8, 9], enemy: [] },
    6: { friends: [4, 5, 6, 7, 8], neutral: [1, 9], enemy: [3] },
    7: { friends: [1, 4, 5, 6], neutral: [2, 8], enemy: [9] },
    8: { friends: [3, 5, 6, 7], neutral: [4], enemy: [1, 2, 8, 9] },
    9: { friends: [1, 2, 3, 5], neutral: [6, 7], enemy: [4, 8, 9] }
  });

  // =========================================================================
  // 2. CORE MATHEMATICAL & REDUCTION HELPERS
  // =========================================================================

  /**
   * Sums digits of an integer.
   * @param {number} n
   * @returns {number}
   */
  function sumDigits(n) {
    let sum = 0;
    let temp = Math.abs(Math.floor(n));
    while (temp > 0) {
      sum += temp % 10;
      temp = Math.floor(temp / 10);
    }
    return sum;
  }

  /**
   * Reduces an integer down to a single digit (1-9), with optional Master Number preservation (11, 22, 33).
   * @param {number} n
   * @param {boolean} preserveMaster
   * @returns {{ root: number, steps: number[] }}
   */
  function reduceNumber(n, preserveMaster = false) {
    if (n <= 0) return { root: 0, steps: [0] };
    const steps = [n];
    let curr = n;

    while (curr > 9) {
      if (preserveMaster && (curr === 11 || curr === 22 || curr === 33)) {
        break;
      }
      curr = sumDigits(curr);
      steps.push(curr);
    }

    return { root: curr, steps };
  }

  /**
   * Gets the Chaldean single letter value (1-8). Non-letters return 0.
   * @param {string} ch
   * @returns {number}
   */
  function getChaldeanValue(ch) {
    if (!ch) return 0;
    const upper = ch.toUpperCase();
    return CHALDEAN_MAP[upper] || 0;
  }

  /**
   * Gets the Pythagorean single letter value (1-9). Non-letters return 0.
   * @param {string} ch
   * @returns {number}
   */
  function getPythagoreanValue(ch) {
    if (!ch) return 0;
    const upper = ch.toUpperCase();
    return PYTHAGOREAN_MAP[upper] || 0;
  }

  /**
   * Retrieves planet lord description for a given root or master number.
   * @param {number} num
   * @returns {string}
   */
  function getPlanetLord(num) {
    return PLANET_LORDS[num] || PLANET_LORDS[reduceNumber(num).root] || "Universal Vibrational Source";
  }

  /**
   * Generates or retrieves compound meaning.
   * @param {number} compound
   * @param {number} root
   * @returns {string}
   */
  function getCompoundMeaning(compound, root) {
    if (CHEIRO_COMPOUND_MEANINGS[compound]) {
      return CHEIRO_COMPOUND_MEANINGS[compound];
    }
    const single = root || reduceNumber(compound).root;
    return `Compound Vibration ${compound} — Synthesizes the dual numerical influences of its digits into single root ${single}, governed by ${getPlanetLord(single)}. Represents progressive evolution through disciplined focus.`;
  }

  /**
   * Parses flexible date formats (YYYY-MM-DD, DD/MM/YYYY, MM/DD/YYYY, Date object)
   * @param {string|Date} dateInput
   * @returns {{ year: number, month: number, day: number, valid: boolean, formatted: string }}
   */
  function parseDate(dateInput) {
    if (!dateInput) return { year: 0, month: 0, day: 0, valid: false, formatted: "" };

    if (dateInput instanceof Date && !isNaN(dateInput.getTime())) {
      return {
        year: dateInput.getFullYear(),
        month: dateInput.getMonth() + 1,
        day: dateInput.getDate(),
        valid: true,
        formatted: `${dateInput.getFullYear()}-${String(dateInput.getMonth() + 1).padStart(2, '0')}-${String(dateInput.getDate()).padStart(2, '0')}`
      };
    }

    const str = String(dateInput).trim();
    // Match ISO YYYY-MM-DD
    let match = str.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
    if (match) {
      const y = parseInt(match[1], 10);
      const m = parseInt(match[2], 10);
      const d = parseInt(match[3], 10);
      return { year: y, month: m, day: d, valid: m >= 1 && m <= 12 && d >= 1 && d <= 31, formatted: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}` };
    }

    // Match DD-MM-YYYY or DD/MM/YYYY
    match = str.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
    if (match) {
      let p1 = parseInt(match[1], 10);
      let p2 = parseInt(match[2], 10);
      const y = parseInt(match[3], 10);
      // If p1 > 12, it must be day
      let d = p1;
      let m = p2;
      if (p2 > 12 && p1 <= 12) {
        m = p1;
        d = p2;
      }
      return { year: y, month: m, day: d, valid: m >= 1 && m <= 12 && d >= 1 && d <= 31, formatted: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}` };
    }

    // Native Date parse fallback
    const dObj = new Date(str);
    if (!isNaN(dObj.getTime())) {
      return {
        year: dObj.getFullYear(),
        month: dObj.getMonth() + 1,
        day: dObj.getDate(),
        valid: true,
        formatted: `${dObj.getFullYear()}-${String(dObj.getMonth() + 1).padStart(2, '0')}-${String(dObj.getDate()).padStart(2, '0')}`
      };
    }

    return { year: 0, month: 0, day: 0, valid: false, formatted: str };
  }

  // =========================================================================
  // 3. BREAKDOWN BUILDERS
  // =========================================================================

  /**
   * Generates real-time letter breakdown for Chaldean calculation.
   * @param {string} text
   * @returns {{ breakdown: Array, compound: number, words: Array }}
   */
  function buildChaldeanBreakdown(text) {
    const raw = String(text || '').trim();
    const words = raw.split(/\s+/).filter(Boolean);
    const breakdown = [];
    const wordList = [];
    let compound = 0;

    words.forEach((w, wIdx) => {
      let wordSum = 0;
      const wordLetters = [];
      for (let i = 0; i < w.length; i++) {
        const ch = w[i].toUpperCase();
        if (/[A-Z]/.test(ch)) {
          const val = CHALDEAN_MAP[ch] || 0;
          compound += val;
          wordSum += val;
          const isVowel = VOWELS.has(ch);
          const item = {
            char: w[i],
            letter: ch,
            value: val,
            system: 'Chaldean',
            isVowel: isVowel,
            wordIndex: wIdx
          };
          breakdown.push(item);
          wordLetters.push(item);
        }
      }
      wordList.push({
        word: w,
        wordSum: wordSum,
        letters: wordLetters
      });
    });

    return { breakdown, compound, words: wordList };
  }

  /**
   * Generates real-time letter breakdown for Pythagorean calculation.
   * @param {string} text
   * @returns {{ breakdown: Array, compound: number, words: Array }}
   */
  function buildPythagoreanBreakdown(text) {
    const raw = String(text || '').trim();
    const words = raw.split(/\s+/).filter(Boolean);
    const breakdown = [];
    const wordList = [];
    let compound = 0;

    words.forEach((w, wIdx) => {
      let wordSum = 0;
      const wordLetters = [];
      for (let i = 0; i < w.length; i++) {
        const ch = w[i].toUpperCase();
        if (/[A-Z]/.test(ch)) {
          const val = PYTHAGOREAN_MAP[ch] || 0;
          compound += val;
          wordSum += val;
          const isVowel = VOWELS.has(ch);
          const item = {
            char: w[i],
            letter: ch,
            value: val,
            system: 'Pythagorean',
            isVowel: isVowel,
            wordIndex: wIdx
          };
          breakdown.push(item);
          wordLetters.push(item);
        }
      }
      wordList.push({
        word: w,
        wordSum: wordSum,
        letters: wordLetters
      });
    });

    return { breakdown, compound, words: wordList };
  }

  // =========================================================================
  // 4. THE 10 NUMEROLOGY CALCULATION ENGINES
  // =========================================================================

  /**
   * 1. name-number (Chaldean)
   * Evaluates full name using ancient Chaldean sound vibrations (1-8 only).
   */
  function calculateNameNumber(name) {
    const { breakdown, compound } = buildChaldeanBreakdown(name);
    const { root } = reduceNumber(compound, false);
    const compoundDesc = getCompoundMeaning(compound, root);
    const planet = getPlanetLord(root);

    const assessment = `The name "${name}" vibrates to Chaldean Compound Number ${compound} and Single Root Number ${root}. ` +
      `Ruling Planet: ${planet}. ${compoundDesc} Under Cheiro's system, the single root governs the outward active energy, ` +
      `while compound ${compound} reveals the occult and karmic destiny influencing public stature and long-term endeavors.`;

    return {
      toolId: "name-number",
      toolName: "Chaldean Name Number Calculator",
      elementName: "Chaldean Name Vibration",
      assessment: assessment,
      system: SYSTEMS.CHALDEAN,
      sourceReference: "Cheiro's Book of Numbers (Count Louis Hamon), Part I, Chapters 1-13; 'The Numbers of Fate'",
      plainRule: "Letters are assigned ancient acoustic vibrational values from 1 to 8 (9 is omitted as sacred). The sum yields the compound karmic number, which reduces to the primary planetary root.",
      breakdown: breakdown,
      compoundNumber: compound,
      singleRoot: root,
      planetLord: planet,
      disclaimer: STANDARD_DISCLAIMER
    };
  }

  /**
   * 2. name-analysis (Chaldean)
   * In-depth Chaldean vibrational breakdown including Cornerstone, First Vowel,
   * Soul Urge (vowels), Outer Persona (consonants), and letter frequency analysis.
   */
  function calculateNameAnalysis(name) {
    const { breakdown, compound, words } = buildChaldeanBreakdown(name);
    const { root } = reduceNumber(compound, false);
    const planet = getPlanetLord(root);

    // Vowel & Consonant Breakdown
    let vowelSum = 0;
    let consonantSum = 0;
    const frequency = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };

    breakdown.forEach(item => {
      if (item.isVowel) {
        vowelSum += item.value;
      } else {
        consonantSum += item.value;
      }
      if (frequency[item.value] !== undefined) {
        frequency[item.value]++;
      }
    });

    const vowelRoot = reduceNumber(vowelSum, false).root;
    const consonantRoot = reduceNumber(consonantSum, false).root;

    // Cornerstone & Capstone
    const firstLetter = breakdown.length > 0 ? breakdown[0].letter : '';
    const lastLetter = breakdown.length > 0 ? breakdown[breakdown.length - 1].letter : '';
    const firstVowelItem = breakdown.find(b => b.isVowel);
    const firstVowel = firstVowelItem ? firstVowelItem.letter : '';

    // Missing numbers (Karmic lessons in Chaldean)
    const missingNumbers = Object.keys(frequency).filter(k => frequency[k] === 0).map(Number);

    const assessment = `Comprehensive Chaldean Analysis for "${name}": ` +
      `Overall Compound: ${compound} -> Root ${root} (${planet}). ` +
      `Heart Desire / Inner Vowel Vibration: Compound ${vowelSum} -> Root ${vowelRoot} (inner spiritual aspirations). ` +
      `Outer Persona / Consonant Vibration: Compound ${consonantSum} -> Root ${consonantRoot} (public projection and first impressions). ` +
      `Cornerstone Letter '${firstLetter}' (Val: ${CHALDEAN_MAP[firstLetter] || 0}) shapes instinctual approach to challenges. ` +
      `First Vowel '${firstVowel}' (Val: ${CHALDEAN_MAP[firstVowel] || 0}) reveals core emotional motivation. ` +
      `Missing Chaldean Frequencies: ${missingNumbers.length > 0 ? missingNumbers.join(', ') : 'None (Balanced)'}, ` +
      `representing karmic areas demanding deliberate cultivation.`;

    return {
      toolId: "name-analysis",
      toolName: "Chaldean Comprehensive Name & Vibrational Analysis",
      elementName: "Multi-Tiered Name Vibration Breakdown",
      assessment: assessment,
      system: SYSTEMS.CHALDEAN,
      sourceReference: "Cheiro's Book of Numbers, Part I, Ch. 11-15; Sepharial, 'The Kabala of Numbers'",
      plainRule: "Decomposes the acoustic structure of a name into its Cornerstone, Capstone, Inner Soul Urge (vowels), Outer Expression (consonants), and frequency distribution across the 1-8 spectrum.",
      breakdown: breakdown,
      compoundNumber: compound,
      singleRoot: root,
      planetLord: planet,
      disclaimer: STANDARD_DISCLAIMER,
      details: {
        words: words,
        vowelSum: vowelSum,
        vowelRoot: vowelRoot,
        consonantSum: consonantSum,
        consonantRoot: consonantRoot,
        cornerstone: firstLetter,
        capstone: lastLetter,
        firstVowel: firstVowel,
        frequencyDistribution: frequency,
        missingFrequencies: missingNumbers
      }
    };
  }

  /**
   * 3. mobile-number (Modern Practitioner)
   * Analyzes telecommunication numbers via cumulative summation, tail sequence resonance,
   * repeated pairs/triplets, and conversational suitability.
   */
  function calculateMobileNumber(phoneNumber) {
    const raw = String(phoneNumber || '').trim();
    // Keep all digits
    const digits = raw.replace(/\D/g, '');
    const breakdown = [];
    let compound = 0;

    for (let i = 0; i < digits.length; i++) {
      const d = parseInt(digits[i], 10);
      compound += d;
      breakdown.push({
        position: i + 1,
        digit: d,
        runningSum: compound
      });
    }

    const { root } = reduceNumber(compound, false);
    const planet = getPlanetLord(root);

    // Ending tail resonance (last 3 or 4 digits)
    const tailDigits = digits.slice(-4);
    const tailSum = tailDigits.split('').reduce((acc, c) => acc + parseInt(c, 10), 0);
    const tailRoot = reduceNumber(tailSum, false).root;

    // Pattern recognition
    const hasTriplets = /(.)\1\1/.test(digits);
    const hasPairs = /(.)\1/.test(digits);
    const zeroCount = (digits.match(/0/g) || []).length;

    let suitability = "";
    switch (root) {
      case 1: suitability = "Executive authority, independent enterprise, high-level leadership and command."; break;
      case 2: suitability = "Diplomacy, mediation, client relations, empathetic counseling and team cohesion."; break;
      case 3: suitability = "Media, public relations, creative expression, marketing, education, and social arts."; break;
      case 4: suitability = "Organizational logistics, structural planning, contracts, law, and technical precision."; break;
      case 5: suitability = "Sales, commerce, swift trading, journalism, travel mobility, and fast networking."; break;
      case 6: suitability = "Luxury lifestyle, hospitality, family counseling, healthcare, and aesthetic services."; break;
      case 7: suitability = "R&D, investigative research, specialized IT consulting, analytics, and spiritual study."; break;
      case 8: suitability = "High finance, commercial acquisitions, institutional management, and executive wealth."; break;
      case 9: suitability = "Non-profit activism, universal outreach, legal advocacy, international relations, and healing."; break;
      default: suitability = "General telecommunication and universal networking.";
    }

    const assessment = `Mobile Number ${raw} (Analyzed Digits: ${digits.length}) totals to Compound ${compound} with Single Root ${root} (${planet}). ` +
      `Tail Vibration (ending ${tailDigits}): Compound ${tailSum} -> Root ${tailRoot}. ` +
      `Pattern Profile: ${hasTriplets ? 'Contains powerful triple-digit reinforcement; ' : ''}${hasPairs ? 'Contains repeated pairs; ' : ''}` +
      `${zeroCount > 0 ? zeroCount + ' stabilizing zero pauses; ' : 'direct continuous flow. '}` +
      `Commercial Resonance: Best aligned with ${suitability}`;

    return {
      toolId: "mobile-number",
      toolName: "Mobile Phone Number Numerology Analyzer",
      elementName: "Telecommunication Vibrational Profile",
      assessment: assessment,
      system: SYSTEMS.MODERN,
      sourceReference: "Modern Practitioner Phonetic Frequency & Telecommunication Resonance Methodology",
      plainRule: "Sums all digits in the telephone sequence to determine the cumulative energetic root, while analyzing tail-digit resonance and repetitive patterns that influence conversational tone and incoming call frequencies.",
      breakdown: breakdown,
      compoundNumber: compound,
      singleRoot: root,
      planetLord: planet,
      disclaimer: STANDARD_DISCLAIMER,
      details: {
        digitCount: digits.length,
        tailDigits: tailDigits,
        tailSum: tailSum,
        tailRoot: tailRoot,
        zeroCount: zeroCount,
        suitability: suitability
      }
    };
  }

  /**
   * 4. lucky-number (Pythagorean)
   * Computes primary lucky vibration, harmonic triads (Thought, Action, Spiritual),
   * auspicious days, and compatible alliances under Pythagorean philosophy.
   */
  function calculateLuckyNumber(dob, optionalName = '') {
    const parsed = parseDate(dob);
    let primaryDayRoot = 1;
    let lifePathRoot = 1;
    const breakdown = [];

    if (parsed.valid) {
      primaryDayRoot = reduceNumber(parsed.day, false).root;
      breakdown.push({ factor: "Birth Day", raw: parsed.day, root: primaryDayRoot });

      const monthRoot = reduceNumber(parsed.month, false).root;
      breakdown.push({ factor: "Birth Month", raw: parsed.month, root: monthRoot });

      const yearRoot = reduceNumber(parsed.year, false).root;
      breakdown.push({ factor: "Birth Year", raw: parsed.year, root: yearRoot });

      const lpTotal = primaryDayRoot + monthRoot + yearRoot;
      lifePathRoot = reduceNumber(lpTotal, false).root;
      breakdown.push({ factor: "Life Path Synthesis", raw: lpTotal, root: lifePathRoot });
    } else {
      // If no valid DOB, use name Pythagorean compound
      const pBreak = buildPythagoreanBreakdown(optionalName || 'Lucky');
      primaryDayRoot = reduceNumber(pBreak.compound, false).root;
      lifePathRoot = primaryDayRoot;
      breakdown.push({ factor: "Name Pythagorean Root", raw: pBreak.compound, root: primaryDayRoot });
    }

    const planet = getPlanetLord(primaryDayRoot);

    // Pythagorean Triads of Resonance:
    // 1-5-7: Thought / Mental Triad
    // 2-4-8: Action / Manifestation / Physical Triad
    // 3-6-9: Creation / Spirit / Communication Triad
    let triadName = "";
    let triadNumbers = [];
    if ([1, 5, 7].includes(primaryDayRoot)) {
      triadName = "Mental / Thought Triad (1 - 5 - 7)";
      triadNumbers = [1, 5, 7];
    } else if ([2, 4, 8].includes(primaryDayRoot)) {
      triadName = "Physical / Manifestation Triad (2 - 4 - 8)";
      triadNumbers = [2, 4, 8];
    } else {
      triadName = "Spiritual / Creative Triad (3 - 6 - 9)";
      triadNumbers = [3, 6, 9];
    }

    // Friendly, Neutral, Challenge numbers
    const harmony = HARMONY_MATRIX[primaryDayRoot] || { friends: [primaryDayRoot], neutral: [], enemy: [] };
    const auspiciousCalendarDays = [primaryDayRoot, primaryDayRoot + 9, primaryDayRoot + 18, primaryDayRoot + 27].filter(d => d <= 31);

    const assessment = `Primary Lucky Root Number: ${primaryDayRoot} (${planet}). ` +
      `Pythagorean Harmonic Affiliation: Belongs to the ${triadName}. ` +
      `Harmonic Friends / Resonant Allies: ${harmony.friends.join(', ')}. ` +
      `Neutral Vibrations: ${harmony.neutral.length ? harmony.neutral.join(', ') : 'None'}. ` +
      `Challenging Polarity: ${harmony.enemy.length ? harmony.enemy.join(', ') : 'None'}. ` +
      `Peak Auspicious Calendar Days of Any Month: ${auspiciousCalendarDays.join('th, ')}th. ` +
      `Using these resonant frequencies for major decisions, launch dates, and important transactions promotes harmony.`;

    return {
      toolId: "lucky-number",
      toolName: "Pythagorean Lucky Numbers & Resonance Matrix",
      elementName: "Lucky Number Harmonic Spectrum",
      assessment: assessment,
      system: SYSTEMS.PYTHAGOREAN,
      sourceReference: "The Complete Book of Numerology by Dr. David A. Phillips, Chapters 3 & 4",
      plainRule: "Identifies primary resonant frequencies from the birth chart, grouping numbers into the classical Pythagorean Mental (1-5-7), Physical (2-4-8), and Spiritual (3-6-9) triads to uncover peak auspicious calendar days.",
      breakdown: breakdown,
      compoundNumber: primaryDayRoot + (harmony.friends[1] || 0),
      singleRoot: primaryDayRoot,
      planetLord: planet,
      disclaimer: STANDARD_DISCLAIMER,
      details: {
        primaryRoot: primaryDayRoot,
        lifePathRoot: lifePathRoot,
        triadName: triadName,
        triadNumbers: triadNumbers,
        friendlyNumbers: harmony.friends,
        neutralNumbers: harmony.neutral,
        challengeNumbers: harmony.enemy,
        auspiciousDays: auspiciousCalendarDays
      }
    };
  }

  /**
   * 5. life-path (Pythagorean)
   * The fundamental Pythagorean Ruling Number / Life Path.
   * STRICTLY PRESERVES MASTER NUMBERS: 11, 22, 33.
   */
  function calculateLifePath(dob) {
    const parsed = parseDate(dob);
    if (!parsed.valid) {
      throw new Error(`Invalid birth date format for Life Path: "${dob}". Expected format YYYY-MM-DD or DD/MM/YYYY.`);
    }

    // Step 1: Reduce Month, Day, Year individually
    const monthRed = reduceNumber(parsed.month, true);
    const dayRed = reduceNumber(parsed.day, true);
    const yearRed = reduceNumber(parsed.year, true);

    const breakdown = [
      { component: "Month", raw: parsed.month, steps: monthRed.steps, reduced: monthRed.root },
      { component: "Day", raw: parsed.day, steps: dayRed.steps, reduced: dayRed.root },
      { component: "Year", raw: parsed.year, steps: yearRed.steps, reduced: yearRed.root }
    ];

    // Method: Sum of reduced components
    const compoundSum = monthRed.root + dayRed.root + yearRed.root;
    const finalRed = reduceNumber(compoundSum, true);

    // Continuous sum cross-check
    const allDigitsSum = String(parsed.year) + String(parsed.month).padStart(2, '0') + String(parsed.day).padStart(2, '0');
    let totalContinuous = 0;
    for (let c of allDigitsSum) totalContinuous += parseInt(c, 10);
    const continuousRed = reduceNumber(totalContinuous, true);

    let rulingNumber = finalRed.root;
    if (finalRed.root === 11 || finalRed.root === 22 || finalRed.root === 33) {
      rulingNumber = finalRed.root;
    } else if (continuousRed.root === 11 || continuousRed.root === 22 || continuousRed.root === 33) {
      rulingNumber = continuousRed.root;
    }

    const isMaster = (rulingNumber === 11 || rulingNumber === 22 || rulingNumber === 33);
    const planet = getPlanetLord(rulingNumber);

    let archetype = "";
    switch (rulingNumber) {
      case 1: archetype = "The Pioneer & Independent Leader — Autonomy, originality, decisive ambition, initiating new pathways."; break;
      case 2: archetype = "The Diplomat & Peacemaker — Harmony, emotional sensitivity, supportive cooperation, acute intuition."; break;
      case 3: archetype = "The Creative Expresser — Communication, artistic brilliance, optimism, verbal mastery, inspiring joy."; break;
      case 4: archetype = "The Master Builder & Stabilizer — Methodical organization, grounded endurance, pragmatism, steadfast integrity."; break;
      case 5: archetype = "The Freedom Catalyst & Adventurer — Adaptability, sensual freedom, curiosity, progressive thought, versatile resilience."; break;
      case 6: archetype = "The Nurturing Guardian — Domestic responsibility, compassionate counseling, artistic harmony, protective devotion."; break;
      case 7: archetype = "The Spiritual Seeker & Analyst — Intellectual depth, contemplative solitude, scientific probing, metaphysical intuition."; break;
      case 8: archetype = "The Material Achiever & Karmic Sovereign — Executive power, financial stewardship, organizational scale, profound perseverance."; break;
      case 9: archetype = "The Universal Humanitarian — Transcendent compassion, selfless service, artistic culmination, broad global awareness."; break;
      case 11: archetype = "Master Number 11: The Spiritual Illuminator — Heightened sixth sense, visionary inspiration, channeling cosmic insight into practical awakening."; break;
      case 22: archetype = "Master Number 22: The Master Architect — Translating grand spiritual and philosophical ideals into concrete global infrastructure."; break;
      case 33: archetype = "Master Number 33: The Master Teacher — Transcendent unconditional compassion, cosmic healing, uplifting community consciousness."; break;
      default: archetype = "Evolutionary Life Path Journey.";
    }

    const assessment = `Pythagorean Life Path (Ruling Number): ${rulingNumber}${isMaster ? ' (MASTER NUMBER)' : ''}. ` +
      `Calculated from Birth Date ${parsed.formatted}. Total Compound Sum: ${compoundSum}. ` +
      `Cosmic Archetype: ${archetype} ` +
      `Ruling Vibrational Archetype: ${planet}. ` +
      `The Life Path signifies your central incarnational lesson, innate vocational aptitude, and major developmental journey across this lifetime.`;

    return {
      toolId: "life-path",
      toolName: "Pythagorean Life Path Number Engine",
      elementName: "Pythagorean Life Path / Ruling Vibration",
      assessment: assessment,
      system: SYSTEMS.PYTHAGOREAN,
      sourceReference: "The Complete Book of Numerology by Dr. David A. Phillips, Chapter 5 ('The Ruling Number')",
      plainRule: "Reduces the calendar Month, Day, and Year separately before summing their fundamental roots. Master Numbers 11, 22, and 33 are strictly preserved without reduction to single digits.",
      breakdown: breakdown,
      compoundNumber: compoundSum,
      singleRoot: rulingNumber,
      planetLord: planet,
      disclaimer: STANDARD_DISCLAIMER,
      details: {
        birthDateFormatted: parsed.formatted,
        isMasterNumber: isMaster,
        baseSingleDigit: isMaster ? reduceNumber(rulingNumber, false).root : rulingNumber,
        continuousDigitSum: totalContinuous,
        continuousRoot: continuousRed.root,
        archetypeSummary: archetype
      }
    };
  }

  /**
   * 6. birth-number (Pythagorean)
   * The Solar Day Number (1-31). Reflects immediate instinctive personality and daily toolbox.
   */
  function calculateBirthNumber(dobOrDay) {
    let dayNumber = 1;
    if (typeof dobOrDay === 'number' && !isNaN(dobOrDay)) {
      dayNumber = Math.min(31, Math.max(1, Math.floor(dobOrDay)));
    } else if (typeof dobOrDay === 'string') {
      const trimmed = dobOrDay.trim();
      if (/^\d{1,2}$/.test(trimmed)) {
        const d = parseInt(trimmed, 10);
        dayNumber = (d >= 1 && d <= 31) ? d : 1;
      } else {
        const parsed = parseDate(trimmed);
        if (parsed.valid) {
          dayNumber = parsed.day;
        } else {
          const dObj = new Date(trimmed);
          if (!isNaN(dObj.getTime())) {
            dayNumber = dObj.getDate();
          } else {
            const m = trimmed.match(/\b([1-9]|[12]\d|3[01])\b/);
            dayNumber = m ? parseInt(m[1], 10) : 1;
          }
        }
      }
    } else if (dobOrDay instanceof Date && !isNaN(dobOrDay.getTime())) {
      dayNumber = dobOrDay.getDate();
    } else {
      dayNumber = 1;
    }
    const { root, steps } = reduceNumber(dayNumber, false);
    const planet = getPlanetLord(root);

    const breakdown = [
      { factor: "Calendar Day of Birth", raw: dayNumber, steps: steps, singleRoot: root }
    ];

    let dayTrait = "";
    switch (root) {
      case 1: dayTrait = "Innate independence, executive initiative, self-starter mentality, and leadership presence."; break;
      case 2: dayTrait = "Deep interpersonal sensitivity, diplomatic charm, desire for partnership, and intuitive empathy."; break;
      case 3: dayTrait = "Sparkling social eloquence, creative flair, quick wit, optimistic nature, and imaginative talent."; break;
      case 4: dayTrait = "Disciplined work ethic, methodical execution, loyalty, demand for honesty, and sturdy stability."; break;
      case 5: dayTrait = "Dynamic curiosity, thirst for travel and change, magnetic charm, versatility, and mental agility."; break;
      case 6: dayTrait = "Deep love for family and home, generous caregiver instincts, artistic appreciation, and protective counsel."; break;
      case 7: dayTrait = "Reflective intellect, natural analytical mind, requirement for quiet space, and spiritual curiosity."; break;
      case 8: dayTrait = "Practical ambition, authoritative judgment, innate understanding of money and status, and stamina."; break;
      case 9: dayTrait = "Generous idealism, wide perspective on human nature, emotional empathy, and broad artistic flair."; break;
      default: dayTrait = "Unique individual personality vibration.";
    }

    const assessment = `Birth Day Number (Psychic / Day Vibration): ${dayNumber} reducing to Single Root ${root}. ` +
      `Governed by ${planet}. ` +
      `Personal Instinctive Trait: ${dayTrait} ` +
      `Unlike the Life Path (which outlines the destiny you are growing toward), your Day Number describes the existing talents ` +
      `and spontaneous behavioural patterns you possess right now.`;

    return {
      toolId: "birth-number",
      toolName: "Birth Day Number (Psychic / Day Vibration)",
      elementName: "Day of Birth Personality Resonance",
      assessment: assessment,
      system: SYSTEMS.PYTHAGOREAN,
      sourceReference: "The Complete Book of Numerology by Dr. David A. Phillips, Chapter 6 ('The Day Number')",
      plainRule: "Extracts the exact calendar day of birth (1 to 31) and reduces it to a core 1-9 vibration, highlighting innate behavioral reflexes and baseline personal temperament.",
      breakdown: breakdown,
      compoundNumber: dayNumber,
      singleRoot: root,
      planetLord: planet,
      disclaimer: STANDARD_DISCLAIMER,
      details: {
        calendarDay: dayNumber,
        reductionSteps: steps,
        personalityTrait: dayTrait
      }
    };
  }

  /**
   * 7. destiny-number (Pythagorean)
   * The Expression / Destiny Number calculated from full birth name via 1-9 table.
   * PRESERVES MASTER NUMBERS: 11, 22, 33.
   */
  function calculateDestinyNumber(fullName) {
    const { breakdown, compound, words } = buildPythagoreanBreakdown(fullName);
    const { root } = reduceNumber(compound, true);
    const isMaster = (root === 11 || root === 22 || root === 33);
    const planet = getPlanetLord(root);

    let destinyMission = "";
    switch (root) {
      case 1: destinyMission = "To lead, innovate, pioneer new paradigms, and manifest self-directed accomplishments."; break;
      case 2: destinyMission = "To bring peace, foster cooperative diplomacy, harmonize discord, and support collective well-being."; break;
      case 3: destinyMission = "To uplift humanity through creative self-expression, joyous inspiration, writing, or performance."; break;
      case 4: destinyMission = "To construct durable institutions, establish order, anchor reliable systems, and manifest stability."; break;
      case 5: destinyMission = "To champion personal liberty, promote progressive evolution, bridge cultures, and adapt through crisis."; break;
      case 6: destinyMission = "To nurture communities, heal family relationships, bring balance, and elevate aesthetic beauty."; break;
      case 7: destinyMission = "To seek truth, uncover esoteric or scientific laws, teach spiritual discernment, and preserve wisdom."; break;
      case 8: destinyMission = "To master the material plane, administer wealth and ethical commerce, and govern large-scale enterprises."; break;
      case 9: destinyMission = "To serve universal humanitarian causes, inspire selfless compassion, and elevate global human dignity."; break;
      case 11: destinyMission = "Master Expression 11: To act as a spiritual beacon, bridging metaphysical light and practical inspiration to awaken minds."; break;
      case 22: destinyMission = "Master Expression 22: To materialize visionary blueprints on a global scale, erecting institutions that benefit humanity."; break;
      case 33: destinyMission = "Master Expression 33: To embody the cosmic teacher, spreading universal love, healing, and profound ethical elevation."; break;
      default: destinyMission = "To fulfill personal soul expression.";
    }

    const assessment = `Pythagorean Destiny (Expression) Number for "${fullName}": ${root}${isMaster ? ' (MASTER NUMBER)' : ''}. ` +
      `Total Name Compound Sum: ${compound}. Ruling Archetype: ${planet}. ` +
      `Vocational Blueprint: ${destinyMission} ` +
      `In Pythagorean numerology, the Expression Number represents your capabilities, worldly vocation, ` +
      `and the physical and mental tools at your disposal to realize your life's work.`;

    return {
      toolId: "destiny-number",
      toolName: "Pythagorean Destiny / Expression Number",
      elementName: "Full Name Expression Vibration",
      assessment: assessment,
      system: SYSTEMS.PYTHAGOREAN,
      sourceReference: "Juno Jordan, 'The Romance in Your Name'; Florence Campbell, 'Your Days Are Numbered'",
      plainRule: "Sums all letters in the full legal name using the sequential Pythagorean 1-9 alphabet table, preserving Master Numbers 11, 22, and 33 to define worldly capabilities and vocational calling.",
      breakdown: breakdown,
      compoundNumber: compound,
      singleRoot: root,
      planetLord: planet,
      disclaimer: STANDARD_DISCLAIMER,
      details: {
        words: words,
        isMasterNumber: isMaster,
        baseRoot: isMaster ? reduceNumber(root, false).root : root,
        vocationalMission: destinyMission
      }
    };
  }

  /**
   * 8. business-name (Modern Practitioner)
   * Evaluates brand names using Chaldean enterprise compounds + sector resonance.
   */
  function calculateBusinessName(businessName, optionalIndustry = '') {
    const { breakdown, compound } = buildChaldeanBreakdown(businessName);
    const { root } = reduceNumber(compound, false);
    const planet = getPlanetLord(root);
    const compoundDesc = getCompoundMeaning(compound, root);

    // Highly auspicious commercial compound numbers according to Cheiro & modern practitioners
    const AUSPICIOUS_BUSINESS_COMPOUNDS = new Set([15, 19, 21, 23, 24, 27, 32, 33, 37, 41, 46, 51]);
    const isPrimeCompound = AUSPICIOUS_BUSINESS_COMPOUNDS.has(compound);

    // Industry compatibility map
    const industryFit = {
      1: ["Technology Startups", "Executive Leadership", "Automotive", "Luxury Brands", "Innovation"],
      2: ["Consulting", "Partnerships", "Concierge", "Diplomatic Services", "Human Resources"],
      3: ["Media & Advertising", "Entertainment", "Publishing", "Arts & Design", "Public Relations"],
      4: ["Construction", "Real Estate", "Manufacturing", "Legal & Accounting", "Logistics"],
      5: ["E-Commerce", "Travel & Tourism", "Digital Marketing", "Trading", "Communications"],
      6: ["Hospitality", "Health & Wellness", "Beauty & Cosmetics", "Interior Design", "Restaurants"],
      7: ["R&D & Pharmaceuticals", "Analytics", "Spiritual & Metaphysical", "Specialized Consulting"],
      8: ["Banking & Finance", "Investment Funds", "Heavy Industry", "Corporate Law", "Mining & Infrastructure"],
      9: ["Non-Profits & NGOs", "International Trade", "Higher Education", "Eco-friendly Goods", "Healing Centers"]
    };

    const recommendedSectors = industryFit[root] || ["General Commercial Enterprise"];

    // Commercial score calculation
    let commercialScore = 75;
    if (isPrimeCompound) commercialScore += 18;
    if ([1, 3, 5, 6].includes(root)) commercialScore += 5; // highly magnetic commercial roots

    const assessment = `Commercial Brand Assessment for "${businessName}": ` +
      `Chaldean Compound: ${compound} -> Single Root ${root} (${planet}). ` +
      `Occult Compound Symbolism: ${compoundDesc} ` +
      `Commercial Prosperity Rating: ${commercialScore}% (${isPrimeCompound ? 'Auspicious High-Growth Compound' : 'Stable Operating Compound'}). ` +
      `Prime Industry Alignment: ${recommendedSectors.join(', ')}. ` +
      `Actionable Strategic Advice: ${root === 8 ? 'Ensure impeccable financial auditing and corporate compliance.' : root === 5 ? 'Capitalize on digital media, agile campaigns, and dynamic public promotion.' : 'Leverage direct brand storytelling that reinforces the root vibration.'}`;

    return {
      toolId: "business-name",
      toolName: "Commercial Brand & Business Name Numerology Evaluator",
      elementName: "Commercial Brand Vibrational Assessment",
      assessment: assessment,
      system: SYSTEMS.MODERN,
      sourceReference: "Modern Commercial Brand Numerology Synthesis & Cheiro Enterprise Compound Guidelines",
      plainRule: "Applies Chaldean enterprise compound analysis to commercial brand names, scoring energetic resonance against targeted economic sectors and corporate growth cycles.",
      breakdown: breakdown,
      compoundNumber: compound,
      singleRoot: root,
      planetLord: planet,
      disclaimer: STANDARD_DISCLAIMER,
      details: {
        commercialScore: Math.min(commercialScore, 99),
        isPrimeBusinessCompound: isPrimeCompound,
        recommendedSectors: recommendedSectors,
        targetIndustryProvided: optionalIndustry || 'Not Specified'
      }
    };
  }

  /**
   * 9. vehicle-number (Modern Practitioner)
   * Evaluates vehicle registration plates (state alpha prefix + digits).
   */
  function calculateVehicleNumber(plateNumber) {
    const raw = String(plateNumber || '').trim();
    const cleaned = raw.toUpperCase().replace(/[^A-Z0-9]/g, '');

    const breakdown = [];
    let compound = 0;
    let numericTailStr = "";

    const tailMatch = cleaned.match(/\d+$/);
    if (tailMatch) {
      numericTailStr = tailMatch[0];
    }

    for (let i = 0; i < cleaned.length; i++) {
      const ch = cleaned[i];
      let val = 0;
      if (/[0-9]/.test(ch)) {
        val = parseInt(ch, 10);
      } else if (/[A-Z]/.test(ch)) {
        val = CHALDEAN_MAP[ch] || 0;
      }
      compound += val;
      breakdown.push({
        position: i + 1,
        char: ch,
        value: val,
        runningSum: compound
      });
    }

    const { root } = reduceNumber(compound, false);
    const planet = getPlanetLord(root);

    let tailSum = 0;
    for (let d of numericTailStr) tailSum += parseInt(d, 10);
    const tailRoot = reduceNumber(tailSum, false).root;

    let vehicleTemperament = "";
    switch (root) {
      case 1: vehicleTemperament = "Commanding highway presence, executive transport, high reliability, suited for solo/leadership travel."; break;
      case 2: vehicleTemperament = "Smooth, gentle cruising, requires calm patient driving, ideal for peaceful scenic commuting."; break;
      case 3: vehicleTemperament = "Lively, dynamic urban travel, great for social commutes, carpooling, and vibrant transport."; break;
      case 4: vehicleTemperament = "Sturdy workhorse, utility vehicle, demands disciplined maintenance and strict adherence to service intervals."; break;
      case 5: vehicleTemperament = "High-speed mobility, frequent long trips, agile city navigation, and adventurous touring."; break;
      case 6: vehicleTemperament = "Luxury comfort, premium interior ambiance, superior family safety, and peaceful relaxed travel."; break;
      case 7: vehicleTemperament = "Solitary driving, introspective journeys, high-tech engineering, calls for focused situational awareness."; break;
      case 8: vehicleTemperament = "Heavy-duty endurance, corporate fleet status, robust build, thrives on long cross-country transit."; break;
      case 9: vehicleTemperament = "Energetic, swift responsive braking, demands composed alertness from the driver in congested traffic."; break;
      default: vehicleTemperament = "Balanced general road transit vehicle.";
    }

    const assessment = `Vehicle Registration "${raw}" (Cleaned: ${cleaned}): ` +
      `Overall Alphanumeric Compound: ${compound} -> Single Root ${root} (${planet}). ` +
      `Numeric Tail (${numericTailStr}): Compound ${tailSum} -> Tail Root ${tailRoot}. ` +
      `Transit Temperament: ${vehicleTemperament} ` +
      `Safety & Maintenance Guidance: Maintaining clear mirrors, balanced tire pressures, and disciplined speeds ensures harmonious integration with this vibration.`;

    return {
      toolId: "vehicle-number",
      toolName: "Vehicle Registration & License Plate Numerology Analyzer",
      elementName: "Automotive Plate Vibrational Analysis",
      assessment: assessment,
      system: SYSTEMS.MODERN,
      sourceReference: "Modern Automotive Numerology & Road Transit Vibrational Analysis",
      plainRule: "Converts alphabetic registration codes via Chaldean values and adds plate digits to assess the vehicle's energetic road temperament and mechanical harmony.",
      breakdown: breakdown,
      compoundNumber: compound,
      singleRoot: root,
      planetLord: planet,
      disclaimer: STANDARD_DISCLAIMER,
      details: {
        cleanedPlate: cleaned,
        numericTail: numericTailStr,
        tailCompound: tailSum,
        tailRoot: tailRoot,
        temperament: vehicleTemperament
      }
    };
  }

  /**
   * 10. name-dob-compatibility / calculateCompatibility (Modern Practitioner)
   * Cross-analyzes Full Name (Namank), Birth Day (Mulank), and Life Path (Bhagyank).
   * Supports both 1-person Triadic Resonance and 2-person Relational Synastry.
   */
  function calculateCompatibility(p1, p2, p3, p4) {
    let isTwoPerson = false;
    let person1 = null;
    let person2 = null;

    if (p1 && typeof p1 === 'object' && p2 && typeof p2 === 'object') {
      isTwoPerson = true;
      person1 = { name: p1.name || p1.fullName || 'Person 1', dob: p1.birthDate || p1.dob || '1990-01-01' };
      person2 = { name: p2.name || p2.fullName || 'Person 2', dob: p2.birthDate || p2.dob || '1992-01-01' };
    } else if (typeof p1 === 'string' && typeof p2 === 'string' && typeof p3 === 'string' && typeof p4 === 'string') {
      isTwoPerson = true;
      person1 = { name: p1, dob: p2 };
      person2 = { name: p3, dob: p4 };
    }

    if (isTwoPerson) {
      let parsed1 = parseDate(person1.dob);
      if (!parsed1.valid) parsed1 = { year: 1990, month: 1, day: 15, valid: true, formatted: "1990-01-15" };
      let parsed2 = parseDate(person2.dob);
      if (!parsed2.valid) parsed2 = { year: 1992, month: 5, day: 20, valid: true, formatted: "1992-05-20" };

      // Person 1 vibrations
      const { breakdown: nb1, compound: nc1 } = buildChaldeanBreakdown(person1.name);
      const nr1 = reduceNumber(nc1, false).root;
      const np1 = getPlanetLord(nr1);
      const mr1 = reduceNumber(parsed1.day, false).root;
      const mp1 = getPlanetLord(mr1);
      const lr1 = reduceNumber(reduceNumber(parsed1.month, false).root + mr1 + reduceNumber(parsed1.year, false).root, false).root;
      const lp1 = getPlanetLord(lr1);

      // Person 2 vibrations
      const { breakdown: nb2, compound: nc2 } = buildChaldeanBreakdown(person2.name);
      const nr2 = reduceNumber(nc2, false).root;
      const np2 = getPlanetLord(nr2);
      const mr2 = reduceNumber(parsed2.day, false).root;
      const mp2 = getPlanetLord(mr2);
      const lr2 = reduceNumber(reduceNumber(parsed2.month, false).root + mr2 + reduceNumber(parsed2.year, false).root, false).root;
      const lp2 = getPlanetLord(lr2);

      // Evaluate mutual harmony
      const mHarmony = HARMONY_MATRIX[mr1] || { friends: [], neutral: [], enemy: [] };
      let mScore = 70;
      let mVerdict = "Neutral Alignment";
      if (mHarmony.friends.includes(mr2)) { mScore = 95; mVerdict = "Harmonious Alliance (Friend)"; }
      else if (mHarmony.enemy.includes(mr2)) { mScore = 45; mVerdict = "Challenging Friction (Enemy)"; }

      const lHarmony = HARMONY_MATRIX[lr1] || { friends: [], neutral: [], enemy: [] };
      let lScore = 70;
      let lVerdict = "Neutral Stability";
      if (lHarmony.friends.includes(lr2)) { lScore = 95; lVerdict = "Destiny Harmony (Friend)"; }
      else if (lHarmony.enemy.includes(lr2)) { lScore = 45; lVerdict = "Karmic Lesson (Enemy)"; }

      const nHarmony = HARMONY_MATRIX[nr1] || { friends: [], neutral: [], enemy: [] };
      let nScore = 70;
      let nVerdict = "Neutral Affinity";
      if (nHarmony.friends.includes(nr2)) { nScore = 95; nVerdict = "Social Eloquence (Friend)"; }
      else if (nHarmony.enemy.includes(nr2)) { nScore = 45; nVerdict = "Verbal Friction (Enemy)"; }

      const overallScore = Math.round((mScore * 0.4) + (lScore * 0.4) + (nScore * 0.2));
      let synastryVerdict = "";
      if (overallScore >= 85) {
        synastryVerdict = "Exceptional Synastry — Highly resonant mutual alignment that amplifies prosperity, peace, and spiritual growth.";
      } else if (overallScore >= 70) {
        synastryVerdict = "Auspicious Compatibility — Balanced relational foundation; mutual understanding and common goals resolve minor differences.";
      } else {
        synastryVerdict = "Challenging Planetary Polarity — Vibrational friction requiring conscious empathy, patience, and mutual respect.";
      }

      const breakdown = [
        { partner: person1.name, mulank: `${parsed1.day}/${mr1}`, bhagyank: lr1, namank: `${nc1}/${nr1}` },
        { partner: person2.name, mulank: `${parsed2.day}/${mr2}`, bhagyank: lr2, namank: `${nc2}/${nr2}` },
        { factor: "Psychic Compatibility (Mulank)", score: `${mScore}%`, verdict: mVerdict },
        { factor: "Destiny Compatibility (Bhagyank)", score: `${lScore}%`, verdict: lVerdict },
        { factor: "Social Compatibility (Namank)", score: `${nScore}%`, verdict: nVerdict }
      ];

      const assessment = `Relational Synastry between "${person1.name}" (${parsed1.formatted || person1.dob}) and "${person2.name}" (${parsed2.formatted || person2.dob}): ` +
        `Partner 1 [Mulank ${mr1}, Bhagyank ${lr1}, Namank ${nr1}]. Partner 2 [Mulank ${mr2}, Bhagyank ${lr2}, Namank ${nr2}]. ` +
        `Psychic Match: ${mVerdict} (${mScore}%). Destiny Match: ${lVerdict} (${lScore}%). Name Match: ${nVerdict} (${nScore}%). ` +
        `Overall Compatibility Score: ${overallScore}%. ${synastryVerdict}`;

      return {
        toolId: "name-dob-compatibility",
        toolName: "Name & Date of Birth Compatibility Synchronizer",
        elementName: `${person1.name} & ${person2.name} Relational Synastry`,
        assessment: assessment,
        score: overallScore,
        system: SYSTEMS.MODERN,
        sourceReference: "Modern Relational Harmonization (Synthesis of Cheiro's Planetary Friendships & Vedic Sankhya)",
        plainRule: "Cross-checks the Birth Day (Mulank), Life Path (Bhagyank), and Calling Name (Namank) between two individuals using traditional planetary friendship matrices to measure energetic synchronicity.",
        breakdown: breakdown,
        compoundNumber: nc1 + nc2,
        singleRoot: reduceNumber(overallScore, false).root,
        planetLord: `${mp1} & ${mp2}`,
        disclaimer: STANDARD_DISCLAIMER,
        details: {
          person1: { name: person1.name, mulank: mr1, bhagyank: lr1, namank: nr1, planet: mp1 },
          person2: { name: person2.name, mulank: mr2, bhagyank: lr2, namank: nr2, planet: mp2 },
          mulankScore: mScore,
          bhagyankScore: lScore,
          namankScore: nScore,
          overallScore: overallScore,
          verdict: synastryVerdict
        }
      };
    }

    // Otherwise, single person Triadic resonance:
    const fullName = (p1 && typeof p1 === 'object') ? (p1.name || p1.fullName || 'Seeker') : String(p1 || 'Seeker');
    const dob = (p1 && typeof p1 === 'object') ? (p1.birthDate || p1.dob || '1990-01-01') : String(p2 || '1990-01-01');
    let parsed = parseDate(dob);
    if (!parsed.valid) {
      parsed = { year: 1990, month: 1, day: 1, valid: true, formatted: "1990-01-01" };
    }

    // 1. Name Vibration (Chaldean primary per practitioner standard)
    const { breakdown: nameBreakdown, compound: nameCompound } = buildChaldeanBreakdown(fullName);
    const { root: nameRoot } = reduceNumber(nameCompound, false);
    const namePlanet = getPlanetLord(nameRoot);

    // 2. Birth Day (Mulank / Psychic Number)
    const dayNumber = parsed.day;
    const { root: dayRoot } = reduceNumber(dayNumber, false);
    const dayPlanet = getPlanetLord(dayRoot);

    // 3. Life Path (Bhagyank / Destiny Number)
    const monthRed = reduceNumber(parsed.month, false).root;
    const dayRed = dayRoot;
    const yearRed = reduceNumber(parsed.year, false).root;
    const lpCompound = monthRed + dayRed + yearRed;
    const { root: lpRoot } = reduceNumber(lpCompound, false);
    const lpPlanet = getPlanetLord(lpRoot);

    // Harmony Evaluation
    const dayHarmony = HARMONY_MATRIX[dayRoot] || { friends: [], neutral: [], enemy: [] };
    const lpHarmony = HARMONY_MATRIX[lpRoot] || { friends: [], neutral: [], enemy: [] };

    let dayCompatibility = "Neutral";
    let dayScore = 70;
    if (dayHarmony.friends.includes(nameRoot)) {
      dayCompatibility = "Harmonious (Friend)";
      dayScore = 95;
    } else if (dayHarmony.enemy.includes(nameRoot)) {
      dayCompatibility = "Discordant (Challenging)";
      dayScore = 45;
    }

    let lpCompatibility = "Neutral";
    let lpScore = 70;
    if (lpHarmony.friends.includes(nameRoot)) {
      lpCompatibility = "Harmonious (Friend)";
      lpScore = 95;
    } else if (lpHarmony.enemy.includes(nameRoot)) {
      lpCompatibility = "Discordant (Challenging)";
      lpScore = 45;
    }

    const overallScore = Math.round((dayScore * 0.4) + (lpScore * 0.6));

    let verdict = "";
    if (overallScore >= 85) {
      verdict = "Exceptional Harmony — The name energetically amplifies both your daily instincts (Mulank) and overarching life mission (Bhagyank).";
    } else if (overallScore >= 70) {
      verdict = "Favorable Stability — Sound compatibility providing a steady foundation with minor friction easily balanced by conscious effort.";
    } else {
      verdict = "Energetic Tension / Discord — The name vibration creates resistance against your Life Path or Birth Day rulers; a minor spelling adjustment is traditionally advised.";
    }

    const breakdown = [
      { element: "Name Number (Namank)", compound: nameCompound, root: nameRoot, planet: namePlanet },
      { element: "Birth Day Number (Mulank)", compound: dayNumber, root: dayRoot, planet: dayPlanet },
      { element: "Life Path Number (Bhagyank)", compound: lpCompound, root: lpRoot, planet: lpPlanet }
    ];

    const assessment = `Name & DOB Compatibility for "${fullName}" born on ${parsed.formatted}: ` +
      `Namank (Name): ${nameCompound}/${nameRoot} (${namePlanet}). ` +
      `Mulank (Day): ${dayNumber}/${dayRoot} (${dayPlanet}). ` +
      `Bhagyank (Life Path): ${lpCompound}/${lpRoot} (${lpPlanet}). ` +
      `Relationship with Mulank: ${dayCompatibility} (${dayScore}%). ` +
      `Relationship with Bhagyank: ${lpCompatibility} (${lpScore}%). ` +
      `Overall Compatibility Score: ${overallScore}%. ${verdict}`;

    return {
      toolId: "name-dob-compatibility",
      toolName: "Name & Date of Birth Compatibility Synchronizer",
      elementName: "Triadic Energetic Resonance (Name vs DOB)",
      assessment: assessment,
      score: overallScore,
      system: SYSTEMS.MODERN,
      sourceReference: "Modern Harmonization Methodology (Synthesis of Cheiro's Planetary Friendships & Western Polarity)",
      plainRule: "Cross-checks the Name Root (Namank) against the Birth Day Root (Mulank) and Life Path Root (Bhagyank) using traditional planetary friendship matrices to measure energetic synchronicity.",
      breakdown: breakdown,
      compoundNumber: nameCompound,
      singleRoot: nameRoot,
      planetLord: namePlanet,
      disclaimer: STANDARD_DISCLAIMER,
      details: {
        nameRoot: nameRoot,
        dayRoot: dayRoot,
        lpRoot: lpRoot,
        dayCompatibility: dayCompatibility,
        lpCompatibility: lpCompatibility,
        overallScore: overallScore,
        verdict: verdict,
        nameBreakdown: nameBreakdown
      }
    };
  }

  function calculateNameDobCompatibility(p1, p2, p3, p4) {
    return calculateCompatibility(p1, p2, p3, p4);
  }

  // =========================================================================
  // 5. MASTER DISPATCHER & OUTPUT FORMATTERS
  // =========================================================================

  /**
   * Universal calculation runner. Dispatches tool requests by ID.
   * @param {string} toolId
   * @param {Object} params
   * @returns {Object} Standardized result object
   */
  function calculate(toolId, params = {}) {
    const id = String(toolId || '').toLowerCase().trim();
    switch (id) {
      case "name-number":
        return calculateNameNumber(params.name || params.input || '');
      case "name-analysis":
        return calculateNameAnalysis(params.name || params.input || '');
      case "mobile-number":
        return calculateMobileNumber(params.mobile || params.phone || params.input || '');
      case "lucky-number":
        return calculateLuckyNumber(params.dob || params.birthDate || params.input || '', params.name || '');
      case "life-path":
        return calculateLifePath(params.dob || params.birthDate || params.input || '');
      case "birth-number":
        return calculateBirthNumber(params.dob || params.birthDate || params.day || params.input || 1);
      case "destiny-number":
        return calculateDestinyNumber(params.name || params.fullName || params.input || '');
      case "business-name":
        return calculateBusinessName(params.name || params.businessName || params.input || '', params.industry || '');
      case "vehicle-number":
        return calculateVehicleNumber(params.plate || params.vehicleNumber || params.input || '');
      case "name-dob-compatibility":
        if (params.p1 && params.p2) {
          return calculateCompatibility(params.p1, params.p2);
        } else if (params.person1 && params.person2) {
          return calculateCompatibility(params.person1, params.person2);
        } else if (params.n1 && params.d1 && params.n2 && params.d2) {
          return calculateCompatibility({ name: params.n1, birthDate: params.d1 }, { name: params.n2, birthDate: params.d2 });
        } else {
          return calculateCompatibility(params.name || params.fullName || 'Seeker', params.dob || params.birthDate || '1990-01-01');
        }
      default:
        throw new Error(`Unknown numerology toolId: "${toolId}". Expected one of: name-number, name-analysis, mobile-number, lucky-number, life-path, birth-number, destiny-number, business-name, vehicle-number, name-dob-compatibility.`);
    }
  }

  /**
   * Generates a clean plain-text summary suitable for clipboard copy or downloads.
   * @param {Object} res Standardized result object
   * @returns {string}
   */
  function generateTextSummary(res) {
    if (!res) return "";
    return [
      "==================================================================",
      `TOOL: ${res.toolName} (${res.toolId})`,
      `ELEMENT: ${res.elementName}`,
      `SYSTEM: ${res.system}`,
      `REFERENCE: ${res.sourceReference}`,
      "------------------------------------------------------------------",
      `COMPOUND NUMBER : ${res.compoundNumber}`,
      `SINGLE ROOT     : ${res.singleRoot}`,
      `PLANETARY RULER : ${res.planetLord}`,
      "------------------------------------------------------------------",
      `ASSESSMENT:`,
      res.assessment,
      "------------------------------------------------------------------",
      `PLAIN RULE:`,
      res.plainRule,
      "------------------------------------------------------------------",
      `DISCLAIMER: ${res.disclaimer}`,
      "=================================================================="
    ].join('\n');
  }

  /**
   * Generates a print-ready HTML snippet for saving/printing.
   * @param {Object} res Standardized result object
   * @returns {string}
   */
  function generatePrintableSummary(res) {
    if (!res) return "";
    return `
      <div class="numerology-report-card" style="font-family: system-ui, sans-serif; max-width: 720px; margin: 2rem auto; padding: 2rem; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff; color: #1a202c; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
        <div style="border-bottom: 2px solid #cbd5e1; padding-bottom: 1rem; margin-bottom: 1.5rem;">
          <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; font-weight: 600;">${res.system}</span>
          <h2 style="margin: 0.25rem 0 0 0; font-size: 1.5rem; color: #0f172a;">${res.toolName}</h2>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem; color: #475569;">${res.elementName}</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
            <div style="font-size: 0.8rem; color: #64748b; font-weight: 600;">Compound Sum</div>
            <div style="font-size: 1.75rem; font-weight: 700; color: #2563eb;">${res.compoundNumber}</div>
          </div>
          <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
            <div style="font-size: 0.8rem; color: #64748b; font-weight: 600;">Single Root</div>
            <div style="font-size: 1.75rem; font-weight: 700; color: #059669;">${res.singleRoot}</div>
          </div>
          <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center; grid-column: span 2;">
            <div style="font-size: 0.8rem; color: #64748b; font-weight: 600;">Ruling Archetype</div>
            <div style="font-size: 1rem; font-weight: 600; color: #4338ca; margin-top: 0.35rem;">${res.planetLord}</div>
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h3 style="font-size: 1rem; color: #0f172a; margin-bottom: 0.5rem;">Assessment & Synthesis</h3>
          <div style="line-height: 1.6; color: #334155; background: #f1f5f9; padding: 1rem; border-radius: 8px; font-size: 0.95rem;">
            ${res.assessment}
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.85rem; text-transform: uppercase; color: #64748b; margin-bottom: 0.35rem;">Traditional Plain-Language Rule</h4>
          <p style="font-size: 0.9rem; color: #475569; margin: 0; line-height: 1.5;">${res.plainRule}</p>
        </div>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 1rem; font-size: 0.8rem; color: #64748b;">
          <p style="margin: 0 0 0.5rem 0;"><strong>Source Reference:</strong> ${res.sourceReference}</p>
          <p style="margin: 0; font-style: italic;"><strong>Disclaimer:</strong> ${res.disclaimer}</p>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 6. PUBLIC API EXPORT
  // =========================================================================

  return Object.freeze({
    // Core Runner
    calculate: calculate,

    // Individual 10 Tool Functions
    calculateNameNumber: calculateNameNumber,
    calculateNameAnalysis: calculateNameAnalysis,
    calculateMobileNumber: calculateMobileNumber,
    calculateLuckyNumber: calculateLuckyNumber,
    calculateLifePath: calculateLifePath,
    calculateBirthNumber: calculateBirthNumber,
    calculateDestinyNumber: calculateDestinyNumber,
    calculateBusinessName: calculateBusinessName,
    calculateVehicleNumber: calculateVehicleNumber,
    calculateNameDobCompatibility: calculateNameDobCompatibility,
    calculateCompatibility: calculateCompatibility,

    // Mathematical & Alphabetical Helpers
    getChaldeanValue: getChaldeanValue,
    getPythagoreanValue: getPythagoreanValue,
    reduceNumber: reduceNumber,
    sumDigits: sumDigits,
    parseDate: parseDate,
    getPlanetLord: getPlanetLord,
    getCompoundMeaning: getCompoundMeaning,
    buildChaldeanBreakdown: buildChaldeanBreakdown,
    buildPythagoreanBreakdown: buildPythagoreanBreakdown,

    // Summary & Export Formatters
    generateTextSummary: generateTextSummary,
    generatePrintableSummary: generatePrintableSummary,

    // Constant Lookups
    SYSTEMS: SYSTEMS,
    CHALDEAN_MAP: CHALDEAN_MAP,
    PYTHAGOREAN_MAP: PYTHAGOREAN_MAP,
    PLANET_LORDS: PLANET_LORDS,
    CHEIRO_COMPOUND_MEANINGS: CHEIRO_COMPOUND_MEANINGS,
    HARMONY_MATRIX: HARMONY_MATRIX,
    STANDARD_DISCLAIMER: STANDARD_DISCLAIMER
  });
}));
