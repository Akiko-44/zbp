<template>
<div id="myPrize">
  <AppView title="中奖个人信息">
    <van-address-edit
      :addressInfo="address"
      :area-list="areaList"
      :is-saving="isSaving"
      :tel-validator="telValidator"
      :is-deleting="isDeleting"
      save-button-text="确定"
      show-search-result
      @save="onSave"
      @change-detail="onChangeDetail"
      @setAddressDetail="onChangeDetail"
      ref="edit"
    >
    </van-address-edit>
  </AppView>
</div>
</template>

<script>
import areaList from '~/assets/data/areaList'
import { isMobile } from '~/utils/validate.js'
export default {
  name: 'myPrize',
  data() {
  	console.log(isMobile)
  	return{
      isSaving: false,
      isDeleting: false,
      address: {},
      areaList: areaList
  	}
  },
  head() {
    return {
      title: '中奖个人信息'
    }
  },
  middleware: 'auth',
  async beforeMount() {
    await this.$store.dispatch('user/checkLogin', this.$router)
  },
  deactivated() {
    this.address = {}
  },
  computed: {
    
  },
  methods: {
    onSave(address) {
      this.isSaving = true
      this.$service('drawExpressSave', {
        data: {
          id: this.$route.query.id,
          province: address.province.replace('省', ''),
          city: address.city,
          area: address.county,
          detail: address.addressDetail,
          consignee: address.name,
          consigneeMobile: address.tel
        }
      })
        .then(this.success)
        .catch(() => {
          this.isSaving = false
        })
    },
    telValidator(value) {
    	return isMobile(value)
    },
    onChangeDetail(val) {
      if (Number(this.getStringLen(val)) > 60) {
        val = val.substring(0, 30)
        this.$toast('字数限制在30字以内')
      }
    },
    getStringLen(str) {
      if (str == null) return 0;
      if (typeof str != "string") {
        str += "";
      }
      return str.replace(/[^\x00-\xff]/g, "ab").length;
    },
    success() {
      this.isDeleting = false
      this.isSaving = false
      this.$toast({ type: 'success', message: '成功' })
      setTimeout(()=>{
      	if (this.$native.isApp()) {
	        this.$native.goToHome()
	      } else {
	        this.$router.go(-1)
	      }
      },2000)
    }
  }
}
</script>

<style lang="postcss" scoped>
.van-address-edit {
  padding: 10px;
  & .van-cell {
    line-height: 33px;
  }
  & .van-cell:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  & .van-cell:nth-child(5) {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  & .van-address-item {
    margin-bottom: 10px;
    border-radius: 5px;
  }
  & .van-address-edit__buttons {
    padding: 50px 0 0;
    & .van-button.van-button--danger {
      background: #df735a;
      border-color: #df735a;
    }
  }
}
</style>