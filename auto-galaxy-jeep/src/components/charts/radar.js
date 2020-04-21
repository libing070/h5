// 雷达图混入对象
let radarMixin = {
  methods: {
    // 生成雷达图横坐标
    generateIndicator() {
      let maxArr = this.data.series.map((obj, i) => {
        return Math.max.apply(null, obj.data)
      })
      let maxNum = Math.max.apply(null, maxArr) || 100000
      let indicatorArr = this.data.x.map((str, i) => {
        return {
          name: str,
          max: maxNum
        }
      })
      return indicatorArr
    },

    // 生成雷达图主体数据
    generateRadarSeries() {
      let seriesArr = this.data.series.map((item, index) => {
        return {
          name: item.name,
          value: item.data
        }
      })
      return seriesArr
    }
  }
}

export default radarMixin
