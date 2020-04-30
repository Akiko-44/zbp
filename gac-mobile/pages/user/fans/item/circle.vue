<template>
  <div class="app-card-item">
    <div class="card-main flex-row">
      <!-- <img
        class="card-image"
        :src="data.imgUrl"
        alt=""
      /> -->
      <div
        class="img-box"
        :class="!data.isOnSale ? 'no-sale-img' : ''"
      >
        <img
          class="card-image"
          :src="data.imgUrl"
        >
        <div
          class="no-sale-text"
          v-if="!data.isOnSale"
        >
          <p>已冻结</p>
        </div>
      </div>
      <div class="card-info">
        <div class="card-name text-hidden">
          {{ data.name }}
        </div>
        <div class="bottom">
          <p class="card-number">
            <span>粉丝数：{{fansNumber}}</span>
            <span>内容数：{{data.contentNum}}</span>
          </p>
          <p
            class="new"
            v-if="data.news"
          >有新的内容噢，快去看看吧!</p>
        </div>
        <van-button
          class="btn collect-btn"
          color="#999999"
          v-if="isConcern"
          @click.native.stop="concern(2)"
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
import { setImg } from "~/utils/qiniu";

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isConcern: true,
      fansNumber: undefined
    }
  },
  created() {
    this.fansNumber = this.data.fansNum
  },
  methods: {
    setImg,
    concern(type) {
      this.$service("jewelryCircleConcern", {
        data: {
          authorId: this.data.id,
          concernType: type,
          authorType: this.data.authorType
        }
      }).then(result => {
        if (type === 1) {
          this.fansNumber++
        } else {
          this.fansNumber--
        }
        this.isConcern = !this.isConcern
        this.$emit('collectCircleSuccess', this.isConcern)
      })
    }
  }
};
</script>

<style lang="postcss" scoped>
.app-card-item {
  padding: 10px 10px 0;
  font-size: 14px;
  color: var(--black);
  background-color: white;
  line-height: 18px;
  & .card-main {
    padding-bottom: 10px;
  }
  & .img-box.no-sale-img {
    width: 67px;
    height: 67px;
    position: relative;
    z-index: 1;
    margin: 0 auto;
    background: #000;
    border-radius: 4px;
    & img {
      opacity: 0.5;
      filter: alpha(opacity=50);
    }
    & .no-sale-text {
      width: 100%;
      position: absolute;
      z-index: 2;
      top: 50%;
      margin-top: -9px;
      text-align: center;
      color: #fff;
    }
  }
  & .card-image {
    width: 67px;
    height: 67px;
    border-radius: 4px;
  }
  & .card-info {
    position: relative;
    margin-left: 15px;
    width: 255px;
  }
  & .card-name {
    margin-bottom: 10px;
    width: 100%;
  }
  & .bottom {
    position: absolute;
    bottom: 0;
  }
  & .card-number {
    font-size: 12px;
    color: #aaaaac;
    & span {
      margin-right: 20px;
    }
  }
  & .new {
    color: #df735a;
    font-size: 10px;
  }
  & .btn {
    position: absolute;
    right: 5px;
    bottom: 15px;
    padding: 0;
    width: 47px;
    height: 20px;
    line-height: 20px;
    font-size: 11px;
    border-radius: 3px;
  }
}
</style>
