<template>
  <AppView title="新增收货地址">
    <van-address-edit
      :addressInfo="address"
      :area-list="areaList"
      :show-delete="showDelete"
      :is-saving="isSaving"
      :is-deleting="isDeleting"
      show-set-default
      show-search-result
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      @setAddressDetail="onChangeDetail"
      ref="edit"
    >
      <!--<van-field
      v-model="other.email"
      label="邮箱地址"
      placeholder="用于接收订单提醒邮件"
      require
    />-->
    </van-address-edit>
  </AppView>
</template>

<script>
import areaList from '~/assets/data/areaList'

export default {
  head() {
    return {
      title: '新增收货地址'
    }
  },
  data() {
    return {
      areaList,
      isSaving: false,
      isDeleting: false,
      address: {}
    }
  },
  middleware: 'auth',
  async beforeMount() {
    await this.$store.dispatch('user/checkLogin', this.$router)
  },
  activated() {
    if (this.$route.query.id) {
      this.$loading(this.$service('userAddressDetail', { resources: [this.$route.query.id] }))
        .then(this.changeAddressData)
    }
    document.getElementsByTagName('textarea')[0].setAttribute('maxlength', 30)
  },
  deactivated() {
    this.address = {}
  },
  computed: {
    showDelete() { return !!this.$route.query.id }
  },
  methods: {
    onSave(address) {
      this.isSaving = true
      this.$service('userAddressUpdate', {
        data: {
          province: address.province.replace('省', ''),
          area: address.county,
          city: address.city,
          consignee: address.name,
          detail: address.addressDetail,
          id: address.id,
          isDefault: +address.isDefault,
          mobile: address.tel,
          phone: address.tel,
          zipcode: address.postalCode
        }
      })
        .then(this.success)
        .catch(() => {
          this.isSaving = false
        })
    },
    onDelete(address) {
      this.isDeleting = true
      this.$service('userAddressDelete', { resources: [address.id] })
        .then(this.success)
        .catch(() => {
          this.isDeleting = false
        })
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
      this.$router.go(-1)
    },
    changeAddressData({ data }) {
      this.address = {
        id: data.id,
        name: data.consignee,
        tel: data.mobile,
        province: data.province,
        city: data.city,
        county: data.area,
        addressDetail: data.detail,
        areaCode: this.findCodeWrap(data.province, data.city, data.area),
        postalCode: data.zipcode,
        isDefault: !!data.isDefault
      }
    },
    findCodeWrap(province, city, county) {
      if (county == '南山区' && province.indexOf('广东') > -1) {
        return '440305'
      } else if (county == '南山区' && province.indexOf('黑龙江') > -1) {
        return '230404'
      }
      return this.findCode('county', county) ||
        this.findCode('city', city) ||
        this.findCode('province', province)
    },
    findCode(name, value) {
      for (let key in areaList[`${name}_list`]) {
        if (areaList[`${name}_list`][key].indexOf(value) !== -1) {
          return key
        }
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
>>> .van-address-edit {
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