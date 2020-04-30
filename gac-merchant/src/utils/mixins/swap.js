import { gteCategories } from '@/api/swap/category'

export const goodsState = {
  0: '待上架',
  1: '审核中',
  2: '在售',
  3: '审核不通过',
  4: '已删除'
}
// 是否允许进行审核操作
export const allowAudit = state => [1, 3].indexOf(state) !== -1

export const srcState = {
  1: 'web',
  2: '安卓',
  3: '苹果'
}

export const auditState = {
  1: '审核中',
  2: '审核通过',
  3: '审核不通过'
}

export const deprecitionState = {
  3: '三成以下',
  4: '四成新',
  5: '五成新',
  6: '六成新',
  7: '七成新',
  8: '八成新',
  9: '九成新',
  10: '全新'
}

export const auctionState = {
  1: '即将开始',
  2: '正在进行',
  3: '成交',
  4: '留拍'
}

export const auctionResultState = {
  0: '未开始',
  1: '成交',
  2: '失败',
  3: '退费'
}

// 分类获取及缓存
export const category = {
  data: [],
  map: {},
  get(flags) {
    if (!category.data.length) {
      return gteCategories({flag:flags}).then(data => {
        category.data = data.data
        category.IterationDelateMenuChildren(category.data)
        category.setMap(category.data)
        return category.data
      })
    } else {
      return Promise.resolve(JSON.parse(JSON.stringify(category.data)))
    }
  },
  setMap(data) {
    data.forEach(item => {
      category.map[item.id] = item
      if (item.children && item.children.length) {
        category.setMap(item.children)
      }
    })
  },
  update() {
  },
  // 获取当前ID的所有上级
  getParentId(id) {
    if (!category.map[id]) return []
    const item = category.map[id]
    const ids = [item.id]
    if (item.parentId && +item.parentId !== 0) {
      ids.unshift(item.parentId)
      ids.concat(category.getParentId(category.map[item.parentId].parentId))
    }
    return ids
  },
  IterationDelateMenuChildren(arr){
    if (arr.length) {
      for (let i in arr) {
        if (arr[i].children.length) {
          category.IterationDelateMenuChildren(arr[i].children)
        } else {
          delete arr[i].children;
        }
      }
    }
    return arr
  }
}

