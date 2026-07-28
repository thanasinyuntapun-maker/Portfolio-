// cosmos-app.jsx — renders the black-hole portfolio from window.PORTFOLIO
(function () {
const { useState, useEffect, useRef, useMemo } = React;
const T = (th, en) => ({ th, en });

// ---- color directions ----
const DIRECTIONS = {
  interstellar: {
    label: 'Copper',
    accent: '#c8814a', soft: 'rgba(200,129,74,0.16)', glow: 'rgba(200,129,74,0.5)',
    palette: { inner: '#fbe7c2', mid: '#c8814a', outer: '#6e3320' },
  },
  quasar: {
    label: 'Quasar',
    accent: '#39b6ff', soft: 'rgba(57,182,255,0.16)', glow: 'rgba(57,182,255,0.5)',
    palette: { inner: '#dff4ff', mid: '#39b6ff', outer: '#3b4fe0' },
  },
  solar: {
    label: 'Solar',
    accent: '#ffb02e', soft: 'rgba(255,176,46,0.16)', glow: 'rgba(255,176,46,0.5)',
    palette: { inner: '#fff1d2', mid: '#ffb02e', outer: '#d23a2b' },
  },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "interstellar",
  "strength": "subtle"
}/*EDITMODE-END*/;

const STRENGTH_OPTS = ['off', 'subtle', 'balanced', 'intense'];

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    // Safety net: never let content stay hidden if the scroll model doesn't fire IO.
    const fallback = setTimeout(() => els.forEach((el) => el.classList.add('in')), 1400);
    return () => { io.disconnect(); clearTimeout(fallback); };
  });
}

function App() {
  const P = window.PORTFOLIO;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useState(() => localStorage.getItem('cosmos-lang') || 'th');
  const [filter, setFilter] = useState('all');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sceneRef = useRef(null);

  const tr = (f) => (f && typeof f === 'object' ? f[lang] : f);

  // init scene once
  useEffect(() => {
    const dir = DIRECTIONS[t.direction] || DIRECTIONS.interstellar;
    sceneRef.current = window.initCosmos(document.getElementById('bg-canvas'), {
      palette: dir.palette, strength: t.strength,
    });
    return () => sceneRef.current && sceneRef.current.dispose();
  }, []);

  // direction -> css vars + scene palette
  useEffect(() => {
    const dir = DIRECTIONS[t.direction] || DIRECTIONS.interstellar;
    const r = document.documentElement.style;
    r.setProperty('--accent', dir.accent);
    r.setProperty('--accent-soft', dir.soft);
    r.setProperty('--glow', dir.glow);
    if (sceneRef.current) sceneRef.current.setPalette(dir.palette);
  }, [t.direction]);

  // strength -> scene
  useEffect(() => {
    if (sceneRef.current) sceneRef.current.setStrength(t.strength);
  }, [t.strength]);

  useEffect(() => { localStorage.setItem('cosmos-lang', lang); }, [lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useReveal();

  const projects = useMemo(
    () => (filter === 'all' ? P.projects : P.projects.filter((p) => p.cats.includes(filter))),
    [filter, P.projects]
  );

  const marqueeItems = ['ESP32 · CAN Bus', 'Claude · RAG', 'YOLOX · OpenCV',
    'SwiftUI · iOS', 'FastAPI', 'Fusion 360 · 3D Print'];

  const proofPoints = [
    { value: '17+', label: T('ระบบที่สร้างและส่งมอบ', 'systems built & shipped') },
    { value: '96.4%', label: T('Recall ระบบอ่านป้ายทะเบียน', 'license-plate recall') },
    { value: '−62%', label: T('ภาระแอดมินจาก AI Chatbot', 'admin load with AI chatbot') },
    { value: '90%+', label: T('ลด drift ด้วย LQR', 'drift reduction with LQR') },
  ];

  const closeMobile = () => setMobileOpen(false);

  return (
    <React.Fragment>
      {/* NAV */}
      <nav className={'nav' + (scrolled ? ' scrolled' : '')}>
        <a className="brand" href="#top" onClick={closeMobile}>
          <span className="brand-mark"><span className="brand-core"></span></span>
          <span>{P.brand.nameShort}</span>
        </a>
        <div className="nav-links">
          <a className="link" href="#work">{tr(T('ผลงาน', 'Work'))}</a>
          <a className="link" href="#services">{tr(T('บริการ', 'Services'))}</a>
          <a className="link" href="#skills">{tr(T('ทักษะ', 'Skills'))}</a>
          <a className="link" href="#contact">{tr(T('ติดต่อ', 'Contact'))}</a>
        </div>
        <div className="nav-actions">
          <div className="lang-toggle" aria-label={tr(T('เลือกภาษา', 'Select language'))}>
            <button className={lang === 'th' ? 'active' : ''} onClick={() => setLang('th')}>TH</button>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <button
            className={'nav-burger' + (mobileOpen ? ' open' : '')}
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={tr(T('เปิดเมนู', 'Open menu'))}
          >
            <span></span><span></span>
          </button>
        </div>
        <div id="mobile-menu" className={'mobile-menu' + (mobileOpen ? ' open' : '')}>
          <a href="#work" onClick={closeMobile}><span>01</span>{tr(T('ผลงาน', 'Work'))}</a>
          <a href="#services" onClick={closeMobile}><span>02</span>{tr(T('บริการ', 'Services'))}</a>
          <a href="#skills" onClick={closeMobile}><span>03</span>{tr(T('ทักษะ', 'Skills'))}</a>
          <a href="#contact" onClick={closeMobile}><span>04</span>{tr(T('ติดต่อ', 'Contact'))}</a>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><span className="tick"></span>{tr(P.hero.eyebrow)}</span>
            <h1>
              {tr(P.hero.headlinePre)} <span className="em">{tr(P.hero.headlineEm)}</span> {tr(P.hero.headlinePost)}
            </h1>
            <p className="sub">{tr(P.hero.sub)}</p>
            <div className="cta-row">
              <a className="btn-primary" href="#work">{tr(T('ดูผลงาน', 'View work'))}<Arrow /></a>
              <a className="btn-ghost" href="#contact">{tr(T('ติดต่องาน', 'Get in touch'))}<Arrow /></a>
            </div>
            <div className="hero-trust">
              <span className="avail"><span className="pulse"></span>{tr(P.brand.availability)}</span>
              <span className="hero-trust-sep"></span>
              <span>{tr(T('ตอบกลับภายใน 24 ชม.', 'Replies within 24 hours'))}</span>
            </div>
          </div>
          <aside className="hero-panel" aria-label={tr(T('ข้อมูลโดยสรุป', 'Profile overview'))}>
            <div className="panel-top">
              <span className="panel-id">TY / ENGINEERING SYSTEMS</span>
              <span className="panel-status"><span></span>ONLINE</span>
            </div>
            <div className="signal">
              <div className="signal-orbit orbit-a"></div>
              <div className="signal-orbit orbit-b"></div>
              <div className="signal-cross cross-a"></div>
              <div className="signal-cross cross-b"></div>
              <div className="signal-core">
                <span>AI</span>
                <small>× ROBOTICS</small>
              </div>
            </div>
            <div className="panel-focus">
              <span>01 / SOFTWARE</span>
              <span>02 / HARDWARE</span>
              <span>03 / CONTROL</span>
            </div>
            <div className="hero-meta">
              {P.hero.meta.map((m, i) => (
                <div key={i}>
                  <div className="meta-k">{tr(m.label)}</div>
                  <div className="meta-v">{tr(m.value)}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </header>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <React.Fragment key={dup}>
              {marqueeItems.map((it, i) => (
                <React.Fragment key={i}>
                  <span className="mq-item">{it}</span>
                  <span className="mq-dot"></span>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* WORK */}
      <main className="content">
      <section className="proof-strip" aria-label={tr(T('ผลงานเชิงตัวเลข', 'Measured outcomes'))}>
        <div className="wrap proof-grid">
          {proofPoints.map((point, i) => (
            <div className="proof-item reveal" key={i}>
              <span className="proof-index">0{i + 1}</span>
              <strong>{point.value}</strong>
              <span>{tr(point.label)}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="block">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow"><span className="tick"></span>{tr(T('ผลงาน', 'Work'))}</span>
              <h2 className="section-title">{tr(T('ระบบที่สร้าง', 'Selected systems'))} <span className="em">{tr(T('และวัดผลได้', '& outcomes'))}</span></h2>
            </div>
            <p className="section-intro">{tr(T(
              'ตั้งแต่ AI ที่ลดภาระทีม ไปจนถึงระบบควบคุมและ Computer Vision แบบ real-time',
              'From AI that reduces team workload to real-time control and computer vision systems.'
            ))}</p>
          </div>

          <div className="filter-row reveal">
            <span className="filter-label">{tr(T('เลือกหมวด', 'Filter by'))}</span>
            <div className="filters">
            {P.filters.map((f) => (
              <button key={f.id} className={'chip' + (filter === f.id ? ' active' : '')} onClick={() => setFilter(f.id)}>
                {tr(f.label)}
              </button>
            ))}
            </div>
            <span className="filter-count">{String(projects.length).padStart(2, '0')} / {String(P.projects.length).padStart(2, '0')}</span>
          </div>

          <div className="work-grid">
            {projects.map((p) => (
              <article key={p.id} className={'card reveal' + (p.feature ? ' feature' : '')}>
                <span className="glow"></span>
                <div className="card-top">
                  <div>
                    {p.feature && <span className="featured-label">{tr(T('ผลงานเด่น', 'Featured case'))}</span>}
                    <span className="card-cat">{tr(p.cat)}</span>
                  </div>
                  <span className="card-idx">{p.idx} / {p.year}</span>
                </div>
                <h3>{tr(p.title)} <span className="em">{tr(p.titleEm)}</span></h3>
                <p className="desc">{tr(p.desc)}</p>
                <div className="card-result">
                  <span>{tr(T('ผลลัพธ์', 'Outcome'))}</span>
                  <strong>{tr(p.outcome)}</strong>
                </div>
                <div className="card-meta">
                  <div><span>{tr(T('สำหรับ', 'For'))}</span><strong>{tr(p.client)}</strong></div>
                  <div><span>{tr(T('บทบาท', 'Role'))}</span><strong>{tr(p.role)}</strong></div>
                </div>
                <div className="card-foot">
                  {p.tags.slice(0, p.feature ? 5 : 3).map((tg, i) => <span key={i} className="tag">{tg}</span>)}
                </div>
                {(p.liveUrl || p.githubUrl) && (
                  <div className="card-links">
                    {p.liveUrl && <a className="card-link card-link--live" href={p.liveUrl} target="_blank" rel="noreferrer">{tr(T('ทดลองใช้งาน', 'Live demo'))}<Arrow /></a>}
                    {p.githubUrl && <a className="card-link card-link--gh" href={p.githubUrl} target="_blank" rel="noreferrer">GitHub <Arrow /></a>}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="block">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow"><span className="tick"></span>{tr(T('บริการ', 'Services'))}</span>
              <h2 className="section-title">{tr(T('งาน', 'Services'))} <span className="em">{tr(T('ที่รับทำ', 'I build'))}</span></h2>
            </div>
          </div>
          <div className="svc-grid reveal">
            {P.services.map((s) => (
              <div key={s.num} className="svc">
                <div className="svc-top">
                  <span className="svc-num">{s.num}</span>
                  <span className="svc-tag">{tr(s.tag)}</span>
                </div>
                <h3>{tr(s.title)}{s.titleSub && <span className="svc-sub"> — {tr(s.titleSub)}</span>}</h3>
                <p>{tr(s.desc)}</p>
                <div className="svc-bullets">
                  {s.bullets.map((b, i) => <span key={i} className="tag">{b}</span>)}
                </div>
                <div className="svc-foot">
                  <span className="svc-price">{tr(s.price)}</span>
                  <span className="svc-time">{tr(s.time)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="block">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow"><span className="tick"></span>{tr(T('ทักษะ', 'Skills'))}</span>
              <h2 className="section-title">{tr(T('เครื่องมือ', 'Tools &'))} <span className="em">{tr(T('ที่ใช้', 'tech'))}</span></h2>
            </div>
          </div>
          <div className="cap-grid">
            {P.capabilities.map((c, i) => (
              <div key={i} className="cap reveal">
                <div className="cap-head">
                  <span className="cap-ico">{c.ico}</span>
                  <span className="cap-name">{tr(c.group)}</span>
                </div>
                <div className="cap-list">
                  {c.items.map((it, j) => (
                    <div key={j} className={'cap-item' + (it.hi ? ' hi' : '')}>
                      <span className="mark"></span>{it.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <div className="wrap reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}><span className="tick"></span>{tr(T('ติดต่อ', 'Contact'))}</span>
          <h2>{tr(T('รับงาน', 'Open to'))} <span className="em">{tr(T('freelance', 'freelance'))}</span></h2>
          <p className="sub">{tr(T('ตอบกลับภายใน 24 ชม. ทักมาคุยรายละเอียดของงานได้เลย', 'Replies within 24 hours — send the details and let’s talk.'))}</p>
          <div className="social-links">
            <a className="social-card" href={'mailto:' + P.brand.email} aria-label={'Email — ' + P.brand.email}>
              <span className="social-ico">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                </svg>
              </span>
              <span className="social-txt"><span className="k">Email</span><span className="v">{P.brand.email}</span></span>
            </a>
            <a className="social-card" href={'https://line.me/R/ti/p/' + encodeURIComponent(P.brand.line)} target="_blank" rel="noreferrer" aria-label={'LINE — ' + P.brand.line}>
              <span className="social-ico">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </span>
              <span className="social-txt"><span className="k">LINE</span><span className="v">{P.brand.line}</span></span>
            </a>
            <a className="social-card" href={'https://github.com/' + P.brand.github} target="_blank" rel="noreferrer" aria-label={'GitHub — ' + P.brand.github}>
              <span className="social-ico">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </span>
              <span className="social-txt"><span className="k">GitHub</span><span className="v">{P.brand.github}</span></span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foot">
        <span>© 2026 {P.brand.name}</span>
        <span>{tr(P.brand.location)}</span>
      </footer>
      </main>

      {/* TWEAKS */}
      <TweaksPanel>
        <TweakSection label={lang === 'th' ? 'พื้นหลังหลุมดำ' : 'Black-hole background'} />
        <TweakRadio
          label={lang === 'th' ? 'ทิศทางสี' : 'Color direction'}
          value={t.direction}
          options={Object.keys(DIRECTIONS).map((k) => ({ value: k, label: DIRECTIONS[k].label }))}
          onChange={(v) => setTweak('direction', v)}
        />
        <TweakSelect
          label={lang === 'th' ? 'ความแรงพื้นหลัง 3D' : '3D intensity'}
          value={t.strength}
          options={STRENGTH_OPTS.map((s) => ({ value: s, label: s[0].toUpperCase() + s.slice(1) }))}
          onChange={(v) => setTweak('strength', v)}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
