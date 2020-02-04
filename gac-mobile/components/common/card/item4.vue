<template>
  <div class="app-card-item4">
    <div class="card-main flex-row van-hairline--bottom">
      <div class="card-image lazy-img-box"
           v-lazy:background-image="setImg(data.imgUrl, { w: 400 })"
           v-if="data.goodsId && (data.goodstate == 0 || data.goodstate == 1)"
           @click="$router.push({name: name, query: {id: data.goodsId}})">
        <p class="sign"
           v-if="data.goodstate == 1"><span>库存不足</span></p>
      </div>
      <div class="card-image lazy-img-box"
           v-lazy:background-image="setImg(data.imgUrl, { w: 400 })"
           v-else-if="data.goodsId && data.goodstate == 2">
        <p class="sign"><span>已下架</span></p>
      </div>
      <div class="card-image lazy-img-box"
           v-lazy:background-image="setImg(data.imgUrl, { w: 400 })"
           v-else></div>
      <div class="card-info">
        <div @click="to(data.goodsId, data.goodstate)">
          <div class="row-between">
            <div class="card-name">
              <span v-if="data.purchaseType === 1"
                    class="assemble-label">拼团</span>
              {{data.title}}
            </div>
            <div class="card-keyword">
              <p class="red">{{data.price}}</p>
              <p class="gray">{{data.num}}</p>
            </div>
          </div>
          <div class="card-describe">
            <p class="gray">{{data.describe}}</p>
          </div>
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
    data: Object
  },
  data() {
    return {
      name: ''
    }
  },
  mounted() {
    let source = this.data.goodsSource
    switch (source) {
      case 1:
        this.name = "jewelry-work"
        break;
      case 5:
        this.name = "design-work"
        break;
      case 6:
        this.name = "maker-work"
    }
  },
  methods: {
    setImg,
    to(id, state) {
      if (id && (state == 0 || state == 1)) {
        this.$router.push({ name: this.name, query: { id: id } })
      }
    }
  }
}
</script>

<style lang="postcss">
.app-card-item4 {
  padding: 10px 10px 0;
  font-size: 12px;
  color: var(--black);
  background-color: white;
  line-height: 18px;
  & .card-main {
    padding-bottom: 10px;
  }
  & .card-image {
    position: relative;
    width: 75px;
    height: 75px;
    & .sign {
      display: block;
      width: 75px;
      height: 75px;
      text-align: center;
      background: rgba(255, 255, 255, 0.5);
    }
    & .sign span {
      position: absolute;
      left: 7px;
      top: 7px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.8);
    }
  }
  & .card-info {
    flex: 1;
    margin-left: 10px;
  }
  & .card-name {
    flex: 1;
    margin-bottom: 5px;
    word-wrap: break-word;
    width: 145px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    & .assemble-label {
      display: inline-block;
      margin-right: 6px;
      width: 29px;
      line-height: 15px;
      text-align: center;
      font-size: 12px;
      font-weight: normal;
      color: #fff;
      background: #d57e6a;
      border-radius: 3px;
    }
  }
  & .card-keyword {
    margin-left: 5px;
    width: 90px;
    text-align: right;
  }
  & .card-describe {
    line-height: 22px;
  }
}
</style>
