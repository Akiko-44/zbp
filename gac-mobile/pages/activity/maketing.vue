<template>
  <AppView>
    <div class="box">
      <div
        class="bg"
        :style="{backgroundImage: 'url(' + bgImg + ')'}"
      >
        <!-- <img src="../../assets/images/maketing.png" /> -->
        <span @click="enter"></span>
      </div>
    </div>
  </AppView>
</template>

<script>
import { setImg } from '~/utils/qiniu'
export default {
  data() {
    return {
      bgImg: require('../../assets/images/maketing.png')
    }
  },
  activated() {
    this.$service('attractSMSLink')
      .then(() => { }).catch(() => { })
  },
  methods: {
    setImg,
    enter() {
      this.$service('attractSMSSetShop')
        .then(() => {
          this.$router.push({
            name: 'user-shop-membershopEntry',
            query: {
              setshopType: 5
            }
          })
        }).catch(() => { })
    }
  },
}
</script>

<style lang="postcss" scope>
.box {
  width: 100%;
  min-height: 100vh;
  height: 3569px;
  background: #000;
  & .bg {
    position: relative;
    height: 100%;
    background-size: 100%;
    background-repeat: no-repeat;
    & img {
      display: block;
      width: 100%;
    }
  }
  & span {
    position: absolute;
    width: 305px;
    height: 55px;
    bottom: 143px;
    left: 50%;
    margin-left: -152px;
    background: url(../../assets/images/maketingclick.gif) no-repeat center;
    background-size: 100%;
  }
}
</style>
