// Dados de contato da Sólida, usados no rodapé, na página /contato e nos
// botões de WhatsApp do site. Campo com null não aparece no site.
// Fonte: perfil da Sólida no Google (Maps) e lp.solidacontabil.com.br, em 16/11/2026.

export const contato = {
  // Só dígitos, com DDI 55 e DDD.
  whatsapp: "556332133522" as string | null,
  // Como deve aparecer escrito.
  telefone: "(63) 3213-3522" as string | null,
  email: null as string | null,
  endereco: {
    rua: "Avenida LO 08, Lote 22, Quadra ACSV-NE 41 (304 Norte)" as string | null,
    bairro: "Plano Diretor Norte" as string | null,
    cidade: "Palmas",
    uf: "TO",
    cep: "77006-348" as string | null,
  },
  // Como o Google acha o escritório no mapa (mais preciso que o endereço).
  mapaBusca: "SÓLIDA Assessoria Contábil, Palmas - TO" as string | null,
  // Uma linha por faixa de horário.
  horario: ["Segunda a sexta, 8h às 18h"] as string[],
  redes: {
    instagram: "https://www.instagram.com/solida.contabilidadeto/" as string | null,
    linkedin: null as string | null,
    facebook: null as string | null,
  },
};

export const temWhatsApp = Boolean(contato.whatsapp);

const digitos = (s: string | null) => (s ?? "").replace(/\D/g, "").replace(/^55/, "");

// WhatsApp e telefone são o mesmo número? Então aparecem juntos.
export const whatsappEhTelefone =
  Boolean(contato.whatsapp && contato.telefone) && digitos(contato.whatsapp) === digitos(contato.telefone);

// Sem número cadastrado, os botões levam para a página de contato.
export const linkWhatsApp = (mensagem: string) =>
  contato.whatsapp
    ? `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(mensagem)}`
    : "/contato";

// Props prontas para um <a>: abre em nova aba só quando é o WhatsApp.
export const propsWhatsApp = (mensagem: string) =>
  temWhatsApp
    ? { href: linkWhatsApp(mensagem), target: "_blank", rel: "noopener noreferrer" }
    : { href: "/contato" };

export const enderecoCompleto = () => {
  const { rua, bairro, cidade, uf } = contato.endereco;
  return [rua, bairro, `${cidade}-${uf}`].filter(Boolean).join(", ");
};

export const linkTelefone = (telefone: string) => `tel:+55${digitos(telefone)}`;

export const formatarWhatsApp = (numero: string) => {
  // 5563999999999 -> (63) 99999-9999 · 556332133522 -> (63) 3213-3522
  const n = digitos(numero);
  if (n.length === 11) return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
  if (n.length === 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
  return numero;
};
