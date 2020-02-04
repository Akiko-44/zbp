<template>
  <AppView class="search">
    <van-search
      class="search-box"
      placeholder="输入关键词搜索"
      v-model.trim="value"
      show-action
      autofocus
      @search="onSearch"
      @cancel="onCancel"
    />
    <div
      class="hot-search"
      v-if="hotList && hotList.length"
    >
      <h4>热门搜索</h4>
      <span
        v-for="(item,i) in hotList"
        :key="i"
        @click="hotSearch(item)"
      >{{item}}</span>
    </div>
    <div
      class="hot-search"
      v-if="historyList && historyList.length"
    >
      <img
        src="../../../assets/images/icon/delete.png"
        class="del-btn"
        @click="deleteHistory"
      >
      <h4>历史记录</h4>
      <span
        v-for="(item,i) in historyList"
        :key="i"
        @click="hotSearch(item)"
      >{{item}}</span>
    </div>
  </AppView>
</template>

<script>
import { getToken } from '~/utils/auth'
export default {
  data() {
    return {
      value: '',
      type: '',
      searchType: undefined,
      localName: '',
      hotList: [],
      historyList: []
    }
  },
  activated() {
    this.type = this.$route.query.type
    if (this.type) {
      this.searchType = this.type === 'jewelryCircle' ? 1 : undefined
      this.localName = this.type + 'SearchWord'
      this.getHot()
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
      this.$service("jewelryCircleHistoryKeyword", { data: { type: this.searchType } }).then(result => {
        this.historyList = result.data
      })
    },
    onSearch(value) {
      if (this.type == 'jewelryCircle') {
        this.setHistory(value)
        this.$router.push({ name: 'news-jewelryCircle-result', query: { searchWord: value } })
      } else {
        this.$router.push({ name: 'jewelry-product', query: { searchWord: value, entrance: 1 } })
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
    // 珠宝圈历史记录
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
    }
  }
}
</script>

<style lang="postcss" scoped>
.search {
  height: 100vh;
  background: #fff;
  & .search-box {
    border-bottom: 1px solid #e5e5e5;
  }
}
.hot-search {
  position: relative;
  padding: 17px 21px;
  & .del-btn {
    position: absolute;
    right: 10px;
    top: 20px;
    width: 12px;
  }
  & h4 {
    padding-bottom: 15px;
    font-size: 16px;
  }
  & span {
    display: inline-block;
    margin: 0 5px 10px;
    padding: 0 18px;
    line-height: 26px;
    font-size: 13px;
    color: #727272;
    background: #f6f6f6;
    border-radius: 13px;
  }
}
</style>
