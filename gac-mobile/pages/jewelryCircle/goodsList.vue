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
          @click="onSearch"
        >搜索
        </div>
      </van-search>
    </div>
    <div class="goods-list">
      <template v-if="hasLoad && isMerchant">
        <!-- <p class="title text-black font-14 font-weight">我发布的商品</p> -->
        <AppList
          name="getUserRelationGoods"
          :query="{type: 3,keyWord: value}"
          :isDisabled="true"
          :getData="
                  () =>
                    this.$service('getUserRelationGoods', {
                      data: {type: 3,keyWord: value}
                    })
                "
          ref="list3"
        >
          <template slot-scope="{ list }">
            <div
              class="list-box"
              ref="listBox"
              id="listBox"
            >
              <div
                class="collect-block-item vertical"
                v-for="(item, i) in list"
                :key="i"
              >
                <AppCard
                  :data="{
                  id: item.id,
                  collectSource: 1,
	                imgUrl: item.imgUrl,
	                title: item.goodsName,
	                lowPrice: item.price,
	              }"
                  @click.native="toPublish(item)"
                />
              </div>
            </div>
          </template>
        </AppList>
      </template>
      <van-tabs
        v-model="activeName"
        v-if="hasLoad && !isMerchant"
      >
        <van-tab
          v-for="(tab, tabIndex) in tabs"
          :name="tab.type"
          :title="tab.name"
          :key="tabIndex"
        >
          <AppList
            name="getUserRelationGoods"
            :query="{type: activeName,keyWord: value}"
            :isDisabled="true"
            :getData="
                  () =>
                    this.$service('getUserRelationGoods', {
                      data: {type: activeName,keyWord: value}
                    })
                "
            ref="list"
          >
            <template slot-scope="{ list }">
              <div
                class="list-box"
                ref="listBox"
                id="listBox"
              >
                <div
                  class="collect-block-item vertical"
                  v-for="(item, i) in list"
                  :key="i"
                >
                  <AppCard
                    :data="{
                  id: item.id,
                  collectSource: 1,
	                imgUrl: item.imgUrl,
	                title: item.goodsName,
	                lowPrice: item.price,
	              }"
                    @click.native="toPublish(item)"
                  />
                </div>
              </div>
            </template>
          </AppList>
        </van-tab>
      </van-tabs>
    </div>

  </AppView>
</template>

<script>
import { getToken } from '~/utils/auth'
import AppList from "~/components/common/list";
import AppCard from '~/components/jewelryCircle/cardItem-goods'
export default {
  components: {
    AppList,
    AppCard
  },
  data() {
    return {
      value: '',
      activeName: 1,
      isMerchant: false,
      hasLoad: false,
      form: {},
      tabs: [
        { name: "已购买", type: 1 },
        { name: "我的收藏", type: 2 }
      ],
    }
  },
  async activated() {
    if (this.$route.query.data) {
      this.form = JSON.parse(this.$route.query.data)
    }
    if (getToken()) {
      const userInfo = await this.$store.dispatch("user/getUserInfo");
      this.isMerchant = userInfo.userType !== 1 ? true : false
    }
    this.hasLoad = true
  },
  methods: {
    onSearch() {
      this.hasLoad = false
      this.$nextTick(() => {
        this.hasLoad = true
      })
    },
    onCancel() {
      this.$router.go(-1)
    },
    toPublish(data) {
      this.form.contentToGoodsDTOS[0] = data
      this.$router.replace({ name: 'jewelryCircle-publish', query: { data: JSON.stringify(this.form) } })
    }
  }
}
</script>

<style lang="postcss" scoped>
.search {
  height: 100vh;
  background: #f2f2f2;
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
  & .title {
    padding: 15px 0 0 10px;
  }
  & .collect-block-item {
    background: white;
    position: relative;
    margin: 10px;
    border-radius: 5px;
    overflow: hidden;
    & .app-card-item {
      width: 355px;
    }
  }
  & .no-content {
    padding-top: 70px;
    text-align: center;
    font-size: 15px;
    color: #999;
    & img {
      width: 330px;
    }
    & p {
      margin-bottom: 15px;
    }
    & .link-jewelry-circle {
      width: 110px;
      height: 44px;
      background: #df735a;
      border-color: #df735a;
    }
  }
}
>>> .van-tabs__nav {
  background: #f2f2f2;
}
</style>
