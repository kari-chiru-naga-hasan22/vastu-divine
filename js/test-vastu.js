const engine = require('./vastu-engine.js');
const assert = require('assert');

console.log("=== TESTING ALL 10 CLASSICAL VASTU TOOLS IN VASTU-ENGINE.JS ===");

let passed = 0;
let failed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passed++;
  } catch (e) {
    console.error(`[FAIL] ${name}:`, e.message);
    failed++;
  }
}

// 1. House Vastu Analyzer
runTest("1. calculateHouseVastu", () => {
  const input = {
    facing: "North",
    rooms: {
      kitchen: "SE",
      masterBedroom: "SW",
      puja: "NE",
      living: "East",
      toilet: "WNW",
      waterTank: "NE"
    }
  };
  const res = engine.calculateHouseVastu(input);
  assert.ok(res, "Result should exist");
  assert.strictEqual(res.toolId, "house-vastu-analyzer");
  assert.ok(res.score >= 0 && res.score <= 100, "Score between 0-100");
  assert.ok(res.assessment, "Assessment must exist");
  assert.ok(res.sourceReference.includes("Manuṣyālaya Candrikā") || res.sourceReference.includes("Mayamata"), "Source reference must cite classical texts");
  assert.ok(res.variationNote, "Variation note must exist");
  console.log(`    House Score: ${res.score} | Assessment: ${res.assessment}`);
});

// 2. Plot Vastu Analyzer
runTest("2. calculatePlotVastu", () => {
  const input = {
    shape: "Square",
    slope: "North-East",
    roadFacing: "East",
    soilType: "Loamy/White"
  };
  const res = engine.calculatePlotVastu(input);
  assert.ok(res, "Result should exist");
  assert.strictEqual(res.toolId, "plot-vastu-analyzer");
  assert.ok(res.score > 70, "Square plot with NE slope should score high");
  assert.ok(res.sourceReference.includes("Mānasāra") || res.sourceReference.includes("Mayamata"), "Source reference must cite classical texts");
  console.log(`    Plot Score: ${res.score} | Assessment: ${res.assessment}`);
});

// 3. Main Door Vastu
runTest("3. calculateMainDoorVastu", () => {
  // Test Jayanta (E3)
  const resE3 = engine.calculateMainDoorVastu({ padaId: "E3" });
  assert.strictEqual(resE3.toolId, "main-door-vastu");
  assert.strictEqual(resE3.pada.id, "E3");
  assert.strictEqual(resE3.assessment, "Highly Auspicious");
  assert.ok(resE3.score >= 90);

  // Test Shikhi (E1) - Severe Dosha
  const resE1 = engine.calculateMainDoorVastu({ padaId: "E1" });
  assert.ok(resE1.score <= 30);
  assert.ok(resE1.assessment.includes("Dosha") || resE1.assessment.includes("Inauspicious"));

  console.log(`    E3 Door: ${resE3.pada.deity} (${resE3.score}) | E1 Door: ${resE1.pada.deity} (${resE1.score})`);
});

// 4. House Facing Calculator
runTest("4. calculateFacing", () => {
  const res = engine.calculateFacing({ degrees: 90 }); // Pure East
  assert.ok(res);
  assert.strictEqual(res.toolId, "house-facing-calculator");
  assert.ok(res.assessment);
  assert.ok(res.direction);
  console.log(`    Facing 90 deg: ${res.direction} | Assessment: ${res.assessment} | Ayadi Yoni: ${res.ayadi ? res.ayadi.yoniName : 'N/A'}`);
});

// 5. Bedroom Vastu
runTest("5. calculateBedroomVastu", () => {
  // Optimal: SW bedroom, head South
  const resOpt = engine.calculateBedroomVastu({ zone: "SW", headDirection: "South", occupant: "Master/Owner" });
  assert.ok(resOpt);
  assert.strictEqual(resOpt.toolId, "bedroom-vastu");
  assert.ok(resOpt.score >= 85, "SW bedroom with head South should score >= 85");

  // Prohibited: Head North
  const resNorthHead = engine.calculateBedroomVastu({ zone: "SW", headDirection: "North", occupant: "Master/Owner" });
  assert.ok(resNorthHead.score < resOpt.score, "Head North should be penalized");
  console.log(`    SW Bed (Head South): Score ${resOpt.score} | SW Bed (Head North): Score ${resNorthHead.score}`);
});

// 6. Kitchen Vastu
runTest("6. calculateKitchenVastu", () => {
  // Agneya (SE) - Prime
  const resSE = engine.calculateKitchenVastu({ zone: "SE", stoveFacing: "East" });
  assert.ok(resSE);
  assert.strictEqual(resSE.toolId, "kitchen-vastu");
  assert.ok(resSE.score >= 90, "SE Kitchen should score >= 90");

  // NE Kitchen - Major Dosha
  const resNE = engine.calculateKitchenVastu({ zone: "NE", stoveFacing: "North" });
  assert.ok(resNE.score <= 30, "NE Kitchen should be heavily penalized");
  console.log(`    SE Kitchen: Score ${resSE.score} | NE Kitchen: Score ${resNE.score}`);
});

// 7. Toilet & Bathroom Vastu
runTest("7. calculateToiletVastu", () => {
  // WNW - Optimal
  const resWNW = engine.calculateToiletVastu({ zone: "WNW", facing: "North" });
  assert.ok(resWNW);
  assert.strictEqual(resWNW.toolId, "toilet-bathroom-vastu");
  assert.ok(resWNW.score >= 85, "WNW Toilet should score >= 85");

  // NE Toilet - Catastrophic Dosha
  const resNE = engine.calculateToiletVastu({ zone: "NE", facing: "East" });
  assert.ok(resNE.score <= 20, "NE Toilet should be catastrophic dosha (score <= 20)");
  console.log(`    WNW Toilet: Score ${resWNW.score} | NE Toilet: Score ${resNE.score}`);
});

// 8. Puja Room Vastu
runTest("8. calculatePujaVastu", () => {
  // NE - Prime
  const resNE = engine.calculatePujaVastu({ zone: "NE", idolFacing: "East" });
  assert.ok(resNE);
  assert.strictEqual(resNE.toolId, "puja-room-vastu");
  assert.ok(resNE.score >= 90, "NE Puja room should score >= 90");

  // South / SW Puja - Inauspicious
  const resSW = engine.calculatePujaVastu({ zone: "SW", idolFacing: "South" });
  assert.ok(resSW.score <= 40, "SW Puja room should score <= 40");
  console.log(`    NE Puja: Score ${resNE.score} | SW Puja: Score ${resSW.score}`);
});

// 9. Water Vastu
runTest("9. calculateWaterVastu", () => {
  // NE Underground tank
  const resNEUnder = engine.calculateWaterVastu({ waterType: "underground_tank", zone: "NE" });
  assert.ok(resNEUnder);
  assert.strictEqual(resNEUnder.toolId, "water-vastu");
  assert.ok(resNEUnder.score >= 85, "NE underground tank should score >= 85");

  // SW Underground tank (Severe Dosha)
  const resSWUnder = engine.calculateWaterVastu({ waterType: "underground_tank", zone: "SW" });
  assert.ok(resSWUnder.score <= 25, "SW underground tank should be severe dosha");

  // SW Overhead tank (Auspicious)
  const resSWOver = engine.calculateWaterVastu({ waterType: "overhead_tank", zone: "SW" });
  assert.ok(resSWOver.score >= 80, "SW overhead tank should be auspicious");
  console.log(`    NE Underground: ${resNEUnder.score} | SW Underground: ${resSWUnder.score} | SW Overhead: ${resSWOver.score}`);
});

// 10. Staircase Vastu
runTest("10. calculateStaircaseVastu", () => {
  // SW Clockwise odd steps
  const resSW = engine.calculateStaircaseVastu({ zone: "SW", turnDirection: "Clockwise", stepCount: 21, underStairsUsage: "storage" });
  assert.ok(resSW);
  assert.strictEqual(resSW.toolId, "staircase-vastu");
  assert.ok(resSW.score >= 85, "SW Clockwise 21 steps should score >= 85");

  // NE Counter-clockwise even steps with toilet under stairs
  const resNE = engine.calculateStaircaseVastu({ zone: "NE", turnDirection: "Counter-Clockwise", stepCount: 20, underStairsUsage: "toilet" });
  assert.ok(resNE.score <= 25, "NE Counter-clockwise staircase with toilet under stairs should be severe dosha");
  console.log(`    SW Staircase: ${resSW.score} | NE Staircase: ${resNE.score}`);
});

console.log(`\n==================================================`);
console.log(`VASTU ENGINE TESTS SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log(`==================================================`);
if (failed > 0) process.exit(1);
