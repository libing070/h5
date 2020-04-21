/*
  生成请求参数中的日期字段
  使用方法：
  import * as libs from '@/utils/libs.js'
  libs.queryDateParam()
*/

import moment from 'moment'

let queryDateParam = () => {
  let isFirstHalfDayOfMonth = new Date().getDate() === 1 && new Date().getHours() < 20 ? true : false
  let year = new Date().getFullYear()
  let lastMonth = new Date().getMonth()
  let nowMonth = new Date().getMonth() + 1

  // 如果是每个月的1号晚上8点前
  if (isFirstHalfDayOfMonth) {
    if (nowMonth === 1) {
      return year - 1 + '-11'
    } else if (nowMonth === 2) {
      return year - 1 + '-12'
    } else {
      return year + '-' + (lastMonth - 1 < 10 ? '0' + (lastMonth - 1) : lastMonth - 1)
    }
  } else {
    if (nowMonth === 1) {
      return year - 1 + '-12'
    } else {
      return year + '-' + (lastMonth < 10 ? '0' + lastMonth : lastMonth)
    }
  }
}

let genDefaultRangeDate = () => {
  let start = moment().subtract(1, 'months').format('YYYY-MM')
  let end = moment().subtract(1, 'months').format('YYYY-MM')
  return start + ',' + end
}

let insertStr = (soure, start, newStr) => {
  return soure.slice(0, start) + newStr + soure.slice(start)
}

export {
  queryDateParam,
  genDefaultRangeDate,
  insertStr
}
