import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  // Serene Indian Raga Bhoopali notes (Sa, Re, Ga, Pa, Dha) frequencies in Hz
  const ragaFrequencies = [
    261.63, // C4 (Sa)
    293.66, // D4 (Re)
    329.63, // E4 (Ga)
    392.00, // G4 (Pa)
    440.00, // A4 (Dha)
    523.25, // C5 (Taar Sa)
    587.33, // D5 (Taar Re)
    659.25, // E5 (Taar Ga)
  ];

  const playPluck = (ctx: AudioContext, freq: number, delayMs: number) => {
    setTimeout(() => {
      if (!ctx || ctx.state === 'closed') return;
      
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Sitar/Bansuri warm harmonic shape
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Attack and gentle decay (like a soft sitar pluck)
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.04, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.3);
    }, delayMs);
  };

  const startMusicLoop = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Gentle Tanpura continuous drone (Sa and Pa)
      const droneSa = ctx.createOscillator();
      const dronePa = ctx.createOscillator();
      const droneGain = ctx.createGain();

      droneSa.type = 'sine';
      droneSa.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
      dronePa.type = 'sine';
      dronePa.frequency.setValueAtTime(196.00, ctx.currentTime); // G3

      droneGain.gain.setValueAtTime(0.015, ctx.currentTime);

      droneSa.connect(droneGain);
      dronePa.connect(droneGain);
      droneGain.connect(ctx.destination);

      droneSa.start();
      dronePa.start();

      let step = 0;
      // Gentle melodic progression in Raga Bhoopali
      const melodySequence = [0, 1, 2, 4, 3, 2, 1, 0, 4, 5, 4, 3, 2, 0];

      const tick = () => {
        if (!audioCtxRef.current) return;
        const noteIdx = melodySequence[step % melodySequence.length];
        const freq = ragaFrequencies[noteIdx];
        playPluck(ctx, freq, 0);

        step++;
        // Gentle contemplative tempo
        timerRef.current = window.setTimeout(tick, 900 + Math.random() * 400);
      };

      tick();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const stopMusic = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusicLoop();
    }
  };

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleMusic}
        type="button"
        aria-label={isPlaying ? "Mute ambient music" : "Play ambient Indian wedding music"}
        className={`group relative flex items-center space-x-2.5 px-4 py-2.5 rounded-full shadow-lg border transition-all duration-300 ${
          isPlaying
            ? 'bg-maroon-DEFAULT text-ivory-50 border-gold shadow-gold/20 scale-105'
            : 'bg-ivory-50/95 backdrop-blur-md text-charcoal border-gold/40 hover:border-gold hover:shadow-md'
        }`}
      >
        {/* Animated wave bars or icon */}
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

        <span className="text-xs font-serif tracking-wider uppercase font-semibold">
          {isPlaying ? 'Music Playing' : 'Shehnai Raga'}
        </span>

        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-gold-light" />
        ) : (
          <VolumeX className="w-4 h-4 text-charcoal/40 group-hover:text-gold" />
        )}

        {/* Pulse glow indicator */}
        {isPlaying && (
          <span className="absolute -inset-0.5 rounded-full bg-gold/20 animate-ping pointer-events-none" />
        )}
      </button>
    </div>
  );
};
