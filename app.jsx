// Main app — wires Tweaks + state for style / mode / language / case study.
// Wrapped in IIFE; pulls components from window.

(function () {
  const { useState, useEffect } = React;
  const {
    TopBar, Hero, Marquee, Work, Services, Capabilities, Contact, Foot,
    CaseStudy,
    useTweaks, TweaksPanel, TweakSection, TweakSelect, TweakRadio, TweakButton,
  } = window;

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "style": "atelier",
    "mode": "light",
    "lang": "th"
  }/*EDITMODE-END*/;

  function App() {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const [caseOpen, setCaseOpen] = useState(false);

    // Apply style + mode + lang to <html>
    useEffect(() => {
      const root = document.documentElement;
      root.setAttribute("data-style", t.style);
      root.setAttribute("data-mode", t.mode);
      root.setAttribute("lang", t.lang);
    }, [t.style, t.mode, t.lang]);

    return (
      <div className="app">
        <TopBar
          lang={t.lang}
          setLang={(v) => setTweak("lang", v)}
          mode={t.mode}
          setMode={(v) => setTweak("mode", v)}
        />

        <Hero lang={t.lang} />
        <Marquee lang={t.lang} />
        <Work lang={t.lang} onOpenCase={() => setCaseOpen(true)} />
        <Services lang={t.lang} />
        <Capabilities lang={t.lang} />
        <Contact lang={t.lang} />
        <Foot lang={t.lang} />

        {caseOpen && <CaseStudy lang={t.lang} onClose={() => setCaseOpen(false)} />}

        <TweaksPanel title="Tweaks">
          <TweakSection label="Visual direction" />
          <TweakSelect
            label="Style"
            value={t.style}
            options={[
              { value: "atelier",  label: "Atelier — warm editorial" },
              { value: "specimen", label: "Specimen — riso print" },
              { value: "wired",    label: "Wired — blueprint" },
            ]}
            onChange={(v) => setTweak("style", v)}
          />
          <TweakRadio
            label="Mode"
            value={t.mode}
            options={["light", "dark"]}
            onChange={(v) => setTweak("mode", v)}
          />
          <TweakSection label="Language" />
          <TweakRadio
            label="Lang"
            value={t.lang}
            options={["th", "en"]}
            onChange={(v) => setTweak("lang", v)}
          />
          <TweakSection label="Try" />
          <TweakButton label="Open feature case study →" onClick={() => setCaseOpen(true)} />
        </TweaksPanel>
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
