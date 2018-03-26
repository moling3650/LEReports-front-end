<template>
  <el-date-picker
    v-model="value"
    type="datetimerange"
    range-separator=" 至 "
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    @change="handleChange">
  </el-date-picker>
</template>

<script>
export default {
  name: 'mDatePicker',
  props: {
    label: {
      type: String
    }
  },
  data () {
    return {
      value: null
    }
  },
  methods: {
    handleChange () {
      if (!this.value || !this.value.length) {
        return
      }
      const maxDate = new Date(this.value[0].getTime() + 31 * 24 * 3600000)
      if (maxDate < this.value[1]) {
        this.$message({ showClose: true, message: '最多只能查询31天的数据' })
        this.$set(this.value, 1, maxDate)
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
