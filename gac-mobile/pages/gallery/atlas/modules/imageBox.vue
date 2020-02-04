<template>
  <div class="image-box" @touchmove.prevent>
    <div class="img-container" :style="style" @click="shows">
      <van-swipe v-if="install" class="banner" ref="swipe" @change="change">
        <van-swipe-item v-for="(item, i) in imgs" :key="i">
          <div class="item lazy-img-box" v-lazy:background-image="$setImg(item.url, {w: 1000})"></div>
        </van-swipe-item>
      </van-swipe>
      <van-loading color="white" class="center" />
      <transition name="van-fade">
        <div v-show="visible" class="image-desc word-break" @click.stop="inshow">
        	<van-icon name="password-not-view" class="icons" v-show="icon"/>
        	<van-icon name="password-view" class="icons" v-show="inhide" @click.stop="shows"/>
          <p>作品信息：{{list.title}}</p>
          <p>作者：{{list.designerName}}</p>
          <p v-show="inhide">作品材质：{{list.material}}</p>
          <p v-show="inhide">作品描述：{{list.intro}}</p>
        </div>
      </transition>
    </div>
    <transition name="van-fade">
      <div
        class="img-container background blur"
        :style="[{
          backgroundImage: 'url('+ $setImg(imgs[index].url, {w: 1000}) +')',
        }, style]"
        v-if="value"
        @click="$emit('input', false)"
      >
      </div>
    </transition>
  </div>
</template>

<script>
import { navHeight } from '~/utils/page'
import axios from 'axios'
export default {
  props: {
    imgs: {
      type: Array,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      visible: true,
      index: 0,
      install: true,
      list:[],
      inhide:false,
      icon:true,
      style: {bottom: 50 + navHeight + 'px'}
    }
  },
   beforeMount(){
  	this.init()
  	
  },
  mounted(){
  	let data = document.getElementsByClassName('image-box')[0]
  	data.style.height = window.innerHeight - navHeight + 'px';
  },
  activated () {
    this.install = true
  },
  deactivated () {
    this.$destroy()
  },
  methods: {
    change (index) {
      if (index === this.index) return
      this.visible = false
      this.$nextTick(() => {
        this.index = index
        this.visible = true
      })
    },
    async init(){
   		let more = await axios.get('/pc/gallery/atlas/detail/'+this.$route.query.id)
   		this.list = more.data.data;
   	},
   	inshow(){
   		this.inhide = true;
   		this.icon = false;
   	},
   	shows(){
   		this.inhide = false;
   		this.icon = true;
   	}
  }
}
</script>

<style lang="postcss" scoped>
.image-box {
  position: relative;
  width: 100%;
  height: 100%;
}
.image-desc {
  position: absolute;
  bottom: 0;
  padding: 10px 12px 25px;
  width: 100%;
  line-height: 16px;
  color: white;
  font-size: 13px;
  background: rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  z-index: 3;
  & p{
  	line-height: 25px;
  }
  & .icons{
  	position: relative;
  	top:0;
  	left:330px;
  }
}
.van-icon-password-not-view::before{
	font-size: 16px;
}
.van-icon-password-view::before{
	font-size: 16px;
}
.img-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: black;
  & .banner,
  & .item {
  	background-size:100%;
    height: 100%;
    z-index: 2;
  }
}
.background {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  &.blur {
    filter: blur(8px);
    z-index: 3;
  }
}
</style>
