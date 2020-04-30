<template>
  <div class="comment-input-span">
    <div class="fixed-input comment-input row-between" :style="style">
      <div class="input-box">
        <input
          id="commentInput"
          @focus="focus"
          @blur="blur"
          type="text"
          :placeholder="placeholder"
          v-model="value"
          :maxlength="200"
        />
        <!--v-scrollTo-->
      </div>
      <van-button
        class="send-btn"
        type="default"
        :loading="sendLoading"
        @click="send"
        >发送</van-button
      >
      <!-- <van-button
        class="send-btn cancel-btn"
        type="default"
        @click="cancel"
      >取消</van-button> -->
      <!-- <router-link
        v-show="commentNum !== null"
        class="comment-count"
        :to="{ name: 'news-comments', query: { id: $route.query.id }}"
        tag="p"
      >
        评论{{commentNum}}
      </router-link> -->
    </div>
  </div>
</template>

<script>
import { navHeight } from "~/utils/page";
// import '../card/multipleImage.vue';
export default {
  // props: ["commentNum"],
  props: {
    commentNum: String,
    parentId: {
      type: String,
      default: ""
    },
    replyUserId: {
      type: String,
      default: ""
    },
    replayParentId: {
      type: String,
      default: ""
    },
    replyName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      sendLoading: false,
      value: "",
      placeholder: "说点什么...",
      style: { bottom: 0 }
    };
  },
  watch: {
    replyName() {
      if (this.replyName) {
        // console.log(this.replyName)
        this.placeholder = "回复" + this.replyName;
      } else {
        this.placeholder = "说点什么...";
      }
      // console.log(this.placeholder)
    }
  },
  methods: {
    send() {
      if (this.value.trim()) {
        this.sendLoading = true;
        this.$service("jewelryCircleCommentAdd", {
          data: {
            contentId: +this.$route.query.id,
            content: this.value,
            parentId: this.parentId ? +this.parentId : undefined,
            replyUserId: this.replyUserId ? +this.replyUserId : undefined,
            replayParentId: this.replayParentId
              ? +this.replayParentId
              : undefined
          }
        })
          .then(result => {
            this.success(result.data);
          })
          .catch(this.fail);
      } else {
        this.value = "";
      }
    },
    success(data) {
      this.$toast("评论成功");
      this.value = "";
      this.sendLoading = false;
      this.$emit("success", this.parentId, data);
    },
    fail() {
      this.$dialog.confirm({
        message: "评论失败",
        confirmButtonText: "重试",
        beforeClose: (action, done) => {
          if (action === "confirm") {
            this.send();
          }
          done();
        }
      });
      this.sendLoading = false;
    },
    cancel() {
      this.$emit("cancel");
    },
    focus() {
      this.$emit("focus");
    },
    blur() {
      this.$emit("blur");
    }
  },
  components: {}
};
</script>

<style lang="postcss" scoped>
.comment-input {
  position: fixed;
  z-index: 3000;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  background: white;
  align-items: center;
  & .input-box {
    flex: 1;
    margin-left: 12px;
  }
  & input {
    width: 100%;
    line-height: normal;
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 15px;
    color: var(--black);
    background: #f0f0f0;
    box-sizing: border-box;
    border: none;
  }
  & .send-btn {
    width: 58px;
    border: none;
    color: var(--red);
    &.cancel-btn {
      color: #666;
    }
  }
}
.comment-scroll,
.comment-input-span {
  /* height: 50px; */
  background-color: white;
}
.comment-count {
  padding: 12px 12px 12px 5px;
  font-size: 12px;
  color: #b3b3b3;
}
</style>
