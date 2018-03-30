<template>
  <div id="reportEditor">
    <el-row :gutter="20">
      <el-col class="cell" :span="6">
        <el-select v-model="reportCode" clearable filterable placeholder="请选择报表">
          <el-option v-for="item in reportOptions" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-col>
      <el-col class="cell" :span="6">
        <el-button-group>
          <el-button @click="handleEditReport" :type="reportCode ? 'primary' : 'success'">
            {{ reportCode ? '编辑' : '新建' }}报表
          </el-button>
          <el-button @click="handleDeleteReport" type="danger">删除报表</el-button>
          <el-button @click="handleOpen">打开报表</el-button>
        </el-button-group>
      </el-col>

      <el-col v-show="reportCode" class="cell" :span="6">
        <el-select v-model="chartId" clearable filterable placeholder="请选择图表">
          <el-option v-for="item in chartOptions" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-col>
      <el-col v-show="reportCode" class="cell" :span="6">
        <el-button-group>
          <el-button @click="handleEditChart" :type="chartId ? 'primary' : 'success'">
            {{ chartId ? '编辑' : '新建' }}图表
          </el-button>
          <el-button @click="handleDeleteChart" type="danger">删除图表</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <report-form :report-code="reportCode" ref="reportForm" @update-report-code="setReportCode"/>
    <chart-form :report-code="reportCode" :chart-id="chartId" ref="chartForm"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import reportForm from '@/components/reportForm'
import chartForm from '@/components/Dialog/chartForm'

export default {
  name: 'reportEditor',
  data () {
    return {
      reportCode: '',
      chartId: ''
    }
  },
  computed: mapGetters({
    reportOptions: 'reportOptions',
    chartOptions: 'chartOptions'
  }),
  components: {
    reportForm,
    chartForm
  },
  watch: {
    reportCode () {
      this.chartId = ''
      if (this.reportCode) {
        this.$store.dispatch('getFieldsData', this.reportCode)
        this.$store.dispatch('getChartsByReport', this.reportCode)
      } else {
        this.$store.commit('setFieldsData', [])
        this.$store.commit('setCharts', [])
      }
    }
  },
  methods: {
    setReportCode (reportCode) {
      this.reportCode = reportCode
    },
    handleEditReport () {
      this.$refs.reportForm.open()
    },
    handleOpen () {
      if (!this.reportCode) {
        return void this.$message({ message: '请先选择报表', showClose: true, duration: 1500 })
      }
      window.open(`${location.origin}${location.pathname}#/ReportQuerier?reportCode=${this.reportCode}`)
    },
    handleDeleteReport () {
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
        .then(() => this.$message.success({ message: '删除成功!', showClose: true, duration: 1500 }))
        .catch(() => this.$message.info({ message: '已取消删除', showClose: true, duration: 1500 }))
    },
    handleEditChart () {
      this.$refs.chartForm.open()
    },
    handleDeleteChart () {
      if (!this.chartId) {
        return void this.$message({ message: '请先选择报表', showClose: true, duration: 1500 })
      }
      this.$confirm('此操作将永久删除该图表, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => this.$store.dispatch('deleteChart', this.chartId))
        .then(() => this.$set(this, 'chartId', ''))
        .then(() => this.$message.success({ message: '删除成功!', showClose: true, duration: 1500 }))
        .catch(() => this.$message.info({ message: '已取消删除', showClose: true, duration: 1500 }))
    }
  },
  created () {
    this.$store.dispatch('getAllReports')
    this.$store.dispatch('getChartTypes')
  }
}
</script>

<style lang="css" scoped>
</style>
