<!-- 表单验证组件 -->
<template>
<form class="validator" @submit.prevent>
  <slot :error="error" :check="check"></slot>
</form>
</template>

<script>
function getValue (key, obj) {
  return key.split('.').reduce((o, i) => o[i], obj)
}

export default {
  props: {
    // 表单数据对象
    model: {
      type: Object,
      default: () => {}
    },
    // 验证规则
    rules: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    const error = {}
    Object.keys(this.model).forEach(field => {
      error[field] = ''
    })
    return {
      error,
      firstModel: { ...this.model }
    }
  },
  methods: {
    check (field) {
      const currentRule = this.rules[field]

      if (!currentRule) return true

      currentRule.some((rule, index) => {
        const value = getValue(field, this.model)

        if (
          ( // 验证非空
            rule.required && (
              // 字符串类型
              (typeof value === 'string' && !value.trim()) ||
              // 布尔类型
              (typeof value === 'boolean' && !value) ||
              // 数组类型
              (Array.isArray(value) && !value.length)
            )
          ) ||
          ( // 验证长度
            (rule.min || rule.max) &&
            (value.length < rule.min || value.length > rule.max)
          )
        ) {
          this.error[field] = currentRule[index].message || `The ${field} field is required`
          return true
        }

        // 自定义验证
        if (rule.validator) {
          const result = rule.validator(rule, value)
          if (typeof result === 'string') {
            this.error[field] = result
            return true
          }
        }

        this.error[field] = ''
      })
    },
    checkAll (cb) {
      let valid = true
      let error = []

      Object.keys(this.rules).forEach(field => {
        this.check(field)
        if (this.error[field]) {
          valid = false
          error.push(this.error[field])
        }
      })

      error[0] && cb && cb(error)

      return valid
    },
    getFirstModel () {
      return { ...this.firstModel }
    },
    reset () {
      const firstModel = this.getFirstModel()
      Object.keys(firstModel).forEach(key => {
        this.model[key] = firstModel[key]
      })
    }
  }
}
</script>
