# vue-validate-code

[![CI](https://github.com/ntnyq/vue-validate-code/workflows/CI/badge.svg)](https://github.com/ntnyq/vue-validate-code/actions)
[![NPM VERSION](https://img.shields.io/npm/v/vue-validate-code.svg)](https://www.npmjs.com/package/vue-validate-code)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/vue-validate-code.svg)](https://www.npmjs.com/package/vue-validate-code)
[![CODECOV](https://codecov.io/github/ntnyq/vue-validate-code/branch/main/graph/badge.svg)](https://codecov.io/github/ntnyq/vue-validate-code)
[![LICENSE](https://img.shields.io/github/license/ntnyq/vue-validate-code.svg)](https://github.com/ntnyq/vue-validate-code/blob/main/LICENSE)

## Install

```shell
npm i vite-plugin-starter
```

```shell
yarn add vite-plugin-starter
```

```shell
pnpm add vite-plugin-starter
```

## Usage

```vue
<script lang="ts" setup>
import { useTemplateRef } from 'vue'
import { ValidateCode } from 'vue-validate-code'

const validateCode = ref('')
const validateCodeRef = useTemplateRef('validateCodeRef')

function handleValidate() {
  if (!validateCode.value) {
    return console.log('No validate code value')
  }

  const isValid = validateCodeRef.value?.validate(validateCode.value) ?? false

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

## Docs

Check more examples and APIs in [Docs](https://vue-validate-code.ntnyq.com/)

## License

[MIT](./LICENSE) License © 2025 to PRESENT [ntnyq](https://github.com/ntnyq)
