const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Replace hardcoded white texts with --text-primary
      const replacements = [
        { from: /color: 'white'/g, to: "color: 'var(--text-primary)'" },
        { from: /color: '#FFFFFF'/g, to: "color: 'var(--text-primary)'" },
        { from: /color: 'rgba\(255,255,255,0\.84\)'/g, to: "color: 'var(--text-primary)'" },
        { from: /color: 'rgba\(255,255,255,0\.95\)'/g, to: "color: 'var(--text-primary)'" },
        { from: /color: 'rgba\(255,255,255,0\.62\)'/g, to: "color: 'var(--text-secondary)'" },
        // borders and backgrounds using rgba white
        { from: /rgba\(255,255,255,0\.4\)/g, to: 'var(--border)' },
        { from: /rgba\(255,255,255,0\.3\)/g, to: 'var(--border)' },
        { from: /rgba\(255,255,255,0\.2\)/g, to: 'var(--border-light)' },
        { from: /rgba\(255,255,255,0\.25\)/g, to: 'var(--border-light)' },
        { from: /rgba\(255,255,255,0\.08\)/g, to: 'var(--surface2)' },
        { from: /rgba\(255,255,255,0\.06\)/g, to: 'transparent' },
        { from: /rgba\(255,255,255,0\.15\)/g, to: 'rgba(0,0,0,0.1)' },
        // dark glassmorphism
        { from: /rgba\(15,23,42,0\.75\)/g, to: 'var(--surface)' },
        { from: /rgba\(0,0,0,0\.9\)/g, to: 'rgba(0,0,0,0.1)' },
        { from: /rgba\(0,0,0,0\.45\)/g, to: 'rgba(0,0,0,0.05)' },
        // also replace #fff -> text-primary except for buttons (maybe buttons are fine if I just leave them)
      ];

      for (const rep of replacements) {
        if (content.match(rep.from)) {
          content = content.replace(rep.from, rep.to);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed text visibility in:', fullPath);
      }
    }
  }
}

processDir(path.join(__dirname, 'src', 'components', 'home'));
