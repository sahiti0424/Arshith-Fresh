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

      // Swap black background to elegant background
      if (content.includes('var(--black)')) {
        content = content.replace(/var\(--black\)/g, 'var(--bg)');
        changed = true;
      }
      
      // Swap text-inverse (white) to text-primary (charcoal) for readability on light bg
      if (content.includes('var(--text-inverse)')) {
        content = content.replace(/var\(--text-inverse\)/g, 'var(--text-primary)');
        changed = true;
      }
      
      // Additional hardcoded string replacements
      const replacements = [
        { from: /#0F172A/g, to: 'var(--text-primary)' },
        { from: /#1E293B/g, to: 'var(--charcoal)' },
        { from: /#E8F4F8/g, to: 'var(--bg)' },
        { from: /#D4E9F0/g, to: 'var(--bg-warm)' },
        { from: /#2563EB/g, to: 'var(--accent)' },
        { from: /#1D4ED8/g, to: 'var(--accent-dark)' },
        { from: /#3B82F6/g, to: 'var(--accent-light)' },
        { from: /#B0D4E1/g, to: 'var(--border)' },
        { from: /#C8E3ED/g, to: 'var(--border-light)' },
        { from: /#475569/g, to: 'var(--text-secondary)' },
        { from: /#64748B/g, to: 'var(--text-tertiary)' },
        { from: /rgba\(245, 242, 236, 0\.7\)/g, to: 'var(--text-secondary)' },
        { from: /#CBD5E1/g, to: 'var(--text-secondary)' },
        { from: /#94A3B8/g, to: 'var(--text-tertiary)' },
        { from: /#F8FAFC/g, to: 'var(--text-inverse)' },
      ];

      for (const rep of replacements) {
        if (content.match(rep.from)) {
          content = content.replace(rep.from, rep.to);
          changed = true;
        }
      }

      // But we shouldn't replace text-inverse with primary inside buttons that have accent background.
      // E.g., if a button has `background: 'var(--accent)'` it should have `color: 'var(--text-inverse)'`.
      // The script might mess up button text colors if it blind replaced `#F8FAFC` to `var(--text-inverse)`.
      // Actually `text-inverse` is white `#FFFFFF` in our new theme, so leaving it as `--text-inverse` is correct for buttons!
      // But wait, the first rule replaced `var(--text-inverse)` with `var(--text-primary)`. That would make button text charcoal!
      // To fix this, I will manually review `Navbar.jsx`, `Footer.jsx`, `ApplicationModal.jsx` and buttons.
      
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated:', fullPath);
      }
    }
  }
}

processDir(path.join(__dirname, 'src', 'components'));
processDir(path.join(__dirname, 'src', 'pages'));
