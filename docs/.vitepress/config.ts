import { defineConfig } from 'vitepress'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import { version } from '../../package.json'
import { appDescription, appTitle, appUrl, packageName } from './meta'

export default defineConfig({
  title: appTitle,
  description: appDescription,
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        detailedView: true,
      },
    },
    editLink: {
      text: 'Suggest changes to this page',
      pattern: `https://github.com/ntnyq/${packageName}/edit/main/docs/:path`,
    },
    socialLinks: [
      { icon: 'x', link: 'https://twitter.com/ntnyq' },
      { icon: 'npm', link: `https://www.npmjs.com/package/${packageName}` },
      { icon: 'github', link: `https://github.com/ntnyq/${packageName}` },
    ],

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Playground', link: '/play/' },
      {
        text: `v${version}`,
        items: [
          { text: `v${version} (current)`, link: '/' },
          {
            text: 'Release Notes',
            link: `https://github.com/ntnyq/${packageName}/releases`,
          },
        ],
      },
    ],

    sidebar: {},
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', href: '#ffffff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: appTitle }],
    ['meta', { property: 'og:url', content: appUrl }],
    ['meta', { property: 'og:description', content: appDescription }],
    // ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    // ['meta', { name: 'twitter:image', content: `${appUrl}/og.png` }],
  ],
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
})
