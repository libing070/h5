import Mock from 'mockjs'
let debug = 1;
if (debug) {
  Mock.mock(/pricevalue/, {
    code: 0,
    status: true,
    msg: "",
    data: {
      1: "5万以下",
      2: "5-8万",
      3: "8-12万",
      4: "12-18万",
      5: "18-25万",
      6: "25-40万",
      7: "40-80万",
      8: "80万以上",
    }
  })

}
