<template>
  <el-input v-model="rawValue" clearable :placeholder="`请输入${label}`"/>
</template>

<script>
export default {
  name: 'mInput',
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      rawValue: ''
    }
  },
  computed: {
    value () {
      return this.rawValue.trim()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
