import Image from "next/image";
import Link from "next/link";
import { navegacao } from "@/data/navegacao";
import {
  contato,
  enderecoCompleto,
  formatarWhatsApp,
  linkTelefone,
  propsWhatsApp,
  temWhatsApp,
  whatsappEhTelefone,
} from "@/data/contato";

const fases = [
  { label: "Abrir a empresa", href: "/#servicos" },
  { label: "Manter a rotina em dia", href: "/#servicos" },
  { label: "Planejar o crescimento", href: "/#servicos" },
  { label: "Reforma Tributária", href: "/#servicos" },
];

// Ícones das redes (traço simples, herdam a cor do texto)
const icones: Record<string, React.ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-5 w-5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.25 7a1.97 1.97 0 0 0 0-3.94ZM20.44 13.4c0-3.08-1.64-4.52-3.84-4.52-1.77 0-2.56.98-3 1.66V8.5h-3.38V20h3.38v-6.06c0-1.6.3-3.14 2.28-3.14 1.95 0 1.98 1.82 1.98 3.24V20h3.38l.02-6.6Z" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M13.5 21v-7.5h2.53l.38-2.94H13.5V8.69c0-.85.24-1.43 1.46-1.43h1.56V4.64c-.27-.04-1.2-.12-2.27-.12-2.25 0-3.79 1.37-3.79 3.89v2.17H7.92v2.94h2.54V21h3.04Z" />
    </svg>
  ),
};

// Texto do botão: o @ quando dá para tirar do endereço
const rotuloRede = (nome: string, url: string) => {
  const usuario = url.match(/instagram\.com\/([^/?#]+)/)?.[1];
  return usuario ? `@${usuario}` : nome;
};

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
              Contabilidade para empresas e MEIs em {contato.endereco.cidade}-{contato.endereco.uf}, desde 2008.
            </p>
            {redes.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-3 font-sans text-sm">
                {redes.map((r) => (
                  <li key={r.nome}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${r.nome} da Sólida: ${rotuloRede(r.nome, r.url)}`}
                      className="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-dourado/40 bg-white/5 px-4 font-semibold text-white transition-colors hover:border-dourado hover:bg-dourado hover:text-azul focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dourado"
                    >
                      <span className="text-dourado transition-colors [a:hover_&]:text-azul">{icones[r.nome]}</span>
                      {rotuloRede(r.nome, r.url)}
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
              {contato.telefone && !whatsappEhTelefone && (
                <li>
                  <a href={linkTelefone(contato.telefone)} className={linkClasse}>
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
