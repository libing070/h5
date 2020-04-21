<!-- 超级白氏图表 -->
<!-- 目前适合折线图和柱状图和雷达图 -->
<template>
  <!-- 包裹层设置初始高度，宽度不管 -->
  <div id="myChartWrap">
    <!-- 右上角的说明文字 -->
    <h4 class="tip" v-if="isHeatmapDealer&&(popStatus||status)">截止上月最新数据</h4>
    <!-- 右下角的调控框 -->
    <div :class="[isClose?'ball':'','mapLegend']" v-show="whoami&&isHeatmap&&(popStatus||status)">
      <div class="close-btn" @click="toggleMe">
        <i :class="[isClose?'el-icon-plus openMe':'el-icon-arrow-down']"></i>
      </div>
      <el-row class="dealer_num" v-if="isHeatmapDealer">
        <el-col :span="12">经销商数量</el-col>
        <el-col :span="12">{{$store.state.contrast.heatmapData.length}}</el-col>
      </el-row>
      <map-legend></map-legend>
    </div>

    <!-- 下面是要展示的图表 -->
    <!-- 热力图的标题 -->
    <h4 class="heatmap-title" v-if="(isHeatmapDealer || isHeatmap)&&(popStatus||status)">{{heatmapTitle}}</h4>
    <!-- echarts图表或者是热力图要渲染的地方 -->
    <div :id="chartId" @click="onClick"></div>

    <!-- 隐藏表单，下载文件时使用 -->
    <form method="POST" :action="downloadUrl" class="hiddenForm" ref="hiddenForm">
      <input type="text" name="dsl" :value="JSON.stringify(downloadParams)" />
    </form>

    <!-- 隐藏表单，下载文件时使用 -->
    <form method="POST" :action="`v2/getWCData?lang=${lang}`" class="hiddenForm" ref="hiddenFormWC">
      <input type="text" name="dsl" :value="wcParam" />
    </form>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入折线图组件
require("echarts/lib/chart/line");
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入雷达图
require("echarts/lib/chart/radar");
// 引入散点图
require("echarts/lib/chart/scatter");
// 引入提示框和图例和工具盒组件
require("echarts/lib/component/title");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/toolbox");
require("echarts/lib/component/legend");
require("echarts/lib/component/markLine");
require("echarts/lib/component/legendScroll");
require("echarts/lib/component/axisPointer");
require("echarts/lib/component/dataZoom");
require("echarts/lib/component/graphic");

require("echarts-wordcloud");

import * as types from "@/store/mutation-types.js";
import commonMixin from "./common.js";
import linebarMixin from "./linebar.js";
import scatterMixin from "./scatter.js";
import radarMixin from "./radar.js";
import assemblyMixin from "./assembly.js";
import mixedMixin from "./mixed.js";
import habitMixin from "./habit.js";
import MapLegend from "./MapLegend";
import wordcloudMixin from "./wordcloud.js";
import bubbleMixin from "./bubble.js";
export default {
  name: "SuperChart",
  mixins: [
    commonMixin,
    linebarMixin,
    scatterMixin,
    radarMixin,
    assemblyMixin,
    mixedMixin,
    habitMixin,
    wordcloudMixin,
    bubbleMixin
  ],
  props: ["whoami", "number", "koubeiData"],
  data() {
    return {
      lang: localStorage.lang,
      data: {
        x: (() => {
          if (this.$store.state.contrast.chartData.x) {
            return [...this.$store.state.contrast.chartData.x];
          } else {
            return [];
          }
        })(),
        series: (() => {
          if (this.$store.state.contrast.chartData.series) {
            return [...this.$store.state.contrast.chartData.series];
          } else {
            return [];
          }
        })()
      },
      heatmapObj: {},
      chartId: "id" + new Date().getTime(),
      levelIndex: this.$store.state.contrast.mixedData.length - 1,
      levelIndex2: (() => {
        if (this.$store.state.contrast.mixedData.length > 0) {
          return (
            this.$store.state.contrast.mixedData[
              this.$store.state.contrast.mixedData.length - 1
            ].children.length - 1
          );
        } else {
          return 0;
        }
      })(),
      isClose: false,
      wcInfo: {
        id: "",
        flag: ""
      }
    };
  },
  components: {
    MapLegend
  },
  mounted() {
    // 设置图表的初始大小
    this.setSize();
    this.resizeChart();
    this.renderSuperChart();
    if (["heatmap", "heatmap_dealer"].includes(this.yType)) {
      this.renderHeatmap();
    }
  },
  beforeDestroy() {
    // 组件被销毁后解除监听事件
    window.onresize = null;
  },
  computed: {
    mixedData() {
      return this.$store.state.contrast.mixedData;
    },
    habitData() {
      return this.$store.state.contrast.habitData;
    },
    renderflag() {
      return this.$store.state.contrast.renderflag;
    },
    heatmapOpts() {
      return this.$store.state.contrast.heatmapOpts;
    },
    status() {
      return this.$store.state.contrast.expandStatus;
    },
    isHeatmap() {
      return /heatmap/.test(this.$store.state.contrast.yAxis);
    },
    popStatus() {
      return this.$store.state.contrast.popStatus;
    },
    isShowXLabel() {
      if (this.popStatus || this.status) {
        return true;
      } else {
        return false;
      }
    },
    chartType() {
      return this.$store.state.contrast.chartType;
    },
    boundaryGap() {
      if (this.$store.state.contrast.chartType === "line") {
        return false;
      } else {
        return true;
      }
    },
    carStr() {
      let p = this.$store.state.contrast.params;
      return p.carArr.join("，");
    },
    dateStr() {
      let c = this.$store.state.contrast;
      if (c.yAxis === "profile") {
        return c.params.year;
      } else {
        if (c.params.dateType === "custom") {
          return c.params.dateArr.join(" ~ ");
        } else if (c.params.dateType === "month") {
          let _arr = c.params.dateArr;
          return _arr[0] + " ~ " + _arr[_arr.length - 1];
        } else {
          return c.params.dateArr.join(", ");
        }
      }
    },
    areaStr() {
      return this.$store.getters.areaArr.join("，");
    },
    dateTypeStr() {
      return this.$store.getters.dateTypeName;
    },
    yStr() {
      return this.$store.getters.yName;
    },
    yType() {
      return this.$store.state.contrast.yAxis;
    },
    deviceTypeName() {
      return this.$store.state.contrast.params.assemblyTypeNames.join("，");
    },
    scatterData() {
      return this.$store.state.contrast.chartData.scatter_data;
    },
    zfzbData() {
      return this.$store.state.contrast.zfzbData;
    },
    XYmax() {
      let z = this.$store.state.contrast.zfzbData;
      let temp = [];
      let temp2 = [];
      z.forEach(arr => {
        let _arr = arr.map(obj => Math.ceil(parseFloat(obj.zhengxiangchonghe)));
        let _arr2 = arr.map(obj => Math.ceil(parseFloat(obj.nixiangchonghe)));
        temp.push(Math.max(..._arr));
        temp2.push(Math.max(..._arr2));
      });
      let _Xmax = Math.max(...temp);
      let _Ymax = Math.max(...temp2);
      let _XYmax = Math.max(_Xmax, _Ymax) + 1;
      return [_Xmax, _Ymax, _XYmax];
    },
    downloadUrl() {
      // 装车率
      if (this.yType === "rcr") {
        return `v2/assembly/download?lang=${this.lang}`;
        // 装配率自己
      } else if (this.yType === "assembly") {
        return `v2/assemblyRate/download?lang=${this.lang}`;
        // 画像分析
      } else if (this.yType === "profile") {
        return `v2/userProfile/download?lang=${this.lang}`;
        // 兴趣偏好
      } else if (this.yType === "preference") {
        return `v2/downpreference?lang=${this.lang}`;
        // 触媒习惯
      } else if (this.yType === "preference") {
        return `v2/downpreference?lang=${this.lang}`;
        // 购车目的
      } else if (this.yType === "purpose") {
        return `v2/downBuyCarGoal?lang=${this.lang}`;
        // 最开始的三项
      } else {
        return `/v2/downAnalysis?lang=${this.lang}`;
      }
    },
    downloadParams() {
      let bkp = this.$store.state.contrast.queryParamBkp;
      if (this.yType === "rcr") {
        bkp.carName = this.$store.state.contrast.params.carArr.join("_");
        bkp.assemblyName = this.$store.state.contrast.params.assemblyTypeNames.join(
          "_"
        );
        return bkp;
      } else {
        return bkp;
      }
    },
    // 车款年代标题
    caryearName() {
      let _arr = this.$store.state.contrast.params.caryear;
      let length = _arr.length;
      if (length === 0) {
        return "";
      } else {
        return _arr.join("、");
      }
    },
    // 价格区间标题
    priceRangeName() {
      let _arr = this.$store.state.contrast.params.priceRange;
      let length = _arr.length;
      if (length === 0) {
        return "";
      } else {
        let _arr2 = _arr.map((arr, i) => {
          if (arr.length === 1) {
            return arr[0] + "万以上";
          } else {
            return arr.join("-") + "万";
          }
        });
        return "在" + _arr2.join("、") + "价格区间";
      }
    },
    // 价格区间标题（英文版）
    priceRangeNameEn() {
      let _arr = this.$store.state.contrast.params.priceRange;
      let length = _arr.length;
      if (length === 0) {
        return "";
      } else {
        let _arr2 = _arr.map((arr, i) => {
          if (arr.length === 1) {
            return `>=${arr[0]}0K`;
          } else {
            return `${arr[0]}0-${arr[1]}0K`;
          }
        });
        return _arr2.join("、");
      }
    },
    // 地域标题
    areaName() {
      let _type = this.$store.state.contrast.params.area1;
      if (_type === "all") {
        return localStorage.lang === "ch" ? "全国" : " the whole country ";
      } else if (_type === "province") {
        let _ps = this.$store.state.contrast.params.pArr;
        return _ps.join("、");
      } else if (_type === "city") {
        let _cs = this.$store.state.contrast.params.cArr;
        return _cs.join("、");
      } else if (_type === "level") {
        let _ls = this.$store.state.contrast.params.levelArr;
        return _ls.join("、");
      } else {
        return localStorage.lang === "ch" ? "全国" : " the whole country ";
      }
    },
    isHeatmapDealer() {
      return /heatmap_dealer/.test(this.$store.state.contrast.yAxis);
    },
    heatmapTitle() {
      let _s = this.$store.state;
      let _p = _s.contrast.params.areasingle;
      if (this.isHeatmapDealer) {
        let prefix = "";
        if (_s.contrast.params.carIDArr[0] == "0") {
          let _type = _s.contrast.params.carType === "0" ? "品牌" : "厂商";
          prefix = `全部${_type}在${_p}的`;
        } else {
          prefix = `${_s.contrast.params.carArr[0]}在${_p}的`;
        }
        return `${prefix}经销商分布热力图`;
      } else {
        let _c = _s.contrast.params.carArr.join("、");
        let _sence = this.$store.getters.senceName;
        let _datearr = _s.contrast.params.dateArr;
        let _d = "";
        if (_datearr.length === 1) {
          _d = _datearr[0];
        } else {
          _d = _datearr[0] + "至" + _datearr[_datearr.length - 1];
        }
        let prefix = `${_c} ${_d}在${_p}的用户的${_sence}`;
        return `${prefix}分布热力图`;
      }
    },
    wcParam() {
      return JSON.stringify(this.wcInfo);
    }
  },
  methods: {
    // 图表单击事件
    onClick() {
      if (!this.status) {
        this.$store.commit(types.SET_POP_STATUS, true);
      }
    },

    // 设置图表大小
    setSize() {
      let chart = document.getElementById(this.chartId);
      if (!this.popStatus) {
        if (this.status) {
          // 全屏图表
          chart.style.width = (window.innerWidth * 56) / 100 + "px";
          chart.style.height = (window.innerHeight * 70) / 100 + "px";
        } else {
          // 右下角的小型缩略图
          chart.style.width = window.innerWidth / 4 - 20 + "px";
          chart.style.height = window.innerHeight / 2.6 + "px";
        }
      } else {
        // 弹框中的图表
        chart.style.width = (window.innerWidth * 86) / 100 + "px";
        chart.style.height = (window.innerHeight * 84) / 100 + "px";
      }
      if (this.chartType === "wordcloud") {
        chart.style.width = chart.style.width.split("px")[0] / 2 + "px";
      }
    },

    resizeChart() {
      //监听窗口宽度变化，注意要使用箭头函数
      window.onresize = () => {
        this.setSize();
        this.myChart.resize();
      };
    },

    // 下载EXCEL数据
    downloadData() {
      // this.$axios
      //   .post("v2/getDownInfo", {
      //     phone: parseInt(localStorage.UserPhone),
      //     path: this.downloadUrl
      //   })
      //   .then(res => {
      //     console.log(res);
      //   });
      this.$refs.hiddenForm.submit();
    },

    // 下载词云数据
    downloadWCData(id, flag) {
      // this.$axios
      //   .post("v2/getWCData", {
      //     id: id,
      //     flag: flag
      //   })
      //   .then(res => {
      //     console.log(res);
      //   });
      this.wcInfo.id = id;
      this.wcInfo.flag = flag;
      // 坑
      this.$nextTick(() => {
        this.$refs.hiddenFormWC.submit();
      });
    },

    // 渲染图表
    renderSuperChart() {
      let opts = {
        textStyle: { fontFamily: "calibri" },
        color: this.$store.state.contrast.chartTheme,
        grid: this.generateGrid(),
        title: this.generateTitle(),
        tooltip: this.generateTooltip(),
        toolbox: this.generateToolbox(),
        legend: this.generateLegend()
      };

      // 如果是折线和柱状图
      if (this.chartType === "line" || this.chartType === "bar") {
        // 先删除没用的
        delete opts.radar;
        if (opts.toolbox) {
          opts.toolbox.feature.magicType = {
            type: ["tiled", "stack"],
            title: {
              stack: this.$i18n.t("m.chart.btns[2]"),
              tiled: this.$i18n.t("m.chart.btns[3]")
            }
          };
          opts.toolbox.feature.dataZoom = {
            title: {
              zoom: this.$i18n.t("m.chart.btns[0]"),
              back: this.$i18n.t("m.chart.btns[1]")
            }
          };
        }
        opts.xAxis = {
          type: "category",
          boundaryGap: this.boundaryGap,
          data: this.data.x.length === 0 ? [] : this.data.x,
          axisLabel: {
            show: this.isShowXLabel ? true : false,
            showMinLabel: true,
            rotate: this.data.x.length > 8 ? 30 : 0,
            interval: this.data.x.length > 31 ? 1 : 0
          }
        };
        opts.yAxis = {
          type: "value",
          name: "%"
          // 折线和柱状图的Y轴说明都改成百分号了
          // name: this.yStr
        };

        // 单独针对装配率柱状图
        if (
          (this.yType === "assembly" || this.yType === "profile") &&
          (this.status || this.popStatus)
        ) {
          opts.dataZoom = [
            {
              type: "slider",
              show: true,
              showDataShadow: false,
              xAxisIndex: [0],
              bottom: "7%",
              start: 0,
              end: this.yType === "profile" ? 100 : 25
            }
          ];
          opts.xAxis = {
            type: "category",
            boundaryGap: this.boundaryGap,
            data: this.data.x.length === 0 ? [] : this.data.x,
            axisLabel: {
              show: this.isShowXLabel ? true : false,
              interval: 0,
              rotate: 30
            }
          };
          if (this.yType === "assembly") {
            opts.yAxis = {
              type: "value",
              name: "%"
            };
          } else if (this.yType === "profile") {
            opts.yAxis = {
              type: "value",
              name: "%"
            };
          }
          opts.grid.bottom = this.status || this.popStatus ? "16%" : "0%";
          opts.tooltip = this.generateAssemblyTooltip();
          opts.series = this.generateAssemblySeries();
        } else {
          opts.series = this.generateLBSeries();
        }

        // 如果是雷达图
      } else if (this.chartType === "radar") {
        // 先删除没用的
        delete opts.xAxis;
        delete opts.yAxis;
        if (opts.toolbox) {
          delete opts.toolbox.feature.magicType;
          delete opts.toolbox.feature.dataZoom;
        }
        opts.radar = {
          indicator: this.generateIndicator(),
          radius: "70%",
          name: {
            fontSize: 12,
            color: "#333"
          },
          center:
            this.status || this.popStatus ? ["50%", "53%"] : ["50%", "50%"]
        };
        opts.series = [
          {
            type: "radar",
            label: {
              normal: {
                show: true,
                fontSize: 10
              }
            },
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default",
                  opacity: 0.4
                }
              }
            },
            data: this.generateRadarSeries()
          }
        ];
        // 单独针对装配率雷达图
        if (this.yType === "assembly" && (this.status || this.popStatus)) {
          opts.graphic = [
            {
              type: "image",
              id: "logo",
              right: "16%",
              top: "34%",
              bounding: "raw",
              style: {
                image: require("../../assets/img/shan.png"),
                height: 150
              }
            }
          ];
        }

        // 如果是散点图（装车率）
      } else if (this.chartType === "scatter" && this.yType === "rcr") {
        delete opts.radar;
        if (opts.toolbox) {
          opts.toolbox.feature.dataZoom = {
            title: {
              zoom: this.$i18n.t("m.chart.btns[0]"),
              back: this.$i18n.t("m.chart.btns[1]")
            }
          };
          delete opts.toolbox.feature.magicType;
        }
        opts.xAxis = this.generateScatterXAxis();
        opts.yAxis = this.generateScatterYAxis();
        opts.legend = this.generateScatterLegend();
        opts.series = this.generateScatterSeries();
        opts.grid = this.generateScatterGrid();

        // 鼠标滚轮缩放图表配置
        opts.dataZoom = [
          {
            type: "inside",
            xAxisIndex: [0]
          },
          {
            type: "inside",
            yAxisIndex: [0]
          }
        ];
        // 如果是气泡图（正反占比）
      } else if (this.chartType === "scatter" && this.yType === "zfzb") {
        delete opts.radar;
        if (opts.toolbox) {
          opts.toolbox.feature.dataZoom = {
            title: {
              zoom: this.$i18n.t("m.chart.btns[0]"),
              back: this.$i18n.t("m.chart.btns[1]")
            }
          };
          delete opts.toolbox.feature.magicType;
        }
        opts.title = this.generateBubbleTitle();
        opts.xAxis = this.generateBubbleXAxis();
        opts.yAxis = this.generateBubbleYAxis();
        opts.legend = this.generateBubbleLegend();
        opts.series = this.generateBubbleSeries();
        opts.grid = this.generateBubbleGrid();

        // 鼠标滚轮缩放图表配置
        opts.dataZoom = [
          {
            type: "inside",
            xAxisIndex: [0]
          },
          {
            type: "inside",
            yAxisIndex: [0]
          }
        ];
        // 如果是级联图
      } else if (this.chartType === "mixed") {
        opts.title = this.genMixedTitle();
        opts.grid = this.genMixedGrid();
        opts.tooltip = this.genMixedTooltip();
        opts.yAxis = this.genMixedY();
        opts.xAxis = this.genMixedX();
        opts.series = this.genMixedSeries();

        // 如果是复合图
      } else if (this.chartType === "linebar") {
        opts.title = this.genHabitTitle();
        opts.grid = this.genHabitGrid();
        opts.legend = this.genHabitLegend();
        opts.yAxis = this.genHabitY();
        opts.xAxis = this.genHabitX();
        opts.series = this.genHabitSeries();
        opts.dataZoom = this.genHabitDataZoom();
      } else if (this.chartType === "wordcloud") {
        // 标签云
        if (this.number === 2) {
          // opts = {};
          (opts.title = this.generateKoubeiTitleN()),
            (opts.toolbox = this.generateWordCloudToolboxN());
          opts.series = this.generateWordCloudN();
          opts.color = ["#C00000"];
        } else {
          // opts = {};
          (opts.title = this.generateKoubeiTitleP()),
            (opts.toolbox = this.generateWordCloudToolboxP());
          opts.series = this.generateWordCloudP();
          opts.color = ["green"];
        }
      }

      // 这里才是真正的渲染图表
      this.myChart = echarts.init(document.getElementById(this.chartId));
      this.myChart.setOption(opts);

      // 如果是兴趣偏好，就在图表上绑定单击事件
      if (this.yType === "preference") {
        this.myChart.on("click", params => {
          // 如果点击一级分类
          if (params.seriesIndex === 0) {
            this.levelIndex = params.dataIndex;
            this.levelIndex2 =
              this.mixedData[this.levelIndex].children.length - 1;
            opts.yAxis = this.genMixedY();
            opts.xAxis = this.genMixedX();
            opts.series = this.genMixedSeries();
            this.myChart.setOption(opts);
            // 如果点击二级分类
          } else if (params.seriesIndex === 1) {
            this.levelIndex2 = params.dataIndex;
            opts.yAxis = this.genMixedY();
            opts.xAxis = this.genMixedX();
            opts.series = this.genMixedSeries();
            this.myChart.setOption(opts);
            // 如果点击三级APP
          } else if (params.seriesIndex === 2) {
            return false;
          }
        });
      }
    },

    // 渲染热力图
    renderHeatmap() {
      // 拿到store里面的数据
      let _data = this.$store.state.contrast.heatmapData;
      let _province = this.$store.state.contrast.params.areasingle;
      // 创建地图实例
      var map = new BMap.Map(this.chartId);

      // 初始化地图，设置中心点坐标和地图级别
      if (_province === "全国") {
        map.centerAndZoom("西安市", 5);
      } else {
        map.centerAndZoom(_province);
      }

      // 地图加载完成以后【必须这样写】
      map.addEventListener("onload", () => {
        // 允许滚轮缩放
        map.enableScrollWheelZoom();

        var bdary = new BMap.Boundary();
        //获取行政区域
        bdary.get(_province, function(rs) {
          //清除地图覆盖物
          // map.clearOverlays();
          //行政区域的点有多个
          var count = rs.boundaries.length;
          for (var i = 0; i < count; i++) {
            var ply = new BMap.Polygon(rs.boundaries[i], {
              strokeWeight: 2,
              strokeColor: "#ff0000",
              fillColor: "rgba(255,255,255,0)"
            });
            //建立多边形覆盖物
            map.addOverlay(ply);
            // map.setViewport(ply.getPath()); //调整视野
          }
        });
        // =================热力图设置开始=================
        // 相关文档：http://api.map.baidu.com/library/Heatmap/2.0/docs/symbols/BMapLib.HeatmapOverlay.html
        this.heatmapObj = new BMapLib.HeatmapOverlay(this.heatmapOpts);
        map.addOverlay(this.heatmapObj);
        this.heatmapObj.setDataSet({
          data: _data
        });
        // =================热力图设置结束=================

        // 根据缩放比例，动态改变热力球的半径大小
        // map.addEventListener("zoomend", e => {
        //   map.clearOverlays();
        //   /* this.heatmapOpts.radius = map.getZoom() * 1; */
        //   this.heatmapObj = new BMapLib.HeatmapOverlay(this.heatmapOpts);
        //   map.addOverlay(this.heatmapObj);
        //   this.heatmapObj.setDataSet({
        //     data: _data
        //     // max: 100
        //   });
        // });

        // =================文字提示设置开始=================
        // var opts = {
        //   position: point, // 指定文本标注所在的地理位置
        //   offset: new BMap.Size(-100, -240) //设置文本偏移量
        // };
        // var label = new BMap.Label("关注量/线索量热力图", opts);
        // // 创建文本标注对象
        // label.setStyle({
        //   color: "#333",
        //   fontSize: "18px",
        //   height: "20px",
        //   lineHeight: "20px",
        //   fontFamily: "微软雅黑",
        //   border: "none"
        // });
        // map.addOverlay(label);
        // =================文字提示设置结束=================
      });
    },
    changeMapOpts() {
      this.heatmapObj.setOptions(this.heatmapOpts);
    },
    toggleMe() {
      this.isClose = !this.isClose;
    }
  },
  watch: {
    // 只监控一个布尔值的变化即可
    renderflag(val, oldVal) {
  
      // 每次监控到图例的单击事件，就销毁当前的图表，然后再生成新图表
      if (["heatmap", "heatmap_dealer"].includes(this.yType)) {
        this.myChart.dispose();
        this.setSize();
        this.resizeChart();
        this.renderHeatmap();
      } else {
        this.myChart.dispose();
        this.data.x = [...this.$store.state.contrast.chartData.x];
        this.data.series = [...this.$store.state.contrast.chartData.series];
        this.setSize();
        this.resizeChart();
        this.renderSuperChart();
      }
    },
    heatmapOpts: {
      handler(n, o) {
        this.changeMapOpts();
      },
      deep: true
    }
  }
};
</script>
<style lang="less">
#myChartWrap {
  width: 100%;
  height: 100%;
  position: relative;

  canvas {
    &:hover {
      cursor: pointer;
    }
  }

  .hiddenForm {
    display: none;
  }

  .mapLegend {
    position: absolute;
    bottom: 0px;
    padding: 0 20px;
    right: 0px;
    width: 16%;
    z-index: 1;
    background: #fff;
    transition: all 0.5s;
  }
  .ball {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    bottom: 20px;
    right: 20px;
    background: #f9bd00;
    padding: 0;
    overflow: hidden;
  }
}

.close-btn {
  text-align: center;
  &:hover {
    cursor: pointer;
  }
}
.openMe {
  color: #fff;
  font-size: 22px;
  padding-top: 8px;
  font-weight: bold;
}

.anchorBL {
  display: none;
}

.BMap_cpyCtrl {
  display: none;
}

h4.tip {
  background: rgba(255, 255, 255, 0.6);
  color: #ea0f0f;
  font-size: 12px;
  position: absolute;
  top: 30px;
  right: 0;
  z-index: 1;
  margin: 0;
  padding: 8px 10px;
  line-height: 12px;
}
.dealer_num {
  font-size: 12px;
  padding-bottom: 5px;
  border-bottom: 1px solid #ddd;
}
.dealer_num div:nth-child(2) {
  text-align: right;
}
.heatmap-title {
  text-align: center;
  margin: 0;
  font-size: 16px;
  margin-top: -15px;
  margin-bottom: 7px;
  letter-spacing: 1px;
}

// 处理版权标志
// .BMap_cpyCtrl span span {
//   margin-left: -54em;
//   color: transparent;
//   background: transparent !important;
// }
// .BMap_cpyCtrl ::after {
//   content: "关注量/线索量热力图";
//   background: #fff;
//   font-size: 20px;
// }
</style>
