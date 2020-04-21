<template>
  <div class="dimension-wrap">
    <h3>{{$t('m.dimension.depart')}}</h3>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="item">
          <h3>{{$t('m.dimension.depart1')}}</h3>
          <ol>
            <li>{{$t('m.dimension.list11')}}</li>
            <li class="active">
              <router-link to="/galaxy">{{$t('m.dimension.list112')}}</router-link>
            </li>
            <li>{{$t('m.dimension.list12')}}</li>
            <li>{{$t('m.dimension.list13')}}</li>
            <li class="active">
              <router-link to="/galaxy?target=koubei">{{$t('m.dimension.list14')}}</router-link>
            </li>
            <li>{{$t('m.dimension.list15')}}</li>
            <li class="active">
              <router-link to="/galaxy?target=rcr">{{$t('m.dimension.list16')}}</router-link>
            </li>
            <li class="active">
              <router-link to="/galaxy?target=purpose">{{$t('m.dimension.list17')}}</router-link>
            </li>
            <li>{{$t('m.dimension.list18')}}</li>
          </ol>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="item">
          <h3>{{$t('m.dimension.depart2')}}</h3>
          <ol>
            <li class="active">
              <router-link to="/galaxy?target=profile">{{$t('m.dimension.list21')}}</router-link>
            </li>
            <li class="active">
              <router-link to="/galaxy?target=habit">{{$t('m.dimension.list22')}}</router-link>
            </li>
            <li class="active">
              <router-link to="/galaxy?target=profile">{{$t('m.dimension.list23')}}</router-link>
            </li>
            <li>{{$t('m.dimension.list24')}}</li>
            <li>{{$t('m.dimension.list25')}}</li>
            <li>{{$t('m.dimension.list26')}}</li>
          </ol>
        </div>
      </el-col>
    </el-row>
    <router-link to="/case" class="case-btn">
      <span>{{$t('m.dimension.btn')}}</span>
      <br />
      <span>({{$t('m.dimension.note')}})</span>
      <i class="el-icon-arrow-right"></i>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "dimensions",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.dimension-wrap {
  padding: 0 50px;
  h3 {
    background: #000;
    padding: 8px;
    color: #fff;
    font-size: 18px;
    text-align-last: center;
    letter-spacing: 1px;
    margin-bottom: 0;
  }
  .case-btn {
    color: #000;
    font-size: 18px;
    width: 190px;
    display: block;
    text-align: center;
    background: #f9bd00;
    padding: 7px 15px 7px 0;
    position: fixed;
    bottom: 30px;
    right: 50px;
    line-height: 1.2;
    box-shadow: 4px 4px 0 #ccc;
    transition: all 0.4s;
    &:hover {
      box-shadow: none;
    }
    span {
      display: inline-block;
    }
    span:nth-child(1) {
      font-size: 16px;
    }
    span:nth-child(3) {
      font-size: 14px;
    }
    i {
      position: absolute;
      right: 6px;
      top: 13px;
      font-size: 30px;
      color: #000;
    }
  }
}
.item {
  h3 {
    background: #f3f3f3;
    padding: 8px;
    color: #000;
  }
  ol {
    background: #f3f3f3;
    font-size: 16px;
    padding: 20px 10px 5px 60px;
    ul {
      padding: 0;
      list-style: none;
    }
    li {
      // font-family: "Microsoft Yahei";
      margin-bottom: 15px;
      color: #8a8a8a;
      a {
        color: #000;
        text-decoration: none;
        // font-weight: bold;
        &:hover {
          border-bottom: 2px solid #f9bd00;
        }
      }
      &.active {
        color: #000;
      }
    }
  }
}
</style>

