<template>
  <div id="app">
    <router-view/>
    <mask-component :is-show="maskState" @click.native="handleMaskClick"></mask-component>
  </div>
</template>

<script>
import "@/directives/customTitle.js";
import MaskComponent from "./components/common/Mask.vue";
import * as types from "./store/mutation-types";
export default {
  name: "app",
  created() {
    if(!localStorage.lang) {
      localStorage.lang = 'ch'
    }
  },
  computed: {
    maskState() {
      return this.$store.state.common.isMaskOpen;
    }
  },
  methods: {
    handleMaskClick() {
      this.$store.commit(types.CHANGE_MASK_STATE);
    }
  },
  components: {
    MaskComponent
  }
};
</script>

<style lang="less">
@yellow: #f9bd00;

html {
  height: 100%;
}

// 中文字体
@font-face {
  font-family: jfont;
  src: url(../static/hei.62eea64.ttf);
}

// 英文字体
@font-face {
  font-family: calibri;
  src: url(../static/calibri.ttf);
}

body {
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 1.5;
  // 先英文字体，后中文字体
  font-family: calibri, jfont, "Microsoft Yahei", sans-serif;
}

/* 对比分析版块，X轴的input框的高度控制 */
.in-wrap .el-row .el-input--mini .el-input__inner {
  height: 20px;
}

.xSelStyle .el-input--mini .el-input__inner {
  height: 20px;
}

/* 弹框padding覆盖 */
.el-dialog__body {
  padding: 10px 20px 20px;
}

/* 覆盖对比分析部分，验证提示条的长度 */
.longer-message {
  min-width: 480px;
}

.check-item .el-checkbox__label {
  font-size: 12px;
  padding-left: 0;
  margin-left: 5px;
  /*transform: scale(0.83);*/
}

.gradien .el-slider__runway .el-slider__bar {
  background: linear-gradient(
    -90deg,
    #ff0000,
    #ff8000,
    #ffff37,
    #53ff53,
    #0080ff
  );
}

.el-loading-mask {
  z-index: 100;
}

.filter-item .el-select .el-input__inner {
  padding-right: 23px;
  padding-left: 5px;
}

.number.el-input-number.is-controls-right .el-input__inner {
  padding-left: 0px;
  padding-right: 26px;
}

.gradien .el-slider__button,
.tow-color-select .el-slider__button {
  width: 10px;
  height: 10px;
}

.parse .el-loading-spinner {
  margin-top: -9px;
}

.chart-dialog .el-dialog__header {
  padding-bottom: 0;
}

/* 配置分析：单选按钮组样式覆盖 */
.device-type-wrap .el-checkbox {
  line-height: 1.7;
}
.device-type-wrap .el-checkbox__label {
  font-size: 12px;
}

/*彗星首页时间选择 */
.date-box .el-input__prefix,
.el-input__suffix {
  color: transparent;
}

.date-box .el-input__inner {
  color: transparent;
  border: none;
  height: 30px;
  width: 120px;
  background: transparent;
  cursor: pointer;
}

.date-box .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100px;
}

.date-box .el-input__inner::-webkit-input-placeholder {
  color: transparent;
}

.filter-content .el-checkbox__label {
  font-size: 12px;
}

.filter-content .el-checkbox {
  margin-left: 20px;
}

.filter-content .el-checkbox + .el-checkbox {
  margin-left: 20px;
}

.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #1b96fe;
}

.filter-content el-checkbox:first-child {
  margin-left: 20px;
}

/* 覆盖装配率说明弹框 */
.el-tooltip__popper.is-light {
  border: 1px solid #bababa;
}
.el-tooltip__popper.is-light[x-placement^="right"] .popper__arrow {
  border-right-color: #bababa;
}
/* 覆盖装配率说明弹框 结束 */

.profile_t .el-radio-button--mini .el-radio-button__inner {
  padding: 3px 8px;
}

/* 样式覆盖 */
.el-tag {
  color: #000;
  background-color: #fff;
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 0;
}

.el-tag .el-icon-close:hover {
  background-color: @yellow;
}
.el-button--text {
  color: #000;
}

.el-tag .el-icon-close,
.el-button--text:focus,
.el-button--text:hover,
.el-select-dropdown__item.selected,
.el-radio__input.is-checked + .el-radio__label,
.el-checkbox__input.is-checked + .el-checkbox__label,
.el-loading-spinner i,
.el-month-table td .cell:hover,
.el-month-table td.current:not(.disabled) .cell,
.el-radio-button__inner:hover,
.el-year-table td .cell:hover,
.el-year-table td.current:not(.disabled) .cell,
.el-date-picker__header-label.active,
.el-date-picker__header-label:hover,
.el-picker-panel__icon-btn:hover {
  color: @yellow;
}
.el-loading-spinner .path {
  stroke: @yellow;
}

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner,
.el-radio__input.is-checked .el-radio__inner,
.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  background-color: @yellow;
  border-color: @yellow;
}

.el-select .el-input.is-focus .el-input__inner {
  border-color: @yellow;
}

.el-input__inner,
.el-radio-button:first-child .el-radio-button__inner,
.el-radio-button:last-child .el-radio-button__inner {
  border-radius: 0;
}

.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.dialog-footer .el-button.del-cancel:focus,
.dialog-footer .el-button.del-cancel:hover {
  color: #5a5e66;
  border-color: #d8dce5;
  background-color: #fff;
}
</style>
