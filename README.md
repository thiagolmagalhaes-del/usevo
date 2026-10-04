# USEVO

[USEVO](https://usevo.tools) is a multilingual collection of practical online tools built with [Astro](https://astro.build). It provides localized catalogs in English, Brazilian Portuguese, and Spanish for everyday calculations, text work, development, files, images, and utilities.

## What is included

The active catalog contains 30 tools across eight categories:

- **Calculators and finance:** calculator, percentage, date, age, currency, and CLT vs. PJ calculators.
- **Converters and text:** unit converter, word counter, case converter, font generator, and text comparison.
- **Development:** Base64, JSON formatter and inspector, URL encoder/decoder, UUID generator, and SQL formatter.
- **Files and images:** JPG to PDF, PDF compression, merge, split and conversion, plus image conversion, compression, and resizing.
- **Security and utilities:** password generator, QR-code generator and scanner, barcode generator, and wheel of names.

## Languages and routes

English is the default locale. Catalog, category, and individual-tool URLs are localized:

| Language | Home | Tools | Categories | Tool route |
| --- | --- | --- | --- | --- |
| English | `/` | `/en/tools` | `/en/categories` | `/en/tools/:slug` |
| Brazilian Portuguese | `/pt-br` | `/ferramentas` | `/categorias` | `/ferramentas/:slug` |
| Spanish | `/es` | `/es/herramientas` | `/es/categorias` | `/es/herramientas/:slug` |

## Local development

### Requirements

- Node.js `>=22.12.0`
- npm

### Commands

Run all commands from the repository root:

```bash
npm ci
npm run dev