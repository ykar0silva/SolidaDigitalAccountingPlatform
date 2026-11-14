import CardGoogle from "@/components/Avaliacoes/CardGoogle";
import VideoFundo from "./VideoFundo";
const ruido =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0.1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";


export default function Hero() {
  return (
    <section className="relative h-[84dvh] min-h-[560px] w-full overflow-hidden bg-azul">
      <VideoFundo />

      <div className="pointer-events-none absolute inset-0 bg-azul/60" />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 md:h-44"
        style={{
          background: `linear-gradient(to bottom,
      rgba(243,238,230,0) 0%,
      rgba(243,238,230,0.02) 8%,
      rgba(243,238,230,0.08) 18%,
      rgba(243,238,230,0.18) 28%,
      rgba(243,238,230,0.32) 38%,
      rgba(243,238,230,0.48) 48%,
      rgba(243,238,230,0.64) 58%,
      rgba(243,238,230,0.78) 68%,
      rgba(243,238,230,0.89) 78%,
      rgba(243,238,230,0.96) 88%,
      rgba(243,238,230,0.995) 95%,
      #F3EEE6 100%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 md:h-44"
        style={{
          backgroundImage: ruido,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 30%, black 65%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 30%, black 65%, transparent 100%)",
        }}
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pb-32 text-center md:pb-28">
        <h1 className="font-display text-white text-4xl md:text-6xl leading-tight max-w-3xl text-balance">
          Do jeito certo desde o início.
          <br />
          Para o seu negócio ir mais longe.
        </h1>
        <a
          href="https://wa.me/NUMERO_AQUI?text=MENSAGEM_AQUI"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 px-8 py-3 rounded-full bg-dourado text-azul font-sans font-semibold hover:opacity-90 transition-opacity"
        >
          Fale com a gente no WhatsApp
        </a>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 px-4 md:bottom-8 md:px-6">
        <CardGoogle />
      </div>
    </section>
  );
}