<template>
  <div>
    <div>
      <!-- 这是顶部导航 -->
      <top-bar></top-bar>
      <!-- 这是组件要插入的地方 -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import TopBar from "./TopBar";
export default {
  name: "layout",
  components: {
    "top-bar": TopBar
  }
};
</script>
<style lang="less" scoped>
h3 {
  margin-top: 0;
  color: #324157;
}

.con-wrap.conCollapse {
  padding-left: 64px;
  transition: all 0.5s;
}
</style>

