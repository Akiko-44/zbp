import Vue from 'vue'
import request from '~/utils/request'
import swap from './swap'
import gallery from './gallery'
import news from './news'
import user from './user'
import order from './order'
import common from './common'
import live from './live'
import jewelryFair from './jewelryFair'
import design from './design'
import jewelry from './jewelry'
import maker from './maker'
import up from './up'
import active from './active'
import ngtc from './ngtc'
import refund from './refund'
import notice from './notice'
import complaints from './complaints'
import creditEnterprise from './creditEnterprise'
import collect from './collect'
import jewelrySearch from './jewelrySearch'
import home from './home'
import help from './help'
import shop from './shop'
import draw from './draw'

const service = request({
  ...swap,
  ...gallery,
  ...news,
  ...user,
  ...order,
  ...common,
  ...live,
  ...jewelryFair,
  ...design,
  ...jewelry,
  ...maker,
  ...up,
  ...active,
  ...ngtc,
  ...refund,
  ...notice,
  ...complaints,
  ...creditEnterprise,
  ...collect,
  ...jewelrySearch,
  ...home,
  ...help,
  ...shop,
  ...draw
})

Vue.prototype.$service = service

export {
  service
}
