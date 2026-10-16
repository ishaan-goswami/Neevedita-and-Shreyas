import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Resolve audio path relative to Vite base URL
    const baseUrl = import.meta.env.BASE_URL || './';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const audioPath = `${cleanBase}wedding-music.mp3`;

    const audio = new Audio(audioPath);
    audio.loop = true;
    audio.volume = 0.65;
    audio.preload = 'auto';

    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);
    audio.onended = () => setIsPlaying(false);

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Audio play prevented:", err);
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleMusic}
        type="button"
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className={`group relative flex items-center space-x-2.5 px-4 py-2.5 rounded-full shadow-lg border transition-all duration-300 ${
          isPlaying
            ? 'bg-maroon text-ivory-50 border-gold shadow-gold/20 scale-105'
            : 'bg-ivory-50/95 backdrop-blur-md text-charcoal border-gold/40 hover:border-gold hover:shadow-md'
        }`}
      >
        {/* Animated equalizer waves or music icon */}
        <div className="flex items-center space-x-1">
          {isPlaying ? (
            <div className="flex items-end space-x-0.5 h-4">
              <span className="w-1 bg-gold rounded-full animate-bounce h-3" style={{ animationDelay: '0ms' }} />
              <span className="w-1 bg-gold rounded-full animate-bounce h-4" style={{ animationDelay: '150ms' }} />
              <span className="w-1 bg-gold rounded-full animate-bounce h-2" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <Music className="w-4 h-4 text-gold" />
          )}
        </div>

        {/* Title updated to Music */}
        <span className="text-xs font-serif tracking-wider uppercase font-semibold">
          {isPlaying ? 'Music Playing' : 'Music'}
        </span>

        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-gold-light" />
        ) : (
          <VolumeX className="w-4 h-4 text-charcoal/40 group-hover:text-gold" />
        )}

        {/* Subtle pulsing glow ring when playing */}
        {isPlaying && (
          <span className="absolute -inset-0.5 rounded-full bg-gold/25 animate-ping pointer-events-none" />
        )}
      </button>
    </div>
  );
};
