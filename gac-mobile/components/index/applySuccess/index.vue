<template>
  <div class="success-state">
    <div class="imgwrap">
    	<img src="../../../assets/images/submitSuccess.png"/>
    </div>
    <h4 class="text">认证资料提交成功（<span class="red">{{count}}</span>秒）</h4>
    <p>平台将在3个工作日内进行审核，请耐心等待</p>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    seconds: {
      type: Number,
      default: 3
    },
    btnText: {
      type: String,
      default: '立即返回'
    },
    to: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      timer: null,
      count: this.seconds
    }
  },
  mounted () {
    this.start()
  },
  methods: {
    start () {
      this.timer = setTimeout(() => {
        if (this.count === 1) {
          clearTimeout(this.timer)
          this.linkTo()
        } else {
          this.start()
          this.count--
        }
      }, 1000)
    },
    linkTo () {
      clearTimeout(this.timer)
      this.$router.replace({
        name: this.to
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.success-state {
  text-align: center;
  & .imgwrap{
  	padding-top: 95px;
  	& img{
  		width: 146px;
    	height: 126px;
  	}
  }
  & .text {
    margin: 30px auto 16px;
    width: 100%;
    color: var(--black);
    width: 100%;
    font-size: 18px;
    font-weight: bold;
  }
  & p {
    font-size: 15px;
    color: var(--gray);
  }
}
</style>
