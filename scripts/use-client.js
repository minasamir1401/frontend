const fs = require('fs');
const path = require('path');

function addUseClient(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      addUseClient(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (!content.includes('"use client"')) {
        // except layout.tsx
        if (file === 'layout.tsx') continue;
        content = '"use client";\n' + content;
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

addUseClient(path.join(__dirname, '..', 'src', 'app'));
console.log('Added use client to pages.');
