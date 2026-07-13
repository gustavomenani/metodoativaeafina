# Método Ativa & Afina — Landing Page

Landing page de alta conversão, mobile-first e otimizada para **Core Web Vitals**, construída com **Astro + Tailwind CSS v4**.

## Stack

| Tecnologia | Uso |
|---|---|
| **Astro** | SSG estático, HTML mínimo, zero JS desnecessário |
| **Tailwind CSS v4** | Utilitários atômicos |
| **SVG inline** | Ícones sem bundle extra |
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

## Configuração rápida

### 1. Link de checkout (Hotmart)

Edite `src/config/site.ts`:

```ts
checkoutUrl: "https://pay.hotmart.com/SEU_LINK",
```

### 2. Imagens

Estrutura em `src/assets/images/`:

```
hero/antes-depois.webp
passos/passo-1-respiracao.webp
passos/passo-2-ativacao.webp
passos/passo-3-funcional.webp
resultados/{maristela,resultado-a,resultado-b}.webp
criadoras/lilian-manu.webp
```

Todas passam pelo `<Image />` do Astro (AVIF + WebP + srcset + lazy, exceto LCP no Hero).

Materiais brutos e arquivos não usados: pasta `materiais/` (fora do git/deploy).

### 3. Vídeo

Arquivo em `public/videos/video-vendas.mp4` (já otimizado, ~8 MB).  
Poster: `public/videos/video-vendas-poster.webp`.

### 4. Páginas legais

- `src/pages/politica-de-privacidade.astro`
- `src/pages/termos-de-uso.astro`

## Estrutura de pastas

```
src/
  assets/images/   # WebPs do site (otimizados)
  components/
    sections/      # Blocos da landing + Footer
    ui/            # CtaButton, VideoEmbed, SectionTitle, etc.
  config/site.ts   # Preço, checkout, nome
  layouts/         # Layout base (fonts, SEO, script reveal)
  pages/           # Rotas
  scripts/         # scroll-reveal.ts
  styles/          # global.css
public/
  videos/          # MP4 + poster
materiais/         # Originais / arquivo (não deploya)
```

## Performance (checklist)

- [x] HTML estático (Astro SSG)
- [x] CSS utilitário atômico (Tailwind)
- [x] Único JS: scroll reveal (~1KB)
- [x] CTA pulse em CSS puro
- [x] FAQ nativo (`<details>` / `<summary>`)
- [x] Carrossel mobile com CSS (`snap-x`)
- [x] Lazy loading em imagens (exceto LCP)
- [x] `prefers-reduced-motion` respeitado
- [x] Fonts com `display=swap` + preconnect
- [x] Imagens WebP redimensionadas e comprimidas
- [x] Vídeo de vendas em 720p otimizado (~8 MB)

## Paleta

| Token | Hex | Uso |
|---|---|---|
| Amarelo Sol | `#F5C400` | CTAs de compra |
| Verde-oliva | `#9CAF6E` | Cartões / destaques |
| Azul-esverdeado | `#4A8A8A` | Faixas, ícones, depoimentos |
| Superfície | `#F8FAFC` | Fundos claros de leitura |
