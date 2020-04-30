<template>
  <div
    class="jewelry-room-list"
    @click="linkTo(data.id)"
  >
    <div
      class="jeweler-photo lazy-img-box"
      v-lazy:background-image="$setImg(data.logo, { w: 100 })"
    ></div>
    <div class="jeweler-desc">
      <p class="jewelry-room-name">
        <span class="name">{{data.name}}</span>
        <span class="location"><i class="ico-location2"></i>{{data.merchantAddr}} {{data.merchantCity === data.merchantAddr ? '' : data.merchantCity}}</span>
      </p>
      <p
        class="jewelry-room-tag"
        v-if="data.merchantCategoryList && data.merchantCategoryList.length>0"
      >主营
        <!-- <template v-for="item in data.merchantCategoryList">{{item}}</template> -->
        <template>{{data.merchantCategoryList.join('、')}}</template>
        等</p>
      <p
        class="jewelry-room-tag"
        v-else-if="data.skilld"
      >主营{{data.skilld}}等</p>
    </div>
    <!--<ul class="jeweler-info">
      <li><i class="ico-location2"></i>{{data.merchantAddr}} {{data.merchantCity === data.merchantAddr ? '' : data.merchantCity}}</li>
      <li><i class="ico-focus"></i>{{data.fansNum}}</li>
      <li><i class="ico-browse"></i>{{data.sellCount}}</li>
    </ul>-->
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    default: () => {
      return {

      }
    }
  },
  methods: {
    linkTo(id) {
      this.$router.push({
        name: 'jewelry-detail',
        query: { id }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.jewelry-room-list {
  margin: 10px 10px 0;
  border: 1px solid #e6e8eb;
  /* box-shadow: 0px 2px 3px 0px rgba(230, 232, 235, 0.4); */
  border-radius: 7px;
  overflow: hidden;
  & .jeweler-photo {
    height: 175px;
  }
  & .jeweler-desc {
    padding: 10px 10px 15px;
    background: #ffffff;
    & .jewelry-room-name {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      & .name {
        display: inline-block;
        width: 200px;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & .location {
        max-width: 136px;
        font-size: 15px;
        font-weight: normal;
        color: #999;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: right;
        & i {
          vertical-align: bottom;
        }
      }
    }
    & .jewelry-room-tag {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-top: 5px;
      font-size: 14px;
      color: var(--gray);
    }
  }
  & .jeweler-info {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    & li {
      width: 40%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 15px;
      color: var(--dark-gray);
      & i {
        vertical-align: middle;
        margin-right: 4px;
      }
    }
  }
}
</style>
