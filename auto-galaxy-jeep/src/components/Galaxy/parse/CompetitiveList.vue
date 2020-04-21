<template>
  <div class="competitive-container">
    <div class="filter-title row-content">
      <span class="row-name filter-item" v-for="(filter, index) in scaleKeys" :key="index" @click="changeTab(index, $event)" v-bind:class="{active: activeIndex[index]}">
        {{ filter }}
        <i :class="activeIndex[index]?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
      </span>
    </div>
    <transition name="fade">
      <span :class="{ 'left-0':isCh, 'list-panel':true, 'left-0-en': !isCh}" v-if="isCompitiveOpen">
        <competitive-panel :compitiveData="compitiveDataSlice" :selfData="selfdata"></competitive-panel>
      </span>
    </transition>
    <transition name="fade">
      <span :class="{ 'left-1':isCh, 'list-panel':true, 'left-1-en': !isCh}" v-if="isValidOpen">
        <ul class="competive-list valid-list">
          <li v-for="(item, index) in validCompitive" :key="index">{{ item }}</li>
        </ul>
      </span>
    </transition>
    <transition name="fade">
      <span class="list-panel list-scope" :class="{ 'left-2':isCh, 'left-2-en': !isCh}" v-if="this.activeIndex[2]">
        <ul class="competive-list list-scope">
          <li v-for="(item, index) in scoped" :key="index" @click="changeScope(item)" v-bind:class="{'scope-active':  item == scopeType}" class="scope">{{ item }}</li>
        </ul>
      </span>
    </transition>
    <transition name="fade">
      <span class="list-panel check-panel" :class="{ 'left-3':isCh, 'left-3-en': !isCh}" v-if="this.activeIndex[3]">
        <div class="competive-list check-panel-list">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="check-item">{{$t('m.left.check1')}}</el-checkbox>
          <el-checkbox v-model="priceExclude" @change="changePrice" v-if="isShowPrice" class="check-item">{{$t('m.left.check2')}}</el-checkbox>
          <el-checkbox v-model="levelExclude" v-if="isShowPrice" v-for="(item, index) in Object.keys(levelData)" @change="excludeLevel(item)" :label="item" :key="index" class="check-item">{{ item }}</el-checkbox>
          <div style="margin: 5px 0;"></div>
          <el-checkbox-group v-model="checkedComptis" @change="handleCheckedCompesChange">
            <el-checkbox v-for="(item, key) in excludeData()" :value="key" :label="key" :key="key" class="check-item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </span>
    </transition>
    <span class="history">
      <img src="../../../assets/parse/arrow-left.png" class="arrow" @click="forward">
      <span id="min-img">{{ imageArrayData.index }}</span>/
      <span id="max-img">{{ imageArrayData.data.length }}</span>
      <img src="../../../assets/parse/arrow-right.png" class="arrow" @click="backForward">
    </span>
    <span class="bcg-switch">
      <span class="switch-item" v-for="(item, index) in switchData" :class="{'switch-item-active': switchIndex === index}" @click="switchBcg(index)">{{ item }}</span>
    </span>
  </div>
</template>

<script>
import Api from "../../../api/parse";
import * as types from "../../../store/mutation-types";
import CompetitivePanel from "./CompetitivePanel";

export default {
  data() {
    return {
      // scaleFilter: {
      //   竞品重合排行: [{ label: "长安", id: 1 }, { label: "宝马", id: 2 }],
      //   竞品热度排行: [{ label: "长安", id: 1 }, { label: "宝马", id: 2 }],
      //   竞品范围: [{ label: "长安", id: 1 }, { label: "宝马", id: 2 }],
      //   样本筛选: [{ label: "长安", id: 1 }, { label: "宝马", id: 2 }]
      // },
      isCh:this.$i18n.locale === "ch",
      activeIndex: { 0: false, 1: false, 2: false, 3: false },
      isOpen: false,
      isValidOpen: false,
      isCompitiveOpen: false,
      scoped: [0, 5, 15, 20, "5*5", "10*10", "20*20"],
      validCompitive: [],
      scopeType: 20,
      checkedComptis: [],
      checkAll: true,
      isIndeterminate: false,
      keyDict: {
        0: "brand",
        1: "manufacturer",
        2: "model",
        3: "style"
      },
      // switchData: ["黑", "白"],
      switchIndex: 1,
      historyImg: [1, 4],
      selfdata: {},
      priceExclude: false,
      levelExclude: [],
      levelData: {},
      allCheckedData: {},
      priceObj: {},
      bpPrice: []
    };
  },
  computed: {
    scaleFilter() {
      // 国际化
      if (this.$i18n.locale === "ch") {
        return {
          竞品重合排行: [{ label: "长安", id: 1 }, { label: "宝马", id: 2 }],
          竞品热度排行: [{ label: "长安", id: 1 }, { label: "宝马", id: 2 }],
          竞品范围: [{ label: "长安", id: 1 }, { label: "宝马", id: 2 }],
          样本筛选: [{ label: "长安", id: 1 }, { label: "宝马", id: 2 }]
        };
      } else {
        return {
          'Competition Coincidence Ranking': [{ label: "长安", id: 1 }, { label: "宝马", id: 2 }],
          'Competition Heat Ranking': [{ label: "长安", id: 1 }, { label: "宝马", id: 2 }],
          'Scope of Competition': [{ label: "长安", id: 1 }, { label: "宝马", id: 2 }],
          'Sample Screening': [{ label: "长安", id: 1 }, { label: "宝马", id: 2 }]
        };
      }
    },
    switchData() {
      // 国际化
      if (this.$i18n.locale === "ch") {
        return ["黑", "白"];
      } else {
        return ["Black", "White"];
      }
    },
    scaleKeys() {
      return Object.keys(this.scaleFilter);
    },
    compitiveDataSlice() {
      if (!this.compitiveData.length) return [];
      let datanew = Object.assign([], this.compitiveData);
      let len = datanew[0]["all"].length - 1;
      this.selfdata = datanew[0]["all"][len];
      if (typeof this.scopeType === "number") {
        return datanew[0]["all"].slice(0, this.scopeType);
      } else {
        let inter = this.scopeType.split("*");
        return datanew[0][parseInt(inter[0])];
      }
    },
    allCompiDataSlice() {
      let arr = [];
      let len = this.allCompitiveData;
      let datanew = Object.assign([], this.allCompitiveData);
      for (let i = 0; i < len.length; i++) {
        let temp = [];
        if (typeof this.scopeType === "number") {
          let len = datanew[i]["all"].length - 1;
          temp.push(datanew[i]["all"][len]);
          temp.push(datanew[i]["all"].slice(0, this.scopeType));
        } else {
          let inter = this.scopeType.split("*");
          let len = datanew[i]["all"].length - 1;
          temp.push(datanew[i]["all"][len]);
          temp.push(datanew[i][parseInt(inter[0])]);
        }
        arr.push(temp);
      }
      return arr;
    },
    chartParams() {
      return this.$store.state.parse.chartParams;
    },
    chartIdParams() {
      return this.$store.state.parse.chartIdParams;
    },
    type() {
      return this.keyDict[this.$store.state.parse.selectedType];
    },
    compitiveData() {
      return this.$store.state.parse.chartCompitiveData;
    },
    allCompitiveData() {
      return this.$store.state.parse.compitiveData;
    },
    isHeatmap() {
      return this.$store.state.parse.isHeatmap;
    },
    settings() {
      return this.$store.state.parse.settings;
    },
    filters() {
      return this.$store.state.parse.filters;
    },
    imageArrayData() {
      return this.$store.state.parse.imageDataArray;
    },
    flag() {
      return this.$store.state.contrast.flag;
    },
    selectedData() {
      return this.$store.state.parse.selectedSamples;
    },
    isShowPrice() {
      if (this.$store.state.parse.selectedType !== "2") {
        return false;
      } else {
        return true;
      }
    }
  },
  props: {
    selfData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    scopeType() {
      if (this.scopeType === 0) {
        this.activeIndex[1] = false;
        this.isValidOpen = false;
        this.validCompitive = Object.assign([], []);
      } else {
        this.getValidCompitive();
      }
    },
    compitiveData() {
      this.getValidCompitive();
    },
    validCompitive() {
      if (!this.flag && this.validCompitive) {
        if (this.validCompitive.length > 0 && this.scopeType !== 0) {
          this.activeIndex[1] = true;
          this.isValidOpen = true;
        } else {
          this.activeIndex[1] = false;
          this.isValidOpen = false;
        }
      }
    },
    compitiveDataSlice() {
      if (!this.flag) {
        if (this.compitiveDataSlice.length > 0) {
          this.activeIndex[0] = true;
          this.isCompitiveOpen = true;
        } else {
          this.activeIndex[0] = false;
          this.isCompitiveOpen = false;
        }
      }
    },
    flag() {
      if (this.flag) {
        this.isCompitiveOpen = false;
        this.isValidOpen = false;
        this.activeIndex = { 0: false, 1: false, 2: false, 3: false };
      }
    }
  },
  mounted() {
    if (this.selectedData.length !== 0) {
      this.getValidCompitive();
    }
  },
  methods: {
    getMinData(filter, index) {
      let maxData = this.max[index];
      return this.scaleFilter[filter].min.filter(i => i < maxData);
    },
    getMaxData(filter, index) {
      return this.scaleFilter[filter].max;
    },
    commitFilters() {
      this.$store.commit(types.SET_SETTINGS, this.params());
    },
    changeTab(index, event) {
      if (index === 0) {
        this.isCompitiveOpen = !this.isCompitiveOpen;
        this.activeIndex[index] = this.isCompitiveOpen;
        event.stopPropagation();
        if (this.flag) {
          this.$store.commit(types.CLOSE_HALF, true);
        }
      } else if (index === 1) {
        this.isValidOpen = !this.isValidOpen;
        this.activeIndex[index] = this.isValidOpen;
        event.stopPropagation();
        if (this.flag) {
          this.$store.commit(types.CLOSE_HALF, true);
        }
      } else {
        if (!this.activeIndex[index]) {
          this.activeIndex[2] = false;
          this.activeIndex[3] = false;
          this.activeIndex[index] = true;
          if (index === 3) {
            this.checkAll = this.checkedComptis.length === 0 ? true : false;
            //              this.priceExclude = false
            //              this.levelExclude = this.levelExclude
            this.checkedComptis =
              this.checkedComptis.length === 0
                ? Object.keys(this.excludeData())
                : this.checkedComptis;
          }
        } else {
          this.activeIndex[2] = false;
          this.activeIndex[3] = false;
        }
      }
    },
    getValidCompitive() {
      let _this = this;
      const params = new URLSearchParams();
      if (!this.compitiveDataSlice.length) return [];
      if (!this.allCompiDataSlice.length) return [];
      let cp = this.compitiveDataSlice.map(i => {
        if (i) return i[this.type].id;
      });
      let id = this.allCompiDataSlice[0][0][this.type].id;
      params.append("relation", this.chartParams.relation);
      params.append("type", this.chartParams.type);
      params.append("id", id);
      params.append("date", this.chartParams.date);
      params.append("cp", cp.join());
      if (this.chartParams.province) {
        params.append("province", this.chartParams.province);
      }
      //        this.$axios.post(Api.validData, params).then(function (res) {
      this.$axios
        .post("/car/queryValidCompetitionServlet", params)
        .then(function(res) {
          _this.validCompitive = res.data.data;
        });
    },
    changeScope(item) {
      this.scopeType = item;
      this.$store.commit(types.SET_SCOPETYPE, this.scopeType);
      this.activeIndex[2] = false;
    },
    params() {
      let settings = {};
      settings.font_size = [this.min[0], this.max[0]];
      settings.edge_size = [this.min[1], this.max[1]];
      settings.node_size = [this.min[2], this.max[2]];
      return settings;
    },
    excludeData() {
      let type = this.type;
      let data = this.allCompiDataSlice;
      let obj = {};
      let tempArr = [];
      for (let i = 0; i < data.length; i++) {
        obj[data[i][0][type].id] = data[i][0][type].name;
        if (data[i][0].modelLevel) {
          if (!this.levelData[data[i][0].modelLevel.name]) {
            this.levelData[data[i][0].modelLevel.name] = {};
          }
          this.levelData[data[i][0].modelLevel.name][data[i][0][type].id] =
            data[i][0].modelLevel.name;
        }
        this.priceObj[data[i][0][type].id] = data[i][0].price;
        tempArr.push(data[i][0].price);
        for (let j = 0; j < data[i][1].length; j++) {
          obj[data[i][1][j][type].id] = data[i][1][j][type].name;
          this.priceObj[data[i][1][j][type].id] = data[i][1][j].price;
          if (data[i][1][j].modelLevel) {
            if (!this.levelData[data[i][1][j].modelLevel.name]) {
              this.levelData[data[i][1][j].modelLevel.name] = {};
            }
            this.levelData[data[i][1][j].modelLevel.name][
              data[i][1][j][type].id
            ] = data[i][1][j].modelLevel.name;
          }
        }
      }
      this.bpPrice = tempArr;
      this.allCheckedData.all = Object.keys(obj);
      return obj;
    },
    handleCheckAllChange(val) {
      this.checkedComptis = val ? Object.keys(this.excludeData()) : [];
      this.isIndeterminate = false;
      this.priceExclude = false;
      this.updateChartParams();
    },
    changePrice(val) {
      let tempBpPrice = this.bpPrice.map(i => [i.pricelow, i.pricehigh]);
      let tempPrice = [];
      if (this.priceExclude) {
        let result = this.excludePrice([], tempBpPrice);
        for (let i in this.priceObj) {
          let k = 0;
          let temp = this.priceObj[i];
          while (result) {
            if (temp.pricehigh < result[k][0] || temp.pricelow > result[k][1]) {
              break;
            } else {
              tempPrice.push(i);
              if (k === result.length - 1) break;
            }
            k++;
          }
        }
        this.allCheckedData.price = tempPrice;
        this.checkedComptis = this.mergeCheckedData();
        this.handleCheckedCompesChange(this.checkedComptis);
      } else {
        this.checkedComptis = this.mergeCheckedData(
          Object.keys(this.excludeData())
        );
        this.handleCheckedCompesChange(this.checkedComptis);
      }
    },
    mergeCheckedData(data) {
      let tempArr = Object.keys(this.excludeData());
      let tempLevelData = [];
      // console.log(this.levelExclude)
      if (!this.priceExclude && this.levelExclude.length === 0) {
        return Object.keys(this.excludeData());
      }
      if (this.priceExclude) {
        let b = new Set(this.allCheckedData.price);
        tempArr = new Set([...tempArr].filter(x => b.has(x)));
      }
      for (let i in this.levelExclude) {
        let b = new Set(this.allCheckedData[this.levelExclude[i]]);
        tempLevelData = new Set([...tempLevelData, ...b]);
      }
      if (tempLevelData.length !== 0) {
        tempArr = new Set([...tempArr].filter(x => tempLevelData.has(x)));
      }
      return Array.from(tempArr);
    },
    handleCheckedCompesChange(value) {
      let checkedCount = this.checkedComptis.length;
      this.checkAll = checkedCount === Object.keys(this.excludeData()).length;
      this.isIndeterminate =
        checkedCount > 0 &&
        checkedCount < Object.keys(this.excludeData()).length;
      this.updateChartParams();
    },
    excludePrice(result, priceArr) {
      if (result.length === 0) result.push(priceArr[0]);
      for (let i = 0; i < priceArr.length; i++) {
        for (let j = 0; j < result.length; j++) {
          if (result[j][1] < priceArr[i][0] || result[j][0] > priceArr[i][1]) {
            result.push(priceArr[i]);
          } else {
            let min = Math.min(result[j][0], priceArr[i][0]);
            let max = Math.max(result[j][1], priceArr[i][1]);
            result[j] = [min, max];
          }
        }
      }
      return result;
    },
    excludeLevel(val) {
      for (let i in this.levelExclude) {
        this.allCheckedData[val] = Object.keys(
          this.levelData[this.levelExclude[i]]
        );
      }
      this.checkedComptis = this.mergeCheckedData();
      this.handleCheckedCompesChange();
    },
    updateChartParams() {
      let paramsId = this.chartIdParams.id;
      let paramsIdcolor = JSON.parse(this.chartIdParams.id_color);
      let excludes = this.changeArrToObj(this.checkedComptis);
      let newId = [];
      let newIdcolor = [];
      for (let j = 0; j < paramsId.length; j++) {
        if (paramsId[j] in excludes) {
          newId.push(paramsId[j]);
        }
      }
      for (let k = 0; k < paramsIdcolor.length; k++) {
        if (paramsIdcolor[k].id in excludes) {
          newIdcolor.push(paramsIdcolor[k]);
        }
      }
      let params = {
        date: this.chartParams.date,
        id: newId,
        id_color: JSON.stringify(newIdcolor),
        relation: this.chartParams.relation,
        type: this.chartParams.type
      };
      this.$store.commit(types.SET_PARAMS, params);
    },
    changeArrToObj(arr) {
      let obj = {};
      for (let i = 0; i < arr.length; i++) {
        obj[arr[i]] = 1;
      }
      return obj;
    },
    switchBcg(index) {
      this.switchIndex = index;
      this.$emit("change-bcg", index);
    },
    forward() {
      let index = this.imageArrayData.index;
      if (index <= 1) {
        this.$message({
          message: this.$i18n.locale === 'ch'? "最后一张":"the last one",
          customClass: "my-message-board",
          duration: 2000
        });
        return "";
      } else {
        this.$emit("paint-chart", index, "forward");
      }
    },
    backForward() {
      let index = this.imageArrayData.index;
      if (index >= this.imageArrayData.data.length) {
        this.$message({
          message: this.$i18n.locale === 'ch'? "最后一张":"the last one",
          duration: 2000,
          customClass: "my-message-board"
        });
        return "";
      } else {
        this.$emit("paint-chart", index, "backforward");
      }
    },
    distance(index) {
      if (index > 1) {
        return this.activeIndex[index];
      }
    }
  },
  components: {
    CompetitivePanel
  }
};
</script>

<style scoped>
.competitive-container {
  border: 1px solid #ccc;
  position: relative;
}

.bcg-switch {
  display: inline-block;
  width: 90px;
  border: 1px solid #e8e9eb;
  float: right;
  margin: 5px 20px 0 0;
  height: 25px;
}

.switch-item {
  display: inline-block;
  width: 45px;
  height: 25px;
  box-sizing: border-box;
  padding: 3px;
  text-align: center;
  cursor: pointer;
}

.switch-item-active {
  background-color: #f9bd00;
  /*color: #fff;*/
}

.filter-title {
  font-size: 12px;
  box-sizing: border-box;
  margin-bottom: -1px;
  /*padding: 10px 0;*/
}

.row-name {
  display: inline-block;
  min-width: 100px;
  padding: 10px 0 10px 15px;
}

.row-content {
  display: inline-block;
}

.filter-item {
  cursor: pointer;
  /*padding: 10px 15px;*/
}

.filter-select {
  width: 75px;
}

.list-panel {
  position: absolute;
  z-index: 102;
  top: 37px;
  max-height: 500px;
  width: 113px;
  overflow: hidden;
  border: 1px solid #ebeced;
  /*padding-bottom: 3px;*/
}

.history {
  display: inline-block;
  height: 25px;
  float: right;
  margin: 10px 20px 0 0;
}

.arrow {
  width: 12px;
  height: 12px;
  cursor: pointer;
  vertical-align: middle;
}

#max-img {
  margin: 0 10px 0 3px;
}

#min-img {
  margin: 0 3px 0 10px;
}

.active {
  background: #ebecee;
}

.left-0 {
  left: -1px;
}

.left-1 {
  left: 114px;
}

.left-2 {
  left: 228px;
}

.left-3 {
  left: 346px;
}



.competive-list {
  padding: 3px 0;
  width: 98px;
  max-height: 250px;
  display: inline-block;
  background: #fff;
  vertical-align: top;
  list-style: none;
  margin: 0;
  overflow-y: auto;
}

.valid-list {
  width: 131px;
}

.competive-list ul {
  display: inline-block;
  padding: 0;
  margin: 0;
  width: 140px;
  height: 400px;
  list-style: none;
  overflow-x: hidden;
  overflow-y: scroll;
}

.competive-list li {
  /*height: 20px;*/
  margin: 3px 0;
  font-size: 12px;
  padding: 3px 15px;
}

.list-scope {
  width: 115px;
  /*padding-top: 6px;*/
}

.scope-active,
.scope:hover {
  color: #f9bd00;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
  /*margin: 0 -15px;*/
  /*padding: 6px 15px 0 15px;*/
}

.check-item {
  margin: 0 20px 0 0;
}

.check-panel {
  width: 300px;
  max-height: 250px;
  overflow-x: hidden;
  overflow-y: auto;
  /*padding: 0 0 3px 0;*/
  padding: 10px 0;
  background: #fff;
}

.check-panel-list {
  width: 310px;
  max-height: 250px;
  padding: 7px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */
 {
  opacity: 0;
  transform: translateY(-10px);
}

.my-message-board {
  background-color: #3794ff;
}

@media screen and (min-width: 1600px) {
  .competive-list {
    max-height: 500px;
  }
}

@media screen and (min-width: 2100px) {
  .filter-title {
    font-size: 16px;
  }

  .row-name {
    width: 150px;
  }

  .list-panel {
    width: 166px;
  }

  .competive-list li {
    font-size: 16px;
  }

  .valid-list {
    width: 179px;
  }

  .left-1 {
    left: 166px;
    margin-left: -1px;
  }

  .left-2 {
    left: 331px;
  }

  .left-3 {
    left: 496px;
  }

  .list-scope {
    width: 165px;
  }

  .check-panel {
    width: 300px;
  }
}

.left-0-en {
  left: 0;
  width: 194px;
}

.left-0-en .competive-list{
  width: 194px;
}

.left-1-en {
  left: 194px;
  width: 155px;
}

.left-1-en .competive-list{
  width: 155px;
}

.left-2-en {
  left: 350px;
  width: 134px;
}

.left-2-en .competive-list{
  width: 134px;
}

.left-3-en {
  left: 486px;
  /* width: 134px; */
}

.left-3-en .competive-list{
  /* width: 134px; */
}
</style>
