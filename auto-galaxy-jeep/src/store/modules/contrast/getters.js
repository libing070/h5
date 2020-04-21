import i18n from '../../../lang/index'
let getters = {
  // xName: state => {
  //   switch (state.xAxis) {
  //     case "car":
  //       return "竞品";
  //     case "date":
  //       return "时间";
  //     case "area":
  //       return "地域";
  //     default:
  //       return "时间";
  //   }
  // },
  yName: state => {
    switch (state.yAxis) {
      case "attention":
        return "关注量";
        break;
      case "leads":
        return "线索量";
        break;
      case "leads_chonghe":
        return "线索重合量";
        break;
      case "rcr":
        return i18n.t('m.right.yLabels[0]');
        break;
      case "assembly":
        return i18n.t('m.right.yLabels[1]');
        break;
      case "profile":
        return i18n.t('m.right.yLabels[2]');
        break;
      case "purpose":
        return i18n.t('m.right.yLabels[3]');
        break;
      case "koubei":
        return i18n.t('m.right.yLabels[4]');
        break;
      default:
        return "关注量";
        break;
    }
  },
  dateTypeName: state => {
    switch (state.params.dateType) {
      case "year":
        return "年";
        break;
      case "month":
        return "月";
        break;
      case "quarter":
        return "季度";
        break;
      case "custom":
        return "";
        break;
    }
  },
  isHasData: state => {
    if (state.yAxis === "preference") {
      if (state.mixedData.length === 0) {
        return false;
      } else {
        return true;
      }
    } else if (state.yAxis === "habit") {
      if (state.habitData.length === 0) {
        return false;
      } else {
        return true;
      }
    } else if (state.yAxis === "koubei") {
      if (state.koubeiData.length === 0) {
        return false;
      } else {
        return true;
      }
    } else if (state.yAxis === "zfzb") {
      if (state.zfzbData.length === 0) {
        return false;
      } else {
        return true;
      }
    } else if (["heatmap", "heatmap_dealer"].includes(state.yAxis)) {
      if (state.heatmapData.length === 0) {
        return false;
      } else {
        return true;
      }
    } else {
      let data = state.chartData;
      let length = Object.keys(data).length;
      if (length > 0) {
        let _flag = false;
        data.series.forEach((obj, i) => {
          obj.data.forEach((num, ii) => {
            if (num !== 0) {
              _flag = true;
            }
          });
        });
        return _flag;
      } else {
        return false;
      }
    }
  },
  areaAll: state => {
    if (state.params.area1 === "all") {
      return true;
    } else {
      return false;
    }
  },
  areaArr: state => {
    if (state.params.area1 === "all") {
      return [i18n.t('m.right.title6')]; // 全国
    } else if (state.params.area1 === "province") {
      return state.params.pArr;
    } else if (state.params.area1 === "city") {
      return state.params.cArr;
    } else {
      return [];
    }
  },
  carTypeOutput: state => {
    switch (state.params.carType) {
      case "0":
        return "brand";
      case "1":
        return "make";
      case "2":
        return "model";
      case "3":
        return "style";
      case "4":
        return "level";
      case "5":
        return "country";
      default:
        return "brand";
    }
  },
  senceName: state => {
    switch (state.params.sence) {
      case 1:
        return "工作";
        break;
      case 2:
        return "居住";
        break;
      case 3:
        return "周末休闲消费";
        break;
    }
  }
};

export default getters;
