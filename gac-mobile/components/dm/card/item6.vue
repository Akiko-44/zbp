<template>
  <div class="card6">
    <div class="img lazy-img-box" v-lazy:background-image="$setImg(data.imgUrl, { w: 200 })"></div>
    <h4 class="title text-hidden">{{data.title}}</h4>
    <p class="desc">{{data.desc}}</p>
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
.card6 {
	position: relative;
  margin: 20px auto;
  height: 200px;
  border: 1px solid #E6E6E6;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	box-shadow: 1px 0 6px #E6E6E6;
	background: white;
  & .img {
    height: 150px;
    border-radius: 4px;
    background-color: var(--light-gray);
  }
  & .title {
    padding: 5px;
    line-height: 20px;
    font-size: 12px;
    border-top: 1px solid #E5E5E5;
  }
  & .desc {
    position: absolute;
    left: 50%;
    width: 70px;
    height: 30px;
    margin-left: -35px;
    line-height: 30px;
    background: #FFFFFF;
    border-radius: 15px;
    text-align: center;
    font-size: 12px;
    color: var(--red);
    border: 1px solid #E6E6E6;
    box-shadow: 1px 0 6px #E6E6E6;
  }
}
</style>
