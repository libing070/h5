<template>
  <transition name="fade">
    <div class="box-container">
      <div class="selected-panel">
        <ul class="panel-left">
          <li v-for="(item, index) in panelData" :class="{'active-type': index === selectedType}" @click="changeType(index)" :key="index">
            {{ item }}
            <img src="../../../assets/img/right-arrow.png" class="box-img" alt>
          </li>
          <!--<button class="query-btn" @click="handleSelect">确定</button>-->
        </ul>
        <div class="panel-right">
          <!-- <input type="text" v-model="searchValue" placeholder="搜索" class="search-item"> -->
          <div class="list-wrapper" v-loading="loading_select" element-loading-spinner="el-icon-loading">
            <ul>
              <li v-for="(item, index) in samples" :class="{'active-type': index === selectedItem}" @click="handleCommit(item, index)" :key="index">{{ item.name }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import * as types from "../../../store/mutation-types";

export default {
  data() {
    return {
      selectedType: "2",
      selectedItem: "0",
      selectSample: [],
      samplesId: {},
      panelData: {
        0: this.$i18n.t('m.left.type[0]'),
        1: this.$i18n.t('m.left.type[1]'),
        2: this.$i18n.t('m.left.type[2]'),
        3: this.$i18n.t('m.left.type[3]')
      },
      searchValue: "",
      loading_select: false
    };
  },
  computed: {
    idDict() {
      let obj = {};
      if (this.allSamples[this.selectedType]) {
        let len = this.allSamples[this.selectedType];
        for (let i = 0; i < len.length; i++) {
          obj[len[i].id] = len[i].name;
        }
      }
      return obj;
    },
    samples() {
      if (this.searchValue === "") {
        if (this.allSamples[this.selectedType]) {
          this.loading_select = false;
          return this.allSamples[this.selectedType].slice(0, 1000);
        } else {
          this.loading_select = true;
        }
      } else {
        this.loading_select = false;
        return this.allSamples[this.selectedType].filter(
          i => i.name.indexOf(this.searchValue) !== -1
        );
      }
    },
    allSamples() {
      return this.$store.state.parse.allSamples;
    },
    selectedSamples() {
      return this.$store.state.parse.selectedSamples;
    },
    selectType() {
      return this.$store.state.parse.selectedType;
    }
  },
  watch: {
    selectedSamples() {
      if (!this.selectedSamples.length) {
        this.selectSample = [];
        this.samplesId = {};
      } else {
        this.selectSample = [];
        this.samplesId = {};
        this.selectSample = Object.assign(
          [],
          this.$store.state.parse.selectedSamples
        );
        for (let i = 0; i < this.selectSample.length; i++) {
          this.samplesId[this.selectSample[i].value] = this.selectSample[
            i
          ].label;
        }
      }
    },
    selectType() {
      this.selectSample = [];
      this.samplesId = {};
    }
  },
  mounted() {
    this.selectedType = this.$store.state.parse.selectedType;
    this.selectSample = Object.assign(
      [],
      this.$store.state.parse.selectedSamples
    );
    for (let i = 0; i < this.selectSample.length; i++) {
      this.samplesId[this.selectSample[i].value] = this.selectSample[i].label;
    }
  },
  methods: {
    changeType(index) {
      this.$store.commit(types.SET_SAMPLES, []);
      this.selectSample = [];
      this.samplesId = {};
      this.selectedType = index;
      this.$store.commit(types.SET_SELECTEDTYPE, index);
    },
    handleCommit(item, index) {
      this.selectedItem = index;
      if (!(item.id in this.samplesId)) {
        this.samplesId[item.id] = item.name;
        this.selectSample.push({ value: item.id, label: item.name });
        this.$store.commit(types.SET_SAMPLES, this.selectSample);
      }
    },
    // handleSelect () {
    //   this.$emit('change-data')
    //   this.$store.commit(types.CHANGE_MASK_STATE, false)
    // },
    updateSamplesId() {
      this.samplesId = {};
      let data = this.selectSample;
      for (let i = 0; i < data.length; i++) {
        this.samplesId[data[i].value] = data[i].label;
      }
    }
  }
};
</script>

<style scoped>
.box-container {
  background-color: #fff;
  width: 400px;
  border: 1px solid #e4e4e4;
  border-left: none;
}

/* 添加动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
 {
  opacity: 0;
  transform: translateY(-10px);
}

.selected-items {
  /*padding: 5px;*/
  width: 100%;
  font-size: 12px;
  padding: 6px 0 0 6px;
  height: 17px;
  box-sizing: border-box;
  /*transform: scale(0.83);*/
}

.selected-panel {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
}

.panel-left {
  position: absolute;
  width: 100px;
  padding: 0;
  margin: 0;
  height: 199px;
  border: 1px solid #dfe0e1;
  display: inline-block;
}

.panel-left li {
  list-style: none;
  font-size: 12px;
  height: 25px;
  box-sizing: border-box;
  padding: 5px 10px 0 15px;
  cursor: pointer;
}

.box-img {
  width: 7px;
  height: 10px;
  float: right;
  margin-top: 3px;
}

.panel-right {
  position: absolute;
  left: 105px;
  top: 0;
  display: inline-block;
  width: 320px;
  padding: 0;
  margin: 0 -40px 0 -5px;
  height: 199px;
  overflow: hidden;
}

.panel-right ul {
  margin: 0;
  padding: 0;
}

.panel-right li {
  list-style: none;
  font-size: 12px;
  height: 25px;
  box-sizing: border-box;
  padding: 5px 10px 0 15px;
  cursor: pointer;
}

.panel-left li:hover {
  background-color: #dfe0e1;
}

.panel-right li:hover {
  background-color: #dfe0e1;
}

.active-type {
  background: #dfe0e1;
}

.search-item {
  width: 282px;
  height: 20px;
  padding-left: 14px;
  outline: none;
}

.list-wrapper {
  height: 175px;
  overflow-y: scroll;
  margin-left: 1px;
}

.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.query-btn {
  position: absolute;
  bottom: -1px;
  outline: none;
  width: 102px;
  height: 25px;
  margin-left: -1px;
  background-color: #1b96fe;
  border: 1px solid #e4e4e4;
  cursor: pointer;
  color: #fff;
}

.query-btn:hover {
  background-color: #1a74cb;
}
</style>
