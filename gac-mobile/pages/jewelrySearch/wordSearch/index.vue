<template>
  <AppView class="search">
    <div class="search-box">
      <van-icon
        name="arrow-left"
        class="search-left"
        @click.native="onCancel"
      />
      <van-search
        class="search-right"
        placeholder="输入关键词搜索"
        v-model.trim="value"
        shape="round"
        show-action
        autofocus
        @cancel="onCancel"
      >
        <div slot="left-icon">
          <img
            src="../../../assets/images/icon/search.png"
            width="13"
          >
        </div>
        <div
          slot="action"
          class="search-btn"
          @click="onSearch"
        >搜索
        </div>
      </van-search>
    </div>
    <van-tabs
      v-model="active"
      v-if="type && type!=='jewelryCircle'"
    >
      <van-tab title="店铺">
        <search-list
          :hotList="hotList"
          :historyList="historyList"
          @hotSearch="hotSearch"
          @deleteHistory="deleteHistory"
        ></search-list>
      </van-tab>
      <van-tab title="商品">
        <search-list
          :hotList="hotList"
          :historyList="historyList"
          @hotSearch="hotSearch"
          @deleteHistory="deleteHistory"
        ></search-list>
      </van-tab>
    </van-tabs>
    <search-list
      v-if="type==='jewelryCircle'"
      :hotList="hotList"
      :historyList="historyList"
      :topicList="topicList"
      @hotSearch="hotSearch"
      @deleteHistory="deleteHistory"
      @topicSearch="topicSearch"
    ></search-list>
  </AppView>
</template>

<script>
import { getToken } from '~/utils/auth'
import searchList from "./searchList";
export default {
  components: {
    searchList
  },
  data() {
    return {
      value: '',
      type: '',
      active: '1',
      searchType: undefined,
      localName: '',
      hotList: [],
      historyList: [],
      topicList: [],
      searchTypeMap: {
        'jewelry': 0,
        'jewelryCircle': 1,
        'design': 1
      }
    }
  },
  activated() {
    this.type = this.$route.query.type
    if (this.type) {
      this.searchType = this.searchTypeMap[this.type]
      this.localName = this.type + 'SearchWord'
      this.getHot()
      if (this.type === 'jewelryCircle') {
        this.getTopic()
      }
      if (getToken()) {
        this.getHistory()
      } else {
        if (localStorage.getItem(this.localName) !== null) {
          this.historyList = JSON.parse(localStorage.getItem(this.localName))
        }
      }
    }
  },
  methods: {
    getHot() {
      this.$service("jewelryCircleHotKeyword", { data: { type: this.searchType } }).then(result => {
        this.hotList = result.data
      })
    },
    getHistory() {
      let historyArr = []
      if (localStorage.getItem(this.localName) !== null) {
        historyArr = JSON.parse(localStorage.getItem(this.localName))
      }
      this.$service("jewelryCircleHistoryKeyword", { data: { type: this.searchType, keys: historyArr.join(',') } }).then(result => {
        this.historyList = result.data
      })
    },
    getTopic() {
      this.$service("searchTopicList", { data: { limit: 8 } }).then(result => {
        this.topicList = result.data.records
      })
    },
    onSearch(value) {
      if (this.type == 'jewelryCircle') {
        this.setHistory(this.value)
        this.$router.push({ name: 'jewelryCircle-result', query: { searchWord: this.value } })
      } else if (this.type == 'design') {
        this.setHistory(this.value)
        this.$router.push({ name: 'design-product', query: { searchWord: this.value } })
      } else {
        this.$router.push({ name: 'jewelry-product', query: { searchWord: this.value, entrance: 1 } })
      }
    },
    onCancel() {
      this.$router.go(-1)
    },
    // 热门搜索
    hotSearch(value) {
      this.value = value
      this.onSearch(value)
    },
    // 历史记录
    setHistory(value) {
      if (value != '') {
        if (localStorage.getItem(this.localName) == null) {
          this.historyList.unshift(value)
          localStorage.setItem(this.localName, JSON.stringify(this.historyList))
        } else {
          if (this.historyList.indexOf(value) != -1) {
            this.historyList.splice(this.historyList.indexOf(value), 1)
            this.historyList.unshift(value)
          } else {
            this.historyList.unshift(value)
          }
          if (this.historyList.length > 10) {
            this.historyList.pop()
          }
          localStorage.setItem(this.localName, JSON.stringify(this.historyList))
        }
      }
    },
    deleteHistory() {
      this.historyList.splice(0)
      localStorage.removeItem(this.localName)
      if (getToken()) {
        this.$service("jewelryCircleHistoryDelete", { resources: [this.searchType] }).then(result => { })
      }
    },
    topicSearch(value) {
      this.value = value
      this.$router.push({ name: 'jewelryCircle-result', query: { searchWord: this.value, type: 'topic' } })
    }
  }
}
</script>

<style lang="postcss" scoped>
.search {
  height: 100vh;
  background: #f2f2f2;
  & .search-box {
    /* border-bottom: 1px solid #e5e5e5; */
    display: flex;
    & .search-left {
      width: 40px;
      text-align: center;
      line-height: 54px;
      font-size: 13px;
      background: #ffffff;
    }
    & .search-right {
      flex: 1;
      padding-left: 0;
    }
  }
  & .search-btn {
    width: 53px;
    height: 28px;
    background: #df735a;
    border-radius: 14px;
    text-align: center;
    color: #fff;
    line-height: 28px;
  }
}
</style>
