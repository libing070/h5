<template>
  <div class="in-wrap overwrite-class">
    <el-row>
      <el-col :span="9">
        <h6>{{$t('m.right.panel3')}}：</h6>
      </el-col>
    </el-row>

    <div class="res-wrap device-type-wrap">
      <!-- <el-checkbox-group v-model="dimension" size="mini" @change="handleDimSel" v-if="$i18n.locale === 'en'">
        <el-checkbox v-for="(val,key) in obj" :label="key" :key="key" v-if="!(key == 4)" class="en">{{val}}</el-checkbox>
      </el-checkbox-group> -->
      <el-checkbox-group v-model="dimension" size="mini" @change="handleDimSel">
        <el-checkbox v-for="(val,key) in obj" :label="key" :key="key" v-if="!(key == 4)" class="ch">{{val}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>
<script>
import * as types from "@/store/mutation-types.js";

export default {
  name: "dimensions",
  data() {
    return {
      dimension: [],
      obj: {}
    };
  },
  computed: {
    isClearAll: function() {
      return this.$store.state.contrast.isClearAll;
    }
  },
  mounted() {
    this.$axios.get("/v2/api/dimvalue").then(res => {
      if (this.$i18n.locale === "ch") {
        this.obj = res.data;
      } else {
        let _data = res.data;
        _data["6"] = "Interests & Hobbies";
        this.obj = _data;
      }
    });
  },
  methods: {
    handleDimSel(v) {
      this.$store.commit(types.HANDLE_DIMENSION_CHANGE, v);
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
el-checkbox-group {
  display: flex;
}
.el-checkbox {
  // width: 25%;
  margin-left: 0px;
  margin-right: 23px;
}
.el-checkbox-group label.en {
  // margin-left: 30px;
  // display: block;
}
// .el-checkbox:nth-child(1) {
//   margin-left: 0px;
// }
// .el-checkbox:nth-child(4) {
//   margin-left: 0px;
// }

@media screen and (max-width: 1400px) {
  .res-wrap.device-type-wrap {
    margin-top: 0px;
    margin-left: 0;
  }
}
</style>
