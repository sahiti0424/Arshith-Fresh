const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'home');
const files = fs.readdirSync(dir);

for (const file of files) {
  const fullPath = path.join(dir, file);
  if (fullPath.endsWith('.jsx')) {
    let content = fs.readFileSync(fullPath, 'utf8');

    // Fix backgrounds that were mistakenly set to text-primary
    content = content.replace(/background: 'var\(--text-primary\)'/g, "background: 'var(--bg)'");
    
    // Fix card backgrounds that were set to charcoal
    content = content.replace(/background: 'var\(--charcoal\)'/g, "background: 'var(--surface)'");
    content = content.replace(/border: '1px solid var\(--charcoal-soft\)'/g, "border: '1px solid var(--border)'");
    
    fs.writeFileSync(fullPath, content);
    console.log('Fixed logic in:', fullPath);
  }
}
