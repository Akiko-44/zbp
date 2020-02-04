<template>
  <div class="other-login">
    <divider class="divider">或者</divider>
    <ul class="row-center">
      <li>
        <img src="~/assets/images/qq.png">
        <p>QQ</p>
      </li>
      <li>
        <img src="~/assets/images/wechat.png">
        <p>微信</p>
      </li>
      <li>
        <img src="~/assets/images/weibo.png">
        <p>新浪微博</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Divider from '~/components/common/divider'

export default {
  components: {
    Divider
  }
}
</script>

<style lang="postcss" scoped>
.other-login {
  font-size: 13px;
  & .divider {
    margin-bottom: 15px;
    color: #e5e5e5;
  }
  & ul {
  }
  & li {
    margin: 0 10px;
    width: 90px;
    text-align: center;
    & img {
      margin: 0 auto;
      display: block;
      width: 43px;
      height: 43px;
    }
    & p {
      padding-top: 10px;
    }
  }
}
</style>
