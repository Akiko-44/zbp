<template>
  <AppView
    class="home"
    :title="title"
  >
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onLoad"
    >
      <footer>
        <ood
          v-for="(item, key) in list"
          type="2"
          :key="key"
          :data="item"
        ></ood>
      </footer>
      <!-- 列表内容 -->
      <slot :list="list"></slot>
      <slot name="empty">
        <div
          class="status"
          v-show="empty"
        >我们是有底线的平台</div>
      </slot>
      <slot name="finished">
        <div
          class="status"
          v-show="finished && !empty"
        >我们是有底线的平台</div>
      </slot>
    </van-list>
  </AppView>
</template>

<script>
import Ood from '@/components/common/ood'
export default {
  data() {
    return {
      list: [],
      page: 0, // 总条数
      title: this.$route.query.title,
      params: {
        columnId: this.$route.query.id,
        offset: 1, // 页数
        limit: 10, // 数量
      },
      loading: false,
      empty: false,
      finished: false
    }
  },
  head() {
    return {
      title: this.title
    }
  },
  watch: {
    $route() {
      this.params.offset = 1;
      this.getData()
    }
  },
  beforeMount() {
    if (this.$native.isApp()) {
      this.$native.getTitle(this.title)
    }
  },
  activated() {
    let that = this
    window.onload = function () {
      setTimeout(function () {
        if (that.$native.isApp()) {
          that.$native.getTitle(this.title)
        }
      }, 1)
    }
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    async getData() {
      let data
      let query = this.$route.query
      let params = {
        columnId: query.id,
        offset: this.params.offset,
        limit: this.params.limit
      }
      data = await this.$service('newList', {
        params
      })
      this.page = data.data.total // 数据总长度
      this.list = [...this.list, ...data.data.records]
      if (data.data.records.length > 0) {
        this.params.offset += 1;
      } else {
        this.empty = true
        this.finished = true
      }

    },
    onLoad() { // 异步更新数据
      setTimeout(() => {
        this.getData()
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= this.page) {
          this.finished = true;
        }
      }, 500);

    }
  },
  components: {
    Ood
  }
}
</script>

<style scoped>
footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #f8f8f8;
  & > *:nth-child(n + 3) {
    margin-top: 9px;
  }
}

.boxCenter {
  margin: 0 auto;
}

.status {
  position: relative;
  /* z-index: -1; */
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: var(--dark-gray);
}
</style>