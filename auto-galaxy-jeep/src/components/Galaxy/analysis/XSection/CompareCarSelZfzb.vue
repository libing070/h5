<template>
  <div class="in-wrap">
    <el-row type="flex" justify="space-between">
      <el-col :span="8" style="margin-bottom:5px;">
        <h6 style="margin-bottom:0">{{$t('m.right.panel1')}}：</h6>
      </el-col>
      <!-- 非画像分析版块 -->
      <el-col :span="8" v-if="!isDimension">
        <!-- 类型 -->
        <el-select v-model="type" size="mini" @change="getData" style="width:97%;height:14px">
          <el-option :label="$t('m.left.type[0]')" value="0"></el-option>
          <el-option :label="$t('m.left.type[2]')" value="2"></el-option>
        </el-select>
      </el-col>
      <el-col :span="8" v-show="!isDimension">
        <hx-select v-model="compareCar" :options="optionsArr" :current-value="compareCarIdArr" @change="addTag"></hx-select>
      </el-col>
    </el-row>

    <div class="res-wrap">
      <el-tag v-for="(tag,index) in compareCarArr" size="small" :key="index" :closable="true" @close="delTag(index)">{{tag}}</el-tag>
    </div>
  </div>
</template>
<script>
import * as types from "@/store/mutation-types.js";
import qs from "querystring";
import HxSelect from "../../../common/HxSelect.vue";
import * as libs from "@/utils/libs.js";
export default {
  name: "comparecarsel",
  data() {
    return {
      type: "2",
      profile_type: "separate",
      optionsArr: [],
      // 前1000名的备份，用于恢复列表
      bkpArr: [],
      // 完整信息备份，用于查询完整信息
      bkpAllArr: [],
      compareCar: "",
      compareCarArr: [],
      compareCarIdArr: []
    };
  },
  computed: {
    nameFromLeft() {
      return this.$store.state.common.chartClickData;
    },
    isClearAll() {
      return this.$store.state.contrast.isClearAll;
    },
    isDimension() {
      if (this.$store.state.contrast.yAxis === "profile") {
        return true;
      } else {
        return false;
      }
    },
    isHeatmap() {
      if (this.$store.state.contrast.yAxis === "heatmap") {
        return true;
      } else {
        return false;
      }
    },
    yAxis() {
      return this.$store.state.contrast.yAxis;
    }
  },
  created() {
    // 页面一初始化，就获取类型数据
    this.getData();
  },
  methods: {
    // 获取类型数据
    getData() {
      this.$store.commit(types.COMPARE_TYPE, this.type);
      // 拿到数据后先清空原始数组的值
      this.compareCar = "";
      this.compareCarArr = [];
      this.compareCarIdArr = [];
      if (this.type == "2") {
        this.$axios
          .post(
            "/car/queryCarServlet",
            {
              type: this.type,
              date: libs.genDefaultRangeDate()
            },
            {
              transformRequest: [
                function(data) {
                  data = qs.stringify(data); //序列化参数
                  return data;
                }
              ]
            }
          )
          .then(res => {
            // this.optionsArr = res.data.data.slice(0, 50);
            this.optionsArr = res.data.data;
            this.bkpArr = res.data.data.slice(0, 50);
            this.bkpAllArr = res.data.data;
          })
          .catch(error => {
            console.log(error);
          });
      } else if (this.type == "0") {
        // this.compareCar = "";
        // this.compareCarArr = [];
        this.optionsArr = [
          {
            name: "JEEP",
            id: "4"
          }
        ];
        this.bkpArr = [...this.optionsArr];
        this.bkpAllArr = [...this.optionsArr];
      }
    },
    // 自定义查询方法
    selectFilter(curStr) {
      if (curStr !== "") {
        let regex = new RegExp(curStr, "i");
        // 查询完整信息列表
        let newArr = this.bkpAllArr.filter((obj, index) => {
          return regex.test(obj.name);
        });
        this.optionsArr = newArr;
      } else {
        // 清空后恢复列表
        this.optionsArr = this.bkpArr;
        this.compareCar = "";
      }
    },
    // 添加标签
    addTag(val) {
      this.compareCar = "";
      // 1）如果Y轴是正反占比，对比对象就单选
      if (this.yAxis === "zfzb") {
        if (this.compareCarArr.length === 0) {
          this.compareCarArr.push(val.name);
          this.compareCarIdArr.push(String(val.id));
        } else {
          return false;
        }
        // 2）否则，就多选
      } else {
        // 如果当前项在数组里面找不到一样的，就push到数组
        let result = this.compareCarArr.every((str, i) => {
          return str != val.name;
        });
        if (result) {
          this.compareCarArr.push(val.name);
          this.compareCarIdArr.push(String(val.id));
        }
      }
    },
    // 删除标签
    delTag(i) {
      this.compareCarArr.splice(i, 1);
      this.compareCarIdArr.splice(i, 1);
    },
    // 人群画像选择车型后，如何展示数据？单个车型展示还是所有车型一起展示
    changeCarChosenType(v) {
      this.$store.commit(types.SET_CAR_CHOSEN_TYPE, v);
    }
  },
  watch: {
    compareCarArr: function(val, oldVal) {
      if (val.length === 0) {
        this.compareCar = "";
      }
      this.$store.commit({
        type: types.SET_COMPARE_CAR_ARR,
        commit_type: "fromRight",
        payload: val
      });
    },
    compareCarIdArr: function(val, oldVal) {
      this.$store.commit({
        type: types.SET_COMPARE_CAR_ID_ARR,
        commit_type: "fromRight",
        payload: val
      });
    },
    yAxis: function(n, o) {
      if (n === "zfzb") {
        if (this.compareCarArr[0]) {
          this.compareCarArr = [this.compareCarArr[0]];
        }
        if (this.compareCarIdArr[0]) {
          this.compareCarIdArr = [this.compareCarIdArr[0]];
        }
      }
    },
    isClearAll: function() {
      this.type = "0";
      this.getData();
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
  padding: 5px;
  margin-bottom: 0.7%;
  min-height: 31%;
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

.el-radio-button--mini .el-radio-button__inner {
  padding: 3px 8px;
}
</style>
