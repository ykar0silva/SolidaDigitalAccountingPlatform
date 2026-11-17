import Link from "next/link";
import { formatarData, type PostResumo } from "@/lib/blog";

// Card de post. destaque=true: card largo do post mais recente
export default function CardPost({ post, destaque = false }: { post: PostResumo; destaque?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex h-full flex-col rounded-3xl border border-azul/10 bg-white p-7 shadow-sm shadow-azul/5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-dourado focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239] motion-reduce:hover:translate-y-0 ${
        destaque ? "md:p-10" : ""
      }`}
    >
      <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6239]">{post.categoria}</span>
      <span
        className={`mt-3 font-display leading-snug text-azul text-balance ${destaque ? "text-3xl md:text-4xl" : "text-2xl"}`}
      >
        {post.titulo}
      </span>
      <span className={`mt-3 flex-1 font-sans leading-relaxed text-azul/65 ${destaque ? "text-base md:text-lg" : "text-sm line-clamp-3"}`}>
        {post.resumo}
      </span>
      <span className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs text-azul/50">
        <time dateTime={post.data}>{formatarData(post.data)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.minutos} min de leitura</span>
      </span>
    </Link>
  );
}
