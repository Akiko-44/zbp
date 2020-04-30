<template>
  <AppView
    class="Info"
    :clickLeft="onClickLeft"
    title="查看物流"
  >
    <template v-if="!dataLoading">
      <div class="boxCon block">
        <p
          class="express-num"
          v-if="data.express"
        ><span>{{data.express}}：</span><span>{{data.nu}}</span></p>
      </div>
      <div class="block">
        <div class="steps">
          <div class="steps-items">
            <div
              class="step"
              v-for="(item, key) in data.data"
              :key="key"
            >
              <div class="step-title">
                <p
                  v-if="key == 0"
                  style="font-size:15px;"
                >运输中</p>
                <p
                  v-if="key == data.data.length - 1"
                  style="font-size:15px;"
                >已揽件</p>
                {{item.context}}
              </div>
              <div class="step-time">
                <p style="font-size:15px;">{{item.day}}</p>
                {{item.second}}
              </div>
              <div class="step-circle-container">
                <img
                  src="../../../assets/images/current_state_icon.png"
                  v-if="key == 0"
                  width="15"
                />
                <img
                  src="../../../assets/images/start_state_icon.png"
                  v-else-if="key == data.data.length - 1"
                  width="15"
                />
                <i
                  class="step-circle"
                  v-else
                ></i>
              </div>
              <div class="step-line"></div>
            </div>
          </div>
        </div>
        <!-- <van-steps
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
      </van-steps> -->
      </div>
    </template>
  </AppView>
</template>

<script>
import { setImg } from '~/utils/qiniu'
export default {
  data() {
    return {
      data: {},
      dataLoading: true,
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
      this.dataLoading = true
      let self = this
      let apiName = this.$route.query.from === 'refund' ? 'refundExpressInfo' : 'orderExpressInfo'
      this.$loading(this.$service(apiName, { resources: [this.$route.query.bar] }))
        .then(result => {
          this.dataLoading = false
          self.data = JSON.parse(result.data)
          if (self.data.message === 'ok') {
            self.data.data.map(item => {
              item.day = item.time.split(' ')[0].slice(5)
              item.second = item.time.split(' ')[1].slice(0, 5)
            })
            for (let key in self.expressData) {
              if (self.data.com == self.expressData[key]) {
                self.data.express = key
              }
            }
          } else {
            self.$toast(self.data.message)
            // } else if (!self.data.result) {
            //   self.$toast(self.data.message)
          }
        }).catch(() => {
          this.dataLoading = false
        })
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
.Info {
  padding-top: 10px;
}
.block {
  margin: 0 10px 10px;
  width: 355px;
  border-radius: 5px;
  background: #fff;
}
.boxCon {
  padding: 15px 10px;
  box-sizing: border-box;
  & .express-num {
    font-size: 14px;
    color: #333;
  }
}
.steps {
  padding-left: 90px;
  padding-top: 10px;
  font-size: 12px;
  color: #999;
  & .step {
    position: relative;
    display: block;
    float: none;
    padding: 10px 10px 10px 0;
    line-height: 18px;
    &:last-child .step-line {
      width: 0;
    }
    &:first-child {
      color: #df735a;
    }
  }
  & .step-time {
    position: absolute;
    top: 19px;
    left: -50px;
    z-index: 2;
    line-height: 1;
    text-align: center;
    transform: translate(-50%, -50%);
  }
  & .step-circle-container {
    position: absolute;
    top: 19px;
    left: -15px;
    z-index: 2;
    line-height: 1;
    transform: translate(-50%, -50%);
  }
  & .step-circle {
    display: block;
    width: 7px;
    height: 7px;
    background-color: #e5e5e5;
    border-radius: 50%;
  }
  & .step-line {
    top: 16px;
    left: -15px;
    width: 1px;
    height: 100%;
    position: absolute;
    background-color: #e5e5e5;
  }
}
</style>
