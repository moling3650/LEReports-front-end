<template>
  <div id="reportContent">
    <el-table v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
      border stripe
      size="mini"
      style="width: 100%"
      :header-cell-style="{backgroundColor: '#409eff', color: '#fff'}"
      tooltip-effect="dark"
    >
      <el-table-column prop="prop" label="字段属性" align="center"/>
      <el-table-column prop="label" label="字段标签" align="center"/>
      <el-table-column prop="width" label="字段宽度" :formatter="fmtWidth" align="center"/>
      <el-table-column prop="idx" label="字段排序" align="center"/>
      <el-table-column prop="align" label="字段对齐" align="center"/>
      <el-table-column prop="state" label="是否可见" :formatter="fmtBoolean" align="center"/>
      <el-table-column prop="is_check" label="是否可查询" :formatter="fmtBoolean" align="center"/>
      <el-table-column prop="control_code" label="控件" :formatter="fmtControl" align="center"/>
      <el-table-column prop="control_span" label="控件宽度" align="center"/>
      <el-table-column prop="required" label="是否必填" :formatter="fmtBoolean" align="center"/>
      <el-table-column prop="options_api" label="选择器API" align="center" show-overflow-tooltip/>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <report-field-form ref="form"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import reportFieldForm from '@/components/reportFieldForm'

export default {
  name: 'reportContent',
  computed: mapGetters({
    tableData: 'fieldsData',
    loading: 'loadingFields',
    queryControls: 'queryControlOptions'
  }),
  components: {
    reportFieldForm
  },
  methods: {
    fmtBoolean (row, column, cellValue) {
      return cellValue ? '是' : '否'
    },
    fmtControl (row, column, cellValue) {
      const control = this.queryControls.find(c => c.value === cellValue)
      return control ? control.label : '未知控件'
    },
    fmtWidth (row, column, cellValue) {
      cellValue = cellValue !== undefined ? cellValue : row
      return cellValue ? `${cellValue}px` : '自适应'
    },
    handleRowEdit (idx, row) {
      this.$refs.form.open(row)
    }
  },
  created () {
    this.$store.dispatch('getQueryControls')
  }
}
</script>

<style lang="css" scoped>
#reportContent {
  margin-top: 5px;
}
</style>
