import type { ExtractPropTypes, PropType } from 'vue'

// eslint-disable-next-line no-void
const UNDEFINED = void 0

const NonDefaultBooleanType = {
  type: Boolean,
  default: UNDEFINED,
}

export const props = {
  chars: String,
  padding: Number,
  colors: Array as PropType<string[]>,

  bgColors: Array as PropType<string[]>,

  fontCount: Number,
  fontFamily: String,
  fontColors: Array as PropType<string[]>,
  minFontSize: Number,
  maxFontSize: Number,
  minFontAngle: Number,
  maxFontAngle: Number,

  lineCount: Number,
  lineColors: Array as PropType<string[]>,
  minLineWidth: Number,
  maxLineWidth: Number,
  hasLine: NonDefaultBooleanType,

  dotCount: Number,
  dotColors: Array as PropType<string[]>,
  minDotRadius: Number,
  maxDotRadius: Number,
  hasDot: NonDefaultBooleanType,
}

export enum EventKey {
  Success = 'success',
  Fail = 'fail',
  Ready = 'ready',
}

export type Props = ExtractPropTypes<typeof props>

export const emits = {
  [EventKey.Success]: () => true,
  [EventKey.Fail]: () => true,
  [EventKey.Ready]: () => true,
}

export type Emits = typeof emits
