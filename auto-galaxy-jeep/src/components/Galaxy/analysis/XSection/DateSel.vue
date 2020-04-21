<template>
  <div class="in-wrap">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="8">
        <h6>{{$t('m.right.panel2')}}：</h6>
      </el-col>
      <el-col :span="8">
        <!-- 日期类型选择器 -->
        <el-select v-model="dateType" size="mini" @change="handleDateType" style="width:97%;height:22px">
          <el-option label="年" value="year"></el-option>
          <el-option label="季度" value="quarter"></el-option>
          <el-option label="月" value="month"></el-option>
          <el-option label="自定义" value="custom"></el-option>
        </el-select>
      </el-col>
      <el-col :span="8">

        <!-- 逐步还是整体 -->
        <el-select v-model="anaType" size="mini" @change="handleAnaType">
          <el-option :label="'逐'+ fenxiType +'分析'" value="separate"></el-option>
          <el-option :label="'整体分析'" value="add"></el-option>
        </el-select>
      </el-col>
    </el-row>

    <div class="date-bottom-wrap">
      <!-- 如果是按年 -->
      <template v-if="dateType==='year'">
        <el-date-picker :editable='isEditable' :clearable='isEditable' :key="dateType" placeholder="选择年"
          :picker-options="setDisabledYear" style="width:35%" v-model="byYearData" size="mini" @change="selectYearDate"
          value-format="yyyy" type="year">
        </el-date-picker>
      </template>
      <!-- 如果是按季度 -->
      <template v-if="dateType==='quarter'">
        <el-date-picker :editable='isEditable' :clearable='isEditable' :key="dateType" placeholder="选择年" style="width: 35%"
          :picker-options="setDisabledYear" v-model="byQData" value-format="yyyy" size="mini" type="year">
        </el-date-picker>
        <el-select v-model="byQData2" size="mini" style="width: 35%" @change="selectQuarter2">
          <el-option label="第一季度" value="1"></el-option>
          <el-option label="第二季度" value="2"></el-option>
          <el-option label="第三季度" value="3"></el-option>
          <el-option label="第四季度" value="4"></el-option>
        </el-select>
      </template>

      <!-- 如果是按月 -->
      <template v-else-if="dateType==='month'">
        <el-date-picker :editable='isEditable' :clearable='isEditable' :key="dateType" placeholder="选择起始月" style="width: 47%"
          v-model="byMonthData" :picker-options="setDisabledMonth" @change="selectMonthDate(byMonthData,'start_month')"
          value-format="yyyy-MM" size="mini" type="month">
        </el-date-picker>
        <span> - </span>
        <el-date-picker :editable='isEditable' :clearable='isEditable' :key="dateType" placeholder="选择结束月" style="width: 47%"
          v-model="byMonthData2" :picker-options="setDisabledMonth" @change="selectMonthDate(byMonthData2,'end_month')"
          value-format="yyyy-MM" size="mini" type="month">
        </el-date-picker>
      </template>

      <!-- 如果是自定义 -->
      <template v-else-if="dateType==='custom'">
        <el-date-picker :key="dateType" :editable='isEditable' placeholder="选择日期范围" v-model="byCustomDate" @change="selectDateCustom"
          :picker-options="setDisabledCustom" size="mini" unlink-panels :clearable="rangepickerclear" style="width: 100%"
          value-format="yyyy-MM-dd" type="daterange">
        </el-date-picker>
      </template>
    </div>

    <!-- 标签包裹层 -->
    <div class="res-wrap">
      <el-tag v-for="(tag,index) in dateArr" size="small" :key="index" :closable="true" @close="delTag(index)">{{tag}}</el-tag>
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
        rangepickerclear: false,
        isEditable: false,
        dateType: "year",
        anaType: "separate",
        byYearData: "",
        byQData: "",
        byQData2: "",
        byMonthData: moment().format("YYYY") + "-01",
        byMonthData2: moment()
          .subtract(1, "months")
          .format("YYYY-MM"),
        byCustomDate: "",
        dateArr: [],
        setDisabledYear: {
          disabledDate: curDate => {
            // 小于17年或大于今年的年都disable
            return curDate < moment("2017-12-31") || curDate > moment();
          }
        },
        setDisabledMonth: {
          disabledDate: curDate => {
            // 小于等于16年或大于今年的年都disable
            return (
              curDate <= new Date("2016-12-31") ||
              curDate > moment().subtract(moment().date(), "days")
            );
          }
        },
        setDisabledCustom: {
          disabledDate: curDate => {
            // 小于等于16年或大于今年的年都disable
            return (
              curDate <= new Date("2016-12-31") ||
              curDate > moment().subtract(moment().date(), "days")
            );
          }
        }
      };
    },
    computed: {
      fenxiType: function () {
        switch (this.dateType) {
          case "year":
            return "年";
            break;
          case "quarter":
            return "季度";
            break;
          case "month":
            return "月";
            break;
          case "custom":
            return "天";
            break;
        }
      },
      isClearAll: function () {
        return this.$store.state.contrast.isClearAll;
      }
    },
    methods: {
      handleDateType(v) {
        this.byYearData = "";
        this.byQData = "";
        this.byQData2 = "";
        this.byMonthData = moment().format("YYYY") + "-01";
        this.byMonthData2 = moment()
          .subtract(1, "months")
          .format("YYYY-MM");
        this.byCustomDate = "";
        this.dateArr = [];
        this.$store.commit(types.HANDLE_DATE_TYPE, v);
      },
      handleAnaType(v) {
        this.$store.commit(types.HANDLE_DATE_CAL, v);
      },
      selectYearDate(v) {
        if (v != "") {
          let result = this.dateArr.every((str, i) => {
            return str != v;
          });
          if (result && v !== null) {
            this.dateArr.push(v);
          }
        }
      },
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
      selectQuarter2(v) {
        if (this.byQData !== "") {
          let result = this.dateArr.every((str, i) => {
            return str != this.byQData + v;
          });
          if (result && v !== null) {
            this.dateArr.push(this.byQData + v);
          }
        }
      },
      selectDateCustom(v) {
        this.$store.commit(types.HANDLE_DATE_SEL, v);
      },
      delTag(i) {
        this.dateArr.splice(i, 1);
      }
    },
    watch: {
      dateArr: function (val, oldVal) {
        if (val.length === 0) {
          this.byYearData = "";
          this.byQData = "";
          this.byQData2 = "";
          this.byMonthData = moment().format("YYYY") + "-01";
          this.byMonthData2 = moment()
            .subtract(1, "months")
            .format("YYYY-MM");
          this.byCustomDate = "";
        }
        let _arr = [...val];
        if (this.dateType === "year" || this.dateType === "quarter") {
          _arr.sort((a, b) => {
            return a - b;
          });
        } else if (this.dateType === "month") {
          // _arr = [this.byMonthData, "2018-04"];
          let len = new Date().getMonth();
          for (let i = 1; i <= len; i++) {
            if (i <= 9) {
              _arr.push(new Date().getFullYear() + "-0" + i);
            } else {
              _arr.push(new Date().getFullYear() + "-" + i);
            }
          }
        }
        this.$store.commit(types.HANDLE_DATE_SEL, _arr);
      },
      isClearAll: function () {
        this.dateType = "year";
        this.anaType = "separate";
        this.handleDateType("year");
        this.$store.commit(types.HANDLE_DATE_CAL, "separate");
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
    min-height: 32.3%;
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
