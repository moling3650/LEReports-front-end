import axios from 'axios'

function fetchQueryControls () {
  return axios.get('/API/Handler.ashx?method=GetQueryControls').then(res => res.data)
}

function fetchRecords (params) {
  return axios.post('/API/Handler.ashx?method=GetRecords', params).then(res => res.data)
}

function fetchChartsByReport (reportCode) {
  return axios.post('/API/Handler.ashx?method=GetChartsByReport', { reportCode }).then(res => res.data)
}

function fetchChartTypes () {
  return axios.post('/API/Handler.ashx?method=GetChartTypes').then(res => res.data)
}

function saveChart (chart) {
  return axios.post('/API/Handler.ashx?method=SaveChart', chart)
}

function deleteChartById (id) {
  return axios.post('/API/Handler.ashx?method=DeleteChartById', { id })
}

export {
  fetchQueryControls,
  fetchRecords,
  fetchChartTypes,
  fetchChartsByReport,
  saveChart,
  deleteChartById
}
