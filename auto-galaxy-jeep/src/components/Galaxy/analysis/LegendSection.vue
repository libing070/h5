<template>
  <div>
    <div v-for="(item,index) in chartTypeArr" class="img-wrap" :key="index" :style="{width:dynamicWidth + '%'}">
      <img :class="[chosenChart === item.type ? 'active' : '', 'thumbnail']" :data-able="item.isabled" :src="item.srcObj" @click="searchByThisChart(item)" />
      <span>{{item.typeName}}</span>
    </div>
  </div>
</template>
<script>
import * as types from "@/store/mutation-types.js";
export default {
  name: "legendSection",
  data() {
    return {
      chosenChart: ""
    };
  },
  computed: {
    chartTypeArr() {
      let y = this.yType;
      let isChinese = this.$i18n.locale === "ch";
      return [
        {
          type: "line",
          typeName: isChinese ? "折线图" : "Polygonal Chart",
          isabled: /attention|leads|leads_chonghe|profile/.test(y),
          srcObj: require("@/assets/img/line.jpg")
        },
        {
          type: "bar",
          typeName: isChinese ? "条形图" : "Bar Chart",
          isabled: /^attention|leads|leads_chonghe|assembly|profile|purpose$/.test(
            y
          ),
          srcObj: require("@/assets/img/bar.jpg")
        },
        {
          type: "radar",
          typeName: isChinese ? "雷达图" : "Radar Chart",
          isabled: /attention|leads|leads_chonghe|assembly|profile/.test(y),
          srcObj: require("@/assets/img/radar.jpg")
        },
        {
          type: "scatter",
          typeName: isChinese ? "散点图" : "Scatter Plot",
          isabled: /rcr|zfzb/.test(y),
          srcObj: require("@/assets/img/scatter.jpg")
        },
        {
          type: "funnel",
          typeName: isChinese ? "漏斗图" : "Funnel",
          isabled: /funnel/.test(y),
          srcObj: require("@/assets/img/funnel.jpg")
        },
        {
          type: "linebar",
          typeName: isChinese ? "复合图" : "Compound",
          isabled: y === "habit",
          srcObj: require("@/assets/img/habit.jpg")
        },
        {
          type: "heatmap",
          typeName: isChinese ? "热力图" : "Thermogram",
          isabled: /heatmap/.test(y),
          srcObj: require("@/assets/img/heatmap.jpg")
        },
        {
          type: "wordcloud",
          typeName: isChinese ? "标签云" : "Wordcloud",
          isabled: y === "koubei",
          srcObj: require("@/assets/img/wordcloud.jpg")
        }
        // {
        //   type: "sunburst",
        //   typeName: "旭日图",
        //   isabled: false,
        //   srcObj: require("@/assets/img/sunburst.jpg")
        // }
      ];
    },
    dynamicWidth() {
      let status = this.$store.state.contrast.expandStatus;
      if (status) {
        return 50;
      } else {
        return 25;
      }
    },
    isClearAll() {
      return this.$store.state.contrast.isClearAll;
    },
    isAssembly() {
      if (/assembly/.test(this.$store.state.contrast.yAxis)) {
        return true;
      } else {
        return false;
      }
    },
    isProfile() {
      if (/profile/.test(this.$store.state.contrast.yAxis)) {
        return true;
      } else {
        return false;
      }
    },
    yType() {
      return this.$store.state.contrast.yAxis;
    }
  },
  methods: {
    searchByThisChart(item) {
      if (item.isabled) {
        // let checkRes = this.checkParams()
        if (true) {
          this.chosenChart = item.type;
          this.$store.commit(types.CHANGE_CHARTTYPE, item.type);

          // 如果是装配率及线索率，单独请求散点图的专有接口
          if (this.yType === "rcr") {
            this.$store.dispatch("search_sca");

            // 如果是口碑
          } else if (this.yType === "koubei") {
            this.$store.dispatch("search_koubei");

            // 如果是装配率
          } else if (this.yType === "assembly") {
            this.$store.dispatch("search_assembly_self");

            // 如果是画像分析
          } else if (this.yType === "profile") {
            this.$store.dispatch("search_profile_self");

            // 如果是APP安装偏好
          } else if (this.yType === "preference") {
            this.$store.dispatch("search_preference_self");

            // 如果是触媒习惯
          } else if (this.yType === "habit") {
            this.$store.dispatch("search_habit");

            // 如果是用户分布热力图
          } else if (this.yType === "heatmap") {
            this.$store.dispatch("search_heatmap");

            // 如果是经销商分布热力图
          } else if (this.yType === "heatmap_dealer") {
            this.$store.dispatch("search_heatmap_dealer");

            // 如果是购车目的
          } else if (this.yType === "purpose") {
            this.$store.dispatch("search_purpose");

            // 如果是正反占比 竞争格局
          } else if (this.yType === "zfzb") {
            this.$store.dispatch("search_zfzb");

            // 如果是营销漏斗
          } else if (this.yType === "funnel") {
            this.$store.dispatch("search_funnel");

            // 请求关注量、线索量、线索重合热度接口
          } else {
            this.$store.dispatch("search");
          }
        }
      } else {
        // 国际化
        if (this.$i18n.locale === "ch") {
          return this.$message("敬请期待");
        } else {
          return this.$message("Comming Soon");
        }
        // this.$message("敬请期待");
      }
    },

    // X轴Y轴参数验证
    checkParams() {
      let xAxis = this.$store.state.contrast.xAxis;
      let carArr = this.$store.state.contrast.params.carArr;
      let dateArr = this.$store.state.contrast.params.dateArr;
      let areaArr = this.$store.getters.areaArr;
      let deviceTypeArr = this.$store.state.contrast.params.assemblyType;
      let yAxis = this.$store.state.contrast.yAxis;
      let strMap = {
        car: carArr,
        date: dateArr,
        area: areaArr
      };
      // 查询前条件验证
      if (yAxis === "") {
        this.$message.warning("请选择一个分析指标");
        return false;
      } else if (carArr.length === 0) {
        this.$message.warning("请至少选择一个竞品");
        return false;
      } else if (!this.isAssembly && !this.isProfile && dateArr.length === 0) {
        this.$message.warning("请选择时间");
        return false;
      } else if (!this.isAssembly && !this.isProfile && areaArr.length === 0) {
        this.$message.warning("请选择地域");
        return false;
      } else if (this.isAssembly && deviceTypeArr.length === 0) {
        this.$message.warning("请选择配置分析");
        return false;
      } else if (
        carArr.length > 1 &&
        dateArr.length > 1 &&
        areaArr.length > 1
      ) {
        this.$message({
          type: "warning",
          showClose: true,
          customClass: "longer-message",
          dangerouslyUseHTMLString: true,
          message: "X轴的三个选择项目不能同时多选，请修改X轴的选择项目"
        });
        return false;
      } else if (strMap[xAxis].length === 1) {
        let _arr = ["car", "date", "area"];
        let others = _arr.filter((item, index) => {
          return item !== xAxis;
        });

        let res = others.every((item, i) => {
          return strMap[item].length > 1;
        });
        if (res) {
          this.$message({
            type: "warning",
            showClose: true,
            customClass: "longer-message",
            dangerouslyUseHTMLString: true,
            message: "X轴的参数单选，其余项目不能同时多选"
          });
          return false;
        } else if (yAxis === "") {
          this.$message.warning("请选择一个分析指标");
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
  },
  watch: {
    isClearAll() {
      this.chosenChart = "";
      this.$store.commit(types.CHANGE_CHARTTYPE, "");
    },
    yType() {
      this.chosenChart = "";
    }
  }
};
</script>
<style scoped lang="less">
.img-wrap {
  display: inline-block;
  width: 25%;
  text-align: center;
  margin-bottom: 5px;
  span {
    font-size: 10px;
  }
}
.thumbnail {
  display: block;
  width: 100%;
  border: 2px solid #fff;
  box-sizing: border-box;
  filter: grayscale(100%);
  &:hover {
    cursor: not-allowed;
  }
}
.thumbnail[data-able] {
  filter: none;
}
.thumbnail[data-able]:hover {
  cursor: pointer;
  border: 2px solid #f9bd00;
  filter: none;
}
.thumbnail.active {
  cursor: pointer;
  border: 2px solid #f9bd00;
  filter: none;
}
</style>
