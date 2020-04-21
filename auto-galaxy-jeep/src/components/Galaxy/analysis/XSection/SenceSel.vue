<template>
  <div class="in-wrap">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="8">
        <h6>场景选择：</h6>
      </el-col>
    </el-row>

    <div class="date-bottom-wrap">
      <el-radio-group class="sence" v-model="sence" @change="setSence">
        <el-radio v-for="group in senceList" :key="group.id" :label="group.id">{{group.name}}</el-radio><br />
      </el-radio-group>
    </div>
  </div>
</template>

<script>
  import * as types from '@/store/mutation-types.js'
  export default {
    name: 'datesingle',
    data() {
      return {
        sence: 1,
        senceList: [{
          "id": 1,
          "name": "工作热力（工作日9点-17点）"
        }, {
          "id": 2,
          "name": "居住热力（工作日0点-7点）"
        }, {
          "id": 3,
          "name": "周末休闲消费热力（周末9点-17点）"
        }]
      }
    },
    components: {},
    created() {
      this.$store.commit(types.SET_SENCE, this.sence);
    },
    mounted() {},
    computed: {},
    methods: {
      setSence(v) {
        this.$store.commit(types.SET_SENCE, v);
      }
    },
    watch: {}
  }

</script>

<style scoped lang="less">
  .date-bottom-wrap {
    margin-left: 3em;
    margin-top: 6px;
  }

  .in-wrap {
    background: #eff2f7;
    padding: 5px;
    margin-bottom: 1%;
    height: 32.3%;
    overflow: auto;
    box-sizing: border-box;
  }

  h6 {
    font-weight: 100;
    margin: 0px;
    margin-top: 3px;
    margin-bottom: 10px;
    color: #000;
    font-weight: 500;
  }

  .el-row {
    margin-bottom: 5px;
  }

  .res-wrap {
    margin-top: 5px;

    .el-tag {
      margin-right: 4px;
      margin-bottom: 4px;
    }
  }

</style>
<style lang="less">
  .sence {
    .el-radio {
      display: block;
      margin-left: 0;
      margin-bottom: 8px;
      font-size: 12px;
    }

    .el-radio__label {
      font-size: 12px;
    }
  }

</style>
