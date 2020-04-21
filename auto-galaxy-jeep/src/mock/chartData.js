import Mock from "mockjs";
let debug = 0;
if (debug) {
  Mock.mock(/kyl2in\/api2\/que2ry/, {
    code: 0,
    status: true,
    msg: "",
    data: {
      x: ["2017-01", "2017-02", "2017-03", "2017-04", "2017-05", "2017-06"],
      series: [
        {
          name: "大众",
          data: [120, 132, 101, 134, 90, 230]
        },
        {
          name: "宝马",
          data: [220, 182, 191, 234, 290, 330]
        },
        {
          name: "奔驰",
          data: [150, 232, 201, 154, 190, 330]
        },
        {
          name: "凯迪拉克",
          data: [320, 332, 301, 334, 390, 330]
        }
      ]
    }
  }),
    Mock.mock(/userProfile/, {
      code: 0,
      status: true,
      msg: "",
      data: {
        x: ["A", "B", "C", "D", "E"],
        series: [
          {
            name: "大众",
            data: [["A", 20], ["B", 40], ["C", 10], ["D", 60], ["E", 80]]
          },
          {
            name: "宝马",
            data: [["A", 20], ["B", 40], ["C", 10], ["D", 60], ["E", 80]]
          },
          {
            name: "奔驰",
            data: [["A", 20], ["B", 40], ["C", 10], ["D", 60], ["E", 80]]
          },
          {
            name: "凯迪拉克",
            data: [["A", 20], ["B", 40], ["C", 10], ["D", 60], ["E", 80]]
          }
        ]
      }
    });
}

Mock.mock(/preference/, {
  code: 0,
  status: true,
  msg: "",
  "data|24": [
    {
      name: "@cname",
      value: "@integer(2,18)",
      "children|18": [
        {
          name: "@cname",
          value: "@integer(2,18)",
          "children|5": [
            {
              name: "@cname",
              value: "@integer(2,18)"
            }
          ]
        }
      ]
    }
  ]
});

Mock.mock(/habit/, {
  code: 0,
  status: true,
  msg: "",
  "data|20": [
    {
      name: "@cname",
      ratio: "@integer(10,90)",
      tgi: "@integer(80,200)"
    }
  ]
});
