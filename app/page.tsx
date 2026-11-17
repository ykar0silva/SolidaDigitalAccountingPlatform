import Hero from "@/components/Hero/Hero";
import Avaliacoes from "@/components/Avaliacoes/Avaliacoes";
import Socias from "@/components/Socias/Socias";
import Servicos from "@/components/Servicos/Servicos";
import FerramentasDestaque from "@/components/FerramentasDestaque/FerramentasDestaque";
import Escritorio from "@/components/Escritorio/Escritorio";
import ContatoSecao from "@/components/Contato/ContatoSecao";
import { listarPosts } from "@/lib/blog";

// Seção ainda em revisão, fora da página por enquanto (o componente
// continua no projeto): Equipe (components/Equipe).

export default function Home() {
  const ultimo = listarPosts()[0];
  return (
    <main id="conteudo">
      <Hero />
      <Avaliacoes />
      <Socias />
      <Servicos />
      <FerramentasDestaque ultimoPost={ultimo && { slug: ultimo.slug, titulo: ultimo.titulo, categoria: ultimo.categoria, data: ultimo.data }} />
      <Escritorio />
      <ContatoSecao />
    </main>
  );
}
