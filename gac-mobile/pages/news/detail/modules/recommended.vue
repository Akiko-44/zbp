<template>
  <div class="recommended" v-if="item.id">
    <divider class="title">相关推荐</divider>
    <single-image
      :key="item.id"
      :id="item.id"
      :img="item.thumbnail"
      :title="item.title"
      :desc="item.commentTime | ago"
      :comment="item.commentNum ? '评论' + item.commentNum : ''"
      @click="linkTo"
    />
    <!-- <multiple-image
      :imgs="[img, img, img]"
      :title="'感受爱的温暖与沉稳'"
      :desc="'25分钟前'"
      :comment="'评论1232'"
      :id="1"
      @click="linkTo"
    /> -->
  </div>
</template>

<script>
import Divider from '~/components/common/divider'
import SingleImage from '~/components/news/card/singleImage'
import MultipleImage from '~/components/news/card/multipleImage'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    Divider,
    SingleImage,
    MultipleImage
  },
  data () {
    return {
    }
  },
  methods: {
    linkTo (id) {
      this.$router.push({
        name: 'news-detail',
        query: { id }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.title {
  margin: 0 auto;
  width: 270px;
  color: var(--dark-gray);
  font-size: 12px;
}
</style>
