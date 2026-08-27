<script lang="ts" setup>
import { isEmptyString } from '@ntnyq/utils'
import { computed, onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { useValidateCode } from '../composables'
import type { Emits, Props } from '../helpers'
import type { RendererElement } from '../types'

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const elementRef = useTemplateRef<RendererElement>('elementRef')

const {
  config,
  destroy,
  render,
  resize,
  update,
  validate: validateCode,
} = useValidateCode(elementRef, () => props)

const isCanvasRenderer = computed(() => config.value.renderer === 'canvas')

function handleClick() {
  if (!config.value.updateOnClick) {
    return
  }
  update()
}

function validate(input: string) {
  if (isEmptyString(input)) {
    emit('validate', false)
    emit('fail')
    return false
  }

  const isValid = validateCode(input)

  emit('validate', isValid)

  if (isValid) {
    emit('success')
  } else {
    emit('fail')
  }

  return isValid
}

onBeforeUnmount(() => {
  destroy()
})

onMounted(() => {
  render()
  emit('ready')
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
    v-if="isCanvasRenderer"
    ref="elementRef"
    class="vue-validate-code"
  />
  <svg
    @click="handleClick"
    v-else
    ref="elementRef"
    class="vue-validate-code"
  />
</template>
