<template>
  <AppView class="jewelry-circle">
    <sticky class="sticky">
      <HeaderModule
        title="个人主页"
        :info="info"
      />
    </sticky>
    <div class="media-info">
      <div
        class="media-backImg"
        :style="{backgroundImage: 'url(' + (backImg ? backImg : baseImg) + ')'}"
        @click="showCoverPopup"
      ></div>
      <div class="info-body">
        <div class="info-main">
          <img
            class="media-logo"
            :src="authorInfo.userLogo"
          >
          <div class="info-concern">
            <p class="media-name">{{ authorInfo.name }}</p>
            <div
              class="btn-box"
              v-if="!type"
            >
              <van-button
                color="#DF735A"
                v-if="!authorInfo.concern"
                @click.native="concern(1)"
              >+ 关注</van-button>
              <van-button
                color="#AAAAAA"
                v-else
                @click.native="concern(2)"
              >已关注</van-button>
            </div>
          </div>
        </div>
        <div
          class="info-explain"
          v-if="authorInfo.description"
        >
          <p class="explain">{{ authorInfo.description }}</p>
          <!-- <p
            class="explain-2"
            v-show="!showAllExplain"
          >这里是简介，最多展示两行，其余用...代替，同时增加向下展开按钮,这里是简介，最多展示两行，这里是简介，最多展示两行，其余用...代替，同时增加向下展开按钮,这里是简介，最多展示两 </p>
          <p
            class="more"
            v-show="!showAllExplain"
            @click="showAllExplain = true"
          >展开更多
            <van-icon name="arrow-down" />
          </p> -->
        </div>
        <div class="info-number">
          <van-row class="card-number">
            <van-col
              span="8"
              class="tc"
              @click.native="linkConcern"
            >
              <span>关注</span> <span class="number">{{authorInfo.contentNum}}</span>
            </van-col>
            <van-col
              span="8"
              class="tc"
              @click.native="linkFans"
            >
              <span>粉丝</span> <span class="number">{{authorInfo.fansNum}}</span>
            </van-col>
            <van-col
              span="8"
              class="tc"
            >
              <span>获赞与收藏</span> <span class="number">{{authorInfo.collectLikeNum}}</span>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <van-tabs
      class="list-tab mt-1"
      v-model="active"
      @click="tabClick"
    >
      <template v-if="type === 'mine' && userId">
        <van-tab title="我的发布">
          <div class="tab-content">
            <div class="filter-bar">
              <ul>
                <li
                  @click="setContentType(undefined)"
                  :class="listQuery.contentType === undefined ? 'active': ''"
                >全部{{contentCount[active].allCount}}</li>
                <li
                  @click="setContentType(2)"
                  :class="listQuery.contentType === 2 ? 'active': ''"
                >视频{{contentCount[active].videoCount}}</li>
                <li
                  @click="setContentType(1)"
                  :class="listQuery.contentType === 1 ? 'active': ''"
                >文章{{contentCount[active].picWordCount}}</li>
              </ul>
            </div>
            <div class="goods-list">
              <AppList
                name="jewelryCirclePublishList"
                :query="listQuery"
                :resources="[userId,1]"
                :isDisabled="true"
                :getData="() => this.$service('jewelryCirclePublishList', { data: this.listQuery,resources:[userId,1] })"
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
                      <!-- :type="item.type" -->
                      <card
                        :id="item.id"
                        :imgUrl="item.thumbnail"
                        :title="item.title"
                        :commentNumber="item.commentNumber"
                        :likeNumber="item.likeNumber"
                        :collectNumber="item.collectNum"
                        :viewNumber="item.viewNumber"
                        :labelName="item.labelName"
                        :labelImg="item.labelImg"
                        :isLike="item.isLike"
                      />
                    </div>
                  </div>
                </template>
              </AppList>
            </div>
          </div>
        </van-tab>
        <van-tab title="我的草稿箱">
          <div class="tab-content">
            <div class="filter-bar">
              <ul>
                <li
                  @click="setContentType(undefined)"
                  :class="listQuery.contentType === undefined ? 'active': ''"
                >全部{{contentCount[active].allCount}}</li>
                <li
                  @click="setContentType(2)"
                  :class="listQuery.contentType === 2 ? 'active': ''"
                >视频{{contentCount[active].videoCount}}</li>
                <li
                  @click="setContentType(1)"
                  :class="listQuery.contentType === 1 ? 'active': ''"
                >文章{{contentCount[active].picWordCount}}</li>
              </ul>
            </div>
            <div class="goods-list">
              <AppList
                name="jewelryCirclePublishList"
                :query="listQuery"
                :resources="[userId,3]"
                :isDisabled="true"
                :getData="() => this.$service('jewelryCirclePublishList', { data: this.listQuery,resources:[userId,3] })"
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
                      <!-- :type="item.type" -->
                      <drafts-card
                        :id="item.id"
                        :imgUrl="item.thumbnail"
                        :title="item.title"
                        :isLike="item.isLike"
                        :time="item.createTime"
                        @deleteSucess="deleteSucess"
                      />
                    </div>
                  </div>
                </template>
              </AppList>
            </div>
          </div>
        </van-tab>
      </template>
      <template v-if="!type && authorId">
        <van-tab title="Ta发布的">
          <div class="tab-content">
            <div class="filter-bar">
              <ul>
                <li
                  @click="setContentType(undefined)"
                  :class="listQuery.contentType === undefined ? 'active': ''"
                >全部{{contentCount[active].allCount}}</li>
                <li
                  @click="setContentType(2)"
                  :class="listQuery.contentType === 2 ? 'active': ''"
                >视频{{contentCount[active].videoCount}}</li>
                <li
                  @click="setContentType(1)"
                  :class="listQuery.contentType === 1 ? 'active': ''"
                >文章{{contentCount[active].picWordCount}}</li>
              </ul>
            </div>
            <div class="goods-list">
              <AppList
                name="jewelryCirclePublishList"
                :query="listQuery"
                :resources="[$route.query.id,1]"
                :isDisabled="true"
                :getData="() => this.$service('jewelryCirclePublishList', { data: this.listQuery,resources:[$route.query.id,1] })"
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
                      <!-- :type="item.type" -->
                      <card
                        :id="item.id"
                        :imgUrl="item.thumbnail"
                        :title="item.title"
                        :commentNumber="item.commentNumber"
                        :likeNumber="item.likeNumber"
                        :collectNumber="item.collectNum"
                        :viewNumber="item.viewNumber"
                        :labelName="item.labelName"
                        :labelImg="item.labelImg"
                        :isLike="item.isLike"
                      />
                    </div>
                  </div>
                </template>
              </AppList>
            </div>
          </div>
        </van-tab>
        <van-tab title="Ta点赞的">
          <div class="tab-content">
            <div class="filter-bar">
              <ul>
                <li
                  @click="setContentType(undefined)"
                  :class="listQuery.contentType === undefined ? 'active': ''"
                >全部{{contentCount[active].allCount}}</li>
                <li
                  @click="setContentType(2)"
                  :class="listQuery.contentType === 2 ? 'active': ''"
                >视频{{contentCount[active].videoCount}}</li>
                <li
                  @click="setContentType(1)"
                  :class="listQuery.contentType === 1 ? 'active': ''"
                >文章{{contentCount[active].picWordCount}}</li>
              </ul>
            </div>
            <div class="goods-list">
              <AppList
                name="jewelryCirclePublishList"
                :query="listQuery"
                :resources="[$route.query.id,2]"
                :isDisabled="true"
                :getData="() => this.$service('jewelryCircle', { data: this.listQuery,resources:[$route.query.id,2]  })"
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
                      <!-- :type="item.type" -->
                      <card
                        :id="item.id"
                        :imgUrl="item.thumbnail"
                        :title="item.title"
                        :commentNumber="item.commentNumber"
                        :likeNumber="item.likeNumber"
                        :collectNumber="item.collectNum"
                        :viewNumber="item.viewNumber"
                        :labelName="item.labelName"
                        :labelImg="item.labelImg"
                        :isLike="item.isLike"
                      />
                    </div>
                  </div>
                </template>
              </AppList>
            </div>
          </div>
        </van-tab>
      </template>
    </van-tabs>

    <van-popup
      v-model="showPopup"
      position="bottom"
      class="back-popup"
    >
      <van-button type="default">更换主页封面</van-button>
      <van-button
        type="default"
        class="cancel-btn text-theme bg-white"
        @click.native="showPopup = false"
      >取消</van-button>
      <VUpload
        :width="375"
        :height="125"
        @success="uploadSuccess"
      />
    </van-popup>

    <div
      v-if="type"
      class="publish fixed-icon"
      @click="toPublish"
    ><img src="../../assets/images/icon/edit.png"></div>
  </AppView>
</template>
<script>
import HeaderModule from '~/components/jewelryCircle/header'
import Card from '~/components/jewelryCircle/cardItem-media'
import DraftsCard from '~/components/jewelryCircle/cardItem-drafts'
import { setImg } from '~/utils/qiniu'
import AppList from '~/components/common/list'
import sticky from '~/components/common/sticky'
import { getToken } from '~/utils/auth'
import { waterfall } from '~/utils/page'
import VUpload from "~/components/common/upload/base";

export default {
  data() {
    return {
      query: {
        offset: 1,
        limit: 10,
        authorId: this.$route.query.id,
        authorType: this.$route.query.authorType,
      },
      listQuery: {
        offset: 1,
        limit: 10,
        contentType: undefined
      },
      contentCount: [
        {
          allCount: 0,
          picWordCount: 0,
          videoCount: 0,
        }, {
          allCount: 0,
          picWordCount: 0,
          videoCount: 0,
        }
      ],
      type: '',
      authorId: '',
      authorType: undefined,
      userId: '',
      backImg: '',
      info: {},
      authorInfo: {},
      showAllExplain: false,
      active: 0,
      showPopup: false,
      baseImg: require('../../assets/images/media_bg.png')
    }
  },
  async activated() {
    this.active = +this.$route.query.active || 0
    this.type = this.$route.query.type
    if (this.type) {
      const userInfo = await this.$store.dispatch("user/getUserInfo");
      this.userId = userInfo.id;
    } else {
      this.authorId = this.$route.query.id
      this.authorType = this.$route.query.authorType
    }
    this.getAuthorInfo()
  },
  // deactivated() {
  //   this.$destroy()
  // },
  methods: {
    setImg,
    getAuthorInfo() {
      this.$service("jewelryCircleAuthor", {
        data: {
          authorId: this.authorId,
          authorType: this.authorType,
        }
      }).then(result => {
        this.authorInfo = result.data
        this.backImg = result.data.homeCover
        this.info.title = this.authorInfo.name + '个人主页'
        this.info.link = location.href
        this.info.imgUrl = this.authorInfo.userLogo
        this.info.desc = this.authorInfo.description
      })
    },
    concern(concernType) {
      if (getToken()) {
        this.$service('jewelryCircleConcern', {
          data: {
            authorId: this.authorId,
            concernType
          }
        }).then(result => {
          this.authorInfo.concern = !this.authorInfo.concern
          if (concernType === 1) {
            this.authorInfo.fansNum++
          } else {
            this.authorInfo.fansNum--
          }
        })
      } else {
        if (this.$native.isApp()) {
          this.$native.goToLogin()
        } else {
          this.$router.push({
            name: 'user-login'
          })
          localStorage.setItem('fromUrl', location.origin + this.$route.fullPath)
        }
      }
    },
    setContentType(contentType) {
      this.listQuery.contentType = contentType
      this.listQuery.offset = 1
      this.$refs.list && this.$refs.list.onRefresh()
    },
    deleteSucess() {
      this.$refs.list && this.$refs.list.onRefresh()
    },
    showCoverPopup() {
      if (this.type) {
        this.showPopup = true
      }
    },
    toPublish() {
      this.$router.push({ name: 'jewelryCircle-publish' })
    },
    linkConcern() {
      this.$router.push({
        name: 'user-concern',
        query: {
          // authorType: this.type,
          id: this.$route.query.id,
        }
      })
    },
    linkFans() {
      this.$router.push({
        name: 'user-fans',
        query: {
          authorType: this.$route.query.authorType,
          id: this.$route.query.id,
        }
      })
    },
    back() {
      this.$router.push({
        name: 'jewelryCircle',
      })
    },
    tabClick(index) {
      this.active = index
      this.listQuery.contentType = undefined
      // this.listQuery.offset = 1
      this.$router.replace({
        name: 'jewelryCircle-weMidea',
        query: {
          type: this.type,
          id: this.$route.query.id,
          authorType: this.$route.query.authorType,
          active: index
        }
      })
    },
    uploadSuccess(key) {
      this.$service("jewelryCircleUploadCover", {
        data: {
          homeCover: key
        }
      }).then(result => {
        this.backImg = key
        this.showPopup = false
        this.$toast('更新成功')
      })
    },
    loadData(data) {
      this.$set(this.contentCount[this.active], 'allCount', data.allCount)
      this.$set(this.contentCount[this.active], 'picWordCount', data.picWordCount)
      this.$set(this.contentCount[this.active], 'videoCount', data.videoCount)
      setTimeout(() => {
        waterfall(
          ".van-tabs__content .van-tab__pane:nth-child(" +
          (this.active + 1) +
          ") #listBox",
          "list-item"
        )
      }, 500)
    }
  },
  components: {
    HeaderModule,
    AppList,
    Card,
    DraftsCard,
    sticky,
    VUpload
  }
}
</script>

<style lang="postcss" scoped>
.jewelry-circle {
  & .media-info {
    & .media-backImg {
      width: 100%;
      height: 125px;
      /* background: url('../../assets/images/media_bg.png'); */
      background-size: cover;
    }
    & .info-body {
      padding: 0 15px;
      background: #fff;
      & .media-logo {
        margin-top: -13px;
        width: 80px;
        height: 80px;
        border: 5px solid #fff;
        border-radius: 50%;
      }
      & .info-main {
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e5e5;
      }
      & .info-concern {
        display: inline-block;
        margin-left: 10px;
        vertical-align: top;
        & .media-name {
          margin: 15px 0 10px;
          font-size: 18px;
          font-weight: bold;
          color: #333;
        }
        & button {
          margin-right: 10px;
          width: 80px;
          height: 30px;
          line-height: 30px;
          border-radius: 5px;
        }
      }
      & .info-explain {
        padding: 15px 0;
        line-height: 18px;
        color: #666;
        font-size: 14px;
        border-bottom: 1px solid #e5e5e5;
        & .explain-2 {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        & .more {
          margin-top: 16px;
          text-align: center;
          color: #2d68c2;
          font-size: 14px;
          line-height: 14px;
          & i {
            vertical-align: middle;
          }
        }
      }
      & .info-number {
        line-height: 54px;
        color: #666;
        font-size: 13px;
        & span {
          vertical-align: middle;
        }
        & .number {
          margin-left: 4px;
          color: #333;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
  & .filter-bar ul {
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
      &.active {
        color: #df735a;
        border-color: #df735a;
      }
    }
  }
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
.back-popup {
  padding-bottom: 13px;
  background: transparent;
  text-align: center;
  & button {
    margin-bottom: 8px;
    width: 355px;
    height: 58px;
    line-height: 58px;
    font-size: 16px;
    background: #f7f7f7;
    color: #666666;
    border-radius: 8px;
    border: 0;
  }
  & .cancel-btn {
    position: relative;
    z-index: 6;
  }
}
/deep/ .status-no img {
  margin-top: 0px !important;
}
</style>
