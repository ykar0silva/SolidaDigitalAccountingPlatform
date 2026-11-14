import Hero from "@/components/Hero/Hero";
import Avaliacoes from "@/components/Avaliacoes/Avaliacoes";
import Socias from "@/components/Socias/Socias";
import Equipe from "@/components/Equipe/Equipe";
import Servicos from "@/components/Servicos/Servicos";
import BlogPreview from "@/components/BlogPreview/BlogPreview";
import FerramentasDestaque from "@/components/FerramentasDestaque/FerramentasDestaque";


export default function Home() {
  return (
    <main>
      <Hero />
      <Avaliacoes />
      <Socias />
      <Servicos />
      <FerramentasDestaque />
      <Equipe />
      <BlogPreview />
    </main>
  );
}