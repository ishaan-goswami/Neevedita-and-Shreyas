import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GuestLookupSection } from './components/GuestLookupSection';
import { VenueSection } from './components/VenueSection';
import { Footer } from './components/Footer';
import { HostPortal } from './components/HostPortal';
import { MusicPlayer } from './components/MusicPlayer';
import { FloatingPetals } from './components/FloatingPetals';
import { Flower } from 'lucide-react';

export function App() {
  const [petalsEnabled, setPetalsEnabled] = useState(true);
  const [isHostPortalOpen, setIsHostPortalOpen] = useState(false);

  // Sync with #host hash in URL
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#host') {
        setIsHostPortalOpen(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleCloseHostPortal = () => {
    setIsHostPortalOpen(false);
    if (window.location.hash === '#host') {
      history.pushState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <div className="min-h-screen bg-ivory-100 text-charcoal font-sans relative selection:bg-gold-light selection:text-maroon">
      {/* Ambient Floating Marigold & Rose Petals */}
      <FloatingPetals count={12} enabled={petalsEnabled} />

      {/* Top Navigation */}
      <Navbar onOpenHostPortal={() => setIsHostPortalOpen(true)} />

      {/* Main Content */}
      <main>
        {/* Welcome & Auspicious Invocation Hero */}
        <Hero />

        {/* Core Guest Invitation & Event Finder Portal */}
        <GuestLookupSection />

        {/* Venue, Map Directions & Guest Info */}
        <VenueSection />
      </main>

      {/* Footer */}
      <Footer onOpenHostPortal={() => setIsHostPortalOpen(true)} />

      {/* Private Host Portal Overlay (PIN: 0000) */}
      {isHostPortalOpen && (
        <HostPortal onClose={handleCloseHostPortal} />
      )}

      {/* Ambient Sitar / Shehnai Music Player */}
      <MusicPlayer />

      {/* Floating Petals Toggle */}
      <button
        onClick={() => setPetalsEnabled(!petalsEnabled)}
        type="button"
        title={petalsEnabled ? "Disable floating petals" : "Enable floating petals"}
        className="fixed bottom-6 left-6 z-40 p-2.5 rounded-full bg-ivory-50/90 hover:bg-ivory-200 border border-gold/40 shadow-md text-gold-dark hover:text-maroon transition-all duration-200 text-xs flex items-center space-x-1"
      >
        <Flower className={`w-4 h-4 ${petalsEnabled ? 'text-amber-500' : 'text-charcoal/40'}`} />
        <span className="hidden sm:inline text-[11px] font-serif uppercase tracking-wider">
          {petalsEnabled ? 'Petals On' : 'Petals Off'}
        </span>
      </button>
    </div>
  );
}

export default App;
