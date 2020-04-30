<template>
  <AppView class="detail">
    <div
      class="detail-main"
      id="detailMain"
    >
      <div
        id="video-container"
        style="margin: 0px;"
      ></div>

      <div
        v-show="showPlay"
        class="play-btn"
        id="autoPlay"
        @click="autoPlay"
      >
        <van-icon name="play-circle-o" />
      </div>
      <div
        class="nav-bar"
        v-if="titleShow"
      >
        <div class="title">
          详情
        </div>
        <i
          class="ico-back-white back"
          @click="back"
        ></i>
        <i
          class="ico-share-white share"
          @click="showShare"
        ></i>
      </div>
      <div class="link-box">
        <div
          class="topic-name"
          @click="linkTopic"
          v-if="detail.topicName"
        >
          # {{detail.topicName}}
        </div>
        <div class="media-info clearfix">
          <img
            :src="detail.authorLogo"
            class="fl"
            width="20"
            @click="linkWeMedia"
          />
          <div
            class="media-name fl"
            @click="linkWeMedia"
          >
            {{ detail.authorName }}
          </div>
        </div>
        <div class="video-name d-flex j-sb a-end">
          <span class="detail-title text-hidden">{{ detail.title }}</span>
          <div class="operation-btn">
            <template v-if="detail.isAuthor === 2">
              <van-button
                class="concern-btn"
                color="#DF735A"
                v-if="!detail.concern"
                @click.native="concern(detail.authorId, 1)"
              >关注</van-button>
              <span
                class="font-12 text-theme"
                v-if="detail.isAuthor === 2 && detail.contentSourceType == 2"
                @click="report"
              >举报</span>
            </template>
            <template v-else>
              <van-button
                class="concern-btn"
                color="#DF735A"
                @click.native="edit"
              >编辑</van-button>
              <span
                class="font-12 text-theme"
                v-if="detail.isAuthor === 2"
                @click="deleteContent"
              >删除</span>
            </template>
          </div>
        </div>
        <div
          class="recommend"
          @click="toGoodsDetail"
        >
          <div class="recommend-list">
            <div
              class="recommend-item"
              v-for="(item, i) in recommendList"
              :key="i"
            >
              <div class="title d-flex j-sb">
                <span
                  class="goods-name text-hidden"
                  v-if="detail.recommendType === 1"
                >{{ item.goodsName }}</span>
                <span
                  class="goods-name text-hidden"
                  v-else
                >{{
                  item.name
                }}</span>
                <span class="link-detail">查看详情>></span>
              </div>
            </div>
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
                src="../../assets/images/icon/edit-32.png"
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
              <img src="../../assets/images/icon/liked-24.png" />
              <span>{{ detail.likeNumber }}</span>
            </van-col>
            <van-col
              class="tl"
              span="8"
              v-else
              @click="like(id, 1, 1)"
            >
              <img src="../../assets/images/icon/like-white.png" />
              <span>{{ detail.likeNumber }}</span>
            </van-col>
            <van-col
              class="tc"
              span="8"
              v-if="detail.collect"
              @click="collect(id, 2)"
            >
              <img src="../../assets/images/icon/collected.png" />
              <span>{{ detail.collectNumber }}</span>
            </van-col>
            <van-col
              class="tc"
              span="8"
              v-else
              @click="collect(id, 1)"
            >
              <img src="../../assets/images/icon/collect-white.png" />
              <span>{{ detail.collectNumber }}</span>
            </van-col>
            <van-col
              class="tr"
              span="8"
              @click="showPopComment"
            >
              <img src="../../assets/images/icon/comment-white.png" />
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
        :style="{ height: '533px' }"
      >
        <div class="comment">
          <div class="total ">共{{ detail.commentNumber }}条评论</div>
          <div v-if="showComment">
            <template v-if="detail.commentNumber">
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
                        @replyFocus="replyFocus"
                      />
                    </div>
                  </div>
                </template>
              </AppList>
            </template>

            <div
              class="no-comment"
              v-else
            >
              <img
                src="../../assets/images/no-comment.png"
                alt=""
              />
              <p>暂无评价</p>
            </div>
          </div>
          <div class="expance pop-bottom">
            <!-- <div class="content" @click="showComment = true">
              <i class="ico-edit-32"></i>
              <span style="margin-left: 10px;">说点什么···</span>
            </div> -->
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
      <Share
        :info="info"
        ref="share"
      />
    </div>
  </AppView>
</template>

<script>
import Card from "~/components/jewelryCircle/cardItem";
import CommentItem from "~/components/jewelryCircle/commentItem";
import { setImg } from "~/utils/qiniu";
import AppList from "~/components/common/list";
import sticky from "~/components/common/sticky";
import SendComment from "~/components/jewelryCircle/comment";
import Share from "~/components/common/share";
import { getToken } from "~/utils/auth";
import { Dialog } from "vant"

export default {
  head() {
    return {
      title: this.title
    };
  },
  data() {
    return {
      title: "详情",
      id: "",
      detail: {},
      list: [],
      showVideo: false,
      showPlay: true,
      showAllComment: false,
      showComment: true,
      titleShow: false,
      info: {},
      height: 0,
      postData: {
        offset: 1,
        limit: 20
      },
      query: {
        offset: 1,
        limit: 20,
        contentId: ""
      },
      commentParentId: "",
      commentReplyUserId: "",
      commentReplayParentId: "",
      commentReplyName: "",
      recommendList: []
    };
  },
  mounted() {
    // if (window.navigator.userAgent.includes("MicroMessenger")) {
    //   this.showPlay = true;
    // }
    if (
      !this.$native.isApp() &&
      !window.navigator.userAgent.includes("MicroMessenger") &&
      !window.navigator.userAgent.includes("QQ")
    ) {
      this.titleShow = true;
    }
    this.id = this.$route.query.id;
    this.query.contentId = this.id;
    this.getList();
    // this.getComment();
    this.height = window.innerHeight;
    const _this = this;
    window.onresize = function () {
      if (window.innerHeight !== _this.height) {
        document.querySelector(".vcp-player").style.height =
          window.screen.availHeight + "px";
        document.querySelector("video").style.height =
          window.screen.availHeight + "px";
        _this.showPlay = false;
      } else {
        document.querySelector(".vcp-player").style.height =
          _this.height + "px";
        document.querySelector("video").style.height = _this.height + "px";
        _this.showPlay = true;
      }
    };
  },
  deactivated() {
    this.$destroy();
  },
  beforeDestroy() {
    if (document.querySelector("video")) {
      document.querySelector("video").pause();
    }
  },
  methods: {
    setImg,
    getList() {
      const _this = this;
      this.$service("jewelryCircleDetail", { data: { id: this.id } }).then(
        result => {
          this.detail = result.data;
          this.info.title = this.detail.title;
          this.info.link = location.href;
          this.info.imgUrl = this.detail.thumbnail;
          this.info.desc = this.detail.brief;
          if (this.detail.recommendType === 1) {
            this.recommendList = this.detail.contentToGoodsVOS;
          } else if (this.detail.recommendType === 2) {
            this.recommendList = this.detail.contentToMerchantVOS;
          } else {
            this.recommendList = this.detail.contentToExternalLinks;
          }
          var width = window.innerWidth;
          var height = window.innerHeight;
          var options = {
            mp4: this.detail.content,
            // autoplay: true,
            width: width,
            height: height,
            // width: "375",
            // height: "600",
            // h5_flv: "true",
            // x5_player: "true",
            x5_type: "h5",
            // x5_fullscreen: "false",
            volume: 0.5,
            controls: "none",
            wording: {
              1: "网络错误，请检查网络配置或者播放链接是否正确",
              2: "网络错误，请检查网络配置或者播放链接是否正确",
              3: "视频解码错误",
              4: "当前系统环境不支持播放该视频格式"
            }
            // listener: function(msg) {
            //   if (msg.type == "load") {
            //   }
            // }
          };
          window.tcplayer = new TcPlayer("video-container", options);
        }
      );
    },
    autoPlay() {
      document.querySelector("video").play();
      this.showPlay = false;
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
    report() {
      Dialog.confirm({
        title: "举报功能仅限在APP中使用",
        confirmButtonText: '下载APP',
        cancelButtonText: '暂不举报',
      })
        .then(() => {
          location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.hsz88.zbx'
        })
        .catch(() => { })
    },
    deleteContent() {
      Dialog.confirm({
        title: "确认删除此内容？",
      })
        .then(() => {
          this.$service("deleteJewelryContent", {
            resources: [this.detail.id]
          }).then(res => {
            that.$router.push({
              name: "jewelryCircle-weMidea",
              query: {
                type: 'mine'
              }
            });
          });
        })
        .catch(() => { })
    },
    like(likeContentId, likeType, clickType, index) {
      if (getToken()) {
        this.$service("jewelryCircleLike", {
          data: {
            likeContentId,
            likeType,
            clickType
          }
        }).then(result => {
          this.detail.likeNumber = result.data;
          this.detail.isLike = clickType;
          if (clickType === 1) {
            this.$toast("点赞成功");
          } else {
            this.$toast("您已取消点赞");
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
            this.$toast("收藏成功");
          } else {
            this.$toast("您已取消收藏");
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
            concernType: type,
            authorType: this.detail.contentOwnerType
          }
        }).then(result => {
          this.detail.concern = !this.detail.concern;
          if (type === 1) {
            this.$toast("关注成功");
          } else {
            this.$toast("您已取消关注");
          }
        });
      } else {
        this.toLogin();
      }
    },
    toLogin() {
      if (this.$native.isApp()) {
        this.$native.goToLogin();
      } else {
        this.$router.push({
          name: "user-login"
        });
        localStorage.setItem("fromUrl", location.origin + this.$route.fullPath);
      }
    },
    replyFocus(id, userId, nickName, parentId) {
      this.commentParentId = id;
      this.commentReplyUserId = userId;
      this.commentReplayParentId = parentId;
      this.commentReplyName = nickName;
    },
    sendCommentSuccess(parentId, data) {
      // this.getDetail();
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
    showShare() {
      this.$refs.share.show();
      this.$service("jewelryCircleShare").then(result => { });
    },
    back() {
      if (this.$native.isApp()) {
        this.$native.goToHome();
      } else {
        this.$router.go(-1);
      }
    },
    edit() {
      this.$router.push({
        name: 'jewelryCircle-publish',
        query: {
          id: this.detail.id
        }
      })
    },
    linkTopic() {
      this.$router.push({
        name: "jewelryCircle-topic",
        query: {
          id: this.detail.topicId
        }
      })
    },
    linkWeMedia() {
      this.$router.push({
        name: "jewelryCircle-weMidea",
        query: {
          id: this.detail.authorId,
          authorType: this.detail.contentSourceType
        }
      });
    },
    toGoodsDetail() {
      const recommendItem = this.recommendList[0];
      if (this.detail.recommendType === 1) {
        this.$router.push({
          name: "jewelry-work",
          query: { id: recommendItem.id }
        });
      } else if (this.detail.recommendType === 2) {
        this.$router.push({
          name: "jewelry-detail",
          query: { id: recommendItem.id }
        });
      } else {
        recommendItem.mobileUrl && (location.href = recommendItem.mobileUrl);
      }
    }
  },
  components: {
    AppList,
    Card,
    CommentItem,
    sticky,
    SendComment,
    Share
  }
};
</script>

<style lang="postcss" scoped>
/* video::-webkit-media-controls-enclosure {
  display: none !important;
} */
.detail {
  background-color: #000;
  height: 700px;
}
.detail-main {
  position: relative;
}
video {
  position: fixed;
  width: 100%;
  height: auto;
  object-fit: fill;
}
/* canvas {
  width: 100%;
  height: 100%;
} */
.play-btn {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* top: 100px; */
  z-index: 99;
  width: 60px;
  height: 60px;
  font-size: 50px;
  color: #fff;
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
      text-align: center;
    }
  }
  & .active-time {
    margin: 20px auto;
    color: #a9a9a9;
    font-size: 14px;
    text-align: center;
  }
  & .active-content {
    & p {
      color: #585858;
      line-height: 23px;
      & img {
        width: 100%;
      }
    }
  }
}
.comment {
  background: #fff;
  font-size: 14px;
  & .total {
    border-bottom: 1px solid #e5e5e5;
    color: #2d68c2;
    line-height: 44px;
    text-align: center;
    font-size: 15px;
  }
  & .list {
    height: 440px;
    overflow-y: scroll;
  }
  & .comment-list {
    padding: 0 10px;
  }
  & .comment-item {
    overflow: hidden;
    padding: 10px 0;
    & img {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      float: left;
    }
    & .item-info {
      margin-left: 5px;
      float: left;
      width: 310px;
      line-height: 20px;

      & .name {
        color: #999;
        font-size: 13px;
        line-height: 26px;
      }
      & .data {
        color: #333;
      }
      & .date {
        color: #aaa;
        font-size: 12px;
        line-height: 26px;
      }
    }
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
    padding: 10px;
    &.pop-bottom {
      position: fixed;
      bottom: 0;
      width: 100%;
    }
    & .content {
      display: inline-block;
      padding-left: 10px;
      width: 345px;
      height: 32px;
      line-height: 32px;
      color: #aaa;
      background: #f2f2f2;
      border-radius: 16px;
    }
  }
}
.bottom-box {
  position: fixed;
  bottom: 0;
  /* bottom: calc(1vh); */
  padding: 10px;
  width: 355px;
  height: 30px;
  vertical-align: middle;
  background: rgba(0, 0, 0, 0.5);

  & .content {
    display: inline-block;
    padding-left: 10px;
    width: 140px;
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
    color: #fff;
    background: rgba(255, 255, 255, 0.3);
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
    height: 32px;
    line-height: 32px;
    color: #fff;
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
.nav-bar {
  position: fixed;
  z-index: 9999;
  top: 0;
  width: 100%;
  height: 46px;
  line-height: 46px;
  text-align: center;
  font-size: 18px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  & .back {
    position: absolute;
    top: 15px;
    left: 15px;
  }
  & .share {
    position: absolute;
    top: 15px;
    right: 15px;
  }
}
.link-box {
  position: absolute;
  bottom: 60px;
  width: 100%;
  & .topic-name {
    margin-left: 15px;
    padding: 10px;
    color: #ffffff;
    font-size: 13px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
  }
  & .media-info {
    width: 100%;
    padding: 10px 15px 0 15px;
    line-height: 20px;
    font-size: 13px;
    color: #fff;
    box-sizing: border-box;
    & img {
      margin-right: 10px;
      border-radius: 50%;
    }
  }
  & .video-name {
    padding: 5px 25px 0 15px;
    color: #fff;
    font-size: 13px;
    & .detail-title {
      width: 223px;
    }
    & .concern-btn {
      margin-right: 16px;
      width: 45px;
      height: 24px;
      line-height: 24px;
      border-radius: 4px;
      font-size: 12px;
      padding: 0;
    }
  }
  & .recommend {
    color: #face15;
    font-size: 13px;
    & .recommend-list {
      padding: 25px 15px 0;
      & .recommend-item {
        & .goods-name {
          width: 240px;
        }
      }
    }
  }
}

>>> .van-popup__close-icon {
  color: #2d68c2;
}
</style>
