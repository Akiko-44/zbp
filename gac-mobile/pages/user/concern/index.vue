<template>
  <AppView
    :title="title"
    class="Info"
    :clickLeft="clickLeft"
  >

    <van-tabs
      :class="{'h5-list-tab' : inH5}"
      v-model="activeName"
    >
      <van-tab
        v-if="!query.authorId"
        title="店铺"
        name="goods"
      >
        <div>
          <div
            class="top-box"
            v-show="showTotal"
          >
            <p class="edit-box">
              <span>你关注了 <span class="red">{{ total }}</span> 家店铺</span>
              <span
                class="edit-btn"
                @click="hideTotal('goods')"
              >
                <van-icon name="cross" /></span>
            </p>
          </div>
          <AppList
            name="shopConcernList"
            :query="query"
            :isDisabled="true"
            :getData="
              () =>
                this.$service('shopConcernList', {
                  data: this.query
                })
            "
            ref="list"
            @loadData="loadShopData"
          >
            <template slot-scope="{ list }">
              <div
                class="list-box"
                ref="listBox"
                id="listBox"
              >
                <div
                  class="collect-block-item vertical"
                  v-for="(goods, i) in list"
                  :key="i"
                >
                  <AppCard
                    :data="{
                      merUserId: goods.merUserId,
                      merchantType: goods.merchantType,
                      imgUrl: goods.merchantLogo,
                      title: goods.merchantName,
                      concernNum: goods.concernNum
                    }"
                    @collectSuccess="collectSuccess"
                    @click.native="toDetail(goods.merchantId, goods.merchantType)"
                  />
                </div>
              </div>
            </template>
          </AppList>
        </div>

        <!-- <div
          class="no-content"
          v-if="hasLoad && !goodsList.length"
        >
          <img
            src="../../../assets/images/no-content.png"
            alt=""
          />
          <p>您还没有关注的店铺</p>
        </div> -->
      </van-tab>
      <van-tab
        title="作者"
        name="jewelryCircle"
      >
        <div>
          <div
            class="top-box"
            v-show="showCircleTotal"
          >
            <p class="edit-box">
              <span>你关注了 <span class="red">{{ circleTotal }}</span> 位珠宝圈作者</span>
              <span
                class="edit-btn"
                @click="hideTotal('circle')"
              >
                <van-icon name="cross" /></span>
            </p>
          </div>
          <AppList
            name="jewelryCircleConcernAuthor"
            :query="query"
            :isDisabled="true"
            :getData="
              () =>
                this.$service('jewelryCircleConcernAuthor', {
                  data: this.query
                })
            "
            ref="list"
            @loadData="loadAuthorData"
          >
            <template slot-scope="{ list }">
              <div
                class="list-box"
                ref="listBox"
                id="listBox"
              >
                <div
                  class="collect-block-item vertical"
                  v-for="(goods, i) in list"
                  :key="i"
                >
                  <CircleCard
                    :data="{
                      id: goods.id,
                      imgUrl: goods.userLogo,
                      name: goods.name,
                      fansNum: goods.fansNum,
                      contentNum: goods.contentNum,
                      news: goods.news,
                      authorType:goods.authorType,
                      isOnSale: goods.status === '1' ? true : false
                    }"
                    @collectCircleSuccess="collectCircleSuccess"
                    @click.native="toCircleDetail(goods.id, goods.status, goods.authorType)"
                  />
                </div>
              </div>
            </template>
          </AppList>
        </div>

        <!-- <div
          class="no-content"
          v-if="hasLoad && !circleGoodsList.length"
        >
          <img
            src="../../../assets/images/no-content.png"
            alt=""
          />
          <p>您还没有关注的珠宝圈作者</p>
          <p>快去<span class="red">珠宝圈</span>逛逛吧</p>
          <van-button
            type="danger"
            class="link-jewelry-circle"
            @click.native="linkJewelryCircle"
          >去逛逛吧</van-button>
        </div> -->
      </van-tab>
      <!-- 为了520暂时屏蔽，直接去掉v-if="false"即可 -->
      <van-tab
        title="话题"
        name="topic"
        v-if="false"
      >
        <div>
          <div
            class="top-box"
            v-show="showTopicTotal"
          >
            <p class="edit-box">
              <span>你关注了 <span class="red">{{ topicTotal }}</span> 个珠宝圈话题</span>
              <span
                class="edit-btn"
                @click="hideTotal('topic')"
              >
                <van-icon name="cross" /></span>
            </p>
          </div>
          <AppList
            name="jewelryTopicList"
            :query="query"
            :isDisabled="true"
            :getData="
              () =>
                this.$service('jewelryTopicList', {
                  data: this.query
                })
            "
            ref="list"
            @loadData="loadTopicData"
          >
            <template slot-scope="{ list }">
              <div
                class="list-box"
                ref="listBox"
                id="listBox"
              >
                <div
                  class="collect-block-item vertical"
                  v-for="(topic, i) in list"
                  :key="i"
                >
                  <TopicCard
                    :data="{
                      topicId: topic.topicId,
                      topicName: topic.topicName,
                      joinNum: topic.joinNum
                    }"
                    @collectTopicSuccess="collectTopicSuccess"
                    @click.native="toTopicDetail(topic.topicId)"
                  />
                </div>
              </div>
            </template>
          </AppList>
          <!-- <div
            class="list-box"
            ref="listBox"
            id="listBox"
          >
            <div
              class="collect-block-item vertical"
              v-for="(topic, i) in topicList"
              :key="i"
            >
              <TopicCard
                :data="{
                  topicId: topic.topicId,
                  topicName: topic.topicName,
                  joinNum: topic.joinNum
                }"
                @collectTopicSuccess="collectTopicSuccess"
                @click.native="toCircleDetail(topic.topicId)"
              />
            </div>
          </div> -->
        </div>

        <!-- <div
          class="no-content"
          v-if="hasLoad && !topicList.length"
        >
          <img
            src="../../../assets/images/no-content.png"
            alt=""
          />
          <p>您还没有关注的珠宝圈话题</p>
          <p>快去<span class="red">珠宝圈首页</span>逛逛吧</p>
          <van-button
            type="danger"
            class="link-jewelry-circle"
            @click.native="linkJewelryCircle"
          >去逛逛吧</van-button>
        </div> -->
      </van-tab>
    </van-tabs>

  </AppView>
</template>

<script>
import { tabsList } from '~/utils/mixins'
import AppCard from './item'
import CircleCard from './item/circle'
import TopicCard from './item/topic'
import AppList from "~/components/common/list";

export default {
  data() {
    return {
      dataLoading: true,
      activeName: '',
      active: false,
      query: {
        offset: 1,
        limit: 10,
        authorId: undefined
      },
      title: '',
      // type: '',
      goodsList: [],
      circleGoodsList: [],
      topicList: [],
      total: 0,
      circleTotal: 0,
      topicTotal: 0,
      hasLoad: false,
      showTotal: true,
      showCircleTotal: true,
      showTopicTotal: true,
      inH5: true
    }
  },
  components: {
    AppList,
    AppCard,
    CircleCard,
    TopicCard
  },
  mixins: [tabsList],
  activated() {
    this.activeName = this.$route.query.type || 'goods'
    // this.type = this.$route.query.authorType
    this.query.authorId = this.$route.query.id
    this.title = this.query.authorId ? 'Ta的关注' : '我的关注'
    // this.getList()
    // this.getCircleList()
    // this.getTopicList()
    if (this.$native.isApp() || window.navigator.userAgent.includes('MicroMessenger')) {
      this.inH5 = false
    }
    // if (this.$native.isApp()) {
    //   this.$native.getTitle("关注")
    // }
  },
  deactivated() {
    this.$destroy()
  },
  head() {
    return {
      title: this.title
    }
  },
  methods: {
    loadShopData(data) {
      this.total = data.total
    },
    loadAuthorData(data) {
      this.circleTotal = data.total
    },
    loadTopicData(data) {
      this.topicTotal = data.total
    },
    clickLeft() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    },
    // 目前只有珠宝店商家有关注功能，但是目前看到关注列表有设计师的数据，暂时加上merchantType
    toDetail(merchantId, merchantType) {
      if (this.$native.isApp()) {
        this.$native.goToMerchant(merchantId);
      } else {
        let name = ''
        switch (merchantType) {
          case 1:
            name = 'jewelry-detail'
            break;
          case 2:
            name = 'design-detail'
            break;
          default:
            name = 'maker-detail'
            break;
        }
        this.$router.push({ name: name, query: { id: merchantId } })
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
    collectTopicSuccess(type) {
      if (type) {
        this.topicTotal++
      } else {
        this.topicTotal--
      }
    },
    hideTotal(type) {
      if (type === 'goods') {
        this.showTotal = false
        document.querySelector('.van-tabs__content .van-tab__pane:nth-child(1) #listBox').style.paddingTop = 0
      } else if (type === 'circle') {
        this.showCircleTotal = false
        document.querySelector('.van-tabs__content .van-tab__pane:nth-child(2) #listBox').style.paddingTop = 0
      } else {
        this.showTopicTotal = false
        document.querySelector('.van-tabs__content .van-tab__pane:nth-child(3) #listBox').style.paddingTop = 0
      }
    },
    linkJewelryCircle() {
      if (this.$native.isApp()) {
        this.$native.goToJewelryCircle();
      } else {
        this.$router.push({ name: "jewelryCircle" });
      }
    },
    toCircleDetail(id, status, authorType) {
      if (status !== '1') {
        this.$toast({
          message: '该账号已被冻结'
        })
        return
      }
      this.$router.push({
        name: "jewelryCircle-weMidea",
        query: {
          id: id,
          authorType: authorType
        }
      })
    },
    toTopicDetail(id) {
      this.$router.push({
        name: "jewelryCircle-topic",
        query: {
          id: id
        }
      })
    }
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
  padding: 0 10px;
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
