// Termos do glossário (/glossario). Linguagem simples, sem juridiquês.
// Para acrescentar um termo, basta incluir um item; a ordem alfabética,
// as letras e a busca são montadas sozinhas.
// Revisado em 17/11/2026. Valores e prazos citados valem para 2026.

export type Categoria =
  | "Impostos e guias"
  | "Regimes e enquadramento"
  | "Abertura e registro"
  | "Pessoal e folha"
  | "Gestão e finanças"
  | "Reforma Tributária";

export type Termo = {
  termo: string;
  nome?: string; // nome por extenso, quando o termo é uma sigla
  definicao: string;
  categoria: Categoria;
  ferramenta?: string; // slug de uma calculadora em /ferramentas
};

export const glossario: Termo[] = [
  /* ---------------- Impostos e guias ---------------- */
  {
    termo: "DAS",
    nome: "Documento de Arrecadação do Simples Nacional",
    definicao:
      "A guia mensal que reúne, num pagamento só, os impostos da empresa do Simples Nacional. O MEI também paga por DAS, com valor fixo.",
    categoria: "Impostos e guias",
    ferramenta: "das-mei",
  },
  {
    termo: "DARF",
    nome: "Documento de Arrecadação de Receitas Federais",
    definicao:
      "Guia usada para pagar impostos federais fora do DAS, como IRPJ, CSLL, PIS, COFINS e o IR retido de funcionários.",
    categoria: "Impostos e guias",
  },
  {
    termo: "IRPJ",
    nome: "Imposto de Renda da Pessoa Jurídica",
    definicao:
      "Imposto federal sobre o lucro da empresa. A alíquota é de 15%, com adicional de 10% sobre o lucro que passar de R$ 20 mil por mês. No Simples, vem dentro do DAS.",
    categoria: "Impostos e guias",
    ferramenta: "regime-tributario",
  },
  {
    termo: "CSLL",
    nome: "Contribuição Social sobre o Lucro Líquido",
    definicao:
      "Contribuição federal que também incide sobre o lucro, em geral com alíquota de 9%. Anda junto com o IRPJ.",
    categoria: "Impostos e guias",
  },
  {
    termo: "PIS e COFINS",
    nome: "Programa de Integração Social e Contribuição para o Financiamento da Seguridade Social",
    definicao:
      "Contribuições federais sobre o faturamento. No Lucro Presumido somam 3,65%; no Lucro Real são 9,25%, com direito a créditos. A partir de 2027 são substituídas pela CBS.",
    categoria: "Impostos e guias",
  },
  {
    termo: "ICMS",
    nome: "Imposto sobre Circulação de Mercadorias e Serviços",
    definicao:
      "Imposto estadual sobre a venda de mercadorias, energia, comunicação e transporte entre cidades. Cada estado tem suas alíquotas. Será substituído aos poucos pelo IBS.",
    categoria: "Impostos e guias",
  },
  {
    termo: "ISS",
    nome: "Imposto Sobre Serviços",
    definicao:
      "Imposto municipal sobre a prestação de serviços, com alíquota entre 2% e 5%, conforme o serviço e a cidade. Será substituído aos poucos pelo IBS.",
    categoria: "Impostos e guias",
  },
  {
    termo: "IPI",
    nome: "Imposto sobre Produtos Industrializados",
    definicao: "Imposto federal cobrado da indústria quando o produto fabricado sai do estabelecimento.",
    categoria: "Impostos e guias",
  },
  {
    termo: "IRRF",
    nome: "Imposto de Renda Retido na Fonte",
    definicao:
      "O imposto que quem paga desconta e recolhe no lugar de quem recebe, como o IR descontado do salário e do pró-labore. Em 2026, rendimentos de até R$ 5.000 por mês ficaram isentos.",
    categoria: "Impostos e guias",
    ferramenta: "pro-labore",
  },
  {
    termo: "Alíquota efetiva",
    definicao:
      "O percentual de imposto que a empresa realmente paga sobre o faturamento, depois das deduções. No Simples, é sempre menor que a alíquota da tabela, porque cada faixa tem um valor a deduzir.",
    categoria: "Impostos e guias",
    ferramenta: "regime-tributario",
  },
  {
    termo: "DEFIS",
    nome: "Declaração de Informações Socioeconômicas e Fiscais",
    definicao:
      "Declaração anual das empresas do Simples Nacional, entregue até 31 de março, com informações como lucro distribuído aos sócios e número de funcionários.",
    categoria: "Impostos e guias",
  },
  {
    termo: "DASN-SIMEI",
    nome: "Declaração Anual do Simples Nacional do MEI",
    definicao: "A declaração anual do MEI, entregue até 31 de maio, informando quanto faturou no ano anterior.",
    categoria: "Impostos e guias",
  },
  {
    termo: "DCTFWeb",
    definicao:
      "Declaração mensal em que a empresa informa à Receita Federal as contribuições previdenciárias e outros tributos retidos. É dela que sai a guia para pagamento.",
    categoria: "Impostos e guias",
  },
  {
    termo: "Nota fiscal",
    nome: "NF-e e NFS-e",
    definicao:
      "Documento que registra uma venda (NF-e, para produtos) ou uma prestação de serviço (NFS-e). É a base para o cálculo dos impostos da empresa.",
    categoria: "Impostos e guias",
  },

  /* ---------------- Regimes e enquadramento ---------------- */
  {
    termo: "Regime tributário",
    definicao:
      "O conjunto de regras que define como a empresa calcula e paga seus impostos. Os principais são o Simples Nacional, o Lucro Presumido e o Lucro Real, e a escolha é feita no início de cada ano.",
    categoria: "Regimes e enquadramento",
    ferramenta: "regime-tributario",
  },
  {
    termo: "Simples Nacional",
    definicao:
      "Regime para empresas com faturamento de até R$ 4,8 milhões por ano. Junta vários impostos numa guia única (o DAS), com alíquotas que crescem conforme o faturamento.",
    categoria: "Regimes e enquadramento",
    ferramenta: "regime-tributario",
  },
  {
    termo: "Lucro Presumido",
    definicao:
      "Regime em que o IRPJ e a CSLL são calculados sobre um lucro estimado pela lei (por exemplo, 32% do faturamento em serviços), e não sobre o lucro real. Vale para empresas com faturamento de até R$ 78 milhões por ano.",
    categoria: "Regimes e enquadramento",
    ferramenta: "regime-tributario",
  },
  {
    termo: "Lucro Real",
    definicao:
      "Regime em que os impostos sobre o lucro são calculados sobre o lucro de verdade, apurado na contabilidade. É obrigatório acima de R$ 78 milhões de faturamento e para algumas atividades, e pode compensar para empresas com margem baixa.",
    categoria: "Regimes e enquadramento",
  },
  {
    termo: "Anexos do Simples",
    definicao:
      "As cinco tabelas do Simples Nacional. Cada atividade se encaixa num anexo: I para comércio, II para indústria e III, IV e V para serviços, cada um com suas alíquotas.",
    categoria: "Regimes e enquadramento",
    ferramenta: "regime-tributario",
  },
  {
    termo: "Fator R",
    definicao:
      "A divisão da folha de pagamento dos últimos 12 meses pelo faturamento do mesmo período. Em vários serviços, se der 28% ou mais, a empresa fica no Anexo III do Simples, com imposto menor; abaixo disso, vai para o Anexo V.",
    categoria: "Regimes e enquadramento",
    ferramenta: "regime-tributario",
  },
  {
    termo: "RBT12",
    nome: "Receita Bruta Total dos últimos 12 meses",
    definicao:
      "O faturamento somado dos 12 meses anteriores. No Simples, é ele que define a faixa e a alíquota do mês.",
    categoria: "Regimes e enquadramento",
  },
  {
    termo: "MEI",
    nome: "Microempreendedor Individual",
    definicao:
      "Formato para quem trabalha sozinho ou com até um funcionário e fatura até R$ 81 mil por ano. Paga um valor fixo por mês (o DAS) e tem contabilidade simplificada.",
    categoria: "Regimes e enquadramento",
    ferramenta: "das-mei",
  },
  {
    termo: "ME e EPP",
    nome: "Microempresa e Empresa de Pequeno Porte",
    definicao:
      "Classificação pelo faturamento anual: microempresa até R$ 360 mil e empresa de pequeno porte até R$ 4,8 milhões. As duas podem optar pelo Simples Nacional.",
    categoria: "Regimes e enquadramento",
  },

  /* ---------------- Abertura e registro ---------------- */
  {
    termo: "CNPJ",
    nome: "Cadastro Nacional da Pessoa Jurídica",
    definicao: "O número de identificação da empresa na Receita Federal, como o CPF é para as pessoas.",
    categoria: "Abertura e registro",
  },
  {
    termo: "CNAE",
    nome: "Classificação Nacional de Atividades Econômicas",
    definicao:
      "O código que diz o que a empresa faz. Ele define, por exemplo, se a empresa pode ser MEI, em que anexo do Simples fica e quais licenças precisa.",
    categoria: "Abertura e registro",
  },
  {
    termo: "Contrato social",
    definicao:
      "O documento de criação da empresa: traz os sócios, o capital, a atividade, o endereço e as regras de administração. Qualquer mudança nesses pontos exige uma alteração contratual.",
    categoria: "Abertura e registro",
  },
  {
    termo: "Capital social",
    definicao:
      "O valor que os sócios declaram investir na empresa ao abri-la, em dinheiro ou bens. Também define a participação de cada sócio.",
    categoria: "Abertura e registro",
  },
  {
    termo: "LTDA e SLU",
    nome: "Sociedade Limitada e Sociedade Limitada Unipessoal",
    definicao:
      "Os tipos de empresa mais comuns. Na LTDA há dois ou mais sócios; na SLU, um só. Nas duas, a responsabilidade dos sócios fica limitada ao capital da empresa.",
    categoria: "Abertura e registro",
  },
  {
    termo: "Holding",
    definicao:
      "Empresa criada para ser dona de outras empresas ou de bens, como imóveis. É usada para organizar o patrimônio, planejar a sucessão familiar e, em alguns casos, pagar menos impostos.",
    categoria: "Abertura e registro",
  },
  {
    termo: "Alvará de funcionamento",
    definicao: "A licença da prefeitura que autoriza a empresa a funcionar naquele endereço e para aquela atividade.",
    categoria: "Abertura e registro",
  },
  {
    termo: "Inscrição estadual e municipal",
    definicao:
      "Cadastros da empresa no estado (para quem vende mercadorias e paga ICMS) e na prefeitura (para quem presta serviços e paga ISS).",
    categoria: "Abertura e registro",
  },
  {
    termo: "Certificado digital",
    definicao:
      "A assinatura eletrônica da empresa (e-CNPJ). É usado para emitir notas, entregar declarações e acessar sistemas do governo.",
    categoria: "Abertura e registro",
  },
  {
    termo: "CCMEI",
    nome: "Certificado da Condição de Microempreendedor Individual",
    definicao: "O documento que comprova a abertura do MEI, com CNPJ, atividades e endereço.",
    categoria: "Abertura e registro",
  },

  /* ---------------- Pessoal e folha ---------------- */
  {
    termo: "Pró-labore",
    definicao:
      "A remuneração dos sócios pelo trabalho na empresa. Tem desconto de INSS (11%) e, conforme o valor, de Imposto de Renda.",
    categoria: "Pessoal e folha",
    ferramenta: "pro-labore",
  },
  {
    termo: "Distribuição de lucros",
    definicao:
      "A parte do lucro repassada aos sócios. Em geral é isenta de IR, mas desde 2026 os valores acima de R$ 50 mil por mês, pagos pela mesma empresa ao mesmo sócio, têm retenção de 10%.",
    categoria: "Pessoal e folha",
  },
  {
    termo: "Folha de pagamento",
    definicao:
      "O cálculo mensal dos salários, descontos e encargos dos funcionários e do pró-labore dos sócios.",
    categoria: "Pessoal e folha",
  },
  {
    termo: "INSS",
    nome: "Instituto Nacional do Seguro Social",
    definicao:
      "A contribuição para a Previdência, descontada de salários e do pró-labore. Para funcionários, vai de 7,5% a 14%, por faixas, até o teto de R$ 8.475,55 em 2026.",
    categoria: "Pessoal e folha",
  },
  {
    termo: "CPP",
    nome: "Contribuição Patronal Previdenciária",
    definicao:
      "O INSS pago pela empresa sobre a folha, em geral de 20%. No Simples, já vem dentro do DAS, exceto nas atividades do Anexo IV.",
    categoria: "Pessoal e folha",
  },
  {
    termo: "FGTS",
    nome: "Fundo de Garantia do Tempo de Serviço",
    definicao:
      "Depósito mensal de 8% do salário que a empresa faz numa conta em nome do funcionário. Não é descontado do salário.",
    categoria: "Pessoal e folha",
  },
  {
    termo: "eSocial",
    definicao:
      "O sistema do governo onde a empresa informa admissões, salários, férias, afastamentos e demissões. Substituiu várias declarações trabalhistas antigas.",
    categoria: "Pessoal e folha",
  },
  {
    termo: "Décimo terceiro salário (13º)",
    definicao:
      "Salário extra pago ao funcionário no fim do ano, em duas parcelas: a primeira até 30 de novembro e a segunda até 20 de dezembro.",
    categoria: "Pessoal e folha",
    ferramenta: "decimo-terceiro",
  },

  /* ---------------- Gestão e finanças ---------------- */
  {
    termo: "Faturamento",
    definicao:
      "Tudo o que a empresa vendeu num período, antes de descontar custos e impostos. Também chamado de receita bruta.",
    categoria: "Gestão e finanças",
  },
  {
    termo: "Margem de contribuição",
    definicao:
      "O que sobra de cada venda depois dos custos diretos e dos impostos sobre ela. É com esse valor que a empresa paga as despesas fixas e forma o lucro.",
    categoria: "Gestão e finanças",
    ferramenta: "margem-lucro",
  },
  {
    termo: "Margem de lucro",
    definicao: "A parte da receita que vira lucro depois de todos os custos, despesas e impostos, em percentual.",
    categoria: "Gestão e finanças",
    ferramenta: "margem-lucro",
  },
  {
    termo: "Ponto de equilíbrio",
    definicao:
      "O quanto a empresa precisa vender por mês para cobrir todos os custos, sem lucro nem prejuízo. Acima dele, cada venda gera lucro.",
    categoria: "Gestão e finanças",
    ferramenta: "ponto-equilibrio",
  },
  {
    termo: "Fluxo de caixa",
    definicao:
      "O controle de todo o dinheiro que entra e sai da empresa, dia a dia. Mostra se haverá dinheiro para pagar as contas na data certa.",
    categoria: "Gestão e finanças",
  },
  {
    termo: "Pró-labore x lucro",
    definicao:
      "Pró-labore paga o trabalho do sócio e tem INSS e IR; distribuição de lucro paga o investimento e, até certo limite, é isenta. Equilibrar os dois é uma das formas de planejar impostos.",
    categoria: "Gestão e finanças",
  },
  {
    termo: "DRE",
    nome: "Demonstração do Resultado do Exercício",
    definicao:
      "O relatório que mostra se a empresa teve lucro ou prejuízo num período: parte do faturamento e desconta impostos, custos e despesas.",
    categoria: "Gestão e finanças",
  },
  {
    termo: "Balanço patrimonial",
    definicao:
      "A fotografia da empresa numa data: o que ela tem (bens e dinheiro), o que deve e o patrimônio dos sócios.",
    categoria: "Gestão e finanças",
  },
  {
    termo: "Balancete",
    definicao:
      "Um resumo das contas da contabilidade num período, normalmente mensal. Serve para acompanhar a empresa antes do balanço anual.",
    categoria: "Gestão e finanças",
  },
  {
    termo: "Escrituração contábil",
    definicao:
      "O registro organizado de todas as movimentações da empresa na contabilidade. É a base do balanço, da DRE e de várias declarações.",
    categoria: "Gestão e finanças",
  },
  {
    termo: "ECD e ECF",
    nome: "Escrituração Contábil Digital e Escrituração Contábil Fiscal",
    definicao:
      "Envios anuais da contabilidade para a Receita Federal pelo SPED. A ECD traz os livros contábeis; a ECF traz o cálculo do IRPJ e da CSLL.",
    categoria: "Gestão e finanças",
  },

  /* ---------------- Reforma Tributária ---------------- */
  {
    termo: "Reforma Tributária",
    definicao:
      "A mudança nos impostos sobre consumo aprovada em 2023. PIS, COFINS, IPI, ICMS e ISS serão trocados por CBS, IBS e Imposto Seletivo, numa transição que vai de 2026 a 2033.",
    categoria: "Reforma Tributária",
  },
  {
    termo: "CBS",
    nome: "Contribuição sobre Bens e Serviços",
    definicao:
      "O novo tributo federal que substitui PIS e COFINS a partir de 2027. Em 2026, aparece só em teste, com alíquota de 0,9% que pode ser compensada.",
    categoria: "Reforma Tributária",
  },
  {
    termo: "IBS",
    nome: "Imposto sobre Bens e Serviços",
    definicao:
      "O novo imposto de estados e municípios que substitui ICMS e ISS. Em 2026, está em teste com 0,1%; a troca acontece aos poucos entre 2029 e 2032.",
    categoria: "Reforma Tributária",
  },
  {
    termo: "Imposto Seletivo",
    definicao:
      "Imposto federal sobre produtos que fazem mal à saúde ou ao meio ambiente, como cigarros e bebidas alcoólicas. Começa a valer em 2027.",
    categoria: "Reforma Tributária",
  },
  {
    termo: "Split payment",
    definicao:
      "Na Reforma Tributária, o pagamento dividido: na hora em que o cliente paga, a parte do imposto vai direto para o governo e só o restante cai na conta da empresa.",
    categoria: "Reforma Tributária",
  },
];

// Para âncoras (/glossario#fator-r)
export const slugTermo = (termo: string) =>
  termo
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
