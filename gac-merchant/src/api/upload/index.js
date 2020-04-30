import request from '@/utils/request'

export function uploadBatchApi(data) {
  return request({
    url: '/api/pic/uploadBatch',
    method: 'post',
    data
  })
}
export const uploadImg = '/api/pic/upload'
export function uploadSingleImg(data) {
  return request({
    url: '/api/pic/upload',
    method: 'post',
    data
  })
}
/* export const uploadBatchApi = '/api/pic/uploadBatch'*/
