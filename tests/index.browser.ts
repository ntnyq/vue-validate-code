import { expect, it } from 'vitest'
import { render } from 'vitest-browser-vue'
import { ValidateCode } from '../src'

it('should render ValidateCode component', async () => {
  const screen = render(ValidateCode, {
    attrs: {
      'data-testid': 'validate-code',
    },
    props: {
      background: '#f0f0f0',
      color: '#333333',
      dotCount: 30,
      fontSize: 24,
      height: 40,
      length: 6,
      lineCount: 5,
      width: 120,
    },
  })

  expect(screen.getByTestId('validate-code')).toBeDefined()
  expect(screen.getByTestId('validate-code').element().tagName).toBe('CANVAS')
})
