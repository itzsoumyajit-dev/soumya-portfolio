import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/App.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=fe1bff5b"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("C:/Users/itzso/soumya-portfolio/src/App.jsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$(), _s2 = $RefreshSig$(), _s3 = $RefreshSig$();
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=fe1bff5b"; const useEffect = __vite__cjsImport3_react["useEffect"]; const useRef = __vite__cjsImport3_react["useRef"]; const useState = __vite__cjsImport3_react["useState"]; const useCallback = __vite__cjsImport3_react["useCallback"];
import Lenis from "/node_modules/.vite/deps/lenis.js?v=fe1bff5b";
import { MotionConfig } from "/node_modules/.vite/deps/framer-motion.js?v=fe1bff5b";
import StringTune, { StringInview, StringLazy } from "/node_modules/.vite/deps/@fiddle-digital_string-tune.js?v=fe1bff5b";
import { useGitHub } from "/src/hooks/useGitHub.js";
import { useTheme } from "/src/hooks/useTheme.js";
import Navbar from "/src/components/Navbar.jsx";
import Hero from "/src/components/Hero.jsx";
import About from "/src/components/About.jsx";
import GitHubStats from "/src/components/GitHubStats.jsx";
import RepoGrid from "/src/components/RepoGrid.jsx";
import LanguageChart from "/src/components/LanguageChart.jsx";
import Contact from "/src/components/Contact.jsx";
import Certificates from "/src/components/Certificates.tsx";
import CreativeGallery from "/src/components/CreativeGallery.jsx";
import Footer from "/src/components/Footer.jsx";
import ParticleBackground from "/src/components/ParticleBackground.jsx";
import ScrollReveal from "/src/components/ScrollReveal.jsx";
import LiquidBackground from "/src/components/LiquidBackground.jsx";
function MagneticCursor() {
  _s();
  const dot = useRef(null);
  const ring = useRef(null);
  const trailCanvas = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const trailPoints = useRef([]);
  const isHovering = useRef(false);
  const isClicking = useRef(false);
  useEffect(() => {
    const canvas = trailCanvas.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    let raf;
    const TRAIL_LENGTH = 22;
    const TRAIL_COLORS = [
      "rgba(56,189,248,",
      // sky
      "rgba(167,139,250,",
      // violet
      "rgba(244,114,182,",
      // pink
      "rgba(52,211,153,"
      // emerald
    ];
    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", onResize);
    const move = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      trailPoints.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        size: Math.random() * 3 + 1.5,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5,
        color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)]
      });
      if (trailPoints.current.length > 80) trailPoints.current.shift();
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX - 5}px,${e.clientY - 5}px)`;
      }
    };
    const onMouseDown = () => {
      isClicking.current = true;
      if (ring.current) {
        ring.current.style.width = "22px";
        ring.current.style.height = "22px";
        ring.current.style.borderColor = "rgba(56,189,248,0.8)";
        ring.current.style.borderWidth = "2.5px";
      }
      if (dot.current) {
        dot.current.style.transform = `translate(${mouseRef.current.x - 5}px,${mouseRef.current.y - 5}px) scale(0.6)`;
      }
      for (let i = 0; i < 8; i++) {
        const angle = Math.PI * 2 * i / 8;
        trailPoints.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          life: 1,
          size: Math.random() * 4 + 2,
          vx: Math.cos(angle) * (2 + Math.random() * 2),
          vy: Math.sin(angle) * (2 + Math.random() * 2),
          color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)]
        });
      }
    };
    const onMouseUp = () => {
      isClicking.current = false;
      if (ring.current) {
        ring.current.style.width = isHovering.current ? "52px" : "34px";
        ring.current.style.height = isHovering.current ? "52px" : "34px";
        ring.current.style.borderColor = isHovering.current ? "rgba(56,189,248,0.65)" : "rgba(56,189,248,0.4)";
        ring.current.style.borderWidth = "1.5px";
      }
      if (dot.current) {
        dot.current.style.transform = `translate(${mouseRef.current.x - 5}px,${mouseRef.current.y - 5}px) scale(1)`;
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    const grow = () => {
      isHovering.current = true;
      if (ring.current && !isClicking.current) {
        ring.current.style.width = "52px";
        ring.current.style.height = "52px";
        ring.current.style.borderColor = "rgba(56,189,248,0.65)";
      }
      if (dot.current) {
        dot.current.style.background = "var(--c2)";
        dot.current.style.boxShadow = "0 0 12px rgba(167,139,250,0.6)";
      }
    };
    const shrink = () => {
      isHovering.current = false;
      if (ring.current && !isClicking.current) {
        ring.current.style.width = "34px";
        ring.current.style.height = "34px";
        ring.current.style.borderColor = "rgba(56,189,248,0.4)";
      }
      if (dot.current) {
        dot.current.style.background = "var(--c1)";
        dot.current.style.boxShadow = "none";
      }
    };
    const interactiveEls = document.querySelectorAll('a,button,[role="button"],.lg-hover,.glow-border');
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
    const animate = () => {
      const m = mouseRef.current;
      m.rx += (m.x - m.rx) * 0.1;
      m.ry += (m.y - m.ry) * 0.1;
      if (ring.current) {
        const ringW = parseFloat(ring.current.style.width || 34);
        ring.current.style.transform = `translate(${m.rx - ringW / 2}px,${m.ry - ringW / 2}px)`;
      }
      ctx.clearRect(0, 0, W, H);
      const points = trailPoints.current;
      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02;
        p.vx *= 0.98;
        p.life -= 0.025;
        if (p.life <= 0) {
          points.splice(i, 1);
          continue;
        }
        const alpha = p.life * 0.6;
        ctx.save();
        ctx.globalAlpha = alpha * 0.4;
        ctx.fillStyle = `${p.color}1)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `${p.color}1)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(
      "canvas",
      {
        ref: trailCanvas,
        style: {
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 9997,
          pointerEvents: "none"
        }
      },
      void 0,
      false,
      {
        fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
        lineNumber: 233,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { id: "cursor", ref: dot }, void 0, false, {
      fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
      lineNumber: 240,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { id: "cursor-ring", ref: ring }, void 0, false, {
      fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
      lineNumber: 241,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
    lineNumber: 232,
    columnNumber: 5
  }, this);
}
_s(MagneticCursor, "RrrT0Mk5f75F2/NDmljiLB4/OOA=");
_c = MagneticCursor;
function LoadingScreen({ isLoaded, onDone }) {
  _s2();
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => {
      setProgress((p) => {
        if (isLoaded) return Math.min(p + 8, 100);
        return Math.min(p + Math.random() * 3.5, 88);
      });
    }, 60);
    return () => clearInterval(iv);
  }, [isLoaded]);
  useEffect(() => {
    if (progress >= 100 && phase === 0) {
      setPhase(1);
      setTimeout(onDone, 1200);
    }
  }, [progress, phase, onDone]);
  return /* @__PURE__ */ jsxDEV("div", { ref, style: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--bg)",
    gap: "2.5rem",
    opacity: phase === 1 ? 0 : 1,
    transform: phase === 1 ? "scale(1.08)" : "scale(1)",
    transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
    pointerEvents: phase === 1 ? "none" : "auto"
  }, children: [
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      inset: 0,
      opacity: 0.04,
      backgroundImage: "linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)",
      backgroundSize: "80px 80px"
    } }, void 0, false, {
      fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
      lineNumber: 285,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      top: "20%",
      left: "25%",
      width: 200,
      height: 200,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(56,189,248,0.08), transparent 70%)",
      animation: "drift 18s ease-in-out infinite alternate",
      filter: "blur(40px)"
    } }, void 0, false, {
      fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
      lineNumber: 292,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      bottom: "20%",
      right: "20%",
      width: 260,
      height: 260,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(167,139,250,0.08), transparent 70%)",
      animation: "drift 22s ease-in-out infinite alternate-reverse",
      filter: "blur(50px)"
    } }, void 0, false, {
      fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
      lineNumber: 295,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { style: {
      width: 80,
      height: 80,
      borderRadius: "22px",
      position: "relative",
      background: "linear-gradient(135deg,rgba(56,189,248,0.12),rgba(167,139,250,0.12))",
      border: "1px solid rgba(56,189,248,0.25)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2.2rem",
      animation: "float 3s ease-in-out infinite, pulse-glow 2.5s ease infinite",
      boxShadow: "0 20px 60px rgba(56,189,248,0.15)"
    }, children: [
      "⚡",
      /* @__PURE__ */ jsxDEV("div", { style: {
        position: "absolute",
        inset: "-8px",
        borderRadius: "26px",
        border: "1px dashed rgba(56,189,248,0.25)",
        animation: "spin-slow 12s linear infinite"
      } }, void 0, false, {
        fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
        lineNumber: 311,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
      lineNumber: 300,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { style: { textAlign: "center", position: "relative" }, children: [
      /* @__PURE__ */ jsxDEV("p", { style: {
        fontFamily: "var(--font-mono)",
        color: "var(--c1)",
        fontSize: "0.72rem",
        letterSpacing: "0.22em",
        marginBottom: "0.6rem",
        textTransform: "uppercase",
        animation: "fadeUp 0.8s 0.2s both"
      }, children: "INITIALIZING PORTFOLIO" }, void 0, false, {
        fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
        lineNumber: 320,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { style: {
        fontFamily: "var(--font-mono)",
        color: "var(--muted)",
        fontSize: "0.65rem",
        letterSpacing: "0.08em",
        animation: "fadeUp 0.8s 0.4s both"
      }, children: "Fetching data from GitHub API..." }, void 0, false, {
        fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
        lineNumber: 325,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
      lineNumber: 319,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { style: {
      width: "280px",
      position: "relative",
      animation: "fadeUp 0.8s 0.5s both"
    }, children: [
      /* @__PURE__ */ jsxDEV("div", { style: {
        width: "100%",
        height: "3px",
        background: "rgba(255,255,255,0.06)",
        borderRadius: "100px",
        overflow: "hidden"
      }, children: /* @__PURE__ */ jsxDEV("div", { style: {
        height: "100%",
        borderRadius: "100px",
        background: "linear-gradient(90deg,var(--c1),var(--c2),var(--c3))",
        backgroundSize: "200% auto",
        width: `${progress}%`,
        transition: "width 0.15s ease-out",
        animation: "shimmer 2s linear infinite"
      } }, void 0, false, {
        fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
        lineNumber: 341,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
        lineNumber: 337,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "0.5rem"
      }, children: [
        /* @__PURE__ */ jsxDEV("span", { style: {
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          color: "var(--muted)",
          letterSpacing: "0.05em"
        }, children: progress < 30 ? "Connecting..." : progress < 70 ? "Loading repos..." : progress < 95 ? "Building UI..." : "Ready!" }, void 0, false, {
          fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
          lineNumber: 353,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { style: {
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          color: "var(--c1)",
          letterSpacing: "0.05em",
          fontWeight: 600
        }, children: [
          Math.round(progress),
          "%"
        ] }, void 0, true, {
          fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
          lineNumber: 357,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
        lineNumber: 350,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
      lineNumber: 333,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
    lineNumber: 274,
    columnNumber: 5
  }, this);
}
_s2(LoadingScreen, "NFInT57IkQTdgmSTG4cxy4J9dIU=");
_c2 = LoadingScreen;
function ErrorScreen({ error }) {
  return /* @__PURE__ */ jsxDEV("div", { style: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--bg)",
    gap: "1.5rem",
    padding: "2rem",
    textAlign: "center"
  }, children: [
    /* @__PURE__ */ jsxDEV("div", { style: { fontSize: "3rem" }, children: "⚠️" }, void 0, false, {
      fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
      lineNumber: 372,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("h2", { style: { color: "var(--c3)", fontFamily: "var(--font-mono)", marginBottom: "0.75rem", fontSize: "1rem" }, children: "Failed to load GitHub data" }, void 0, false, {
        fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
        lineNumber: 374,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { style: { color: "var(--muted)", fontFamily: "var(--font-mono)", fontSize: "0.8rem", marginBottom: "0.5rem" }, children: error }, void 0, false, {
        fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
        lineNumber: 377,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { style: { color: "var(--muted)", fontSize: "0.75rem", fontFamily: "var(--font-mono)", opacity: 0.6 }, children: "Make sure VITE_GITHUB_USERNAME is set in your .env file" }, void 0, false, {
        fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
        lineNumber: 378,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
      lineNumber: 373,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
    lineNumber: 369,
    columnNumber: 5
  }, this);
}
_c3 = ErrorScreen;
export default function App() {
  _s3();
  const { profile, repos, languages, loading, error } = useGitHub();
  const { theme, toggle } = useTheme();
  const [showLoading, setShowLoading] = useState(true);
  const handleLoadingDone = useCallback(() => setShowLoading(false), []);
  useEffect(() => {
    if (showLoading || loading) return;
    const lenis = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    const stringTune = StringTune.getInstance();
    stringTune.use(StringInview);
    stringTune.use(StringLazy);
    stringTune.start();
    return () => lenis.destroy();
  }, [showLoading, loading]);
  if (error) return /* @__PURE__ */ jsxDEV(ErrorScreen, { error }, void 0, false, {
    fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
    lineNumber: 415,
    columnNumber: 21
  }, this);
  return /* @__PURE__ */ jsxDEV(MotionConfig, { reducedMotion: "user", children: [
    showLoading && /* @__PURE__ */ jsxDEV(LoadingScreen, { isLoaded: !loading, onDone: handleLoadingDone }, void 0, false, {
      fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
      lineNumber: 420,
      columnNumber: 7
    }, this),
    !loading && /* @__PURE__ */ jsxDEV("div", { style: {
      opacity: showLoading ? 0 : 1,
      transition: "opacity 0.8s 0.2s ease"
    }, children: [
      /* @__PURE__ */ jsxDEV(MagneticCursor, {}, void 0, false, {
        fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
        lineNumber: 428,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(ParticleBackground, { theme }, void 0, false, {
        fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
        lineNumber: 429,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(LiquidBackground, {}, void 0, false, {
        fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
        lineNumber: 431,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(Navbar, { theme, toggleTheme: toggle }, void 0, false, {
        fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
        lineNumber: 433,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("main", { children: [
        /* @__PURE__ */ jsxDEV(ScrollReveal, { direction: "up", duration: 0.9, distance: 50, children: /* @__PURE__ */ jsxDEV(Hero, { profile }, void 0, false, {
          fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
          lineNumber: 437,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
          lineNumber: 436,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(ScrollReveal, { direction: "up", delay: 0.1, duration: 0.8, distance: 45, children: /* @__PURE__ */ jsxDEV(About, { profile }, void 0, false, {
          fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
          lineNumber: 441,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
          lineNumber: 440,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(ScrollReveal, { direction: "up", delay: 0.05, duration: 0.8, distance: 40, children: /* @__PURE__ */ jsxDEV(GitHubStats, { profile, repos }, void 0, false, {
          fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
          lineNumber: 445,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
          lineNumber: 444,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(ScrollReveal, { direction: "up", delay: 0.05, duration: 0.8, distance: 40, children: /* @__PURE__ */ jsxDEV(RepoGrid, { repos }, void 0, false, {
          fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
          lineNumber: 449,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
          lineNumber: 448,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(ScrollReveal, { direction: "left", delay: 0.1, duration: 0.9, distance: 50, children: /* @__PURE__ */ jsxDEV(LanguageChart, { languages }, void 0, false, {
          fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
          lineNumber: 453,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
          lineNumber: 452,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(CreativeGallery, {}, void 0, false, {
          fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
          lineNumber: 456,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(ScrollReveal, { direction: "up", delay: 0.1, duration: 0.9, distance: 45, children: /* @__PURE__ */ jsxDEV(Certificates, {}, void 0, false, {
          fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
          lineNumber: 459,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
          lineNumber: 458,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(ScrollReveal, { direction: "up", delay: 0.1, duration: 0.9, distance: 45, children: /* @__PURE__ */ jsxDEV(Contact, { profile }, void 0, false, {
          fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
          lineNumber: 463,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
          lineNumber: 462,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
        lineNumber: 435,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(ScrollReveal, { direction: "up", delay: 0.1, duration: 0.6, distance: 25, children: /* @__PURE__ */ jsxDEV(Footer, { theme }, void 0, false, {
        fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
        lineNumber: 468,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
        lineNumber: 467,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
      lineNumber: 424,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "C:/Users/itzso/soumya-portfolio/src/App.jsx",
    lineNumber: 418,
    columnNumber: 5
  }, this);
}
_s3(App, "XHxJo28Lu4jh4GLeeVR5mIQvY/k=", false, function() {
  return [useGitHub, useTheme];
});
_c4 = App;
var _c, _c2, _c3, _c4;
$RefreshReg$(_c, "MagneticCursor");
$RefreshReg$(_c2, "LoadingScreen");
$RefreshReg$(_c3, "ErrorScreen");
$RefreshReg$(_c4, "App");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/itzso/soumya-portfolio/src/App.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("C:/Users/itzso/soumya-portfolio/src/App.jsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,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b0MsS0FEdEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsUUFFQSx1QkFBQyxxQkFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQWdCO0FBQUEsUUFFaEIsdUJBQUMsZ0JBQWEsV0FBVSxNQUFLLE9BQU8sS0FBSyxVQUFVLEtBQUssVUFBVSxJQUNoRSxpQ0FBQyxrQkFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQWEsS0FEZjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxRQUVBLHVCQUFDLGdCQUFhLFdBQVUsTUFBSyxPQUFPLEtBQUssVUFBVSxLQUFLLFVBQVUsSUFDaEUsaUNBQUMsV0FBUSxXQUFUO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBMEIsS0FENUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsV0E3QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQThCQTtBQUFBLE1BRUEsdUJBQUMsZ0JBQWEsV0FBVSxNQUFLLE9BQU8sS0FBSyxVQUFVLEtBQUssVUFBVSxJQUNoRSxpQ0FBQyxVQUFPLFNBQVI7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFxQixLQUR2QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBRUE7QUFBQSxTQTdDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBOENBO0FBQUEsT0FwREo7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXNEQTtBQUVKO0FBQUNOLElBeEZ1QkQsS0FBRztBQUFBLFVBQzZCcEosV0FDNUJDLFFBQVE7QUFBQTtBQUFBLE1BRlptSjtBQUFHLElBQUFzQixJQUFBQyxLQUFBeEIsS0FBQXlCO0FBQUEsYUFBQUYsSUFBQTtBQUFBLGFBQUFDLEtBQUE7QUFBQSxhQUFBeEIsS0FBQTtBQUFBLGFBQUF5QixLQUFBIiwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlUmVmIiwidXNlU3RhdGUiLCJ1c2VDYWxsYmFjayIsIkxlbmlzIiwiTW90aW9uQ29uZmlnIiwiU3RyaW5nVHVuZSIsIlN0cmluZ0ludmlldyIsIlN0cmluZ0xhenkiLCJ1c2VHaXRIdWIiLCJ1c2VUaGVtZSIsIk5hdmJhciIsIkhlcm8iLCJBYm91dCIsIkdpdEh1YlN0YXRzIiwiUmVwb0dyaWQiLCJMYW5ndWFnZUNoYXJ0IiwiQ29udGFjdCIsIkNlcnRpZmljYXRlcyIsIkNyZWF0aXZlR2FsbGVyeSIsIkZvb3RlciIsIlBhcnRpY2xlQmFja2dyb3VuZCIsIlNjcm9sbFJldmVhbCIsIkxpcXVpZEJhY2tncm91bmQiLCJNYWduZXRpY0N1cnNvciIsIl9zIiwiZG90IiwicmluZyIsInRyYWlsQ2FudmFzIiwibW91c2VSZWYiLCJ4IiwieSIsInJ4IiwicnkiLCJ0cmFpbFBvaW50cyIsImlzSG92ZXJpbmciLCJpc0NsaWNraW5nIiwiY2FudmFzIiwiY3VycmVudCIsImN0eCIsImdldENvbnRleHQiLCJXIiwid2luZG93IiwiaW5uZXJXaWR0aCIsIkgiLCJpbm5lckhlaWdodCIsIndpZHRoIiwiaGVpZ2h0IiwicmFmIiwiVFJBSUxfTEVOR1RIIiwiVFJBSUxfQ09MT1JTIiwib25SZXNpemUiLCJhZGRFdmVudExpc3RlbmVyIiwibW92ZSIsImUiLCJjbGllbnRYIiwiY2xpZW50WSIsInB1c2giLCJsaWZlIiwic2l6ZSIsIk1hdGgiLCJyYW5kb20iLCJ2eCIsInZ5IiwiY29sb3IiLCJmbG9vciIsImxlbmd0aCIsInNoaWZ0Iiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJvbk1vdXNlRG93biIsImJvcmRlckNvbG9yIiwiYm9yZGVyV2lkdGgiLCJpIiwiYW5nbGUiLCJQSSIsImNvcyIsInNpbiIsIm9uTW91c2VVcCIsImdyb3ciLCJiYWNrZ3JvdW5kIiwiYm94U2hhZG93Iiwic2hyaW5rIiwiaW50ZXJhY3RpdmVFbHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiZWwiLCJhbmltYXRlIiwibSIsInJpbmdXIiwicGFyc2VGbG9hdCIsImNsZWFyUmVjdCIsInBvaW50cyIsInAiLCJzcGxpY2UiLCJhbHBoYSIsInNhdmUiLCJnbG9iYWxBbHBoYSIsImZpbGxTdHlsZSIsImJlZ2luUGF0aCIsImFyYyIsImZpbGwiLCJyZXN0b3JlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwicG9zaXRpb24iLCJpbnNldCIsInpJbmRleCIsInBvaW50ZXJFdmVudHMiLCJMb2FkaW5nU2NyZWVuIiwiaXNMb2FkZWQiLCJvbkRvbmUiLCJfczIiLCJyZWYiLCJwcm9ncmVzcyIsInNldFByb2dyZXNzIiwicGhhc2UiLCJzZXRQaGFzZSIsIml2Iiwic2V0SW50ZXJ2YWwiLCJtaW4iLCJjbGVhckludGVydmFsIiwic2V0VGltZW91dCIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwiYWxpZ25JdGVtcyIsImp1c3RpZnlDb250ZW50IiwiZ2FwIiwib3BhY2l0eSIsInRyYW5zaXRpb24iLCJiYWNrZ3JvdW5kSW1hZ2UiLCJiYWNrZ3JvdW5kU2l6ZSIsInRvcCIsImxlZnQiLCJib3JkZXJSYWRpdXMiLCJhbmltYXRpb24iLCJmaWx0ZXIiLCJib3R0b20iLCJyaWdodCIsImJvcmRlciIsImZvbnRTaXplIiwidGV4dEFsaWduIiwiZm9udEZhbWlseSIsImxldHRlclNwYWNpbmciLCJtYXJnaW5Cb3R0b20iLCJ0ZXh0VHJhbnNmb3JtIiwib3ZlcmZsb3ciLCJtYXJnaW5Ub3AiLCJmb250V2VpZ2h0Iiwicm91bmQiLCJFcnJvclNjcmVlbiIsImVycm9yIiwibWluSGVpZ2h0IiwicGFkZGluZyIsIl9jMyIsIkFwcCIsIl9zMyIsInByb2ZpbGUiLCJyZXBvcyIsImxhbmd1YWdlcyIsImxvYWRpbmciLCJ0aGVtZSIsInRvZ2dsZSIsInNob3dMb2FkaW5nIiwic2V0U2hvd0xvYWRpbmciLCJoYW5kbGVMb2FkaW5nRG9uZSIsImxlbmlzIiwibGVycCIsInNtb290aFdoZWVsIiwid2hlZWxNdWx0aXBsaWVyIiwidG91Y2hNdWx0aXBsaWVyIiwidGltZSIsInN0cmluZ1R1bmUiLCJnZXRJbnN0YW5jZSIsInVzZSIsInN0YXJ0IiwiZGVzdHJveSIsIl9jIiwiX2MyIiwiX2M0Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIkFwcC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlLCB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IExlbmlzIGZyb20gJ2xlbmlzJ1xuaW1wb3J0IHsgTW90aW9uQ29uZmlnIH0gZnJvbSAnZnJhbWVyLW1vdGlvbidcbmltcG9ydCBTdHJpbmdUdW5lLCB7IFN0cmluZ0ludmlldywgU3RyaW5nTGF6eSB9IGZyb20gJ0BmaWRkbGUtZGlnaXRhbC9zdHJpbmctdHVuZSdcbmltcG9ydCB7IHVzZUdpdEh1YiB9IGZyb20gJy4vaG9va3MvdXNlR2l0SHViJ1xuaW1wb3J0IHsgdXNlVGhlbWUgfSBmcm9tICcuL2hvb2tzL3VzZVRoZW1lJ1xuaW1wb3J0IE5hdmJhciBmcm9tICcuL2NvbXBvbmVudHMvTmF2YmFyJ1xuaW1wb3J0IEhlcm8gZnJvbSAnLi9jb21wb25lbnRzL0hlcm8nXG5pbXBvcnQgQWJvdXQgZnJvbSAnLi9jb21wb25lbnRzL0Fib3V0J1xuaW1wb3J0IEdpdEh1YlN0YXRzIGZyb20gJy4vY29tcG9uZW50cy9HaXRIdWJTdGF0cydcbmltcG9ydCBSZXBvR3JpZCBmcm9tICcuL2NvbXBvbmVudHMvUmVwb0dyaWQnXG5pbXBvcnQgTGFuZ3VhZ2VDaGFydCBmcm9tICcuL2NvbXBvbmVudHMvTGFuZ3VhZ2VDaGFydCdcbmltcG9ydCBDb250YWN0IGZyb20gJy4vY29tcG9uZW50cy9Db250YWN0J1xuaW1wb3J0IENlcnRpZmljYXRlcyBmcm9tICcuL2NvbXBvbmVudHMvQ2VydGlmaWNhdGVzJ1xuaW1wb3J0IENyZWF0aXZlR2FsbGVyeSBmcm9tICcuL2NvbXBvbmVudHMvQ3JlYXRpdmVHYWxsZXJ5J1xuaW1wb3J0IEZvb3RlciBmcm9tICcuL2NvbXBvbmVudHMvRm9vdGVyJ1xuaW1wb3J0IFBhcnRpY2xlQmFja2dyb3VuZCBmcm9tICcuL2NvbXBvbmVudHMvUGFydGljbGVCYWNrZ3JvdW5kJ1xuaW1wb3J0IFNjcm9sbFJldmVhbCBmcm9tICcuL2NvbXBvbmVudHMvU2Nyb2xsUmV2ZWFsJ1xuaW1wb3J0IExpcXVpZEJhY2tncm91bmQgZnJvbSAnLi9jb21wb25lbnRzL0xpcXVpZEJhY2tncm91bmQnXG5cbi8qIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkFxuICAgUFJFTUlVTSBNQUdORVRJQyBDVVJTT1IgV0lUSCBUUkFJTFxu4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQICovXG5mdW5jdGlvbiBNYWduZXRpY0N1cnNvcigpIHtcbiAgY29uc3QgZG90ID0gdXNlUmVmKG51bGwpXG4gIGNvbnN0IHJpbmcgPSB1c2VSZWYobnVsbClcbiAgY29uc3QgdHJhaWxDYW52YXMgPSB1c2VSZWYobnVsbClcbiAgY29uc3QgbW91c2VSZWYgPSB1c2VSZWYoeyB4OiAwLCB5OiAwLCByeDogMCwgcnk6IDAgfSlcbiAgY29uc3QgdHJhaWxQb2ludHMgPSB1c2VSZWYoW10pXG4gIGNvbnN0IGlzSG92ZXJpbmcgPSB1c2VSZWYoZmFsc2UpXG4gIGNvbnN0IGlzQ2xpY2tpbmcgPSB1c2VSZWYoZmFsc2UpXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjYW52YXMgPSB0cmFpbENhbnZhcy5jdXJyZW50XG4gICAgaWYgKCFjYW52YXMpIHJldHVyblxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG5cbiAgICBsZXQgVyA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgbGV0IEggPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICBjYW52YXMud2lkdGggPSBXXG4gICAgY2FudmFzLmhlaWdodCA9IEhcbiAgICBsZXQgcmFmXG5cbiAgICBjb25zdCBUUkFJTF9MRU5HVEggPSAyMlxuICAgIGNvbnN0IFRSQUlMX0NPTE9SUyA9IFtcbiAgICAgICdyZ2JhKDU2LDE4OSwyNDgsJywgLy8gc2t5XG4gICAgICAncmdiYSgxNjcsMTM5LDI1MCwnLCAvLyB2aW9sZXRcbiAgICAgICdyZ2JhKDI0NCwxMTQsMTgyLCcsIC8vIHBpbmtcbiAgICAgICdyZ2JhKDUyLDIxMSwxNTMsJywgIC8vIGVtZXJhbGRcbiAgICBdXG5cbiAgICBjb25zdCBvblJlc2l6ZSA9ICgpID0+IHtcbiAgICAgIFcgPSB3aW5kb3cuaW5uZXJXaWR0aDsgSCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgY2FudmFzLndpZHRoID0gVzsgY2FudmFzLmhlaWdodCA9IEhcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uUmVzaXplKVxuXG4gICAgY29uc3QgbW92ZSA9IChlKSA9PiB7XG4gICAgICBtb3VzZVJlZi5jdXJyZW50LnggPSBlLmNsaWVudFhcbiAgICAgIG1vdXNlUmVmLmN1cnJlbnQueSA9IGUuY2xpZW50WVxuXG4gICAgICAvLyBBZGQgdHJhaWwgcG9pbnRcbiAgICAgIHRyYWlsUG9pbnRzLmN1cnJlbnQucHVzaCh7XG4gICAgICAgIHg6IGUuY2xpZW50WCwgeTogZS5jbGllbnRZLFxuICAgICAgICBsaWZlOiAxLCBzaXplOiBNYXRoLnJhbmRvbSgpICogMyArIDEuNSxcbiAgICAgICAgdng6IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDEuNSxcbiAgICAgICAgdnk6IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDEuNSAtIDAuNSxcbiAgICAgICAgY29sb3I6IFRSQUlMX0NPTE9SU1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBUUkFJTF9DT0xPUlMubGVuZ3RoKV0sXG4gICAgICB9KVxuICAgICAgaWYgKHRyYWlsUG9pbnRzLmN1cnJlbnQubGVuZ3RoID4gODApIHRyYWlsUG9pbnRzLmN1cnJlbnQuc2hpZnQoKVxuXG4gICAgICAvLyBNb3ZlIGRvdCBpbnN0YW50bHlcbiAgICAgIGlmIChkb3QuY3VycmVudCkge1xuICAgICAgICBkb3QuY3VycmVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7ZS5jbGllbnRYIC0gNX1weCwke2UuY2xpZW50WSAtIDV9cHgpYFxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG9uTW91c2VEb3duID0gKCkgPT4ge1xuICAgICAgaXNDbGlja2luZy5jdXJyZW50ID0gdHJ1ZVxuICAgICAgaWYgKHJpbmcuY3VycmVudCkge1xuICAgICAgICByaW5nLmN1cnJlbnQuc3R5bGUud2lkdGggPSAnMjJweCdcbiAgICAgICAgcmluZy5jdXJyZW50LnN0eWxlLmhlaWdodCA9ICcyMnB4J1xuICAgICAgICByaW5nLmN1cnJlbnQuc3R5bGUuYm9yZGVyQ29sb3IgPSAncmdiYSg1NiwxODksMjQ4LDAuOCknXG4gICAgICAgIHJpbmcuY3VycmVudC5zdHlsZS5ib3JkZXJXaWR0aCA9ICcyLjVweCdcbiAgICAgIH1cbiAgICAgIGlmIChkb3QuY3VycmVudCkge1xuICAgICAgICBkb3QuY3VycmVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7bW91c2VSZWYuY3VycmVudC54IC0gNX1weCwke21vdXNlUmVmLmN1cnJlbnQueSAtIDV9cHgpIHNjYWxlKDAuNilgXG4gICAgICB9XG4gICAgICAvLyBCdXJzdCBwYXJ0aWNsZXMgb24gY2xpY2tcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gKE1hdGguUEkgKiAyICogaSkgLyA4XG4gICAgICAgIHRyYWlsUG9pbnRzLmN1cnJlbnQucHVzaCh7XG4gICAgICAgICAgeDogbW91c2VSZWYuY3VycmVudC54LCB5OiBtb3VzZVJlZi5jdXJyZW50LnksXG4gICAgICAgICAgbGlmZTogMSwgc2l6ZTogTWF0aC5yYW5kb20oKSAqIDQgKyAyLFxuICAgICAgICAgIHZ4OiBNYXRoLmNvcyhhbmdsZSkgKiAoMiArIE1hdGgucmFuZG9tKCkgKiAyKSxcbiAgICAgICAgICB2eTogTWF0aC5zaW4oYW5nbGUpICogKDIgKyBNYXRoLnJhbmRvbSgpICogMiksXG4gICAgICAgICAgY29sb3I6IFRSQUlMX0NPTE9SU1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBUUkFJTF9DT0xPUlMubGVuZ3RoKV0sXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgb25Nb3VzZVVwID0gKCkgPT4ge1xuICAgICAgaXNDbGlja2luZy5jdXJyZW50ID0gZmFsc2VcbiAgICAgIGlmIChyaW5nLmN1cnJlbnQpIHtcbiAgICAgICAgcmluZy5jdXJyZW50LnN0eWxlLndpZHRoID0gaXNIb3ZlcmluZy5jdXJyZW50ID8gJzUycHgnIDogJzM0cHgnXG4gICAgICAgIHJpbmcuY3VycmVudC5zdHlsZS5oZWlnaHQgPSBpc0hvdmVyaW5nLmN1cnJlbnQgPyAnNTJweCcgOiAnMzRweCdcbiAgICAgICAgcmluZy5jdXJyZW50LnN0eWxlLmJvcmRlckNvbG9yID0gaXNIb3ZlcmluZy5jdXJyZW50ID8gJ3JnYmEoNTYsMTg5LDI0OCwwLjY1KScgOiAncmdiYSg1NiwxODksMjQ4LDAuNCknXG4gICAgICAgIHJpbmcuY3VycmVudC5zdHlsZS5ib3JkZXJXaWR0aCA9ICcxLjVweCdcbiAgICAgIH1cbiAgICAgIGlmIChkb3QuY3VycmVudCkge1xuICAgICAgICBkb3QuY3VycmVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7bW91c2VSZWYuY3VycmVudC54IC0gNX1weCwke21vdXNlUmVmLmN1cnJlbnQueSAtIDV9cHgpIHNjYWxlKDEpYFxuICAgICAgfVxuICAgIH1cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBtb3ZlKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbk1vdXNlRG93bilcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG9uTW91c2VVcClcblxuICAgIC8vIE1hZ25ldGljICsgaG92ZXIgZWZmZWN0cyBvbiBpbnRlcmFjdGl2ZSBlbGVtZW50c1xuICAgIGNvbnN0IGdyb3cgPSAoKSA9PiB7XG4gICAgICBpc0hvdmVyaW5nLmN1cnJlbnQgPSB0cnVlXG4gICAgICBpZiAocmluZy5jdXJyZW50ICYmICFpc0NsaWNraW5nLmN1cnJlbnQpIHtcbiAgICAgICAgcmluZy5jdXJyZW50LnN0eWxlLndpZHRoID0gJzUycHgnXG4gICAgICAgIHJpbmcuY3VycmVudC5zdHlsZS5oZWlnaHQgPSAnNTJweCdcbiAgICAgICAgcmluZy5jdXJyZW50LnN0eWxlLmJvcmRlckNvbG9yID0gJ3JnYmEoNTYsMTg5LDI0OCwwLjY1KSdcbiAgICAgIH1cbiAgICAgIGlmIChkb3QuY3VycmVudCkge1xuICAgICAgICBkb3QuY3VycmVudC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3ZhcigtLWMyKSdcbiAgICAgICAgZG90LmN1cnJlbnQuc3R5bGUuYm94U2hhZG93ID0gJzAgMCAxMnB4IHJnYmEoMTY3LDEzOSwyNTAsMC42KSdcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3Qgc2hyaW5rID0gKCkgPT4ge1xuICAgICAgaXNIb3ZlcmluZy5jdXJyZW50ID0gZmFsc2VcbiAgICAgIGlmIChyaW5nLmN1cnJlbnQgJiYgIWlzQ2xpY2tpbmcuY3VycmVudCkge1xuICAgICAgICByaW5nLmN1cnJlbnQuc3R5bGUud2lkdGggPSAnMzRweCdcbiAgICAgICAgcmluZy5jdXJyZW50LnN0eWxlLmhlaWdodCA9ICczNHB4J1xuICAgICAgICByaW5nLmN1cnJlbnQuc3R5bGUuYm9yZGVyQ29sb3IgPSAncmdiYSg1NiwxODksMjQ4LDAuNCknXG4gICAgICB9XG4gICAgICBpZiAoZG90LmN1cnJlbnQpIHtcbiAgICAgICAgZG90LmN1cnJlbnQuc3R5bGUuYmFja2dyb3VuZCA9ICd2YXIoLS1jMSknXG4gICAgICAgIGRvdC5jdXJyZW50LnN0eWxlLmJveFNoYWRvdyA9ICdub25lJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGludGVyYWN0aXZlRWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYSxidXR0b24sW3JvbGU9XCJidXR0b25cIl0sLmxnLWhvdmVyLC5nbG93LWJvcmRlcicpXG4gICAgaW50ZXJhY3RpdmVFbHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZ3JvdylcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBzaHJpbmspXG4gICAgfSlcblxuICAgIC8vIEFuaW1hdGlvbiBsb29wXG4gICAgY29uc3QgYW5pbWF0ZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IG0gPSBtb3VzZVJlZi5jdXJyZW50XG4gICAgICBtLnJ4ICs9IChtLnggLSBtLnJ4KSAqIDAuMVxuICAgICAgbS5yeSArPSAobS55IC0gbS5yeSkgKiAwLjFcblxuICAgICAgaWYgKHJpbmcuY3VycmVudCkge1xuICAgICAgICBjb25zdCByaW5nVyA9IHBhcnNlRmxvYXQocmluZy5jdXJyZW50LnN0eWxlLndpZHRoIHx8IDM0KVxuICAgICAgICByaW5nLmN1cnJlbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZSgke20ucnggLSByaW5nVyAvIDJ9cHgsJHttLnJ5IC0gcmluZ1cgLyAyfXB4KWBcbiAgICAgIH1cblxuICAgICAgLy8gRHJhdyB0cmFpbCBwYXJ0aWNsZXNcbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgVywgSClcbiAgICAgIGNvbnN0IHBvaW50cyA9IHRyYWlsUG9pbnRzLmN1cnJlbnRcbiAgICAgIGZvciAobGV0IGkgPSBwb2ludHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgY29uc3QgcCA9IHBvaW50c1tpXVxuICAgICAgICBwLnggKz0gcC52eFxuICAgICAgICBwLnkgKz0gcC52eVxuICAgICAgICBwLnZ5ICs9IDAuMDIgLy8gZ3Jhdml0eVxuICAgICAgICBwLnZ4ICo9IDAuOTggLy8gZnJpY3Rpb25cbiAgICAgICAgcC5saWZlIC09IDAuMDI1XG5cbiAgICAgICAgaWYgKHAubGlmZSA8PSAwKSB7XG4gICAgICAgICAgcG9pbnRzLnNwbGljZShpLCAxKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhbHBoYSA9IHAubGlmZSAqIDAuNlxuICAgICAgICAvLyBHbG93XG4gICAgICAgIGN0eC5zYXZlKClcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gYWxwaGEgKiAwLjRcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGAke3AuY29sb3J9MSlgXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKVxuICAgICAgICBjdHguYXJjKHAueCwgcC55LCBwLnNpemUgKiAzLCAwLCBNYXRoLlBJICogMilcbiAgICAgICAgY3R4LmZpbGwoKVxuICAgICAgICAvLyBDb3JlXG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IGFscGhhXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBgJHtwLmNvbG9yfTEpYFxuICAgICAgICBjdHguYmVnaW5QYXRoKClcbiAgICAgICAgY3R4LmFyYyhwLngsIHAueSwgcC5zaXplLCAwLCBNYXRoLlBJICogMilcbiAgICAgICAgY3R4LmZpbGwoKVxuICAgICAgICBjdHgucmVzdG9yZSgpXG4gICAgICB9XG5cbiAgICAgIHJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKVxuICAgIH1cbiAgICByYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW92ZSlcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBvbk1vdXNlRG93bilcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25Nb3VzZVVwKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uUmVzaXplKVxuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmKVxuICAgICAgaW50ZXJhY3RpdmVFbHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBncm93KVxuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgc2hyaW5rKVxuICAgICAgfSlcbiAgICB9XG4gIH0sIFtdKVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxjYW52YXNcbiAgICAgICAgcmVmPXt0cmFpbENhbnZhc31cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJywgaW5zZXQ6IDAsIHdpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgIHpJbmRleDogOTk5NywgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgICAgICB9fVxuICAgICAgLz5cbiAgICAgIDxkaXYgaWQ9XCJjdXJzb3JcIiByZWY9e2RvdH0gLz5cbiAgICAgIDxkaXYgaWQ9XCJjdXJzb3ItcmluZ1wiIHJlZj17cmluZ30gLz5cbiAgICA8Lz5cbiAgKVxufVxuXG4vKiDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZBcbiAgIFBSRU1JVU0gQ0lORU1BVElDIExPQURJTkcgU0NSRUVOXG7ilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAgKi9cbmZ1bmN0aW9uIExvYWRpbmdTY3JlZW4oeyBpc0xvYWRlZCwgb25Eb25lIH0pIHtcbiAgY29uc3QgcmVmID0gdXNlUmVmKG51bGwpXG4gIGNvbnN0IFtwcm9ncmVzcywgc2V0UHJvZ3Jlc3NdID0gdXNlU3RhdGUoMClcbiAgY29uc3QgW3BoYXNlLCBzZXRQaGFzZV0gPSB1c2VTdGF0ZSgwKSAvLyAwPWxvYWRpbmcsIDE9ZmFkaW5nXG5cbiAgLy8gU2ltdWxhdGUgc21vb3RoIHByb2dyZXNzIGJhclxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGl2ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgc2V0UHJvZ3Jlc3MocCA9PiB7XG4gICAgICAgIGlmIChpc0xvYWRlZCkgcmV0dXJuIE1hdGgubWluKHAgKyA4LCAxMDApXG4gICAgICAgIHJldHVybiBNYXRoLm1pbihwICsgTWF0aC5yYW5kb20oKSAqIDMuNSwgODgpIC8vIHNsb3cgY2xpbWIgdG8gODglIHVudGlsIGxvYWRlZFxuICAgICAgfSlcbiAgICB9LCA2MClcbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChpdilcbiAgfSwgW2lzTG9hZGVkXSlcblxuICAvLyBUcmlnZ2VyIGV4aXQgYW5pbWF0aW9uIHdoZW4gcHJvZ3Jlc3MgaGl0cyAxMDBcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAocHJvZ3Jlc3MgPj0gMTAwICYmIHBoYXNlID09PSAwKSB7XG4gICAgICBzZXRQaGFzZSgxKVxuICAgICAgc2V0VGltZW91dChvbkRvbmUsIDEyMDApXG4gICAgfVxuICB9LCBbcHJvZ3Jlc3MsIHBoYXNlLCBvbkRvbmVdKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiByZWY9e3JlZn0gc3R5bGU9e3tcbiAgICAgIHBvc2l0aW9uOidmaXhlZCcsIGluc2V0OjAsIHpJbmRleDo5OTk5LFxuICAgICAgZGlzcGxheTonZmxleCcsIGZsZXhEaXJlY3Rpb246J2NvbHVtbicsXG4gICAgICBhbGlnbkl0ZW1zOidjZW50ZXInLCBqdXN0aWZ5Q29udGVudDonY2VudGVyJyxcbiAgICAgIGJhY2tncm91bmQ6J3ZhcigtLWJnKScsIGdhcDonMi41cmVtJyxcbiAgICAgIG9wYWNpdHk6IHBoYXNlID09PSAxID8gMCA6IDEsXG4gICAgICB0cmFuc2Zvcm06IHBoYXNlID09PSAxID8gJ3NjYWxlKDEuMDgpJyA6ICdzY2FsZSgxKScsXG4gICAgICB0cmFuc2l0aW9uOidvcGFjaXR5IDFzIGN1YmljLWJlemllcigwLjE2LDEsMC4zLDEpLCB0cmFuc2Zvcm0gMXMgY3ViaWMtYmV6aWVyKDAuMTYsMSwwLjMsMSknLFxuICAgICAgcG9pbnRlckV2ZW50czogcGhhc2UgPT09IDEgPyAnbm9uZScgOiAnYXV0bycsXG4gICAgfX0+XG4gICAgICB7LyogQmFja2dyb3VuZCBncmlkIGxpbmVzICovfVxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICBwb3NpdGlvbjonYWJzb2x1dGUnLCBpbnNldDowLCBvcGFjaXR5OjAuMDQsXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTonbGluZWFyLWdyYWRpZW50KHJnYmEoNTYsMTg5LDI0OCwwLjUpIDFweCwgdHJhbnNwYXJlbnQgMXB4KSwgbGluZWFyLWdyYWRpZW50KDkwZGVnLCByZ2JhKDU2LDE4OSwyNDgsMC41KSAxcHgsIHRyYW5zcGFyZW50IDFweCknLFxuICAgICAgICBiYWNrZ3JvdW5kU2l6ZTonODBweCA4MHB4JyxcbiAgICAgIH19Lz5cblxuICAgICAgey8qIEZsb2F0aW5nIG9yYnMgKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7IHBvc2l0aW9uOidhYnNvbHV0ZScsIHRvcDonMjAlJywgbGVmdDonMjUlJywgd2lkdGg6MjAwLCBoZWlnaHQ6MjAwLCBib3JkZXJSYWRpdXM6JzUwJScsXG4gICAgICAgIGJhY2tncm91bmQ6J3JhZGlhbC1ncmFkaWVudChjaXJjbGUsIHJnYmEoNTYsMTg5LDI0OCwwLjA4KSwgdHJhbnNwYXJlbnQgNzAlKScsXG4gICAgICAgIGFuaW1hdGlvbjonZHJpZnQgMThzIGVhc2UtaW4tb3V0IGluZmluaXRlIGFsdGVybmF0ZScsIGZpbHRlcjonYmx1cig0MHB4KScgfX0vPlxuICAgICAgPGRpdiBzdHlsZT17eyBwb3NpdGlvbjonYWJzb2x1dGUnLCBib3R0b206JzIwJScsIHJpZ2h0OicyMCUnLCB3aWR0aDoyNjAsIGhlaWdodDoyNjAsIGJvcmRlclJhZGl1czonNTAlJyxcbiAgICAgICAgYmFja2dyb3VuZDoncmFkaWFsLWdyYWRpZW50KGNpcmNsZSwgcmdiYSgxNjcsMTM5LDI1MCwwLjA4KSwgdHJhbnNwYXJlbnQgNzAlKScsXG4gICAgICAgIGFuaW1hdGlvbjonZHJpZnQgMjJzIGVhc2UtaW4tb3V0IGluZmluaXRlIGFsdGVybmF0ZS1yZXZlcnNlJywgZmlsdGVyOidibHVyKDUwcHgpJyB9fS8+XG5cbiAgICAgIHsvKiBBbmltYXRlZCBsb2dvICovfVxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICB3aWR0aDo4MCwgaGVpZ2h0OjgwLCBib3JkZXJSYWRpdXM6JzIycHgnLCBwb3NpdGlvbjoncmVsYXRpdmUnLFxuICAgICAgICBiYWNrZ3JvdW5kOidsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLHJnYmEoNTYsMTg5LDI0OCwwLjEyKSxyZ2JhKDE2NywxMzksMjUwLDAuMTIpKScsXG4gICAgICAgIGJvcmRlcjonMXB4IHNvbGlkIHJnYmEoNTYsMTg5LDI0OCwwLjI1KScsXG4gICAgICAgIGRpc3BsYXk6J2ZsZXgnLCBhbGlnbkl0ZW1zOidjZW50ZXInLCBqdXN0aWZ5Q29udGVudDonY2VudGVyJyxcbiAgICAgICAgZm9udFNpemU6JzIuMnJlbScsXG4gICAgICAgIGFuaW1hdGlvbjonZmxvYXQgM3MgZWFzZS1pbi1vdXQgaW5maW5pdGUsIHB1bHNlLWdsb3cgMi41cyBlYXNlIGluZmluaXRlJyxcbiAgICAgICAgYm94U2hhZG93OicwIDIwcHggNjBweCByZ2JhKDU2LDE4OSwyNDgsMC4xNSknLFxuICAgICAgfX0+XG4gICAgICAgIOKaoVxuICAgICAgICB7LyogU3Bpbm5pbmcgcmluZyBhcm91bmQgbG9nbyAqL31cbiAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIHBvc2l0aW9uOidhYnNvbHV0ZScsIGluc2V0OictOHB4JywgYm9yZGVyUmFkaXVzOicyNnB4JyxcbiAgICAgICAgICBib3JkZXI6JzFweCBkYXNoZWQgcmdiYSg1NiwxODksMjQ4LDAuMjUpJyxcbiAgICAgICAgICBhbmltYXRpb246J3NwaW4tc2xvdyAxMnMgbGluZWFyIGluZmluaXRlJyxcbiAgICAgICAgfX0vPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBUZXh0ICovfVxuICAgICAgPGRpdiBzdHlsZT17eyB0ZXh0QWxpZ246J2NlbnRlcicsIHBvc2l0aW9uOidyZWxhdGl2ZScgfX0+XG4gICAgICAgIDxwIHN0eWxlPXt7XG4gICAgICAgICAgZm9udEZhbWlseTondmFyKC0tZm9udC1tb25vKScsIGNvbG9yOid2YXIoLS1jMSknLCBmb250U2l6ZTonMC43MnJlbScsXG4gICAgICAgICAgbGV0dGVyU3BhY2luZzonMC4yMmVtJywgbWFyZ2luQm90dG9tOicwLjZyZW0nLCB0ZXh0VHJhbnNmb3JtOid1cHBlcmNhc2UnLFxuICAgICAgICAgIGFuaW1hdGlvbjonZmFkZVVwIDAuOHMgMC4ycyBib3RoJyxcbiAgICAgICAgfX0+SU5JVElBTElaSU5HIFBPUlRGT0xJTzwvcD5cbiAgICAgICAgPHAgc3R5bGU9e3tcbiAgICAgICAgICBmb250RmFtaWx5Oid2YXIoLS1mb250LW1vbm8pJywgY29sb3I6J3ZhcigtLW11dGVkKScsIGZvbnRTaXplOicwLjY1cmVtJyxcbiAgICAgICAgICBsZXR0ZXJTcGFjaW5nOicwLjA4ZW0nLFxuICAgICAgICAgIGFuaW1hdGlvbjonZmFkZVVwIDAuOHMgMC40cyBib3RoJyxcbiAgICAgICAgfX0+RmV0Y2hpbmcgZGF0YSBmcm9tIEdpdEh1YiBBUEkuLi48L3A+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFByb2dyZXNzIGJhciAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgd2lkdGg6JzI4MHB4JywgcG9zaXRpb246J3JlbGF0aXZlJyxcbiAgICAgICAgYW5pbWF0aW9uOidmYWRlVXAgMC44cyAwLjVzIGJvdGgnLFxuICAgICAgfX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICB3aWR0aDonMTAwJScsIGhlaWdodDonM3B4JywgYmFja2dyb3VuZDoncmdiYSgyNTUsMjU1LDI1NSwwLjA2KScsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOicxMDBweCcsIG92ZXJmbG93OidoaWRkZW4nLFxuICAgICAgICB9fT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICBoZWlnaHQ6JzEwMCUnLCBib3JkZXJSYWRpdXM6JzEwMHB4JyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6J2xpbmVhci1ncmFkaWVudCg5MGRlZyx2YXIoLS1jMSksdmFyKC0tYzIpLHZhcigtLWMzKSknLFxuICAgICAgICAgICAgYmFja2dyb3VuZFNpemU6JzIwMCUgYXV0bycsXG4gICAgICAgICAgICB3aWR0aDpgJHtwcm9ncmVzc30lYCxcbiAgICAgICAgICAgIHRyYW5zaXRpb246J3dpZHRoIDAuMTVzIGVhc2Utb3V0JyxcbiAgICAgICAgICAgIGFuaW1hdGlvbjonc2hpbW1lciAycyBsaW5lYXIgaW5maW5pdGUnLFxuICAgICAgICAgIH19Lz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICBkaXNwbGF5OidmbGV4JywganVzdGlmeUNvbnRlbnQ6J3NwYWNlLWJldHdlZW4nLCBtYXJnaW5Ub3A6JzAuNXJlbScsXG4gICAgICAgIH19PlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRGYW1pbHk6J3ZhcigtLWZvbnQtbW9ubyknLCBmb250U2l6ZTonMC42cmVtJyxcbiAgICAgICAgICAgIGNvbG9yOid2YXIoLS1tdXRlZCknLCBsZXR0ZXJTcGFjaW5nOicwLjA1ZW0nIH19PlxuICAgICAgICAgICAge3Byb2dyZXNzIDwgMzAgPyAnQ29ubmVjdGluZy4uLicgOiBwcm9ncmVzcyA8IDcwID8gJ0xvYWRpbmcgcmVwb3MuLi4nIDogcHJvZ3Jlc3MgPCA5NSA/ICdCdWlsZGluZyBVSS4uLicgOiAnUmVhZHkhJ31cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udEZhbWlseTondmFyKC0tZm9udC1tb25vKScsIGZvbnRTaXplOicwLjZyZW0nLFxuICAgICAgICAgICAgY29sb3I6J3ZhcigtLWMxKScsIGxldHRlclNwYWNpbmc6JzAuMDVlbScsIGZvbnRXZWlnaHQ6NjAwIH19PlxuICAgICAgICAgICAge01hdGgucm91bmQocHJvZ3Jlc3MpfSVcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZnVuY3Rpb24gRXJyb3JTY3JlZW4oeyBlcnJvciB9KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyBtaW5IZWlnaHQ6JzEwMHZoJyxkaXNwbGF5OidmbGV4JyxmbGV4RGlyZWN0aW9uOidjb2x1bW4nLFxuICAgICAgYWxpZ25JdGVtczonY2VudGVyJyxqdXN0aWZ5Q29udGVudDonY2VudGVyJyxcbiAgICAgIGJhY2tncm91bmQ6J3ZhcigtLWJnKScsZ2FwOicxLjVyZW0nLHBhZGRpbmc6JzJyZW0nLHRleHRBbGlnbjonY2VudGVyJyB9fT5cbiAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6JzNyZW0nIH19PuKaoO+4jzwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgPGgyIHN0eWxlPXt7IGNvbG9yOid2YXIoLS1jMyknLGZvbnRGYW1pbHk6J3ZhcigtLWZvbnQtbW9ubyknLG1hcmdpbkJvdHRvbTonMC43NXJlbScsZm9udFNpemU6JzFyZW0nIH19PlxuICAgICAgICAgIEZhaWxlZCB0byBsb2FkIEdpdEh1YiBkYXRhXG4gICAgICAgIDwvaDI+XG4gICAgICAgIDxwIHN0eWxlPXt7IGNvbG9yOid2YXIoLS1tdXRlZCknLGZvbnRGYW1pbHk6J3ZhcigtLWZvbnQtbW9ubyknLGZvbnRTaXplOicwLjhyZW0nLG1hcmdpbkJvdHRvbTonMC41cmVtJyB9fT57ZXJyb3J9PC9wPlxuICAgICAgICA8cCBzdHlsZT17eyBjb2xvcjondmFyKC0tbXV0ZWQpJyxmb250U2l6ZTonMC43NXJlbScsZm9udEZhbWlseTondmFyKC0tZm9udC1tb25vKScsb3BhY2l0eTowLjYgfX0+XG4gICAgICAgICAgTWFrZSBzdXJlIFZJVEVfR0lUSFVCX1VTRVJOQU1FIGlzIHNldCBpbiB5b3VyIC5lbnYgZmlsZVxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoKSB7XG4gIGNvbnN0IHsgcHJvZmlsZSwgcmVwb3MsIGxhbmd1YWdlcywgbG9hZGluZywgZXJyb3IgfSA9IHVzZUdpdEh1YigpXG4gIGNvbnN0IHsgdGhlbWUsIHRvZ2dsZSB9ID0gdXNlVGhlbWUoKVxuICBjb25zdCBbc2hvd0xvYWRpbmcsIHNldFNob3dMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpXG4gIGNvbnN0IGhhbmRsZUxvYWRpbmdEb25lID0gdXNlQ2FsbGJhY2soKCkgPT4gc2V0U2hvd0xvYWRpbmcoZmFsc2UpLCBbXSlcblxuICAvLyBMZW5pcyBzbW9vdGggc2Nyb2xsXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHNob3dMb2FkaW5nIHx8IGxvYWRpbmcpIHJldHVyblxuICAgIGNvbnN0IGxlbmlzID0gbmV3IExlbmlzKHtcbiAgICAgIGxlcnA6IDAuMDUsXG4gICAgICBzbW9vdGhXaGVlbDogdHJ1ZSxcbiAgICAgIHdoZWVsTXVsdGlwbGllcjogMSxcbiAgICAgIHRvdWNoTXVsdGlwbGllcjogMixcbiAgICB9KVxuICAgIGZ1bmN0aW9uIHJhZih0aW1lKSB7XG4gICAgICBsZW5pcy5yYWYodGltZSlcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyYWYpXG4gICAgfVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyYWYpXG5cbiAgICBjb25zdCBzdHJpbmdUdW5lID0gU3RyaW5nVHVuZS5nZXRJbnN0YW5jZSgpXG4gICAgc3RyaW5nVHVuZS51c2UoU3RyaW5nSW52aWV3KVxuICAgIHN0cmluZ1R1bmUudXNlKFN0cmluZ0xhenkpXG4gICAgc3RyaW5nVHVuZS5zdGFydCgpXG5cbiAgICByZXR1cm4gKCkgPT4gbGVuaXMuZGVzdHJveSgpXG4gIH0sIFtzaG93TG9hZGluZywgbG9hZGluZ10pXG5cbiAgaWYgKGVycm9yKSByZXR1cm4gPEVycm9yU2NyZWVuIGVycm9yPXtlcnJvcn0vPlxuXG4gIHJldHVybiAoXG4gICAgPE1vdGlvbkNvbmZpZyByZWR1Y2VkTW90aW9uPVwidXNlclwiPlxuICAgICAge3Nob3dMb2FkaW5nICYmIChcbiAgICAgICAgPExvYWRpbmdTY3JlZW4gaXNMb2FkZWQ9eyFsb2FkaW5nfSBvbkRvbmU9e2hhbmRsZUxvYWRpbmdEb25lfSAvPlxuICAgICAgKX1cblxuICAgICAgeyFsb2FkaW5nICYmIChcbiAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIG9wYWNpdHk6IHNob3dMb2FkaW5nID8gMCA6IDEsXG4gICAgICAgICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC44cyAwLjJzIGVhc2UnLFxuICAgICAgICB9fT5cbiAgICAgICAgICA8TWFnbmV0aWNDdXJzb3IvPlxuICAgICAgICAgIDxQYXJ0aWNsZUJhY2tncm91bmQgdGhlbWU9e3RoZW1lfS8+XG5cbiAgICAgICAgICA8TGlxdWlkQmFja2dyb3VuZCAvPlxuXG4gICAgICAgICAgPE5hdmJhciB0aGVtZT17dGhlbWV9IHRvZ2dsZVRoZW1lPXt0b2dnbGV9Lz5cblxuICAgICAgICAgIDxtYWluPlxuICAgICAgICAgICAgPFNjcm9sbFJldmVhbCBkaXJlY3Rpb249XCJ1cFwiIGR1cmF0aW9uPXswLjl9IGRpc3RhbmNlPXs1MH0+XG4gICAgICAgICAgICAgIDxIZXJvIHByb2ZpbGU9e3Byb2ZpbGV9Lz5cbiAgICAgICAgICAgIDwvU2Nyb2xsUmV2ZWFsPlxuXG4gICAgICAgICAgICA8U2Nyb2xsUmV2ZWFsIGRpcmVjdGlvbj1cInVwXCIgZGVsYXk9ezAuMX0gZHVyYXRpb249ezAuOH0gZGlzdGFuY2U9ezQ1fT5cbiAgICAgICAgICAgICAgPEFib3V0IHByb2ZpbGU9e3Byb2ZpbGV9Lz5cbiAgICAgICAgICAgIDwvU2Nyb2xsUmV2ZWFsPlxuXG4gICAgICAgICAgICA8U2Nyb2xsUmV2ZWFsIGRpcmVjdGlvbj1cInVwXCIgZGVsYXk9ezAuMDV9IGR1cmF0aW9uPXswLjh9IGRpc3RhbmNlPXs0MH0+XG4gICAgICAgICAgICAgIDxHaXRIdWJTdGF0cyBwcm9maWxlPXtwcm9maWxlfSByZXBvcz17cmVwb3N9Lz5cbiAgICAgICAgICAgIDwvU2Nyb2xsUmV2ZWFsPlxuXG4gICAgICAgICAgICA8U2Nyb2xsUmV2ZWFsIGRpcmVjdGlvbj1cInVwXCIgZGVsYXk9ezAuMDV9IGR1cmF0aW9uPXswLjh9IGRpc3RhbmNlPXs0MH0+XG4gICAgICAgICAgICAgIDxSZXBvR3JpZCByZXBvcz17cmVwb3N9Lz5cbiAgICAgICAgICAgIDwvU2Nyb2xsUmV2ZWFsPlxuXG4gICAgICAgICAgICA8U2Nyb2xsUmV2ZWFsIGRpcmVjdGlvbj1cImxlZnRcIiBkZWxheT17MC4xfSBkdXJhdGlvbj17MC45fSBkaXN0YW5jZT17NTB9PlxuICAgICAgICAgICAgICA8TGFuZ3VhZ2VDaGFydCBsYW5ndWFnZXM9e2xhbmd1YWdlc30vPlxuICAgICAgICAgICAgPC9TY3JvbGxSZXZlYWw+XG5cbiAgICAgICAgICAgIDxDcmVhdGl2ZUdhbGxlcnkgLz5cblxuICAgICAgICAgICAgPFNjcm9sbFJldmVhbCBkaXJlY3Rpb249XCJ1cFwiIGRlbGF5PXswLjF9IGR1cmF0aW9uPXswLjl9IGRpc3RhbmNlPXs0NX0+XG4gICAgICAgICAgICAgIDxDZXJ0aWZpY2F0ZXMgLz5cbiAgICAgICAgICAgIDwvU2Nyb2xsUmV2ZWFsPlxuXG4gICAgICAgICAgICA8U2Nyb2xsUmV2ZWFsIGRpcmVjdGlvbj1cInVwXCIgZGVsYXk9ezAuMX0gZHVyYXRpb249ezAuOX0gZGlzdGFuY2U9ezQ1fT5cbiAgICAgICAgICAgICAgPENvbnRhY3QgcHJvZmlsZT17cHJvZmlsZX0vPlxuICAgICAgICAgICAgPC9TY3JvbGxSZXZlYWw+XG4gICAgICAgICAgPC9tYWluPlxuXG4gICAgICAgICAgPFNjcm9sbFJldmVhbCBkaXJlY3Rpb249XCJ1cFwiIGRlbGF5PXswLjF9IGR1cmF0aW9uPXswLjZ9IGRpc3RhbmNlPXsyNX0+XG4gICAgICAgICAgICA8Rm9vdGVyIHRoZW1lPXt0aGVtZX0vPlxuICAgICAgICAgIDwvU2Nyb2xsUmV2ZWFsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9Nb3Rpb25Db25maWc+XG4gIClcbn1cbiJdLCJmaWxlIjoiQzovVXNlcnMvaXR6c28vc291bXlhLXBvcnRmb2xpby9zcmMvQXBwLmpzeCJ9