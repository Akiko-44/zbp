<template>
  <AppView
    class="jewelry-circle"
    title="珠宝圈列表"
  >
    <!-- 为了520暂时屏蔽 -->
    <!-- <van-tabs
      v-model="activeName"
      sticky
    >
      <van-tab
        title="内容"
        name="content"
      >
        <div class="goods-list-search">
          <AppFilter>
            <div
              class="app-filter-item"
              @click="synthesis(1)"
              :class="query.orderType === 1 ? 'sort' : ''"
            >
              <div class="item-name">
                综合排序
              </div>
            </div>
            <div
              class="app-filter-item"
              @click="synthesis(2)"
              :class="query.orderType === 2 ? 'sort' : ''"
            >
              <div class="item-name">
                最新
              </div>
            </div>
            <div
              class="app-filter-item price-filter-item"
              @click="synthesis(3)"
              :class="query.orderType === 3 ? 'sort' : ''"
            >
              <div class="item-name">
                最热
              </div>
            </div>
            <AppFilterItem
              name="筛选"
              :class="query.orderType === 4 ? 'sort' : ''"
              :data="filterObj"
              @confirm="confirm"
            />
          </AppFilter>
        </div>
        <div class="goods-list">
          <AppList
            name="jewelryCircleSearchContent"
            :query="query"
            :isDisabled="true"
            :getData="() => this.$service('jewelryCircleSearchContent', { data: this.query })"
            ref="list"
            @loadData="loadData"
          >
            <template slot-scope="{ list }">
              <div
                class="list-box"
                ref="listBox"
                id="listBox"
              >
                <div
                  class="list-item"
                  v-for="(item, i) in list"
                  :key="i"
                >
                  <card
                    :type="item.type"
                    :id="item.id"
                    :imgUrl="item.thumbnail"
                    :title="item.title"
                    :commentNumber="item.commentNumber"
                    :likeNumber="item.likeNumber"
                    :viewNumber="item.viewNumber"
                    :labelName="item.labelName"
                    :labelImg="item.labelImg"
                    :isLike="item.isLike"
                    :authorName="item.authorName"
                    :authorLogo="item.authorLogo"
                  />
                </div>
              </div>
            </template>
          </AppList>
        </div>
      </van-tab>
      <van-tab
        title="话题"
        name="topic"
      >
        <div class="topic-list">
          <AppList
            name="searchTopicList"
            :query="listParams"
            :isDisabled="true"
            :getData="
                    () =>
                      this.$service('searchTopicList', {
                        data: this.listParams
                      })
                  "
            ref="topicList"
          >
            <template slot-scope="{ list }">
              <div
                class="topic-item d-flex j-sb"
                v-for="(item,index) in list"
                :key="index"
                @click="chooseTopic(item.id)"
              >
                <div class="list-name">
                  # {{item.topicName}}
                </div>
                <div class="list-num">
                  <span class="hot-label">热</span>
                  <span>{{item.joinNum}}</span>
                </div>
              </div>
            </template>
          </AppList>
        </div>
      </van-tab>
      <van-tab
        title="用户"
        name="user"
      >
        <div class="user-list">
          <AppList
            name="jewelryCircleSearchUserList"
            :query="listParams"
            :isDisabled="true"
            :getData="
                    () =>
                      this.$service('jewelryCircleSearchUserList', {
                        data: this.listParams
                      })
                  "
            ref="userList"
          >
            <template slot-scope="{ list }">
              <div
                class="user-item d-flex j-sb a-center m-1 p-1 bg-white"
                v-for="(item,index) in list"
                :key="index"
                @click="chooseUser(item)"
              >
                <div class="list-name d-flex a-center">
                  <img :src="item.userLogo">
                  <span>{{item.nickName}}</span>
                </div>
                <div class="list-num">
                  <van-button
                    v-if="item.status === '0'"
                    class="concern-btn"
                    color="#DF735A"
                    @click.native.stop="concern(item,1)"
                  >关注</van-button>
                  <van-button
                    v-else
                    class="concern-btn concerned"
                    color="#999999"
                    plain
                    icon="success"
                    @click.native.stop="concern(item,2)"
                  >关注</van-button>
                </div>
              </div>
            </template>
          </AppList>
        </div>
      </van-tab>
    </van-tabs> -->
    <div class="goods-list">
      <AppList
        name="jewelryCircleSearchContent"
        :query="query"
        :isDisabled="true"
        :getData="() => this.$service('jewelryCircleSearchContent', { data: this.query })"
        ref="list"
        @loadData="loadData"
      >
        <template slot-scope="{ list }">
          <div
            class="list-box"
            ref="listBox"
            id="listBox"
          >
            <div
              class="list-item"
              v-for="(item, i) in list"
              :key="i"
            >
              <card
                :type="item.type"
                :id="item.id"
                :imgUrl="item.thumbnail"
                :title="item.title"
                :commentNumber="item.commentNumber"
                :likeNumber="item.likeNumber"
                :viewNumber="item.viewNumber"
                :labelName="item.labelName"
                :labelImg="item.labelImg"
                :isLike="item.isLike"
                :authorName="item.authorName"
                :authorLogo="item.authorLogo"
              />
            </div>
          </div>
        </template>
      </AppList>
    </div>
  </AppView>
</template>
<script>
import sticky from '~/components/common/sticky'
import HeaderModule from '~/components/jewelryCircle/header'
import Card from '~/components/jewelryCircle/cardItem'
import AppList from '~/components/common/list'
import AppFilter from '~/components/common/filterMulti'
import AppFilterItem from '~/components/common/filterMulti/circle-item'
import { waterfall } from '~/utils/page'
import { getToken } from "~/utils/auth"

export default {
  data() {
    return {
      listParams: {
        offset: 1,
        limit: 20,
        topicName: '',
        nickName: ''
      },
      query: {
        // 排序（1：综合，2：最新，3：最热，4：筛选）
        orderType: 1,
        content: '',
        type: undefined,
        columnId: undefined,
        labelId: undefined,
        topicId: undefined,
        offset: 1,
        limit: 20
      },
      activeName: 'content',
      value: '',
      filterObj: {}
    }
  },
  created() {
    this.value = this.$route.query.searchWord
    this.listParams.topicName = this.value
    this.listParams.nickName = this.value
    this.query.content = this.value
    this.activeName = this.$route.query.type ? this.$route.query.type : 'content'
  },
  mounted() {
    this.getFilterList()
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    synthesis(orderType) {
      this.query.orderType = orderType
      this.getFilterList()
      this.getList()
    },
    confirm(data) {
      this.query.orderType = data.orderType
      this.query.type = data.type
      this.query.columnId = data.columnId
      this.query.labelId = data.labelId
      this.query.topicId = data.topicId
      this.getFilterList()
      this.getList()
    },
    getFilterList() {
      this.$service('jewelryCircleListFilter', { data: this.query }).then(result => {
        this.filterObj = result.data
      })
    },
    back() {
      this.$router.push({
        name: 'jewelryCircle',
      })
    },
    onSearch() {
      this.listParams.topicName = this.value
      this.listParams.nickName = this.value
      this.query.content = this.value
      this.refresh()
    },
    getList() {
      this.listParams.offset = 1
      this.$refs.list && this.$refs.list.onRefresh()
    },
    refresh() {
      this.listParams.offset = 1
      this.$refs.list && this.$refs.list.onRefresh()
      this.$refs.topicList && this.$refs.topicList.onRefresh()
      this.$refs.userList && this.$refs.userList.onRefresh()
    },
    chooseTopic(id) {
      this.$router.push({ name: 'jewelryCircle-topic', query: { id } })
    },
    chooseUser(item) {
      this.$router.push({
        name: "jewelryCircle-weMidea",
        query: {
          id: item.contentOwnerId,
          authorType: item.contentOwnerType
        }
      })
    },
    concern(item, type, index) {
      if (getToken()) {
        this.$service("jewelryCircleConcern", {
          data: {
            authorId: item.contentOwnerId,
            concernType: type,
            authorType: item.contentOwnerType
          }
        }).then(result => {
          item.status = item.status === '1' ? '0' : '1'
        })
      } else {
        this.toLogin()
      }
    },
    loadData(data) {
      setTimeout(() => {
        waterfall(
          "#listBox",
          "list-item"
        )
      }, 200)
    }
  },
  components: {
    sticky,
    HeaderModule,
    AppList,
    Card,
    AppFilter,
    AppFilterItem
  }
}
</script>

<style lang="postcss" scoped>
.jewelry-circle {
  & .search-box {
    display: flex;
    & .search-left {
      width: 40px;
      text-align: center;
      line-height: 54px;
      font-size: 13px;
      background: #ffffff;
    }
    & .search-right {
      flex: 1;
      padding-left: 0;
    }
    & .search-btn {
      width: 53px;
      height: 28px;
      background: #df735a;
      border-radius: 14px;
      text-align: center;
      color: #fff;
      line-height: 28px;
    }
  }
  & .goods-list-search {
    position: relative;
    z-index: 1;
    height: 37px;
    width: 100%;
    margin-bottom: -10px;
    &.h5Class {
      top: 46px;
    }
    & .price-filter-item {
      & img {
        width: 8px;
      }
    }
    & .sort {
      color: #d5735a;
      & .ico-down {
        transform: rotate(180deg);
        transform-origin: 50% 36%;
      }
    }
  }
  & .goods-list {
    padding: 10px;
    & .list-box {
      margin-left: -5px;
      margin-right: -5px;
      height: 265px;
      position: relative;
      & .list-item {
        padding-left: 5px;
        padding-right: 5px;
        width: 50%;
        box-sizing: border-box;
        float: left;
      }
    }
    & .head-title {
      padding: 0 20px;
      & h3 {
        color: #333333;
      }
      & .more {
        color: #999999;
        font-size: 12px;
      }
    }
  }
  & .topic-list {
    padding-top: 10px;
    padding-left: 15px;
    & .topic-item {
      padding-right: 20px;
      line-height: 33px;
      font-size: 13px;
      color: #333333;
      & .hot-label {
        margin-right: 4px;
        padding: 0 3px;
        color: #fff;
        font-size: 12px;
        background: #df735a;
        border-radius: 2px;
      }
    }
  }
  & .user-list {
    padding-top: 6px;
    font-size: 13px;
    & img {
      width: 36px;
      height: 36px;
      margin-right: 5px;
    }
    & .concern-btn {
      padding: 0;
      width: 47px;
      height: 20px;
      line-height: 20px;
      border-radius: 3px;
      font-size: 12px;
      &.concerned {
        width: 57px;
      }
    }
  }
}
>>> .app-filter {
  background-color: transparent !important;
}
</style>
