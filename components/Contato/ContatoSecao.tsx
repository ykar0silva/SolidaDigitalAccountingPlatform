import ContatoBloco from "./ContatoBloco";
import FotosEscritorio from "./FotosEscritorio";

// Seção de contato da home: chamada + WhatsApp, endereço, horário e mapa.
export default function ContatoSecao() {
  return (
    <section id="contato" className="border-t border-azul/10 bg-creme px-6 py-24 md:py-32" aria-labelledby="contato-titulo">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6239]">Contato</p>
          <h2 id="contato-titulo" className="mt-3 font-display text-4xl leading-[1.1] text-azul text-balance md:text-5xl">
            Vamos conversar sobre a sua empresa?
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-azul/70 md:text-lg">
            Conte o momento do seu negócio e a gente mostra o caminho, do registro ao planejamento.
          </p>
        </div>
        <ContatoBloco />
        <FotosEscritorio />
      </div>
    </section>
  );
}
