<template>
  <div class="list">
    <van-pull-refresh
      v-model="refreshing"
      :disabled="isDisabled"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :immediateCheck="immediateCheck"
        class="list-content"
        ref="list"
      >
        <!-- 列表内容 -->
        <slot :list="list"></slot>
        <slot name="empty">
          <div
            class="status status-no"
            v-show="empty"
          >
            <img src="../../../assets/images/emptylist.png" />
            <p>{{emptyText}}</p>
          </div>
        </slot>
        <slot name="finished">
          <div
            class="status"
            v-show="finished && !empty"
          >我们是有底线的平台</div>
        </slot>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    search: {
      type: String
    },
    // 接口名称
    name: {
      type: String
    },
    // 获取数据方法
    getData: {
      type: Function
    },
    // 查询参数
    query: {
      type: Object,
      default() {
        return {
          offset: 1,
          limit: 10,
          category: undefined,
          businessName: undefined
        }
      }
    },
    // 查询参数
    params: {
      type: Object,
      default() {
        return {
          offset: 1,
          limit: 10
        }
      }
    },
    // 查询参数
    postData: {
      type: Object,
      default: () => ({
        offset: 1,
        limit: 10
      })
    },
    // query 分页参数属性
    props: {
      type: Object,
      default: () => ({
        offset: 'offset',
        limit: 'limit',
        category: 'category'
      })
    },
    // URL资源
    resources: {
      type: Array,
      default: () => []
    },
    immediateCheck: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      default: '暂无内容'
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      empty: false,
      hackFirstLoad: false
    }
  },
  mounted() {
    // 解决安卓webview里获取window.innerHeight为0导致首次加载失败问题
    setTimeout(() => {
      if (!this.hackFirstLoad) {
        this.onLoad()
      }
    }, 200)
  },
  methods: {
    loadData(action) {
      const vm = this
      const clear = action === 'clear'

      this.hackFirstLoad = true

      if (vm.disabled) {
        vm.loading = false
        return
      }
      return (
        // 优先使用接口名称进行数据获取
        (this.name ? this.$service(this.name, { data: this.query, params: this.params, postData: this.postData, resources: this.resources }) : vm.getData())
          .then(result => {
            const { records, pages, total } = result.data
            vm.list = clear ? records : vm.list.concat(records)
            vm.loading = false
            // 是否为最后一页
            vm.finished = vm.query[vm.props.offset] >= pages
            // 没有数据
            vm.empty = !total
            vm.query[vm.props.offset]++
            vm.postData[vm.props.offset]++
            vm.params[vm.props.offset]++
            vm.$emit('loadData', result.data)
          }).catch(vm.onLoadFail)
      )
    },
    onLoad() {
      this.loadData()
    },
    onLoadFail() {
      // setTimeout(() => {
      //   this.$dialog.confirm({
      //     message: '加载失败',
      //     confirmButtonText: '重试',
      //     beforeClose: (action, done) => {
      //       if (action === 'confirm') {
      //         this.onLoad()
      //       }
      //       done()
      //     }
      //   })
      // }, 300)
      this.finished = true
      this.loading = false
    },
    onRefresh() {
      this.refreshing = true
      this.query[this.props.offset] = 1
      this.params[this.props.offset] = 1
      this.postData[this.props.offset] = 1
      setTimeout(() => {
        this.loadData('clear').then(() => {
          this.refreshing = false
        })
      }, 300)
    },
    handler(bind) {
      this.$refs.list.handler(bind)
    }
  }
}
</script>

<style lang="postcss" scoped>
.list-content {
  /* min-height: 200px; */
  min-height: 330px;
}
.status {
  position: relative;
  /* z-index: -1; */
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 12px;
  color: var(--dark-gray);
}
.status-no {
  line-height: 1;
  z-index: 0;
  & img {
    width: 331px;
    margin-top: 120px;
  }
}
</style>
