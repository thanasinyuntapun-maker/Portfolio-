// apple-app.jsx — main composition for the Apple-style portfolio page.

(function () {
  const { useEffect, useRef, useState } = React;
  const {
    TopNav, HeroTile,
    ChatbotTile, VisionTile, MobileTile, RobotTile,
    DocsTile, ClassroomTile, SimTile, CadTile,
    CapStrip, ServicesStrip, ContactTile, FootApple,
    StatsTile, ScrollStory, Manifesto, BuildLog,
    useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle,
  } = window;

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "mode": "light",
    "lang": "th",
    "accent": "#0066cc",
    "heroGlyph": "AI."
  }/*EDITMODE-END*/;

  function useReveal() {
    useEffect(() => {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

      document.querySelectorAll('.tile, .cap-strip, .svc-strip, .stats-tile').forEach((el) => {
        el.classList.add('reveal');
        io.observe(el);
      });
      return () => io.disconnect();
    }, []);
  }

  // Apple-style parallax: bg images drift up + zoom slightly as the tile passes;
  // tile visuals (CSS mockups) drift up subtly too.
  function useParallax() {
    useEffect(() => {
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      const bgs = [];
      const visuals = [];

      const collect = () => {
        bgs.length = 0; visuals.length = 0;
        document.querySelectorAll('[data-parallax="bg"]').forEach(img => {
          bgs.push({ img, tile: img.closest('.tile') });
        });
        document.querySelectorAll('[data-parallax="visual"]').forEach(v => {
          visuals.push({ el: v, tile: v.closest('.tile') });
        });
      };

      let raf = null;
      const update = () => {
        raf = null;
        const vh = window.innerHeight;

        for (const { img, tile } of bgs) {
          if (!tile) continue;
          const r = tile.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) continue;
          const center = r.top + r.height / 2;
          const progress = (center - vh / 2) / (vh / 2 + r.height / 2);
          // clamp -1..1
          const p = Math.max(-1, Math.min(1, progress));
          const ty = p * 40;            // drift up to 40px
          const scale = 1.08 - Math.abs(p) * 0.02;
          img.style.transform = `translate3d(0, ${ty}px, 0) scale(${scale})`;
        }

        for (const { el, tile } of visuals) {
          if (!tile) continue;
          const r = tile.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) continue;
          const center = r.top + r.height / 2;
          const progress = (center - vh / 2) / (vh / 2 + r.height / 2);
          const p = Math.max(-1, Math.min(1, progress));
          el.style.transform = `translate3d(0, ${p * -22}px, 0)`;
        }
      };

      const onScroll = () => {
        if (!raf) raf = requestAnimationFrame(update);
      };

      // Nav scrolled state
      const nav = document.querySelector('.gnav');
      const onScrollNav = () => {
        if (!nav) return;
        if (window.scrollY > 16) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      };
      const onAny = () => { onScroll(); onScrollNav(); };

      collect();
      update();
      onScrollNav();
      window.addEventListener('scroll', onAny, { passive: true });
      window.addEventListener('resize', () => { collect(); update(); }, { passive: true });

      // Re-collect once images & React have settled
      const t1 = setTimeout(() => { collect(); update(); }, 500);
      const t2 = setTimeout(() => { collect(); update(); }, 1500);

      return () => {
        window.removeEventListener('scroll', onAny);
        clearTimeout(t1); clearTimeout(t2);
      };
    }, []);
  }

  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

    useEffect(() => {
      const root = document.documentElement;
      root.setAttribute('data-mode', t.mode);
      root.setAttribute('lang', t.lang);
      root.style.setProperty('--link', t.accent);
    }, [t.mode, t.lang, t.accent]);

    useReveal();
    useParallax();

    const lang = t.lang;

    return (
      <div id="top">
        <TopNav
          lang={lang}
          setLang={(v) => setTweak('lang', v)}
          mode={t.mode}
          setMode={(v) => setTweak('mode', v)}
        />

        <main className="tile-stack">
          {/* HERO */}
          <div className="tile-row single">
            <HeroTile lang={lang} />
          </div>

          {/* Manifesto — personal voice between hero and product */}
        </main>

        <Manifesto lang={lang} />
        <div style={{ height: 12 }}></div>

        <main className="tile-stack" style={{ paddingTop: 0 }}>
          {/* Feature: LINE OA chatbot — full-width dark */}
          <div className="tile-row single">
            <ChatbotTile lang={lang} />
          </div>

          {/* Deep-dive: sticky scroll-jacked story of how the chatbot is built */}
          <div className="tile-row single">
            <ScrollStory lang={lang} />
          </div>

          {/* 2-up: Vision + iOS */}
          <div className="tile-row">
            <VisionTile lang={lang} />
            <MobileTile lang={lang} />
          </div>

          {/* 2-up: Robot + RAG docs */}
          <div className="tile-row">
            <RobotTile lang={lang} />
            <DocsTile lang={lang} />
          </div>

          {/* Feature: Simulink — full-width blue */}
          <div className="tile-row single">
            <SimTile lang={lang} />
          </div>

          {/* 2-up: Classroom + CAD */}
          <div className="tile-row">
            <ClassroomTile lang={lang} />
            <CadTile lang={lang} />
          </div>
        </main>

        {/* Results — big-number summary */}
        <StatsTile lang={lang} />
        <div style={{ height: 12 }}></div>

        {/* Build-log ticker — personality detail */}
        <BuildLog lang={lang} />
        <div style={{ height: 12 }}></div>

        <CapStrip lang={lang} />
        <div style={{ height: 12 }}></div>
        <ServicesStrip lang={lang} />
        <div style={{ height: 12 }}></div>

        <main className="tile-stack" style={{ paddingTop: 0 }}>
          <div className="tile-row single">
            <ContactTile lang={lang} />
          </div>
        </main>

        <FootApple lang={lang} />

        <TweaksPanel title="Tweaks">
          <TweakSection label="Appearance" />
          <TweakRadio
            label="Mode"
            value={t.mode}
            options={['light', 'dark']}
            onChange={(v) => setTweak('mode', v)}
          />
          <TweakRadio
            label="Language"
            value={t.lang}
            options={['th', 'en']}
            onChange={(v) => setTweak('lang', v)}
          />
          <TweakSection label="Accent" />
          <TweakColor
            label="Link color"
            value={t.accent}
            options={['#0066cc', '#007aff', '#34c759', '#af52de', '#ff9500', '#ff3b30']}
            onChange={(v) => setTweak('accent', v)}
          />
        </TweaksPanel>
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
