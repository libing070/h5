<!-- 单选，暂时废弃 -->
<template>
  <div class="in-wrap">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8">
          <h6>类型选择：</h6>
        </el-col>
      </el-row>

      <div class="date-bottom-wrap">
        <!-- 选择图表类型 -->
        <el-radio-group v-model="type" size="mini" class="profile_t" @change="changeType">
          <el-radio-button label="0">三级柱状图</el-radio-button>
          <el-radio-button label="1">TOP20柱状图</el-radio-button>
        </el-radio-group>
      </div>
    </div>
</template>

<script>
import * as types from "@/store/mutation-types.js";
export default {
  name: "typesel",
  data() {
    return {
      type: "0"
    };
  },
  components: {},
  mounted() {},
  computed: {},
  methods: {
    changeType(v) {
      this.$store.commit(types.SET_PREFERENCE_TYPE, v);
    }
  },
  watch: {}
};
</script>

<style scoped lang="less">
.in-wrap {
  background: #eff2f7;
  padding: 5px;
  margin-bottom: 1%;
  height: 32.3%;
  overflow: auto;
  box-sizing: border-box;
}
h6 {
  font-weight: 100;
  margin: 0px;
  margin-top: 3px;
  color: #000;
  font-weight: 500;
}
.el-row {
  margin-bottom: 5px;
}
.res-wrap {
  margin-top: 5px;
  .el-tag {
    margin-right: 4px;
    margin-bottom: 4px;
  }
}
</style>
