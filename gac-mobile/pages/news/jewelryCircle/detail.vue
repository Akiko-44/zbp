<template>
  <AppView
    class="detail"
    id="detail"
  >
    <sticky class="sticky">
      <HeaderModule
        title="详情"
        :info="info"
      />
    </sticky>
    <div class="detail-main">
      <div class="active-detail">
        <div class="active-header">
          <h3>{{ detail.title }}</h3>
        </div>
        <div class="active-time">{{ detail.createTime }}</div>
        <div class="media-info clearfix">
          <img
            :src="detail.authorLogo"
            class="fl"
            width="35"
            @click="linkWeMedia"
          />
          <div
            class="media-name fl"
            @click="linkWeMedia"
          >{{ detail.authorName }}</div>
          <van-button
            class="fr"
            color="#DF735A"
            plain
            v-if="!detail.concern"
            @click.native="concern(detail.authorId, 1)"
          >+关注</van-button>
          <!-- <van-button
            class="fr"
            color="#AAAAAA"
            v-if="detail.concern"
            @click.native="concern(detail.authorId, 2)"
          >已关注</van-button> -->
        </div>
        <div
          class="active-content"
          v-html="detail.content"
        ></div>
      </div>

      <div
        class="recommend"
        v-if="recommendList && recommendList.length"
      >
        <div class="title">相关推荐</div>
        <van-swipe
          :autoplay="4000"
          indicator-color="#FB746E"
          class="recommend-list"
          :class="detail.recommendType === 3 ? 'link-recommend' : ''"
        >
          <van-swipe-item
            v-for="(item, i) in recommendList"
            :key="i"
          >
            <div class="recommend-item">
              <div
                v-if="detail.recommendType === 1"
                @click="toGoodsDetail(item.id)"
              >
                <img :src="item.imgUrl" />
                <div class="item-info">
                  <div class="goods-name text-hidden">
                    {{ item.goodsName }}
                  </div>
                  <div class="goods-price">
                    ￥{{ item.lowPrice
                    }}<span v-if="item.lowPrice !== item.highPrice">~￥{{ item.highPrice }}</span>
                  </div>
                </div>
              </div>
              <div
                v-if="detail.recommendType === 2"
                @click="toShopDetail(item.id, item.userId)"
              >
                <img :src="item.logo" />
                <div class="item-info">
                  <div class="goods-name text-hidden">
                    {{ item.name }}
                  </div>
                  <div
                    class="goods-price category text-hidden"
                    v-if="item.mainCategory"
                  >
                    <span>主营：{{item.mainCategory}}</span>
                    <!-- <span
                      v-for="(subItem, subIndex) in item.categoryList"
                      :key="subIndex"
                    >{{ subItem.secondCatName
                      }}<span v-if="subIndex !== item.categoryList.length - 1">
                        、</span></span> -->
                  </div>
                </div>
              </div>
              <div
                v-if="detail.recommendType === 3"
                @click="link(item.mobileUrl)"
              >
                <img
                  :src="item.mobilePicture"
                  alt=""
                  class="recommend-link-img"
                />
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>

      <div
        class="comment"
        v-if="detail.allowComment && detail.commentNumber"
      >
        <div class="total">共{{ detail.commentNumber }}条评论</div>
        <div class="comment-list">
          <div class="comment-item">
            <img
              class="item-logo"
              :src="userLogo"
            />
            <div class="item-info">
              <div
                class="my-content"
                @click="showPopComment"
              >
                <span>说点什么···</span>
              </div>
            </div>
          </div>
          <div
            class="comment-item-box"
            v-for="(item, i) in detail.commentList"
            :key="i"
          >
            <div class="comment-item">
              <img
                class="item-logo"
                :src="item.userLogo"
              />
              <div class="item-info">
                <div class="name">{{ item.nickname }}</div>
                <div class="data">{{ item.content }}</div>
                <div class="date">
                  {{ item.createTime }}
                </div>
              </div>
              <div class="item-like">
                <div
                  class="fr tc"
                  v-if="item.isLike === 1"
                  @click="like(item.id, 2, 2, 1, i)"
                >
                  <img
                    src="../../../assets/images/icon/liked-24.png"
                    width="16"
                  />
                  <p>{{ item.likeNumber }}</p>
                </div>
                <div
                  class="fr  tc"
                  v-else
                  @click="like(item.id, 2, 1, 1, i)"
                >
                  <img
                    src="../../../assets/images/icon/like-24.png"
                    width="16"
                  />
                  <p>{{ item.likeNumber }}</p>
                </div>
              </div>
            </div>
            <div
              class="comment-item comment-subItem"
              v-for="(subItem, subIndex) in item.commentVOS"
              :key="subIndex"
            >
              <img
                class="item-logo"
                :src="subItem.userLogo"
              />
              <div class="item-info">
                <div class="name">{{ subItem.nickname }}<span class="logo-red">(作者)</span></div>
                <div class="data">{{ subItem.content }}</div>
                <!-- <div class="date">
                  {{ subItem.createTime }}
                </div> -->
              </div>
              <div class="item-like">
                <div
                  class="fr tc"
                  v-if="subItem.isLike === 1"
                  @click="like(subItem.id, 2, 2, 2, i, subIndex)"
                >
                  <img
                    src="../../../assets/images/icon/liked-24.png"
                    width="16"
                  />
                  <p>{{ subItem.likeNumber }}</p>
                </div>
                <div
                  class="fr  tc"
                  v-else
                  @click="like(subItem.id, 2, 1, 2, i, subIndex)"
                >
                  <img
                    src="../../../assets/images/icon/like-24.png"
                    width="16"
                  />
                  <p>{{ subItem.likeNumber }}</p>
                </div>
              </div>
            </div>
            <!-- <p
              class="subItem-more"
              v-if="item.replyNum"
              @click="showPopComment"
            >
              展开{{ item.replyNum }}条回复
            </p> -->
          </div>
        </div>
        <div
          class="expance"
          @click="showPopComment"
        >
          展开{{ detail.commentNumber }}条评论
        </div>
      </div>

      <div class="article">
        <div
          class="list-box"
          ref="listBox"
          id="listBox"
        >
          <div
            class="list-item"
            v-for="(item, i) in detail.jewelryContentVOS"
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
      </div>
      <div class="bottom">
        <div class="bottom-box">
          <div
            class="content"
            @click="showPopComment"
          >
            <template v-if="detail.allowComment">
              <img
                class="icon-edit"
                src="../../../assets/images/icon/edit-32.png"
              />
              <span style="margin-left: 10px;">说点什么···</span>
            </template>
            <template v-else>
              <span style="margin-left: 10px;">暂不开放评论</span>
            </template>
          </div>
          <van-row class="card-number">
            <van-col
              class="tl"
              span="8"
              v-if="detail.isLike === 1"
              @click="like(id, 1, 2)"
            >
              <img src="../../../assets/images/icon/liked-24.png" />
              <span>{{ detail.likeNumber }}</span>
            </van-col>
            <van-col
              class="tl"
              span="8"
              v-else
              @click="like(id, 1, 1)"
            >
              <img src="../../../assets/images/icon/like-24.png" />
              <span>{{ detail.likeNumber }}</span>
            </van-col>
            <van-col
              class="tc"
              span="8"
              v-if="detail.collect"
              @click="collect(id, 2)"
            >
              <img src="../../../assets/images/icon/collected.png" />
              <span>{{ detail.collectNumber }}</span>
            </van-col>
            <van-col
              class="tc"
              span="8"
              v-else
              @click="collect(id, 1)"
            >
              <img src="../../../assets/images/icon/collect.png" />
              <span>{{ detail.collectNumber }}</span>
            </van-col>
            <van-col
              class="tr"
              span="8"
              @click="showPopComment"
            >
              <img src="../../../assets/images/icon/comment-24.png" />
              <span>{{ detail.commentNumber }}</span>
            </van-col>
          </van-row>
        </div>
      </div>
      <van-popup
        class="form-list"
        v-model="showAllComment"
        closeable
        close-icon="cross"
        position="bottom"
        :lock-scroll="true"
        @close="closePopup"
      >
        <div
          class="comment"
          v-if="showComment"
        >
          <div class="expance">共{{ detail.commentNumber }}条评论</div>
          <AppList
            name="jewelryCircleComment"
            :query="query"
            :isDisabled="true"
            :postData="postData"
            :getData="
              () =>
                this.$service('jewelryCircleComment', {
                  data: this.query,
                  params: this.postData
                })
            "
            ref="list"
            @loadData="loadData"
          >
            <template slot-scope="{ list }">
              <div class="comment-list">
                <div
                  v-for="(item, i) in list"
                  :key="i"
                >
                  <CommentItem
                    :ref="'commentItem' + item.id"
                    :userLogo="item.userLogo"
                    :id="item.id"
                    :userId="item.userId"
                    :nickName="item.nickname"
                    :content="item.content"
                    :createTime="item.createTime"
                    :isLike="item.isLike"
                    :likeNumber="item.likeNumber"
                    :replyNum="item.replyNum"
                    :commentVOS="item.commentVOS"
                    @likeSuccess="likeSuccess"
                    @replyFocus="replyFocus"
                  />
                </div>
              </div>
            </template>
          </AppList>
          <div class="expance pop-bottom">
            <SendComment
              :parentId="commentParentId"
              :replyUserId="commentReplyUserId"
              :replayParentId="commentReplayParentId"
              :replyName="commentReplyName"
              @success="sendCommentSuccess"
            />
          </div>
        </div>
      </van-popup>
    </div>
  </AppView>
</template>

<script>
import HeaderModule from "./modules/header";
import Card from "./modules/cardItem";
import CommentItem from "./modules/commentItem";
import { setImg } from "~/utils/qiniu";
import AppList from "~/components/common/list";
import sticky from "~/components/common/sticky";
import SendComment from "./modules/comment";
import { getToken } from "~/utils/auth";

export default {
  data() {
    return {
      title: "详情",
      id: "",
      detail: {},
      list: [],
      showComment: true,
      postData: {
        offset: 1,
        limit: 20
      },
      query: {
        offset: 1,
        limit: 20,
        contentId: ""
      },
      titleShow: false,
      showAllComment: false,
      info: {},
      commentList: [],
      userLogo: "http://image.gacjc.com/work_1KyFQUiR6eQkt3u_284_284.png",
      commentParentId: "",
      commentReplyUserId: "",
      commentReplayParentId: "",
      commentReplyName: "",
      recommendList: []
    };
  },
  beforeMount() {
    this.id = this.$route.query.id;
    this.query.contentId = this.id;
    this.getDetail();
    this.getUser();
  },
  deactivated() {
    this.$destroy();
  },
  watch: {
    $route() {
      this.id = this.$route.query.id;
    },
    id() {
      this.getDetail();
      this.getUser();
      document.getElementById("detail").scrollIntoView();
    }
  },
  methods: {
    setImg,
    getUser() {
      if (getToken()) {
        this.$loading(this.$service("userInfo")).then(result => {
          this.userLogo = result.data.userLogo
            ? result.data.userLogo
            : "http://image.gacjc.com/work_1KyFQUiR6eQkt3u_284_284.png";
        });
      }
    },
    getDetail() {
      this.$service("jewelryCircleDetail", { data: { id: this.id } }).then(
        result => {
          this.detail = result.data;
          if (
            this.detail.jewelryContentVOS.length &&
            this.detail.jewelryContentVOS.length < 3
          ) {
            document.getElementById("listBox").style.height = "270px";
          } else if (!this.detail.jewelryContentVOS.length) {
            document.getElementById("listBox").style.height = "0";
          }
          if (this.detail.recommendType === 1) {
            this.recommendList = this.detail.contentToGoodsVOS;
          } else if (this.detail.recommendType === 2) {
            this.recommendList = this.detail.contentToMerchantVOS;
          } else {
            this.recommendList = this.detail.contentToExternalLinks;
          }
          this.info.title = this.detail.title;
          this.info.link = location.href;
          this.info.imgUrl = this.detail.thumbnail;
          this.info.desc = this.detail.brief;
        }
      );
    },
    getComment() {
      this.$service("jewelryCircleComment", {
        data: {
          offset: 1,
          limit: 2,
          contentId: this.id
        }
      }).then(result => {
        this.commentList = result.data.records;
      });
    },
    likeSuccess(id, type) {
      this.getDetail();
      // this.detail.commentList.map((item, i) => {
      //   if (item.id === id) {
      //     this.detail.commentList[i].isLike = type
      //     if (type === 1) {
      //       this.detail.commentList[i].likeNumber++
      //     } else {
      //       this.detail.commentList[i].likeNumber--
      //     }
      //   }
      // })
    },
    replyFocus(id, userId, nickName, parentId) {
      this.commentParentId = id;
      this.commentReplyUserId = userId;
      this.commentReplayParentId = parentId;
      this.commentReplyName = nickName;
    },
    sendCommentSuccess(parentId, data) {
      this.getDetail();
      // this.showAllComment = false
      if (parentId) {
        this.$refs["commentItem" + parentId][0].addReply(data);
      } else {
        this.showComment = false;
        this.$nextTick(() => {
          this.showComment = true;
        });
      }
      this.detail.commentNumber++;
    },
    showPopComment() {
      if (this.detail.allowComment) {
        this.showAllComment = true;
        this.showComment = false;
        this.$nextTick(() => {
          this.showComment = true;
        });
      } else {
        // this.$toast("该内容不允许评论");
      }
    },
    closePopup() {
      this.commentParentId = "";
      this.commentReplyUserId = "";
      this.commentReplayParentId = "";
      this.commentReplyName = "";
    },
    back() {
      if (this.$native.isApp()) {
        this.$native.goToHome();
      } else {
        this.$router.go(-1);
      }
    },
    like(likeContentId, likeType, clickType, commentType, index, subIndex) {
      if (getToken()) {
        this.$service("jewelryCircleLike", {
          data: {
            likeContentId,
            likeType,
            clickType
          }
        }).then(result => {
          if (clickType === 1) {
            this.$toast('点赞成功')
          } else {
            this.$toast('您已取消点赞')
          }
          // 文章点赞
          if (likeType === 1) {
            this.detail.likeNumber = result.data;
            this.detail.isLike = clickType;
          } else {
            // 详情外面两条评论点赞
            if (commentType === 1) {
              this.detail.commentList[index].isLike = clickType;
              this.detail.commentList[index].likeNumber = result.data;
            } else {
              this.detail.commentList[index].commentVOS[subIndex].isLike = clickType;
              this.detail.commentList[index].commentVOS[subIndex].likeNumber = result.data;
            }
            // this.showComment = false
            // this.$nextTick(() => {
            //   this.showComment = true
            // })
          }
        });
      } else {
        this.toLogin();
      }
    },
    collect(id, type) {
      if (getToken()) {
        this.$service("jewelryCircleCollectOrNot", {
          resources: [type, id, 8]
        }).then(result => {
          this.detail.collect = !this.detail.collect;
          this.detail.collectNumber = result.data;
          if (type === 1) {
            this.$toast('收藏成功')
          } else {
            this.$toast('您已取消收藏')
          }
        });
      } else {
        this.toLogin();
      }
    },
    concern(id, type) {
      if (getToken()) {
        this.$service("jewelryCircleConcern", {
          data: {
            authorId: id,
            concernType: type
          }
        }).then(result => {
          this.detail.concern = !this.detail.concern
          if (type === 1) {
            this.$toast('关注成功')
          } else {
            this.$toast('您已取消关注')
          }
        })
      } else {
        this.toLogin()
      }
    },
    toLogin() {
      if (this.$native.isApp()) {
        this.$native.goToLogin()
      } else {
        this.$router.push({
          name: "user-login"
        })
        localStorage.setItem("fromUrl", location.origin + this.$route.fullPath)
      }
    },
    loadData(data) {
      if (data.current === 1) {
        this.commentList = data.records
      }
    },
    share() {
      this.$router.push({
        name: "jewelrySearch-wordSearch"
      })
    },
    linkWeMedia() {
      this.$router.push({
        name: "news-jewelryCircle-weMidea",
        query: {
          id: this.detail.authorId
        }
      })
    },
    toGoodsDetail(id) {
      this.$router.push({ name: "jewelry-work", query: { id: id } })
    },
    toShopDetail(id, userId) {
      this.$router.push({
        name: "jewelry-detail",
        query: { id: id, merchantId: userId }
      })
    },
    link(url) {
      url && (location.href = url)
    }
  },
  components: {
    HeaderModule,
    AppList,
    Card,
    CommentItem,
    sticky,
    SendComment
  }
};
</script>

<style lang="postcss" scoped>
.home {
  background-color: var(--light-gray);
}
.form-list {
  height: 533px;
}
.app-search {
  position: relative;
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box;

  & .input-box {
    position: relative;
    display: block;
    width: 100%;
    line-height: normal;
    margin: 0;
    padding: 6px;
    font-size: 12px;
    border-radius: 15px;
    color: var(--black);
    background: #fff;
    box-sizing: border-box;
    border: none;
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
.active-detail {
  padding: 10px 20px 30px;
  background: #fff;
  & .active-header {
    & h3 {
      color: #333333;
      font-size: 16px;
      font-weight: bold;
      /* text-align: center; */
      line-height: 20px;
    }
  }
  & .active-time {
    margin: 10px auto;
    color: #999;
    font-size: 13px;
  }
  & .media-info {
    line-height: 35px;
    font-size: 15px;
    color: #333;
    & img {
      margin-right: 10px;
      border-radius: 50%;
    }
    & button {
      margin-top: 5px;
      padding: 0;
      width: 52px;
      height: 25px;
      line-height: 25px;
      font-size: 12px;
      border-radius: 13px;
    }
  }
  & .active-content {
    padding-top: 20px;
    line-height: 1.5em;
    & /deep/ p {
      color: #585858;
      line-height: 1.5em;
    }
    & /deep/ div {
      max-width: 335px !important;
      height: auto !important;
      padding: 0 !important;
      margin: 0 !important;
      position: static !important;
      line-height: 1.5em !important;
    }
    & /deep/ img {
      max-width: 335px !important;
      height: auto !important;
    }
    & /deep/ strong {
      font-weight: bold;
    }
    & /deep/ a {
      word-break: break-all;
    }
  }
}
.comment {
  background: #fff;
  font-size: 14px;
  & .total {
    padding: 15px 10px;
    color: #666;
  }
  & .list {
    height: 440px;
    overflow-y: scroll;
  }
  & .comment-list {
    padding: 0 10px;
  }
  & .comment-item-box {
    padding-bottom: 15px;
    border-bottom: 1px solid #e5e5e5;
  }
  & .comment-item {
    overflow: hidden;
    padding-top: 10px;
    & .item-logo {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      float: left;
    }
    & .item-info {
      margin-left: 10px;
      float: left;
      /* width: 310px; */
      width: 266px;
      line-height: 20px;
      & .my-content {
        padding-left: 10px;
        width: 306px;
        height: 34px;
        line-height: 34px;
        color: #666;
        border: 0;
        background: #f2f2f2;
        border-radius: 17px;
      }
      & .name {
        /* margin-bottom: 10px; */
        color: #999;
        font-size: 13px;
      }
      & .data {
        color: #333;
      }
      & .date {
        color: #aaa;
        font-size: 12px;
      }
    }
    & .item-like {
      display: inline-block;
      margin-left: 20px;
      & p {
        margin-top: 10px;
        font-size: 10px;
        color: #666;
      }
    }
  }
  & .comment-subItem {
    margin-left: 40px;
    & .item-logo {
      width: 20px;
      height: 20px;
    }
    & .item-info {
      margin-left: 5px;
      width: 240px;
    }
  }
  & .subItem-more {
    margin-top: 10px;
    padding-left: 66px;
    color: #2d68c2;
    font-size: 13px;
  }
  & .no-comment {
    padding-top: 70px;
    text-align: center;
    font-size: 15px;
    color: #999;
    & img {
      width: 330px;
    }
  }
  & .expance {
    /* border-top: 1px solid #e5e5e5; */
    border-bottom: 1px solid #e5e5e5;
    color: #2d68c2;
    line-height: 42px;
    text-align: center;
    &.pop-bottom {
      position: fixed;
      bottom: 0;
      width: 100%;
    }
    & .pop-content {
      margin: 10px;
      background: #f2f2f2;
      border-radius: 16px;
      text-align: left;
      color: #aaaaaa;
      line-height: 30px;
      padding-left: 13px;
    }
  }
}
.recommend {
  padding: 0 10px 30px;
  background: #fff;
  & .title {
    line-height: 36px;
    font-size: 17px;
    color: #333;
  }

  & .recommend-list {
    background: #f2f2f2;
    border-radius: 6px;
    padding: 15px 15px 0 15px;
    /* overflow: visible; */
    height: 80px;
    &.link-recommend {
      padding: 0;
      & .recommend-item {
        padding: 0;
      }
      & .recommend-link-img {
        width: 355px;
        border: 0;
        height: auto;
      }
    }
    & .recommend-item {
      padding-bottom: 15px;
      overflow: hidden;
      & img {
        float: left;
        width: 60px;
        height: 60px;
        border: 3px solid #fff;
      }
      & .item-info {
        margin-left: 10px;
        float: left;
        width: 250px;
        line-height: 30px;
        font-size: 16px;
        color: #333;
      }
      & .goods-price {
        font-size: 18px;
        color: #fb746e;
        font-weight: bold;
        &.category {
          font-weight: normal;
          font-size: 14px;
        }
      }
    }
  }
}
.article {
  padding: 10px;
  & .list-box {
    margin-left: -5px;
    margin-right: -5px;
    height: 560px;
    display: flex;
    flex-flow: column;
    flex-wrap: wrap;
    & .list-item {
      padding-left: 5px;
      padding-right: 5px;
      width: 50%;
      box-sizing: border-box;
      object-fit: none;
    }
    & >>> .card-title {
      height: 40px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
.bottom-box {
  position: fixed;
  bottom: 0;
  padding: 10px;
  width: calc(100% - 20px);
  height: 30px;
  vertical-align: middle;
  background: #fff;
  border-top: 1px solid #e5e5e5;
  & .content {
    display: inline-block;
    padding-left: 10px;
    width: 140px;
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
    color: #aaa;
    background: #f2f2f2;
    border-radius: 16px;
  }
  & .icon-edit {
    width: 16px;
    height: 16px;
  }
  & .card-number {
    display: inline-block;
    padding-left: 16px;
    width: 189px;
    vertical-align: middle;
    font-size: 12px;
    & img {
      margin-right: 6px;
      width: auto;
      height: 20px;
      vertical-align: middle;
    }
    & span {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
.bottom {
  height: 50px;
  /* background-color: white; */
}
.logo-red {
  color: #c42e34;
}
>>> .van-popup__close-icon {
  color: #2d68c2;
}
>>> .van-swipe__indicators {
  bottom: 5px;
}
>>> .van-swipe__indicator {
  background: #aaa;
  width: 9px;
  height: 3px;
}
>>> .van-swipe__indicator.van-swipe__indicator--active {
  width: 15px;
}
</style>
