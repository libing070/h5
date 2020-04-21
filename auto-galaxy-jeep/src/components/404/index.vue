<template>
  <div>
    <div class="wrap">
      <div style="margin-top:-20px;">
        <h1 class="animated swing">404</h1>
        <h4>We're sorry, but the page you were looking for doesn't exist.</h4>
        <el-button
          type="primary"
          icon="el-icon-back"
          @click="$router.go(-1)"
          style="background: rgb(250, 190, 0);
            width: 170px;
            height: 45px;
            line-height: 45px;
            font-size: 18px;
            color: rgb(0, 0, 0);
            text-align: center;
            cursor: pointer;
            border: none;
            border-radius: 0;
            line-height: 47px;
            padding: 0;
            margin-left: -30px;"
        >Come Back</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.wrap {
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  h1 {
    text-align: center;
    font-size: 10em;
    font-family: fantasy;
    // color: #475669;
    letter-spacing: 40px;
    margin: 0;
  }
  h4 {
    color: #666;
    font-size: 22px;
    margin-top: -20px;
  }
}
</style>
