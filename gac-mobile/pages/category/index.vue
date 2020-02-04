<template>
  <AppView
    title="分类"
    class="category"
  >
    <van-tree-select
      :items="categoryList"
      :main-active-index="mainActiveIndex"
      :active-id="activeId"
      @navclick="onClickNav"
      @itemclick="chooseCategory"
      class="categoryLeft"
    >
      <template
        slot="content"
        v-for="(item, index) in categoryList"
      >
        <div
          :key="index"
          v-if="index == mainActiveIndex"
          class="categoryRight"
          id="categoryRight"
        >
          <div
            v-for="(items,i) in item.children"
            :key="i"
          >
            <h3 class="subtitle">{{items.catName}}</h3>
            <van-grid
              :column-num="3"
              :border="false"
            >
              <van-grid-item
                v-for="(value, i) in items.children"
                :key="i"
                :text="value.catName"
                style="text-align: center;"
                :icon="value.categoryPic"
                :clickable="true"
                @click="gridItem(value.id)"
              />
            </van-grid>
          </div>
        </div>
      </template>
    </van-tree-select>
    <AppTabbar
      :activeIndex="1"
      v-if="loadTabbar"
    />
  </AppView>
</template>

<script>
import AppTabbar from '~/components/swap/tabbar'
export default {
  components: {
    AppTabbar
  },
  data() {
    return {
      categoryList: [],
      mainActiveIndex: 0,
      activeId: 1,
      loadTabbar: true
    }
  },
  activated() {
    this.mainActiveIndex = Number(this.$route.query.navIndex) || 0
    this.setHeight()
    //  document.getElementsByClassName('van-tree-select')[0].style.height = '600px'
    this.loadTabbar = false
    this.$nextTick(() => {
      this.loadTabbar = true
    })
    this.$loading(this.$service('category')).then(result => {
      this.categoryList = result.data
      this.rename(this.categoryList)
    }).catch(() => { })
  },
  deactivated() {
    this.$destroy()
  },
  methods: {
    chooseCategory(data) {
      this.activeId = data.id
      this.$router.push({
        name: 'jewelry-product',
        query: {
          categoryId: data.parentId
        }
      })
    },
    gridItem(id) {
      this.$router.push({
        name: 'jewelry-product',
        query: {
          categoryId: id,
          entrance: 3
        }
      })
    },
    onClickNav(index) {
      this.mainActiveIndex = index
      this.$router.replace({ name: 'category', query: { navIndex: index } })
      document.getElementById('categoryRight').scrollIntoView()
    },
    // 前台属性名转换
    rename(list = []) {
      if (list.length > 0) {
        list.map(item => {
          item.text = item.text ? item.text : item.catName
          if (item.children && item.children.length > 0) {
            this.rename(item.children)
          }
        })
      }
      return list
    },
    setHeight() {
      let treeAllNode = document.getElementsByClassName('van-tree-select')[0]
      let treeNavNode = document.getElementsByClassName('van-tree-select__nav')[0]
      let treeNode = document.getElementsByClassName('category')[0]
      if (window.navigator.userAgent.includes('MicroMessenger')) {
        treeAllNode.style.height = window.innerHeight - 50 + 'px'
        treeNavNode.style.height = window.innerHeight - 50 + 'px'
        treeNode.style.height = window.innerHeight + 'px'
      } else {
        treeAllNode.style.height = window.innerHeight - 50 - 44 + 'px'
        treeNavNode.style.height = window.innerHeight - 50 - 46 + 'px'
        treeNode.style.height = window.innerHeight - 50 + 'px'
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.category {
  font-size: 12px;
  background: #fff;
}

.subtitle {
  font-weight: bold;
  color: #7d7e80;
}

/*>>> .van-tree-select{
	min-height: calc(100vh - 46px);
}*/

>>> .van-tree-select__nav {
  width: 91px;
  text-align: center;
}

>>> .van-tree-select__content {
  margin-left: 2px;
  padding: 0 0px 35px 10px;
}

>>> .van-tree-select__item {
  overflow: hidden;
  display: inline-block;
  padding: 0;
  margin: 0 0 15px 10px;
  width: 78px;
  height: 27px;
  line-height: 27px;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  border-radius: 4px;
  border: 1px solid var(--border-color);
}

>>> .van-tree-select__nitem {
  background: var(--light-gray);
}

>>> .van-tree-select__nitem.van-tree-select__nitem--active {
  color: var(--red);
  background: #fff;
  border-left: 2px solid var(--red);
}

>>> .van-tree-select__item.van-tree-select__item--active {
  color: #333;
}

>>> .van-grid-item__icon {
  font-size: 60px;
}

>>> .van-grid-item__content--center {
  justify-content: start;
}

>>> .van-grid-item__text {
  line-height: 1.5;
}

.categoryLeft {
  background: #fafafa;
}

.categoryRight {
  padding-top: 10px;
  padding-bottom: 20px;
}
</style>
