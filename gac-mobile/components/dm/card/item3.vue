<template>
  <ul class="active-list">
    <li>
      <div class="active-header">
        <div class="active-photo lazy-img-box"
             v-lazy:background-image="$setImg(data.phonePath, { w: 180 })"></div>
        <div class="active-desc">
          <div>
            <p class="active-name">
              {{data.title}}
            </p>
            <div class="area-info"
                 v-html="data.content"></div>
          </div>
          <div class="active-footer">
            <van-row type="flex">
              <van-col span="10">{{data.updateTime}}</van-col>
              <van-col span="14">
                <img class="icon_eye"
                     src="../../../static/icons/icon_eye.png" />{{data.rate}}
                <img class="icon_like"
                     src="../../../static/icons/icon_like.png" />{{data.likeNum}}
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: Object,
    default: () => {
      return {

      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.active-list {
  width: 355px;
  padding: 20px 0;
  margin: 10px auto 0;
  /* border: 1px solid #e5e5e5; */
  border-radius: 3px;
  background: #fff;
  & .active-header {
    display: flex;
    & .active-photo {
      width: 80px;
      height: 80px;
      background-color: #ededed;
      margin: 0 10px 0 15px;
    }
    & .active-desc {
      line-height: 1.5;
      position: relative;
      & .active-name {
        font-size: 15px;
        font-weight: 600;
        color: #333;
      }
      & .active-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        color: #999999;
        font-size: 12px;
      }
    }
    & .area-info {
      margin-bottom: 25px;
      font-size: 12px;
      color: #999;
      width: 200px;
      height: 36px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
.icon_eye {
  width: 20px;
  vertical-align: top;
}
.icon_like {
  width: 16px;
  margin-left: 8px;
  vertical-align: top;
}
</style>
