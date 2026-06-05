// Sections — TopBar, Hero, Work grid, Marquee, Services, Capabilities, Contact, Foot.
// Depends on globals: L, MD, NumDot, ArchPeek (from components.jsx)
// Wrapped in IIFE to isolate scope.

(function () {
  const { useState, useEffect, useMemo } = React;
  const { L, MD, NumDot, ArchPeek } = window;

  // Tiny T helper, mirroring data.js
  function T(th, en) {return { th, en };}

  function TopBar({ lang, setLang, mode, setMode }) {
    const D = window.PORTFOLIO;
    return (
      <header className="topbar">
      <div className="wrap topbar-inner">
        <a href="#top" className="brand" onClick={(e) => {e.preventDefault();window.scrollTo({ top: 0, behavior: "smooth" });}}>
          <span className="brand-dot"></span>
          <span>Thanasin<em>.</em></span>
        </a>
        <nav className="nav">
          <a href="#work">{L(T("ผลงาน", "Work"), lang)}</a>
          <a href="#services">{L(T("บริการ", "Services"), lang)}</a>
          <a href="#capabilities">{L(T("ทักษะ", "Skills"), lang)}</a>
          <a href="#contact">{L(T("ติดต่อ", "Contact"), lang)}</a>
          <span className="sep" />
          <button onClick={() => setLang(lang === "th" ? "en" : "th")} aria-label="Toggle language">
            {lang === "th" ? "EN" : "TH"}
          </button>
          <button onClick={() => setMode(mode === "light" ? "dark" : "light")} aria-label="Toggle dark mode">
            {mode === "light" ? "◐" : "◑"}
          </button>
        </nav>
      </div>
    </header>);

  }

  // Tiny T helper removed (now defined at top of IIFE).

  function Hero({ lang }) {
    const D = window.PORTFOLIO;
    const h = D.hero;
    return (
      <section className="hero wrap" id="top">
      <span className="reg" style={{ left: -16, top: 8 }} aria-hidden="true"></span>
      <span className="reg" style={{ right: -16, top: 8 }} aria-hidden="true"></span>
      <div className="hero-grid">
        <div className="hero-lead">
          <span className="eyebrow reveal" data-d="1">{L(h.eyebrow, lang)}</span>
          <h1 className="display reveal" data-d="2">
            {L(h.headlinePre, lang)}{" "}
            <em>{L(h.headlineEm, lang)}</em>{" "}
            {L(h.headlinePost, lang)}
          </h1>
          <p className="lead reveal" data-d="3">{L(h.sub, lang)}</p>
          <div className="hero-cta-row reveal" data-d="3">
            <a className="btn accent" href="#work">
              {L(T("ดูผลงาน", "See selected work"), lang)} →
            </a>
            <a className="btn ghost" href="#contact">
              {L(T("ติดต่อจ้างงาน", "Hire me"), lang)} →
            </a>
          </div>
          <span className="hero-availability reveal" data-d="3">{L(D.brand.availability, lang)}</span>
        </div>

        <aside className="hero-meta">
          {h.meta.map((m, i) =>
            <div className="meta-row" key={i}>
              <span className="label">{L(m.label, lang)}</span>
              <span className="value">{L(m.value, lang)}</span>
            </div>
            )}
        </aside>
      </div>
    </section>);

  }

  function Marquee({ lang }) {
    const words = [
    T("AI ที่ทำงานจริง", "AI that ships"),
    T("Computer Vision", "Computer Vision"),
    T("Robotics · Embedded", "Robotics · Embedded"),
    T("Native iOS", "Native iOS"),
    T("MATLAB · Simulink", "MATLAB · Simulink"),
    T("จาก prototype สู่ production", "Prototype to production")];

    const items = [...words, ...words]; // duplicate for seamless loop
    return (
      <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((w, i) =>
          <span key={i}>
            {L(w, lang)} <span className="sep">✦</span>
          </span>
          )}
      </div>
    </div>);

  }

  function SectionHead({ num, title, sub, aside, lang }) {
    return (
      <header className="section-head">
      <div className="section-num">— {num}</div>
      <div className="section-title">
        <h2 className="h2">{L(title, lang)}</h2>
        {sub && <span className="sub">{L(sub, lang)}</span>}
      </div>
      {aside && <div className="section-aside">{L(aside, lang)}</div>}
    </header>);

  }

  function Work({ lang, onOpenCase }) {
    const D = window.PORTFOLIO;
    const [filter, setFilter] = useState("all");
    const projects = useMemo(() => {
      if (filter === "all") return D.projects;
      return D.projects.filter((p) => p.cats.includes(filter));
    }, [filter, D.projects]);

    return (
      <section className="section wrap" id="work">
      <SectionHead
          num="01"
          title={T("ผลงานที่ผ่านมา", "Selected work")}
          sub={T("วางเมาส์เพื่อดูสถาปัตยกรรม · คลิกการ์ดเด่นเพื่ออ่านเคส", "Hover for system shape · click the feature card for the full case study")}
          aside={T(`17 ผลงาน · 2022–2026`, `17 projects · 2022–2026`)}
          lang={lang} />
        

      <div className="work-filter" role="tablist">
        {D.filters.map((f) =>
          <button
            key={f.id}
            data-active={filter === f.id}
            onClick={() => setFilter(f.id)}>
            
            {L(f.label, lang)}
          </button>
          )}
      </div>

      <div className="work-grid">
        {projects.map((p, i) => {
            const isFeature = !!p.feature;
            const isCase = p.id === D.caseStudy.projectId;
            return (
              <article
                key={p.id}
                className="work-card"
                data-feature={isFeature}
                onClick={() => {if (isCase) onOpenCase(p.id);}}
                style={{ cursor: isCase ? "pointer" : "default" }}>
                
              <div className="work-card-hd">
                <span className="work-card-idx">{p.idx} · {p.year}</span>
                <span className="work-card-cat">{L(p.cat, lang)}</span>
              </div>

              <h3 className="work-card-ttl">
                {L(p.title, lang)} <em>{L(p.titleEm, lang)}</em>
              </h3>

              <p className="work-card-desc">{L(p.desc, lang)}</p>

              <div className="work-card-meta">
                {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>

              <div className="arch-peek">
                <ArchPeek project={p} />
              </div>

              <span className="work-card-bg-num" aria-hidden="true">{p.idx}</span>

              <span className="work-card-cta">
                {isCase ?
                  L(T("อ่านเคสฉบับเต็ม", "Read the case study"), lang) :
                  L(T("วางเมาส์เพื่อดูระบบ", "Hover for system shape"), lang)}
                →
              </span>
            </article>);

          })}
      </div>
    </section>);

  }

  function Services({ lang }) {
    const D = window.PORTFOLIO;
    return (
      <section className="section wrap" id="services" style={{ fontFamily: "\"IBM Plex Sans Thai\"" }}>
      <SectionHead
          num="02"
          title={T("รับงานอะไรบ้าง", "What I'll build for you")}
          sub={T("Freelance · ตั้งแต่ prototype ไปจนถึง deploy บน production", "Freelance · from prototype through to production deploy")}
          aside={T("ปรึกษาฟรี · ตอบกลับใน 24 ชม.", "Free consultation · 24h reply")}
          lang={lang} />
        

      <div className="svc-grid">
        {D.services.map((s) =>
          <article className="svc" key={s.num}>
            <div className="svc-num">{s.num}</div>
            <div className="svc-body">
              <span className="svc-tag">— {L(s.tag, lang)}</span>
              <h3 className="svc-ttl">{L(s.title, lang)}</h3>
              <p className="svc-desc">{L(s.desc, lang)}</p>
              <div className="svc-bullets">
                {s.bullets.map((b) => <span className="tag" key={b}>{b}</span>)}
              </div>
              <div className="svc-price">
                <span><strong>{L(s.price, lang)}</strong></span>
                <span>{L(s.time, lang)}</span>
              </div>
            </div>
          </article>
          )}
      </div>
    </section>);

  }

  function Capabilities({ lang }) {
    const D = window.PORTFOLIO;
    return (
      <section className="section wrap" id="capabilities">
      <SectionHead
          num="03"
          title={T("ทักษะและเทคโนโลยี", "Capabilities")}
          sub={T("Highlighted = ใช้งานจริงบน production · อื่น ๆ = ใช้งานเคยใช้พอประมาณ", "Highlighted = used on production · the rest = working knowledge")}
          aside={T("อัปเดตเดือน พ.ค. 2026", "Updated May 2026")}
          lang={lang} />
        
      <div className="cap-grid">
        {D.capabilities.map((g, i) => {
          const hiItems = g.items.filter((it) => it.hi);
          const otherItems = g.items.filter((it) => !it.hi);
          return (
            <div className="cap" key={i}>
              <div className="cap-hd">
                <span className="ico">{g.ico}</span>
                <span>{L(g.group, lang)}</span>
              </div>
              <div className="cap-list">
                {hiItems.map((it) =>
                  <span className="chip" data-hi="true" key={it.name}>{it.name}</span>
                )}
                {otherItems.map((it, j) =>
                  <span className="chip" data-hi="false" key={it.name} style={j === 0 && hiItems.length > 0 ? {marginLeft:"10px"} : undefined}>{it.name}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>);

  }

  function Contact({ lang }) {
    const D = window.PORTFOLIO;
    return (
      <section className="section wrap" id="contact">
      <SectionHead
          num="04"
          title={T("มีโปรเจกต์ในใจแล้วหรือยัง", "Got a project in mind?")}
          sub={T("ปรึกษาฟรี · ตอบกลับภายใน 24 ชม.", "Free consultation · 24h reply")}
          aside={T("Available · พ.ค. 2026 – ก.ค. 2026", "Available · May–Jul 2026")}
          lang={lang} />
        
      <div className="contact">
        <h2 className="contact-big">
          {L(T("มาสร้าง", "Let's build"), lang)}<br />
          <em>{L(T("ของจริงกัน", "something real"), lang)}</em>.
        </h2>
        <div className="contact-lines">
          <a className="contact-line" href={`mailto:${D.brand.email}`}>
            <span className="lbl">Email</span>
            <span>{D.brand.email}</span>
          </a>
          <a className="contact-line" href={`https://line.me/ti/p/~ryujin_op1`} target="_blank" rel="noopener">
            <span className="lbl">LINE</span>
            <span>{D.brand.line}</span>
          </a>
          <a className="contact-line" href={`https://github.com/${D.brand.github}`} target="_blank" rel="noopener">
            <span className="lbl">GitHub</span>
            <span>{D.brand.github}</span>
          </a>
          <div className="contact-line" style={{ borderBottom: 0 }}>
            <span className="lbl">{L(T("เวลาตอบ", "Reply time"), lang)}</span>
            <span><strong>{L(T("ภายใน 24 ชม.", "< 24 hours"), lang)}</strong></span>
          </div>
        </div>
      </div>
    </section>);

  }

  function Foot({ lang }) {
    return (
      <footer className="foot wrap">
      <span>© 2026 · Thanasin Yuntapun</span>
      <span>{L(T("วิศวกรรมเครื่องกล / Robotics · จุฬาฯ", "Mechanical Engineering / Robotics · Chulalongkorn"), lang)}</span>
      <span>{L(T("กรุงเทพมหานคร 🇹🇭", "Bangkok, Thailand 🇹🇭"), lang)}</span>
    </footer>);

  }

  Object.assign(window, { TopBar, Hero, Marquee, Work, Services, Capabilities, Contact, Foot, SectionHead, T });
})();