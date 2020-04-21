/**
 * Created by echaoo on 17/10/31.
 */
// let host = '/Galaxy-1.5'
let host = ''
if (process.env.NODE_ENV === 'development') {
  // host = 'http://galaxy.auto-smart.com'
  // host = 'http://172.20.207.56:8080'
  // host = 'http://124.251.25.16:8888/Nebular_war_exploded'
}

export default {
  /*
   type: [0品牌,1厂商,2车型,3车款]
   id: 1,2,3,4（以逗号分隔）
   date: '2017-01' 至 '2017-06'
   */
  queryCompetition: host + '/car/queryCompetitionServlet',
  getGephiPng: host + '/gephi/getGephiPngServlet',
  queryCar: host + '/car/queryCarServlet',
  heatmap: host + '/gephi/heatmapServlet',
  echartPath: host,
  // downLoadPic: 'http://galaxy.tech.cig.com.cn/Galaxy-1.5/gephi/dwCSV',
  downLoadPic: host + '/gephi/dwCSV',
  validData: host + '/car/queryValidCompetitionServlet',
  getIdentifyingCode: host + '/v2/getIdentifyingCode'
}
