const fs = require('fs');
const file = 'src/pages/Internship.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/var\(--black\)/g, 'var(--bg)');
content = content.replace(/var\(--text-inverse\)/g, 'var(--text-primary)');
content = content.replace(/#CBD5E1/g, 'var(--text-secondary)');
content = content.replace(/#94A3B8/g, 'var(--text-tertiary)');
content = content.replace(/rgba\(255, 255, 255, 0\.03\)/g, 'var(--surface)');
content = content.replace(/rgba\(255, 255, 255, 0\.1\)/g, 'var(--border)');
content = content.replace(/rgba\(255, 255, 255, 0\.02\)/g, 'var(--surface2)');
content = content.replace(/rgba\(255, 255, 255, 0\.05\)/g, 'var(--border-light)');
// Button text color
content = content.replace(/color: '#FFFFFF'/g, "color: '#FFFFFF'"); // No change
// Glow and blurs
content = content.replace(/rgba\(255,255,255,0\.3\)/g, 'rgba(0,0,0,0.05)');

fs.writeFileSync(file, content);
console.log('Replaced colors in Internship.jsx');
