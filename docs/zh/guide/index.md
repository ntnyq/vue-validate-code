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

## 事件
