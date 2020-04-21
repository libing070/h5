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
          <el-option :label="$t('m.left.type[1]')" value="1"></el-option>
          <el-option :label="$t('m.left.type[2]')" value="2"></el-option>
          <el-option :label="$t('m.left.type[3]')" value="3" v-if="!isDimension&&!isHeatmap"></el-option>
          <el-option :label="$t('m.left.type[4]')" value="4"></el-option>
          <el-option :label="$t('m.left.type[5]')" value="5"></el-option>
        </el-select>
      </el-col>
      <el-col :span="8" v-show="!isDimension">
        <hx-select
          v-model="compareCar"
          :options="optionsArr"
          :current-value="compareCarIdArr"
          @change="addTag"
        ></hx-select>
      </el-col>
    </el-row>

    <!-- 画像分析版块 -->
    <el-row>
      <el-col :span="9" v-if="isDimension">
        <el-radio-group
          v-model="profile_type"
          size="mini"
          class="profile_t"
          @change="changeCarChosenType"
        >
          <el-radio-button label="entire">{{$t('m.right.carlabel[0]')}}</el-radio-button>
          <el-radio-button label="separate">{{$t('m.right.carlabel[1]')}}</el-radio-button>
        </el-radio-group>
      </el-col>

      <el-col :span="8" v-if="isDimension">
        <!-- 类型 -->
        <el-select v-model="type" size="mini" @change="getData" style="width:97%;height:14px">
          <el-option :label="$t('m.left.type[0]')" value="0"></el-option>
          <el-option :label="$t('m.left.type[1]')" value="1"></el-option>
          <el-option :label="$t('m.left.type[2]')" value="2"></el-option>
          <el-option :label="$t('m.left.type[3]')" value="3" v-if="!isDimension"></el-option>
          <el-option :label="$t('m.left.type[4]')" value="4"></el-option>
          <el-option :label="$t('m.left.type[5]')" value="5"></el-option>
        </el-select>
      </el-col>

      <el-col :span="7" v-show="isDimension">
        <hx-select
          v-model="compareCar"
          :options="optionsArr"
          :current-value="compareCarIdArr"
          @change="addTag"
        ></hx-select>
      </el-col>
    </el-row>
    <div class="res-wrap">
      <el-tag
        v-for="(tag,index) in compareCarArr"
        size="small"
        :key="index"
        :closable="true"
        @close="delTag(index)"
      >{{tag}}</el-tag>
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
      if (this.type != "4" && this.type != "5") {
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
      } else if (this.type == "4") {
        // this.compareCar = "";
        // this.compareCarArr = [];
        this.optionsArr = [
          {
            name: "微型轿车",
            id: "1"
          },
          {
            name: "小型轿车",
            id: "2"
          },
          {
            name: "紧凑型轿车",
            id: "3"
          },
          {
            name: "中型轿车",
            id: "4"
          },
          {
            name: "中大型轿车",
            id: "5"
          },
          {
            name: "豪华型轿车",
            id: "6"
          },
          {
            name: "MPV",
            id: "7"
          },
          {
            name: "SUV",
            id: "8"
          },
          {
            name: "小型SUV",
            id: "9"
          },
          {
            name: "紧凑型SUV",
            id: "10"
          },
          {
            name: "中型SUV",
            id: "11"
          },
          {
            name: "中大型SUV",
            id: "12"
          },
          {
            name: "跑车",
            id: "13"
          },
          {
            name: "面包车",
            id: "14"
          },
          {
            name: "皮卡",
            id: "15"
          },
          {
            name: "客车",
            id: "16"
          }
        ];
        this.bkpArr = [...this.optionsArr];
        this.bkpAllArr = [...this.optionsArr];
      } else if (this.type == "5") {
        this.optionsArr = [
          {
            name: "德国",
            id: "德国"
          },
          {
            name: "中国",
            id: "中国"
          },
          {
            name: "日本",
            id: "日本"
          },
          {
            name: "韩国",
            id: "韩国"
          },
          {
            name: "意大利",
            id: "意大利"
          },
          {
            name: "美国",
            id: "美国"
          },
          {
            name: "法国",
            id: "法国"
          },
          {
            name: "澳大利亚",
            id: "澳大利亚"
          },
          {
            name: "瑞典",
            id: "瑞典"
          },
          {
            name: "英国",
            id: "英国"
          },
          {
            name: "捷克",
            id: "捷克"
          },
          {
            name: "西班牙",
            id: "西班牙"
          },
          {
            name: "荷兰",
            id: "荷兰"
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
      // 1）如果Y轴是APP安装偏好，对比对象就单选
      if (this.yAxis === "preference" || this.yAxis === "habit") {
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
    nameFromLeft: function(val, oldVal) {
      // 如果对比分析是展开的就可以
      if (this.$store.state.contrast.flag) {
        // 如果类型不一样，就改成一样的，并清空对象数组
        if (this.type !== this.$store.getters.selectedType) {
          this.type = this.$store.getters.selectedType;
          this.getData();
          // 此时数组已清空，直接推送过去
          this.compareCarArr.push(val.name);
          this.compareCarIdArr.push(String(val.id));
          this.$store.commit({
            type: types.SET_COMPARE_CAR_ARR,
            commit_type: "fromLeft",
            payload: val.name
          });
          this.$store.commit({
            type: types.SET_COMPARE_CAR_ID_ARR,
            commit_type: "fromLeft",
            payload: String(val.id)
          });
        } else {
          // 如果是同类型的，就要先验证是否有重复的，如果有重复的就什么都不做
          let result = this.compareCarArr.every((str, i) => {
            return str != val.name;
          });
          if (result) {
            this.compareCarArr.push(val.name);
            this.compareCarIdArr.push(String(val.id));
            this.$store.commit({
              type: types.SET_COMPARE_CAR_ARR,
              commit_type: "fromLeft",
              payload: val.name
            });
            this.$store.commit({
              type: types.SET_COMPARE_CAR_ID_ARR,
              commit_type: "fromLeft",
              payload: String(val.id)
            });
          }
        }
      }
    },
    yAxis: function(n, o) {
      if (n === "preference" || n === "habit") {
        if (this.compareCarArr[0]) {
          this.compareCarArr = [this.compareCarArr[0]];
        }
        if (this.compareCarIdArr[0]) {
          this.compareCarIdArr = [this.compareCarIdArr[0]];
        }
      } else if (n === "profile" && this.type === "3") {
        this.type = "";
        this.compareCarArr = [];
        this.compareCarIdArr = [];
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
