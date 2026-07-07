const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  const htmlFiles = fs.readdirSync(__dirname)
    .filter(file => file.endsWith('.html'))
    .sort();
  
  let html = `<html><head><title>Website Preview</title><style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 40px; background: #f5f5f5; }
    h1 { color: #333; }
    ul { list-style: none; padding: 0; }
    li { margin: 10px 0; }
    a { display: block; padding: 12px 20px; background: white; color: #007bff; text-decoration: none; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s; }
    a:hover { background: #007bff; color: white; transform: translateY(-1px); }
    .container { max-width: 600px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 40px; }
  </style></head><body><div class="container"><div class="header"><h1>Website Preview</h1><p>Select a page to preview:</p></div><ul>`;
  
  htmlFiles.forEach(file => {
    html += `<li><a href="/${file}" target="_blank">${file}</a></li>`;
  });
  
  html += `</ul></div></body></html>`;
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
