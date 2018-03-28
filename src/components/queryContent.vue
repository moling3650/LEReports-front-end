<template>
  <div id="queryContent">
    <el-button-group :style="{ float: 'right', margin: '5px 0' }">
      <el-button size="mini" type="primary" @click="openDialog">筛选字段</el-button>
      <el-button size="mini" type="primary" @click="download">导出</el-button>
    </el-button-group>
    <div class="z-table">
      <div class="table-wrap" :style="{ height: (pageSize + 2) * 36 + 'px'}">
        <el-table v-loading="loading"
          :data="tableData" border stripe size="mini"
          :header-cell-style="{backgroundColor: '#409eff', color: '#fff'}"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width: 100%"
          tooltip-effect="dark"
        >
          <el-table-column v-for="f in fields"
            v-if="f.state"
            :key="f.prop"
            :prop="f.prop"
            :label="f.label"
            :width="f.width"
            :align="f.align"
            show-overflow-tooltip
          />
        </el-table>
      </div>
      <el-pagination v-if="data.length" background layout="prev, pager, next" :total="data.length" :page-size="pageSize" :current-page.sync="index"/>
    </div>
    <fields-form ref="dialog"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { exportXlsx } from '@/lib/exportData'
import fieldsForm from '@/components/fieldsForm'

export default {
  name: 'queryContent',
  components: {
    fieldsForm
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  computed: {
    ...mapGetters({
      fields: 'fields'
    }),
    tableData () {
      return this.data.slice((this.index - 1) * this.pageSize, this.index * this.pageSize)
    }
  },
  data () {
    return {
      index: 1
    }
  },
  methods: {
    openDialog () {
      this.$refs.dialog.open()
    },
    download () {
      const data = [this.fields.map(f => f.label), ...this.data.map(row => this.fields.map(f => row[f.prop]))]
      exportXlsx(data, this.$route.query.reportCode)
    }
  }
}
</script>

<style lang="css" scoped>
#queryContent {
  margin-top: 5px;
}
</style>
