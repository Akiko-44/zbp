<template>
  <el-container>
    <el-header height="90px">
      <div class="top-bar">
        <div class="container top-bar-container d-flex j-sb">
          <div class="user-box d-flex j-center a-center">
            <span>
              <span class="user-name">{{name}}</span>，<span
                @click="logout"
                class="pointer"
              >退出</span>
            </span>
            <span class="divider">|</span>
            <img
              class="mr"
              src="../../assets/image/user/news.png"
            >
            <el-badge
              :value="200"
              :max="99"
              class="item pointer"
              @click.native="linkMsgList"
            >
              <span>消息</span>
            </el-badge>
          </div>
          <div class="user-box d-flex j-center a-center">
            <span
              class="pointer"
              @click="linkDashboard"
            >首页</span>
            <span class="divider">|</span>
            <span
              class="pointer"
              @click="linkKefu"
            >联系客服</span>
          </div>
        </div>
      </div>
      <div class="top-container">
        <div class="container d-flex j-sb">
          <h3 class="logo-box d-flex j-center a-center">
            <img src="../../assets/image/user/logo-big.png">商家后台
          </h3>
          <div class="merchant-box d-flex j-center a-center">
            <img
              class="rounded-circle"
              width="28"
              height="28"
              :src="avatar"
            >
            <div class="score-box d-flex ">
              <div class="score-item d-flex flex-column j-center a-center">
                <p>描述相符</p>
                <p class="score-value">5.0</p>
              </div>
              <div class="score-item d-flex flex-column j-center a-center">
                <p>服务态度</p>
                <p class="score-value">5.0</p>
              </div>
              <div class="score-item d-flex flex-column j-center a-center">
                <p>物流态度</p>
                <p class="score-value">5.0</p>
              </div>
            </div>
            <el-popover
              placement="top-end"
              width="358"
              trigger="hover"
              :visible-arrow="false"
              popper-class="merchant-popper"
            >
              <i
                class="el-icon-caret-bottom down-icon text-light-gray pointer down-icon"
                slot="reference"
              ></i>
              <div class="merchant-info p-1 font-sm text-black ">
                <p>
                  <span class="font mr-1">真玉汇官方旗舰店</span>
                  <span class="text-primary">副会长单位</span>
                </p>
                <p class="mt-2 mb-1">
                  <span class="text-light-gray">店铺类型：</span>
                  <span>珠宝店</span>
                </p>
                <p class=" mb-3">
                  <span class="text-light-gray">综合评分：</span>
                  <span>5.0</span>
                </p>
                <div class="btn-box mb-2">
                  <el-button class="round-btn-sm">查看商铺</el-button>
                  <el-button class="round-btn-sm">商户信息</el-button>
                  <el-button
                    class="round-btn-sm"
                    @click="$router.push({name: 'security'})"
                  >安全设置</el-button>
                </div>
              </div>
            </el-popover>

          </div>
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="main-container">
        <sidebar
          :routes="routes"
          class="sidebar-container"
        ></sidebar>
        <div class="right-container">
          <navbar v-if="$route.path !== '/dashboard'"></navbar>
          <app-main style="overflow:hidden;"></app-main>
        </div>
      </div>
    </el-main>
    <el-footer height="66px">
      ©2017-2020 | 中宝协（北京）珠宝文化有限公司 | 京ICP备18003055号-1 | 京网文
      [ 2018 ] 11190-1028 号
    </el-footer>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { Navbar, AppMain } from '@/views/layout/components'
import Sidebar from './Sidebar'
import ResizeMixin from '@/views/layout/mixin/ResizeHandler'

export default {
  name: 'layout',
  props: {
    routes: Object
  },
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    linkMsgList() {
      this.$router.push({ name: 'msgList' })
    },
    linkDashboard() {
      this.$router.push({ name: 'dashboard' })
    },
    linkKefu() {
      this.$router.push({ name: 'kefu' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.el-main {
  background: #f2f2f2;
}
.el-footer {
  line-height: 66px;
  color: #666666;
  font-size: 12px;
  text-align: center;
}
.main-container {
  overflow: hidden;
  width: 1200px;
  margin: 0 auto;
  .right-container {
    margin-left: 220px;
  }
}
.el-header {
  padding: 0;
  .top-bar {
    height: 30px;
    background: #32374a;
  }
  .top-bar-container {
    font-size: 12px;
    line-height: 30px;
    color: #fffefe;
  }
  .divider {
    margin: 0 10px;
  }
  /deep/ .el-badge__content.is-fixed {
    position: static;
    right: 0;
    margin-left: 2px;
    padding: 0 4px;
    height: 14px;
    line-height: 14px;
    color: #fafafa;
    background: #ff0000;
    transform: none;
    border: 0;
  }
  .top-container {
    background: #ffffff;
    height: 60px;
    .logo-box {
      line-height: 60px;
      color: #080404;
      font-size: 18px;
      img {
        margin-right: 15px;
      }
    }
    .down-icon {
      padding-left: 15px;
    }
    .score-box {
      font-size: 12px;
      line-height: 20px;
      .score-item {
        margin: 0 15px;
      }
      .score-value {
        color: #c33237;
      }
    }
  }
}
.container {
  width: 1200px;
  margin: 0 auto;
}
</style>
