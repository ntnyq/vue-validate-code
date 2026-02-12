import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { version } from '../../../package.json'
import { appDescriptionZh, REPOSITORY_SLUG, appTitleZh } from './meta'

export const zhConfig = defineConfig({
  title: appTitleZh,
  description: appDescriptionZh,
  themeConfig: {
    lastUpdated: {
      text: '最近更新时间',
    },

    outline: {
      level: [2, 4],
      label: '本页内容',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    editLink: {
      text: '对本页提出修改建议',
      pattern: `https://github.com/${REPOSITORY_SLUG}/edit/main/docs/:path`,
    },

    nav: [
      { text: '首页', link: '/zh/' },
      { text: '指南', link: '/zh/guide/' },
      {
        text: `v${version}`,
        items: [
          { text: `v${version} (当前)`, link: '/zh/' },
          {
            text: '更新日志',
            link: `https://github.com/${REPOSITORY_SLUG}/releases`,
          },
        ],
      },
    ],
  },
})

export const zhSearch: DefaultTheme.LocalSearchOptions['locales'] = {
  zh: {
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档',
      },
      modal: {
        displayDetails: '显示详情',
        resetButtonTitle: '重置',
        backButtonTitle: '返回',
        noResultsText: '未找到结果',
        footer: {
          selectText: '选择',
          selectKeyAriaLabel: '选择',
          navigateText: '切换',
          navigateUpKeyAriaLabel: '向上切换',
          navigateDownKeyAriaLabel: '向下切换',
          closeText: '关闭',
          closeKeyAriaLabel: '关闭',
        },
      },
    },
  },
}
