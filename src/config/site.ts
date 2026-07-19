/**
 * Configuração central da landing page.
 * Textos e mídia editáveis vêm de src/data/content.json (painel /admin).
 */
import content from "../data/content.json";

const WHATSAPP_E164 = content.site.whatsappE164;
const WHATSAPP_MSG = encodeURIComponent(content.site.whatsappMessage);
const WHATSAPP_HREF_WITH_MSG = `https://wa.me/${WHATSAPP_E164}?text=${WHATSAPP_MSG}`;

export const siteConfig = {
  name: content.site.name,
  checkoutUrl: content.site.checkoutUrl,
  year: content.site.year,
  price: {
    from: content.site.priceFrom,
    to: content.site.priceTo,
  },
  installments: content.site.installments,
  guaranteeDays: content.site.guaranteeDays,
  accessYears: content.site.accessYears,
  contact: {
    whatsapp: {
      display: content.site.whatsappDisplay,
      href: `https://wa.me/${WHATSAPP_E164}`,
      hrefWithMessage: WHATSAPP_HREF_WITH_MSG,
    },
    creators: content.creators,
  },
} as const;

export { content };
