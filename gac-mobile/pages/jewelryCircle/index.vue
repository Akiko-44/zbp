<template>
  <AppView
    class="jewelry-circle"
    id="jewelryCircle"
  >
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
      <van-tabs v-model="active">
        <van-tab
          v-for="(tab, index) in tabs"
          :title="tab.columnName"
          :key="index"
        >
          <div
            class="tab-title"
            slot="title"
            @click="tabClick(tab, index)"
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
                    v-for="(item, i) in authorList"
                    :key="i"
                    class="concern-item"
                    @click="toWeMidea(item.id, item.status, item.authorType)"
                  >
                    <i
                      class="no-read"
                      v-if="item.news"
                    ></i>
                    <div
                      class="img-box"
                      :class="item.status !== '1' ? 'no-sale-img' : ''"
                    >
                      <img
                        class="card-image concern-logo"
                        :src="item.userLogo"
                      />
                      <div
                        class="no-sale-text"
                        v-if="item.status !== '1'"
                      >
                        <p>已冻结</p>
                      </div>
                    </div>
                    <p class="concern-name text-hidden">{{ item.name }}</p>
                  </div>
                  <div
                    class="more"
                    @click="
                      $router.push({
                        name: 'user-concern',
                        query: { type: 'jewelryCircle' }
                      })
                    "
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
                <img src="../../assets/images/emptylist.png" />
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
                <img
                  src="../../assets/images/icon/search.png"
                  height="16"
                  style="vertical-align: middle;"
                />
                <span style="margin-left: 8px;color:#AAAAAB;">输入关键字搜索</span>
              </div>
            </div>

            <Banner
              v-if="bannerList[index].length"
              :imgs="bannerList[index]"
            ></Banner>

            <!-- 为了520暂时屏蔽 -->
            <!-- <div
              class="topic-bar"
              v-if="topicList && topicList.length"
            >
              <ul>
                <li
                  v-for="(topicItem,topicIndex) in topicList"
                  :key="topicIndex"
                  @click="$router.push({name:'jewelryCircle-topic',query:{id:topicItem.id}})"
                >#{{topicItem.topicName}}#</li>
              </ul>
            </div> -->

            <div
              class="goods-list"
              v-if="showList"
            >
              <AppList
                name="jewelryCircleNew"
                :query="query"
                :isDisabled="true"
                :getData="
                  () =>
                    this.$service('jewelryCircleNew', {
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
                        v-if="item.showType === 1"
                        :type="item.contentVO.type"
                        :id="item.contentVO.id"
                        :imgUrl="item.contentVO.thumbnail"
                        :title="item.contentVO.title"
                        :commentNumber="item.contentVO.commentNumber"
                        :likeNumber="item.contentVO.likeNumber"
                        :viewNumber="item.contentVO.viewNumber"
                        :labelName="item.contentVO.labelName"
                        :labelImg="item.contentVO.labelImg"
                        :isLike="item.contentVO.isLike"
                        :authorName="item.contentVO.authorName"
                        :authorLogo="item.contentVO.authorLogo"
                      />
                      <card
                        v-else
                        :advert="true"
                        :id="item.advert.id"
                        :imgUrl="item.advert.picture"
                        :linkType="item.advert.linkType"
                        :linkTypeId="item.advert.linkTypeId"
                        :mobelUrl="item.advert.mobelUrl"
                        :contentType="item.advert.contentType"
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
    <div
      class="top fixed-icon"
      v-show="showTop"
      @click="toTop"
    ><img src="../../assets/images/icon/top.png"></div>
    <!-- 为了520暂时屏蔽 -->
    <!-- <div
      v-show="(hasLogin && active === 0) || (active !== 0)"
      class="publish fixed-icon"
      @click="toPublish"
    ><img src="../../assets/images/icon/edit.png"></div> -->
  </AppView>
</template>

<script>
import HeaderModule from "~/components/jewelryCircle/header";
import TabsModule from "~/components/jewelryCircle/tabs";
import Banner from "~/components/jewelryCircle/banner";
import Card from "~/components/jewelryCircle/cardItem";
import { setImg } from "~/utils/qiniu";
import AppList from "~/components/common/list";
import sticky from "~/components/common/sticky";
import { getToken } from "~/utils/auth";
import { waterfall } from '~/utils/page'

export default {
  data() {
    return {
      id: "",
      data: {},
      active: 1,
      index: 1,
      tabs: [],
      bannerList: [],
      topicList: [],
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
      hasLogin: false,
      showTop: false,
    }
  },
  beforeMount() {
    this.active = this.$route.query.type ? +this.$route.query.type : 1;
    this.index = this.active;
    this.getColumns()
  },
  mounted() {
    if (getToken()) {
      this.hasLogin = true;
      this.getAuthors();
    }
    if (window.navigator.userAgent.includes("MicroMessenger")) {
      this.isWechat = true;
    }
  },
  activated() {
    window.addEventListener('scroll', this.handleScroll)
  },
  deactivated() {
    this.$destroy();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    setImg,
    getColumns() {
      this.$service("jewelryCircleColumns").then(data => {
        this.topicList = data.data.topicList
        this.tabs = data.data.jewelryColumnVOS;
        this.query.columnId = this.tabs[this.active].id;
        this.showList = true;
        this.info.title = data.data.jewelryShare.title;
        this.info.link = location.href;
        this.info.imgUrl = data.data.jewelryShare.img;
        this.info.desc = data.data.jewelryShare.text;
        this.tabs.map((item, i) => {
          this.bannerList[i] = item.banners;
        });
        if (window.navigator.userAgent.includes("MicroMessenger")) {
          setTimeout(() => {
            document.getElementsByClassName("van-tabs__wrap")[0].style.top = 0;
          }, 200);
        }
      });
    },
    getAuthors() {
      this.$service("jewelryCircleConcernAuthor", { data: { limit: 5 } }).then(
        result => {
          this.authorList = result.data.records;
          setTimeout(() => {
            if (
              this.authorList.length &&
              window.navigator.userAgent.includes("MicroMessenger")
            ) {
              document.getElementsByClassName("concern-box")[0].style.top =
                44 + "px";
            }
          }, 200);
        }
      );
    },
    tabClick(item, index) {
      this.$router.replace({
        name: "jewelryCircle",
        query: { type: index }
      });
      this.index = index;
      this.query.columnId = item.id;
      this.showList = false;
      this.$nextTick(() => {
        this.showList = true;
      });
      setTimeout(() => {
        if (
          item.id == "1000" &&
          this.authorList.length &&
          window.navigator.userAgent.includes("MicroMessenger")
        ) {
          document.getElementsByClassName("concern-box")[0].style.top =
            44 + "px"
        }
      }, 200);
    },
    handleScroll() {
      let scrollY = document.documentElement.scrollTop
      if (scrollY > 2000) {
        this.showTop = true
      }
      else {
        this.showTop = false
      }
    },
    toTop() {
      document.getElementById('jewelryCircle').scrollIntoView()
    },
    like(likeContentId, likeType, clickType, index) {
      this.$service("jewelryCircleLike", {
        data: {
          likeContentId,
          likeType,
          clickType
        }
      }).then(result => { });
    },
    goLogin() {
      if (this.$native.isApp()) {
        this.$native.goToLogin();
      } else {
        this.$router.push({
          name: "user-login"
        });
        localStorage.setItem("fromUrl", location.origin + this.$route.fullPath);
      }
    },
    toWeMidea(id, status, authorType) {
      if (status !== "1") {
        this.$toast({
          message: "该账号已被冻结"
        });
        return;
      }
      this.$router.push({
        name: "jewelryCircle-weMidea",
        query: {
          id: id,
          authorType: authorType
        }
      });
    },
    toPublish() {
      if (this.hasLogin) {
        this.$router.push({ name: 'jewelryCircle-publish' })
      } else {
        this.goLogin()
      }
    },
    loadData(data) {
      setTimeout(() => {
        waterfall(
          ".van-tabs__content .van-tab__pane:nth-child(" +
          (this.index + 1) +
          ") #listBox",
          "list-item"
        )
      }, 500)
    }
  },
  components: {
    HeaderModule,
    TabsModule,
    Banner,
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
.jewelry-circle {
  & .goods-list {
    padding: 10px;
    & .list-box {
      margin-left: -5px;
      margin-right: -5px;
      height: 265px;
      position: relative;
      & .list-item {
        padding-left: 5px;
        padding-right: 5px;
        width: 50%;
        float: left;
        box-sizing: border-box;
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
  & .fixed-icon {
    position: fixed;
    bottom: 70px;
    right: 20px;
    padding: 9px;
    width: 35px;
    height: 35px;
    text-align: center;
    border-radius: 50%;
    background: #ffffff;
    box-sizing: border-box;
    box-shadow: 1px 0px 6px 0px rgba(216, 216, 216, 0.55);
    & img {
      width: 18px;
    }
    &.top {
      bottom: 120px;
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
}
>>> .van-tabs__content {
  padding-top: 46px;
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
    padding: 6px 10px;
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
.topic-bar ul {
  padding: 10px 10px 0;
  overflow-x: scroll;
  white-space: nowrap;
  & li {
    display: inline-block;
    margin-right: 10px;
    padding: 10px;
    font-size: 14px;
    color: #666666;
    background: #ffffff;
    border: 1px solid #e8e8e8;
    border-radius: 5px;
  }
  & li:last-child {
    margin-right: 0;
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

    & .img-box.no-sale-img {
      width: 50px;
      height: 50px;
      position: relative;
      z-index: 1;
      margin: 0 auto;
      background: #000;
      border-radius: 4px;
      & img {
        opacity: 0.5;
        filter: alpha(opacity=50);
      }
      & .no-sale-text {
        width: 100%;
        position: absolute;
        z-index: 2;
        top: 50%;
        margin-top: -9px;
        text-align: center;
        color: #fff;
        font-size: 12px;
      }
    }
    & .concern-logo {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    & .concern-name {
      margin-top: 10px;
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
