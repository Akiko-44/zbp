<template>
<div :class="{'toggle': value}" class="comment-wrap">
  <div class="comment-container">
    <van-nav-bar
      :title="'评论回复'"
      class="comment-header"
      @click-right="$emit('input', false)"
    >
      <van-icon name="arrow" slot="right" />
    </van-nav-bar>
    <div class="comment-scroll">
      <div class="comment-list">
        <list-module
          :getData="() => {
            return this.$service('galleryAtlasCommentList', {
              data: this.query,
              resources: [this.$route.query.id]
            })
          }"
          :query="query"
          :immediateCheck="false"
          class="list-module"
          ref="list"
        >
          <template slot-scope="{ list }">
            <comment-item
              v-for="(item, index) in list"
              type="light"
              :key="index"
              :item="{
                name: item.commentUserName,
                text: item.content,
                date: item.createTime,
                img: item.commentUserLogo || defaultLogo
              }"
            />
          </template>
        </list-module>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ListModule from '~/components/common/list'
import CommentItem from '~/components/gallery/commentItem'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      firstLoad: true,
      query: {
        offset: 1,
        limit: 10
      },
      defaultLogo: require('~/assets/images/avatar.png')
    }
  },
  activated () {
    this.query.offset = 1
    this.$refs.list.loadData('clear')
  },
  components: {
    ListModule,
    CommentItem
  }
}
</script>

<style lang="postcss" scoped>
:root {
  --comment-height: 286px;
}

.comment-wrap {
  position: absolute;
  width: 100%;
  bottom: 48px;
  backface-visibility: hidden;
  transition: visibility 0.3s;
  visibility: hidden;
  overflow: hidden;
  z-index: 4;
  &.toggle {
    visibility: visible;
    transition: none;
    & .comment-container {
      transform: translate3d(0, 0, 0);
    }
  }
}

.comment-container {
  padding-bottom: 20px;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  transition: transform 0.3s ease-in-out;
  transform: translate3d(0, 100%, 0);
}

.comment-scroll {
  height: var(--comment-height);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.comment-header {
  background: transparent;
  color: white;
  opacity: 0.5;
  & .van-icon {
    color: white;
    transform: rotate(90deg);
  }
  &.van-hairline--bottom::after {
    opacity: 0.15;
  }
  & .van-nav-bar__title {
    max-width: 80%;
  }
}

.comment-list {
  padding: 0 12px;
}
</style>
