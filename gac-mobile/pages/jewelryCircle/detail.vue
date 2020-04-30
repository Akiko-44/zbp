<template>
  <AppView
    class="detail"
    id="detail"
  >
    <sticky class="sticky">
      <HeaderModule
        :title="title"
        :info="info"
      />
    </sticky>
    <div class="detail-main">
      <template v-if="detail.contentSourceType === 1">
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
            >
              {{ detail.authorName }}
            </div>
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
          <!-- <div class="title">相关推荐</div> -->
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
                      <p class="merchant-info d-flex mt-1">
                        <img
                          :src="item.merchantLogo"
                          class="rounded-circle"
                        >
                        <span class="font-12 text-light-black font-weight-400 line-h">{{item.merchantName}}</span>
                      </p>
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
                      <span>主营：{{ item.mainCategory }}</span>
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
      </template>
      <template v-if="detail.contentSourceType === 2">
        <van-swipe
          ref="detailSwipe"
          class="detail-swipe"
          :show-indicators="false"
          @change="onSwipeChange"
        >
          <van-swipe-item
            v-for="(img, index) in detail.picList"
            :key="index"
            @click="previewImg(index)"
          >
            <div
              class="background lazy-img-box"
              v-lazy:background-image="setImg(img, { w: 800 })"
            ></div>
          </van-swipe-item>
          <div
            class="custom-indicator"
            slot="indicator"
          >
            {{ current + 1 }}/{{detail.picList.length}}
          </div>
        </van-swipe>
        <div class="mine-box">
          <div class="mine-info d-flex j-sb">
            <div class="d-flex">
              <img
                :src="detail.authorLogo"
                class="rounded-circle"
                width="30"
                height="30"
                @click="linkWeMedia"
              />
              <div
                class="media-name ml-1"
                @click="linkWeMedia"
              >
                <p class="font-13 line-h-md">{{ detail.authorName }}</p>
                <p
                  class="d-flex text-dark-gray font-12 a-center"
                  v-if="detail.contentReleaseArea"
                >
                  <img
                    width="7"
                    height="10"
                    src="../../assets/images/icon/location_s.png"
                  >
                  <span class="ml">{{detail.contentReleaseArea}}</span>
                </p>
              </div>
            </div>
            <div class="d-flex a-center">
              <van-button
                v-if="!detail.concern"
                class="concern-btn"
                color="#DF735A"
                @click.native="concern(detail.authorId, 1)"
              >关注</van-button>
              <!-- 为了520暂时屏蔽 -->
              <!-- <span
                class="divider"
                v-if="!detail.concern"
              ></span>
              <img
                width="24"
                height="24"
                src="../../assets/images/icon/more_circle.png"
                @click="showOperation = !showOperation"
              > -->
            </div>
          </div>
          <transition name="fade">
            <div
              class="operation-list shadow-sm"
              v-show="showOperation"
            >
              <img
                src="../../assets/images/icon/triangle.png"
                class="triangle"
              >
              <ul class="">
                <li
                  v-if="detail.isAuthor === 2"
                  @click="report"
                >
                  <img src="../../assets/images/icon/warn_20.png">
                  <span>举报</span>
                </li>
                <li
                  v-if="detail.isAuthor === 1"
                  @click="edit"
                >
                  <img src="../../assets/images/icon/edit_20.png">
                  <span>编辑</span>
                </li>
                <li
                  v-if="detail.isAuthor === 1"
                  @click="deleteContent"
                >
                  <img src="../../assets/images/icon/delete_20.png">
                  <span>删除</span>
                </li>
              </ul>
            </div>
          </transition>

        </div>
        <div class="mine-content-container">
          <div
            class="mine-content"
            :class="showAllContent ? '': 'ellipsis-content'"
          >{{detail.content}}</div>
          <p
            class="text-blue"
            v-show="!showAllContent"
            @click="showAllContent = true"
          >继续阅读>></p>
          <div class="d-flex j-sb a-end">
            <div
              class="topic-name mt-1 bg text-light-black font-12 rounded"
              v-if="detail.topicName"
              @click="linkTopic"
            >#{{detail.topicName}}#</div>
            <div class="text-gray font-12">{{detail.applyPushTime}}</div>
          </div>
        </div>

        <div
          class="recommend mine-recommend"
          v-if="recommendList && recommendList.length"
        >
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
                      <p class="merchant-info d-flex mt-1">
                        <img
                          :src="item.merchantLogo"
                          class="rounded-circle"
                        >
                        <span class="font-12 text-light-black font-weight-400 line-h">{{item.merchantName}}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </template>

      <div
        class="comment m-1"
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
                <div class="name d-flex j-sb a-center">
                  {{ item.nickname }}
                  <div class="item-like">
                    <div
                      v-if="item.isLike === 1"
                      @click="like(item.id, 2, 2, 1, i)"
                    >
                      <img
                        src="../../assets/images/icon/liked-24.png"
                        width="13"
                      />
                      <span class="ml">{{ item.likeNumber }}</span>
                    </div>
                    <div
                      v-else
                      @click="like(item.id, 2, 1, 1, i)"
                    >
                      <img
                        src="../../assets/images/icon/like-24.png"
                        width="13"
                      />
                      <span class="ml">{{ item.likeNumber }}</span>
                    </div>
                  </div>
                </div>
                <div class="data">{{ item.content }}</div>
                <div class="date">
                  {{ item.createTime }}
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
                <div class="name d-flex j-sb">
                  <div>
                    {{ subItem.nickname }}<span class="logo-red">(作者)</span>
                  </div>
                  <div class="item-like">
                    <div
                      v-if="subItem.isLike === 1"
                      @click="like(subItem.id, 2, 2, 2, i, subIndex)"
                    >
                      <img
                        src="../../assets/images/icon/liked-24.png"
                        width="13"
                      />
                      <span class="ml">{{ subItem.likeNumber }}</span>
                    </div>
                    <div
                      v-else
                      @click="like(subItem.id, 2, 1, 2, i, subIndex)"
                    >
                      <img
                        src="../../assets/images/icon/like-24.png"
                        width="13"
                      />
                      <span class="ml">{{ subItem.likeNumber }}</span>
                    </div>
                  </div>
                </div>
                <div class="data">{{ subItem.content }}</div>
              </div>

            </div>
          </div>
        </div>
        <div
          class="expance detail-expance"
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
              <img src="../../assets/images/icon/like-24.png" />
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
              <img src="../../assets/images/icon/collect.png" />
              <span>{{ detail.collectNumber }}</span>
            </van-col>
            <van-col
              class="tr"
              span="8"
              @click="showPopComment"
            >
              <img src="../../assets/images/icon/comment-24.png" />
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
import HeaderModule from "~/components/jewelryCircle/header";
import Card from "~/components/jewelryCircle/cardItem";
import CommentItem from "~/components/jewelryCircle/commentItem";
import { setImg } from "~/utils/qiniu";
import AppList from "~/components/common/list";
import sticky from "~/components/common/sticky";
import SendComment from "~/components/jewelryCircle/comment";
import { getToken } from "~/utils/auth";
import { ImagePreview } from 'vant'
import { Dialog } from "vant"

export default {
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.brief },
        { name: 'keywords', content: this.keyword }
      ]
    }
  },
  data() {
    return {
      title: "",
      keyword: "",
      brief: "",
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
      current: 0,
      titleShow: false,
      showAllComment: false,
      info: {},
      commentList: [],
      userLogo: "http://image.gacjc.com/work_1KyFQUiR6eQkt3u_284_284.png",
      commentParentId: "",
      commentReplyUserId: "",
      commentReplayParentId: "",
      commentReplyName: "",
      recommendList: [],
      ImagePreviewDialog: '',
      showOperation: false,
      showAllContent: false
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
  beforeRouteLeave(to, from, next) {
    if (this.ImagePreviewDialog) {
      this.ImagePreviewDialog.close()
    }
    next()
  },
  watch: {
    $route() {
      this.id = this.$route.query.id;
      this.query.contentId = this.id;
    },
    id() {
      this.getDetail();
      document.getElementById("detail").scrollIntoView();
    }
  },
  methods: {
    setImg,
    async getUser() {
      if (getToken()) {
        const userInfo = await this.$store.dispatch("user/getUserInfo");
        this.userLogo = userInfo.userLogo
          ? userInfo.userLogo
          : "http://image.gacjc.com/work_1KyFQUiR6eQkt3u_284_284.png";
      }
    },
    getDetail() {
      this.$service("jewelryCircleDetail", { data: { id: this.id } }).then(
        result => {
          this.detail = result.data;
          this.title = this.detail.title.length > 8 ? this.detail.title.substr(0, 8).concat('...') : this.detail.title//标题超过8字显示省略号
          this.keyword = this.detail.keyword
          this.brief = this.detail.brief
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
      )
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
    previewImg(index) {
      this.ImagePreviewDialog = ImagePreview({
        images: this.detail.picList,
        startPosition: index
      })
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
            this.$router.go(-1)
            // this.$router.push({
            //   name: "jewelryCircle-weMidea",
            //   query: {
            //     type: 'mine',
            //     authorType: this.detail.contentSourceType
            //   }
            // });
          });
        })
        .catch(() => { })
    },
    likeSuccess(id, type) {
      this.getDetail()
    },
    replyFocus(id, userId, nickName, parentId) {
      this.commentParentId = id;
      this.commentReplyUserId = userId;
      this.commentReplayParentId = parentId;
      this.commentReplyName = nickName;
    },
    sendCommentSuccess(parentId, data) {
      this.getDetail()
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
            this.$toast("点赞成功");
          } else {
            this.$toast("您已取消点赞");
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
              this.detail.commentList[index].commentVOS[
                subIndex
              ].isLike = clickType;
              this.detail.commentList[index].commentVOS[subIndex].likeNumber =
                result.data;
            }
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
    onSwipeChange(index) {
      this.current = index
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
    loadData(data) {
      if (data.current === 1) {
        this.commentList = data.records;
      }
    },
    share() {
      this.$router.push({
        name: "jewelrySearch-wordSearch"
      });
    },
    edit() {
      this.$router.push({
        name: 'jewelryCircle-publish',
        query: {
          id: this.detail.id
        }
      })
    },
    linkWeMedia() {
      this.$router.push({
        name: "jewelryCircle-weMidea",
        query: {
          id: this.detail.authorId,
          authorType: this.detail.contentOwnerType
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
    toGoodsDetail(id) {
      this.$router.push({ name: "jewelry-work", query: { id: id } });
    },
    toShopDetail(id, userId) {
      this.$router.push({
        name: "jewelry-detail",
        query: { id: id, merchantId: userId }
      });
    },
    link(url) {
      url && (location.href = url);
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
.detail-swipe {
  position: relative;
  height: 378px;
  background-color: var(--light-gray);
  & .background {
    width: 100%;
    height: 100%;
    object-fit: cover;
    touch-action: none;
  }
}
.custom-indicator {
  position: absolute;
  bottom: 13px;
  right: 20px;
  opacity: 0.3;
  width: 44px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: #fff;
  background: #363636ff;
  border-radius: 10px;
}
.mine-box {
  position: relative;
  padding-left: 15px;
  background: #fff;
  & .mine-info {
    padding: 15px 15px 15px 0;
    border-bottom: 1px solid #e5e5e5;
    & .concern-btn {
      padding: 0;
      width: 45px;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      color: #fefefe;
      border-radius: 4px;
    }
    & .divider {
      margin: 0 15px;
      width: 1px;
      height: 16px;
      background: #cccccc;
    }
  }
  & .operation-list {
    position: absolute;
    right: 6px;
    top: 54px;
    width: 160px;
    background: #ffffff;
    border-radius: 6px;
    & ul {
      padding: 0 10px;
      position: relative;
      z-index: 2;
      width: 140px;
      background: #ffffff;
    }
    & li {
      line-height: 44px;
      border-bottom: 1px solid #e5e5e5;
      &:last-child {
        border: 0;
      }
    }
    & img {
      margin: 10px 15px 0 7px;
      width: 20px;
      height: 20px;
      vertical-align: top;
    }
    & .triangle {
      position: absolute;
      top: -15px;
      right: 3px;
      margin: 0;
      width: 30px;
      height: 30px;
      z-index: 1;
    }
  }
}
.mine-content-container {
  padding: 6px 16px 16px;
  line-height: 2;
  font-size: 12px;
  color: #666666;
  background: #ffffff;
  & .ellipsis-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
  }
  & .topic-name {
    padding: 8px 10px;
    line-height: 12px;
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
    word-wrap: break-word;
    word-break: normal;
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
  font-size: 14px;
  background: #fff;
  border-radius: 5px;
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
  & .comment-item {
    overflow: hidden;
    padding-bottom: 20px;
    & .item-logo {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      float: left;
    }
    & .item-info {
      margin-left: 10px;
      float: left;
      width: 295px;
      line-height: 20px;
      & .my-content {
        padding-left: 10px;
        width: 286px;
        height: 34px;
        line-height: 34px;
        color: #999999;
        font-size: 12px;
        border: 0;
        background: #f2f2f2;
        border-radius: 17px;
      }
      & .name {
        color: #999;
        font-size: 13px;
      }
      & .data {
        color: #333;
        font-size: 12px;
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
      width: 270px;
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
    border-bottom: 1px solid #e5e5e5;
    color: #2d68c2;
    line-height: 42px;
    text-align: center;
    &.detail-expance {
      border-top: 1px solid #e5e5e5;
      border-bottom: 0;
    }
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
  /* padding: 0 10px 30px;
  background: #fff; */
  background: #f2f2f2;
  padding: 10px 10px 0 10px;
  & .title {
    line-height: 36px;
    font-size: 17px;
    color: #333;
  }

  & .recommend-list {
    border-radius: 6px;
    /* padding: 15px 15px 0 15px; */
    height: 80px;
    background: #ffffff;
    padding: 10px;
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
        width: 76px;
        height: 76px;
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
        line-height: 1;
        &.category {
          font-weight: normal;
          font-size: 14px;
        }
      }
      & .merchant-info {
        & img {
          margin-right: 8px;
          width: 11px;
          height: 11px;
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
