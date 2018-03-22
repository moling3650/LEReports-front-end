<template>
  <div id="reportEditor">
    <el-row :gutter="20">
      <el-col class="cell" :span="6">
        <el-select :value="reportCode" clearable filterable placeholder="请选择报表" @change="handleReportChange">
          <el-option v-for="item in reports" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-col>
      <el-col class="cell" :span="18">
        <el-button @click="openReportForm">{{ reportCode ? '编辑' : '新建' }}报表</el-button>
        <el-button @click="deleteReport" type="danger">删除报表</el-button>
        <el-button @click="openReportURL" type="primary">打开报表</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'reportEditor',
  data () {
    return {
      reportCode: '',
      reports: []
    }
  },
  methods: {
    handleReportChange (reportCode) {
    },
    openReportForm () {
    },
    openReportURL () {
    },
    deleteReport () {
    }
  }
}
</script>

<style lang="css" scoped>
</style>
