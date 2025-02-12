/**
 * @file useLocale
 */

import { useData } from 'vitepress/client'
import { computed } from 'vue'
import langEnUS from '../locales/en-US.json'
import langZhCN from '../locales/zh-CN.json'

export function useLocale() {
  const { lang } = useData()
  const i18n = computed<Record<string, string>>(() =>
    lang.value === 'zh-CN' ? langZhCN : langEnUS,
  )

  function t(key: string) {
    return i18n.value[key] || ''
  }

  return {
    lang,
    i18n,
    t,
  }
}
