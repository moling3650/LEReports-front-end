<template>
  <div id="queryControls">
    <el-row :gutter="20">
      <el-col v-for="item in formItems" :span="item.span" :key="item.prop" class="cell">
        <component :is="item.type" :ref="item.prop" :label="item.label"/>
      </el-col>
      <el-col :span="4" class="cell">
        <el-button @click="$emit('search', getQueryParams())">查询</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mInput from '@/components/formItems/mInput'
import mDatePicker from '@/components/formItems/mDatePicker'
import mInputLike from '@/components/formItems/mInputLike'
import mInputMultiValue from '@/components/formItems/mInputMultiValue'

export default {
  name: 'queryControls',
  components: {
    mInput,
    mDatePicker,
    mInputLike,
    mInputMultiValue
  },
  data () {
    return {
    }
  },
  computed: mapGetters({
    formItems: 'formItems'
  }),
  methods: {
    getQueryParams () {
      let paramList = []
      let paramMap = {}
      let isValid = true
      this.formItems.forEach(item => {
        let value = this.$refs[item.prop][0].value

        if (value) {
          let str = ''
          if (item.type === 'mDatePicker') {
            str = `${item.prop} >= @start_${item.prop} AND ${item.prop} < @end_${item.prop}`
            paramMap[`start_${item.prop}`] = value[0]
            paramMap[`end_${item.prop}`] = value[1]
          } else if (item.type === 'mInputLike') {
            str = `${item.prop} LIKE @${item.prop}`
            paramMap[item.prop] = `%${value}%`
          } else if (item.type === 'mInputMultiValue') {
            str = `${item.prop} IN (${value.map((v, i) => `@${item.prop}${i}`).join(',')})`
            value.map((v, i) => (paramMap[`${item.prop}${i}`] = v))
          } else {
            str = `${item.prop} = @${item.prop}`
            paramMap[item.prop] = value
          }
          paramList.push(str)
        } else if (item.required) {
          this.$message.error(`${item.label}为必填字段`)
          isValid = false
        }
      })
      const sql = `SELECT * FROM ${this.$route.query.reportCode}` + (paramList.length ? ` WHERE ${paramList.join(' AND ')}` : '')
      return isValid && { sql, ...paramMap }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
