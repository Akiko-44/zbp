<template>
  <AppView class="desing-list"
           title='设计师列表'>
    <van-tabs :class="{'h5-design-list-tab' : inH5}"
              :line-width="0.01"
              @click="click">
      <van-tab v-for="(item, index) in tabs"
               :title="item.name"
               :key="index">
        <div class="tab-content">
          <ListModule name="designerPage"
                      :query="{
              offset: 1,
              limit: 20,
              category: category,
              commentNumDesc: item.commentNumDesc || undefined,
              orderNumDesc: item.orderNumDesc || undefined
            }"
                      :ref="'list' + index">
            <template slot-scope="{ list }">
              <Card v-for="(item, index) in list"
                    :key="index"
                    :data="{
                	id: item.id,
                  logo: item.userLogo,
                  title: item.userName,
                  info: item.province + ' ' + item.city,
                  imgs: item.dcList,
                  link: 'design-detail',
                  caseLink: 'design-work'
                }" />
            </template>
          </ListModule>
        </div>
      </van-tab>
    </van-tabs>
    <!--<ul class="module-list">
      <li>设计室</li>
      <li class="active">设计师</li>
    </ul>
    <ul class="title-list">
      <li>设计室</li>
      <li class="active">设计师</li>
      <li>设计室</li>
    </ul>-->
  </AppView>
</template>
<script>
import Card from '~/components/dm/card/item1'
import ListModule from '~/components/common/list'
import { tabsList } from '~/utils/mixins'

export default {
  mixins: [tabsList],
  components: {
    Card,
    ListModule
  },
  head() {
    return {
      title: '设计师列表'
    }
  },
  data() {
    return {
      tabs: [{
        name: '综合排序'
      }, {
        name: '签单最多',
        orderNumDesc: 1
      }, {
        name: '好评最多',
        commentNumDesc: 1
      }],
      category: undefined,
      inH5: true,
    }
  },
  beforeMount() {
//	判断微信和app
    if (this.$native.isApp() || window.navigator.userAgent.includes('MicroMessenger')) {
      this.inH5 = false
      if (this.$native.isApp()) {
	    	this.$native.getTitle('设计师列表')
	    }
    }
  },
  mounted() {
    this.category = this.$route.query.category
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    click(index) {
//    this.removeEvent(index)
    },
    linkTo(id) {
      this.$router.push({
        name: 'design-detail',
        query: { id }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.desing-list {
  & .header {
    padding: 10px 15px;
  }
  & .module-list {
    display: flex;
    & li {
      flex-grow: 1;
      text-align: center;
      line-height: 45px;
      background: #f5f5f5;
      color: #333;
      border-bottom: 1px solid #f5f5f5;
    }
    & li.active {
      background: #fff;
      color: #c2a374;
    }
  }
  & .title-list {
    display: flex;
    box-shadow: 0 5px 7px #e6e8ee;
    & li {
      flex-grow: 1;
      text-align: center;
      line-height: 42px;
      color: #333;
    }
    & li.active {
      color: #c2a374;
    }
  }
}
>>> .van-tabs__wrap {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
}
>>> .h5-design-list-tab .van-tabs__wrap {
  top: 46px;
}
>>> .van-tabs__content {
  margin-top: 44px;
}
</style>
