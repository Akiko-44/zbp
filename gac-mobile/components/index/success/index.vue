<template>
  <div class="success-state">
    <van-icon class="passed" name="passed" />
    <h4 class="text">{{content}} <span class="red">{{count}}</span>秒</h4>
    <van-button
      class="primary-btn"
      type="primary"
      @click="linkTo"
    >
      {{btnText}}
    </van-button>
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
      this.$router.push({
        name: this.to
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.success-state {
  text-align: center;
  & .passed {
    margin-top: 50px;
    width: 100%;
    text-align: center;
    display: block;
    font-size: 70px;
    color: var(--brown);
  }
  & .text {
    margin-top: 15px;
    width: 100%;
    color: var(--black);
    font-size: 15px;
    text-align: center;
  }
  & .primary-btn {
    margin-top: 35px;
  }
}
</style>
