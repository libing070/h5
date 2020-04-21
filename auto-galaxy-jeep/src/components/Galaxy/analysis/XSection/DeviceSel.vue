<template>
    <div class="in-wrap overwrite-class">
      <el-row>
        <el-col :span="12">
          <h6>{{$t('m.right.panel4')}}：</h6>
        </el-col>
      </el-row>

      <div class="res-wrap device-type-wrap">
        <el-checkbox-group v-model="device" size="mini" @change="handleDevSel">
          <el-checkbox label="1">{{$t('m.right.config1')}}</el-checkbox>
          <el-checkbox label="2" v-if="isCh">{{$t('m.right.config2')}}</el-checkbox><br/>
          <el-checkbox label="2" v-if="!isCh" style="margin-left:0">{{$t('m.right.config2')}}</el-checkbox><br/>
          <el-checkbox label="3">{{$t('m.right.config3')}}</el-checkbox>
          <el-checkbox label="4" v-if="isCh">{{$t('m.right.config4')}}</el-checkbox>
          <el-checkbox label="4" v-if="!isCh" style="margin-left:0">{{$t('m.right.config4')}}</el-checkbox>
        </el-checkbox-group>
      </div>

    </div>
</template>
<script>
import * as types from "@/store/mutation-types.js";

export default {
  name: "deviceSel",
  data() {
    return {
      device: [],
      isCh: this.$i18n.locale === 'ch'
    };
  },
  computed: {
    isClearAll: function() {
      return this.$store.state.contrast.isClearAll;
    }
  },
  methods: {
    handleDevSel(v) {
      this.$store.commit(types.HANDLE_DEVICE_CHANGE, v);
    }
  },
  watch: {
    device(n, v) {
      let map = {
        "1": this.$i18n.t('m.right.config1'),
        "2": this.$i18n.t('m.right.config2'),
        "3": this.$i18n.t('m.right.config3'),
        "4": this.$i18n.t('m.right.config4')
      };
      let deviceNamesArr = [];
      n.forEach(element => {
        deviceNamesArr.push(map[element]);
      });
      this.$store.commit(types.HANDLE_DEVICE_NAMES_CHANGE, deviceNamesArr);
    },
    isClearAll() {
      this.device = [];
      this.handleDevSel([]);
    }
  }
};
</script>
<style scoped lang="less">
.in-wrap {
  background: #eff2f7;
  margin-bottom: 0.7%;
  padding: 5px;
  // height: 34%;
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
  .res-wrap {
    margin-top: 0px;
    margin-left: 1em;
  }
}
</style>
