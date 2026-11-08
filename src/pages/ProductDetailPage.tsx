import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  PackageCheck,
  Plus,
  Minus
} from 'lucide-react';
import { Fragrance } from '../types';
import { FRAGRANCES } from '../data/fragrances';
import { useCart } from '../context/CartContext';
import { DropletCanvas } from '../components/DropletCanvas';
import { SprayEffect } from '../components/SprayEffect';

interface ProductDetailPageProps {
  fragranceId: string;
  onBack: () => void;
  onSelectFragrance: (id: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  fragranceId,
  onBack,
  onSelectFragrance
}) => {
  const { addToCart } = useCart();
  const fragrance = FRAGRANCES.find(f => f.id === fragranceId) || FRAGRANCES[0];

  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml' | 'Discovery Trio'>('50ml');
  const [engravingText, setEngravingText] = useState('');
  const [isEngravingEnabled, setIsEngravingEnabled] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'olfactive' | 'extraction' | 'provenance'>('olfactive');

  const currentPrice = selectedSize === '50ml'
    ? fragrance.price50ml
    : selectedSize === '100ml'
    ? fragrance.price100ml
    : 95;

  const handleAddToCart = () => {
    addToCart(
      fragrance,
      selectedSize,
      isEngravingEnabled && engravingText ? engravingText.toUpperCase() : undefined,
      quantity
    );
  };

  return (
    <article aria-labelledby="pdp-product-title" className="min-h-screen bg-[#070709] text-neutral-100 pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="flex items-center justify-between text-xs text-neutral-400">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            <span className="uppercase tracking-widest font-sans">Return to Experience</span>
          </button>

          <ol className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-mono">
            <li>
              <span>{fragrance.season} Solstice</span>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white font-medium">
              {fragrance.name}
            </li>
          </ol>
        </nav>

        {/* Contiguous Purchase Module Split (2-Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Gallery & Sensory Canvas */}
          <section aria-label="Product imagery and sensory gallery" className="lg:col-span-7 space-y-6 lg:sticky lg:top-28">
            <figure className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0d0d12] shadow-2xl group m-0">
              
              {/* Droplet micro-interaction */}
              <DropletCanvas intensity="vivid" tintColor={fragrance.accentColor} />

              <div className="relative aspect-[4/3] w-full bg-neutral-950">
                <img
                  src={fragrance.image}
                  alt={`Flacon of ${fragrance.name} resting in seasonal atmospheric setting`}
                  width={800}
                  height={600}
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />
              </div>

              {/* Top Controls Overlay */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  {fragrance.concentration}
                </span>

                {/* Scent Mist Spray Trigger */}
                <SprayEffect
                  color={fragrance.accentColor}
                  notes={fragrance.notes.top.map(n => n.name)}
                  fragranceName={fragrance.name}
                />
              </div>

              {/* Bottom In-Image Typography */}
              <figcaption className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none z-20">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-mono block text-neutral-400">
                    Hand-Poured in Grasse
                  </span>
                  <p className="text-sm font-serif italic text-amber-200 mt-0.5">
                    "{fragrance.tagline}"
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono text-neutral-400 block">Longevity</span>
                  <span className="text-xs text-white">{fragrance.longevity}</span>
                </div>
              </figcaption>
            </figure>

            {/* Other Seasonal Flacons Switcher */}
            <nav aria-label="Explore other seasonal flacons" className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono">
                Explore Other Seasons:
              </span>
              <div className="flex items-center gap-2">
                {FRAGRANCES.map(f => (
                  <button
                    key={f.id}
                    onClick={() => onSelectFragrance(f.id)}
                    aria-current={f.id === fragrance.id ? 'page' : undefined}
                    className={`px-3 py-1 text-xs rounded-full border transition-all focus-visible:ring-1 focus-visible:ring-amber-400 ${
                      f.id === fragrance.id
                        ? 'border-white text-white bg-white/10 font-medium'
                        : 'border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {f.season}
                  </button>
                ))}
              </div>
            </nav>
          </section>

          {/* Right Column: Contiguous Purchase Specification Module */}
          <section aria-label="Purchase specification and olfactive formulation" className="lg:col-span-5 space-y-8">
            
            {/* Title & Brand Lockup */}
            <header className="space-y-2 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-neutral-400 font-sans">
                <span>The House of Quatréa</span>
                <span aria-hidden="true">·</span>
                <span style={{ color: fragrance.accentColor }}>{fragrance.season} Solstice</span>
              </div>

              <h1 id="pdp-product-title" className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight">
                {fragrance.name}
              </h1>

              <div className="flex items-center justify-between pt-1">
                <p className="text-sm font-serif italic text-neutral-400" lang="fr">
                  {fragrance.frenchName}
                </p>
                <div className="text-right">
                  <span className="font-mono tabular-nums text-2xl font-medium text-amber-300">
                    ${currentPrice}
                  </span>
                  <span className="text-[11px] text-neutral-500 block uppercase font-mono">Taxes Included</span>
                </div>
              </div>
            </header>

            {/* Atmosphere Description */}
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              {fragrance.description}
            </p>

            {/* Size & Format Selector (Accessible Radio Group) */}
            <fieldset className="space-y-3 border-none p-0 m-0">
              <legend className="flex justify-between text-xs w-full mb-2">
                <span className="uppercase tracking-wider text-neutral-400 font-mono">Select Flacon Format</span>
                <span className="text-neutral-400 font-medium">{selectedSize}</span>
              </legend>

              <div role="radiogroup" aria-label="Flacon volume options" className="grid grid-cols-3 gap-3">
                {[
                  { size: '50ml', price: fragrance.price50ml, desc: 'Smoked Flacon' },
                  { size: '100ml', price: fragrance.price100ml, desc: 'Magnum Edition' },
                  { size: 'Discovery Trio', price: 95, desc: '3 × 10ml Travel' }
                ].map(opt => (
                  <button
                    key={opt.size}
                    type="button"
                    role="radio"
                    aria-checked={selectedSize === opt.size}
                    onClick={() => setSelectedSize(opt.size as any)}
                    className={`p-3 rounded-xl border text-left transition-all relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      selectedSize === opt.size
                        ? 'border-amber-400/80 bg-white/10 text-white shadow-lg'
                        : 'border-white/10 bg-white/[0.02] text-neutral-400 hover:border-white/25 hover:text-neutral-200'
                    }`}
                  >
                    <span className="text-xs font-semibold block text-neutral-100">{opt.size}</span>
                    <span className="text-[10px] text-neutral-400 block mt-0.5">{opt.desc}</span>
                    <span className="text-xs font-mono tabular-nums text-amber-300 block mt-2 font-medium">
                      ${opt.price}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Bespoke Titanium Cap Engraving Customizer */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="engraving-toggle" className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                  <input
                    id="engraving-toggle"
                    type="checkbox"
                    checked={isEngravingEnabled}
                    onChange={e => setIsEngravingEnabled(e.target.checked)}
                    className="rounded border-white/20 bg-white/5 text-amber-500 focus:ring-amber-500/30"
                  />
                  <span>Personalized Titanium Cap Engraving</span>
                </label>
                <span className="text-[10px] uppercase font-mono text-emerald-400">Complimentary</span>
              </div>

              {isEngravingEnabled && (
                <div className="space-y-2 pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={3}
                      placeholder="e.g. Q.V"
                      value={engravingText}
                      onChange={e => setEngravingText(e.target.value.toUpperCase())}
                      aria-label="Engraving initials (max 3 uppercase letters)"
                      className="w-24 text-center font-mono uppercase bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-sm text-amber-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                    <div className="text-[11px] text-neutral-400 flex items-center">
                      Laser-inscribed into the titanium cap bezel (max 3 initials).
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Purchase CTA and Quantity Stepper */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-white/15 rounded-full bg-white/5 px-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label={`Decrease quantity of ${fragrance.name}`}
                    className="p-1 text-neutral-400 hover:text-white focus-visible:ring-1 focus-visible:ring-amber-400"
                  >
                    <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <span aria-live="polite" className="px-3 font-mono text-xs tabular-nums text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label={`Increase quantity of ${fragrance.name}`}
                    className="p-1 text-neutral-400 hover:text-white focus-visible:ring-1 focus-visible:ring-amber-400"
                  >
                    <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>

                {/* Primary Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 px-6 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-neutral-950 font-medium text-xs uppercase tracking-[0.25em] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span>Add to Bag · ${(currentPrice * quantity)}</span>
                </button>
              </div>

              {/* Reassurances */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] text-neutral-400 font-sans">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                  <span>100% Pure Extraction</span>
                </div>
                <div className="flex items-center gap-2">
                  <PackageCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                  <span>Complimentary Insured Delivery</span>
                </div>
              </div>
            </div>

            {/* Deep-Dive Editorial Tabs */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <div role="tablist" aria-label="Fragrance specifications" className="flex items-center gap-2 border-b border-white/10 pb-2">
                {[
                  { id: 'olfactive', label: 'Olfactive Pyramid' },
                  { id: 'extraction', label: 'Craft & Cask' },
                  { id: 'provenance', label: 'Raw Provenance' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={activeTab === tab.id}
                    aria-controls={`tabpanel-${tab.id}`}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`text-xs uppercase tracking-wider py-1 px-2.5 transition-colors relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 ${
                      activeTab === tab.id
                        ? 'text-white font-medium'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400 rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab 1: Olfactive Pyramid */}
              {activeTab === 'olfactive' && (
                <div
                  role="tabpanel"
                  id="tabpanel-olfactive"
                  aria-labelledby="tab-olfactive"
                  className="space-y-4 text-xs"
                >
                  {/* Semantic Definition List for Pyramid Notes */}
                  <dl className="space-y-3 m-0">
                    {/* Top Notes */}
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                      <dt className="flex justify-between items-center text-[10px] uppercase tracking-wider text-amber-400 font-mono">
                        <span>Top Notes · Instant Spark (0–45 mins)</span>
                        <span className="text-neutral-500 font-sans">Volatile Lift</span>
                      </dt>
                      <dd className="space-y-1.5 m-0">
                        {fragrance.notes.top.map((n, i) => (
                          <div key={i} className="flex justify-between items-center text-neutral-200">
                            <span className="font-serif text-sm font-medium">{n.name}</span>
                            <span className="text-neutral-400 text-[11px]">{n.origin}</span>
                          </div>
                        ))}
                      </dd>
                    </div>

                    {/* Heart Notes */}
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                      <dt className="flex justify-between items-center text-[10px] uppercase tracking-wider text-amber-400 font-mono">
                        <span>Heart Accord · The Core (1–6 hours)</span>
                        <span className="text-neutral-500 font-sans">Floral & Resinous Body</span>
                      </dt>
                      <dd className="space-y-1.5 m-0">
                        {fragrance.notes.heart.map((n, i) => (
                          <div key={i} className="flex justify-between items-center text-neutral-200">
                            <span className="font-serif text-sm font-medium">{n.name}</span>
                            <span className="text-neutral-400 text-[11px]">{n.origin}</span>
                          </div>
                        ))}
                      </dd>
                    </div>

                    {/* Base Notes */}
                    <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                      <dt className="flex justify-between items-center text-[10px] uppercase tracking-wider text-amber-400 font-mono">
                        <span>Base Anchor · The Drydown (6–18+ hours)</span>
                        <span className="text-neutral-500 font-sans">Ancient Woods & Amber</span>
                      </dt>
                      <dd className="space-y-1.5 m-0">
                        {fragrance.notes.base.map((n, i) => (
                          <div key={i} className="flex justify-between items-center text-neutral-200">
                            <span className="font-serif text-sm font-medium">{n.name}</span>
                            <span className="text-neutral-400 text-[11px]">{n.origin}</span>
                          </div>
                        ))}
                      </dd>
                    </div>
                  </dl>

                  {/* Accord Percentage Meters */}
                  <div className="pt-2 space-y-2">
                    <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono">
                      Accord Density Distribution
                    </div>
                    {fragrance.accords.map((accord, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[11px] text-neutral-300">
                          <span>{accord.name}</span>
                          <span className="font-mono text-neutral-400">{accord.percentage}%</span>
                        </div>
                        <div
                          role="progressbar"
                          aria-valuenow={accord.percentage}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${accord.name} concentration`}
                          className="w-full h-1 bg-white/10 rounded-full overflow-hidden"
                        >
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-amber-200"
                            style={{ width: `${accord.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Extraction & Craft */}
              {activeTab === 'extraction' && (
                <div
                  role="tabpanel"
                  id="tabpanel-extraction"
                  aria-labelledby="tab-extraction"
                  className="space-y-3 text-xs text-neutral-300 leading-relaxed"
                >
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-amber-400 font-mono block">
                      Extraction Method
                    </span>
                    <p className="font-serif text-base text-white">{fragrance.extractionMethod}</p>
                    <p className="text-neutral-400 text-xs mt-1">{fragrance.craftsmanshipDetail}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-amber-400 font-mono block">
                      Flacon Geometry
                    </span>
                    <p className="text-xs text-neutral-300">
                      Hand-blown obsidian glass with heavy base wall thickness. Cap milled from single-billet aerospace titanium with inner cork-clad friction ring.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Provenance */}
              {activeTab === 'provenance' && (
                <div
                  role="tabpanel"
                  id="tabpanel-provenance"
                  aria-labelledby="tab-provenance"
                  className="space-y-3 text-xs text-neutral-300 leading-relaxed"
                >
                  <p className="text-neutral-300">
                    {fragrance.story}
                  </p>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-amber-400 font-mono block mb-1">
                      Sensory Atmosphere
                    </span>
                    <p className="font-serif italic text-white text-sm">
                      "{fragrance.atmosphere}"
                    </p>
                  </div>
                </div>
              )}
            </div>

          </section>

        </div>

      </div>
    </article>
  );
};
