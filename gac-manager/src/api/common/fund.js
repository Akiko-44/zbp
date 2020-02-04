import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/api/pay/pay_cash_bill/list',
    method: 'post',
    data
  })
}

/*此接口暂被drawMoney取代*/
export function accountInfo(params) {
  return request({
    url: '/api/pay/user_account/info',
    method: 'get',
    params
  })
}

export function drawMoney() {
  return request({
    url: '/admin/drawMoneyrecord/count',
    method: 'get'
  })
}


export function applyCash(amount) {
  return request({
    url: '/api/pay/pay_cash_bill/push?amount=' + amount,
    method: 'get'
  })
}

export function addCard(data) {
  return request({
    url: '/api/pay/user_account/bank_card/save',
    method: 'post',
    data
  })
}

export function delCard(id) {
  return request({
    url: `/api/pay/user_account/bank_card/del/${id}`,
    method: 'get'
  })
}

export function cardList(params) {
  return request({
    url: '/api/pay/user_account/bank_card/list',
    method: 'get',
    params
  })
}

// 运营平台审核提现相关：

export function payCashList(params) {
  return request({
    url: '/admin/pay/pay_cash/list',
    method: 'get',
    params
  })
}

export function payCashReview(params) {
  return request({
    url: '/admin/pay/pay_cash/review',
    method: 'get',
    params
  })
}

export function financeStatistics(type,isExport,params) {
  return request({
    url: `/admin/financialManagement/statistics/financeStatistics/${type}/${isExport}`,
    method: 'get',
    params
  })
}
