<template>
    <el-dialog title="筛选字段" :visible.sync="visible">
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="f in options" :key="f.prop" :label="f.prop">{{f.label}}</el-checkbox>
    </el-checkbox-group>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="updateFields">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'fieldsForm',
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
