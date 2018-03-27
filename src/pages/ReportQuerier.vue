<template>
  <div id="ReportQuerier">
    <query-controls @search="search"/>
    <query-content :loading="loading" :data="records"/>
  </div>
</template>

<script>
import { fetchRecords } from '@/apis'
import queryControls from '@/components/queryControls'
import queryContent from '@/components/queryContent'

export default {
  name: 'ReportQuerier',
  components: {
    queryControls,
    queryContent
  },
  data () {
    return {
      loading: false,
      records: []
    }
  },
  methods: {
    search (params) {
      this.loading = true
      fetchRecords(params).then(data => {
        this.records = data
        this.loading = false
      })
    }
  },
  created () {
    window.document.title = '报表查询器'
    if (!this.$route.query.reportCode) {
      this.$message.error('缺少报表编号')
    } else {
      this.$store.dispatch('getFieldsData', this.$route.query.reportCode)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
