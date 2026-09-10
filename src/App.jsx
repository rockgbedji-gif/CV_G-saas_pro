import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  Dna,
  Activity,
  FileText,
  Calendar,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Clock,
  Mail,
  Phone,
  MapPin,
  Award,
  BookOpen,
  Download,
  X,
  Microscope,
  FlaskConical,
  Leaf,
  Layers,
  Check,
  Stethoscope,
  ExternalLink,
  ChevronDown,
  Sparkle,
  Star,
  Sun
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [activeCvTab, setActiveCvTab] = useState('cv'); // 'cv' or 'contact'
  const [exchangeFormSubmitted, setExchangeFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    motive: 'Consultation Trichologie & Diagnostic',
    preferredDate: '',
    message: ''
  });

  // State for Feature Card 1: Diagnostic Mixer (cycling array of 3 cards)
  const [mixerCards, setMixerCards] = useState([
    {
      id: 1,
      tag: "BIO-EXTRACTION DORÉE // 01",
      title: "Élixir Ricin Doré & Nigelle Activée",
      desc: "Extraction supercritique au CO2 sans solvant. Concentration maximale en acides gras nobles et thymoquinone à 99.8%.",
      stat: "Pureté 99.8%",
      color: "from-amber-950/60 via-purple-950/40 to-slate-950",
      accent: "#D4AF37",
      badgeBg: "bg-gold/20 text-gold-light border-gold/40"
    },
    {
      id: 2,
      tag: "PHYTO-PEPTIDES ÉNERGIE // 02",
      title: "Synergie Romarin & Kératine Végétale",
      desc: "Micro-circulation capillaire stimulée de +44% et reconstruction instantanée de la cuticule par infusion peptidique.",
      stat: "+44% Micro-flux",
      color: "from-purple-950/60 via-indigo-950/40 to-slate-950",
      accent: "#9880FF",
      badgeBg: "bg-plasma/20 text-plasma-light border-plasma/40"
    },
    {
      id: 3,
      tag: "BOUCLIER SÉBACÉ NOBLE // 03",
      title: "Émulsion Liposomale à l'Aloe Sauvage",
      desc: "Bouclier hydratant dermo-apaisant. Régulation ciblée du microbiome du cuir chevelu et barrière anti-inflammatoire.",
      stat: "pH 5.4 Équilibré",
      color: "from-emerald-950/60 via-teal-950/40 to-slate-950",
      accent: "#00F5D4",
      badgeBg: "bg-bio-cyan/20 text-bio-cyan border-bio-cyan/40"
    }
  ]);

  // State for Feature Card 2: Live Telemetry Typewriter
  const [typewriterText, setTypewriterText] = useState("");
  const telemetryLogs = [
    "SYS_INIT: Laboratoire galénique Dr. Gbedji actif.",
    "LOT_OR #EG-9042: Huiles botaniques rares et actifs certifiés purs.",
    "TRICHOLOGY CHECK: Absence totale de silicones, sulfates et toxines.",
    "VISCOSITÉ MESURÉE: 1,420 cP // Tolérance dermatologique: 100%",
    "CONTRÔLE MÉDICAL: Formule stérile validée pour cuir chevelu sensible.",
    "CONDITIONNEMENT: Flaconnage verre ambré protecteur anti-photo-oxydation."
  ];

  // State for Feature Card 3: Interactive Protocol Planner
  const [selectedDay, setSelectedDay] = useState(2); // Wednesday (index 2)
  const [plannerSaved, setPlannerSaved] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 20, y: 30, clicked: false });

  // References for GSAP animations
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const philosophyRef = useRef(null);
  const protocolContainerRef = useRef(null);
  const stickyCardsRef = useRef([]);

  // Scroll detection for floating island navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Card 1: Diagnostic Mixer 3s loop with array.unshift(array.pop())
  useEffect(() => {
    const interval = setInterval(() => {
      setMixerCards((prev) => {
        const copy = [...prev];
        const last = copy.pop();
        copy.unshift(last);
        return copy;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Card 2: Telemetry Typewriter character-by-character
  useEffect(() => {
    let currentLogIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timer;

    const typeTick = () => {
      const fullText = telemetryLogs[currentLogIndex];
      if (!isDeleting) {
        setTypewriterText(fullText.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        if (currentCharIndex === fullText.length) {
          isDeleting = true;
          timer = setTimeout(typeTick, 2400);
          return;
        }
      } else {
        setTypewriterText(fullText.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentLogIndex = (currentLogIndex + 1) % telemetryLogs.length;
          timer = setTimeout(typeTick, 400);
          return;
        }
      }
      timer = setTimeout(typeTick, isDeleting ? 25 : 50);
    };

    timer = setTimeout(typeTick, 400);
    return () => clearTimeout(timer);
  }, []);

  // Card 3: Animated SVG cursor loop
  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      if (step === 0) {
        const targetDay = 2; // Wednesday
        setSelectedDay(targetDay);
        setCursorPos({ x: 36 + targetDay * 9.2, y: 46, clicked: false });
        step = 1;
      } else if (step === 1) {
        setCursorPos(prev => ({ ...prev, clicked: true }));
        step = 2;
      } else if (step === 2) {
        setCursorPos({ x: 74, y: 78, clicked: false });
        step = 3;
      } else if (step === 3) {
        setCursorPos(prev => ({ ...prev, clicked: true }));
        setPlannerSaved(true);
        step = 4;
      } else if (step === 4) {
        setCursorPos({ x: 15, y: 25, clicked: false });
        setTimeout(() => setPlannerSaved(false), 1200);
        step = 0;
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // GSAP Context with animations and ScrollTrigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance Fade-Up with stagger 0.08s
      gsap.from('.hero-fade-item', {
        y: 35,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.15
      });

      // Interactive Feature Cards fade up with stagger 0.15s
      gsap.from('.feature-card-anim', {
        scrollTrigger: {
          trigger: '#expertises',
          start: 'top 85%',
        },
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Philosophy Manifesto Revelation
      gsap.from('.manifesto-text-part', {
        scrollTrigger: {
          trigger: philosophyRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power3.out'
      });

      // Sticky stacked protocol cards pinning (on desktop/tablet)
      const stickyCards = stickyCardsRef.current.filter(Boolean);
      if (stickyCards.length >= 3 && protocolContainerRef.current) {
        const isDesktop = window.innerWidth >= 768;
        if (isDesktop) {
          ScrollTrigger.create({
            trigger: protocolContainerRef.current,
            start: 'top top',
            end: '+=180%',
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              if (progress < 0.5) {
                const p = progress / 0.5;
                gsap.to(stickyCards[0], {
                  scale: 1 - p * 0.08,
                  filter: `blur(${p * 18}px)`,
                  opacity: 1 - p * 0.5,
                  duration: 0.1,
                  overwrite: 'auto'
                });
                gsap.to(stickyCards[1], {
                  yPercent: (1 - p) * 100,
                  opacity: p,
                  duration: 0.1,
                  overwrite: 'auto'
                });
              } else {
                const p = (progress - 0.5) / 0.5;
                gsap.to(stickyCards[1], {
                  scale: 1 - p * 0.08,
                  filter: `blur(${p * 18}px)`,
                  opacity: 1 - p * 0.5,
                  duration: 0.1,
                  overwrite: 'auto'
                });
                gsap.to(stickyCards[2], {
                  yPercent: (1 - p) * 100,
                  opacity: p,
                  duration: 0.1,
                  overwrite: 'auto'
                });
              }
            }
          });
        }
      }
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setExchangeFormSubmitted(true);
  };

  return (
    <div ref={mainRef} className="min-h-screen bg-vide-profond text-fantome relative font-sans selection:bg-gold selection:text-vide-profond overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* A. NAVBAR — "L'ÎLE FLOTTANTE" (Optimisée Mobile & Centrée avec Accents Dorés) */}
      {/* ========================================================================= */}
      <header
        className={`fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl rounded-full px-4 sm:px-6 py-2.5 sm:py-3.5 transition-all duration-500 flex items-center justify-between ${
          isScrolled
            ? 'bg-vide-profond/90 backdrop-blur-2xl border border-gold/40 shadow-gold-glow'
            : 'bg-vide-profond/40 backdrop-blur-md border border-white/15'
        }`}
      >
        {/* Brand Logo with golden pulse */}
        <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-surface-card border border-gold/50 flex items-center justify-center text-gold-light group-hover:scale-105 transition-transform shadow-gold-glow">
            <Dna className="w-4 h-4 sm:w-5 sm:h-5 text-gold-light animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-bold tracking-tight text-white text-xs sm:text-base whitespace-nowrap">
                Dr. Élodie GBEDJI
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-mono px-1.5 sm:px-2 py-0.5 rounded-full bg-gold/15 text-gold-light border border-gold/30 hidden xs:inline-block">
                M.D. & Trichologie
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-gold-champagne/80 font-mono tracking-wider hidden sm:block">
              MÉDECINE // SOINS CAPILLAIRES DORÉS DE PRÉCISION
            </p>
          </div>
        </a>

        {/* Navigation links with lift (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-wider text-fantome/80">
          <a href="#philosophie" className="interactive-lift hover:text-gold-light transition-colors">PHILOSOPHIE</a>
          <a href="#expertises" className="interactive-lift hover:text-gold-light transition-colors">EXPERTISES</a>
          <a href="#protocole" className="interactive-lift hover:text-gold-light transition-colors">PROTOCOLE</a>
          <a href="#tarifs" className="interactive-lift hover:text-gold-light transition-colors">CONSULTATION</a>
        </nav>

        {/* CTA Button with magnetic golden glow feeling */}
        <button
          onClick={() => { setIsCvModalOpen(true); setActiveCvTab('cv'); }}
          className="btn-magnetic bg-gradient-to-r from-gold-amber via-gold to-gold-light text-vide-profond text-xs sm:text-sm font-bold px-3.5 sm:px-6 py-2 sm:py-2.5 shadow-gold-glow shrink-0"
        >
          <span className="btn-slide-bg bg-white text-vide-profond"></span>
          <span className="btn-content">
            <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-vide-profond" />
            <span className="hidden sm:inline">Télécharger CV / Échange</span>
            <span className="sm:hidden text-[11px]">CV & Échange</span>
          </span>
        </button>
      </header>

      {/* ========================================================================= */}
      {/* B. SECTION HERO — "LE PLAN D'OUVERTURE" (Lumineux, Accents Dorés & 100% Centré Mobile) */}
      {/* ========================================================================= */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden pb-12 sm:pb-20 md:pb-24 pt-28 sm:pt-36 px-4 sm:px-8 md:px-16"
      >
        {/* Luminous Warm Background with Golden Bioluminescent Ambience */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=2000&q=80"
            alt="Laboratoire biologique et bioluminescence capillaire"
            className="w-full h-full object-cover object-center opacity-40 sm:opacity-50 scale-105"
          />
          {/* Heavy gradient primary-to-black with warm golden light blooms */}
          <div className="absolute inset-0 bg-gradient-to-t from-vide-profond via-vide-profond/80 to-transparent"></div>
          
          {/* Ambient Warm Golden & Plasma Blooms (Brightens the hero section) */}
          <div className="absolute top-1/4 right-1/6 w-80 sm:w-[480px] h-80 sm:h-[480px] bg-gold/25 rounded-full blur-[110px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }}></div>
          <div className="absolute bottom-1/3 left-1/10 w-72 sm:w-[420px] h-72 sm:h-[420px] bg-plasma/25 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute top-1/3 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-gold-amber/20 rounded-full blur-[120px] pointer-events-none"></div>
        </div>

        {/* Hero Content pushed to lower third - Centered on Mobile, Left-aligned on Desktop */}
        <div className="relative z-10 max-w-6xl mx-auto w-full text-center sm:text-left flex flex-col items-center sm:items-start">
          
          {/* Live clinical indicator with Golden luxury glow */}
          <div className="hero-fade-item inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-surface-card/90 border border-gold/40 text-[11px] sm:text-xs font-mono tracking-wider text-gold-light mb-5 sm:mb-6 backdrop-blur-md shadow-gold-glow">
            <span className="w-2 h-2 rounded-full bg-gold-light animate-ping shrink-0"></span>
            <span className="truncate">MÉDECINE GÉNÉRALE // TRICHOLOGIE & ACTIFS NATURELS DORÉS</span>
          </div>

          {/* Hero Title Contrast Pattern: Sans Bold / Massive Italic Serif with Radiant Gold Gradients */}
          <div className="mb-4 sm:mb-6 w-full">
            <h1 className="hero-fade-item text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-fantome uppercase">
              Dr. Élodie GBEDJI au-delà de
            </h1>
            <span className="hero-fade-item block font-serif italic text-4xl sm:text-7xl md:text-8xl lg:text-[9.5rem] leading-[0.95] sm:leading-[0.88] text-gold-gradient tracking-tight mt-1 sm:mt-2 pb-1 sm:pb-3 drop-shadow-[0_4px_30px_rgba(212,175,55,0.35)]">
              la Science Capillaire.
            </span>
          </div>

          {/* Subtitle & Value summary */}
          <p className="hero-fade-item text-sm sm:text-lg md:text-xl text-fantome/90 max-w-2xl font-light leading-relaxed mb-8 sm:mb-10 text-center sm:text-left">
            Diplômée en Médecine Générale et experte en santé du cuir chevelu. Je fusionne l'exactitude du diagnostic clinique, la formulation éco-responsable de cosmétiques naturels d'exception et la médecine dermatologique.
          </p>

          {/* Action CTAs - Responsive Full Width on Mobile, Row on Desktop */}
          <div className="hero-fade-item flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none">
            <button
              onClick={() => { setIsCvModalOpen(true); setActiveCvTab('contact'); }}
              className="btn-magnetic bg-gradient-to-r from-gold-amber via-gold to-gold-light hover:brightness-110 text-vide-profond font-bold text-xs sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 shadow-gold-glow w-full sm:w-auto"
            >
              <span className="btn-slide-bg bg-white text-vide-profond"></span>
              <span className="btn-content justify-center">
                <span>Télécharger mon CV & Planifier un échange</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 shrink-0" />
              </span>
            </button>

            <a
              href="#protocole"
              className="btn-magnetic bg-surface-card/80 hover:bg-surface-card text-gold-light border border-gold/30 text-xs sm:text-base px-5 sm:px-6 py-3.5 sm:py-4 backdrop-blur-md shadow-sm w-full sm:w-auto text-center"
            >
              <span className="btn-slide-bg bg-gold/15"></span>
              <span className="btn-content justify-center">
                <span>Explorer le Protocole Clinique</span>
                <ChevronDown className="w-4 h-4 ml-1 shrink-0 text-gold-light" />
              </span>
            </a>
          </div>

          {/* Hero Footnote Stats - Balanced 3 columns with Golden Accents */}
          <div className="hero-fade-item grid grid-cols-3 gap-2 sm:gap-8 pt-8 sm:pt-10 mt-8 sm:mt-10 border-t border-gold/20 w-full max-w-xs sm:max-w-2xl font-mono text-center sm:text-left">
            <div className="p-2 rounded-xl bg-white/[0.02] border border-gold/10 sm:border-0 sm:bg-transparent">
              <div className="text-lg sm:text-2xl font-bold text-gold-light font-sans">100%</div>
              <div className="text-[9px] sm:text-[11px] text-fantome/80 uppercase mt-0.5">Actifs Naturels & Bio</div>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.02] border border-gold/10 sm:border-0 sm:bg-transparent">
              <div className="text-lg sm:text-2xl font-bold text-gold-light font-sans">0%</div>
              <div className="text-[9px] sm:text-[11px] text-fantome/80 uppercase mt-0.5">Sulfates & Silicones</div>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.02] border border-gold/10 sm:border-0 sm:bg-transparent">
              <div className="text-lg sm:text-2xl font-bold text-gold-light font-sans">M.D.</div>
              <div className="text-[9px] sm:text-[11px] text-fantome/80 uppercase mt-0.5">Rigueur Médicale</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* C. FONCTIONNALITÉS — "ARTEFACTS FONCTIONNELS INTERACTIFS" (Centré Mobile & Teintes Dorées) */}
      {/* ========================================================================= */}
      <section id="expertises" className="py-16 sm:py-24 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
        <div className="mb-10 sm:mb-16 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-gold-light uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-gold/15 border border-gold/30">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>03 PILIERS THÉRAPEUTIQUES // MICRO-INTERFACES LOGICIELLES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Les Instruments de Pratique Clinique
          </h2>
          <p className="text-fantome/80 max-w-2xl text-xs sm:text-sm md:text-base mt-2 font-light mx-auto sm:mx-0">
            Trois interfaces logicielles interactives matérialisant l'alliance entre médecine générale, formulation galénique dorée et dermatologie capillaire.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* ------------------------------------------------------------- */}
          {/* CARTE 1 — "MÉLANGEUR DIAGNOSTIQUE" (Argument 1: Soins aux produits naturels) */}
          {/* ------------------------------------------------------------- */}
          <div className="feature-card-anim rounded-[2rem] sm:rounded-[2.5rem] bg-[#0E0E1A] border border-gold/30 hover:border-gold/60 p-5 sm:p-7 shadow-card-dark flex flex-col justify-between relative overflow-hidden transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold shadow-gold-glow">
                    <Leaf className="w-4 h-4 text-gold-light" />
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-gold-light uppercase font-semibold">MÉLANGEUR GALÉNIQUE</span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-gold/15 text-gold-light border border-gold/30">
                  CYCLE 3s ÉLASTIQUE
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Soins aux Actifs Naturels</h3>
              <p className="text-xs text-fantome/80 leading-relaxed mb-6 font-light">
                Formulations thérapeutiques élaborées à partir d'extractions végétales pures et d'huiles médicinales de premier choix.
              </p>

              {/* Stack of 3 cycling cards with elastic bounce */}
              <div className="relative h-64 sm:h-64 w-full">
                {mixerCards.map((card, idx) => {
                  const translateY = idx * 22;
                  const scale = 1 - idx * 0.05;
                  const opacity = 1 - idx * 0.22;
                  const zIndex = 30 - idx * 10;

                  return (
                    <div
                      key={card.id}
                      style={{
                        transform: `translateY(${translateY}px) scale(${scale})`,
                        transition: 'all 0.75s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        zIndex: zIndex,
                        opacity: opacity,
                      }}
                      className={`absolute top-0 left-0 right-0 p-4 rounded-2xl bg-gradient-to-br ${card.color} border border-gold/30 backdrop-blur-xl shadow-lg`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono tracking-widest text-gold-light font-semibold">{card.tag}</span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${card.badgeBg}`}>
                          {card.stat}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white mb-1">{card.title}</h4>
                      <p className="text-[11px] text-fantome/80 leading-snug">{card.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-gold/20 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-fantome/70">
              <span>EXTRACTION VÉGÉTALE 0% TOXIQUE</span>
              <span className="text-gold-light flex items-center gap-1 font-semibold">
                <Check className="w-3.5 h-3.5 text-gold" /> BIO-SOURCÉ
              </span>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* CARTE 2 — "MACHINE À ÉCRIRE TÉLÉMÉTRIE" (Argument 2: Production haute gamme) */}
          {/* ------------------------------------------------------------- */}
          <div className="feature-card-anim rounded-[2rem] sm:rounded-[2.5rem] bg-[#0E0E1A] border border-white/15 hover:border-gold/50 p-5 sm:p-7 shadow-card-dark flex flex-col justify-between relative overflow-hidden transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold shadow-gold-glow">
                    <FlaskConical className="w-4 h-4 text-gold-light" />
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-gold-light uppercase font-semibold">TÉLÉMÉTRIE LABORATOIRE</span>
                </div>
                {/* Live stream pulsating indicator */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/15 border border-gold/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-light animate-ping"></span>
                  <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-gold-light tracking-wider">FLUX EN DIRECT</span>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Production Capillaire Haute Gamme</h3>
              <p className="text-xs text-fantome/80 leading-relaxed mb-6 font-light">
                Contrôle qualité pharmaceutique permanent, flaconnage en verre protecteur et stabilité biométrique des sérums.
              </p>

              {/* Console Typewriter Monitor */}
              <div className="p-4 rounded-2xl bg-black/60 border border-gold/20 font-mono text-xs text-fantome min-h-[185px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] text-fantome/50 pb-2 mb-3 border-b border-white/10">
                    <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-gold-amber"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="ml-2 font-mono text-[10px] text-gold-light/70">SPECTRO_ISO22716.log</span>
                  </div>
                  <p className="text-gold-light/95 text-xs leading-relaxed font-mono">
                    {typewriterText}
                    <span className="inline-block w-2 h-3.5 ml-1 bg-gold align-middle animate-pulse"></span>
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-fantome/60">
                  <span>LOT #EG-9042 // SALLE BLANCHE</span>
                  <span className="text-gold-light font-semibold">99.85% PURETÉ</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gold/20 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-fantome/70">
              <span>NORMES BPF PHARMACEUTIQUES</span>
              <span className="text-gold-light flex items-center gap-1 font-semibold">FLACON AMBRÉ OR ANTI-UV</span>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* CARTE 3 — "PLANIFICATEUR PROTOCOLE CURSEUR" (Argument 3: Médecine dermatologique) */}
          {/* ------------------------------------------------------------- */}
          <div className="feature-card-anim rounded-[2rem] sm:rounded-[2.5rem] bg-[#0E0E1A] border border-white/15 hover:border-gold/50 p-5 sm:p-7 shadow-card-dark flex flex-col justify-between relative overflow-hidden transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold shadow-gold-glow">
                    <Stethoscope className="w-4 h-4 text-gold-light" />
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-gold-light uppercase font-semibold">AGENDA DERMATOLOGIQUE</span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-gold/15 text-gold-light border border-gold/30">
                  AUTOMATION CURSEUR
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Médecine Dermatologique</h3>
              <p className="text-xs text-fantome/80 leading-relaxed mb-6 font-light">
                Diagnostic trichoscopique haute résolution, analyse du sébum et protocoles thérapeutiques personnalisés.
              </p>

              {/* Weekly Interactive Matrix with simulated animated cursor */}
              <div className="relative p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-gold/20 min-h-[185px]">
                {/* Simulated Moving SVG Cursor with Golden Glow */}
                <div
                  className="absolute pointer-events-none z-30 transition-all duration-700 ease-out"
                  style={{
                    left: `${cursorPos.x}%`,
                    top: `${cursorPos.y}%`,
                    transform: `translate(-50%, -50%) ${cursorPos.clicked ? 'scale(0.85)' : 'scale(1)'}`,
                  }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
                    <path
                      d="M5.5 3.5L18.5 10.5L11.5 13.5L8.5 20.5L5.5 3.5Z"
                      fill="#D4AF37"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] sm:text-[11px] font-mono text-fantome/80">CYCLE DE TRAITEMENT SEMAINE</span>
                  <span className="text-[10px] font-mono text-gold-light font-bold">DERMO-ANALYSE HD</span>
                </div>

                {/* Days L M M J V S D */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-4">
                  {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => {
                    const isTarget = selectedDay === i;
                    return (
                      <div
                        key={i}
                        className={`text-center py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-mono font-semibold transition-all duration-300 ${
                          isTarget
                            ? 'bg-gradient-to-br from-gold to-gold-amber text-vide-profond shadow-gold-glow ring-2 ring-white/50 scale-105 font-bold'
                            : 'bg-white/5 text-fantome/70 hover:bg-white/10'
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>

                {/* Save button activated by cursor */}
                <div className="flex justify-between items-center pt-2">
                  <div className="text-[10px] sm:text-[11px] text-fantome/80 font-mono truncate mr-2">
                    {selectedDay === 2 ? 'Mercredi: Trichoscopie HD' : 'Sélectionnez un protocole'}
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-bold transition-all duration-300 shrink-0 ${
                      plannerSaved
                        ? 'bg-gold-light text-vide-profond scale-105 shadow-gold-glow'
                        : 'bg-white/10 text-fantome'
                    }`}
                  >
                    {plannerSaved ? '✓ Enregistré' : 'Sauvegarder'}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gold/20 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-fantome/70">
              <span>BILAN ANNUEL CUIR CHEVELU</span>
              <span className="text-gold-light flex items-center gap-1 font-semibold">DOCTORAT EN MÉDECINE</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* D. PHILOSOPHIE — "LE MANIFESTE" (Centré Mobile & Titres Dorés) */}
      {/* ========================================================================= */}
      <section
        id="philosophie"
        ref={philosophyRef}
        className="relative py-20 sm:py-32 px-4 sm:px-8 md:px-16 bg-vide-profond overflow-hidden border-y border-gold/30"
      >
        {/* Parallax Organic Bioluminescent Texture behind text */}
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80"
            alt="Microscopie cellulaire végétale et bioluminescence"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-vide-profond/85 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center sm:text-left">
          <div className="manifesto-text-part inline-flex items-center gap-2 font-mono text-xs text-gold-light uppercase tracking-widest mb-6 sm:mb-8 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40">
            <Award className="w-3.5 h-3.5 text-gold" />
            <span>LE MANIFESTE MÉDICAL // RUPTURE AVEC L'INDUSTRIE DU MIRACLE</span>
          </div>

          {/* Statement 1: Neutral, smaller */}
          <p className="manifesto-text-part text-base sm:text-xl md:text-2xl font-light text-fantome/70 mb-6 sm:mb-8 max-w-3xl leading-relaxed mx-auto sm:mx-0">
            La plupart des approches capillaires se concentrent sur :{' '}
            <span className="text-fantome/95 underline decoration-gold/40 underline-offset-4 font-normal">
              les masquages cosmétiques de surface, les silicones occlusifs et les promesses marketing éphémères.
            </span>
          </p>

          {/* Statement 2: Massive Dramatic Serif Italic with Accent Gold colored words */}
          <h2 className="manifesto-text-part font-serif italic text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-[1.12] sm:leading-[1.08] tracking-tight">
            Nous nous concentrons sur :{' '}
            <span className="text-gold-gradient underline decoration-gold/60 underline-offset-8">
              la régénération cellulaire profonde
            </span>
            , la rigueur clinique du diagnostic et la{' '}
            <span className="text-gold-light">puissance pure</span> des actifs naturels dorés.
          </h2>

          <div className="manifesto-text-part mt-10 sm:mt-12 flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8 text-xs font-mono text-fantome/80 pt-8 border-t border-gold/20">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>SANS PERTURBATEURS ENDOCRINIENS</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>VALIDATION EN MICROSCOPIE CLINIQUE</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-light" />
              <span>FORMULATION GALÉNIQUE HAUTE COUTURE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* E. PROTOCOLE — "ARCHIVE EMPILÉE STICKY" (Adaptée Mobile & Desktop) */}
      {/* ========================================================================= */}
      <section
        id="protocole"
        ref={protocolContainerRef}
        className="relative py-16 md:py-0 md:h-screen w-full overflow-hidden bg-vide-profond flex items-center justify-center px-4 sm:px-6"
      >
        {/* On Mobile: Natural responsive stack of cards / On Desktop: Pinned Sticky GSAP Stack */}
        <div className="relative w-full max-w-5xl md:h-[80vh] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">

          {/* ----------------------------------------------------------------- */}
          {/* PROTOCOL CARD 1: Step 01 */}
          {/* ----------------------------------------------------------------- */}
          <div
            ref={el => stickyCardsRef.current[0] = el}
            className="w-full md:absolute md:inset-0 md:h-full rounded-[2rem] sm:rounded-[3rem] bg-[#0E0E1A] border border-gold/40 p-6 sm:p-10 md:p-14 flex flex-col justify-between shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs sm:text-sm tracking-widest text-gold-light uppercase font-bold">ÉTAPE // 01</span>
                <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mt-1">
                  Anamnèse Médicale & Trichoscopie Numérisée
                </h3>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-mono font-bold shrink-0 ml-3 shadow-gold-glow">
                01
              </div>
            </div>

            {/* Unique SVG Animation 1: Rotating Geometric DNA Double Helix with Gold accents */}
            <div className="my-auto py-6 sm:py-8 flex flex-col items-center justify-center">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
                <svg className="w-full h-full animate-spin" style={{ animationDuration: '22s' }} viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(212, 175, 55, 0.25)" strokeWidth="1.5" strokeDasharray="6 6" />
                  <circle cx="60" cy="60" r="36" fill="none" stroke="rgba(246, 226, 122, 0.4)" strokeWidth="2" />
                  <ellipse cx="60" cy="60" rx="48" ry="18" fill="none" stroke="#D4AF37" strokeWidth="2" transform="rotate(45 60 60)" />
                  <ellipse cx="60" cy="60" rx="48" ry="18" fill="none" stroke="#7B61FF" strokeWidth="2" transform="rotate(-45 60 60)" />
                  <circle cx="60" cy="60" r="8" fill="#F6E27A" />
                </svg>
                <div className="absolute text-center">
                  <div className="text-xs font-mono text-gold-light font-bold">ZOOM x150</div>
                  <div className="text-[10px] font-mono text-fantome/60">FOLLICULE HD</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gold/20">
              <p className="text-xs sm:text-sm md:text-base text-fantome/85 max-w-xl font-light">
                Examen clinique approfondi des antécédents médicaux, bilan hormonal et cartographie microscopique de la densité et de l'état du cuir chevelu.
              </p>
              <span className="font-mono text-[10px] sm:text-xs text-gold-light font-semibold shrink-0">DIAGNOSTIC DERMATOLOGIQUE CERTIFIÉ</span>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* PROTOCOL CARD 2: Step 02 */}
          {/* ----------------------------------------------------------------- */}
          <div
            ref={el => stickyCardsRef.current[1] = el}
            className="w-full md:absolute md:inset-0 md:h-full rounded-[2rem] sm:rounded-[3rem] bg-[#121224] border border-gold/40 p-6 sm:p-10 md:p-14 flex flex-col justify-between shadow-2xl overflow-hidden md:translate-y-full md:opacity-0"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs sm:text-sm tracking-widest text-gold-light uppercase font-bold">ÉTAPE // 02</span>
                <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mt-1">
                  Formulation Galénique Dorée Sur-Mesure
                </h3>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-mono font-bold shrink-0 ml-3 shadow-gold-glow">
                02
              </div>
            </div>

            {/* Unique SVG Animation 2: Horizontal Laser Scanning Line over Dot Grid with Gold Laser */}
            <div className="my-auto py-6 sm:py-8 flex flex-col items-center justify-center">
              <div className="relative w-64 sm:w-72 h-36 sm:h-44 rounded-2xl bg-black/60 border border-gold/30 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-grid-pattern opacity-60"></div>
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-gold-light to-transparent animate-pulse shadow-gold-glow"></div>
                <div className="relative z-10 text-center font-mono">
                  <div className="text-xs text-gold-light uppercase font-bold">CALCUL DE VISCOSITÉ & PH</div>
                  <div className="text-lg sm:text-xl text-white font-mono mt-1">PH 5.42 // CO2 GOLD EXTRACT</div>
                  <div className="text-[10px] text-emerald-400 mt-1">STERILITY SPECIFICATION 100% OK</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gold/20">
              <p className="text-xs sm:text-sm md:text-base text-fantome/85 max-w-xl font-light">
                Assemblage d'actifs botaniques purs, d'huiles médicinales rares et de peptides bio-sourcés calibrés précisément selon votre profil biologique.
              </p>
              <span className="font-mono text-[10px] sm:text-xs text-gold-light font-semibold shrink-0">LABORATOIRE PROPRE CONFORME BPF</span>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* PROTOCOL CARD 3: Step 03 */}
          {/* ----------------------------------------------------------------- */}
          <div
            ref={el => stickyCardsRef.current[2] = el}
            className="w-full md:absolute md:inset-0 md:h-full rounded-[2rem] sm:rounded-[3rem] bg-[#16162E] border border-gold/50 p-6 sm:p-10 md:p-14 flex flex-col justify-between shadow-2xl overflow-hidden md:translate-y-full md:opacity-0"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs sm:text-sm tracking-widest text-gold-light uppercase font-bold">ÉTAPE // 03</span>
                <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mt-1">
                  Suivi Clinique Évolutif & Régénération
                </h3>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gold/30 border border-gold/50 flex items-center justify-center text-gold-light font-mono font-bold shrink-0 ml-3 shadow-gold-glow">
                03
              </div>
            </div>

            {/* Unique SVG Animation 3: Pulsing ECG Waveform with Golden Stroke */}
            <div className="my-auto py-6 sm:py-8 flex flex-col items-center justify-center">
              <div className="w-72 sm:w-80 h-24 sm:h-28 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 300 100" fill="none">
                  <path
                    d="M 10 50 L 70 50 L 90 20 L 110 80 L 130 35 L 145 60 L 160 50 L 290 50"
                    stroke="#D4AF37"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-pulse"
                    style={{ strokeDasharray: 400, animationDuration: '2.5s' }}
                  />
                  <path
                    d="M 10 50 L 70 50 L 90 20 L 110 80 L 130 35 L 145 60 L 160 50 L 290 50"
                    stroke="#F6E27A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.8"
                  />
                </svg>
              </div>
              <div className="font-mono text-[10px] sm:text-xs text-gold-light/90 mt-2 text-center">
                BIO-IMPÉDANCE FOLLICULAIRE : CYCLE ANAGÈNE RÉACTIVÉ
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gold/20">
              <p className="text-xs sm:text-sm md:text-base text-fantome/85 max-w-xl font-light">
                Contrôle mensuel photographique et microscopique. Ajustement des sérums en fonction de la repousse et de la vitalité de la fibre capillaire.
              </p>
              <span className="font-mono text-[10px] sm:text-xs text-gold-light font-semibold shrink-0">MÉDECINE PRÉVENTIVE & CURATIVE</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* F. ADHÉSION / TARIFICATION & PARCOURS DE SOIN (Ressort avec Or & Centré Mobile) */}
      {/* ========================================================================= */}
      <section id="tarifs" className="py-20 sm:py-28 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-gold-light uppercase tracking-widest mb-3 px-3 py-1 rounded-full bg-gold/15 border border-gold/30">
            <Activity className="w-3.5 h-3.5 text-gold" />
            <span>MODALITÉS DE PRISE EN CHARGE MÉDICALE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Consultations & Protocoles Sur-Mesure
          </h2>
          <p className="text-fantome/80 text-xs sm:text-sm md:text-base mt-3 font-light">
            Une prise en charge médicale d'exception, alliant expertise clinique rigoureuse et fabrication artisanale de vos soins capillaires aux extraits dorés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* Card 1: Essentiel */}
          <div className="rounded-[2rem] sm:rounded-[2.5rem] bg-[#0E0E1A] border border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-card-dark transition-all hover:-translate-y-1">
            <div>
              <div className="text-xs font-mono text-gold-light uppercase tracking-wider mb-2 font-semibold">PHASE 01 // DÉCOUVERTE</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Bilan Trichologique</h3>
              <p className="text-xs text-fantome/70 mb-6 font-light">
                Consultation clinique initiale avec diagnostic microscopique du cuir chevelu.
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">120 €</span>
                <span className="text-xs text-fantome/60 font-mono">/ séance 45 min</span>
              </div>

              <ul className="space-y-3 text-xs text-fantome/85 border-t border-white/10 pt-6">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Anamnèse médicale & antécédents complets</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Trichoscopie numérisée haute résolution</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Évaluation du microbiome & sébum</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Ordonnance de routine naturelle initiale</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => { setIsCvModalOpen(true); setActiveCvTab('contact'); }}
              className="mt-8 btn-magnetic w-full py-3.5 bg-white/10 hover:bg-gold/20 text-white text-xs font-semibold rounded-full border border-white/15 hover:border-gold/40 transition-colors"
            >
              <span className="btn-slide-bg bg-gold text-vide-profond"></span>
              <span className="btn-content justify-center">Réserver ce Bilan</span>
            </button>
          </div>

          {/* Card 2: Performance / Featured (Glow Doré & Plasma, Recommandé) */}
          <div className="rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-b from-[#261E10] via-[#1E1738] to-[#0E0E1A] border-2 border-gold p-6 sm:p-8 flex flex-col justify-between shadow-gold-glow relative md:scale-105 z-20">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold-amber via-gold to-gold-light text-vide-profond text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase shadow-lg whitespace-nowrap">
              ★ PROTOCOLE SIGNATURE RECOMMANDÉ
            </div>

            <div>
              <div className="text-xs font-mono text-gold-light uppercase tracking-wider mb-2 mt-2 font-bold">CURE COMPLÈTE // 90 JOURS</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Protocole Haute Gamme</h3>
              <p className="text-xs text-fantome/85 mb-6 font-light">
                Consultation médicale approfondie + Création personnalisée de votre gamme de produits naturels dorés.
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl sm:text-4xl font-extrabold text-gold-light">380 €</span>
                <span className="text-xs text-gold-champagne font-mono">/ cure complète</span>
              </div>

              <ul className="space-y-3 text-xs text-fantome border-t border-gold/30 pt-6">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-light shrink-0" />
                  <span className="font-semibold text-white">Diagnostic trichologique & bilan biologique</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-light shrink-0" />
                  <span className="font-semibold text-white">2 Flacons de sérum d'actifs purs sur-mesure</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-light shrink-0" />
                  <span>1 Shampoing traitant galénique sans sulfate</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-light shrink-0" />
                  <span>Suivi photographique d'évolution à J+30 et J+60</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-light shrink-0" />
                  <span className="text-gold-light font-semibold">Ligne directe avec le Dr. Élodie GBEDJI</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => { setIsCvModalOpen(true); setActiveCvTab('contact'); }}
              className="mt-8 btn-magnetic w-full py-4 bg-gradient-to-r from-gold-amber via-gold to-gold-light text-vide-profond text-xs font-extrabold rounded-full shadow-gold-glow"
            >
              <span className="btn-slide-bg bg-white text-vide-profond"></span>
              <span className="btn-content justify-center">Initier mon Protocole Signature</span>
            </button>
          </div>

          {/* Card 3: Entreprise / Accompagnement Annuel */}
          <div className="rounded-[2rem] sm:rounded-[2.5rem] bg-[#0E0E1A] border border-white/15 p-6 sm:p-8 flex flex-col justify-between shadow-card-dark transition-all hover:-translate-y-1">
            <div>
              <div className="text-xs font-mono text-gold-light uppercase tracking-wider mb-2 font-semibold">SUIVI DERMATOLOGIQUE CONTINU</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Suivi Annuel Privé</h3>
              <p className="text-xs text-fantome/70 mb-6 font-light">
                Prise en charge intégrale pour alopécies complexes, dermatites ou soins pré-greffe.
              </p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">950 €</span>
                <span className="text-xs text-fantome/60 font-mono">/ an</span>
              </div>

              <ul className="space-y-3 text-xs text-fantome/85 border-t border-white/10 pt-6">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>4 Consultations complètes trimestrielles</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Dotation annuelle complète de soins galéniques</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Reformulations adaptées aux saisons</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Support prioritaire et conseils sur-mesure</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => { setIsCvModalOpen(true); setActiveCvTab('contact'); }}
              className="mt-8 btn-magnetic w-full py-3.5 bg-white/10 hover:bg-gold/20 text-white text-xs font-semibold rounded-full border border-white/15 hover:border-gold/40 transition-colors"
            >
              <span className="btn-slide-bg bg-gold text-vide-profond"></span>
              <span className="btn-content justify-center">Candidater pour le Suivi Privé</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION CTA BANNER AVANT LE FOOTER */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 md:px-16 max-w-7xl mx-auto">
        <div className="relative rounded-[2rem] sm:rounded-[3rem] bg-gradient-to-r from-[#141424] via-[#241A30] to-[#1C1710] border border-gold/40 p-6 sm:p-12 md:p-16 overflow-hidden shadow-gold-glow flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 text-center lg:text-left">
          <div className="relative z-10 max-w-2xl">
            <span className="font-mono text-xs text-gold-light uppercase tracking-widest font-semibold">COLLABORATION MÉDICALE & CONSULTATION</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mt-2">
              Prêt à redéfinir la santé de votre cuir chevelu ?
            </h2>
            <p className="text-fantome/85 text-xs sm:text-sm md:text-base mt-3 sm:mt-4 font-light">
              Téléchargez le curriculum vitae complet du Dr. Élodie GBEDJI ou planifiez directement un échange d'évaluation clinique.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => { setIsCvModalOpen(true); setActiveCvTab('cv'); }}
              className="btn-magnetic bg-gradient-to-r from-gold-amber via-gold to-gold-light text-vide-profond text-xs sm:text-sm font-bold px-6 sm:px-8 py-3.5 sm:py-4 shadow-gold-glow w-full sm:w-auto"
            >
              <span className="btn-slide-bg bg-white text-vide-profond"></span>
              <span className="btn-content justify-center">
                <Download className="w-4 h-4 text-vide-profond" />
                <span>Télécharger mon CV</span>
              </span>
            </button>
            <button
              onClick={() => { setIsCvModalOpen(true); setActiveCvTab('contact'); }}
              className="btn-magnetic bg-white/10 text-white text-xs sm:text-sm font-semibold px-6 sm:px-8 py-3.5 sm:py-4 border border-gold/30 hover:border-gold/60 w-full sm:w-auto"
            >
              <span className="btn-slide-bg bg-gold text-vide-profond"></span>
              <span className="btn-content justify-center">
                <Calendar className="w-4 h-4 text-gold-light" />
                <span>Planifier un échange</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* G. PIED DE PAGE (Centré Mobile & Teintes Dorées) */}
      {/* ========================================================================= */}
      <footer className="bg-[#05050A] text-fantome rounded-t-[2.5rem] sm:rounded-t-[4rem] border-t border-gold/30 pt-16 sm:pt-20 pb-12 px-4 sm:px-8 md:px-16 text-center sm:text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Brand Col */}
          <div className="md:col-span-2 flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold shadow-gold-glow">
                <Dna className="w-5 h-5 text-gold-light" />
              </div>
              <div className="text-left">
                <span className="text-lg font-bold text-white tracking-tight block">Dr. Élodie GBEDJI</span>
                <p className="text-xs font-mono text-gold-light">MÉDECIN GÉNÉRALISTE & SPÉCIALISTE CAPILLAIRE</p>
              </div>
            </div>
            <p className="text-xs text-fantome/70 max-w-md leading-relaxed font-light mb-6">
              Rigueur diagnostique de la médecine générale, expertise dermatologique avancée et formulation sur-mesure de soins capillaires naturels aux extraits nobles dorés.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-xs font-mono text-fantome/70">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gold" /> Cabinet & Lab Clinique</span>
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gold-light" /> contact@drelodiegbedji.com</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="text-xs font-mono text-gold-light uppercase tracking-widest mb-4 font-bold">EXPLORATION</div>
            <ul className="space-y-2.5 text-xs text-fantome/80 font-mono">
              <li><a href="#hero" className="interactive-lift block hover:text-gold-light">ACCUEIL</a></li>
              <li><a href="#philosophie" className="interactive-lift block hover:text-gold-light">MANIFESTE CLINIQUE</a></li>
              <li><a href="#expertises" className="interactive-lift block hover:text-gold-light">MICRO-INTERFACES</a></li>
              <li><a href="#protocole" className="interactive-lift block hover:text-gold-light">ARCHIVE PROTOCOLE</a></li>
              <li><a href="#tarifs" className="interactive-lift block hover:text-gold-light">HONORAIRES & CURES</a></li>
            </ul>
          </div>

          {/* Clinical Integrity & Legal */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="text-xs font-mono text-gold-light uppercase tracking-widest mb-4 font-bold">ENGAGEMENT ÉTHIQUE</div>
            <ul className="space-y-2.5 text-xs text-fantome/70 font-mono">
              <li><span className="block text-fantome/95 font-semibold">ORDRE DES MÉDECINS</span></li>
              <li><span className="block">CODE DE DÉONTOLOGIE MÉDICALE</span></li>
              <li><span className="block">BPF COSMÉTIQUES ISO 22716</span></li>
              <li><span className="block">PROTECTION DES DONNÉES DE SANTÉ</span></li>
              <li><span className="block">MENTIONS LÉGALES & PRIVACY</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with System Operational Status */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-fantome/60 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-400 font-semibold tracking-wider">
              SYSTÈME OPÉRATIONNEL // CABINET & LABORATOIRE GALÉNIQUE EN LIGNE
            </span>
          </div>
          <div>
            © {new Date().getFullYear()} Dr. Élodie GBEDJI. Tous droits réservés.
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* MODAL CINÉMATIQUE INTERACTIF : CV COMPLET & PLANIFICATION D'ÉCHANGE */}
      {/* ========================================================================= */}
      {isCvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-4xl rounded-[2rem] sm:rounded-[2.5rem] bg-[#0C0C18] border border-gold/40 shadow-gold-glow p-5 sm:p-10 my-6 max-h-[92vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setIsCvModalOpen(false)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-gold/20 text-fantome flex items-center justify-center transition-colors border border-white/15"
              aria-label="Fermer la modal"
            >
              <X className="w-5 h-5 text-gold-light" />
            </button>

            {/* Modal Header & Tabs */}
            <div className="mb-6 sm:mb-8 pr-8 sm:pr-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold-light font-mono text-xs mb-3">
                <Dna className="w-3.5 h-3.5 text-gold" />
                <span>DOSSIER PROFESSIONNEL CERTIFIÉ</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Dr. Élodie GBEDJI
              </h2>
              <p className="text-xs sm:text-sm font-mono text-gold-champagne/90 mt-1">
                Médecin Généraliste • Spécialiste en Soins Capillaires & Formulation Galénique
              </p>

              {/* Tab Switcher */}
              <div className="flex flex-wrap gap-2 mt-5 sm:mt-6 border-b border-white/10 pb-4">
                <button
                  onClick={() => setActiveCvTab('cv')}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-mono transition-all ${
                    activeCvTab === 'cv'
                      ? 'bg-gradient-to-r from-gold to-gold-amber text-vide-profond font-bold shadow-gold-glow'
                      : 'bg-white/5 text-fantome/70 hover:bg-white/10'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 inline mr-1.5" />
                  Curriculum Vitae Détaillé
                </button>
                <button
                  onClick={() => setActiveCvTab('contact')}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-mono transition-all ${
                    activeCvTab === 'contact'
                      ? 'bg-gradient-to-r from-gold to-gold-amber text-vide-profond font-bold shadow-gold-glow'
                      : 'bg-white/5 text-fantome/70 hover:bg-white/10'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 inline mr-1.5" />
                  Planifier un Échange
                </button>
              </div>
            </div>

            {/* TAB 1: FULL CURRICULUM VITAE */}
            {activeCvTab === 'cv' && (
              <div className="space-y-6 sm:space-y-8 animate-fade-in text-fantome">
                
                {/* Print / Download Quick Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 p-4 rounded-2xl bg-surface-card border border-gold/30">
                  <div className="text-xs font-mono text-fantome/85 text-center sm:text-left">
                    <span className="text-gold-light font-bold">FORMAT :</span> DOCUMENT MÉDICAL OFFICIEL A4 PRÊT POUR L'IMPRESSION
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="btn-magnetic px-4 py-2.5 bg-gradient-to-r from-gold-amber via-gold to-gold-light text-vide-profond text-xs font-bold rounded-full shadow-gold-glow flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-vide-profond" />
                    <span>Imprimer / Sauvegarder en PDF</span>
                  </button>
                </div>

                {/* Section 1: Formations & Diplômes */}
                <div>
                  <h4 className="text-xs sm:text-sm font-mono text-gold-light uppercase tracking-widest flex items-center gap-2 mb-4 font-bold">
                    <Award className="w-4 h-4 text-gold" />
                    <span>FORMATIONS & TITRES UNIVERSITAIRES</span>
                  </h4>
                  <div className="space-y-3.5">
                    <div className="p-4 rounded-2xl bg-white/5 border border-gold/20">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1">
                        <h5 className="text-sm font-bold text-white">Doctorat d'État en Médecine Générale</h5>
                        <span className="text-xs font-mono text-gold-light font-semibold">FACULTÉ DE MÉDECINE</span>
                      </div>
                      <p className="text-xs text-fantome/75 mt-1">
                        Thèse d'exercice avec mention très honorable. Fondements cliniques, physiopathologie humaine et pharmacologie.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-gold/20">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1">
                        <h5 className="text-sm font-bold text-white">Diplôme Universitaire de Trichologie & Pathologies du Cuir Chevelu</h5>
                        <span className="text-xs font-mono text-emerald-400 font-semibold">SPÉCIALISATION</span>
                      </div>
                      <p className="text-xs text-fantome/75 mt-1">
                        Diagnostic microscopique des alopécies androgénétiques, pelades, effluvium télogène et dermatites séborrhéiques.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-gold/20">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-1">
                        <h5 className="text-sm font-bold text-white">Certification en Cosmétologie Galénique & Phytothérapie Médicale</h5>
                        <span className="text-xs font-mono text-gold-light font-semibold">EXPERTISE BIO & OR</span>
                      </div>
                      <p className="text-xs text-fantome/75 mt-1">
                        Formulation d'émulsions, macérâts huileux à froid, aromathérapie scientifique et innocuité dermatologique.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Expériences Professionnelles & Pratique Clinique */}
                <div>
                  <h4 className="text-xs sm:text-sm font-mono text-gold-light uppercase tracking-widest flex items-center gap-2 mb-4 font-bold">
                    <Stethoscope className="w-4 h-4 text-gold" />
                    <span>PARCOURS PROFESSIONNEL & CLINIQUE</span>
                  </h4>
                  <div className="space-y-3.5">
                    <div className="p-4 rounded-2xl bg-white/5 border border-gold/20">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="text-sm font-bold text-white">Médecin Fondateur — Cabinet de Trichologie & Soins Capillaires</h5>
                          <p className="text-xs font-mono text-gold-champagne/80">2021 — AUJOURD'HUI</p>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          ACTIF
                        </span>
                      </div>
                      <ul className="text-xs text-fantome/85 mt-2 space-y-1 list-disc list-inside">
                        <li>Prise en charge de plus de 1 200 patients pour des troubles alopéciques et altérations de la tige pilaire.</li>
                        <li>Mise au point d'une ligne de 6 formules capillaires haute performance 100% exemptes de produits toxiques.</li>
                        <li>Analyse trichoscopique informatisée et suivi d'évolution photographique à haute résolution.</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-gold/20">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="text-sm font-bold text-white">Médecin Praticien — Médecine Générale & Urgences</h5>
                          <p className="text-xs font-mono text-gold-champagne/80">CENTRE HOSPITALIER UNIVERSITAIRE</p>
                        </div>
                      </div>
                      <p className="text-xs text-fantome/75 mt-2">
                        Diagnostics différentiels complexes, bilans métaboliques, gestion des pathologies systémiques à retentissement cutané et capillaire.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 3: Compétences Clés */}
                <div>
                  <h4 className="text-xs sm:text-sm font-mono text-gold-light uppercase tracking-widest flex items-center gap-2 mb-4 font-bold">
                    <Leaf className="w-4 h-4 text-gold" />
                    <span>COMPÉTENCES CLINIQUES & SCIENTIFIQUES</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 font-mono text-xs">
                    <div className="p-3 rounded-xl bg-surface-card border border-gold/25">
                      <span className="text-gold-light block font-bold mb-0.5">Trichoscopie HD</span>
                      <span className="text-[11px] text-fantome/70">Dermoscopie du cuir chevelu</span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-card border border-gold/25">
                      <span className="text-gold-light block font-bold mb-0.5">Galénique Naturelle</span>
                      <span className="text-[11px] text-fantome/70">Extractions pures & stabilité</span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-card border border-gold/25">
                      <span className="text-gold-light block font-bold mb-0.5">Dermatologie</span>
                      <span className="text-[11px] text-fantome/70">Microbiome & séborrhée</span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-card border border-gold/25">
                      <span className="text-gold-light block font-bold mb-0.5">Phytothérapie</span>
                      <span className="text-[11px] text-fantome/70">Actifs bio-disponibles</span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-card border border-gold/25">
                      <span className="text-gold-light block font-bold mb-0.5">Bilans Hormonaux</span>
                      <span className="text-[11px] text-fantome/70">Dépistage carences & fer</span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-card border border-gold/25">
                      <span className="text-gold-light block font-bold mb-0.5">Éthique Médicale</span>
                      <span className="text-[11px] text-fantome/70">Primum non nocere</span>
                    </div>
                  </div>
                </div>

                {/* Modal Bottom Action */}
                <div className="pt-4 border-t border-gold/20 flex justify-end">
                  <button
                    onClick={() => setActiveCvTab('contact')}
                    className="btn-magnetic w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-gold-amber via-gold to-gold-light text-vide-profond text-xs font-bold rounded-full shadow-gold-glow"
                  >
                    <span className="btn-slide-bg bg-white text-vide-profond"></span>
                    <span className="btn-content justify-center">Planifier un échange maintenant →</span>
                  </button>
                </div>

              </div>
            )}

            {/* TAB 2: INTERACTIVE APPOINTMENT / EXCHANGE FORM */}
            {activeCvTab === 'contact' && (
              <div className="animate-fade-in">
                {exchangeFormSubmitted ? (
                  <div className="py-10 px-4 sm:px-6 rounded-3xl bg-surface-card border border-gold/40 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Demande Transmise avec Succès</h3>
                    <p className="text-xs sm:text-sm text-fantome/85 max-w-md mx-auto leading-relaxed mb-6">
                      Merci pour votre confiance. Le Dr. Élodie GBEDJI et son secrétariat médical vous contacteront sous 24h ouvrées pour confirmer votre créneau.
                    </p>
                    <div className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/30 font-mono text-xs text-gold-light">
                      DOSSIER PATIENT TEMPORAIRE: #EG-{Math.floor(100000 + Math.random() * 900000)}
                    </div>
                    <div className="mt-8">
                      <button
                        onClick={() => { setExchangeFormSubmitted(false); setIsCvModalOpen(false); }}
                        className="btn-magnetic px-6 py-2.5 bg-gradient-to-r from-gold to-gold-amber text-vide-profond text-xs font-bold rounded-full shadow-gold-glow"
                      >
                        <span className="btn-slide-bg bg-white text-vide-profond"></span>
                        <span className="btn-content">Retour au site</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <p className="text-xs text-fantome/80 leading-relaxed font-light mb-4 text-center sm:text-left">
                      Remplissez ce formulaire pour solliciter une consultation clinique, une formulation sur-mesure ou une collaboration médicale avec le Dr. Élodie GBEDJI.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs font-mono text-gold-light mb-1.5">Nom et Prénom *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ex: Clara Dupont"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-fantome/30 text-xs focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-gold-light mb-1.5">Adresse Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="Ex: clara.dupont@email.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-fantome/30 text-xs focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs font-mono text-gold-light mb-1.5">Téléphone *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+33 6 12 34 56 78"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-fantome/30 text-xs focus:outline-none focus:border-gold transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-gold-light mb-1.5">Objet de la demande *</label>
                        <select
                          value={formData.motive}
                          onChange={(e) => setFormData({ ...formData, motive: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#121224] border border-white/15 text-white text-xs focus:outline-none focus:border-gold transition-colors"
                        >
                          <option value="Consultation Trichologie & Diagnostic">Bilan Trichologique & Diagnostic</option>
                          <option value="Protocole Signature & Produits Galéniques">Protocole Signature & Soins sur-mesure</option>
                          <option value="Suivi Annuel Privé">Suivi Annuel Privé</option>
                          <option value="Collaboration Médicale / Laboratoire">Collaboration Médicale / Scientifique</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gold-light mb-1.5">Description de votre besoin ou motif clinique</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Précisez la nature de vos cheveux, éventuelle chute observée, antécédents ou questions..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-fantome/30 text-xs focus:outline-none focus:border-gold transition-colors"
                      ></textarea>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gold/20">
                      <div className="text-[10px] sm:text-[11px] font-mono text-fantome/60 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>CONFIDENTIALITÉ MÉDICALE STRICTE</span>
                      </div>
                      <button
                        type="submit"
                        className="btn-magnetic w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-gold-amber via-gold to-gold-light text-vide-profond text-xs font-bold rounded-full shadow-gold-glow"
                      >
                        <span className="btn-slide-bg bg-white text-vide-profond"></span>
                        <span className="btn-content justify-center">Envoyer ma Demande</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
