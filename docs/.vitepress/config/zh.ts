import { defineConfig } from 'vitepress'
import { version } from '../../../package.json'
import { appDescriptionZh, appTitleZh, packageName } from './meta'
import type { DefaultTheme } from 'vitepress'

export const zhConfig = defineConfig({
  title: appTitleZh,
  description: appDescriptionZh,
  themeConfig: {
    outline: {
      label: '本页内容',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    editLink: {
      text: '对本页提出修改建议',
      pattern: `https://github.com/ntnyq/${packageName}/edit/main/docs/:path`,
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
            link: `https://github.com/ntnyq/${packageName}/releases`,
          },
        ],
      },
    ],
  },
})

export const zhSearch: DefaultTheme.AlgoliaSearchOptions['locales'] = {
  zh: {
    placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档',
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查询条件',
          resetButtonAriaLabel: '清除查询条件',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消',
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '没有搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除',
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查你的网络连接',
        },
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
          searchByText: '搜索供应商',
        },
        noResultsScreen: {
          noResultsText: '无法找到相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈',
        },
      },
    },
  },
}
