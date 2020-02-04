// 销售互换公共列表
import List from './'

export default function createList({ priceLabel, swapble, type }) {
  return {
    render(h) {
      return h(List, { props: { priceLabel, swapble, type }})
    }
  }
}
