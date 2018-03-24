import axios from 'axios'

function fetchReports () {
  return axios.get('/API/Handler.ashx?method=GetReports').then(res => res.data)
}

function deleteReport (reportCode) {
  return axios.post('/API/Handler.ashx?method=DeleteReport', { reportCode }).then(res => res.data)
}

function validReport (reportCode) {
  return axios.post('/API/Handler.ashx?method=ValidReport', { reportCode }).then(res => res.data.shift())
}

function saveReport (report) {
  return axios.post('/API/Handler.ashx?method=SaveReport', report).then(res => res.data)
}

function fetchReportFields (reportCode) {
  return axios.post('/API/Handler.ashx?method=GetReportFields', { reportCode }).then(res => res.data)
}

export {
  fetchReports,
  deleteReport,
  validReport,
  saveReport,
  fetchReportFields
}
