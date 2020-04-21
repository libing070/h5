// 专门针对装配率的柱状图配置
let assemblyMixin = {
  methods: {
    // 生成折线图和柱状图数据
    generateAssemblyTooltip() {
      if (this.popStatus || this.status) {
        let tooltip_obj = {
          extraCssText: 'max-width:50%;overflow:hidden;word-wrap: break-word;word-break: break-all;white-space: normal;'
        }
        if (this.chartType === 'line' || this.chartType === 'bar') {
          tooltip_obj.trigger = 'axis'
          tooltip_obj.formatter = (params) => {
            var relVal = params[0].name;
            for (var i = 0, l = params.length; i < l; i++) {
              relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value + "%";
            }
            return relVal;
          }
          tooltip_obj.axisPointer = {
            type: 'shadow'
          }
        }
        return tooltip_obj
      }
    },
    generateAssemblySeries() {
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
          data: item.data
        }
      })
      return seriesArr
    }
  }
}

export default assemblyMixin
