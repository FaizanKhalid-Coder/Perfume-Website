import React from 'react';
import { ShoppingBag, Compass } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  currentPage: 'home' | 'collection' | 'pdp' | 'about';
  onNavigate: (page: 'home' | 'collection' | 'about', fragranceId?: string) => void;
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenQuiz
}) => {
  const { itemCount, setIsOpen } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5 rounded-full bg-[#0a0a0d]/75 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80">
        
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="text-xl sm:text-2xl font-serif tracking-[0.25em] font-medium text-white hover:text-amber-200 transition-colors uppercase whitespace-nowrap shrink-0 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-sm"
          aria-label="Quatréa Home"
        >
          Quatréa
        </button>

        {/* Zone 2: Concise single-line text navigation links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-neutral-300 font-sans">
          <button
            onClick={() => onNavigate('home')}
            aria-current={currentPage === 'home' ? 'page' : undefined}
            className={`transition-colors whitespace-nowrap relative py-1 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-sm ${
              currentPage === 'home' ? 'text-white' : 'text-neutral-400'
            }`}
          >
            Experience
            {currentPage === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400/80 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onNavigate('collection')}
            aria-current={currentPage === 'collection' ? 'page' : undefined}
            className={`transition-colors whitespace-nowrap relative py-1 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-sm ${
              currentPage === 'collection' ? 'text-white' : 'text-neutral-400'
            }`}
          >
            Collection
            {currentPage === 'collection' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400/80 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onNavigate('about')}
            aria-current={currentPage === 'about' ? 'page' : undefined}
            className={`transition-colors whitespace-nowrap relative py-1 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-sm ${
              currentPage === 'about' ? 'text-white' : 'text-neutral-400'
            }`}
          >
            The House
            {currentPage === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-400/80 rounded-full" />
            )}
          </button>

          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-200 transition-colors whitespace-nowrap py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 rounded-sm"
          >
            <Compass className="w-3.5 h-3.5 text-amber-400/80" aria-hidden="true" />
            <span>Fragrance Finder</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-400/40 text-neutral-200 hover:text-white transition-all text-xs font-sans tracking-wider uppercase whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label={`Shopping Bag (${itemCount} items)`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums font-mono text-[11px] text-amber-300 font-semibold">
              ({itemCount})
            </span>
          </button>
        </div>
      </div>
      
      {/* Mobile nav bar row for small screens */}
      <nav aria-label="Mobile Secondary Navigation" className="flex md:hidden justify-center items-center gap-6 mt-2 py-2 px-4 rounded-full bg-black/70 backdrop-blur-md border border-white/5 text-[11px] uppercase tracking-wider text-neutral-300 max-w-xs mx-auto">
        <button
          onClick={() => onNavigate('home')}
          aria-current={currentPage === 'home' ? 'page' : undefined}
          className={currentPage === 'home' ? 'text-white font-medium' : 'text-neutral-400'}
        >
          Experience
        </button>
        <span aria-hidden="true">·</span>
        <button
          onClick={() => onNavigate('collection')}
          aria-current={currentPage === 'collection' ? 'page' : undefined}
          className={currentPage === 'collection' ? 'text-white font-medium' : 'text-neutral-400'}
        >
          Collection
        </button>
        <span aria-hidden="true">·</span>
        <button
          onClick={() => onNavigate('about')}
          aria-current={currentPage === 'about' ? 'page' : undefined}
          className={currentPage === 'about' ? 'text-white font-medium' : 'text-neutral-400'}
        >
          The House
        </button>
      </nav>
    </header>
  );
};
