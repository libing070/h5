<template>
  <!-- 使用绝对定位的包裹层 -->
  <div :class="[isOpen ? 'active' : 'noactive', 'analysis-wrap']" :style="{ width: wrapWidth + '%'}">
    <mask-component :is-show="maskState" style="z-index: 100" @click.native="handleMaskClick"></mask-component>
    <!-- 左侧弹出按钮 -->
    <div class="slide-btn" @click="changeOpenState" v-show="!isOpen">
      <span>{{$t('m.right.btn')}}</span>
    </div>

    <!-- 顶部控制条 -->
    <div class="header">
      <el-row type="flex" class="row-bg" justify="space-between" align="middle">
        <el-col :span="18">
          <i class="fa fa-clone"></i>
          <span class="ana-title">{{$t('m.right.btn')}}</span>
        </el-col>
        <el-col :span="3" class="expand-btn">
          <i class="fa fa-trash" @click="clearAll"></i>&nbsp;
          <i :class="[isExpand ? 'el-icon-remove' : 'el-icon-circle-plus','i-btn']" @click="expandDiv"></i>
          <i class="el-icon-circle-close" @click="closeDiv"></i>
        </el-col>
      </el-row>
    </div>

    <!-- 主体内容 -->
    <div class="bot">
      <el-row style="height:100%" :gutter="10">
        <el-col :span="leftSectionWidth" style="height:100%">
          <div style="height:38%">
            <div class="inner-title">
              1. {{$t('m.right.title1')}}
              <!-- 右侧X轴参数选定区 -->
              <span class="paramx-wrap">
                <!-- <el-tooltip class="item" effect="dark" content="X轴默认为对象维度" placement="top">
                  <i class="fa fa-question-circle"></i>
                </el-tooltip>-->
                <el-select v-model="XVal" size="mini" class="xSelStyle" style="width:80px" @change="changeX">
                  <el-option :label="$i18n.locale==='ch'?'对象':'car'" value="car"></el-option>
                  <el-option :label="$i18n.locale==='ch'?'时间':'time'" value="date"></el-option>
                  <el-option :label="$i18n.locale==='ch'?'地域':'area'" value="area"></el-option>
                </el-select>
              </span>
            </div>
            <div class="content-wrap" style="overflow-y:auto">
              <y-section></y-section>
            </div>
          </div>

          <!-- X轴参数选择区 -->
          <div style="height:55%">
            <div class="inner-title">2. {{$t('m.right.title2')}}</div>
            <div class="content-wrap" style="overflow-y:auto">
              <!-- 对比对象（经销商热力图) -->
              <car-sel-simple v-if="isHeatmapDealer"></car-sel-simple>

              <!-- 对比对象:前6个模块+第8个模块 -->
              <compare-car-sel v-if="isCompareCar"></compare-car-sel>

              <!-- 对比对象：正反占比 -->
              <compare-car-sel-zfzb v-if="isEnd"></compare-car-sel-zfzb>

              <!-- 配置选择:装配率显示此版块 -->
              <device-sel v-show="isAssembly"></device-sel>

              <!-- 日期选择:装配率隐藏此版块 -->
              <!-- <date-sel v-show="!isOld"></date-sel> -->

              <!-- 年份选择:画像分析显示此版块 -->
              <year-sel v-show="isDimension"></year-sel>

              <!-- 车款年代:装配率、留资率显示此版块 -->
              <car-year v-show="isAssembly"></car-year>

              <!-- 地域选择:装配率隐藏此版块 -->
              <area-sel v-show="!isOld || isLeadsRate"></area-sel>

              <!-- 配置选择:画像分析显示此版块 -->
              <dimension-sel v-show="isDimension"></dimension-sel>

              <!-- 时间单选:APP安装偏好显示此版块 -->
              <area-single v-show="isPreferenceHabit||isHeatmap"></area-single>

              <!-- 地域单选:APP安装偏好显示此版块 -->
              <date-single v-show="isSingleMonth"></date-single>

              <!-- 配置选择:画像分析显示此版块 -->
              <price-range v-show="isAssembly"></price-range>

              <!-- 配置选择:热力图显示此版块 -->
              <month-sel v-if="isHeatmap&&!isHeatmapDealer"></month-sel>

              <!-- 配置选择:热力图显示此版块 -->
              <sence-sel v-show="isHeatmap&&!isHeatmapDealer"></sence-sel>

              <!-- 终端选择:正反占比 -->
              <end-sel v-show="isEnd"></end-sel>
            </div>
          </div>
        </el-col>
        <el-col :span="middleSectionWidth" style="height:100%">
          <!-- 备选图表区 -->
          <div :style="{ height: tuliHeight + '%'}">
            <div class="inner-title">3. {{$t('m.right.title3')}}</div>
            <div class="content-wrap">
              <!-- 示例图集合模块 -->
              <legend-section></legend-section>
            </div>
          </div>

          <!-- 图表预览区 -->
          <div style="height:57%;overflow:hidden" v-if="!isExpand">
            <div class="inner-title">
              4. {{$t('m.right.title4')}}
              <span style="font-size:12px;color:#777">（{{$t('m.right.title5')}}）</span> &nbsp;
              <i class="el-icon-loading my-loading" v-show="isLoadingShow"></i>
            </div>
            <div class="content-wrap">
              <template v-if="chartType==='wordcloud'">
                <chart-section :whoami="false" :koubeiData="koubeiData.length>0?koubeiData[0]:[]"></chart-section>
              </template>
              <chart-section v-else :whoami="false"></chart-section>
            </div>
          </div>
        </el-col>

        <!-- 展开后的图表展示区 -->
        <el-col :span="middleSectionWidth +10" style="height:100%" v-if="isExpand">
          <!-- 图表预览区 -->
          <div style="height:100%">
            <div class="inner-title">
              4. {{$t('m.right.title4')}}&nbsp;&nbsp;
              <i class="el-icon-loading my-loading" v-show="isLoadingShow"></i>
            </div>
            <div class="content-wrap">
              <template v-if="chartType==='wordcloud'">
                <chart-section v-for="(item,index) in koubeiData" :whoami="true" :koubeiData="item" :key="index"></chart-section>
              </template>
              <chart-section v-else :whoami="true"></chart-section>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import CompareCarSel from "./XSection/CompareCarSel";
import CarSelSimple from "./XSection/CarSelSimple";
import CompareCarSelZfzb from "./XSection/CompareCarSelZfzb";
import MaskComponent from "../../../components/common/Mask.vue";
import AreaSel from "./XSection/AreaSel";
import DateSel from "./XSection/DateSel";
import DeviceSel from "./XSection/DeviceSel";
import YearSel from "./XSection/YearSel";
import CarYear from "./XSection/Caryear";
import DimensionSel from "./XSection/DimensionSel";
import AreaSingle from "./XSection/AreaSingle";
import DateSingle from "./XSection/DateSingle";
import PriceRange from "./XSection/PriceRange";
import YSection from "./YSection";
import LegendSection from "./LegendSection";
import ChartSection from "./ChartSection";
import MonthSel from "./XSection/MonthSel";
import SenceSel from "./XSection/SenceSel";
import EndSel from "./XSection/EndSel";
import * as types from "@/store/mutation-types.js";
export default {
  name: "analysis",
  components: {
    LegendSection,
    AreaSel,
    DateSel,
    DeviceSel,
    YearSel,
    CarYear,
    DimensionSel,
    AreaSingle,
    DateSingle,
    PriceRange,
    YSection,
    CompareCarSel,
    CarSelSimple,
    CompareCarSelZfzb,
    ChartSection,
    MaskComponent,
    MonthSel,
    SenceSel,
    EndSel
  },
  data() {
    return {
      isOpen: this.$route.query.target ? true : false,
      isExpand: false,
      XVal: "date",
      timer: {}
    };
  },
  created() {
    this.$store.commit(types.CLOSE_HALF, this.isOpen);
  },
  computed: {
    koubeiData() {
      return this.$store.state.contrast.koubeiData;
    },
    chartType: function() {
      return this.$store.state.contrast.chartType;
    },
    // 控制对比版块的宽度 50 或 100
    wrapWidth() {
      if (this.isExpand) {
        return 100;
      } else {
        return 50;
      }
    },
    // 控制对比版块的宽度 50 或 100
    tuliHeight() {
      if (this.isExpand) {
        return 100;
      } else {
        return 38;
      }
    },
    leftSectionWidth() {
      if (this.isExpand) {
        return 6;
      } else {
        return 12;
      }
    },
    middleSectionWidth() {
      if (this.isExpand) {
        return 4;
      } else {
        return 12;
      }
    },
    isLoadingShow() {
      return this.$store.state.contrast.loadingStatus;
    },
    flag() {
      return this.$store.state.contrast.flag;
    },
    maskState() {
      return this.$store.state.common.isMaskOpen;
    },
    isOld() {
      return /habit|preference|profile|assembly|rcr|heatmap|purpose|koubei|zfzb|funnel/.test(
        this.$store.state.contrast.yAxis
      );
    },
    // 装配率和留资率
    isAssembly() {
      return /assembly|rcr/.test(this.$store.state.contrast.yAxis);
    },
    // 留资率
    isLeadsRate() {
      return /rcr/.test(this.$store.state.contrast.yAxis);
    },
    // 装配率
    isAssemblyRate() {
      return /assembly/.test(this.$store.state.contrast.yAxis);
    },
    // 画像分析
    isDimension() {
      return /profile/.test(this.$store.state.contrast.yAxis);
    },
    // 购车目的
    // isPurpose() {
    //   return /purpose/.test(this.$store.state.contrast.yAxis);
    // },
    // APP安装偏好&触媒习惯
    isSingleMonth() {
      return /habit|zfzb|funnel/.test(this.$store.state.contrast.yAxis);
    },
    isPreferenceHabit() {
      return /preference|habit/.test(this.$store.state.contrast.yAxis);
    },
    isHeatmap() {
      return /heatmap/.test(this.$store.state.contrast.yAxis);
    },
    isHeatmapDealer() {
      return /heatmap_dealer/.test(this.$store.state.contrast.yAxis);
    },
    isCompareCar() {
      return /rcr|assembly|purpose|koubei|profile|habit|funnel/.test(
        this.$store.state.contrast.yAxis
      );
    },
    isEnd() {
      return /zfzb/.test(this.$store.state.contrast.yAxis);
    }
  },
  methods: {
    handleMaskClick() {
      this.$store.commit(types.CHANGE_MASK_STATE);
    },
    closeDiv() {
      this.isOpen = false;
      this.isExpand = false;
      // 传送到中央数据库
      this.$store.commit(types.CLOSE_HALF, this.isOpen);
      this.$store.commit(types.EXPAND_SETTING, this.isExpand);
    },
    expandDiv() {
      this.isExpand = !this.isExpand;
      // 传送到中央数据库
      this.$store.commit(types.EXPAND_SETTING, this.isExpand);
    },
    changeX(val) {
      this.$store.commit(types.CHANGE_X_AXIS, val);
    },
    changeOpenState() {
      this.isOpen = true;
      this.$store.commit(types.CLOSE_HALF, true);
    },
    clearAll() {
      this.$store.commit(types.CLEAR_ALL);
      this.XVal = "car";
      this.changeX("car");
    }
  },
  watch: {
    // 监控中央数据库中的flag变量，一旦改变，就关闭半屏
    flag: function() {
      if (this.flag === false) {
        this.closeDiv();
      }
    }
  }
};
</script>
<style scoped lang="less">
.analysis-wrap {
  position: fixed;
  background: #fff;
  width: 50%;
  height: calc(~"100vh - 88px"); // 必须这样写，否则有问题
  border-left: 1px solid #ccc;
  bottom: 0;
  padding: 10px;
  box-sizing: border-box;
  transition: all 0.45s ease-out;
  z-index: 201;
}

.active {
  right: 0%;
}

.noactive {
  right: -50%;
  width: 50% !important;
}

.slide-btn {
  position: absolute;
  box-sizing: border-box;
  border: 1px solid #c4c4c5;
  word-wrap: break-word;
  width: 30px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 20%;
  left: -30px;
  color: #333;
  writing-mode: vertical-lr; /*从左向右 从右向左是 writing-mode: vertical-rl;*/
  writing-mode: tb-lr;
  letter-spacing: 5px;
  span {
    display: block;
    padding-bottom: 5px;
    text-align: center;
  }

  &:hover {
    background: #f9bd00;
    cursor: pointer;
  }
}

.ana-title {
  font-weight: bold;
  color: #1f2d3d;
}

.expand-btn {
  text-align: center;
  margin-bottom: -5px;

  i {
    font-size: 18px;
    color: #5a5e66;

    &:hover {
      cursor: pointer;
    }
  }

  i.i-btn {
    color: #5a5e66;

    &:hover {
      color: #f9bd00;
    }
  }

  i.el-icon-circle-close {
    color: #5a5e66;
    font-size: 19px;

    &:hover {
      color: #fa5555;
    }
  }
}

.bot {
  margin-top: 15px;
  height: 100%;

  .inner-title {
    font-size: 14px;
    margin-bottom: 9px;
  }

  .content-wrap {
    height: 90%;
    position: relative;
    // overflow-y: auto;
  }
}

.paramx-wrap {
  float: right;
  margin-right: 6px;

  i {
    color: #f9bd00;
    margin-right: 4px;

    &:hover {
      color: #f9bd00;
      cursor: pointer;
    }
  }
}

.my-loading {
  font-size: 16px;
  color: #f9bd00;
  vertical-align: middle;
  font-weight: 600;
}

.mapLegend {
  position: absolute;
  bottom: 20px;
  padding: 0 20px;
  right: 0px;
  width: 16%;
  z-index: 1;
  background: #fff;
}
</style>
