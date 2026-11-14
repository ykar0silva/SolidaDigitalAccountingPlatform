import { servicos } from "@/data/servicos";

export default function Servicos() {
  return (
    <section id="servicos" className="bg-creme px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#A87D4F]">
            Nossos serviços
          </p>
          <h2 className="mt-3 font-display text-3xl text-azul md:text-5xl text-balance">
            Soluções completas para a sua empresa
          </h2>
          <p className="mt-5 font-sans text-base leading-relaxed text-azul/70">
            Contabilidade, fiscal, trabalhista e planejamento tributário para
            empresas de todos os portes.
          </p>
        </div>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {servicos.map((servico, i) => (
            <li
              key={servico.titulo}
              className={`relative flex flex-col rounded-2xl border p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0 hover:shadow-xl md:p-8 ${
                servico.destaque
                  ? "border-dourado/40 bg-azul text-white shadow-lg shadow-azul/20"
                  : "border-azul/10 bg-white text-azul shadow-md shadow-azul/10"
              }`}
            >
              {servico.destaque && (
                <span className="absolute right-6 top-6 rounded-full bg-dourado px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-azul">
                  Tema atual
                </span>
              )}

              <span aria-hidden="true" className="font-display text-4xl tabular-nums text-dourado/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div aria-hidden="true" className="my-5 h-px w-10 bg-dourado" />
              <h3 className="font-display text-xl md:text-2xl">{servico.titulo}</h3>
              <p
                className={`mt-3 font-sans text-sm leading-relaxed ${
                  servico.destaque ? "text-white/75" : "text-azul/70"
                }`}
              >
                {servico.descricao}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}