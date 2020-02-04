<template>
  <div class="app-filter-item">
    <div
      class="item-name"
      @click="toggle"
      :class="{active: active}"
    >
      {{name}}
      <i class="ico-screen"></i>
    </div>
    <transition name="van-fade">
      <div
        class="item-main"
        v-show="active"
        v-disabledScroll="'item-main-inner'"
      >
        <div class="item-main-wrapper">
          <div :class="{'item-main-inner': true, 'in-h5': inH5}">
            <van-collapse v-model="activeNames">
              <van-collapse-item
                title="品牌"
                name="1"
                v-if="filterObj.brand && filterObj.brand.length"
              >
                <ul>
                  <li
                    class="items"
                    :class="item.id==postData.brandId ? 'active' : ''"
                    data="brand"
                    :brandid="item.id"
                    v-for="(item, index) in filterObj.brand"
                    :key="index"
                    @click="selectedItem(index,$event)"
                  >
                    <p><span>{{item.brandName}}</span></p>
                    <i class="ico-close"></i>
                  </li>
                </ul>
              </van-collapse-item>
              <van-collapse-item
                title="分类"
                name="2"
                v-if="filterObj.category && filterObj.category.length"
              >
                <ul>
                  <li
                    class="items"
                    :class="item.id==postData.categoryId ? 'active' : ''"
                    data="category"
                    :categoryid="item.id"
                    v-for="(item, index) in filterObj.category"
                    :key="index"
                    @click="selectedItem(index,$event)"
                  >
                    <p><span>{{item.catName}}</span></p>
                    <i class="ico-close"></i>
                  </li>
                </ul>
              </van-collapse-item>
              <van-collapse-item
                title="省份"
                name="3"
                v-if="filterObj.region && filterObj.region.length"
              >
                <ul>
                  <li
                    class="items"
                    :class="item.regionName==postData.provice ? 'active' : ''"
                    data="provice"
                    :pid="index"
                    v-for="(item, index) in filterObj.region"
                    :key="index"
                    @click="selectProvice(item.regionId, item.regionName,$event)"
                  >
                    <p><span>{{item.regionName}}</span></p>
                    <i class="ico-close"></i>
                  </li>
                </ul>
              </van-collapse-item>
              <van-collapse-item
                title="城市"
                name="4"
                v-if="cityList && cityList.length"
              >
                <ul>
                  <li
                    class="items"
                    :class="item.regionName==postData.city ? 'active' : ''"
                    data="city"
                    :cid="index"
                    v-for="(item, index) in cityList"
                    :key="index"
                    @click="selectedItem(item.regionName,$event)"
                  >
                    <p><span>{{item.regionName}}</span></p>
                    <i class="ico-close"></i>
                  </li>
                </ul>
              </van-collapse-item>
            </van-collapse>
          </div>
          <div class="item-actions-space">
            <div class="item-actions">
              <van-row>
                <van-col span="12">
                  <van-button
                    @click="reset"
                    type="default"
                    block
                  >
                    重置
                  </van-button>
                </van-col>
                <van-col span="12">
                  <van-button
                    @click="confirm"
                    class="primary-btn"
                    type="primary"
                    block
                  >
                    确定
                  </van-button>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
        <div
          class="mask"
          @click="hide"
          @touchmove.prevent
        ></div>
      </div>
    </transition>
  </div>
</template>

<script>
import areaList from '~/assets/data/areaList'

export default {
  props: {
    value: {
      type: [String, Number]
    },
    name: {
      type: String
    },
    data: {
      type: Object,
      default: () => ({})
    },
    props: {
      type: Object,
      default: () => ({
        label: 'label',
        value: 'value'
      })
    }
  },
  data() {
    return {
      inH5: true,
      areaList,
      cityList: [],
      secondCategoryList: [],
      currentValue: undefined,
      active: false,
      bactive: -1,
      cactive: -1,
      scactive: -1,
      pactive: -1,
      cityactive: -1,
      callback: () => { },
      activeNames: ['1', '2', '3', '4'],
      postData: {
        brandId: undefined,
        categoryId: undefined,
        provice: undefined,
        city: undefined,
        goodsSort: 0
      },
      filterObj: {}
    }
  },
  watch: {
    value: {
      handler: function handler(value) {
        this.currentValue = value
      },
      immediate: true
    }
  },
  mounted() {
    this.getFilterList()
  },
  activated() {
    //	判断微信和app
    if (this.$native.isApp() || window.navigator.userAgent.includes('MicroMessenger')) {
      this.inH5 = false
    }
  },
  methods: {
    getFilterList() {
      this.$service('getMerchantFilter', { data: this.postData }).then(result => {
        this.filterObj = result.data
      })
    },
    toggle() {
      this.callback(this.name)
      if (!this.active) {
        this.show()
      } else {
        this.hide()
      }
    },
    selectProvice(proviceId, proviceName, e) {
      let className = e.currentTarget.getAttribute('class')
      if (className.indexOf('active') > -1) {
        this.postData.provice = undefined
        this.postData.city = undefined
        this.cityList = []
      } else {
        /* let pid = e.currentTarget.getAttribute('pid')
        this.cityList = []
        for (var j in this.areaList.city_list) {
          if (pid.substr(0, 2) == j.substr(0, 2)) {
            this.cityList.push(this.areaList.city_list[j])
          }
        } */
        this.postData.provice = proviceName
        this.postData.city = undefined
        this.filterObj.region.map(item => {
          if (item.children && item.children.length && item.children[0].parentId == proviceId) {
            this.cityList = item.children
          }
        })
      }
      this.getFilterList()
      this.$emit('confirm', this.postData)
    },
    selectedItem(index, e) {
      let className = e.currentTarget.getAttribute('class')
      let curBId = e.currentTarget.getAttribute('brandid')
      let curCId = e.currentTarget.getAttribute('categoryid')
      let curSCId = e.currentTarget.getAttribute('secondcategoryid')
      if (className.indexOf('active') > -1) {
        if (e.currentTarget.getAttribute('data') == 'brand') {
          this.postData.brandId = undefined
          this.bactive = -1
        } else if (e.currentTarget.getAttribute('data') == 'category') {
          this.postData.categoryId = undefined
          this.cactive = -1
        } else if (e.currentTarget.getAttribute('data') == 'secondCategory') {
          curSCId = undefined
          this.scactive = -1
          this.postData.categoryId = e.currentTarget.getAttribute('secondcategorypid')
        } else if (e.currentTarget.getAttribute('data') == 'provice') {
          this.postData.provice = undefined
          this.pactive = -1
        } else if (e.currentTarget.getAttribute('data') == 'city') {
          this.postData.city = undefined
          this.cityactive = -1
        }
      } else {
        if (e.currentTarget.getAttribute('data') == 'brand') {
          this.postData.brandId = curBId
          this.bactive = index
        } else if (e.currentTarget.getAttribute('data') == 'category') {
          this.postData.categoryId = curCId
          this.cactive = index
          this.scactive = -1
          //获取二级分类
          this.data.category.forEach(item => {
            if (item.id == curCId) {
              this.secondCategoryList = item.children
            }
          })
        } else if (e.currentTarget.getAttribute('data') == 'secondCategory') {
          this.postData.categoryId = curSCId
          this.scactive = index
        } else if (e.currentTarget.getAttribute('data') == 'provice') {
          let pid = e.currentTarget.getAttribute('pid')
          this.cityList = []
          for (var j in this.areaList.city_list) {
            if (pid.substr(0, 2) == j.substr(0, 2)) {
              this.cityList.push(this.areaList.city_list[j])
            }
          }
          this.postData.provice = e.currentTarget.textContent
          this.pactive = index
        } else if (e.currentTarget.getAttribute('data') == 'city') {
          this.postData.city = e.currentTarget.textContent
          this.cityactive = index
        }
      }
      this.getFilterList()
      this.$emit('confirm', this.postData)
    },
    findCode(name, value) {
      for (let key in this.areaList[`${name}_list`]) {
        if (this.areaList[`${name}_list`][key].indexOf(value) !== -1) {
          return key
        }
      }
    },
    show() {
      document.body.classList.add('noscroll')
      this.active = true
    },
    hide() {
      document.body.classList.remove('noscroll')
      this.active = false
    },
    reset() {
      this.postData = {
        brandId: undefined,
        categoryId: undefined,
        provice: undefined,
        city: undefined,
        goodsSort: 0
      }
      this.cityList = []
      let activeEl = document.getElementsByClassName('active')
      let newArr = []
      for (var i = 0; i < activeEl.length; i++) {
        newArr.push(activeEl[i])
      }
      newArr.forEach(function (item, i) {
        item.classList.remove('active')
      })
      this.hide()
      this.getFilterList()
      this.$emit('confirm', this.postData)
    },
    confirm() {
      this.hide()
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="postcss">
.app-filter-item {
  flex: 1;
  & .item-name {
    text-align: center;
    font-size: 14px;
    &.active {
      color: var(--brown);
    }
  }
  & .item-main {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    height: 100vh;
    & .item-main-wrapper {
      position: relative;
      left: 64px;
      width: calc(100vw - 64px);
      height: 100vh;
      background: #fff;
      z-index: 1;
    }
    & .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1000px;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  & .item-main-inner {
    position: relative;
    z-index: 1;
    background: white;
    font-size: 0.3733rem;
    max-height: calc(100vh - 85px);
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    &.in-h5 {
      top: 46px;
      max-height: calc(100vh - 156px);
    }
    & .items {
      display: inline-table;
      position: relative;
      margin: 5px;
      width: 90px;
      height: 33px;
      line-height: 1;
      font-size: 12px;
      vertical-align: middle;
      text-align: center;
      color: #585859;
      background: #f0f0f1;
      border-radius: 5px;
      & p {
        display: table-cell;
        vertical-align: middle;
        & span {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
      & .ico-close {
        position: absolute;
        right: 0;
        bottom: 0;
        opacity: 0;
      }
      &.active {
        color: white;
        background: #f4b1a4;
        & .ico-close {
          opacity: 1;
        }
      }
    }
    & .van-collapse-item__content {
      padding: 0 5px;
      & .nowlocation {
        display: inline-block;
        width: 75px;
        height: 33px;
        background: #f0f0f1;
        border-radius: 5px;
        text-align: center;
        line-height: 33px;
      }
    }
    & .price-area {
      & input {
        width: 126px;
        height: 32px;
        border-radius: 16px;
        border: none;
        background: #f0f0f0;
        text-align: center;
      }
      & span {
        width: 24px;
        height: 1px;
        display: inline-block;
        background: #aaa;
        vertical-align: middle;
        margin: 0 7px;
      }
    }
  }
  & .van-cell:after,
  & .van-cell-group.van-hairline--top-bottom:after {
    border: none;
  }
  & .item-actions-space {
    height: 85px;
  }
  & .item-actions {
    padding: 20px 0;
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    background: white;
    z-index: 0;
    & .van-button--normal {
      background: #aaaaab;
      color: #fff;
      font-size: 17px;
      letter-spacing: 6px;
      border-color: #aaaaab;
      border-radius: 0;
    }
    & .van-button--primary {
      background: #d57e6a;
      border-color: #d57e6a;
    }
  }
  & .title {
    margin-left: 15px;
    font-weight: bold;
    color: var(--brown);
  }
}
</style>

