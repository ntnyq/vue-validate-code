<script lang="ts" setup>
import { isEmptyString } from '@ntnyq/utils'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRefs,
  useTemplateRef,
  watch,
} from 'vue'
import { useValidateCode } from '../composables'
import type { Emits, Props } from '../helpers'

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

// https://github.com/vuejs/core/issues/11795#issuecomment-2326858438
const canvasEl = useTemplateRef('canvasRef')
const svgEl = useTemplateRef('svgRef')

const currentRenderer = computed(() => props.renderer ?? 'canvas')
const isCanvasRenderer = computed(() => currentRenderer.value === 'canvas')

const elementRef = computed(() =>
  isCanvasRenderer.value ? canvasEl.value : svgEl.value,
)

const {
  config,
  destroy,
  render,
  resize,
  update,
  validate: validateCode,
} = useValidateCode(
  elementRef as any,
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

watch(
  currentRenderer,
  () => {
    render()
  },
  {
    flush: 'post',
  },
)

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
    ref="canvasRef"
    class="vue-validate-code"
  />
  <svg
    @click="handleClick"
    v-else
    ref="svgRef"
    class="vue-validate-code"
  />
</template>
