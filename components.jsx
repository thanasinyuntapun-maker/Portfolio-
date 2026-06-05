// Small shared components and the architecture-diagram SVGs.
// Globals: see window assignment at bottom.

(function () {
  const { useState, useEffect, useRef, useMemo } = React;

// Pick localized value from a {th,en} object.
function L(v, lang) {
  if (v == null) return "";
  if (typeof v === "string") return v;
  return v[lang] ?? v.en ?? v.th ?? "";
}

// Render text with **bold** and *italic* markers — simple, no full markdown.
function MD({ text }) {
  const parts = [];
  let s = text || "";
  // Split on ** then * 
  const tokens = s.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {tokens.map((tk, i) => {
        if (tk.startsWith("**") && tk.endsWith("**"))
          return <strong key={i}>{tk.slice(2, -2)}</strong>;
        if (tk.startsWith("*") && tk.endsWith("*"))
          return <em key={i}>{tk.slice(1, -1)}</em>;
        return <React.Fragment key={i}>{tk}</React.Fragment>;
      })}
    </>
  );
}

// "01 / 08" pill
function NumDot({ n, total }) {
  return (
    <span className="mono" style={{ fontSize: 11, letterSpacing: ".1em", color: "var(--ink-mute)" }}>
      {n} <span style={{ opacity: 0.4 }}>/ {total}</span>
    </span>
  );
}

// Inline architecture micro-diagram shown when hovering a work card.
// Small SVG that hints at the system shape — not a full diagram, just a wink.
function ArchPeek({ project }) {
  const id = project.id;
  if (id === "line-oa") {
    return (
      <svg viewBox="0 0 360 120" style={{ maxWidth: 320 }} aria-hidden="true">
        <defs>
          <marker id="arr1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 z" fill="currentColor" />
          </marker>
        </defs>
        <g stroke="currentColor" fill="none" strokeWidth="1.2">
          <rect x="4"   y="44" width="64" height="32" rx="2" />
          <rect x="100" y="44" width="64" height="32" rx="2" />
          <rect x="196" y="44" width="64" height="32" rx="2" />
          <rect x="292" y="44" width="64" height="32" rx="2" />
          <line x1="68"  y1="60" x2="100" y2="60" markerEnd="url(#arr1)" />
          <line x1="164" y1="60" x2="196" y2="60" markerEnd="url(#arr1)" />
          <line x1="260" y1="60" x2="292" y2="60" markerEnd="url(#arr1)" />
          <line x1="228" y1="76" x2="228" y2="100" markerEnd="url(#arr1)" />
          <rect x="200" y="100" width="56" height="18" rx="2" strokeDasharray="3 3" />
        </g>
        <g fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" textAnchor="middle">
          <text x="36"  y="62">LINE</text>
          <text x="132" y="62">FastAPI</text>
          <text x="228" y="62">Claude</text>
          <text x="324" y="62">Reply</text>
          <text x="228" y="112">Handoff</text>
        </g>
      </svg>
    );
  }
  if (id === "rag-docs") {
    return (
      <svg viewBox="0 0 360 120" style={{ maxWidth: 320 }}>
        <g stroke="currentColor" fill="none" strokeWidth="1.2">
          <rect x="6" y="20" width="48" height="80" rx="2" />
          <line x1="14" y1="34" x2="46" y2="34" /><line x1="14" y1="44" x2="46" y2="44" />
          <line x1="14" y1="54" x2="46" y2="54" /><line x1="14" y1="64" x2="46" y2="64" />
          <line x1="14" y1="74" x2="46" y2="74" /><line x1="14" y1="84" x2="46" y2="84" />
          <rect x="100" y="46" width="60" height="28" rx="2" />
          <circle cx="220" cy="60" r="20" />
          <rect x="270" y="46" width="80" height="28" rx="2" />
          <line x1="54"  y1="60" x2="100" y2="60" />
          <line x1="160" y1="60" x2="200" y2="60" />
          <line x1="240" y1="60" x2="270" y2="60" />
        </g>
        <g fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" textAnchor="middle">
          <text x="30"  y="115">PDF</text>
          <text x="130" y="62">Chunk</text>
          <text x="220" y="63">Embed</text>
          <text x="310" y="62">Answer</text>
        </g>
      </svg>
    );
  }
  if (id === "lpr") {
    return (
      <svg viewBox="0 0 360 120">
        <g stroke="currentColor" fill="none" strokeWidth="1.2">
          <rect x="10" y="20" width="100" height="80" rx="2" />
          <rect x="30" y="50" width="60" height="22" rx="2" strokeDasharray="3 2" />
          <line x1="110" y1="60" x2="160" y2="60" />
          <rect x="160" y="44" width="70" height="32" rx="2" />
          <line x1="230" y1="60" x2="270" y2="60" />
          <rect x="270" y="44" width="80" height="32" rx="2" />
        </g>
        <g fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" textAnchor="middle">
          <text x="60"  y="115">CCTV</text>
          <text x="195" y="62">YOLOX</text>
          <text x="310" y="62">OCR · TH</text>
        </g>
      </svg>
    );
  }
  if (id === "robot") {
    return (
      <svg viewBox="0 0 360 120">
        <g stroke="currentColor" fill="none" strokeWidth="1.2">
          <circle cx="50" cy="60" r="22" />
          <line x1="72" y1="60" x2="130" y2="60" />
          <rect x="130" y="44" width="80" height="32" rx="2" />
          <line x1="210" y1="60" x2="270" y2="60" />
          <rect x="270" y="34" width="80" height="22" rx="2" />
          <rect x="270" y="64" width="80" height="22" rx="2" />
          <line x1="350" y1="45" x2="350" y2="75" />
        </g>
        <g fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" textAnchor="middle">
          <text x="50"  y="62">Sensors</text>
          <text x="170" y="62">ESP32 · PID</text>
          <text x="310" y="47">CAN</text>
          <text x="310" y="79">MQTT</text>
        </g>
      </svg>
    );
  }
  if (id === "ios-mvp") {
    return (
      <svg viewBox="0 0 360 120">
        <g stroke="currentColor" fill="none" strokeWidth="1.2">
          <rect x="20" y="10" width="80" height="100" rx="10" />
          <rect x="32" y="22" width="56" height="76" />
          <line x1="100" y1="60" x2="160" y2="60" />
          <rect x="160" y="44" width="80" height="32" rx="2" />
          <line x1="240" y1="60" x2="290" y2="60" />
          <rect x="290" y="44" width="64" height="32" rx="2" />
        </g>
        <g fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" textAnchor="middle">
          <text x="60"  y="115">SwiftUI</text>
          <text x="200" y="62">API</text>
          <text x="322" y="62">Postgres</text>
        </g>
      </svg>
    );
  }
  if (id === "emotion") {
    return (
      <svg viewBox="0 0 360 120">
        <g stroke="currentColor" fill="none" strokeWidth="1.2">
          <rect x="10" y="32" width="60" height="56" rx="2" />
          <circle cx="40" cy="56" r="8" />
          <path d="M30 76 Q40 82 50 76" />
          <line x1="70" y1="60" x2="120" y2="60" />
          <rect x="120" y="44" width="80" height="32" rx="2" />
          <line x1="200" y1="60" x2="240" y2="60" />
          <rect x="240" y="34" width="110" height="52" rx="2" strokeDasharray="2 3" />
          <line x1="252" y1="50" x2="340" y2="50" />
          <line x1="252" y1="62" x2="320" y2="62" />
          <line x1="252" y1="74" x2="332" y2="74" />
        </g>
        <g fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" textAnchor="middle">
          <text x="40" y="106">Face</text>
          <text x="160" y="62">FER</text>
          <text x="295" y="98">Dashboard</text>
        </g>
      </svg>
    );
  }
  if (id === "matlab-sim") {
    return (
      <svg viewBox="0 0 360 120">
        <g stroke="currentColor" fill="none" strokeWidth="1.2">
          <line x1="40" y1="100" x2="40" y2="20" />
          <line x1="40" y1="60" x2="100" y2="40" />
          <line x1="100" y1="40" x2="140" y2="70" />
          <line x1="140" y1="70" x2="180" y2="50" />
          <circle cx="40" cy="60" r="4" fill="currentColor" />
          <circle cx="100" cy="40" r="4" fill="currentColor" />
          <circle cx="140" cy="70" r="4" fill="currentColor" />
          <circle cx="180" cy="50" r="4" fill="currentColor" />
          <rect x="220" y="40" width="60" height="40" rx="2" />
          <rect x="290" y="40" width="60" height="40" rx="2" />
          <line x1="280" y1="60" x2="290" y2="60" />
          <line x1="180" y1="50" x2="220" y2="60" />
        </g>
        <g fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" textAnchor="middle">
          <text x="110" y="115">IK plot</text>
          <text x="250" y="62">Sim</text>
          <text x="320" y="62">PID</text>
        </g>
      </svg>
    );
  }
  if (id === "cad") {
    return (
      <svg viewBox="0 0 360 120">
        <g stroke="currentColor" fill="none" strokeWidth="1.2">
          <path d="M30 80 L30 30 L90 30 L110 50 L110 80 Z" />
          <line x1="90" y1="30" x2="90" y2="80" />
          <line x1="90" y1="80" x2="110" y2="50" />
          <rect x="150" y="30" width="80" height="50" rx="2" strokeDasharray="3 2" />
          <line x1="180" y1="40" x2="220" y2="40" /><line x1="180" y1="50" x2="220" y2="50" />
          <line x1="180" y1="60" x2="220" y2="60" /><line x1="180" y1="70" x2="220" y2="70" />
          <rect x="260" y="30" width="80" height="50" rx="2" />
          <path d="M270 50 L290 70 L320 40" />
        </g>
        <g fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" textAnchor="middle">
          <text x="70" y="105">CAD</text>
          <text x="190" y="105">Drawing</text>
          <text x="300" y="105">Printed</text>
        </g>
      </svg>
    );
  }
  return null;
}

// Full architecture diagram (case study) — larger, more deliberate
function FullArch() {
  return (
    <svg viewBox="0 0 920 360">
      <defs>
        <marker id="ar2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="currentColor" />
        </marker>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="1" opacity=".25" />
        </pattern>
      </defs>

      {/* Outer system boundary */}
      <rect x="10" y="10" width="900" height="340" fill="none" stroke="currentColor" strokeDasharray="6 4" strokeWidth="1" opacity=".4" />
      <text x="22" y="28" fontFamily="var(--f-mono)" fontSize="11" fill="currentColor" opacity=".55">SYSTEM · v1.4</text>

      <g stroke="currentColor" fill="none" strokeWidth="1.4">
        {/* User */}
        <rect x="40"  y="160" width="120" height="64" />
        {/* Webhook (FastAPI) */}
        <rect x="220" y="160" width="160" height="64" />
        {/* Retriever */}
        <rect x="440" y="60"  width="160" height="64" />
        {/* Vector DB */}
        <rect x="660" y="60"  width="120" height="64" />
        <line x1="660" y1="76" x2="780" y2="76" /><line x1="660" y1="92" x2="780" y2="92" />
        <line x1="660" y1="108" x2="780" y2="108" />
        {/* Claude */}
        <rect x="440" y="160" width="160" height="64" />
        {/* Handoff classifier */}
        <rect x="440" y="260" width="160" height="64" />
        {/* Admin */}
        <rect x="680" y="260" width="160" height="64" />
        {/* Reply (to user) */}
        <rect x="680" y="160" width="160" height="64" />

        {/* Flows */}
        <line x1="160" y1="192" x2="220" y2="192" markerEnd="url(#ar2)" />
        <line x1="380" y1="180" x2="440" y2="180" markerEnd="url(#ar2)" />
        <line x1="380" y1="200" x2="440" y2="290" markerEnd="url(#ar2)" />

        <line x1="520" y1="160" x2="520" y2="124" markerEnd="url(#ar2)" />
        <line x1="600" y1="92"  x2="660" y2="92"  markerEnd="url(#ar2)" />

        <line x1="600" y1="192" x2="680" y2="192" markerEnd="url(#ar2)" />
        <line x1="680" y1="208" x2="380" y2="208" strokeDasharray="3 3" />
        <line x1="380" y1="208" x2="220" y2="208" strokeDasharray="3 3" markerEnd="url(#ar2)" />

        <line x1="600" y1="292" x2="680" y2="292" markerEnd="url(#ar2)" />
      </g>

      {/* Hatched cloud annotation */}
      <rect x="660" y="40" width="120" height="14" fill="url(#hatch)" />

      <g fontFamily="var(--f-mono)" fontSize="11" fill="currentColor">
        <text x="100" y="196" textAnchor="middle">User · LINE</text>
        <text x="300" y="188" textAnchor="middle">Webhook</text>
        <text x="300" y="204" textAnchor="middle" opacity=".55">FastAPI · async</text>

        <text x="520" y="88"  textAnchor="middle">Retriever</text>
        <text x="520" y="104" textAnchor="middle" opacity=".55">k = 6</text>
        <text x="720" y="88"  textAnchor="middle">Vector DB</text>
        <text x="720" y="104" textAnchor="middle" opacity=".55">ChromaDB</text>

        <text x="520" y="188" textAnchor="middle">Reasoner</text>
        <text x="520" y="204" textAnchor="middle" opacity=".55">claude-sonnet</text>

        <text x="520" y="288" textAnchor="middle">Handoff</text>
        <text x="520" y="304" textAnchor="middle" opacity=".55">intent + score</text>

        <text x="760" y="188" textAnchor="middle">Reply → LINE</text>
        <text x="760" y="288" textAnchor="middle">Admin · LIFF</text>

        <text x="195" y="220" fontSize="10" opacity=".6">msg in</text>
        <text x="620" y="184" fontSize="10" opacity=".6">grounded</text>
        <text x="430" y="220" fontSize="10" opacity=".6">backchannel</text>
      </g>
    </svg>
  );
}

Object.assign(window, { L, MD, NumDot, ArchPeek, FullArch });
})();
