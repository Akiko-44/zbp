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
                  color="#D57E6AFF"
                  :size="12"
                  readonly />
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
          <img v-lazy="setImg(img, 300)"
               @click="showPreviewImage(i)">
        </van-col>
      </van-row>
    </div>
    <template v-if="comment.replayCommentList.length>0">
      <div class="row-between item-center reply">
        <div class="item-center">
          <img class="user-pic"
               :src="defaultLogo | setImg({ w: 100 })">
          <div class="user-info">
            <p>商家回复：</p>
          </div>
        </div>
      </div>
      <div class="comment-text word-break reply-content">
        {{comment.replayCommentList[0].content}}
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
      this.previewImages = this.comment.gallerys
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
    margin: 15px 0 15px 50px;
    line-height: 20px;
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
    margin-top: 10px;
    font-size: 12px;
    color: #666666;
    & img {
      width: 15px;
      height: 15px;
    }
  }
  & .reply-content {
    margin: 5px 0;
    color: #999999;
    font-size: 12px;
  }
}
</style>
