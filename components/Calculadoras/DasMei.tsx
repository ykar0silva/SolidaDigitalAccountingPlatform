"use client";

import { useState } from "react";
import { dasMei, type AtividadeMei } from "@/lib/calculos/calculos";
import { Calculadora, Linha, Observacao, Opcoes, PainelResultado, formatarMoeda } from "./ui";

export default function DasMei() {
  const [atividade, setAtividade] = useState<AtividadeMei>("servicos");
  const [caminhoneiro, setCaminhoneiro] = useState<"nao" | "sim">("nao");
  const r = dasMei(atividade, caminhoneiro === "sim");

  return (
    <Calculadora
      campos={
        <>
          <Opcoes
            rotulo="O que você faz como MEI?"
            valor={atividade}
            aoMudar={setAtividade}
            opcoes={[
              { valor: "comercio", rotulo: "Vendo produtos", detalhe: "Comércio ou indústria" },
              { valor: "servicos", rotulo: "Presto serviços", detalhe: "Ex.: beleza, manutenção, aulas" },
              { valor: "ambos", rotulo: "Vendo produtos e presto serviços" },
            ]}
          />
          <Opcoes
            rotulo="Você é MEI caminhoneiro?"
            valor={caminhoneiro}
            aoMudar={setCaminhoneiro}
            opcoes={[
              { valor: "nao", rotulo: "Não" },
              { valor: "sim", rotulo: "Sim", detalhe: "Transportador autônomo de cargas" },
            ]}
          />
        </>
      }
      resultado={
        <>
          <PainelResultado
            rotulo="DAS por mês em 2026"
            valor={formatarMoeda(r.mensal)}
            detalhe={`${formatarMoeda(r.anual)} no ano. Vence todo dia 20.`}
          >
            <Linha rotulo="INSS" valor={formatarMoeda(r.inss)} />
            {r.icms > 0 && <Linha rotulo="ICMS" valor={formatarMoeda(r.icms)} />}
            {r.iss > 0 && <Linha rotulo="ISS" valor={formatarMoeda(r.iss)} />}
            <Linha rotulo="Total" valor={formatarMoeda(r.mensal)} destaque />
          </PainelResultado>
          <Observacao>
            O limite de faturamento do MEI é de {formatarMoeda(r.limiteAnual)} por ano. Passou disso, é hora de
            mudar de enquadramento, e a gente ajuda nessa transição.
          </Observacao>
        </>
      }
    />
  );
}
