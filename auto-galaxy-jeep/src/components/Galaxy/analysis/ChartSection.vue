<template>
  <div class="section-wrap">
    <div v-if="!isHasData">
      <!-- <i class="el-icon-loading my-loading" v-show="isLoadingShow"></i> -->
      <h6 class="animated flipInX">{{$t('m.right.nodata')}}</h6>
    </div>

    <!-- 如果有数据，就渲染炒鸡图表 -->
    <div v-else-if="isHasData">
      <template v-if="chartType==='wordcloud'">
        <super-chart :whoami="whoami" :koubeiData="koubeiData" class="two-chart"></super-chart>
        <super-chart :whoami="whoami" :koubeiData="koubeiData" :number="2" class="two-chart"></super-chart>
      </template>
      <super-chart v-else :whoami="whoami"></super-chart>
    </div>
  </div>
</template>
<script>
import SuperChart from "@/components/charts/SuperChart";
export default {
  name: "chartSection",
  components: {
    SuperChart
  },
  props:['whoami','koubeiData'],
  data() {
    return {};
  },
  computed: {
    chartType: function() {
      return this.$store.state.contrast.chartType;
    },
    isHasData: function() {
      return this.$store.getters.isHasData;
    },
    isLoadingShow() {
      return this.$store.state.contrast.loadingStatus;
    }
  }
};
</script>
<style scoped lang="less">
.section-wrap {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: Center;
  h6 {
    margin: 0;
    font-weight: 300;
  }
}
.two-chart{
  float: left;
  width: 50% !important;
}
</style>
