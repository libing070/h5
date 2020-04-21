import Mock from "mockjs";
let debug = 0;
if (debug) {
  Mock.mock(/getAccounts/, {
    code: 0,
    status: true,
    msg: "",
    "data|10": [{
      username: "@integer(1000000000,2000000000)",
      password: "@integer(1000000,2000000)",
      name: "@name",
      department: "@csentence(5)",
      email: "@email"
    }]
  });
}
