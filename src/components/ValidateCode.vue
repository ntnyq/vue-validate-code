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
import { EventKey, emits as vEmits, props as vProps } from '../helpers'

// eslint-disable-next-line vue/define-props-declaration
const props = defineProps(vProps)
// eslint-disable-next-line vue/define-emits-declaration
const emits = defineEmits(vEmits)

const canvasRef = useTemplateRef('canvasRef')

const {
  render,
  destroy,
  update,
  validate: validateCode,
} = useValidateCode(
  canvasRef,
  reactive({
    ...toRefs(props),
  }),
)

function validate(input: string) {
  if (isEmptyString(input)) {
    emits(EventKey.Fail)
    return false
  }

  const isValid = validateCode(input)

  if (isValid) {
    emits(EventKey.Success)
  } else {
    emits(EventKey.Fail)
  }

  return isValid
}
function handleClick() {
  update()
}

onBeforeUnmount(() => {
  destroy()
})

onMounted(() => {
  render()
  emits(EventKey.Ready)
})

defineExpose({
  render,
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
