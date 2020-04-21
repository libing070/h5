<template>
    <div class="in-wrap overwrite-class">
      <el-row>
        <el-col :span="5">
          <h6>{{$t('m.right.panel5')}}：</h6>
        </el-col>
      </el-row>

      <div class="res-wrap device-type-wrap">
        <el-checkbox-group v-model="year" @change="changeYear" :min="1">
          <el-checkbox v-for="year in yearArr" :label="year" :key="year">{{year}}</el-checkbox>
        </el-checkbox-group>
      </div>

    </div>
</template>
<script>
import * as types from "@/store/mutation-types.js";

let defaultYearArr = [
  String(new Date().getFullYear() - 2),
  String(new Date().getFullYear() - 1),
  String(new Date().getFullYear())
];
export default {
  name: "caryear",
  data() {
    return {
      year: defaultYearArr,
      yearArr: this.genYearArr()
    };
  },
  computed: {
    isClearAll() {
      return this.$store.state.contrast.isClearAll;
    }
  },
  mounted() {},
  methods: {
    genYearArr() {
      let _date = new Date();
      let _year = _date.getFullYear();
      let _last_year = _year - 1;
      let _last_year2 = _year - 2;
      return [
        `2009-${new Date().getFullYear() - 3}`,
        String(_last_year2),
        String(_last_year),
        String(_year)
      ];
    },
    changeYear(value) {
      this.$store.commit(types.SET_CARYEAR, value);
    }
  },
  watch: {
    // dimension(n, v) {
    //   let map = {
    //     '1': '操控及动力配置',
    //     '2': '主/被动安全配置',
    //     '3': '内部及舒适配置',
    //     '4': '外部及科技配置'
    //   }
    //   let dimensionNamesArr = []
    //   n.forEach(element => {
    //     dimensionNamesArr.push(map[element])
    //   })
    //   this.$store.commit(types.HANDLE_DEVICE_NAMES_CHANGE, deviceNamesArr)
    // },
    isClearAll() {
      this.dimension = [];
      this.handleDimSel([]);
    }
  }
};
</script>
<style scoped lang="less">
.in-wrap {
  background: #eff2f7;
  padding: 5px;
  height: 33.3%;
  overflow: auto;
  box-sizing: border-box;
  margin-bottom: 0.7%;
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
.el-checkbox-group {
  display: inline-block;
  width: 66%;
}
.el-checkbox {
  display: inline;
  width: 25%;
  margin-left: 10px;
}
.el-checkbox__label {
  padding-left: 3px;
}
@media screen and (max-width: 1400px) {
  .res-wrap.device-type-wrap {
    margin-top: 0px;
    margin-left: 1em;
  }
}
</style>
