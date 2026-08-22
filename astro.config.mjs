// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://usevo.tools",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "pt-BR",
        locales: {
          "pt-BR": "pt-BR",
          en: "en-US",
          es: "es-ES",
        },
      },
    }),
  ],
});
