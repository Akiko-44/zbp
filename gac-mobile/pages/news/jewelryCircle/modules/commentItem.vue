<template>
  <div class="comment-item-box">
    <div class="comment-item">
      <img
        class="item-logo"
        :src="userLogo"
        @click="replyFocus(id, userId, nickName, id)"
      />
      <div
        class="item-info"
        @click="replyFocus(id, userId, nickName, id)"
      >
        <div class="name">{{ nickName }}</div>
        <div class="data">{{ content }}</div>
        <div class="date">
          {{ createTime }}
        </div>
      </div>
      <div class="item-like">
        <div
          class="fr tc"
          v-if="showLike"
          @click="like(id, 2, 2)"
        >
          <img
            src="../../../../assets/images/icon/liked-24.png"
            width="16"
          />
          <p>{{ likeNum }}</p>
        </div>
        <div
          class="fr  tc"
          v-else
          @click="like(id, 2, 1)"
        >
          <img
            src="../../../../assets/images/icon/like-24.png"
            width="16"
          />
          <p>{{ likeNum }}</p>
        </div>
      </div>
    </div>
    <div
      class="comment-item comment-subItem"
      v-for="(subItem, subIndex) in commentList"
      :key="subIndex"
    >
      <img
        class="item-logo"
        :src="subItem.userLogo"
        @click="replyFocus(id, subItem.userId, subItem.nickname, subItem.id)"
      />
      <div
        class="item-info"
        @click="replyFocus(id, subItem.userId, subItem.nickname, subItem.id)"
      >
        <div class="name">
          <span>{{ subItem.nickname }}</span>
          <span
            v-if="subItem.loginType === 1"
            class="logo-red"
          >(作者)</span>
          <span v-if="
              subItem.replyNickname &&
                subItem.nickname !== subItem.replyNickname
            ">
            回复 {{ subItem.replyNickname }}</span>
        </div>
        <div class="data">{{ subItem.content }}</div>
        <!-- <div class="date">
          {{ subItem.createTime }}
        </div> -->
      </div>
      <div class="item-like">
        <div
          class="fr tc"
          v-if="subItem.isLike === 1"
          @click="likeSubItem(subItem.id, 2, subIndex)"
        >
          <img
            src="../../../../assets/images/icon/liked-24.png"
            width="16"
          />
          <p>{{ subItem.likeNumber || 0 }}</p>
        </div>
        <div
          class="fr  tc"
          v-else
          @click="likeSubItem(subItem.id, 1, subIndex)"
        >
          <img
            src="../../../../assets/images/icon/like-24.png"
            width="16"
          />
          <p>{{ subItem.likeNumber || 0 }}</p>
        </div>
      </div>
    </div>
    <p
      class="subItem-more"
      v-if="replyNum && !offset"
      @click="getReply"
    >
      展开{{ replyNum }}条回复
    </p>
    <p
      class="subItem-more"
      v-if="replyNum && offset && offset !== pages"
      @click="getReply"
    >
      展开更多
    </p>
  </div>
</template>

<script>
import { setImg } from "~/utils/qiniu";
import { getToken } from "~/utils/auth";
import { uniqueByKey } from "~/utils/filters";

export default {
  props: {
    userLogo: String,
    nickName: String,
    content: String,
    createTime: String,
    isLike: [String, Number],
    likeNumber: [String, Number],
    id: [String, Number],
    userId: [String, Number],
    replyNum: [String, Number],
    commentVOS: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data() {
    return {
      showLike: false,
      likeNum: 0,
      offset: 0,
      limit: 5,
      pages: 1,
      commentList: []
    };
  },
  watch: {
    isLike() {
      this.showLike = this.isLike === 1;
      this.likeNum = this.likeNumber;
    }
  },
  mounted() {
    this.showLike = this.isLike === 1;
    this.likeNum = this.likeNumber;
    this.commentList = this.commentVOS;
  },
  methods: {
    setImg,
    getReply() {
      this.offset++;
      this.$service("jewelryCircleCommentReply", {
        data: {
          offset: this.offset,
          limit: this.limit,
          id: this.id
        }
      }).then(result => {
        this.commentList.push(...result.data.records);
        this.commentList = uniqueByKey(this.commentList, "id");
        console.log(this.commentList);
        this.pages = result.data.pages;
      });
    },
    addReply(data) {
      this.commentList.push(data);
    },
    replyFocus(id, userId, nickName, replayParentId) {
      document.getElementById("commentInput").focus();
      this.$emit("replyFocus", id, userId, nickName, replayParentId);
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
          if (clickType === 1) {
            this.likeNum++;
            this.showLike = true;
            this.$toast('点赞成功')
          } else {
            this.likeNum--;
            this.showLike = false;
            this.$toast('您已取消点赞')
          }
          this.$emit("likeSuccess", likeContentId, clickType);
        });
      } else {
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
      }
    },
    likeSubItem(likeContentId, clickType, index) {
      if (getToken()) {
        this.$service("jewelryCircleLike", {
          data: {
            likeContentId,
            likeType: 2,
            clickType
          }
        }).then(result => {
          this.commentList[index].isLike = clickType;
          this.commentList[index].likeNumber = result.data;
          if (clickType === 1) {
            this.$toast('点赞成功')
          } else {
            this.$toast('您已取消点赞')
          }
          this.$emit("likeSuccess");
        });
      } else {
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
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.comment-item-box {
  padding-bottom: 15px;
  border-bottom: 1px solid #e5e5e5;
}
.comment-item {
  overflow: hidden;
  padding-top: 10px;
  & .item-logo {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    float: left;
  }
  & .item-info {
    margin-left: 5px;
    float: left;
    /* width: 310px; */
    width: 266px;
    line-height: 20px;
    & .my-content {
      padding-left: 10px;
      width: 100%;
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
.comment-subItem {
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
.subItem-more {
  margin-top: 10px;
  padding-left: 66px;
  color: #2d68c2;
  font-size: 13px;
}
.logo-red {
  color: #c42e34;
}
</style>
