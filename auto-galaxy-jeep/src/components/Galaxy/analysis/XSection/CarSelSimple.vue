<template>
  <div class="in-wrap">
    <el-row type="flex" justify="space-between">
      <el-col :span="8">
        <h6 style="margin-bottom:0">对比对象：</h6>
      </el-col>
      <!-- 非画像分析版块 -->
      <el-col :span="8">
        <!-- 类型 -->
        <el-select v-model="type" size="mini" @change="getData" style="width:97%;height:14px">
          <el-option label="品牌" value="0"></el-option>
          <el-option label="厂商" value="1"></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
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
  name: "carSelSimple",
  data() {
    return {
      type: "0",
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
          let _data = JSON.parse(JSON.stringify(res.data.data));
          _data.unshift({
            id: 0,
            name: "全部",
            pv: 0
          });
          this.optionsArr = _data;
          this.bkpArr = _data.slice(0, 50);
          this.bkpAllArr = _data;
        })
        .catch(error => {
          console.log(error);
        });
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
      if (this.compareCarArr.length === 0) {
        this.compareCarArr.push(val.name);
        this.compareCarIdArr.push(String(val.id));
      } else {
        return false;
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
  height: 31%;
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
