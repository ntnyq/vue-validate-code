---
sidebar: false
---

# 指南

## 安装

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

## 使用

### 作为组件使用

```vue [validate-code.vue]
<script lang="ts" setup>
import { useTemplateRef } from 'vue'
import { ValidateCode } from 'vue-validate-code'

const validateCode = ref('')
const validateCodeRef = useTemplateRef('validateCodeRef')

function handleValidate() {
  if (!validateCode.value) {
    return console.log('No validate code value')
  }

  const isValid = validateCodeRef.value?.validate(validateCode.value)

  console.log({ isValid })
}

function handleUpdate() {
  validateCodeRef.value?.update()
}
</script>

<template>
  <ValidateCode
    @click="handleUpdate"
    ref="validateCodeRef"
  />
</template>
```

### 作为插件使用

```ts [main.ts]
import { createApp } from 'vue'
import ValidateCode from 'vue-validate-code'
import App from '@/App.vue'

const app = createApp(App)

app.use(ValidateCode)

app.mount('#app')
```

然后你就可以在你的 Vue 应用内使用 `ValidateCode` 组件，如上所示。

## 属性

### chars

- **类型**: `string`
- **默认值**: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`

验证码字符集.

### padding

- **类型**: `number`
- **默认值**: `10`

画布内间距。

### autoUpdate

- **类型**: `boolean`
- **默认值**: `true`

Props 变更时自动更新验证码。

### caseSensitive

- **类型**: `boolean`
- **默认值**: `true`

[validate](#validate) 方法是否大小写敏感。

### hasDots

- **类型**: `boolean`
- **默认值**: `true`

是否渲染圆点。

### hasLines

- **类型**: `boolean`
- **默认值**: `true`

是否渲染线条。

### colors

- **类型**: `string[]`
- **默认值**: `[]`

全局颜色。

### bgColors

- **类型**: `string[]`
- **默认值**: `[]`

背景颜色。

### fontCount

- **类型**: `number`
- **默认值**: `6`

文字数量。

### fontFamily

- **类型**: `string`
- **默认值**: `SimHei`

字体。

### fontColors

- **类型**: `string[]`
- **默认值**: `[]`

字体颜色。

### minFontSize

- **类型**: `number`
- **默认值**: `20`

最小字号。

### maxFontSize

- **类型**: `number`
- **默认值**: `30`

最大字号。

### minFontAngle

- **类型**: `number`
- **默认值**: `-30`

文字旋转最小角度。

### maxFontAngle

- **类型**: `number`
- **默认值**: `30`

文字旋转最大角度。

### dotCount

- **类型**: `number`
- **默认值**: `6`

圆点数量。

### dotColors

- **类型**: `string[]`
- **默认值**: `[]`

圆点颜色。

### minDotRadius

- **类型**: `number`
- **默认值**: `1`

最小圆点半径。

### maxDotRadius

- **类型**: `number`
- **默认值**: `3`

最大圆点半径。

### lineCount

- **类型**: `number`
- **默认值**: `6`

线条数量。

### lineColors

- **类型**: `string[]`
- **默认值**: `[]`

线条颜色。

### minLineWidth

- **类型**: `number`
- **默认值**: `1`

最小线条宽度。

### maxLineWidth

- **类型**: `number`
- **默认值**: `2`

最大线条宽度。

## 事件

### success

- **类型**: `() => void`

当 [validate](#validate) 方法返回 `true` 时触发。

### fail

- **类型**: `() => void`

当 [validate](#validate) 方法返回 `false` 时触发。

### ready

- **类型**: `() => void`

当组件 `ValidateCode` 渲染完成时触发。

## 方法

### validate

- **类型**: `(input: string) => boolean`

传入用户输入的验证码，校验并返回是否通过。

### update

- **类型**: `() => void`

更新验证码，并重新渲染。

### render

- **类型**: `() => void`

重新渲染当前的验证码。

### destroy

- **类型**: `() => void`

销毁当前渲染的验证码。

### resize

```ts
interface CanvasSize {
  width: number
  height: number
}
```

- **类型**: `(size: CanvasSize) => void`

更新画布尺寸。
