<template>
  <div class="app-filter-item">
    <div class="item-name"
         @click="toggle"
         :class="{active: active}">
      {{name}}
      <!-- <i :class="active ? 'ico-down-select' : 'ico-down'"></i> -->
    </div>
    <transition name="van-fade">
      <div class="item-main"
           v-show="active"
           v-disabledScroll="'item-main-inner'">
        <div class="item-main-inner">
          <van-tree-select :items="data"
                           :main-active-index="mainActiveIndex"
                           :active-id="activeId"
                           @navclick="onClickNav"
                           @itemclick="onClickItem" />
        </div>
        <div class="item-actions-space">
          <div class="item-actions">
            <van-row gutter="20">
              <van-col span="12">
                <van-button @click="reset"
                            type="default"
                            block>
                  重置
                </van-button>
              </van-col>
              <van-col span="12">
                <van-button @click="confirm"
                            class="primary-btn"
                            type="primary"
                            block>
                  确定
                </van-button>
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="mask"
             @click="hide"
             @touchmove.prevent></div>
      </div>
    </transition>
  </div>
</template>

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
    position: absolute;
    width: 100%;
    left: 0;
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
    font-size: 14px;
    max-height: 306px;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  & .van-cell:after,
  & .van-cell-group.van-hairline--top-bottom:after {
    border: none;
  }
  & .item-actions-space {
    height: 85px;
  }
  & .item-actions {
    padding: 20px 15px;
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    background: white;
    z-index: 2;
  }
  & .title {
    margin-left: 15px;
    font-weight: bold;
    color: var(--brown);
  }
}
</style>

<script>
export default {
  props: {
    value: {
      type: [String, Number]
    },
    name: {
      type: String
    },
    data: {
      type: Array,
      default: () => ([])
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
      mainActiveIndex: 0,
      activeId: 1,
      currentValue: undefined,
      active: false,
      callback: () => { }
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
  methods: {
    toggle() {
      this.callback(this.name)
      if (!this.active) {
        this.show()
      } else {
        this.hide()
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
      this.mainActiveIndex = 0
      this.activeId = 1
      this.currentValue = undefined
    },
    confirm() {
      this.hide()
      this.$emit('input', this.currentValue)
      this.$emit('confirm')
      window.scrollTo(0, 0)
    },
    onClickNav(index) {
      this.mainActiveIndex = index
      this.$emit('navClick', index)
    },
    onClickItem(data) {
      this.activeId = data.id
      this.currentValue = data.id
    }
  }
}
</script>



