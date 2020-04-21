/**
 * Created by echaoo on 17/11/25.
 */
import * as types from '../mutation-types.js'

const common = {
  state: {
    isMaskOpen: false,
    chartClickData: {},
    isLoginGlobal: localStorage.GalaxyToken ? true : false,
    userPhone: localStorage.UserPhone || '',
    // lang: 'ch'
  },
  getters: {
    chartClickData: state => state.chartClickData
  },
  mutations: {
    [types.CHANGE_MASK_STATE](state, newValue) {
      newValue === undefined ? state.isMaskOpen = !state.isMaskOpen : state.isMaskOpen = newValue
    },
    [types.SET_CHART_CLICK_DATA](state, newValue) {
      state.chartClickData = newValue
    },
    [types.CHANGE_GLOBAL_STATE](state, newValue) {
      state.isLoginGlobal = newValue
    },
    [types.SET_USER_PHONE](state, newValue) {
      state.userPhone = newValue
    },
    // [types.SET_LANG](state, newValue) {
    //   state.lang = newValue
    // }
  }
}

export default common
