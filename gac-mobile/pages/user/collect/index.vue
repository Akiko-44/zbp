<template>
  <AppView
    title="收藏"
    class="Info"
    :clickLeft="clickLeft"
  >

    <van-tabs
      :class="{'h5-list-tab' : inH5}"
      v-model="activeName"
    >
      <van-tab
        title="商品"
        name="goods"
      >
        <div v-if="hasLoad && goodsList.length">
          <div
            class="top-box"
            v-show="showTotal"
          >
            <p class="edit-box">
              <span>你收藏了 <span class="red">{{ total }}</span> 件商品</span>
              <span
                class="edit-btn"
                @click="hideTotal('goods')"
              >
                <van-icon name="cross" /></span>
            </p>

          </div>
          <div
            class="list-box"
            ref="listBox"
            id="listBox"
          >
            <div
              class="collect-block-item vertical"
              v-for="(goods, i) in goodsList"
              :key="i"
            >
              <AppCard
                :data="{
                  id: goods.goodsId,
                  collectSource: goods.goodsType,
	                imgUrl: goods.goodsImg,
	                title: goods.goodsName,
                  isOnSale: goods.isOnSale,
                  isDelete: goods.isDelete,
	                lowPrice: goods.lowPrice,
	                highPrice: goods.highPrice,
	              }"
                @collectSuccess="collectSuccess"
                @click.native="toDetail(goods.goodsId, goods.goodsType, (!goods.isOnSale && !goods.isDelete))"
              />
            </div>
          </div>
        </div>

        <div
          class="no-content"
          v-if="hasLoad && !goodsList.length"
        >
          <img
            src="../../../assets/images/no-content.png"
            alt=""
          />
          <p>您还没有收藏的商品</p>
        </div>
      </van-tab>
      <van-tab
        title="珠宝圈"
        name="jewelryCircle"
      >
        <div v-if="hasLoad && circleGoodsList.length">
          <div
            class="top-box"
            v-show="showCircleTotal"
          >
            <p class="edit-box">
              <span>你收藏了 <span class="red">{{ circleTotal }}</span> 条珠宝圈内容</span>
              <span
                class="edit-btn"
                @click="hideTotal('circle')"
              >
                <van-icon name="cross" /></span>
            </p>
          </div>
          <div
            class="list-box"
            ref="listBox"
            id="listBox"
          >
            <div
              class="collect-block-item vertical"
              v-for="(goods, i) in circleGoodsList"
              :key="i"
            >

              <CircleCard
                :data="{
                  id: goods.id,
                  imgUrl: goods.thumbnail,
                  title: goods.title,
                  brief: goods.brief,
                  columnName: goods.columnName,
                  collectNumber: goods.collectNumber,
                  isOnSale: goods.contentStatus == 1 ? true : false
                }"
                @collectCircleSuccess="collectCircleSuccess"
                @click.native="toCircleDetail(goods.type, goods.id, goods.contentStatus)"
              />
            </div>
          </div>
        </div>

        <div
          class="no-content"
          v-if="hasLoad && !circleGoodsList.length"
        >
          <img
            src="../../../assets/images/no-content.png"
            alt=""
          />
          <p>您还没有收藏的珠宝圈内容</p>
          <p>快去<span class="red">珠宝圈</span>逛逛吧</p>
          <van-button
            type="danger"
            class="link-jewelry-circle"
            @click.native="linkJewelryCircle"
          >去逛逛吧</van-button>
        </div>
      </van-tab>
    </van-tabs>

  </AppView>
</template>

<script>
import { tabsList } from '~/utils/mixins'
import AppCard from './item'
import CircleCard from './item/circle'
import AppList from "~/components/common/list";

export default {
  data() {
    return {
      dataLoading: true,
      activeName: 'goods',
      active: false,
      showList: false,
      postData: {
        offset: 1,
        limit: 50
      },
      query: {
        offset: 1,
        limit: 50
      },
      goodsList: [],
      circleGoodsList: [],
      total: 0,
      circleTotal: 0,
      allChecked: false,
      hasLoad: false,
      showTotal: true,
      showCircleTotal: true,
      inH5: true
    }
  },
  components: {
    AppList,
    AppCard,
    CircleCard
  },
  mixins: [tabsList],
  activated() {
    this.getList()
    this.getCircleList()
    if (this.$native.isApp() || window.navigator.userAgent.includes('MicroMessenger')) {
      this.inH5 = false
    }
    if (this.$native.isApp()) {
      this.$native.getTitle("收藏")
    }
  },
  deactivated() {
    this.$destroy()
  },
  head() {
    return {
      title: '收藏'
    }
  },
  methods: {
    getList() {
      this.dataLoading = true
      this.$loading(this.$service('userCollectList', { data: this.query })).then(result => {
        this.dataLoading = false
        this.hasLoad = true;
        if (result.data.total) {
          this.showList = true
          this.goodsList = result.data.records
          this.total = result.data.total
        } else {
          this.showList = false
        }
      }).catch(() => {
        this.dataLoading = false
      })
    },
    getCircleList() {
      this.dataLoading = true
      this.$loading(this.$service('circleCollectList', { data: this.query })).then(result => {
        this.dataLoading = false
        this.hasLoad = true
        if (result.data.total) {
          this.showList = true
          this.circleGoodsList = result.data.records
          this.circleTotal = result.data.total
          this.circleGoodsList.forEach(goods => {
            goods.checked = false
          })
        } else {
          this.showList = false
        }
      }).catch(() => {
        this.dataLoading = false
      })
    },
    clickLeft() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    },
    toDetail(goodsId, source, isClick) {
      let name = ''
      if (source == 1) {
        name = 'jewelry-work'
      } else if (source == 5) {
        name = 'design-work'
      } else if (source == 6) {
        name = 'maker-work'
      }
      if(isClick) {
      this.$router.push({ name: name, query: { id: goodsId } })
      }
    },
    collectSuccess(type) {
      if (type) {
        this.total++
      } else {
        this.total--
      }
    },
    collectCircleSuccess(type) {
      if (type) {
        this.circleTotal++
      } else {
        this.circleTotal--
      }
    },
    hideTotal(type) {
      if (type === 'goods') {
        this.showTotal = false
        document.querySelector('.van-tabs__content .van-tab__pane:nth-child(1) #listBox').style.paddingTop = 0
      } else {
        this.showCircleTotal = false
        document.querySelector('.van-tabs__content .van-tab__pane:nth-child(2) #listBox').style.paddingTop = 0
      }
    },
    linkJewelryCircle() {
      if (this.$native.isApp()) {
        this.$native.goToJewelryCircle();
      } else {
        this.$router.push({ name: "news-jewelryCircle" });
      }
    },
    toCircleDetail(type, id, status) {
      if (status !== 1) {
        this.$toast({
          message: '该内容已下架'
        })
        return
      }
      if (type === 1) {
        if (this.$native.isApp()) {
          this.$native.goToJewelryDetail(id);
        } else {
          this.$router.push({
            name: "news-jewelryCircle-detail",
            query: { id: id }
          })
        }
      } else {
        if (this.$native.isApp()) {
          this.$native.goToJewelryVideo(id);
        } else {
          this.$router.push({
            name: "news-jewelryCircle-videoDetail",
            query: { id: id }
          });
        }
      }
    },
  }
}
</script>

<style lang="postcss" scoped>
.no-content {
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
.top-box {
  position: fixed;
  z-index: 9;
  padding: 10px;
  width: calc(100% - 20px);
  background: #f2f2f2;
}
.edit-box {
  /* position: fixed;
  margin: 10px; */
  box-sizing: border-box;
  /* width: calc(100% - 20px); */
  padding: 0 20px;
  line-height: 45px;
  color: #333;
  font-size: 14px;
  /* z-index: 9; */
  background: #fff;
  border-radius: 5px;
  & .edit-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 8px;
    width: 17px;
    line-height: 27px;
  }
}
.list-box {
  padding-top: 55px;
}
.list-box.active-list-box {
  padding-bottom: 44px;
}
.collect-block-item {
  background: white;
  position: relative;
  margin: 10px;
  border-radius: 5px;
  overflow: hidden;
  & .animate {
    position: relative;
    transition: transform 0.3s;
    transform: translate3d(0, 0, 0);
    z-index: 2;
    &.active {
      transform: translate3d(-60px, 0, 0);
    }
  }
  & .checkbox {
    margin-left: 10px;
    margin-right: 10px;
    width: 20px;
  }
  & .app-card-item {
    /* flex: 1; */
    width: 355px;
    &.edit-card-item {
      width: 324px;
      padding-left: 0;
    }
  }
}
.cart-footer {
  padding-left: 10px;
  background: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  & .select-all-text {
    display: inline-block;
    margin-left: 10px;
  }
}
.primary-btn {
  width: 100px;
  background: #fb746e;
  border-color: #fb746e;
  border-radius: 0;
}
>>> .van-tabs__wrap {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
}
>>> .h5-list-tab .van-tabs__wrap {
  top: 46px;
}
>>> .van-tabs__nav {
  background: #f2f2f2;
}
>>> .van-tabs__content {
  overflow: hidden;
  margin-top: 44px;
}
</style>
