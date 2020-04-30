<template>
  <div class="app-card-item">
    <div style="margin-bottom:5px;line-height:12px;">
      <img
        :src="data.merchantPic"
        style="width:12px;margin-right:5px;border-radius:6px;vertical-align: top;"
      />
      <span>{{data.merchantName}}</span>
    </div>
    <div class="card-main flex-row van-hairline--bottom">
      <div
        class="img-box"
        :class="(data.goodsState == 2 || data.goodsState == 3) ? 'no-sale-img' : ''"
      >
        <img
          class="card-image"
          :src="data.imgUrl"
        >
        <div
          class="no-sale-text"
          v-if="data.goodsState == 2"
        >
          <p>已下架</p>
        </div>
        <div
          class="no-sale-text"
          v-if="data.goodsState == 3"
        >
          <p>已删除</p>
        </div>
      </div>
      <div class="card-info">
        <div class="row-between">
          <p :class="(data.isOnSale || data.isDelete) ? 'no-sale-sign' : ''">
            <span
              class="sign"
              v-if="data.collectSource == 1"
            >去哪儿买</span>
            <span
              class="sign"
              v-else-if="data.collectSource == 5"
            >找设计师</span>
            <span
              class="sign"
              v-else-if="data.collectSource == 6"
            >寻代工</span>
            <span class="card-name text-hidden">
              {{data.title}}
            </span>
          </p>
          <div class="card-keyword">
            <p :class="(data.isOnSale || data.isDelete) ? 'grey' : 'red'">
              <span>￥{{data.price}}</span>
            </p>
          </div>
          <van-button
            class="btn collect-btn"
            color="#999999"
            @click.native.stop="deleteUserFootprint(data.collectSource)"
            plain
          >删除</van-button>
        </div>

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
      isCollect: true
    }
  },
  methods: {
    setImg,
    deleteUserFootprint(goodsSource) {
      this.$service("deleteUserFootprint", {
        data: { goodsIds: this.data.id, goodsSource: goodsSource }
      }).then(result => {
        this.isCollect = !this.isCollect
        this.$emit('collectSuccess', this.isCollect)
      })
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
  & .img-box.no-sale-img {
    width: 67px;
    height: 67px;
    position: relative;
    z-index: 1;
    margin: 0 auto;
    background: #000;
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
  }
  & .card-info {
    position: relative;
    flex: 1;
    margin-left: 15px;
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
  & .card-keyword {
    position: absolute;
    bottom: 0;
    font-size: 13px;
  }
  & .card-describe {
    line-height: 22px;
  }
  & .sign {
    display: inline-block;
    color: #fb746e;
    border: 1px solid #fb746e;
    padding: 0 4px;
    vertical-align: middle;
    border-radius: 2px;
  }
  & .no-sale-sign .sign {
    color: #999999;
    border-color: #999999;
  }
  & .btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0;
    width: 47px;
    height: 19px;
    line-height: 19px;
    font-size: 11px;
    border-radius: 3px;
  }
  & .grey {
    color: #aaaaac;
  }
}
</style>
