const fs = require('fs');
const path = require('path');
const dir = './src/components';
const files = fs.readdirSync(dir);
files.forEach(f => {
  if (f.endsWith('.jsx') || f.endsWith('.tsx')) {
    const p = path.join(dir, f);
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(/#fff/g, 'var(--text)');
    fs.writeFileSync(p, c);
    console.log(`Replaced in ${f}`);
  }
});
