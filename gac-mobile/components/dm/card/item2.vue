<template>
  <div class="card2">
    <div class="img lazy-img-box"
         v-lazy:background-image="$setImg(data.imgUrl, { w: 200 })"></div>
    <div class="card-info">
      <h4 class="title text-hidden">{{data.title}}</h4>
      <p class="desc">{{data.desc}}</p>
    </div>
    <span class="custom"
          v-if="data.caseType == 2">定制</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          imgUrl: ''
        }
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.card2 {
  position: relative;
  margin-bottom: 10px;
  background-color: #fff;
  -webkit-box-shadow: 0.08rem 0.08rem 0.1867rem rgba(0, 0, 0, 0.1);
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.1);
  border-radius: 0.1867rem;
  overflow: hidden;
  & .img {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    width: 100%;
    height: 163px;
    background-color: var(--light-gray);
  }
  & .card-info {
    font-size: 0.32rem;
    padding: 0.2667rem 0.1867rem;
  }
  & .title {
    margin-top: 10px;
    padding: 5px 0;
    line-height: 20px;
    font-size: 13px;
  }
  & .desc {
    margin-top: 8px;
    font-size: 12px;
    color: var(--red);
  }
  & .custom {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
    width: 1.2rem;
    height: 0.5867rem;
    text-align: center;
    line-height: 0.5867rem;
    color: #ffffff;
    font-size: 0.2667rem;
    background: rgba(107, 183, 74, 0.5);
    border-bottom-right-radius: 0.32rem;
    border-top-right-radius: 0.32rem;
  }
}
</style>
