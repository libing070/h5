/**
 * Created by echaoo on 17/10/31.
 */

import * as types from "../../mutation-types.js";
import getters from "./getters.js";
import actions from "./actions.js";
import moment from "moment";

let defaultYearArr = [String(new Date().getFullYear() - 2), String(new Date().getFullYear() - 1), String(new Date().getFullYear())];

const contrast = {
  state: {
    chartTheme: ["#336699", "#2f4554", "#61a0a8", "#d48265", "#91c7ae", "#749f83", "#ca8622", "#bda29a", "#6e7074", "#c23531", "#546570", "#22c3aa", "#CC6600", "#CCCC00", "#009999", "#336666"],
    isClearAll: false,
    flag: true,
    renderflag: true,
    expandStatus: false,
    popStatus: false,
    loadingStatus: false,
    xAxis: "date",
    yAxis: "",
    chartType: "",
    chartData: {
      x: [],
      series: []
    },
    params: {
      carType: "2",
      carArr: [],
      carIDArr: [],
      dateType: "year",
      dateCal: "separate",
      dateArr: [],
      area1: "",
      pArr: [],
      cArr: [],
      levelArr: [],
      assemblyType: [],
      assemblyTypeNames: [],
      dimension: [],
      priceRange: [],
      year: moment().format("YYYY"),
      caryear: defaultYearArr,
      displayType: "separate",
      areasingle: "",
      sence: "",
      monthsingle: moment()
        .subtract(1, "months")
        .format("YYYY-MM"),
      terminal: ["app"]
    },
    queryParamBkp: {},
    mixedData: [],
    habitData: [],
    zfzbData: [],
    koubeiData: {},
    heatmapData: [],
    heatmapOpts: {
      radius: 8,
      maxOpacity: 0.7,
      gradient: {
        "0.2": "#e803eb",
        "0.4": "#207cca",
        "0.6": "#31ff00",
        "0.8": "#f8ff00",
        "1": "#ff0500"
      }
    }
  },
  mutations: {
    [types.CLOSE_HALF](state, flag) {
      state.flag = flag;
    },
    [types.EXPAND_SETTING](state, status) {
      state.expandStatus = status;
    },
    [types.SET_POP_STATUS](state, status) {
      state.popStatus = status;
    },
    [types.SET_LOADING_ICON](state, status) {
      state.loadingStatus = status;
    },
    [types.CHANGE_X_AXIS](state, xAxis) {
      state.xAxis = xAxis;
    },
    [types.SET_DATA_TYPE](state, yAxis) {
      state.yAxis = yAxis;
    },
    [types.CHANGE_CHARTTYPE](state, chartType) {
      state.chartType = chartType;
    },
    [types.COMPARE_TYPE](state, type) {
      state.params.carType = type;
    },
    [types.SET_COMPARE_CAR_ARR](state, obj) {
      if (obj.commit_type === "fromLeft") {
        state.params.carArr.push(obj.payload);
      } else {
        state.params.carArr = [...obj.payload];
      }
    },
    [types.SET_COMPARE_CAR_ID_ARR](state, obj) {
      if (obj.commit_type === "fromLeft") {
        state.params.carIDArr.push(String(obj.payload));
      } else {
        state.params.carIDArr = [...obj.payload];
      }
    },
    [types.HANDLE_DATE_TYPE](state, type) {
      state.params.dateType = type;
    },
    [types.HANDLE_DATE_CAL](state, type) {
      state.params.dateCal = type;
    },
    [types.HANDLE_DATE_SEL](state, arr) {
      state.params.dateArr = [...arr];
    },
    [types.CHANGE_AREA1](state, Sel) {
      state.params.area1 = Sel;
    },
    [types.CHANGE_AREA_P](state, arr) {
      state.params.pArr = [...arr];
    },
    [types.CHANGE_AREA_C](state, arr) {
      state.params.cArr = [...arr];
    },
    [types.HANDLE_DEVICE_CHANGE](state, arr) {
      state.params.assemblyType = [...arr];
    },
    [types.HANDLE_DEVICE_NAMES_CHANGE](state, arr) {
      state.params.assemblyTypeNames = [...arr];
    },
    [types.SET_CAR_CHOSEN_TYPE](state, str) {
      state.params.displayType = str;
    },
    [types.HANDLE_DIMENSION_CHANGE](state, arr) {
      state.params.dimension = [...arr];
    },
    [types.HANDLE_DIMENSION_YEAR_CHANGE](state, str) {
      state.params.year = str;
    },
    [types.SET_CARYEAR](state, val) {
      state.params.caryear = val;
    },
    [types.SET_PRICE_RANGE](state, val) {
      state.params.priceRange = val;
    },
    [types.SET_LEVEL_ARR](state, arr) {
      state.params.levelArr = [...arr];
    },
    [types.SET_AREA_SINGLE](state, val) {
      state.params.areasingle = val;
    },
    [types.SET_SENCE](state, val) {
      state.params.sence = val;
    },
    [types.SET_DATE_SINGLE](state, val) {
      state.params.monthsingle = val;
    },
    [types.HANDLE_END_CHANGE](state, arr) {
      state.params.terminal = arr;
    },
    [types.CHANGE_RENDERFLAG](state) {
      state.renderflag = !state.renderflag;
      state.chartData = {
        x: [],
        series: []
      };
      state.mixedData = [];
      state.habitData = [];
      state.heatmapData = [];
      state.koubeiData = [];
      state.zfzbData = [];
    },
    [types.SET_MIXED_DATA](state, arr) {
      let _arr = JSON.parse(JSON.stringify(arr));
      _arr.reverse().forEach(obj => {
        obj.children.reverse().forEach(objj => {
          objj.children.reverse();
        });
      });
      state.mixedData = _arr;
      state.renderflag = !state.renderflag;
    },
    [types.SET_HABIT_DATA](state, arr) {
      arr.sort((a, b) => {
        return a.app_ratio - b.app_ratio;
      });
      state.habitData = JSON.parse(JSON.stringify(arr));
      state.renderflag = !state.renderflag;
    },
    [types.SET_ZFZB_DATA](state, arr) {
      let _data = JSON.parse(JSON.stringify(arr));;
      if(_data.length===0) return false;
      let temp = []
      state.params.terminal.forEach((t, i) => {
        temp[i] = []
        _data.forEach(obj => {
          if (obj.zhongduan === t) {
            temp[i].push(obj)
          }
        })
      })
      state.zfzbData = temp;
      state.renderflag = !state.renderflag;
    },
    [types.SET_KOUBEI_DATA](state, data) {
      state.koubeiData = data;
      state.renderflag = !state.renderflag;
    },
    [types.SET_HEATMAP_DATA](state, arr) {
      state.heatmapData = JSON.parse(JSON.stringify(arr));
      state.renderflag = !state.renderflag;
    },
    [types.SET_HEATMAP_OPTS](state, data) {
      state.heatmapOpts = Object.assign({}, data);
    },
    [types.SET_CHART_DATA](state, data) {
      if (state.chartType === "scatter") {
        if (data === "nodata") {
          state.chartData = {};
        } else {
          data.sort((a, b) => {
            return b.rcr - a.rcr;
          });
          // 以下x和series字段是占位符，兼容折线图和柱状图用的，没有实际意义
          let obj_custom = {
            scatter_data: data,
            x: ["a"],
            series: [{
              data: [1],
              name: "a"
            }]
          };
          state.chartData = obj_custom;
          state.renderflag = !state.renderflag;
        }
      } else {
        if (data === "nodata" || !data.series) {
          state.chartData = {};
        } else {
          if (state.xAxis === "date" && state.params.dateCal === "add") {
            data.series.forEach((arr, i) => {
              arr.data.splice(0, 1);
            });
          } else {
            // 加工图表数据【吐血】
            // 最开始循环最外层数组
            // 然后设置空数组
            // 然后循环x数组，拿到每一个str
            // 在最里面循环data里的数组，和外层循环中的str做比较
            // 相同的话就讲值复制给newArr
            data.series.forEach((arr, i) => {
              let newArr = [];
              data.x.forEach((str, iii) => {
                arr.data.forEach((_arr, ii) => {
                  if (str === _arr[0]) newArr.push(_arr[1]);
                });
              });
              data.series[i].data = [...newArr];
            });
          }
          if (state.xAxis === "date" && state.params.dateType === "custom" && state.params.dateCal === "add") {
            let _arr = data.x[0].split("、");
            let _len = _arr.length;
            let _str = _arr[0] + " ~ " + _arr[_len - 1];
            data.x = [_str];
          } else if (state.xAxis !== "date" && state.params.dateType === "custom" && state.params.dateCal === "add") {
            let _arr = data.series[0].name.split("、");
            let _len = _arr.length;
            let _str = _arr[0] + " ~ " + _arr[_len - 1];
            data.series[0].name = _str;
          }
          state.chartData = data;
        }

        state.renderflag = !state.renderflag;
      }
    },
    [types.CLEAR_ALL](state) {
      state.isClearAll = !state.isClearAll;
      state.chartData = {};
    },
    [types.RESET_CONTRAST](state) {
      state.isClearAll = false;
      state.flag = true;
      state.renderflag = true;
      state.expandStatus = false;
      state.popStatus = false;
      state.loadingStatus = false;
      state.xAxis = "car";
      state.yAxis = "";
      state.chartType = "";
      state.chartData = {};
      state.params.carType = "0";
      state.params.carArr = [];
      state.params.carIDArr = [];
      state.params.dateType = "year";
      state.params.dateCal = "separate";
      state.params.dateArr = [];
      state.params.area1 = "";
      state.params.pArr = [];
      state.params.assemblyType = "1";
    },
    // 缓存请求参数对象
    [types.CACHE_QUERY_PARAM_OBJ](state, queryObj) {
      state.queryParamBkp = queryObj;
    }
  },
  actions: actions,
  getters: getters
};

export default contrast;
