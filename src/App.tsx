import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OurStory } from './components/OurStory';
import { Schedule } from './components/Schedule';
import { Saptapadi } from './components/Saptapadi';
import { VenueSection } from './components/VenueSection';
import { RsvpSection } from './components/RsvpSection';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import { FloatingPetals } from './components/FloatingPetals';
import { Flower } from 'lucide-react';

export function App() {
  const [petalsEnabled, setPetalsEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-ivory-100 text-charcoal font-sans relative selection:bg-gold-light selection:text-maroon">
      {/* Ambient Floating Marigold/Rose Petals */}
      <FloatingPetals count={12} enabled={petalsEnabled} />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Sections */}
      <main>
        <Hero />
        <OurStory />
        <Schedule />
        <Saptapadi />
        <VenueSection />
        <RsvpSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Ambient Sitar / Shehnai Music Player */}
      <MusicPlayer />

      {/* Floating Petals Toggle in lower left corner */}
      <button
        onClick={() => setPetalsEnabled(!petalsEnabled)}
        type="button"
        title={petalsEnabled ? "Disable floating petals animation" : "Enable floating petals animation"}
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
