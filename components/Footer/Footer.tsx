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
