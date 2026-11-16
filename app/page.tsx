import Hero from "@/components/Hero/Hero";
import Avaliacoes from "@/components/Avaliacoes/Avaliacoes";
import Socias from "@/components/Socias/Socias";
import Servicos from "@/components/Servicos/Servicos";
import FerramentasDestaque from "@/components/FerramentasDestaque/FerramentasDestaque";
import Escritorio from "@/components/Escritorio/Escritorio";
import ContatoSecao from "@/components/Contato/ContatoSecao";

// Seções ainda em revisão, fora da página por enquanto (os componentes
// continuam no projeto): Equipe (components/Equipe) e BlogPreview
// (components/BlogPreview). Para voltar, importe e coloque abaixo das
// ferramentas.

export default function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <Avaliacoes />
      <Socias />
      <Servicos />
      <FerramentasDestaque />
      <Escritorio />
      <ContatoSecao />
    </main>
  );
}
