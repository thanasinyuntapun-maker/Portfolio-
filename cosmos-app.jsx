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
  const [lang, setLang] = useState(() => localStorage.getItem('cosmos-lang') || 'en');
  const [filter, setFilter] = useState('all');
  const [scrolled, setScrolled] = useState(false);
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

  useReveal();

  const projects = useMemo(
    () => (filter === 'all' ? P.projects : P.projects.filter((p) => p.cats.includes(filter))),
    [filter, P.projects]
  );

  const marqueeItems = ['ESP32 · CAN Bus', 'Claude · RAG', 'YOLOX · OpenCV',
    'SwiftUI · iOS', 'FastAPI', 'Fusion 360 · 3D Print'];

  return (
    <React.Fragment>
      {/* NAV */}
      <nav className={'nav' + (scrolled ? ' scrolled' : '')}>
        <a className="brand" href="#top">
          <span className="dot"></span>{P.brand.nameShort}
        </a>
        <div className="nav-links">
          <a className="link" href="#work">{tr(T('ผลงาน', 'Work'))}</a>
          <a className="link" href="#services">{tr(T('บริการ', 'Services'))}</a>
          <a className="link" href="#skills">{tr(T('ทักษะ', 'Skills'))}</a>
          <a className="link" href="#contact">{tr(T('ติดต่อ', 'Contact'))}</a>
        </div>
        <div className="lang-toggle">
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          <button className={lang === 'th' ? 'active' : ''} onClick={() => setLang('th')}>TH</button>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow"><span className="tick"></span>{tr(P.hero.eyebrow)}</span>
            <h1>
              {tr(P.hero.headlinePre)} <span className="em">{tr(P.hero.headlineEm)}</span> {tr(P.hero.headlinePost)}
            </h1>
            <p className="sub">{tr(P.hero.sub)}</p>
            <div className="cta-row">
              <a className="btn-primary" href="#work">{tr(T('ดูผลงาน', 'View work'))}<Arrow /></a>
              <a className="btn-ghost" href="#contact">{tr(T('ติดต่องาน', 'Get in touch'))}<Arrow /></a>
            </div>
            <span className="avail"><span className="pulse"></span>{tr(P.brand.availability).toUpperCase()}</span>
          </div>
          <div>
            <div className="hero-meta">
              {P.hero.meta.map((m, i) => (
                <div key={i}>
                  <div className="meta-k">{tr(m.label)}</div>
                  <div className="meta-v">{tr(m.value)}</div>
                </div>
              ))}
            </div>
          </div>
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
      <section id="work" className="block">
        <div className="wrap">
          <div className="section-head reveal">
            <div>
              <span className="eyebrow"><span className="tick"></span>{tr(T('ผลงาน', 'Work'))}</span>
              <h2 className="section-title">{tr(T('ผลงาน', 'Selected'))} <span className="em">{tr(T('ที่ผ่านมา', 'work'))}</span></h2>
            </div>
            <span className="section-num">{String(P.projects.length).padStart(2, '0')} {tr(T('โปรเจกต์', 'projects'))}</span>
          </div>

          <div className="filters reveal">
            {P.filters.map((f) => (
              <button key={f.id} className={'chip' + (filter === f.id ? ' active' : '')} onClick={() => setFilter(f.id)}>
                {tr(f.label)}
              </button>
            ))}
          </div>

          <div className="work-grid">
            {projects.map((p) => (
              <article key={p.id} className={'card reveal' + (p.feature ? ' feature' : '')}>
                <span className="glow"></span>
                <div className="card-top">
                  <span className="card-cat">{tr(p.cat)}</span>
                  <span className="card-idx">{p.idx} / {p.year}</span>
                </div>
                <h3>{tr(p.title)} <span className="em">{tr(p.titleEm)}</span></h3>
                <p className="desc">{tr(p.desc)}</p>
                <div className="card-foot">
                  {p.tags.slice(0, p.feature ? 5 : 3).map((tg, i) => <span key={i} className="tag">{tg}</span>)}
                  <span className="card-outcome">{tr(p.outcome)}</span>
                </div>
                {(p.liveUrl || p.githubUrl) && (
                  <div className="card-links">
                    {p.liveUrl && <a className="card-link card-link--live" href={p.liveUrl} target="_blank" rel="noreferrer">Live ↗</a>}
                    {p.githubUrl && <a className="card-link card-link--gh" href={p.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}
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
          <div className="contact-links">
            <a className="contact-card" href={'mailto:' + P.brand.email}>
              <span className="k">Email</span><span className="v">{P.brand.email}</span>
            </a>
            <a className="contact-card" href="#">
              <span className="k">LINE</span><span className="v">{P.brand.line}</span>
            </a>
            <a className="contact-card" href={'https://github.com/' + P.brand.github} target="_blank" rel="noreferrer">
              <span className="k">GitHub</span><span className="v">{P.brand.github}</span>
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
