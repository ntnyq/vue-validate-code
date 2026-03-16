import { defineConfig } from 'vitepress'
import { version } from '../../../package.json'
import { REPOSITORY_SLUG, appDescription, appTitle } from './meta'

export const enConfig = defineConfig({
  description: appDescription,
  themeConfig: {
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

    outline: {
      level: [2, 4],
    },
  },

  title: appTitle,
})
