// 散点图混入对象
let scatterMixin = {
  methods: {
    // 生成散点图series数据
    generateScatterSeries() {
      // 配置标注线
      let markLine = {
        animation: false,
        label: {
          normal: {
            position: 'end',
            color: '#888',
            fontSize: 18,
            opacity: 0.5
          }
        },
        lineStyle: {
          normal: {
            type: 'dashed',
            color: '#aaa'
          }
        },
        data: [
          // 三个区的文字，以前的需求，现在不需要了
          // [
          //   {
          //     coord: [40, 75],
          //     symbol: 'none',
          //     lineStyle: { normal: { opacity: 0 } },
          //     label: {
          //       normal: {
          //         formatter: '期望配置区',
          //         textStyle: { color: '#aaa' },
          //         position: 'end'
          //       }
          //     },
          //     tooltip: { show: false, formatter: '期望配置区' }
          //   },
          //   { coord: [40, 75], symbol: 'none' }
          // ],
          // [
          //   {
          //     coord: [25, 25],
          //     symbol: 'none',
          //     lineStyle: { normal: { opacity: 0 } },
          //     label: {
          //       normal: {
          //         formatter: '弱影响配置',
          //         textStyle: { color: '#aaa' },
          //         position: 'end'
          //       }
          //     },
          //     tooltip: { show: false, formatter: '弱影响配置' }
          //   },
          //   { coord: [25, 25], symbol: 'none' }
          // ],
          // [
          //   {
          //     coord: [80, 25],
          //     symbol: 'none',
          //     lineStyle: { normal: { opacity: 0 } },
          //     label: {
          //       normal: {
          //         formatter: '基础配置区',
          //         textStyle: { color: '#aaa' },
          //         position: 'end'
          //       }
          //     },
          //     tooltip: { show: false, formatter: '基础配置区' }
          //   },
          //   { coord: [80, 25], symbol: 'none' }
          // ],
          // 以下是三条线
          // 水平线
          [{
            coord: [0, 50],
            symbol: 'none',
            tooltip: {
              show: false
            }
          }, {
            coord: [100, 50],
            symbol: 'none'
          }],
          // 垂直线
          [{
            coord: [50, 0],
            symbol: 'none',
            tooltip: {
              show: false
            }
          }, {
            coord: [50, 100],
            symbol: 'none'
          }]
          // 去掉斜线
          // [
          //   { coord: [50, 50], symbol: 'none', tooltip: { show: false } },
          //   { coord: [100, 100], symbol: 'none' }
          // ]
        ]
      }
      let seriesArr = this.scatterData.map((item, index) => {
        return {
          name: item.name,
          type: 'scatter',
          symbolSize: 8,
          large: true,
          label: {
            normal: {
              show: this.popStatus || this.status ? true : false,
              formatter: function(param) {
                return param.data[2]
              },
              position: 'top',
              backgroundColor: '#fff'
            }
          },
          markLine: markLine,
          zlevel: 10,
          data: [
            [item.assembly_rate, item.leads_rate, item.name]
          ],
          tooltip: {
            formatter: function(params) {
              let lr = localStorage.lang === 'ch' ? '留资率：' : 'Leads Rate：'
              let ar = localStorage.lang === 'ch' ? '装配率：' : 'Assembly Rate：'
              return (
                params.seriesName +
                '<br/>' +
                lr +
                params.data[1].toFixed(2) +
                '%' +
                '<br/>' +
                ar +
                params.data[0].toFixed(2) +
                '%'
              )
            }
          }
        }
      })
      return seriesArr
    },

    // 生成散点图图例
    generateScatterLegend() {
      // 弹出或者是全屏的时候生成图例
      if (this.popStatus || this.status) {
        let legendArr = this.scatterData.map((item, index) => {
          return item.name
        })
        return {
          type: 'scroll',
          orient: 'vertical',
          itemWidth: 14,
          itemGap: 5,
          padding: [10, 5],
          left: '78.5%',
          top: '16%',
          backgroundColor: '#fff',
          zlevel: 10,
          bottom: 12,
          data: legendArr
        }
      }
    },

    // X轴配置
    generateScatterXAxis() {
      return {
        name: localStorage.lang === 'ch' ? '装配率' : 'Assembly Rate',
        nameLocation: 'end',
        nameGap: -30,
        nameTextStyle: {
          padding: [70, 0, 0, 0]
        },
        min: 0,
        max: 100,
        interval: 10,
        splitLine: {
          lineStyle: {
            opacity: 0.4
          },
          interval: 3
        },
        axisLabel: {
          formatter: '{value} %'
        }
      }
    },

    // Y轴配置
    generateScatterYAxis() {
      return {
        name: localStorage.lang === 'ch' ? '留资率' : 'Leads Rate',
        nameTextStyle: {
          padding: [0, 40, 0, 0]
        },
        min: 0,
        max: 100,
        interval: 10,
        splitLine: {
          lineStyle: {
            opacity: 0.4
          },
          interval: 3
        },
        axisLabel: {
          formatter: '{value} %'
        }
      }
    },
    generateScatterGrid() {
      return {
        top: this.status || this.popStatus ? '18%' : '2%',
        left: '1%',
        right: this.status || this.popStatus ? '23%' : '5%',
        bottom: this.status || this.popStatus ? '4%' : '0%',
        containLabel: true
      }
    }
  }
}

export default scatterMixin
