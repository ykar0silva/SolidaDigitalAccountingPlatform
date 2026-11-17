"use client";

import { useEffect, useRef } from "react";

// Vídeo decorativo do Hero: só toca sozinho se a pessoa não pediu menos
// movimento no sistema (nesse caso fica parado no poster).
export default function VideoFundo() {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      className="absolute inset-0 h-full w-full object-cover"
      poster="/images/hero-poster.jpg"
    >
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>
  );
}
