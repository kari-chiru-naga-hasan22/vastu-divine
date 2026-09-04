/**
 * Test Suite for Numerology Calculation Engine
 * D:\builds\js\test-numerology.js
 */

const engine = require('./numerology-engine.js');
const assert = require('assert');

console.log("=== STARTING NUMEROLOGY CALCULATION ENGINE TESTS ===");

let passed = 0;
let failed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passed++;
  } catch (err) {
    console.error(`[FAIL] ${name}:`, err.message);
    failed++;
  }
}

// 1. Verify Chaldean Table
runTest("Chaldean Table Verification (1-8 ONLY, No 9)", () => {
  const expected = {
    A:1, B:2, C:3, D:4, E:5, F:8, G:3, H:5, I:1,
    J:1, K:2, L:3, M:4, N:5, O:7, P:8, Q:1, R:2,
    S:3, T:4, U:6, V:6, W:6, X:5, Y:1, Z:7
  };
  for (const [letter, val] of Object.entries(expected)) {
    assert.strictEqual(engine.CHALDEAN_MAP[letter], val, `Chaldean map mismatch for ${letter}`);
    assert.strictEqual(engine.getChaldeanValue(letter), val, `getChaldeanValue mismatch for ${letter}`);
    assert.notStrictEqual(val, 9, `Chaldean letter ${letter} must never be 9`);
  }
  assert.strictEqual(Object.keys(engine.CHALDEAN_MAP).length, 26, "Chaldean map must have 26 letters");
});

// 2. Verify Pythagorean Table
runTest("Pythagorean Table Verification (1-9)", () => {
  const expected = {
    A:1, B:2, C:3, D:4, E:5, F:6, G:7, H:8, I:9,
    J:1, K:2, L:3, M:4, N:5, O:6, P:7, Q:8, R:9,
    S:1, T:2, U:3, V:4, W:5, X:6, Y:7, Z:8
  };
  for (const [letter, val] of Object.entries(expected)) {
    assert.strictEqual(engine.PYTHAGOREAN_MAP[letter], val, `Pythagorean map mismatch for ${letter}`);
    assert.strictEqual(engine.getPythagoreanValue(letter), val, `getPythagoreanValue mismatch for ${letter}`);
  }
  assert.strictEqual(Object.keys(engine.PYTHAGOREAN_MAP).length, 26, "Pythagorean map must have 26 letters");
});

// Helper to validate standardized schema
function validateSchema(res, expectedToolId, expectedSystem) {
  const requiredKeys = [
    'toolId', 'toolName', 'elementName', 'assessment',
    'system', 'sourceReference', 'plainRule', 'breakdown',
    'compoundNumber', 'singleRoot', 'planetLord', 'disclaimer'
  ];

  requiredKeys.forEach(key => {
    assert.ok(key in res, `Missing required key: ${key}`);
  });

  assert.strictEqual(res.toolId, expectedToolId, `toolId expected "${expectedToolId}", got "${res.toolId}"`);
  assert.strictEqual(res.system, expectedSystem, `system expected "${expectedSystem}", got "${res.system}"`);
  assert.strictEqual(res.disclaimer, "This is a traditional esoteric belief system, not an empirical or scientific claim.", "Disclaimer mismatch");
  assert.ok(Array.isArray(res.breakdown), "breakdown must be an array");
  assert.strictEqual(typeof res.compoundNumber, 'number', "compoundNumber must be number");
  assert.strictEqual(typeof res.singleRoot, 'number', "singleRoot must be number");
  assert.strictEqual(typeof res.assessment, 'string', "assessment must be string");
  assert.ok(res.assessment.length > 20, "assessment must be substantial");
  assert.strictEqual(typeof res.plainRule, 'string', "plainRule must be string");
  assert.strictEqual(typeof res.planetLord, 'string', "planetLord must be string");
  assert.strictEqual(typeof res.sourceReference, 'string', "sourceReference must be string");
}

// 3. Tool 1: name-number (Chaldean)
runTest("Tool 1: name-number (Chaldean)", () => {
  // Test "JOHN SMITH"
  // J:1, O:7, H:5, N:5 = 18
  // S:3, M:4, I:1, T:4, H:5 = 17
  // Compound: 35 -> 3+5 = 8
  const res = engine.calculateNameNumber("John Smith");
  validateSchema(res, "name-number", engine.SYSTEMS.CHALDEAN);
  assert.strictEqual(res.compoundNumber, 35, "Compound number for John Smith in Chaldean should be 35");
  assert.strictEqual(res.singleRoot, 8, "Single root for 35 should be 8");
  assert.ok(res.planetLord.includes("Saturn"), "Planet lord for root 8 should include Saturn");
});

// 4. Tool 2: name-analysis (Chaldean)
runTest("Tool 2: name-analysis (Chaldean)", () => {
  const res = engine.calculateNameAnalysis("Alexander");
  validateSchema(res, "name-analysis", engine.SYSTEMS.CHALDEAN);
  assert.ok(res.details, "Should include details object");
  assert.strictEqual(res.details.cornerstone, "A", "Cornerstone should be 'A'");
  assert.strictEqual(res.details.capstone, "R", "Capstone should be 'R'");
  assert.ok(res.details.vowelSum > 0, "Vowel sum should be calculated");
  assert.ok(res.details.consonantSum > 0, "Consonant sum should be calculated");
});

// 5. Tool 3: mobile-number (Modern Practitioner)
runTest("Tool 3: mobile-number (Modern Practitioner)", () => {
  // Mobile: +91 98765 43210 -> digits: 919876543210 (or 9876543210 if without prefix)
  const res = engine.calculateMobileNumber("9876543210");
  validateSchema(res, "mobile-number", engine.SYSTEMS.MODERN);
  // 9+8+7+6+5+4+3+2+1+0 = 45 -> 4+5 = 9
  assert.strictEqual(res.compoundNumber, 45, "Sum of digits 9876543210 is 45");
  assert.strictEqual(res.singleRoot, 9, "Root of 45 is 9");
  assert.strictEqual(res.details.tailDigits, "3210", "Tail digits should be 3210");
  assert.strictEqual(res.details.tailSum, 6, "Tail sum of 3210 is 6");
  assert.strictEqual(res.details.zeroCount, 1, "Zero count should be 1");
});

// 6. Tool 4: lucky-number (Pythagorean)
runTest("Tool 4: lucky-number (Pythagorean)", () => {
  const res = engine.calculateLuckyNumber("1990-07-15");
  validateSchema(res, "lucky-number", engine.SYSTEMS.PYTHAGOREAN);
  // Day: 15 -> 1+5 = 6
  assert.strictEqual(res.singleRoot, 6, "Day root of 15 is 6");
  assert.strictEqual(res.details.triadName, "Spiritual / Creative Triad (3 - 6 - 9)");
  assert.deepStrictEqual(res.details.auspiciousDays, [6, 15, 24], "Auspicious days for root 6");
});

// 7. Tool 5: life-path (Pythagorean) - Standard & Master Numbers
runTest("Tool 5: life-path (Pythagorean) - Standard Reduction", () => {
  // 1985-07-15:
  // Month: 7 -> 7
  // Day: 15 -> 6
  // Year: 1985 -> 1+9+8+5 = 23 -> 5
  // Compound: 7 + 6 + 5 = 18 -> 9
  const res = engine.calculateLifePath("1985-07-15");
  validateSchema(res, "life-path", engine.SYSTEMS.PYTHAGOREAN);
  assert.strictEqual(res.singleRoot, 9, "Life path for 1985-07-15 should be 9");
  assert.strictEqual(res.details.isMasterNumber, false, "Should not be a Master Number");
});

runTest("Tool 5: life-path (Pythagorean) - Master Number 11", () => {
  // Let's test a date yielding Master 11:
  // E.g., 1975-06-16:
  // Month 6 -> 6
  // Day 16 -> 7
  // Year 1975 -> 1+9+7+5 = 22 (Master)
  // 6 + 7 + 22 = 35 -> 8 or Month 6 + Day 7 + Year 4 = 17 -> 8.
  // Let's find a date that sums to 11:
  // E.g. Month: 2, Day: 2, Year: 2007 (2+0+0+7 = 9): 2 + 2 + 9 = 13 -> 4
  // E.g. Month: 1, Day: 1, Year: 2007: 1 + 1 + 9 = 11!
  const res = engine.calculateLifePath("2007-01-01");
  validateSchema(res, "life-path", engine.SYSTEMS.PYTHAGOREAN);
  assert.strictEqual(res.singleRoot, 11, "Life path for 2007-01-01 should be preserved as 11");
  assert.strictEqual(res.details.isMasterNumber, true, "Should be recognized as Master Number");
  assert.strictEqual(res.details.baseSingleDigit, 2, "Base single digit should be 2");
  assert.ok(res.planetLord.includes("Master Number 11"), "Planet lord should mention Master Number 11");
});

runTest("Tool 5: life-path (Pythagorean) - Master Number 22", () => {
  // Month: 4, Day: 9, Year: 2007 (9): 4 + 9 + 9 = 22!
  const res = engine.calculateLifePath("2007-04-09");
  validateSchema(res, "life-path", engine.SYSTEMS.PYTHAGOREAN);
  assert.strictEqual(res.singleRoot, 22, "Life path for 2007-04-09 should be preserved as 22");
  assert.strictEqual(res.details.isMasterNumber, true, "Should be recognized as Master Number");
  assert.strictEqual(res.details.baseSingleDigit, 4, "Base single digit should be 4");
});

runTest("Tool 5: life-path (Pythagorean) - Master Number 33", () => {
  // Let's test date yielding 33:
  // Month 11 (Master), Day 22 (Master), Year 1980 (1+9+8+0 = 18 -> 9):
  // Let's check: 11 + 22 + 9 = 42 -> 6.
  // What about Month 9, Day 6, Year 1999 (1+9+9+9 = 28 -> 10 -> 1)? 9 + 6 + 1 = 16.
  // What about continuous digit sum for 1977-09-07? 1+9+7+7+0+9+0+7 = 40.
  // How about 1989-08-07? 1+9+8+9+0+8+0+7 = 42.
  // How about continuous sum 33: 1979-02-05 -> 1+9+7+9+0+2+0+5 = 33!
  const res = engine.calculateLifePath("1979-02-05");
  validateSchema(res, "life-path", engine.SYSTEMS.PYTHAGOREAN);
  assert.strictEqual(res.singleRoot, 33, "Life path for 1979-02-05 should be preserved as 33");
  assert.strictEqual(res.details.isMasterNumber, true, "Should be recognized as Master Number");
  assert.strictEqual(res.details.baseSingleDigit, 6, "Base single digit should be 6");
});

// 8. Tool 6: birth-number (Pythagorean)
runTest("Tool 6: birth-number (Pythagorean)", () => {
  const res = engine.calculateBirthNumber("1992-11-28");
  validateSchema(res, "birth-number", engine.SYSTEMS.PYTHAGOREAN);
  assert.strictEqual(res.compoundNumber, 28, "Birth day number should be 28");
  assert.strictEqual(res.singleRoot, 1, "28 reduces to 2+8=10->1");
  assert.ok(res.planetLord.includes("Sun"), "Root 1 should be Sun");
});

// 9. Tool 7: destiny-number (Pythagorean)
runTest("Tool 7: destiny-number (Pythagorean) - Standard & Master Number", () => {
  // Pythagorean test for JOHN SMITH:
  // J:1, O:6, H:8, N:5 = 20
  // S:1, M:4, I:9, T:2, H:8 = 24
  // Compound: 44 -> 4+4 = 8
  const res = engine.calculateDestinyNumber("John Smith");
  validateSchema(res, "destiny-number", engine.SYSTEMS.PYTHAGOREAN);
  assert.strictEqual(res.compoundNumber, 44, "Compound for John Smith in Pythagorean is 44");
  assert.strictEqual(res.singleRoot, 8, "Root of 44 is 8");

  // Let's test a name yielding Master Number 11 in Pythagorean:
  // "B B G" -> 2 + 2 + 7 = 11!
  const resMaster = engine.calculateDestinyNumber("B B G");
  validateSchema(resMaster, "destiny-number", engine.SYSTEMS.PYTHAGOREAN);
  assert.strictEqual(resMaster.compoundNumber, 11, "Compound should be 11");
  assert.strictEqual(resMaster.singleRoot, 11, "Master number 11 must be preserved in Destiny Number");
  assert.strictEqual(resMaster.details.isMasterNumber, true, "Should flag as Master Number");
});

// 10. Tool 8: business-name (Modern Practitioner)
runTest("Tool 8: business-name (Modern Practitioner)", () => {
  const res = engine.calculateBusinessName("Apple", "Technology");
  validateSchema(res, "business-name", engine.SYSTEMS.MODERN);
  // Apple in Chaldean: A:1, P:8, P:8, L:3, E:5 = 25 -> 2+5 = 7
  assert.strictEqual(res.compoundNumber, 25, "Apple in Chaldean should be 25");
  assert.strictEqual(res.singleRoot, 7, "Root of 25 is 7");
  assert.ok(res.details.commercialScore > 0, "Commercial score should be calculated");
});

// 11. Tool 9: vehicle-number (Modern Practitioner)
runTest("Tool 9: vehicle-number (Modern Practitioner)", () => {
  // MH 12 AB 1234
  // Cleaned: MH12AB1234
  // Chaldean: M:4, H:5 = 9
  // 1+2 = 3
  // A:1, B:2 = 3
  // 1+2+3+4 = 10
  // Total: 9 + 3 + 3 + 10 = 25 -> 2+5 = 7
  const res = engine.calculateVehicleNumber("MH 12 AB 1234");
  validateSchema(res, "vehicle-number", engine.SYSTEMS.MODERN);
  assert.strictEqual(res.compoundNumber, 25, "Vehicle MH 12 AB 1234 compound should be 25");
  assert.strictEqual(res.singleRoot, 7, "Root of 25 is 7");
  assert.strictEqual(res.details.numericTail, "1234", "Numeric tail should be 1234");
  assert.strictEqual(res.details.tailCompound, 10, "Tail compound is 10");
  assert.strictEqual(res.details.tailRoot, 1, "Tail root is 1");
});

// 12. Tool 10: name-dob-compatibility (Modern Practitioner)
runTest("Tool 10: name-dob-compatibility (Modern Practitioner)", () => {
  const res = engine.calculateNameDobCompatibility("John Smith", "1990-05-15");
  validateSchema(res, "name-dob-compatibility", engine.SYSTEMS.MODERN);
  assert.ok(res.details.overallScore >= 0 && res.details.overallScore <= 100, "Score should be percentage 0-100");
  assert.strictEqual(res.breakdown.length, 3, "Breakdown should have Namank, Mulank, and Bhagyank");
});

// 13. Universal Dispatcher calculate()
runTest("Universal Dispatcher calculate(toolId, params)", () => {
  const tools = [
    { id: "name-number", params: { name: "Alice" } },
    { id: "name-analysis", params: { name: "Alice" } },
    { id: "mobile-number", params: { mobile: "9876543210" } },
    { id: "lucky-number", params: { dob: "1990-01-01" } },
    { id: "life-path", params: { dob: "1990-01-01" } },
    { id: "birth-number", params: { dob: "1990-01-01" } },
    { id: "destiny-number", params: { name: "Alice Smith" } },
    { id: "business-name", params: { name: "Zenith Corp" } },
    { id: "vehicle-number", params: { plate: "KA 01 MJ 5005" } },
    { id: "name-dob-compatibility", params: { name: "Alice Smith", dob: "1990-01-01" } }
  ];

  tools.forEach(t => {
    const res = engine.calculate(t.id, t.params);
    assert.strictEqual(res.toolId, t.id, `Dispatched toolId should match ${t.id}`);
  });
});

// 14. Output Formatters
runTest("Output Formatters (generateTextSummary & generatePrintableSummary)", () => {
  const res = engine.calculateNameNumber("David");
  const text = engine.generateTextSummary(res);
  assert.ok(text.includes("TOOL: Chaldean Name Number Calculator"), "Text summary includes tool name");
  assert.ok(text.includes("DISCLAIMER:"), "Text summary includes disclaimer");

  const html = engine.generatePrintableSummary(res);
  assert.ok(html.includes("numerology-report-card"), "Printable summary includes container");
  assert.ok(html.includes(res.planetLord), "Printable summary includes planet lord");
});

console.log("\n==================================================");
console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log("==================================================");

if (failed > 0) {
  process.exit(1);
} else {
  console.log("ALL NUMEROLOGY ENGINE TESTS SUCCEEDED PERFECTLY!");
}
