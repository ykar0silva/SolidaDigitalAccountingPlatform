// Perguntas do Diagnóstico empresarial (/diagnostico).
// Cada resposta vale 0, 1 ou 2 pontos. A nota final vai de 0 a 100.
// "dica" aparece no resultado quando a resposta não fez a nota máxima.

export type Area = "Finanças" | "Impostos" | "Sócios e equipe" | "Gestão";

export type Pergunta = {
  id: string;
  tema: string; // nome curto, usado no resultado e na mensagem do WhatsApp
  area: Area;
  texto: string;
  opcoes: { rotulo: string; pontos: 0 | 1 | 2 }[];
  dica: string;
  ferramenta?: string; // slug de uma calculadora em /ferramentas
};

export const perguntas: Pergunta[] = [
  {
    id: "contas",
    tema: "Contas separadas",
    area: "Finanças",
    texto: "As contas da empresa ficam separadas das suas contas pessoais?",
    opcoes: [
      { rotulo: "Sim, totalmente", pontos: 2 },
      { rotulo: "Em parte", pontos: 1 },
      { rotulo: "Não, está tudo junto", pontos: 0 },
    ],
    dica: "Misturar as contas esconde o lucro de verdade e complica a contabilidade. Use uma conta bancária só da empresa.",
  },
  {
    id: "caixa",
    tema: "Fluxo de caixa",
    area: "Finanças",
    texto: "Você registra todo o dinheiro que entra e sai da empresa?",
    opcoes: [
      { rotulo: "Sim, toda semana", pontos: 2 },
      { rotulo: "De vez em quando", pontos: 1 },
      { rotulo: "Não registro", pontos: 0 },
    ],
    dica: "Sem fluxo de caixa, a falta de dinheiro só aparece quando a conta vence. Anotar entradas e saídas toda semana já resolve boa parte.",
  },
  {
    id: "reserva",
    tema: "Reserva de caixa",
    area: "Finanças",
    texto: "A empresa tem uma reserva para pagar 3 meses de despesas?",
    opcoes: [
      { rotulo: "Sim, ou mais", pontos: 2 },
      { rotulo: "Tem, mas menos que isso", pontos: 1 },
      { rotulo: "Não tem reserva", pontos: 0 },
    ],
    dica: "Uma reserva de 3 meses segura a empresa em meses fracos sem precisar de empréstimo caro. Separe um percentual fixo do lucro todo mês.",
  },
  {
    id: "margem",
    tema: "Margem de lucro",
    area: "Finanças",
    texto: "Você sabe qual é a margem de lucro do seu negócio?",
    opcoes: [
      { rotulo: "Sei com precisão", pontos: 2 },
      { rotulo: "Tenho uma ideia", pontos: 1 },
      { rotulo: "Não sei", pontos: 0 },
    ],
    dica: "Saber quanto sobra de cada venda é o que permite definir preço e desconto com segurança.",
    ferramenta: "margem-lucro",
  },
  {
    id: "guias",
    tema: "Impostos em dia",
    area: "Impostos",
    texto: "Os impostos e as guias da empresa estão em dia?",
    opcoes: [
      { rotulo: "Sim, todos", pontos: 2 },
      { rotulo: "Há alguns atrasados", pontos: 1 },
      { rotulo: "Muitos atrasados, ou não sei", pontos: 0 },
    ],
    dica: "Imposto atrasado gera multa e juros todo mês e pode tirar a empresa do Simples. Dá para regularizar e parcelar.",
  },
  {
    id: "notas",
    tema: "Notas fiscais",
    area: "Impostos",
    texto: "A empresa emite nota fiscal de todas as vendas?",
    opcoes: [
      { rotulo: "Sempre", pontos: 2 },
      { rotulo: "Na maioria das vezes", pontos: 1 },
      { rotulo: "Raramente", pontos: 0 },
    ],
    dica: "Venda sem nota é risco de autuação e deixa o faturamento oficial menor que o real, o que atrapalha crédito e financiamento.",
  },
  {
    id: "regime",
    tema: "Revisão do regime tributário",
    area: "Impostos",
    texto: "Quando foi revisado se o regime tributário ainda é o mais barato para a empresa?",
    opcoes: [
      { rotulo: "No último ano", pontos: 2 },
      { rotulo: "Há mais de um ano", pontos: 1 },
      { rotulo: "Nunca foi revisado", pontos: 0 },
    ],
    dica: "Quando o faturamento ou a folha mudam, o regime mais barato também pode mudar. A revisão é feita antes de janeiro, quando se escolhe o regime do ano.",
    ferramenta: "regime-tributario",
  },
  {
    id: "reforma",
    tema: "Reforma Tributária",
    area: "Impostos",
    texto: "Você já sabe como a Reforma Tributária vai afetar a sua empresa?",
    opcoes: [
      { rotulo: "Sim, já planejei", pontos: 2 },
      { rotulo: "Já ouvi falar", pontos: 1 },
      { rotulo: "Ainda não", pontos: 0 },
    ],
    dica: "A troca de PIS, COFINS, ICMS e ISS por CBS e IBS muda preços, créditos e contratos até 2033. Quem se prepara antes evita surpresas.",
  },
  {
    id: "prolabore",
    tema: "Pró-labore",
    area: "Sócios e equipe",
    texto: "Os sócios recebem um pró-labore definido, com INSS?",
    opcoes: [
      { rotulo: "Sim, valor fixo todo mês", pontos: 2 },
      { rotulo: "Às vezes", pontos: 1 },
      { rotulo: "Não, retiramos quando precisa", pontos: 0 },
    ],
    dica: "Retirar dinheiro sem regra mistura salário e lucro. Um pró-labore definido garante o INSS dos sócios e organiza a distribuição de lucros.",
    ferramenta: "pro-labore",
  },
  {
    id: "equipe",
    tema: "Registro dos funcionários",
    area: "Sócios e equipe",
    texto: "Os funcionários estão registrados e com a folha em dia?",
    opcoes: [
      { rotulo: "Sim, ou não tenho funcionários", pontos: 2 },
      { rotulo: "A maioria", pontos: 1 },
      { rotulo: "Não", pontos: 0 },
    ],
    dica: "Funcionário sem registro é o maior risco trabalhista de uma pequena empresa. Regularizar sai mais barato que um processo.",
  },
  {
    id: "relatorios",
    tema: "Relatórios contábeis",
    area: "Gestão",
    texto: "Você recebe relatórios da contabilidade e usa para decidir?",
    opcoes: [
      { rotulo: "Sim, todo mês", pontos: 2 },
      { rotulo: "Só no fim do ano", pontos: 1 },
      { rotulo: "Não recebo ou não uso", pontos: 0 },
    ],
    dica: "A contabilidade pode mostrar todo mês onde a empresa ganha e perde dinheiro. Peça a DRE mensal e use nas decisões.",
  },
  {
    id: "metas",
    tema: "Metas de faturamento",
    area: "Gestão",
    texto: "A empresa tem metas de faturamento e acompanha os resultados?",
    opcoes: [
      { rotulo: "Sim, com acompanhamento", pontos: 2 },
      { rotulo: "Mais ou menos", pontos: 1 },
      { rotulo: "Não tem metas", pontos: 0 },
    ],
    dica: "Uma meta mensal, comparada com o ponto de equilíbrio, mostra se a empresa está crescendo ou só sobrevivendo.",
    ferramenta: "ponto-equilibrio",
  },
];

export const areas: Area[] = ["Finanças", "Impostos", "Sócios e equipe", "Gestão"];

// Faixas do resultado
export function classificar(nota: number) {
  if (nota >= 80)
    return {
      titulo: "Empresa saudável",
      texto: "A base está bem organizada. Os pontos abaixo ajudam a dar o próximo passo.",
    };
  if (nota >= 50)
    return {
      titulo: "Pontos de atenção",
      texto: "A empresa funciona, mas tem pontos que podem custar caro se ficarem como estão.",
    };
  return {
    titulo: "Precisa de cuidado",
    texto: "Há riscos importantes. A boa notícia é que quase todos têm solução rápida com acompanhamento.",
  };
}
