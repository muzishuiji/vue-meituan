<template>
  <a-table
    :columns="columns"
    :data-source="cartData"
    style="width: 980px"
  >
    <span
      slot="name"
      width="532"
    />
    <span
      slot="price"
      width="132"
    />
    <span
      slot="count"
      slot-scope="count"
      width="212"
    >
      <a-input-number :value="count" :min="1" :max="100000" :default-value="3" />
    </span>
    <span
      slot="total"
      slot-scope="text, record"
      width="212"
    >
      <div class="">
        {{ record.count * record.price }}
      </div>
    </span>
  </a-table>
</template>

<script>
export default {
  props: {
    cartData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      columns: [{
        title: '商品名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '单价',
        dataIndex: 'price',
        key: 'price'
      }, {
        title: '数量',
        dataIndex: 'count',
        key: 'count',
        scopedSlots: { customRender: 'count' }
      }, {
        title: 'total',
        key: 'total',
        scopedSlots: { customRender: 'total' }
      }]
    }
  }
}
</script>
