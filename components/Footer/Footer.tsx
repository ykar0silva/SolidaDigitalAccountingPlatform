import Image from "next/image";
import Link from "next/link";
import {
  contato,
  enderecoCompleto,
  formatarWhatsApp,
  propsWhatsApp,
  temWhatsApp,
} from "@/data/contato";

const navegacao = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Ferramentas", href: "/ferramentas" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

const fases = [
  { label: "Abrir a empresa", href: "/#servicos" },
  { label: "Manter a rotina em dia", href: "/#servicos" },
  { label: "Planejar o crescimento", href: "/#servicos" },
  { label: "Reforma Tributária", href: "/#servicos" },
];

const redes = [
  { nome: "Instagram", url: contato.redes.instagram },
  { nome: "LinkedIn", url: contato.redes.linkedin },
  { nome: "Facebook", url: contato.redes.facebook },
].filter((r): r is { nome: string; url: string } => Boolean(r.url));

const ano = new Date().getFullYear();

const linkClasse =
  "rounded-sm text-white/70 transition-colors hover:text-dourado focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dourado";

function Coluna({ titulo, children, className = "" }: { titulo: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-dourado">{titulo}</p>
      <div className="mt-5 font-sans text-sm">{children}</div>
    </div>
  );
}

export default function Footer() {
  const endereco = enderecoCompleto();
  const temContato = temWhatsApp || contato.telefone || contato.email;

  return (
    <footer className="bg-azul text-white">
      {/* Chamada final */}
      <div className="border-b border-white/10 px-6 py-16 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-dourado">Contato</p>
            <h2 className="mt-3 font-display text-4xl leading-[1.1] text-balance md:text-5xl">
              Vamos conversar sobre a sua empresa?
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-white/70">
              Conte o momento do seu negócio e a gente mostra o caminho, do registro ao planejamento.
            </p>
          </div>
          <a
            {...propsWhatsApp("Olá! Vim pelo site e quero conversar sobre a minha empresa.")}
            className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-dourado px-7 py-3 font-sans text-sm font-semibold text-azul transition-colors hover:bg-[#dcb888] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dourado focus-visible:ring-offset-4 focus-visible:ring-offset-azul"
          >
            {temWhatsApp ? "Chamar no WhatsApp" : "Ver formas de contato"}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Colunas */}
      <div className="px-6 py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dourado">
              <Image
                src="/images/logo-principal-sem-fundo.png"
                alt="Sólida Assessoria Contábil"
                width={200}
                height={60}
                className="-ml-4 h-24 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-white/60">
              Contabilidade para pequenas empresas e MEIs em {contato.endereco.cidade}-{contato.endereco.uf}, desde 2008.
            </p>
            {redes.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-sans text-sm">
                {redes.map((r) => (
                  <li key={r.nome}>
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className={linkClasse}>
                      {r.nome}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Coluna titulo="Navegação">
            <ul className="space-y-3">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClasse}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Coluna>

          <Coluna titulo="Serviços">
            <ul className="space-y-3">
              {fases.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkClasse}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Coluna>

          <Coluna titulo="Atendimento" className="col-span-2 lg:col-span-1">
            <ul className="space-y-3 text-white/70">
              {contato.whatsapp && (
                <li>
                  <a {...propsWhatsApp("Olá! Vim pelo site.")} className={linkClasse}>
                    WhatsApp {formatarWhatsApp(contato.whatsapp)}
                  </a>
                </li>
              )}
              {contato.telefone && (
                <li>
                  <a href={`tel:${contato.telefone.replace(/\D/g, "")}`} className={linkClasse}>
                    {contato.telefone}
                  </a>
                </li>
              )}
              {contato.email && (
                <li>
                  <a href={`mailto:${contato.email}`} className={`${linkClasse} break-all`}>
                    {contato.email}
                  </a>
                </li>
              )}
              <li>{endereco}</li>
              {contato.horario.map((h) => (
                <li key={h}>{h}</li>
              ))}
              {!temContato && (
                <li>
                  <Link href="/contato" className={linkClasse}>
                    Ver página de contato
                  </Link>
                </li>
              )}
            </ul>
          </Coluna>
        </div>
      </div>

      {/* Linha final */}
      <div className="border-t border-white/10 px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 font-sans text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>© {ano} Sólida Assessoria Contábil. Todos os direitos reservados.</p>
          <p>Desenvolvido por Ykaro Silva</p>
        </div>
      </div>
    </footer>
  );
}
