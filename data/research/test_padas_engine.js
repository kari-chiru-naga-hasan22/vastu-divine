
const engine = require('../../js/vastu-engine.js');
console.log('Total Padas in VastuEngine:', engine.padas.length);
engine.padas.forEach(p => {
  console.log(`[${p.id}|#${p.index}] Deity: ${p.deity} | Quality: ${p.quality} | Score: ${p.score} | Source: ${p.source}`);
});
