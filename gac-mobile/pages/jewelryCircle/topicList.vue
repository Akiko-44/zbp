<template>
  <AppView class="search">
    <div class="search-box">
      <van-icon
        name="arrow-left"
        class="search-left"
        @click.native="onCancel"
      />
      <van-search
        class="search-right"
        placeholder="输入关键词搜索"
        v-model.trim="value"
        shape="round"
        show-action
        autofocus
        @cancel="onCancel"
      >
        <div slot="left-icon">
          <img
            src="../../assets/images/icon/search.png"
            width="13"
          >
        </div>
        <div
          slot="action"
          class="search-btn"
          @click="onSearch"
        >搜索
        </div>
      </van-search>
    </div>
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
        ref="list"
      >
        <template slot-scope="{ list }">
          <div
            class="list-box"
            ref="listBox"
            id="listBox"
          >
            <div
              class="topic-item d-flex j-sb"
              v-for="(item,index) in list"
              :key="index"
              @click="chooseTopic(item)"
            >
              <div class="list-name">
                # {{item.topicName}}
              </div>
              <div class="list-num">
                <span class="hot-label">热</span>
                <span>{{item.joinNum}}</span>
              </div>
            </div>
          </div>
        </template>
      </AppList>
    </div>

  </AppView>
</template>

<script>
import { getToken } from '~/utils/auth'
import AppList from "~/components/common/list"
export default {
  components: {
    AppList
  },
  data() {
    return {
      value: '',
      type: '',
      listParams: {
        offset: 1,
        limit: 20,
        topicName: ''
      },
      topicList: [],
      form: {}
    }
  },
  beforeMount() {
    if (this.$route.query.data) {
      this.form = JSON.parse(this.$route.query.data)
    }
  },
  methods: {
    chooseTopic(item) {
      this.form.topicId = item.id
      this.form.topicName = item.topicName
      this.$router.replace({ name: 'jewelryCircle-publish', query: { data: JSON.stringify(this.form) } })
    },
    onSearch() {
      this.listParams.topicName = this.value
      this.$refs.list.onRefresh()
    },
    onCancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="postcss" scoped>
.search {
  height: 100vh;
  background: #f5f6fa;
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
  & .topic-list {
    padding-top: 10px;
    padding-left: 15px;
    & .topic-item {
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
}
</style>
