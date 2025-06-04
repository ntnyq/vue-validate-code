<script lang="ts" setup>
import { isEmptyString } from '@ntnyq/utils'
import {
  onBeforeUnmount,
  onMounted,
  reactive,
  toRefs,
  useTemplateRef,
} from 'vue'
import { useValidateCode } from '../composables'
import type { Emits, Props } from '../helpers'

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

// https://github.com/vuejs/core/issues/11795#issuecomment-2326858438
const canvasEl = useTemplateRef('canvasRef')

const {
  config,
  destroy,
  render,
  resize,
  update,
  validate: validateCode,
} = useValidateCode(
  canvasEl,
  reactive({
    ...toRefs(props),
  }),
)

function handleClick() {
  if (!config.value.updateOnClick) {
    return
  }
  update()
}
function validate(input: string) {
  if (isEmptyString(input)) {
    emits('fail')
    return false
  }

  const isValid = validateCode(input)

  emits('validate', isValid)

  if (isValid) {
    emits('success')
  } else {
    emits('fail')
  }

  return isValid
}

onBeforeUnmount(() => {
  destroy()
})

onMounted(() => {
  render()
  emits('ready')
})

defineExpose({
  destroy,
  render,
  resize,
  update,
  validate,
})
</script>

<template>
  <canvas
    @click="handleClick"
    ref="canvasRef"
    class="vue-validate-code"
  />
</template>
