import * as types from "../../mutation-types.js";
import axios from "axios";
// import '@/mock/assemblyData.js'
// import "@/mock/chartData.js";
import "@/mock/heatmap.js";
import i18n from '@/lang'
// import "@/mock/koubeiData.js";

let actions = {
  // 关注量、线索量、线索重合热度
  search({
    commit,
    state,
    getters
  }) {
    // 打开loading图标
    commit(types.SET_LOADING_ICON, true);

    let carArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();

    let queryParams = {
      xAxis: state.xAxis,
      yAxis: state.yAxis,
      chartType: state.chartType,
      xParams: {
        carType: getters.carTypeOutput,
        carArr: carArr,
        carIDArr: state.params.carIDArr,
        dateType: state.params.dateType,
        dateCal: state.params.dateCal,
        dateArr: state.params.dateArr,
        areaAll: getters.areaAll,
        province: getters.areaAll ? [] : state.params.pArr,
        city: getters.areaAll ? [] : state.params.cArr
      }
    };

    commit(types.CACHE_QUERY_PARAM_OBJ, queryParams);

    // 请求图表数据
    axios({
        url: "v2/analysis",
        method: "post",
        data: queryParams
      })
      .then(res => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        // 给图表变量灌数据
        commit(types.SET_CHART_DATA, res.data.data);
      })
      .catch(error => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        commit(types.SET_CHART_DATA, "nodata");
        console.log(error);
      });
  },

  // 装车率
  search_sca({
    commit,
    state,
    getters
  }) {
    // 打开loading图标
    commit(types.SET_LOADING_ICON, true);

    let carArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carIDArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();

    // let caryearL = state.params.caryear.length
    // let cary = [...state.params.caryear]
    // if (caryearL === 3) {
    //   cary = []
    // }

    let queryParams = {
      carType: getters.carTypeOutput,
      carArr: carArr,
      assemblyType: state.params.assemblyType,
      caryear: state.params.caryear,
      areaType: state.params.area1,
      province: state.params.pArr,
      city: state.params.cArr,
      level: state.params.levelArr,
      priceRange: state.params.priceRange
    };

    // 缓存请求对象
    commit(types.CACHE_QUERY_PARAM_OBJ, queryParams);

    // 请求散点图数据，接口信息：
    // 品牌brand 厂商make 车型model 车款style 级别level 国别country
    // 车为id：["123","456"]；级别/国别为名称：["SUV"]
    // 1操控；2安全；3舒适；4科技
    axios({
        url: "v2/assembly",
        method: "post",
        data: queryParams
      })
      .then(res => {
        console.log(res);
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        if (res.data.data.length) {
          commit(types.SET_CHART_DATA, res.data.data);
        } else {
          commit(types.SET_CHART_DATA, "nodata");
        }
      })
      .catch(error => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        commit(types.SET_CHART_DATA, "nodata");
        console.log(error);
      });
  },

  // 装配率
  search_assembly_self({
    commit,
    state,
    getters
  }) {
    // 打开loading图标
    commit(types.SET_LOADING_ICON, true);

    let carIdArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carIDArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();
    let carNameArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();

    // let caryearL = state.params.caryear.length
    // let cary = [...state.params.caryear]
    // if (caryearL === 3) {
    //   cary = []
    // }

    let queryParams = {
      carType: getters.carTypeOutput,
      carIdArr: carIdArr,
      carNameArr: carNameArr,
      assemblyType: state.params.assemblyType,
      caryear: state.params.caryear,
      priceRange: state.params.priceRange
    };

    // 缓存请求对象
    commit(types.CACHE_QUERY_PARAM_OBJ, queryParams);

    axios({
        url: "v2/assemblyRate",
        method: "post",
        data: queryParams
      })
      .then(res => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        // 给图表变量灌数据
        commit(types.SET_CHART_DATA, res.data.data);
      })
      .catch(error => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        commit(types.SET_CHART_DATA, "nodata");
        console.log(error);
      });
  },

  // 画像分析
  search_profile_self({
    commit,
    state,
    getters
  }) {
    // 打开loading图标
    commit(types.SET_LOADING_ICON, true);

    let carIdArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carIDArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();
    let carNameArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();

    let queryParams = {
      displayType: state.params.displayType,
      carType: getters.carTypeOutput,
      carIdArr: carIdArr,
      carNameArr: carNameArr,
      dimensions: state.params.dimension,
      date: state.params.year
    };

    // 缓存请求对象
    commit(types.CACHE_QUERY_PARAM_OBJ, queryParams);

    axios({
        url: "v2/userProfile",
        method: "post",
        data: queryParams
      })
      .then(res => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        // 给图表变量灌数据
        if (i18n.locale === 'ch') {
          let origin = res.data.data;
          origin.x = origin.series[0].data.map(_arr => {
            return _arr[0]
          })
          commit(types.SET_CHART_DATA, origin);
          // 如果是英文，就把省份单词过滤掉
        } else {
          let origin = res.data.data;
          origin.x = origin.series[0].data.map(_arr => {
            return _arr[0]
          })
          origin.x = origin.x.map(str => {
            if (/Province$/.test(str)) {
              let place = str.lastIndexOf("Province")
              return str.substring(0, place)
            } else if (/Autonomous Region$/.test(str)) {
              let place = str.lastIndexOf("Autonomous")
              return str.substring(0, place)
            } else {
              return str
            }
          })
          origin.series.forEach(obj => {
            obj.data = obj.data.map(arr => {
              if (/Province$/.test(arr[0])) {
                let place = arr[0].lastIndexOf("Province")
                return [arr[0].substring(0, place), arr[1]]
              } else if (/Autonomous Region$/.test(arr[0])) {
                let place = arr[0].lastIndexOf("Autonomous")
                return [arr[0].substring(0, place), arr[1]]
              } else {
                return arr
              }
            })
          })
          commit(types.SET_CHART_DATA, origin);
        }

      })
      .catch(error => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        commit(types.SET_CHART_DATA, "nodata");
        console.log(error);
      });
  },

  // APP安装偏好
  search_preference_self({
    commit,
    state,
    getters
  }) {
    // 打开loading图标
    commit(types.SET_LOADING_ICON, true);

    let carIdArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carIDArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();
    let carNameArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();

    let queryParams = {
      carType: getters.carTypeOutput,
      carIdArr: carIdArr,
      carNameArr: carNameArr[0],
      province: state.params.areasingle,
      date: state.params.monthsingle
    };

    // 缓存请求对象
    commit(types.CACHE_QUERY_PARAM_OBJ, queryParams);

    axios({
        url: "v2/preference",
        method: "post",
        data: queryParams
      })
      .then(res => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        // 给图表变量灌数据
        commit(types.SET_MIXED_DATA, res.data.data);
      })
      .catch(error => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        commit(types.SET_CHART_DATA, "nodata");
        console.log(error);
      });
  },

  // 触媒习惯
  search_habit({
    commit,
    state,
    getters
  }) {
    // 打开loading图标
    commit(types.SET_LOADING_ICON, true);

    let carIdArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carIDArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();
    let carNameArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();

    let queryParams = {
      carType: getters.carTypeOutput,
      carIdArr: carIdArr,
      carNameArr: carNameArr[0],
      province: state.params.areasingle,
      date: state.params.monthsingle
    };

    // 缓存请求对象
    commit(types.CACHE_QUERY_PARAM_OBJ, queryParams);

    axios({
        url: "v2/habit",
        method: "post",
        data: queryParams
      })
      .then(res => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        // 给图表变量灌数据
        commit(types.SET_HABIT_DATA, res.data.data);
      })
      .catch(error => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        commit(types.SET_CHART_DATA, "nodata");
        console.log(error);
      });
  },

  // 用户分布热力图
  search_heatmap({
    commit,
    state,
    getters
  }) {
    // 打开loading图标
    commit(types.SET_LOADING_ICON, true);

    let carIdArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carIDArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();
    let carNameArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();

    let queryParams = {
      carType: getters.carTypeOutput,
      carIdArr: carIdArr,
      date: state.params.dateArr,
      dataType: state.params.sence
    };

    // 缓存请求对象
    commit(types.CACHE_QUERY_PARAM_OBJ, queryParams);

    axios({
        url: "v2/gis",
        method: "post",
        data: queryParams
      })
      .then(res => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        // 给图表变量灌数据
        commit(types.SET_HEATMAP_DATA, res.data.data);
      })
      .catch(error => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        commit(types.SET_CHART_DATA, "nodata");
        console.log(error);
      });
  },
  // 经销商分布热力图
  search_heatmap_dealer({
    commit,
    state,
    getters
  }) {
    // 打开loading图标
    commit(types.SET_LOADING_ICON, true);

    let queryParams = {
      carType: getters.carTypeOutput
    };
    if (state.params.carIDArr[0] === "0") {
      queryParams.carId = [];
      queryParams.displayType = "entire";
    } else {
      queryParams.carId = state.params.carIDArr;
      queryParams.displayType = "";
    }

    // 缓存请求对象
    commit(types.CACHE_QUERY_PARAM_OBJ, queryParams);

    axios({
        url: "v2/dealergis",
        method: "post",
        data: queryParams
      })
      .then(res => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        // 给图表变量灌数据
        commit(types.SET_HEATMAP_DATA, res.data.data);
      })
      .catch(error => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        commit(types.SET_CHART_DATA, "nodata");
        console.log(error);
      });
  },
  // 购车目的柱状图
  search_purpose({
    commit,
    state,
    getters
  }) {
    // 打开loading图标
    commit(types.SET_LOADING_ICON, true);

    let carIdArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carIDArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();
    let carNameArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();

    let queryParams = {
      carIdArr: carIdArr,
      carNameArr: carNameArr,
      // year: state.params.caryear
    };

    // 缓存请求对象
    commit(types.CACHE_QUERY_PARAM_OBJ, queryParams);

    axios({
        url: "/v2/buyCarGoal",
        method: "post",
        data: queryParams
      })
      .then(res => {
        console.log(res);
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        // 给图表变量灌数据
        commit(types.SET_CHART_DATA, res.data.data);
      })
      .catch(error => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        commit(types.SET_CHART_DATA, "nodata");
        console.log(error);
      });
  },
  // 口碑
  search_koubei({
    commit,
    state,
    getters
  }) {
    // 打开loading图标
    commit(types.SET_LOADING_ICON, true);

    let carIdArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carIDArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();
    let carNameArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();

    let queryParams = {
      carIdArr: carIdArr,
      carNameArr: carNameArr
    };

    // 缓存请求对象
    commit(types.CACHE_QUERY_PARAM_OBJ, queryParams);

    axios({
        url: "/v2/koubei",
        method: "post",
        data: queryParams
      })
      .then(res => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        // 给图表变量灌数据
        commit(types.SET_KOUBEI_DATA, res.data.data);
      })
      .catch(error => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        commit(types.SET_CHART_DATA, "nodata");
        console.log(error);
      });
  },

  // 正反占比
  search_zfzb({
    commit,
    state,
    getters
  }) {
    // 打开loading图标
    commit(types.SET_LOADING_ICON, true);

    let carIdArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carIDArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();
    let carNameArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();

    let queryParams = {
      carId: carIdArr[0],
      date: state.params.monthsingle,
      terminal: state.params.terminal
    };

    // 缓存请求对象
    commit(types.CACHE_QUERY_PARAM_OBJ, queryParams);

    axios({
        url: "v2/zfzb",
        method: "post",
        data: queryParams
      })
      .then(res => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        // 给图表变量灌数据
        commit(types.SET_ZFZB_DATA, res.data.data);
      })
      .catch(error => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        commit(types.SET_CHART_DATA, "nodata");
        console.log(error);
      });
  },

  // 营销漏斗
  search_funnel({
    commit,
    state,
    getters
  }) {
    // 打开loading图标
    commit(types.SET_LOADING_ICON, true);

    let carIdArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carIDArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();
    let carNameArr = (() => {
      if (getters.carTypeOutput != "level") {
        return state.params.carArr;
      } else {
        //  如果选择的是级别，就将轿车的轿字去掉，因为库里面的名称不带轿字
        return state.params.carArr.map((str, i) => {
          return str.replace(/轿/, "");
        });
      }
    })();

    let queryParams = {
      carId: carIdArr,
      date: state.params.monthsingle
    };

    // 缓存请求对象
    commit(types.CACHE_QUERY_PARAM_OBJ, queryParams);

    axios({
        url: "v2/funnel",
        method: "post",
        data: queryParams
      })
      .then(res => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        // 给图表变量灌数据
        commit(types.SET_HABIT_DATA, res.data.data);
      })
      .catch(error => {
        // 关闭loading图标
        commit(types.SET_LOADING_ICON, false);
        commit(types.SET_CHART_DATA, "nodata");
        console.log(error);
      });
  },
};

export default actions;
