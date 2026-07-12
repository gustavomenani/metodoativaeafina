# Imagens do site

Única fonte de imagens usadas no build (via `astro:assets` → AVIF/WebP + srcset).

```
images/
├── hero/
│   └── antes-depois.webp          # LCP / Foto 1
├── passos/
│   └── passo-1-respiracao.webp    # Bloco 3 — passo 1
│   # passo-2-ativacao.webp        # (adicionar quando tiver)
│   # passo-3-funcional.webp
├── resultados/
│   ├── maristela.webp
│   ├── lilian.webp
│   └── natalia.webp
│   # (4º card reutiliza hero/antes-depois.webp)
└── criadoras/
    └── lilian-manu.webp
```

Originais brutos ficam em `/images/originais/` (ignorados no git).

## Como adicionar nova imagem

1. Coloque o arquivo em `images/originais/`
2. Otimize (WebP, largura máxima adequada à tela)
3. Salve em uma subpasta acima
4. Importe no componente com `import foto from '../../assets/images/...'`
