import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { FRAGRANCES } from '../data/fragrances';

interface FooterProps {
  onNavigate: (page: 'home' | 'collection' | 'about') => void;
  onSelectFragrance: (fragranceId: string) => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectFragrance,
  onOpenQuiz
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-black text-neutral-400 border-t border-white/10 pt-20 pb-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-5">
            <h2 className="text-2xl font-serif tracking-[0.25em] text-white uppercase">
              Quatréa
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-sans">
              Haute Parfumerie exploring the immutable cycle of four seasons. Formulated, aged, and bottled in the historic hills of Grasse, France.
            </p>
            <div className="text-xs font-mono text-neutral-500 space-y-1">
              <div>Atelier Quatréa · 18 Rue de l’Orangerie</div>
              <div>06130 Grasse, France</div>
            </div>
          </div>

          {/* Seasonal Flacons Links */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white font-mono block">
              The Flacons
            </span>
            <ul className="space-y-2.5 text-xs">
              {FRAGRANCES.map(f => (
                <li key={f.id}>
                  <button
                    onClick={() => onSelectFragrance(f.id)}
                    className="hover:text-amber-200 transition-colors text-left"
                  >
                    {f.name} ({f.season})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white font-mono block">
              The House
            </span>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors"
                >
                  Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Craft & Extraction
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuiz}
                  className="hover:text-amber-300 transition-colors"
                >
                  Fragrance Quiz
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white font-mono block">
              The Solstice Dispatch
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Invitations to private seasonal distillation batches and rare flacon allocations.
            </p>

            {isSubscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You have been inscribed in the Solstice Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="patron@estate.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-full bg-white text-neutral-950 hover:bg-neutral-200 transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} Quatréa Haute Parfumerie. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>IFRA Certified</span>
            <span>·</span>
            <span>Sustainable Flora Protocol</span>
            <span>·</span>
            <span>Zero Animal Cruelty</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
