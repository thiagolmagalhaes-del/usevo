// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { getSiteAlternates, normalizeSitePath, toSiteUrl } from './src/data/locale-routes';

// https://astro.build/config
export default defineConfig({
  site: "https://usevo.tools",
  trailingSlash: "never",
  build: {
    format: "file",
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = normalizeSitePath(new URL(page).pathname);
        return pathname !== "/404" && pathname !== "/en";
      },
      serialize: (item) => {
        const pathname = normalizeSitePath(new URL(item.url).pathname);
        item.url = toSiteUrl(pathname);
        item.links = Object.entries(getSiteAlternates(pathname))
          .filter(([lang]) => lang !== "x-default")
          .map(([lang, url]) => ({ lang, url }));
        return item;
      },
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          "pt-br": "pt-BR",
          es: "es",
        },
      },
    }),
  ],
});
