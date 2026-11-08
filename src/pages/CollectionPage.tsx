import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, ArrowUpRight, X } from 'lucide-react';
import { FRAGRANCES, DISCOVERY_COFFRET } from '../data/fragrances';
import { Fragrance } from '../types';
import { useCart } from '../context/CartContext';

interface CollectionPageProps {
  onSelectFragrance: (fragranceId: string) => void;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({ onSelectFragrance }) => {
  const { addToCart } = useCart();
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [quickViewItem, setQuickViewItem] = useState<Fragrance | null>(null);

  // Keyboard navigation & Escape key listener for Quick View modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && quickViewItem) {
        setQuickViewItem(null);
      }
    };

    if (quickViewItem) {
      document.addEventListener('keydown', handleKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [quickViewItem]);

  const filteredFragrances = selectedSeason === 'all'
    ? FRAGRANCES
    : FRAGRANCES.filter(f => f.season.toLowerCase() === selectedSeason.toLowerCase());

  return (
    <div className="min-h-screen bg-[#070709] text-neutral-100 pt-32 pb-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Banner */}
        <header className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-neutral-400 font-sans">
            <span>The Seasonal Flacons</span>
            <span aria-hidden="true">·</span>
            <span>Extrait de Parfum</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight">
            The Permanent Collection
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-sans">
            Four seasonal extractions formulated at high oil concentration (30%–35%), bottled in smoked obsidian glass and crowned with engraved titanium.
          </p>
        </header>

        {/* Season Filter Bar (Segmented Controls) */}
        <nav aria-label="Fragrance season filtering" className="flex items-center justify-center">
          <div
            role="tablist"
            aria-label="Filter fragrances by season"
            className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            {[
              { id: 'all', label: 'All Solstices' },
              { id: 'spring', label: 'Spring' },
              { id: 'summer', label: 'Summer' },
              { id: 'autumn', label: 'Autumn' },
              { id: 'winter', label: 'Winter' }
            ].map(tab => (
              <button
                key={tab.id}
                role="tab"
                id={`filter-tab-${tab.id}`}
                aria-selected={selectedSeason === tab.id}
                onClick={() => setSelectedSeason(tab.id)}
                className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-wider rounded-full transition-all whitespace-nowrap font-sans focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 ${
                  selectedSeason === tab.id
                    ? 'bg-white text-neutral-950 font-medium shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Product Grid (Semantic Articles) */}
        <section aria-label="Available Fragrances" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredFragrances.map(fragrance => (
            <article
              key={fragrance.id}
              aria-labelledby={`card-title-${fragrance.id}`}
              className="group relative flex flex-col justify-between rounded-2xl bg-[#0d0d12] border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-black"
            >
              {/* Image Frame with hover preview */}
              <figure className="relative aspect-[4/3] w-full bg-neutral-900 overflow-hidden m-0">
                <img
                  src={fragrance.image}
                  alt={`${fragrance.name} (${fragrance.season} edition)`}
                  width={600}
                  height={450}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 pointer-events-none" aria-hidden="true" />

                {/* Season Tag */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-300 font-mono bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                    {fragrance.season}
                  </span>
                </div>

                {/* Quick View Button */}
                <button
                  onClick={() => setQuickViewItem(fragrance)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-black/90 transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-1 focus-visible:ring-amber-400"
                  aria-label={`Quick view formulation details for ${fragrance.name}`}
                >
                  <Eye className="w-4 h-4" aria-hidden="true" />
                </button>

                {/* Micro Tagline */}
                <figcaption className="absolute bottom-3 left-4 right-4 pointer-events-none">
                  <p className="text-xs font-serif italic text-neutral-300 line-clamp-1">
                    "{fragrance.tagline}"
                  </p>
                </figcaption>
              </figure>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono">
                      {fragrance.family}
                    </span>
                    <span className="font-mono tabular-nums text-sm font-semibold text-amber-300">
                      ${fragrance.price50ml}
                    </span>
                  </div>

                  <h2 id={`card-title-${fragrance.id}`} className="text-xl font-serif font-medium text-white mt-1 group-hover:text-amber-200 transition-colors">
                    {fragrance.name}
                  </h2>
                  <p className="text-xs font-serif italic text-neutral-400 mt-0.5" lang="fr">
                    {fragrance.frenchName}
                  </p>

                  <p className="text-xs text-neutral-400 mt-3 line-clamp-2 leading-relaxed">
                    {fragrance.description}
                  </p>
                </div>

                {/* Note Chips */}
                <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-400 font-mono" aria-label="Key fragrance notes">
                  {fragrance.notes.top.slice(0, 2).map((n, i) => (
                    <span key={i} className="text-neutral-300">
                      {n.name} {i < 1 && '·'}
                    </span>
                  ))}
                  <span className="text-neutral-500">· {fragrance.notes.base[0]?.name}</span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => onSelectFragrance(fragrance.id)}
                    className="py-2.5 px-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-neutral-200 hover:text-white transition-all text-center uppercase tracking-wider font-sans flex items-center justify-center gap-1 focus-visible:ring-1 focus-visible:ring-amber-400"
                    aria-label={`View full details for ${fragrance.name}`}
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>

                  <button
                    onClick={() => addToCart(fragrance, '50ml')}
                    className="py-2.5 px-3 rounded-xl bg-white text-neutral-950 font-medium text-xs hover:bg-neutral-200 transition-all text-center uppercase tracking-wider font-sans focus-visible:ring-2 focus-visible:ring-amber-400"
                    aria-label={`Add 50ml ${fragrance.name} to shopping bag`}
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Discovery Coffret Feature Section */}
        <section aria-label="Discovery Coffret Presentation" className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#121217] via-[#16161f] to-[#121217] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 mt-12">
          <div className="space-y-3 max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-amber-400 font-mono block">
              Complete Wardrobe
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white">
              {DISCOVERY_COFFRET.name}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
              {DISCOVERY_COFFRET.description} Includes a digital certificate and gift voucher.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 pt-1">
              <span>{DISCOVERY_COFFRET.concentration}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-300 font-semibold">${DISCOVERY_COFFRET.price}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => addToCart(FRAGRANCES[0], 'Discovery Trio', undefined, 1)}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-neutral-950 text-xs uppercase tracking-[0.2em] font-medium hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 focus-visible:ring-2 focus-visible:ring-amber-300"
              aria-label={`Acquire ${DISCOVERY_COFFRET.name} for $${DISCOVERY_COFFRET.price}`}
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Acquire Coffret (${DISCOVERY_COFFRET.price})</span>
            </button>
          </div>
        </section>

      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewItem && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quickview-title"
            className="fixed inset-0 z-60 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewItem(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0f0f14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl text-neutral-100 z-10 grid grid-cols-1 md:grid-cols-2"
            >
              <figure className="relative aspect-square md:aspect-auto h-64 md:h-full bg-black m-0">
                <img
                  src={quickViewItem.image}
                  alt={quickViewItem.name}
                  width={400}
                  height={400}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
                <figcaption className="absolute bottom-4 left-4">
                  <span className="text-[10px] uppercase tracking-widest text-amber-300 font-mono">
                    {quickViewItem.concentration}
                  </span>
                </figcaption>
              </figure>

              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-mono">
                      {quickViewItem.season} Solstice
                    </span>
                    <button
                      onClick={() => setQuickViewItem(null)}
                      className="p-1 text-neutral-400 hover:text-white rounded-full hover:bg-white/5 focus-visible:ring-1 focus-visible:ring-amber-400"
                      aria-label="Close preview modal"
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  <h3 id="quickview-title" className="text-2xl font-serif text-white mt-1">
                    {quickViewItem.name}
                  </h3>
                  <p className="text-xs font-serif italic text-amber-200/90 mt-0.5" lang="fr">
                    {quickViewItem.frenchName}
                  </p>

                  <p className="text-xs text-neutral-300 leading-relaxed mt-4">
                    {quickViewItem.story}
                  </p>

                  <dl className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs space-y-1.5 font-mono m-0">
                    <div className="flex justify-between text-neutral-400">
                      <dt>Longevity</dt>
                      <dd className="text-neutral-200">{quickViewItem.longevity}</dd>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <dt>Sillage</dt>
                      <dd className="text-neutral-200">{quickViewItem.sillage}</dd>
                    </div>
                  </dl>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400">50ml Extrait Flacon</span>
                    <span className="font-mono text-base font-semibold text-amber-300">
                      ${quickViewItem.price50ml}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        onSelectFragrance(quickViewItem.id);
                        setQuickViewItem(null);
                      }}
                      className="py-3 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs uppercase tracking-wider text-neutral-200 hover:text-white transition-all text-center font-sans focus-visible:ring-1 focus-visible:ring-amber-400"
                    >
                      Full Details
                    </button>
                    <button
                      onClick={() => {
                        addToCart(quickViewItem, '50ml');
                        setQuickViewItem(null);
                      }}
                      className="py-3 px-4 rounded-xl bg-white text-neutral-950 font-medium text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all text-center font-sans focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
