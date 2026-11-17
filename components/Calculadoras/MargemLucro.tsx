"use client";

import { useState } from "react";
import { margemLucro } from "@/lib/calculos/calculos";
import { Calculadora, CampoMoeda, CampoNumero, Linha, Observacao, PainelResultado, formatarMoeda, formatarPct } from "./ui";

export default function MargemLucro() {
  const [receita, setReceita] = useState(50000);
  const [custos, setCustos] = useState(20000);
  const [despesas, setDespesas] = useState(15000);
  const [impostos, setImpostos] = useState(6);
  const r = margemLucro(receita, custos, despesas, impostos);

  return (
    <Calculadora
      campos={
        <>
          <CampoMoeda rotulo="Receita do mês" ajuda="Tudo o que a empresa vendeu no mês." valor={receita} aoMudar={setReceita} />
          <CampoMoeda
            rotulo="Custos diretos"
            ajuda="Mercadorias, matéria-prima, insumos, comissões: o que aumenta quando você vende mais."
            valor={custos}
            aoMudar={setCustos}
          />
          <CampoMoeda
            rotulo="Despesas fixas"
            ajuda="Aluguel, salários, pró-labore, contador, sistemas: o que se paga vendendo ou não."
            valor={despesas}
            aoMudar={setDespesas}
          />
          <CampoNumero
            rotulo="Impostos sobre a venda"
            ajuda="No Simples, use a alíquota efetiva da sua guia. Não sabe? Use a calculadora de regime tributário."
            valor={impostos}
            aoMudar={setImpostos}
            max={100}
            passo={0.1}
            sufixo="%"
          />
        </>
      }
      resultado={
        <>
          <PainelResultado
            rotulo="Margem líquida"
            valor={formatarPct(r.margemLiquida)}
            detalhe={
              r.lucro >= 0
                ? `De cada R$ 100 vendidos, sobram ${formatarMoeda(r.margemLiquida * 100)} de lucro.`
                : "Os custos e despesas estão maiores que a receita."
            }
          >
            <Linha rotulo="Receita" valor={formatarMoeda(receita)} />
            <Linha rotulo="Impostos" valor={formatarMoeda(r.impostos)} negativo />
            <Linha rotulo="Custos diretos" valor={formatarMoeda(custos)} negativo />
            <Linha rotulo={`Margem de contribuição (${formatarPct(r.margemContribuicao)})`} valor={formatarMoeda(r.contribuicao)} />
            <Linha rotulo="Despesas fixas" valor={formatarMoeda(despesas)} negativo />
            <Linha rotulo={r.lucro >= 0 ? "Lucro" : "Prejuízo"} valor={formatarMoeda(r.lucro)} destaque />
          </PainelResultado>
          {r.margemContribuicao > 0 && (
            <Observacao>
              Com essa margem de contribuição, a empresa precisa faturar{" "}
              <strong>{formatarMoeda(despesas / r.margemContribuicao)}</strong> por mês só para pagar as despesas fixas.
            </Observacao>
          )}
        </>
      }
    />
  );
}
