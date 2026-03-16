import { defineConfig } from 'vitepress'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import {
  PACKAGE_NAME,
  REPOSITORY_SLUG,
  appDescription,
  appTitle,
  appUrl,
} from './meta'
import { zhSearch } from './zh'

export const sharedConfig = defineConfig({
  cleanUrls: true,
  head: [
    ['link', { href: '/favicon.ico', rel: 'icon' }],
    ['link', { href: '/apple-touch-icon.png', rel: 'apple-touch-icon' }],
    ['meta', { href: '#ffffff', name: 'theme-color' }],
    ['meta', { content: 'website', property: 'og:type' }],
    ['meta', { content: appTitle, property: 'og:title' }],
    ['meta', { content: appUrl, property: 'og:url' }],
    ['meta', { content: appDescription, property: 'og:description' }],
    // ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    // ['meta', { name: 'twitter:image', content: `${appUrl}/og.png` }],
  ],
  ignoreDeadLinks: true,
  lastUpdated: true,
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
  themeConfig: {
    search: {
      options: {
        detailedView: true,
        locales: { ...zhSearch },
      },
      provider: 'local',
    },

    socialLinks: [
      { icon: 'x', link: 'https://twitter.com/ntnyq' },
      { icon: 'npm', link: `https://www.npmjs.com/package/${PACKAGE_NAME}` },
      { icon: 'github', link: `https://github.com/${REPOSITORY_SLUG}` },
    ],
  },
})
