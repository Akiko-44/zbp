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
                title="类型"
                name="type"
                v-if="data.typeList && data.typeList.length"
              >
                <ul>
                  <li
                    class="items"
                    :class="item.type==postData.type ? 'active' : ''"
                    data="type"
                    :type="item.type"
                    v-for="(item, index) in data.typeList"
                    :key="index"
                    @click="selectedItem(item.type,$event)"
                  >
                    <p><span>{{item.name}}</span></p>
                    <i class="ico-close"></i>
                  </li>
                </ul>
              </van-collapse-item>
              <van-collapse-item
                title="栏目"
                name="column"
                v-if="data.columnList && data.columnList.length"
              >
                <ul>
                  <li
                    class="items column-item"
                    :class="item.columnId==postData.columnId ? 'active' : ''"
                    data="column"
                    :columnId="item.columnId"
                    v-for="(item, index) in data.columnList"
                    :key="index"
                    @click="selectedItem(item.columnId,$event)"
                  >
                    <p><span>{{item.name}}</span></p>
                    <i class="ico-close"></i>
                  </li>
                </ul>
              </van-collapse-item>
              <van-collapse-item
                title="标签"
                name="label"
                v-if="data.labelList && data.labelList.length"
              >
                <ul>
                  <li
                    class="items"
                    :class="item.labelId==postData.labelId ? 'active' : ''"
                    data="label"
                    :labelId="item.labelId"
                    v-for="(item, index) in data.labelList"
                    :key="index"
                    @click="selectedItem(item.labelId,$event)"
                  >
                    <p><span>{{item.name}}</span></p>
                    <i class="ico-close"></i>
                  </li>
                </ul>
              </van-collapse-item>
              <van-collapse-item
                title="话题"
                name="topic"
                v-if="data.topicList && data.topicList.length && !topicId"
              >
                <ul>
                  <li
                    class="items"
                    :class="item.topicId==postData.topicId ? 'active' : ''"
                    data="topic"
                    :topicId="item.topicId"
                    v-for="(item, index) in data.topicList"
                    :key="index"
                    @click="selectedItem(item.topicId,$event)"
                  >
                    <p><span>{{item.name}}</span></p>
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
export default {
  props: {
    name: {
      type: String
    },
    topicId: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      inH5: true,
      active: false,
      callback: () => { },
      activeNames: ['type', 'column', 'label', 'topic'],
      postData: {
        type: undefined,
        columnId: undefined,
        labelId: undefined,
        topicId: undefined,
        orderType: 4
      }
    }
  },
  activated() {
    //	判断微信和app
    if (this.$native.isApp() || window.navigator.userAgent.includes('MicroMessenger')) {
      this.inH5 = false
    }
    this.postData.topicId = this.topid
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
    selectedItem(index, e) {
      let className = e.currentTarget.getAttribute('class')
      let curType = e.currentTarget.getAttribute('type')
      let curColumnId = e.currentTarget.getAttribute('columnId')
      let curLabelId = e.currentTarget.getAttribute('labelId')
      let curTopicId = e.currentTarget.getAttribute('topicId')
      if (className.indexOf('active') != -1) {
        if (e.currentTarget.getAttribute('data') == 'type') {
          this.postData.type = undefined
        } else if (e.currentTarget.getAttribute('data') == 'column') {
          this.postData.columnId = undefined
        } else if (e.currentTarget.getAttribute('data') == 'label') {
          this.postData.labelId = undefined
        } else if (e.currentTarget.getAttribute('data') == 'topic') {
          this.postData.topicId = undefined
        }
      } else {
        if (e.currentTarget.getAttribute('data') == 'type') {
          this.postData.type = curType
        } else if (e.currentTarget.getAttribute('data') == 'column') {
          this.postData.columnId = curColumnId
        } else if (e.currentTarget.getAttribute('data') == 'label') {
          this.postData.labelId = curLabelId
        } else if (e.currentTarget.getAttribute('data') == 'topic') {
          this.postData.topicId = curTopicId
        }
      }
      this.$emit('confirm', this.postData)
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
        type: undefined,
        columnId: undefined,
        labelId: undefined,
        topicId: undefined,
        orderType: 1
      }
      let activeEl = document.getElementsByClassName('active')
      let newArr = []
      for (var i = 0;i < activeEl.length;i++) {
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
      &.active,
      &.column-item.active {
        color: white;
        background: #f4b1a4;
        border: 0;
        & .ico-close {
          opacity: 1;
        }
      }
      /* &.column-item {
        width: 88px;
        background: #ffffff;
        border: 1px solid #929292;
      } */
    }
    & .van-collapse-item__content {
      padding: 0 5px 10px;
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

