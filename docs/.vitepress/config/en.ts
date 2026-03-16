import { defineConfig } from 'vitepress'
import { version } from '../../../package.json'
import { REPOSITORY_SLUG, appDescription, appTitle } from './meta'

export const enConfig = defineConfig({
  description: appDescription,
  themeConfig: {
    editLink: {
      pattern: `https://github.com/${REPOSITORY_SLUG}/edit/main/docs/:path`,
      text: 'Suggest changes to this page',
    },

    nav: [
      { link: '/', text: 'Home' },
      { link: '/guide/', text: 'Guide' },
      {
        items: [
          { text: `v${version} (current)`, link: '/' },
          {
            text: 'Release Notes',
            link: `https://github.com/${REPOSITORY_SLUG}/releases`,
          },
        ],
        text: `v${version}`,
      },
    ],

    outline: {
      level: [2, 4],
    },
  },

  title: appTitle,
})
