<template>
  <div id="reportForm">
    <el-dialog :title="reportCode ? '编辑报表' : '新建报表'" :visible.sync="visible" :close-on-click-modal="false">
      <el-form :model="reportForm" :rules="rules" ref="reportForm">
        <el-form-item label="报表编号" :label-width="formLabelWidth" prop="report_code">
          <el-input v-model="reportForm.report_code" :disabled="reportCode !== ''"/>
        </el-form-item>
        <el-form-item label="报表名称" :label-width="formLabelWidth" prop="report_name">
          <el-input v-model="reportForm.report_name"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="saveReport">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'reportForm',
  props: {
    reportCode: {
      type: String,
      required: true
    }
  },
  data () {
    var checkReportCode = (rule, value, callback) => {
      if (this.reportCode) {
        return callback()
      }
      if (!value) {
        return callback(new Error('报表编码不能为空'))
      }

      this.$store.dispatch('validReport', value).then(result => {
        if (!result) {
          return callback(new Error('请求失败'))
        }
        console.log(result)
        if (result.hasReport) {
          return callback(new Error('该报表已存在'))
        } else if (!result.hasObject) {
          return callback(new Error('数据库没有该表或视图'))
        }
        return callback()
      })
    }
    return {
      visible: false,
      reportForm: {},
      formLabelWidth: '100px',
      rules: {
        report_code: [
          { required: true, validator: checkReportCode, trigger: 'blur' }
        ],
        report_name: [
          { required: true, message: '请输入报表名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    open () {
      this.$refs.reportForm && this.$refs.reportForm.resetFields()
      this.reportForm = Object.assign({}, this.$store.getters.getReportByCode(this.reportCode))
      this.visible = true
    },
    saveReport () {
      this.$refs.reportForm.validate((valid) => {
        if (valid) {
          this.reportForm.query_sql = `SELECT * FROM ${this.reportForm.report_code}`
          this.$store.dispatch('saveReport', Object.assign({}, this.reportForm)).then(res => {
            this.$message.success('保存成功!')
            this.$emit('update:reportCode', this.reportForm.report_code)
            this.visible = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
