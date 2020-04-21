<template>
  <div class="filter-container">
    <transition name="fade">
      <div v-show="isShowSelectPanel" class="slideup">
        <condition-filter :show="isShowSelectPanel" :selfData="selfData" @getCompet="getCompet"></condition-filter>
        <div class="scale">
          <scale-filter :show="isShowSelectPanel"></scale-filter>
        </div>
      </div>
    </transition>
    <competitive-list v-on:change-bcg="changeBcg" v-on:paint-chart="paintChart"></competitive-list>
  </div>
</template>

<script>
import ConditionFilter from "./ConditionFilter";
import ScaleFilter from "./ScaleFilter";
import CompetitiveList from "./CompetitiveList";
export default {
  data() {
    return {};
  },
  props: {
    selfData: {
      type: Object,
      default() {
        return {};
      }
    },
    isShowSelectPanel: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  methods: {
    changeBcg(val) {
      this.$emit("change-bcg", val);
    },
    paintChart(index, type) {
      this.$emit("paint-chart", index, type);
    },
    getCompet() {
      this.$emit("getCompet");
    }
  },
  components: {
    ConditionFilter,
    ScaleFilter,
    CompetitiveList
  }
};
</script>

<style scoped>
.filter-container {
  font-size: 12px;
  position: relative;
}

.filter-title {
  font-size: 12px;
  box-sizing: border-box;
  margin-bottom: -1px;
  /*padding: 10px 0;*/
}

.row-name {
  display: inline-block;
  width: 100px;
  padding: 10px 0 10px 15px;
}

.pulldown {
  width: 15px;
  margin-left: 5px;
}

.filter-item {
  cursor: pointer;
  padding: 10px 15px;
}

.active {
  background: #ebecee;
}

.filter-content {
  width: 100%;
  background: #ebecee;
  font-size: 12px;
  box-sizing: border-box;
  padding: 15px;
  height: 44px;
}

.time-item {
  padding-right: 45px;
  text-align: left;
  cursor: pointer;
}

.time-item:hover {
  color: #f9bd00;
}

.color-picker {
  margin-top: -4px;
  display: inline-block;
}

.current-month {
  color: #f9bd00;
}

.disabled-month {
  color: #b3b3b3;
  cursor: auto;
}

.slideup {
  height: 76px;
}

.fade-enter,
.fade-leave-to {
  /* .fade-leave-active in below version 2.1.8 */
  height: 0px;
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}

@media screen and (min-width: 2100px) {
  .filter-title {
    font-size: 16px;
  }

  .filter-content {
    font-size: 16px;
  }

  .row-name {
    width: 150px;
  }
}

.scale {
  height: 40px;
  overflow: hidden;
}
</style>
