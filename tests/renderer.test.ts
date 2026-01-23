import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ValidateCode } from '../src/components'

describe('ValidateCode Renderer', () => {
  it('should render with canvas by default', () => {
    const wrapper = mount(ValidateCode)
    expect(wrapper.find('canvas').exists()).toBeTruthy()
    expect(wrapper.find('svg').exists()).toBeFalsy()
  })

  it('should render with svg when renderer prop is svg', () => {
    const wrapper = mount(ValidateCode, {
      props: {
        renderer: 'svg',
      },
    })
    expect(wrapper.find('svg').exists()).toBeTruthy()
    expect(wrapper.find('canvas').exists()).toBeFalsy()
  })

  it('should switch between renderers when prop changes', async () => {
    const wrapper = mount(ValidateCode, {
      props: {
        renderer: 'canvas',
      },
    })

    expect(wrapper.find('canvas').exists()).toBeTruthy()

    await wrapper.setProps({ renderer: 'svg' })

    expect(wrapper.find('svg').exists()).toBeTruthy()
    expect(wrapper.find('canvas').exists()).toBeFalsy()
    expect(wrapper.findAll('text[data-type="char"]').length).toBeGreaterThan(0)
  })

  it('canvas renderer should have validation code', () => {
    const wrapper = mount(ValidateCode, {
      props: {
        renderer: 'canvas',
      },
    })
    const validateCode = wrapper.vm.validate('ABCD123')
    expect(typeof validateCode).toBe('boolean')
  })

  it('svg renderer should have validation code', () => {
    const wrapper = mount(ValidateCode, {
      props: {
        renderer: 'svg',
      },
    })
    const validateCode = wrapper.vm.validate('ABCD123')
    expect(typeof validateCode).toBe('boolean')
  })

  it('should keep updating svg content without leaking old nodes', async () => {
    const wrapper = mount(ValidateCode, {
      props: {
        renderer: 'svg',
        fontCount: 4,
        lineCount: 3,
        dotCount: 5,
      },
    })

    const svg = wrapper.find('svg')
    expect(svg.exists()).toBeTruthy()

    await wrapper.vm.update()
    const firstChars = wrapper.findAll('text[data-type="char"]').length
    const firstLines = wrapper.findAll('line[data-type="line"]').length
    const firstDots = wrapper.findAll('circle[data-type="dot"]').length

    await wrapper.vm.update()

    expect(wrapper.findAll('text[data-type="char"]').length).toBe(firstChars)
    expect(wrapper.findAll('line[data-type="line"]').length).toBe(firstLines)
    expect(wrapper.findAll('circle[data-type="dot"]').length).toBe(firstDots)
  })
})
