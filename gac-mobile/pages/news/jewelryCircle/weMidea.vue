<template>
  <AppView class="jewelry-circle">
    <sticky class="sticky">
      <HeaderModule
        title="个人主页"
        :info="info"
      />
    </sticky>
    <div class="media-info">
      <div class="media-backImg"></div>
      <div class="info-body">
        <div class="info-main">
          <img
            class="media-logo"
            :src="authorInfo.userLogo"
          >
          <div class="info-concern">
            <p class="media-name">{{ authorInfo.name }}</p>
            <div class="btn-box">
              <van-button
                color="#DF735A"
                v-if="!authorInfo.concern"
                @click.native="concern(1)"
              >+ 关注</van-button>
              <van-button
                color="#AAAAAA"
                v-else
                @click.native="concern(2)"
              >已关注</van-button>
            </div>
          </div>
        </div>
        <div
          class="info-explain"
          v-if="authorInfo.description"
        >
          <p class="explain">{{ authorInfo.description }}</p>
          <!-- <p
            class="explain-2"
            v-show="!showAllExplain"
          >这里是简介，最多展示两行，其余用...代替，同时增加向下展开按钮,这里是简介，最多展示两行，这里是简介，最多展示两行，其余用...代替，同时增加向下展开按钮,这里是简介，最多展示两 </p>
          <p
            class="more"
            v-show="!showAllExplain"
            @click="showAllExplain = true"
          >展开更多
            <van-icon name="arrow-down" />
          </p> -->
        </div>
        <div class="info-number">
          <van-row class="card-number">
            <van-col
              span="8"
              class="tc"
            >
              <span>TA发布的</span> <span class="number">{{authorInfo.contentNum}}</span>
            </van-col>
            <van-col
              span="8"
              class="tc"
            >
              <span>粉丝</span> <span class="number">{{authorInfo.fansNum}}</span>
            </van-col>
            <van-col
              span="8"
              class="tc"
            >
              <span>获赞与收藏</span> <span class="number">{{authorInfo.collectLikeNum}}</span>
            </van-col>
          </van-row>

        </div>
      </div>
    </div>
    <div class="goods-list">
      <AppList
        name="jewelryCircle"
        :query="query"
        :isDisabled="true"
        :getData="() => this.$service('jewelryCircle', { data: this.query })"
        ref="list"
        @loadData="loadData"
      >
        <template slot-scope="{ list }">
          <div
            class="list-box"
            ref="listBox"
            id="listBox"
          >
            <div
              class="list-item"
              v-for="(item, i) in list"
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
              />
            </div>
          </div>
        </template>
      </AppList>
    </div>

  </AppView>
</template>
<script>
import HeaderModule from './modules/header'
import Card from './modules/cardItem-media'
import { setImg } from '~/utils/qiniu'
import AppList from '~/components/common/list'
import sticky from '~/components/common/sticky'
import { getToken } from '~/utils/auth'

export default {
  data() {
    return {
      data: {},
      postData: {
        offset: 1,
        limit: 20,
      },
      query: {
        offset: 1,
        limit: 20,
        authorId: this.$route.query.id,
      },
      authorId: '',
      categoryId: '',
      titleShow: false,
      info: {},
      authorInfo: {},
      showAllExplain: false
    }
  },
  created() {
    this.authorId = this.$route.query.id
    this.getAuthorInfo()
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    setImg,
    // getAuthorInfo() {
    //   if (getToken()) {
    //   } else {
    //     console.log('未登录')
    //   }
    // },
    getAuthorInfo() {
      this.$service("jewelryCircleAuthor", {
        data: {
          authorId: this.authorId
        }
      }).then(result => {
        this.authorInfo = result.data
        this.info.title = this.authorInfo.name + '个人主页'
        this.info.link = location.href
        this.info.imgUrl = this.authorInfo.userLogo
        this.info.desc = this.authorInfo.description
      })
    },
    concern(concernType) {
      if (getToken()) {
        this.$service('jewelryCircleConcern', {
          data: {
            authorId: this.authorId,
            concernType
          }
        }).then(result => {
          this.authorInfo.concern = !this.authorInfo.concern
          if (concernType === 1) {
            this.authorInfo.fansNum++
          } else {
            this.authorInfo.fansNum--
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
    },
    back() {
      this.$router.push({
        name: 'news-jewelryCircle',
      })
    },
    loadData(data) {
      setTimeout(() => {
        this.waterfall('#listBox', 'list-item')
      }, 500);
    },
    waterfall(parent, pin) {
      var oParent = document.querySelector(parent)
      var aPin = this.getClassObj(oParent, pin);// 获取存储块框pin的数组aPin
      if (!aPin.length) {
        oParent.style.height = "0"
        return
      }
      var iPinW = aPin[0].offsetWidth;// 一个块框pin的宽
      var num = Math.floor(document.documentElement.clientWidth / iPinW);//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
      // oParent.style.cssText = 'width:' + iPinW * num + 'px;margin:0 auto;';//设置父级居中样式：定宽+自动水平外边距

      var pinHArr = [];//用于存储 每列中的所有块框相加的高度。a
      for (var i = 0; i < aPin.length; i++) {//遍历数组aPin的每个块框元素
        var pinH = aPin[i].offsetHeight;
        if (i < num) {
          pinHArr[i] = pinH; //第一行中的num个块框pin 先添加进数组pinHArr
        } else {
          var minH = Math.min.apply(null, pinHArr);//数组pinHArr中的最小值minH
          var minHIndex = this.getminHIndex(pinHArr, minH);
          aPin[i].style.position = 'absolute';//设置绝对位移
          aPin[i].style.top = minH + 'px';
          aPin[i].style.left = aPin[minHIndex].offsetLeft + 'px';
          //数组 最小高元素的高 + 添加上的aPin[i]块框高
          pinHArr[minHIndex] += aPin[i].offsetHeight;//更新添加了块框后的列高
        }
      }
      oParent.style.height = Math.max.apply(null, pinHArr) + "px"
    },

    /*
     *通过父级和子元素的class类 获取该同类子元素的数组
     */
    getClassObj(parent, className) {
      // console.log(parent)
      var obj = parent.getElementsByTagName('*');//获取 父级的所有子集
      var pinS = [];//创建一个数组 用于收集子元素
      for (var i = 0; i < obj.length; i++) {//遍历子元素、判断类别、压入数组
        if (obj[i].className == className) {
          pinS.push(obj[i]);
        }
      };
      return pinS;
    },
    /****
        *获取 pin高度 最小值的索引index
        */
    getminHIndex(arr, minH) {
      for (var i in arr) {
        if (arr[i] == minH) {
          return i;
        }
      }
    }
  },
  components: {
    HeaderModule,
    AppList,
    Card,
    sticky
  }
}
</script>

<style lang="postcss" scoped>
.home {
  background-color: var(--light-gray);
}
.jewelry-circle {
  & .media-info {
    & .media-backImg {
      width: 100%;
      height: 125px;
      background: url("../../../assets/images/media_bg.png");
      background-size: cover;
    }
    & .info-body {
      padding: 0 15px;
      background: #fff;
      & .media-logo {
        margin-top: -13px;
        width: 80px;
        height: 80px;
        border: 5px solid #fff;
        border-radius: 50%;
      }
      & .info-main {
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e5e5;
      }
      & .info-concern {
        display: inline-block;
        margin-left: 10px;
        vertical-align: top;
        & .media-name {
          margin: 15px 0 10px;
          font-size: 18px;
          font-weight: bold;
          color: #333;
        }
        & button {
          margin-right: 10px;
          width: 80px;
          height: 30px;
          line-height: 30px;
          border-radius: 5px;
        }
      }
      & .info-explain {
        padding: 15px 0;
        line-height: 18px;
        color: #666;
        font-size: 14px;
        border-bottom: 1px solid #e5e5e5;
        & .explain-2 {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        & .more {
          margin-top: 16px;
          text-align: center;
          color: #2d68c2;
          font-size: 14px;
          line-height: 14px;
          & i {
            vertical-align: middle;
          }
        }
      }
      & .info-number {
        line-height: 54px;
        color: #666;
        font-size: 13px;
        & span {
          vertical-align: middle;
        }
        & .number {
          margin-left: 4px;
          color: #333;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
  & .goods-list {
    padding: 10px;
    & .list-box {
      margin-left: -5px;
      margin-right: -5px;
      height: 265px;
      position: relative;
      & .list-item {
        padding-left: 5px;
        padding-right: 5px;
        width: 50%;
        float: left;
        box-sizing: border-box;
      }
    }
    & .head-title {
      padding: 0 20px;
      & h3 {
        color: #333333;
      }
      & .more {
        color: #999999;
        font-size: 12px;
      }
    }
  }
  & .margin {
    margin-bottom: 10px;
  }
  & .promotion {
    & > div {
      padding: 0 10px;
    }
  }
}
h2.subtitle {
  line-height: 40px;
  padding: 10px 10px 0;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  font-weight: 600;
  & span:first-child {
    font-weight: bold;
  }
  & span:last-child {
    color: #999;
    font-size: 14px;
    font-weight: 400;
  }
  & i:before {
    font-size: 10px;
  }
}
>>> .tab-title {
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-search {
  position: relative;
  padding: 10px 15px;
  width: 100%;
  /* background: white; */
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
</style>
