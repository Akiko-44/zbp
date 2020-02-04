<template>
<AppView title="确认收货地址" class="address">
  <van-address-list
    v-model="chosenAddressId"
    :list="list"
    @add="onAdd"
    @edit="onEdit"
  />
  <van-button size="large" @click="getId">确认</van-button>
</AppView>
</template>

<script>
export default {
  middleware: 'auth',
  beforeMount () {
    this.$store.dispatch('user/checkLogin', this.$router)
  },
  activated () {
    this.$loading(this.$service('userAddress')).then(result => {
      this.list = result.data.records.map(address => {
        if (address.isDefault) {
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
  deactivated () {
	  this.$destroy()
	},
  data () {
    return {
      chosenAddressId: '',
      list: []
    }
  },
  methods: {
  	getId(){
  		this.$service('orderSwapAgree',{
  			resources: [this.$route.query.orderNumber,this.chosenAddressId]
  		}).then(res => {
  			if(res.success){
  				this.$router.go(-1)
  			}
  		})
  	},
    onAdd () {
      this.$router.push({name: 'user-address-edit'})
    },
    onEdit (item, index) {
      this.$router.push({name: 'user-address-edit', query: {id: item.id}})
    }
  }
}
</script>

<style lang="postcss" scoped>
.address {
  min-height: 100%;
  background-color: var(--light-gray);
}
</style>
