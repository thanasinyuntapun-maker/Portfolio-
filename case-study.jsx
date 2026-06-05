// Case-study modal — the deep dive into one project.
// Depends on: L, MD, FullArch (from components.jsx). Wrapped in IIFE.

(function () {
  const { useEffect } = React;
  const { L, MD, FullArch } = window;
  function T(th, en) { return { th, en }; }

  function CaseStudy({ lang, onClose }) {
  const D = window.PORTFOLIO;
  const cs = D.caseStudy;

  // Lock scroll while open + esc to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div className="cs-overlay" onClick={onClose}>
      <article className="cs" onClick={(e) => e.stopPropagation()}>
        <header className="cs-hd">
          <span className="crumb">{L(cs.crumb, lang)}</span>
          <button className="cs-close" onClick={onClose} aria-label="Close case study">✕</button>
        </header>

        <div className="cs-cover">
          <h2 className="cs-title">
            {L(cs.title, lang)} <em>{L(cs.titleEm, lang)}</em>
          </h2>
          <p className="cs-sub">{L(cs.sub, lang)}</p>
          <div className="cs-meta">
            {cs.meta.map((m, i) => (
              <div key={i}>
                <div className="k">{L(m.k, lang)}</div>
                <div className="v">{L(m.v, lang)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cs-body">
          {cs.sections.map((sec) => (
            <section className="cs-sec" key={sec.n}>
              <header className="cs-sec-h">
                <span className="n">— {sec.n}</span>
                <h3>{L(sec.h, lang)}</h3>
              </header>

              {sec.body && sec.body.map((b, i) => (
                <p className="cs-p" key={i}><MD text={L(b, lang)} /></p>
              ))}

              {sec.archDiagram && (
                <div className="arch">
                  <FullArch />
                  <div className="arch-cap">
                    <span>FIG. 01 · {L(T("สถาปัตยกรรมระบบ","System architecture"), lang)}</span>
                    <span>v1.4 · 2025</span>
                  </div>
                </div>
              )}

              {sec.callout && (
                <blockquote className="cs-callout">{L(sec.callout, lang)}</blockquote>
              )}

              {sec.bullets && (
                <div className="cs-bullets">
                  {sec.bullets.map((b) => (
                    <div className="cs-bullet" key={b.n}>
                      <span className="n">— {b.n}</span>
                      <span className="t">{L(b.t, lang)}</span>
                      <span className="d">{L(b.d, lang)}</span>
                    </div>
                  ))}
                </div>
              )}

              {sec.stats && (
                <div className="cs-stats">
                  {sec.stats.map((s, i) => (
                    <div className="cs-stat" key={i}>
                      <div className="num">{s.num}</div>
                      <div className="lbl">{L(s.lbl, lang)}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          <footer style={{ paddingTop: 32, borderTop: "1px solid var(--rule)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div style={{ fontFamily: "var(--f-serif)", fontSize: 22, fontStyle: "italic", maxWidth: "50ch" }}>
              {L(T("สนใจระบบแบบนี้สำหรับธุรกิจของคุณ?","Want something like this for your business?"), lang)}
            </div>
            <a className="btn accent" href={`mailto:${D.brand.email}`} onClick={onClose}>
              {L(T("เริ่มคุยทาง Email","Start a conversation"), lang)} →
            </a>
          </footer>
        </div>
      </article>
    </div>
  );
}

Object.assign(window, { CaseStudy });
})();
