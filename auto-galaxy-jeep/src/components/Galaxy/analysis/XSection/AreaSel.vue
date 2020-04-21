<template>
  <div class="in-wrap">
    <el-row>
      <el-col :span="5">
        <h6>{{$t('m.right.panel7')}}：</h6>
      </el-col>
      <el-col :span="19">
        <!-- 地域类型选择器 -->
        <el-select v-model="areaType" :disabled="yType==='preference'" size="mini" style="width: 31%" @change="areaSel1Update">
          <el-option :label="$t('m.right.types[0]')" value="all"></el-option>
          <el-option :label="$t('m.right.types[1]')" value="province"></el-option>
          <el-option :label="$t('m.right.types[2]')" value="city"></el-option>
          <el-option :label="$t('m.right.types[3]')" value="level" :disabled="!isLeadsRate"></el-option>
          <!-- <el-option label="区域" value="region" disabled></el-option> -->
        </el-select>

        <!-- 如果选择省份，使用支持多选的自定义省份选择器 -->
        <hx-select style="width: 31%" :group="true" v-model="provinceData" v-if="areaType!=='city' && areaType!=='level'" :options="provinceList" @checkAll="checkAll" @change="areaSel2Update" :current-value="resArr" :isDisabled="areaType==='all'|| areaType===''"></hx-select>

        <!-- 如果选择城市级别 -->
        <el-select v-model="levelData" v-if="isLeadsRate && areaType =='level'" @change="chooseLevel" size="mini" ref="levelSel" style="width:32%">
          <el-option v-for="group in levelList" :key="group.id" :value="group.id" :label="group.name"></el-option>
        </el-select>

        <!-- 如果选择城市，省份就使用饿了么组件库的单选选择器 -->
        <el-select v-model="provinceData" v-if="areaType==='city'" @change="areaSel2Update" size="mini" ref="pSel" style="width:32%">
          <el-option-group v-for="group in provinceList" :key="group.label" :label="group.label">
            <el-option v-for="item in group.options" :key="item.regionId" :label="item.regionName" :value="item.regionName"></el-option>
          </el-option-group>
        </el-select>

        <!-- 城市选择器 -->
        <hx-select style="width: 31%" :group="false" v-model="cityData" :options="cityList" @checkAll="checkAll" @change="areaSel3Update" :current-value="resArr" :isDisabled="areaType!=='city'"></hx-select>
      </el-col>
    </el-row>

    <div class="res-wrap">
      <el-tag v-for="(tag,index) in resArr" size="small" :key="index" :closable="true" @close="delTag(index)">{{tag}}</el-tag>
    </div>
  </div>
</template>
<script>
import * as types from "@/store/mutation-types.js";
import PDATACH from "@/assets/json/provinceData.js";
import PDATAEN from "@/assets/json/provinceDataEn.js";
import HxSelect from "../../../common/HxSelect.vue";
export default {
  name: "areaSel",
  data() {
    return {
      areaType: "",
      provinceData: "",
      cityData: "",
      levelData: "",
      provinceList: [],
      cityList: [],
      levelList: [
        {
          id: 0,
          name: this.$i18n.t("m.right.levels[0]")
        },
        {
          id: 1,
          name: this.$i18n.t("m.right.levels[1]")
        },
        {
          id: 2,
          name: this.$i18n.t("m.right.levels[2]")
        },
        {
          id: 3,
          name: this.$i18n.t("m.right.levels[3]")
        },
        {
          id: 4,
          name: this.$i18n.t("m.right.levels[4]")
        },
        {
          id: 5,
          name: this.$i18n.t("m.right.levels[5]")
        }
      ],
      resArr: []
    };
  },
  computed: {
    // 是否是装车率
    isLeadsRate() {
      if (this.$store.state.contrast.yAxis === "rcr") {
        return true;
      } else {
        return false;
      }
    },
    yType() {
      return this.$store.state.contrast.yAxis;
    },
    isClearAll: function() {
      return this.$store.state.contrast.isClearAll;
    },
    PDATA() {
      // 国际化。。。。。吐血
      if (this.$i18n.locale === "ch") {
        return PDATACH;
      } else {
        return PDATAEN;
      }
    }
  },
  methods: {
    // 第一级筛选框：地域类型
    areaSel1Update(v) {
      this.$store.commit(types.CHANGE_AREA1, v);
      this.$store.commit(types.CHANGE_AREA_C, []);
      this.$store.commit(types.CHANGE_AREA_P, []);
      this.resArr = [];
      if (v === "all") {
        this.provinceList = [
          {
            regionName: this.$i18n.t("m.right.types[0]"),
            regionId: "000"
          }
        ];
        this.resArr = [this.$i18n.t("m.right.types[0]")];
      } else if (v === "province") {
        this.provinceList = this.PDATA;
      } else if (v === "city") {
        this.provinceData = "";
        this.provinceList = this.PDATA;
      } else if (v === "level") {
        this.levelData = "";
      }
    },
    // 省份筛选框，动态变化
    areaSel2Update(val) {
      // 如果选择的是省份
      if (this.areaType === "province") {
        // 如果当前项在数组里面找不到一样的，就push到数组
        let result = this.resArr.every((str, i) => {
          return str != val.regionName;
        });
        if (result) {
          this.resArr.push(val.regionName);
        }
      } else {
        // 如果选择的是城市
        // 如果选的是直辖市
        if (/市$/.test(val)) {
          let _arr = [];
          this.PDATA[0].options.forEach(element => {
            if (element.regionName === val) {
              _arr.push(element);
              this.cityList = _arr;
            }
          });
        } else {
          // 如果选的是普通省份
          this.PDATA[1].options.forEach(element => {
            if (element.regionName === val) {
              this.cityList = element.children;
            }
          });
        }
      }
    },
    areaSel3Update(val) {
      let result = this.resArr.every((str, i) => {
        return str != val.regionName;
      });
      if (result) {
        this.resArr.push(val.regionName);
      }
    },
    chooseLevel(val) {
      // 如果当前项在数组里面找不到一样的，就push到数组
      let result = this.resArr.every((str, i) => {
        return str != this.levelList[val].name;
      });
      if (result) {
        this.resArr.push(this.levelList[val].name);
      }
    },
    checkAll() {
      this.resArr = [];
      for (let i in this.provinceList) {
        for (let j in this.provinceList[i]["options"]) {
          this.resArr.push(this.provinceList[i]["options"][j].regionName);
        }
      }
    },
    // 删除标签
    delTag(i) {
      this.resArr.splice(i, 1);
      if (this.areaType === "all") {
        this.areaType = "";
        this.$store.commit(types.CHANGE_AREA1, "");
      }
    }
  },
  watch: {
    yType(v, ov) {
      if (/attention|leads|leads_chonghe|rcr/.test(v)) {
        this.areaType = "";
        this.resArr = [];
      }
      if (v === "preference") {
        this.areaType = "province";
        this.provinceList = this.PDATA;
      }
    },
    resArr(val, oldVal) {
      if (this.areaType === "all") {
        this.$store.commit(types.CHANGE_AREA_P, []);
        this.$store.commit(types.CHANGE_AREA_C, []);
      } else if (this.areaType === "province") {
        this.$store.commit(types.CHANGE_AREA_P, val);
      } else if (this.areaType === "city") {
        this.$store.commit(types.CHANGE_AREA_C, val);
      } else if (this.areaType === "level") {
        this.$store.commit(types.SET_LEVEL_ARR, val);
      }
    },
    isClearAll() {
      this.areaType = "";
      this.provinceData = "";
      this.levelData = "";
      this.resArr = [];
      this.provinceList = [];
      this.levelList = [];
      this.$store.commit(types.CHANGE_AREA1, "");
      this.$store.commit(types.CHANGE_AREA_P, "");
      this.$store.commit(types.CHANGE_AREA_C, "");
      this.$store.commit(types.SET_LEVEL_ARR, []);
    }
  },
  components: {
    HxSelect
  }
};
</script>
<style scoped lang="less">
.in-wrap {
  background: #eff2f7;
  margin-bottom: 0.7%;
  padding: 5px;
  height: 33.3%;
  overflow: auto;
  box-sizing: border-box;
}
h6 {
  font-weight: 100;
  margin: 3px auto 10px;
  color: #000;
  font-weight: 500;
}
.el-tag {
  margin-right: 4px;
  margin-bottom: 4px;
}
</style>
