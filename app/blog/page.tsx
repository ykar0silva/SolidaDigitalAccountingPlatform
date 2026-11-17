import type { Metadata } from "next";
import CardPost from "@/components/Blog/CardPost";
import Newsletter from "@/components/Newsletter/Newsletter";
import { listarPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Sólida Assessoria Contábil",
  description:
    "Notícias fiscais e dicas para empresas e MEIs: Imposto de Renda, Reforma Tributária, Simples Nacional e gestão, em linguagem simples.",
};

export default function Page() {
  const posts = listarPosts();
  const [maisRecente, ...demais] = posts;

  return (
    <main id="conteudo" className="bg-creme">
      <section className="bg-azul px-6 pb-14 pt-36 md:pb-16 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-dourado">Blog</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.1] text-white text-balance md:text-6xl">
            Notícias e dicas para a sua empresa
          </h1>
          <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/70 md:text-lg">
            O que muda nos impostos, nos prazos e na gestão, explicado sem complicação.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 md:py-16" aria-label="Artigos">
        <div className="mx-auto max-w-6xl">
          {posts.length === 0 ? (
            <p className="rounded-3xl bg-white p-10 text-center font-sans text-azul/70">Os primeiros artigos chegam em breve.</p>
          ) : (
            <>
              {maisRecente && <CardPost post={maisRecente} destaque />}
              {demais.length > 0 && (
                <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {demais.map((p) => (
                    <li key={p.slug}>
                      <CardPost post={p} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <Newsletter tom="escuro" />
        </div>
      </section>
    </main>
  );
}
