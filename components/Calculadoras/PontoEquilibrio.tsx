"use client";

import { useState } from "react";
import { pontoEquilibrio } from "@/lib/calculos/calculos";
import { Calculadora, CampoMoeda, Linha, Observacao, PainelResultado, formatarMoeda, formatarPct } from "./ui";

const unidades = new Intl.NumberFormat("pt-BR");

export default function PontoEquilibrio() {
  const [fixos, setFixos] = useState(10000);
  const [preco, setPreco] = useState(50);
  const [variavel, setVariavel] = useState(30);
  const r = pontoEquilibrio(fixos, preco, variavel);

  return (
    <Calculadora
      campos={
        <>
          <CampoMoeda
            rotulo="Custos fixos do mês"
            ajuda="Aluguel, salários, pró-labore, contador, internet, sistemas."
            valor={fixos}
            aoMudar={setFixos}
          />
          <CampoMoeda
            rotulo="Preço de venda (por unidade)"
            ajuda="Para serviços, use o valor médio de um atendimento ou contrato."
            valor={preco}
            aoMudar={setPreco}
          />
          <CampoMoeda
            rotulo="Custo variável (por unidade)"
            ajuda="Mercadoria, insumos, comissão, taxa da maquininha e impostos de cada venda."
            valor={variavel}
            aoMudar={setVariavel}
          />
        </>
      }
      resultado={
        r ? (
          <>
            <PainelResultado
              rotulo="Ponto de equilíbrio"
              valor={formatarMoeda(r.faturamento)}
              detalhe={`É preciso vender ${unidades.format(r.unidades)} ${r.unidades === 1 ? "unidade" : "unidades"} por mês para empatar.`}
            >
              <Linha rotulo="Margem de contribuição por unidade" valor={formatarMoeda(r.contribuicaoUnit)} />
              <Linha rotulo="Margem de contribuição" valor={formatarPct(r.margemContribuicao)} />
              <Linha rotulo="Vendas por mês para empatar" valor={`${unidades.format(r.unidades)} un.`} destaque />
            </PainelResultado>
            <Observacao>
              Cada unidade vendida acima disso deixa {formatarMoeda(r.contribuicaoUnit)} de lucro.
            </Observacao>
          </>
        ) : (
          <PainelResultado
            rotulo="Ponto de equilíbrio"
            valor="—"
            detalhe="O custo variável está igual ou maior que o preço de venda: cada venda dá prejuízo, então não existe ponto de equilíbrio. Reveja o preço ou os custos."
          />
        )
      }
    />
  );
}
