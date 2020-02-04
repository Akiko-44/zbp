<template>
  <AppView
    class="Base-goods-detail"
    :class="{baseAssembleDetail: isAssemble}"
    title="商品详情"
    :clickLeft="onClickLeft"
  >
    <AppDetailImages
      :imgs="imgs"
      :videoUrl="work.videoUrl"
      :info="info"
      title='商品详情'
    />
    <template v-if="work.goodsDesc">
      <div
        class="promote-sale-box"
        v-if="isPromoteSale"
      >
        <div class="promote-sale">
          <div class="promote-price">
            <div
              class="now-price"
              v-if="work.lowSalePrice === work.highSalePrice"
            >
              ￥<span class="big-price">{{work.lowSalePrice.toFixed(2)}}</span>
            </div>
            <div
              class="now-price"
              v-else
            >
              ￥<span class="big-price">{{work.lowSalePrice.toFixed(2)}}</span>~<span class="big-price">{{work.highSalePrice.toFixed(2)}}</span>
            </div>
            <div class="origin-price">
              <del>￥<span class="middle-price">{{work.lowOriginalPrice.toFixed(2)}}</span>~<span class="middle-price">{{work.highOriginalPrice.toFixed(2)}}</span></del>
            </div>
          </div>
          <div class="end-count-down">
            <p>距结束仅剩</p>
            <p>{{countDown}}</p>
          </div>
        </div>
        <div class="referencr-price-box">
          <div class="reference-price">
            参考价格 ￥{{work.lowProposePrice.toFixed(2)}}~{{work.highProposePrice.toFixed(2)}}
          </div>
          <div
            class="reference"
            @click="showReference=true"
          >参考机构 ></div>
        </div>
      </div>
      <div class="detail-info jewelry-info">
        <div class="detail-label-box">
          <!-- <span class="detail-label brand-label">{{work.brandName}}</span> -->
          <!-- <span class="detail-label cat-label">{{work.catName}}</span> -->
          <span class="detail-label">{{work.keywords}}</span>
        </div>
        <div class="goods-name">
          <h4 class="design-concept">{{work.goodsName}}</h4>
          <div
            class="share-box"
            @click="$refs.share.show()"
          >
            <i class="ico-share-goods"></i>
            <span class="share">分享</span>
          </div>
        </div>
        <div
          class="goods-price clearfix"
          v-if="!isPromoteSale"
        >
          <div class="price">
            <div
              class="now-price"
              v-if="work.lowSalePrice === work.highSalePrice"
            >
              ￥<span class="big-price">{{work.lowSalePrice.toFixed(2)}}</span>
            </div>
            <div
              class="now-price"
              v-else
            >
              ￥<span class="big-price">{{work.lowSalePrice.toFixed(2)}}</span>~<span class="big-price">{{work.highSalePrice.toFixed(2)}}</span>
            </div>
            <div class="reference-price">
              参考价格 ￥{{work.lowProposePrice.toFixed(2)}}~{{work.highProposePrice.toFixed(2)}}
            </div>
          </div>
          <div
            class="reference"
            @click="showReference=true"
          >参考机构 ></div>
        </div>
        <div class="detail-row goods-else">
          <span class="deliver-address"><span class="label">发货地：</span>{{work.provinceName}} {{work.cityName}}</span>
          <span>
            <span class="separate">|</span>
            <span
              class="label"
              v-if="work.freightType == 0"
            >运费：免运费</span>
            <span
              class="label"
              v-else-if="work.freightType == 1"
            >运费：到付</span>
            <span
              class="label"
              v-else
            >运费：￥{{work.freightPrice.toFixed(2)}}</span>
          </span>
          <span style="text-align:right;"><span class="label">销量：</span>{{work.salesCount}}</span>
        </div>
      </div>

      <div class="jewelry-info">
        <!--title="保障：正品保证 · 七天无理由退货"-->
        <van-cell
          :title="work.guarantee"
          title-style="flex:2;"
          value="查看详情"
          is-link
          @click="toSecurity"
        />
        <goodSku
          @success="confirmSuccess"
          :detail="work"
          :isAssemble="isAssemble"
          :isPromote="isPromoteSale"
          ref="mychild"
        />
      </div>

      <div
        class="assemble-list"
        v-if="isAssemble && work.groupUserList.length"
      >
        <div class="title">
          <span class="title-name">{{work.groupSuccessPersonNum}}人已拼团成功</span>
          <!-- <span class="more">查看更多 ></span> -->
        </div>
        <div class="body">
          <van-swipe
            class="assemble-swipe"
            :touchable="false"
            :autoplay="3000"
            :show-indicators="false"
            vertical
          >
            <van-swipe-item
              v-for="(item,i) in assembleSwipeList"
              :key="i"
            >
              <div
                class="assemble-item"
                v-for="(subItem, subIndex) in item"
                :key="subIndex"
              >
                <img
                  v-if="subItem"
                  class="user-logo"
                  :src="subItem.userLogo ? subItem.userLogo : 'http://image.gacjc.com/work_1KyFQUiR6eQkt3u_284_284.png'"
                />
                <span
                  v-if="subItem"
                  class="user-name"
                >{{subItem.nickname}}</span>
                <span
                  v-if="subItem"
                  class="assemble-time"
                >{{subItem.groupTime}}</span>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>

      <div
        class="detail-merchant"
        @click="linkTo(work)"
      >
        <div class="merchant-store">
          <img
            class="merchant-logo"
            :src="work.shopScore.logo"
          />
          <div class="merchant-info">
            <h4 class="merchant-name">{{work.merchantName}}</h4>
            <div class="score">
              <span>综合评分</span>
              <van-rate
                class="score-rate"
                v-model="work.shopScore.multipleScore"
                disabled-color="#D57E6AFF"
                :size="12"
                disabled
              />
              <span>{{work.shopScore.multipleScore}}</span>
            </div>
          </div>
          <div class="enter">进店逛逛</div>
        </div>

        <div class="rate">
          <span>宝贝描述 {{work.shopScore.spmxxfWholeScore.toFixed(1) || 5.0}}</span>
          <span style="text-align:center;">卖家服务 {{work.shopScore.mjfwtdWholeScore.toFixed(1) || 5.0}}</span>
          <span style="text-align:right;">物流速度 {{work.shopScore.wlfhsdWholeScore.toFixed(1) || 5.0}}</span>
        </div>
      </div>

      <div class="detail-description">
        <van-tabs
          sticky
          :offset-top="isApp ? 0 : 44"
          v-model="tabIndex"
          :line-width="58"
          :line-height="2"
        >
          <van-tab title="商品描述">
            <div class="detail-describe">
              <div
                class="word-break"
                v-lazy-container="{ selector: 'img' }"
                v-html="lazyImgHtml(work.goodsDesc)"
              >
              </div>
            </div>
          </van-tab>
          <van-tab :title="commentTitle">
            <div class="detail-comments">
              <!-- <div class="filter-condition">
                <van-tag plain
                         :class="{commentActive:commentActive===0}"
                         @click.native="getAllComments">全部</van-tag>
                <van-tag plain
                         :class="{commentActive:commentActive===1}"
                         @click.native="getNewComments">最新</van-tag>
                <van-tag plain
                         :class="{commentActive:commentActive===2}"
                         @click.native="getPicComments">有图</van-tag>
              </div> -->
              <AppDetailComment
                v-for="(comment, index) in comments"
                :key="index"
                :comment="comment"
              />
              <p
                class="text-align-center"
                style="margin: 10px 0;color: #999;"
                v-if="!comments.length"
              >我们是有底线的平台</p>
            </div>
          </van-tab>
          <van-tab title="售后保障">
            <div class="security">
              <h3>权利声明</h3>
              <p>中宝协珠宝店内所有商品信息、客户评价、商品咨询、网友讨论等内容，是中宝协重要的经营资源，未经许可，禁止非法转载使用。</p>
              <p>注：本站商品信息均来自于合作方，其真实性、准确性和合法性由信息拥有者（合作方）负责。本站不提供任何保证，并不承担任何法律责任。</p>
              <h3>中宝协承诺</h3>
              <p>中宝协平台卖家销售并发货的商品，由平台卖家提供发票和相应的售后服务。请您放心购买！</p>
              <p>注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！</p>
              <h3>正品行货</h3>
              <p>中宝协商城向您保证所售商品均为正品行货，由商家开具机打发票或电子发票。</p>
            </div>
          </van-tab>
        </van-tabs>
      </div>

      <div
        class="assemble-info"
        v-if="isAssemble"
      >
        <img
          class="user-logo"
          :src="userLogo"
        />
        <span class="unknown">?</span>
        <span class="assemble-description">二人成团，系统自动组团</span>
      </div>

      <div class="app-goods-action-space">
        <van-goods-action>
          <van-goods-action-icon
            icon="wap-home"
            text="店铺"
            @click="linkTo(work)"
          />
          <van-goods-action-icon
            :icon="liked ? 'like' : 'like-o'"
            text="收藏"
            @click="collect"
          />
          <van-goods-action-icon
            icon="chat-o"
            text="客服"
            @click="xiaoneng"
          />

          <a
            class="origin-buy van-button van-button--default van-button--normal van-button--bottom-action van-goods-action-button"
            v-if="isAssemble"
            @click="originBuy"
          >
            <span
              class="price"
              style="color: white;"
            >￥ {{work.lowOriginalPrice.toFixed(2)}}</span>
            <span style="color: white;">单独购买</span>
            <span></span>
          </a>
          <a
            class="assemble-buy van-button van-button--primary van-button--normal van-button--bottom-action van-goods-action-button"
            v-if="isAssemble"
            @click="assembleBuy"
          >
            <span
              class="price"
              style="color: white;"
            >￥ {{work.lowSalePrice.toFixed(2)}}</span>
            <span style="color: white;">我要拼团</span>
            <span></span>
          </a>
          <van-goods-action-button
            v-if="!isAssemble && work.hasMerNo"
            text="加入购物车"
            @click="addCart"
            class="addCart"
          />
          <van-goods-action-button
            v-if="!isAssemble && work.hasMerNo"
            text="立即购买"
            @click="buy"
            primary
            class="buy"
          />
          <van-goods-action-button
            v-if="!isAssemble && !work.hasMerNo"
            class="waiting"
            disabled
            text="备货中，敬请期待"
          />
        </van-goods-action>
      </div>

      <van-popup
        class="reference-list"
        v-model="showReference"
        position="right"
      >
        <h3 class="title">参考价格提供机构</h3>
        <van-list>
          <van-cell title="黄金/K金及首饰专委会" />
          <van-cell title="银饰及首饰专委会" />
          <van-cell title="天然钻石及首饰专委会" />
          <van-cell title="翡翠专委会" />
          <van-cell title="和田玉专委会" />
          <van-cell title="彩色宝石专委会" />
          <van-cell title="珍珠专委会" />
          <van-cell title="水晶专委会" />
          <van-cell title="琥珀专委会" />
          <van-cell title="黄龙玉专委会" />
          <van-cell title="绿松石专委会" />
          <van-cell title="玛瑙专委会" />
          <van-cell title="印章石专委会" />
          <van-cell title="其他玉石及首饰专委会" />
          <van-cell title="贵金属（除黄金、K金、白银）首饰专委会" />
          <van-cell title="有机宝石（除珍珠、琥珀）专委会" />
          <van-cell title="培育钻石及首饰专委会" />
        </van-list>
      </van-popup>
      <Share
        :info="info"
        ref="share"
      />
    </template>
  </AppView>
</template>

<script>
import goodSku from './goodSku'
import AppDetailComment from '~/components/swap/goodsDetail/jewelryCommentItem'
import AppDetailImages from '~/components/swap/goodsDetail/jewelrySwipe'
import Share from '~/components/common/share'
import { lazyImgHtml } from '~/utils/filters'
import { getToken } from '~/utils/auth'
import { setImg } from '~/utils/qiniu'

export default {
  components: {
    AppDetailImages,
    AppDetailComment,
    goodSku,
    Share
  },
  head() {
    return {
      title: '商品详情'
    }
  },
  data() {
    return {
      work: {
        picList: []
      },
      // 拼团
      isAssemble: false,
      // 促销
      isPromoteSale: false,
      timeOut: null,
      countDown: '',
      assembleSwipeList: [],
      showReference: false,
      userLogo: 'http://image.gacjc.com/work_1KyFQUiR6eQkt3u_284_284.png',
      score: 3.8,
      skuObj: {},
      imgs: [],
      info: {},
      designerInfo: {},
      liked: false,
      collectLoading: false,
      addLoading: false,
      productDetailShow: false,
      comments: [],
      orderToDetail: false,
      tabIndex: 0,
      commentActive: 0,
      commentTitle: '评论',
      tabs: [{
        name: '商品描述'
      }, {
        name: '商品参数'
      }, {
        name: '用户评论'
      }],
      isApp: false
    }
  },
  beforeMount() {
    //	判断微信和app
    if (this.$native.isApp() || window.navigator.userAgent.includes('MicroMessenger')) {
      this.isApp = true
    }
    this.$loading(this.$service('jewelryInfo', {
      data: {
        goodsId: this.$route.query.id
      }
    }))
      .then(result => {
        this.work = result.data
        this.work.genuine = this.work.genuine === 0 ? '正品保证' : ''
        this.work.restore = this.work.restore === 1 ? '七天无理由退货' : ''
        this.work.guarantee = "保障："
        if (this.work.genuine && this.work.restore) {
          this.work.guarantee += this.work.genuine + ' · ' + this.work.restore
        } else if (this.work.genuine) {
          this.work.guarantee += this.work.genuine
        } else if (this.work.restore) {
          this.work.guarantee += this.work.restore
        }
        this.info.title = this.work.goodsName
        this.info.link = location.href
        this.info.imgUrl = this.work.goodsGallerys[0].imgUrl
        this.info.desc = this.work.designIdea
        if (getToken()) {
          // 分享出去的链接加上userId 为之后注册时添加
          if (this.info.link.includes('&userId')) {
            this.info.link = this.info.link.substring(0, this.info.link.indexOf('&userId')) + `&userId=${result.data.id}`
          } else {
            this.info.link += `&userId=${result.data.id}`
          }
        }
        this.work.goodsDesc = this.work.goodsDesc.replace(/pa95ui71l.bkt.clouddn/g, 'image.gacjc')
        this.imgs = this.work.goodsGallerys.map(item => {
          return {
            imgUrl: item.imgUrl
          }
        })
        if (this.work.cityName.includes(this.work.provinceName)) {
          this.work.provinceName = ''
        }
        if (this.work.goodsType === 1) {
          this.isAssemble = true
          for (let i = 0; i < this.work.groupUserList.length; i += 2) {
            this.assembleSwipeList.push([this.work.groupUserList[i], this.work.groupUserList[i + 1]])
          }
          if (getToken()) {
            this.$loading(this.$service('userInfo')).then(result => {
              this.userLogo = result.data.userLogo ? result.data.userLogo : 'http://image.gacjc.com/work_1KyFQUiR6eQkt3u_284_284.png'
            })
          }
        } else if (this.work.goodsType === 2) {
          this.isPromoteSale = true
          this.getCountDown()
        }
      })
      .then(this.success)

    if (getToken()) {
      this.$loading(this.$service('userCollectCheck', {
        resources: [this.$route.query.id, 1]
      }))
        .then(result => {
          this.liked = !result.data.goodsCheck
        })
    }
    if (this.$route.query.orderToDetail) {
      this.orderToDetail = true
    }
    if (this.$native.isApp()) {
      this.$native.getTitle('商品详情')
    }
  },
  deactivated() {
    this.$destroy()
  },
  beforeDestroy() {
    if (document.querySelector("video")) {
      document.querySelector("video").pause()
    }
    this.timeOut && clearInterval(this.timeOut)
  },
  methods: {
    setImg,
    lazyImgHtml,
    onClickLeft() {
      this.$router.go(-1)
    },
    swipeClick(item) { },
    confirmSuccess(skuObj) {
      this.skuObj = skuObj
    },
    xiaoneng() {
      if (this.$native.isApp()) {
        this.$native.goToXiaoNeng({
          keFuId: this.work.keFuId,
          id: this.$route.query.id
        })
      } else {
        NTKF.im_openInPageChat(this.work.keFuId)
      }
    },
    async success(detail) {
      const [comments] = await Promise.all([
        // 评论数据
        this.$service('jewelryComment', {
          resources: [this.$route.query.id, 1]
        })
          .then(result => {
            this.commentTitle = result.data.total ?
              this.commentTitle + '(' + result.data.total + ')' :
              this.commentTitle
            return result.data ? result.data.records : []
          })
          .catch(() => ([]))
      ])
      this.comments = comments
      for (var i = 0; i < this.comments.length; i++) {
        for (var j = 0; j < this.comments[i].gallerys.length; j++) {
          if (this.comments[i].gallerys[j].imgUrl.indexOf('http://') == -1) {
            this.comments[i].gallerys[j].imgUrl = 'http://image.gacjc.com/' + this.comments[i].gallerys[j].imgUrl
          }
          // this.comments[i].gallerys[j] = this.comments[i].gallerys[j].imgUrl
        }
        if (this.comments[i].userLogo == '') {
          this.comments[i].userLogo = 'http://image.gacjc.com/work_1KyFQUiR6eQkt3u_284_284.png'
        } else if (this.comments[i].userLogo.indexOf('http://') == -1) {
          this.comments[i].userLogo = 'http://image.gacjc.com/' + this.comments[i].userLogo
        }
      }
    },
    collect() {
      if (this.collectLoading) return
      this.collectLoading = true
      const serviceName = !this.liked ? 'userCollect' : 'userDeleteCollect'
      this.$service(serviceName, {
        resources: [this.work.id, 1]
      }).then(() => {
        this.collectLoading = false
        this.liked = !this.liked
        if (this.liked) {
          this.$toast('收藏成功')
        } else {
          this.$toast('您已取消收藏')
        }

      }).catch(() => {
        this.collectLoading = false
      })
    },
    addCart() {
      if (getToken()) {
        this.$refs.mychild.show = true
        if (!this.skuObj.id) {
          this.$toast('请选择规格')
          return
        }
      } else {
        if (this.$native.isApp()) {
          this.$native.goToLogin()
        } else {
          // this.$router.push({ name: 'user-login', query: { from: location.origin + this.$route.fullPath } })
          this.$router.push({
            name: 'user-login'
          })
          localStorage.setItem('fromUrl', location.origin + this.$route.fullPath)
        }
      }
      //    if (this.addLoading) return
      //    this.addLoading = true

      /*this.$loading(this.$service('orderAddCart', {
        data: {
          goodsId: this.work.id,
          goodsSku: this.skuObj.id,
          number: this.skuObj.num,
          goodsSource: this.work.goodsSource
        }
      }), '添加中').then(() => {
        this.$toast({ type: 'success', message: '添加成功' })
        this.addLoading = false
      }).catch(() => {
        this.addLoading = false
      })*/
    },
    buy() {
      if (getToken()) {
        this.$refs.mychild.show = true
        if (!this.skuObj.id) {
          this.$toast('请选择规格')
          return
        }
        /*this.$router.push({
          name: 'swap-order-confirm',
          query: {
            id: this.work.id,
            skuId: this.skuObj.id,
            from: this.$route.name
          }
        })*/
      } else {
        if (this.$native.isApp()) {
          this.$native.goToLogin()
        } else {
          // this.$router.push({ name: 'user-login', query: { from: location.origin + this.$route.fullPath } })
          this.$router.push({
            name: 'user-login'
          })
          localStorage.setItem('fromUrl', location.origin + this.$route.fullPath)
        }
      }
    },
    originBuy() {
      this.$refs.mychild.isAssemblePrice = false
      this.buy()
    },
    assembleBuy() {
      this.$refs.mychild.isAssemblePrice = true
      this.buy()
    },
    getCountDown() {
      let finishTime = +new Date(Date.parse(this.work.finishTime.replace(/-/g, "/")))
      // finishTime += 24 * 7 * 60 * 60 * 1000
      let diferentTime = this.leftTimer(finishTime - new Date())
      this.countDown = diferentTime
      this.timeOut = setInterval(() => {
        let finishTime = +new Date(Date.parse(this.work.finishTime.replace(/-/g, "/")))
        // finishTime += 24 * 7 * 60 * 60 * 1000
        let diferentTime = this.leftTimer(finishTime - new Date())
        this.countDown = diferentTime
      }, 1000)
    },
    getAllComments() {
      this.commentActive = 0
    },
    getNewComments() {
      this.commentActive = 1
    },
    getPicComments() {
      this.commentActive = 2
    },
    linkTo(work) {
      if (this.$native.isApp()) {
        this.$native.goToMerchant(work.merid);
      } else {
        this.$router.push({
          name: 'jewelry-detail',
          query: {
            'id': work.merid
          }
        })
      }
    },
    toSecurity() {
      this.tabIndex = 2
      setTimeout(() => {
        document.body.scrollIntoView(false)
      }, 200);
    },
    leftTimer(leftTime) {
      var text = "";
      var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
      var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
      var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟
      var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数
      if (seconds < 0) {
        this.isPromoteSale = false
      }
      days = this.checkTime(days)
      hours = this.checkTime(hours)
      minutes = this.checkTime(minutes)
      seconds = this.checkTime(seconds)
      if (days >= 0 || hours >= 0 || minutes >= 0 || seconds >= 0) {
        text = days + "天" + hours + "小时" + minutes + "分" + seconds + "秒"
      }
      return text
    },
    checkTime(i) { //将0-9的数字前面加上0，例1变为01
      if (i < 10) {
        i = "0" + i
      }
      return i
    }
  }
}
</script>

<style>
@import "../../../assets/css/swap/goodsDetail.css";
</style>

<style lang="postcss" scoped>
.baseAssembleDetail {
  padding-bottom: 40px;
}

.case {
  display: inline-block;
  width: 35px;
  height: 20px;
  line-height: 20px;
  font-size: 10px;
  color: #ffffff;
  text-align: center;
  background: #ff0000;
  border-radius: 10px;
}

.promote-sale-box {
  margin-bottom: 6px;
  & .promote-sale {
    padding: 5px 10px;
    height: 52px;
    color: #fff;
    background: #fb746eff;
    & .promote-price {
      float: left;
      & .now-price {
        padding: 5px 0 10px;
        font-size: 15px;
        & .big-price {
          font-size: 18px;
        }
      }
      & .origin-price {
        font-size: 12px;
        color: #f4b1a4ff;
        & .middle-price {
          font-size: 14px;
        }
      }
    }
    & .end-count-down {
      float: right;
      padding-left: 10px;
      width: 140px;
      line-height: 26px;
      font-size: 13px;
      border-left: 1px solid #f4b1a4ff;
    }
  }
  & .referencr-price-box {
    padding: 0 10px;
    overflow: hidden;
    font-size: 13px;
    color: #585859ff;
    line-height: 30px;
    background: #fff;
    & .reference-price {
      float: left;
    }
    & .reference {
      float: right;
      font-size: 15px;
    }
  }
}

.detail-info {
  padding: 10px 10px 0;
}

.jewelry-info {
  margin-bottom: 10px;
}

.detail-label-box {
  & .detail-label {
    display: inline-block;
    padding: 0 5px;
    margin: 0 10px 10px 0;
    line-height: 15px;
    font-size: 12px;
    color: #939292ff;
    border-radius: 3px;
    background: #e9ebf1ff;
  }
  & .brand-label {
    color: #fff;
    background: #d57e6aff;
  }
  & .cat-label {
    color: #fff;
    background: #f4b1a4ff;
  }
}

.goods-name {
  height: 50px;
  & .share-box {
    float: right;
    padding-left: 12px;
    border-left: 1px solid #e9ebf1ff;
    & .ico-share-goods {
      margin-bottom: 4px;
      margin-left: 3px;
    }
    & .share {
      display: block;
      font-size: 11px;
      color: #919191ff;
    }
  }
  & .design-concept {
    float: left;
    width: 300px;
    line-height: 23px;
    color: #26273cff;
    font-size: 15px;
  }
}

.goods-price {
  position: relative;
  & .price {
    & .now-price {
      margin-bottom: 9px;
      font-size: 15px;
      color: #fb746eff;
      & .big-price {
        font-size: 18px;
      }
    }
    & .reference-price {
      font-size: 13px;
      color: #aaaaabff;
    }
  }
  & .reference {
    position: absolute;
    right: -10px;
    bottom: 0;
    width: 92px;
    text-align: center;
    line-height: 32px;
    font-size: 15px;
    color: #585859ff;
    background: #e9ebf1ff;
    border-radius: 16px 0 0 16px;
  }
}

.goods-else {
  display: flex;
  color: #aaaaabff;
  font-size: 15px;
  border-top: 1px solid #e9ebf1ff;
  & span {
    flex: 1;
  }
  & .deliver-address {
    color: #515151ff;
    font-size: 14px;
  }
  & .freight-price {
    border-left: 1px solid #e9ebf1ff;
  }
  & .separate {
    margin-right: 10px;
  }
}

.assemble-list {
  margin-bottom: 10px;
  background: #fff;
  & .title {
    padding: 0 10px;
    height: 37px;
    line-height: 37px;
    font-size: 15px;
    border-bottom: 1px solid #e9ebf1ff;
    & .more {
      margin-left: auto;
      float: right;
      font-size: 13px;
      color: #aaaaabff;
    }
  }
  & .body {
    overflow: hidden;
    padding: 15px 10px 8px;
    height: 102px;
    & .assemble-swipe {
      height: 100%;
    }
    & .assemble-item {
      margin-bottom: 15px;
      line-height: 36px;
      display: flex;
      font-size: 15px;
      color: #585859ff;
      & .user-logo {
        margin-right: 10px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
      & .assemble-time {
        margin-left: auto;
        color: #fb746eff;
        font-size: 13px;
      }
    }
  }
}

.detail-merchant {
  margin-bottom: 0;
  padding: 12px 10px;
  height: 68px;
  & .merchant-store {
    overflow: hidden;
    & .merchant-logo {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
    & .merchant-info {
      float: left;
      margin: 0 0 0 10px;
      & .merchant-name {
        float: none;
        margin: 2px 0 8px;
        color: #26273cff;
      }
      & .score {
        color: #585859ff;
        font-size: 13px;
        & .score-rate {
          display: inline-block;
          margin: 0 5px;
        }
      }
    }
    & .enter {
      float: right;
      margin-top: 3px;
      width: 69px;
      height: 30px;
      line-height: 30px;
      color: #585859ff;
      background: #fff;
      border: 1px solid #aaaaabff;
      border-radius: 5px;
    }
  }
  & .rate {
    margin: 0;
    padding: 10px 10px 0;
  }
}

.detail-description {
  background: #fff;
}

.assemble-info {
  z-index: 100;
  position: fixed;
  bottom: 50px;
  padding: 8px 10px;
  width: 100%;
  line-height: 25px;
  color: #959595;
  /* opacity: 0.6; */
  background: #fff2ef;
  & .user-logo {
    position: relative;
    z-index: 2;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    vertical-align: middle;
  }
  & .unknown {
    position: relative;
    display: inline-block;
    z-index: 1;
    margin-left: -10px;
    width: 25px;
    text-align: center;
    vertical-align: middle;
    line-height: 25px;
    background: #fff;
    border: 1px dashed #fff4b1a4;
    border-radius: 50%;
  }
  & .assemble-description {
    margin-left: 5px;
  }
}

.detail-comments .van-tag {
  margin: 20px 10px 0 0;
  width: 44px;
  text-align: center;
  line-height: 26px;
}

.detail-comments .van-tag--plain {
  background: #fff;
}

.detail-comments .van-tag--plain.commentActive {
  background: #d67d6bff;
  color: #fff;
}

.reference-list {
  height: 100%;
  & .title {
    padding: 15px;
    color: #26273cff;
    font-size: 17px;
  }
  & .van-cell {
    color: #aaaaabff;
  }
}

/deep/ .van-tabs__line {
  background-color: #d67d6bff;
}

/deep/ .van-tab.van-tab--active span {
  color: #d67d6bff;
}

.van-goods-action .van-goods-action-button--first {
  background-color: #e1c584ff;
}

.van-goods-action .van-goods-action-button--last {
  background-color: #d67d6bff;
}

.van-goods-action-mini-btn {
  min-width: 46px;
}

.van-goods-action .van-button.origin-buy,
.van-button.assemble-buy {
  background-color: #f4b1a4;
  line-height: 12px;
  font-size: 15px;
  border-radius: 0;
  height: 50px !important;
  & span {
    display: inline-block;
  }
  & span.price {
    display: block;
    margin: 10px 0 6px;
  }
}

.van-goods-action .assemble-buy.van-button--primary {
  background-color: #d67d6bff;
  border-radius: 0;
  height: 50px !important;
}

>>> .waiting.van-goods-action-button {
  margin-bottom: 10px;
  background-color: #aaaaab;
}

.addCart {
  background: #333;
  color: white;
  border-radius: 0;
  height: 50px !important;
}

.buy {
  background: #c2a374;
  color: white;
  border-radius: 0;
  height: 50px !important;
  margin-right: 0px !important;
  margin-left: 0px !important;
}

.detail-describe {
  & /deep/ p {
    color: #585858;
    line-height: 1.5em;
  }
  & /deep/ div,
  & /deep/ ul,
  & /deep/ li,
  & /deep/ h2 {
    max-width: 345px !important;
    height: auto !important;
    padding: 0 !important;
    margin: 0 !important;
    position: static !important;
    line-height: 1.5em !important;
  }
  & /deep/ img {
    max-width: 345px !important;
    height: auto !important;
    margin: 0;
    display: block;
  }
  & /deep/ strong {
    font-weight: bold;
  }
  & /deep/ a {
    word-break: break-all;
  }
}
/deep/ .van-rate__item {
  display: inline-block;
}
</style>
