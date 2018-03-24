<template>
  <div id="reportBuilder">
    <report-editor></report-editor>
    <report-content></report-content>
  </div>
</template>

<script>
import reportEditor from '@/components/reportEditor'
import reportContent from '@/components/reportContent'
export default {
  name: 'reportBuilder',
  components: {
    reportEditor,
    reportContent
  },
  created () {
    window.document.title = '报表编辑器'
  }
}
</script>

<style lang="css" scoped>
</style>
