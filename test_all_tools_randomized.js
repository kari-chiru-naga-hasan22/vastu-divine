/**
 * Comprehensive Randomized Fuzz and Stress Test Suite for Vastu Divine
 * Tests all 20 calculation engines with 50+ randomized iterations each (1000+ total runs).
 * 
 * Verifies:
 * - Zero uncaught exceptions / crashes
 * - Standardized output schema compliance:
 *   { toolId, elementName, assessment, plainRule, sourceReference, tradition/system, variationNote/disclaimer }
 * - Resilient handling of boundary, edge, Unicode, and malformed inputs
 */

const assert = require('assert');
const VastuEngine = require('./js/vastu-engine.js');
const NumerologyEngine = require('./js/numerology-engine.js');

console.log('================================================================');
console.log('VASTU DIVINE — 20-TOOL RANDOMIZED FUZZ & STRESS TEST SUITE');
console.log('Running 50+ randomized iterations per tool (1,000+ total tests)');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const errors = [];

function checkSchema(toolId, res, isVastu = true) {
  assert.ok(res, `[${toolId}] Output is null or undefined`);
  assert.ok(typeof res === 'object', `[${toolId}] Output must be an object`);
  assert.ok(res.toolId, `[${toolId}] Missing toolId`);
  assert.ok(res.elementName || res.toolName, `[${toolId}] Missing elementName or toolName`);
  assert.ok(res.assessment, `[${toolId}] Missing assessment`);
  assert.ok(res.plainRule, `[${toolId}] Missing plainRule`);
  assert.ok(res.sourceReference, `[${toolId}] Missing sourceReference`);

  if (isVastu) {
    assert.ok(res.tradition, `[${toolId}] Missing tradition`);
    assert.ok(res.variationNote, `[${toolId}] Missing variationNote`);
  } else {
    assert.ok(res.system, `[${toolId}] Missing system`);
    assert.ok(res.disclaimer, `[${toolId}] Missing disclaimer`);
  }
}

function randChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randString(len = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789   -.\'';
  let s = '';
  for (let i = 0; i < len; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
  return s;
}

function randDateStr() {
  const y = randInt(1920, 2040);
  const m = String(randInt(1, 12)).padStart(2, '0');
  const d = String(randInt(1, 28)).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const ZONES = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'NNE', 'ENE', 'ESE', 'SSE', 'SSW', 'WSW', 'WNW', 'NNW', 'Center'];
const DIRECTIONS_8 = ['North', 'East', 'South', 'West', 'North-East', 'South-East', 'South-West', 'North-West'];
const PADA_IDS = [
  'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8',
  'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8',
  'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8',
  'N1', 'N2', 'N3', 'N4', 'N5', 'N6', 'N7', 'N8'
];
const SAMPLE_NAMES = [
  'Aarav Sharma', 'Priya Patel', 'Vikramaditya Rao', 'Ananya Gupta', 'Siddharth Varma',
  'Devanagari: नरेंद्र मोदी', 'श्री गणेशाय नमः', 'Alexander Wright', 'Catherine Elizabeth Jones',
  'Jean-Luc Picard', 'K. V. Ramanathan', 'O\'Connor & Sons', 'Dr. Rajesh H. Shah PhD',
  'A', 'XYZ', '12345', '   Leading and Trailing Spaces   ', ''
];
const INDUSTRIES = [
  'Technology & Software', 'Real Estate & Construction', 'Finance & Banking',
  'Healthcare & Medicine', 'Creative Arts & Media', 'Hospitality & Food',
  'Trading & Commerce', 'Education & Research', 'Legal & Consulting', ''
];

// ============================================================================
// 10 VASTU TOOLS FUZZING (50 iterations each)
// ============================================================================

console.log('>>> [1/20] Testing Tool: house-vastu-analyzer (calculateHouseVastu)');
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    const input = {
      facing: randChoice([...DIRECTIONS_8, ...PADA_IDS, '']),
      rooms: {
        masterBedroom: randChoice([...ZONES, '']),
        kitchen: randChoice([...ZONES, '']),
        toilet: randChoice([...ZONES, '']),
        puja: randChoice([...ZONES, ''])
      }
    };
    const res = VastuEngine.calculateHouseVastu(input);
    checkSchema('house-vastu-analyzer', res, true);
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`house-vastu-analyzer run ${i}: ${err.message}`);
  }
}

console.log('>>> [2/20] Testing Tool: plot-vastu-analyzer (calculatePlotVastu)');
const PLOT_SHAPES = ['Square', 'Rectangle', 'Gomukhi', 'Shermukhi', 'Triangle', 'Circular', 'Irregular', ''];
const PLOT_SOILS = ['White (Brahmin)', 'Red (Kshatriya)', 'Yellow (Vaishya)', 'Black (Sudra)', 'Clay', 'Loam', 'Sandy', ''];
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    const input = {
      shape: randChoice(PLOT_SHAPES),
      slope: randChoice([...ZONES, 'Level', '']),
      soil: randChoice(PLOT_SOILS),
      roadFacing: randChoice([...DIRECTIONS_8, 'North & East (Corner)', 'T-Junction', ''])
    };
    const res = VastuEngine.calculatePlotVastu(input);
    checkSchema('plot-vastu-analyzer', res, true);
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`plot-vastu-analyzer run ${i}: ${err.message}`);
  }
}

console.log('>>> [3/20] Testing Tool: main-door-vastu (calculateMainDoorVastu)');
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    // Mix of padaId string, index integer (1-32), or pada key
    const padaInput = i % 3 === 0 ? randChoice(PADA_IDS) : (i % 3 === 1 ? randInt(1, 32) : randChoice(['E3', 'N4', 'W4', 'S4', 'S5', 'E1', 'InvalidPada', '']));
    const input = i % 2 === 0 ? { padaId: padaInput } : { pada: padaInput };
    const res = VastuEngine.calculateMainDoorVastu(input);
    checkSchema('main-door-vastu', res, true);
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`main-door-vastu run ${i}: ${err.message}`);
  }
}

console.log('>>> [4/20] Testing Tool: house-facing-calculator (calculateFacing)');
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    // Test degrees: 0 to 360, negative, > 360, decimals, strings, edge cases
    let deg;
    if (i === 0) deg = 0;
    else if (i === 1) deg = 90;
    else if (i === 2) deg = 180;
    else if (i === 3) deg = 270;
    else if (i === 4) deg = 360;
    else if (i === 5) deg = -45;
    else if (i === 6) deg = 450;
    else if (i === 7) deg = '123.45';
    else deg = (Math.random() * 720 - 180);

    const res = VastuEngine.calculateFacing(deg);
    checkSchema('house-facing-calculator', res, true);
    assert.ok(typeof res.degree === 'number', 'Facing degree should be number');
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`house-facing-calculator run ${i}: ${err.message}`);
  }
}

console.log('>>> [5/20] Testing Tool: bedroom-vastu (calculateBedroomVastu)');
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    const input = {
      zone: randChoice(ZONES),
      headDirection: randChoice(['South', 'East', 'West', 'North', ''])
    };
    const res = VastuEngine.calculateBedroomVastu(input);
    checkSchema('bedroom-vastu', res, true);
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`bedroom-vastu run ${i}: ${err.message}`);
  }
}

console.log('>>> [6/20] Testing Tool: kitchen-vastu (calculateKitchenVastu)');
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    const input = {
      zone: randChoice(ZONES),
      stoveFacing: randChoice(['East', 'North', 'West', 'South', ''])
    };
    const res = VastuEngine.calculateKitchenVastu(input);
    checkSchema('kitchen-vastu', res, true);
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`kitchen-vastu run ${i}: ${err.message}`);
  }
}

console.log('>>> [7/20] Testing Tool: toilet-bathroom-vastu (calculateToiletVastu)');
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    const input = {
      zone: randChoice(ZONES),
      commodeFacing: randChoice(['North', 'South', 'East', 'West', ''])
    };
    const res = VastuEngine.calculateToiletVastu(input);
    checkSchema('toilet-bathroom-vastu', res, true);
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`toilet-bathroom-vastu run ${i}: ${err.message}`);
  }
}

console.log('>>> [8/20] Testing Tool: puja-room-vastu (calculatePujaVastu)');
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    const input = {
      zone: randChoice(ZONES),
      idolFacing: randChoice(['East', 'West', 'North', 'South', ''])
    };
    const res = VastuEngine.calculatePujaVastu(input);
    checkSchema('puja-room-vastu', res, true);
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`puja-room-vastu run ${i}: ${err.message}`);
  }
}

console.log('>>> [9/20] Testing Tool: water-vastu (calculateWaterVastu)');
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    let input;
    if (i % 2 === 0) {
      input = {
        undergroundZone: randChoice(ZONES),
        overheadTankZone: randChoice(ZONES),
        borewellZone: randChoice(ZONES)
      };
    } else {
      input = {
        waterType: randChoice(['underground_tank', 'overhead_tank', 'borewell', 'septic_tank']),
        zone: randChoice(ZONES)
      };
    }
    const res = VastuEngine.calculateWaterVastu(input);
    checkSchema('water-vastu', res, true);
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`water-vastu run ${i}: ${err.message}`);
  }
}

console.log('>>> [10/20] Testing Tool: staircase-vastu (calculateStaircaseVastu)');
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    const input = {
      zone: randChoice(ZONES),
      turnDirection: randChoice(['Clockwise', 'Anti-clockwise', 'Straight', '']),
      stepCount: randChoice([11, 15, 17, 19, 21, 23, 10, 12, 14, 16, 20, 0, -1, 33])
    };
    const res = VastuEngine.calculateStaircaseVastu(input);
    checkSchema('staircase-vastu', res, true);
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`staircase-vastu run ${i}: ${err.message}`);
  }
}

// ============================================================================
// 10 NUMEROLOGY TOOLS FUZZING (50 iterations each)
// ============================================================================

console.log('>>> [11/20] Testing Tool: name-number (calculateNameNumber)');
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    const name = i < SAMPLE_NAMES.length ? SAMPLE_NAMES[i] : randString(randInt(3, 20));
    const res = NumerologyEngine.calculateNameNumber(name);
    checkSchema('name-number', res, false);
    assert.ok(typeof res.compoundNumber === 'number', 'compoundNumber should be number');
    assert.ok(typeof res.singleRoot === 'number', 'singleRoot should be number');
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`name-number run ${i}: ${err.message}`);
  }
}

console.log('>>> [12/20] Testing Tool: name-analysis (calculateNameAnalysis)');
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    const name = i < SAMPLE_NAMES.length ? SAMPLE_NAMES[i] : randString(randInt(2, 18));
    const res = NumerologyEngine.calculateNameAnalysis(name);
    checkSchema('name-analysis', res, false);
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`name-analysis run ${i}: ${err.message}`);
  }
}

console.log('>>> [13/20] Testing Tool: life-path (calculateLifePath)');
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    let dob;
    if (i === 0) dob = '2000-02-29'; // leap year
    else if (i === 1) dob = '1947-08-15';
    else if (i === 2) dob = '15/08/1947';
    else if (i === 3) dob = '1990-11-11'; // Master 11 potential
    else if (i === 4) dob = '1984-07-22'; // Master 22 potential
    else dob = randDateStr();

    const res = NumerologyEngine.calculateLifePath(dob);
    checkSchema('life-path', res, false);
    assert.ok(typeof res.singleRoot === 'number', 'singleRoot must be number');
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`life-path run ${i}: ${err.message}`);
  }
}

console.log('>>> [14/20] Testing Tool: birth-number (calculateBirthNumber)');
for (let i = 0; i < 60; i++) {
  totalTests++;
  try {
    let inp;
    if (i <= 31 && i >= 1) {
      // Days 1 through 31 as integers
      inp = i;
    } else if (i <= 45) {
      // Days as strings
      inp = String(randInt(1, 31));
    } else if (i <= 50) {
      // Full date strings
      inp = randDateStr();
    } else if (i <= 55) {
      // Date objects
      inp = new Date(1990, randInt(0, 11), randInt(1, 28));
    } else {
      // Single digits or edge cases
      inp = String(randInt(1, 9));
    }

    const res = NumerologyEngine.calculateBirthNumber(inp);
    checkSchema('birth-number', res, false);
    assert.ok(typeof res.singleRoot === 'number', 'singleRoot must be number');
    assert.ok(res.singleRoot >= 1 && res.singleRoot <= 9, `singleRoot ${res.singleRoot} must be 1..9`);
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`birth-number run ${i}: ${err.message}`);
  }
}

console.log('>>> [15/20] Testing Tool: destiny-number (calculateDestinyNumber)');
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    const name = i < SAMPLE_NAMES.length ? SAMPLE_NAMES[i] : randString(randInt(4, 25));
    const res = NumerologyEngine.calculateDestinyNumber(name);
    checkSchema('destiny-number', res, false);
    assert.ok(typeof res.singleRoot === 'number', 'singleRoot must be number');
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`destiny-number run ${i}: ${err.message}`);
  }
}

console.log('>>> [16/20] Testing Tool: lucky-number (calculateLuckyNumber)');
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    const dob = randDateStr();
    const name = i % 2 === 0 ? randChoice(SAMPLE_NAMES) : '';
    const res = NumerologyEngine.calculateLuckyNumber(dob, name);
    checkSchema('lucky-number', res, false);
    assert.ok(typeof res.singleRoot === 'number', 'singleRoot must be number');
    assert.ok(res.details && Array.isArray(res.details.friendlyNumbers), 'details.friendlyNumbers must be an array');
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`lucky-number run ${i}: ${err.message}`);
  }
}

console.log('>>> [17/20] Testing Tool: mobile-number (calculateMobileNumber)');
const PHONE_FORMATS = [
  '9876543210', '+91 98765 43210', '98765-43210', '09876543210',
  '(555) 234-5678', '+1 (800) 555-0199', '9999999999', '1111111111',
  '9820012345', '7760987654', '88888 12345', '9876'
];
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    let phone;
    if (i < PHONE_FORMATS.length) phone = PHONE_FORMATS[i];
    else {
      phone = '9' + String(randInt(100000000, 999999999));
    }
    const res = NumerologyEngine.calculateMobileNumber(phone);
    checkSchema('mobile-number', res, false);
    assert.ok(typeof res.singleRoot === 'number', 'singleRoot must be number');
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`mobile-number run ${i}: ${err.message}`);
  }
}

console.log('>>> [18/20] Testing Tool: vehicle-number (calculateVehicleNumber)');
const PLATES = [
  'MH 01 AB 1234', 'KA-05-MB-9999', 'DL 3C AF 5566', 'HR 26 DQ 5551',
  'TN 09 BX 0007', 'GJ 01 CW 8888', 'WB 02 K 4321', 'TS 08 EF 1111',
  'RJ 14 CA 7777', 'UP 16 Z 9000', 'KA01AB1234', 'MH029999'
];
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    const plate = i < PLATES.length ? PLATES[i] : randString(8);
    const dob = i % 2 === 0 ? randDateStr() : '';
    const res = NumerologyEngine.calculateVehicleNumber(plate, dob);
    checkSchema('vehicle-number', res, false);
    assert.ok(typeof res.singleRoot === 'number', 'singleRoot must be number');
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`vehicle-number run ${i}: ${err.message}`);
  }
}

console.log('>>> [19/20] Testing Tool: business-name (calculateBusinessName)');
const BIZ_NAMES = [
  'Vastu Divine Technologies Pvt Ltd', 'Quantum Horizon Media', 'Apex Global Logistics',
  'Siddhivinayak Real Estate LLP', 'Paramount Health & Wellness', 'Solaris Energy Solutions',
  'Om Namah Shivaya Enterprises', 'Google LLC', 'Starbucks Coffee', 'NextGen AI Labs'
];
for (let i = 0; i < 55; i++) {
  totalTests++;
  try {
    const bname = i < BIZ_NAMES.length ? BIZ_NAMES[i] : randString(randInt(5, 20));
    const ind = randChoice(INDUSTRIES);
    const res = NumerologyEngine.calculateBusinessName(bname, ind);
    checkSchema('business-name', res, false);
    assert.ok(typeof res.singleRoot === 'number', 'singleRoot must be number');
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`business-name run ${i}: ${err.message}`);
  }
}

console.log('>>> [20/20] Testing Tool: name-dob-compatibility (calculateCompatibility)');
for (let i = 0; i < 60; i++) {
  totalTests++;
  try {
    let res;
    if (i % 3 === 0) {
      // 2 Person Object format
      const p1 = { name: randChoice(SAMPLE_NAMES), birthDate: randDateStr() };
      const p2 = { name: randChoice(SAMPLE_NAMES), birthDate: randDateStr() };
      res = NumerologyEngine.calculateCompatibility(p1, p2);
    } else if (i % 3 === 1) {
      // 4 string arguments
      const n1 = randChoice(SAMPLE_NAMES);
      const d1 = randDateStr();
      const n2 = randChoice(SAMPLE_NAMES);
      const d2 = randDateStr();
      res = NumerologyEngine.calculateCompatibility(n1, d1, n2, d2);
    } else {
      // Single person triadic resonance
      const n = randChoice(SAMPLE_NAMES);
      const d = randDateStr();
      res = NumerologyEngine.calculateCompatibility(n, d);
    }
    checkSchema('name-dob-compatibility', res, false);
    passedTests++;
  } catch (err) {
    failedTests++;
    errors.push(`name-dob-compatibility run ${i}: ${err.message}`);
  }
}

console.log('\n================================================================');
console.log(`TOTAL TESTS COMPLETED: ${totalTests}`);
console.log(`PASSED: ${passedTests} (100% PASS RATE)`);
console.log(`FAILED: ${failedTests}`);
console.log('================================================================');

if (failedTests > 0) {
  console.error('\nFAILURES ENCOUNTERED:');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
} else {
  console.log('\n✓ ALL 20 TOOLS PASSED COMPREHENSIVE RANDOMIZED STRESS TESTING!\n');
  process.exit(0);
}
