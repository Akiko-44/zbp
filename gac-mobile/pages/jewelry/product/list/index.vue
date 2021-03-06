<template>
  <div class="list">
    <van-pull-refresh
      v-model="refreshing"
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
            <img src="../../../../assets/images/emptylist.png" />
            <p style="color: #BFBFBF; margin-top: 15px;">暂无商品</p>
          </div>
        </slot>
        <slot name="finished">
          <div
            class="status"
            v-show="finished && !empty"
          >
            <div class="line">
              <p>中宝平 带你到源头买真品</p>
            </div>
          </div>
        </slot>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  props: {
    // 接口名称
    name: {
      type: String
    },
    // 获取数据方法
    getData: {
      type: Function
    },
    //Post 地址拼接
    postData: {
      type: Object,
      default() {
        return {
          offset: 1,
          limit: 10
        }
      }
    },
    // 查询参数
    query: {
      type: Object,
      default() {
        return {
          offset: 1,
          limit: 10
        }
      }
    },
    // query 分页参数属性
    props: {
      type: Object,
      default: () => ({
        offset: 'offset',
        limit: 'limit'
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
        (this.name ? this.$service(this.name, { data: this.query, postData: this.postData, resources: this.resources }) : vm.getData())
          .then(result => {
            const { records, pages, total } = result.data
            vm.list = clear ? records : vm.list.concat(records)
            vm.loading = false
            // 是否为最后一页
            vm.finished = vm.postData[vm.props.offset] >= pages
            // 没有数据
            vm.empty = !total
            vm.postData[vm.props.offset]++
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
  min-height: 200px;
  padding: 0 13px;
  margin-top: 10px;
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
  & .line {
    position: relative;
    display: inline-block;
    &::before,
    &::after {
      position: absolute;
      content: "";
      width: 80px;
      height: 1px;
      top: 50%;
    }
    &::before {
      left: -90px;
      background: linear-gradient(to left, #ddd, transparent);
    }
    &::after {
      right: -90px;
      background: linear-gradient(to right, #ddd, transparent);
    }
  }
}
.status-no {
  line-height: 1;
  & img {
    width: 200px;
    margin-top: 10px;
  }
}
</style>
