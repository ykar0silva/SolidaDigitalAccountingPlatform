"use client";

import { useState } from "react";
import { proLabore } from "@/lib/calculos/calculos";
import { Calculadora, CampoMoeda, CampoNumero, Linha, Observacao, Opcoes, PainelResultado, formatarMoeda } from "./ui";

export default function ProLabore() {
  const [valor, setValor] = useState(5000);
  const [dependentes, setDependentes] = useState(0);
  const [regime, setRegime] = useState<"simples" | "outro">("simples");
  const r = proLabore(valor, dependentes, regime === "simples");

  return (
    <Calculadora
      campos={
        <>
          <CampoMoeda rotulo="Valor do pró-labore (bruto)" valor={valor} aoMudar={setValor} />
          <CampoNumero
            rotulo="Dependentes no Imposto de Renda"
            ajuda="Filhos, cônjuge e outros dependentes que você declara."
            valor={dependentes}
            aoMudar={setDependentes}
            max={20}
          />
          <Opcoes
            rotulo="Regime da empresa"
            valor={regime}
            aoMudar={setRegime}
            opcoes={[
              { valor: "simples", rotulo: "Simples Nacional", detalhe: "Anexos I, II, III ou V" },
              { valor: "outro", rotulo: "Lucro Presumido, Lucro Real ou Anexo IV", detalhe: "A empresa paga 20% de INSS patronal" },
            ]}
          />
        </>
      }
      resultado={
        <>
          <PainelResultado rotulo="Pró-labore líquido" valor={formatarMoeda(r.liquido)} detalhe="O que cai na conta do sócio.">
            <Linha rotulo="Pró-labore bruto" valor={formatarMoeda(r.bruto)} />
            <Linha rotulo="INSS (11%)" valor={formatarMoeda(r.inss)} negativo />
            <Linha rotulo="Imposto de Renda" valor={formatarMoeda(r.irrf)} negativo />
            <Linha rotulo="Líquido" valor={formatarMoeda(r.liquido)} destaque />
            {r.inssEmpresa > 0 && <Linha rotulo="INSS pago pela empresa (20%)" valor={formatarMoeda(r.inssEmpresa)} />}
            <Linha rotulo="Custo total para a empresa" valor={formatarMoeda(r.custoEmpresa)} />
          </PainelResultado>
          {r.detalheIr.reducao > 0 && (
            <Observacao>
              A redução do IR de 2026 tirou {formatarMoeda(r.detalheIr.reducao)} do imposto deste pró-labore.
            </Observacao>
          )}
        </>
      }
    />
  );
}
