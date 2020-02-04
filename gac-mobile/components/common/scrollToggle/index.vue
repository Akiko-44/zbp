<template>
<div class="scroll-toggle"
  :class="{
    'toggle': show,
    'fixed': status,
    'position-top': status && position === 'top',
    'position-bottom': status && position === 'bottom'
  }"
>
  <slot></slot>
</div>
</template>

<script>
import { addListener, removeListener } from '~/utils/shared'
import { getScrollTop } from '~/utils/page'

export default {
  name: 'scroll-toggle',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'top'
    }
  },
  data () {
    return {
      show: false,
      status: '',
      isBind: false,
      lastScrollTop: 0
    }
  },
  mounted () {
    this.bind()
  },
  activated () {
    this.bind()
  },
  deactivated () {
    this.unbind()
  },
  destroyed () {
    this.unbind()
  },
  methods: {
    bind () {
      if (this.isBind) return
      this.isBind = true
      addListener(window, 'scroll', (this.scrollFn = this.scrollFn.bind(this)))
    },
    unbind () {
      this.isBind = false
      removeListener(window, 'scroll', this.scrollFn)
    },
    scrollFn () {
      if (this.disabled) return

      const scrollTop = getScrollTop()
      const dis = 3

      if (Math.abs(scrollTop - this.lastScrollTop) > dis) {
        if (scrollTop > this.lastScrollTop) {
          this.status = 'down'
          this.show = false
        } else {
          this.status = 'up'
          this.show = true
        }
      }
      if (scrollTop <= 0) {
        this.show = false
        this.status = ''
      }
      this.lastScrollTop = scrollTop
    }
  }
}
</script>

<style lang="postcss" scoped>
.scroll-toggle {
  &.position-top {
    top: 0;
    transform: translate3d(0, -100%, 0);
  }
  &.position-bottom {
    bottom: 0;
    transform: translate3d(0, 100%, 0);
  }
  &.fixed {
    position: fixed;
    left: 0;
    width: 100%;
    transition: 0.3s transform;
    z-index: 5;
  }
  &.toggle {
    transform: translate3d(0, 0, 0);
  }
}
</style>
