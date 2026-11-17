// Newsletter (Brevo).
// Para ativar: no Brevo, crie um formulário de inscrição (Contatos → Formulários),
// copie o endereço do "action" do formulário (algo como
// https://xxxxxxxx.sibforms.com/serve/MUIF...) e cole em `acaoBrevo`.
// Enquanto for null, o formulário aparece, mas avisa que a newsletter está sendo ativada.
export const newsletter = {
  acaoBrevo: null as string | null,
};
