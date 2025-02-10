<script lang="ts" setup>
import { useTemplateRef } from 'vue'
import { ValidateCode } from 'vue-validate-code'

const validateCodeRef = useTemplateRef('validateCodeRef')
</script>

<template>
  <div class="relative h-600px flex-center">
    <div class="h-60px w-150px">
      <ValidateCode ref="validateCodeRef" />
    </div>
  </div>
</template>
