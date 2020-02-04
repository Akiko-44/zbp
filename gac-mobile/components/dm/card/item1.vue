<template>
  <ul class="design-room-list">
    <li>
      <div class="design-room-header"
           @click="linkTo(data.id)">
        <div class="designer-photo lazy-img-box"
             v-lazy:background-image="$setImg(data.logo, { w: 180 })"></div>
        <div class="designer-desc">
          <div>
            <p class="design-room-name">
              {{data.title}}
              <span v-if="data.tag"
                    class="tag-danger">{{data.tag}}</span>
            </p>
            <p class="area-info">{{data.info}}</p>
          </div>
        </div>
      </div>
      <div class="work-list">
        <ul>
          <template v-for="(item, index) in data.imgs">
            <li class="lazy-img-box"
                :key="index"
                v-if="index < 3 && item.mainPicimg"
                v-lazy:background-image="$setImg(item.img, { w: 400 })"
                @click="$router.push({name: data.caseLink, query: {id: item.caseId}})"></li>
            <li class="lazy-img-box"
                :key="index"
                v-if="index < 3 && item.mainPic"
                v-lazy:background-image="$setImg(item.mainPic, { w: 400 })"
                @click="$router.push({name: data.caseLink, query: {id: item.caseId}})"></li>

          </template>
        </ul>
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
  },
  methods: {
    linkTo(id) {
      this.$router.push({
        name: this.data.link,
        query: { id }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.design-room-list {
  width: 355px;
  padding: 20px 0;
  margin: 10px auto 0;
  /* border: 1px solid #e5e5e5; */
  border-radius: 3px;
  background: #fff;
  & .design-room-header {
    display: flex;
    & .designer-photo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #ededed;
      margin: 0 10px 0 15px;
    }
    & .designer-desc {
      flex-grow: 1;
      line-height: 1.5;
      display: flex;
      align-items: center;
      & div {
      }
      & .design-room-name {
        font-size: 15px;
        font-weight: 600;
        color: #333;
      }
      & .tag-danger {
        display: inline-block;
        padding: 0px 7px;
        border-radius: 50px;
        background: #890f1c;
        color: #fff;
        font-size: 9px;
        font-weight: 100;
        margin-left: 20px;
      }
    }
    & .area-info {
      font-size: 12px;
      color: #999;
    }
  }
  & .work-list {
    & ul {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-left: 85px;
      & li {
        width: 73px;
        height: 72px;
        background-color: #ededed;
        margin: 7px 7px 0 0;
      }
    }
  }
}
</style>
