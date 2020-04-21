<template>
  <div style="position:relative; display: inline-block" ref="sel">
    <div class="hx-select hx-select--mini" @click="handle">
      <div class="hx-input">
        <input autocomplete="off" type="text" rows="2" class="hx-input__inner" :disabled="isDisabled" />
        <i class="hx-arrow el-icon-arrow-down"></i>
        <!--<i :class="index === activeIndex?'el-icon-arrow-up':'el-icon-arrow-down'"></i>-->
      </div>
    </div>
    <div v-if="isDropDown && !group" class="hx-select-dropdown hx-popper" :style="{minWidth: styles.width + 'px',top:styles.top+'px'}">
      <input type="text" :placeholder="$t('m.right.btn1')" v-model="searchValue" class="search-input" />
      <ul class="hx-ul" v-on:input="updateValue($event.target)">
        <li class="hx-li" v-for="item in renderOptions" :class="{active: (item.id in activeTags)}" @click="handleTagInfo(item)">{{ item.regionName || item.name }}</li>
      </ul>
    </div>
    <div v-if="isDropDown && group" class="hx-select-dropdown hx-popper" :style="{minWidth: styles.width + 'px',top:styles.top+'px'}">
      <input type="text" :placeholder="$t('m.right.btn1')" v-model="searchValue" class="search-input" v-show="!group" />
      <ul class="hx-ul">
        <ul class="hx-select-group__wrap" v-for="(group, index) in options">
          <li class="hx-li" @click="checkAll" v-if="index === 0">{{$t('m.right.btn2')}}</li>
          <li class="hx-select-group__title">{{ group.label }}</li>
          <li v-for="item in group.options" class="hx-li" :class="{active: (item.regionName in activeTags)}" @click="handleTagInfo(item)">{{ item.regionName }}</li>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import * as types from "@/store/mutation-types.js";
export default {
  data() {
    return {
      styles: {},
      isDropDown: false,
      selectedTags: {},
      searchValue: "",
      renderOptions: []
    };
  },
  props: {
    group: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    currentValue: {
      type: Array,
      default() {
        return [];
      }
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    activeTags() {
      let obj = {};
      for (let i = 0; i < this.currentValue.length; i++) {
        if (this.currentValue[i] in this.selectedTags) {
          obj[this.currentValue[i]] = this.selectedTags[this.currentValue[i]];
        }
      }
      return obj;
    },
    maskState() {
      return this.$store.state.common.isMaskOpen;
    }
  },
  watch: {
    maskState(state) {
      if (state === false) {
        this.isDropDown = false;
      }
    },
    searchValue() {
      if (this.options[0].name) {
        this.searchItem(this.options, "name");
      } else {
        this.searchItem(this.options, "regionName");
      }
    },
    options() {
      if (this.options[0]["options"]) {
        this.renderOptions = this.options;
      } else {
        this.renderOptions = this.options.slice(0, 50);
      }
    }
  },
  methods: {
    handle() {
      if (this.isDisabled) {
        return false;
      } else {
        this.styles = this.dropdownStyle();
        this.isDropDown = !this.isDropDown;
        this.$store.commit(types.CHANGE_MASK_STATE, this.isDropDown);
      }
    },
    handleTagInfo(data) {
      if (this.group) {
        Vue.set(this.selectedTags, data.regionName, data.regionName);
      } else {
        if (data.name) {
          Vue.set(this.selectedTags, data.id, data.name);
        } else {
          Vue.set(this.selectedTags, data.id, data.regionName);
        }
      }
      this.updateValue(data);
      this.$emit("change", data);
    },
    checkAll() {
      if (this.group) {
        for (let i in this.options) {
          for (let j in this.options[i]["options"]) {
            let value = this.options[i]["options"][j].regionName;
            Vue.set(this.selectedTags, value, value);
          }
        }
      }
      this.$emit("checkAll");
    },
    updateValue(value) {
      this.$emit("input", value.name);
    },
    dropdownStyle() {
      let box = this.$refs.sel;
      let top = (() => {
        let bot = window.innerHeight - box.getBoundingClientRect().bottom;
        console.log(bot);
        if (bot < 250) {
          return box.getBoundingClientRect().top - 290;
        } else {
          return box.getBoundingClientRect().top + 15;
        }
      })();
      return {
        width: box.clientWidth,
        top: top
      };
    },
    searchItem(options, searchedFiled) {
      if (this.searchValue === "") {
        this.renderOptions = this.options;
        return;
      }
      let all = Object.assign([], options);
      if (!this.options[0]["options"]) {
        const filtered = all.filter(item => {
          const exp = new RegExp(this.searchValue);
          if (exp.exec(item[searchedFiled]) !== null) return item;
        });
        this.renderOptions = filtered;
      }
    }
  }
};
</script>

<style lang="less">
.hx-select {
  display: inline-block;
  position: relative;
  width: 100%;

  .hx-input {
    position: relative;
  }

  .hx-arrow {
    position: absolute;
    top: 3px;
    right: 12px;
    color: #bac2d0;
    font-size: 14px;
  }

  .hx-input__inner {
    height: 20px;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #d8dce5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #5a5e66;
    display: inline-block;
    font-size: 12px;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
  .hx-input__inner::-webkit-input-placeholder {
    color: #b4bccc;
  }

  .hx-input__inner:disabled {
    background-color: #f5f7fa;
  }

  .hx-input__inner:hover {
    border-color: #b4bccc;
  }

  .hx-input__inner:focus {
    border-color: #f9bd00;
  }
}

.hx-select-dropdown {
  max-height: 278px;
  border: 1px solid #dfe4ed;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 5px 0;
  z-index: 2000;
  position: fixed;
  overflow: hidden;

  .hx-select-dropdown_wrap {
    /*position: absolute;*/
    height: 123px;
  }

  .search-input {
    height: 25px;
    padding: 0 5px 0 10px;
    margin: 10px 10px 0 13px;
    width: 100px;
    /*position: relative;*/
    /*left: 48%;*/
    /*transform: translate(-50%);*/
    outline: none;
  }
}

.hx-popper {
  margin-top: 12px;
}

.hx-ul {
  width: 113%;
  list-style: none;
  margin: 5px 0;
  padding: 0;
  overflow: auto;
  max-height: 232px;

  .hx-li {
    font-size: 14px;
    padding: 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #5a5e66;
    height: 34px;
    line-height: 34px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
  }

  .hx-li:hover {
    background-color: #f5f7fa;
    color: #5a5e66;
  }

  .active {
    /*background: #f5f7fa;*/
    color: #f9bd00;
  }

  .hx-select-group__wrap {
    position: relative;
    list-style: none;
    margin: 0 0 16px 0;
    padding: 0;

    .hx-select-group__title {
      padding-left: 20px;
      font-size: 12px;
      color: #909399;
      line-height: 30px;
    }
  }

  .hx-select-group__wrap:after {
    content: "";
    position: absolute;
    display: block;
    left: 20px;
    right: 40px;
    bottom: -10px;
    height: 1px;
    background: #e4e7ed;
  }
}
</style>
