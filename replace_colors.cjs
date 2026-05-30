const fs = require('fs');
const path = require('path');

const dir = '/Users/sahitiakella/Downloads/importnt 2 3/importnt 2/src';

const replacements = {
  '#E8F4F8': 'var(--bg)',
  '#D4E9F0': 'var(--bg-warm)',
  '#F0F8FB': 'var(--surface)',
  '#D9EDF4': 'var(--surface2)',
  '#C4E0EA': 'var(--surface3)',
  '#B0D4E1': 'var(--border)',
  '#C8E3ED': 'var(--border-light)',
  '#2563EB': 'var(--accent)',
  '#3B82F6': 'var(--accent-light)',
  '#1D4ED8': 'var(--accent-dark)',
  'rgba(37,99,235,0.12)': 'var(--accent-muted)',
  'rgba(37,99,235,0.25)': 'var(--accent-border)',
  '#1E293B': 'var(--charcoal)',
  '#334155': 'var(--charcoal-soft)',
  '#0F172A': 'var(--text-primary)',
  '#475569': 'var(--text-secondary)',
  '#64748B': 'var(--text-tertiary)',
  '#F8FAFC': 'var(--text-inverse)',
  '#D97706': 'var(--gold)',
  'rgba(37,99,235,0.1)': 'var(--accent-muted)'
};

function walkDir(d) {
  const files = fs.readdirSync(d);
  files.forEach(f => {
    const fullPath = path.join(d, f);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      if (fullPath.includes('index.css')) return;
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      for (const [key, value] of Object.entries(replacements)) {
        content = content.split(key).join(value);
        content = content.split(key.toLowerCase()).join(value);
      }
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  });
}

walkDir(dir);
