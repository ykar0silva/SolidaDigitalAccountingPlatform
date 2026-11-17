import Image from "next/image";
import Link from "next/link";
import { formatarData, type PostResumo } from "@/lib/blog";

// Card de post com imagem. destaque=true: card largo (imagem ao lado no desktop)
export default function CardPost({ post, destaque = false }: { post: PostResumo; destaque?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-azul/10 bg-white shadow-sm shadow-azul/5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-dourado focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239] motion-reduce:hover:translate-y-0 ${
        destaque ? "md:grid md:grid-cols-[1.15fr_1fr]" : ""
      }`}
    >
      {post.capa && (
        <div className={`relative aspect-[16/10] overflow-hidden bg-azul/5 ${destaque ? "md:aspect-auto md:min-h-[340px]" : ""}`}>
          <Image
            src={post.capa}
            alt={post.capaAlt}
            fill
            sizes={destaque ? "(min-width: 768px) 600px, 100vw" : "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
          />
        </div>
      )}
      <div className={`flex flex-1 flex-col p-7 ${destaque ? "md:justify-center md:p-10" : ""}`}>
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6239]">{post.categoria}</span>
        <span
          className={`mt-3 font-display leading-snug text-azul text-balance ${destaque ? "text-3xl md:text-[2.1rem]" : "text-2xl"}`}
        >
          {post.titulo}
        </span>
        <span
          className={`mt-3 font-sans leading-relaxed text-azul/65 ${destaque ? "text-base line-clamp-4" : "flex-1 text-sm line-clamp-3"}`}
        >
          {post.resumo}
        </span>
        <span className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs text-azul/50">
          <time dateTime={post.data}>{formatarData(post.data)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.minutos} min de leitura</span>
        </span>
      </div>
    </Link>
  );
}
