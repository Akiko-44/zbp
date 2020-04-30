<template>
  <div class="search-list">
    <div
      class="hot-search"
      v-if="historyList && historyList.length"
    >
      <img
        src="../../../assets/images/icon/delete.png"
        class="del-btn"
        @click="deleteHistory"
      >
      <h4>搜索历史</h4>
      <span
        v-for="(item,i) in historyList"
        :key="i"
        @click="hotSearch(item)"
      >{{item}}</span>
    </div>
    <div
      class="hot-search"
      v-if="hotList && hotList.length"
    >
      <h4>大家都在搜</h4>
      <span
        v-for="(item,i) in hotList"
        :key="i"
        @click="hotSearch(item)"
      >{{item}}</span>
    </div>
    <!-- 为了520暂时屏蔽 -->
    <!-- <div
      class="topic-list"
      v-if="topicList && topicList.length"
    >
      <h4>热点话题</h4>
      <div
        class="topic-item d-flex j-sb"
        v-for="(item,index) in topicList"
        :key="index"
        @click="chooseTopic(item.topicName)"
      >
        <div class="list-name">
          # {{item.topicName}}
        </div>
        <div class="list-num">
          <span class="hot-label">热</span>
          <span>{{item.joinNum}}</span>
        </div>
      </div>

    </div> -->

  </div>
</template>

<script>
export default {
  props: {
    hotList: {
      type: Array,
      default() {
        return []
      }
    },
    historyList: {
      type: Array,
      default() {
        return []
      }
    },
    topicList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  methods: {
    // 热门搜索
    hotSearch(value) {
      this.$emit('hotSearch', value)
    },
    deleteHistory() {
      this.$emit('deleteHistory')
    },
    chooseTopic(value) {
      this.$emit('topicSearch', value)
    }
  }
}
</script>

<style lang="postcss" scoped>
.hot-search {
  position: relative;
  padding: 20px 15px 0;
  & .del-btn {
    position: absolute;
    right: 10px;
    top: 20px;
    width: 12px;
  }
  & h4 {
    padding-bottom: 16px;
    font-size: 15px;
  }
  & span {
    display: inline-block;
    margin: 0 5px 10px;
    padding: 0 18px;
    line-height: 26px;
    font-size: 13px;
    color: #727272;
    background: #ffffff;
    border-radius: 13px;
  }
}
.topic-list {
  padding-top: 20px;
  & h4 {
    padding-left: 15px;
    padding-bottom: 5px;
    font-size: 15px;
  }
  & .topic-item {
    padding-left: 15px;
    padding-right: 20px;
    line-height: 33px;
    font-size: 13px;
    color: #333333;
    border-bottom: 1px solid #e5e5e5;
    & .hot-label {
      margin-right: 4px;
      padding: 0 3px;
      color: #fff;
      font-size: 12px;
      background: #df735a;
      border-radius: 2px;
    }
    &:last-child {
      border: 0;
    }
  }
}
</style>
