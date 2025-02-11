<script lang="ts" setup>
import { ElNotification, ElSelectV2 } from 'element-plus'
import { useTemplateRef } from 'vue'
import { DEFAULT_CONFIG, ValidateCode } from 'vue-validate-code'
import type { OptionType } from 'element-plus/es/components/select-v2/src/select.types'
import type { Props } from 'vue-validate-code'

const validateCodeRef = useTemplateRef('validateCodeRef')

const validateCode = ref('')
const isValidateCodeValid = ref(false)
const config = ref<Props>({ ...DEFAULT_CONFIG })

const fontFamilyOptions: OptionType[] = [
  {
    label: 'SimHei',
    value: 'SimHei',
  },
]

function handleUpdate() {
  validateCodeRef.value?.update()
  isValidateCodeValid.value = false
  validateCode.value = ''
}
function handleValidate() {
  if (!validateCode.value) {
    return ElNotification.warning({
      title: '提示',
      message: '请输入验证码',
    })
  }

  const isValid = validateCodeRef.value?.validate(validateCode.value) ?? false

  isValidateCodeValid.value = isValid

  if (isValid) {
    ElNotification.success({
      title: '校验结果',
      message: '校验成功',
    })
  } else {
    ElNotification.success({
      title: '校验结果',
      message: '校验失败',
    })
    handleUpdate()
  }
}
</script>

<template>
  <div class="relative select-none">
    <div class="h-200px flex-center">
      <div class="h-100px w-220px cursor-pointer">
        <ValidateCode ref="validateCodeRef" />
      </div>
    </div>
    <div class="relative">
      <ElForm
        :model="config"
        label-width="80"
      >
        <div class="relative">
          <div class="flex items-center justify-between py-2">
            <h2 class="font-semibold !m-0 !border-none !p-0 !text-lg">
              全局配置
            </h2>
          </div>

          <ElRow :gutter="20">
            <ElCol :md="6">
              <ElFormItem
                prop="padding"
                label="内间距"
              >
                <ElInputNumber
                  v-model="config.padding"
                  :min="0"
                  :max="20"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                prop="hasLine"
                label="渲染线条"
              >
                <ElSwitch
                  v-model="config.hasLine"
                  active-text="是"
                  inactive-text="否"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                prop="hasDot"
                label="渲染圆点"
              >
                <ElSwitch
                  v-model="config.hasDot"
                  active-text="是"
                  inactive-text="否"
                />
              </ElFormItem>
            </ElCol>
          </ElRow>
        </div>

        <div class="relative">
          <div class="flex items-center justify-between py-2">
            <h2 class="font-semibold !m-0 !border-none !p-0 !text-lg">
              文字配置
            </h2>
          </div>
          <ElRow :gutter="20">
            <ElCol :md="18">
              <ElFormItem
                prop="chars"
                label="字符集"
              >
                <ElInput
                  v-model="config.chars"
                  autocorrect="off"
                  maxlength="120"
                  autocapitalize="off"
                  spellcheck="false"
                  show-word-limit
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                prop="fontFamily"
                label="字体"
              >
                <ElSelectV2
                  v-model="config.fontFamily"
                  :options="fontFamilyOptions"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                prop="minFontSize"
                label="最小字体"
              >
                <ElInputNumber
                  v-model="config.minFontSize"
                  :min="10"
                  :max="40"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                prop="maxFontSize"
                label="最大字体"
              >
                <ElInputNumber
                  v-model="config.maxFontSize"
                  :min="10"
                  :max="40"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                prop="minFontAngle"
                label="最小角度"
              >
                <ElInputNumber
                  v-model="config.minFontAngle"
                  :min="-40"
                  :max="0"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                prop="maxFontAngle"
                label="最大角度"
              >
                <ElInputNumber
                  v-model="config.maxFontAngle"
                  :min="0"
                  :max="40"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                prop="fontCount"
                label="文字数量"
              >
                <ElInputNumber
                  v-model="config.fontCount"
                  :min="2"
                  :max="8"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
          </ElRow>
        </div>

        <div
          v-if="config.hasLine"
          class="relative"
        >
          <div class="flex items-center justify-between py-2">
            <h2 class="font-semibold !m-0 !border-none !p-0 !text-lg">
              线条配置
            </h2>
          </div>
          <ElRow :gutter="20">
            <ElCol :md="6">
              <ElFormItem
                prop="minLineWidth"
                label="最小宽度"
              >
                <ElInputNumber
                  v-model="config.minLineWidth"
                  :min="0"
                  :max="5"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                prop="maxLineWidth"
                label="最大宽度"
              >
                <ElInputNumber
                  v-model="config.maxLineWidth"
                  :min="0"
                  :max="5"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                prop="lineCount"
                label="线条数量"
              >
                <ElInputNumber
                  v-model="config.lineCount"
                  :min="2"
                  :max="8"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
          </ElRow>
        </div>

        <div
          v-if="config.hasDot"
          class="relative"
        >
          <div class="flex items-center justify-between py-2">
            <h2 class="font-semibold !m-0 !border-none !p-0 !text-lg">
              圆点配置
            </h2>
          </div>
          <ElRow :gutter="20">
            <ElCol :md="6">
              <ElFormItem
                prop="minDotRadius"
                label="最小半径"
              >
                <ElInputNumber
                  v-model="config.minDotRadius"
                  :min="0"
                  :max="5"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                prop="maxDotRadius"
                label="最大半径"
              >
                <ElInputNumber
                  v-model="config.maxDotRadius"
                  :min="0"
                  :max="5"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                prop="dotCount"
                label="圆点数量"
              >
                <ElInputNumber
                  v-model="config.dotCount"
                  :min="2"
                  :max="8"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
          </ElRow>
        </div>
      </ElForm>

      <div class="relative mt-8 flex-center gap-4">
        <ElButton
          @click="handleUpdate"
          type="primary"
        >
          <div class="i-ri:refresh-line" />
          <span class="ml-1">更新</span>
        </ElButton>
        <div class="w-200px">
          <ElInput
            v-model:model-value="validateCode"
            placeholder="请输入验证码"
          />
        </div>
        <ElButton
          @click="handleValidate"
          type="primary"
        >
          <div class="i-ri:check-line" />
          <span class="ml-1">校验</span>
        </ElButton>
      </div>
    </div>
  </div>
</template>
