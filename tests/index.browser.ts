import { expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { ValidateCode } from '../src'

it('should render ValidateCode component', async () => {
  const screen = render(ValidateCode, {
    props: {
      length: 6,
      width: 120,
      height: 40,
      fontSize: 24,
      background: '#f0f0f0',
      color: '#333333',
      lineCount: 5,
      dotCount: 30,
    },
    attrs: {
      'data-testid': 'validate-code',
    },
  })

  expect(screen.getByTestId('validate-code')).toBeDefined()
  expect(screen.getByTestId('validate-code').element().tagName).toBe('CANVAS')
})
