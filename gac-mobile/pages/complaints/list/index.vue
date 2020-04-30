<template>
  <AppView title="投诉">
    <van-row class="tabs">
      <van-col
        span="12"
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{'active': index === currentIndex}"
        @click.native="currentIndex = index"
      ><span>{{tab}}</span>
      </van-col>
    </van-row>
    <div>
      <div v-if="currentIndex === 0">
        <van-cell-group
          v-for="(item, index) in list"
          :key="index"
        >
          <van-cell
            title="投诉时间："
            :value="item.complaintDate"
          />
          <van-cell
            title="投诉人："
            :value="item.userName"
          />
          <van-cell
            title="被投诉品牌："
            :value="item.brandName || '无'"
          />
          <van-cell
            title="投诉商家："
            :value="item.merchantName"
          />
          <van-cell
            title="被投诉商品："
            :value="item.goodName"
          />
          <van-cell
            title="问题描述："
            :value="item.complaintContent"
          />
          <van-cell
            title="处理结果："
            :value="item.complaintHandle"
          />
          <van-cell
            title="处理时间："
            :value="item.complaintHandleDate"
          />
        </van-cell-group>
        <div
          class="status"
          v-if="list.length == 0"
        >暂时没有投诉噢
        </div>
      </div>
      <div v-else>
        <!--<AppList :query="query2"
             :getData="() => this.$service('searchMyComplaint', { data: this.query2})"
             ref="myList">
		      <template slot-scope="{ list }">
		      	
		      </template>
		    </AppList>-->
        <van-cell-group
          v-for="(item, index) in myList"
          :key="index"
        >
          <van-cell
            title="投诉时间："
            :value="item.complaintDate"
          />
          <van-cell
            title="投诉人："
            :value="item.userName"
          />
          <van-cell
            title="被投诉品牌："
            :value="item.brandName || '无'"
          />
          <van-cell
            title="投诉商家："
            :value="item.merchantName"
          />
          <van-cell
            title="被投诉商品："
            :value="item.goodName"
          />
          <van-cell
            title="问题描述："
            :value="item.complaintContent"
          />
          <van-cell
            title="处理结果："
            :value="item.complaintHandle"
          />
          <van-cell
            title="处理时间："
            :value="item.complaintHandleDate"
          />
        </van-cell-group>
        <div class="status">我们是有底线的平台</div>
      </div>
    </div>
  </AppView>
</template>

<script>
import AppList from '~/components/common/list'

export default {
  components: {
    AppList
  },
  head() {
    return {
      title: '投诉'
    }
  },
  data() {
    return {
      tabs: ['投诉大厅', '我的投诉'],
      currentIndex: 0,
      list: [],
      myList: [],
      query: {
        offset: 1,
        limit: 100
      },
      query2: {
        offset: 1,
        limit: 100,
        mobilePhone: undefined
      }
    }
  },
  beforeMount() {
    if (this.$native.isApp()) {
      this.$native.getTitle('投诉')
    }
  },
  async activated() {
    // let fromUrl = location.protocol + '//' + location.host + '/jewelrySearch/attackFake'
    let fromUrl = location.href
    await this.$store.dispatch('user/checkLogin', { router: this.$router, fromUrl })
    this.$service('searchAllDeal', {
      data: this.query
    }).then(result => {
      this.list = result.data.records
    })
    this.$loading(this.$service('account'))
      .then(result => {
        this.query2.mobilePhone = result.data.mobilePhone
        this.$loading(this.$service('searchMyComplaint', {
          data: this.query2
        }))
          .then(result => {
            this.myList = result.data.records
          })
      })
  }
}
</script>

<style lang="postcss" scoped>
.tabs {
  height: 42px;
  line-height: 42px;
  text-align: center;
  font-size: 16px;
  & .active {
    & span {
      border-bottom: 3px solid #d57e6a;
    }
  }
}

.van-cell-group {
  margin-bottom: 10px;
}

.van-cell__title {
  max-width: 90px;
  color: #58585a;
}

.van-cell__value {
  text-align: left;
}

.status {
  position: relative;
  /* z-index: -1; */
  width: 100%;
  height: 1.0667rem;
  line-height: 1.0667rem;
  text-align: center;
  font-size: 0.3733rem;
  color: #585859;
}
</style>