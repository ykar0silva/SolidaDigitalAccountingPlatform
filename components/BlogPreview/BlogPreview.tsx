import Link from "next/link";
import Image from "next/image";
import { posts } from "@/data/posts";

export default function BlogPreview() {
  const recentes = posts.slice(0, 3);

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="font-display text-azul text-3xl md:text-4xl">
          Últimas do blog
        </h2>
        <p className="font-sans text-azul/70 text-sm mt-3">
          Informação que ajuda sua empresa a ficar em dia com o fisco
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {recentes.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl overflow-hidden bg-creme border border-azul/10 shadow-md shadow-azul/10 hover:shadow-xl hover:shadow-azul/15 hover:-translate-y-1 hover:border-dourado-escuro/50 transition-all duration-300"
          >
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <span className="font-sans text-dourado-escuro text-xs uppercase tracking-wide">
                {post.category}
              </span>
              <h3 className="font-display text-azul text-lg mt-2 leading-snug">
                {post.title}
              </h3>
              <p className="font-sans text-azul/60 text-sm mt-2 line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/blog"
          className="inline-block px-8 py-3 rounded-full border border-dourado-escuro text-dourado-escuro font-sans font-semibold hover:bg-dourado-escuro hover:text-white transition-colors"
        >
          Ver todos os artigos
        </Link>
      </div>
    </section>
  );
} 