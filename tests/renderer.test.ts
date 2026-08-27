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

  it('canvas renderer should validate its generated code', () => {
    const wrapper = mount(ValidateCode, {
      props: {
        chars: 'A',
        fontCount: 4,
        renderer: 'canvas',
      },
    })

    expect(wrapper.vm.validate('AAAA')).toBeTruthy()
  })

  it('svg renderer should validate its generated code', () => {
    const wrapper = mount(ValidateCode, {
      props: {
        chars: 'A',
        fontCount: 4,
        renderer: 'svg',
      },
    })

    expect(wrapper.text()).toBe('AAAA')
    expect(wrapper.vm.validate('AAAA')).toBeTruthy()
  })

  it('should not update on click when disabled', async () => {
    const wrapper = mount(ValidateCode, {
      props: {
        chars: 'A',
        renderer: 'svg',
        updateOnClick: false,
      },
    })
    const firstCharacter = wrapper.find('text[data-type="char"]').element

    await wrapper.find('svg').trigger('click')

    expect(wrapper.find('text[data-type="char"]').element).toBe(firstCharacter)
  })

  it('should emit validate and fail for empty input', () => {
    const wrapper = mount(ValidateCode)

    expect(wrapper.vm.validate('')).toBeFalsy()
    expect(wrapper.emitted('validate')).toEqual([[false]])
    expect(wrapper.emitted('fail')).toHaveLength(1)
  })

  it('should resize and redraw svg content', () => {
    const wrapper = mount(ValidateCode, {
      props: {
        chars: 'A',
        fontCount: 2,
        renderer: 'svg',
      },
    })
    const firstCharacter = wrapper.find('text[data-type="char"]').element

    wrapper.vm.resize({ width: 240, height: 80 })

    expect(wrapper.find('svg').attributes()).toMatchObject({
      height: '80',
      width: '240',
    })
    expect(wrapper.find('rect[data-type="bg"]').attributes()).toMatchObject({
      height: '80',
      width: '240',
    })
    expect(wrapper.find('text[data-type="char"]').element).not.toBe(
      firstCharacter,
    )
    expect(wrapper.vm.validate('AA')).toBeTruthy()
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
