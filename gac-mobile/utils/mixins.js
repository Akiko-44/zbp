import { getScrollTop } from './page'

export const tabsList = {
  data () {
    return {
      prevIndex: 0
    }
  },
  methods: {
    removeEvent (index) {
      // 切换时移除上一个TAB列表的滚动事件，并且滚动到之前的位置
      if (this.prevIndex === index) return

      if (this.$refs[`list${index}`]) {
        setTimeout(() => {
          window.scrollTo(0, this.$refs[`list${index}`][0].scrollTop)
        })
        this.$refs[`list${index}`][0].handler(true)
      }
      this.$refs[`list${this.prevIndex}`][0].handler(false)
      this.$refs[`list${this.prevIndex}`][0].scrollTop = getScrollTop()
      this.prevIndex = index
    }
  }
}
