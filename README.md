# Portfolio — Thanasin Yuntapun

Live: https://thanasinyuntapun-maker.github.io/Portfolio-/

## โครงสร้างไฟล์

```
Portfolio/
├── index.html              ← entry point (Cosmos theme, currently deployed)
├── index.html.bak          ← backup ก่อน merge inline CSS จาก blackhole version
├── data.js                 ← ข้อมูลทั้งหมด: projects, services, capabilities, contact
├── cosmos-scene.js         ← Three.js background (accretion disk + UnrealBloom)
├── cosmos-app.jsx          ← React app หลัก (nav, hero, work, services, skills, contact)
├── cosmos.css              ← design system: CSS variables, layout, components
├── tweaks-panel.jsx        ← floating panel เปลี่ยนสี/ความแรง background 3D
│
├── Portfolio - Cosmos (standalone).html   ← standalone single-file (cosmos theme)
├── Portfolio - Apple.html                 ← Apple design theme (standalone)
├── Portfolio.html                         ← เวอร์ชันเก่า (standalone)
│
├── apple-app.jsx / apple-*.jsx / apple-*.css  ← Apple theme components
├── app.jsx / components.jsx / sections.jsx / case-study.jsx / styles.css
│                                          ← shared / legacy components
└── _screens/                              ← OG image screenshots
    └── cosmos-hero.png
```

## วิธีรัน local

```bash
# ต้องใช้ HTTP server (ไม่ใช่ open file:// ตรงๆ เพราะ ES module + fetch)
cd Portfolio
python3 -m http.server 8080
# แล้วเปิด http://localhost:8080
```

## entry point (index.html) โหลดอะไรบ้าง

| ลำดับ | ไฟล์ | หน้าที่ |
|-------|------|---------|
| 1 | Three.js r128 + postprocessing (CDN) | UnrealBloom effect |
| 2 | `cosmos.css` | design system |
| 3 | `data.js` | inject `window.PORTFOLIO` |
| 4 | `cosmos-scene.js` | init 3D background |
| 5 | `tweaks-panel.jsx` | floating color/intensity panel |
| 6 | `cosmos-app.jsx` | render React app |

## data.js — แก้ content ที่นี่

- `brand` — ชื่อ, email, LINE, GitHub
- `hero` — headline, sub text, meta badges
- `filters` — filter chips บน Work section
- `projects[]` — การ์ดผลงาน (id, title, desc, tags, outcome)
- `services[]` — บริการ + ราคา + timeline
- `capabilities[]` — skills grouped
- `caseStudy` — case study detail ของ project id "line-oa"

ทุก text field ใช้ `T(th, en)` สำหรับ bilingual (TH/EN toggle)

## Inline styles ใน index.html

CSS ที่ inject ตรงใน `<style>` tag มาจาก blackhole version (merge ครั้งล่าสุด):

| Class | หน้าที่ |
|-------|---------|
| `#scrim` override | gradient scrim ให้ headline อ่านชัดบน background |
| `.warp-flash` | flash overlay สีขาว (ต้อง trigger ใน JS) |
| `.badge-layer` + `.orbit-badge` | floating tech badges ใน hero (fade on scroll) |
| `.deep-btn` | ปุ่ม AI Deep Dive บน project card (ยังไม่ implement ใน cosmos-app.jsx) |
| `.ai-box` | Ask-AI-clone section (ยังไม่ implement) |
| `.ai-modal` | AI output modal (ยังไม่ implement) |

> `.deep-btn`, `.ai-box`, `.ai-modal` — styles พร้อมแล้ว แต่ยังไม่มี component ใน cosmos-app.jsx
> ต้องเพิ่ม logic + Gemini API call ถ้าต้องการเปิดใช้

## Deploy

GitHub Actions deploy อัตโนมัติเมื่อ push ไป `main` branch  
(ดู `.github/workflows/`)

```bash
git add .
git commit -m "update portfolio"
git push origin main
# รอ ~1 นาที แล้วเปิด live URL
```

## Backup / เวอร์ชัน

| ไฟล์ | เวอร์ชัน |
|------|---------|
| `index.html` | Cosmos theme + inline styles จาก blackhole (current) |
| `index.html.bak` | Cosmos theme ก่อน merge (ไม่มี inline styles) |
| `Downloads/index.html` | Blackhole theme เก่า (references blackhole-scene.js ที่ไม่มีแล้ว) |
| `Downloads/portfolio_ultimate_black_hole.html` | Standalone blackhole + Tailwind + mock projects |

## Known issues (diagnostics)

- `backdrop-filter` ต้องเพิ่ม `-webkit-backdrop-filter` สำหรับ Safari
- Inline styles ใน index.html ควรย้ายไป cosmos.css ในอนาคต
- `transform` ใน `@keyframes float-orbit` trigger Composite+Paint (minor perf)
