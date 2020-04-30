import { page as getGalleryCategory } from '@/api/gallery/category'

// 图集分类获取及缓存
export const category = {
  data: [],
  map: {},
  get() {
    if (!category.data.length) {
      return getGalleryCategory().then(data => {
        category.data = data.data
        category.setMap(category.data)
        return category.data
      })
    } else {
      return Promise.resolve(category.data)
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
    if (item.parentId !== 0) {
      ids.unshift(item.parentId)
      ids.concat(category.getParentId(category.map[item.parentId].parentId))
    }
    return ids
  }
}
