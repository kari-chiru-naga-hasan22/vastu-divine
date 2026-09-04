/**
 * ==========================================================================
 * VASTU DIVINE — 3D Sacred Sketchbook Engine
 * Inspired by ThreeUI Meng To Sketchbook — Adapted for Classical Vedic Wisdom
 * ==========================================================================
 */
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. DATA DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * BOOK 1: Four Pillars of Personal Alignment (4 Pages)
 */
const FOUR_PILLARS_PAGES = [
    {
        plateNumber: 'PLATE 01',
        category: 'DISCOVER // STEP ONE',
        sanskrit: 'खोज • PRATHAMA VIDYA',
        title: 'Free Tools & Self-Discovery',
        caption: 'Sacred Astrolabe & Phonetic Coordinate Matrix',
        desc: 'Instant phonetic name checks, mobile frequency diagnostics, and floorplan orientation tools designed for rapid clarity. Connect your daily lifestyle with primordial cosmological coordinates.',
        attributes: ['Phonetic Alignment', 'Zero Cost Diagnostic', 'Real-Time Results'],
        ctaText: 'Explore Free Tools →',
        ctaLink: 'pages/discover.html',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="150" r="130" fill="none" stroke="#B3791E" stroke-width="1.2" stroke-dasharray="3 4"/>
            <circle cx="150" cy="150" r="112" fill="#FAF6F0" stroke="#6D0A1D" stroke-width="1.5"/>
            <circle cx="150" cy="150" r="85" fill="none" stroke="#B3791E" stroke-width="1" stroke-dasharray="2 2"/>
            <line x1="150" y1="20" x2="150" y2="280" stroke="#B3791E" stroke-width="0.8" opacity="0.4"/>
            <line x1="20" y1="150" x2="280" y2="150" stroke="#B3791E" stroke-width="0.8" opacity="0.4"/>
            <polygon points="150,45 160,140 150,150 140,140" fill="#6D0A1D"/>
            <polygon points="150,255 160,160 150,150 140,160" fill="#B3791E"/>
            <polygon points="45,150 140,160 150,150 140,140" fill="#B3791E"/>
            <polygon points="255,150 160,160 150,150 160,140" fill="#6D0A1D"/>
            <circle cx="150" cy="150" r="30" fill="#FFFFFF" stroke="#B3791E" stroke-width="2"/>
            <circle cx="150" cy="150" r="6" fill="#6D0A1D"/>
            <text x="150" y="75" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="middle">N</text>
            <text x="235" y="154" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="middle">E</text>
            <text x="150" y="235" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="middle">S</text>
            <text x="65" y="154" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="middle">W</text>
        </svg>`
    },
    {
        plateNumber: 'PLATE 02',
        category: 'UNDERSTAND // STEP TWO',
        sanskrit: 'बोध • DVITIYA VIDYA',
        title: 'Numerology & Blueprint',
        caption: 'Pythagorean-Chaldean Harmonic Matrix & 9-Year Cycle',
        desc: 'Decode the vibrational mathematics of your birth date, name spelling, 9-year personal cycles, and master vibrational frequencies. Understand why certain dates catalyze wealth or recurring friction.',
        attributes: ['Core 5 Numbers', 'Chaldean Vowels', '9-Year Waveform'],
        ctaText: 'Calculate Matrix →',
        ctaLink: 'pages/numerology.html',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <rect x="35" y="35" width="230" height="230" rx="12" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.8"/>
            <line x1="112" y1="35" x2="112" y2="265" stroke="#B3791E" stroke-width="1" stroke-dasharray="3 3"/>
            <line x1="188" y1="35" x2="188" y2="265" stroke="#B3791E" stroke-width="1" stroke-dasharray="3 3"/>
            <line x1="35" y1="112" x2="265" y2="112" stroke="#B3791E" stroke-width="1" stroke-dasharray="3 3"/>
            <line x1="35" y1="188" x2="265" y2="188" stroke="#B3791E" stroke-width="1" stroke-dasharray="3 3"/>
            <circle cx="73" cy="73" r="24" fill="#FFFFFF" stroke="#6D0A1D" stroke-width="1"/>
            <text x="73" y="79" font-family="'Cinzel',serif" font-size="17" fill="#6D0A1D" font-weight="700" text-anchor="middle">3</text>
            <circle cx="150" cy="73" r="24" fill="#FFFFFF" stroke="#B3791E" stroke-width="1"/>
            <text x="150" y="79" font-family="'Cinzel',serif" font-size="17" fill="#B3791E" font-weight="700" text-anchor="middle">1</text>
            <circle cx="227" cy="73" r="24" fill="#FFFFFF" stroke="#6D0A1D" stroke-width="1"/>
            <text x="227" y="79" font-family="'Cinzel',serif" font-size="17" fill="#6D0A1D" font-weight="700" text-anchor="middle">9</text>
            <circle cx="73" cy="150" r="24" fill="#FFFFFF" stroke="#B3791E" stroke-width="1"/>
            <text x="73" y="156" font-family="'Cinzel',serif" font-size="17" fill="#B3791E" font-weight="700" text-anchor="middle">6</text>
            <circle cx="150" cy="150" r="28" fill="#6D0A1D" stroke="#D4A045" stroke-width="2"/>
            <text x="150" y="157" font-family="'Cinzel',serif" font-size="20" fill="#FFFFFF" font-weight="800" text-anchor="middle">7</text>
            <circle cx="227" cy="150" r="24" fill="#FFFFFF" stroke="#B3791E" stroke-width="1"/>
            <text x="227" y="156" font-family="'Cinzel',serif" font-size="17" fill="#B3791E" font-weight="700" text-anchor="middle">5</text>
            <circle cx="73" cy="227" r="24" fill="#FFFFFF" stroke="#6D0A1D" stroke-width="1"/>
            <text x="73" y="233" font-family="'Cinzel',serif" font-size="17" fill="#6D0A1D" font-weight="700" text-anchor="middle">2</text>
            <circle cx="150" cy="227" r="24" fill="#FFFFFF" stroke="#B3791E" stroke-width="1"/>
            <text x="150" y="233" font-family="'Cinzel',serif" font-size="17" fill="#B3791E" font-weight="700" text-anchor="middle">8</text>
            <circle cx="227" cy="227" r="24" fill="#FFFFFF" stroke="#6D0A1D" stroke-width="1"/>
            <text x="227" y="233" font-family="'Cinzel',serif" font-size="17" fill="#6D0A1D" font-weight="700" text-anchor="middle">4</text>
        </svg>`
    },
    {
        plateNumber: 'PLATE 03',
        category: 'ALIGN // STEP THREE',
        sanskrit: 'संरेखण • TRITIYA VIDYA',
        title: 'Vastu & Master Guidance',
        caption: '16-Zone Sthapatya Energy Radar & Elemental Balancing',
        desc: '16-zone spatial harmonization for homes, offices, factories, and development layouts with certified master guidance. Zero-demolition corrections engineered with metal strips, color zoning, and pyramids.',
        attributes: ['16 Energy Zones', 'Zero Demolition', 'Certified Acharyas'],
        ctaText: 'Explore Vastu Paths →',
        ctaLink: 'pages/vastu.html',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="150" r="128" fill="#FBF8F3" stroke="#B3791E" stroke-width="1.2"/>
            <polygon points="150,22 175,125 278,150 175,175 150,278 125,175 22,150 125,125" fill="#6D0A1D" opacity="0.12"/>
            <line x1="150" y1="22" x2="150" y2="278" stroke="#6D0A1D" stroke-width="1.2"/>
            <line x1="22" y1="150" x2="278" y2="150" stroke="#6D0A1D" stroke-width="1.2"/>
            <line x1="60" y1="60" x2="240" y2="240" stroke="#B3791E" stroke-width="0.9" stroke-dasharray="3 3"/>
            <line x1="240" y1="60" x2="60" y2="240" stroke="#B3791E" stroke-width="0.9" stroke-dasharray="3 3"/>
            <circle cx="150" cy="150" r="92" fill="none" stroke="#6D0A1D" stroke-width="1" stroke-dasharray="4 4"/>
            <circle cx="150" cy="150" r="54" fill="#FFFFFF" stroke="#B3791E" stroke-width="1.8"/>
            <rect x="135" y="135" width="30" height="30" fill="#6D0A1D" transform="rotate(45 150 150)"/>
            <circle cx="150" cy="150" r="4" fill="#FFFFFF"/>
            <text x="150" y="42" font-family="'Cinzel',serif" font-size="10" fill="#6D0A1D" font-weight="700" text-anchor="middle">NORTH (WATER)</text>
            <text x="250" y="154" font-family="'Cinzel',serif" font-size="10" fill="#6D0A1D" font-weight="700" text-anchor="middle">EAST (AIR)</text>
            <text x="150" y="268" font-family="'Cinzel',serif" font-size="10" fill="#6D0A1D" font-weight="700" text-anchor="middle">SOUTH (FIRE)</text>
            <text x="50" y="154" font-family="'Cinzel',serif" font-size="10" fill="#6D0A1D" font-weight="700" text-anchor="middle">WEST (SPACE)</text>
        </svg>`
    },
    {
        plateNumber: 'PLATE 04',
        category: 'ASCEND // STEP FOUR',
        sanskrit: 'आरोहण • CHATURTHA VIDYA',
        title: 'Curated Spiritual Objects',
        caption: 'Consecrated Sri Yantra & Certified Jyotish Gemstones',
        desc: 'Consecrated copper yantras, authentic certified gemstones, sacred rudraksha beads, and energizing healing crystals consecrated during auspicious Abhijit Muhurta by Vedic priests for permanent resonance.',
        attributes: ['100% Lab Certified', 'Vedic Consecration', 'Zero Negative Energy'],
        ctaText: 'View Collection →',
        ctaLink: 'pages/shop.html',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="25" width="250" height="250" fill="#FDFBF9" stroke="#B3791E" stroke-width="2"/>
            <rect x="35" y="35" width="230" height="230" fill="none" stroke="#6D0A1D" stroke-width="0.8"/>
            <circle cx="150" cy="150" r="102" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.2"/>
            <circle cx="150" cy="150" r="92" fill="none" stroke="#6D0A1D" stroke-width="0.8" stroke-dasharray="3 3"/>
            <!-- Sri Yantra Intersecting Triangles -->
            <polygon points="150,65 220,185 80,185" fill="none" stroke="#6D0A1D" stroke-width="1.5"/>
            <polygon points="150,235 220,115 80,115" fill="none" stroke="#B3791E" stroke-width="1.5"/>
            <polygon points="150,85 205,175 95,175" fill="none" stroke="#6D0A1D" stroke-width="1.2"/>
            <polygon points="150,215 205,125 95,125" fill="none" stroke="#B3791E" stroke-width="1.2"/>
            <polygon points="150,105 190,165 110,165" fill="none" stroke="#6D0A1D" stroke-width="1"/>
            <circle cx="150" cy="145" r="8" fill="#D4A045" stroke="#6D0A1D" stroke-width="1.5"/>
            <circle cx="150" cy="145" r="2.5" fill="#6D0A1D"/>
        </svg>`
    }
];

/**
 * BOOK 2: The 20 Sacred Computational Tools (20 Pages)
 * Exactly concordant with ALL_20_TOOLS in index.html
 */
const TWENTY_TOOLS_PAGES = [
    // 1. House Vastu Analyzer
    {
        toolId: 'house-vastu-analyzer',
        plateNumber: 'PLATE 01 / 20',
        category: 'CLASSICAL VASTU // 01',
        sanskrit: 'गृह वास्तु परीक्षा • GRIHA VASTU',
        title: 'House Vastu Analyzer',
        subtitle: 'Full 16 Zones / 8 Directions Comprehensive Audit',
        caption: '16-Zone Sthapatya Energy Radar & Quadrant Calibration',
        desc: 'Diagnostic deconstruction mapping functional spaces—Master Suite, Agni Hearth, Water Drainage, and Sacred Shrine—across all 16 directional quadrants with mathematical degree precision.',
        source: 'Mayamata Ch. 25; D.N. Shukla Vol. I; Bṛhat Saṃhitā Ch. 53',
        attributes: ['16 Directional Zones', 'Zero-Demolition Cures', 'Paramashayika Grid'],
        ctaText: 'Launch House Analyzer →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="150" r="132" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.5"/>
            <circle cx="150" cy="150" r="105" fill="none" stroke="#6D0A1D" stroke-width="1.2" stroke-dasharray="3 3"/>
            <circle cx="150" cy="150" r="75" fill="none" stroke="#B3791E" stroke-width="1" stroke-dasharray="2 2"/>
            <line x1="150" y1="18" x2="150" y2="282" stroke="#6D0A1D" stroke-width="1.2"/>
            <line x1="18" y1="150" x2="282" y2="150" stroke="#6D0A1D" stroke-width="1.2"/>
            <line x1="56" y1="56" x2="244" y2="244" stroke="#B3791E" stroke-width="0.9"/>
            <line x1="244" y1="56" x2="56" y2="244" stroke="#B3791E" stroke-width="0.9"/>
            <line x1="102" y1="28" x2="198" y2="272" stroke="#B3791E" stroke-width="0.6" opacity="0.6"/>
            <line x1="198" y1="28" x2="102" y2="272" stroke="#B3791E" stroke-width="0.6" opacity="0.6"/>
            <line x1="28" y1="102" x2="272" y2="198" stroke="#B3791E" stroke-width="0.6" opacity="0.6"/>
            <line x1="28" y1="198" x2="272" y2="102" stroke="#B3791E" stroke-width="0.6" opacity="0.6"/>
            <rect x="125" y="125" width="50" height="50" fill="#FFFFFF" stroke="#6D0A1D" stroke-width="1.5"/>
            <circle cx="150" cy="150" r="8" fill="#B3791E"/>
            <circle cx="150" cy="150" r="3" fill="#FFFFFF"/>
            <text x="150" y="38" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="middle">N • WATER</text>
            <text x="256" y="154" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="middle">E • AIR</text>
            <text x="150" y="272" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="middle">S • FIRE</text>
            <text x="44" y="154" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="middle">W • SPACE</text>
        </svg>`
    },

    // 2. Plot Vastu Analyzer
    {
        toolId: 'plot-vastu-analyzer',
        plateNumber: 'PLATE 02 / 20',
        category: 'CLASSICAL VASTU // 02',
        sanskrit: 'भूमि परीक्षा • BHŪMI PARĪKṢĀ',
        title: 'Plot Vastu Analyzer',
        subtitle: 'Bhūmi-Parīkṣā, Geometry & Slope Diagnostics',
        caption: 'Sacred Land Geometry & Directional Water Gradient Matrix',
        desc: 'Evaluates land geometry (Square, Rectangle, Gomukhi, Shermukhi), directional water slope gradient, soil coloration, and road encounters (Vīthī-śūla) for primordial spatial resonance.',
        source: 'Mānasāra Ch. 3–5; Mayamata Ch. 3–4; Bṛhat Saṃhitā Ch. 53',
        attributes: ['Gomukhi / Shermukhi', 'Water Slope Gradient', 'Vithi-Shula Detection'],
        ctaText: 'Launch Plot Analyzer →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <rect x="35" y="35" width="230" height="230" rx="8" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.8"/>
            <polygon points="55,65 245,65 225,235 75,235" fill="#FFFFFF" stroke="#6D0A1D" stroke-width="2"/>
            <path d="M120 200 L170 100" stroke="#B3791E" stroke-width="2" stroke-dasharray="4 3"/>
            <path d="M90 180 L140 80" stroke="#B3791E" stroke-width="2" stroke-dasharray="4 3"/>
            <polygon points="170,95 178,103 162,105" fill="#B3791E"/>
            <polygon points="140,75 148,83 132,85" fill="#B3791E"/>
            <circle cx="210" cy="85" r="22" fill="#FAF6F0" stroke="#6D0A1D" stroke-width="1.2"/>
            <text x="210" y="90" font-family="'Cinzel',serif" font-size="10" fill="#6D0A1D" font-weight="700" text-anchor="middle">ĪŚĀNA</text>
            <text x="150" y="260" font-family="'Cinzel',serif" font-size="11" fill="#B3791E" font-weight="700" text-anchor="middle">WATER DRAINAGE → NE</text>
        </svg>`
    },

    // 3. Main Door Vastu
    {
        toolId: 'main-door-vastu',
        plateNumber: 'PLATE 03 / 20',
        category: 'CLASSICAL VASTU // 03',
        sanskrit: 'द्वार विन्यास • DVĀRA VINYĀSA',
        title: 'Main Door Vastu',
        subtitle: 'Dvāra Vinyāsa & 32 Perimeter Padas',
        caption: '32 Boundary Deities & Paramashayika Portal Compass',
        desc: 'Pinpoints entrance placement among the 32 boundary deities of the Paramashayika grid. Identifies highly praised portals (Jayanta, Mahendra, Pushpadanta, Mukhya) versus energy-depleting gates.',
        source: 'Bṛhat Saṃhitā 53.70–82; Mayamata Ch. 26; Viśvakarma Prakāśa Ch. 7',
        attributes: ['32 Perimeter Padas', 'Auspicious Gate Codes', 'Threshold Shielding'],
        ctaText: 'Audit Main Entrance →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="40" width="220" height="220" fill="#FAF6F0" stroke="#6D0A1D" stroke-width="2"/>
            <rect x="68" y="68" width="164" height="164" fill="#FFFFFF" stroke="#B3791E" stroke-width="1.2"/>
            <rect x="180" y="34" width="36" height="12" fill="#1B7340" stroke="#FFFFFF" rx="3"/>
            <text x="198" y="43" font-family="'Cinzel',serif" font-size="8" fill="#FFFFFF" font-weight="700" text-anchor="middle">E3 JAYANTA</text>
            <rect x="254" y="110" width="12" height="36" fill="#1B7340" stroke="#FFFFFF" rx="3"/>
            <rect x="34" y="150" width="12" height="36" fill="#1B7340" stroke="#FFFFFF" rx="3"/>
            <circle cx="150" cy="150" r="38" fill="none" stroke="#6D0A1D" stroke-width="1.2" stroke-dasharray="3 3"/>
            <circle cx="150" cy="150" r="6" fill="#B3791E"/>
            <text x="150" y="275" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="middle">32 SACRED ENTRANCE PADAS</text>
        </svg>`
    },

    // 4. House Facing Calculator
    {
        toolId: 'house-facing-calculator',
        plateNumber: 'PLATE 04 / 20',
        category: 'CLASSICAL VASTU // 04',
        sanskrit: 'दिक् निर्णय • DIG NIRṆAYA',
        title: 'House Facing Calculator',
        subtitle: 'Dig-Nirṇaya & Āyādi Ṣaḍvarga Alignment',
        caption: 'High-Precision Azimuth Cardinal Rose & Declination Arc',
        desc: 'Determines true astronomical facing orientation with magnetic declination correction, cardinal quadrant lord, and Āyādi Yoni compatibility to align dwellings with planetary currents.',
        source: 'Mayamata Ch. 6 & 9; Manuṣyālaya Candrikā Ch. 2',
        attributes: ['Magnetic Declination', 'Ayadi Yoni Concordance', 'Cardinal Quadrant Lord'],
        ctaText: 'Calculate Facing Degree →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="150" r="128" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.5"/>
            <polygon points="150,32 166,150 150,165 134,150" fill="#6D0A1D"/>
            <polygon points="150,268 166,150 150,135 134,150" fill="#B3791E"/>
            <circle cx="150" cy="150" r="22" fill="#FFFFFF" stroke="#6D0A1D" stroke-width="2"/>
            <circle cx="150" cy="150" r="6" fill="#B3791E"/>
            <line x1="150" y1="22" x2="150" y2="30" stroke="#6D0A1D" stroke-width="2"/>
            <line x1="278" y1="150" x2="270" y2="150" stroke="#6D0A1D" stroke-width="2"/>
            <line x1="150" y1="278" x2="150" y2="270" stroke="#6D0A1D" stroke-width="2"/>
            <line x1="22" y1="150" x2="30" y2="150" stroke="#6D0A1D" stroke-width="2"/>
            <text x="150" y="20" font-family="'Cinzel',serif" font-size="12" fill="#6D0A1D" font-weight="800" text-anchor="middle">0° N</text>
            <text x="284" y="154" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700">90° E</text>
            <text x="150" y="295" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="middle">180° S</text>
            <text x="16" y="154" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="end">270° W</text>
        </svg>`
    },

    // 5. Bedroom Vastu
    {
        toolId: 'bedroom-vastu',
        plateNumber: 'PLATE 05 / 20',
        category: 'CLASSICAL VASTU // 05',
        sanskrit: 'शयनागार वास्तु • ŚAYANĀGĀRA',
        title: 'Bedroom Vastu',
        subtitle: 'Śayanālaya & Geomagnetic Sleep Orientation',
        caption: 'Geomagnetic Polar Alignment & Bedstead Vectors',
        desc: 'Analyzes bedchamber suitability by occupant, bedstead positioning, mirror reflection, and biological head direction (South/East optimal; North forbidden due to electromagnetic repulsion).',
        source: 'Mayamata 25.75–88; Bṛhat Saṃhitā Ch. 53; Manuṣyālaya Candrikā Ch. 3',
        attributes: ['South/East Sleep Axis', 'Mirror Reflection Audit', 'Master Suite in Nairrtya'],
        ctaText: 'Analyze Bedchamber →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="40" width="220" height="220" rx="10" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.5"/>
            <rect x="40" y="150" width="110" height="110" fill="#6D0A1D" opacity="0.15" rx="4"/>
            <rect x="58" y="170" width="75" height="70" rx="5" fill="#FFFFFF" stroke="#6D0A1D" stroke-width="2"/>
            <rect x="65" y="175" width="25" height="18" rx="3" fill="#D4A045"/>
            <rect x="100" y="175" width="25" height="18" rx="3" fill="#D4A045"/>
            <line x1="95" y1="200" x2="95" y2="230" stroke="#6D0A1D" stroke-width="2"/>
            <polygon points="95,235 90,225 100,225" fill="#6D0A1D"/>
            <text x="95" y="145" font-family="'Cinzel',serif" font-size="10" fill="#6D0A1D" font-weight="700" text-anchor="middle">HEAD SOUTH (OPTIMAL)</text>
            <text x="200" y="85" font-family="'Cinzel',serif" font-size="10" fill="#A21C2B" font-weight="700" text-anchor="middle">HEAD NORTH (TABOO)</text>
            <line x1="165" y1="75" x2="235" y2="95" stroke="#A21C2B" stroke-width="2"/>
        </svg>`
    },

    // 6. Kitchen Vastu
    {
        toolId: 'kitchen-vastu',
        plateNumber: 'PLATE 06 / 20',
        category: 'CLASSICAL VASTU // 06',
        sanskrit: 'पाकशाला वास्तु • PĀKAŚĀLĀ',
        title: 'Kitchen Vastu',
        subtitle: 'Pākaśālā / Agnyāgāra & Thermal Balance',
        caption: 'Agni Southeast Sector & Fire-Water Separation Axis',
        desc: 'Calibrates the sacred Agni hearth in South-East (or North-West secondary). Evaluates stove placement, water sink distance, and cook facing East for metabolic harmony and vitality.',
        source: 'Mayamata 25.75–80; Mānasāra 36.45–52; Viśvakarma Prakāśa Ch. 5',
        attributes: ['Agni Corner Placement', 'Cook East Facing', 'Fire-Water Separation'],
        ctaText: 'Analyze Kitchen Hearth →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="40" width="220" height="220" rx="8" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.5"/>
            <rect x="150" y="150" width="110" height="110" fill="#B3791E" opacity="0.2" rx="4"/>
            <circle cx="205" cy="205" r="36" fill="#FFFFFF" stroke="#6D0A1D" stroke-width="2"/>
            <path d="M205 178 Q218 198 205 222 Q192 198 205 178 Z" fill="#6D0A1D"/>
            <path d="M205 190 Q212 202 205 216 Q198 202 205 190 Z" fill="#D4A045"/>
            <circle cx="205" cy="85" r="22" fill="#E8F4F8" stroke="#2B7A4B" stroke-width="1.5"/>
            <text x="205" y="90" font-family="'Cinzel',serif" font-size="9" fill="#2B7A4B" font-weight="700" text-anchor="middle">WATER</text>
            <text x="205" y="255" font-family="'Cinzel',serif" font-size="10" fill="#6D0A1D" font-weight="700" text-anchor="middle">AGNI ZONE (SE)</text>
        </svg>`
    },

    // 7. Toilet & Bathroom Vastu
    {
        toolId: 'toilet-bathroom-vastu',
        plateNumber: 'PLATE 07 / 20',
        category: 'CLASSICAL VASTU // 07',
        sanskrit: 'शौचालय वास्तु • ŚAUCĀLAYA',
        title: 'Toilet & Bathroom Vastu',
        subtitle: 'Śauca, Snāna & Utsarga Waste Dispersion',
        caption: 'Safe Depletion Quadrants & Strict Ishana Protection',
        desc: 'Evaluates waste commode placement in safe depletion zones (WNW, NW, SSW). Enforces strict prohibition against toilets in the sacred North-East (Īśāna) and central Brahmasthan.',
        source: 'Viśvakarma Prakāśa 5.88–95; Mayamata Ch. 25',
        attributes: ['Safe Depletion Zones', 'Zero-Ishana Violation', 'Non-Demolition Metal Waveguides'],
        ctaText: 'Analyze Waste Drainage →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="150" r="125" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.5"/>
            <path d="M150 150 L35 125 A125 125 0 0 1 45 95 Z" fill="#1B7340" opacity="0.35"/>
            <path d="M150 150 L115 265 A125 125 0 0 1 85 245 Z" fill="#1B7340" opacity="0.35"/>
            <path d="M150 150 L245 45 A125 125 0 0 1 265 115 Z" fill="#A21C2B" opacity="0.25"/>
            <line x1="195" y1="75" x2="235" y2="115" stroke="#A21C2B" stroke-width="3"/>
            <line x1="235" y1="75" x2="195" y2="115" stroke="#A21C2B" stroke-width="3"/>
            <text x="215" y="65" font-family="'Cinzel',serif" font-size="10" fill="#A21C2B" font-weight="700">NE FORBIDDEN</text>
            <text x="60" y="115" font-family="'Cinzel',serif" font-size="9" fill="#1B7340" font-weight="700">WNW SAFE</text>
            <circle cx="150" cy="150" r="12" fill="#6D0A1D"/>
        </svg>`
    },

    // 8. Puja Room Vastu
    {
        toolId: 'puja-room-vastu',
        plateNumber: 'PLATE 08 / 20',
        category: 'CLASSICAL VASTU // 08',
        sanskrit: 'देवगृह वास्तु • DEVAGṚHA',
        title: 'Puja Room Vastu',
        subtitle: 'Devagṛha & Sacred Īśāna Sanctum',
        caption: 'Sacred Northeast Vortex & Divine Altar Alignment',
        desc: 'Aligns the household shrine in the tranquil North-East (Īśāna). Evaluates deity facing, altar perimeter air gaps, and prayer orientation facing East or North for pure bio-cosmic charge.',
        source: 'Mayamata 25.75; Mānasāra 36.38–44; Manuṣyālaya Candrikā Ch. 3 & 7',
        attributes: ['Ishana Sacred Sanctum', 'East/North Prayer Stance', 'Wall Air Gap Isolation'],
        ctaText: 'Analyze Puja Altar →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="40" width="220" height="220" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.8"/>
            <rect x="150" y="40" width="110" height="110" fill="#6D0A1D" opacity="0.12"/>
            <circle cx="205" cy="95" r="38" fill="#FFFFFF" stroke="#D4A045" stroke-width="1.8"/>
            <circle cx="205" cy="95" r="16" fill="#6D0A1D"/>
            <polygon points="205,62 212,88 238,95 212,102 205,128 198,102 172,95 198,88" fill="#D4A045"/>
            <circle cx="205" cy="95" r="5" fill="#FFFFFF"/>
            <text x="205" y="150" font-family="'Cinzel',serif" font-size="10" fill="#6D0A1D" font-weight="700" text-anchor="middle">ĪŚĀNA SANCTUM</text>
            <text x="150" y="275" font-family="'Cinzel',serif" font-size="11" fill="#B3791E" font-weight="700" text-anchor="middle">EAST / NORTH PRAYER AXIS</text>
        </svg>`
    },

    // 9. Water Vastu
    {
        toolId: 'water-vastu',
        plateNumber: 'PLATE 09 / 20',
        category: 'CLASSICAL VASTU // 09',
        sanskrit: 'जल विन्यास • JALA VINYĀSA',
        title: 'Water Vastu',
        subtitle: 'Jala-Vinyāsa & Subterranean Dakārgala',
        caption: 'Subterranean Sump vs Overhead Mass Equilibrium',
        desc: 'Differential mass analysis: subterranean borewells/sumps in North-East for positive hydro-magnetic pull vs static overhead tanks in Southwest/West for structural mass stabilization.',
        source: 'Bṛhat Saṃhitā Ch. 54 (Dakārgala); Mayamata Ch. 25',
        attributes: ['Borewell in Northeast', 'Overhead Tank in SW', 'Dakargala Subterranean Flow'],
        ctaText: 'Analyze Water Systems →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <line x1="30" y1="160" x2="270" y2="160" stroke="#6D0A1D" stroke-width="2"/>
            <text x="150" y="152" font-family="'Cinzel',serif" font-size="9" fill="#888" text-anchor="middle">GROUND PLINTH LEVEL</text>
            <rect x="50" y="70" width="60" height="50" fill="#6D0A1D" stroke="#D4A045" stroke-width="2"/>
            <line x1="60" y1="120" x2="60" y2="160" stroke="#6D0A1D" stroke-width="3"/>
            <line x1="100" y1="120" x2="100" y2="160" stroke="#6D0A1D" stroke-width="3"/>
            <text x="80" y="100" font-family="'Cinzel',serif" font-size="9" fill="#FFFFFF" font-weight="700" text-anchor="middle">OVERHEAD</text>
            <text x="80" y="60" font-family="'Cinzel',serif" font-size="10" fill="#6D0A1D" font-weight="700" text-anchor="middle">SW (HEAVY)</text>
            <rect x="190" y="175" width="60" height="50" fill="#FAF6F0" stroke="#2B7A4B" stroke-width="2"/>
            <circle cx="220" cy="200" r="14" fill="#2B7A4B" opacity="0.4"/>
            <text x="220" y="245" font-family="'Cinzel',serif" font-size="10" fill="#2B7A4B" font-weight="700" text-anchor="middle">NE BOREWELL</text>
            <text x="150" y="280" font-family="'Cinzel',serif" font-size="11" fill="#B3791E" font-weight="700" text-anchor="middle">DIFFERENTIAL MASS EQUILIBRIUM</text>
        </svg>`
    },

    // 10. Staircase Vastu
    {
        toolId: 'staircase-vastu',
        plateNumber: 'PLATE 10 / 20',
        category: 'CLASSICAL VASTU // 10',
        sanskrit: 'सोपान विधि • SOPĀNA VIDHI',
        title: 'Staircase Vastu',
        subtitle: 'Sopāna-Vidhi & Clockwise Vertical Ascent',
        caption: 'Clockwise Pradakshina Spiral & Structural Gravity Load',
        desc: 'Analyzes heavy vertical circulation in South, West, or Southwest. Enforces clockwise ascent (Pradakshina), odd step counts, and strict prohibition of toilets or shrines under the stairs.',
        source: 'Samarāṅgaṇa Sūtradhāra 49.65–72; Śilparatna Ch. 16; Mānasāra Ch. 30',
        attributes: ['Clockwise Pradakshina', 'South/West Heavy Mass', 'Odd Step Count Rhythm'],
        ctaText: 'Analyze Vertical Ascent →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="150" r="120" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.5"/>
            <path d="M150 150 M150 110 A40 40 0 0 1 190 150 A60 60 0 0 1 130 210 A80 80 0 0 1 70 150 A100 100 0 0 1 170 50" 
                  fill="none" stroke="#6D0A1D" stroke-width="3" stroke-linecap="round"/>
            <polygon points="172,44 186,52 172,60" fill="#6D0A1D"/>
            <circle cx="150" cy="150" r="12" fill="#B3791E"/>
            <text x="150" y="260" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="middle">PRADAKSHINA (CLOCKWISE)</text>
            <text x="150" y="278" font-family="'Cinzel',serif" font-size="10" fill="#B3791E" font-weight="700" text-anchor="middle">ODD STEPS • S/W ANCHOR</text>
        </svg>`
    },

    // 11. Chaldean Name Number
    {
        toolId: 'name-number',
        plateNumber: 'PLATE 11 / 20',
        category: 'SACRED NUMEROLOGY // 11',
        sanskrit: 'नामांक शास्त्र • NĀMĀṄKA',
        title: 'Chaldean Name Number',
        subtitle: 'Cheiro 1–8 Phonetic Single & Compound Sum',
        caption: 'Historic 1–8 Acoustical Cipher (Number 9 Sacred Exemption)',
        desc: 'Calculates the pure acoustical vibration of your calling name using the historic 1–8 Chaldean cipher (with 9 held sacred). Reveals compound occult numbers (10–52) predicting career and financial tides.',
        source: "Cheiro's Book of Numbers (1926), Part I & II",
        attributes: ['Cheiro 1–8 Cipher', 'Single & Compound Vibrations', 'Compound Occult Meanings (10–52)'],
        ctaText: 'Calculate Name Number →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="150" r="125" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.5"/>
            <circle cx="150" cy="150" r="95" fill="#FFFFFF" stroke="#6D0A1D" stroke-width="1.2"/>
            <line x1="150" y1="55" x2="150" y2="245" stroke="#B3791E" stroke-width="1"/>
            <line x1="55" y1="150" x2="245" y2="150" stroke="#B3791E" stroke-width="1"/>
            <line x1="83" y1="83" x2="217" y2="217" stroke="#B3791E" stroke-width="1"/>
            <line x1="217" y1="83" x2="83" y2="217" stroke="#B3791E" stroke-width="1"/>
            <circle cx="150" cy="150" r="30" fill="#6D0A1D" stroke="#D4A045" stroke-width="2"/>
            <text x="150" y="157" font-family="'Cinzel',serif" font-size="18" fill="#FFFFFF" font-weight="800" text-anchor="middle">1–8</text>
            <text x="150" y="42" font-family="'Cinzel',serif" font-size="10" fill="#6D0A1D" font-weight="700" text-anchor="middle">NO. 9 HELD SACRED</text>
            <text x="150" y="275" font-family="'Cinzel',serif" font-size="11" fill="#B3791E" font-weight="700" text-anchor="middle">CHALDEAN ACOUSTIC MATRIX</text>
        </svg>`
    },

    // 12. Chaldean Name Analysis
    {
        toolId: 'name-analysis',
        plateNumber: 'PLATE 12 / 20',
        category: 'SACRED NUMEROLOGY // 12',
        sanskrit: 'स्वर-व्यंजन विश्लेषण • SVARA-VYAÑJANA',
        title: 'Chaldean Name Analysis',
        subtitle: 'Vowel (Soul Urge) vs Consonant (Personality)',
        caption: 'Vowel Soul Urge Matrix vs Consonant Social Persona',
        desc: 'Deconstructs names into vowel frequency (internal heart desires and private motivations) and consonant frequency (outward social expression), identifying cornerstone and capstone letters.',
        source: "Cheiro's Book of Numbers (Cheiro Tradition)",
        attributes: ['Heart Desire (Vowels)', 'Outer Persona (Consonants)', 'Cornerstone & Capstone Letters'],
        ctaText: 'Run Name Analysis →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="150" r="122" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.5"/>
            <circle cx="150" cy="150" r="95" fill="#FFFFFF" stroke="#6D0A1D" stroke-width="2"/>
            <circle cx="150" cy="150" r="54" fill="#6D0A1D" stroke="#D4A045" stroke-width="2"/>
            <text x="150" y="145" font-family="'Cinzel',serif" font-size="11" fill="#FAF6F0" font-weight="700" text-anchor="middle">VOWELS</text>
            <text x="150" y="162" font-family="'Cinzel',serif" font-size="10" fill="#D4A045" font-weight="600" text-anchor="middle">SOUL URGE</text>
            <text x="150" y="80" font-family="'Cinzel',serif" font-size="10" fill="#6D0A1D" font-weight="700" text-anchor="middle">CONSONANTS (PERSONA)</text>
            <text x="150" y="275" font-family="'Cinzel',serif" font-size="11" fill="#B3791E" font-weight="700" text-anchor="middle">CORNERSTONE &amp; CAPSTONE</text>
        </svg>`
    },

    // 13. Life Path Number
    {
        toolId: 'life-path',
        plateNumber: 'PLATE 13 / 20',
        category: 'SACRED NUMEROLOGY // 13',
        sanskrit: 'मूलांक पथ • MŪLĀṄKA PATHA',
        title: 'Life Path Number',
        subtitle: 'The Ruling Number (Birth Ephemeris)',
        caption: 'Pythagorean Triple-Reduction & Master Numbers 11, 22, 33',
        desc: 'Synthesizes your complete date of birth using the Pythagorean triple-reduction method while preserving sacred Master Numbers 11, 22, and 33. Outlines your lifelong spiritual curriculum and challenges.',
        source: "Dr. David A. Phillips, The Complete Book of Numerology (Ch. 5)",
        attributes: ['Master Numbers 11/22/33', 'Triple-Reduction Protocol', 'Lifelong Ephemeris Path'],
        ctaText: 'Calculate Life Path →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="150" r="125" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.2"/>
            <polygon points="150,45 240,215 60,215" fill="none" stroke="#6D0A1D" stroke-width="1.8"/>
            <circle cx="150" cy="45" r="16" fill="#6D0A1D" stroke="#D4A045" stroke-width="1.5"/>
            <text x="150" y="51" font-family="'Cinzel',serif" font-size="11" fill="#FFFFFF" font-weight="800" text-anchor="middle">11</text>
            <circle cx="240" cy="215" r="16" fill="#6D0A1D" stroke="#D4A045" stroke-width="1.5"/>
            <text x="240" y="221" font-family="'Cinzel',serif" font-size="11" fill="#FFFFFF" font-weight="800" text-anchor="middle">22</text>
            <circle cx="60" cy="215" r="16" fill="#6D0A1D" stroke="#D4A045" stroke-width="1.5"/>
            <text x="60" y="221" font-family="'Cinzel',serif" font-size="11" fill="#FFFFFF" font-weight="800" text-anchor="middle">33</text>
            <circle cx="150" cy="155" r="28" fill="#FFFFFF" stroke="#B3791E" stroke-width="2"/>
            <text x="150" y="161" font-family="'Cinzel',serif" font-size="14" fill="#6D0A1D" font-weight="800" text-anchor="middle">LIFE PATH</text>
            <text x="150" y="265" font-family="'Cinzel',serif" font-size="11" fill="#B3791E" font-weight="700" text-anchor="middle">TRIPLE-REDUCTION PROTOCOL</text>
        </svg>`
    },

    // 14. Birth Day Number
    {
        toolId: 'birth-number',
        plateNumber: 'PLATE 14 / 20',
        category: 'SACRED NUMEROLOGY // 14',
        sanskrit: 'जन्मांक सौर • JANMĀṄKA',
        title: 'Birth Day Number',
        subtitle: 'Day of Month Solar Vibration (Moolank)',
        caption: 'Direct Solar Archetype of Birth Day (1–31)',
        desc: 'Extracts the direct solar archetype of the day you entered the world (1–31), mapping your core instinctive traits, quick reflex reactions, and governing planetary lord without year distortion.',
        source: "Dr. David A. Phillips (Ch. 4); Harish Johari",
        attributes: ['Solar Day Archetype', 'Core Instinctive Persona', 'Planetary Lord Alignment'],
        ctaText: 'Calculate Birth Number →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="150" r="125" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.2"/>
            <g stroke="#B3791E" stroke-width="2">
                <line x1="150" y1="40" x2="150" y2="70"/>
                <line x1="150" y1="230" x2="150" y2="260"/>
                <line x1="40" y1="150" x2="70" y2="150"/>
                <line x1="230" y1="150" x2="260" y2="150"/>
                <line x1="72" y1="72" x2="94" y2="94"/>
                <line x1="206" y1="206" x2="228" y2="228"/>
                <line x1="228" y1="72" x2="206" y2="94"/>
                <line x1="94" y1="206" x2="72" y2="228"/>
            </g>
            <circle cx="150" cy="150" r="55" fill="#6D0A1D" stroke="#D4A045" stroke-width="2.5"/>
            <text x="150" y="146" font-family="'Cinzel',serif" font-size="14" fill="#FFFFFF" font-weight="700" text-anchor="middle">SOLAR DAY</text>
            <text x="150" y="166" font-family="'Cinzel',serif" font-size="16" fill="#D4A045" font-weight="800" text-anchor="middle">1–31</text>
            <text x="150" y="278" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="middle">RAW INSTINCTIVE FREQUENCY</text>
        </svg>`
    },

    // 15. Destiny / Expression Number
    {
        toolId: 'destiny-number',
        plateNumber: 'PLATE 15 / 20',
        category: 'SACRED NUMEROLOGY // 15',
        sanskrit: 'भाग्यांक विस्तार • BHĀGYĀṄKA',
        title: 'Destiny / Expression Number',
        subtitle: 'Full Birth Certificate Name Expression',
        caption: 'Complete 1–9 Western Cipher Karmic Mission',
        desc: 'Calculates your lifelong karmic mission and innate vocational talents using the complete sequential 1–9 Western Pythagorean cipher across your full birth certificate name, honoring Master Numbers.',
        source: "Dr. David A. Phillips (Ch. 9); Florence Campbell (1931)",
        attributes: ['Full Certificate Name', 'Sequential 1–9 Cipher', 'Karmic Mission Mapping'],
        ctaText: 'Calculate Destiny Number →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="40" width="220" height="220" rx="12" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.8"/>
            <polygon points="150,55 220,185 80,185" fill="#FFFFFF" stroke="#6D0A1D" stroke-width="2"/>
            <line x1="105" y1="140" x2="195" y2="140" stroke="#B3791E" stroke-width="1.2"/>
            <line x1="128" y1="98" x2="172" y2="98" stroke="#B3791E" stroke-width="1.2"/>
            <circle cx="150" cy="78" r="8" fill="#6D0A1D"/>
            <circle cx="150" cy="150" r="24" fill="#FAF6F0" stroke="#D4A045" stroke-width="1.5"/>
            <text x="150" y="156" font-family="'Cinzel',serif" font-size="13" fill="#6D0A1D" font-weight="800" text-anchor="middle">1–9</text>
            <text x="150" y="225" font-family="'Cinzel',serif" font-size="12" fill="#6D0A1D" font-weight="700" text-anchor="middle">VOCATIONAL TALENT</text>
            <text x="150" y="245" font-family="'Cinzel',serif" font-size="10" fill="#B3791E" font-weight="600" text-anchor="middle">MASTER 11 / 22 / 33 HONORED</text>
        </svg>`
    },

    // 16. Lucky Number Matrix
    {
        toolId: 'lucky-number',
        plateNumber: 'PLATE 16 / 20',
        category: 'SACRED NUMEROLOGY // 16',
        sanskrit: 'शुभ अंक चक्र • ŚUBHA AṄKA',
        title: 'Lucky Number Matrix',
        subtitle: 'Harmonic Triad Cross-Tabulation',
        caption: 'Harmonic Triads, Planetary Rulers & Dissonance Avoidance',
        desc: 'Determines harmonic, neutral, and conflicting numbers by cross-referencing your Life Path ruler, Birth Day frequency, and expression vibrations using classical Pythagorean harmony.',
        source: 'Pythagorean Harmonic Quadrivium & Tetrabiblos',
        attributes: ['Harmonic Number Triads', 'Conflicting Date Avoidance', 'Auspicious Timing Horizon'],
        ctaText: 'Open Lucky Matrix →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <rect x="45" y="45" width="210" height="210" rx="8" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.5"/>
            <line x1="115" y1="45" x2="115" y2="255" stroke="#B3791E" stroke-width="1.2"/>
            <line x1="185" y1="45" x2="185" y2="255" stroke="#B3791E" stroke-width="1.2"/>
            <line x1="45" y1="115" x2="255" y2="115" stroke="#B3791E" stroke-width="1.2"/>
            <line x1="45" y1="185" x2="255" y2="185" stroke="#B3791E" stroke-width="1.2"/>
            <circle cx="80" cy="80" r="16" fill="#1B7340" opacity="0.8"/>
            <text x="80" y="85" font-family="'Cinzel',serif" font-size="12" fill="#FFFFFF" font-weight="700" text-anchor="middle">3</text>
            <circle cx="150" cy="150" r="22" fill="#6D0A1D"/>
            <text x="150" y="156" font-family="'Cinzel',serif" font-size="15" fill="#FFFFFF" font-weight="800" text-anchor="middle">7</text>
            <circle cx="220" cy="220" r="16" fill="#1B7340" opacity="0.8"/>
            <text x="220" y="225" font-family="'Cinzel',serif" font-size="12" fill="#FFFFFF" font-weight="700" text-anchor="middle">9</text>
            <text x="150" y="278" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="middle">HARMONIC TRIAD NEXUS</text>
        </svg>`
    },

    // 17. Mobile Number Analyzer
    {
        toolId: 'mobile-number',
        plateNumber: 'PLATE 17 / 20',
        category: 'SACRED NUMEROLOGY // 17',
        sanskrit: 'दूरसंचार तरंग • DŪRASAÑCĀRA',
        title: 'Mobile Number Analyzer',
        subtitle: '10-Digit Telecommunication Vibration',
        caption: 'Modern Practitioner Methodology • High-Frequency Digit Strings',
        desc: 'Modern Practitioner Methodology: Evaluates total digit sum, terminal calling aura, and consecutive pair transitions using planetary friendship (Mitra-Shatru) for business and charisma.',
        source: 'Modern Practitioner Methodology (Telecommunications)',
        attributes: ['Terminal Digit Aura', 'Consecutive Pair Transitions', 'Planetary Mitra-Shatru'],
        ctaText: 'Analyze Mobile Number →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <rect x="95" y="45" width="110" height="210" rx="18" fill="#FAF6F0" stroke="#6D0A1D" stroke-width="2"/>
            <rect x="108" y="68" width="84" height="140" rx="6" fill="#FFFFFF" stroke="#B3791E" stroke-width="1"/>
            <path d="M125 100 Q150 82 175 100" stroke="#B3791E" stroke-width="2" fill="none"/>
            <path d="M120 120 Q150 95 180 120" stroke="#B3791E" stroke-width="2" fill="none"/>
            <circle cx="150" cy="155" r="18" fill="#6D0A1D"/>
            <text x="150" y="161" font-family="'Cinzel',serif" font-size="14" fill="#FFFFFF" font-weight="700" text-anchor="middle">10D</text>
            <circle cx="150" cy="232" r="8" fill="none" stroke="#6D0A1D" stroke-width="1.5"/>
            <text x="150" y="278" font-family="'Cinzel',serif" font-size="10" fill="#B3791E" font-weight="700" text-anchor="middle">MODERN TELECOM VIBRATION</text>
        </svg>`
    },

    // 18. Vehicle Number Analyzer
    {
        toolId: 'vehicle-number',
        plateNumber: 'PLATE 18 / 20',
        category: 'SACRED NUMEROLOGY // 18',
        sanskrit: 'यान अंक रक्षा • YĀNA AṄKA',
        title: 'Vehicle Number Analyzer',
        subtitle: 'Automotive Kinetic Dynamics & Safety',
        caption: 'Modern Practitioner Methodology • Kinetic Travel Shielding',
        desc: 'Modern Practitioner Methodology: Deconstructs license plate registration characters into kinetic vibrational roots aligned with the vehicle owner’s Life Path for accident deflection.',
        source: 'Modern Practitioner Methodology (Automotive Dynamics)',
        attributes: ['License Plate Deconstruction', 'Driver Life Path Resonance', 'Kinetic Travel Shielding'],
        ctaText: 'Analyze Vehicle Plate →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="150" r="122" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.5"/>
            <polygon points="150,55 225,95 225,185 150,240 75,185 75,95" fill="#FFFFFF" stroke="#6D0A1D" stroke-width="2"/>
            <rect x="100" y="125" width="100" height="40" rx="4" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.5"/>
            <text x="150" y="148" font-family="'Cinzel',serif" font-size="12" fill="#6D0A1D" font-weight="800" text-anchor="middle">DL 01 AA</text>
            <circle cx="150" cy="85" r="8" fill="#B3791E"/>
            <text x="150" y="270" font-family="'Cinzel',serif" font-size="10" fill="#B3791E" font-weight="700" text-anchor="middle">AUTOMOTIVE DEFLECTION SHIELD</text>
        </svg>`
    },

    // 19. Business Name Numerology
    {
        toolId: 'business-name',
        plateNumber: 'PLATE 19 / 20',
        category: 'SACRED NUMEROLOGY // 19',
        sanskrit: 'वाणिज्य नाम शुद्धि • VĀṆIJYA NĀMA',
        title: 'Business Name Numerology',
        subtitle: 'Corporate Trademark & Industry Category',
        caption: 'Modern Practitioner Methodology • Corporate Trademark Resonance',
        desc: 'Modern Practitioner Methodology: Evaluates commercial company brand names against specific industry sectors (Tech, Finance, Luxury, Media, Real Estate) to catalyze market traction.',
        source: 'Modern Practitioner Methodology (Corporate Nomenclature)',
        attributes: ['Industry Sector Matrix', 'Compound Enterprise Root', 'Fundraising Magnetism'],
        ctaText: 'Analyze Corporate Brand →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <polygon points="150,45 235,95 235,195 150,245 65,195 65,95" fill="#FAF6F0" stroke="#6D0A1D" stroke-width="2"/>
            <polygon points="150,70 210,105 210,185 150,220 90,185 90,105" fill="#FFFFFF" stroke="#B3791E" stroke-width="1.2"/>
            <text x="150" y="152" font-family="'Cinzel',serif" font-size="28" fill="#6D0A1D" font-weight="800" text-anchor="middle">₹</text>
            <text x="150" y="172" font-family="'Cinzel',serif" font-size="9" fill="#B3791E" font-weight="700" text-anchor="middle">GROWTH MATRIX</text>
            <text x="150" y="270" font-family="'Cinzel',serif" font-size="10" fill="#B3791E" font-weight="700" text-anchor="middle">CORPORATE TRADEMARK HARMONICS</text>
        </svg>`
    },

    // 20. Name + DOB Compatibility
    {
        toolId: 'name-dob-compatibility',
        plateNumber: 'PLATE 20 / 20',
        category: 'SACRED NUMEROLOGY // 20',
        sanskrit: 'सामञ्जस्य चक्र • SĀMAÑJASYA',
        title: 'Name + DOB Compatibility',
        subtitle: 'Interpersonal Synchronicity (0–100%)',
        caption: 'Modern Practitioner Methodology • Synastry Matrix & Dual Resonance',
        desc: 'Modern Practitioner Methodology: Evaluates relationship resonance between two individuals by cross-referencing Life Path (60%) and Name Expression (40%) across emotional and business axes.',
        source: 'Modern Practitioner Methodology (Synastry Matrix)',
        attributes: ['0–100% Harmonic Score', 'Life Path 60% Weighting', 'Name Expression 40% Weighting'],
        ctaText: 'Calculate Dual Resonance →',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <circle cx="115" cy="150" r="75" fill="#6D0A1D" opacity="0.15" stroke="#6D0A1D" stroke-width="2"/>
            <circle cx="185" cy="150" r="75" fill="#B3791E" opacity="0.15" stroke="#B3791E" stroke-width="2"/>
            <path d="M150 96 A75 75 0 0 1 150 204 A75 75 0 0 1 150 96 Z" fill="#D4A045" opacity="0.45"/>
            <circle cx="150" cy="150" r="16" fill="#6D0A1D"/>
            <text x="150" y="155" font-family="'Cinzel',serif" font-size="12" fill="#FFFFFF" font-weight="800" text-anchor="middle">∞</text>
            <text x="90" y="154" font-family="'Cinzel',serif" font-size="9" fill="#6D0A1D" font-weight="700">PERSON A</text>
            <text x="210" y="154" font-family="'Cinzel',serif" font-size="9" fill="#B3791E" font-weight="700">PERSON B</text>
            <text x="150" y="260" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="middle">60% LIFE PATH • 40% NAME</text>
            <text x="150" y="278" font-family="'Cinzel',serif" font-size="10" fill="#B3791E" font-weight="600" text-anchor="middle">0–100% SYNCHRONICITY</text>
        </svg>`
    }
];

/**
 * BOOK 3: Dedicated Vastu Consultation Paths (6 Pages)
 */
const VASTU_PATHS_PAGES = [
    {
        plateNumber: 'PATH 01',
        category: 'PATH 01 // RESIDENTIAL',
        sanskrit: 'गृह वास्तु • GRIHA VASTU',
        title: 'Residential Sanctuaries',
        caption: 'Flats, Builder Floors & Luxury Architectural Villas',
        desc: 'Calibrate master bedroom alignments for rejuvenating sleep, optimize kitchen fire zones for digestive vitality, and eliminate family disputes through precise non-demolition elemental balancing.',
        attributes: ['Family Harmony', 'Sleep & Vitality', 'Entrance Correction'],
        ctaText: 'Book Free Home Review →',
        ctaLink: 'pages/consultations.html',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <polygon points="150,45 50,120 250,120" fill="#6D0A1D" stroke="#D4A045" stroke-width="1.5"/>
            <rect x="70" y="120" width="160" height="130" fill="#FAF6F0" stroke="#6D0A1D" stroke-width="2"/>
            <rect x="125" y="170" width="50" height="80" fill="#6D0A1D"/>
            <circle cx="165" cy="210" r="3" fill="#D4A045"/>
            <rect x="90" y="140" width="30" height="30" fill="#FFFFFF" stroke="#B3791E" stroke-width="1.2"/>
            <rect x="180" y="140" width="30" height="30" fill="#FFFFFF" stroke="#B3791E" stroke-width="1.2"/>
            <text x="150" y="275" font-family="'Cinzel',serif" font-size="11" fill="#B3791E" font-weight="700" text-anchor="middle">RESIDENTIAL EQUILIBRIUM</text>
        </svg>`
    },
    {
        plateNumber: 'PATH 02',
        category: 'PATH 02 // CORPORATE',
        sanskrit: 'वाणिज्य वास्तु • VYAPAR VASTU',
        title: 'Corporate & Workspaces',
        caption: 'Executive Suites, Boardrooms & Tech Campuses',
        desc: 'Leadership seating orientation in the commanding South-West, reception energy current calibration, and conference table alignment. Maximize team cohesion, talent retention, and high-velocity deal closures.',
        attributes: ['Executive Seating', 'Talent Retention', 'High-Velocity Deals'],
        ctaText: 'Book Free Office Review →',
        ctaLink: 'pages/consultations.html',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <rect x="70" y="50" width="160" height="210" fill="#FAF6F0" stroke="#6D0A1D" stroke-width="2"/>
            <line x1="70" y1="90" x2="230" y2="90" stroke="#B3791E" stroke-width="1"/>
            <line x1="70" y1="130" x2="230" y2="130" stroke="#B3791E" stroke-width="1"/>
            <line x1="70" y1="170" x2="230" y2="170" stroke="#B3791E" stroke-width="1"/>
            <line x1="70" y1="210" x2="230" y2="210" stroke="#B3791E" stroke-width="1"/>
            <line x1="150" y1="50" x2="150" y2="260" stroke="#B3791E" stroke-width="1"/>
            <circle cx="150" cy="70" r="12" fill="#6D0A1D"/>
            <text x="150" y="74" font-family="'Cinzel',serif" font-size="9" fill="#FFFFFF" font-weight="700" text-anchor="middle">CEO</text>
            <text x="150" y="280" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="middle">CORPORATE ALIGNMENT</text>
        </svg>`
    },
    {
        plateNumber: 'PATH 03',
        category: 'PATH 03 // INDUSTRIAL',
        sanskrit: 'उद्योग वास्तु • UDYOG VASTU',
        title: 'Industrial & Factories',
        caption: 'Machinery Load Balance, Furnaces & Raw Material Flow',
        desc: 'Heavy machinery load distribution in South-West, raw material intake through North-West, boiler and transformer alignment in South-East, and wastewater gradient alignment to prevent catastrophic halts.',
        attributes: ['Machinery Load Balance', 'Zero Machine Halts', 'Worker Safety Grid'],
        ctaText: 'Book Free Factory Review →',
        ctaLink: 'pages/consultations.html',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="110" width="220" height="140" fill="#FAF6F0" stroke="#6D0A1D" stroke-width="2"/>
            <polygon points="40,110 80,60 120,110" fill="#6D0A1D" opacity="0.2"/>
            <polygon points="120,110 160,60 200,110" fill="#6D0A1D" opacity="0.2"/>
            <polygon points="200,110 240,60 260,110" fill="#6D0A1D" opacity="0.2"/>
            <circle cx="100" cy="175" r="28" fill="none" stroke="#B3791E" stroke-width="3" stroke-dasharray="4 2"/>
            <circle cx="100" cy="175" r="10" fill="#6D0A1D"/>
            <rect x="160" y="150" width="70" height="50" rx="4" fill="#FFFFFF" stroke="#B3791E" stroke-width="1.5"/>
            <text x="150" y="275" font-family="'Cinzel',serif" font-size="11" fill="#B3791E" font-weight="700" text-anchor="middle">MANUFACTURING FLOW</text>
        </svg>`
    },
    {
        plateNumber: 'PATH 04',
        category: 'PATH 04 // RETAIL',
        sanskrit: 'आपण वास्तु • AAPANA VASTU',
        title: 'Commercial & Retail Showrooms',
        caption: 'Customer Circulation Currents & Wealth Cash Counters',
        desc: 'Strategic cash register placement in the wealth meridian, customer circulation currents, optical merchandising lighting, and entryway vortexes that convert casual footfall into consistent high-ticket sales.',
        attributes: ['Cash Counter Placement', 'Customer Footfall', 'High Conversion'],
        ctaText: 'Book Free Retail Review →',
        ctaLink: 'pages/consultations.html',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <rect x="45" y="45" width="210" height="210" rx="10" fill="#FAF6F0" stroke="#B3791E" stroke-width="1.5"/>
            <path d="M70 230 C70 120, 230 180, 230 70" stroke="#6D0A1D" stroke-width="2.5" fill="none" stroke-dasharray="5 4"/>
            <circle cx="70" cy="230" r="14" fill="#6D0A1D"/>
            <text x="70" y="234" font-family="'Cinzel',serif" font-size="9" fill="#FFFFFF" font-weight="700" text-anchor="middle">IN</text>
            <circle cx="230" cy="70" r="16" fill="#D4A045"/>
            <text x="230" y="74" font-family="'Cinzel',serif" font-size="9" fill="#6D0A1D" font-weight="800" text-anchor="middle">$$$</text>
            <text x="150" y="275" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="middle">FOOTFALL CIRCULATION</text>
        </svg>`
    },
    {
        plateNumber: 'PATH 05',
        category: 'PATH 05 // DEVELOPERS B2B',
        sanskrit: 'नगर वास्तु • NAGARA VASTU',
        title: 'Real Estate Developers B2B',
        caption: 'Masterplanned Townships, Tower Elevations & Clubhouse Zoning',
        desc: 'Pre-construction masterplanning for high-rise residential towers, plotted townships, and commercial hubs. Ensure 100% Vastu compliance across your master inventory to accelerate pre-sales velocity.',
        attributes: ['Township Masterplanning', '100% Compliant Units', 'Accelerated Pre-Sales'],
        ctaText: 'Book Free B2B Review →',
        ctaLink: 'pages/consultations.html',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="100" width="60" height="150" fill="#FAF6F0" stroke="#6D0A1D" stroke-width="1.5"/>
            <rect x="120" y="50" width="70" height="200" fill="#FFFFFF" stroke="#6D0A1D" stroke-width="2"/>
            <rect x="210" y="120" width="55" height="130" fill="#FAF6F0" stroke="#6D0A1D" stroke-width="1.5"/>
            <line x1="135" y1="75" x2="175" y2="75" stroke="#B3791E" stroke-width="1"/>
            <line x1="135" y1="105" x2="175" y2="105" stroke="#B3791E" stroke-width="1"/>
            <line x1="135" y1="135" x2="175" y2="135" stroke="#B3791E" stroke-width="1"/>
            <line x1="135" y1="165" x2="175" y2="165" stroke="#B3791E" stroke-width="1"/>
            <circle cx="155" cy="20" r="10" fill="#D4A045"/>
            <text x="150" y="275" font-family="'Cinzel',serif" font-size="11" fill="#B3791E" font-weight="700" text-anchor="middle">MASTERPLAN ARCHITECTURE</text>
        </svg>`
    },
    {
        plateNumber: 'PATH 06',
        category: 'PATH 06 // GLOBAL REMOTE',
        sanskrit: 'विश्व वास्तु • VISHWA VASTU',
        title: 'Global Remote Blueprint Audits',
        caption: 'High-Definition CAD & Satellite Coordinate Analysis',
        desc: 'Comprehensive distance consultations for clients worldwide in the USA, UK, UAE, and Singapore. Full energy audits performed via Google Earth coordinates, architectural CAD layers, and video walkthroughs.',
        attributes: ['Global Reach', 'Satellite Degree Calibration', '100% Remote Deliverables'],
        ctaText: 'Book Global Consultation →',
        ctaLink: 'pages/consultations.html',
        svg: `<svg viewBox="0 0 300 300" class="sb-plate-vector" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="150" r="120" fill="#FAF6F0" stroke="#6D0A1D" stroke-width="2"/>
            <ellipse cx="150" cy="150" rx="120" ry="45" fill="none" stroke="#B3791E" stroke-width="1.2" stroke-dasharray="3 3"/>
            <ellipse cx="150" cy="150" rx="45" ry="120" fill="none" stroke="#B3791E" stroke-width="1.2" stroke-dasharray="3 3"/>
            <line x1="30" y1="150" x2="270" y2="150" stroke="#6D0A1D" stroke-width="1"/>
            <line x1="150" y1="30" x2="150" y2="270" stroke="#6D0A1D" stroke-width="1"/>
            <circle cx="150" cy="150" r="14" fill="#D4A045"/>
            <circle cx="150" cy="150" r="4" fill="#6D0A1D"/>
            <text x="150" y="280" font-family="'Cinzel',serif" font-size="11" fill="#6D0A1D" font-weight="700" text-anchor="middle">INTERNATIONAL LATITUDE GRID</text>
        </svg>`
    }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. MODULAR SACRED SKETCHBOOK CLASS
// ─────────────────────────────────────────────────────────────────────────────

class SacredSketchbook {
    /**
     * @param {string} containerId - Element ID for mounting
     * @param {Array<Object>} pagesData - Array of page items
     * @param {Object} options - Configuration options
     */
    constructor(containerId, pagesData, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.warn(`[SacredSketchbook] Container #${containerId} not found.`);
            return;
        }

        this.rawPages = Array.isArray(pagesData) ? pagesData : [];
        this.filteredPages = [...this.rawPages];
        this.total = this.filteredPages.length;
        this.currentIndex = 0;
        this.isTurning = false;
        this.activeCategory = 'ALL';

        this.options = Object.assign({
            autoPlay: false,
            autoPlayInterval: 6500,
            enableTabs: true,
            enableKeyboard: true,
            enableSwipe: true,
            initialIndex: 0
        }, options);

        this.prefersReducedMotion = (typeof window !== 'undefined' && typeof window.matchMedia === 'function') 
            ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
            : false;
        this.autoPlayTimer = null;

        this.init();
    }

    init() {
        if (this.total === 0) return;
        this.buildDOM();
        this.bindEvents();
        this.renderSpread(this.currentIndex);

        if (this.options.autoPlay) {
            this.startAutoPlay();
        }
    }

    /**
     * Extract unique categories for tab filtering
     */
    getCategories() {
        const set = new Set();
        this.rawPages.forEach(p => {
            if (p.category) {
                const mainCat = p.category.split('//')[0].trim().replace(/\d+/g, '').replace(/•/g, '').trim();
                if (mainCat) set.add(mainCat);
            }
        });
        return Array.from(set);
    }

    buildDOM() {
        const categories = this.getCategories();
        const showTabs = this.options.enableTabs && categories.length > 1;

        let tabsHTML = '';
        if (showTabs) {
            tabsHTML = `
                <div class="sb-tabs-header" role="tablist" aria-label="Book Chapters">
                    <button class="sb-tab-pill active" data-filter="ALL" role="tab" aria-selected="true">
                        ALL (${this.rawPages.length})
                    </button>
                    ${categories.map(cat => `
                        <button class="sb-tab-pill" data-filter="${cat}" role="tab" aria-selected="false">
                            ${cat}
                        </button>
                    `).join('')}
                </div>
            `;
        }

        this.container.innerHTML = `
            <div class="sb-component-wrapper" tabindex="0" role="region" aria-roledescription="Interactive Sketchbook" aria-label="Sacred Vedic Sketchbook">
                ${tabsHTML}
                <div class="sb-stage-frame">
                    <!-- Ground Ambient Shadows -->
                    <div class="sb-shadow-pool" aria-hidden="true"></div>
                    <div class="sb-contact-shadow" aria-hidden="true"></div>

                    <!-- Navigation Arrow: Previous -->
                    <button class="sb-nav-arrow prev" aria-label="Previous folio spread" title="Previous page">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <!-- Open Sketchbook Chassis with Leather Trim & Gilded Edges -->
                    <div class="sb-book-chassis">
                        <!-- Gilded Foil Outer Page Thickness -->
                        <div class="sb-gilded-edge-left" aria-hidden="true"></div>
                        <div class="sb-gilded-edge-right" aria-hidden="true"></div>

                        <!-- Sacred Spine, Center Stitches & Rivets -->
                        <div class="sb-center-spine" aria-hidden="true"></div>
                        <div class="sb-spine-rivet top" aria-hidden="true"></div>
                        <div class="sb-spine-rivet bottom" aria-hidden="true"></div>

                        <!-- Dynamic Gutters & Ambient Occlusion -->
                        <div class="sb-gutter-left" aria-hidden="true"></div>
                        <div class="sb-gutter-right" aria-hidden="true"></div>

                        <!-- Brass Hanging Ribbon Bookmark -->
                        <!-- Brass Hanging Ribbon Bookmark Removed -->

                        <!-- Left Page: Archival Visual Plate -->
                        <div class="sb-page-half left" id="${this.container.id}-left-page"></div>

                        <!-- Right Page: Luxury Editorial Journal -->
                        <div class="sb-page-half right" id="${this.container.id}-right-page"></div>

                        <!-- Flipping 3D Leaf Layer -->
                        <div class="sb-flipping-leaf" style="display:none;" aria-hidden="true">
                            <div class="sb-leaf-face front">
                                <div class="sb-leaf-shadow-overlay"></div>
                            </div>
                            <div class="sb-leaf-face back">
                                <div class="sb-leaf-shadow-overlay"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation Arrow: Next -->
                    <button class="sb-nav-arrow next" aria-label="Next folio spread" title="Next page">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>

                <!-- Bottom Toolbar & Direct Folio Navigation -->
                <div class="sb-toolbar-strip">
                    <div class="sb-folio-jump-wrap">
                        <label for="${this.container.id}-folio-select" class="sb-jump-label">📖 Jump to Tool:</label>
                        <select id="${this.container.id}-folio-select" class="sb-jump-select" aria-label="Select Tool Folio"></select>
                    </div>
                    <div class="sb-plate-dots" role="tablist" aria-label="Page Directory"></div>
                </div>
                <div class="sb-nav-hint">
                    Drag or swipe page • Click flanking brass arrows • Keyboard ← → keys
                </div>
            </div>
        `;

        this.wrapperEl = this.container.querySelector('.sb-component-wrapper');
        this.leftPageEl = this.container.querySelector(`#${this.container.id}-left-page`);
        this.rightPageEl = this.container.querySelector(`#${this.container.id}-right-page`);
        this.flippingLeafEl = this.container.querySelector('.sb-flipping-leaf');
        this.leafFrontEl = this.flippingLeafEl.querySelector('.front');
        this.leafBackEl = this.flippingLeafEl.querySelector('.back');
        this.leafFrontShadow = this.leafFrontEl.querySelector('.sb-leaf-shadow-overlay');
        this.leafBackShadow = this.leafBackEl.querySelector('.sb-leaf-shadow-overlay');
        this.chassisEl = this.container.querySelector('.sb-book-chassis');
        this.prevBtn = this.container.querySelector('.sb-nav-arrow.prev');
        this.nextBtn = this.container.querySelector('.sb-nav-arrow.next');
        this.dotsContainer = this.container.querySelector('.sb-plate-dots');
        this.folioSelectEl = this.container.querySelector('.sb-jump-select');
        this.ribbonEl = this.container.querySelector('.sb-ribbon-bookmark');
        this.tabsHeader = this.container.querySelector('.sb-tabs-header');

        this.renderDots();
    }

    renderDots() {
        if (this.dotsContainer) {
            this.dotsContainer.innerHTML = this.filteredPages.map((p, i) => `
                <button class="sb-plate-dot ${i === this.currentIndex ? 'active' : ''}" 
                        data-index="${i}" 
                        aria-label="Folio ${i + 1}: ${p.title}"
                        role="tab"
                        aria-selected="${i === this.currentIndex ? 'true' : 'false'}"></button>
            `).join('');
        }
        if (this.folioSelectEl) {
            this.folioSelectEl.innerHTML = this.filteredPages.map((p, i) => `
                <option value="${i}" ${i === this.currentIndex ? 'selected' : ''}>
                    ${String(i + 1).padStart(2, '0')}. ${p.title}
                </option>
            `).join('');
        }
    }

    renderLeftHTML(data) {
        return `
            <div class="sb-plate-frame">
                <span class="sb-plate-corner-tl">✦</span>
                <span class="sb-plate-corner-tr">✦</span>
                <span class="sb-plate-corner-bl">✦</span>
                <span class="sb-plate-corner-br">✦</span>
                <div class="sb-plate-header">
                    <span>${data.plateNumber}</span>
                    <span>VASTU DIVINE • ARCHIVE</span>
                </div>
                <div class="sb-plate-canvas">
                    ${data.svg}
                </div>
                <div class="sb-plate-caption-tag">
                    ${data.caption}
                </div>
            </div>
        `;
    }

    renderRightHTML(data, index) {
        const attrChips = (data.attributes || []).map(attr => `
            <span class="sb-attr-chip"><span>✦</span> ${attr}</span>
        `).join('');

        const ctaBtn = data.toolId 
            ? `<button type="button" class="sb-cta-btn" onclick="openToolDirectly('${data.toolId}')">${data.ctaText || 'Launch Calculator →'}</button>`
            : `<a href="${data.ctaLink || '#'}" class="sb-cta-btn">${data.ctaText || 'Explore Path →'}</a>`;

        const sourceTag = data.source ? `
            <div class="sb-source-tag" style="font-size: 0.74rem; font-style: italic; color: #8C5B09; margin-top: 2px; margin-bottom: 4px; border-left: 2px solid #B3791E; padding-left: 6px; line-height: 1.35;">
                <strong style="color: #6D0A1D; font-style: normal;">Treatise Canon:</strong> ${data.source}
            </div>
        ` : '';

        return `
            <div class="sb-editorial-content">
                <div class="sb-content-top">
                    <div class="sb-folio-bar">
                        <span>SACRED CONTINUUM</span>
                        <span>FOLIO ${String(index + 1).padStart(2, '0')} / ${String(this.total).padStart(2, '0')}</span>
                    </div>
                    <div class="sb-badge-pill">
                        <span>✦</span> ${data.category}
                    </div>
                    <div class="sb-deva-subhead">${data.sanskrit}</div>
                    <h3 class="sb-title">${data.title}</h3>
                    ${data.subtitle ? `<div style="font-size: 0.82rem; color: #8C5B09; font-weight: 600; margin-top: -2px; margin-bottom: 4px;">${data.subtitle}</div>` : ''}
                    ${sourceTag}
                    <p class="sb-narrative">${data.desc}</p>
                    <div class="sb-attributes-grid">
                        ${attrChips}
                    </div>
                </div>
                <div class="sb-content-bottom">
                    ${ctaBtn}
                    <span class="sb-folio-indicator">Folio ${index + 1} of ${this.total}</span>
                </div>
            </div>
        `;
    }

    renderSpread(index) {
        const page = this.filteredPages[index];
        if (!page) return;

        this.leftPageEl.innerHTML = this.renderLeftHTML(page);
        this.rightPageEl.innerHTML = this.renderRightHTML(page, index);

        // Update dots state
        if (this.dotsContainer) {
            const dots = this.dotsContainer.querySelectorAll('.sb-plate-dot');
            dots.forEach((dot, i) => {
                const isActive = i === index;
                dot.classList.toggle('active', isActive);
                dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });
        }

        // Update folio dropdown state
        if (this.folioSelectEl) {
            this.folioSelectEl.value = String(index);
        }
    }

    turnTo(targetIndex, direction = 'next') {
        if (this.isTurning || targetIndex === this.currentIndex || this.total <= 1) return;
        this.isTurning = true;

        const fromIndex = this.currentIndex;
        const toIndex = (targetIndex + this.total) % this.total;
        const fromPage = this.filteredPages[fromIndex];
        const toPage = this.filteredPages[toIndex];

        // Accessibility: Fallback for prefers-reduced-motion or missing GSAP
        if (this.prefersReducedMotion || typeof gsap === 'undefined') {
            this.leftPageEl.style.opacity = '0';
            this.rightPageEl.style.opacity = '0';
            setTimeout(() => {
                this.currentIndex = toIndex;
                this.renderSpread(toIndex);
                this.leftPageEl.style.opacity = '1';
                this.rightPageEl.style.opacity = '1';
                this.isTurning = false;
            }, 120);
            return;
        }

        // Show flipping leaf
        this.flippingLeafEl.style.display = 'block';

        if (direction === 'next') {
            this.flippingLeafEl.className = 'sb-flipping-leaf flip-next';
            this.leafFrontEl.innerHTML = `<div class="sb-page-half right" style="width:100%;height:100%;">${this.renderRightHTML(fromPage, fromIndex)}</div><div class="sb-leaf-shadow-overlay"></div>`;
            this.leafBackEl.innerHTML = `<div class="sb-page-half left" style="width:100%;height:100%;">${this.renderLeftHTML(toPage)}</div><div class="sb-leaf-shadow-overlay"></div>`;

            const frontShadow = this.leafFrontEl.querySelector('.sb-leaf-shadow-overlay');
            const backShadow = this.leafBackEl.querySelector('.sb-leaf-shadow-overlay');

            // Underneath right side displays incoming page
            this.rightPageEl.innerHTML = this.renderRightHTML(toPage, toIndex);

            // GSAP 3D Page Turn with dynamic lighting occlusion
            const tl = gsap.timeline({
                onComplete: () => {
                    this.currentIndex = toIndex;
                    this.renderSpread(toIndex);
                    this.flippingLeafEl.style.display = 'none';
                    this.isTurning = false;
                }
            });

            tl.fromTo(this.flippingLeafEl, 
                { rotationY: 0, transformOrigin: 'left center' },
                { rotationY: -180, duration: 0.68, ease: 'power2.inOut' }
            );

            if (frontShadow) {
                tl.fromTo(frontShadow, { opacity: 0 }, { opacity: 0.75, duration: 0.34, ease: 'power1.in' }, 0);
            }
            if (backShadow) {
                tl.fromTo(backShadow, { opacity: 0.75 }, { opacity: 0, duration: 0.34, ease: 'power1.out' }, 0.34);
            }

        } else {
            this.flippingLeafEl.className = 'sb-flipping-leaf flip-prev';
            this.leafFrontEl.innerHTML = `<div class="sb-page-half left" style="width:100%;height:100%;">${this.renderLeftHTML(fromPage)}</div><div class="sb-leaf-shadow-overlay"></div>`;
            this.leafBackEl.innerHTML = `<div class="sb-page-half right" style="width:100%;height:100%;">${this.renderRightHTML(toPage, toIndex)}</div><div class="sb-leaf-shadow-overlay"></div>`;

            const frontShadow = this.leafFrontEl.querySelector('.sb-leaf-shadow-overlay');
            const backShadow = this.leafBackEl.querySelector('.sb-leaf-shadow-overlay');

            // Underneath left side displays incoming page
            this.leftPageEl.innerHTML = this.renderLeftHTML(toPage);

            const tl = gsap.timeline({
                onComplete: () => {
                    this.currentIndex = toIndex;
                    this.renderSpread(toIndex);
                    this.flippingLeafEl.style.display = 'none';
                    this.isTurning = false;
                }
            });

            tl.fromTo(this.flippingLeafEl, 
                { rotationY: 0, transformOrigin: 'right center' },
                { rotationY: 180, duration: 0.68, ease: 'power2.inOut' }
            );

            if (frontShadow) {
                tl.fromTo(frontShadow, { opacity: 0 }, { opacity: 0.75, duration: 0.34, ease: 'power1.in' }, 0);
            }
            if (backShadow) {
                tl.fromTo(backShadow, { opacity: 0.75 }, { opacity: 0, duration: 0.34, ease: 'power1.out' }, 0.34);
            }
        }
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.total;
        this.turnTo(nextIndex, 'next');
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.total) % this.total;
        this.turnTo(prevIndex, 'prev');
    }

    filterCategory(category) {
        this.activeCategory = category;
        if (category === 'ALL') {
            this.filteredPages = [...this.rawPages];
        } else {
            this.filteredPages = this.rawPages.filter(p => 
                p.category && p.category.toUpperCase().includes(category.toUpperCase())
            );
            if (this.filteredPages.length === 0) {
                this.filteredPages = [...this.rawPages];
            }
        }
        this.total = this.filteredPages.length;
        this.currentIndex = 0;
        this.renderDots();
        this.renderSpread(0);
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayTimer = setInterval(() => {
            this.next();
        }, this.options.autoPlayInterval);
    }

    stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
    }

    bindEvents() {
        // Arrow Buttons
        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.prev();
            this.stopAutoPlay();
        });

        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.next();
            this.stopAutoPlay();
        });

        // Plate Dots Navigation
        this.dotsContainer.addEventListener('click', (e) => {
            const dot = e.target.closest('.sb-plate-dot');
            if (dot) {
                const targetIdx = parseInt(dot.getAttribute('data-index'), 10);
                if (!isNaN(targetIdx) && targetIdx !== this.currentIndex) {
                    const dir = targetIdx > this.currentIndex ? 'next' : 'prev';
                    this.turnTo(targetIdx, dir);
                    this.stopAutoPlay();
                }
            }
        });

        // Tab Filtering
        if (this.tabsHeader) {
            this.tabsHeader.addEventListener('click', (e) => {
                const tab = e.target.closest('.sb-tab-pill');
                if (tab) {
                    const filter = tab.getAttribute('data-filter');
                    this.tabsHeader.querySelectorAll('.sb-tab-pill').forEach(btn => {
                        btn.classList.toggle('active', btn === tab);
                        btn.setAttribute('aria-selected', btn === tab ? 'true' : 'false');
                    });
                    this.filterCategory(filter);
                    this.stopAutoPlay();
                }
            });
        }

        // Folio Select Jump Navigation
        if (this.folioSelectEl) {
            this.folioSelectEl.addEventListener('change', (e) => {
                const targetIdx = parseInt(e.target.value, 10);
                if (!isNaN(targetIdx) && targetIdx !== this.currentIndex) {
                    const dir = targetIdx > this.currentIndex ? 'next' : 'prev';
                    this.turnTo(targetIdx, dir);
                    this.stopAutoPlay();
                }
            });
        }

        // Keyboard Navigation (ArrowLeft, ArrowRight, Home, End)
        if (this.options.enableKeyboard) {
            this.wrapperEl.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.next();
                    this.stopAutoPlay();
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.prev();
                    this.stopAutoPlay();
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    this.turnTo(0, 'prev');
                    this.stopAutoPlay();
                } else if (e.key === 'End') {
                    e.preventDefault();
                    this.turnTo(this.total - 1, 'next');
                    this.stopAutoPlay();
                }
            });
        }

        // Pointer Drag & Touch Swipe Support
        if (this.options.enableSwipe) {
            let startX = 0;
            let startY = 0;
            let isDragging = false;

            this.chassisEl.addEventListener('pointerdown', (e) => {
                if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.sb-ribbon-bookmark')) return;
                startX = e.clientX;
                startY = e.clientY;
                isDragging = true;
            });

            this.chassisEl.addEventListener('pointermove', (e) => {
                if (!isDragging || this.isTurning || this.prefersReducedMotion) return;
                const diffX = e.clientX - startX;
                const tilt = Math.max(-4, Math.min(4, diffX * 0.05));
                this.chassisEl.style.transform = `rotateY(${tilt}deg)`;
            });

            const onDragEnd = (e) => {
                if (!isDragging) return;
                isDragging = false;
                this.chassisEl.style.transform = 'none';

                const diffX = e.clientX - startX;
                const diffY = e.clientY - startY;

                if (Math.abs(diffX) > 42 && Math.abs(diffX) > Math.abs(diffY)) {
                    if (diffX < 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                    this.stopAutoPlay();
                }
            };

            this.chassisEl.addEventListener('pointerup', onDragEnd);
            this.chassisEl.addEventListener('pointercancel', onDragEnd);
        }

        // Pause autoplay on mouse hover
        this.chassisEl.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.chassisEl.addEventListener('mouseleave', () => {
            if (this.options.autoPlay) this.startAutoPlay();
        });
    }

    destroy() {
        this.stopAutoPlay();
        this.container.innerHTML = '';
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. INITIALIZE ALL SKETCHBOOKS
// ─────────────────────────────────────────────────────────────────────────────

function initAllSketchbooks() {
    window.sketchbookInstances = window.sketchbookInstances || {};

    // Book 1: Four Pillars of Personal Alignment
    const pillarsContainer = document.getElementById('sketchbook-pillars');
    if (pillarsContainer && !window.sketchbookInstances.pillars) {
        window.sketchbookInstances.pillars = new SacredSketchbook('sketchbook-pillars', FOUR_PILLARS_PAGES, {
            enableTabs: true
        });
        window.pillarsSketchbook = window.sketchbookInstances.pillars;
    }

    // Book 2: The 20 Sacred Computational Tools Overview
    const toolsContainer = document.getElementById('sketchbook-tools');
    if (toolsContainer && !window.sketchbookInstances.tools) {
        window.sketchbookInstances.tools = new SacredSketchbook('sketchbook-tools', TWENTY_TOOLS_PAGES, {
            enableTabs: true
        });
        window.toolsSketchbook = window.sketchbookInstances.tools;
    }

    // Book 3: Dedicated Vastu Consultation Paths
    const pathsContainer = document.getElementById('sketchbook-paths');
    if (pathsContainer && !window.sketchbookInstances.paths) {
        window.sketchbookInstances.paths = new SacredSketchbook('sketchbook-paths', VASTU_PATHS_PAGES, {
            enableTabs: true
        });
        window.pathsSketchbook = window.sketchbookInstances.paths;
    }
}

// Automatic Initialization upon DOM ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllSketchbooks);
    } else {
        initAllSketchbooks();
    }
}

// Universal Global / Module Exports
if (typeof window !== 'undefined') {
    window.SacredSketchbook = SacredSketchbook;
    window.initAllSketchbooks = initAllSketchbooks;
    window.FOUR_PILLARS_PAGES = FOUR_PILLARS_PAGES;
    window.TWENTY_TOOLS_PAGES = TWENTY_TOOLS_PAGES;
    window.VASTU_PATHS_PAGES = VASTU_PATHS_PAGES;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SacredSketchbook,
        initAllSketchbooks,
        FOUR_PILLARS_PAGES,
        TWENTY_TOOLS_PAGES,
        VASTU_PATHS_PAGES
    };
}
