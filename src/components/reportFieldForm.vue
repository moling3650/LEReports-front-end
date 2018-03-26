<template>
  <el-dialog :title="`${fieldForm.prop}字段修改`" :visible.sync="visible">
    <el-form :model="fieldForm" ref="fieldForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-row :gutter="30">
            <el-col :span="8">
              <label class="form-label">字段标签</label>
            </el-col>
            <el-col :span="16">
              <el-input v-model="fieldForm.label"/>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
              <label class="form-label">字段宽度</label>
            </el-col>
            <el-col :span="15">
              <el-slider v-model="fieldForm.width" :min="0" :max="300" :step="10" :format-tooltip="fmtWidth"/>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
              <label class="form-label">字段排序</label>
            </el-col>
            <el-col :span="15">
              <el-slider v-model="fieldForm.idx" :min="1"/>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
              <label class="form-label">字段对齐</label>
            </el-col>
            <el-col :span="16">
              <el-select v-model="fieldForm.align">
                <el-option v-for="key in ['left', 'center', 'right']" :key="key" :value="key"/>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
              <label class="form-label">是否可见</label>
            </el-col>
            <el-col :span="16">
              <el-switch v-model="fieldForm.state" :active-value="1" :inactive-value="0"/>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="12">
          <el-row :gutter="30">
            <el-col :span="8">
              <label class="form-label">是否可查询</label>
            </el-col>
            <el-col :span="16">
              <el-switch v-model="fieldForm.is_check" :active-value="1" :inactive-value="0"/>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
              <label class="form-label">控件名称</label>
            </el-col>
            <el-col :span="16">
              <el-select v-model="fieldForm.control_code" filterable>
                <el-option v-for="qc in queryControls" :key="qc.value" :label="qc.label" :value="qc.value"/>
              </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
              <label class="form-label">是否必填</label>
            </el-col>
            <el-col :span="16">
              <el-switch v-model="fieldForm.required" :active-value="1" :inactive-value="0"/>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
              <label class="form-label">控件宽度</label>
            </el-col>
            <el-col :span="16">
              <el-slider v-model="fieldForm.control_span" :min="1" :max="24"/>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="8">
              <label class="form-label">选择器API</label>
            </el-col>
            <el-col :span="16">
              <el-input v-model="fieldForm.options_api"/>
            </el-col>
          </el-row>
        </el-col>

      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="saveReportField">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'reportFieldForm',
  data () {
    return {
      visible: false,
      fieldForm: {},
      formLabelWidth: '100px'
    }
  },
  computed: mapGetters({
    queryControls: 'queryControlOptions'
  }),
  methods: {
    open (formData) {
      this.$refs.fieldForm && this.$refs.fieldForm.resetFields()
      const form = Object.assign({}, formData)
      form.width = parseInt(form.width) || 0
      this.fieldForm = form
      this.visible = true
    },
    fmtWidth (row, column, cellValue) {
      cellValue = cellValue !== undefined ? cellValue : row
      return cellValue ? `${cellValue}px` : '自适应'
    },
    saveReportField () {
      this.$refs.fieldForm.validate((valid) => {
        if (valid) {
          const form = Object.assign({}, this.fieldForm)
          form.width = form.width === 0 ? '' : form.width.toString()
          this.$store.dispatch('updateReportField', form).then(res => {
            this.$message.success('保存成功!')
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
.form-label {
  display: block;
  height: 40px;
  margin: 5px 0;
  text-align: right;
}
</style>
