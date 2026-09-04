const assert = require('assert');
const { initAstrolabe, createAstrolabeSVG, HARMONIC_PERIODS, SANSKRIT_SYLLABLES, ZODIAC_GLYPHS } = require('./js/astrolabe.js');

console.log('--- Testing Astrolabe Module Exports ---');
assert.strictEqual(typeof initAstrolabe, 'function', 'initAstrolabe should be a function');
assert.strictEqual(typeof createAstrolabeSVG, 'function', 'createAstrolabeSVG should be a function');
console.log('✓ Module exports verified successfully');

console.log('--- Testing Harmonic Velocities & Durations ---');
assert.strictEqual(HARMONIC_PERIODS.outerRing, 65, 'outerRing duration must be 65s');
assert.strictEqual(HARMONIC_PERIODS.innerRing, -48, 'innerRing duration must be -48s (CCW)');
assert.strictEqual(HARMONIC_PERIODS.geometricOrbits, -85, 'geometricOrbits duration must be -85s (CCW)');
assert.strictEqual(HARMONIC_PERIODS.planets, 32, 'planets duration must be 32s (CW)');
assert.strictEqual(HARMONIC_PERIODS.ambientElements, 120, 'ambientElements duration must be 120s (CW)');
console.log('✓ All 5 opposing harmonic durations match specification');

console.log('--- Testing SVG Structure & Sacred Geometry Layers ---');
const svg = createAstrolabeSVG();
assert(svg.includes('viewBox="0 0 600 600"'), 'SVG must have viewBox 0 0 600 600');
assert(svg.includes('id="outer-ring"'), 'Must contain outer-ring layer');
assert(svg.includes('id="inner-ring"'), 'Must contain inner-ring layer');
assert(svg.includes('id="geometric-orbits"'), 'Must contain geometric-orbits layer');
assert(svg.includes('id="planets"'), 'Must contain planets layer');
assert(svg.includes('id="ambient-elements"'), 'Must contain ambient-elements layer');
assert(svg.includes('id="central-sun"'), 'Must contain central-sun layer');
assert(svg.includes('id="celestialGlow"'), 'Must contain celestialGlow filter');
assert(svg.includes('id="sun-rays"'), 'Must contain radiant starburst sun rays');
assert(svg.includes('id="sun-face"'), 'Must contain classical engraved sun face');
console.log('✓ All required SVG IDs, filters, and layers present');

console.log('--- Testing Brand Palette Colors ---');
const brandColors = ['#6D0A1D', '#B3791E', '#FFFFFF', '#141414'];
brandColors.forEach(color => {
    assert(svg.toUpperCase().includes(color.toUpperCase()), `SVG must include brand color ${color}`);
});
console.log('✓ Brand palette verified (#6D0A1D, #B3791E, #FFFFFF, #141414)');

console.log('--- Testing 12 Sacred Devanagari Syllables ---');
assert.strictEqual(SANSKRIT_SYLLABLES.length, 12, 'Must contain 12 syllables');
const expectedSyllables = ['ॐ', 'ह्रीं', 'श्रीं', 'क्लीं', 'ऐं', 'गं', 'ह्रां', 'ह्रूं', 'सौः', 'यं', 'रं', 'क्षं'];
expectedSyllables.forEach(s => {
    assert(svg.includes(s), `SVG must contain sacred syllable ${s}`);
});
console.log('✓ All 12 Devanagari Sanskrit syllables verified in SVG inner-ring');

console.log('--- Testing 12 Zodiac Glyphs ---');
assert.strictEqual(ZODIAC_GLYPHS.length, 12, 'Must contain 12 zodiac signs');
const expectedZodiac = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
expectedZodiac.forEach(z => {
    assert(svg.includes(z), `SVG must contain zodiac glyph ${z}`);
});
console.log('✓ All 12 Zodiac signs verified in SVG outer-ring');

console.log('\n========================================');
console.log('ALL ASTROLABE VERIFICATION TESTS PASSED!');
console.log('========================================\n');
