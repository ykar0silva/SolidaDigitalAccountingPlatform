import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CardPost from "@/components/Blog/CardPost";
import Newsletter from "@/components/Newsletter/Newsletter";
import { buscarPost, formatarData, listarPosts } from "@/lib/blog";
import { propsWhatsApp } from "@/data/contato";
import { URL_SITE } from "@/data/site";
import s from "@/components/Blog/artigo.module.css";

// Só existem os posts que estão em content/blog/
export const dynamicParams = false;

export function generateStaticParams() {
  return listarPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = buscarPost(slug);
  if (!post) return {};
  return {
    title: `${post.titulo} | Blog da Sólida`,
    description: post.resumo,
    openGraph: { type: "article", title: post.titulo, description: post.resumo, publishedTime: post.data },
  };
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = buscarPost(slug);
  if (!post) notFound();

  const outros = listarPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  // Dados estruturados do artigo (Google e IAs)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.resumo,
    datePublished: post.data,
    inLanguage: "pt-BR",
    author: { "@type": "Organization", name: "Sólida Assessoria Contábil" },
    publisher: { "@type": "Organization", name: "Sólida Assessoria Contábil" },
  };

  return (
    <main id="conteudo" className="bg-creme">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <article>
        <header className="bg-azul px-6 pb-14 pt-36 md:pb-16 md:pt-44">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Você está em" className="font-sans text-xs font-semibold uppercase tracking-[0.2em]">
              <ol className="flex flex-wrap items-center gap-2 text-white/50">
                <li>
                  <Link href="/blog" className="text-dourado transition-colors hover:text-white">
                    Blog
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>{post.categoria}</li>
              </ol>
            </nav>
            <h1 className="mt-4 font-display text-3xl leading-[1.15] text-white text-balance md:text-5xl">{post.titulo}</h1>
            <p className="mt-5 font-sans text-base leading-relaxed text-white/70 md:text-lg">{post.resumo}</p>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-sm text-white/55">
              <span>{post.autor}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.data}>{formatarData(post.data)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.minutos} min de leitura</span>
            </p>
          </div>
        </header>

        <div className="px-6 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className={s.artigo} dangerouslySetInnerHTML={{ __html: post.html }} />

            <p className="mt-10 border-t border-azul/10 pt-6 font-sans text-sm leading-relaxed text-azul/55">
              Conteúdo informativo, de acordo com as regras em vigor em {formatarData(post.data)}. Cada empresa tem detalhes
              que mudam a conta: para decidir, fale com um contador.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                {...propsWhatsApp(`Olá! Li o artigo "${post.titulo}" no site da Sólida e quero conversar sobre o meu caso.`)}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-azul px-7 font-sans text-sm font-semibold text-white transition-colors hover:bg-[#8C6239] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239] focus-visible:ring-offset-2"
              >
                Falar com a Sólida sobre isso
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${post.titulo} ${URL_SITE}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-azul/20 px-7 font-sans text-sm font-semibold text-azul transition-colors hover:border-azul focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239]"
              >
                Compartilhar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </article>

      <section className="px-6 pb-16" aria-label="Newsletter">
        <div className="mx-auto max-w-3xl">
          <Newsletter />
        </div>
      </section>

      {outros.length > 0 && (
        <section className="border-t border-azul/10 px-6 py-16 md:py-20" aria-labelledby="outros-titulo">
          <div className="mx-auto max-w-6xl">
            <h2 id="outros-titulo" className="font-display text-3xl text-azul">
              Leia também
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {outros.map((p) => (
                <li key={p.slug}>
                  <CardPost post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
