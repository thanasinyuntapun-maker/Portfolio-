// apple-tiles.jsx — CSS/SVG mockup visuals used inside each product tile.
// Each Viz* is a self-contained visual representing one project type.

(function () {

  // LINE OA chatbot — bubble conversation
  function VizChat({ dark }) {
    return (
      <div className="viz-chat" style={{ color: dark ? '#fff' : '#1d1d1f' }}>
        <div className="bubble them">มีโต๊ะว่างวันเสาร์ 6 คนมั้ย?</div>
        <div className="bubble us">มีค่ะ 🍽️ ขอเวลาไหนดีคะ — สาขาทองหล่อ หรือ อโศก?</div>
        <div className="bubble them">ทองหล่อ 19:00</div>
        <div className="bubble us">จองให้แล้วค่ะ #4231 · 6 ที่นั่ง · 19:00<br/>ส่งต่อแอดมินยืนยันใน 30 วิ ✓</div>
        <div className="bubble them"><span className="typing"><span></span><span></span><span></span></span></div>
      </div>
    );
  }

  // License plate recognition camera
  function VizCamera() {
    return (
      <div className="viz-camera">
        <div className="hud"><span className="rec">REC · CAM 01</span><span>08 fps</span></div>
        <div className="car"></div>
        <div className="plate">กข 1234</div>
        <div className="scan"></div>
        <div className="label">DETECTED · 96.4% · กข-1234</div>
      </div>
    );
  }

  // Robotics / embedded
  function VizRobot() {
    return (
      <div className="viz-robot">
        <div className="head">
          <div className="ant"></div>
          <div className="eye left"></div>
          <div className="eye right"></div>
        </div>
        <div className="body">
          <div className="led"><span></span><span></span><span></span></div>
        </div>
        <div className="wheel left"></div>
        <div className="wheel right"></div>
      </div>
    );
  }

  // iPhone mockup with SwiftUI app
  function VizPhone() {
    return (
      <div className="viz-phone">
        <div className="screen">
          <div className="notch"></div>
          <div className="ui">
            <div className="row">
              <div className="t">Today, May 25</div>
              <div className="s">3 sessions · 2 reminders</div>
            </div>
            <div className="row swift">
              <div className="t">Morning standup</div>
              <div className="s">9:00 — 9:30 AM · Team sync</div>
              <div className="pill-row"><span>SwiftUI</span><span>iOS 17</span></div>
            </div>
            <div className="row swift">
              <div className="t">TestFlight build #218</div>
              <div className="s">Just shipped · all green ✓</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CAD blueprint
  function VizCad() {
    return (
      <div className="viz-cad">
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
          {/* Bracket part — dimensioned */}
          <g stroke="#1d1d1f" strokeWidth="1.6" fill="none">
            <path d="M 100 80 L 300 80 L 300 140 L 240 140 L 240 220 L 160 220 L 160 140 L 100 140 Z" />
            <circle cx="200" cy="110" r="14" />
            <circle cx="200" cy="180" r="14" />
            <line x1="120" y1="100" x2="120" y2="120" />
            <line x1="280" y1="100" x2="280" y2="120" />
          </g>
          {/* Dimension lines */}
          <g stroke="#c8442e" strokeWidth=".8" fill="none">
            <line x1="100" y1="60" x2="300" y2="60" />
            <line x1="100" y1="56" x2="100" y2="64" />
            <line x1="300" y1="56" x2="300" y2="64" />
            <line x1="320" y1="80" x2="320" y2="220" />
            <line x1="316" y1="80" x2="324" y2="80" />
            <line x1="316" y1="220" x2="324" y2="220" />
          </g>
          {/* Labels */}
          <text x="200" y="54" textAnchor="middle" fontSize="10" fill="#c8442e" fontFamily="SF Mono, monospace">200.0 mm</text>
          <text x="340" y="155" fontSize="10" fill="#c8442e" fontFamily="SF Mono, monospace">140.0</text>
          <text x="200" y="115" textAnchor="middle" fontSize="9" fill="#6e6e73" fontFamily="SF Mono, monospace">Ø 14</text>
          <text x="120" y="252" fontSize="9" fill="#6e6e73" fontFamily="SF Mono, monospace">P/N · A-118 rev 02</text>
        </svg>
      </div>
    );
  }

  // RAG Q&A
  function VizDoc() {
    return (
      <div className="viz-doc">
        <div className="page back">
          <div className="line"></div><div className="line mid"></div>
          <div className="line"></div><div className="line short"></div>
          <div className="line mid"></div><div className="line"></div>
        </div>
        <div className="page mid">
          <div className="line"></div>
          <div className="line mid"></div>
          <div className="line hl"></div>
          <div className="line short"></div>
          <div className="line"></div>
          <div className="line mid"></div>
          <div className="line hl"></div>
          <div className="line"></div>
        </div>
        <div className="arrow"></div>
        <div className="answer">
          <div className="q">Q · Manual</div>
          <div>กำลังแรงบิดสูงสุดของมอเตอร์รุ่น A-220 คือ <strong>4.8 Nm</strong></div>
          <div className="cite">→ หน้า 12 · ส่วน 3.2 · ตาราง 4</div>
        </div>
      </div>
    );
  }

  // Classroom emotion grid
  function VizClass() {
    const grid = [
      ['happy','focus','focus','happy'],
      ['focus','focus','meh','focus'],
      ['focus','happy','focus','meh'],
      ['happy','focus','sad','focus'],
    ];
    const ico = { happy:'☺', focus:'•', meh:'~', sad:'·' };
    return (
      <div className="viz-class">
        {grid.flat().map((em, i) => (
          <div key={i} className="face" data-em={em}>{ico[em]}</div>
        ))}
      </div>
    );
  }

  // Simulink-ish block diagram
  function VizSim() {
    return (
      <div className="viz-sim">
        <svg viewBox="0 0 460 320" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#1d1d1f" />
            </marker>
          </defs>
          <g fontFamily="SF Mono, monospace" fontSize="11" fill="#1d1d1f">
            {/* Reference */}
            <circle cx="50" cy="160" r="14" fill="#fff" stroke="#1d1d1f" strokeWidth="1.4"/>
            <text x="50" y="164" textAnchor="middle">r</text>
            {/* Summing */}
            <circle cx="120" cy="160" r="14" fill="#fff" stroke="#1d1d1f" strokeWidth="1.4"/>
            <text x="120" y="164" textAnchor="middle">+</text>
            {/* PID */}
            <rect x="180" y="138" width="80" height="44" rx="4" fill="#fff" stroke="#1d1d1f" strokeWidth="1.4"/>
            <text x="220" y="164" textAnchor="middle">PID</text>
            {/* Plant */}
            <rect x="300" y="138" width="100" height="44" rx="4" fill="#fff" stroke="#1d1d1f" strokeWidth="1.4"/>
            <text x="350" y="164" textAnchor="middle">6-DOF arm</text>
            {/* Output */}
            <circle cx="430" cy="160" r="14" fill="#fff" stroke="#1d1d1f" strokeWidth="1.4"/>
            <text x="430" y="164" textAnchor="middle">θ</text>
            {/* Feedback */}
            <rect x="220" y="240" width="80" height="34" rx="4" fill="#fff" stroke="#1d1d1f" strokeWidth="1.4"/>
            <text x="260" y="262" textAnchor="middle">sensor</text>

            {/* Lines */}
            <line x1="64" y1="160" x2="106" y2="160" stroke="#1d1d1f" strokeWidth="1.4" markerEnd="url(#ah)"/>
            <line x1="134" y1="160" x2="174" y2="160" stroke="#1d1d1f" strokeWidth="1.4" markerEnd="url(#ah)"/>
            <line x1="260" y1="160" x2="296" y2="160" stroke="#1d1d1f" strokeWidth="1.4" markerEnd="url(#ah)"/>
            <line x1="400" y1="160" x2="416" y2="160" stroke="#1d1d1f" strokeWidth="1.4" markerEnd="url(#ah)"/>
            {/* Feedback path */}
            <path d="M 410 174 L 410 257 L 304 257" stroke="#c8442e" strokeWidth="1.4" fill="none" markerEnd="url(#ah)"/>
            <path d="M 216 257 L 120 257 L 120 176" stroke="#c8442e" strokeWidth="1.4" fill="none" markerEnd="url(#ah)"/>
            <text x="130" y="174" fill="#c8442e" fontSize="11">−</text>

            <text x="20" y="50" fontSize="11" fill="#6e6e73">Simulink · controller verification</text>
            <text x="20" y="68" fontSize="11" fill="#6e6e73">Settling time −41% · stability margin verified</text>
          </g>
        </svg>
      </div>
    );
  }

  // The big typographic stage used for hero tile
  function HeroArena({ glyph }) {
    return (
      <div className="hero-arena">
        <div className="glyph">{glyph}</div>
      </div>
    );
  }

  Object.assign(window, {
    VizChat, VizCamera, VizRobot, VizPhone, VizCad, VizDoc, VizClass, VizSim,
    HeroArena,
  });
})();
