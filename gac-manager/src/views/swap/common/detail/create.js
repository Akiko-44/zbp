// 销售互换公共详情
import Detail from './'
import {
  getObj
} from '@/api/swap/goods'

export default function createList({ type }) {
  return {
    data() {
      return {
        detail: {}
      }
    },
    async beforeRouteEnter(to, from, next) {
      const { data } = await getObj(to.query.id)
      next(vm => {
        vm.detail = data
      })
    },
    render(h) {
      return h(Detail, { props: { type, detail: this.detail }})
    }
  }
}
