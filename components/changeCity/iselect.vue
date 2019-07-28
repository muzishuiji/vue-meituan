<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <a-select
      v-model="pvalue"
      style="width: 120px;"
      placeholder="省份"
    >
      <a-select-option
        v-for="item in province"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </a-select-option>
    </a-select>
    <a-select
      v-model="cvalue"
      :disabled="!city.length"
      style="width: 180px;"
      placeholder="城市"
    >
      <a-select-option
        v-for="item in city"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </a-select-option>
    </a-select>
    <span><b>直接搜索: </b></span>
    <a-select
      mode="multiple"
      label-in-value
      style="width: 200px;display: inline-block;"
      :value="value"
      placeholder="直接搜索"
      :filter-option="false"
      :not-found-content="fetching ? undefined : null"
      @search="fetchUser"
      @change="handleChange"
    >
      <a-spin v-if="fetching" slot="notFoundContent" size="small" />
      <a-select-option v-for="d in data" :key="d.value">
        {{ d.value }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
export default {
  data() {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: '',
      cities: [],
      nowCities: [],
      list: [],
      data: [],
      value: [],
      fetching: false
    }
  },
  watch: {
    pvalue: async function (newPvalue) {
      const self = this
      const { status, data: { city } } = await axios.get(`/geo/province/${newPvalue}`)
      if (status === 200) {
        self.city = city.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
        self.cvalue = ''
      }
    }
  },
  mounted: async function () {
    const self = this
    const { status, data: { province } } = await axios.get('/geo/province')
    if (status === 200) {
      self.province = province.map((item) => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    fetchUser: _.debounce(async function (value) {
      this.fetching = true
      if (this.cities.length) {
        this.data = this.cities.filter((item) => {
          return item.value.indexOf(value) !== -1
        })
        if (this.data.length === 0) {
          this.data.push({
            value: '暂无数据'
          })
        }
      } else {
        const { status, data: { city } } = await axios.get('/geo/city')
        if (status === 200) {
          this.cities = city.map((item) => {
            return {
              value: item.name
            }
          })
          this.data = this.cities
        }
      }
      this.fetching = false
    }, 200),
    handleChange(value) {
      if (value[0].key !== '暂无数据') {
        this.data = []
        this.fetching = false
        this.$store.state.geo.position.city = value[0].key
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>
