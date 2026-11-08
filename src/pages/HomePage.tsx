import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Sparkles, Compass } from 'lucide-react';
import { FRAGRANCES, HERO_CAP_IMAGE, DISCOVERY_COFFRET } from '../data/fragrances';
import { DropletCanvas } from '../components/DropletCanvas';
import { DualBottleTransition } from '../components/DualBottleTransition';
import { useCart } from '../context/CartContext';

interface HomePageProps {
  onSelectFragrance: (fragranceId: string) => void;
  onNavigateToCollection: () => void;
  onOpenQuiz: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectFragrance,
  onNavigateToCollection,
  onOpenQuiz
}) => {
  const { addToCart } = useCart();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const springFragrance = FRAGRANCES.find(f => f.season === 'Spring')!;
  const summerFragrance = FRAGRANCES.find(f => f.season === 'Summer')!;
  const autumnFragrance = FRAGRANCES.find(f => f.season === 'Autumn')!;
  const winterFragrance = FRAGRANCES.find(f => f.season === 'Winter')!;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative bg-[#070709] text-neutral-100 overflow-hidden">
      
      {/* Floating Timeline Quick-Scroller on Desktop Right */}
      <nav
        aria-label="Seasonal timeline navigation"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-5 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-2xl"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-mono -rotate-90 my-2 pointer-events-none">
          Timeline
        </span>
        {[
          { label: 'Hero', target: 'hero-section', color: '#ffffff' },
          { label: 'Spring', target: 'spring-section', color: springFragrance.accentColor },
          { label: 'Summer', target: 'summer-section', color: summerFragrance.accentColor },
          { label: 'Autumn', target: 'autumn-section', color: autumnFragrance.accentColor },
          { label: 'Winter', target: 'winter-section', color: winterFragrance.accentColor }
        ].map(item => (
          <button
            key={item.label}
            onClick={() => scrollToSection(item.target)}
            className="group relative flex items-center justify-center p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-full"
            aria-label={`Jump to ${item.label} section`}
          >
            <div
              className="w-2 h-2 rounded-full bg-white/20 group-hover:scale-150 transition-all duration-300"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.25)'
              }}
            />
            <span className="absolute right-7 px-2.5 py-1 rounded bg-black/90 border border-white/10 text-[10px] uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-sans shadow-lg">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* ============================================================== */}
      {/* 1. HERO SECTION: Volumetric Rays, Metallic Engraved Cap, Void */}
      {/* ============================================================== */}
      <section
        id="hero-section"
        aria-labelledby="hero-main-title"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 pt-24 pb-16 bg-black overflow-hidden"
      >
        {/* Dynamic volumetric lighting beam effect behind the cap */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-200/10 via-amber-400/5 to-transparent blur-[140px] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-emerald-500/5 via-transparent to-transparent blur-[120px] pointer-events-none" aria-hidden="true" />

        {/* Ambient subtle star/dust grain */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-60" aria-hidden="true" />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-neutral-400 mb-6 font-sans"
          >
            <span>Haute Parfumerie</span>
            <span aria-hidden="true">·</span>
            <span>Grasse, France</span>
          </motion.div>

          <motion.h1
            id="hero-main-title"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-white max-w-4xl text-balance"
          >
            Quatréa
            <span className="block text-2xl sm:text-4xl md:text-5xl font-serif italic text-neutral-300 mt-2 font-light">
              The Elements of Time
            </span>
          </motion.h1>

          {/* Dramatic Top-Down Metallic Engraved Cap Visual with Volumetric Rays */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative my-10 sm:my-14 w-full max-w-2xl aspect-[16/9] rounded-3xl overflow-hidden border border-white/15 shadow-[0_0_80px_rgba(0,0,0,0.95)] group m-0"
          >
            <img
              src={HERO_CAP_IMAGE}
              alt="Quatréa heavy titanium and brushed gold flacon cap engraved with minimalist 'Q' insignia"
              width={1280}
              height={720}
              fetchPriority="high"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Dramatic radial vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40 pointer-events-none" aria-hidden="true" />

            {/* Micro-label over cap */}
            <figcaption className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-neutral-300 text-xs">
              <span className="font-mono tracking-widest text-[11px] text-neutral-400 uppercase">
                Anodized Titanium · 24k Gold Inlay
              </span>
              <span className="font-serif italic text-amber-200">
                Four Solstices · Four Alchemies
              </span>
            </figcaption>
          </motion.figure>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.45 }}
            className="max-w-xl text-neutral-400 text-sm sm:text-base leading-relaxed font-sans mb-8 text-balance"
          >
            A cinematic timeline of the turning seasons. From rain-soaked vernal moss to sub-zero midnight crystal oud, explore pure extraits de parfum crafted at the boundary of nature and eternity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => scrollToSection('spring-section')}
              className="px-8 py-3.5 rounded-full bg-white text-neutral-950 font-medium text-xs uppercase tracking-[0.2em] hover:bg-neutral-200 transition-all flex items-center gap-2.5 shadow-xl shadow-white/5 active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span>Begin Seasonal Journey</span>
              <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
            </button>

            <button
              onClick={onNavigateToCollection}
              className="px-7 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white transition-all text-xs uppercase tracking-[0.2em] backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              View Full Collection
            </button>
          </motion.div>

          {/* Down Indicator */}
          <div className="mt-16 flex flex-col items-center gap-2 opacity-60 animate-bounce pointer-events-none">
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono">
              Scroll to Descend
            </span>
            <ArrowDown className="w-4 h-4 text-neutral-400" aria-hidden="true" />
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. SPRING SECTION: Vernal Bloom (Emerald mist, moss, dew droplets) */}
      {/* ============================================================== */}
      <section
        id="spring-section"
        aria-labelledby="spring-heading"
        className="relative min-h-screen py-24 px-4 sm:px-8 flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #000000 0%, #03140d 35%, #051a12 65%, #000000 100%)'
        }}
      >
        {/* Soft emerald and misty white glow backdrop */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-emerald-500/10 blur-[160px] pointer-events-none rounded-full" aria-hidden="true" />
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-300/5 blur-[120px] pointer-events-none rounded-full" aria-hidden="true" />

        {/* Ambient Mist & Droplets */}
        <DropletCanvas intensity="gentle" tintColor="rgba(167, 243, 208, 0.9)" />

        <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Fragrance Visual Card */}
          <figure className="lg:col-span-7 relative group m-0">
            <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-neutral-950/60 shadow-2xl shadow-emerald-950/50 backdrop-blur-sm transition-transform duration-700 hover:scale-[1.01]">
              
              <DropletCanvas intensity="vivid" tintColor="rgba(167, 243, 208, 0.95)" />

              <div className="relative aspect-[4/3] w-full bg-neutral-950">
                <img
                  src={springFragrance.image}
                  alt={springFragrance.name}
                  width={800}
                  height={600}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />
              </div>

              {/* In-Card Season Watermark & Atmosphere */}
              <figcaption className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-emerald-400 font-mono mb-1">
                    01 · Vernal Equinox
                  </div>
                  <h3 className="text-2xl font-serif text-white">
                    {springFragrance.name}
                  </h3>
                  <p className="text-xs text-neutral-300 font-serif italic mt-0.5" lang="fr">
                    {springFragrance.frenchName}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 block font-mono">
                    Extraction
                  </span>
                  <span className="text-xs text-emerald-300">
                    Cold Enfleurage & Rain Hydro-Distillate
                  </span>
                </div>
              </figcaption>
            </div>
          </figure>

          {/* Right Column: Editorial Notes & Action */}
          <article aria-labelledby="spring-heading" className="lg:col-span-5 space-y-6">
            <header className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-emerald-400 font-sans">
                <span>The Awakening</span>
                <span aria-hidden="true">·</span>
                <span>Spring</span>
              </div>
              <h2 id="spring-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">
                Misty Stones & Dawning Rain
              </h2>
            </header>

            <p className="text-neutral-300 text-sm leading-relaxed font-sans">
              {springFragrance.description}
            </p>

            {/* Note Accord Highlights (Semantic Definition List) */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-emerald-500/20 backdrop-blur-md space-y-4">
              <div className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-mono">
                Primary Accord Architecture
              </div>
              
              <dl className="grid grid-cols-3 gap-3 text-left m-0">
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                  <dt className="text-[10px] uppercase tracking-wider text-emerald-400 block font-mono">Top</dt>
                  <dd className="m-0 mt-0.5">
                    <span className="text-xs font-serif text-white font-medium block">Crisp Bergamot</span>
                    <span className="text-[11px] text-neutral-400">Calabria</span>
                  </dd>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                  <dt className="text-[10px] uppercase tracking-wider text-emerald-400 block font-mono">Heart</dt>
                  <dd className="m-0 mt-0.5">
                    <span className="text-xs font-serif text-white font-medium block">White Petals</span>
                    <span className="text-[11px] text-neutral-400">Dew Camellia</span>
                  </dd>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                  <dt className="text-[10px] uppercase tracking-wider text-emerald-400 block font-mono">Base</dt>
                  <dd className="m-0 mt-0.5">
                    <span className="text-xs font-serif text-white font-medium block">Fresh Rain</span>
                    <span className="text-[11px] text-neutral-400">Moss Vetiver</span>
                  </dd>
                </div>
              </dl>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10 text-neutral-400">
                <span>Concentration: <strong className="text-neutral-200 font-normal">30% Extrait</strong></span>
                <span className="font-mono tabular-nums text-emerald-300 font-semibold text-sm">
                  ${springFragrance.price50ml} <span className="text-xs text-neutral-500 font-normal">/ 50ml</span>
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onSelectFragrance(springFragrance.id)}
                className="px-7 py-3.5 rounded-full bg-emerald-500 text-neutral-950 font-medium text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-300"
                aria-label={`Explore ${springFragrance.name} fragrance details`}
              >
                <span>Explore Vernal Bloom</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                onClick={() => addToCart(springFragrance, '50ml')}
                className="px-6 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-neutral-200 text-xs uppercase tracking-[0.2em] transition-all hover:border-emerald-400/40 focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label={`Acquire 50ml flacon of ${springFragrance.name}`}
              >
                Acquire Flacon
              </button>
            </div>
          </article>

        </div>
      </section>

      {/* Transition Block 1: Symmetrical Dual-Bottle Floating Parting */}
      <DualBottleTransition
        currentSeason="Spring"
        nextSeason="Summer"
        fromImage={springFragrance.image}
        toImage={summerFragrance.image}
        accentColor="#10b981"
      />

      {/* ============================================================== */}
      {/* 3. SUMMER SECTION: Solar Solstice (Warm amber, crimson, driftwood) */}
      {/* ============================================================== */}
      <section
        id="summer-section"
        aria-labelledby="summer-heading"
        className="relative min-h-screen py-24 px-4 sm:px-8 flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #000000 0%, #1c0e03 35%, #2a1304 65%, #000000 100%)'
        }}
      >
        {/* Warm amber and golden-crimson haze backdrop */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-amber-500/15 blur-[170px] pointer-events-none rounded-full" aria-hidden="true" />
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-rose-600/10 blur-[130px] pointer-events-none rounded-full" aria-hidden="true" />

        {/* Ambient Saline Droplets */}
        <DropletCanvas intensity="vivid" tintColor="rgba(254, 215, 170, 0.95)" />

        <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Notes & Action */}
          <article aria-labelledby="summer-heading" className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <header className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-amber-400 font-sans">
                <span>The Zenith</span>
                <span aria-hidden="true">·</span>
                <span>Summer</span>
              </div>
              <h2 id="summer-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">
                Sun-Bleached Wood & Solar Jasmine
              </h2>
            </header>

            <p className="text-neutral-300 text-sm leading-relaxed font-sans">
              {summerFragrance.description}
            </p>

            {/* Note Accord Highlights (Semantic Definition List) */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-amber-500/20 backdrop-blur-md space-y-4">
              <div className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-mono">
                Primary Accord Architecture
              </div>
              
              <dl className="grid grid-cols-3 gap-3 text-left m-0">
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                  <dt className="text-[10px] uppercase tracking-wider text-amber-400 block font-mono">Top</dt>
                  <dd className="m-0 mt-0.5">
                    <span className="text-xs font-serif text-white font-medium block">Citrus Rind</span>
                    <span className="text-[11px] text-neutral-400">Amalfi Lemon</span>
                  </dd>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                  <dt className="text-[10px] uppercase tracking-wider text-amber-400 block font-mono">Heart</dt>
                  <dd className="m-0 mt-0.5">
                    <span className="text-xs font-serif text-white font-medium block">Sea Salt</span>
                    <span className="text-[11px] text-neutral-400">Guérande Crust</span>
                  </dd>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                  <dt className="text-[10px] uppercase tracking-wider text-amber-400 block font-mono">Base</dt>
                  <dd className="m-0 mt-0.5">
                    <span className="text-xs font-serif text-white font-medium block">Solar Jasmine</span>
                    <span className="text-[11px] text-neutral-400">Grasse Estate</span>
                  </dd>
                </div>
              </dl>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10 text-neutral-400">
                <span>Concentration: <strong className="text-neutral-200 font-normal">32% Extrait</strong></span>
                <span className="font-mono tabular-nums text-amber-300 font-semibold text-sm">
                  ${summerFragrance.price50ml} <span className="text-xs text-neutral-500 font-normal">/ 50ml</span>
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onSelectFragrance(summerFragrance.id)}
                className="px-7 py-3.5 rounded-full bg-amber-400 text-neutral-950 font-medium text-xs uppercase tracking-[0.2em] hover:bg-amber-300 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-300"
                aria-label={`Explore ${summerFragrance.name} fragrance details`}
              >
                <span>Explore Solar Solstice</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                onClick={() => addToCart(summerFragrance, '50ml')}
                className="px-6 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-neutral-200 text-xs uppercase tracking-[0.2em] transition-all hover:border-amber-400/40 focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label={`Acquire 50ml flacon of ${summerFragrance.name}`}
              >
                Acquire Flacon
              </button>
            </div>
          </article>

          {/* Right Column: Fragrance Visual Card */}
          <figure className="lg:col-span-7 relative group order-1 lg:order-2 m-0">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-neutral-950/60 shadow-2xl shadow-amber-950/50 backdrop-blur-sm transition-transform duration-700 hover:scale-[1.01]">
              
              <DropletCanvas intensity="vivid" tintColor="rgba(253, 230, 138, 0.95)" />

              <div className="relative aspect-[4/3] w-full bg-neutral-950">
                <img
                  src={summerFragrance.image}
                  alt={summerFragrance.name}
                  width={800}
                  height={600}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />
              </div>

              <figcaption className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-amber-400 font-mono mb-1">
                    02 · Summer Solstice
                  </div>
                  <h3 className="text-2xl font-serif text-white">
                    {summerFragrance.name}
                  </h3>
                  <p className="text-xs text-neutral-300 font-serif italic mt-0.5" lang="fr">
                    {summerFragrance.frenchName}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 block font-mono">
                    Extraction
                  </span>
                  <span className="text-xs text-amber-300">
                    Solar Maceration & CO2 Fractionation
                  </span>
                </div>
              </figcaption>
            </div>
          </figure>

        </div>
      </section>

      {/* Transition Block 2: Dual Bottle Transition to Autumn */}
      <DualBottleTransition
        currentSeason="Summer"
        nextSeason="Autumn"
        fromImage={summerFragrance.image}
        toImage={autumnFragrance.image}
        accentColor="#ea580c"
      />

      {/* ============================================================== */}
      {/* 4. AUTUMN SECTION: Equinox Smoke (Burnt sienna, obsidian, incense) */}
      {/* ============================================================== */}
      <section
        id="autumn-section"
        aria-labelledby="autumn-heading"
        className="relative min-h-screen py-24 px-4 sm:px-8 flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #000000 0%, #190a04 35%, #260d05 65%, #000000 100%)'
        }}
      >
        {/* Deep burnt sienna and copper backlighting */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-orange-600/15 blur-[170px] pointer-events-none rounded-full" aria-hidden="true" />
        <div className="absolute top-1/4 right-20 w-80 h-80 bg-amber-700/15 blur-[120px] pointer-events-none rounded-full" aria-hidden="true" />

        {/* Ambient atmospheric smoke simulation lines */}
        <DropletCanvas intensity="gentle" tintColor="rgba(251, 146, 60, 0.85)" />

        <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Fragrance Visual Card */}
          <figure className="lg:col-span-7 relative group m-0">
            <div className="relative rounded-3xl overflow-hidden border border-orange-500/30 bg-neutral-950/60 shadow-2xl shadow-orange-950/50 backdrop-blur-sm transition-transform duration-700 hover:scale-[1.01]">
              
              <DropletCanvas intensity="gentle" tintColor="rgba(251, 146, 60, 0.9)" />

              <div className="relative aspect-[4/3] w-full bg-neutral-950">
                <img
                  src={autumnFragrance.image}
                  alt={autumnFragrance.name}
                  width={800}
                  height={600}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />
              </div>

              <figcaption className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-orange-400 font-mono mb-1">
                    03 · Autumnal Equinox
                  </div>
                  <h3 className="text-2xl font-serif text-white">
                    {autumnFragrance.name}
                  </h3>
                  <p className="text-xs text-neutral-300 font-serif italic mt-0.5" lang="fr">
                    {autumnFragrance.frenchName}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 block font-mono">
                    Extraction
                  </span>
                  <span className="text-xs text-orange-300">
                    Pyrolysis Wood & Supercritical CO2
                  </span>
                </div>
              </figcaption>
            </div>
          </figure>

          {/* Right Column: Editorial Notes & Action */}
          <article aria-labelledby="autumn-heading" className="lg:col-span-5 space-y-6">
            <header className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-orange-400 font-sans">
                <span>The Smoldering</span>
                <span aria-hidden="true">·</span>
                <span>Autumn</span>
              </div>
              <h2 id="autumn-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">
                Wisps of Smoke & Cracked Obsidian
              </h2>
            </header>

            <p className="text-neutral-300 text-sm leading-relaxed font-sans">
              {autumnFragrance.description}
            </p>

            {/* Note Accord Highlights (Semantic Definition List) */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-orange-500/20 backdrop-blur-md space-y-4">
              <div className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-mono">
                Primary Accord Architecture
              </div>
              
              <dl className="grid grid-cols-3 gap-3 text-left m-0">
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                  <dt className="text-[10px] uppercase tracking-wider text-orange-400 block font-mono">Top</dt>
                  <dd className="m-0 mt-0.5">
                    <span className="text-xs font-serif text-white font-medium block">Cardamom</span>
                    <span className="text-[11px] text-neutral-400">Guatemala Pods</span>
                  </dd>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                  <dt className="text-[10px] uppercase tracking-wider text-orange-400 block font-mono">Heart</dt>
                  <dd className="m-0 mt-0.5">
                    <span className="text-xs font-serif text-white font-medium block">Rich Vetiver</span>
                    <span className="text-[11px] text-neutral-400">Peat Smoked</span>
                  </dd>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                  <dt className="text-[10px] uppercase tracking-wider text-orange-400 block font-mono">Base</dt>
                  <dd className="m-0 mt-0.5">
                    <span className="text-xs font-serif text-white font-medium block">Cedarwood</span>
                    <span className="text-[11px] text-neutral-400">Virginian Heart</span>
                  </dd>
                </div>
              </dl>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10 text-neutral-400">
                <span>Concentration: <strong className="text-neutral-200 font-normal">33% Extrait</strong></span>
                <span className="font-mono tabular-nums text-orange-300 font-semibold text-sm">
                  ${autumnFragrance.price50ml} <span className="text-xs text-neutral-500 font-normal">/ 50ml</span>
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onSelectFragrance(autumnFragrance.id)}
                className="px-7 py-3.5 rounded-full bg-orange-500 text-neutral-950 font-medium text-xs uppercase tracking-[0.2em] hover:bg-orange-400 transition-all flex items-center gap-2 shadow-lg shadow-orange-500/20 active:scale-95 focus-visible:ring-2 focus-visible:ring-orange-300"
                aria-label={`Explore ${autumnFragrance.name} fragrance details`}
              >
                <span>Explore Equinox Smoke</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                onClick={() => addToCart(autumnFragrance, '50ml')}
                className="px-6 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-neutral-200 text-xs uppercase tracking-[0.2em] transition-all hover:border-orange-400/40 focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label={`Acquire 50ml flacon of ${autumnFragrance.name}`}
              >
                Acquire Flacon
              </button>
            </div>
          </article>

        </div>
      </section>

      {/* Transition Block 3: Dual Bottle Transition to Winter */}
      <DualBottleTransition
        currentSeason="Autumn"
        nextSeason="Winter"
        fromImage={autumnFragrance.image}
        toImage={winterFragrance.image}
        accentColor="#38bdf8"
      />

      {/* ============================================================== */}
      {/* 5. WINTER SECTION: Crystalline Frost (Icy silver, midnight blue, ice block) */}
      {/* ============================================================== */}
      <section
        id="winter-section"
        aria-labelledby="winter-heading"
        className="relative min-h-screen py-24 px-4 sm:px-8 flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #000000 0%, #030e1c 35%, #05162a 65%, #000000 100%)'
        }}
      >
        {/* Stark icy silver and midnight blue split-tone silhouette */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-sky-500/15 blur-[170px] pointer-events-none rounded-full" aria-hidden="true" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/10 blur-[140px] pointer-events-none rounded-full" aria-hidden="true" />

        {/* Delicate frost fracture patterns along borders */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sky-300/10 to-transparent pointer-events-none frost-border" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-sky-300/10 to-transparent pointer-events-none frost-border" aria-hidden="true" />

        {/* Ambient ice droplet condensation */}
        <DropletCanvas intensity="gentle" tintColor="rgba(224, 242, 254, 0.95)" />

        <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Notes & Action */}
          <article aria-labelledby="winter-heading" className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <header className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-sky-400 font-sans">
                <span>The Solitude</span>
                <span aria-hidden="true">·</span>
                <span>Winter</span>
              </div>
              <h2 id="winter-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight">
                Fractured Ice & Royal White Oud
              </h2>
            </header>

            <p className="text-neutral-300 text-sm leading-relaxed font-sans">
              {winterFragrance.description}
            </p>

            {/* Note Accord Highlights (Semantic Definition List) */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-sky-500/20 backdrop-blur-md space-y-4">
              <div className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-mono">
                Primary Accord Architecture
              </div>
              
              <dl className="grid grid-cols-3 gap-3 text-left m-0">
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                  <dt className="text-[10px] uppercase tracking-wider text-sky-400 block font-mono">Top</dt>
                  <dd className="m-0 mt-0.5">
                    <span className="text-xs font-serif text-white font-medium block">Frozen Ozone</span>
                    <span className="text-[11px] text-neutral-400">Mont Blanc Air</span>
                  </dd>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                  <dt className="text-[10px] uppercase tracking-wider text-sky-400 block font-mono">Heart</dt>
                  <dd className="m-0 mt-0.5">
                    <span className="text-xs font-serif text-white font-medium block">White Oud</span>
                    <span className="text-[11px] text-neutral-400">Royal Trat</span>
                  </dd>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                  <dt className="text-[10px] uppercase tracking-wider text-sky-400 block font-mono">Base</dt>
                  <dd className="m-0 mt-0.5">
                    <span className="text-xs font-serif text-white font-medium block">Frankincense</span>
                    <span className="text-[11px] text-neutral-400">Hojari Tears</span>
                  </dd>
                </div>
              </dl>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10 text-neutral-400">
                <span>Concentration: <strong className="text-neutral-200 font-normal">35% Extrait</strong></span>
                <span className="font-mono tabular-nums text-sky-300 font-semibold text-sm">
                  ${winterFragrance.price50ml} <span className="text-xs text-neutral-500 font-normal">/ 50ml</span>
                </span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onSelectFragrance(winterFragrance.id)}
                className="px-7 py-3.5 rounded-full bg-sky-400 text-neutral-950 font-medium text-xs uppercase tracking-[0.2em] hover:bg-sky-300 transition-all flex items-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95 focus-visible:ring-2 focus-visible:ring-sky-300"
                aria-label={`Explore ${winterFragrance.name} fragrance details`}
              >
                <span>Explore Crystalline Frost</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                onClick={() => addToCart(winterFragrance, '50ml')}
                className="px-6 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-neutral-200 text-xs uppercase tracking-[0.2em] transition-all hover:border-sky-400/40 focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label={`Acquire 50ml flacon of ${winterFragrance.name}`}
              >
                Acquire Flacon
              </button>
            </div>
          </article>

          {/* Right Column: Fragrance Visual Card */}
          <figure className="lg:col-span-7 relative group order-1 lg:order-2 m-0">
            <div className="relative rounded-3xl overflow-hidden border border-sky-400/40 bg-neutral-950/60 shadow-2xl shadow-sky-950/50 backdrop-blur-sm transition-transform duration-700 hover:scale-[1.01]">
              
              <DropletCanvas intensity="gentle" tintColor="rgba(224, 242, 254, 0.95)" />

              <div className="relative aspect-[4/3] w-full bg-neutral-950">
                <img
                  src={winterFragrance.image}
                  alt={winterFragrance.name}
                  width={800}
                  height={600}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />
              </div>

              <figcaption className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-sky-400 font-mono mb-1">
                    04 · Winter Solstice
                  </div>
                  <h3 className="text-2xl font-serif text-white">
                    {winterFragrance.name}
                  </h3>
                  <p className="text-xs text-neutral-300 font-serif italic mt-0.5" lang="fr">
                    {winterFragrance.frenchName}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 block font-mono">
                    Extraction
                  </span>
                  <span className="text-xs text-sky-300">
                    Cryogenic Fractional Distillation
                  </span>
                </div>
              </figcaption>
            </div>
          </figure>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. DISCOVERY COFFRET SECTION & SENSORY INVITATION */}
      {/* ============================================================== */}
      <section aria-label="The Quadrilogy Coffret Presentation" className="relative py-28 px-4 sm:px-8 bg-black border-t border-white/10 overflow-hidden">
        <div className="max-w-6xl mx-auto rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#111116] to-[#0a0a0d] border border-white/10 relative overflow-hidden shadow-2xl">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[130px] pointer-events-none" aria-hidden="true" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[11px] uppercase tracking-[0.3em] text-amber-400 font-mono block">
                The Quadrilogy Coffret
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white">
                Experience All Four Elements of Time
              </h2>
              <p className="text-neutral-300 text-sm leading-relaxed max-w-xl">
                For those who wish to navigate the full wheel of seasons. Four 10ml travel flacons presented in a bespoke obsidian presentation case, accompanied by a voucher redeemable toward any full 100ml flacon.
              </p>

              <div className="flex items-center gap-6 text-xs text-neutral-400 pt-2 font-mono">
                <span>4 × 10ml Extrait</span>
                <span aria-hidden="true">·</span>
                <span>Numbered Presentation Case</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-300 font-semibold">$135</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => addToCart(springFragrance, 'Discovery Trio', undefined, 1)}
                  className="px-8 py-3.5 rounded-full bg-white text-neutral-950 font-medium text-xs uppercase tracking-[0.2em] hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-lg focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label="Acquire The Quadrilogy Coffret for $135"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
                  <span>Acquire Coffret ($135)</span>
                </button>

                <button
                  onClick={onOpenQuiz}
                  className="px-6 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-neutral-200 text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                  <span>Take Fragrance Quiz</span>
                </button>
              </div>
            </div>

            <figure className="lg:col-span-5 relative m-0">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative group bg-neutral-950">
                <img
                  src={DISCOVERY_COFFRET.image}
                  alt={DISCOVERY_COFFRET.name}
                  width={600}
                  height={450}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <figcaption className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                  <div className="text-left">
                    <span className="text-[10px] uppercase tracking-widest text-amber-300 font-mono block">
                      Numbered Edition
                    </span>
                    <span className="text-sm font-serif text-white block">
                      The Seasonal Discovery Flacons
                    </span>
                  </div>
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </section>

    </div>
  );
};
