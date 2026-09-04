# -*- coding: utf-8 -*-
"""
Script to update D:\\builds\\js\\sketchbook.js with:
1. Complete 20 canonical tools matching ALL_20_TOOLS in index.html
2. Full SVG sacred plates for every single tool
3. Removal of the ribbon bookmark from HTML & event handlers
4. Support for data.toolId with direct openToolDirectly() modal trigger
5. Citation treatise stamp display on right page spread
"""

import re
import sys

tools_20_data = '''/**
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
];'''

with open('js/sketchbook.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace TWENTY_TOOLS_PAGES block
pattern = r'/\*\*[\s\n]*\* BOOK 2: The 20 Sacred Computational Tools.*?\nconst TWENTY_TOOLS_PAGES = \[.*?\];'
match = re.search(pattern, content, re.DOTALL)
if match:
    content = content[:match.start()] + tools_20_data + content[match.end():]
    print("Replaced TWENTY_TOOLS_PAGES successfully.")
else:
    print("Trying pattern 2")
    pattern2 = r'const TWENTY_TOOLS_PAGES = \[.*?\];'
    match2 = re.search(pattern2, content, re.DOTALL)
    if match2:
        content = content[:match2.start()] + tools_20_data + content[match2.end():]
        print("Replaced TWENTY_TOOLS_PAGES (pattern 2) successfully.")
    else:
        print("ERROR: Could not locate TWENTY_TOOLS_PAGES")
        sys.exit(1)

# 2. Remove bookmark ribbon from template in buildDOM()
ribbon_html = r'<div class="sb-ribbon-bookmark"[^>]*></div>'
if re.search(ribbon_html, content):
    content = re.sub(ribbon_html, '<!-- Brass Hanging Ribbon Bookmark Removed -->', content)
    print("Removed ribbon bookmark element from buildDOM template.")
else:
    print("Ribbon bookmark element not found in template.")

# 3. Update renderRightHTML to support toolId, treatise citation stamp, and direct openToolDirectly() trigger
old_render_right = r'renderRightHTML\(data, index\) \{.*?\n    \}'
new_render_right = '''renderRightHTML(data, index) {
        const attrChips = (data.attributes || []).map(attr => `
            <span class="sb-attr-chip"><span>✦</span> ${attr}</span>
        `).join('');

        const ctaBtn = data.toolId 
            ? `<button type="button" class="sb-cta-btn" onclick="openToolDirectly('${data.toolId}')">${data.ctaText || 'Launch Calculator →'}</button>`
            : `<a href="${data.ctaLink || '#'}" class="sb-cta-btn">${data.ctaText || 'Explore Path →'}</a>`;

        const sourceTag = data.source ? `
            <div class="sb-source-tag" style="font-size: 0.78rem; font-style: italic; color: #8C5B09; margin-top: 6px; margin-bottom: 8px; border-left: 2px solid #B3791E; padding-left: 8px; line-height: 1.4;">
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
                    ${data.subtitle ? `<div style="font-size: 0.84rem; color: #8C5B09; font-weight: 600; margin-top: -2px; margin-bottom: 6px;">${data.subtitle}</div>` : ''}
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
    }'''

match_rr = re.search(old_render_right, content, re.DOTALL)
if match_rr:
    content = content[:match_rr.start()] + new_render_right + content[match_rr.end():]
    print("Updated renderRightHTML successfully.")
else:
    print("Could not match old renderRightHTML")

with open('js/sketchbook.js', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Finished updating js/sketchbook.js ({len(content)} bytes)")
