<template>
  <div class="in-wrap">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="8">
        <h6>地域选择：</h6>
      </el-col>
    </el-row>

    <div class="date-bottom-wrap">
      <!-- 省份单选 -->
      <!-- <template v-if="isHeatmap">
        <el-select v-model="province" @change="setProvince" size="mini" style="width:47%">
          <el-option value="全国">全国</el-option>
          <el-option v-for="group in heatmapList" :disabled="group.disabled" :key="group.regionName" :value="group.regionName"
            :label="group.regionName">
          </el-option>
        </el-select>
      </template>-->
      <template>
        <el-select v-model="province" @change="setProvince" size="mini" style="width:47%" v-if="langType === 'ch'">
          <el-option value="全国">全国</el-option>
          <el-option v-for="group in list" :key="group.regionName" :value="group.regionName" :label="group.regionName"></el-option>
        </el-select>
        <el-select v-model="province" @change="setProvince" size="mini" style="width:47%" v-if="langType === 'en'">
          <el-option value="All">All</el-option>
          <el-option v-for="group in list" :key="group.cityPinYin" :value="group.cityPinYin" :label="group.cityPinYin"></el-option>
        </el-select>
      </template>
    </div>
  </div>
</template>

<script>
import * as types from "@/store/mutation-types.js";
import PDATA from "@/assets/json/province.js";
export default {
  name: "areasingle",
  data() {
    return {
      province: this.$i18n.locale === "ch" ? "全国" : "All",
      list: PDATA
      // heatmapList: []
    };
  },
  created() {
    // this.mapList();
  },
  components: {},
  mounted() {
    this.setProvince(this.province);
  },
  computed: {
    // isHeatmap() {
    //   if (this.$store.state.contrast.yAxis === "heatmap") {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
    langType() {
      return this.$i18n.locale;
    },
    yAxis() {
      return this.$store.state.contrast.yAxis;
    }
  },
  methods: {
    // mapList() {
    //   let list = PDATA;
    //   list.forEach(item => {
    //     if (item.regionName === '北京市' || item.regionName === '上海市' || item.regionName === '广东省') {

    //     } else {
    //       this.$set(item, 'disabled', true);
    //     }
    //   });
    //   this.heatmapList = list;
    // },
    setProvince(v) {
      this.$store.commit(types.SET_AREA_SINGLE, v);
    }
  }
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
