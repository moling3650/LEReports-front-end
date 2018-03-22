<template>
  <div id="reportBuilder">
    <report-editor></report-editor>
  </div>
</template>

<script>
import reportEditor from '@/components/reportEditor'
export default {
  name: 'reportBuilder',
  components: {
    reportEditor
  },
  created () {
    window.document.title = '报表编辑器'
  }
}
</script>

<style lang="css" scoped>
</style>
