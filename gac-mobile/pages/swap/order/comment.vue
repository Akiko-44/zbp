<template>
  <AppView title="发表评论">
    <div class="Order-comment-page">
      <div v-for="(goodsItem, index) in data.orderGoodVOList"
           :key="index"
           v-if="goodsItem.isCommented == 1">
        <!--<ul class="comment-results van-hairline--bottom">
	        <li class="commodity-img"></li>
	        <li class="comment">
	          <i class="ico-good"></i>
	          <strong class="active">好评</strong>
	        </li>
	        <li class="comment">
	          <i class="ico-review"></i>
	          <strong>中评</strong>
	        </li>
	        <li class="comment">
	          <i class="ico-negative_comment"></i>
	          <strong>差评</strong>
	        </li>
	      </ul>-->
        <div class="skuGoods">
          <img :src="goodsItem.skuMainPic | setImg" />
          <span>{{goodsItem.skuName}}</span>
        </div>
        <van-cell-group>
          <van-field type="textarea"
                     v-model="goodsItem.content"
                     autosize
                     style="height:120px;"
                     placeholder="宝贝满足您的期待吗? 说说您的使用心得，分享给想买的他们吧。" />
        </van-cell-group>

        <van-cell>
          <template slot="title">
            <!-- <VUpload ref="uploader" 
	          	:limit=5 
	          	:imgs="goodsItem.imgs" 
	          	:props="{src: 'imgUrl'}"
	          	:extend-fields="[{imgType: 2}]"
	          	@success="img => { img.imgType = goodsItem.imgs.length <= 1 ? 1 : 2 }"/>-->
            <VUpload ref="picUploader"
                     :imgs="goodsItem.imgs"
                     :limit=5
                     :props="{src: 'imgUrl'}">
            </VUpload>
          </template>
        </van-cell>

        <div class="store-score-bar">
          <div class="store-score">
            <i class="ico-shop"></i>
            <strong>店铺评分</strong>
          </div>
          <ul>
            <li>
              <span>宝贝描述</span>
              <van-rate class="rate"
                        v-model="goodsItem.spmxxfScore" />
            </li>
            <li>
              <span>卖家服务</span>
              <van-rate class="rate"
                        v-model="goodsItem.mjfwtdScore" />
            </li>
            <li>
              <span>物流速度</span>
              <van-rate class="rate"
                        v-model="goodsItem.wlfhsdScore" />
            </li>
          </ul>
        </div>

        <!--<div class="anonymous-comment-bar">
	        <van-checkbox v-model="checked">匿名</van-checkbox>
	        <span class="tips">你写的评论会以匿名的形式展现</span>
	      </div>-->
      </div>
    </div>
    <van-button :loading="submiting"
                @click="submit"
                class="primary-btn fixed-btn"
                type="primary">
      发布
    </van-button>
  </AppView>
</template>

<script>
import VUpload from '~/components/common/upload'
import { setImg } from '~/utils/qiniu'
export default {
  components: { VUpload },
  data() {
    return {
      data: {},
      form: {
        orderId: this.$route.query.id,
        gcList: []
      },
      imgs: [],
      checked: true,
      submiting: false
    }
  },
  deactivated() {
    this.$destroy()
  },
  beforeMount() {
    this.$service('orderCommentGoodVOList', {
      resources: [this.$route.query.orderNumber]
    }).then(data => {
      this.data = data.data
      this.data.orderGoodVOList.map((item, index) => {
        this.$set(item, 'content', '')
        this.$set(item, 'spmxxfScore', 5)
        this.$set(item, 'mjfwtdScore', 5)
        this.$set(item, 'wlfhsdScore', 5)
        this.$set(item, 'gallerys', [])
        this.$set(item, 'imgs', [])
      })
	    /*this.data.orderGoodVOList.forEach(goodsItem => {
      	goodsItem.content = '',
    		goodsItem.spmxxfScore = 0,
    		goodsItem.mjfwtdScore = 0,
    		goodsItem.wlfhsdScore = 0,
    		goodsItem.gallerys = []
      	goodsItem.imgs = []
      })*/
    })
  },
  methods: {
    submit() {
      this.submiting = true
      this.data.orderGoodVOList.forEach(data => {
        let imgArr = []
        data.imgs.forEach(img => {
          imgArr.push(img.imgUrl)
        })
        if (data.content || data.spmxxfScore || data.mjfwtdScore || data.wlfhsdScore || imgArr.length) {
          this.form.gcList.push({
            content: data.content,
            spmxxfScore: data.spmxxfScore,
            mjfwtdScore: data.mjfwtdScore,
            wlfhsdScore: data.wlfhsdScore,
            goodsId: data.goodId,
            gallerys: imgArr
          })
        }
      })
      if (this.form.gcList.length == 0) {
        this.$toast('请填写评价')
        this.submiting = false
        return false
      }
      this.$service('orderCommentAdd', {
        data: this.form
      }).then(data => {
        // this.submiting = false
        this.$toast({ type: 'success', message: '评价成功' })
        if (this.$native.isApp()) {
          this.$native.goToHome()
        } else {
          this.$router.go(-1)
        }
      }).catch(() => {
        this.submiting = false
      })
    }
  }
}
</script>

<style lang="postcss">
.Order-comment-page {
  background: #f5f5f5;
  padding-bottom: 60px;
  & .comment-results {
    background: #fff;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    & li {
      font-size: 15px;
      & strong {
        margin-left: 8px;
        vertical-align: middle;
      }
    }
    & .commodity-img {
      width: 50px;
      height: 50px;
      background: url("https://o818xvhxo.qnssl.com/o_1cfc7utrqp6gktc3j5hf318lc9.jpg");
      background-size: 100% 100%;
    }
    & .comment {
      flex-grow: 1;
      text-align: center;
      & strong {
        color: #999;
      }
      & strong.active {
        color: #e34959;
      }
    }
  }
  & .store-score-bar {
    background: #fff;
    margin: 10px 0;
    font-size: 15px;
    color: #333;
    padding-bottom: 15px;
    & .store-score {
      padding: 0 20px;
      line-height: 50px;
      & i {
        margin-right: 10px;
      }
      & strong {
        vertical-align: middle;
      }
    }
    & ul li {
      padding: 0 30px;
      line-height: 30px;
      display: flex;
      & span {
        vertical-align: middle;
        margin-right: 20px;
      }
      & .rate svg {
        vertical-align: middle;
        line-height: 30px;
        margin: 0 5px;
      }
    }
  }
  & .anonymous-comment-bar {
    background: #fff;
    display: flex;
    line-height: 40px;
    position: relative;
    padding: 0 15px;
    & .tips {
      color: #ccc;
      font-size: 12px;
      vertical-align: middle;
      position: absolute;
      right: 15px;
    }
  }
}
.skuGoods {
  position: relative;
  background: #ffffff;
  padding: 3px 16px;
  padding-left: 36px;
  & img {
    width: 18px;
    height: auto;
    position: absolute;
    left: 16px;
    top: 3px;
  }
  & span {
    width: 260px;
    line-height: 1.2;
  }
}
</style>
