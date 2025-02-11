# Guide

## Install

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

## Events
