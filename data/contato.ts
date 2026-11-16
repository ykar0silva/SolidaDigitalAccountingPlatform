// Dados de contato da Sólida, usados no rodapé, na página /contato e nos
// botões de WhatsApp do site. Campo com null não aparece no site.

export const contato = {
  // Só dígitos, com DDI 55 e DDD (ex.: "5563999999999").
  whatsapp: null as string | null,
  // Como deve aparecer escrito (ex.: "(63) 3333-3333").
  telefone: null as string | null,
  email: null as string | null,
  endereco: {
    rua: null as string | null, // ex.: "Quadra 104 Norte, Av. LO-2"
    bairro: null as string | null, // ex.: "Plano Diretor Norte"
    cidade: "Palmas",
    uf: "TO",
  },
  // Uma linha por faixa de horário (ex.: "Segunda a sexta, 8h às 18h").
  horario: [] as string[],
  redes: {
    instagram: null as string | null, // link completo do perfil
    linkedin: null as string | null,
    facebook: null as string | null,
  },
};

export const temWhatsApp = Boolean(contato.whatsapp);

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

export const formatarWhatsApp = (numero: string) => {
  // 5563999999999 -> (63) 99999-9999
  const n = numero.replace(/^55/, "");
  return n.length === 11 ? `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}` : numero;
};
