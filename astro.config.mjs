// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { getSiteAlternates } from './src/data/locale-routes';

// https://astro.build/config
export default defineConfig({
  site: "https://usevo.tools",
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/404") && !page.endsWith("/en/"),
      serialize: (item) => {
        const pathname = new URL(item.url).pathname;
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
