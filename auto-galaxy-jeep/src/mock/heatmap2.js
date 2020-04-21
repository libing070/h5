import Mock from "mockjs";
let debug = 1;
if (debug) {
  Mock.mock(/heatmap/, {
    code: 0,
    status: true,
    msg: "",
    "data|1000": [
      {
        lng: "@float(80,126,2)",
        lat: "@float(20,45,2)",
        count: "@integer(1,100)"
      }
    ]
  });
}
