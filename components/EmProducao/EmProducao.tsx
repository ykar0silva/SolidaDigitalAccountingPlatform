import Link from "next/link";

export default function EmProducao() {
  return (
    <main id="conteudo" className="min-h-screen bg-azul flex flex-col items-center justify-center px-6 text-center">
      <span className="font-sans text-dourado text-xs uppercase tracking-widest mb-4">
        Em breve
      </span>
      <h1 className="font-display text-white text-3xl md:text-4xl mb-3 text-balance">
        Página em desenvolvimento
      </h1>
      <p className="font-sans text-white/60 text-sm mb-10">
        Desenvolvedor de software: Ykaro Silva
      </p>
      <Link
        href="/"
        className="px-8 py-3 rounded-full border border-dourado text-dourado font-sans font-semibold hover:bg-dourado hover:text-azul transition-colors"
      >
        Voltar para o início
      </Link>
    </main>
  );
}
