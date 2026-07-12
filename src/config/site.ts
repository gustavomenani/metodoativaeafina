/**
 * Configuração central da landing page.
 * Substitua checkoutUrl pelo link real da Hotmart / checkout.
 */
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
} as const;
