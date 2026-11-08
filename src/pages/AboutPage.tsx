import React from 'react';
import { Leaf, Globe, FlaskConical, ArrowRight } from 'lucide-react';
import { HERO_CAP_IMAGE } from '../data/fragrances';

interface AboutPageProps {
  onNavigateToCollection: () => void;
  onNavigateToHome: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateToCollection,
  onNavigateToHome
}) => {
  return (
    <main className="min-h-screen bg-[#070709] text-neutral-100 pt-32 pb-24 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-24">
        
        {/* Editorial Hero */}
        <header className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.35em] text-amber-400 font-sans">
            <span>The House of Quatréa</span>
            <span aria-hidden="true">·</span>
            <span>Grasse, France</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight leading-tight">
            The Alchemical Mastery
            <span className="block italic font-light text-neutral-400 text-3xl sm:text-5xl mt-2">
              of Seasonal Time
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-neutral-300 text-sm sm:text-base leading-relaxed font-sans">
            Founded in the alpine foothills of Grasse, Quatréa was born of a singular devotion: that time itself possesses an aroma, and that every season holds an immutable frequency of light, water, smoke, and ice.
          </p>
        </header>

        {/* Cinematic Atelier Visual Feature */}
        <figure className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[16/9] shadow-2xl group m-0 bg-neutral-950">
          <img
            src={HERO_CAP_IMAGE}
            alt="Quatréa master atelier flacon craftsmanship in Grasse"
            width={1280}
            height={720}
            fetchPriority="high"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/30 pointer-events-none" aria-hidden="true" />
          <figcaption className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-mono block">
                The Atelier
              </span>
              <h2 className="text-2xl font-serif text-white mt-1">
                Where Solstices Turn into Liquid Memory
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              43.6603° N, 6.9265° E
            </span>
          </figcaption>
        </figure>

        {/* The Four Extraction Rituals */}
        <section aria-labelledby="codex-heading" className="space-y-10">
          <header className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[11px] uppercase tracking-[0.3em] text-amber-400 font-mono block">
              The Extraction Codex
            </span>
            <h2 id="codex-heading" className="text-3xl font-serif text-white">
              Four Elements, Four Technical Breakthroughs
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Spring Ritual */}
            <article className="p-8 rounded-2xl bg-[#0d0d12] border border-white/10 space-y-4 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-mono uppercase tracking-wider">01 · Spring</span>
                <span className="text-neutral-500 font-mono">Hydro-Rain Enfleurage</span>
              </div>
              <h3 className="text-xl font-serif text-white">Sub-Ambient Cold Enfleurage</h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                Petals of white camellia and morning neroli are laid upon cold glass plates coated in purified vegetal wax for 72 hours, absorbing aroma molecules without the heat degradation of conventional distillation.
              </p>
            </article>

            {/* Summer Ritual */}
            <article className="p-8 rounded-2xl bg-[#0d0d12] border border-white/10 space-y-4 hover:border-amber-500/40 transition-colors">
              <div className="flex items-center justify-between text-xs">
                <span className="text-amber-400 font-mono uppercase tracking-wider">02 · Summer</span>
                <span className="text-neutral-500 font-mono">Solar Amphora Maceration</span>
              </div>
              <h3 className="text-xl font-serif text-white">Supercritical Solar Maceration</h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                Grandiflorum jasmine and citrus peels are steeped within unglazed terracotta vessels baked beneath 90 days of continuous Mediterranean sun, unlocking deep saline notes and sun-cured driftwood resins.
              </p>
            </article>

            {/* Autumn Ritual */}
            <article className="p-8 rounded-2xl bg-[#0d0d12] border border-white/10 space-y-4 hover:border-orange-500/40 transition-colors">
              <div className="flex items-center justify-between text-xs">
                <span className="text-orange-400 font-mono uppercase tracking-wider">03 · Autumn</span>
                <span className="text-neutral-500 font-mono">Wood Pyrolysis & Cask Aging</span>
              </div>
              <h3 className="text-xl font-serif text-white">Supercritical CO2 Pyrolysis</h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                Virginian red cedar logs and cured tobacco leaves are exposed to sub-critical carbon dioxide at 31°C and 73 bars of pressure, isolating purest aromatic smoke fractions without combustion char or tar.
              </p>
            </article>

            {/* Winter Ritual */}
            <article className="p-8 rounded-2xl bg-[#0d0d12] border border-white/10 space-y-4 hover:border-sky-500/40 transition-colors">
              <div className="flex items-center justify-between text-xs">
                <span className="text-sky-400 font-mono uppercase tracking-wider">04 · Winter</span>
                <span className="text-neutral-500 font-mono">Sub-Zero Cryo-Distillation</span>
              </div>
              <h3 className="text-xl font-serif text-white">Cryogenic Molecular Fractionation</h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                Royal white oud and frankincense tears are chilled to -18°C in vacuum isolation, freezing out heavier woody phenols while capturing ephemeral crystalline ozone vapors that evaporate at room temperature.
              </p>
            </article>

          </div>
        </section>

        {/* Sustainability & Craftsmanship Pillars */}
        <section aria-labelledby="ecological-heading" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10 space-y-8">
          <header className="text-center max-w-lg mx-auto space-y-2">
            <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 font-mono block">
              The Ecological Pledge
            </span>
            <h2 id="ecological-heading" className="text-2xl sm:text-3xl font-serif text-white">
              Harmonic Sovereignty with the Earth
            </h2>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 flex items-center justify-center mx-auto sm:mx-0">
                <Leaf className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-serif text-white">100% Regenerative Flora</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                All botanicals are foraged from bio-dynamic heritage plots in Provence and ethically managed partner preserves across Calabria and Oman.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-400/10 border border-emerald-400/20 text-emerald-300 flex items-center justify-center mx-auto sm:mx-0">
                <FlaskConical className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-serif text-white">Zero Synthetic Phthalates</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Formulated exclusively with pure botanical absolutes, supercritical extracts, and bio-identical plant fractions. Never animal-tested.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-sky-400/10 border border-sky-400/20 text-sky-300 flex items-center justify-center mx-auto sm:mx-0">
                <Globe className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-serif text-white">Obsidian Flacon Lifetime Refill</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Every bottle is designed as an architectural heirloom. Return any flacon to our Grasse atelier for replenishment with complimentary recalibration.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Invitation CTA */}
        <section aria-label="Explore collection options" className="text-center space-y-6 pt-6">
          <h2 className="text-3xl font-serif text-white">
            Ready to Discover Your Season?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onNavigateToCollection}
              className="px-8 py-3.5 rounded-full bg-white text-neutral-950 text-xs uppercase tracking-[0.2em] font-medium hover:bg-neutral-200 transition-all flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span>Explore The Four Flacons</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              onClick={onNavigateToHome}
              className="px-8 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-neutral-200 text-xs uppercase tracking-[0.2em] transition-all focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              Experience Scrollytelling
            </button>
          </div>
        </section>

      </div>
    </main>
  );
};
