/**
 * Created by echaoo on 17/10/31.
 */
import * as types from '../mutation-types'
import * as libs from '@/utils/libs.js'
import Vue from 'vue'

const state = {
  selectedSamples: [],
  chartData: {},
  selectedType: '2', //选择本品框默认选项
  chartParams: {},
  settings: {
    font_size: [10, 18],
    edge_size: [0.01, 10],
    node_size: [20, 40]
  },
  chartIdParams: {},
  relation: 0,
  isPaintHeatmap: false,
  date: libs.genDefaultRangeDate(),
  territory: '',
  scopeType: 20,
  isHeatmap: false,
  heatmapScope: [],
  allSamples: [],
  compitiveData: [],
  chartCompitiveData: [],
  loading: false,
  imageDataArray: {
    index: 0,
    data: []
  },
  filters: [
    [0, 0],
    [0, 0]
  ], // 0为线索量，1为重合量,
  isFresh: false,
  defaultFilters: {}
}

const getters = {
  selectedSamples: state => state.selectedSamples,
  chartData: state => state.chartData,
  selectedType: state => state.selectedType,
  chartParams: state => state.chartParams,
  chartIdParams: state => state.chartIdParams,
  settings: state => state.settings,
  date: state => state.date,
  territory: state => state.territory,
  scopeType: state => state.scopeType,
  isHeatmap: state => state.isHeatmap,
  heatmapScope: state => state.heatmapScope,
  allSamples: state => state.allSamples,
  compitiveData: state => state.compitiveData,
  chartCompitiveData: state => state.chartCompitiveData,
  imageDataArray: state => state.imageDataArray,
  loading: state => state.loading,
  filters: state => state.filters,
  isFresh: state => state.isFresh,
  defaultFilters: state => state.defaultFilters,
  isPaintHeatmap: state => state.isPaintHeatmap
}

const mutations = {
  [types.SET_SAMPLES](state, samples) {
    const newValue = Object.assign([], samples)
    state.selectedSamples = newValue
  },
  [types.SET_CHARTPATH](state, path) {
    state.chartData = path
  },
  [types.SET_SELECTEDTYPE](state, type) {
    state.selectedType = type
  },
  [types.SET_PARAMS](state, params) {
    Vue.set(state.chartParams, 'date', params.date)
    Vue.set(state.chartParams, 'id', params.id)
    Vue.set(state.chartParams, 'type', params.type)
    Vue.set(state.chartParams, 'relation', params.relation)
    Vue.set(state.chartParams, 'id_color', params.id_color)
    Vue.set(state.chartParams, 'maxColor', params.maxColor)
    Vue.set(state.chartParams, 'minColor', params.minColor)
    Vue.set(state.chartParams, 'min', params.min)
    Vue.set(state.chartParams, 'max', params.max)
    Vue.set(state.chartParams, 'province', params.province)
    // for (let item in params) {
    //   if (params[item]) {
    //     Vue.set(state.chartParams, item, params[item])
    //   }
    // }
  },
  [types.SET_SETTINGS](state, filter) {
    state.settings = filter
  },
  [types.SET_IDPARAMS](state, idParams) {
    state.chartIdParams = idParams
  },
  [types.SET_RELATION](state, relation) {
    state.relation = relation
  },
  [types.SET_DATE](state, date) {
    state.date = date
  },
  [types.SET_TERRITORY](state, territory) {
    state.territory = territory
  },
  [types.SET_SCOPETYPE](state, scopeType) {
    state.scopeType = scopeType
  },
  [types.SET_ISHEATMAP](state, isHeatmap) {
    state.isHeatmap = isHeatmap
  },
  [types.SET_HEATMAPSCOPE](state, heatmapScope) {
    state.heatmapScope = heatmapScope
  },
  [types.SET_ALLSAMPLES](state, allSamples) {
    state.allSamples = allSamples
  },
  [types.SET_COMPITIVEDATA](state, compitiveData) {
    state.compitiveData = compitiveData
  },
  [types.SET_CHARTCOMPITIVEDATA](state, chartCompitiveData) {
    state.chartCompitiveData = chartCompitiveData
  },
  [types.SET_LOADING](state, loading) {
    state.loading = loading
  },
  [types.SET_FILTER](state, filters) {
    state.filters = filters
  },
  [types.SET_IMAGEDATAARRAY](state, imageDataArray) {
    if (imageDataArray.data) {
      state.imageDataArray.data.push(imageDataArray.data)
    }
    if (imageDataArray.flag) {
      state.imageDataArray.index = state.imageDataArray.data.length
    } else {
      if (imageDataArray.index) {
        state.imageDataArray.index = imageDataArray.index
      }
    }
  },
  [types.CLEAR_IMAGEDATAARRAY](state) {
    state.imageDataArray.data = []
    state.imageDataArray.index = 0
  },
  [types.SET_ISFRESH](state, bool) {
    state.isFresh = bool
  },
  [types.RESET](state) {
    state.filters = [
      [0, 0],
      [0, 0]
    ]
    state.settings = {
      font_size: [10, 18],
      edge_size: [0.01, 10],
      node_size: [20, 40]
    }
  },
  [types.SET_DEFAULT_FILTER](state, filter) {
    state.defaultFilters = filter
  },
  [types.IS_PAINT_HEATMAP](state, bool) {
    state.isPaintHeatmap = bool
  }
}

export default {
  state,
  getters,
  mutations
}
