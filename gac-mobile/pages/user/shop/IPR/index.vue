<template>
  <AppView
    title="知识产权保护"
    :clickLeft="clickLeft"
  >
    <AppList
      :postData="postData"
      :getData="() => this.$service('intellectualList', { params: this.postData })"
      ref="list"
    >
      <template slot-scope="{ list }">
        <van-row
          gutter="10"
          style="margin-bottom: 64px;"
        >
          <van-col
            span="24"
            v-for="(item, i) in list"
            :key="i"
          >
            <!--<Card 
							:data="{
		          	name: item.name,
		          	detail: item.detail,
		            createTime: item.createTime,
		            pics: item.pics
		         }"/>-->
            <div class="item7">
              <span
                class="delete"
                @click="del(item.id)"
              >删除</span>
              <div>
                <p
                  class="name"
                  @click="linkTo(item.id)"
                >
                  {{item.name}}
                </p>
                <p class="create-time">{{item.createTime}}</p>
              </div>
              <van-row
                gutter="10"
                class="imglist"
                @click="linkTo(item.id)"
              >
                <van-col
                  span="8"
                  v-for="(item, i) in item.pics"
                  :key="i"
                  v-if="i < 3"
                >
                  <img :src="item" />
                </van-col>
              </van-row>
              <div class="detail">
                {{item.detail}}
              </div>
            </div>
          </van-col>
        </van-row>
      </template>
    </AppList>
    <div class="btn-wrap">
      <van-button
        @click="$router.push({name: 'user-shop-IPR-add'})"
        block
        class="primary-btn"
        type="primary"
      >
        添加
      </van-button>
    </div>
  </AppView>
</template>

<script>
import AppList from '~/components/common/list'
import Card from '~/components/dm/card/item7'
import { Dialog } from 'vant'

export default {
  data() {
    return {
      postData: {
        offset: 1,
        limit: 20,
      },
      list: [],
      submiting: false
    }
  },
  components: {
    AppList,
    Card
  },
  head() {
    return {
      title: '知识产权保护'
    }
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    linkTo(id) {
      this.$router.push({
        name: 'user-shop-IPR-detail',
        query: { id }
      })
    },
    del(id) {
      let that = this
      Dialog.confirm({
        title: '是否确认删除'
      }).then(() => {
        // on confirm
        this.$service('intellectualDelete', {
          resources: [id]
        }).then(res => {
          this.$toast({ type: 'success', message: '删除成功' })
          setTimeout(function () {
            that.$router.go(0)
          }, 100)
        })
      }).catch(() => {
        // on cancel
      })
    },
    clickLeft() {
      this.$router.push({ name: 'user-mine' })
    }
  }
}
</script>

<style lang="postcss" scoped>
.item7 {
  position: relative;
  margin: 10px 10px 0;
  padding: 15px 12px;
  border-radius: 5px;
  background: white;
  overflow: hidden;
  & .delete {
    position: absolute;
    top: 6px;
    right: 0px;
    font-size: 13px;
    color: #aaaaac;
    padding: 10px;
  }
  & .name {
    width: 280px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 15px;
    color: var(--black);
  }
  & .create-time {
    padding-top: 10px;
    font-size: 13px;
    color: var(--gray);
  }
  & .imglist {
    margin: 15px auto;
    & img {
      width: 100px;
      height: 100px;
    }
  }
  & .detail {
    font-size: 13px;
    color: #666666;
    line-height: 21px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.btn-wrap {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 25px 10px;
  box-sizing: border-box;
  /* background: white; */
  z-index: 99;
  & .primary-btn {
    background: #d57e6a;
    border-color: #d57e6a;
  }
}
</style>