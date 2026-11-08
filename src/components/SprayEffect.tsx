import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind } from 'lucide-react';

interface SprayEffectProps {
  color?: string;
  notes?: string[];
  fragranceName: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  note?: string;
}

export const SprayEffect: React.FC<SprayEffectProps> = ({
  color = '#f59e0b',
  notes = ['Top Notes', 'Essence', 'Petrichor'],
  fragranceName
}) => {
  const [isSpraying, setIsSpraying] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  const triggerSpray = () => {
    if (isSpraying) return;
    setIsSpraying(true);

    const newParticles: Particle[] = [];
    for (let i = 0; i < 36; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.9;
      const speed = 2 + Math.random() * 4.5;
      newParticles.push({
        id: Date.now() + i,
        x: 50 + (Math.random() - 0.5) * 8,
        y: 80,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 3.5,
        opacity: 0.8 + Math.random() * 0.2,
        note: i % 8 === 0 ? notes[(i / 8) % notes.length] : undefined
      });
    }

    setParticles(newParticles);

    setTimeout(() => {
      setIsSpraying(false);
    }, 1800);
  };

  useEffect(() => {
    if (!isSpraying || particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx * 0.2,
            y: p.y + p.vy * 0.2,
            opacity: p.opacity - 0.025,
            size: p.size * 0.98
          }))
          .filter(p => p.opacity > 0)
      );
    }, 30);

    return () => clearInterval(interval);
  }, [isSpraying, particles.length]);

  return (
    <div className="relative inline-block">
      <button
        onClick={triggerSpray}
        disabled={isSpraying}
        aria-label={`Test scent mist atomization for ${fragranceName}`}
        aria-busy={isSpraying}
        className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur-md text-xs font-medium tracking-wider uppercase text-neutral-200 transition-all hover:border-amber-400/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <Wind className={`w-3.5 h-3.5 transition-transform ${isSpraying ? 'rotate-45 text-amber-300' : 'text-neutral-400 group-hover:text-amber-300'}`} aria-hidden="true" />
        <span>{isSpraying ? 'Diffusing Scent...' : 'Atomize Mist'}</span>
      </button>

      {/* Floating particles mist animation overlay (Elevated z-index to z-70) */}
      <AnimatePresence>
        {isSpraying && (
          <div
            role="status"
            aria-live="polite"
            className="fixed inset-0 pointer-events-none z-70 flex items-center justify-center"
          >
            <div className="relative w-80 h-80" aria-hidden="true">
              {particles.map(p => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: p.opacity, scale: 0.5 }}
                  animate={{
                    x: `${(p.x - 50) * 4}px`,
                    y: `${(p.y - 50) * 3}px`,
                    opacity: 0,
                    scale: 1.4
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                >
                  <div
                    className="rounded-full shadow-lg"
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      backgroundColor: color,
                      boxShadow: `0 0 12px ${color}`
                    }}
                  />
                  {p.note && (
                    <span className="absolute -top-4 left-3 whitespace-nowrap text-[10px] tracking-widest uppercase text-amber-200/90 font-serif italic bg-black/60 px-1.5 py-0.5 rounded border border-white/10 backdrop-blur-sm">
                      {p.note}
                    </span>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
              >
                <div className="text-[11px] uppercase tracking-[0.25em] text-neutral-300 font-sans">
                  Scent Dispersal
                </div>
                <div className="text-sm font-serif italic text-amber-200/90 mt-0.5">
                  {fragranceName} · Fine Atomization
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
