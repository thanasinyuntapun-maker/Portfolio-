// apple-sections.jsx — composed sections: nav, hero, product tiles, capability
// strip, services pricing table, contact tile, footer.

(function () {
  const { useEffect, useRef, useState } = React;
  const {
    VizChat, VizCamera, VizRobot, VizPhone, VizCad, VizDoc, VizClass, VizSim,
    HeroArena,
  } = window;

  // i18n helper — fields in data.js are { th, en }
  const tx = (field, lang) => {
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field.en || field.th || '';
  };

  /* ─── Top global nav ──────────────────────────────────────────────────── */
  function TopNav({ lang, setLang, mode, setMode }) {
    const t = (th, en) => lang === 'th' ? th : en;
    return (
      <nav className="gnav" aria-label="Global">
        <div className="gnav-inner">
          <a href="#top" className="gnav-logo">
            <span className="mark"></span>
            Thanasin.
          </a>
          <div className="gnav-links">
            <a href="#hero">{t('หน้าหลัก', 'Home')}</a>
            <a href="#chatbot">{t('แชตบอท', 'Chatbot')}</a>
            <a href="#vision">{t('คอมพิวเตอร์วิทัศน์', 'Vision')}</a>
            <a href="#mobile">iOS</a>
            <a href="#robot">{t('หุ่นยนต์', 'Robotics')}</a>
            <a href="#docs">RAG</a>
            <a href="#services">{t('บริการ', 'Services')}</a>
            <a href="#contact">{t('ติดต่อ', 'Contact')}</a>
          </div>
          <div className="gnav-tools">
            <button className="lang-tog"
                    onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
                    aria-label="Toggle language">
              {lang === 'th' ? 'EN' : 'TH'}
            </button>
            <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
                    aria-label="Toggle dark mode">
              {mode === 'dark' ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            <button aria-label="Search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </button>
          </div>
        </div>
      </nav>
    );
  }

  /* ─── Generic product tile ────────────────────────────────────────────── */
  // A tile has: eyebrow (kicker), big headline, sub, two CTAs, and a visual.
  function ProductTile({
    id, variant, size, eyebrow, eyebrowColor,
    headline, headlineEm, sub, primaryLabel, primaryHref, secondaryLabel, secondaryHref,
    primaryPill, children, headlineSize = 'h2',
    leftAligned = false,
    bgImage, bgImageDim, bgImageFull,
  }) {
    const HeadlineTag = headlineSize === 'h1' ? 'h1' : 'h2';
    const headlineClass = headlineSize === 'h1' ? 't-display' : 't-headline';
    const bgClasses = ['tile-bg', 'scrim'];
    if (bgImageDim) bgClasses.push('dim');
    if (bgImageFull) bgClasses.push('full');

    return (
      <article id={id}
               className={`tile ${variant || ''} ${size || ''} ${leftAligned ? 'left-aligned' : ''}`}>
        {bgImage && (
          <div className={bgClasses.join(' ')}>
            <img src={bgImage} alt="" loading="lazy" data-parallax="bg" />
          </div>
        )}
        <div className="tile-text">
          {eyebrow && (
            <p className="t-eyebrow" style={eyebrowColor ? { color: eyebrowColor } : null}>
              {eyebrow}
            </p>
          )}
          <HeadlineTag className={headlineClass}>
            {headline}
            {headlineEm && <> <em style={{ fontStyle: 'normal', color: 'var(--ink-mute)' }}>{headlineEm}</em></>}
          </HeadlineTag>
          {sub && <p className="t-sub" style={{ color: 'var(--ink-2)', maxWidth: '40ch', marginTop: 6 }}>{sub}</p>}
          {(primaryLabel || secondaryLabel) && (
            <div className="links">
              {primaryLabel && (
                primaryPill
                  ? <a href={primaryHref || '#'} className="cta-pill">{primaryLabel}</a>
                  : <a href={primaryHref || '#'} className="cta-link">{primaryLabel}</a>
              )}
              {secondaryLabel && (
                <a href={secondaryHref || '#'} className="cta-link">{secondaryLabel}</a>
              )}
            </div>
          )}
        </div>
        <div className="tile-visual" data-parallax="visual">
          {children}
        </div>
      </article>
    );
  }

  /* ─── Hero (the top tile) ─────────────────────────────────────────────── */
  function HeroTile({ lang }) {
    const t = (th, en) => lang === 'th' ? th : en;
    const arenaRef = useRef(null);
    const cursorRef = useRef(null);

    // Mouse-follow cursor highlight
    useEffect(() => {
      const arena = arenaRef.current;
      const cur = cursorRef.current;
      if (!arena || !cur) return;
      const onMove = (e) => {
        const r = arena.getBoundingClientRect();
        cur.style.left = (e.clientX - r.left) + 'px';
        cur.style.top  = (e.clientY - r.top) + 'px';
      };
      arena.addEventListener('mousemove', onMove);
      return () => arena.removeEventListener('mousemove', onMove);
    }, []);

    // Build stamp — time it was first loaded
    const stamp = React.useMemo(() => {
      const now = new Date();
      const pad = n => String(n).padStart(2, '0');
      return `${now.getFullYear()}.${pad(now.getMonth()+1)}.${pad(now.getDate())} · ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    }, []);

    return (
      <article id="hero" className="tile hero hero-tile">
        {/* Engineering corner marks */}
        <span className="reg tl"></span>
        <span className="reg tr"></span>
        <span className="reg bl"></span>
        <span className="reg br"></span>

        {/* Build stamp top-right */}
        <div className="hero-stamp">
          <div className="row">
            <span className="dot"></span>
            <span>{t('กำลังทำงานอยู่', 'in session')}</span>
          </div>
          <div>{stamp} · BKK</div>
          <div>v 2026.05.r3</div>
        </div>

        {/* Side labels */}
        <span className="side-label left">{t('แฟ้มผลงาน · 2026', 'portfolio · 2026')}</span>
        <span className="side-label right">{t('17 โปรเจกต์ · ใช้งานจริง', '17 shipped · production')}</span>

        <div className="tile-text">
          <p className="t-eyebrow">
            {t('AI Engineer · Bangkok', 'AI Engineer · Bangkok')}
          </p>
          <h1 className="t-display" style={{ maxWidth: '24ch' }}>
            {t('สร้างระบบ', "Building software")}
            {' '}<em>{t('ที่ใช้งานได้จริง', 'that actually ships')}</em>{' '}
            {t('— ไม่ใช่แค่ demo.', '— not just demos.')}
          </h1>
          <p className="t-sub" style={{ color: 'var(--ink-2)', maxWidth: '34ch' }}>
            {t('Thanasin Yuntapun · วิศวกร & นักพัฒนา ที่ส่งมอบ AI, vision, embedded ตั้งแต่ MVP ถึง production',
               'Thanasin Yuntapun · I take AI, vision, and embedded systems from MVP to production.')}
          </p>
          <div className="links">
            <a href="#chatbot" className="cta-pill">{t('ดูผลงาน', 'See the work')}</a>
            <a href="#contact" className="cta-link">{t('จ้างงาน', 'Hire me')}</a>
          </div>
        </div>

        {/* Signature mark */}
        <div className="hero-signature" ref={arenaRef}>
          <div className="hero-cursor" ref={cursorRef}></div>
          <div className="hero-mark">
            <span className="strike">Thanasin.</span>
            <span className="role">{t('วิศวกรปล่อยของจริง', 'ships things that work')}</span>
          </div>
        </div>
      </article>
    );
  }

  /* ─── Project tile presets ────────────────────────────────────────────── */

  function ChatbotTile({ lang }) {
    const t = (th, en) => lang === 'th' ? th : en;
    return (
      <ProductTile
        id="chatbot"
        variant="dark"
        size="tall"
        eyebrow={t('AI Chatbot · LINE OA', 'AI Chatbot · LINE OA')}
        eyebrowColor="#30d158"
        headline={t('ผู้ช่วย', 'An assistant')}
        headlineEm={t('ที่ไม่หลับ.', 'that never sleeps.')}
        headlineSize="h1"
        sub={t('Claude + RAG ตอบลูกค้า 24 ชม. — ส่งต่อแอดมินอัตโนมัติเมื่อจำเป็น',
               'Claude + RAG, 24/7 — automatic human handoff the moment intent crosses the line.')}
        primaryLabel={t('ดูเคสจริง', 'See the case study')}
        primaryHref="#case"
        secondaryLabel={t('ราคาเริ่มที่ ฿35,000', 'From ฿35,000')}
        secondaryHref="#services"
        bgImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2000&q=80&auto=format&fit=crop"
        bgImageFull
      >
        <VizChat dark />
      </ProductTile>
    );
  }

  function VisionTile({ lang }) {
    const t = (th, en) => lang === 'th' ? th : en;
    return (
      <ProductTile
        id="vision"
        variant=""
        eyebrow={t('Computer Vision · LPR', 'Computer Vision · LPR')}
        eyebrowColor="var(--c-cv)"
        headline={t('ทุกป้ายทะเบียน', 'Every plate,')}
        headlineEm={t('ทุกเฟรม.', 'every frame.')}
        sub={t('YOLOX + OCR ภาษาไทย · 96.4% recall ที่ 8 fps จาก CCTV จริง',
               'YOLOX + Thai OCR · 96.4% recall at 8 fps on live CCTV feeds.')}
        primaryLabel={t('ดูตัวอย่าง', 'Watch it run')}
        secondaryLabel={t('ความสามารถ', 'See specs')}
        secondaryHref="#capabilities"
        bgImage="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1800&q=80&auto=format&fit=crop"
      >
        <VizCamera />
      </ProductTile>
    );
  }

  function MobileTile({ lang }) {
    const t = (th, en) => lang === 'th' ? th : en;
    return (
      <ProductTile
        id="mobile"
        variant="grey"
        eyebrow={t('iOS · SwiftUI', 'iOS · SwiftUI')}
        eyebrowColor="var(--c-mobile)"
        headline={t('Native iPhone.', 'Native iPhone.')}
        headlineEm={t('3 สัปดาห์.', 'Three weeks.')}
        sub={t('SwiftUI + SwiftData (iOS 17+) ตั้งแต่ MVP จนถึง TestFlight ตรงเวลา',
               'SwiftUI + SwiftData on iOS 17+. From zero to on-time TestFlight.')}
        primaryLabel={t('ดูผลงาน', 'See the build')}
        secondaryLabel={t('ราคาเริ่มที่ ฿75,000', 'From ฿75,000')}
        secondaryHref="#services"
      >
        <VizPhone />
      </ProductTile>
    );
  }

  function RobotTile({ lang }) {
    const t = (th, en) => lang === 'th' ? th : en;
    return (
      <ProductTile
        id="robot"
        variant="tan"
        eyebrow={t('Robotics · Embedded', 'Robotics · Embedded')}
        eyebrowColor="var(--c-robotics)"
        headline={t('หุ่นที่', 'A robot')}
        headlineEm={t('ดูแลตัวเองได้.', 'that minds itself.')}
        sub={t('ESP32 · CAN Bus · PID loop · live telemetry บน Telegram ตลอด 200+ รอบ',
               'ESP32 · CAN-bus mesh · PID loop · live telemetry over 200+ test laps.')}
        primaryLabel={t('ดูรายละเอียด', 'Take a closer look')}
        secondaryLabel={t('ฝังตัวอื่นๆ', 'Embedded work')}
        bgImage="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1800&q=80&auto=format&fit=crop"
      >
        {null}
      </ProductTile>
    );
  }

  function DocsTile({ lang }) {
    const t = (th, en) => lang === 'th' ? th : en;
    return (
      <ProductTile
        id="docs"
        variant=""
        eyebrow={t('RAG · Document Q&A', 'RAG · Document Q&A')}
        eyebrowColor="var(--c-ai)"
        headline={t('คู่มือ', 'Manuals')}
        headlineEm={t('ที่ตอบเอง.', 'that answer back.')}
        sub={t('Q&A จาก PDF เทคนิค TH+EN · 94% Top-1 retrieval · citation แม่นทุกหน้า',
               'Q&A over technical PDFs (TH+EN) · 94% Top-1 retrieval · hard citations to source pages.')}
        primaryLabel={t('ลองเดโม่', 'Try the demo')}
        secondaryLabel={t('ราคาเริ่มที่ ฿55,000', 'From ฿55,000')}
        secondaryHref="#services"
        bgImage="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1800&q=80&auto=format&fit=crop"
      >
        <VizDoc />
      </ProductTile>
    );
  }

  function ClassroomTile({ lang }) {
    const t = (th, en) => lang === 'th' ? th : en;
    return (
      <ProductTile
        id="classroom"
        variant="grey"
        eyebrow={t('Computer Vision · FER', 'Computer Vision · FER')}
        eyebrowColor="var(--c-cv)"
        headline={t('ห้องเรียน', 'A room')}
        headlineEm={t('ที่อ่านอารมณ์.', 'that reads itself.')}
        sub={t('FER + face mesh — เก็บแค่ summary, ไม่เก็บ frame, anonymized โดยสมบูรณ์',
               'FER + face mesh. Aggregate-only, anonymised by construction. Pilot in 4 classrooms.')}
        primaryLabel={t('อ่านวิจัย', 'Read the paper')}
        secondaryLabel={t('Privacy ของระบบ', 'How it stays private')}
        bgImage="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1800&q=80&auto=format&fit=crop"
      >
        <VizClass />
      </ProductTile>
    );
  }

  function SimTile({ lang }) {
    const t = (th, en) => lang === 'th' ? th : en;
    return (
      <ProductTile
        id="sim"
        variant="blue"
        eyebrow={t('Simulation · MATLAB', 'Simulation · MATLAB')}
        eyebrowColor="#69aaff"
        headline={t('แขนหุ่น 6-DOF.', '6-DOF arm.')}
        headlineEm={t('Tuned in Simulink.', 'Tuned in Simulink.')}
        sub={t('IK + dynamics จำลองก่อนสร้างจริง — settling time ลดลง 41%',
               'IK + dynamics verified before any metal was cut. Settling time −41%.')}
        primaryLabel={t('ดูแบบจำลอง', 'See the model')}
        secondaryLabel={t('Robotics เพิ่ม', 'More robotics')}
      >
        <VizSim />
      </ProductTile>
    );
  }

  function CadTile({ lang }) {
    const t = (th, en) => lang === 'th' ? th : en;
    return (
      <ProductTile
        id="cad"
        variant="tan"
        eyebrow={t('CAD · 3D Print', 'CAD · 3D Print')}
        eyebrowColor="var(--c-cad)"
        headline={t('ชิ้นงานที่', 'Parts you can')}
        headlineEm={t('จับต้องได้.', 'actually hold.')}
        sub={t('Fusion 360 / SolidWorks · engineering drawing พร้อม BOQ · ผลิตจริงด้วย FDM',
               'Fusion 360 / SolidWorks · full engineering drawings + BOQ · printed and shipped.')}
        primaryLabel={t('ดูผลงาน CAD', 'See CAD work')}
        secondaryLabel={t('ราคาเริ่มที่ ฿8,000', 'From ฿8,000')}
        secondaryHref="#services"
      >
        <VizCad />
      </ProductTile>
    );
  }

  /* ─── Capabilities strip ──────────────────────────────────────────────── */
  function CapStrip({ lang }) {
    const D = window.PORTFOLIO;
    const t = (th, en) => lang === 'th' ? th : en;
    return (
      <section id="capabilities" className="cap-strip">
        <div className="cap-head">
          <div>
            <p className="t-eyebrow" style={{ color: 'var(--c-ai)' }}>{t('ความสามารถ', 'Capabilities')}</p>
            <h2 className="t-headline" style={{ marginTop: 6 }}>
              {t('เครื่องมือที่ใช้งานจริง.', 'The tools, used in production.')}
            </h2>
          </div>
          <p className="t-body" style={{ color: 'var(--ink-mute)', maxWidth: '40ch' }}>
            {t('จุดที่ติดดาวคือเครื่องมือที่ใช้งานเป็นประจำในเดือนที่ผ่านมา',
               'Dotted items are the tools actively in production in the last 30 days.')}
          </p>
        </div>
        <div className="cap-grid">
          {D.capabilities.map((c, i) => (
            <div key={i} className="cap-block">
              <h4>{tx(c.group, lang)}</h4>
              <ul>
                {c.items.map((it, j) => (
                  <li key={j} data-hi={it.hi ? 'true' : 'false'}>{it.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ─── Services pricing strip ──────────────────────────────────────────── */
  function ServicesStrip({ lang }) {
    const D = window.PORTFOLIO;
    const t = (th, en) => lang === 'th' ? th : en;
    return (
      <section id="services" className="svc-strip">
        <div className="cap-head">
          <div>
            <p className="t-eyebrow" style={{ color: 'var(--c-mobile)' }}>{t('บริการ', 'Services')}</p>
            <h2 className="t-headline" style={{ marginTop: 6 }}>
              {t('สิ่งที่ผมช่วยคุณได้.', "What I can build for you.")}
            </h2>
          </div>
          <a className="cta-link" href="#contact">{t('ปรึกษาฟรี', 'Book a free call')}</a>
        </div>
        <div className="svc-list">
          {D.services.map((s, i) => (
            <div key={i} className="svc-row">
              <div className="num">{s.num}</div>
              <div className="ttl">{tx(s.title, lang)}</div>
              <div className="desc">{tx(s.desc, lang)}</div>
              <div className="price">
                <span className="from">{t('เริ่มที่', 'From')} · {tx(s.time, lang)}</span>
                {tx(s.price, lang).replace(/^From\s*|^เริ่มที่\s*/i, '')}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  /* ─── Contact tile ────────────────────────────────────────────────────── */
  function ContactTile({ lang }) {
    const D = window.PORTFOLIO;
    const t = (th, en) => lang === 'th' ? th : en;
    return (
      <article id="contact" className="tile contact-tile" style={{ minHeight: 'auto' }}>
        <div className="tile-text" style={{ paddingTop: '64px' }}>
          <p className="t-eyebrow" style={{ color: 'var(--c-cv)' }}>
            {t('เปิดรับงาน Q2–Q3 2026', 'Booking Q2–Q3 2026')}
          </p>
          <h2 className="t-display" style={{ maxWidth: '20ch' }}>
            {t('มาคุยกันสักหน่อยมั้ย?', "Let's build something.")}
          </h2>
          <p className="t-sub" style={{ color: 'var(--ink-2)', maxWidth: '36ch' }}>
            {t('ตอบกลับภายใน 24 ชม. · เริ่มทำได้ภายใน 2 สัปดาห์',
               'Reply within 24 hours · I can start within two weeks.')}
          </p>
        </div>
        <div className="contact-grid">
          <a className="contact-cell" href={`mailto:${D.brand.email}`}>
            <div className="lbl">Email</div>
            <div className="val">{D.brand.email}</div>
          </a>
          <a className="contact-cell" href="#">
            <div className="lbl">LINE</div>
            <div className="val">{D.brand.line}</div>
          </a>
          <a className="contact-cell" href={`https://github.com/${D.brand.github}`}>
            <div className="lbl">GitHub</div>
            <div className="val">@{D.brand.github}</div>
          </a>
        </div>
      </article>
    );
  }

  /* ─── Footer ──────────────────────────────────────────────────────────── */
  function FootApple({ lang }) {
    const t = (th, en) => lang === 'th' ? th : en;
    return (
      <footer className="foot">
        <div className="foot-inner">
          <p>
            {t('* ผลตัวเลขทั้งหมดมาจากระบบ production จริง วัดผลภายใน 4 สัปดาห์หลัง deploy ตัวเลขในงานของคุณอาจแตกต่างไปตามขอบเขตและข้อมูล',
               '* Numbers shown are from actual production deployments, measured within 4 weeks of launch. Your results will vary based on scope and data.')}
          </p>
          <p>
            {t('ราคาเริ่มต้นเป็นเพียงจุดเริ่ม — ขอบเขตจริงอ้างอิงตามข้อกำหนดและขนาดของระบบ ขอใบเสนอราคาได้ทาง email',
               'Starting prices are a floor — final scope depends on requirements and system size. Request a written quote via email.')}
          </p>
          <div className="links">
            <div>
              <h5>{t('ผลงาน', 'Work')}</h5>
              <ul>
                <li><a href="#chatbot">LINE OA Chatbot</a></li>
                <li><a href="#vision">License Plate Recognition</a></li>
                <li><a href="#robot">Differential-drive Robot</a></li>
                <li><a href="#mobile">iOS App</a></li>
                <li><a href="#docs">RAG Document Q&A</a></li>
              </ul>
            </div>
            <div>
              <h5>{t('บริการ', 'Services')}</h5>
              <ul>
                <li><a href="#services">AI Chatbot</a></li>
                <li><a href="#services">RAG Q&A</a></li>
                <li><a href="#services">Computer Vision</a></li>
                <li><a href="#services">Embedded Firmware</a></li>
                <li><a href="#services">CAD &amp; 3D Print</a></li>
              </ul>
            </div>
            <div>
              <h5>{t('ความสามารถ', 'Capabilities')}</h5>
              <ul>
                <li><a href="#capabilities">AI &amp; LLM</a></li>
                <li><a href="#capabilities">Python Backend</a></li>
                <li><a href="#capabilities">Computer Vision</a></li>
                <li><a href="#capabilities">Embedded</a></li>
                <li><a href="#capabilities">Infra</a></li>
              </ul>
            </div>
            <div>
              <h5>{t('ติดต่อ', 'Contact')}</h5>
              <ul>
                <li><a href={`mailto:thanasin.yuntapun@gmail.com`}>Email</a></li>
                <li><a href="#">LINE @ryujin_op1</a></li>
                <li><a href="https://github.com/thanasinyuntapun-maker">GitHub</a></li>
                <li><a href="#contact">{t('แบบฟอร์มติดต่อ', 'Contact form')}</a></li>
                <li><a href="#">{t('CV / Résumé', 'CV / Résumé')}</a></li>
              </ul>
            </div>
          </div>
          <div className="legal">
            <span>Copyright © 2026 Thanasin Yuntapun. {t('สงวนลิขสิทธิ์ทั้งหมด', 'All rights reserved.')}</span>
            <span>
              <a href="#">{t('นโยบายความเป็นส่วนตัว', 'Privacy Policy')}</a>
              <a href="#">{t('เงื่อนไขการใช้งาน', 'Terms of Use')}</a>
              <a href="#">{t('แผนผังเว็บไซต์', 'Site Map')}</a>
              <a href="#">{t('กรุงเทพฯ', 'Bangkok')} 🇹🇭</a>
            </span>
          </div>
        </div>
      </footer>
    );
  }

  Object.assign(window, {
    TopNav,
    HeroTile,
    ChatbotTile, VisionTile, MobileTile, RobotTile,
    DocsTile, ClassroomTile, SimTile, CadTile,
    CapStrip, ServicesStrip, ContactTile, FootApple,
  });
})();
