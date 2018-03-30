import {
  fetchQueryControls,
  fetchChartsByReport,
  saveChart,
  fetchChartTypes,
  deleteChartById
} from '@/apis'

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
  charts: [],
  chartTypes: [],
  loadingFields: false
}

// getters
const getters = {
  reports: state => state.all,
  reportOptions: state => state.all.map(item => ({ label: item.report_name, value: item.report_code })),
  chartOptions: state => state.charts.map(item => ({ label: item.title, value: item.id })),
  fieldOptions: state => state.fieldsData.map(item => ({ label: item.label, value: item.prop })),
  chartTypeOptions: state => state.chartTypes.map(item => ({ label: item.name, value: item.type })),
  getReportByCode: state => code => code && state.all.find(item => item.report_code === code),
  getChartByID: state => id => id && state.charts.find(c => c.id === id),
  queryControlOptions: state => state.queryControls,
  fieldsData: state => state.fieldsData,
  loadingFields: state => state.loadingFields,
  formItems: state => state.fieldsData.filter(item => item.is_check).map(item => {
    return {
      type: item.control_code,
      required: item.required,
      span: item.control_span,
      prop: item.prop,
      label: item.label
    }
  }),
  fields: state => state.fieldsData.filter(item => item.state).map(item => {
    return {
      prop: item.prop,
      label: item.label,
      width: item.width,
      align: item.align,
      state: item.state,
      idx: item.idx
    }
  })
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
  },
  getChartsByReport ({ commit }, reportCode) {
    return fetchChartsByReport(reportCode).then(data => commit('setCharts', data))
  },
  getChartTypes ({ commit }) {
    return fetchChartTypes().then(data => commit('setChartTypes', data))
  },
  saveChart ({ commit }, chart) {
    return saveChart(chart).then(() => commit('updateCharts', chart))
  },
  deleteChart ({ commit }, id) {
    return deleteChartById(id).then(() => commit('removeChartById', id))
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
  },
  setCharts (state, charts) {
    state.charts = charts
  },
  setChartTypes (state, chartTypes) {
    state.chartTypes = chartTypes
  },
  updateCharts (state, chart) {
    if (chart.id > 0) {
      const index = state.charts.findIndex(c => c.id === chart.id)
      ~index && state.charts.splice(index, 1, chart)
    } else {
      state.charts.push(chart)
    }
  },
  removeChartById (state, id) {
    const index = state.charts.findIndex(c => c.id === id)
    ~index && state.charts.splice(index, 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
