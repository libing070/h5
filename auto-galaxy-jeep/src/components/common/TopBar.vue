<!-- 顶部导航组件 -->
<!-- 使用说明：<top-bar></top-bar> -->
<template>
  <div id="topbar-wrap">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col :span="4" class="left-logo">
        <img
          src="data:image/png;base64,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"
        >
      </el-col>
      <el-col :span="10" class="tabs">
        <router-link to="/dimensions" style="font-family:'Microsoft Yahei'">{{$t('m.topbar.menu1')}}</router-link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <!-- 注释掉洞察工具菜单选项 -->
        <!-- <router-link to="/galaxy" style="font-family:'Microsoft Yahei'">{{$t('m.topbar.menu2')}}</router-link>&nbsp;&nbsp;&nbsp;&nbsp; -->
        <router-link to="/account" style="font-family:'Microsoft Yahei'" v-if="isSuper">{{$t('m.topbar.menu3')}}</router-link>
      </el-col>
      <el-col :span="10">
        <el-row type="flex" class="row-right" justify="end" style="margin-right:-15px">
          <el-col :span="6">
            <a class="animated fadeIn">{{user}}</a>
          </el-col>
          <el-col :span="3">
            <span :class="{lang:true, active:curLang === 'ch'}" data-type="ch" @click="toggleLang">中文</span>
          </el-col>
          <el-col :span="3">
            <span :class="{lang:true, active:curLang === 'en'}" data-type="en" @click="toggleLang">EN</span>
          </el-col>
          <el-col :span="3">
            <i class="fa fa-sign-out logout" @click.prevent="logout"></i>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as types from "../../store/mutation-types";
export default {
  name: "topbar",
  data() {
    return {
      user: localStorage.name || "",
      isSuper: JSON.parse(localStorage.isSuperAdmin) || false
    };
  },
  computed: {
    curLang() {
      return this.$i18n.locale;
    }
  },
  methods: {
    toggleLang(e) {
      this.$i18n.locale = e.target.dataset.type;
      localStorage.lang = e.target.dataset.type;
      this.$router.go(0);
    },
    logout() {
      localStorage.setItem("hasLogin", false);
      this.$store.commit(types.CHANGE_GLOBAL_STATE, false);
      this.$router.push("/sign-in");
    }
  },
  watch: {
    $route(to, from) {
      this.pathName = this.$route.path.substring(1);
      this.nowPath = this.$route.path;
    }
  }
};
</script>
<style scoped lang="less">
.left-logo {
  display: inline-flex;
  align-items: center;
  span {
    font-style: italic;
    color: #fff;
  }
  span:nth-child(1) {
    font-size: 32px;
    font-weight: bold;
    padding-right: 10px;
    letter-spacing: 2px;
  }
  span:nth-child(2) {
    margin-bottom: -10px;
  }
}
#topbar-wrap {
  height: 88px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  background: #000;
  color: #fff;
  padding: 0 50px;
  z-index: 4;
  box-sizing: border-box;
  font-size: 18px;

  & > div {
    height: 88px;
  }
  a {
    line-height: 60px;
    color: #fff;
    text-decoration: none;
  }
  span {
    line-height: 60px;
  }
  .tabs a {
    display: inline-block;
    padding: 0 8px 25px 8px;
    margin-top: 22px;
    line-height: 0;
    // font-family: calibri, 'Microsoft Yahei' !important;
  }
  .tabs .router-link-active {
    border-bottom: 4px solid #f9bd00;
  }
  i {
    font-size: 20px;
    line-height: 60px;
    transition: all 0.5s;
    &:hover {
      cursor: pointer;
    }
  }
  .fa-language:hover {
    transform: rotateY(180deg);
  }
  .logout {
    text-decoration: none;
    &:hover {
      color: #f9bd00;
    }
  }
}
.row-right > div {
  text-align: center;
}
.lang:hover,
.lang.active {
  color: #f9bd00;
  cursor: pointer;
}
</style>
