<template>
  <div class="app-tabbar">
    <div
      class="tabbar-bg"
      :style="{backgroundImage: 'url(' + ( tabbarImg ? tabbarImg : tabbarBaseImg) + ')'}"
    >
      <van-tabbar
        v-model="active"
        :active-color="activeColor"
        :inactive-color="inActiveColor"
      >
        <van-tabbar-item
          v-for="(value, key) in navs"
          :key="key"
          replace
          @click="to(key)"
        >
          <span>{{navs[key].name}}</span>
          <!-- <i
            :class="[props.active ? navs[key].iconActive : navs[key].icon]"
            slot="icon"
            slot-scope="props"
          /> -->
          <img
            :class="key"
            :src="(props.active ? value.baseAcitveIcon : value.baseIcon)"
            width="18"
            slot="icon"
            slot-scope="props"
          >
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import { getToken } from '~/utils/auth'
export default {
  watch: {
    $route: {
      handler: function handler(route) {
        this.navs[route.name] && (this.active = this.navs[route.name].index)
      },
      immediate: true
    }
  },
  props: {
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      background: {},
      active: this.activeIndex,
      activeColor: '#d67f6a',
      inActiveColor: '#AAAAAA',
      tabbarBaseImg: require('../../../assets/images/label.png'),
      tabbarImg: '',
      navs: {
        'swap-index': {
          index: 0,
          id: '1000',
          name: '首页',
          to: {
            name: 'index'
          },
          // icon: 'ico-home_unselect',
          // iconActive: 'ico-home_select',
          baseIcon: require('../../../assets/images/icon/home_unselect.png'),
          baseAcitveIcon: require('../../../assets/images/icon/home_select.png')
        },
        'swap-classify': {
          index: 1,
          id: '1001',
          name: '分类',
          to: {
            name: 'category'
          },
          // icon: 'ico-classify_unselect',
          // iconActive: 'ico-classify_select',
          baseIcon: require('../../../assets/images/icon/classify_unselect.png'),
          baseAcitveIcon: require('../../../assets/images/icon/classify_select.png')
        },
        'swap-source': {
          index: 2,
          id: '1002',
          name: '溯源',
          to: {
            name: 'jewelrySearch-jewelryID',
            params: {
              showTabbar: true
            }
          },
          // icon: 'ico-source_unselect',
          // iconActive: 'ico-source_select',
          baseIcon: require('../../../assets/images/icon/source_unselect.png'),
          baseAcitveIcon: require('../../../assets/images/icon/source_select.png')
        },
        'swap-cart': {
          index: 3,
          id: '1003',
          name: '购物车',
          to: {
            name: 'swap-cart'
          },
          // icon: 'ico-shop_unselect',
          // iconActive: 'ico-shop_select',
          baseIcon: require('../../../assets/images/icon/shop_unselect.png'),
          baseAcitveIcon: require('../../../assets/images/icon/shop_select.png')
        },
        'swap-mine': {
          index: 4,
          id: '1004',
          name: '我的',
          to: {
            name: 'user-mine'
          },
          // icon: 'ico-my_unselect',
          // iconActive: 'ico-my_select',
          baseIcon: require('../../../assets/images/icon/my_unselect.png'),
          baseAcitveIcon: require('../../../assets/images/icon/my_select.png')
        }
      }
    }
  },
  mounted() {
    this.getBackground()
    // const background = JSON.parse(localStorage.getItem('appHomeTheme'))
    // if (background) {
    //   if (background.appFootCheckedFontColor) {
    //     this.activeColor = background.appFootCheckedFontColor
    //   }
    //   if (background.appFootDefaultFontColor) {
    //     this.inActiveColor = background.appFootDefaultFontColor
    //   }
    //   if (background.appFootImg) {
    //     this.tabbarImg = background.appFootImg
    //   }
    //   background.appFootNavigations.map(item => {
    //     for (let key in this.navs) {
    //       if (item.id === this.navs[key].id) {
    //         if (item.checkedIcon) {
    //           this.$set(this.navs[key], 'baseAcitveIcon', item.checkedIcon)
    //         }
    //         if (item.defaultIcon) {
    //           this.$set(this.navs[key], 'baseIcon', item.defaultIcon)
    //         }
    //       }
    //     }
    //   })
    // }
  },
  deactivated() {
    this.$destroy()
  },
  watch: {
    background: {
      handler(newValue, oldValue) {
        if (!Object.keys(this.background).length) return
        if (this.background) {
          if (this.background.appFootCheckedFontColor) {
            this.activeColor = this.background.appFootCheckedFontColor
          }
          if (this.background.appFootDefaultFontColor) {
            this.inActiveColor = this.background.appFootDefaultFontColor
          }
          if (this.background.appFootImg) {
            this.tabbarImg = this.background.appFootImg
          }
          this.background.appFootNavigations.map(item => {
            for (let key in this.navs) {
              if (item.id == this.navs[key].id) {
                if (item.checkedIcon) {
                  this.$set(this.navs[key], 'baseAcitveIcon', item.checkedIcon)
                }
                if (item.defaultIcon) {
                  this.$set(this.navs[key], 'baseIcon', item.defaultIcon)
                }
              }
            }
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    getBackground() {
      if (localStorage.getItem('appHomeTheme')) {
        this.background = JSON.parse(localStorage.getItem('appHomeTheme'))
      }
      this.$service("homeBackground", { data: { backgroundImgType: 4 } }).then(data => {
        this.background = data.data
        localStorage.setItem('appHomeTheme', JSON.stringify(this.background))
      })
    },
    to(key) {
      if (getToken() || this.navs[key].index < 3) {
        this.$router.replace(this.navs[key].to)
      } else {
        this.$router.push({
          name: 'user-login'
        })
      }
    }
  }
}
</script>

<style lang="postcss">
.app-tabbar {
  & .tabbar-bg {
    left: 0;
    bottom: -1px;
    position: fixed;
    width: 100%;
    height: 64px;
    /* background: url(../../../assets/images/label.png) no-repeat; */
    background-size: 100%;
    z-index: 100;
  }
  & .van-tabbar {
    background: transparent;
  }
  & .van-tabbar-item:nth-child(3) {
    margin-top: -14px;
  }
  & .van-hairline--top-bottom:after {
    border-width: 0;
  }
  & .ico-shop_unselect,
  & .ico-shop_select {
    margin-left: -3px;
  }
  & .swap-source {
    height: 35px;
    width: auto;
    background-position: -426px -11px;
  }
}
</style>
