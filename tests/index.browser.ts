import { expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { ValidateCode } from '../src'

it('should render the configured validation code with svg', async () => {
  const screen = render(ValidateCode, {
    props: {
      chars: 'A',
      fontCount: 6,
      hasDots: false,
      hasLines: false,
      renderer: 'svg',
    },
    attrs: {
      'data-testid': 'validate-code',
    },
  })

  expect(screen.getByTestId('validate-code')).toBeDefined()
  const element = screen.getByTestId('validate-code').element()

  expect(element.tagName).toBe('svg')
  expect(element.querySelectorAll('text[data-type="char"]')).toHaveLength(6)
  expect(element.textContent).toBe('AAAAAA')
})
