const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const targetExts = ['.jsx', '.tsx'];

walkDir('./src', (filePath) => {
  if (targetExts.includes(path.extname(filePath))) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/168,85,247/g, '249,115,22'); 
    content = content.replace(/147,51,234/g, '234,88,12'); 
    content = content.replace(/192,132,252/g, '251,146,60'); 
    content = content.replace(/139,\s*92,\s*246/g, '249, 115, 22'); // in Hero.jsx 

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Updated:', filePath);
    }
  }
});
