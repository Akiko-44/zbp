<template>
  <AppView class="Info" title="企业名录" :clickLeft="clickLeft">
    <van-search
      v-model="companyName"
      placeholder="请输入企业名称"
      show-action
      @search="onSearch"
      @clear="onClear"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <AppList
      v-if="loadData"
      name="companyDirectory"
      :query="{ offset: 1, limit: 20, companyName: companyName }"
      ref="list"
    >
      <template slot-scope="{ list }">
        <van-row gutter="10" v-if="list && list.length">
          <van-col span="24" v-for="(item, i) in list" :key="i">
            <AppCard
              :data="{
                id: item.id,
                merchantId: item.merchantId,
                merchantType: item.merchantType,
                companyName: item.companyName,
                companyType: companyTypeMap[item.companyType],
                provinceName: item.provinceName,
                cityName: item.cityName,
                logo: item.logo,
                sortOrder: i + 1,
                externalLink: item.externalLink,
                categoryList: item.categoryList
              }"
              @click.native="
                to(item.externalLink, item.merchantId, item.merchantType)
              "
            />
          </van-col>
        </van-row>
      </template>
    </AppList>
    <!-- <div class="list">
      <van-row
        gutter="10"
        v-if="list && list.length"
      >
        <van-col
          span="24"
          v-for="(item, i) in list"
          :key="i"
        >
          <AppCard
            :data="{
		      	id: item.id,
		      	merchantId: item.merchantId,
		      	merchantType: item.merchantType,
		      	companyName: item.companyName,
		      	companyType: item.companyType,
		      	provinceName: item.provinceName,
		      	cityName: item.cityName,
		      	logo: item.logo,
		      	sortOrder: i+1,
		      	externalLink: item.externalLink,
		      	categoryList: item.categoryList
		      }"
            @click.native="to(item.externalLink, item.merchantId, item.merchantType)"
          />
        </van-col>
      </van-row>
      <div
        v-else
        class="status"
      >
        <img src="../../../assets/images/emptylist.png" />
        <p style="margin-top: 15px;">暂无数据</p>
      </div>
    </div> -->
  </AppView>
</template>

<script>
import { tabsList } from "~/utils/mixins";
import AppList from "~/components/common/list";
import AppCard from "~/components/common/card/item7";

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
      list: [],
      companyName: "",
      companyTypeMap: {
        1: "专委会主任企业",
        2: "专委会副主任企业",
        3: "专委会成员",
        4: "中宝协会员",
        5: "其它成员"
      }
    };
  },
  components: {
    AppList,
    AppCard
  },
  activated() {
    // this.getList()
    //	判断微信和app
    if (
      this.$native.isApp() ||
      window.navigator.userAgent.includes("MicroMessenger")
    ) {
      this.inH5 = false;
      if (this.$native.isApp()) {
        this.$native.getTitle("企业名录");
      }
    }
  },
  head() {
    return {
      title: "企业名录"
    };
  },
  watch: {
    companyName(newVal) {
      this.companyName = newVal;
    }
  },
  methods: {
    getList() {
      this.$loading(
        this.$service("companyDirectory", {
          data: { companyName: this.companyName }
        })
      ).then(result => {
        this.list = result.data;
        this.list.map(item => {
          item.companyType = this.companyTypeMap[item.companyType];
        });
      });
    },
    clickLeft() {
      if (this.$native.isApp()) {
        this.$native.goToHome();
      } else {
        this.$router.go(-1);
      }
    },
    to(link, merchantId, merchantType) {
      if (merchantId && merchantType) {
        if (merchantType == 1) {
          this.$router.push({
            name: "jewelry-detail",
            query: { id: merchantId }
          });
        } else if (merchantType == 2) {
          /* this.$router.push({
            name: 'design-detail',
            query: { id: merchantId }
          }) */
          this.$toast("该企业暂无更多信息");
        } else {
          this.$router.push({
            name: "maker-detail",
            query: { id: merchantId }
          });
        }
      } else if (link) {
        location.href = link;
      } else {
        this.$toast("该企业暂无更多信息");
      }
    },
    onClear() {
      this.companyName = "";
      // this.getList();
      this.loadData = false;
      this.$nextTick(item => {
        this.loadData = true;
      });
    },
    onSearch() {
      // this.getList();
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
.status {
  position: relative;
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 14px;
  color: var(--dark-gray);
  line-height: 1;
  z-index: 0;
  & img {
    width: 200px;
    margin-top: 10px;
  }
}
</style>
