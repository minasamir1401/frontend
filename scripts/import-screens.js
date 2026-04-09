const fs = require('fs');
const path = require('path');
const https = require('https');

const pagesToFetch = [
  {
    name: 'JobDetails',
    route: '/jobs/[id]',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2M5ZjhkNjhiZTg3ZTQzMjdhZTA0MTMyNTgyYmMxMDlhEgsSBxC634zj5wYYAZIBIwoKcHJvamVjdF9pZBIVQhM2NTQ4MTIzMDQ2MzI5NjM1MzY0&filename=&opi=89354086'
  },
  {
    name: 'JobsGallery',
    route: '/jobs',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2I3ODE5ZjgwYWU5MjQxYmViNjAyOGVlNzNmYTI4ZTRmEgsSBxC634zj5wYYAZIBIwoKcHJvamVjdF9pZBIVQhM2NTQ4MTIzMDQ2MzI5NjM1MzY0&filename=&opi=89354086'
  },
  {
    name: 'ClientDashboard',
    route: '/dashboard/client',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzQ5MjJmYmNhZmY5NzRkZTg5ZWQxNDRkYWFmNTVmY2RkEgsSBxC634zj5wYYAZIBIwoKcHJvamVjdF9pZBIVQhM2NTQ4MTIzMDQ2MzI5NjM1MzY0&filename=&opi=89354086'
  },
  {
    name: 'Home',
    route: '/',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzU5MjlhZmFkNDUxOTQyMTM4ZjA4ZjMzYjljYjJhOTVkEgsSBxC634zj5wYYAZIBIwoKcHJvamVjdF9pZBIVQhM2NTQ4MTIzMDQ2MzI5NjM1MzY0&filename=&opi=89354086'
  },
  {
    name: 'DevAnalytics',
    route: '/dashboard/developer/analytics',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2IwMjcwNDZhY2I0NzRjZmZiOTIxNGJjMjA3MTU4YTZlEgsSBxC634zj5wYYAZIBIwoKcHJvamVjdF9pZBIVQhM2NTQ4MTIzMDQ2MzI5NjM1MzY0&filename=&opi=89354086'
  },
  {
    name: 'Finance',
    route: '/dashboard/finance',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2ZkODZhNDlmNGIyNDRiMmViNjllMDUxMDFjYmZjYzM4EgsSBxC634zj5wYYAZIBIwoKcHJvamVjdF9pZBIVQhM2NTQ4MTIzMDQ2MzI5NjM1MzY0&filename=&opi=89354086'
  },
  {
    name: 'Messages',
    route: '/messages',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAyZGFiNzI3OTg4NDQwODI4Y2UzZWE2ODYyZjg4NzIwEgsSBxC634zj5wYYAZIBIwoKcHJvamVjdF9pZBIVQhM2NTQ4MTIzMDQ2MzI5NjM1MzY0&filename=&opi=89354086'
  },
  {
    name: 'Certifications',
    route: '/certifications',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzdlMTdhOTdhMzcyYzQxZTY5NTE1MGNlZjQ2ZGY0NGFjEgsSBxC634zj5wYYAZIBIwoKcHJvamVjdF9pZBIVQhM2NTQ4MTIzMDQ2MzI5NjM1MzY0&filename=&opi=89354086'
  },
  {
    name: 'Register',
    route: '/register',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2RhYWY1ZjJkN2NmNTQxYTliMjU3ZmFiYzZiNGM2NjE2EgsSBxC634zj5wYYAZIBIwoKcHJvamVjdF9pZBIVQhM2NTQ4MTIzMDQ2MzI5NjM1MzY0&filename=&opi=89354086'
  },
  {
    name: 'Workspace',
    route: '/workspace/[id]',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzhlNzBhODc5N2VlZTRkNDA4MDA2Yzc3ZDc5NTE3MDgzEgsSBxC634zj5wYYAZIBIwoKcHJvamVjdF9pZBIVQhM2NTQ4MTIzMDQ2MzI5NjM1MzY0&filename=&opi=89354086'
  },
  {
    name: 'Disputes',
    route: '/disputes',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzRhMTk1MDU5ZDE2ZDQzNmU4ZTUxOTNkMDI1YjNjNWY0EgsSBxC634zj5wYYAZIBIwoKcHJvamVjdF9pZBIVQhM2NTQ4MTIzMDQ2MzI5NjM1MzY0&filename=&opi=89354086'
  },
  {
    name: 'Profile',
    route: '/profile/[id]',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzE1YzY0ZjE0MjU1MzQ3ZDM4NGE0YWQwMDNhYTU1NmFmEgsSBxC634zj5wYYAZIBIwoKcHJvamVjdF9pZBIVQhM2NTQ4MTIzMDQ2MzI5NjM1MzY0&filename=&opi=89354086'
  },
  {
    name: 'Admin',
    route: '/admin',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2FjMjMyMDZiMWE4YTRlYTZhMzg3YjExOTgzYzk4ZTRjEgsSBxC634zj5wYYAZIBIwoKcHJvamVjdF9pZBIVQhM2NTQ4MTIzMDQ2MzI5NjM1MzY0&filename=&opi=89354086'
  }
];

function downloadContent(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', err => reject(err));
  });
}

function processHtmlToJsx(html) {
  // Extract body content
  let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let content = bodyMatch ? bodyMatch[1] : html;

  content = content
    // Convert class to className
    .replace(/\bclass="/g, 'className="')
    // Convert for to htmlFor
    .replace(/\bfor="/g, 'htmlFor="')
    // Fix self closing tags (img, input, hr, br)
    .replace(/<(img|input|hr|br)([^>]*?)(?<!\/)>/g, '<$1$2 />')
    // Remove HTML comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Remove style attributes
    .replace(/style="[^"]*"/g, '')
    // Replace SVGs or material symbols that might be raw HTML if any, but they are just fonts here.
    ;

  return `import React from 'react';

export default function Page() {
  return (
    <>
      ${content}
    </>
  );
}
`;
}

async function run() {
  const srcDir = path.join(__dirname, '..', 'src', 'app');
  
  for (const page of pagesToFetch) {
    if (page.route === '/') {
      console.log('Skipping / because we already built a home page, but if you want to overwrite it, remove this check. We will overwrite it for exact match.');
    }
    
    console.log(`Downloading ${page.name}...`);
    try {
      const html = await downloadContent(page.url);
      const jsx = processHtmlToJsx(html);
      
      const routePath = page.route === '/' ? '' : page.route;
      const targetDir = path.join(srcDir, routePath);
      const targetFile = path.join(targetDir, 'page.tsx');
      
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(targetFile, jsx, 'utf-8');
      console.log(`Created Component for ${page.route}`);
    } catch (err) {
      console.error(`Failed on ${page.name}:`, err);
    }
  }
}

run();
