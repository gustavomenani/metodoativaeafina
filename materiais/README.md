# Materiais (fora do site)

Pasta de **arquivo e origem**. Não entra no build/deploy.

```
materiais/
├── originais/                 # arquivos brutos do briefing 99Freelas
│   ├── hero/
│   ├── passos/
│   ├── resultados/
│   ├── criadoras/
│   ├── curso/
│   ├── video/                 # vídeo bruto 1080p (~267 MB)
│   └── outros/
├── nao-usados-no-site/        # WebPs prontos mas não importados no código
├── backups-pre-otimizacao/    # backup antes da compressão das imagens do site
├── optimize-images.mjs        # script opcional para reotimizar WebPs do site
└── README.md
```

## O que o site usa de fato

| Destino no projeto | Conteúdo |
|---|---|
| `src/assets/images/**` | Imagens do site (processadas pelo Astro) |
| `public/videos/video-vendas.mp4` | Vídeo otimizado (~8 MB, 720×1280) |
| `public/videos/video-vendas-poster.webp` | Poster do vídeo |

## Adicionar nova imagem ao site

1. Guarde o original em `materiais/originais/<categoria>/`
2. Exporte WebP (largura máxima ~900–1200 px)
3. Coloque em `src/assets/images/<categoria>/`
4. Importe no componente com `import foto from '../../assets/images/...'`
5. Use o componente `<Image />` do Astro

## Reotimizar WebPs do site

```bash
node materiais/optimize-images.mjs
```

Só grava se o novo arquivo ficar menor. Gera backup em `backups-pre-otimizacao/`.
