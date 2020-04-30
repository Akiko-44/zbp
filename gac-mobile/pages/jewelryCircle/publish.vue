<template>
  <AppView
    class="publish"
    title="编辑"
  >
    <div class="container">
      <div class="content-box block">
        <div class="upload-box">
          <van-uploader
            accept="image/png,image/jpg,image/jpeg,image/gif,video/*"
            :before-read="beforeRead"
            :after-read="afterRead"
          >
            <template v-show="form.picList && form.picList.length && form.type === 1">
              <div
                class="forPreview_pic"
                v-for="(item, index) in form.picList"
                :key="index"
              >
                <img :src="item">
                <img
                  src="../../assets/images/icon/close.png"
                  class="delte-icon"
                  @click.stop="delBtn(index)"
                >
              </div>
            </template>
            <div
              class="forPreview_video"
              v-if="form.type === 2 && form.content"
            >
              <video :src="form.content"></video>
              <img
                src="../../assets/images/icon/close.png"
                class="delte-icon"
                @click.stop="delBtn"
              >
            </div>
            <div
              class="bg"
              v-if="showUploader"
            ></div>
          </van-uploader>
          <div class="tip text-dark-gray font-12 mt">图片支持jpg、jpeg、png、gif格式，9张以内；视频15s以内;</div>
        </div>
        <van-field
          v-model="form.title"
          placeholder="请填写标题"
          maxlength="20"
        />
        <van-field
          v-show="form.type === 1"
          v-model="form.content"
          rows="3"
          autosize
          type="textarea"
          placeholder="请填写正文"
          maxlength="300"
        />
      </div>
      <div class="link-box block">
        <van-cell
          title="# 选择话题："
          class="topic-cell"
          is-link
          :value="form.topicName"
          @click="toTopicList"
        />
        <van-cell
          is-link
          class="location-cell"
          :value="form.contentReleaseArea"
          @click="toAddressList"
        >
          <template slot="title">
            <img
              class="cell-icon"
              src="../../assets/images/icon/location.png"
            >
            <span>添加地址：</span>
          </template>
        </van-cell>
        <van-cell
          is-link
          class="goods-cell"
          @click="toGoodsList"
        >
          <template slot="title">
            <img
              class="cell-icon"
              src="../../assets/images/icon/relation.png"
            >
            <span>关联商品：</span>
          </template>
        </van-cell>
        <div
          class="relation-goods font-12"
          v-if="form.contentToGoodsDTOS && form.contentToGoodsDTOS.length"
        >
          <div
            v-for="(item,i) in form.contentToGoodsDTOS"
            :key="i"
          >
            <div
              class="merchant-info"
              d-flex
            >
              <img
                width="10"
                class="mr rounded-circle"
                :src="item.merchantLogo"
              >
              <span class="text-light-black">{{item.merchantName}}</span>
            </div>
            <div class="goods-box d-flex mt">
              <img :src="item.imgUrl">
              <div class="goods-info">
                <p class="goods-title text-hidden">{{item.goodsName}}</p>
                <p class="text-theme">￥{{item.price  || item.lowPrice}}</p>
              </div>
            </div>
          </div>

        </div>
        <div class="agreement input-row">
          <van-checkbox
            v-model="form.checked"
            shape="square"
          ></van-checkbox>
          <div
            class="border-input"
            style="border: none;margin-left: 10px;background: none;"
          >
            我已阅读和接受
            <a @click="
                    $router.push({
                      name: 'user-agreement-circle',
                      query: { data: JSON.stringify(form) }
                    })
                  ">《中宝平发帖协议》</a>
          </div>
        </div>
        <div class="btn-box">
          <van-button
            color="#DF735A"
            plain
            class="btn"
            @click="save('4')"
          >保存草稿箱</van-button>
          <van-button
            color="#DF735A"
            class="btn"
            @click="save('0')"
          >发布笔记</van-button>
        </div>
      </div>
    </div>
  </AppView>
</template>

<script>
import { setImg, customUpload } from "~/utils/qiniu"
import { Dialog } from "vant"
export default {
  data() {
    return {
      topicList: [],
      id: '',
      form: {
        checked: false,
        // 图文1，视频2
        type: 1,
        picList: [],
        thumbnail: '',
        title: '',
        content: '',
        topicId: undefined,
        topicName: '',
        contentReleaseArea: '',
        // 保存状态： 0待审核，4草稿
        contentStatus: '0',
        // 推荐类型：1商品（手机端只有商品类型）
        recommendType: '1',
        contentToGoodsDTOS: [],
        allowComment: 1
      },
      showUploader: true,
      editStatus: true
    }
  },
  activated() {
    if (this.$route.query.data) {
      Object.assign(this.form, JSON.parse(this.$route.query.data))
    } else if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getData()
    }
  },
  deactivated() {
    this.$destroy()
  },
  beforeRouteLeave(to, from, next) {
    this.onbeforeunloadHandler(to, next)
  },
  methods: {
    getData() {
      this.$service("getJewelryContent", { data: { id: this.id } }).then(
        result => {
          this.form = result.data
        }
      )
    },
    save(contentStatus) {
      if (contentStatus === '4') {
        if (!this.checkTitle()) {
          return false
        }
      } else {
        if (!this.checkTitle() || !this.checkImg() || !this.checkContent() || !this.checkChecked()) {
          return false
        }
      }
      this.form.contentStatus = contentStatus
      this.form.thumbnail = this.form.picList[0]
      this.form.contentReleaseArea = this.form.contentReleaseArea === '不显示地址' ? '' : this.form.contentReleaseArea
      this.$loading(this.$service('addJewelryContent', { data: this.form })).then(result => {
        this.editStatus = false
        this.$router.push({
          name: "jewelryCircle-weMidea",
          query: {
            type: 'mine',
            authorType: 1
          }
        });
      }).catch(() => { })
    },
    toTopicList() {
      this.$router.push({
        name: 'jewelryCircle-topicList',
        query: {
          data: JSON.stringify(this.form)
        }
      })
    },
    toAddressList() {
      // this.$router.push({
      //   name: 'jewelryCircle-addressList',
      //   query: {
      //     data: JSON.stringify(this.form)
      //   }
      // })
      this.$router.push({
        name: 'jewelrySearch-citySearch',
        query: {
          data: JSON.stringify(this.form)
        }
      })
    },
    toGoodsList() {
      this.$router.push({
        name: 'jewelryCircle-goodsList',
        query: {
          data: JSON.stringify(this.form)
        }
      })
    },
    beforeRead(file) {
      return new Promise((resolve, reject) => {
        if (file.type.indexOf('video') !== -1) {
          if (this.form.picList.length) {
            this.$toast("图片与视频不允许同时上传")
            reject()
          }
          const video = document.createElement('video')
          const fileurl = URL.createObjectURL(file)
          video.src = fileurl
          video.id = 'checktimevideo'
          video.style.display = 'none'
          document.body.appendChild(video)
          setTimeout(() => {
            if (video.duration > 15) {
              this.$toast("请上传15s以内视频")
              reject()
            } else {
              resolve()
            }
          }, 50)
        } else {
          if (file.size > 5 * 1024 * 1024) {
            this.$toast("图片大小不得超过5兆（M）")
            reject()
          } else {
            resolve()
          }
        }
      })
    },
    afterRead(file) {
      customUpload(file.file)
        .then(response => {
          const result = response.data
          if (file.file.type.indexOf('video') !== -1) {
            this.showUploader = false
            this.form.type = 2
            this.form.content = result.data.picUrl
          } else {
            this.form.type = 1
            this.form.picList.push(result.data.picUrl)
            if (this.form.picList.length >= 9) {
              this.showUploader = false
            }
          }
          this.form.picList = [...new Set(this.form.picList)]
        })
        .catch(() => {
          this.$toast({ type: "fail", message: "上传错误" });
        })
    },
    delBtn(index) {
      if (this.form.type === 2) {
        this.form.content = ''
        this.showUploader = true
      } else {
        this.form.picList.splice(index, 1)
        if (this.form.picList.length < 9) {
          this.showUploader = true
        }
      }
    },
    onbeforeunloadHandler(to, next) {
      let allowLeave = false
      allowLeave = (to.name.indexOf('topicList') !== -1) || (to.name.indexOf('citySearch') !== -1) || (to.name.indexOf('goodsList') !== -1) || (to.name.indexOf('agreement-circle') !== -1)
      if (this.editStatus && !allowLeave) {
        Dialog.confirm({
          title: "你将退出发布，是否保存草稿~",
          confirmButtonText: '保存',
          cancelButtonText: '不保存',
        })
          .then(() => {
            this.save('4')
            next(false)
          })
          .catch(() => {
            next()
          })
      } else {
        next()
      }

    },
    checkTitle() {
      if (!this.form.title) {
        this.$toast({
          message: '请填写标题'
        })
        return false
      } else {
        return true
      }
    },
    checkImg() {
      if (this.form.type === 1 && !this.form.picList.length) {
        this.$toast({
          message: '请选择图片'
        })
        return false
      } else {
        return true
      }
    },
    checkContent() {
      if (!this.form.content) {
        if (this.form.type === 1) {
          this.$toast({
            message: '请填写正文'
          })
          return false
        } else {
          this.$toast({
            message: '请选择视频'
          })
          return false
        }
      } else {
        return true
      }
    },
    checkChecked() {
      if (!this.form.checked) {
        this.$toast({
          message: '请同意中宝平发帖协议'
        })
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.container {
  padding: 10px;
  & .block {
    overflow: hidden;
    margin-bottom: 10px;
    background: #ffffff;
    border-radius: 6px;
  }
  & .upload-box {
    padding: 15px 0 10px 10px;
  }
  & .bg {
    display: inline-block;
    width: 105px;
    height: 105px;
    background: #f7f7f7 url(../../assets/images/icon_uploadadd.png) no-repeat
      center;
    background-size: 50px;
  }
  & .cell-icon {
    margin-top: 3px;
    margin-right: 5px;
    height: 19px;
    vertical-align: top;
  }
  & .topic-bar ul {
    padding: 15px;
    overflow-x: scroll;
    white-space: nowrap;
    border-bottom: 1px solid #f5f5f5;
    & li {
      display: inline-block;
      margin-right: 15px;
      padding: 10px;
      font-size: 12px;
      color: #aaaaac;
      background: #f5f5f5;
      border-radius: 4px;
      &.cur {
        color: white;
        background: #f4b1a4;
      }
    }
    & li:last-child {
      margin-right: 0;
    }
  }
  & .topic-cell {
    padding: 16px 10px 20px;
  }
  & .location-cell {
    padding: 20px 10px;
  }
  & .goods-cell {
    padding: 20px 10px 10px;
  }
  & .relation-goods {
    margin: 0 15px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 6px;
  }
  & .goods-box {
    & img {
      margin-right: 9px;
      width: 49px;
      height: 49px;
      border-radius: 3px;
    }
    & .goods-title {
      margin-top: 5px;
      margin-bottom: 15px;
      width: 223px;
    }
  }
  & .agreement {
    margin: 15px 0 20px 25px;
    font-size: 13px;
    color: #aaaaac;
    & a {
      color: #2d69c3;
    }
  }
  & .btn-box {
    padding-left: 25px;
    padding-bottom: 10px;
    & .btn {
      margin-right: 10px;
      width: 150px;
      height: 44px;
    }
  }
}
.forPreview_video {
  position: relative;
  z-index: 1;
  & video {
    width: 105px;
    height: 105px;
  }
  & .delte-icon {
    position: absolute;
    right: 4px;
    top: 4px;
    width: 15px;
    height: 15px;
  }
}
.forPreview_pic {
  display: inline-block;
  position: relative;
  margin-right: 8px;
  margin-bottom: 8px;
  z-index: 1;
  & img {
    width: 105px;
    height: 105px;
  }
  & .delte-icon {
    position: absolute;
    right: 4px;
    top: 4px;
    width: 15px;
    height: 15px;
  }
}
>>> .van-cell {
  padding: 10px;
  font-size: 17px;
}
>>> .van-cell__value {
  font-size: 13px;
  color: #aaaaac;
}
/* >>> .topic-cell .van-cell__value span {
  padding: 7px 17px;
  font-size: 12px;
  background: #f5f5f5;
} */
>>> textarea.van-field__control {
  padding: 10px;
  background: #f2f2f2;
  border-radius: 6px;
  font-size: 12px;
}
>>> .van-cell:not(:last-child)::after {
  left: 0;
}
>>> .goods-cell:not(:last-child)::after {
  border: 0;
}
</style>
