<template>
  <div class="in-wrap">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="8">
          <h6>{{$t('m.right.panel2')}}：</h6>
        </el-col>
      </el-row>

      <div class="date-bottom-wrap">
        <!-- 选择年 -->
        <el-date-picker
            :editable = 'false'
            :clearable = 'true'
            :style="'width:30%'"
            placeholder="选择年"
            :picker-options="setDisabledYear"
            v-model="year"
            size="mini"
            @change="selectYearDate"
            value-format="yyyy"
            type="year">
        </el-date-picker>

      </div>


    </div>
</template>

<script>
import * as types from '@/store/mutation-types.js'
import moment from 'moment'
export default {
  name: 'yearsel',
  data() {
    return {
      year: moment().format('YYYY'),
      setDisabledYear: {
        disabledDate: curDate => {
          // 小于17年或大于今年的年都disable
          return curDate < moment('2017-12-31') || curDate > moment()
        }
      }
    }
  },
  components: {},
  mounted() {
  },
  computed: {},
  methods: {
    selectYearDate(v) {
      this.$store.commit(types.HANDLE_DIMENSION_YEAR_CHANGE, v)
    }
  },
  watch: {}
}
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
