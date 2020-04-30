<template>
  <div class="Base-goods-detail">
    <div
      class="detail-describe"
      v-if="work.goodsName"
    >
      <div class="desc-table">
        <div style="padding: 15px 10px 10px !important;">产品参数</div>
        <table style="width: 100%;word-wrap: break-word; word-break: break-all;">
          <tr>
            <td width="33%">品牌名称</td>
            <td>{{work.brandName}}</td>
          </tr>
          <tr
            v-for="(item, i) in work.goodsCategoryAttributesVOS"
            :key="i"
          >
            <td width="33%">{{item.attributesName}}</td>
            <td>{{item.subsidiaryAttributesValue?item.subsidiaryAttributesValue:'无'}}</td>
          </tr>
        </table>
      </div>
      <div
        class="word-break"
        v-lazy-container="{ selector: 'img' }"
        v-html="lazyImgHtml(work.goodsDesc)"
      ></div>
    </div>
  </div>
</template>

<script>
import { lazyImgHtml } from "~/utils/filters";
import { setImg } from "~/utils/qiniu";

export default {
  data() {
    return {
      work: {
      }
    };
  },
  async beforeMount() {
    // 获取商品详情
    this.getJewelryInfo();
  },
  deactivated() {
    this.$destroy();
  },
  methods: {
    setImg,
    lazyImgHtml,
    getJewelryInfo() {
      this.$loading(
        this.$service("jewelryInfo", {
          data: {
            goodsId: this.$route.query.id
          }
        })
      )
        .then(result => {
          this.work = result.data;
        })
    }
  }
};
</script>

<style lang="postcss" scoped>
.detail-describe {
  padding: 0 15px;
  background: #fff;
  & /deep/ p {
    color: #585858;
    line-height: 1.5em;
  }
  & /deep/ div,
  & /deep/ ul,
  & /deep/ li,
  & /deep/ h2 {
    max-width: 345px !important;
    height: auto !important;
    padding: 0 !important;
    margin: 0 !important;
    position: static !important;
    line-height: 1.5em !important;
  }
  & /deep/ img {
    max-width: 345px !important;
    height: auto !important;
    margin: 0;
    display: block;
  }
  & /deep/ strong {
    font-weight: bold;
  }
  & /deep/ a {
    word-break: break-all;
  }
}
.desc-table table {
  margin-bottom: 10px;
  font-size: 13px;
  color: #666;
  & td {
    padding: 7px;
    border: 1px solid #e5e5e5 !important;
  }
}
</style>
