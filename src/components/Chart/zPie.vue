<template>
  <div class="z-pie">
    <el-button class="edit-btn" size="mini" @click="open">编辑</el-button>
    <div :style="{ width, height }" ref="chart"></div>
    <chart-prop ref="dialog" @update="update"/>
  </div>
</template>

<script>
import chartProp from '@/components/Dialog/chartProp'

const echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/pie')
// 引入提示框和标题组件
require('echarts/lib/component/title')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')

export default {
  name: 'zPie',
  components: {
    chartProp
  },
  props: {
    title: {
      type: String,
      default: '饼图'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    data: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      chart: null,
      catgory: '',
      values: []
    }
  },
  watch: {
    'data': 'refresh',
    'catgory': 'refresh',
    'values': 'refresh'
  },
  methods: {
    refresh () {
      if (!this.data.length) {
        return
      }

      this.chart.setOption({
        title: {
          text: this.title
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {},
        series: [{
          name: this.catgory,
          type: 'pie',
          center: ['50%', '60%'],
          label: {
            normal: {
              // position: 'inner',
              formatter: '{d}%',
              textStyle: {
                // color: '#fff',
                fontWeight: 'bold',
                fontSize: 14
              }
            }
          },
          data: this.data.map(item => ({
            name: item[this.catgory],
            value: item[this.values[0]]
          }))
        }]
      }, true)
    },
    open () {
      this.$refs.dialog.open(this.catgory, this.values)
    },
    update ({ catgory, value: values }) {
      this.catgory = catgory
      this.values = values
    }
  },
  mounted () {
    this.catgory = this.label
    this.values = this.value.split(',')
    this.chart = echarts.init(this.$refs.chart)
    this.refresh()
  }
}
</script>

<style lang="css" scoped>
.z-pie {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #ebeef5;
  border-radius: 5px;
}
.edit-btn {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
}
</style>
