<template>
  <div id="chartProp">
    <el-dialog title="编辑图表" :visible.sync="visible" :close-on-click-modal="false">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="类别" :label-width="formLabelWidth" prop="catgory">
          <el-select v-model="form.catgory" placeholder="请选择类别">
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
        <el-button type="primary" @click="updateChart">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'c',
  data () {
    return {
      visible: false,
      formLabelWidth: '100px',
      form: {},
      rules: {
        catgory: [
          { required: true, message: '请选择图表类别', trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请选择图表数据', trigger: 'blur' }
        ]
      }
    }
  },
  computed: mapGetters({
    fieldOptions: 'fieldOptions'
  }),
  methods: {
    open (catgory, values) {
      this.$refs.form && this.$refs.form.resetFields()
      this.form = {
        catgory: catgory,
        value: [...values]
      }
      this.visible = true
    },
    updateChart () {
      this.$emit('update', JSON.parse(JSON.stringify(this.form)))
      this.visible = false
    }
  }
}
</script>

<style lang="css" scoped>
</style>
