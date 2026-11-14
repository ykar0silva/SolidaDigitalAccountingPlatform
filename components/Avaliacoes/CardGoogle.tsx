import Link from "next/link";
import { resumo, linkAvaliar } from "@/data/avaliacoes";

const formatoNota = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const formatoTotal = new Intl.NumberFormat("pt-BR");

const formatarNota = (nota: number) => formatoNota.format(nota);

export function Estrelas({
  nota,
  className = "",
  corCheia = "text-dourado-escuro",
}: {
  nota: number;
  className?: string;
  corCheia?: string;
}) {
  return (
    <div
      className={`flex gap-0.5 ${className}`}
      role="img"
      aria-label={`Nota ${formatarNota(nota)} de 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={i <= Math.round(nota) ? corCheia : "text-azul/15"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function LogoGoogle() {
  return (
    <svg viewBox="0 0 48 48" className="h-6 w-6" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.5 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
      <path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

export default function CardGoogle() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-2xl bg-white/95 p-4 shadow-xl shadow-black/20 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between md:px-7 md:py-5">
      <div>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-azul/10">
            <LogoGoogle />
          </span>
          <p className="font-sans text-xl font-bold text-azul md:text-2xl">
            Avaliações do <span translate="no">Google</span>
          </p>
        </div>

        {resumo.nota && (
          <div className="mt-2 flex items-center gap-2 font-sans">
            <span className="text-lg font-bold tabular-nums text-azul">{formatarNota(resumo.nota)}</span>
            <Estrelas nota={resumo.nota} corCheia="text-[#FBBC04]" className="text-xl" />
            {resumo.total && (
              <span className="text-sm tabular-nums text-azul/60">({formatoTotal.format(resumo.total)})</span>
            )}
          </div>
        )}
      </div>

      <Link
        href={linkAvaliar}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-azul px-6 py-3 text-center font-sans text-sm font-semibold text-white transition-colors hover:bg-dourado-escuro"
      >
        Deixe sua avaliação
      </Link>
    </div>
  );
}