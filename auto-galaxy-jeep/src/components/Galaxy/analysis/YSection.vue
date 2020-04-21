<template>
  <div class="item-wrap">
    <div v-for="(item,index) in dataTypeArr" :class="[activeType === item.id ? 'active' : '', 'thumbnail']" :data-able="item.isabled" :key="index" @click="handleDataType(item)">
      <span>{{item.type}}</span>
    </div>
  </div>
</template>
<script>
import * as types from "@/store/mutation-types.js";
export default {
  name: "YSection",
  data() {
    let isChinese = this.$i18n.locale === "ch";
    return {
      activeType: this.$route.query.target || "",
      dataTypeArr: [
        // {
        //   type: "关注量",
        //   id: "attention",
        //   isabled: true,
        // },
        // {
        //   type: "线索量",
        //   id: "leads",
        //   isabled: true,
        // },
        // {
        //   type: "线索重合热度",
        //   id: "leads_chonghe",
        //   isabled: true,
        // },
        {
          type: isChinese ? "装车率" : "Loading Rate",
          id: "rcr",
          isabled: true
        },
        {
          type: isChinese ? "装配率" : "Assembly Rate",
          id: "assembly",
          isabled: true
        },
        {
          type: isChinese ? "画像分析" : "Portrait Analysis",
          id: "profile",
          isabled: true
        },
        {
          type: isChinese ? "购车目的" : "Purpose of Car Purchase",
          id: "purpose",
          isabled: true
        },
        {
          type: isChinese ? "口碑" : "Public Praise",
          id: "koubei",
          isabled: true
        },
        {
          type: isChinese ? "触媒习惯" : "Consumer Media Habits",
          id: "habit",
          isabled: true
        },
        {
          type: isChinese ? "竞争格局" : "Competition Landscape",
          id: "zfzb",
          isabled: true
        },
        // {
        //   type: isChinese ? "营销漏洞" : "Marketing Funnel",
        //   id: "funnel",
        //   isabled: true
        // }
        // {
        //   type: "兴趣偏好",
        //   id: "preference",
        //   isabled: true,
        // },
        // {
        //   type: "用户分布热力图",
        //   id: "heatmap",
        //   isabled: true,
        // },
        // {
        //   type: "经销商分布热力图",
        //   id: "heatmap_dealer",
        //   isabled: true,
        // }
      ]
    };
  },
  created() {
    this.$store.commit(types.SET_DATA_TYPE, this.activeType);
  },
  computed: {
    isClearAll() {
      return this.$store.state.contrast.isClearAll;
    },
    carType() {
      return this.$store.state.contrast.params.carType;
    }
  },
  methods: {
    handleDataType(item) {
      if (item.isabled) {
        if (item.id === this.activeType) {
          this.activeType = "";
        } else {
          this.activeType = item.id;
          this.$store.commit(types.CHANGE_RENDERFLAG);
        }
        this.$store.commit(types.SET_DATA_TYPE, this.activeType);
      } else {
        this.$message("敬请期待");
      }
    }
  },
  watch: {
    isClearAll() {
      this.activeType = "";
      this.$store.commit(types.SET_DATA_TYPE, "");
    },
    carType(val, oldVal) {
      if (val === "3") {
        this.dataTypeArr[0].isabled = false;
        this.dataTypeArr[2].isabled = false;
        if (
          this.activeType === "attention" ||
          this.activeType === "leads_chonghe"
        ) {
          this.activeType = "";
          this.$store.commit(types.SET_DATA_TYPE, "");
        }
      } else if (val === "4") {
        this.dataTypeArr[0].isabled = true;
        this.dataTypeArr[2].isabled = false;
        if (this.activeType === "leads_chonghe") {
          this.activeType = "";
          this.$store.commit(types.SET_DATA_TYPE, "");
        }
      } else {
        this.dataTypeArr[0].isabled = true;
        this.dataTypeArr[2].isabled = true;
      }
    }
  }
};
</script>
<style scoped lang="less">
.item-wrap {
  display: flex;
  flex-wrap: wrap;
}
.thumbnail {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  text-align: center;
  width: 33%;
  height: 9vh;
  border: 1px solid #e5e5e5;
  font-size: 12px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  margin-bottom: -1px;
  margin-right: -1px;
  color: #aaa;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  &:hover {
    cursor: not-allowed;
  }
}
.thumbnail[data-able] {
  color: #222;
}
.thumbnail.active {
  background: #f9bd00;
  color: #fff;
}

.thumbnail[data-able]:hover {
  cursor: pointer;
  background: #f9bd00;
  color: #fff;
}
.p1 {
  margin: 0;
  padding-bottom: 5px;
  border-bottom: 1px solid #333;
  text-align: center;
  font-size: 12px;
  color: #333;
}
.p2 {
  margin-top: 5px;
  margin-bottom: 0;
  text-align: center;
  font-size: 12px;
  color: #333;
}
.p3 {
  margin: 0;
  font-size: 12px;
  color: #333;
}
</style>
