<template>
  <van-list
    v-model="loading"
    :finished="finished"
    @load="onLoad"
  >
    <top
      :type="exhibition_type"
      v-on:myChange="setPar"
      v-on:lock="lock"
    />
    <footer>
      <ood
        v-for="(item, key) in list"
        type="3"
        position="1"
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
import Top from './top'
export default {
  props: ['exhibition_type'],
  data() {
    return {
      list: [],
      page: 0, // 总条数
      params: {
        offset: 1, // 页数
        limit: 10, // 数量
      },
      loading: false,
      finished: false,
      empty: false,
      regionId: null,
      brandId: null,
      startTime: null,
      finishTime: null,
    }
  },
  computed: {
    types() {
      if (this.regionId || this.brandId || this.startTime || this.finishTime) {
        if (this.startTime) {
          return 3
        } else {
          return 2
        }
      } else {
        return 1
      }
    },
    par() {
      switch (this.types) {
        case 1:
          return {
            params: {
              exhibition_type: this.exhibition_type,
              offset: this.params.offset,
              limit: this.params.limit
            }
          }
          break
        case 2:
          return {
            params: {
              exhibition_type: this.exhibition_type,
              offset: this.params.offset,
              limit: this.params.limit,
              regionId: this.regionId,
              brandId: this.brandId,
            }
          }
          break
        case 3:
          return {
            params: {
              exhibition_type: this.exhibition_type,
              offset: this.params.offset,
              limit: this.params.limit,
              regionId: this.regionId,
              brandId: this.brandId,
              startTime: this.startTime,
              finishTime: this.finishTime,
            }
          }
          break
      }
    },
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
    request() {
      return new Promise((resolve, reject) => {
        if (this.types == 1) {
          this.$service('jewelryExhibition', this.par).then(res => {
            resolve(res.data)
          })
        } else {
          this.$service('jewelryExhibitionPar', this.par).then(res1 => {
            this.$service('jewelryExhibitionParNum', this.par).then(res2 => {
              resolve({ records: res1.data, total: res2.data })
            })
          })
        }
      })
    },
    async getData() {
      let data = await this.request()
      this.page = data.total // 数据总长度
      this.list = [...this.list, ...data.records]
      if (data.records.length > 0) {
        this.params.offset += 1
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
    },
    setPar(obj) {
      Object.keys(obj).forEach(item => {
        this[item] = obj[item]
      })
      this.params.offset = 1
      this.list = []
      this.getData()
    },
    lock(type) {
      this.$emit('lock', type)
    }
  },
  components: {
    Ood, Top
  }
}
</script>
<style scoped>
footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #f8f8f8;
  margin-top: 10px;
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