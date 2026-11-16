import type { Metadata } from "next";
import { contato, enderecoCompleto, formatarWhatsApp, propsWhatsApp } from "@/data/contato";

export const metadata: Metadata = {
  title: "Contato | Sólida Assessoria Contábil",
  description: "Fale com a Sólida Assessoria Contábil em Palmas-TO: WhatsApp, telefone, e-mail e endereço.",
};

type Canal = { rotulo: string; valor: string; href?: string; externo?: boolean; acao?: string };

export default function Page() {
  const { rua, bairro } = contato.endereco;
  const endereco = enderecoCompleto();

  const canais: Canal[] = [];
  if (contato.whatsapp) {
    const p = propsWhatsApp("Olá! Vim pelo site e quero falar com a Sólida.");
    canais.push({ rotulo: "WhatsApp", valor: formatarWhatsApp(contato.whatsapp), href: p.href, externo: true, acao: "Chamar no WhatsApp" });
  }
  if (contato.telefone) {
    canais.push({ rotulo: "Telefone", valor: contato.telefone, href: `tel:${contato.telefone.replace(/\D/g, "")}`, acao: "Ligar" });
  }
  if (contato.email) {
    canais.push({ rotulo: "E-mail", valor: contato.email, href: `mailto:${contato.email}`, acao: "Enviar e-mail" });
  }

  const mapa = rua
    ? `https://www.google.com/maps?q=${encodeURIComponent(endereco)}&output=embed`
    : null;
  const rota = rua
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(endereco)}`
    : null;

  return (
    <main id="conteudo">
      {/* Cabeçalho */}
      <section className="bg-azul px-6 pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-dourado">Contato</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.1] text-white text-balance md:text-6xl">
            Fale com a Sólida
          </h1>
          <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-white/70 md:text-lg">
            Conte o momento da sua empresa e a gente responde com o caminho certo para ela.
          </p>
        </div>
      </section>

      <section className="bg-creme px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          {/* Canais */}
          <div className="flex flex-col gap-4">
            {canais.map((c) => (
              <a
                key={c.rotulo}
                href={c.href}
                {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-azul/10 bg-white p-6 shadow-sm shadow-azul/5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-dourado focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239] md:p-7"
              >
                <span className="min-w-0">
                  <span className="block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6239]">
                    {c.rotulo}
                  </span>
                  <span className="mt-2 block break-words font-sans text-lg font-semibold text-azul md:text-xl">
                    {c.valor}
                  </span>
                </span>
                <span className="shrink-0 rounded-full border border-azul/15 px-4 py-2 font-sans text-sm font-semibold text-azul transition-colors group-hover:border-dourado group-hover:bg-dourado">
                  {c.acao}
                </span>
              </a>
            ))}

            <div className="rounded-2xl border border-azul/10 bg-white p-6 shadow-sm shadow-azul/5 md:p-7">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6239]">Endereço</p>
              <p className="mt-2 font-sans text-lg font-semibold text-azul md:text-xl">{endereco}</p>
              {bairro && !rua && <p className="mt-1 font-sans text-sm text-azul/60">{bairro}</p>}
              {rota && (
                <a
                  href={rota}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 items-center rounded-full border border-azul/15 px-4 font-sans text-sm font-semibold text-azul transition-colors hover:border-dourado hover:bg-dourado focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239]"
                >
                  Como chegar
                </a>
              )}
            </div>

            {contato.horario.length > 0 && (
              <div className="rounded-2xl border border-azul/10 bg-white p-6 shadow-sm shadow-azul/5 md:p-7">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6239]">Horário de atendimento</p>
                <ul className="mt-2 space-y-1 font-sans text-base text-azul">
                  {contato.horario.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Mapa (só com rua cadastrada) */}
          {mapa ? (
            <div className="min-h-[360px] overflow-hidden rounded-2xl border border-azul/10 bg-white shadow-sm shadow-azul/5">
              <iframe
                src={mapa}
                title={`Mapa: ${endereco}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[360px] w-full border-0"
              />
            </div>
          ) : (
            <div className="flex flex-col justify-center rounded-2xl bg-azul p-8 text-white md:p-12">
              <p className="font-display text-3xl leading-tight text-balance md:text-4xl">
                Contabilidade em {contato.endereco.cidade} desde 2008
              </p>
              <p className="mt-4 font-sans text-base leading-relaxed text-white/70">
                Abertura de empresa, rotina fiscal e contábil, folha de pagamento e planejamento tributário.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
