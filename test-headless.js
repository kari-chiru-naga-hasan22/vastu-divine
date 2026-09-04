const assert = require('assert');

// Simple DOM Mock for headless testing
global.document = {
    readyState: 'complete',
    addEventListener: () => {},
    createElement: (tag) => ({ className: '', tagName: tag }),
    querySelector: (sel) => {
        if (sel === '#test-container') {
            return mockContainer;
        }
        return null;
    }
};

const elements = [];
const mockContainer = {
    classList: {
        classes: new Set(),
        add(c) { this.classes.add(c); },
        remove(c) { this.classes.delete(c); },
        contains(c) { return this.classes.has(c); },
        toggle(c, force) {
            if (force !== undefined) {
                if (force) this.add(c); else this.remove(c);
            } else {
                if (this.contains(c)) this.remove(c); else this.add(c);
            }
        }
    },
    style: {
        setProperty(k, v) { this[k] = v; }
    },
    children: [],
    appendChild(child) { this.children.push(child); return child; },
    insertAdjacentHTML(pos, html) {
        this.innerHtml = html;
        this.svgElement = mockSvg;
    },
    querySelector(sel) {
        if (sel.includes('glow')) return null;
        if (sel.includes('svg')) return mockSvg;
        return null;
    },
    addEventListener() {},
    removeEventListener() {},
    getBoundingClientRect() { return { left: 0, top: 0, width: 400, height: 400 }; }
};

const createMockLayer = (id) => ({
    id,
    removeAttribute() {},
    setAttribute(k, v) { this[k] = v; },
    style: {}
});

const mockSvg = {
    style: {},
    querySelector(sel) {
        const id = sel.replace('#', '');
        return createMockLayer(id);
    }
};

const { initAstrolabe } = require('./js/astrolabe.js');

console.log('--- Testing initAstrolabe with DOM Mock ---');
const astro = initAstrolabe('#test-container', { speedMultiplier: 1.5, interactive: true });

assert(astro !== null, 'Astrolabe instance should be created');
assert.strictEqual(typeof astro.play, 'function', 'Instance should have play()');
assert.strictEqual(typeof astro.pause, 'function', 'Instance should have pause()');
assert.strictEqual(typeof astro.toggle, 'function', 'Instance should have toggle()');
assert.strictEqual(typeof astro.setSpeed, 'function', 'Instance should have setSpeed()');
assert.strictEqual(typeof astro.destroy, 'function', 'Instance should have destroy()');

console.log('--- Testing Play / Pause State ---');
astro.pause();
assert.strictEqual(astro.isPaused(), true, 'Should be paused');
astro.play();
assert.strictEqual(astro.isPaused(), false, 'Should be running');

console.log('--- Testing Speed Multiplier Update ---');
astro.setSpeed(2.5);
assert.strictEqual(mockContainer.style['--astro-dur-outer'], '26s', 'Duration should scale inversely with speed');

console.log('--- Testing Cleanup / Destroy ---');
astro.destroy();
console.log('✓ Instance destroyed cleanly');

console.log('\n=============================================');
console.log('ALL HEADLESS CONTROLLER DOM TESTS PASSED!');
console.log('=============================================\n');
