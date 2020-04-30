<template>
  <div class="app-card-item1">
    <span
      class="discount"
      :style="{'background': labelImg }"
      v-if="labelName"
    >{{labelName}}</span>
    <div
      v-if="!advert"
      class="card-img lazy-img-box"
      v-lazy:background-image="setImg(imgUrl, { w: 400 })"
      @click="toDetail(type,id)"
    ></div>
    <div
      v-if="advert"
      class="card-img lazy-img-box"
      v-lazy:background-image="setImg(imgUrl, { w: 400 })"
      @click="toAdvertDetail"
    ></div>
    <div
      class="card-info"
      v-if="!advert"
    >
      <h4
        class="card-title"
        @click="toDetail(type,id)"
      >{{title}}</h4>
      <p class="card-number">
        <img
          class="card-logo"
          :src="authorLogo"
          alt=""
        >
        <span class="card-name text-hidden">{{authorName}}</span>
        <span class="view-box">
          <img src="../../assets/images/icon/view-24.png">
          <span>{{ viewNumber }}</span>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { setImg } from '~/utils/qiniu'
import { getToken } from '~/utils/auth'

export default {
  props: {
    imgUrl: String,
    title: String,
    info: String,
    labelName: String,
    commentNumber: [String, Number],
    likeNumber: [String, Number],
    viewNumber: [String, Number],
    labelImg: String,
    type: [String, Number],
    id: [String, Number],
    isLike: [String, Number],
    authorName: String,
    authorLogo: String,
    linkTypeId: [String, Number],
    linkType: [String, Number],
    contentType: [String, Number],
    mobelUrl: String,
    advert: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showLike: false,
      likeNum: 0
    }
  },
  mounted() {
    this.showLike = (this.isLike === 1)
    this.likeNum = this.likeNumber
  },
  methods: {
    setImg,
    toDetail(type, id) {
      if (type === 1) {
        this.$router.push({ name: 'jewelryCircle-detail', query: { id: id } })
      } else {
        if (this.$native.isApp()) {
          this.$native.goToJewelryVideo(id);
        } else {
          this.$router.push({
            name: "jewelryCircle-videoDetail",
            query: { id: id }
          });
        }
      }
    },
    toAdvertDetail() {
      if (this.linkType === 1) {
        this.$router.push({
          name: "jewelry-work",
          query: {
            id: this.linkTypeId
          }
        })
      } else if (this.linkType === 2) {
        this.$router.push({
          name: "jewelry-detail",
          query: {
            id: this.linkTypeId
          }
        })
      } else if (this.linkType === 3) {
        if (this.contentType === 1) {
          this.$router.push({
            name: "jewelryCircle-detail",
            query: {
              id: this.linkTypeId
            }
          })
        } else {
          this.$router.push({
            name: "jewelryCircle-videoDetail",
            query: {
              id: this.linkTypeId
            }
          })
        }
      } else if (this.linkType === 4) {
        this.$router.push({
          name: "jewelryCircle-weMidea",
          query: {
            id: this.linkTypeId
          }
        })
      } else if (this.mobileUrl) {
        location.href = this.mobileUrl
      }
    },

    like(likeContentId, likeType, clickType, index) {
      if (getToken()) {
        this.$service('jewelryCircleLike', {
          data: {
            likeContentId, likeType, clickType
          }
        }).then(result => {
          if (clickType === 1) {
            this.likeNum++
            this.showLike = true
            // this.$toast('点赞成功')
          } else {
            this.likeNum--
            this.showLike = false
            // this.$toast('您已取消点赞')
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
    }
  }
}
</script>

<style lang="postcss" scoped>
.app-card-item1 {
  background-color: white;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1); /*no*/
  border-radius: 7px;
  position: relative;
  z-index: 0;
  overflow: hidden;
  margin-bottom: 10px;
  & .discount {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 10px;
    z-index: 2;
    padding: 0 7px;
    /* min-width: 30px; */
    height: 20px;
    text-align: center;
    line-height: 20px;
    color: #ffffff;
    font-size: 12px;
    background: #fb746e;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }
  & .card-img {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    width: 100%;
    height: 172px;
    background-color: var(--light-gray);
  }
  & .card-info {
    font-size: 12px;
    padding: 10px;
  }
  & .card-title {
    margin-bottom: 10px;
    line-height: 20px;
    font-size: 15px;
    color: #333;
  }

  & .card-number {
    position: relative;
    color: #aaa;
    line-height: 18px;
    & span {
      display: inline-block;
      vertical-align: middle;
    }
    & img {
      margin-right: 5px;
      width: auto;
      height: 10px;
      vertical-align: middle;
    }
    & .card-logo {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      vertical-align: middle;
    }
    & .card-name {
      display: inline-block;
      /* margin-left: 5px; */
      width: 80px;
      vertical-align: middle;
    }
    & .view-box {
      position: absolute;
      display: inline-block;
      line-height: 18px;
      top: 0;
      vertical-align: middle;
      width: 50px;
      text-align: right;
    }
  }
}
</style>
