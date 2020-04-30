<template>
  <AppView
    title="举报记录"
    class="Info"
    :clickLeft="clickLeft"
  >
    <van-tabs
      :class="{'h5-list-tab' : inH5}"
      v-model="activeName"
    >
      <van-tab
        title="我发起的"
        name="reported"
      >
        <AppList
          name="listReport"
          :query="{type: 2}"
          :isDisabled="true"
          :getData="
                  () =>
                    this.$service('listReport', {
                      data: {type: 2}
                    })
                "
          ref="list"
        >
          <template slot-scope="{ list }">
            <div
              class="list-box"
              ref="listBox"
              id="listBox"
            >
              <div
                class="collect-block-item vertical"
                v-for="(item, i) in list"
                :key="i"
              >
                <AppCard
                  :data="{
                  id: item.id,
	                thumbnail: item.thumbnail,
	                title: item.title,
                  authorName: item.authorName,
                  reportTypeName: item.reportTypeName,
                  reportStatus: item.reportStatus,
                  createTime: item.createTime,
                  type: 2
	              }"
                  @click.native="toDetail(item.id)"
                />
              </div>
            </div>
          </template>
        </AppList>
      </van-tab>
      <van-tab
        title="举报我的"
        name="reportMe"
      >
        <AppList
          name="listReport"
          :query="{type: 1}"
          :isDisabled="true"
          :getData="
                  () =>
                    this.$service('listReport', {
                      data: {type: 1}
                    })
                "
          ref="list"
        >
          <template slot-scope="{ list }">
            <div
              class="list-box"
              ref="listBox"
              id="listBox"
            >
              <div
                class="collect-block-item vertical"
                v-for="(item, i) in list"
                :key="i"
              >
                <AppCard
                  :data="{
                  id: item.id,
	                thumbnail: item.thumbnail,
	                title: item.title,
                  authorName: item.authorName,
                  appealTypeName: item.appealTypeName,
                  appealStatus: item.appealStatus,
                  createTime: item.createTime,
                  type: 1
	              }"
                  @click.native="toDetail(item.id)"
                />
              </div>
            </div>
          </template>
        </AppList>
      </van-tab>
    </van-tabs>
    <!-- <van-button
      type="danger"
      @click="report"
    >发起举报</van-button> -->
  </AppView>
</template>

<script>
import { tabsList } from '~/utils/mixins'
import AppCard from './item'
import AppList from "~/components/common/list";

export default {
  data() {
    return {
      dataLoading: true,
      activeName: '',
      reportList: [{
        reportType: 1,
        appealStatus: 1,
        authorName: 'authorName',
        name: 'name',
        reportStatus: 1,
        id: 1,
        title: 'title',
      }],
      appealList: [{
        reportType: 1,
        appealStatus: 1,
        authorName: 'authorName',
        name: 'name',
        reportStatus: 1,
        id: 1,
        title: 'title',
      }],
      hasLoad: true,
      inH5: true
    }
  },
  components: {
    AppList,
    AppCard
  },
  mixins: [tabsList],
  activated() {
    this.activeName = this.$route.query.type || 'reported'
    // this.getList()
    // this.getCircleList()
    if (this.$native.isApp() || window.navigator.userAgent.includes('MicroMessenger')) {
      this.inH5 = false
    }
    if (this.$native.isApp()) {
      this.$native.getTitle("举报记录")
    }
  },
  deactivated() {
    this.$destroy()
  },

  head() {
    return {
      title: '举报记录'
    }
  },
  methods: {
    getList() {
      this.dataLoading = true
      this.$loading(this.$service('listReport', {
        data: {
          offset: 1,
          limit: 50,
          type: 1
        }
      })).then(result => {
        this.dataLoading = false
        this.hasLoad = true

        this.reportList = result.data.records
      }).catch(() => {
        this.dataLoading = false
      })
    },
    getCircleList() {
      this.dataLoading = true
      this.$loading(this.$service('jewelryCircleConcernAuthor', {
        data: { limit: 50 }
      })).then(result => {
        this.dataLoading = false
        this.hasLoad = true
        this.appealList = result.data.records
      }).catch(() => {
        this.dataLoading = false
      })
    },
    clickLeft() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    },
    toDetail(id) {
      this.$router.push({ name: 'user-report-detail', query: { id } })
    },
    report() {
      const data = {
        contentId: '1409',
        reason: '该内容引起不适',
        evidence: ['http://image.gacjc.com/1581578825142_1d5b48441a9c6.png', 'http://image.gacjc.com/FrTbsmwf30D5xgXwSNJIoUjq7JIy'],
        type: 1,
        reportOrAppealTypeId: '3',
      }
      this.$service('report', {
        data: data
      }).then(result => {
        console.log(result)
        this.getList()
      }).catch(() => { })
    }
  }
}
</script>

<style lang="postcss" scoped>
.no-content {
  padding-top: 70px;
  text-align: center;
  font-size: 15px;
  color: #999;
  & img {
    width: 330px;
  }
  & p {
    margin-bottom: 15px;
  }
}
.collect-block-item {
  background: white;
  position: relative;
  margin: 10px;
  border-radius: 5px;
  overflow: hidden;
}
>>> .van-tabs__wrap {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
}
>>> .h5-list-tab .van-tabs__wrap {
  top: 46px;
}
>>> .van-tabs__nav {
  background: #f2f2f2;
}
>>> .van-tabs__content {
  overflow: hidden;
  margin-top: 44px;
}
</style>
