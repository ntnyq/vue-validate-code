<script lang="ts" setup>
import { ElNotification, ElSelectV2 } from 'element-plus'
import epEnLang from 'element-plus/es/locale/lang/en'
import epZhCnLang from 'element-plus/es/locale/lang/zh-cn'
import { useTemplateRef } from 'vue'
import { DEFAULT_CONFIG, ValidateCode } from 'vue-validate-code'
import { useLocale } from '../composables/useLocale'
import type { OptionType } from 'element-plus/es/components/select-v2/src/select.types'
import type { Props } from 'vue-validate-code'

const { lang, t } = useLocale()

const validateCodeRef = useTemplateRef('validateCodeRef')

const validateCode = ref('')
const config = ref<Props>({
  ...DEFAULT_CONFIG,
  minFontSize: 40,
  maxFontSize: 70,
})

const isZhCn = computed(() => lang.value === 'zh-CN')
const epLocale = computed(() => (isZhCn.value ? epZhCnLang : epEnLang))

const fontFamilyOptions: OptionType[] = [
  {
    label: 'SimHei',
    value: 'SimHei',
  },
]

function handleUpdate() {
  validateCodeRef.value?.update()
  validateCode.value = ''
}
function handleValidate() {
  if (!validateCode.value) {
    return ElNotification.warning({
      title: t('titleNotice'),
      message: t('messageFillValidateCode'),
    })
  }

  validateCodeRef.value?.validate(validateCode.value)
}
function handleValidateSuccess() {
  ElNotification.success({
    title: t('titleValidateResult'),
    message: t('messageValidateSuccess'),
  })
}
function handleValidateFail() {
  ElNotification.success({
    title: t('titleValidateResult'),
    message: t('messageValidateFail'),
  })
  handleUpdate()
}
</script>

<template>
  <div class="relative select-none">
    <ElConfigProvider :locale="epLocale">
      <ElRow
        :gutter="20"
        align="middle"
        class="mb-4"
      >
        <ElCol :md="16">
          <div class="h-200px flex-center">
            <div class="h-80px w-240px cursor-pointer">
              <ValidateCode
                @success="handleValidateSuccess"
                @fail="handleValidateFail"
                v-bind="config"
                ref="validateCodeRef"
              />
            </div>
          </div>
        </ElCol>
        <ElCol :md="8">
          <div class="relative mb-4">
            <ElInput
              v-model:model-value="validateCode"
              :maxlength="config.fontCount"
              :placeholder="t('placeholderCode')"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              show-word-limit
            />
          </div>
          <ElRow justify="space-between">
            <ElCol :span="6">
              <ElButton
                @click="handleUpdate"
                type="primary"
                class="w-full"
              >
                <div class="i-ri:refresh-line" />
                <span class="ml-1">{{ t('update') }}</span>
              </ElButton>
            </ElCol>
            <ElCol :span="6">
              <ElButton
                @click="handleValidate"
                type="primary"
                class="w-full"
              >
                <div class="i-ri:check-line" />
                <span class="ml-1">{{ t('validate') }}</span>
              </ElButton>
            </ElCol>
          </ElRow>
        </ElCol>
      </ElRow>
      <ElForm :model="config">
        <div class="relative">
          <div class="flex items-center justify-between py-2">
            <h2 class="font-semibold !m-0 !border-none !p-0 !text-lg">
              {{ t('globalSettings') }}
            </h2>
          </div>

          <ElRow :gutter="20">
            <ElCol :md="6">
              <ElFormItem
                :label="t('padding')"
                prop="padding"
              >
                <ElInputNumber
                  v-model="config.padding"
                  :min="0"
                  :max="20"
                  class="w-full"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                :label="t('caseSensitive')"
                prop="caseSensitive"
              >
                <ElSwitch
                  v-model="config.caseSensitive"
                  :active-text="t('yes')"
                  :inactive-text="t('no')"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                :label="t('autoUpdate')"
                prop="autoUpdate"
              >
                <ElSwitch
                  v-model="config.autoUpdate"
                  :active-text="t('yes')"
                  :inactive-text="t('no')"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                :label="t('renderLines')"
                prop="hasLines"
              >
                <ElSwitch
                  v-model="config.hasLines"
                  :active-text="t('yes')"
                  :inactive-text="t('no')"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                :label="t('renderDots')"
                prop="hasDots"
              >
                <ElSwitch
                  v-model="config.hasDots"
                  :active-text="t('yes')"
                  :inactive-text="t('no')"
                />
              </ElFormItem>
            </ElCol>
          </ElRow>
        </div>

        <div class="relative">
          <div class="flex items-center justify-between py-2">
            <h2 class="font-semibold !m-0 !border-none !p-0 !text-lg">
              {{ t('fontSettings') }}
            </h2>
          </div>
          <ElRow :gutter="20">
            <ElCol :md="18">
              <ElFormItem
                :label="t('chars')"
                prop="chars"
              >
                <ElInput
                  v-model="config.chars"
                  :placeholder="t('placeholderChars')"
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
                :label="t('fontFamily')"
                prop="fontFamily"
              >
                <ElSelectV2
                  v-model="config.fontFamily"
                  :options="fontFamilyOptions"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                :label="t('minFontSize')"
                prop="minFontSize"
              >
                <ElInputNumber
                  v-model="config.minFontSize"
                  :min="1"
                  :max="80"
                  class="w-full"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                :label="t('maxFontSize')"
                prop="maxFontSize"
              >
                <ElInputNumber
                  v-model="config.maxFontSize"
                  :min="1"
                  :max="80"
                  class="w-full"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                :label="t('minFontAngle')"
                prop="minFontAngle"
              >
                <ElInputNumber
                  v-model="config.minFontAngle"
                  :min="-40"
                  :max="0"
                  class="w-full"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                :label="t('maxFontAngle')"
                prop="maxFontAngle"
              >
                <ElInputNumber
                  v-model="config.maxFontAngle"
                  :min="0"
                  :max="40"
                  class="w-full"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                :label="t('fontCount')"
                prop="fontCount"
              >
                <ElInputNumber
                  v-model="config.fontCount"
                  :min="2"
                  :max="8"
                  class="w-full"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
          </ElRow>
        </div>

        <div
          v-if="config.hasLines"
          class="relative"
        >
          <div class="flex items-center justify-between py-2">
            <h2 class="font-semibold !m-0 !border-none !p-0 !text-lg">
              {{ t('lineSettings') }}
            </h2>
          </div>
          <ElRow :gutter="20">
            <ElCol :md="6">
              <ElFormItem
                :label="t('minLineWidth')"
                prop="minLineWidth"
              >
                <ElInputNumber
                  v-model="config.minLineWidth"
                  :min="0"
                  :max="5"
                  class="w-full"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                :label="t('maxLineWidth')"
                prop="maxLineWidth"
              >
                <ElInputNumber
                  v-model="config.maxLineWidth"
                  :min="0"
                  :max="5"
                  class="w-full"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                :label="t('lineCount')"
                prop="lineCount"
              >
                <ElInputNumber
                  v-model="config.lineCount"
                  :min="2"
                  :max="8"
                  class="w-full"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
          </ElRow>
        </div>

        <div
          v-if="config.hasDots"
          class="relative"
        >
          <div class="flex items-center justify-between py-2">
            <h2 class="font-semibold !m-0 !border-none !p-0 !text-lg">
              {{ t('dotSettings') }}
            </h2>
          </div>
          <ElRow :gutter="20">
            <ElCol :md="6">
              <ElFormItem
                :label="t('minDotRadius')"
                prop="minDotRadius"
              >
                <ElInputNumber
                  v-model="config.minDotRadius"
                  :min="0"
                  :max="5"
                  class="w-full"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                :label="t('maxDotRadius')"
                prop="maxDotRadius"
              >
                <ElInputNumber
                  v-model="config.maxDotRadius"
                  :min="0"
                  :max="5"
                  class="w-full"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
            <ElCol :md="6">
              <ElFormItem
                :label="t('dotCount')"
                prop="dotCount"
              >
                <ElInputNumber
                  v-model="config.dotCount"
                  :min="2"
                  :max="8"
                  class="w-full"
                  controls-position="right"
                />
              </ElFormItem>
            </ElCol>
          </ElRow>
        </div>
      </ElForm>
    </ElConfigProvider>
  </div>
</template>
