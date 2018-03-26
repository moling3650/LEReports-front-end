<template>
  <div id="reportEditor">
    <el-row :gutter="20">
      <el-col class="cell" :span="6">
        <el-select v-model="reportCode" clearable filterable placeholder="请选择报表">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-col>
      <el-col class="cell" :span="18">
        <el-button @click="handleEdit">{{ reportCode ? '编辑' : '新建' }}报表</el-button>
        <el-button @click="handleDelete" type="danger">删除报表</el-button>
        <el-button @click="handleOpen" type="primary">打开报表</el-button>
      </el-col>
    </el-row>
    <report-form :report-code="reportCode" ref="reportform" @update-report-code="setReportCode"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import reportForm from '@/components/reportForm'

export default {
  name: 'reportEditor',
  data () {
    return {
      reportCode: ''
    }
  },
  computed: mapGetters({
    options: 'reportOptions'
  }),
  components: {
    reportForm
  },
  watch: {
    reportCode () {
      this.$store.dispatch('getFieldsData', this.reportCode)
    }
  },
  methods: {
    setReportCode (reportCode) {
      this.reportCode = reportCode
    },
    handleEdit () {
      this.$refs.reportform.open()
    },
    handleOpen () {
      if (!this.reportCode) {
        return void this.$message({ showClose: true, message: '请先选择报表' })
      }
      window.open(`${location.origin}${location.pathname}#/report?reportCode=${this.reportCode}`)
    },
    handleDelete () {
      if (!this.reportCode) {
        return void this.$message({ showClose: true, message: '请先选择报表' })
      }
      this.$confirm('此操作将永久删除该报表, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => this.$store.dispatch('deleteReport', this.reportCode))
        .then(() => this.$set(this, 'reportCode', ''))
        .then(() => this.$message.success('删除成功!'))
        .catch(() => this.$message.info('已取消删除'))
    }
  },
  created () {
    this.$store.dispatch('getAllReports')
  }
}
</script>

<style lang="css" scoped>
</style>
