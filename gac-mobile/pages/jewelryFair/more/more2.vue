<template>
  <van-list
    v-model="loading"
    :finished="finished"
    @load="onLoad"
  >
    <footer>
      <ood
        v-for="(item, key) in list"
        type="3"
        position="4"
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
</template>

<script>
import Ood from '@/components/common/ood'
export default {
  props: ['id'],
  data() {
    return {
      list: [],
      page: 0, // 总条数
      params: {
        id: this.id,
        offset: 1, // 页数
        limit: 10, // 数量
      },
      loading: false,
      empty: false,
      finished: false
    }
  },
  watch: {
    $route() {
      this.params.offset = 1
      this.getData()
    }
  },
  beforeMount() {
    this.params.offset = 1
    this.getData()
  },
  methods: {
    async getData() {
      let data
      let params = {
        id: this.id,
        offset: this.params.offset,
        limit: this.params.limit
      }
      data = await this.$service('jewelryMorelist', { params })
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
      console.log(1)
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