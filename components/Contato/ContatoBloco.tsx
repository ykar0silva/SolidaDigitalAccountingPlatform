import {
  contato,
  enderecoCompleto,
  formatarWhatsApp,
  linkTelefone,
  propsWhatsApp,
  whatsappEhTelefone,
} from "@/data/contato";

// Cartões de contato (WhatsApp, endereço, horário) + mapa do escritório.
// Usado na home (seção Contato) e na página /contato.

type Canal = { rotulo: string; valor: string; href?: string; externo?: boolean; acao?: string; numero?: boolean };

const cartao = "rounded-2xl border border-azul/10 bg-white p-6 shadow-sm shadow-azul/5 md:p-7";
const rotulo = "font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6239]";

export default function ContatoBloco() {
  const { rua } = contato.endereco;
  const endereco = enderecoCompleto();

  const canais: Canal[] = [];
  if (contato.whatsapp) {
    const p = propsWhatsApp("Olá! Vim pelo site e quero falar com a Sólida.");
    canais.push({ rotulo: "WhatsApp", valor: formatarWhatsApp(contato.whatsapp), href: p.href, externo: true, acao: "Chamar no WhatsApp", numero: true });
  }
  if (contato.telefone && !whatsappEhTelefone) {
    canais.push({ rotulo: "Telefone", valor: contato.telefone, href: linkTelefone(contato.telefone), acao: "Ligar", numero: true });
  }
  if (contato.email) {
    canais.push({ rotulo: "E-mail", valor: contato.email, href: `mailto:${contato.email}`, acao: "Enviar e-mail" });
  }

  const busca = contato.mapaBusca ?? (rua ? endereco : null);
  const mapa = busca ? `https://www.google.com/maps?q=${encodeURIComponent(busca)}&output=embed` : null;
  const rota = busca ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(busca)}` : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
      {/* Canais */}
      <div className="flex flex-col gap-4">
        {canais.map((c) => (
          <a
            key={c.rotulo}
            href={c.href}
            {...(c.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`group flex flex-wrap items-center justify-between gap-4 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-dourado focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239] motion-reduce:hover:translate-y-0 ${cartao}`}
          >
            <span className="min-w-0">
              <span className={`block ${rotulo}`}>{c.rotulo}</span>
              <span className={`mt-2 block font-sans text-lg font-semibold text-azul md:text-xl ${c.numero ? "whitespace-nowrap tabular-nums" : "break-words"}`}>
                {c.valor}
              </span>
            </span>
            <span className="shrink-0 rounded-full border border-azul/15 px-4 py-2 font-sans text-sm font-semibold text-azul transition-colors group-hover:border-dourado group-hover:bg-dourado">
              {c.acao}
            </span>
          </a>
        ))}

        <div className={cartao}>
          <p className={rotulo}>Endereço</p>
          <p className="mt-2 font-sans text-lg font-semibold text-azul md:text-xl">{endereco}</p>
          {contato.endereco.cep && (
            <p className="mt-1 font-sans text-sm tabular-nums text-azul/60">CEP {contato.endereco.cep}</p>
          )}
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
          <div className={cartao}>
            <p className={rotulo}>Horário de atendimento</p>
            <ul className="mt-2 space-y-1 font-sans text-base text-azul">
              {contato.horario.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Mapa */}
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
        </div>
      )}
    </div>
  );
}
