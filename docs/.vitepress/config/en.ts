import { defineConfig } from 'vitepress'
import { version } from '../../../package.json'
import { appDescription, REPOSITORY_SLUG, appTitle } from './meta'

export const enConfig = defineConfig({
  title: appTitle,
  description: appDescription,

  themeConfig: {
    outline: {
      level: [2, 4],
    },

    editLink: {
      text: 'Suggest changes to this page',
      pattern: `https://github.com/${REPOSITORY_SLUG}/edit/main/docs/:path`,
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      {
        text: `v${version}`,
        items: [
          { text: `v${version} (current)`, link: '/' },
          {
            text: 'Release Notes',
            link: `https://github.com/${REPOSITORY_SLUG}/releases`,
          },
        ],
      },
    ],
  },
})
