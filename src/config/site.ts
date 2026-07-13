/**
 * Configuração central da landing page.
 * CTAs de compra abrem o WhatsApp com mensagem pronta.
 */
const WHATSAPP_E164 = "5532984264132";
const WHATSAPP_MSG = encodeURIComponent(
  "Olá! 💚 Acabei de ver a página do Método Ativa & Afina e quero garantir meu acesso. Pode me ajudar com a compra?",
);

const WHATSAPP_HREF_WITH_MSG = `https://wa.me/${WHATSAPP_E164}?text=${WHATSAPP_MSG}`;

export const siteConfig = {
  name: "Método Ativa & Afina",
  /** Link de compra / adquirir → WhatsApp com mensagem pronta */
  checkoutUrl: WHATSAPP_HREF_WITH_MSG,
  year: 2026,
  price: {
    from: "R$ 197,00",
    to: "R$ 129,90",
  },
  guaranteeDays: 7,
  accessYears: 1,
  contact: {
    whatsapp: {
      display: "(32) 98426-4132",
      href: `https://wa.me/${WHATSAPP_E164}`,
      hrefWithMessage: WHATSAPP_HREF_WITH_MSG,
    },
    creators: {
      lilian: {
        name: "Lilian Ferancini",
        role: "Fisioterapeuta, Professora de Educação Física, Especialista em Reabilitação Abdominal.",
        instagram: "https://www.instagram.com/lilianferancini",
        instagramHandle: "@lilianferancini",
      },
      manu: {
        name: "Emanuela Vieira",
        shortName: "Emanuela (Manu)",
        role: "Personal Trainer, Especialista em Treino Feminino.",
        instagram: "https://www.instagram.com/emanu.fit",
        instagramHandle: "@emanu.fit",
      },
    },
  },
} as const;
