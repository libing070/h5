<template>
  <div class="scale-container">
    <div class="filter-title">
      <span class="row-name">{{ $t("m.left.title2") }}:</span>
      <span class="row-content">
        <span class="filter-item" v-for="(filter, index) in scaleKeys">
          {{ filter }}
          <el-select v-model="min[index]" size="mini" class="filter-select" @change="commitFilters">
            <el-option v-for="(item, index) in getMinData(filter, index)" :key="index" :label="item" :value="item"></el-option>
          </el-select>-
          <el-select v-model="max[index]" size="mini" class="filter-select" @change="commitFilters">
            <el-option v-for="item in getMaxData(filter, index)" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </span>
        <span class="filter-item">
          {{ $t("m.left.key21") }}
          <el-input-number v-model="clue[0]" size="mini" controls-position="right" @change="commitChange" :step="parseInt(imgFilters['nodemm'][1] / inputNumberStep)" @focus="changeModelel('clue1')" :min="imgFilters['nodemm'][0]" :max="imgFilters['nodemm'][1]" class="number"></el-input-number>-
          <el-input-number v-model="clue[1]" size="mini" controls-position="right" @change="commitChange" :step="parseInt(imgFilters['nodemm'][1] / inputNumberStep)" @focus="changeModelel('clue2')" :min="imgFilters['nodemm'][0]" :max="imgFilters['nodemm'][1]" class="number"></el-input-number>
        </span>
        <span class="filter-item">
          {{ $t("m.left.key22") }}
          <el-input-number
            v-model="coincide[0]"
            size="mini"
            controls-position="right"
            @change="commitChange"
            :step="parseInt((imgFilters['edgemm'][1] / inputNumberStep > 0 && imgFilters['edgemm'][1] / inputNumberStep < 1)?1:(imgFilters['edgemm'][1] / inputNumberStep))"
            @focus="changeModelel('coincide1')"
            :min="imgFilters['edgemm'][0]"
            :max="imgFilters['edgemm'][1]"
            class="number"
          ></el-input-number>-
          <el-input-number
            v-model="coincide[1]"
            size="mini"
            controls-position="right"
            @change="commitChange"
            :step="parseInt((imgFilters['edgemm'][1] / inputNumberStep > 0 && imgFilters['edgemm'][1] / inputNumberStep < 1)?1:(imgFilters['edgemm'][1] / inputNumberStep))"
            @focus="changeModelel('coincide2')"
            :min="imgFilters['edgemm'][0]"
            :max="imgFilters['edgemm'][1]"
            class="number"
          ></el-input-number>
        </span>
        <button class="reset" @click="reset">{{$t('m.left.btn3')}}</button>
      </span>
    </div>
  </div>
</template>

<script>
import * as types from "../../../store/mutation-types";
import Vue from "vue";
export default {
  name: "ScaleFilter",
  data() {
    return {
      // scaleFilter: {
      //   字体大小: {
      //     min: [1, 2, 4, 6, 8, 10, 12, 16, 18, 20, 24, 32, 48, 72, 81, 90, 99],
      //     max: [1, 2, 4, 6, 8, 10, 12, 16, 18, 20, 24, 32, 48, 72, 81, 90, 99]
      //   },
      //   连线粗细: {
      //     min: [
      //       0.01,
      //       0.1,
      //       0.5,
      //       1,
      //       2,
      //       4,
      //       6,
      //       8,
      //       10,
      //       16,
      //       20,
      //       24,
      //       32,
      //       48,
      //       72,
      //       81,
      //       90,
      //       99
      //     ],
      //     max: [
      //       0.01,
      //       0.1,
      //       0.5,
      //       1,
      //       2,
      //       4,
      //       6,
      //       8,
      //       10,
      //       16,
      //       20,
      //       24,
      //       32,
      //       48,
      //       72,
      //       81,
      //       90,
      //       99
      //     ]
      //   },
      //   球体面积: {
      //     min: [2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 48, 72, 81],
      //     max: [2, 4, 6, 8, 10, 12, 16, 20, 24, 40, 48, 72, 81]
      //   }
      // },
      min: [10, 0.01, 20],
      max: [18, 10, 40],
      coincide: [0, 0],
      clue: [0, 0],
      currentModel: "",
      imgFilters: { nodemm: [0, 0], edgemm: [0, 0] },
      inputNumberStep: 200
    };
  },
  computed: {
    scaleFilter() {
      // 国际化
      if (this.$i18n.locale === "ch") {
        return {
          字体大小: {
            min: [1, 2, 4, 6, 8, 10, 12, 16, 18, 20, 24, 32, 48, 72, 81, 90, 99],
            max: [1, 2, 4, 6, 8, 10, 12, 16, 18, 20, 24, 32, 48, 72, 81, 90, 99]
          },
          连线粗细: {
            min: [0.01, 0.1, 0.5, 1, 2, 4, 6, 8, 10, 16, 20, 24, 32, 48, 72, 81, 90, 99],
            max: [0.01, 0.1, 0.5, 1, 2, 4, 6, 8, 10, 16, 20, 24, 32, 48, 72, 81, 90, 99],
          },
          球体面积: {
            min: [2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 48, 72, 81],
            max: [2, 4, 6, 8, 10, 12, 16, 20, 24, 40, 48, 72, 81]
          }
        };
      } else {
        return {
          'Font Size': {
            min: [1, 2, 4, 6, 8, 10, 12, 16, 18, 20, 24, 32, 48, 72, 81, 90, 99],
            max: [1, 2, 4, 6, 8, 10, 12, 16, 18, 20, 24, 32, 48, 72, 81, 90, 99]
          },
          'Thickness': {
            min: [0.01, 0.1, 0.5, 1, 2, 4, 6, 8, 10, 16, 20, 24, 32, 48, 72, 81, 90, 99],
            max: [0.01, 0.1, 0.5, 1, 2, 4, 6, 8, 10, 16, 20, 24, 32, 48, 72, 81, 90, 99],
          },
          'Area': {
            min: [2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 48, 72, 81],
            max: [2, 4, 6, 8, 10, 12, 16, 20, 24, 40, 48, 72, 81]
          }
        };
      }
    },
    scaleKeys() {
      return Object.keys(this.scaleFilter);
    },
    filters() {
      return this.$store.state.parse.defaultFilters;
    },
    settings() {
      return this.$store.state.parse.settings;
    },
    changeFilters() {
      return this.$store.state.parse.filters;
    },
    isFresh() {
      return this.$store.state.parse.isFresh;
    },
    selectedData() {
      return this.$store.state.parse.selectedSamples;
    },
    territory() {
      return this.$store.state.parse.territory;
    }
  },
  props: {
    compitiveData: {
      type: Array,
      default() {
        return [];
      }
    },
    selfData: {
      type: Object,
      default() {
        return {};
      }
    },
    show: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  watch: {
    filters() {
      if (this.$store.state.parse.defaultFilters) {
        this.imgFilters = Object.assign(
          {},
          this.$store.state.parse.defaultFilters
        );
        //          if (this.changeFilters[0][0] === 0) {
        //            this.$store.commit(types.SET_FILTER, [this.$store.state.parse.defaultFilters.nodemm, this.$store.state.parse.defaultFilters.edgemm])
        //          }
      }
      if (
        this.clue[0] === 0 &&
        this.clue[1] === 0 &&
        this.coincide[0] === 0 &&
        this.coincide[1] === 0
      ) {
        this.clue[0] = this.imgFilters["nodemm"][0];
        this.clue[1] = this.imgFilters["nodemm"][1];
        this.coincide[0] = this.imgFilters["edgemm"][0];
        this.coincide[1] = this.imgFilters["edgemm"][1];
      }
    },
    selectedData() {
      Vue.set(this.clue, "0", 0);
      Vue.set(this.clue, "1", 0);
      Vue.set(this.coincide, "0", 0);
      Vue.set(this.coincide, "1", 0);
      this.imgFilters.nodemm = [0, 0];
      this.imgFilters.edgemm = [0, 0];
      this.$store.commit(types.SET_FILTER, [[0, 0], [0, 0]]);
    },
    territory() {
      Vue.set(this.clue, "0", 0);
      Vue.set(this.clue, "1", 0);
      Vue.set(this.coincide, "0", 0);
      Vue.set(this.coincide, "1", 0);
      this.imgFilters.nodemm = [0, 0];
      this.imgFilters.edgemm = [0, 0];
      this.$store.commit(types.SET_FILTER, [[0, 0], [0, 0]]);
    }
  },
  mounted() {
    //      this.commitFilters()
    if (this.$store.state.parse.filters[0][0] !== 0) {
      this.clue[0] = this.$store.state.parse.filters[0][0];
      this.clue[1] = this.$store.state.parse.filters[0][1];
      this.coincide[0] = this.$store.state.parse.filters[1][0];
      this.coincide[1] = this.$store.state.parse.filters[1][1];
    }
    this.imgFilters = {
      nodemm: Object.assign([], this.$store.state.parse.filters[0]),
      edgemm: Object.assign([], this.$store.state.parse.filters[1])
    };
    this.min[0] = this.settings.font_size[0];
    this.max[0] = this.settings.font_size[1];
    this.min[1] = this.settings.edge_size[0];
    this.max[1] = this.settings.edge_size[1];
    this.min[2] = this.settings.node_size[0];
    this.max[2] = this.settings.node_size[1];
  },
  methods: {
    getMinData(filter, index) {
      let maxData = this.max[index];
      return this.scaleFilter[filter].min.filter(i => i < maxData);
    },
    getMaxData(filter, index) {
      let minData = this.min[index];
      return this.scaleFilter[filter].max.filter(i => i > minData);
    },
    commitFilters() {
      this.$store.commit(types.SET_SETTINGS, this.params());
    },
    changeModelel(val) {
      this.currentModel = val;
    },
    commitChange(val) {
      if (this.currentModel === "clue1") {
        Vue.set(this.clue, "0", val);
      } else if (this.currentModel === "clue2") {
        Vue.set(this.clue, "1", val);
      } else if (this.currentModel === "coincide1") {
        Vue.set(this.coincide, "0", val);
      } else if (this.currentModel === "coincide2") {
        Vue.set(this.coincide, "1", val);
      }
      this.$store.commit(types.SET_FILTER, [
        Object.assign([], this.clue),
        Object.assign([], this.coincide)
      ]);
    },
    params() {
      let settings = {};
      settings.font_size = [this.min[0], this.max[0]];
      settings.edge_size = [this.min[1], this.max[1]];
      settings.node_size = [this.min[2], this.max[2]];
      return settings;
      //        params.append('relation', this.selected[1])
      //        params.append('settings', '{"font_size":5,"edge_size":8,"node_size":[4,8]}')
    },
    reset() {
      if (
        this.min.join() !== [10, 0.01, 20].join() ||
        this.max.join() !== [18, 10, 40].join()
      ) {
        this.min = [10, 0.01, 20];
        this.max = [18, 10, 40];
        this.commitFilters();
      }
    }
  }
};
</script>

<style scoped>
.scale-container {
  border: 1px solid #ccc;
  border-bottom: none;
  margin-top: -1px;
}

.filter-title {
  font-size: 12px;
  box-sizing: border-box;
  /*margin-bottom: -1px;*/
  /*padding: 10px 0;*/
}

.row-name {
  display: inline-block;
  width: 100px;
  padding: 10px 0 10px 15px;
}

.row-content {
}

.filter-item {
  cursor: pointer;
  padding: 10px 10px;
}

.filter-select {
  width: 55px;
}

.number {
  width: 85px;
}

.reset {
  padding: 0 15px;
  height: 28px;
  border: 1px solid rgb(228, 228, 228);
  background-color: #fff;
  cursor: pointer;
  outline: none;
}

.reset:hover {
  background-color: #f9bd00;
  color: #fff;
}

@media screen and (min-width: 2100px) {
  .filter-title {
    font-size: 16px;
  }

  .row-name {
    width: 150px;
  }
}
</style>
