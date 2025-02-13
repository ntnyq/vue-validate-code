---
sidebar: false
---

# Guide

## Installation

::: code-group

```shell [npm]
npm i vue-validate-code
```

```shell [yarn]
yarn add vue-validate-code
```

```shell [pnpm]
pnpm add vue-validate-code
```

:::

## Usage

### As component

```vue [validate-code.vue]
<script lang="ts" setup>
import { useTemplateRef } from 'vue'
import { ValidateCode } from 'vue-validate-code'

const validateCode = ref('')
const validateCodeRef = useTemplateRef('validateCodeRef')

function handleUpdateValidateCode() {
  validateCodeRef.value?.update()
}
function handleTriggerValidate() {
  if (!validateCode.value) {
    return console.log('No validate code value')
  }

  cvalidateCodeRef.value?.validate(validateCode.value)
}
function handleValidateCallback(isValid) {
  if (isValid) {
    console.log('validate success')
  } else {
    console.log('validate fail')
    handleUpdateValidateCode()
  }
}
</script>

<template>
  <ValidateCode
    @validate="handleValidateCallback"
    @click="handleUpdateValidateCode"
    ref="validateCodeRef"
  />
  <button
    @click="handleTriggerValidate"
    type="button"
  >
    Validate
  </button>
</template>
```

### As plugin

```ts [main.ts]
import { createApp } from 'vue'
import ValidateCode from 'vue-validate-code'
import App from '@/App.vue'

const app = createApp(App)

app.use(ValidateCode)

app.mount('#app')
```

Then you can component `ValidateCode` in your app everywhere like above.

## Props

### chars

- **type**: `string`
- **default**: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`

Chars to generate validate code.

### padding

- **type**: `number`
- **default**: `10`

Canvas padding.

### autoUpdate

- **type**: `boolean`
- **default**: `true`

Whether update validate code when props changed.

### caseSensitive

- **type**: `boolean`
- **default**: `true`

[validate](#validate) method is case sensitive.

### hasDots

- **type**: `boolean`
- **default**: `true`

Whether to render dots.

### hasLines

- **type**: `boolean`
- **default**: `true`

Whether to render lines.

### colors

- **type**: `string[]`
- **default**: `[]`

Global colors.

### bgColors

- **type**: `string[]`
- **default**: `[]`

Canvas background colors.

### fontCount

- **type**: `number`
- **default**: `6`

Font count.

### fontFamily

- **type**: `string`
- **default**: `SimHei`

Font family.

### fontColors

- **type**: `string[]`
- **default**: `[]`

Font colors.

### minFontSize

- **type**: `number`
- **default**: `20`

Min font size.

### maxFontSize

- **type**: `number`
- **default**: `30`

Max font size.

### minFontAngle

- **type**: `number`
- **default**: `-30`

Min font rotate angle.

### maxFontAngle

- **type**: `number`
- **default**: `30`

Max font rotate angle.

### dotCount

- **type**: `number`
- **default**: `6`

Dot count.

### dotColors

- **type**: `string[]`
- **default**: `[]`

Dot colors.

### minDotRadius

- **type**: `number`
- **default**: `1`

Min dot radius.

### maxDotRadius

- **type**: `number`
- **default**: `3`

Max dot radius.

### lineCount

- **type**: `number`
- **default**: `6`

Line count.

### lineColors

- **type**: `string[]`
- **default**: `[]`

Line colors.

### minLineWidth

- **type**: `number`
- **default**: `1`

Min line width.

### maxLineWidth

- **type**: `number`
- **default**: `2`

Max line width.

## Events

### validate

- **type**: `(isValid: boolean) => void`

Triggered after [validate](#validate) method is called, callback the validate result.

### success

- **type**: `() => void`

Triggered when [validate](#validate) method returns `true`.

### fail

- **type**: `() => void`

Triggered when [validate](#validate) method returns `false`.

### ready

- **type**: `() => void`

Triggered when `ValidateCode` component rendered.

## Methods

### validate

- **type**: `(input: string) => boolean`

Validate input code, return true if it is valid, false otherwise.

### update

- **type**: `() => void`

Update the validateCode and render.

### render

- **type**: `() => void`

Re-render the canvas.

### destroy

- **type**: `() => void`

Destroy current canvas.

### resize

```ts
interface CanvasSize {
  width: number
  height: number
}
```

- **type**: `(size: CanvasSize) => void`

Update canvas size.
