<template>
  <div>
    <el-select v-model="selectedType" class="select-type" @change="clearModel">
      <el-option
        v-for="(item, key) in panelData"
        :key="item"
        :label="item"
        :value="key">
      </el-option>
    </el-select>
    <el-select
      v-model="selectedSample[selectedType]"
      multiple
      filterable
      :filter-method="filterInAll"
      placeholder="请选择本品" class="multiple-select" @change="setSamples">
      <el-option
        v-for="(item, key) in selectList"
        :key="item.name"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <span @click="enterParse" class="arrow">
       <img src="../../assets/parse/enter-arrow.png" class="arrow">
    </span>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import Vue from 'vue'

  export default {
    data () {
      return {
        selectedType: '2',
        selectedSample: [[], [], [], []],
        panelData: {
          0: '品牌',
          1: '厂商',
          2: '车型',
          3: '车款'
        },
        allSamples: [],
        selectList: [],
        page: 0,
        pageSize: 10
      }
    },
    watch: {
      selectedType () {
        this.initSelectList()
      },
      allSamples () {
        if (this.selectList.length === 0) this.initSelectList()
      }
    },
    computed: {
      idDict () {
        let obj = {}
        if (this.allSamples[this.selectedType]) {
          let len = this.allSamples[this.selectedType]
          for (let i = 0; i < len.length; i++) {
            obj[len[i].id] = len[i].name
          }
        }
        return obj
      },
      selectedSamples () {
        return this.selectedSample[this.selectedType].map(i => {
          return {value: i, label: this.idDict[i]}
        })
      },
      date () {
        return this.$store.state.parse.date
      }
    },
    created () {
      this.getPanelData()
    },
    methods: {
      enterParse () {
        this.$store.commit(types.SET_SAMPLES, this.selectedSamples)
        this.$store.commit(types.IS_PAINT_HEATMAP, true)
        if (localStorage.getItem('GalaxyToken')) {
          this.$router.push('/galaxy')
        } else {
           this.$message.success('请登录')
        }
      },
      setSamples () {
        this.$store.commit(types.SET_SAMPLES, this.selectedSamples)
      },
      initSelectList () {
        const all = this.allSamples[this.selectedType]
        if (all) {
          this.selectList = all.slice(0, 50)
        }
      },
      getPanelData () {
        for (let i = 0; i < 4; i++) {
          const params = new URLSearchParams()
          params.append('type', i)
          params.append('date', this.date)
          this.$axios.post('/car/queryCarServlet', params).then(res => {
            Vue.set(this.allSamples, i, res.data.data)
            if (i === 3) {
              this.$store.commit(types.SET_ALLSAMPLES, this.allSamples)
            }
          })
        }
      },
      clearModel (val) {
        this.selectedSample = [[], [], [], []]
        this.$store.commit(types.SET_SELECTEDTYPE, this.selectedType)
      },
      filterInAll (input) {
        if (input === '') return this.initSelectList()
        const all = this.allSamples[this.selectedType]
        const filtered = all.filter(item => {
          const exp = new RegExp(input)
          if (exp.exec(item.name) !== null) return item
        })
        this.selectList = filtered
      }
    }
  }
</script>

<style>
  .arrow {
    display: inline-block;
    width: 25px;
    height: 25px;
    vertical-align: text-bottom;
    cursor: pointer;
    margin-left: 3px;
    margin-top: 2px;
  }

  .select-type {
    width: 100px;
    height: 45px;
    font-size: 16px;
    vertical-align: middle;
  }

  .multiple-select {
    width: 50%;
    vertical-align: top;
  }

  .multiple-select, .el-tag--info {
    color: #5a5e66;
    text-align: left;
  }

   .error-block {
    height: 30px;
    font-size: 12px;
    text-align: center;
    color: #ee4949;
  }
</style>
