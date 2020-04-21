// 复合图混入对象
let mixedMixin = {
  methods: {
    genMixedTitle() {
      if (this.status || this.popStatus) {
        let params = this.$store.state.contrast.params;
        return [
          {
            top: "7%",
            left: "15%",
            text: "一级兴趣",
            textStyle: {
              color: "#555",
              fontSize: 14
            }
          },
          {
            top: "7%",
            left: "48%",
            text: "二级兴趣",
            textStyle: {
              color: "#555",
              fontSize: 14
            }
          },
          {
            top: "7%",
            left: "77%",
            text: "三级兴趣（TOP5 APP）",
            textStyle: {
              color: "#555",
              fontSize: 14
            }
          },
          {
            top: "0%",
            left: "center",
            text: `${params.monthsingle} ${params.areasingle} ${params.carArr[0]}潜客人群兴趣偏好`,
            textStyle: {
              color: "#555"
            }
          }
        ];
      } else {
        return {};
      }
    },
    genMixedGrid() {
      return [
        {
          top: "18%",
          left: "8%",
          right: "72%",
          bottom: "3%"
        },
        {
          top: "18%",
          left: "39%",
          right: "37%",
          bottom: "3%"
        },
        {
          top: "18%",
          left: "72%",
          right: "4%",
          bottom: "3%"
        }
      ];
    },
    genMixedTooltip() {
      return {
        formatter: "{b}: {c}%"
      };
    },
    genMixedY() {
      return [
        {
          data: this.mixedData.map(v => {
            return v.level1_name;
          }),
          axisLabel: {
            interval: 0
          },
          gridIndex: 0
        },
        {
          data: this.mixedData[this.levelIndex].children.map(v => {
            return v.level2_name;
          }),
          gridIndex: 1
        },
        {
          data: [
            ...this.mixedData[this.levelIndex].children[this.levelIndex2].children.map(v => {
              return v.appname;
            })
          ],
          gridIndex: 2
        }
      ];
    },
    genMixedX() {
      return [
        {
          position: "top",
          gridIndex: 0
        },
        {
          position: "top",
          gridIndex: 1
        },
        {
          position: "top",
          gridIndex: 2
        }
      ];
    },
    genMixedSeries() {
      return [
        {
          type: "bar",
          data: this.mixedData
            .map(v => {
              return v.level1_percent;
            })
            .sort((a, b) => {
              return a - b;
            }),
          itemStyle: {
            normal: {
              color: params => {
                if (params.dataIndex === this.levelIndex) {
                  return "#c23531";
                } else {
                  return "#336699";
                }
              }
            }
          },
          label: {
            normal: {
              show: true,
              position: "right",
              formatter: "{c}%"
            }
          },
          xAxisIndex: 0,
          yAxisIndex: 0
        },
        {
          type: "bar",
          data: this.mixedData[this.levelIndex].children
            .map(v => {
              return v.level2_percent;
            })
            .sort((a, b) => {
              return a - b;
            }),
          barMaxWidth: 40,
          itemStyle: {
            normal: {
              color: params => {
                if (params.dataIndex === this.levelIndex2) {
                  return "#c23531";
                } else {
                  return "#336699";
                }
              }
            }
          },
          label: {
            normal: {
              show: true,
              position: "right",
              formatter: "{c}%"
            }
          },
          xAxisIndex: 1,
          yAxisIndex: 1
        },
        {
          type: "bar",
          data: [
            ...this.mixedData[this.levelIndex].children[this.levelIndex2].children.map(v => {
              return v.App_percent;
            })
          ].sort((a, b) => {
            return a - b;
          }),
          barMaxWidth: 40,
          label: {
            normal: {
              show: true,
              position: "right",
              formatter: "{c}%"
            }
          },
          xAxisIndex: 2,
          yAxisIndex: 2
        }
      ];
    }
  }
};
export default mixedMixin;
