<template>
  <div class="app-card-item">
    <div class="card-main flex-row van-hairline--bottom">
      <div
        class="card-image lazy-img-box"
        v-if="data.imgUrl"
        v-lazy:background-image="setImg(data.imgUrl, { w: 400 })"
      ></div>
      <div class="card-info">
        <p>
          <span
            class="sign"
            v-if="data.merchantType == 1"
          >去哪儿买</span>
          <span
            class="sign"
            v-else-if="data.merchantType == 2"
          >找设计师</span>
          <span
            class="sign"
            v-else-if="data.merchantType == 3"
          >寻代工</span>
          <span class="card-name text-hidden">
            {{data.title}}
          </span>
        </p>
        <p class="card-number">
          <span>粉丝：{{data.concernNum}}</span>
        </p>
        <van-button
          class="btn collect-btn"
          color="#999999"
          v-if="isConcern"
          @click.native.stop="concern(0)"
          plain
        >已关注</van-button>
        <van-button
          class="btn collect-btn"
          color="#DF735A"
          v-if="!isConcern"
          @click.native.stop="concern(1)"
        >关注</van-button>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { setImg } from '~/utils/qiniu'

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isConcern: true
    }
  },
  methods: {
    setImg,
    concern(type) {
      if (type) {
        this.$service('ShopConcern', { data: { merchantId: this.data.merUserId } }).then((data) => {
          this.isConcern = !this.isConcern
          this.$emit('collectSuccess', this.isConcern)

        }).catch(() => { })
      } else {
        this.$service('removeShopConcern', { data: { merchantId: this.data.merUserId } }).then((data) => {
          this.isConcern = !this.isConcern
          this.$emit('collectSuccess', this.isConcern)
        }).catch(() => { })
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.app-card-item {
  padding: 10px 10px 0;
  font-size: 12px;
  color: var(--black);
  background-color: white;
  line-height: 18px;
  & .card-main {
    padding-bottom: 10px;
  }
  & .card-image {
    width: 67px;
    height: 67px;
  }
  & .card-info {
    position: relative;
    flex: 1;
    margin-left: 10px;
    & p {
      vertical-align: middle;
    }
  }
  & .card-name {
    display: inline-block;
    margin-left: 5px;
    width: 186px;
    font-size: 14px;
    vertical-align: middle;
  }
  & .sign {
    display: inline-block;
    color: #fb746e;
    border: 1px solid #fb746e;
    padding: 0 4px;
    vertical-align: middle;
    border-radius: 2px;
  }
  & .card-number {
    position: absolute;
    bottom: 0;
    font-size: 12px;
    color: #aaaaac;
  }
  & .btn {
    position: absolute;
    top: 34px;
    right: 0;
    padding: 0;
    width: 47px;
    height: 19px;
    line-height: 19px;
    font-size: 11px;
    border-radius: 3px;
  }
}
</style>
