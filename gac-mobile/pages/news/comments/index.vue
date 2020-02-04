<template>
  <AppView title="评论" :navToggle="true">
    <ListModule
      :query="{offset: 1, limit: 20}"
      :resources="[$route.query.id]"
      :disabled="disabled"
      name="newsCommentList"
      class="list-module"
    >
      <template slot-scope="{ list }">
        <ItemModule
          v-for="(item, index) in list" :key="index"
          :name="item.commentUserName"
          :date="item.createTime"
          :content="item.content"
          :img="item.commentUserLogo || defaultLogo"
          :id="index"
        />
      </template>
    </ListModule>
    <SendComment
      :commentNum="null"
      @focus="disabled = true"
      @blur="disabled = false"
    />
  </AppView>
</template>

<script>
import ScrollToggle from '~/components/common/scrollToggle'
import ListModule from '~/components/common/list'
import SendComment from '~/components/news/sendComment'
import ItemModule from './modules/item'

export default {
  data () {
    return {
      disabled: false,
      defaultLogo: require('~/assets/images/avatar.png')
    }
  },
  deactivated () {
    this.$destroy()
  },
  components: {
    ScrollToggle,
    ListModule,
    ItemModule,
    SendComment
  }
}
</script>
