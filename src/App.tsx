import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { SensoryFinderModal } from './components/SensoryFinderModal';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'collection' | 'pdp' | 'about'>('home');
  const [selectedFragranceId, setSelectedFragranceId] = useState<string>('vernal-bloom');
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedFragranceId]);

  const handleNavigate = (page: 'home' | 'collection' | 'about', fragranceId?: string) => {
    if (fragranceId) {
      setSelectedFragranceId(fragranceId);
      setCurrentPage('pdp');
    } else {
      setCurrentPage(page);
    }
  };

  const handleSelectFragrance = (fragranceId: string) => {
    setSelectedFragranceId(fragranceId);
    setCurrentPage('pdp');
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#070709] text-neutral-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-200">
        
        {/* Persistent Floating Glassmorphic Top Bar */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* Dynamic Page Router */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <HomePage
              onSelectFragrance={handleSelectFragrance}
              onNavigateToCollection={() => setCurrentPage('collection')}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />
          )}

          {currentPage === 'collection' && (
            <CollectionPage onSelectFragrance={handleSelectFragrance} />
          )}

          {currentPage === 'pdp' && (
            <ProductDetailPage
              fragranceId={selectedFragranceId}
              onBack={() => setCurrentPage('home')}
              onSelectFragrance={handleSelectFragrance}
            />
          )}

          {currentPage === 'about' && (
            <AboutPage
              onNavigateToCollection={() => setCurrentPage('collection')}
              onNavigateToHome={() => setCurrentPage('home')}
            />
          )}
        </main>

        {/* Global Cart Slide-Over Drawer & Concierge Checkout */}
        <CartDrawer />

        {/* Interactive Sensory Quiz Modal */}
        <SensoryFinderModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
          onSelectFragrance={handleSelectFragrance}
        />

        {/* Luxury Footer */}
        <Footer
          onNavigate={handleNavigate}
          onSelectFragrance={handleSelectFragrance}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />
      </div>
    </CartProvider>
  );
}
