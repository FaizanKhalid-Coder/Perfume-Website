import React from 'react';
import { motion } from 'motion/react';

interface DualBottleTransitionProps {
  currentSeason: string;
  nextSeason: string;
  fromImage: string;
  toImage: string;
  accentColor: string;
}

export const DualBottleTransition: React.FC<DualBottleTransitionProps> = ({
  currentSeason,
  nextSeason,
  fromImage,
  toImage,
  accentColor
}) => {
  return (
    <section
      aria-label={`Seasonal transition between ${currentSeason} and ${nextSeason}`}
      className="relative w-full h-[45vh] sm:h-[55vh] md:h-[65vh] bg-black overflow-x-clip overflow-y-hidden flex flex-col items-center justify-center border-y border-white/5"
    >
      {/* Volumetric backlight aura */}
      <div
        className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-[90px] sm:blur-[110px] opacity-25 pointer-events-none"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />

      {/* Subtle atmospheric texture */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating dual bottles that align symmetrically and part */}
      <div className="relative w-full max-w-xl sm:max-w-2xl h-56 sm:h-72 md:h-80 flex items-center justify-center px-4">
        {/* Left Bottle */}
        <motion.div
          initial={{ x: -40, y: 10, rotate: -4, opacity: 0.8 }}
          whileInView={{
            x: [-45, -15, -40],
            y: [8, -8, 8],
            rotate: [-3, -0.5, -3]
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: 'easeInOut'
          }}
          viewport={{ once: false, amount: 0.2 }}
          className="relative w-28 sm:w-36 md:w-44 h-44 sm:h-56 md:h-64 rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-black/90 group shrink-0"
          style={{
            transformOrigin: 'bottom center'
          }}
        >
          <img
            src={fromImage}
            alt={`${currentSeason} flacon`}
            width={176}
            height={256}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2 right-2 text-center pointer-events-none">
            <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 font-sans block">
              Passing
            </span>
            <span className="text-[11px] sm:text-xs font-serif text-white tracking-widest uppercase block">
              {currentSeason}
            </span>
          </div>
        </motion.div>

        {/* Center alignment sigil & convergence axis */}
        <div className="z-10 px-2 sm:px-4 flex flex-col items-center shrink-0" aria-hidden="true">
          <motion.div
            initial={{ scale: 0.85, opacity: 0.5 }}
            whileInView={{ scale: [0.9, 1.12, 0.9], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-white/20 flex items-center justify-center bg-black/70 backdrop-blur-md"
          >
            <span className="text-xs font-serif text-amber-200">Q</span>
          </motion.div>
          <div className="h-8 sm:h-12 w-[1px] bg-gradient-to-b from-white/30 to-transparent my-1" />
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-neutral-500 font-mono whitespace-nowrap">
            Axis Shift
          </span>
        </div>

        {/* Right Bottle */}
        <motion.div
          initial={{ x: 40, y: -10, rotate: 4, opacity: 0.8 }}
          whileInView={{
            x: [45, 15, 40],
            y: [-8, 8, -8],
            rotate: [3, 0.5, 3]
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: 'easeInOut',
            delay: 0.25
          }}
          viewport={{ once: false, amount: 0.2 }}
          className="relative w-28 sm:w-36 md:w-44 h-44 sm:h-56 md:h-64 rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-black/90 group shrink-0"
          style={{
            transformOrigin: 'bottom center'
          }}
        >
          <img
            src={toImage}
            alt={`${nextSeason} flacon`}
            width={176}
            height={256}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute bottom-2.5 left-2 right-2 text-center pointer-events-none">
            <span className="text-[9px] uppercase tracking-[0.2em] text-amber-300 font-sans block">
              Approaching
            </span>
            <span className="text-[11px] sm:text-xs font-serif text-white tracking-widest uppercase block">
              {nextSeason}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Floating editorial caption */}
      <footer className="text-center mt-2 z-10 px-4">
        <p className="text-xs font-serif italic text-neutral-400 tracking-wide">
          "As the axis tilts, light transforms liquid essence."
        </p>
      </footer>
    </section>
  );
};
