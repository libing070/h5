// 折线图和柱状图混入对象
let linebarMixin = {
  methods: {
    // 生成折线图和柱状图数据
    generateLBSeries() {
      let seriesArr = this.data.series.map((item, index) => {
        return {
          name: item.name,
          type: this.chartType,
          barMaxWidth: '25%',
          label: {
            normal: {
              show: this.popStatus || this.status ? true : false,
              position: 'top'
            }
          },
          data: item.data.map(str => {
            return parseFloat(str)
          })
        }
      })
      return seriesArr
    }
  }
}

export default linebarMixin
