<template>
  <AppView class="home"
           title="活动列表">
    <van-list v-model="loading"
              :finished="finished"
              @load="onLoad">
      <activityitem v-for="(item,index) in list"
                    :key="index"
                    :data="item"
                    :supType="$route.query.supType"
                    url="gallery-activity-details" />
    </van-list>
  </AppView>
</template>

<script>
import Activityitem from '@/components/common/activityItem'
export default {
  components: {
    Activityitem,
  },
  data() {
    return {
      offset: 1,
      limit: 10,
      list: [],
      total: null,
      loading: false,
      finished: false
    }
  },
  head() {
    return {
      title: '活动列表'
    }
  },
  watch: {
    $route(to) {
      if (this.$route.query.supType) {
        this.offset = 1;
        this.add()
        this.getTotal()
      }
    }
  },
  beforeMount() {
    this.add()
    this.getTotal()
    if (this.$native.isApp()) {
    	this.$native.getTitle('活动列表')
    }
  },
  activated() {
    let that = this
    window.onload = function () {
      setTimeout(function () {
      	if (that.$native.isApp()) {
		    	that.$native.getTitle('活动列表')
		    }
      }, 1)
    }
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    more() {
      this.$router.push({ url: this.url })
    },
    async getTotal() {
      let res = await this.$service('galleryDoingNum', {
        params: {
          supType: this.$route.query.supType
        }
      })
      this.total = res.data
    },
    async add() {
      let res = await this.$service('galleryDoing', {
        params: {
          offset: this.offset,
          limit: this.limit,
          supType: this.$route.query.supType
        }
      })
      this.list = [...this.list, ...res.data]
      this.offset += 1
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.getTotal()
        this.add()
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= this.total) {
          this.finished = true;
        }
      }, 500);

    }
  }
}
</script>
<style lang="postcss" scoped>
</style>