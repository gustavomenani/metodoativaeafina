/**
 * Configuração central da landing page.
 * Substitua checkoutUrl pelo link real da Hotmart / checkout.
 */
const WHATSAPP_E164 = "5532984264132";
const WHATSAPP_MSG = encodeURIComponent(
  "Olá! Tenho interesse no Método Ativa & Afina.",
);

export const siteConfig = {
  name: "Método Ativa & Afina",
  checkoutUrl: "#checkout", // ← SUBSTITUA pelo link de checkout Hotmart
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
      hrefWithMessage: `https://wa.me/${WHATSAPP_E164}?text=${WHATSAPP_MSG}`,
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
