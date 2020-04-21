<template>
  <div>
    <car-parse @click.native="closeHalf"></car-parse>
    <analysis></analysis>
    <template v-if="statusFromState">
      <el-dialog :title="$t('m.right.display')" width="90%" top="5vh" fullscreen :visible.sync="dialogVisible" @close="setPopStatusToFalse"
        custom-class="chart-dialog">

        <template v-if="chartType==='wordcloud'">
          <chart-section v-for="(item,index) in koubeiData" :whoami="true" :koubeiData="item" :key="index"></chart-section>
        </template>
        <chart-section v-else :whoami="true"></chart-section>

      </el-dialog>
    </template>
  </div>
</template>

<script>
  import CarParse from "./parse";
  import Analysis from "./analysis";
  import ChartSection from "./analysis/ChartSection";
  import * as types from "@/store/mutation-types.js";
  export default {
    name: "galaxy",
    data() {
      return {
        dialogVisible: false
      };
    },
    computed: {
      koubeiData() {
        return this.$store.state.contrast.koubeiData;
      },
      chartType: function() {
        return this.$store.state.contrast.chartType;
      },
      isHeatmap() {
        return /heatmap/.test(this.$store.state.contrast.yAxis);
      },
      statusFromState: function () {
        return this.$store.state.contrast.popStatus;
      }
    },
    beforeRouteLeave(to, from, next) {
      // 去首页时清空图表数据
      this.$store.commit(types.RESET_CONTRAST);
      // 清空选择的本品数据
      this.$store.commit(types.SET_SAMPLES, []);
      next();
    },
    methods: {
      setPopStatusToFalse() {
        this.$store.commit(types.SET_POP_STATUS, false);
      },
      // 关闭半屏功能
      closeHalf() {
        // 向中央数据库释放一个信号，要求变化中央的flag
        this.$store.commit(types.CLOSE_HALF, false);
        this.$store.commit(types.EXPAND_SETTING, false);
      }
    },
    watch: {
      statusFromState: function (val, oldVal) {
        this.dialogVisible = val;
      }
    },
    components: {
      CarParse,
      Analysis,
      ChartSection
    }
  };

</script>

<style scoped lang="less">
</style>
