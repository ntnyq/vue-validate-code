import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { version } from '../../../package.json'
import { REPOSITORY_SLUG, appDescriptionZh, appTitleZh } from './meta'

export const zhConfig = defineConfig({
  description: appDescriptionZh,
  themeConfig: {
    docFooter: {
      next: '下一页',
      prev: '上一页',
    },

    editLink: {
      pattern: `https://github.com/${REPOSITORY_SLUG}/edit/main/docs/:path`,
      text: '对本页提出修改建议',
    },

    lastUpdated: {
      text: '最近更新时间',
    },

    nav: [
      { link: '/zh/', text: '首页' },
      { link: '/zh/guide/', text: '指南' },
      {
        items: [
          { text: `v${version} (当前)`, link: '/zh/' },
          {
            text: '更新日志',
            link: `https://github.com/${REPOSITORY_SLUG}/releases`,
          },
        ],
        text: `v${version}`,
      },
    ],

    outline: {
      label: '本页内容',
      level: [2, 4],
    },
  },
  title: appTitleZh,
})

export const zhSearch: DefaultTheme.LocalSearchOptions['locales'] = {
  zh: {
    translations: {
      button: {
        buttonAriaLabel: '搜索文档',
        buttonText: '搜索文档',
      },
      modal: {
        backButtonTitle: '返回',
        displayDetails: '显示详情',
        footer: {
          closeKeyAriaLabel: '关闭',
          closeText: '关闭',
          navigateDownKeyAriaLabel: '向下切换',
          navigateText: '切换',
          navigateUpKeyAriaLabel: '向上切换',
          selectKeyAriaLabel: '选择',
          selectText: '选择',
        },
        noResultsText: '未找到结果',
        resetButtonTitle: '重置',
      },
    },
  },
}
