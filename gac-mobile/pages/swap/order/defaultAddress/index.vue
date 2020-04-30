<template>
  <div
    class="default-address"
    @click="$router.push({ name: 'user-address', query: {name: 'is-go'} })"
  >

    <div class="address-bar">
      <template v-if="!loading">
        <div class="a-detail">
          <van-row
            type="flex"
            justify="space-between"
          >
            <van-col span="3"><img
                class="icon-address"
                src="../../../../assets/images/icon/address_icon.png"
              /></van-col>
            <van-col span="21">
              <p>{{address.consignee}}
                <span class="mobile">{{address.mobile}}</span></p>
              <p
                v-if="address.province"
                class="a-size"
              >{{address.province}}{{address.city}}{{address.area}}{{address.detail}}</p>
              <p v-else>暂无收货地址，去填写一个吧~</p>
            </van-col>
          </van-row>

        </div>
        <div class="a-edit">
          <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
        </div>
      </template>
    </div>
    <div class="icon-address">
      <i class="ico-bg_address"></i>
    </div>
  </div>
</template>

<script>
import { setToken, getToken, AppToken, isAppToken } from '~/utils/auth'
export default {
  data() {
    return {
      loading: true,
      addressList: [],
      address: {}
    }
  },
  middleware: 'auth',
  beforeMount() {
    this.$store.dispatch('user/checkLogin', this.$router)
  },
  activated() {
    this.loading = true
    this.$service('userAddress').then(result => {
      this.addressList = result.data.records
      this.addressList.map(data => {
        if (data.isDefault == 1) {
          this.address = data
        }
      })
      this.loading = false
    }).catch(() => {
      this.loading = false
    })
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
    height: 88px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 16px;
    line-height: 1.5;
    & .mobile {
      color: #aaaaab;
      font-size: 15px;
    }
    & .a-detail {
      flex-grow: 1;
      /* font-size: 12px; */
      /* padding: 0 10px; */
      /* line-height: 16px; */
    }
    & .a-size {
      margin-top: 12px;
      font-size: 13px;
      color: #585859;
      word-wrap: break-word;
      line-height: 18px;
      margin-top: 5px;
    }
    & .ico-address {
      margin-top: 10px;
    }
  }
}
</style>
