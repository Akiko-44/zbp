<template>
  <div class="sideMenu">
    <div
      class="sn-button"
      :class="isOpen ? 'open' : ''"
      @click="toggleClass"
    ><i :class="isOpen ? 'ico-sector_right' : sectorLeft"></i><span class="more">更多</span></div>
    <div
      class="sn-wrapper"
      :class="isOpen ? 'open' : ''"
    >
      <ul>
        <li v-for="item in navs">
          <a @click="$router.push(item.to)">
            <span><i :class="item.icon"></i></span>
            <p>{{item.name}}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isOpen: false,
      timer: '',
      val: 0,
      sectorLeft: 'ico-sector_left',
      navs: [{
        index: 0,
        name: '首页',
        to: { name: 'index' },
        icon: 'ico-home_hover'
      }, {
        index: 1,
        name: '分类',
        to: { name: 'category' },
        icon: 'ico-classify'
      }, {
        index: 2,
        name: '溯源',
        to: { name: 'jewelrySearch-jewelryID', params: { showTabbar: true } },
        icon: 'ico-source'
      }, {
        index: 3,
        name: '购物车',
        to: { name: 'swap-cart' },
        icon: 'ico-shopping_cart'
      }, {
        index: 4,
        name: '我的',
        to: { name: 'user-mine' },
        icon: 'ico-mine'
      }
      ]
    }
  },
  methods: {
    toggleClass() {
      this.isOpen = !this.isOpen
    },
    blink() {
      if (!this.isOpen) {
        this.sectorLeft = this.sectorLeft == 'ico-sector_left' ? 'ico-sector_left2' : 'ico-sector_left'
      }
    }
  },
  mounted() {
    /*闪烁*/
    //	  this.timer = setInterval(this.blink, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>

<style lang="postcss" scoped>
.sideMenu {
  position: fixed;
  top: 50%;
  z-index: 99;
}
.sideMenu .sn-wrapper {
  position: inherit;
  width: 113px;
  height: 196px;
  overflow: hidden;
  z-index: 10010;
  right: 0;
  border-bottom-left-radius: 98px;
  border-top-left-radius: 98px;
  margin-top: -98px;
  background: rgba(44, 46, 45, 0.6);
  -webkit-transform-origin: center right;
  -moz-transform-origin: center right;
  -ms-transform-origin: center right;
  -o-transform-origin: center right;
  transform-origin: center right;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotateZ(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
.sideMenu .sn-wrapper.open {
  -webkit-transform-origin: center right;
  -moz-transform-origin: center right;
  -ms-transform-origin: center right;
  -o-transform-origin: center right;
  transform-origin: center right;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotateZ(0deg);
  -ms-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
.sn-button {
  position: inherit;
  background: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  text-align: center;
  height: 24px;
  padding-right: 5px;
  margin-top: -15px;
  right: -30px;
  border-bottom-left-radius: 15px;
  border-top-left-radius: 15px;
  z-index: 10011;
  -webkit-transform: translate(-30px);
  -moz-transform: translate(-30px);
  -ms-transform: translate(-30px);
  -o-transform: translate(-30px);
  transform: translate(-30px);
}
.more {
  display: inline-block;
  line-height: 24px;
  margin-left: 18px;
  font-size: 12px;
}
.sn-button.open {
  -webkit-transform: translate(-30px);
  -moz-transform: translate(-30px);
  -ms-transform: translate(-30px);
  -o-transform: translate(-30px);
  transform: translate(-30px);
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.sn-button i {
  content: "";
  position: absolute;
  top: 50%;
  margin-top: -6px;
  left: 5px;
  /* width: 10px;
  height: 12px; */
}
.sn-button.open i {
  left: 6px;
}
.sn-wrapper li {
  position: absolute;
  text-align: center;
}
.sn-wrapper li:first-child {
  left: 80px;
  top: 6px;
}
.sn-wrapper li:nth-child(2) {
  left: 34px;
  top: 32px;
}
.sn-wrapper li:nth-child(3) {
  left: 11px;
  top: 82px;
}
.sn-wrapper li:nth-child(4) {
  left: 37px;
  top: 128px;
}
.sn-wrapper li:nth-child(5) {
  left: 80px;
  top: 143px;
}
.sn-wrapper li > a {
  display: block;
  font-size: 10px;
  color: #dcdcdc;
}
.sn-wrapper span {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 28px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
}
</style>
