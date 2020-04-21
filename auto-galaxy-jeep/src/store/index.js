/**
 * Created by echaoo on 17/10/31.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import parse from './modules/parse'
import contrast from './modules/contrast/index.js'
import common from './modules/common'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    parse,
    contrast,
    common
  },
  strict: debug
})
