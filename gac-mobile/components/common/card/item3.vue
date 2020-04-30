<template>
  <div class="app-card-item3" @click="toDetail(data.source, data.goodId)">
    <div class="card-header flex-row">
      <div
        class="card-image lazy-img-box"
        v-lazy:background-image="setImg(data.imgUrl, { w: 400 })"
      ></div>
      <div class="card-info">
        <div class="row-between" v-if="data.name">
          <div class="card-name">
            <span v-if="data.goodsType === 1" class="assemble-label">拼团</span
            >{{ data.name }}
          </div>
        </div>
        <div class="card-describe" v-if="data.skuExplain">
          <template v-for="(item, i) in data.skuExplain">
            <span class="sku-item"
              >{{ item.specsName }}：{{ item.attrValue
              }}<span v-if="i !== data.skuExplain.length - 1">；</span></span
            >
          </template>
        </div>
        <div
          class="row-between price-box"
          v-if="data.unitPrice && data.goodsNumber"
        >
          <div v-if="data.unitPrice" class="card-unitPrice">
            <span>{{ data.unitPrice }}</span>
            <del v-if="data.marketPrice && data.goodsType === 1">{{
              data.marketPrice
            }}</del>
          </div>
          <div class="goods-num">x{{ data.goodsNumber }}</div>
        </div>
      </div>
    </div>
    <!--<div class="card-footer row-between">
      <span class="red card-price">{{data.price}}</span>
      <div class="card-actions">
        <slot name="btns" />
      </div>
    </div>-->
  </div>
</template>

<script>
import { setImg } from "~/utils/qiniu";

export default {
  props: {
    data: Object
  },
  methods: {
    setImg,
    toDetail(source, id) {
      var name = "";
      var url = "";
      if (source == 1) {
        name = "jewelry-work";
        url = "jewelry/work?id=" + id;
      } else if (source == 5) {
        name = "design-work";
        url = "design/work?id=" + id;
      } else if (source == 6) {
        name = "maker-work";
        url = "maker/work?id=" + id;
      }
      /*this.$router.push({
        name: name,
        query: { id: id, orderToDetail: true }
      })*/
      if (this.$native.isApp()) {
        let data = {};
        data.url = url;
        data.type = 1;
        this.$native.goToNextPage(data);
      } else {
        this.$router.push({
          name: name,
          query: {
            id: id
          }
        });
      }
    },
    goToNextPage(id) {}
  }
};
</script>

<style lang="postcss">
.app-card-item3 {
  font-size: 13px;
  color: var(--black);
  background-color: white;
  line-height: 18px;
  & .card-header {
    padding: 0 10px 10px;
  }
  & .card-image {
    width: 89px;
    height: 89px;
    border-radius: 3px;
  }
  & .card-info {
    flex: 1;
    margin-left: 17px;
  }
  & .price-box {
    margin-top: 5px;
  }
  & .card-name {
    flex: 1;
    /* margin-bottom: 5px; */
    min-height: 30px;
    font-size: 12px;
    color: #333;
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
  & .card-unitPrice {
    width: 90px;
    color: #fb746e;
    font-size: 17px;
    & del {
      margin-left: 6px;
      font-size: 12px;
      color: #999;
    }
  }
  & .goods-num {
    font-size: 13px;
    color: #1f1f1f;
  }
  & .card-describe {
    height: 32px;
    font-size: 12px;
    color: #aaaaab;
    & .sku-item {
      display: inline-block;
      margin-right: 10px;
    }
  }
  & .card-price {
    font-size: 15px;
  }
  & .card-footer {
    padding: 10px;
    align-items: center;
  }
  & .card-actions-btn {
    margin-right: 10px;
    padding: 4px 14px;
    background-color: var(--light-gray);
    border: none;
    border-radius: 3px;
    line-height: normal;
    &:after {
      border-radius: 4px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
