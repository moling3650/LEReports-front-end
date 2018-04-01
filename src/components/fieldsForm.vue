<template>
  <div id="reportFieldForm">
    <el-dialog title="筛选字段" :visible.sync="visible" :close-on-click-modal="false">
      <el-checkbox-group v-model="checkList">
        <el-row :gutter="20">
          <el-col :span="8" v-for="f in options" :key="f.prop">
            <el-checkbox :label="f.prop">{{f.label}}</el-checkbox>
          </el-col>
        </el-row>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="updateFields">确 定</el-button>
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
      checkList: []
    }
  },
  computed: mapGetters({
    options: 'fieldsData',
    fields: 'fields'
  }),
  methods: {
    open () {
      this.checkList = this.fields.map(f => f.prop)
      this.visible = true
    },
    _getState (prop) {
      return this.checkList.find(value => value === prop) ? 1 : 0
    },
    updateFields () {
      const checkedFields = this.options.map(item => Object.assign({}, item, {state: this._getState(item.prop)}))
      this.$store.commit('setFieldsData', checkedFields)
      this.visible = false
    }
  }
}
</script>

<style lang="css" scoped>
</style>
