<template>
  <AppView class="address"
           title="收货地址">
    <van-address-list v-model="chosenAddressId"
                      :list="list"
                      @add="onAdd"
                      @edit="onEdit"
                      @select="onSelect">
      <!-- 列表内容 -->
      <slot :list="list"></slot>
      <!--<slot name="empty">
        <div class="status">我们是有底线的平台</div>
      </slot>-->
    </van-address-list>
  </AppView>
</template>

<script>
export default {
  middleware: 'auth',
  head() {
    return {
      title: '收货地址'
    }
  },
  beforeMount() {
    this.$store.dispatch('user/checkLogin', this.$router)
    if (this.$native.isApp()) {
    	this.$native.getTitle('收货地址')
    }
  },
  mounted() {
    this.$loading(this.$service('userAddress')).then(result => {
      this.list = result.data.records.map(address => {
        if (address.isDefault == 1) {
          this.chosenAddressId = address.id
        }
        return {
          ...address,
          name: address.consignee,
          tel: address.mobile,
          address: address.province + address.city + address.area + address.detail
        }
      })
    })
  },
  deactivated() {
    this.$destroy()
  },
  data() {
    return {
      chosenAddressId: '',
      list: [],

      showTitle: this.$route.query.showTitle
    }
  },
  methods: {
    onAdd() {
      this.$router.push({ name: 'user-address-edit' })
    },
    onEdit(item, index) {
      this.$router.push({ name: 'user-address-edit', query: { id: item.id } })
    },
    onSelect(item, index) {
      this.$service('userSetDefault', { resources: [item.id] })
        .then(result => {
          this.$toast({ type: 'success', message: '选择成功' })
          if (this.$route.query.name == 'is-go') {
            this.$router.go(-1)
          }
        })
    },
    handler(bind) {
      this.$refs.list.handler(bind)
    }
  }
}
</script>

<style lang="postcss" scoped>
.address {
  min-height: 100%;
  background-color: var(--light-gray);
}
>>> .van-address-list {
	padding: 0;
}
</style>
