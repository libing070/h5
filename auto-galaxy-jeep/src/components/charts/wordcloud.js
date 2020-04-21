// 词云混入对象
// P是证明，N是负面

let wordcloudMixin = {
  methods: {
    generateKoubeiTitleP() {
      if (this.popStatus || this.status) {
        let _text
        if (localStorage.lang === 'ch') {
          _text = `${this.koubeiData.name}口碑满意点词云`
        } else {
          _text = `Satisfying Words Cloud of ${this.koubeiData.name}`
        }
        return {
          text: _text,
          top: 20,
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
    },
    generateKoubeiTitleN() {
      if (this.popStatus || this.status) {
        let _text
        if (localStorage.lang === 'ch') {
          _text = `${this.koubeiData.name}口碑不满意点词云`
        } else {
          _text = `Unsatisfying Words Cloud of ${this.koubeiData.name}`
        }
        return {
          text: _text,
          top: 20,
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

    },
    generateWordCloudP() {
      return [{
        name: '正面',
        type: 'wordCloud',
        width: '90%',
        height: '75%',
        shape: 'diamond',
        rotationRange: [-45, 90],
        sizeRange: [12, 50],
        data: this.koubeiData.positive
      }]
    },
    generateWordCloudN() {
      return [{
        name: '负面',
        type: 'wordCloud',
        width: '90%',
        height: '75%',
        shape: 'diamond',
        rotationRange: [-45, 90],
        sizeRange: [12, 50],
        data: this.koubeiData.negative
      }]
    },
    generateWordCloudToolboxP() {
      if (this.popStatus) {
        return {
          top: "-5",
          right: "2%",
          feature: {
            saveAsImage: {
              title: this.$i18n.t('m.chart.save[0]')
            },
            mydataSaveBtn: {
              show: true,
              title: this.$i18n.t('m.chart.save[1]'),
              icon: "path://M915.348 6.932h-807.85C51.402 6.932 6.519 51.814 6.519 107.911v807.848c0 56.103 44.884 100.981 100.979 100.981h807.85c56.101 0 100.981-44.879 100.981-100.981V107.911c0-56.097-44.881-100.979-100.981-100.979zM230.921 63.033h561.006v336.602c0 33.662-28.048 56.102-56.102 56.102H287.022c-33.662 0-56.102-28.052-56.102-56.102V63.033z m729.307 847.119c0 28.048-22.437 50.487-50.49 50.487H113.109c-28.05 0-50.489-22.439-50.489-50.487V113.523c0-28.051 22.439-50.49 50.489-50.49h61.71v336.602c0 61.712 50.489 112.203 112.203 112.203h448.803c61.709 0 112.198-50.491 112.198-112.203V63.033h61.714c28.054 0 50.49 22.439 50.49 50.49v796.629z m0 0",
              onclick: () => {
                this.downloadWCData(this.koubeiData.id, 'positive');
              }
            },
            restore: {
              title: this.$i18n.t('m.chart.save[2]')
            }
          }
        }
      }

    },
    generateWordCloudToolboxN() {
      if (this.popStatus) {
        return {
          top: "-5",
          right: "2%",
          feature: {
            saveAsImage: {
              title: this.$i18n.t('m.chart.save[0]')
            },
            mydataSaveBtn: {
              show: true,
              title: this.$i18n.t('m.chart.save[1]'),
              icon: "path://M915.348 6.932h-807.85C51.402 6.932 6.519 51.814 6.519 107.911v807.848c0 56.103 44.884 100.981 100.979 100.981h807.85c56.101 0 100.981-44.879 100.981-100.981V107.911c0-56.097-44.881-100.979-100.981-100.979zM230.921 63.033h561.006v336.602c0 33.662-28.048 56.102-56.102 56.102H287.022c-33.662 0-56.102-28.052-56.102-56.102V63.033z m729.307 847.119c0 28.048-22.437 50.487-50.49 50.487H113.109c-28.05 0-50.489-22.439-50.489-50.487V113.523c0-28.051 22.439-50.49 50.489-50.49h61.71v336.602c0 61.712 50.489 112.203 112.203 112.203h448.803c61.709 0 112.198-50.491 112.198-112.203V63.033h61.714c28.054 0 50.49 22.439 50.49 50.49v796.629z m0 0",
              onclick: () => {
                this.downloadWCData(this.koubeiData.id, 'negative');
              }
            },
            restore: {
              title: this.$i18n.t('m.chart.save[2]')
            }
          }
        }
      }

    }
  }
}

export default wordcloudMixin
