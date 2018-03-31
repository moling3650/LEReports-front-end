<template>
  <div id="chartContent">
    <el-row :gutter="20">
      <el-col :span="charts.length > 1 ? 12 : 24" class="chart-wrap" v-for="c in charts" :key="c.title">
        <components :is="c.type" :title="c.title" :data="data" :label="c.label" :value="c.value"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import zBar from '@/components/Chart/zBar'
import zLine from '@/components/Chart/zLine'
import zPie from '@/components/Chart/zPie'

export default {
  name: 'chartContent',
  components: {
    zBar,
    zLine,
    zPie
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  computed: mapGetters([
    'charts'
  ])
}
</script>

<style lang="css" scoped>
#chartContent {
  margin-top: 5px;
}

.chart-wrap {
  height: 300px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
