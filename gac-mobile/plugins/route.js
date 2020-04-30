import Cookies from 'js-cookie'
import axios from 'axios'

function toParamMap(str) {
  var map = {};
  var segs = str.split("&");
  for (var i in segs) {
    var seg = segs[i];
    var idx = seg.indexOf('=');
    if (idx < 0) {
      continue;
    }
    var name = seg.substring(0, idx);
    var value = seg.substring(idx + 1);
    map[name] = value;
  }
  return map;
}
export default ({
  app,
  store
}) => {
  //微信公众号回调地址获取code
  let urlParameters = window.location.hash ? window.location.hash.substring(1) : window.location.search.substring(1)
  let map = toParamMap(urlParameters)
  var token = Cookies.get('Authorization')
  app.router.beforeEach((to, from, next) => {
    if (map.state == '123' && !token) {
      axios.get('/api/wechat/getUserInfo', {
          params: {
            'code': map.code,
            'state': '123'
          }
        })
        .then((result) => {
          result.data.data.accessToken && store.commit('user/setToken', result.data.data.accessToken)
        })
        .catch(() => {})
      next()
    } else {
      next()
    }
  })
}
