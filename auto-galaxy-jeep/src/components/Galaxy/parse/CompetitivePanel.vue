<template>
    <ul class="competive-list">
      <li v-for="(item, index) in compitiveData" v-if="item && item[type] && item[type].id !== selfData[type].id">{{item[type].name}}</li>
    </ul>
</template>

<script>
  export default {
    data () {
      return {
        keyDict: {
          0: 'brand',
          1: 'manufacturer',
          2: 'model',
          3: 'style'
        }
      }
    },
    props: {
      compitiveData: {
        type: Array,
        default () {
          return [{all: []}]
        }
      },
      selfData: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {
      type () {
        return this.keyDict[this.$store.state.parse.selectedType]
        // 以下“暂存”的提交（2018-01-25）报错了，注释掉以下代码
        // return this.keyDict.parse.selectedType
      }
    }
  }
</script>

<style scoped>
  .competive-list {
    padding: 3px 0;
    width: 133px;
    /*height: 410px;*/
    display: inline-block;
    background: #fff;
    overflow-y: auto;
    overflow-x: hidden;
    vertical-align: top;
    list-style: none;
    margin: 0;
  }

  .competive-list ul {
    display: inline-block;
    padding: 0;
    margin: 0;
    width: 140px;
    max-height: 400px;
    list-style: none;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .competive-list li {
    font-size: 12px;
    margin: 3px 0;
    padding: 3px 15px;
  }

  @media screen and (min-width: 2100px) {
    .competive-list li {
      font-size: 16px;
    }

    .competive-list {
      width: 180px;
    }
  }
</style>
