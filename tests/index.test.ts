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
})

describe('component', () => {
  it('should work', () => {
    const wrapper = mount(ValidateCodeComponent)

    expect(wrapper.find('.vue-validate-code').exists()).toBeTruthy()
  })
})
