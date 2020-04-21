import Mock from 'mockjs'
if (process.env.NODE_ENV === 'development') {
  Mock.mock(/assembly/, function() {
    const arr = [
      '后排座位',
      '后座椅头枕',
      '后座椅头枕',
      '车载冰箱',
      '卡带',
      '中控台液晶屏',
      'CD碟',
      '中央置物盒',
      '中控门锁',
      '儿童锁',
      '儿童安全座椅固定装置',
      '时钟',
      '衣物挂钩',
      '行车电脑',
      '行李厢盖',
      '副驾驶座椅'
    ]

    let data = arr.map((v, i) => {
      return {
        name: v,
        leads_rate: (Math.random() * 100).toFixed(2),
        rcr: (Math.random() * 100).toFixed(2)
      }
    })
    return {
      data: data,
      status: 1
    }
  })
}
