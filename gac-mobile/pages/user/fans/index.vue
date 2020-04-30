<template>
  <AppView
    :title="title"
    class="Info"
    :clickLeft="clickLeft"
  >

    <div>
      <div
        class="top-box"
        v-show="showCircleTotal"
      >
        <p class="edit-box">
          <span>你有<span class="red">{{ circleTotal }}</span>位粉丝</span>
          <span
            class="edit-btn"
            @click="hideTotal('circle')"
          >
            <van-icon name="cross" /></span>
        </p>
      </div>
      <AppList
        name="getfansList"
        :query="query"
        :isDisabled="true"
        :getData="
          () =>
            this.$service('getfansList', {
              data: this.query
            })
        "
        ref="list"
        @loadData="loadData"
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
      <!-- <div
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
              imgUrl: goods.userLogo,
              name: goods.name,
              fansNum: goods.fansNum,
              contentNum: goods.contentNum,
              news: goods.news,
              isOnSale: goods.status === '1' ? true : false
            }"
            @collectCircleSuccess="collectCircleSuccess"
            @click.native="toCircleDetail(goods.id, goods.status)"
          />
        </div>
      </div> -->
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
  </AppView>
</template>

<script>
import CircleCard from './item/circle'
import AppList from "~/components/common/list";

export default {
  data() {
    return {
      dataLoading: true,
      query: {
        offset: 1,
        limit: 10,
        userId: undefined,
        userType: undefined
      },
      title: '',
      // circleGoodsList: [],
      circleTotal: 0,
      hasLoad: false,
      showCircleTotal: true,
      inH5: true
    }
  },
  components: {
    AppList,
    CircleCard
  },
  activated() {
    // this.getCircleList()
    this.query.userId = this.$route.query.id
    this.query.userType = this.$route.query.authorType
    this.title = this.query.authorId ? '我的粉丝' : 'Ta的粉丝'
    if (this.$native.isApp() || window.navigator.userAgent.includes('MicroMessenger')) {
      this.inH5 = false
    }
    if (this.$native.isApp()) {
      this.$native.getTitle(this.title)
    }
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
    // getCircleList() {
    //   this.dataLoading = true
    //   this.$loading(this.$service('jewelryCircleConcernAuthor', {
    //     data: { limit: 50 }
    //   })).then(result => {
    //     this.dataLoading = false
    //     this.hasLoad = true
    //     if (result.data.total) {
    //       this.circleGoodsList = result.data.records
    //       this.circleTotal = result.data.total
    //     }
    //   }).catch(() => {
    //     this.dataLoading = false
    //   })
    // },
    loadData(data) {
      this.circleTotal = data.total
      this.showCircleTotal = !!this.circleTotal
    },
    clickLeft() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
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
      this.showCircleTotal = false
      document.querySelector('#listBox').style.paddingTop = 0
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
