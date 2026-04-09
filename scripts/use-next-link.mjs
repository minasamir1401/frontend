import fs from 'fs';
import path from 'path';

function useNextLink(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      useNextLink(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let modified = false;

      // Regular expression to replace <a ...> with <Link ...> only if href starts with /
      const regex = /<a(\s+[^>]*?href="\/[^"]*"[^>]*?)>/g;
      
      if (regex.test(content)) {
        content = content.replace(regex, '<Link$1>');
        content = content.replace(/<\/a>/g, '</Link>');
        modified = true;
      }

      if (modified) {
        // Ensure "import Link from 'next/link';" exists
        if (!content.includes("import Link from 'next/link';")) {
          // Insert after 'use client'; if exists, else at top
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
}

// NOTE: using require/process since this is regular node
useNextLink(path.join(process.cwd(), 'src', 'app'));
console.log('Processed links to use Next Link.');
