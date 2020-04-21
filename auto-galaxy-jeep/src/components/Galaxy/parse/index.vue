<template>
  <div class="container">
    <div class="parse-title-box">
      <p class="show-box">
        <span class="select-btn" @click="changeSearch">
          <span>{{$t('m.left.btn1')}}</span>
          <!-- <i class="el-icon-search search" :class="{'search-active': isSearch}"></i> -->
        </span>
        <span class="selected-panel">
          <span class="selected-tags" :class="{'is-pull-down': isPullDown, 'is-border': !isPullDown}">
            <span class="select-title" v-if="!isPullDown">
              <span style="float: left;">{{$t('m.left.info')}}：</span>
              <span class="clear" @click="refresh">{{$t('m.left.btn4')}}</span>
            </span>
            <span v-for="(data, index) in selectedData" class="selected-item">
              <span>{{ data.label }}</span>
              <img src="../../../assets/parse/delete.png" class="tag-delete" @click="handleDelete(index)" />
            </span>
            <img src="../../../assets/parse/refresh.png" alt class="refresh" @click="refresh" v-if="isPullDown" />
            <i class="fa fa-caret-down pulldown" aria-hidden="true" v-if="isPullDown" @click="changeShowState"></i>
            <i class="fa fa-caret-up pullup" aria-hidden="true" v-if="!isPullDown" @click="changeShowState"></i>
          </span>
        </span>
        <button v-on:click="parseEvent" class="parse" v-loading="loadingParse" element-loading-spinner="el-icon-loading">{{$t('m.left.btn2')}}</button>
      </p>
      <selected-box class="select" v-if="isSearch" v-on:change-data="changeSelect"></selected-box>
      <div class="filter-box">
        <filter-box :selfData="selfData" :compitiveData="compitiveData" :echart-path="getEchartPath" :isShowSelectPanel="isShowSelectPanel" v-on:change-bcg="changeBcg" v-on:paint-chart="paintHistoryChart" @getCompet="getCompetition"></filter-box>
        <span class="switch-button" @click="handleShowPanel" v-if="isShowSelectPanel">
          {{$t('m.left.fold1')}}
          <i :class="isShowSelectPanel?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
        </span>
        <span class="switch-button" @click="handleShowPanel" v-if="!isShowSelectPanel">
          {{$t('m.left.fold2')}}
          <i :class="isShowSelectPanel?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
        </span>
      </div>
    </div>
    <div :class="[isBcg ? 'black-bcg' : 'white-bcg']" class="bcg" v-loading="loading">
      <div id="result" :style="imageStyle"></div>
    </div>
  </div>
</template>

<script>
import * as types from "../../../store/mutation-types";
import FilterBox from "./FilterBox";
import SelectedBox from "./SelectedBox";
import Api from "../../../api/parse";
import Vue from "vue";

export default {
  data() {
    return {
      isShowSelectPanel: true,
      selfData: {},
      compitiveData: [],
      typeDict: {
        0: "brand",
        1: "manufacturer",
        2: "model",
        3: "style"
      },
      isSearch: false,
      isBcg: false,
      bcgSrc: require("../../../assets/parse/watermark_day.png"),
      isPaint: false,
      isPullDown: true,
      currentChartData: "",
      loadingParse: false,
      isExclude: false,
      phone: localStorage.UserPhone || "15810684857"
    };
  },
  computed: {
    selectedData() {
      this.isExclude = false;
      return this.$store.state.parse.selectedSamples;
    },
    imageStyle() {
      return {
        //           width: `${document.body.clientWidth * 0.847}px`
        //           height: `${this.imagePosition.zoom}00%`,
        //           left: `${this.imagePosition.offset.left}px`,
        //           top: `${this.imagePosition.offset.top}px`
      };
    },
    myChart() {
      return echarts.init(document.getElementById("result"));
    },
    imgData() {
      return this.$store.state.parse.chartData;
    },
    maskState() {
      return this.$store.state.common.isMaskOpen;
    },
    type() {
      return this.$store.state.parse.selectedType;
    },
    relation() {
      return this.$store.state.parse.relation;
    },
    date() {
      return this.$store.state.parse.date;
    },
    territory() {
      return this.$store.state.parse.territory;
    },
    downPicUrl() {
      return Api.downLoadPic;
    },
    selectedTags() {
      return this.$store.state.parse.selectedSamples
        .map(i => i.label)
        .join("_");
    },
    imageArrayData() {
      return this.$store.state.parse.imageDataArray;
    },
    isHeatmap() {
      return this.$store.state.parse.isHeatmap;
    },
    chartParams() {
      return this.$store.state.parse.chartParams;
    },
    settings() {
      return this.$store.state.parse.settings;
    },
    filters() {
      return this.$store.state.parse.filters;
    },
    loading() {
      return this.$store.state.parse.loading;
    },
    flag() {
      return this.$store.state.contrast.flag;
    },
    scopeType() {
      return this.$store.state.parse.scopeType;
    },
    isPaintHeatmap() {
      return this.$store.state.parse.isPaintHeatmap;
    }
  },
  watch: {
    imgData() {
      this.getEchartData();
    },
    maskState(state) {
      if (state === false) {
        this.isSearch = false;
      }
    },
    settings() {
      if (!this.isPaint) {
        this.getEchartData();
      }
    },
    "chartParams.id"() {
      if (this.isHeatmap) {
        this.parse();
      } else if (this.isPaint) {
        this.parseBp();
      }
    },
    flag() {
      let width = document.getElementById("result").clientWidth;
      let height = document.getElementById("result").clientHeight;
      if (this.flag) {
        this.isShowSelectPanel = false;
        this.myChart.resize({
          width: width * 0.5,
          height: height
        });
      } else {
        this.myChart.resize({
          width: width,
          height: height
        });
      }
    },
    bcgSrc() {
      this.paintChart(this.currentChartData, this);
    },
    date() {
      this.getPanelData();
      // this.getCompetition()
    },
    relation() {
      this.getPanelData();
      // this.getCompetition()
    },
    scopeType() {
      this.callbackCompetition(this.compitiveData);
    }
  },
  mounted() {
    localStorage.UserPhone = "15810684857";
    this.getPanelData();
    // this.getCompetition();
    if (this.selectedData.length === 0) {
      this.$store.commit(types.CLEAR_IMAGEDATAARRAY);
      this.$store.commit(types.SET_CHARTCOMPITIVEDATA, []);
      this.$store.commit(types.SET_ISHEATMAP, true);
      // this.$store.commit(types.IS_PAINT_HEATMAP, true);
      //        this.$store.commit(types.SET_CHARTPATH, {})
      //        this.$store.commit(types.SET_FILTER, [[0, 0], [0, 0]])
    } else {
      this.getCompetition();
    }
    //      this.$store.commit(types.SET_ISFRESH, true)
  },
  methods: {
    handleDelete(index) {
      let arr = this.selectedData
        .slice(0, index)
        .concat(this.selectedData.slice(index, this.selectedData.length));
      arr.splice(index, 1);
      this.$store.commit(types.SET_SAMPLES, arr);
      // this.getCompetition()
    },
    refresh() {
      if (this.selectedData.length && !this.isPullDown) {
        this.isPullDown = !this.isPullDown;
      }
      this.$store.commit(types.SET_SAMPLES, []);
    },
    handleShowPanel() {
      this.isShowSelectPanel = !this.isShowSelectPanel;
    },
    parseEvent() {
      if (!this.isExclude) {
        this.getCompetition();
      } else {
        if (this.isHeatmap) {
          this.parse();
        } else {
          this.parseBp();
        }
        // this.parseBp();
      }
    },
    getCompetition() {
      if (!this.isRightDate()) return;
      if (this.selectedData.length === 0) {
        alert("请选择本品！");
        return;
      }
      this.isPaint = true;
      this.$store.commit(types.SET_LOADING, true);
      this.loadingParse = true;
      let _this = this;
      this.$store.commit(types.CHANGE_MASK_STATE, false);
      if (this.selectedData.length === 0) return;
      const params = new URLSearchParams();
      params.append("relation", this.relation);
      params.append("type", this.type);
      params.append("id", this.selectedData.map(i => i.value).join());
      params.append("date", this.date);
      if (this.territory) {
        params.append("province", this.territory);
      }
      this.$axios
        .post("/car/queryCompetitionServlet", params)
        .then(function(res) {
          if (res.data.status) {
            _this.compitiveData = res.data.data;
            _this.$store.commit(types.SET_COMPITIVEDATA, res.data.data);
            _this.$store.commit(types.SET_CHARTCOMPITIVEDATA, res.data.data);
            _this.isExclude = true; // 请求完竞品后，可以进行剔除操作
            _this.callbackCompetition(res.data.data);
          } else {
            alert("地域选择太少或有误，请重新选择");
          }
        });
    },
    changeSelect() {
      this.loadingParse = true;
      this.getCompetition();
    },
    isRightDate() {
      let temp = this.date.split(",");
      let date1 = temp[0].split("-");
      let date2 = temp[1].split("-");
      if (
        date1[0] * 100 + parseInt(date1[1]) >
        date2[0] * 100 + parseInt(date2[1])
      ) {
        // alert('选择时间错误')
        this.$message("时间格式错误");
        return false;
      }
      return true;
    },
    getChartCompetition(sample) {
      let _this = this;
      const params = new URLSearchParams();
      params.append("relation", this.relation);
      params.append("type", this.type);
      params.append("id", sample.data.id);
      params.append("date", this.date);
      if (this.territory) {
        params.append("province", this.territory);
      }
      //        this.$axios.post(Api.queryCompetition, params).then(function (res) {
      this.$axios
        .post("/car/queryCompetitionServlet", params)
        .then(function(res) {
          if (res.data.status) {
            _this.$store.commit(types.SET_CHARTCOMPITIVEDATA, res.data.data);
          }
        });
    },
    callbackCompetition(data) {
      // 更新筛选字典和选项，metaResult存筛选属性
      if (this.$i18n.locale === "ch") {
        var metaResult = {
          bp: { "-1": "非本品" },
          bjpj: {},
          heatmap: { "-5": "五色", "-2": "双色" }
        };
      } else {
        var metaResult = {
          bp: { "-1": "Others" },
          bjpj: {},
          heatmap: { "-5": "Heatmap", "-2": "Monochrome" }
        };
      }

      let activeLabel = this.typeDict[this.type];
      for (let i in data) {
        let temp = [];
        if (typeof this.scopeType === "number") {
          if (this.scopeType === 0) {
            let len = data[i].all.length - 1;
            temp.push(data[i].all[len]);
          } else {
            temp = data[i].all.slice(0, this.scopeType);
            let len = data[i].all.length - 1;
            temp.push(data[i].all[len]);
          }
        } else if (typeof this.scopeType === "string") {
          temp = data[i][this.scopeType.split("*")[0]];
        }
        // 获取数据中all的内容
        for (let j in temp) {
          let keyItem = temp[j];
          // 获取all中属性
          let keyArray = Object.keys(keyItem); // brand, country
          for (let k in keyArray) {
            let key = keyArray[k];
            if (key === "price" || key === "nprice") {
              continue;
            }
            // 不存在该属性值时设置为空,activeLabel为选择的页面和数字
            if (activeLabel !== key) {
              if (!(key in metaResult)) {
                metaResult[key] = {};
              }
              metaResult[key][keyItem[key].id] = keyItem[key].name; // 属性名字
            } else {
              // activeLabel == key
              let _str = "竞品集";
              if (this.$i18n.locale === "en") {
                _str = " Competitions";
              }
              if (parseInt(j) === data[i].all.length - 1) {
                metaResult["bp"][keyItem[activeLabel].id] =
                  keyItem[activeLabel].name;
                metaResult["bjpj"][keyItem[activeLabel].id] =
                  keyItem[activeLabel].name + _str;
              }
            }
          }
        }
      }
      this.selfData = metaResult;
      this.loadingParse = false;
    },
    getEchartData() {
      // let path = Api.echartPath + this.imgData.gexfpath
      let path = this.imgData.gexfpath;
      let _this = this;
      this.$axios
        .get(path)
        .then(function(res) {
          let graph = echarts.dataTool.gexf.parse(res.data);
          _this.currentChartData = graph;
          _this.$store.commit(types.SET_IMAGEDATAARRAY, {
            data: JSON.stringify(graph),
            flag: true
          });
          _this.loadingParse = false;
          _this.paintChart(graph, _this);
          _this.$store.commit(types.SET_LOADING, false);
          // 节点
        })
        .catch(function(error) {
          _this.loadingParse = false;
          _this.$message.warning(
            _this.$i18n.locale === "ch" ? "请求异常" : "Bad request"
          );
        });
    },
    paintChart(graph, context) {
      // 节点最大最小 == 球形面积
      let sizeNodeMin = this.settings.node_size[0];
      let sizeNodeMax = this.settings.node_size[1];
      // 标签最大最小 == 字体大小
      let labelSizeMin = this.settings.font_size[0];
      let labelSizeMax = this.settings.font_size[1];
      // 边最大最小
      let linkWidthMin = this.settings.edge_size[0];
      // let linkWidthMin = 0.1;
      let linkWidthMax = this.settings.edge_size[1];

      let max = 0;
      let min = Number.MAX_VALUE;
      graph.nodes.forEach(function(node) {
        let weight = node.attributes.weight;
        if (weight < min) {
          min = weight;
        }
        if (weight > max) {
          max = weight;
        }
      });
      graph.nodes.forEach(function(node) {
        let weight = node.attributes.weight;
        // 节点大小标准化
        node.symbolSize =
          ((sizeNodeMax - sizeNodeMin) / (max - min)) * (weight - min) +
          sizeNodeMin;
        // 节点标签标准化
        node.label = {
          normal: {
            fontSize: Math.round(
              ((labelSizeMax - labelSizeMin) / (max - min)) * (weight - min) +
                labelSizeMin
            )
          }
        };
      });

      max = 0;
      min = Number.MAX_VALUE;
      // 边
      graph.links.forEach(function(link) {
        let weight = link.weight;
        if (weight < min) {
          min = weight;
        }
        if (weight > max) {
          max = weight;
        }
      });
      graph.links.forEach(function(link) {
        let weight = link.weight;
        link.lineStyle.normal.width =
          ((linkWidthMax - linkWidthMin) / (max - min)) * (weight - min) +
          linkWidthMin;
      });

      let name = this.selectedTags;
      let relationMap = ["线索", "关注"];
      let relationMapEn = ["Leads", "Focus"];
      let imgSrc = this.bcgSrc;
      let PatternImg = new Image();
      PatternImg.src = imgSrc;
      let option = {
        backgroundColor: {
          type: "pattern",
          image: PatternImg,
          repeat: "repeat",
          z: 100
        },
        // backgroundColor: 'transparent',
        toolbox: {
          // 下载图片
          z: 20,
          bottom: 30,
          right: 20,
          itemSize: 20,
          feature: {
            saveAsImage: {
              name: name, // 下载图片的名称
              show: true,
              title: this.$i18n.t("m.chart.save[0]"),
              icon:
                "path://M690 599.5 574.1 714.2c-0.1 0.1-0.3 0.2-0.4 0.3-9.1 9.1-9.1 23.9 0 33.1 9.1 9.1 23.9 9.1 33.1 0 0.6-0.6 0.8-1.4 1.4-2l69.9-69.9 33-33.1c0 0 22.7 21.3 23.2 21 8.7 4.1 19.3 2.8 26.4-4.4 9.1-9.1 9.1-23.9 0-33.1 0 0 0 0 0 0l0 0-16.5-16.5c0 0-3.1-3.5-4.8-5.2C725.8 590.9 705.1 589.3 690 599.5zM783.2 714.6 783.2 714.6l10.6 10.7 0 0c0 0 0 0 0 0 9.1 9.1 23.9 9.1 33.1 0 9.1-9.1 9.1-23.9 0-33.1 0 0 0 0 0 0l0 0-10.7-10.7-0.1 0.1c-0.1-0.1-0.2-0.3-0.3-0.4-9.1-9.1-23.9-9.1-33.1 0-9.1 9.1-9.1 23.9 0 33.1C782.9 714.4 783 714.5 783.2 714.6zM856.2 48.9 169.8 48.9C100.8 48.9 45 104.7 45 173.7l0 686.4c0 68.9 55.9 124.8 124.8 124.8l686.4 0c68.9 0 124.8-55.9 124.8-124.8L981 173.7C981 104.7 925.1 48.9 856.2 48.9zM918.6 860.1c0 34.5-27.9 62.4-62.4 62.4L169.8 922.5c-34.5 0-62.4-27.9-62.4-62.4l0-74 166-158.9c5.6-4.7 9.2-5 14.8-0.1l127.5 104.3c11 7.7 23 17.3 32.4 17.3s20.6-3.2 32.7-15.3l231.7-231.7c1.2 0.1 2.4 0.4 3.7 0.4 0.4 0 0.8-0.1 1.2-0.1l201.2 216L918.6 860.1zM918.6 626.4 752 447.6c-6-13.8-19.7-23.5-35.8-23.5-14.4 0-26.8 7.8-33.5 19.4l-228 228c-6.6 4.7-6.6 4.7-13.8 0L311.5 565.6c-7.1-9.5-18.4-15.7-31.1-15.7-6.5 0-12.6 1.8-18 4.6l-6.1 3.9c-2 1.5-3.7 3.3-5.4 5.1L107.4 701 107.4 173.7c0-34.5 27.9-62.4 62.4-62.4l686.4 0c34.5 0 62.4 27.9 62.4 62.4L918.6 626.4zM325.8 204.9c-51.7 0-93.6 41.9-93.6 93.6s41.9 93.6 93.6 93.6 93.6-41.9 93.6-93.6S377.5 204.9 325.8 204.9zM325.8 329.7c-17.2 0-31.2-14-31.2-31.2s14-31.2 31.2-31.2c17.2 0 31.2 14 31.2 31.2S343 329.7 325.8 329.7z，M731.3 682.1",
              excludeComponents: ["toolbox"],
              pixelRatio: 1
            },
            mydataSaveBtn: {
              show: true,
              title: this.$i18n.t("m.chart.save[1]"),
              icon:
                "path://M353.9 239.8H681c9.9 0 17.9-8 17.9-17.9 0-9.9-8-17.9-17.9-17.9H353.9c-9.9 0-17.9 8-17.9 17.9 0.1 9.9 8.1 17.9 17.9 17.9zM327.7 331.7h371.6c9.9 0 17.9-8 17.9-17.9 0-9.9-8-17.9-17.9-17.9H327.7c-9.9 0-17.9 8-17.9 17.9 0 9.9 8 17.9 17.9 17.9zM301.4 423.5h426.4c9.9 0 17.9-8 17.9-17.9 0-9.9-8-17.9-17.9-17.9H301.4c-9.9 0-17.9 8-17.9 17.9 0.1 9.9 8.1 17.9 17.9 17.9zM644.3 702.8H386.1c-13.2 0-23.8 10.7-23.8 23.8 0 13.2 10.7 23.8 23.8 23.8h258.1c13.2 0 23.8-10.7 23.8-23.8 0.1-13.1-10.6-23.8-23.7-23.8z,M865.9 847c0 9.8-8 17.9-17.9 17.9H177.2c-9.9 0-17.9-8-17.9-17.9V551.9c0-9.8 8-17.9 17.9-17.9h204.9c25 48.5 75.1 79.8 130.5 79.8 55.4 0 105.5-31.3 130.5-79.8H848c9.8 0 17.9 8 17.9 17.9V847zM276.2 178.8c3.2-10.4 18.2-20.2 30.8-20.2h411.2c14.1 0 27.9 10.7 30.8 20.3l92.5 295.6h-218c-12.7 0-24.1 8.1-28.2 20.2-12.2 35.7-45.4 59.7-82.7 59.7-37.3 0-70.5-24-82.7-59.7-4.1-12.1-15.4-20.1-28.2-20.1h-218l92.5-295.8z m641.7 340.3l-112-358c-11-35.4-48.7-62.1-87.7-62.1H307c-39 0-76.7 26.7-87.7 62.1l-112 358.1c-4.7 10-7.5 21-7.5 32.7V847c0 42.7 34.7 77.4 77.4 77.4H848c42.7 0 77.4-34.7 77.4-77.4V551.9c0-11.7-2.8-22.8-7.5-32.8z",
              onclick: () => {
                // this.$axios
                //   .post("v2/getDownInfo", {
                //     phone: parseInt(localStorage.UserPhone),
                //     path: this.downPicUrl
                //   })
                //   .then(res => {
                //     console.log(res);
                //   });
                // let a = document.createElement('a')
                // a.href = this.downPicUrl +
                //   "?name=" +
                //   this.selectedTags +
                //   "_" +
                //   relationMap[this.relation] +
                //   ".zip";
                //   a.click();
                if (this.$i18n.locale === "ch") {
                  window.location.href = `${this.downPicUrl}?lang=${this.$i18n.locale}&name=${
                    this.selectedTags
                  }_${relationMap[this.relation]}.zip`;
                } else {
                  window.location.href = `${this.downPicUrl}?lang=${this.$i18n.locale}&name=${
                    this.selectedTags
                  }_${relationMapEn[this.relation]}.zip`;
                }
              }
            }
          }
        },
        series: [
          {
            type: "graph",
            layout: "none",
            data: graph.nodes,
            links: graph.links,
            roam: true,
            focusNodeAdjacency: true,
            label: {
              normal: {
                show: "true",
                position: "inside",
                formatter: "{b}",
                color: "white",
                fontWeight: "bold",
                textBorderColor: "black",
                textBorderWidth: 2
              }
            },
            itemStyle: {
              normal: {
                color: "red",
                borderColor: "black",
                borderWidth: 1,
                shadowColor: "rgba(255, 255, 255, 0.5)",
                shadowBlur: 10,
                shadowOffsetY: 5
              }
            },
            lineStyle: {
              normal: {
                opacity: 0.8,
                color: "mix"
              }
            }
          }
        ]
      };
      context.myChart.setOption(option);
      context.myChart.on("click", function(params) {
        // 阻止图表点击事件冒泡
        params.event.event.stopPropagation();
        if (this.flag) {
          context.$store.commit(types.CLOSE_HALF, true);
        }
        if (params.dataType === "node") {
          // 点击到了 markPoint 上
          context.$store.commit(types.SET_CHART_CLICK_DATA, {
            name: params.data.name,
            id: params.data.id
          });
          context.getChartCompetition(params);
        }
      });
    },
    getEchartPath(path) {
      return path;
    },
    changeSearch() {
      this.isSearch = !this.isSearch;
      this.$store.commit(types.CHANGE_MASK_STATE, this.isSearch);
    },
    changeBcg(val) {
      if (val === 0) {
        this.isBcg = true;
        this.bcgSrc = require("../../../assets/parse/watermark_night.png");
      } else {
        this.isBcg = false;
        this.bcgSrc = require("../../../assets/parse/watermark_day.png");
      }
    },
    paintHistoryChart(index, type) {
      if (type === "forward") {
        index--;
      } else {
        index++;
      }
      this.currentChartData = JSON.parse(this.imageArrayData.data[index - 1]);
      this.paintChart(JSON.parse(this.imageArrayData.data[index - 1]), this);
      this.$store.commit(types.SET_IMAGEDATAARRAY, {
        index: index,
        flag: false
      });
    },
    getPanelData() {
      let allSamples = [];
      for (let i = 0; i < 4; i++) {
        const params = new URLSearchParams();
        params.append("type", i);
        params.append("date", this.date);
        this.$axios.post("/car/queryCarServlet", params).then(res => {
          Vue.set(allSamples, i, res.data.data);
          if (i === 3) {
            this.$store.commit(types.SET_ALLSAMPLES, allSamples);
          }
        });
      }
    },
    parse() {
      this.loadingParse = true;
      this.$store.commit(types.SET_LOADING, true);
      const api = this.$axios.create({
        withCredentials: true,
        headers: {
          lang: this.$i18n.locale
        }
      });
      let _this = this;
      const params = new URLSearchParams();
      let setting = {
        font_size: this.settings.font_size,
        edge_size: this.settings.edge_size,
        node_size: this.settings.node_size
      };
      // 请求本品图表
      if (
        this.chartParams.id.length &&
        this.chartParams.date &&
        this.chartParams.id_color
      ) {
        let tempChartData = this.$store.state.parse.chartParams;
        params.append("relation", this.relation);
        params.append("id", this.chartParams.id);
        params.append("type", this.chartParams.type);
        params.append("date", this.chartParams.date);
        params.append("id_color", tempChartData.id_color);
        params.append("settings", JSON.stringify(setting));
        if (this.territory) {
          params.append("province", this.territory);
        }
        //          api.post(Api.getGephiPng, params).then(function (res) {
        api.post("/gephi/getGephiPngServlet", params).then(function(res) {
          if (res.data.data) {
            //              _this.$store.commit(types.SET_CHARTPATH, res.data.data)
            _this.$store.commit(
              types.SET_DEFAULT_FILTER,
              res.data.data.filterMM
            );
            //            _this.$store.commit(types.SET_FILTER, [res.data.data.filterMM.nodemm, res.data.data.filterMM.edgemm])
            // 请求热力图
            //              api.post(Api.heatmap).then(function (res) {
            api.post("/gephi/heatmapServlet").then(function(res) {
              if (res.data.data) {
                _this.$store.commit(types.SET_LOADING, false);
                _this.$store.commit(types.SET_CHARTPATH, res.data.data);
                _this.$store.commit(types.SET_HEATMAPSCOPE, [
                  res.data.data.min,
                  res.data.data.max
                ]);
              }
            });
          }
        });
      }
      this.isPaint = false;
    },
    parseBp() {
      this.$store.commit(types.SET_LOADING, true);
      const api = this.$axios.create({
        withCredentials: true,
        headers: {
          lang: this.$i18n.locale
        }
      });
      let _this = this;
      if (!this.isHeatmap) {
        const params = new URLSearchParams();
        let setting = {
          font_size: this.settings.font_size,
          edge_size: this.settings.edge_size,
          node_size: this.settings.node_size
        };
        params.append("relation", this.relation);
        params.append("id", this.chartParams.id);
        params.append("type", this.chartParams.type);
        params.append("date", this.chartParams.date);
        params.append("id_color", this.chartParams.id_color);
        params.append("settings", JSON.stringify(setting));
        if (this.territory) {
          params.append("province", this.territory);
        }
        if (this.filters[0][1] !== 0) {
          let obj = {};
          obj["node"] = this.filters[0];
          obj["edge"] = this.filters[1];
          params.append("filter", JSON.stringify(obj));
        }
        this.loadingParse = true;
        //          api.post(Api.getGephiPng, params).then(function (res) {
        api.post("/gephi/getGephiPngServlet", params).then(function(res) {
          if (res.data.data) {
            _this.$store.commit(types.SET_CHARTPATH, res.data.data);
            _this.$store.commit(
              types.SET_DEFAULT_FILTER,
              res.data.data.filterMM
            );
            //              _this.$store.commit(types.SET_FILTER, [res.data.data.filterMM.nodemm, res.data.data.filterMM.edgemm])
          } else {
            this.loadingParse = false;
            alert("分析异常");
          }
        });
      } else {
        const heatparams = new URLSearchParams();
        if (this.chartParams.maxColor) {
          heatparams.append("maxColor", this.chartParams.maxColor);
        }
        if (this.chartParams.minColor) {
          heatparams.append("minColor", this.chartParams.minColor);
        }
        if (this.chartParams.min) {
          heatparams.append("min", this.chartParams.min);
        }
        if (this.chartParams.max) {
          heatparams.append("max", this.chartParams.max);
        }
        //          api.post(Api.heatmap, heatparams).then(function (res) {
        api.post("/gephi/heatmapServlet", heatparams).then(function(res) {
          if (res.data.data) {
            _this.$store.commit(types.SET_CHARTPATH, res.data.data);
            _this.$store.commit(types.SET_HEATMAPSCOPE, [
              res.data.data.min,
              res.data.data.max
            ]);
          }
        });
      }
      this.isPaint = false;
    },
    changeShowState() {
      if (this.selectedData.length) {
        this.isPullDown = !this.isPullDown;
      }
    }
  },
  components: {
    FilterBox,
    SelectedBox
  }
};
</script>

<style scoped>
.container {
  min-width: 1066px;
  padding: 0 3.5%;
  position: relative;
}

.parse {
  float: right;
  /*margin: 5px 30px 0 0;*/
  width: 78px;
  padding: 3px 0;
  height: 25px;
  color: #fff;
  border: none;
  background-color: #000;
  cursor: pointer;
  outline: none;
}

.parse-title-box {
  position: relative;
}

.show-box {
  height: 30px;
  overflow: hidden;
  margin: 15px 0 4px 0;
  font-size: 12px;
}

.selected-panel {
  display: inline-block;
  height: 30px;
  vertical-align: middle;
  /*min-width: 70%;*/
  /*max-width: 90%;*/
  width: 85%;
}

.search {
  /*width: 20px;*/
  /*height: 20px;*/
  vertical-align: middle;
  font-size: 13px;
  color: #848484;
  font-weight: inherit;
}

.search-active {
  color: #1b96fe;
}

.refresh {
  width: 15px;
  height: 15px;
  margin-top: 5px;
  /*float: right;*/
  vertical-align: middle;
  cursor: pointer;
  position: absolute;
  right: 30px;
  bottom: 0;
}

.pulldown,
.pullup {
  cursor: pointer;
  font-size: 15px;
  position: absolute;
  right: 11px;
  bottom: 0;
  color: #666;
}

.selected-tags {
  display: inline-block;
  width: 85%;
  border-bottom: 1px solid #aaaaaa;
  /*vertical-align: middle;*/
  position: absolute;
  overflow: hidden;
  background-color: #fff;
  z-index: 130;
  margin-top: 2px;
}

.is-pull-down {
  height: 23px;
  overflow: hidden;
}

.is-border {
  border: 1px solid #e4e4e4;
  padding: 5px;
  box-sizing: border-box;
}

.select-title {
  overflow: hidden;
  display: inline-block;
  height: 20px;
  width: 100%;
}

.clear {
  float: right;
  text-decoration: underline;
  cursor: pointer;
}

.clear:hover {
  color: #3794ff;
}

.selected-item {
  display: inline-block;
  margin: 1px 3px;
}

.tag-delete {
  width: 15px;
  height: 15px;
  margin: 0 5px;
  vertical-align: middle;
  cursor: pointer;
}

.parse-logo {
  width: 320px;
  height: 50px;
  margin-top: 20px;
  cursor: pointer;
}

.dev-name {
  position: absolute;
  top: 50px;
  right: 0px;
  font-size: 14px;
  /* transform: scale(0.83); */
}

.logout {
  right: 130px;
}

.logout-text {
  color: #1b96fe;
  text-decoration: underline;
  cursor: pointer;
}

.switch-button {
  display: inline-block;
  height: 25px;
  box-sizing: border-box;
  font-size: 14px;
  color: #000;
  background: #f9bd00;
  padding: 3px 20px;
  position: absolute;
  right: 0;
  cursor: pointer;
  z-index: 150;
}

.switch-button i {
  margin-left: 5px;
  color: #000;
  vertical-align: middle;
}

.filter-box {
  width: 100%;
  box-sizing: border-box;
  margin-top: 0px;
}

#result {
  display: inline-block;
  width: 100%;
  min-width: 1100px;
  min-height: 460px;
  height: calc(100vh - 261px);
  /*height: 580px;*/
}

.select {
  position: absolute;
  left: 0;
  z-index: 120;
}

.select-btn {
  border: 1px solid #e8e9ea;
  padding: 5px 20px;
  font-size: 13px;
  cursor: pointer;
  color: #fff;
  background: #000;
}

.black-bcg {
  /*background-color: #000;*/
}

.white-bcg {
  background-color: #fff;
}

@media screen and (min-width: 1600px) {
  .container {
    padding: 0 7%;
  }
}

@media screen and (min-width: 2100px) {
  .show-box {
    font-size: 16px;
  }
}
</style>
