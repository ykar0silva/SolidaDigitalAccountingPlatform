import { avaliacoes } from "@/data/avaliacoes";
import { Estrelas } from "./CardGoogle";

function Card({ item }: { item: (typeof avaliacoes)[number] }) {
    return (
        <div className="mr-6 flex min-h-[210px] w-[290px] shrink-0 flex-col justify-between rounded-2xl border border-azul/10 bg-white p-6 shadow-md shadow-azul/10 md:w-[340px]">
            <div>
                <Estrelas nota={item.nota} className="text-lg" />
                <p className="mt-3 line-clamp-4 font-sans text-sm leading-relaxed text-azul/70">
                    {item.texto}
                </p>
            </div>

            <div className="mt-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-azul font-display text-lg text-dourado">
                    {item.nome.charAt(0)}
                </div>
                <div>
                    <p className="font-sans text-sm font-semibold text-azul">{item.nome}</p>
                    <p className="font-sans text-xs text-azul/50">{item.detalhe}</p>
                </div>
            </div>
        </div>
    );
}

export default function Avaliacoes() {
    const mask = "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";

    return (
        <section className="bg-creme pb-10 pt-6 md:pb-12 md:pt-8">
            <div className="marquee overflow-hidden" style={{ maskImage: mask, WebkitMaskImage: mask }}>
                <div className="marquee-track">
                    {avaliacoes.map((item, i) => (
                        <Card key={`a-${i}`} item={item} />
                    ))}
                    {avaliacoes.map((item, i) => (
                        <div key={`b-${i}`} aria-hidden="true">
                            <Card item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}