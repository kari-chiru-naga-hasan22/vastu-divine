/**
 * ==============================================================================
 * CELESTIAL SUN ASTROLABE — SACRED GEOMETRY ANIMATION ENGINE
 * Inspired by VastuDivine Sacred Astrolabe & Classical Vedic Geometry
 * ==============================================================================
 *
 * Brand Palette:
 *   - Deep Maroon:    #6D0A1D
 *   - Gold / Amber:   #B3791E
 *   - White:          #FFFFFF
 *   - Near-Black:     #141414
 *
 * Opposing Harmonic Velocities:
 *   - outer-ring (Zodiac constellations):                   Clockwise (~65s cycle)
 *   - inner-ring (Devanagari Sanskrit & sacred geometry):   Counter-Clockwise (~48s cycle)
 *   - geometric-orbits (Harmonic chords & orbital circles): Counter-Clockwise (~85s cycle)
 *   - planets (Celestial spheres with radial gradients):   Clockwise (~32s cycle)
 *   - ambient-elements (Cosmic star points & beacons):      Clockwise (~120s cycle)
 *   - central-sun (Stationary engraved classical sun face with celestial breathing glow)
 *
 * Responsive:
 *   - Scalable viewBox="0 0 600 600", max-width: 100%
 *   - Mobile friendly down to 320px screens
 *   - Full prefers-reduced-motion support
 * ==============================================================================
 */

(function (global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        const exports = factory();
        global.initAstrolabe = exports.initAstrolabe;
        global.createAstrolabeSVG = exports.createAstrolabeSVG;
        global.Astrolabe = exports;
    }
})(typeof window !== 'undefined' ? window : this, function () {
    'use strict';

    /**
     * Default Harmonic Timing Configuration (in seconds)
     */
    const HARMONIC_PERIODS = {
        outerRing: 65,         // Clockwise
        innerRing: -48,        // Counter-Clockwise
        geometricOrbits: -85,  // Counter-Clockwise
        planets: 32,           // Clockwise
        ambientElements: 120   // Clockwise
    };

    /**
     * 12 Sacred Devanagari Sanskrit Syllables (Surya / Shakti Bīja Mantras)
     */
    const SANSKRIT_SYLLABLES = [
        { char: 'ॐ', name: 'Om', meaning: 'Primordial Sound / Supreme Reality' },
        { char: 'ह्रीं', name: 'Hreem', meaning: 'Bhuvaneshwari / Maya Shakti' },
        { char: 'श्रीं', name: 'Shreem', meaning: 'Mahalakshmi / Abundance & Light' },
        { char: 'क्लीं', name: 'Kleem', meaning: 'Kama / Divine Attraction' },
        { char: 'ऐं', name: 'Aim', meaning: 'Saraswati / Pure Wisdom' },
        { char: 'गं', name: 'Gam', meaning: 'Ganesha / Auspicious Beginning' },
        { char: 'ह्रां', name: 'Hraam', meaning: 'Surya / Solar Vitality' },
        { char: 'ह्रूं', name: 'Hroom', meaning: 'Rudra / Invincible Splendor' },
        { char: 'सौः', name: 'Sauh', meaning: 'Tripurasundari / Supreme Energy' },
        { char: 'यं', name: 'Yam', meaning: 'Vayu / Cosmic Breath' },
        { char: 'रं', name: 'Ram', meaning: 'Agni / Sacred Solar Fire' },
        { char: 'क्षं', name: 'Ksham', meaning: 'Narasimha / Ultimate Protection' }
    ];

    /**
     * 12 Classical Zodiac Signs
     */
    const ZODIAC_GLYPHS = [
        { symbol: '♈', name: 'Aries', rashi: 'Mesha' },
        { symbol: '♉', name: 'Taurus', rashi: 'Vrishabha' },
        { symbol: '♊', name: 'Gemini', rashi: 'Mithuna' },
        { symbol: '♋', name: 'Cancer', rashi: 'Karka' },
        { symbol: '♌', name: 'Leo', rashi: 'Simha' },
        { symbol: '♍', name: 'Virgo', rashi: 'Kanya' },
        { symbol: '♎', name: 'Libra', rashi: 'Tula' },
        { symbol: '♏', name: 'Scorpio', rashi: 'Vrishchika' },
        { symbol: '♐', name: 'Sagittarius', rashi: 'Dhanu' },
        { symbol: '♑', name: 'Capricorn', rashi: 'Makara' },
        { symbol: '♒', name: 'Aquarius', rashi: 'Kumbha' },
        { symbol: '♓', name: 'Pisces', rashi: 'Meena' }
    ];

    /**
     * Generates the complete, high-fidelity responsive SVG markup for the celestial astrolabe.
     * @returns {string} SVG markup string
     */
    function createAstrolabeSVG() {
        // Sector angles (12 sectors = 30° each)
        const sectors = Array.from({ length: 12 }, (_, i) => i * 30);

        // 1. Ambient Star Compass Beacons
        const cardinalBeacons = [
            '0,-282 4.5,-273 0,-264 -4.5,-273',
            '282,0 273,4.5 264,0 273,-4.5',
            '0,282 4.5,273 0,264 -4.5,273',
            '-282,0 -273,4.5 -264,0 -273,-4.5'
        ].map(pts => `<polygon points="${pts}" fill="#B3791E" opacity="0.8"/>`).join('\n');

        const diagonalBeacons = [
            '194,-194 197,-189 194,-184 191,-189',
            '-194,-194 -191,-189 -194,-184 -197,-189',
            '194,194 197,189 194,184 191,189',
            '-194,194 -191,189 -194,184 -197,189'
        ].map(pts => `<polygon points="${pts}" fill="#B3791E" opacity="0.6"/>`).join('\n');

        // Micro celestial star points
        const starPointsMaroon = [
            { cx: 238, cy: -122, r: 1.6 },
            { cx: -228, cy: 112, r: 1.8 },
            { cx: 142, cy: 232, r: 1.4 },
            { cx: -132, cy: -238, r: 1.5 },
            { cx: 258, cy: 92, r: 1.3 },
            { cx: -258, cy: -82, r: 1.5 },
            { cx: 85, cy: -260, r: 1.4 },
            { cx: -90, cy: 258, r: 1.5 }
        ].map(pt => `<circle cx="${pt.cx}" cy="${pt.cy}" r="${pt.r}" fill="#6D0A1D" opacity="0.4"/>`).join('\n');

        const starPointsGold = [
            { cx: 270, cy: -45, r: 1.5 },
            { cx: -265, cy: 45, r: 1.6 },
            { cx: 48, cy: 268, r: 1.4 },
            { cx: -52, cy: -270, r: 1.5 },
            { cx: 185, cy: -140, r: 1.2 },
            { cx: -180, cy: 145, r: 1.3 }
        ].map(pt => `<circle cx="${pt.cx}" cy="${pt.cy}" r="${pt.r}" fill="#B3791E" opacity="0.65"/>`).join('\n');

        // 2. Geometric Orbits linework & chords
        // 12-vertex sacred dodecagram chords connecting nodes around r=252
        const dodecaChords = [];
        for (let i = 0; i < 12; i++) {
            const a1 = (i * 30 * Math.PI) / 180;
            const a2 = (((i + 5) % 12) * 30 * Math.PI) / 180;
            const x1 = (252 * Math.cos(a1)).toFixed(2);
            const y1 = (252 * Math.sin(a1)).toFixed(2);
            const x2 = (252 * Math.cos(a2)).toFixed(2);
            const y2 = (252 * Math.sin(a2)).toFixed(2);
            dodecaChords.push(`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#B3791E" stroke-width="0.35" opacity="0.22"/>`);
        }

        // 8 continuous axis lines through center
        const axisLines = [0, 45, 90, 135].map(deg =>
            `<line x1="0" y1="-282" x2="0" y2="282" transform="rotate(${deg})" stroke="#6D0A1D" stroke-width="0.35" opacity="0.2"/>`
        ).join('\n');

        // 3. Outer Ring (Zodiac) Elements
        const outerDividers = sectors.map(deg =>
            `<line x1="0" y1="-228" x2="0" y2="-184" transform="rotate(${deg})" stroke="#6D0A1D" stroke-width="0.7" opacity="0.45"/>`
        ).join('\n');

        const zodiacNodes = ZODIAC_GLYPHS.map((z, i) => {
            const deg = i * 30 + 15; // Centered in the 30° sector
            return `<g transform="rotate(${deg}) translate(0, -206) rotate(${-deg})">
                <text class="astrolabe-zodiac-text" x="0" y="0" title="${z.name} (${z.rashi})">${z.symbol}</text>
            </g>`;
        }).join('\n');

        // Outer rim tick marks (72 ticks around r=228)
        const outerTicks = Array.from({ length: 72 }, (_, i) => {
            const deg = i * 5;
            const isMajor = deg % 30 === 0;
            const isMid = deg % 15 === 0;
            const len = isMajor ? 5 : isMid ? 3.5 : 2;
            return `<line x1="0" y1="-228" x2="0" y2="${-228 + len}" transform="rotate(${deg})" stroke="#B3791E" stroke-width="${isMajor ? 0.8 : 0.4}" opacity="${isMajor ? 0.6 : 0.35}"/>`;
        }).join('\n');

        // 4. Inner Ring (Devanagari Sanskrit & Sacred Geometry)
        const innerDividers = sectors.map(deg =>
            `<line x1="0" y1="-176" x2="0" y2="-134" transform="rotate(${deg})" stroke="#B3791E" stroke-width="0.6" opacity="0.45"/>`
        ).join('\n');

        // 12-petaled sacred lotus arcs connecting sectors along the inner ring
        const lotusArcs = sectors.map(deg => {
            return `<path d="M -17.3,-132.8 C -12,-154 12,-154 17.3,-132.8" transform="rotate(${deg + 15})" stroke="#B3791E" stroke-width="0.65" fill="none" opacity="0.32"/>`;
        }).join('\n');

        const devanagariNodes = SANSKRIT_SYLLABLES.map((s, i) => {
            const deg = i * 30 + 15;
            return `<g transform="rotate(${deg}) translate(0, -155) rotate(${-deg})">
                <text class="astrolabe-sanskrit-text" x="0" y="0" title="${s.name}: ${s.meaning}">${s.char}</text>
            </g>`;
        }).join('\n');

        // Inner rim guide dots
        const innerDots = sectors.map(deg =>
            `<circle cx="0" cy="-176" r="1.5" transform="rotate(${deg + 15})" fill="#B3791E" opacity="0.75"/>`
        ).join('\n');

        // 5. Stationary Classical Sun Face Starburst (32 rays: 16 sharp maroon + 16 flame gold)
        const maroonRays = Array.from({ length: 16 }, (_, i) => {
            const deg = i * 22.5;
            return `<polygon points="0,-124 4.5,-54 -4.5,-54" transform="rotate(${deg})" fill="#6D0A1D" opacity="0.27"/>`;
        }).join('\n');

        const goldFlameRays = Array.from({ length: 16 }, (_, i) => {
            const deg = i * 22.5 + 11.25;
            return `<path d="M0,-54 Q8.5,-85 0,-115 Q-4.5,-85 0,-54 Z" transform="rotate(${deg})" fill="#B3791E" opacity="0.24"/>`;
        }).join('\n');

        return `
<svg class="astrolabe-svg mandala-svg" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sacred Celestial Sun Astrolabe" preserveAspectRatio="xMidYMid meet">
    <defs>
        <!-- Celestial Breathing Glow Filter -->
        <filter id="celestialGlow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur"/>
            <feColorMatrix in="blur" type="matrix" values="
                1 0 0 0 0.70
                0 0.47 0 0 0.47
                0 0 0.12 0 0.12
                0 0 0 0.6 0" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>

        <!-- Classical Sun Disk Drop Shadow -->
        <filter id="sunDiskShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#6D0A1D" flood-opacity="0.18"/>
        </filter>

        <!-- Atmospheric Ambient Glow -->
        <radialGradient id="atmoGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#F2E3D8" stop-opacity="0.85"/>
            <stop offset="45%" stop-color="#F7ECE3" stop-opacity="0.45"/>
            <stop offset="75%" stop-color="#FAF5F1" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#FAF5F1" stop-opacity="0"/>
        </radialGradient>

        <!-- Stationary Sun Disk Radial Ivory/Gold Gradient -->
        <radialGradient id="sunDiskGrad" cx="46%" cy="42%" r="58%">
            <stop offset="0%" stop-color="#FFFFFF"/>
            <stop offset="68%" stop-color="#FDFBF9"/>
            <stop offset="92%" stop-color="#F6EDE5"/>
            <stop offset="100%" stop-color="#EADBCE"/>
        </radialGradient>

        <!-- 3D Celestial Spheres Radial Gradients -->
        <radialGradient id="sphereGradBurgundy" cx="30%" cy="28%" r="72%">
            <stop offset="0%" stop-color="#FFA4B6"/>
            <stop offset="22%" stop-color="#E88094"/>
            <stop offset="45%" stop-color="#AD2038"/>
            <stop offset="78%" stop-color="#6D0A1D"/>
            <stop offset="100%" stop-color="#32030B"/>
        </radialGradient>

        <radialGradient id="sphereGradGold" cx="28%" cy="26%" r="72%">
            <stop offset="0%" stop-color="#FFF3D4"/>
            <stop offset="25%" stop-color="#FAE8B8"/>
            <stop offset="55%" stop-color="#D4A045"/>
            <stop offset="82%" stop-color="#B3791E"/>
            <stop offset="100%" stop-color="#5C3B07"/>
        </radialGradient>

        <radialGradient id="sphereGradRuby" cx="32%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#FFD1DC"/>
            <stop offset="35%" stop-color="#CF2445"/>
            <stop offset="80%" stop-color="#6D0A1D"/>
            <stop offset="100%" stop-color="#141414"/>
        </radialGradient>
    </defs>

    <!-- CENTER ROOT TRANSFORM (300, 300): Local Origin (0, 0) Ensures Exact Concentricity -->
    <g transform="translate(300, 300)">

        <!-- 1. Background Atmospheric Glow Field -->
        <circle r="292" fill="url(#atmoGlow)"/>

        <!-- 2. LAYER: ambient-elements (Clockwise ~120s cycle) -->
        <g id="ambient-elements">
            <!-- Major Cardinal & Diagonal Star Beacons -->
            <g>${cardinalBeacons}</g>
            <g>${diagonalBeacons}</g>
            <!-- Micro Celestial Constellation Points -->
            <g>${starPointsMaroon}</g>
            <g>${starPointsGold}</g>
            <!-- Outer Compass Perimeter Guide Ring -->
            <circle r="282" fill="none" stroke="#B3791E" stroke-width="0.4" stroke-dasharray="2 8" opacity="0.35"/>
        </g>

        <!-- 3. LAYER: geometric-orbits (Counter-Clockwise ~85s cycle) -->
        <g id="geometric-orbits">
            <!-- Concentric Astronomical Orbital Rings -->
            <circle r="280" fill="none" stroke="#6D0A1D" stroke-width="0.45" opacity="0.25" stroke-dasharray="2 4"/>
            <circle r="268" fill="none" stroke="#B3791E" stroke-width="0.75" opacity="0.45" stroke-dasharray="6 5"/>
            <circle r="252" fill="none" stroke="#6D0A1D" stroke-width="0.5" opacity="0.25"/>
            <circle r="236" fill="none" stroke="#B3791E" stroke-width="0.8" opacity="0.4" stroke-dasharray="2 5"/>
            <!-- 8 Continuous Cardinal & Diagonal Rays -->
            <g>${axisLines}</g>
            <!-- Sacred Dodecagram Geometric Chords -->
            <g>${dodecaChords.join('\n')}</g>
        </g>

        <!-- 4. LAYER: outer-ring (Zodiac constellations) (Clockwise ~65s cycle) -->
        <g id="outer-ring">
            <!-- Zodiac Track Annulus Band -->
            <circle r="228" fill="#F8EFE9" fill-opacity="0.38" stroke="#6D0A1D" stroke-width="1.3" opacity="0.85"/>
            <circle r="184" fill="none" stroke="#B3791E" stroke-width="1.1" opacity="0.75"/>
            <circle r="206" fill="none" stroke="#6D0A1D" stroke-width="0.35" stroke-dasharray="1 3" opacity="0.3"/>
            <!-- 72 Degree Ticks -->
            <g>${outerTicks}</g>
            <!-- 12 Sector Dividers -->
            <g>${outerDividers}</g>
            <!-- 12 Zodiac Glyphs (Mesha to Meena) -->
            <g>${zodiacNodes}</g>
        </g>

        <!-- 5. LAYER: inner-ring (Devanagari Sanskrit syllables & sacred geometry) (Counter-Clockwise ~48s cycle) -->
        <g id="inner-ring">
            <!-- Inner Ring Track Annulus Band -->
            <circle r="176" fill="#FAF2EC" fill-opacity="0.45" stroke="#B3791E" stroke-width="1.0" opacity="0.8"/>
            <circle r="134" fill="none" stroke="#6D0A1D" stroke-width="1.0" opacity="0.7"/>
            <circle r="155" fill="none" stroke="#B3791E" stroke-width="0.4" stroke-dasharray="2 3" opacity="0.35"/>
            <!-- Sacred 12-Petaled Lotus Arcs -->
            <g>${lotusArcs}</g>
            <!-- 12 Sector Dividers -->
            <g>${innerDividers}</g>
            <!-- Golden Guide Nodes -->
            <g>${innerDots}</g>
            <!-- 12 Sacred Devanagari Bīja Syllables -->
            <g>${devanagariNodes}</g>
        </g>

        <!-- 6. LAYER: planets (Celestial Spheres with Radial Gradients) (Clockwise ~32s cycle) -->
        <g id="planets">
            <!-- Planet 1: Mars / Mangala (Burgundy 3D Sphere) -->
            <g transform="translate(228, -80)">
                <circle r="12" fill="url(#sphereGradBurgundy)"/>
                <circle r="12" fill="none" stroke="#FAF6F3" stroke-width="0.85" opacity="0.65"/>
                <polygon points="0,-18 3.5,-14 0,-10 -3.5,-14" fill="#B3791E"/>
            </g>

            <!-- Planet 2: Jupiter / Guru (Golden Radiance 3D Sphere) -->
            <g transform="translate(-195, 145)">
                <circle r="9.5" fill="url(#sphereGradGold)"/>
                <circle r="9.5" fill="none" stroke="#FAF6F3" stroke-width="0.65" opacity="0.55"/>
                <circle r="13.5" fill="none" stroke="#B3791E" stroke-width="0.4" stroke-dasharray="2 2" opacity="0.5"/>
            </g>

            <!-- Planet 3: Venus / Shukra (Radiant Ruby 3D Sphere) -->
            <g transform="translate(145, 195)">
                <circle r="11" fill="url(#sphereGradRuby)"/>
                <circle r="11" fill="none" stroke="#FAF6F3" stroke-width="0.75" opacity="0.6"/>
                <circle r="15" fill="none" stroke="#6D0A1D" stroke-width="0.4" opacity="0.4"/>
            </g>

            <!-- Planet 4: Mercury / Budha (Golden Amber 3D Sphere) -->
            <g transform="translate(-235, -55)">
                <circle r="8.5" fill="url(#sphereGradGold)"/>
                <circle r="8.5" fill="none" stroke="#FAF6F3" stroke-width="0.6" opacity="0.5"/>
                <circle cx="-13" cy="-3" r="1.8" fill="#B3791E" opacity="0.8"/>
            </g>

            <!-- Planet 5: Lunar Node / Ketu (Deep Burgundy Pearl) -->
            <g transform="translate(45, -245)">
                <circle r="10" fill="url(#sphereGradBurgundy)"/>
                <circle r="10" fill="none" stroke="#FAF6F3" stroke-width="0.75" opacity="0.6"/>
                <path d="M-6,-15 L0,-12 L6,-15" stroke="#B3791E" stroke-width="0.6" fill="none" opacity="0.7"/>
            </g>

            <!-- Planet 6: Saturn / Shani (Golden Sphere with Classical Tilted Ring) -->
            <g transform="translate(-130, -205)">
                <ellipse rx="15" ry="4.5" fill="none" stroke="#B3791E" stroke-width="0.9" transform="rotate(-26)" opacity="0.7"/>
                <circle r="9" fill="url(#sphereGradGold)"/>
                <circle r="9" fill="none" stroke="#FAF6F3" stroke-width="0.6" opacity="0.55"/>
                <ellipse rx="15" ry="4.5" fill="none" stroke="#FAF6F3" stroke-width="0.5" stroke-dasharray="0 23 20 0" transform="rotate(-26)" opacity="0.8"/>
            </g>
        </g>

        <!-- 7. Halo Gap Ring (Moat Separating Moving Rings from the Stationary Sun) -->
        <circle r="134" fill="none" stroke="#FFFFFF" stroke-width="4.5" opacity="0.98"/>
        <circle r="126" fill="none" stroke="#B3791E" stroke-width="0.8" opacity="0.45"/>
        <circle r="122" fill="none" stroke="#6D0A1D" stroke-width="0.5" stroke-dasharray="1 3" opacity="0.3"/>

        <!-- 8. LAYER: central-sun (STATIONARY Classical Engraved Sun Face & Radiant Starburst) -->
        <g id="central-sun" filter="url(#celestialGlow)">
            <!-- 32 Radiant Starburst Rays -->
            <g id="sun-rays">
                <!-- 16 Maroon Sharp Triangular Rays -->
                <g>${maroonRays}</g>
                <!-- 16 Gold Undulating Flame Rays -->
                <g>${goldFlameRays}</g>
            </g>

            <!-- Classical Engraved Sun Face Disk & Features -->
            <g id="sun-face">
                <!-- Outer Concentric Bezels -->
                <circle r="60" fill="none" stroke="#6D0A1D" stroke-width="0.85" opacity="0.25"/>
                <circle r="56" fill="none" stroke="#B3791E" stroke-width="0.6" opacity="0.38"/>
                <circle r="52" fill="none" stroke="#6D0A1D" stroke-width="0.5" stroke-dasharray="2 2" opacity="0.4"/>
                <!-- Sun Disk -->
                <circle r="50" fill="url(#sunDiskGrad)" stroke="#6D0A1D" stroke-width="1.3" opacity="0.98" filter="url(#sunDiskShadow)"/>

                <!-- Serene Classical Engraved Facial Features -->
                <g fill="#6D0A1D">
                    <!-- Sacred Surya Bindu / Tilak (Third-Eye Center) -->
                    <g transform="translate(0, -28)">
                        <path d="M 0,-5 C 2.5,-3 2.5,2 0,4 C -2.5,2 -2.5,-3 0,-5 Z" fill="#B3791E"/>
                        <circle cx="0" cy="0" r="1.4" fill="#FFFFFF"/>
                        <circle cx="0" cy="-7" r="0.8" fill="#B3791E"/>
                    </g>

                    <!-- Almond Eyes with Irises, Pupils and Catchlights -->
                    <g opacity="0.88">
                        <!-- Left Eye -->
                        <path d="M-22,-9 Q-14,-17 -6,-9 Q-14,-3 -22,-9 Z" fill="none" stroke="#6D0A1D" stroke-width="1.15"/>
                        <ellipse cx="-14" cy="-9.5" rx="3.5" ry="3.5" fill="#6D0A1D"/>
                        <circle cx="-12.5" cy="-11" r="1.3" fill="#FFFFFF"/>
                        <path d="M-24,-13 Q-14,-19 -4,-13" fill="none" stroke="#6D0A1D" stroke-width="0.75" opacity="0.6"/>

                        <!-- Right Eye -->
                        <path d="M6,-9 Q14,-17 22,-9 Q14,-3 6,-9 Z" fill="none" stroke="#6D0A1D" stroke-width="1.15"/>
                        <ellipse cx="14" cy="-9.5" rx="3.5" ry="3.5" fill="#6D0A1D"/>
                        <circle cx="15.5" cy="-11" r="1.3" fill="#FFFFFF"/>
                        <path d="M4,-13 Q14,-19 24,-13" fill="none" stroke="#6D0A1D" stroke-width="0.75" opacity="0.6"/>
                    </g>

                    <!-- Arched Classical Eyebrows -->
                    <g opacity="0.75">
                        <path d="M-25,-17 Q-15,-23.5 -5,-18" fill="none" stroke="#6D0A1D" stroke-width="1.3" stroke-linecap="round"/>
                        <path d="M5,-18 Q15,-23.5 25,-17" fill="none" stroke="#6D0A1D" stroke-width="1.3" stroke-linecap="round"/>
                    </g>

                    <!-- Sculpted Nose Bridge and Nostrils -->
                    <g opacity="0.82">
                        <path d="M0,-14 L0,3 M0,3 Q-3.5,5.5 -5,2.5 M0,3 Q3.5,5.5 5,2.5" fill="none" stroke="#6D0A1D" stroke-width="1.0" stroke-linecap="round"/>
                        <ellipse cx="-3.5" cy="3.5" rx="1.2" ry="0.9" fill="#6D0A1D" opacity="0.45"/>
                        <ellipse cx="3.5" cy="3.5" rx="1.2" ry="0.9" fill="#6D0A1D" opacity="0.45"/>
                    </g>

                    <!-- Serene Smiling Lips & Philtrum -->
                    <g opacity="0.92">
                        <path d="M-1.8,7 L-1.2,11.5 M1.8,7 L1.2,11.5" stroke="#6D0A1D" stroke-width="0.5" opacity="0.35"/>
                        <path d="M-9.5,12.5 C-6,11 -2,11.8 0,12.4 C2,11.8 6,11 9.5,12.5 C6,13.8 2,14.2 0,14.2 C-2,14.2 -6,13.8 -9.5,12.5 Z" fill="#6D0A1D" opacity="0.4"/>
                        <path d="M-10.5,12.8 Q-5,13.8 0,13.8 Q5,13.8 10.5,12.8" fill="none" stroke="#6D0A1D" stroke-width="1.1" stroke-linecap="round"/>
                        <circle cx="-10.5" cy="12.8" r="0.65" fill="#6D0A1D" opacity="0.6"/>
                        <circle cx="10.5" cy="12.8" r="0.65" fill="#6D0A1D" opacity="0.6"/>
                        <path d="M-7,14.2 C-4,17.2 4,17.2 7,14.2" fill="none" stroke="#6D0A1D" stroke-width="0.9" opacity="0.6"/>
                    </g>
                </g>
            </g>
        </g>
    </g>
</svg>
`;
    }

    /**
     * Initializes the Celestial Sun Astrolabe animation component.
     *
     * @param {string|HTMLElement} [target] - Container selector or DOM element
     * @param {Object} [options] - Configuration options
     * @param {number} [options.speedMultiplier=1.0] - Speed scalar for all rotations
     * @param {boolean} [options.interactive=true] - Enable subtle 3D mouse parallax tilt
     * @param {boolean|'auto'} [options.reducedMotion='auto'] - Reduced motion override ('auto', true, false)
     * @param {string} [options.engine='auto'] - Animation engine: 'auto' (GSAP if available, else CSS/RAF), 'gsap', 'raf', or 'css'
     * @returns {Object} Astrolabe controller instance
     */
    function initAstrolabe(target, options = {}) {
        // If target is an options object (e.g. { containerId: 'hero-astrolabe', autoStart: true })
        if (target && typeof target === 'object' && !(target instanceof HTMLElement)) {
            options = Object.assign({}, target, options);
            target = target.container || target.containerId || target.target || target.selector || null;
        }

        // Resolve container element
        let container = null;
        if (typeof target === 'string') {
            container = document.querySelector(target) || document.getElementById(target.replace(/^#/, ''));
        } else if (target instanceof HTMLElement) {
            container = target;
        }

        // If still not resolved, try default selectors
        if (!container) {
            container = document.getElementById('hero-astrolabe') ||
                        document.querySelector('#hero-astrolabe') ||
                        document.querySelector('.astrolabe-container') ||
                        document.querySelector('.mandala-container') ||
                        document.querySelector('[data-astrolabe]');
        }

        if (!container) {
            console.warn('[Astrolabe] No container element found for astrolabe initialization.');
            return null;
        }

        const config = {
            speedMultiplier: typeof options.speedMultiplier === 'number' ? options.speedMultiplier : 1.0,
            interactive: options.interactive !== false,
            reducedMotion: options.reducedMotion || 'auto',
            engine: options.engine || 'auto'
        };

        // Ensure ambient glow backdrop is present
        if (!container.querySelector('.astrolabe-glow') && !container.querySelector('.mandala-glow')) {
            const glow = document.createElement('div');
            glow.className = 'astrolabe-glow';
            container.appendChild(glow);
        }

        // Ensure SVG is present; if not, inject high-fidelity sacred geometry SVG
        let svg = container.querySelector('svg.astrolabe-svg') || container.querySelector('svg.mandala-svg');
        if (!svg) {
            container.insertAdjacentHTML('beforeend', createAstrolabeSVG());
            svg = container.querySelector('svg.astrolabe-svg') || container.querySelector('svg.mandala-svg');
        }

        // Resolve layer references
        const layers = {
            outerRing: svg.querySelector('#outer-ring'),
            innerRing: svg.querySelector('#inner-ring'),
            geometricOrbits: svg.querySelector('#geometric-orbits'),
            planets: svg.querySelector('#planets'),
            ambientElements: svg.querySelector('#ambient-elements'),
            centralSun: svg.querySelector('#central-sun')
        };

        // State variables
        let isPaused = false;
        let isDestroyed = false;
        let activeEngine = 'css';
        let gsapTweens = [];
        let rafId = null;
        let lastTimestamp = null;
        let angles = {
            outerRing: 0,
            innerRing: 0,
            geometricOrbits: 0,
            planets: 0,
            ambientElements: 0
        };

        // prefers-reduced-motion media query listener
        const motionQuery = typeof window !== 'undefined' && window.matchMedia
            ? window.matchMedia('(prefers-reduced-motion: reduce)')
            : null;

        function checkReducedMotion() {
            if (config.reducedMotion === true) return true;
            if (config.reducedMotion === false) return false;
            return motionQuery ? motionQuery.matches : false;
        }

        /**
         * Reset any inline transform attributes to maintain pure state
         */
        function resetLayerTransforms() {
            Object.values(layers).forEach(layer => {
                if (layer) {
                    layer.removeAttribute('transform');
                    layer.style.transform = '';
                }
            });
        }

        /**
         * Start GSAP Animation Engine
         */
        function startGSAP() {
            stopGSAP();
            const gsap = window.gsap;
            if (!gsap) return false;

            activeEngine = 'gsap';
            container.classList.remove('astrolabe-css-mode');

            // Set up infinite rotation tweens for each opposing harmonic layer
            const setupTween = (layer, periodSeconds) => {
                if (!layer) return null;
                const duration = Math.abs(periodSeconds) / config.speedMultiplier;
                const endAngle = periodSeconds > 0 ? 360 : -360;
                const rotObj = { angle: 0 };

                return gsap.to(rotObj, {
                    angle: endAngle,
                    duration: duration,
                    repeat: -1,
                    ease: 'none',
                    onUpdate: () => {
                        layer.setAttribute('transform', `rotate(${rotObj.angle})`);
                    }
                });
            };

            gsapTweens = [
                setupTween(layers.outerRing, HARMONIC_PERIODS.outerRing),
                setupTween(layers.innerRing, HARMONIC_PERIODS.innerRing),
                setupTween(layers.geometricOrbits, HARMONIC_PERIODS.geometricOrbits),
                setupTween(layers.planets, HARMONIC_PERIODS.planets),
                setupTween(layers.ambientElements, HARMONIC_PERIODS.ambientElements)
            ].filter(Boolean);

            return true;
        }

        function stopGSAP() {
            gsapTweens.forEach(tween => {
                if (tween && tween.kill) tween.kill();
            });
            gsapTweens = [];
        }

        /**
         * Start High-Performance RAF Engine
         */
        function startRAF() {
            stopRAF();
            activeEngine = 'raf';
            container.classList.remove('astrolabe-css-mode');

            function tick(timestamp) {
                if (!lastTimestamp) lastTimestamp = timestamp;
                const delta = (timestamp - lastTimestamp) / 1000;
                lastTimestamp = timestamp;

                if (!isPaused && !checkReducedMotion()) {
                    // Update rotation angles based on harmonic velocities
                    angles.outerRing = (angles.outerRing + (360 / HARMONIC_PERIODS.outerRing) * config.speedMultiplier * delta) % 360;
                    angles.innerRing = (angles.innerRing + (360 / HARMONIC_PERIODS.innerRing) * config.speedMultiplier * delta) % 360;
                    angles.geometricOrbits = (angles.geometricOrbits + (360 / HARMONIC_PERIODS.geometricOrbits) * config.speedMultiplier * delta) % 360;
                    angles.planets = (angles.planets + (360 / HARMONIC_PERIODS.planets) * config.speedMultiplier * delta) % 360;
                    angles.ambientElements = (angles.ambientElements + (360 / HARMONIC_PERIODS.ambientElements) * config.speedMultiplier * delta) % 360;

                    // Apply SVG attribute rotations centered at (0, 0) of translated group
                    if (layers.outerRing) layers.outerRing.setAttribute('transform', `rotate(${angles.outerRing.toFixed(3)})`);
                    if (layers.innerRing) layers.innerRing.setAttribute('transform', `rotate(${angles.innerRing.toFixed(3)})`);
                    if (layers.geometricOrbits) layers.geometricOrbits.setAttribute('transform', `rotate(${angles.geometricOrbits.toFixed(3)})`);
                    if (layers.planets) layers.planets.setAttribute('transform', `rotate(${angles.planets.toFixed(3)})`);
                    if (layers.ambientElements) layers.ambientElements.setAttribute('transform', `rotate(${angles.ambientElements.toFixed(3)})`);
                }

                if (!isDestroyed) {
                    rafId = requestAnimationFrame(tick);
                }
            }

            rafId = requestAnimationFrame(tick);
        }

        function stopRAF() {
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            lastTimestamp = null;
        }

        /**
         * Start Hardware-Accelerated CSS Engine
         */
        function startCSS() {
            activeEngine = 'css';
            resetLayerTransforms();
            container.classList.add('astrolabe-css-mode');

            // Apply custom animation durations if speedMultiplier !== 1
            if (config.speedMultiplier !== 1) {
                const s = config.speedMultiplier;
                container.style.setProperty('--astro-dur-outer', `${HARMONIC_PERIODS.outerRing / s}s`);
                container.style.setProperty('--astro-dur-inner', `${Math.abs(HARMONIC_PERIODS.innerRing) / s}s`);
                container.style.setProperty('--astro-dur-orbits', `${Math.abs(HARMONIC_PERIODS.geometricOrbits) / s}s`);
                container.style.setProperty('--astro-dur-planets', `${HARMONIC_PERIODS.planets / s}s`);
                container.style.setProperty('--astro-dur-ambient', `${HARMONIC_PERIODS.ambientElements / s}s`);
            }
        }

        function stopCSS() {
            container.classList.remove('astrolabe-css-mode');
        }

        /**
         * Choose and boot the optimal engine
         */
        function startAnimation() {
            if (checkReducedMotion()) {
                container.classList.add('is-paused');
                resetLayerTransforms();
                return;
            }

            container.classList.remove('is-paused');

            if (config.engine === 'gsap' || (config.engine === 'auto' && typeof window !== 'undefined' && window.gsap)) {
                if (startGSAP()) return;
            }

            if (config.engine === 'raf') {
                startRAF();
                return;
            }

            // Default: pure hardware-accelerated CSS keyframe animations
            startCSS();
        }

        /**
         * Pause animation
         */
        function pause() {
            isPaused = true;
            container.classList.add('is-paused');
            if (activeEngine === 'gsap') {
                gsapTweens.forEach(t => t && t.pause && t.pause());
            }
        }

        /**
         * Resume animation
         */
        function play() {
            if (checkReducedMotion()) return;
            isPaused = false;
            container.classList.remove('is-paused');
            if (activeEngine === 'gsap') {
                gsapTweens.forEach(t => t && t.play && t.play());
            } else if (activeEngine === 'raf' && !rafId) {
                startRAF();
            }
        }

        /**
         * Toggle play/pause state
         */
        function toggle() {
            if (isPaused) play();
            else pause();
        }

        /**
         * Dynamically update speed multiplier
         */
        function setSpeed(multiplier) {
            if (typeof multiplier !== 'number' || multiplier <= 0) return;
            config.speedMultiplier = multiplier;
            if (activeEngine === 'gsap') {
                startGSAP();
            } else if (activeEngine === 'css') {
                startCSS();
            }
        }

        /**
         * Interactive 3D Parallax Tilt Effect on Pointer Move
         */
        let tiltHandler = null;
        let leaveHandler = null;
        if (config.interactive && typeof window !== 'undefined') {
            let targetTiltX = 0;
            let targetTiltY = 0;
            let currentTiltX = 0;
            let currentTiltY = 0;
            let tiltRaf = null;

            function updateTilt() {
                currentTiltX += (targetTiltX - currentTiltX) * 0.1;
                currentTiltY += (targetTiltY - currentTiltY) * 0.1;

                if (svg) {
                    svg.style.transform = `rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentTiltY.toFixed(2)}deg)`;
                }

                if (Math.abs(targetTiltX - currentTiltX) > 0.01 || Math.abs(targetTiltY - currentTiltY) > 0.01) {
                    tiltRaf = requestAnimationFrame(updateTilt);
                } else {
                    tiltRaf = null;
                }
            }

            tiltHandler = function (e) {
                if (checkReducedMotion()) return;
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Subtle max tilt: ±3.5 degrees
                targetTiltX = -((y - centerY) / centerY) * 3.5;
                targetTiltY = ((x - centerX) / centerX) * 3.5;

                if (!tiltRaf) {
                    tiltRaf = requestAnimationFrame(updateTilt);
                }
            };

            leaveHandler = function () {
                targetTiltX = 0;
                targetTiltY = 0;
                if (!tiltRaf) {
                    tiltRaf = requestAnimationFrame(updateTilt);
                }
            };

            container.addEventListener('mousemove', tiltHandler, { passive: true });
            container.addEventListener('mouseleave', leaveHandler, { passive: true });
        }

        /**
         * Listen to user prefers-reduced-motion changes dynamically
         */
        const handleMotionChange = function (e) {
            if (e.matches) {
                pause();
                resetLayerTransforms();
            } else {
                play();
            }
        };

        if (motionQuery && motionQuery.addEventListener) {
            motionQuery.addEventListener('change', handleMotionChange);
        } else if (motionQuery && motionQuery.addListener) {
            motionQuery.addListener(handleMotionChange);
        }

        // Initialize motion
        startAnimation();

        /**
         * Public Controller Interface
         */
        return {
            container,
            svg,
            play,
            pause,
            toggle,
            togglePause: function () {
                toggle();
                return isPaused;
            },
            setSpeed,
            isPaused: () => isPaused,
            isReducedMotion: checkReducedMotion,
            getLayers: () => ({ ...layers }),
            getHarmonicPeriods: () => ({ ...HARMONIC_PERIODS }),
            destroy: function () {
                isDestroyed = true;
                stopGSAP();
                stopRAF();
                stopCSS();
                if (tiltHandler) container.removeEventListener('mousemove', tiltHandler);
                if (leaveHandler) container.removeEventListener('mouseleave', leaveHandler);
                if (motionQuery && motionQuery.removeEventListener) {
                    motionQuery.removeEventListener('change', handleMotionChange);
                } else if (motionQuery && motionQuery.removeListener) {
                    motionQuery.removeListener(handleMotionChange);
                }
                resetLayerTransforms();
            }
        };
    }

    // Auto-init on DOMContentLoaded if an element with class .astrolabe-auto or data-astrolabe-auto exists
    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                const autoElement = document.querySelector('.astrolabe-auto, [data-astrolabe-auto]');
                if (autoElement) initAstrolabe(autoElement);
            });
        } else {
            const autoElement = document.querySelector('.astrolabe-auto, [data-astrolabe-auto]');
            if (autoElement) initAstrolabe(autoElement);
        }
    }

    return {
        initAstrolabe,
        createAstrolabeSVG,
        HARMONIC_PERIODS,
        SANSKRIT_SYLLABLES,
        ZODIAC_GLYPHS
    };
});
