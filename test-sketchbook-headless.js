const assert = require('assert');

// Setup mock browser globals
global.window = global;
global.document = {
    readyState: 'complete',
    addEventListener: () => {},
    getElementById: (id) => {
        if (id === 'sketchbook-tools' || id === 'sketchbook-pillars') {
            return {
                id,
                innerHTML: '',
                querySelector: function(sel) {
                    if (sel.includes('-left-page')) return { id: id + '-left-page', innerHTML: '', style: {} };
                    if (sel.includes('-right-page')) return { id: id + '-right-page', innerHTML: '', style: {} };
                    if (sel.includes('.sb-flipping-leaf')) return { 
                        style: {},
                        querySelector: () => ({ innerHTML: '', querySelector: () => ({ style: {} }) })
                    };
                    if (sel.includes('.sb-book-chassis')) return { style: {}, addEventListener: () => {} };
                    if (sel.includes('.sb-nav-arrow.prev')) return { addEventListener: () => {} };
                    if (sel.includes('.sb-nav-arrow.next')) return { addEventListener: () => {} };
                    if (sel.includes('.sb-plate-dots')) return { 
                        innerHTML: '', 
                        querySelectorAll: () => [], 
                        addEventListener: () => {} 
                    };
                    if (sel.includes('.sb-jump-select')) return { innerHTML: '', value: '0', addEventListener: () => {} };
                    if (sel.includes('.sb-ribbon-bookmark')) return null; // Bookmark line removed!
                    if (sel.includes('.sb-tabs-header')) return { 
                        addEventListener: () => {},
                        querySelectorAll: () => []
                    };
                    if (sel.includes('.sb-component-wrapper')) return { addEventListener: () => {} };
                    return null;
                }
            };
        }
        return null;
    }
};

// Mock GSAP for test page turns
global.gsap = {
    timeline: (cfg) => {
        if (cfg && typeof cfg.onComplete === 'function') {
            setTimeout(cfg.onComplete, 10);
        }
        return {
            fromTo: () => ({}),
            play: () => {},
            progress: () => {},
            call: () => {}
        };
    },
    fromTo: () => ({})
};

const sb = require('./js/sketchbook.js');

console.log('--- Testing SacredSketchbook Instantiation for 20 Tools ---');
assert.strictEqual(sb.TWENTY_TOOLS_PAGES.length, 20, 'Should have exactly 20 pages in TWENTY_TOOLS_PAGES');

const instance = new sb.SacredSketchbook('sketchbook-tools', sb.TWENTY_TOOLS_PAGES, { enableTabs: true });
assert(instance !== null, 'Instance should be created');
assert.strictEqual(instance.total, 20, 'Total pages should be 20');
assert.strictEqual(instance.currentIndex, 0, 'Current index should start at 0');
assert.strictEqual(instance.ribbonEl, null, 'Ribbon bookmark element should be null');

console.log('--- Testing Category Filtering ---');
const cats = instance.getCategories();
assert(cats.includes('CLASSICAL VASTU'), 'Should have CLASSICAL VASTU category');
assert(cats.includes('SACRED NUMEROLOGY'), 'Should have SACRED NUMEROLOGY category');

// Filter Vastu
instance.filterCategory('CLASSICAL VASTU');
assert.strictEqual(instance.total, 10, 'Filtered Vastu should have 10 tools');
assert.strictEqual(instance.filteredPages[0].toolId, 'house-vastu-analyzer');

// Filter Numerology
instance.filterCategory('SACRED NUMEROLOGY');
assert.strictEqual(instance.total, 10, 'Filtered Numerology should have 10 tools');
assert.strictEqual(instance.filteredPages[0].toolId, 'name-number');

// Filter ALL
instance.filterCategory('ALL');
assert.strictEqual(instance.total, 20, 'ALL category should have 20 tools');

console.log('--- Testing HTML Spread Rendering & Trigger CTA ---');
const p = instance.filteredPages[0];
const rightHTML = instance.renderRightHTML(p, 0);
assert(rightHTML.includes("openToolDirectly('house-vastu-analyzer')"), 'Right HTML should call openToolDirectly for toolId');
assert(rightHTML.includes("Treatise Canon:"), 'Right HTML should include Treatise Canon citation');
assert(rightHTML.includes("Mayamata Ch. 25"), 'Right HTML should include Mayamata reference');

const leftHTML = instance.renderLeftHTML(p);
assert(leftHTML.includes("<svg"), 'Left HTML should include SVG plate');
assert(leftHTML.includes("sb-plate-canvas"), 'Left HTML should include plate canvas');

// Test fallback page turn with setTimeout
instance.turnTo(5, 'next');
setTimeout(() => {
    assert.strictEqual(instance.currentIndex, 5, 'Index should be 5 after turnTo completion');
    console.log('✓ Page turn complete, current index:', instance.currentIndex);
    console.log('\n======================================================');
    console.log('ALL 20-TOOL SKETCHBOOK HEADLESS INTEGRATION TESTS PASSED!');
    console.log('======================================================\n');
}, 150);
