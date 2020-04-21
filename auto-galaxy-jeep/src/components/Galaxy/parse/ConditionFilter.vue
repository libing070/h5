<template>
  <div class="filter-container">
    <div class="filter-title">
      <span class="row-name">{{ $t("m.left.title1") }}:</span>
      <span class="row-content">
        <span class="filter-item" v-for="(condition, index) in conditions" @click="changeTab(index, condition)" v-bind:class="{active: index === activeIndex}">
          {{ condition }}
          <i :class="index === activeIndex?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
        </span>
      </span>
    </div>
    <transition name="fade">
      <div class="filter-content" v-if="isOpen">
        <span class="time-item" v-if="conditionType !== 'heatmap' && conditionType !== 'territory' && conditionType !== 'time'" v-bind:class="{ 'color-picker': isShowColorPicker}" v-for="(item, index) in selectedData">
          <span v-bind:class="{ 'current-month': isCurrentdata(item), 'disabled-month': isDisable(item) }" @click="handleSelectedChange(item)">{{ item.label }}</span>
          <el-color-picker v-model="color[activeIndex][index]" size="mini" v-if="isShowColorPicker" style="vertical-align: middle" @change="colorDataRecord(item, index)"></el-color-picker>
        </span>

        <span v-if="conditionType === 'time'">
          <el-date-picker placeholder="选择起始月" v-model="sDate" :picker-options="setDisabledMonth" @change="changeMonth" value-format="yyyy-MM" style="width:140px" clearable size="mini" type="month"></el-date-picker>
          <span>-</span>
          <el-date-picker placeholder="选择结束月" v-model="eDate" :picker-options="setDisabledMonth" @change="changeMonth" value-format="yyyy-MM" style="width:140px" size="mini" type="month"></el-date-picker>
          <el-button type="text" @click="getDate(1) " style="margin-left:30px">{{$t('m.left.date1')}}</el-button>
          <el-button type="text" @click="getDate(2)">{{$t('m.left.date2')}}</el-button>
          <el-button type="text" @click="getDate(3)">{{$t('m.left.date3')}}</el-button>
        </span>

        <span v-if="conditionType === 'heatmap'" class="heatmap">
          <div style="display: inline-block">
            <span class="left-color">
              <el-radio v-model="heatmapType" label="2" @change="heatmapChange">{{$t('m.left.heat[0]')}}</el-radio>
              <span class="two-color-title">{{$t('m.left.heat[2]')}}</span>
              <el-color-picker v-model="minColor" size="mini" style="vertical-align: middle" @change="colorDataRecord"></el-color-picker>
              <br />
            </span>
            <el-slider v-model="colorValueTwo" range :max="colorValueTwoMax" :min="colorValueTwoMin" :step="colorValueTwoMax/100" @change="commitSlider" class="tow-color-select">
              <!--:step="colorValueTwoMax/colorValueTwoMin > 0?1000:1">-->
            </el-slider>
            <span class="right-color">
              <span class="two-color-title">{{$t('m.left.heat[3]')}}</span>
              <el-color-picker size="mini" style="vertical-align: middle" v-model="maxColor" @change="colorDataRecord"></el-color-picker>
              <br />
            </span>
          </div>
          <div style="display: inline-block; margin-left: 30px">
            <el-radio v-model="heatmapType" label="5" @change="heatmapChange">{{$t('m.left.heat[1]')}}</el-radio>
            <el-slider v-model="colorValueFive" range :max="colorValueFiveMax" :min="colorValueFiveMin" :step="colorValueTwoMax/1000" @change="commitSlider" class="tow-color-select gradien"></el-slider>
          </div>
        </span>
        <span class="time-item nopadding" v-if="conditionType === 'territory'">
          <el-checkbox-group v-model="citys" @change="changeCitys">
            <el-checkbox v-for="(city, index) in selectedData" :disabled="isDisabled(index)" :label="city.label" :key="city.label">{{city.label}}</el-checkbox>
          </el-checkbox-group>
          <!--<span class="select-ok" @click="getCompet">确定</span>-->
        </span>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import * as types from "../../../store/mutation-types";
import moment from "moment";
import Province from "../../../assets/json/provinceData";
export default {
  data() {
    return {
      sDate: moment()
        .subtract(1, "months")
        .format("YYYY-MM"),
      eDate: moment()
        .subtract(1, "months")
        .format("YYYY-MM"),
      selected: [
        moment()
          .subtract(1, "months")
          .format("YYYY-MM") +
          "," +
          moment()
            .subtract(1, "months")
            .format("YYYY-MM"),
        "线索"
      ],
      activeIndex: "",
      isOpen: false,
      // keyDict: {
      //   brand: "品牌",
      //   country: "国别",
      //   countryClass: "国别类别",
      //   manufacturer: "厂商",
      //   model: "车型",
      //   modelLevel: "级别",
      //   bp: "本品",
      //   bjpj: "本竞品集",
      //   heatmap: "热力图"
      // },
      typeDict: {
        0: "brand",
        1: "manufacturer",
        2: "model",
        3: "style"
      },
      tabIndex: [],
      conditionType: "bp",
      color: [],
      selectedColor: {},
      relationDict: {
        线索: 0,
        关注: 1
      },
      relationDictEn: {
        Leads: 0,
        "Focus on": 1
      },
      heatmapType: "5",
      citys: ["全国"],
      colorValueTwo: [0, 0], // 两色推子选的值
      colorValueTwoMin: 0,
      colorValueTwoMax: 1000,
      colorValueFive: [0, 1000],
      colorValueFiveMin: 0,
      colorValueFiveMax: 1000,
      minColor: "#ffffff", // 两色选择的最小值颜色
      maxColor: "#ff0000", // 两色选择的最大值颜色
      isHaveValue: false, // 判断是否有返回值
      setDisabledMonth: {
        disabledDate: curDate => {
          // 小于等于16年或大于今年的年都disable
          return (
            curDate <= new Date("2016-12-31") ||
            curDate > moment().subtract(moment().date(), "days")
          );
        }
      },
      conditionData: {}
      //        isDisabled: false // 判断地域选项是否禁用
    };
  },
  props: {
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
  computed: {
    // relationDict() {
    //   // 国际化
    //   if (this.$i18n.locale === "ch") {
    //     return {
    //       线索: 0,
    //       关注: 1
    //     };
    //   } else {
    //     return {
    //       Leads: 0,
    //       'Focus on': 1
    //     };
    //   }
    // },
    keyDict() {
      // 国际化
      if (this.$i18n.locale === "ch") {
        return {
          brand: "品牌",
          country: "国别",
          countryClass: "国别类别",
          manufacturer: "厂商",
          model: "车型",
          modelLevel: "级别",
          bp: "本品",
          bjpj: "本竞品集",
          heatmap: "热力图"
        };
      } else {
        return {
          brand: "Brand",
          country: "Country",
          countryClass: "Country Type",
          manufacturer: "Manufacturer",
          model: "Model",
          modelLevel: "Level",
          bp: "Product",
          bjpj: "Collection",
          heatmap: "Thermogram"
        };
      }
    },
    selectedData() {
      return this.shiftObjectToArray(this.allData[this.activeIndex]);
    },
    maskState() {
      return this.$store.state.common.isMaskOpen;
    },
    conditions() {
      let arr = Object.keys(this.selfData);
      this.tabIndex = ["time", "relation", "territory"].concat(arr);
      let selfConditions = arr.map(i => this.keyDict[i]);
      // 国际化
      if (this.$i18n.locale === "ch") {
        return ["时间选择", "关系选择", "地域选择"].concat(selfConditions);
      } else {
        return ["Choose Time", "Choose Relation", "Choose Area"].concat(
          selfConditions
        );
      }
      // return ["时间选择", "关系选择", "地域选择"].concat(selfConditions);
    },
    allData() {
      const arr = Object.keys(this.selfData);
      let temp = arr.map(i => this.selfData[i]);
      // 国际化
      if (this.$i18n.locale === "ch") {
        return [
          [
            "2017-01",
            "2017-02",
            "2017-03",
            "2017-04",
            "2017-05",
            "2017-06",
            "2017-07",
            "2017-08",
            "2017-09",
            "2017-10",
            "2017-11",
            "2017-12"
          ],
          ["线索", "关注"],
          this.provinceData
        ].concat(temp);
      } else {
        return [
          [
            "2017-01",
            "2017-02",
            "2017-03",
            "2017-04",
            "2017-05",
            "2017-06",
            "2017-07",
            "2017-08",
            "2017-09",
            "2017-10",
            "2017-11",
            "2017-12"
          ],
          ["Leads", "Focus on"],
          this.provinceData
        ].concat(temp);
      }
      // return [
      //   [
      //     "2017-01",
      //     "2017-02",
      //     "2017-03",
      //     "2017-04",
      //     "2017-05",
      //     "2017-06",
      //     "2017-07",
      //     "2017-08",
      //     "2017-09",
      //     "2017-10",
      //     "2017-11",
      //     "2017-12"
      //   ],
      //   ["线索", "关注"],
      //   this.provinceData
      // ].concat(temp);
    },
    isShowColorPicker() {
      return this.activeIndex > 2;
    },
    type() {
      return this.$store.state.parse.selectedType;
    },
    scopeType() {
      return this.$store.state.parse.scopeType;
    },
    heatmapScope() {
      return this.$store.state.parse.heatmapScope;
    },
    chartParams() {
      return this.$store.state.parse.chartParams;
    },
    compitiveData() {
      return this.$store.state.parse.compitiveData;
    },
    provinceData() {
      let data = Province;
      let isCh = this.$i18n.locale === "ch";
      let tempArr = isCh ? ["全国"] : ["All"];
      data.map(item => {
        let temp = item.options;
        for (let i in temp) {
          let name = isCh ? temp[i].regionName : temp[i].cityPinYin;
          tempArr.push(name);
        }
      });
      return tempArr;
    }
  },
  mounted() {
    this.$store.commit(types.SET_ISHEATMAP, false);
  },
  watch: {
    compitiveData() {
      let params = this.params();
      // this.resetColors(this.compitiveData[0]['20'].length)
      this.$store.commit(types.SET_PARAMS, params);
      this.$store.commit(types.SET_IDPARAMS, {
        id: params.id,
        id_color: params.id_color
      });
    },
    maskState(state) {
      if (state === false) {
        this.isOpen = false;
      }
    },
    heatmapScope() {
      if (this.colorValueFive[0] == 0) {
        this.colorValueTwoMin = this.heatmapScope[0];
        this.colorValueTwoMax = this.heatmapScope[1];
        this.colorValueFiveMin = this.heatmapScope[0];
        this.colorValueFiveMax = this.heatmapScope[1];
        this.colorValueTwo = this.heatmapScope;
        this.colorValueFive = this.heatmapScope;
      }
    },
    scopeType() {
      let params = this.params();
      this.$store.commit(types.SET_PARAMS, params);
      this.$store.commit(types.SET_IDPARAMS, {
        id: params.id,
        id_color: params.id_color
      });
    }
  },
  methods: {
    isCurrentdata(data) {
      return this.selected[this.activeIndex] === data.label;
    },
    isDisable(date) {
      // 如果是地域，全部禁用
      if (this.activeIndex !== 2) {
        let now = new Date();
        let monthNow = now.getMonth();
        let yearNow = now.getFullYear();
        if (typeof date.label === "string") {
          let month = parseInt(date.label.slice(-2));
          let year = parseInt(date.label.slice(0, 4));
          return monthNow < month && yearNow <= year;
        }
      } else {
        return true;
      }
    },
    closeTab() {
      this.isOpen = false;
      this.activeIndex = "";
    },
    oldConditions() {
      let data = sessionStorage.getItem("conditionData");
      if (data) {
        return JSON.parse(data);
      }
      return {};
    },
    handleSelectedChange(data) {
      //        this.selected[0] = data
      if (this.activeIndex < 3) {
        Vue.set(this.selected, this.activeIndex, data.label);
        if (this.activeIndex === 0) {
          this.conditionData[this.conditionType] = this.selected[0];
          this.$store.commit(types.SET_DATE, this.selected[0]);
        }
        if (this.activeIndex === 1) {
          this.conditionData[this.conditionType] = this.selected[1];
          // 这里国际化
          if (this.$i18n.locale === "ch") {
            this.$store.commit(
              types.SET_RELATION,
              this.relationDict[this.selected[1]]
            );
          } else {
            this.$store.commit(
              types.SET_RELATION,
              this.relationDictEn[this.selected[1]]
            );
          }
        }
        sessionStorage.setItem(
          "conditionData",
          JSON.stringify(this.conditionData)
        );
        let params = this.params();
        this.$store.commit(types.SET_PARAMS, params);
        this.$store.commit(types.SET_IDPARAMS, {
          id: params.id,
          id_color: params.id_color
        });
        this.isOpen = false;
      }
    },
    getColorName() {
      let name = "";
      for (let i in this.selfData.bp) {
        if (i !== "-1") {
          name = name + this.selfData.bp[i];
        }
      }
      return name;
    },
    changeTab(index, condition) {
      this.conditionType = this.tabIndex[index];
      let color_name = this.getColorName() + this.conditionType;
      if (
        index > 2 &&
        this.oldConditions()[color_name + "selectedcolor"] &&
        this.oldConditions()[color_name + "color"]
      ) {
        this.color = Object.assign(
          [],
          this.oldConditions()[color_name + "color"]
        );
        this.selectedColor = this.oldConditions()[color_name + "selectedcolor"];
        console.log(this.color);
      } else {
        this.resetColors(20);
        this.selectedColor = {};
      }
      if (index === this.activeIndex) {
        this.isOpen = !this.isOpen;
        if (!this.isOpen) {
          this.activeIndex = "";
        }
      } else {
        // this.resetColors()
        // this.selectedColor = this.oldConditions[this.tabIndex[index]  + 'selectedcolor']
        this.activeIndex = index;
        this.isOpen = true;
      }
      if (this.conditionType === "heatmap") {
        this.$store.commit(types.SET_ISHEATMAP, true);
      } else {
        this.$store.commit(types.SET_ISHEATMAP, false);
      }
      if (this.conditionType !== "heatmap") {
        let params = this.params();
        this.$store.commit(types.SET_PARAMS, params);
        this.$store.commit(types.SET_IDPARAMS, {
          id: params.id,
          id_color: params.id_color
        });
        this.$store.commit(types.CHANGE_MASK_STATE, this.isOpen);
      }
    },
    resetColors(len) {
      this.color = new Array(len).fill([]);
      for (let i = 0; i < this.color.length; i++) {
        this.color[i] = new Array(len).fill("#f9bd00");
      }
    },
    shiftObjectToArray(data) {
      let arr = [];
      for (let i in data) {
        arr.push({ label: data[i], id: i });
      }
      return arr;
    },
    colorDataRecord(item, index, event) {
      if (this.conditionType !== "heatmap") {
        this.selectedColor[item.id] = this.color[this.activeIndex][index];
        this.selectedColor = Object.assign({}, this.selectedColor);
      }
      this.color = Object.assign([], this.color);
      let color_name = this.getColorName() + this.conditionType;
      this.conditionData[color_name + "color"] = Object.assign([], this.color);
      this.conditionData[color_name + "selectedcolor"] = Object.assign(
        {},
        this.selectedColor
      );
      sessionStorage.setItem(
        "conditionData",
        JSON.stringify(this.conditionData)
      );
      let params = this.params();
      this.$store.commit(types.SET_IDPARAMS, {
        id: params.id,
        id_color: params.id_color
      });
      this.$store.commit(types.SET_PARAMS, params);
    },
    colorId(data1, type, key) {
      let arr = [];
      let id_arr = {};
      if (
        (key === "time" || key === "relation" || key === "territory") &&
        this.chartParams.id &&
        this.chartParams.id_color
      ) {
        key = "bp";
      }
      if (key === "bp") {
        let datanew = Object.assign([], data1);
        arr = this.bpSet(datanew, type).id_color;
        id_arr = this.bpSet(datanew, type).id;
        id_arr = this.bpSet(datanew, type).id;
      } else if (key === "bjpj") {
        let datanew = Object.assign([], data1);
        let data = this.convert(datanew, type);
        arr = this.bjpjSet(data).id_color;
        id_arr = this.bjpjSet(data).id;
      } else if (key === "heatmap") {
      } else {
        if (
          this.conditionType !== "territory" &&
          this.conditionType !== "time" &&
          this.conditionType !== "relation"
        ) {
          let datanew = Object.assign([], data1);
          console.log(this.selfData);
          console.log(datanew);
          let data = this.selfData[key];
          arr = this.othersSet(datanew, data, type, key).color_id;
          id_arr = this.othersSet(datanew, data, type, key).id;
        }
      }
      return { color_id: arr, id: id_arr };
    },
    convert(data, key) {
      // type：5*5，20，all; key: bp,country等
      let type = "all";
      let arr = [];
      if (!data.length) return [];
      for (let i = 0; i < data.length; i++) {
        let result = { competition: [] };
        if (typeof this.scopeType !== "number") {
          type = this.scopeType.split("*")[0];
          for (let j in data[i][type]) {
            if (data[i][type][j]) {
              let keyItem = data[i][type][j][key];
              if (keyItem && data[i].bpid === keyItem.id) {
                result.self = keyItem;
              } else {
                result.competition.push(keyItem);
              }
            }
          }
        } else {
          let len = data[i][type].length;
          for (let j = 0; j < this.scopeType; j++) {
            if (data[i][type][j]) {
              let keyItem = data[i][type][j][key];
              result.self = data[i][type][len - 1][key];
              result.competition.push(keyItem);
            }
          }
        }
        arr.push(result);
      }
      return arr;
    },
    convertBpSet(data, key) {
      let bp = [];
      let fbp = new Set();
      for (let i = 0; i < data.length; i++) {
        bp.push(data[i].bpid);
        if (typeof this.scopeType === "number") {
          let temp = data[i]["all"].slice(0, this.scopeType);
          for (let j = 0; j < temp.length; j++) {
            if (temp[j]) {
              fbp.add(temp[j][key].id);
            }
          }
        } else {
          let temp = data[i][this.scopeType.split("*")[0]];
          for (let j = 0; j < temp.length; j++) {
            if (temp[j]) {
              fbp.add(temp[j][key].id);
            }
          }
        }
      }
      fbp.forEach(function(x) {
        for (let i = 0; i < bp.length; i++) {
          if (x == bp[i]) {
            fbp.delete(x);
          }
        }
      });
      return { bp: bp, fbp: fbp };
    },
    params() {
      let params = {};
      if (this.conditionType === "heatmap") {
        params = this.heatmapParams();
        this.$store.commit(types.SET_ISHEATMAP, true);
      } else {
        let type = this.typeDict[this.$store.state.parse.selectedType];
        let color_id = JSON.stringify(
          this.colorId(this.compitiveData, type, this.conditionType).color_id
        );
        params.id = Array.from(
          Object.keys(
            this.colorId(this.compitiveData, type, this.conditionType).id
          )
        );
        params.type = this.type;
        params.date = this.selected[0];
        params.id_color = color_id;
        params.relation = this.relationDict[this.selected[1]];
        params.province = this.selected[2];
      }
      return params;
    },
    bpSet(data1, type) {
      let bpdata = this.convertBpSet(data1, type).bp;
      let fbpdata = this.convertBpSet(data1, type).fbp;
      let arr = [];
      let id_arr = {};
      for (let i = 0; i < bpdata.length; i++) {
        id_arr[bpdata[i]] = 1;
        if (this.selectedColor && bpdata[i] in this.selectedColor) {
          arr.push({
            id: bpdata[i],
            color:
              parseInt(this.selectedColor[bpdata[i]].replace("#", "FF"), 16) |
              0xffffffff00000000
          });
        } else {
          arr.push({
            id: bpdata[i],
            color: parseInt("FF0493FA", 16) | 0xfffffff00000000
          });
        }
      }
      let _this = this;
      fbpdata.forEach(function(item) {
        id_arr[item] = 1;
        if ("-1" in _this.selectedColor) {
          arr.push({
            id: item,
            color:
              parseInt(_this.selectedColor["-1"].replace("#", "FF"), 16) |
              0xffffffff00000000
          });
        } else {
          arr.push({
            id: item,
            color: parseInt("FF0493FA", 16) | 0xfffffff00000000
          });
        }
      });
      return { id: id_arr, id_color: arr };
    },
    bjpjSet(data) {
      let color_arr = [];
      let id_arr = {};
      let colorObj = {};
      let bp_color = [];
      let colors = [];
      for (let i = 0; i < data.length; i++) {
        id_arr[data[i].self.id] = 1;
        if (data[i].self.id in this.selectedColor) {
          bp_color.push({
            id: data[i].self.id,
            color: this.selectedColor[data[i].self.id]
          });
        } else {
          bp_color.push({ id: data[i].self.id, color: "#f9bd00" });
        }
      } // 获取本品color
      for (let i = 0; i < data.length; i++) {
        let arr = [];
        if (data[i].self.id in this.selectedColor) {
          for (let j = 0; j < data[i].competition.length; j++) {
            id_arr[data[i].competition[j].id] = 1;
            arr.push({
              id: data[i].competition[j].id,
              color: this.selectedColor[data[i].self.id]
            });
            for (let k = 0; k < bp_color.length; k++) {
              if (bp_color[k].id === data[i].competition[j].id) {
                //                  delete id_arr[data[i].competition[j].id]
                arr.pop();
              }
            }
          }
        } else {
          arr.push({ id: data[i].self.id, color: "#f9bd00" });
          for (let j = 0; j < data[i].competition.length; j++) {
            id_arr[data[i].competition[j].id] = 1;
            arr.push({ id: data[i].competition[j].id, color: "#f9bd00" });
            for (let k = 0; k < bp_color.length; k++) {
              if (bp_color[k].id === data[i].competition[j].id) {
                arr.pop();
              }
            }
          }
        }
        color_arr.push(arr);
      } // 剔除竞品中与本品相同的id
      for (let m = 0; m < color_arr.length; m++) {
        for (let n = 0; n < color_arr[m].length; n++) {
          if (color_arr[m][n].id in colorObj) {
            // 混合
            let fanalColor = this.toHexString([
              color_arr[m][n].color,
              colorObj[color_arr[m][n].id]
            ]);
            colorObj[color_arr[m][n].id] = fanalColor;
          } else {
            colorObj[color_arr[m][n].id] = color_arr[m][n].color;
          }
        }
      } // 混合颜色
      for (let k = 0; k < bp_color.length; k++) {
        colorObj[bp_color[k].id] = bp_color[k].color;
      }
      if (colorObj !== {}) {
        for (let i in colorObj) {
          let temp = {
            id: i,
            color:
              parseInt(colorObj[i].replace("#", "FF"), 16) | 0xffffffff00000000
          };
          colors.push(temp);
        }
      }
      return { id: id_arr, id_color: colors };
    },
    othersSet(data1, data, type, key) {
      let arr = [];
      let id_arr = {};
      for (let k = 0; k < data1.length; k++) {
        let comp = [];
        if (typeof this.scopeType === "number") {
          comp = data1[k].all.slice(0, this.scopeType);
          comp = [...comp, data1[k].all[data1[k].all.length - 1]];
        } else if (typeof this.scopeType === "string") {
          comp = data1[k][this.scopeType.split("*")[0]];
        }
        for (let i = 0; i < comp.length; i++) {
          if (!comp[i]) continue;
          id_arr[comp[i][type].id] = 1;
          let temp = arr.map(i => i.id);
          let color_id = Array.from(new Set(temp));
          for (let j in this.selectedColor) {
            if (
              comp[i][key].name === data[j] &&
              color_id.indexOf(comp[i][type].id) < 0
            ) {
              arr.push({
                id: comp[i][type].id,
                color:
                  parseInt(this.selectedColor[j].replace("#", "FF"), 16) |
                  0xffffffff00000000
              });
            }
          }
          if (
            (arr.length === 0 || comp[i][type].id !== arr[arr.length - 1].id) &&
            color_id.indexOf(comp[i][type].id) < 0
          ) {
            arr.push({
              id: comp[i][type].id,
              color: parseInt("FF0493FA", 16) | 0xfffffff00000000
            });
          }
        }
      }
      return { color_id: arr, id: id_arr };
    },
    toCymk(color) {
      //        let colorstr = color.slice(1, 7)
      //        let cyan    = 255 - parseInt(colorstr.slice(0, 2), 16)
      //        let magenta = 255 - parseInt(colorstr.slice(2, 4), 16)
      //        let yellow  = 255 - parseInt(colorstr.slice(4, 6), 16)
      let cyan = 255 - color._rgba[0];
      let magenta = 255 - color._rgba[1];
      let yellow = 255 - color._rgba[2];
      let black = Math.min(cyan, magenta, yellow);
      cyan = (cyan - black) / (255 - black);
      magenta = (magenta - black) / (255 - black);
      yellow = (yellow - black) / (255 - black);
      return { c: cyan, m: magenta, y: yellow, k: black / 255, a: 1 };
    },
    toRgba(color) {
      let R = color.c * (1.0 - color.k) + color.k;
      let G = color.m * (1.0 - color.k) + color.k;
      let B = color.y * (1.0 - color.k) + color.k;
      R = Math.round((1.0 - R) * 255.0 + 0.4);
      G = Math.round((1.0 - G) * 255.0 + 0.4);
      B = Math.round((1.0 - B) * 255.0 + 0.4);
      let fcolor = { _rgba: [R, G, B, color.a] };
      return fcolor;
    },
    mix(color1) {
      let C = 0;
      let M = 0;
      let Y = 0;
      let K = 0;
      let A = 0;
      for (var i = 0; i < color1.length; i++) {
        color1[i] = this.toCymk(color1[i]);
        C += color1[i].c;
        M += color1[i].m;
        Y += color1[i].y;
        K += color1[i].k;
        A += color1[i].a;
      }
      C = C / color1.length;
      M = M / color1.length;
      Y = Y / color1.length;
      K = K / color1.length;
      A = A / color1.length;
      let color = { c: C, m: M, y: Y, k: K, a: A };
      let fcolor = this.toRgba(color);
      return fcolor;
    },
    convertColor(color) {
      let colorstr = color.slice(1, 7);
      let cyan = parseInt(colorstr.slice(0, 2), 16);
      let magenta = parseInt(colorstr.slice(2, 4), 16);
      let yellow = parseInt(colorstr.slice(4, 6), 16);
      return { _rgba: [cyan, magenta, yellow, 1] };
    },
    toHexString(colorLists) {
      let _this = this;
      let colorList = colorLists.map(function(i) {
        return _this.convertColor(i);
      });
      let fanalColor = colorList[0];
      for (let j = 1; j < colorList.length; j++) {
        let midColor = this.mix([fanalColor, colorList[j]])._rgba.splice(0, 3);
        fanalColor =
          "#" +
          midColor
            .map(function(v, i) {
              v = (v || 0).toString(16);
              return v.length == 1 ? "0" + v : v;
            })
            .join("");
      }
      return fanalColor;
    },
    heatmapChange() {
      this.$store.commit(types.SET_PARAMS, this.params());
    },
    heatmapParams() {
      let params = {};
      if (this.heatmapType === "2") {
        if (this.heatmapScope.length !== 0) {
          params = {
            maxColor:
              parseInt(this.maxColor.replace("#", "FF"), 16) |
              0xffffffff00000000,
            minColor:
              parseInt(this.minColor.replace("#", "FF"), 16) |
              0xffffffff00000000,
            min: parseInt(this.colorValueTwo[0]),
            max: parseInt(this.colorValueTwo[1])
          };
        } else {
          params = {
            maxColor:
              parseInt(this.maxColor.replace("#", "FF"), 16) |
              0xffffffff00000000,
            minColor:
              parseInt(this.minColor.replace("#", "FF"), 16) |
              0xffffffff00000000
          };
        }
      } else if (this.heatmapType === "5") {
        if (this.heatmapScope.length !== 0) {
          params = {
            min: parseInt(this.colorValueFive[0]),
            max: parseInt(this.colorValueFive[1])
          };
        } else {
          params = {};
        }
      }
      return params;
    },
    commitSlider() {
      this.$store.commit(types.SET_PARAMS, this.params());
    },
    changeMonth(val) {
      let date_modified = this.sDate + "," + this.eDate;
      Vue.set(this.selected, 0, date_modified);
      this.$store.commit(types.SET_DATE, date_modified);
      // Vue.set(this.selected, 0, val)
      // this.$store.commit(types.SET_DATE, val)
      let params = this.params();
      this.$store.commit(types.SET_PARAMS, params);
      this.$store.commit(types.SET_IDPARAMS, {
        id: params.id,
        id_color: params.id_color
      });
    },
    changeCitys(val) {
      if (val.join(",") === "全国") return;
      if (val[val.length - 1] === "全国") {
        this.citys = Object.assign([], ["全国"]);
        Vue.set(this.selected, 2, "");
        this.$store.commit(types.SET_TERRITORY, "");
        let params = this.params();
        this.$store.commit(types.SET_PARAMS, params);
        this.$store.commit(types.SET_IDPARAMS, {
          id: params.id,
          id_color: params.id_color
        });
        return;
      }
      if (val.join(",").match("全国")) {
        this.citys = [];
        for (let i in val) {
          if (!val[i].match("全国")) {
            this.citys.push(val[i]);
          }
        }
        this.citys = Object.assign([], this.citys);
      }
      Vue.set(this.selected, 2, this.citys.join(","));
      this.$store.commit(types.SET_TERRITORY, this.citys.join(","));
      let params = this.params();
      this.$store.commit(types.SET_PARAMS, params);
      this.$store.commit(types.SET_IDPARAMS, {
        id: params.id,
        id_color: params.id_color
      });
    },
    isDisabled(index) {
      if (index !== 0 && this.selected[2] !== "全国") {
      }
    },
    getDate(id) {
      switch (id) {
        case 1:
          this.sDate = moment()
            .subtract(1, "months")
            .format("YYYY-MM");
          this.eDate = moment()
            .subtract(1, "months")
            .format("YYYY-MM");
          this.changeMonth();
          break;
        case 2:
          this.sDate = moment()
            .subtract(3, "months")
            .format("YYYY-MM");
          this.eDate = moment()
            .subtract(1, "months")
            .format("YYYY-MM");
          this.changeMonth();
          break;
        case 3:
          this.sDate = moment()
            .subtract(6, "months")
            .format("YYYY-MM");
          this.eDate = moment()
            .subtract(1, "months")
            .format("YYYY-MM");
          this.changeMonth();
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped lang="less">
@yellow: #f9bd00;
.filter-container {
  font-size: 12px;
  border: 1px solid #ccc;
  /*padding: 5px 0;*/
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

.date-box {
  color: #fff;
  position: absolute;
  top: 5px;
  left: 115px;
}

.active {
  background: #ebecee;
}

.filter-content {
  position: absolute;
  z-index: 160;
  width: 100%;
  /*height: 38px;*/
  box-sizing: border-box;
  background: #ebecee;
  font-size: 12px;
  padding: 13px 15px 10px 15px;
  /*overflow-y: scroll;*/
  /*height: 44px;*/
}

.time-item {
  padding-right: 45px;
  text-align: left;
  cursor: pointer;
  margin-bottom: 10px;
  display: inline-block;
}

.nopadding {
  padding-right: 0;
  position: relative;
  margin-bottom: 0;
}

.select-ok {
  position: absolute;
  bottom: 0px;
  right: 5px;
  color: #f9bd00;
  text-decoration: underline;
}

.time-item:hover {
  color: #f9bd00;
}

.heatmap {
  display: inline-block;
  margin-top: -8px;
}

.color-picker {
  margin-top: -4px;
  display: inline-block;
}

.current-month {
  color: @yellow;
}

.disabled-month {
  color: #b3b3b3;
  cursor: auto;
}

.tow-color-select {
  width: 200px;
  display: inline-block;
  vertical-align: middle;
  margin: 0 15px;
}

.left-color {
  display: inline-block;
}

.two-color-title {
  margin-left: 10px;
}

.five-color {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

@media screen and (min-width: 2100px) {
  .filter-title {
    font-size: 16px;
  }

  .filter-content {
    font-size: 16px;
    margin-top: -1px;
  }

  .row-name {
    width: 150px;
  }
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
</style>
