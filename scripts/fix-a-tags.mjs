import fs from 'fs';
import path from 'path';

function fixLinks(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixLinks(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Make all remaining <a ...> and <a> into <Link ...> and <Link>
      content = content.replace(/<a(\s|>)/g, '<Link$1');
      // Fix any remaining </a>
      content = content.replace(/<\/a>/g, '</Link>');

      // Ensure import is there
      if (!content.includes("import Link from 'next/link';")) {
        if (content.startsWith('"use client";')) {
          content = content.replace('"use client";', '"use client";\nimport Link from \'next/link\';');
        } else {
          content = "import Link from 'next/link';\n" + content;
        }
      }

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

fixLinks(path.join(process.cwd(), 'src', 'app'));
console.log('Fixed unmatched Link tags.');
