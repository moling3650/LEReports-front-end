<template>
  <div id="ReportQuerier">
    <query-controls @search="search"/>
    <query-content :loading="loading" :data="records" :page-size="charts.length ? 7 : 15"/>
    <chart-content v-if="records.length" :data="records"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fetchRecords } from '@/apis'
import queryControls from '@/components/queryControls'
import queryContent from '@/components/queryContent'
import chartContent from '@/components/chartContent'

export default {
  name: 'ReportQuerier',
  components: {
    queryControls,
    queryContent,
    chartContent
  },
  data () {
    return {
      loading: false,
      records: []
    }
  },
  computed: mapGetters([
    'charts'
  ]),
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
      this.$store.dispatch('getChartsByReport', this.$route.query.reportCode)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
