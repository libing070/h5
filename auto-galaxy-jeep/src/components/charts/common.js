import * as libs from "@/utils/libs.js";
// 折线图和柱状图混入对象
let commonMixin = {
  methods: {
    generateGrid() {
      return {
        top: this.status || this.popStatus ? "18%" : "2%",
        left: "2%",
        right: "5%",
        bottom: this.status || this.popStatus ? "15%" : "0%",
        containLabel: true
      };
    },
    generateTitle() {
      if (this.popStatus || this.status) {
        // 如果是装车率，也就是散点图
        if (this.chartType === "scatter") {
          let source
          if (localStorage.lang === 'ch') {
            source = `${this.carStr}在${this.areaName}${this.caryearName}${this.priceRangeName}关于${this.deviceTypeName}的${this.yStr}`;
          } else {
            source = `${this.yStr} about ${this.deviceTypeName} of ${this.carStr} in ${this.caryearName} and ${this.areaName} with the range of ${this.priceRangeNameEn}`
          }
          let text = libs.insertStr(source, 80, "\n");
          return {
            text: text,
            top: 20,
            x: "center",
            textStyle: {
              color: "#777",
              width: 10,
              height: 99
            },
            rich: {
              normal: {
                width: 10
              }
            }
          };
          // 如果是装配率，也就是条形图和雷达图，比楼上少一个维度
        } else if (this.$store.state.contrast.yAxis === "assembly") {
          let source
          if (localStorage.lang === 'ch') {
            source = `${this.carStr}${this.caryearName}${this.priceRangeName}关于${this.deviceTypeName}的${this.yStr}`;
          } else {
            source = `${this.yStr} about ${this.deviceTypeName} of ${this.carStr} in ${this.caryearName} with the range of ${this.priceRangeNameEn}`
          }
          let text = libs.insertStr(source, 80, "\n");
          return {
            text: text,
            top: 20,
            x: "center",
            textStyle: {
              color: "#777",
              width: 10,
              height: 99
            },
            rich: {
              normal: {
                width: 10
              }
            }
          };
          // 画像分析
        } else if (this.$store.state.contrast.yAxis === "profile") {
          let _text
          if (localStorage.lang === 'ch') {
            _text = `${this.carStr}在 ${this.$store.state.contrast.params.year}年的${this.yStr}`
          } else {
            _text = `${this.yStr} of ${this.carStr} in ${this.$store.state.contrast.params.year}`
          }
          return {
            text: _text,
            top: 30,
            x: "center",
            textStyle: {
              color: "#777",
              width: 100
            },
            rich: {
              normal: {
                width: 100
              }
            }
          };
          // 购车目的
        } else if (this.$store.state.contrast.yAxis === "purpose") {
          let _text
          if (localStorage.lang === 'ch') {
            _text = `${this.carStr}的${this.yStr}`
          } else {
            _text = `${this.yStr} of ${this.carStr}`
          }
          return {
            text: _text,
            top: 30,
            x: "center",
            textStyle: {
              color: "#777",
              width: 100
            },
            rich: {
              normal: {
                width: 100
              }
            }
          };
        } else {
          let source = `${this.carStr}在 ${this.dateStr}${this.dateTypeStr}${this.areaName}的${this.yStr}`;
          let text = libs.insertStr(source, 60, "\n");
          return {
            text: text,
            top: 30,
            x: "center",
            textStyle: {
              color: "#777",
              width: 100
            },
            rich: {
              normal: {
                width: 100
              }
            }
          };
        }
      }
    },
    generateTooltip() {
      if (this.popStatus || this.status) {
        let tooltip_obj = {
          extraCssText: "max-width:50%;overflow:hidden;word-wrap: break-word;word-break: break-all;white-space: normal;"
        };
        if (this.chartType === "line" || this.chartType === "bar") {
          tooltip_obj.trigger = "axis";
          if (this.yType === 'purpose') {
            tooltip_obj.formatter = function(data) {
              let _arr = []
              data.forEach(obj => {
                _arr.push(obj.marker + obj.seriesName + '：' + obj.value + '%' + '<br>')
              })
              return data[0].axisValue + '<br>' + _arr.join('');
            };
          }
        } else if (this.chartType === "radar") {
          delete tooltip_obj.trigger;
        }
        return tooltip_obj;
      }
    },
    generateToolbox() {
      if (this.popStatus || this.status) {
        return {
          top: "-1%",
          right: "4%",
          feature: {
            // mydataUploadBtn: {
            //   show: true,
            //   title: "导入数据",
            //   icon:
            //     "path://M1086.656 415.616C1072.992 204.032 925.856 0 656 0 409.184 0 218.848 183.456 208.768 428.288 73.728 470.304 0 614.816 0 720 0 881.952 134.592 1024 288 1024l208 0c8.832 0 16-7.168 16-16S504.832 992 496 992L288 992c-136.384 0-256-127.104-256-272C32 622.368 117.568 448 288 448l48 0c8.832 0 16-7.168 16-16S344.832 416 336 416L288 416c-16.288 0-31.68 1.824-46.688 4.448C253.856 228.768 399.552 32 656 32 930.816 32 1056 247.648 1056 448l0 48c0 8.832 7.168 16 16 16s16-7.168 16-16L1088 448c0-0.096 0-0.192 0-0.288 96.608 10.592 224 114.272 224 272.288 0 122.432-118.112 272-256 272l-240 0c-103.616 0-144-40.384-144-144L672 409.056l130.496 130.24C805.632 542.432 809.728 544 813.824 544s8.192-1.568 11.328-4.672c6.24-6.24 6.24-16.416 0-22.624l-142.752-142.464c-19.008-18.944-33.76-18.944-52.736 0l-142.752 142.464c-6.24 6.208-6.24 16.384 0 22.624s16.384 6.24 22.624 0L640 409.056 640 848c0 121.728 54.272 176 176 176L1056 1024c155.104 0 288-167.168 288-304C1344 554.656 1208.864 425.344 1086.656 415.616z",
            //   onclick: () => {
            //     this.$message.warning("施工中，敬请期待");
            //   }
            // },
            // dataView: {},
            dataZoom: {
              title: {
                zoom: this.$i18n.t('m.chart.btns[0]'),
                back: this.$i18n.t('m.chart.btns[1]'),
              }
            },
            magicType: {
              type: ["tiled", "stack"],
              title: {
                stack: this.$i18n.t('m.chart.btns[2]'),
                tiled: this.$i18n.t('m.chart.btns[3]'),
              }
            },
            saveAsImage: {
              title: this.$i18n.t('m.chart.save[0]'),
              excludeComponents: ["toolbox", "dataZoom"]
            },
            mydataSaveBtn: {
              show: true,
              title: this.$i18n.t('m.chart.save[1]'),
              icon: "path://M915.348 6.932h-807.85C51.402 6.932 6.519 51.814 6.519 107.911v807.848c0 56.103 44.884 100.981 100.979 100.981h807.85c56.101 0 100.981-44.879 100.981-100.981V107.911c0-56.097-44.881-100.979-100.981-100.979zM230.921 63.033h561.006v336.602c0 33.662-28.048 56.102-56.102 56.102H287.022c-33.662 0-56.102-28.052-56.102-56.102V63.033z m729.307 847.119c0 28.048-22.437 50.487-50.49 50.487H113.109c-28.05 0-50.489-22.439-50.489-50.487V113.523c0-28.051 22.439-50.49 50.489-50.49h61.71v336.602c0 61.712 50.489 112.203 112.203 112.203h448.803c61.709 0 112.198-50.491 112.198-112.203V63.033h61.714c28.054 0 50.49 22.439 50.49 50.49v796.629z m0 0",
              onclick: () => {
                this.downloadData();
              }
            }
          }
        };
      }
    },
    generateLegend() {
      if (this.popStatus || this.status) {
        return {
          type: "scroll",
          left: "center",
          bottom: 0,
          data: this.data.series.map((obj, i) => {
            return obj.name;
          })
        };
      }
    }
  }
};

export default commonMixin;
