import { page as goodsCategories } from '@/api/dm/goodsCategory'

// 分类获取及缓存
export const category = {
  data: [],
  map: {},
  get(flags) {
    if (!category.data.length) {
      return goodsCategories({ flag: flags }).then(data => {
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
    let ids = [item.id]
    if (item.parentId && +item.parentId !== 0) {
      ids.unshift(item.parentId)
      ids = category.getParentId(category.map[item.parentId].parentId).concat(ids)
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

