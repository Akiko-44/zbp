
<template>
  <div class="app-container calendar-list-container">
    <div
      class="list"
      v-if="list.length"
    >
      <div
        v-for="(item, i) in list"
        :key="i"
        class="item"
      >
        <p>消费时间：{{item.id}}</p>
        <p>消费金额：{{item.id}}</p>
        <p>购买商品：{{item.id}}</p>
        <p>购买数量：{{item.id}}</p>
        <p>订单编号：{{item.id}}</p>
        <p>交易状态：{{item.id}}</p>
        <p>完成时间：{{item.id}}</p>
      </div>
    </div>
    <div class="tc">
      <p>暂无数据</p>
    </div>
  </div>
</template>

<script>
import {
  opusList
} from '@/api/designMerchant/works'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: [],
      listLoading: true
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      opusList({ type: 0 })
        .then(data => {
          this.list = data.data.records
        })
    }
  }
}
</script>

<style scoped>
.item {
  border-bottom: 1px solid #eee;
}
.item:last-child {
  border-bottom: none;
}
</style>
