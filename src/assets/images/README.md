# Imagens do site

Única fonte de imagens do build (`astro:assets` → AVIF/WebP + srcset).

```
images/
├── hero/
│   └── antes-depois.webp          # LCP / Hero
├── passos/
│   ├── passo-1-respiracao.webp
│   ├── passo-2-ativacao.webp
│   └── passo-3-funcional.webp
├── resultados/
│   ├── maristela.webp
│   ├── resultado-a.webp
│   └── resultado-b.webp
└── criadoras/
    └── lilian-manu.webp
```

Originais e arquivos não usados ficam em `/materiais/` (fora do deploy).

## Como adicionar nova imagem

1. Original → `materiais/originais/<categoria>/`
2. WebP otimizado (largura máx. adequada) → pasta acima
3. Import no componente: `import foto from '../../assets/images/...'`
