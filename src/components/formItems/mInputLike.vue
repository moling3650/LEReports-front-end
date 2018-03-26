<template>
  <el-input v-model="rawValue" clearable :placeholder="`模糊查询${label}`"/>
</template>

<script>
export default {
  name: 'mInputLike',
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
