<template>
  <div class="default-address" @click="$router.push({ name: 'user-address', query: {id: address.id} })">
    <div class="icon-address">
      <i class="ico-bg_address"></i>
    </div>
    <div class="address-bar">
      <template v-if="!loading">
        <div class="a-name">
          <p>{{address.consignee}}</p>
          <p class="a-tag">
            <van-tag v-if="address.consignee" plain type="danger">默认</van-tag>
          </p>
        </div>
        <div class="a-detail">
          <p>{{address.phone}}</p>
          <p v-if="address.province" class="a-size">{{address.province}}{{address.city}}{{address.area}}{{address.detail}}</p>
          <p v-else>暂无收货地址，去填写一个吧~</p>
        </div>
        <div class="a-edit">
          <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      addressList: []
    }
  },
  middleware: 'auth',
  beforeMount () {
    this.$store.dispatch('user/checkLogin', this.$router)
  },
  activated () {
    this.loading = true
    this.$service('userAddress').then(result => {
      this.addressList = result.data.records
      this.loading = false
    }).catch(() => {
      this.loading = false
    })
  },
  computed: {
    address () {
      return this.addressList.filter(address => address.isDefault)[0] || {}
    }
  }
}
</script>

<style lang="postcss" scoped>
.default-address {
  & .icon-address {
    width: 100%;
    overflow: hidden;
  }
  & .address-bar {
    width: 100%;
    height: 67px;
    background: #fffced;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 15px;
    line-height: 1.5;
    & .a-name {
      box-sizing: border-box;
      padding: 0 5px;
      min-width: 55px;
      text-align: center;
    }
    & .a-detail {
      flex-grow: 1;
      padding: 0 10px;
    }
    & .a-size {
      font-size: 12px;
      color: #999;
      word-wrap: break-word;
      line-height: 1;
      margin-top: 5px;
    }
  }
}
</style>
