const Vastu = require('./js/vastu-engine.js');

console.log('Testing Vastu Engine version:', Vastu.version);

// 1. Check all 10 tools with normal inputs
const tools = [
  { name: 'calculateHouseVastu', fn: () => Vastu.calculateHouseVastu({ facing: 'E', kitchen: 'SE', masterBedroom: 'SW', puja: 'NE', toilet: 'NW' }) },
  { name: 'calculatePlotVastu', fn: () => Vastu.calculatePlotVastu({ shape: 'rectangular', slope: 'NE', soilType: 'yellow_sandy', roads: 'east' }) },
  { name: 'calculateMainDoorVastu', fn: () => Vastu.calculateMainDoorVastu({ padaIndex: 4 }) },
  { name: 'calculateFacing', fn: () => Vastu.calculateFacing({ degrees: 90 }) },
  { name: 'calculateBedroomVastu', fn: () => Vastu.calculateBedroomVastu({ zone: 'SW', bedroomType: 'master', bedHeadDirection: 'South' }) },
  { name: 'calculateKitchenVastu', fn: () => Vastu.calculateKitchenVastu({ zone: 'SE', cookingDirection: 'East' }) },
  { name: 'calculateToiletVastu', fn: () => Vastu.calculateToiletVastu({ zone: 'NW', commodeFacing: 'North-South' }) },
  { name: 'calculatePujaVastu', fn: () => Vastu.calculatePujaVastu({ zone: 'NE', deityFacing: 'West' }) },
  { name: 'calculateWaterVastu', fn: () => Vastu.calculateWaterVastu({ zone: 'NE', type: 'subterranean_sump' }) },
  { name: 'calculateStaircaseVastu', fn: () => Vastu.calculateStaircaseVastu({ zone: 'SW', turnDirection: 'clockwise', numberOfSteps: 17 }) }
];

const requiredKeys = ['toolId', 'toolName', 'elementName', 'assessment', 'score', 'tradition', 'sourceReference', 'plainRule', 'remedy', 'variationNote'];

tools.forEach(t => {
  const res = t.fn();
  for (const k of requiredKeys) {
    if (res[k] === undefined || res[k] === null || res[k] === '') {
      throw new Error(`Tool ${t.name} is missing or has empty property: ${k}`);
    }
  }
  console.log(`[PASS] ${t.name} -> ${res.assessment} (Score: ${res.score}/100)`);
});

// 2. Empty/Default inputs resilience
tools.forEach(t => {
  const res = Vastu[t.name]({});
  if (!res.assessment || typeof res.score !== 'number') {
    throw new Error(`Empty input failure in ${t.name}`);
  }
});
console.log('[PASS] All 10 tools handle empty/default inputs gracefully.');

// 3. Dosha Tests
const houseDosha = Vastu.calculateHouseVastu({ facing: 'SW', kitchen: 'NE', masterBedroom: 'NE', puja: 'SW', toilet: 'NE', brahmasthan: 'toilet' });
console.log('[PASS] House Severe Dosha score:', houseDosha.score, houseDosha.assessment);
if (houseDosha.score > 25) throw new Error('House Dosha score should be <= 25');

const yamaDoor = Vastu.calculateMainDoorVastu({ padaIndex: 13 });
console.log('[PASS] Yama Door:', yamaDoor.assessment, yamaDoor.score);
if (yamaDoor.assessment !== 'Severe Dosha') throw new Error('Yama should be Severe Dosha');

const neToilet = Vastu.calculateToiletVastu({ zone: 'NE' });
console.log('[PASS] NE Toilet:', neToilet.assessment, neToilet.score);
if (neToilet.assessment !== 'Severe Dosha') throw new Error('NE Toilet should be Severe Dosha');

const swSump = Vastu.calculateWaterVastu({ zone: 'SW', type: 'subterranean' });
console.log('[PASS] SW Sump:', swSump.assessment, swSump.score);
if (swSump.assessment !== 'Severe Dosha') throw new Error('SW subterranean should be Severe Dosha');

const neStairs = Vastu.calculateStaircaseVastu({ zone: 'NE', turnDirection: 'anticlockwise' });
console.log('[PASS] NE Staircase:', neStairs.assessment, neStairs.score);
if (neStairs.assessment !== 'Severe Dosha') throw new Error('NE staircase should be Severe Dosha');

// 4. SVG Visualizers validation
const compassSvg = Vastu.generateCompassSVG(135, 'SE');
if (!compassSvg.includes('<svg') || !compassSvg.includes('data-quadrant="SE"') || !compassSvg.includes('135.0°')) {
  throw new Error('Compass SVG generation incomplete');
}
console.log('[PASS] Compass SVG validated for SE (135°).');

const padaSvg = Vastu.generatePadaMandalaSVG(28); // Bhallata N4
if (!padaSvg.includes('<svg') || !padaSvg.includes('Bhallata') || !padaSvg.includes('N4')) {
  throw new Error('Pada Mandala SVG generation incomplete');
}
console.log('[PASS] Pada Mandala SVG validated for Pada 28 (Bhallata N4).');

// 5. Database tests
const padas = Vastu.getAllPadas();
if (padas.length !== 32) throw new Error(`Expected 32 padas, found ${padas.length}`);
console.log(`[PASS] 32 Padas Database verified (${padas.length} deities).`);

const dirDetails = Vastu.getDirectionDetails(45);
if (dirDetails.code !== 'NE' || dirDetails.deity !== 'Shiva') throw new Error('Direction lookup failed');
console.log(`[PASS] Direction lookup verified for 45° -> ${dirDetails.name}.`);

console.log('\n========================================');
console.log('ALL TESTS COMPLETED SUCCESSFULLY!');
console.log('========================================');
