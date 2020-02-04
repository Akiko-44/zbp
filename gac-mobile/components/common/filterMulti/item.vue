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
                v-if="data.brand && data.brand.length"
              >
                <ul>
                  <li
                    class="items"
                    :class="item.id==postData.brandId ? 'active' : ''"
                    data="brand"
                    :brandid="item.id"
                    v-for="(item, index) in data.brand"
                    :key="index"
                    @click="selectedItem(index,$event)"
                  >
                    <p><span>{{item.brandName}}</span></p>
                    <i class="ico-close"></i>
                  </li>
                </ul>
              </van-collapse-item>
              <van-collapse-item
                title="价格区间"
                name="2"
              >
                <div class="price-area">
                  <input
                    type="number"
                    placeholder="最低价"
                    min="0"
                    v-model="postData.lowPrice"
                    @blur="setPrice"
                  />
                  <span></span>
                  <input
                    type="number"
                    placeholder="最高价"
                    min="0"
                    v-model="postData.hightPrice"
                    @blur="setPrice"
                  />
                </div>
              </van-collapse-item>
              <van-collapse-item
                title="发货地"
                name="3"
              >
                <div>
                  <span class="nowlocation"><i class="ico-location2"></i>{{location}}</span>
                </div>
              </van-collapse-item>
              <van-collapse-item
                title="省份"
                name="4"
                v-if="data.weight && data.weight.length"
              >
                <ul>
                  <li
                    class="items"
                    :class="item.regionName==postData.provice ? 'active' : ''"
                    data="provice"
                    :pid="index"
                    v-for="(item, index) in data.region"
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
                name="5"
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
              <!-- <template v-if="fromWherebuy == 1"> -->
              <van-collapse-item
                title="一级分类"
                name="6"
                v-if="!data.categoryId && data.category && data.category.length"
              >
                <ul>
                  <li
                    class="items"
                    :class="(item.id==postData.categoryId || item.children[0].id==postData.categoryId) ? 'active' : ''"
                    data="category"
                    :categoryid="item.id"
                    v-for="(item, index) in data.category"
                    :key="index"
                    @click="selectedItem(index,$event)"
                  >
                    <p><span>{{item.catName}}</span></p>
                    <i class="ico-close"></i>
                  </li>
                </ul>
              </van-collapse-item>
              <van-collapse-item
                title="二级分类"
                name="7"
                v-if="secondCategoryList && secondCategoryList.length"
              >
                <ul>
                  <li
                    class="items"
                    :class="item.id==postData.categoryId ? 'active' : ''"
                    data="secondCategory"
                    :secondcategoryid="item.id"
                    :secondcategorypid="item.parentId"
                    v-for="(item, index) in secondCategoryList"
                    :key="index"
                    @click="selectedItem(index,$event)"
                  >
                    <p><span>{{item.catName}}</span></p>
                    <i class="ico-close"></i>
                  </li>
                </ul>
              </van-collapse-item>
              <van-collapse-item
                title="款式"
                name="8"
                v-if="data.style && data.style.length"
              >
                <ul>
                  <li
                    class="items"
                    :class="item.id==postData.styleId ? 'active' : ''"
                    data="style"
                    :styleid="item.id"
                    v-for="(item, index) in data.style"
                    :key="index"
                    @click="selectedItem(index,$event)"
                  >
                    <p><span>{{item.styleName}}</span></p>
                    <i class="ico-close"></i>
                  </li>
                </ul>
              </van-collapse-item>
              <van-collapse-item
                title="克重"
                name="9"
                v-if="data.gram && data.gram.length"
              >
                <ul>
                  <li
                    class="items"
                    :class="item==postData.gram ? 'active' : ''"
                    data="gram"
                    v-for="(item, index) in data.gram"
                    :key="index"
                    @click="selectedItem(index,$event)"
                  >
                    <p><span>{{item}}</span></p>
                    <i class="ico-close"></i>
                  </li>
                </ul>
              </van-collapse-item>
              <van-collapse-item
                title="链长"
                name="10"
                v-if="data.chainLength && data.chainLength.length"
              >
                <ul>
                  <li
                    class="items"
                    :class="item==postData.chainLength ? 'active' : ''"
                    data="chainLength"
                    v-for="(item, index) in data.chainLength"
                    :key="index"
                    @click="selectedItem(index,$event)"
                  >
                    <p><span>{{item}}</span></p>
                    <i class="ico-close"></i>
                  </li>
                </ul>
              </van-collapse-item>
              <van-collapse-item
                title="圈口"
                name="11"
                v-if="data.circle && data.circle.length"
              >
                <ul>
                  <li
                    class="items"
                    :class="item==postData.circle ? 'active' : ''"
                    data="circle"
                    v-for="(item, index) in data.circle"
                    :key="index"
                    @click="selectedItem(index,$event)"
                  >
                    <p><span>{{item}}</span></p>
                    <i class="ico-close"></i>
                  </li>
                </ul>
              </van-collapse-item>
              <van-collapse-item
                title="直径"
                name="12"
                v-if="data.diameter && data.diameter.length"
              >
                <ul>
                  <li
                    class="items"
                    :class="item==postData.diameter ? 'active' : ''"
                    data="diameter"
                    :styleid="item.id"
                    v-for="(item, index) in data.diameter"
                    :key="index"
                    @click="selectedItem(index,$event)"
                  >
                    <p><span>{{item}}</span></p>
                    <i class="ico-close"></i>
                  </li>
                </ul>
              </van-collapse-item>
              <van-collapse-item
                title="重量"
                name="13"
                v-if="data.weight && data.weight.length"
              >
                <ul>
                  <li
                    class="items"
                    :class="item==postData.weight ? 'active' : ''"
                    data="weight"
                    v-for="(item, index) in data.weight"
                    :key="index"
                    @click="selectedItem(index,$event)"
                  >
                    <p><span>{{item}}</span></p>
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
import { getLocation } from '~/utils/location'

export default {
  props: {
    value: {
      type: [String, Number]
    },
    categoryId: {
      type: [String, Number]
    },
    styleId: {
      type: [String, Number]
    },
    fromWherebuy: {
      type: [String, Number]
    },
    name: {
      type: String
    },
    data: {
      type: Object,
      default: () => ({})
    },
    filterObj: {
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
      sactive: -1,
      scactive: -1,
      pactive: -1,
      cityactive: -1,
      callback: () => { },
      activeNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
      showKeyboard1: true,
      showKeyboard2: true,
      postData: {
        brandId: undefined,
        categoryId: this.categoryId || this.$route.query.categoryId,
        lowPrice: '',
        hightPrice: '',
        provice: undefined,
        city: undefined,
        goodsSort: 0,
        styleId: undefined,
        entrance: 1,
        gram: undefined,
        chainLength: undefined,
        circle: undefined,
        diameter: undefined,
        weight: undefined
      },
      location: ''
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
    this.getLoc()
    this.$nextTick(() => {
      if (this.data.category && this.data.category.length) {
        this.data.category.map((item, i) => {
          this.activeNames.push((i + 11))
        })
      }
    })
  },
  activated() {
    //	判断微信和app
    if (this.$native.isApp() || window.navigator.userAgent.includes('MicroMessenger')) {
      this.inH5 = false
    }
    this.getLoc()
    this.postData.categoryId = this.categoryId || this.$route.query.categoryId
  },
  methods: {
    getLocation,
    async getLoc() {
      let [city] = await Promise.all([
        this.getLocation()
      ])
      this.location = city
    },
    setPrice() {
      this.$emit('confirm', this.postData)
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
        this.getLoc()
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
        if (this.postData.city) {
          this.location = this.postData.city
        } else if (this.postData.provice) {
          this.location = this.postData.provice
        } else {
          this.getLoc()
        }
        this.data.region.map(item => {
          if (item.children && item.children.length && item.children[0].parentId == proviceId) {
            this.cityList = item.children
          }
        })
      }
      this.$emit('confirm', this.postData)
    },
    selectedItem(index, e) {
      let className = e.currentTarget.getAttribute('class')
      let curBId = e.currentTarget.getAttribute('brandid')
      let curCId = e.currentTarget.getAttribute('categoryid')
      let curSCId = e.currentTarget.getAttribute('secondcategoryid')
      let curSId = e.currentTarget.getAttribute('styleid')
      if (className.indexOf('active') > -1) {
        if (e.currentTarget.getAttribute('data') == 'brand') {
          this.postData.brandId = undefined
        } else if (e.currentTarget.getAttribute('data') == 'style') {
          this.postData.styleId = undefined
        } else if (e.currentTarget.getAttribute('data') == 'category') {
          this.postData.categoryId = undefined
          this.secondCategoryList = []
        } else if (e.currentTarget.getAttribute('data') == 'secondCategory') {
          curSCId = undefined
          this.postData.categoryId = e.currentTarget.getAttribute('secondcategorypid')
        } else if (e.currentTarget.getAttribute('data') == 'provice') {
          this.postData.provice = undefined
          this.postData.city = undefined
          this.getLoc()
          this.cityList = []
        } else if (e.currentTarget.getAttribute('data') == 'city') {
          this.postData.city = undefined
          this.location = this.postData.provice
        } else if (e.currentTarget.getAttribute('data') == 'gram') {
          this.postData.gram = undefined
        } else if (e.currentTarget.getAttribute('data') == 'chainLength') {
          this.postData.chainLength = undefined
        } else if (e.currentTarget.getAttribute('data') == 'circle') {
          this.postData.circle = undefined
        } else if (e.currentTarget.getAttribute('data') == 'diameter') {
          this.postData.diameter = undefined
        } else if (e.currentTarget.getAttribute('data') == 'weight') {
          this.postData.weight = undefined
        }
      } else {
        if (e.currentTarget.getAttribute('data') == 'brand') {
          this.postData.brandId = curBId
        } else if (e.currentTarget.getAttribute('data') == 'style') {
          this.postData.styleId = curSId
        } else if (e.currentTarget.getAttribute('data') == 'category') {
          this.postData.categoryId = curCId
          //获取二级分类
          this.data.category.forEach(item => {
            if (item.id == curCId) {
              this.secondCategoryList = item.children
            }
          })
        } else if (e.currentTarget.getAttribute('data') == 'secondCategory') {
          this.postData.categoryId = curSCId
        } else if (e.currentTarget.getAttribute('data') == 'provice') {
          let pid = e.currentTarget.getAttribute('pid')
          this.cityList = []
          for (var j in this.areaList.city_list) {
            if (pid.substr(0, 2) == j.substr(0, 2)) {
              this.cityList.push(this.areaList.city_list[j])
            }
          }
          this.postData.provice = e.currentTarget.textContent
          this.postData.city = undefined
          if (this.postData.city) {
            this.location = this.postData.city
          } else if (this.postData.provice) {
            this.location = this.postData.provice
          } else {
            this.getLoc()
          }
        } else if (e.currentTarget.getAttribute('data') == 'city') {
          this.postData.city = e.currentTarget.textContent
          this.location = e.currentTarget.textContent
        } else if (e.currentTarget.getAttribute('data') == 'gram') {
          this.postData.gram = e.currentTarget.textContent
        } else if (e.currentTarget.getAttribute('data') == 'chainLength') {
          this.postData.chainLength = e.currentTarget.textContent
        } else if (e.currentTarget.getAttribute('data') == 'circle') {
          this.postData.circle = e.currentTarget.textContent
        } else if (e.currentTarget.getAttribute('data') == 'diameter') {
          this.postData.diameter = e.currentTarget.textContent
        } else if (e.currentTarget.getAttribute('data') == 'weight') {
          this.postData.weight = e.currentTarget.textContent
        }
      }
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
        lowPrice: '',
        hightPrice: '',
        provice: undefined,
        city: undefined,
        goodsSort: 0,
        styleId: undefined
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
    z-index: 3;
    background: white;
    font-size: 0.3733rem;
    max-height: calc(100vh - 110px);
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
      margin: 0 5px 5px;
      width: 90px;
      height: 33px;
      /* line-height: 1; */
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
        padding: 0 5px;
        margin-bottom: 5px;
        min-width: 75px;
        height: 33px;
        background: #f0f0f1;
        border-radius: 5px;
        text-align: center;
        line-height: 33px;
      }
    }
    & .price-area {
      margin-bottom: 5px;
      & input {
        width: 100px;
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
    height: 110px;
  }
  & .item-actions {
    padding: 19px 0 46px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    background: white;
    z-index: 1;
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

