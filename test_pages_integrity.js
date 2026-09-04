const fs = require('fs');
const path = require('path');

const pages = [
    'pages/discover.html',
    'pages/numerology.html',
    'pages/vastu.html',
    'pages/shop.html',
    'pages/consultations.html',
    'pages/methodology.html'
];

let hasError = false;

console.log('=== VASTU DIVINE PAGES INTEGRITY CHECK ===\n');

pages.forEach(relPath => {
    const fullPath = path.join(__dirname, relPath);
    if (!fs.existsSync(fullPath)) {
        console.error(`❌ MISSING FILE: ${relPath}`);
        hasError = true;
        return;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const sizeKb = (content.length / 1024).toFixed(1);
    console.log(`✓ ${relPath} exists (${sizeKb} KB)`);

    // Check basic HTML structure
    if (!content.includes('<!DOCTYPE html>') || !content.includes('</html>')) {
        console.error(`  ❌ Malformed HTML in ${relPath}`);
        hasError = true;
    }

    // Check canonical fonts and css
    if (!content.includes('Cinzel') || !content.includes('main.css')) {
        console.error(`  ❌ Missing brand typography or main.css in ${relPath}`);
        hasError = true;
    }

    // Check asset links
    const assetMatches = content.match(/href="(\.\.\/assets\/[^"]+)"|src="(\.\.\/assets\/[^"]+)"/g) || [];
    assetMatches.forEach(m => {
        const clean = m.replace(/^href="/, '').replace(/^src="/, '').replace(/"$/, '');
        const assetPath = path.join(__dirname, 'pages', clean);
        if (!fs.existsSync(assetPath)) {
            console.error(`  ❌ Broken asset reference: ${clean} in ${relPath}`);
            hasError = true;
        }
    });

    // Check internal page cross-links
    const linkMatches = content.match(/href="([^"#:]+\.html)"/g) || [];
    linkMatches.forEach(m => {
        const clean = m.replace(/^href="/, '').replace(/"$/, '');
        const targetPath = path.join(__dirname, 'pages', clean);
        if (!fs.existsSync(targetPath)) {
            console.error(`  ❌ Broken page link: ${clean} in ${relPath}`);
            hasError = true;
        }
    });
});

console.log('\n=== CHECKING BUTTON ROUTING IN js/sketchbook.js ===');
const sbContent = fs.readFileSync(path.join(__dirname, 'js/sketchbook.js'), 'utf8');
const expectedPillarLinks = [
    'pages/discover.html',
    'pages/numerology.html',
    'pages/vastu.html',
    'pages/shop.html'
];

expectedPillarLinks.forEach(link => {
    if (sbContent.includes(link)) {
        console.log(`✓ Sacred Sketchbook routes to: ${link}`);
    } else {
        console.error(`❌ Sacred Sketchbook MISSING route to: ${link}`);
        hasError = true;
    }
});

if (sbContent.includes('pages/consultations.html')) {
    console.log('✓ Sacred Sketchbook routes to: pages/consultations.html');
} else {
    console.error('❌ Sacred Sketchbook MISSING route to: pages/consultations.html');
    hasError = true;
}

if (!hasError) {
    console.log('\n🎉 ALL PAGES AND LINKS VERIFIED WITH 100% INTEGRITY!');
    process.exit(0);
} else {
    console.error('\n⚠️ Integrities check failed.');
    process.exit(1);
}
