<template>
  <div>
    <div class="block mapcolor">
      <div class="tit">
        <span>低</span>
        <span>高</span>
      </div>
      <el-slider v-model="mapColor" :min="1" :max="20" :show-tooltip="false" @change="colorChange"></el-slider>
    </div>
    <div class="block">
      <span>点半径</span>
      <el-slider
        v-model="mapOptions.radius"
        :min="1"
        :max="20"
        :show-tooltip="true"
        @change="radiusChange"
      ></el-slider>
    </div>
    <div class="block">
      <span>透明度</span>
      <el-slider
        v-model="mapOptions.maxOpacity"
        :min="0.1"
        :max="1"
        :show-tooltip="true"
        :step="0.1"
        @change="opcChange"
      ></el-slider>
    </div>
  </div>
</template>

<script>
import * as types from "@/store/mutation-types.js";
export default {
  data() {
    return {
      mapColor: 1,
      mapOptions: {
        radius: 8,
        maxOpacity: 0.7,
        gradient: {
          "0.2": "#e803eb",
          "0.4": "#207cca",
          "0.6": "#31ff00",
          "0.8": "#f8ff00",
          "0.95": "#ff0500"
        }
      }
    };
  },
  computed: {
    // mapopts: function() {
    //   return this.$store.state.contrast.heatmapOpts;
    // }
  },
  methods: {
    colorChange(v) {
      let gk = ["0.2", "0.4", "0.6", "0.8", "1"]; //渐变key值
      let color = ["#e803eb", "#207cca", "#31ff00", "#f8ff00", "#ff0500"];
      let gradientObj = {};
      color = color.concat();
      let ratiov = v / 4; //对应的比例 因为设置了最大范围是20 色值有5个
      let kv = Math.floor(ratiov); //获取当前值对应的数组位置决定改哪一个key值
      if (kv == 5) {
        kv = 4;
      }
      gk.forEach((item, index) => {
        if (index < kv) {
          color[index] = "#fff";
        }
      });
      gk.forEach((item, index) => {
        this.$set(gradientObj, item, color[index]);
      });
      this.mapOptions.gradient = gradientObj;
      this.$store.commit(types.SET_HEATMAP_OPTS, this.mapOptions);
    },
    radiusChange(v) {
      this.mapOptions.radius = v;
      this.$store.commit(types.SET_HEATMAP_OPTS, this.mapOptions);
    },
    opcChange(v) {
      this.mapOptions.maxOpacity = v;
      this.$store.commit(types.SET_HEATMAP_OPTS, this.mapOptions);
    },
    isInteger(obj) {
      return Math.floor(obj) === obj;
    }
  }
};
</script>

<style lang="less">
.block {
  margin: 5px 0;

  span {
    font-size: 12px;
  }
}

.mapcolor {
  .tit {
    display: -webkit-flex;
    /* Safari */
    display: flex;
    justify-content: space-between;
  }

  .el-slider__bar {
    background-color: #dfe4ed !important;
  }

  .el-slider__runway {
    /*  background: -webkit-linear-gradient(left, #fa02f7 0%, #0213fa 25%, #02ec02 50%, #fff501 75%, #dc261b 100%); */
    background-image: linear-gradient(
      90deg,
      #e803eb,
      #207cca 25%,
      #08fb02 50%,
      #f2fb02 75%,
      #ff0500
    );
    /* background: -o-linear-gradient(left, #fa02f7 20%, #0213fa 40%, #02ec02 60%, #fff501 80%, #dc261b 100%);
      background: -moz-linear-gradient(left, #fa02f7 20%, #0213fa 40%, #02ec02 60%, #fff501 80%, #dc261b 100%);
      background: linear-gradient(left, #fa02f7 20%, #0213fa 40%, #02ec02 60%, #fff501 80%, #dc261b 100%); */
  }
}
</style>
