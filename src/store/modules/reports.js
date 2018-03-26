import { fetchQueryControls } from '@/apis'
import {
  fetchReports,
  deleteReport,
  validReport,
  saveReport,
  fetchReportFields,
  updateReportField
} from '@/apis/reports'

// initial state
const state = {
  all: [],
  fieldsData: [],
  queryControls: [],
  loadingFields: false
}

// getters
const getters = {
  reports: state => state.all,
  reportOptions: state => state.all.map(item => ({ label: item.report_name, value: item.report_code })),
  getReportByCode: state => code => code && state.all.find(item => item.report_code === code),
  queryControlOptions: state => state.queryControls,
  fieldsData: state => state.fieldsData,
  loadingFields: state => state.loadingFields
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
  },
  getFieldsData  ({ commit }, reportCode) {
    commit('setLoadingFields', true)
    return fetchReportFields(reportCode)
      .then(data => commit('setFieldsData', data))
      .then(() => commit('setLoadingFields', false))
  },
  getQueryControls ({ commit }) {
    return fetchQueryControls().then(controls => commit('setQueryControls', controls))
  },
  updateReportField ({ commit }, field) {
    return updateReportField(field).then(() => commit('updateFieldsData', field))
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
  },
  setFieldsData (state, fieldsData) {
    state.fieldsData = fieldsData
  },
  setQueryControls (state, queryControls) {
    state.queryControls = queryControls
  },
  setLoadingFields (state, isLoading) {
    state.loadingFields = isLoading
  },
  updateFieldsData (state, field) {
    const index = state.fieldsData.findIndex(f => f.prop === field.prop)
    ~index && state.fieldsData.splice(index, 1, field)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
