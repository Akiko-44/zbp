<template>
  <AppView
    class="Info"
    :clickLeft="onClickLeft"
    title="查看物流"
  >
    <div class="boxCon">
      <dl>
        <dt>
          <img
            class="imgss"
            v-lazy="setImg(imgs)"
          >
        </dt>
        <dd>
          <h4>物流公司: <span>{{data.express}}</span></h4>
          <h4>物流单号: <span>{{data.nu}}</span></h4>
        </dd>
      </dl>
    </div>
    <van-steps
      direction="vertical"
      :active="0"
      active-color="#f44"
    >
      <van-step
        v-for="(item, key) in data.data"
        :key="key"
        class="fonts"
      >
        <h3>{{item.context}}</h3>
        <p>{{item.time}}</p>
      </van-step>
    </van-steps>
  </AppView>
</template>

<script>
import { setImg } from '~/utils/qiniu'
export default {
  data() {
    return {
      data: {},
      imgs: this.$route.query.goods,
      expressData: {}
    }
  },
  deactivated() {
    this.$destroy()
  },
  beforeMount() {
    this.getExpressMap()
  },
  head() {
    return {
      title: '查看物流'
    }
  },
  methods: {
    setImg,
    onClickLeft() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    },
    getLogistics() {
      let self = this
      let apiName = this.$route.query.from === 'refund' ? 'refundExpressInfo' : 'orderExpressInfo'
      this.$service(apiName, { resources: [this.$route.query.bar] })
        .then(result => {
          self.data = JSON.parse(result.data)
          if (result.success) {
            for (let key in self.expressData) {
              if (self.data.com == self.expressData[key]) {
                self.data.express = key
              }
            }
          } else if (!result.success) {
            self.$toast(result.msg)
            // } else if (!self.data.result) {
            //   self.$toast(self.data.message)
          }
        }).catch(() => { })
    },
    getExpressMap() {
      this.$service('expressMap', {})
        .then(result => {
          this.expressData = result.data
          this.getLogistics()
        })
    }
  }
}
</script>

<style lang="postcss" scoped>
.boxCon {
  width: 95%;
  padding: 2.5%;
  height: 60px;
  background: #fff;
  & dl {
    display: flex;
    & dt {
      flex: 20%;
      & img {
        width: 75%;
        height: 60%;
        margin-left: 15%;
      }
    }
    & dd {
      flex: 70%;
      font-size: 13px;
      color: #333;
      line-height: 20px;
      padding: 4% 5px 5% 5px;
      & span {
        color: #9d9d9d;
      }
    }
  }
}
.fonts {
  font-size: 12px;
}
</style>