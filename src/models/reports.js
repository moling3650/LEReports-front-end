import axios from 'axios'

function fetchReports () {
  return axios.get('/API/Handler.ashx?method=GetReports').then(res => res.data)
}

function deleteReport (reportCode) {
  return axios.post('/API/Handler.ashx?method=DeleteReport', { reportCode }).then(res => res.data)
}

function validReport (reportCode) {
  return axios.post('/API/Handler.ashx?method=ValidReport', { reportCode }).then(res => res.data.unshift())
}

export {
  fetchReports,
  deleteReport,
  validReport
}
