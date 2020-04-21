<template>
  <div class="in-wrap overwrite-class">
    <el-row>
      <el-col :span="9">
        <h6>{{$t('m.right.panel8')}}：</h6>
      </el-col>
    </el-row>

    <div class="res-wrap device-type-wrap">
      <el-checkbox-group v-model="end" size="mini" @change="handleDimSel">
        <el-checkbox v-for="(val,key) in list" :label="val" :key="key" class="ch">{{val}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
import * as types from "@/store/mutation-types.js";

export default {
  name: "endsel",
  data() {
    return {
      end: ["app"],
      list: ["app", "wap", "pc"]
    };
  },
  computed: {
    isClearAll: function() {
      return this.$store.state.contrast.isClearAll;
    }
  },
  methods: {
    handleDimSel(v) {
      this.$store.commit(types.HANDLE_END_CHANGE, v);
    }
  },
  watch: {
    isClearAll() {
      this.end = [];
      this.handleDimSel([]);
    }
  }
};
</script>
<style scoped lang="less">
.in-wrap {
  background: #eff2f7;
  padding: 5px;
  min-height: 33.3%;
  overflow: auto;
  box-sizing: border-box;
}
h6 {
  font-weight: 100;
  margin: 3px auto 10px;
  color: #000;
  font-weight: 500;
}
.res-wrap {
  margin-top: 6px;
  margin-left: 3em;
  text-align: left;
}

@media screen and (max-width: 1400px) {
  .res-wrap.device-type-wrap {
    margin-top: 0px;
    margin-left: 0;
  }
}
</style>
