<template>
  <el-dialog :title="chartId ? '编辑图表' : '新建图表'" :visible.sync="visible">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="图表" :label-width="formLabelWidth" prop="type">
        <el-select v-model="form.type" placeholder="请选择图表">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类别" :label-width="formLabelWidth" prop="label">
        <el-select v-model="form.label" placeholder="请选择类别">
          <el-option
            v-for="item in fieldOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据" :label-width="formLabelWidth" prop="value">
        <el-select v-model="form.value" multiple placeholder="请选择数据">
          <el-option
            v-for="item in fieldOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="saveChart">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'chartForm',
  props: {
    reportCode: {
      type: String,
      required: true
    },
    chartId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      visible: false,
      formLabelWidth: '100px',
      form: {},
      rules: {
        title: [
          { required: true, message: '请输入图表标题', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择图表类型', trigger: 'blur' }
        ],
        label: [
          { required: true, message: '请选择图表类别', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请选择图表数据', trigger: 'blur' }
        ]
      }
    }
  },
  computed: mapGetters({
    typeOptions: 'chartTypeOptions',
    fieldOptions: 'fieldOptions'
  }),
  methods: {
    open () {
      this.$refs.form && this.$refs.form.resetFields()
      const chart = Object.assign({}, this.$store.getters.getChartByID(this.chartId))
      this.form = {
        type: chart.type || '',
        title: chart.title || '',
        label: chart.label || '',
        value: chart.value ? chart.value.split(',') : []
      }
      this.visible = true
    },
    saveChart () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const form = {
            id: parseInt(this.chartId) || -1,
            report_code: this.reportCode,
            type: this.form.type,
            title: this.form.title,
            label: this.form.label,
            value: this.form.value.join(',')
          }
          this.$store.dispatch('saveChart', form).then(() => {
            this.$message.success({ message: '保存成功!', showClose: true, duration: 1500 })
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
