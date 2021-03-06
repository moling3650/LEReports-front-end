import X from 'xlsx'

/* see Browser download file example in docs */
function _s2ab (s) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF
  }
  return buf
}

function _toBlob (data) {
  const ws = X.utils.aoa_to_sheet(data)
  const wb = X.utils.book_new()
  X.utils.book_append_sheet(wb, ws, 'mysheet')
  const wbout = X.write(wb, {type: 'binary', bookType: 'xlsx'})
  return new Blob([_s2ab(wbout)], {type: 'application/octet-stream'})
}

function exportXlsx (data, filename) {
  const a = document.createElement('a')
  const blobObj = _toBlob(data)
  a.download = `${filename}.xlsx` // 下载名称
  a.href = URL.createObjectURL(blobObj) // 创建对象超链接绑定a标签
  a.click() // 模拟点击实现下载
  setTimeout(_ => URL.revokeObjectURL(blobObj), 100) // 延时释放, 用URL.revokeObjectURL()来释放这个object URL
}

export {
  exportXlsx
}
