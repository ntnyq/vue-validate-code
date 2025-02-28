# vue-validate-code

[![CI](https://github.com/ntnyq/vue-validate-code/workflows/CI/badge.svg)](https://github.com/ntnyq/vue-validate-code/actions)
[![NPM VERSION](https://img.shields.io/npm/v/vue-validate-code.svg)](https://www.npmjs.com/package/vue-validate-code)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/vue-validate-code.svg)](https://www.npmjs.com/package/vue-validate-code)
[![CODECOV](https://codecov.io/github/ntnyq/vue-validate-code/branch/main/graph/badge.svg)](https://codecov.io/github/ntnyq/vue-validate-code)
[![LICENSE](https://img.shields.io/github/license/ntnyq/vue-validate-code.svg)](https://github.com/ntnyq/vue-validate-code/blob/main/LICENSE)

## Install

```shell
npm i vue-validate-code
```

```shell
yarn add vue-validate-code
```

```shell
pnpm add vue-validate-code
```

## Usage

```vue
<script lang="ts" setup>
import { useTemplateRef } from 'vue'
import { ValidateCode } from 'vue-validate-code'

const validateCode = ref('')
const validateCodeRef = useTemplateRef('validateCodeRef')

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
    validateCodeRef.value?.update()
  }
}
</script>

<template>
  <ValidateCode
    @validate="handleValidateCallback"
    ref="validateCodeRef"
  />
  <input
    v-model="validateCode"
    placeholder="Fill the validate code"
  />
  <button
    @click="handleTriggerValidate"
    type="button"
  >
    Validate
  </button>
</template>
```

## Docs

Check more examples and APIs in [Docs](https://vue-validate-code.ntnyq.com/)

## License

[MIT](./LICENSE) License © 2025 to PRESENT [ntnyq](https://github.com/ntnyq)
