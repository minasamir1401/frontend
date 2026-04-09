const fs = require('fs');
const path = require('path');

const mappings = [
  { regex: /href=\"#\"([^>]*>)\s*Browse Projects\s*<\/a>/gi, replacement: 'href="/jobs"$1Browse Projects</a>' },
  { regex: /href=\"#\"([^>]*>)\s*Find Talent\s*<\/a>/gi, replacement: 'href="/jobs"$1Find Talent</a>' },
  { regex: /href=\"#\"([^>]*>)\s*Dashboard\s*<\/a>/gi, replacement: 'href="/dashboard/client"$1Dashboard</a>' },
  { regex: /href=\"#\"([^>]*>)\s*Messages\s*<\/a>/gi, replacement: 'href="/messages"$1Messages</a>' },
  { regex: /href=\"#\"([^>]*>)\s*Finance\s*<\/a>/gi, replacement: 'href="/dashboard/finance"$1Finance</a>' },
  { regex: /href=\"#\"([^>]*>)\s*Certifications\s*<\/a>/gi, replacement: 'href="/certifications"$1Certifications</a>' },
  { regex: /href=\"#\"([^>]*>)\s*Admin\s*<\/a>/gi, replacement: 'href="/admin"$1Admin</a>' },
  { regex: /href=\"#\"([^>]*>)\s*Disputes\s*<\/a>/gi, replacement: 'href="/disputes"$1Disputes</a>' },
  { regex: /href=\"#\"([^>]*>)\s*Profile\s*<\/a>/gi, replacement: 'href="/profile/1"$1Profile</a>' },
  { regex: /href=\"#\"([^>]*>)\s*Workspace\s*<\/a>/gi, replacement: 'href="/workspace/1"$1Workspace</a>' },
  { regex: />\s*Sign In\s*<\/button>/gi, replacement: ' onClick={() => window.location.href="/register"}>Sign In</button>' },
  { regex: />\s*Join as Client\s*<\/button>/gi, replacement: ' onClick={() => window.location.href="/register"}>Join as Client</button>' },
  
  // Sidebar items which might be built with spans inside links
  { regex: /href=\"#\"([^>]*>[\s\S]*?)dashboard([\s\S]*?)<\/a>/gi, replacement: 'href="/dashboard/client"$1dashboard$2</a>' },
  { regex: /href=\"#\"([^>]*>[\s\S]*?)work([\s\S]*?)<\/a>/gi, replacement: 'href="/jobs"$1work$2</a>' },
  { regex: /href=\"#\"([^>]*>[\s\S]*?)mail([\s\S]*?)<\/a>/gi, replacement: 'href="/messages"$1mail$2</a>' },
  { regex: /href=\"#\"([^>]*>[\s\S]*?)account_balance_wallet([\s\S]*?)<\/a>/gi, replacement: 'href="/dashboard/finance"$1account_balance_wallet$2</a>' },
  { regex: /href=\"#\"([^>]*>[\s\S]*?)workspace_premium([\s\S]*?)<\/a>/gi, replacement: 'href="/certifications"$1workspace_premium$2</a>' },
  { regex: /href=\"#\"([^>]*>[\s\S]*?)gavel([\s\S]*?)<\/a>/gi, replacement: 'href="/disputes"$1gavel$2</a>' },
  { regex: /href=\"#\"([^>]*>[\s\S]*?)admin_panel_settings([\s\S]*?)<\/a>/gi, replacement: 'href="/admin"$1admin_panel_settings$2</a>' },

  // Link for homepage using the brand name
  { regex: /<span className=\"text-2xl font-bold tracking-tight text-slate-900[^\"]*\">Vegecurity<\/span>/d, replacement: '<a href="/" className="text-2xl font-bold tracking-tight text-slate-900">Vegecurity</a>' }
];

function linkPages(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      linkPages(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      for (const mapping of mappings) {
        content = content.replace(mapping.regex, mapping.replacement);
      }
      
      // Also inject <a Next/Link> if we were using it, but native <a> works fine for now as exact html matches.
      // Replacing brand "Vegecurity" spans with anchors:
      content = content.replace(/<span([^>]*?)>Vegecurity<\/span>/g, '<a href="/"$1>Vegecurity</a>');

      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

linkPages(path.join(__dirname, '..', 'src', 'app'));
console.log('Successfully linked pages.');
