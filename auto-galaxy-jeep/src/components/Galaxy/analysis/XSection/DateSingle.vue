<template>
  <div class="in-wrap">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="8">
        <h6>{{$t('m.right.panel2')}}：</h6>
      </el-col>
    </el-row>

    <div class="date-bottom-wrap">
      <template v-if="isHeatmap">
        <el-date-picker
          v-model="mstart"
          type="month"
          size="mini"
          style="width: 47%"
          placeholder="选择月"
        ></el-date-picker>
        <el-date-picker
          v-model="mend"
          type="month"
          size="mini"
          style="width: 47%"
          placeholder="选择月"
        ></el-date-picker>
      </template>
      <template v-else>
        <!-- 月份单选 -->
        <el-date-picker
          :editable="isEditable"
          :clearable="isEditable"
          style="width: 47%"
          v-model="month"
          :picker-options="setDisabledMonth"
          @change="selectMonthDate"
          value-format="yyyy-MM"
          size="mini"
          type="month"
        ></el-date-picker>
      </template>
    </div>
  </div>
</template>

<script>
import * as types from "@/store/mutation-types.js";
import moment from "moment";
export default {
  name: "datesingle",
  data() {
    return {
      month: moment()
        .subtract(1, "months")
        .format("YYYY-MM"),
      isEditable: false,
      setDisabledMonth: {
        disabledDate: curDate => {
          return (
            curDate <= new Date("2017-12-31") ||
            curDate > moment().add(0, "months")
          );
        }
      },
      mrange: [],
      mstart: "",
      mend: ""
    };
  },
  components: {},
  mounted() {},
  computed: {
    isHeatmap() {
      if (this.$store.state.contrast.yAxis === "heatmap") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    selectMonthDate(v) {
      this.$store.commit(types.SET_DATE_SINGLE, v);
    }
  },
  watch: {}
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
