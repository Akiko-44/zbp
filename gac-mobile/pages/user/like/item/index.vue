<template>
  <div class="app-card-item">
    <div class="card-main flex-row">
      <!-- <div
        class="card-image lazy-img-box"
        v-if="data.imgUrl"
        v-lazy:background-image="setImg(data.imgUrl, { w: 400 })"
      ></div> -->
      <img
        class="card-image"
        :src="data.imgUrl"
        alt=""
      />
      <div class="card-info">
        <div class="">
          <div class="card-name">
            {{ data.title }}
          </div>
          <!-- <div class="card-brief">
            {{ data.brief }}
          </div> -->
          <div class="card-else">
            <div class="column-box">
              <span class="column">{{ data.columnName }}</span>
            </div>
            <span><i class="ico-liked-24"></i> {{ data.likeNumber }}</span>
          </div>
          <van-button
            class="btn collect-btn"
            color="#999999"
            v-if="isLike"
            @click.native.stop="like(2)"
            plain
          >已喜欢</van-button>
          <van-button
            class="btn collect-btn"
            color="#DF735A"
            v-if="!isLike"
            @click.native.stop="like(1)"
          >喜欢</van-button>
        </div>
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
      isLike: true
    }
  },
  methods: {
    setImg,
    like(type) {
      this.$service("jewelryCircleLike", {
        data: {
          likeContentId: this.data.id,
          likeType: 1,
          clickType: type
        }
      }).then(result => {
        this.data.likeNumber = result.data
        this.isLike = !this.isLike
        this.$emit('likeSuccess', this.isLike)
      });
    }
  }
};
</script>

<style lang="postcss">
.app-card-item {
  padding: 10px 10px 0;
  font-size: 14px;
  color: var(--black);
  background-color: white;
  line-height: 18px;
  & .card-main {
    padding-bottom: 10px;
  }
  & .card-image {
    width: 92px;
    height: 92px;
    border-radius: 4px;
  }
  & .card-info {
    /* flex: 1; */
    margin-left: 10px;
    width: calc(100% - 92px - 10px);
  }
  & .card-name {
    /* flex: 1; */
    margin-bottom: 10px;
    width: 100%;
  }
  & .card-brief {
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    height: 36px;
  }
  & .card-else {
    position: absolute;
    bottom: 16px;
  }
  & .column-box {
    display: inline-block;
    width: 80px;
  }
  & .card-else .column {
    /* width: 60px; */
    padding: 0 6px;
    line-height: 20px;
    text-align: center;
    color: #fb746e;
    border: 1px solid #fb746e;
    border-radius: 2px;
    display: inline-block;
    /* margin-right: 20px; */
    font-size: 12px;
  }
  & .card-describe {
    line-height: 22px;
  }
  & .btn {
    position: absolute;
    right: 10px;
    bottom: 16px;
    padding: 0;
    width: 47px;
    height: 20px;
    line-height: 20px;
    font-size: 11px;
    border-radius: 3px;
  }
}
</style>
