declare module 'vue' {
  export interface GlobalComponents {
    ValidateCode: (typeof import('vue-validate-code'))['ValidateCode']
  }
}

export {}
