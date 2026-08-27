import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import {
  ValidateCode as ValidateCodeComponent,
  plugin as ValidateCodePlugin,
} from '../src'

describe('plugin', () => {
  it('should work', () => {
    expect(ValidateCodePlugin).toBeTruthy()
    expect(ValidateCodePlugin.install).toBeInstanceOf(Function)
  })

  it('should render', () => {
    const ValidateCode = defineComponent({
      template: `<ValidateCode />`,
    })
    const wrapper = mount(ValidateCode, {
      global: {
        plugins: [ValidateCodePlugin],
      },
    })

    expect(wrapper.find('.vue-validate-code').exists()).toBeTruthy()
  })

  it('should apply global renderer config', () => {
    const App = defineComponent({
      template: `<ValidateCode />`,
    })
    const wrapper = mount(App, {
      global: {
        plugins: [[ValidateCodePlugin, { renderer: 'svg' }]],
      },
    })

    expect(wrapper.find('svg').exists()).toBeTruthy()
    expect(wrapper.findAll('text[data-type="char"]')).toHaveLength(6)
  })
})

describe('component', () => {
  it('should work', () => {
    const wrapper = mount(ValidateCodeComponent)

    expect(wrapper.find('.vue-validate-code').exists()).toBeTruthy()
  })
})
