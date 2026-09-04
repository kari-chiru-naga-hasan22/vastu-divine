const vastuEngine = require('./vastu-engine.js');
const numEngine = require('./numerology-engine.js');
const assert = require('assert');

console.log("=== COMPREHENSIVE OUTPUT SCHEMA VERIFICATION (ALL 20 TOOLS) ===");

let passed = 0;
let failed = 0;

function verifySchema(toolName, result, isVastu = true) {
  try {
    assert.ok(result, `${toolName} returned null or undefined`);
    assert.ok(result.toolId, `${toolName} missing toolId`);
    assert.ok(result.elementName, `${toolName} missing elementName`);
    assert.ok(result.assessment, `${toolName} missing assessment`);
    assert.ok(result.sourceReference, `${toolName} missing sourceReference`);
    assert.ok(result.plainRule, `${toolName} missing plainRule`);

    if (isVastu) {
      assert.ok(result.tradition, `${toolName} missing tradition`);
      assert.ok(result.variationNote, `${toolName} missing variationNote`);
    } else {
      assert.ok(result.system, `${toolName} missing system`);
      assert.ok(result.disclaimer, `${toolName} missing disclaimer`);
    }
    console.log(`[PASS] ${toolName} -> Output schema 100% compliant.`);
    passed++;
  } catch (err) {
    console.error(`[FAIL] ${toolName}: ${err.message}`);
    failed++;
  }
}

// 10 VASTU TOOLS
verifySchema("Vastu 1: calculateHouseVastu", vastuEngine.calculateHouseVastu({ facing: "East", rooms: { kitchen: "SE" } }), true);
verifySchema("Vastu 2: calculatePlotVastu", vastuEngine.calculatePlotVastu({ shape: "Square", slope: "NE" }), true);
verifySchema("Vastu 3: calculateMainDoorVastu", vastuEngine.calculateMainDoorVastu({ padaId: "E4" }), true);
verifySchema("Vastu 4: calculateFacing", vastuEngine.calculateFacing({ degrees: 90 }), true);
verifySchema("Vastu 5: calculateBedroomVastu", vastuEngine.calculateBedroomVastu({ zone: "SW", headDirection: "South" }), true);
verifySchema("Vastu 6: calculateKitchenVastu", vastuEngine.calculateKitchenVastu({ zone: "SE", cookFacing: "East" }), true);
verifySchema("Vastu 7: calculateToiletVastu", vastuEngine.calculateToiletVastu({ zone: "NW", commodeFacing: "North" }), true);
verifySchema("Vastu 8: calculatePujaVastu", vastuEngine.calculatePujaVastu({ zone: "NE", idolFacing: "East" }), true);
verifySchema("Vastu 9: calculateWaterVastu", vastuEngine.calculateWaterVastu({ waterType: "underground_tank", zone: "NE" }), true);
verifySchema("Vastu 10: calculateStaircaseVastu", vastuEngine.calculateStaircaseVastu({ zone: "SW", turnDirection: "Clockwise", stepCount: 21 }), true);

// 10 NUMEROLOGY TOOLS
verifySchema("Num 1: calculateNameNumber (Chaldean)", numEngine.calculateNameNumber("Sri Ram"), false);
verifySchema("Num 2: calculateNameAnalysis (Chaldean)", numEngine.calculateNameAnalysis("Sita Devi"), false);
verifySchema("Num 3: calculateMobileNumber (Modern)", numEngine.calculateMobileNumber("9876543210"), false);
verifySchema("Num 4: calculateLuckyNumber (Pythagorean)", numEngine.calculateLuckyNumber("15/08/1947"), false);
verifySchema("Num 5: calculateLifePath (Pythagorean)", numEngine.calculateLifePath("15/08/1947"), false);
verifySchema("Num 6: calculateBirthNumber (Pythagorean)", numEngine.calculateBirthNumber("15/08/1947"), false);
verifySchema("Num 7: calculateDestinyNumber (Pythagorean)", numEngine.calculateDestinyNumber("Mohandas Karamchand Gandhi"), false);
verifySchema("Num 8: calculateBusinessName (Modern)", numEngine.calculateBusinessName("Vastu Divine Technologies"), false);
verifySchema("Num 9: calculateVehicleNumber (Modern)", numEngine.calculateVehicleNumber("MH 01 AB 1234"), false);
verifySchema("Num 10: calculateNameDobCompatibility (Modern)", numEngine.calculateNameDobCompatibility("Arjun", "01/01/1990", "Subhadra", "02/02/1992"), false);

console.log(`\n==================================================`);
console.log(`SCHEMA AUDIT TOTAL: ${passed} PASSED, ${failed} FAILED`);
console.log(`==================================================`);
if (failed > 0) process.exit(1);
