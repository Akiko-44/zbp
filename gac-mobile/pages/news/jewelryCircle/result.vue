<template>
  <AppView class="jewelry-circle">
    <sticky class="sticky">
      <HeaderModule
        title="珠宝圈"
        :info="info"
      />
    </sticky>
    <div class="app-search vertical">
      <div
        class="input-box"
        @click="$router.push({name: 'jewelrySearch-wordSearch',query: {type: 'jewelryCircle'}})"
      >
        <van-icon
          class="item-center"
          name="search"
          color="#999"
        />
        <span style="margin-left: 30px;color:#AAAAAB;">{{$route.query.searchWord || '输入关键字搜索'}}</span>
      </div>
    </div>

    <div class="goods-list">
      <AppList
        name="jewelryCircle"
        :query="query"
        :isDisabled="true"
        :postData="postData"
        :getData="() => this.$service('jewelryCircle', { data: this.query, params: this.postData })"
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
                :authorName="item.authorName"
                :authorLogo="item.authorLogo"
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
import TabsModule from './modules/tabs'
import Banner from './modules/banner'
import Card from './modules/cardItem'
import { setImg } from '~/utils/qiniu'
import AppList from '~/components/common/list'
import sticky from '~/components/common/sticky'

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
        columnId: '',
        keyword: this.$route.query.searchWord
      },
      categoryId: '',
      titleShow: false,
      info: {}
    }
  },
  mounted() {
    this.info.title = '珠宝圈'
    this.info.link = location.href
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    setImg,
    back() {
      this.$router.push({
        name: 'news-jewelryCircle',
      })
    },
    tabClick(item) {
      this.categoryId = item.id
    },
    toBannerUrl(url) {
      if (url) {
        location.href = url
      }
    },
    loadData(data) {
      if (data.total < 10) {
        document.getElementById('listBox').style.height = (256 * Math.ceil(data.total / 2)) + 'px'
      } else {
        if (data.current < data.total) {
          document.getElementById('listBox').style.height = (1300 * data.current) + 'px'

        } else {
          document.getElementById('listBox').style.height = (1300 * (data.current - 1)) + (256 * Math.ceil(data.records.length / 2)) + 'px'
        }
      }
    }
  },
  components: {
    HeaderModule,
    TabsModule,
    Banner,
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
  & .goods-list {
    padding: 10px;
    & .list-box {
      /* column-count: 2;
      column-gap: 10px; */
      margin-left: -5px;
      margin-right: -5px;
      height: 1300px;
      display: flex;
      flex-flow: column;
      flex-wrap: wrap;
      & .list-item {
        /* break-inside: avoid; */
        padding-left: 5px;
        padding-right: 5px;
        width: 50%;
        /* float: left; */
        box-sizing: border-box;
        /* flex: 1; */
        object-fit: none;
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
  & .banner {
    position: relative;
    height: 175px;
    /*margin-top: 45px;*/
    & .background {
      height: 100%;
      width: 100%;
    }
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
