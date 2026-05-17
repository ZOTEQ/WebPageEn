# English Website 2026 - Development Workflow

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server (with Auto-Restart)
```bash
npm run watch
```

### 3. After making changes, say:
```
"Open browser"
```

---

## 📁 What's Included

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies & scripts |
| `dev-server.js` | Enhanced dev server with clear messages |
| `nodemon.json` | Auto-restart configuration |
| `server.js` | Original simple server (for production) |
| `index.html` | Main website file |

---

## 🎯 Development Workflow

1. **Run `npm run watch`** - Starts server with file monitoring
2. **Edit files** (index.html, CSS, JS, images)
3. **Server auto-restarts** (you'll see "🚀 Server running...")
4. **Say "Open browser"** - Preview the updated page!

---

## 📋 Scripts

| Command | What it does |
|---------|-------------|
| `npm start` | Production server (simple) |
| `npm run dev` | Dev server (no auto-restart) |
| `npm run watch` | Dev server with auto-restart (use this!) |

---

## 🎨 Auto-Watched Files

- `index.html`
- `*.js`
- `*.css`
- `images/` folder

---

## 📝 Notes

- Server runs at `http://localhost:3001/`
- Make changes → server restarts automatically
- After restart, just tell me "Open browser" to preview!

---

## 📚 Skills Used

- Nodemon (auto-restart)
- HTTP server (Node.js)
- Trae MCP Browser (preview)