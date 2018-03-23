import { fetchReports, deleteReport, validReport, saveReport } from '@/apis/reports'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  reports: state => state.all,
  reportOptions: state => state.all.map(item => ({ label: item.report_name, value: item.report_code })),
  getReportByCode: state => code => code && state.all.find(item => item.report_code === code)
}

// actions
const actions = {
  getAllReports ({ commit }) {
    return fetchReports().then(reports => commit('setReports', reports))
  },
  deleteReport ({ commit }, reportCode) {
    return deleteReport(reportCode).then(() => commit('removeReport', reportCode))
  },
  validReport ({ commit }, reportCode) {
    return validReport(reportCode)
  },
  saveReport ({ commit }, report) {
    return saveReport(report).then(() => commit('updateReport', report))
  }
}

// mutations
const mutations = {
  setReports (state, reports) {
    state.all = reports
  },
  removeReport (state, reportCode) {
    const index = state.all.findIndex(item => item.report_code === reportCode)
    ~index && state.all.splice(index, 1)
  },
  updateReport (state, report) {
    const index = state.all.findIndex(item => item.report_code === report.report_code)
    if (~index) {
      state.all.splice(index, 1, report)
    } else {
      state.all.push(report)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
