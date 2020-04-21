// 气泡图混入对象
let bubbleMixin = {
  methods: {
    // 生成气泡图series数据
    generateBubbleSeries() {
      // 配置标注线
      let markLine = {
        animation: false,
        zlevel: 1,
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
          // 对角线
          [{
            coord: [0, 0],
            symbol: 'none',
            tooltip: {
              show: false
            }
          }, {
            coord: [this.XYmax[2], this.XYmax[2]],
            symbol: 'none'
          }]
        ]
      }
      let seriesArr = this.zfzbData.map((item, index) => {
        return {
          name: item[0].zhongduan,
          type: 'scatter',
          zlevel: 10,
          markLine: markLine,
          symbolSize: data => Math.sqrt(data[2]) / 4,
          itemStyle: {
            normal: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowOffsetY: 5
            }
          },
          label: {
            normal: {
              show: true,
              formatter: param => param.data[3]
                // formatter: param => {
                //   if (param.data[2] > 40000) {
                //     return param.data[3]
                //   } else {
                //     return ''
                //   }
                // },
            }
          },
          data: item.map(obj => [parseFloat(obj.zhengxiangchonghe), parseFloat(obj.nixiangchonghe), obj.xiansuorenshu, obj.jingpinmingcheng, obj.zhongduan]),
          tooltip: {
            formatter: params => {
              let lr = localStorage.lang === 'ch' ? '正向线索重合度：' : '正向线索重合度：'
              let ar = localStorage.lang === 'ch' ? '逆向线索重合度：' : '逆向线索重合度：'
              return (
                '终端类型：' + params.seriesName +
                '<br/>' +
                '竞品名称：' + params.data[3] +
                '<br/>' +
                '线索人数：' + params.data[2] +
                '<br/>' +
                lr +
                params.data[0].toFixed(2) +
                '%' +
                '<br/>' +
                ar +
                params.data[1].toFixed(2) +
                '%'
              )
            }
          }
        }
      })
      return seriesArr;
    },

    // 生成气泡图图例
    generateBubbleLegend() {
      // 弹出或者是全屏的时候生成图例
      if (this.popStatus || this.status) {
        return {
          orient: 'vertical',
          itemGap: 10,
          right: 40,
          top: 'center',
          textStyle: {
            fontSize: 14
          },
          data: this.$store.state.contrast.params.terminal
        }
      }
    },

    // X轴配置
    generateBubbleXAxis() {
      return {
        name: localStorage.lang === 'ch' ? '正向线索重合度' : '正向线索重合度',
        nameLocation: 'end',
        nameGap: -45,
        nameTextStyle: {
          padding: [70, 0, 0, 0]
        },
        min: 0,
        max: this.XYmax[2],
        interval: 1,
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
    generateBubbleYAxis() {
      return {
        name: localStorage.lang === 'ch' ? '逆向线索重合度' : '逆向线索重合度',
        min: 0,
        max: this.XYmax[2],
        interval: 1,
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
    generateBubbleGrid() {
      return {
        top: this.status || this.popStatus ? '12%' : '2%',
        left: '2%',
        right: this.status || this.popStatus ? '120px' : '5%',
        bottom: this.status || this.popStatus ? '5%' : '0%',
        containLabel: true
      }
    },
    generateBubbleTitle() {
      if (this.status || this.popStatus) {
        let p = this.$store.state.contrast.params;
        return {
          text: `${p.monthsingle}，${p.carArr[0]} 在 ${p.terminal.join('、')} 端的竞争格局`,
          top: 30,
          x: "center",
          textStyle: {
            color: "#777",
            width: 100
          }
        }
      }
    }
  }
}

export default bubbleMixin
