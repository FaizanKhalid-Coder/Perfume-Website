import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Compass, ArrowRight, RotateCcw } from 'lucide-react';
import { FRAGRANCES } from '../data/fragrances';
import { Fragrance } from '../types';

interface SensoryFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFragrance: (fragranceId: string) => void;
}

export const SensoryFinderModal: React.FC<SensoryFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectFragrance
}) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [matchedFragrance, setMatchedFragrance] = useState<Fragrance | null>(null);

  const questions = [
    {
      title: 'Atmospheric Solitude',
      prompt: 'Which landscape calls most deeply to your senses?',
      options: [
        { label: 'Misty forest floor soaked in vernal dawn rain', season: 'Spring' },
        { label: 'Sun-baked driftwood by a radiant Mediterranean sea', season: 'Summer' },
        { label: 'Smoldering cedar hearth and crushed spices at twilight', season: 'Autumn' },
        { label: 'Stark glacial peaks under silent sub-zero starlight', season: 'Winter' }
      ]
    },
    {
      title: 'Olfactive Texture',
      prompt: 'What presence should your signature sillage project?',
      options: [
        { label: 'Diaphanous, dewy, and invigoratingly green', season: 'Spring' },
        { label: 'Golden, incandescent, and amber-soaked', season: 'Summer' },
        { label: 'Smoky, velvety, and deeply hypnotic', season: 'Autumn' },
        { label: 'Architectural, crystalline, and celestial', season: 'Winter' }
      ]
    },
    {
      title: 'The Essence of Time',
      prompt: 'What sensation of time do you wish to capture?',
      options: [
        { label: 'The sudden awakening of dormant life', season: 'Spring' },
        { label: 'The endless zenith of the longest summer day', season: 'Summer' },
        { label: 'The profound quiet of autumnal transformation', season: 'Autumn' },
        { label: 'The eternal stillness of frozen ice', season: 'Winter' }
      ]
    }
  ];

  // Keyboard navigation & Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, onClose]);

  const handleSelectOption = (season: string) => {
    const newAnswers = [...answers, season];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate most selected season
      const tally: Record<string, number> = { Spring: 0, Summer: 0, Autumn: 0, Winter: 0 };
      newAnswers.forEach(s => {
        tally[s] = (tally[s] || 0) + 1;
      });
      let bestSeason = 'Spring';
      let maxCount = -1;
      Object.entries(tally).forEach(([s, count]) => {
        if (count > maxCount) {
          maxCount = count;
          bestSeason = s;
        }
      });
      const match = FRAGRANCES.find(f => f.season === bestSeason) || FRAGRANCES[0];
      setMatchedFragrance(match);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setMatchedFragrance(null);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-heading"
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-[#0e0e13] border border-white/10 rounded-2xl p-6 sm:p-8 text-neutral-100 z-10 shadow-2xl"
      >
        <header className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400">
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            <span id="quiz-heading">Sensory Fragrance Consultation</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Close Fragrance Consultation"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </header>

        {!matchedFragrance ? (
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-4">
              <span>Stage {step + 1} of {questions.length}</span>
              <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-mono">
                {questions[step].title}
              </span>
            </div>

            <h3 className="text-xl font-serif text-white mb-6 leading-relaxed">
              {questions[step].prompt}
            </h3>

            <div
              role="radiogroup"
              aria-label={questions[step].prompt}
              className="space-y-3"
            >
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  role="radio"
                  aria-checked={false}
                  onClick={() => handleSelectOption(opt.season)}
                  className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.07] hover:border-amber-400/50 transition-all text-xs text-neutral-200 group flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <span className="pr-4 leading-relaxed group-hover:text-white font-medium">
                    {opt.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-1 shrink-0" aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6 text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-sans block">
              Your Elemental Signature
            </span>
            <h3 className="text-2xl font-serif text-white mt-1">
              {matchedFragrance.name}
            </h3>
            <p className="text-xs font-serif italic text-neutral-400 mt-1" lang="fr">
              {matchedFragrance.frenchName} · {matchedFragrance.concentration}
            </p>

            <figure className="my-6 relative rounded-xl overflow-hidden border border-white/10 aspect-[4/3] max-h-52 mx-auto m-0">
              <img
                src={matchedFragrance.image}
                alt={matchedFragrance.name}
                width={400}
                height={300}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <figcaption className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <p className="text-xs text-neutral-200 italic font-serif text-left">
                  "{matchedFragrance.tagline}"
                </p>
              </figcaption>
            </figure>

            <p className="text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto mb-6">
              {matchedFragrance.description}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={resetQuiz}
                className="p-3 rounded-full border border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label="Restart Consultation"
                title="Restart Consultation"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                onClick={() => {
                  onSelectFragrance(matchedFragrance.id);
                  onClose();
                }}
                className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-neutral-950 text-xs uppercase tracking-[0.2em] font-medium hover:brightness-110 transition-all flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                <span>Experience {matchedFragrance.name}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
