import { defineConfig } from 'vitepress'
import { groupIconMdPlugin } from 'vitepress-plugin-group-icons'
import {
  appDescription,
  appTitle,
  REPOSITORY_SLUG,
  appUrl,
  PACKAGE_NAME,
} from './meta'
import { zhSearch } from './zh'

export const sharedConfig = defineConfig({
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
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
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        locales: { ...zhSearch },
      },
    },

    socialLinks: [
      { icon: 'x', link: 'https://twitter.com/ntnyq' },
      { icon: 'npm', link: `https://www.npmjs.com/package/${PACKAGE_NAME}` },
      { icon: 'github', link: `https://github.com/${REPOSITORY_SLUG}` },
    ],
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin)
    },
  },
})
