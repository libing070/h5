<template>
  <div class="in-wrap">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="8">
        <h6>时间选择：</h6>
      </el-col>
    </el-row>
    <div class="date-bottom-wrap">

      <!-- 如果是按月 -->

      <el-date-picker :editable='isEditable' :clearable='isEditable' placeholder="选择起始月" style="width: 47%" v-model="byMonthData"
        :picker-options="setDisabledMonth" @change="selectMonthDate(byMonthData,'start_month')" value-format="yyyy-MM"
        size="mini" type="month">
      </el-date-picker>
      <span> - </span>
      <el-date-picker :editable='isEditable' :clearable='isEditable' placeholder="选择结束月" style="width: 47%" v-model="byMonthData2"
        :picker-options="setDisabledMonth" @change="selectMonthDate(byMonthData2,'end_month')" value-format="yyyy-MM"
        size="mini" type="month">
      </el-date-picker>
    </div>


  </div>
</template>
<script>
  import * as types from "@/store/mutation-types.js";
  import moment from "moment";
  export default {
    name: "dateSel",
    data() {
      return {
        isEditable: false,
        byMonthData: moment()
          .subtract(1, "months")
          .format("YYYY-MM"),
        byMonthData2: moment()
          .subtract(1, "months")
          .format("YYYY-MM"),
        setDisabledMonth: {
          disabledDate: curDate => {
            // 小于等于16年或大于今年的年都disable
            return (
              /*  curDate <= new Date("2016-12-31") || */
              curDate > moment().subtract(moment().date(), "days")
            );
          }
        }
      };
    },
    created() {
      this.$store.commit(types.HANDLE_DATE_SEL, [this.byMonthData]);
    },
    computed: {

      isClearAll: function () {
        return this.$store.state.contrast.isClearAll;
      }
    },
    methods: {
      selectMonthDate(v, flag) {
        let year_part = Number(this.byMonthData.substr(0, 4));
        let year_part2 = Number(this.byMonthData2.substr(0, 4));
        let month_part = Number(this.byMonthData.substr(-2));
        let month_part2 = Number(this.byMonthData2.substr(-2));
        let year_len = year_part2 - year_part;
        let month_len = month_part2 - month_part;
        // 如果两个日期完全相等，就push一个进去
        if (this.byMonthData === this.byMonthData2) {
          this.$store.commit(types.HANDLE_DATE_SEL, [v]);

          // 不完全相等的时候，如果都是同一年，就计算出月份差，生成中间的月份，合成数组推到store里
        } else if (year_len === 0) {
          let _month_arr = [];
          for (let ii = month_part; ii <= month_part2; ii++) {
            let prefix_ii = ii >= 10 ? ii : "0" + ii;
            _month_arr.push(year_part + "-" + prefix_ii);
          }
          this.$store.commit(types.HANDLE_DATE_SEL, _month_arr);

          // 如果是相邻年，就分开生成过渡月份
        } else if (year_len === 1) {
          let _month_arr = [];
          for (let ii = month_part; ii <= 12; ii++) {
            let prefix_ii = ii >= 10 ? ii : "0" + ii;
            _month_arr.push(year_part + "-" + prefix_ii);
          }
          for (let ii = 1; ii <= month_part2; ii++) {
            let prefix_ii = ii >= 10 ? ii : "0" + ii;
            _month_arr.push(year_part2 + "-" + prefix_ii);
          }
          this.$store.commit(types.HANDLE_DATE_SEL, _month_arr);
          // 如果是相隔年，吐血了
        } else if (year_len > 1) {
          let _month_arr = [];
          for (let ii = month_part; ii <= 12; ii++) {
            let prefix_ii = ii >= 10 ? ii : "0" + ii;
            _month_arr.push(year_part + "-" + prefix_ii);
          }
          for (let ii = 1; ii < year_len; ii++) {
            for (let mm = 1; mm <= 12; mm++) {
              let prefix_mm = mm >= 10 ? mm : "0" + mm;
              _month_arr.push(year_part + ii + "-" + prefix_mm);
            }
          }
          for (let ii = 1; ii <= month_part2; ii++) {
            let prefix_ii = ii >= 10 ? ii : "0" + ii;
            _month_arr.push(year_part2 + "-" + prefix_ii);
          }
          this.$store.commit(types.HANDLE_DATE_SEL, _month_arr);

        }

      },
    },
    watch: {
      isClearAll: function () {
        this.$store.commit(types.HANDLE_DATE_SEL, []);
      }
    }
  };

</script>
<style scoped lang="less">
  .in-wrap {
    background: #eff2f7;
    padding: 5px;
    margin-bottom: 0.7%;
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
