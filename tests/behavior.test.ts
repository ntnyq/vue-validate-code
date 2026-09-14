import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { plugin, ValidateCode } from '../src'
import type { Props, RendererType } from '../src'

enableAutoUnmount(afterEach)
afterEach(() => vi.restoreAllMocks())

describe.each<RendererType>(['canvas', 'svg'])('%s behavior', renderer => {
  it('applies case sensitivity and refreshes changed props by default', async () => {
    const wrapper = mount(ValidateCode, {
      props: { renderer, chars: 'A', fontCount: 2 },
    })

    expect(wrapper.vm.validate('AA')).toBeTruthy()
    expect(wrapper.vm.validate('aa')).toBeFalsy()

    await wrapper.setProps({ chars: 'B' })

    expect(wrapper.vm.validate('BB')).toBeTruthy()
    expect(wrapper.vm.validate('AA')).toBeFalsy()
  })

  it('refreshes on click by default', async () => {
    const random = vi.spyOn(Math, 'random').mockReturnValue(0)
    const wrapper = mount(ValidateCode, {
      props: { renderer, chars: 'AB', fontCount: 2 },
    })

    expect(wrapper.vm.validate('AA')).toBeTruthy()
    random.mockReturnValue(0.99)
    await wrapper.trigger('click')

    expect(wrapper.vm.validate('BB')).toBeTruthy()
  })

  it('respects explicit false options', async () => {
    const wrapper = mount(ValidateCode, {
      props: {
        renderer,
        chars: 'A',
        fontCount: 2,
        caseSensitive: false,
        updateOnChange: false,
        updateOnClick: false,
      },
    })

    await wrapper.setProps({ chars: 'B' })
    await wrapper.trigger('click')

    expect(wrapper.vm.validate('aa')).toBeTruthy()
    expect(wrapper.vm.validate('BB')).toBeFalsy()
  })

  it.each([0, 39.5, 40])('renders at height %s without throwing', height => {
    const wrapper = mount(ValidateCode, {
      props: {
        renderer,
        chars: 'A',
        fontCount: 2,
        minFontSize: 20,
        maxFontSize: 20,
      },
    })

    expect(() => wrapper.vm.resize({ width: 240, height })).not.toThrow()
    expect(wrapper.vm.validate('AA')).toBeTruthy()
  })

  it('generates complete Unicode characters', () => {
    const random = vi.spyOn(Math, 'random').mockReturnValue(0)
    const wrapper = mount(ValidateCode, {
      props: { renderer, chars: '😀A', fontCount: 2 },
    })

    expect(wrapper.vm.validate('😀😀')).toBeTruthy()
    random.mockReturnValue(0.99)
    wrapper.vm.update()
    expect(wrapper.vm.validate('AA')).toBeTruthy()
  })
})

describe('Boolean config precedence', () => {
  it.each([
    { globalValue: undefined, localValue: undefined, expected: true },
    { globalValue: true, localValue: undefined, expected: true },
    { globalValue: false, localValue: undefined, expected: false },
    { globalValue: true, localValue: false, expected: false },
    { globalValue: false, localValue: true, expected: true },
  ])(
    'resolves $globalValue / $localValue to $expected',
    async ({ globalValue, localValue, expected }) => {
      const random = vi.spyOn(Math, 'random').mockReturnValue(0)
      const booleanConfig = (value: boolean | undefined): Props =>
        value === undefined
          ? {}
          : {
              caseSensitive: value,
              hasDots: value,
              hasLines: value,
              updateOnChange: value,
              updateOnClick: value,
            }
      const wrapper = mount(ValidateCode, {
        props: {
          renderer: 'svg',
          chars: 'AB',
          fontCount: 2,
          ...booleanConfig(localValue),
        },
        global: { plugins: [[plugin, booleanConfig(globalValue)]] },
      })

      expect(wrapper.vm.validate('aa')).toBe(!expected)
      expect(wrapper.findAll('circle')).toHaveLength(expected ? 6 : 0)
      expect(wrapper.findAll('line')).toHaveLength(expected ? 6 : 0)

      random.mockReturnValue(0.99)
      await wrapper.trigger('click')
      expect(wrapper.text()).toBe(expected ? 'BB' : 'AA')

      await wrapper.setProps({ chars: 'C' })
      expect(wrapper.text()).toBe(expected ? 'CC' : 'AA')
    },
  )
})
