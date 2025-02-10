<script lang="ts" setup>
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { useValidateCode } from '../composables'
import { EventKey, emits as vEmits, props as vProps } from '../helpers'

// eslint-disable-next-line vue/define-props-declaration
const props = defineProps(vProps)
// eslint-disable-next-line vue/define-emits-declaration
const emits = defineEmits(vEmits)

const canvasRef = useTemplateRef('canvasRef')

const { init, destroy, update, validate } = useValidateCode(canvasRef, props)

function handleClick() {
  update()
}

onBeforeUnmount(() => {
  destroy()
})

onMounted(() => {
  init()
  emits(EventKey.Ready)
})

defineExpose({
  init,
  update,
  validate,
  destroy,
})
</script>

<template>
  <canvas
    @click="handleClick"
    ref="canvasRef"
    class="vue-validate-code"
  />
</template>
