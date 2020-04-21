<template>
  <div class="case-wrap">
    <header>
      <el-row>
        <el-col :span="6">
          <router-link to="/dimensions">
            <span class="go-back">
              <i class="el-icon-arrow-left"></i>
            </span>
            <span>{{$t('m.case.back')}}</span>
          </router-link>
        </el-col>
      </el-row>
      <div data-v-2b7674f7 class="issue">
        <span data-v-2b7674f7 class="icon"></span>
        <span data-v-2b7674f7 class="title">{{$t('m.dimension.note')}}</span>
      </div>
    </header>
    <section>
      <img v-for="n in 29" :key="n" :src="`../../../static/case/幻灯片${n}.GIF`">
    </section>
    <go-top></go-top>
  </div>
</template>
<script>
import GoTop from "../common/GoTop";
export default {
  name: "dimensions",
  data() {
    return {};
  },
  components: {
    GoTop
  }
};
</script>
<style lang="less" scoped>
header {
  background: #f3f3f3;
  padding: 15px 67px;
}
section {
  padding: 15px 67px;
  img {
    width: 100%;
    border: 1px solid #ccc;
    margin-bottom: 15px;
  }
}
.case-wrap {
  a {
    font-size: 20px;
    text-decoration: none;
    color: #000;
    margin-bottom: 20px;
  }
  .go-back {
    background: #000;
    padding: 2px 8px;
    display: inline-block;
    margin-right: 5px;
    line-height: 30px;
    i {
      color: #fff;
    }
  }
}
.issue[data-v-2b7674f7] {
  margin: 20px 0px;
  height: 100px;
  background: #f9bd00;
  overflow: hidden;
  zoom: 1;
}
.issue .icon[data-v-2b7674f7] {
  width: 90px;
  height: 100px;
  line-height: 60px;
  display: inline-block;
  font-size: 40px;
  text-align: center;
  float: left;
  background: transparent
    url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAABECAYAAAAlba0pAAABjklEQVRoge2Y0U3DMBBAXxD/dISO0A3oBpQNMgIjlAkyAozQTgAbhA1oJ2g3CB9VQnJJ1SDOts66J/nDinXnV6e+2AXQkCl3qScQkqzl7kW/SDILXbq/WdYr53JWcTmruJxVXM4qLmcVl7OKy1nF5ayStZy8ZtBmCWyAR2Ahnu2BHXAIOYGm17RYAG8i9rVWMRb/DwMfbbkV8M08sbbV6Al2cQuGUhq3XzUXwT7vwLHXf5oYswOeFfI3sqO1cqWId2Is0bJlvILXxv6FYK9lJeJVN8bXYvxWYQ5dPO1SIH/54+SoX/bK+Qdol4Iv0f+8Mf5BOf+IEKVgLnJX3SjEDFoK5lKK3Cd0ykFyuSUXmX7uF6XYSeWmivyHYvxkcivGK6b5dQKJ5EqRK4QYJJCb+ogOIQYJ5GKJyVxJ5NYxcmV9Enc5q4S+Q2l5Ff1DjKQhTuKp6Xyyfi1jyK2JWwo6fOWsEmO3PDO+bjhHyOu7pVlcziouZxWXs4rLWcXlrOJyVnE5q8jzXFZkvXJZy/0ACPG9TO7jIDcAAAAASUVORK5CYII=)
    center center no-repeat;
}
.issue .title[data-v-2b7674f7] {
  font-size: 30px;
  height: 100px;
  line-height: 100px;
  overflow: hidden;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  width: 60%;
}
</style>

