// 复合图混入对象

let habitMixin = {
  methods: {
    genHabitTitle() {
      if (this.status || this.popStatus) {
        let params = this.$store.state.contrast.params;
        let _title
        if (localStorage.lang === 'ch') {
          _title = `${params.monthsingle} ${params.areasingle} ${
            params.carArr[0]
          }潜客人群触媒习惯`
        } else {
          let _area
          if (params.areasingle === 'All') {
            _area = 'nationwide'
          } else {
            _area = 'at ' + params.areasingle
          }
          _title = `The Consumer Media Habits of ${this.carStr} in ${params.monthsingle} ${_area}`
        }

        return {
          top: "2%",
          left: "center",
          text: _title,
          textStyle: {
            color: "#555"
          }
        };
      } else {
        return {};
      }
    },
    genHabitGrid() {
      return {
        top: "14%",
        bottom: "7%",
        right: "9%",
        left: "10%"
      };
    },
    genHabitLegend() {
      if (this.status || this.popStatus) {
        return {
          data: [this.$store.state.contrast.params.carArr[0], "全国", "TGI"],
          orient: "vertical",
          right: "1%",
          top: "43%",
          selected: {
            全国: false
          }
        };
      } else {
        return {};
      }
    },
    genHabitTooltip() {
      return {
        formatter: "{b}: {c}%"
      };
    },
    genHabitDataZoom() {
      if (this.status || this.popStatus) {
        return [{
          type: "inside",
          yAxisIndex: 0
        }, {
          type: "slider",
          yAxisIndex: 0,
          left: 0
        }];
      } else {
        return [];
      }
    },
    genHabitY() {
      return {
        type: "category",
        // 显示左侧的类目名
        axisLabel: {
          show: true,
          color: "#000"
        },
        // 坐标轴线不显示
        axisLine: {
          show: false,
          lineStyle: {
            color: "#fff"
          }
        },
        data: this.habitData.map(v => {
          return v.name;
        })
      };
    },
    genHabitX() {
      return [{
        type: "value",
        name: "TGI",
        min: -100,
        // max: 200,
        // interval: 20,
        splitLine: {
          show: false
        },
        axisLabel: {
          formatter: "{value}"
        }
      }, {
        type: "value",
        // name: "百分比",
        min: 0,
        max: 200,
        interval: 20,
        axisLabel: {
          formatter: "{value} %"
        }
      }];
    },
    genHabitSeries() {
      return [{
        name: this.$store.state.contrast.params.carArr[0],
        type: "bar",
        data: this.habitData.map(v => {
          return v.app_ratio;
        }),
        tooltip: {
          formatter: "{b}: {c}%"
        },
        label: {
          normal: {
            show: true,
            position: "right",
            formatter: "{c}%"
          }
        },
        xAxisIndex: 1
      }, {
        name: "全国",
        type: "bar",
        data: this.habitData.map(v => {
          return v.all_ratio;
        }),
        tooltip: {
          formatter: "全国: {c}%"
        },
        label: {
          normal: {
            show: true,
            position: "right",
            formatter: "{c}%"
              // color: "#fff"
          }
        },
        itemStyle: {
          normal: {
            color: "#909399"
          }
        },
        xAxisIndex: 1
      }, {
        name: "TGI",
        type: "line",
        data: this.habitData.map(v => {
          return v.tgi;
        }),
        lineStyle: {
          normal: {
            color: "#37a2da"
          }
        },
        markLine: {
          label: {
            normal: {
              position: "start",
              formatter: ""
                // formatter: "{c}\nTGI"
            }
          },
          symbolSize: 6,
          lineStyle: {
            normal: {
              color: "red"
            }
          },
          data: [{
            name: "TGI",
            xAxis: 100
          }]
        },
        label: {
          normal: {
            show: true,
            position: "right",
            color: "#37a2da"
          }
        }
      }];
    }
  }
};
export default habitMixin;
