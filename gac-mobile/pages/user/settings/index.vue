<template>
  <AppView title="安全设置">
    <van-cell-group :border="false">
      <!-- <van-cell
        title="个人信息"
        is-link
        :to="{name: 'user-profile'}"
      />
      <van-cell
        title="我的实名认证"
        is-link
        :to="{name: 'user-auth', query: {id: id}}"
      /> -->
      <van-cell
        title="密码修改"
        is-link
        @click="changePwd(userInfo.changePasswordStatus)"
      />
      <!-- :to="{name: 'user-password-modify'}" -->
      <van-cell
        title="修改手机号"
        is-link
        @click="handlerMobilePhone"
      />
      <van-cell
        title="实名认证"
        :value="isAuth"
        is-link
        @click="toAuth"
      />
      <!-- <van-cell
        title="帮助与反馈"
        is-link
        :to="{name: 'user-help'}"
      /> -->
    </van-cell-group>
    <van-cell-group
      :border="false"
      v-if="
        userInfo.wechatUnionid || userInfo.qunionid || userInfo.weiboUnionid
      "
    >
      <van-cell
        title="微信"
        value="已绑定"
        is-link
        v-if="userInfo.wechatUnionid"
        @click="undindDialog(2)"
      />
      <van-cell
        title="QQ"
        value="已绑定"
        is-link
        v-if="userInfo.qunionid"
        @click="undindDialog(1)"
      />
      <van-cell
        title="微博"
        value="已绑定"
        is-link
        v-if="userInfo.weiboUnionid"
        @click="undindDialog(3)"
      />
    </van-cell-group>
    <van-cell-group :border="false">
      <van-cell
        title="问题反馈"
        is-link
        :to="{ name: 'user-help-feedback' }"
      />
      <!-- 为了520暂时屏蔽 -->
      <!-- <van-cell
        title="举报记录"
        is-link
        :to="{ name: 'user-report' }"
      />
      <van-cell
        title="隐私设置"
        is-link
        :to="{ name: 'user-settings-privacy',query: {
          concernListStatus: userInfo.concernListStatus,
          fansListStatus: userInfo.fansListStatus
        } }"
      /> -->
      <van-cell
        title="服务协议"
        is-link
        :to="{ name: 'user-agreement-service' }"
      />
      <van-cell
        title="隐私协议"
        is-link
        :to="{ name: 'user-agreement-privacy' }"
      />
    </van-cell-group>
    <div class="padding">
      <van-button
        :loading="loading"
        @click="logout"
        block
        type="default"
      >退出登录</van-button>
    </div>
    <van-dialog
      title="解除绑定"
      message="是否解除绑定？"
      v-model="unbindShow"
      show-cancel-button
      @confirm="unbind"
    ></van-dialog>
  </AppView>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      loading: false,
      unbindShow: false,
      unbindType: "",
      id: "",
      userInfo: {},
      isAuth: ""
    };
  },
  beforeMount() {
    this.$store.dispatch("user/checkLogin", this.$router);
  },
  activated() {
    this.$service("userInfo").then(result => {
      this.id = result.data.id;
      this.userInfo = result.data;
    });
    this.$service("userIsAuth").then(result => {
      let res = result.data;
      if (JSON.stringify(res) !== "{}") {
        switch (res.user.authState) {
          case 1:
            this.isAuth = "认证中";
            break;
          case 2:
            this.isAuth = "已认证";
            break;
          case 3:
            this.isAuth = "认证不通过";
            break;
          default:
            this.isAuth = "未认证";
            break;
        }
      } else {
        this.isAuth = "未认证";
      }
    });
  },
  methods: {
    toAuth() {
      if (
        this.id &&
        (this.isAuth === "未认证" || this.isAuth === "认证不通过")
      ) {
        this.$router.push({ name: "user-auth", query: { id: this.id } });
      }
    },
    changePwd(status) {
      if (status == 1 || status == 2) {
        this.$router.push({ name: "user-password-bindpwd" });
      } else if (status == 3) {
        this.$router.push({ name: "user-password-setpwd" });
      } else {
        this.$router.push({ name: "user-password-modify" });
      }
    },
    handlerMobilePhone() {
      this.$service("isCityEnter")
        .then(data => {
          this.$router.push({
            name: "user-mobile-modify",
            query: { id: this.id }
          });
        })
        .catch(data => {
          if (!data.success) {
            this.isCityEnterFlag = true;
          }
        });
    },
    undindDialog(unbindType) {
      this.unbindShow = true;
      this.unbindType = unbindType;
    },
    unbind() {
      this.$service("thirdUnbind", {
        data: {
          mobilePhone: this.userInfo.mobilePhone,
          loginType: this.unbindType
        }
      })
        .then(() => {
          this.$toast("解除绑定成功");
          this.$router.go(0);
        })
        .catch(() => { });
    },
    logout() {
      this.$loading(this.$service("userLogout"), "退出登录").then(() => {
        this.$store.commit("user/removeToken");
        if (!window.navigator.userAgent.includes("MicroMessenger")) {
          this.$native.loginOrLogout("");
        }
        //    	localStorage.removeItem('fromUrl')
        //    	localStorage.removeItem('from1')
        //    	localStorage.removeItem('from2')
        localStorage.clear();

        this.$router.push({ name: "index" });
      });
    }
  }
};
</script>
<style lang="postcss" scoped>
>>> .van-cell-group {
  margin: 10px;
  border-radius: 6px;
  overflow: hidden;
  &:after {
    border-top: none;
  }
  & .van-cell {
    padding: 10px;
    height: 59px;
    line-height: 37px;
    font-size: 17px;
  }
  & .van-cell__value {
    font-size: 14px;
  }
  & .van-cell__right-icon {
    margin-top: 7px;
  }
  & .van-cell:not(:last-child)::after {
    left: 0;
  }
  & .no-bind.van-cell span {
    margin-right: 21px;
  }
}
.padding {
  padding: 0 10px;
  & >>> .van-button--normal {
    height: 59px;
    font-size: 16px;
    border: none;
    border-radius: 6px;
  }
}
</style>
