<template>
  <div class="app-goods-detail-comment">
    <div class="row-between item-center">
      <div class="item-center">
        <img class="user-pic"
             v-lazy="setImg(comment.userLogo, {w: 100})">
        <div class="user-info">
          <p>{{comment.userName.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")}}</p>
          <p class="gray date">{{comment.createTime}}</p>
        </div>
      </div>
      <div class="score">
        <van-rate v-model="comment.commentRank"
                  disabled-color="#D57E6AFF"
                  :size="12"
                  disabled />
      </div>
    </div>
    <div class="comment-text word-break">
      {{comment.content ? comment.content : '该用户未填写评论'}}
    </div>
    <div style="margin-left: 50px;">
      <van-row gutter="7">
        <van-col :key="i"
                 v-for="(img, i) in comment.gallerys"
                 class="comment-img"
                 span="8">
          <img v-lazy="setImg(img.imgUrl, 300)"
               @click="showPreviewImage(i)">
        </van-col>
      </van-row>
    </div>
    <template v-if="comment.replayCommentList.length>0">
      <!-- <template> -->
      <div class="row-between reply">
        <div class="reply-box">
          <i class="ico-comment_business"></i>
          <div class="comment-text word-break reply-content">
            {{comment.replayCommentList[0].reply}}
          </div>
        </div>
      </div>
    </template>
    <van-image-preview v-model="showPreview"
                       :start-position="startPosition"
                       :images="previewImages">
    </van-image-preview>
  </div>
</template>

<script>
import { setImg } from '~/utils/qiniu'

export default {
  data() {
    return {
      readonly: true,
      defaultLogo: require('~/assets/images/bfd.png'),
      showPreview: false,
      previewImages: [],
      startPosition: 0
    }
  },
  methods: {
    setImg,
    showPreviewImage(i) {
      this.showPreview = true
      this.startPosition = i
      this.previewImages = []
      this.comment.gallerys.map(item => {
        this.previewImages.push(item.imgUrl)
      })
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="postcss">
.app-goods-detail-comment {
  margin-top: 25px;
  font-size: 14px;
  color: #585859;
  & .user-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--light-gray);
  }
  & .user-info {
    margin-left: 10px;
    text-align: left;
  }
  & .date {
    margin-top: 8px;
    font-size: 12px;
  }
  & .comment-text {
    margin: 15px 0;
    line-height: 23px;
    font-size: 13px;
  }
  & .comment-img {
    height: 102px;
    line-height: 102px;
    & img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
  & .reply {
    & img {
      margin-top: 4px;
      width: 15px;
      height: 15px;
    }
  }
  & .reply-content {
    flex: 1;
    margin: 0 0 0 6px;
  }
  & .reply-box {
    display: flex;
    padding: 10px 7px 10px 10px;
    border-radius: 5px;
    background: #e9ebf1;
  }
  & .ico-comment_business {
    margin-top: 2px;
  }
}
</style>
