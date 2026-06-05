// apple-extras.jsx — extra Apple-style sections:
//   - <CountUp> number animator that runs once when it enters the viewport.
//   - <StatsTile>  big-number results panel.
//   - <ScrollStory> sticky scroll-jacked four-stage walkthrough of how
//                   the LINE-OA chatbot is built.

(function () {
  const { useEffect, useRef, useState } = React;

  /* ─── Count-up number ─────────────────────────────────────────────────── */
  // Counts from 0 to `to` over `duration` ms with ease-out cubic the first
  // time it scrolls into view. Renders `prefix`/`suffix` around the value.
  function CountUp({ to, prefix = '', suffix = '', duration = 1400 }) {
    const ref = useRef(null);
    const [val, setVal] = useState(0);

    useEffect(() => {
      const target = Number(to);
      if (!Number.isFinite(target)) { setVal(to); return; }
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) { setVal(target); return; }

      const io = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setVal(Math.round(eased * target));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, { threshold: 0.4 });

      if (ref.current) io.observe(ref.current);
      return () => io.disconnect();
    }, [to, duration]);

    return (
      <span ref={ref}>{prefix}{val}{suffix}</span>
    );
  }

  /* ─── Stats tile (big numbers row) ────────────────────────────────────── */
  function StatsTile({ lang }) {
    const t = (th, en) => lang === 'th' ? th : en;
    return (
      <section className="stats-tile reveal">
        <div className="stats-head">
          <p className="t-eyebrow" style={{ color: 'var(--c-cv)' }}>
            {t('ผลลัพธ์ที่วัดได้', 'Measured outcomes')}
          </p>
          <h2 className="t-headline" style={{ maxWidth: '20ch' }}>
            {t('ระบบที่ส่งมอบ — แล้วยังทำงานอยู่.', 'Systems that shipped — and stayed shipped.')}
          </h2>
          <p className="t-body" style={{ color: 'var(--ink-mute)', maxWidth: '50ch' }}>
            {t('ตัวเลขจาก production จริง วัด 4 สัปดาห์หลัง deploy. คลิกเพื่อดูเคสเต็มของแต่ละโปรเจกต์',
               'Pulled from real production, 4 weeks after each launch. Click any number to read the full case.')}
          </p>
        </div>
        <div className="stats-grid">
          <div className="stat">
            <div className="num"><CountUp to={62} prefix="−" suffix="%" /></div>
            <div className="lbl">{t('Workload ของแอดมิน', 'Admin workload reduced')}</div>
            <div className="delta">LINE OA · 4 ร้านสาขา</div>
          </div>
          <div className="stat">
            <div className="num"><CountUp to={94} suffix="%" /></div>
            <div className="lbl">{t('ความแม่นยำของ retrieval', 'Top-1 retrieval accuracy')}</div>
            <div className="delta">RAG · 1,200 หน้า</div>
          </div>
          <div className="stat">
            <div className="num"><CountUp to={96} suffix=".4%" duration={1700} /></div>
            <div className="lbl">{t('Recall บน CCTV จริง', 'LPR recall on live CCTV')}</div>
            <div className="delta">YOLOX · 8 fps · edge</div>
          </div>
          <div className="stat">
            <div className="num"><CountUp to={17} suffix="" duration={1100} /></div>
            <div className="lbl">{t('โปรเจกต์ที่ปล่อยแล้ว', 'Projects shipped to date')}</div>
            <div className="delta">2024 – 2026</div>
          </div>
        </div>
      </section>
    );
  }

  /* ─── Scroll story (sticky scroll-jacked four-stage section) ─────────── */
  function ScrollStory({ lang }) {
    const t = (th, en) => lang === 'th' ? th : en;
    const trackRef = useRef(null);
    const [stage, setStage] = useState(0);
    const [progress, setProgress] = useState(0);

    const stages = [
      {
        step: t('ขั้นที่ 01', 'Step 01'),
        title: t('เริ่มที่ปัญหา.', 'Start with the problem.'),
        titleEm: '',
        body: t(
          'พนักงานร้านอาหารเครือ 4 สาขา ตอบ LINE วันละ ~480 ข้อความ — 64% ซ้ำเดิม. งานนี้ไม่ใช่ AI แต่เป็นการอ่านลูกค้าให้ออก.',
          'Two staff handled ~480 LINE messages a day across four branches — 64% repeats. This isn\'t an AI problem, it\'s a listening problem.'
        ),
        viz: 'chat',
      },
      {
        step: t('ขั้นที่ 02', 'Step 02'),
        title: t('สถาปัตยกรรมที่', 'An architecture'),
        titleEm: t(' เรียบง่าย.', 'that earns trust.'),
        body: t(
          'Webhook → retriever → Claude → handoff classifier. สี่ส่วนเล็กๆ ที่ตรวจสอบได้ทีละจุด ไม่ใช่ AI กล่องดำ.',
          'Webhook → retriever → Claude → handoff classifier. Four small pieces — each one auditable on its own. Not a black box.'
        ),
        viz: 'arch',
      },
      {
        step: t('ขั้นที่ 03', 'Step 03'),
        title: t('ส่งต่อ', 'Hand off'),
        titleEm: t('ให้คนเมื่อจำเป็น.', 'the moment it matters.'),
        body: t(
          'ถ้า retrieval ต่ำ + intent = booking ขนาดใหญ่ → ส่งให้พนักงานทันที. คนสำคัญกว่าบอท.',
          'Low retrieval score + booking intent → instant human handoff. People matter more than the bot.'
        ),
        viz: 'handoff',
      },
      {
        step: t('ขั้นที่ 04', 'Step 04'),
        title: t('ปล่อยใช้งาน.', 'Then ship it.'),
        titleEm: t(' วัดผลจริง.', ''),
        body: t(
          '4 สัปดาห์หลังเปิดใช้: workload ลด 62%, booking ขนาดใหญ่ปิดได้เพิ่ม 18%, ลูกค้าคืนทุน 3 เดือน. ระบบยังรันอยู่จนวันนี้.',
          'Four weeks after launch: workload down 62%, large bookings up 18%, payback in three months. The system is still running today.'
        ),
        viz: 'stats',
      },
    ];

    useEffect(() => {
      const onScroll = () => {
        if (!trackRef.current) return;
        const r = trackRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = r.height - vh;
        const scrolled = Math.max(0, Math.min(total, -r.top));
        const p = total > 0 ? scrolled / total : 0;
        setProgress(p);

        // Divide the scroll into N buckets, one per stage. Use a slight head
        // start so the first stage shows immediately when the section pins.
        const n = stages.length;
        const idx = Math.max(0, Math.min(n - 1, Math.floor(p * n - 0.001)));
        setStage(idx);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, [stages.length]);

    return (
      <div className="scroll-story" ref={trackRef}>
        <div className="scroll-story-track">
          <div className="scroll-story-pin">
            <div className="scroll-story-head">
              <span className="eyebrow">{t('เคสจริง · LINE OA Chatbot', 'Case · LINE OA Chatbot')}</span>
              <span className="count">{String(stage + 1).padStart(2, '0')} / 04</span>
            </div>

            <div className="scroll-story-stages">
              {stages.map((s, i) => (
                <div key={i} className={`story-stage ${i === stage ? 'active' : ''}`}>
                  <div className="story-text">
                    <span className="step">{s.step}</span>
                    <h3>
                      {s.title}
                      {s.titleEm && <em>{s.titleEm}</em>}
                    </h3>
                    <p>{s.body}</p>
                  </div>
                  <div className="story-visual">
                    {s.viz === 'chat'    && <StoryViz_Chat lang={lang} />}
                    {s.viz === 'arch'    && <StoryViz_Arch lang={lang} />}
                    {s.viz === 'handoff' && <StoryViz_Handoff lang={lang} />}
                    {s.viz === 'stats'   && <StoryViz_Stats lang={lang} />}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="scroll-story-progress"
              style={{ '--p': `${Math.round(progress * 100)}%` }}
              aria-label="story progress"
            ></div>
          </div>
        </div>
      </div>
    );
  }

  /* Story-stage visuals (lean — these are about pacing, not detail) */
  function StoryViz_Chat({ lang }) {
    return (
      <div className="story-viz-chat">
        <div className="bubble them">{lang === 'th' ? 'มีโต๊ะวันเสาร์ 6 คนมั้ย?' : 'Table for 6 on Saturday?'}</div>
        <div className="bubble them">{lang === 'th' ? 'ส่งสลิปได้มั้ย' : 'Where do I send the slip?'}</div>
        <div className="bubble them">{lang === 'th' ? 'เปิดถึงกี่โมงครับ' : 'Open until what time?'}</div>
        <div className="bubble them">{lang === 'th' ? 'ขอเมนูใหม่ของเดือนนี้' : "Show me this month's menu"}</div>
        <div className="bubble them" style={{ opacity: .55 }}>
          {lang === 'th' ? '+ 476 ข้อความวันนี้' : '+ 476 messages today'}
        </div>
      </div>
    );
  }
  function StoryViz_Arch() {
    return (
      <div className="story-viz-arch">
        <div className="node"><span>LINE webhook</span><span className="tag">FastAPI</span></div>
        <div className="arrow"></div>
        <div className="node"><span>Retriever</span><span className="tag">ChromaDB</span></div>
        <div className="arrow"></div>
        <div className="node"><span>Claude reasoner</span><span className="tag">+ context</span></div>
        <div className="arrow"></div>
        <div className="node"><span>Handoff classifier</span><span className="tag">→ human</span></div>
      </div>
    );
  }
  function StoryViz_Handoff({ lang }) {
    return (
      <div className="story-viz-handoff">
        <div className="row no-match">
          <span>{lang === 'th' ? '"ราคาเมนูข้าวมันไก่"' : '"How much is chicken rice?"'}</span>
          <span className="pill">bot · 0.92</span>
        </div>
        <div className="row no-match">
          <span>{lang === 'th' ? '"เปิดถึงกี่โมง"' : '"Open until what time?"'}</span>
          <span className="pill">bot · 0.89</span>
        </div>
        <div className="row match">
          <span>{lang === 'th' ? '"จองโต๊ะ 30 คน วันเสาร์"' : '"Book a table for 30 on Saturday"'}</span>
          <span className="pill">→ human</span>
        </div>
        <div className="row no-match">
          <span>{lang === 'th' ? '"มีที่จอดรถมั้ย"' : '"Do you have parking?"'}</span>
          <span className="pill">bot · 0.94</span>
        </div>
      </div>
    );
  }
  function StoryViz_Stats({ lang }) {
    const t = (th, en) => lang === 'th' ? th : en;
    return (
      <div className="story-viz-stats">
        <div className="cell">
          <div className="num">−62%</div>
          <div className="lbl">{t('Workload ของแอดมิน', 'Admin workload')}</div>
        </div>
        <div className="cell">
          <div className="num">+18%</div>
          <div className="lbl">{t('Booking ขนาดใหญ่ที่ปิดได้', 'Large bookings closed')}</div>
        </div>
        <div className="cell">
          <div className="num">3 mo</div>
          <div className="lbl">{t('จุดคุ้มทุน', 'Payback period')}</div>
        </div>
        <div className="cell">
          <div className="num">0</div>
          <div className="lbl">{t('Booking ตกหล่น', 'Bookings missed')}</div>
        </div>
      </div>
    );
  }

  /* ─── Manifesto strip — opinionated typographic statement ─────────────── */
  function Manifesto({ lang }) {
    const t = (th, en) => lang === 'th' ? th : en;
    return (
      <section className="manifesto">
        <div className="manifesto-inner">
          <div className="manifesto-head">
            <span className="left">{t('แนวคิดในการทำงาน', 'How I work')} · § 01</span>
            <span>{t('ปรับปรุง 25 พ.ค. 2026', 'updated 25 May 2026')}</span>
          </div>
          <h2 className="manifesto-body">
            {t('ผมไม่สนใจ ', 'I don\'t care about ')}
            <em>{t('demo สวยๆ', 'pretty demos')}</em>
            {t('. ผมสนใจระบบที่ ', '. I care about systems that ')}
            <em>{t('ยังรันอยู่ ', 'still run ')}</em>
            {t('หลังผมส่งมอบไปแล้ว 6 เดือน.', '6 months after I hand them over.')}
          </h2>
          <div className="manifesto-meta">
            <div className="row">
              <span className="k">01 · {t('หลักการ', 'Principle')}</span>
              <span className="v">{t('ปล่อยของให้เร็ว ', 'Ship early, ')}<em>{t('แล้วเรียนรู้จากของจริง', 'learn from production')}</em></span>
            </div>
            <div className="row">
              <span className="k">02 · {t('สโคป', 'Scope')}</span>
              <span className="v">{t('ทำน้อยลง ', 'Do less, ')}<em>{t('แต่ทำให้สุด', 'finish completely')}</em></span>
            </div>
            <div className="row">
              <span className="k">03 · {t('ความเชื่อใจ', 'Trust')}</span>
              <span className="v">{t('ตัวเลขจริง ', 'Real metrics, ')}<em>{t('ไม่ใช่คำพูดสวย', 'not nice words')}</em></span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ─── Build-log ticker — "what I'm working on right now" ───────────────── */
  function BuildLog({ lang }) {
    const t = (th, en) => lang === 'th' ? th : en;
    const entries = [
      { ago: 'now',     hash: '7f3a',  msg: t('LINE OA · ปรับ retriever ลด latency p95 ลง 180ms', 'LINE OA · retriever tune, p95 −180ms'),    tag: 'chatbot' },
      { ago: '2h',      hash: 'a91b',  msg: t('LPR · เทรน Thai OCR เพิ่มอีก 12k frames', 'LPR · retrained Thai OCR on +12k frames'),         tag: 'vision'  },
      { ago: 'yesterday', hash: '0e44', msg: t('iOS app · ส่งบิลด์ TestFlight #218 (all green ✓)', 'iOS app · TestFlight build #218 shipped (all green ✓)'), tag: 'mobile'  },
      { ago: '3d',      hash: '38c9',  msg: t('RAG · เพิ่ม reranker — recall เพิ่ม 7 จุด', 'RAG · added reranker — recall +7pp'),               tag: 'rag'     },
      { ago: '5d',      hash: 'd221',  msg: t('Robot · ตั้งค่า PID ใหม่ — settling time ลด 41%', 'Robot · re-tuned PID — settling −41%'),     tag: 'robotics' },
    ];
    return (
      <section className="build-log">
        <div className="build-log-head">
          <span className="live">{t('กำลังบิลด์', 'live')}</span>
          <span>{t('บันทึกการทำงานล่าสุด', 'build log')}</span>
          <span className="spacer"></span>
          <span>{t('เวลาไทย', 'asia/bangkok')}</span>
        </div>
        <div className="build-log-body">
          {entries.map((e, i) => (
            <div key={i} className="build-log-row">
              <span className="ts">
                <span className="ago">{e.ago === 'now' ? '— now' : `— ${e.ago}`}</span>
                <span className="hash">{e.hash}</span>
              </span>
              <span className="msg">{e.msg}</span>
              <span className="tag">{e.tag}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  Object.assign(window, { CountUp, StatsTile, ScrollStory, Manifesto, BuildLog });
})();
