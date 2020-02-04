<template>
  <AppView class="jewelry-circle">
    <sticky class="sticky">
      <HeaderModule
        title="珠宝圈"
        :info="info"
        :showSearch="true"
      />
    </sticky>
    <div
      class="tabs"
      v-if="tabs.length"
    >
      <!-- <div class="tab-left">
        <div class="app-search vertical">
          <div
            class="input-box"
            @click="$router.push({name: 'jewelrySearch-wordSearch',query: {type: 'jewelryCircle'}})"
          >
            <van-icon
              class="item-center"
              name="search"
              color="#999"
            />
            <span style="margin-left:26px;">搜索</span>
          </div>
        </div>
      </div> -->
      <van-tabs v-model="active">
        <van-tab
          v-for="(tab, index) in tabs"
          :title="tab.columnName"
          :key="index"
        >
          <div
            class="tab-title"
            slot="title"
            @click="tabClick(tab,index)"
          >
            {{ tab.columnName }}
          </div>
          <div v-if="tab.id == '1000'">
            <div v-if="hasLogin">
              <div
                class="conceren"
                v-show="authorList && authorList.length"
              >
                <div class="concern-box">
                  <div
                    v-for="(item,i) in authorList"
                    :key="i"
                    class="concern-item"
                    @click="
                  $router.push({
                    name: 'news-jewelryCircle-weMidea',
                    query: { id: item.id }
                  })
                "
                  >
                    <i
                      class="no-read"
                      v-if="item.news"
                    ></i>
                    <img
                      class="concern-logo"
                      :src="item.userLogo"
                    >
                    <p class="concern-name text-hidden">{{item.name}}</p>
                  </div>
                  <div
                    class="more"
                    @click="$router.push({
                    name: 'user-concern',
                    query: { type: 'jewelryCircle' }
                  })"
                  >
                    <van-icon name="arrow" />
                  </div>
                </div>
              </div>
              <div
                class="goods-list"
                v-if="showList"
              >
                <AppList
                  name="jewelryCircle"
                  :query="concernQuery"
                  :isDisabled="true"
                  :getData="
                  () =>
                    this.$service('jewelryCircle', {
                      data: this.concernQuery
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
                        class="list-item"
                        v-for="(item, i) in list"
                        :key="i"
                      >
                        <card
                          :type="item.type"
                          :id="item.id"
                          :imgUrl="item.thumbnail"
                          :title="item.title"
                          :commentNumber="item.commentNumber"
                          :likeNumber="item.likeNumber"
                          :viewNumber="item.viewNumber"
                          :labelName="item.labelName"
                          :labelImg="item.labelImg"
                          :isLike="item.isLike"
                          :authorName="item.authorName"
                          :authorLogo="item.authorLogo"
                        />
                      </div>
                    </div>
                  </template>
                </AppList>
              </div>
            </div>
            <div v-if="!hasLogin">
              <div class="status status-no">
                <img src="../../../assets/images/emptylist.png" />
                <p>你关注的作者不见了，登录后看看吧~</p>
                <van-button
                  class="login-btn"
                  color="#DF7359"
                  @click.native="goLogin"
                >登录</van-button>
              </div>
            </div>

          </div>
          <div v-else>
            <div class="app-search vertical">
              <div
                class="input-box"
                v-if="isWechat"
                @click="
                  $router.push({
                    name: 'jewelrySearch-wordSearch',
                    query: { type: 'jewelryCircle' }
                  })
                "
              >
                <van-icon
                  class="item-center"
                  name="search"
                  color="#999"
                />
                <span style="margin-left: 30px;color:#AAAAAB;">输入关键字搜索</span>
              </div>
            </div>

            <Banner
              v-if="bannerList[index].length"
              :imgs="bannerList[index]"
            ></Banner>

            <div
              class="goods-list"
              v-if="showList"
            >
              <AppList
                name="jewelryCircle"
                :query="query"
                :isDisabled="true"
                :getData="
                  () =>
                    this.$service('jewelryCircle', {
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
                      class="list-item"
                      v-for="(item, i) in list"
                      :key="i"
                    >
                      <card
                        :type="item.type"
                        :id="item.id"
                        :imgUrl="item.thumbnail"
                        :title="item.title"
                        :commentNumber="item.commentNumber"
                        :likeNumber="item.likeNumber"
                        :viewNumber="item.viewNumber"
                        :labelName="item.labelName"
                        :labelImg="item.labelImg"
                        :isLike="item.isLike"
                        :authorName="item.authorName"
                        :authorLogo="item.authorLogo"
                      />
                    </div>
                  </div>
                </template>
              </AppList>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </AppView>
</template>

<script>
import HeaderModule from "./modules/header";
import TabsModule from "./modules/tabs";
import Banner from "./modules/banner";
import News from "../index";
import Card from "./modules/cardItem";
import { setImg } from "~/utils/qiniu";
import AppList from "~/components/common/list";
import sticky from "~/components/common/sticky";
import { getToken } from "~/utils/auth";

export default {
  data() {
    return {
      id: "",
      data: {},
      active: 1,
      index: 1,
      // tabs: [
      //   {
      //     id: '1000',
      //     columnName: '关注',
      //     banners: []
      //   }
      // ],
      tabs: [],
      bannerList: [],
      showList: false,
      concernQuery: {
        offset: 1,
        limit: 20,
        isConcern: 1
      },
      query: {
        offset: 1,
        limit: 20,
        columnId: "",
        keyword: ""
      },
      categoryId: "",
      titleShow: false,
      info: {},
      isWechat: false,
      showDetail: false,
      authorList: [],
      hasLogin: false
    };
  },
  beforeMount() {
    this.active = this.$route.query.type ? +this.$route.query.type : 1
    this.index = this.active
    this.getColumns()
  },
  mounted() {
    // if (window.navigator.userAgent.includes("MicroMessenger")) {
    //   this.isWechat = true
    //   document.getElementsByClassName('concern-box').style.top = 46 + 'px'
    // }
    if (getToken()) {
      this.hasLogin = true
      this.getAuthors()
    }
    if (window.navigator.userAgent.includes("MicroMessenger")) {
      this.isWechat = true
    }
  },
  deactivated() {
    this.$destroy();
  },
  methods: {
    setImg,
    getColumns() {
      this.$service("jewelryCircleColumns").then(data => {
        // this.tabs.push(...data.data.jewelryColumnVOS)
        this.tabs = data.data.jewelryColumnVOS
        this.query.columnId = this.tabs[this.active].id
        this.showList = true
        this.info.title = data.data.jewelryShare.title
        this.info.link = location.href
        this.info.imgUrl = data.data.jewelryShare.img
        this.info.desc = data.data.jewelryShare.text
        this.tabs.map((item, i) => {
          this.bannerList[i] = item.banners
        })
        if (window.navigator.userAgent.includes("MicroMessenger")) {
          setTimeout(() => {
            document.getElementsByClassName('van-tabs__wrap')[0].style.top = 0
          }, 200);
        }
      })
    },
    getAuthors() {
      this.$service("jewelryCircleConcernAuthor", { data: { limit: 5 } }).then(result => {
        this.authorList = result.data.records
        setTimeout(() => {
          if (this.authorList.length && window.navigator.userAgent.includes("MicroMessenger")) {
            document.getElementsByClassName('concern-box')[0].style.top = 44 + 'px'
          }
        }, 200);
      })
    },
    tabClick(item, index) {
      this.$router.replace({ name: 'news-jewelryCircle', query: { type: index } })
      this.index = index
      this.query.columnId = item.id
      this.showList = false
      this.$nextTick(() => {
        this.showList = true
      })
      setTimeout(() => {
        if (item.id === '1000' && this.authorList.length && window.navigator.userAgent.includes("MicroMessenger")) {
          document.getElementsByClassName('concern-box')[0].style.top = 44 + 'px'
        }
      }, 200);
    },
    like(likeContentId, likeType, clickType, index) {
      this.$service("jewelryCircleLike", {
        data: {
          likeContentId,
          likeType,
          clickType
        }
      }).then(result => { })
    },
    goLogin() {
      if (this.$native.isApp()) {
        this.$native.goToLogin();
      } else {
        this.$router.push({
          name: "user-login"
        });
        localStorage.setItem(
          "fromUrl",
          location.origin + this.$route.fullPath
        );
      }
    },
    loadData(data) {
      setTimeout(() => {
        this.waterfall('.van-tabs__content .van-tab__pane:nth-child(' + (this.index + 1) + ') #listBox', 'list-item')
      }, 500);
    },
    waterfall(parent, pin) {
      var oParent = document.querySelector(parent)
      if (!oParent) return
      var aPin = this.getClassObj(oParent, pin);// 获取存储块框pin的数组aPin
      if (!aPin.length) {
        oParent.style.height = "0"
        return
      }
      var iPinW = aPin[0].offsetWidth;// 一个块框pin的宽
      var num = Math.floor(document.documentElement.clientWidth / iPinW);//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
      // oParent.style.cssText = 'width:' + iPinW * num + 'px;margin:0 auto;';//设置父级居中样式：定宽+自动水平外边距

      var pinHArr = [];//用于存储 每列中的所有块框相加的高度。a
      for (var i = 0; i < aPin.length; i++) {//遍历数组aPin的每个块框元素
        var pinH = aPin[i].offsetHeight;
        if (i < num) {
          pinHArr[i] = pinH; //第一行中的num个块框pin 先添加进数组pinHArr
        } else {
          var minH = Math.min.apply(null, pinHArr);//数组pinHArr中的最小值minH
          var minHIndex = this.getminHIndex(pinHArr, minH);
          aPin[i].style.position = 'absolute';//设置绝对位移
          aPin[i].style.top = minH + 'px';
          aPin[i].style.left = aPin[minHIndex].offsetLeft + 'px';
          //数组 最小高元素的高 + 添加上的aPin[i]块框高
          pinHArr[minHIndex] += aPin[i].offsetHeight;//更新添加了块框后的列高
        }
      }
      oParent.style.height = Math.max.apply(null, pinHArr) + "px"
    },

    /*
     *通过父级和子元素的class类 获取该同类子元素的数组
     */
    getClassObj(parent, className) {
      var obj = parent.getElementsByTagName('*');//获取 父级的所有子集
      var pinS = [];//创建一个数组 用于收集子元素
      for (var i = 0; i < obj.length; i++) {//遍历子元素、判断类别、压入数组
        if (obj[i].className == className) {
          pinS.push(obj[i]);
        }
      };
      return pinS;
    },
    /****
        *获取 pin高度 最小值的索引index
        */
    getminHIndex(arr, minH) {
      for (var i in arr) {
        if (arr[i] == minH) {
          return i;
        }
      }
    }
  },
  components: {
    HeaderModule,
    TabsModule,
    Banner,
    News,
    AppList,
    Card,
    sticky
  }
};
</script>

<style lang="postcss" scoped>
.jewelry-circle {
  background-color: var(--light-gray);
}
.news {
  padding-top: 10px;
}

.jewelry-circle {
  & .goods-list {
    padding: 10px;
    & .list-box {
      /* column-count: 2;
      column-gap: 10px; */
      margin-left: -5px;
      margin-right: -5px;
      /* height: 346px; */
      height: 265px;
      /* display: flex;
      flex-flow: column;
      flex-wrap: wrap; */
      position: relative;
      & .list-item {
        /* break-inside: avoid; */
        padding-left: 5px;
        padding-right: 5px;
        width: 50%;
        float: left;
        box-sizing: border-box;
        /* flex: 1; */
        /* object-fit: none; */
      }
    }
    & .head-title {
      padding: 0 20px;
      & h3 {
        color: #333333;
      }
      & .more {
        color: #999999;
        font-size: 12px;
      }
    }
  }
  & .margin {
    margin-bottom: 10px;
  }
  & .banner {
    position: relative;
    height: 175px;
    /*margin-top: 45px;*/
    & .background {
      height: 100%;
      width: 100%;
    }
  }
  & .promotion {
    & > div {
      padding: 0 10px;
    }
  }
  & >>> .status {
    z-index: 0;
    clear: both;
  }
}
h2.subtitle {
  line-height: 40px;
  padding: 10px 10px 0;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  font-weight: 600;
  & span:first-child {
    font-weight: bold;
  }
  & span:last-child {
    color: #999;
    font-size: 14px;
    font-weight: 400;
  }
  & i:before {
    font-size: 10px;
  }
}
>>> .tab-title {
  overflow: hidden;
  text-overflow: ellipsis;
}
>>> .van-tabs__wrap {
  z-index: 9;
  position: fixed;
  width: 100%;
  top: 46px;
  /* height: 56px; */
}
>>> .van-tabs__nav {
  /* width: 275px; */
  /* margin-left: 114px; */
  /* background: var(--light-gray); */
  /* padding-top: 6px; */
}
>>> .van-tabs__nav--line {
  /* height: 38px; */
}
/* .tab-left {
  position: fixed;
  z-index: 10;
  top: 46px;
  left: 0;
  width: 114px;
  background: var(--light-gray);
} */
>>> .van-tabs__content {
  padding-top: 46px;
}
.banner {
  /* padding-top: 10px; */
}
.app-search {
  position: relative;
  padding: 0 15px;
  width: 100%;
  /* background: white; */
  box-sizing: border-box;

  & .input-box {
    position: relative;
    display: block;
    width: 100%;
    margin: 5px 0;
    /* line-height: normal; */
    height: 36px;
    line-height: 24px;
    /* margin: 0; */
    padding: 6px;
    /* font-size: 12px; */
    border-radius: 15px;
    /* color: var(--black); */
    background: #fff;
    box-sizing: border-box;
    border: none;
    color: #aaaaab;
    font-size: 14px;
  }
  & input {
    display: block;
    width: 100%;
    line-height: normal;
    margin: 0;
    padding: 6px 10px 6px 30px;
    font-size: 12px;
    border-radius: 15px;
    color: var(--black);
    background: #f0f0f0;
    box-sizing: border-box;
    border: none;
  }
  & .van-icon {
    position: absolute;
    width: 30px;
    height: 100%;
    font-size: 14px;
    left: 0;
    top: 0;
    display: flex;
  }
  & .search-type {
    position: absolute;
    left: 0;
    height: 100%;
    & p {
      padding-left: 15px;
      font-size: 12px;
      height: 100%;
    }
    & .ico-down {
      transition: 0.3s transform;
      transform-origin: 50% 45%;
      margin-top: 1px;
      &.active {
        transform: rotate(180deg);
      }
    }
  }
}
.conceren {
  height: 100px;
}
.concern-box {
  position: fixed;
  padding: 15px 10px 5px;
  width: 100%;
  top: 90px;
  z-index: 1;
  background: #f2f2f2;
  box-sizing: border-box;
  & .concern-item {
    position: relative;
    display: inline-block;
    margin-right: 5px;
    width: 60px;
    text-align: center;
    & .no-read {
      position: absolute;
      top: 0;
      right: 4px;
      display: inline-block;
      width: 8px;
      height: 8px;
      background: #ff0300;
      border-radius: 50%;
    }
    & .concern-logo {
      margin-bottom: 10px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    & .concern-name {
      font-size: 12px;
      line-height: 16px;
    }
  }
  & .more {
    position: absolute;
    right: 0;
    display: inline-block;
    font-size: 20px;
    color: #333;
    line-height: 50px;
    width: 40px;
    text-align: center;
  }
}
.status {
  position: relative;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 12px;
  color: var(--dark-gray);
}
.status-no {
  line-height: 1;
  z-index: 0;
  & img {
    width: 331px;
    margin-top: 120px;
  }
  & .login-btn {
    margin-top: 30px;
    width: 180px;
    height: 35px;
    line-height: 35px;
  }
}
</style>
