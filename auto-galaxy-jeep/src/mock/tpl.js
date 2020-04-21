import Mock from 'mockjs'
let debug = 0;
if (debug) {
    Mock.mock(/url/, {
        code: 0,
        status: true,
        msg: "",
        data: {

        }
    })

}
