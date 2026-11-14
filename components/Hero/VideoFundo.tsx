"use client";

import { useEffect, useRef, useState } from "react";

// Vídeo decorativo do Hero: só toca sozinho se a pessoa não pediu menos
// movimento no sistema, e sempre tem botão para pausar.
export default function VideoFundo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tocando, setTocando] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!menosMovimento) {
      video.play().catch(() => {
        // Autoplay bloqueado ou vídeo ausente: fica no poster
      });
    }
  }, []);

  const alternar = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setTocando(true)}
        onPause={() => setTocando(false)}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={alternar}
        aria-label={tocando ? "Pausar vídeo de fundo" : "Reproduzir vídeo de fundo"}
        aria-pressed={!tocando}
        className="absolute right-4 top-24 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-azul/50 text-white backdrop-blur-sm transition-colors hover:border-dourado hover:text-dourado focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dourado md:right-8 md:top-32"
      >
        {tocando ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
          </svg>
        )}
      </button>
    </>
  );
}
