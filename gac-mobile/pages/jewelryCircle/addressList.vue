<template>
  <AppView class="search">
    <div class="search-box">
      <van-icon
        name="arrow-left"
        class="search-left"
        @click.native="onCancel"
      />
      <van-search
        class="search-right"
        placeholder="输入关键词搜索"
        v-model.trim="value"
        shape="round"
        show-action
        autofocus
        @cancel="onCancel"
      >
        <div slot="left-icon">
          <img
            src="../../assets/images/icon/search.png"
            width="13"
          >
        </div>
        <div
          slot="action"
          class="search-btn"
          @click="onCancel"
        >取消
        </div>
      </van-search>
    </div>
    <div class="address-list">
      <div
        class="address-item"
        @click="chooseAddress({title: '不显示地址'})"
      >
        <div class="list-name-no">
          不显示地址
        </div>
      </div>
      <div
        class="address-item"
        v-for="(item,index) in addressList"
        :key="index"
        @click="chooseAddress(item)"
      >
        <div class="list-name">
          {{item.title}}
        </div>
        <div class="list-info">
          {{item.address}}
        </div>
      </div>
    </div>

  </AppView>
</template>

<script>
import { getCurrentAddress } from '~/utils/location'
import { getToken } from '~/utils/auth'
import AppList from "~/components/common/list"
export default {
  components: {
    AppList
  },
  data() {
    return {
      value: '',
      type: '',
      addressList: [],
      localAddressList: [],
      form: {}
    }
  },
  beforeMount() {
    if (this.$route.query.data) {
      this.form = JSON.parse(this.$route.query.data)
    }
    this.getLoc()
  },
  mounted() {
    document.getElementsByClassName('van-field__control')[0].id = 'addressInput'
    var ac = new BMap.Autocomplete(
      {
        "input": addressInput,
        "onSearchComplete": (data) => {
          ac.hide()
          this.addressList = data.Ir
          this.addressList.map(item => {
            item.title = item.business
            item.address = item.city + item.district
          })
        }
      }
    )
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    getCurrentAddress,
    async getLoc() {
      getCurrentAddress().then((address) => {
        this.addressList = address.surroundingPois
        this.localAddressList = this.addressList
      })
    },
    chooseAddress(item) {
      this.form.contentReleaseArea = item.title
      this.$router.push({ name: 'jewelryCircle-publish', query: { data: JSON.stringify(this.form) } })
    },
    // onSearch() {
    //   this.listParams.topicName = this.value
    // },
    onCancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="postcss" scoped>
.search {
  height: 100vh;
  background: #f5f6fa;
  & .search-box {
    display: flex;
    & .search-left {
      width: 40px;
      text-align: center;
      line-height: 54px;
      font-size: 13px;
      background: #ffffff;
    }
    & .search-right {
      flex: 1;
      padding-left: 0;
    }
  }
  & .search-btn {
    width: 53px;
    height: 28px;
    background: #df735a;
    border-radius: 14px;
    text-align: center;
    color: #fff;
    line-height: 28px;
  }
  & .address-list {
    /* padding-top: 10px; */
    padding-left: 15px;
    & .address-item {
      /* padding-right: 20px; */
      padding: 14px 80px 14px 0;
      line-height: 1.5;
      font-size: 12px;
      color: #666;
      border-bottom: 1px solid #e5e5e5;
      & .list-name-no {
        line-height: 40px;
        font-size: 16px;
        color: #333333;
      }
      & .list-name {
        font-size: 16px;
        color: #333333;
      }
      &:last-child {
        border: 0;
      }
    }
  }
}
</style>
