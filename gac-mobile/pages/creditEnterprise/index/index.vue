<template>
  <AppView class="Info" title="诚信企业" :clickLeft="clickLeft">
    <van-tabs class="tabTitle" :class="{ 'h5-credit-list-tab': inH5 }">
      <van-tab
        v-for="(tab, index) in tabs"
        :title="tab.categoryName"
        :key="index"
      >
        <div class="tab-content">
          <van-search
            v-model="businessName"
            placeholder="请输入企业名称"
            show-action
            @search="onSearch"
            @clear="onClear"
            v-if="index == 0"
          >
            <div slot="action" @click="onSearch">搜索</div>
          </van-search>
          <AppList
            v-if="loadData"
            name="searchAllByClassify"
            :query="{
              offset: 1,
              limit: 20,
              businessName: businessName,
              id: tab.categoryId
            }"
            :ref="'list' + index"
          >
            <template slot-scope="{ list }">
              <AppCard
                v-for="(item, i) in list"
                :key="i"
                :ids="item.id"
                :data="{
                  type: item.type,
                  id: item.id,
                  sortOrder: item.sortNum,
                  isSortOrder: tab.categoryId,
                  merchantPicUrl: item.merchantPicUrl,
                  merchantName: item.merchantName,
                  merchantId: item.merchantId,
                  honestDegree: item.honestDegree,
                  rewardNumber: item.rewardNumber,
                  complaintNumber: item.complaintNumber,
                  sortNum: item.sortNum,
                  addTime: item.addTime,
                  classifyId: item.classifyId,
                  classifyName: item.classifyName,
                  merchantSellNum: item.merchantSellNum,
                  merchantOnSellgoodsNum: item.merchantOnSellgoodsNum
                }"
                @click.native="to(item.type, item.merchantId)"
              />
            </template>
          </AppList>
        </div>
      </van-tab>
    </van-tabs>
  </AppView>
</template>

<script>
import { tabsList } from "~/utils/mixins";
import AppList from "~/components/common/list";
import AppCard from "~/components/common/card/item5";

export default {
  data() {
    return {
      tabs: [
        {
          categoryId: null,
          categoryName: "总榜"
        }
      ],
      inH5: true,
      loadData: true,
      businessName: ""
    };
  },
  components: {
    AppList,
    AppCard
  },
  activated() {
    this.$loading(this.$service("jewelryGoodsCat")).then(result => {
      this.tabs = this.tabs.concat(result.data.goodsCategory);
    });
    //	判断微信和app
    if (
      this.$native.isApp() ||
      window.navigator.userAgent.includes("MicroMessenger")
    ) {
      this.inH5 = false;
      if (this.$native.isApp()) {
        this.$native.getTitle("诚信企业");
      }
    }
  },
  head() {
    return {
      title: "诚信企业"
    };
  },
  methods: {
    clickLeft() {
      if (this.$native.isApp()) {
        this.$native.goToHome();
      } else {
        this.$router.go(-1);
      }
    },
    to(type, id) {
      if (type == 1) {
        this.$router.push({
          name: "jewelry-detail",
          query: {
            id: id
          }
        });
      } else if (type == 2) {
        this.$toast("该企业暂无更多信息");
      } else if (type == 3) {
        this.$router.push({
          name: "maker-detail",
          query: {
            id: id
          }
        });
      }
    },
    onClear() {
      this.loadData = false;
      this.$nextTick(item => {
        this.loadData = true;
      });
    },
    onSearch() {
      this.loadData = false;
      this.$nextTick(item => {
        this.loadData = true;
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
>>> .van-tabs__wrap {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99;
}

>>> .h5-credit-list-tab .van-tabs__wrap {
  top: 46px;
}

.tab-content {
  margin-top: 45px;
}
</style>
