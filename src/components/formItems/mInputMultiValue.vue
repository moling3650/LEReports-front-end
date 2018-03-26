<template>
  <el-input v-model="rawValue" clearable :placeholder="`请输入一个或多个${label}`"/>
</template>

<script>
export default {
  name: 'mInputMultiValue',
  props: {
    label: {
      type: String,
      default: '数值'
    }
  },
  data () {
    return {
      rawValue: ''
    }
  },
  computed: {
    value () {
      return this.rawValue.trim() && this.rawValue.trim().split(/[\s,]+/)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
