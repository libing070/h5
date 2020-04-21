<template>
  <div class="in-wrap overwrite-class">
    <el-row>
      <el-col :span="10">
        <h6>{{$t('m.right.panel6')}}：</h6>
      </el-col>
    </el-row>

    <div class="res-wrap device-type-wrap">
      <el-checkbox-group v-model="price" size="mini" @change="handleDimSel">
        <el-checkbox v-for="(val,key) in range" :label="key-1" :key="key">{{val}}</el-checkbox>
      </el-checkbox-group>
      <el-checkbox :label="$t('m.right.labels[0]')" class="custom" v-model="isCustom" @change="toggleRangeType"></el-checkbox>
      <span v-show="isCustom">
        <el-input size="mini" v-model="minPrice" style="width:20%" @change="getCustomRange"></el-input>-
        <el-input size="mini" v-model="maxPrice" style="width:20%" @change="getCustomRange"></el-input>
        <span style="font-size:12px">{{$t('m.right.labels[1]')}}</span>
      </span>
    </div>
  </div>
</template>
<script>
import * as types from "@/store/mutation-types.js";
import "@/mock/pricevalue.js";

export default {
  name: "pricevalue",
  data() {
    return {
      isCustom: false,
      isCh: this.$i18n.locale === "ch",
      minPrice: "",
      maxPrice: "",
      price: [],
      range: {
        1: this.isCh ? "5万以下" : "<=50K",
        2: this.isCh ? "5-8万" : "50-80K",
        3: this.isCh ? "8-12万" : "80-120K",
        4: this.isCh ? "12-18万" : "120-180K",
        5: this.isCh ? "18-25万" : "180-250K",
        6: this.isCh ? "25-40万" : "250-400K",
        7: this.isCh ? "40-80万" : "400-800K",
        8: this.isCh ? "80万以上" : ">=800K"
      }
    };
  },
  computed: {
    isClearAll: function() {
      return this.$store.state.contrast.isClearAll;
    }
  },
  // mounted() {
  //   this.$axios.get("/v2/api/pricevalue").then(res => {
  //     this.range = res.data.data;
  //   });
  // },
  methods: {
    handleDimSel(v) {
      this.isCustom = false;
      this.minPrice = "";
      this.maxPrice = "";
      const map = new Map([
        [0, [0, 5]],
        [1, [5, 8]],
        [2, [8, 12]],
        [3, [12, 18]],
        [4, [18, 25]],
        [5, [25, 40]],
        [6, [40, 80]],
        [7, [80]]
      ]);
      let _arr = [];
      v.forEach((vv, ii) => {
        _arr.push(map.get(Number(vv)));
      });
      this.$store.commit(types.SET_PRICE_RANGE, _arr);
    },
    toggleRangeType(v) {
      this.price = [];
      this.$store.commit(types.SET_PRICE_RANGE, []);
    },
    getCustomRange() {
      if (Number(this.minPrice) >= 0 && Number(this.maxPrice) > 0) {
        if (Number(this.minPrice) < Number(this.maxPrice)) {
          let customRangeArr;
          if (this.$i18n.locale === "ch") {
            customRangeArr = [[Number(this.minPrice), Number(this.maxPrice)]];
          } else {
            customRangeArr = [
              [Number(this.minPrice) / 10, Number(this.maxPrice) / 10]
            ];
          }
          this.$store.commit(types.SET_PRICE_RANGE, customRangeArr);
        }
      }
    }
  },
  watch: {
    isClearAll() {
      this.price = [];
      this.handleDimSel([]);
    }
  }
};
</script>
<style scoped lang="less">
.in-wrap {
  background: #eff2f7;
  padding: 5px;
  height: 170px;
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
.el-checkbox:nth-child(1) {
  margin-left: 0px;
}
.el-checkbox:nth-child(4) {
  margin-left: 0px;
}
.el-checkbox:nth-child(7) {
  margin-left: 0px;
}

.el-checkbox {
  width: 25%;
  margin-left: 20px;
}
.custom {
  margin: 10px 16px 0 0;
}
@media screen and (max-width: 1400px) {
  .res-wrap.device-type-wrap {
    margin-top: 0px;
    margin-left: 1em;
  }
}
</style>
