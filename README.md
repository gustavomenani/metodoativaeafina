# Método Ativa & Afina — Landing Page

Landing page de alta conversão, mobile-first e otimizada para **Core Web Vitals**, construída com **Astro + Tailwind CSS v4**.

## Stack

| Tecnologia | Uso |
|---|---|
| **Astro 5** | SSG estático, HTML mínimo, zero JS desnecessário |
| **Tailwind CSS v4** | Utilitários atômicos, sem CSS flutuante |
| **SVG inline (Lucide-style)** | Ícones sem bundle extra |
| **Intersection Observer** | Scroll reveal em vanilla JS |
| **Vercel** | Deploy estático nativo |

## Desenvolvimento

```bash
npm install
npm run dev
```

```bash
npm run build    # gera dist/
npm run preview  # pré-visualiza o build
```

## Deploy na Vercel

1. Conecte o repositório em [vercel.com](https://vercel.com)
2. Framework preset: **Astro** (detectado automaticamente)
3. Build command: `npm run build`
4. Output: `dist`

Ou via CLI:

```bash
npx vercel
```

## Configuração rápida

### 1. Link de checkout (Hotmart)

Edite `src/config/site.ts`:

```ts
checkoutUrl: "https://pay.hotmart.com/SEU_LINK",
```

### 2. Imagens

Coloque arquivos otimizados (preferencialmente **WebP/AVIF**) em `public/images/`:

| Arquivo sugerido | Onde usar |
|---|---|
| `hero-antes-depois.webp` | Hero (Foto 1) — **LCP** |
| `passo-1-respiracao.webp` | Bloco 3, card 1 |
| `passo-2-ativacao.webp` | Bloco 3, card 2 |
| `passo-3-funcional.webp` | Bloco 3, card 3 |
| `resultado-1.webp` … `4.webp` | Bloco 5 mosaico |
| `lilian-manu-academia.webp` | Bloco 8 criadoras |

Passe o caminho no componente:

```astro
<ImagePlaceholder
  src="/images/hero-antes-depois.webp"
  alt="..."
  priority  <!-- só no Hero (LCP) -->
/>
```

**Para otimização máxima com o Image do Astro**, coloque em `src/assets/` e use:

```astro
---
import { Image } from 'astro:assets';
import hero from '../assets/hero-antes-depois.webp';
---
<Image
  src={hero}
  alt="..."
  widths={[400, 640, 800]}
  sizes="(max-width: 768px) 100vw, 480px"
  formats={['avif', 'webp']}
  loading="eager"
  fetchpriority="high"
/>
```

### 3. Vídeos (iframe)

Em `VideoSales.astro` e `SocialProof.astro`, passe `embedUrl`:

```astro
<VideoEmbed
  title="Vídeo de vendas"
  embedUrl="https://www.youtube.com/embed/VIDEO_ID"
/>
```

Aceita YouTube, Vimeo, Panda Video, Hotmart Player, Vidlly etc.

### 4. Páginas legais

Substitua o texto placeholder em:

- `src/pages/politica-de-privacidade.astro`
- `src/pages/termos-de-uso.astro`

## Estrutura de pastas

```
src/
  components/
    sections/     # Blocos 1–9 + Footer
    ui/           # CtaButton, ImagePlaceholder, VideoEmbed, SectionTitle
  config/site.ts  # Preço, checkout, nome
  layouts/        # Layout base (fonts, SEO, script reveal)
  pages/          # Rotas
  scripts/        # scroll-reveal.ts (vanilla)
  styles/         # global.css (tokens + animações)
public/
  images/         # Assets estáticos
```

## Performance (checklist)

- [x] HTML estático (Astro SSG)
- [x] CSS utilitário atômico (Tailwind)
- [x] Único JS: scroll reveal (~1KB)
- [x] CTA pulse em CSS puro (`@keyframes`)
- [x] FAQ nativo (`<details>` / `<summary>`)
- [x] Carrossel mobile com CSS (`snap-x`, sem Swiper)
- [x] Lazy loading em imagens (exceto LCP)
- [x] `prefers-reduced-motion` respeitado
- [x] Fonts com `display=swap` + preconnect

## Paleta

| Token | Hex | Uso |
|---|---|---|
| Amarelo Sol | `#F5C400` | CTAs de compra |
| Verde-oliva | `#9CAF6E` | Cartões / destaques |
| Azul-esverdeado | `#4A8A8A` | Faixas, ícones, depoimentos |
| Superfície | `#F8FAFC` | Fundos claros de leitura |
