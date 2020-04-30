/**
 * APP 与 H5 通信相关代码
 */
import Vue from 'vue'
import Cookies from 'js-cookie'

function call(variableName, fnName) {
  const variable = window[variableName]

  if (!variable || !variable[fnName]) return

  const params = [].slice.call(arguments, 2)
  variable[fnName].apply(variable, params)
}

export const native = {
  isApp() {
    const isCustomCookie = Cookies.get('appType')
    return (!!window.Android || (!!window.webkit && !window.navigator.userAgent.includes('QQ') && !window.navigator.userAgent.includes('MicroMessenger'))) && (isCustomCookie == 1)
    //		return !!window.Android || (!!window.webkit && !window.navigator.userAgent.includes('QQ') && !window.navigator.userAgent.includes('MicroMessenger'))
  },
  isAndroid() {
    return !!window.Android
  },
  isACity() {
    const isCustomCookie = Cookies.get('appType')
    return isCustomCookie
  },
  goToPay(data) {
    const jsonStr = JSON.stringify(data)
    call('Android', 'jsToAndroidCall', jsonStr, 5)
    call('WebJSObject', 'getOrderPay', jsonStr)
    if (!!window.webkit) {
      window.webkit.messageHandlers.getOrderPay.postMessage(jsonStr)
    }
  },
  goToIOSPay(data) {
    const jsonStr = JSON.stringify(data)
    call('Android', 'jsToAndroidCall', jsonStr, 5)
    call('WebJSObject', 'gotoAuctionPay', jsonStr)
    if (!!window.webkit) {
      window.webkit.messageHandlers.gotoAuctionPay.postMessage(jsonStr)
    }
  },
  goToLogin() {
    call('Android', 'jsToAndroidCall', location.href, 1)
    call(
      'WebViewController',
      'getCall',
      JSON.stringify({
        type: 'login'
      })
    )
    if (!!window.webkit) {
      window.webkit.messageHandlers.login.postMessage(JSON.stringify({
        type: 'login',
        url: location.href
      }))
    }
    /*call(
      'webkit.messageHandlers',
      'login.postMessage',
      JSON.stringify({
        type: 'login'
      })
    )*/
  },
  goToNextPage(data) {
    const jsonStr = JSON.stringify(data)
    call('Android', 'jsToAndroidCall', jsonStr, 12)
    if (!!window.webkit) {
      window.webkit.messageHandlers.push.postMessage(JSON.stringify({
        url: data.url
      }))
    }
  },
  goToHome() {
    call('Android', 'jsToAndroidCall', '', 6)
    call(
      'WebJSObject',
      'goBack',
      JSON.stringify({})
    )
    if (!!window.webkit) {
      window.webkit.messageHandlers.goBack.postMessage(JSON.stringify({}))
    }
  },
  goToXiaoNeng(data) {
    const jsonStr = JSON.stringify(data)
    call('Android', 'jsToAndroidCall', jsonStr, 9)
    call('WebJSObject', 'customerService', jsonStr)
    if (!!window.webkit) {
      window.webkit.messageHandlers.customerService.postMessage(jsonStr)
    }
  },
  goToUrl(Url) {
    call('Android', 'jsToAndroidCall', Url, 3)
  },
  goToJewelryCircle() {
    call('Android', 'jsToAndroidCall', '', 3)
    if (!!window.webkit) {
      window.webkit.messageHandlers.goJewelryHome.postMessage(JSON.stringify({}))
    }
  },
  goToJewelryVideo(id) {
    call('Android', 'jsToAndroidCall', id, 4)
    if (!!window.webkit) {
      window.webkit.messageHandlers.goJewelryVideoInfo.postMessage(id)
    }
  },
  goToJewelryDetail(id) {
    call('Android', 'jsToAndroidCall', id, 13)
    if (!!window.webkit) {
      window.webkit.messageHandlers.goJewelryContentInfo.postMessage(id)
    }
  },
  goToJewelryWeMedia(data) {
    const jsonStr = JSON.stringify(data)
    call('Android', 'jsToAndroidCall', jsonStr, 14)
    if (!!window.webkit) {
      window.webkit.messageHandlers.goJewelryAccount.postMessage(jsonStr)
    }
  },
  goToMerchant(id) {
    call('Android', 'jsToAndroidCall', id, 15)
    if (!!window.webkit) {
      window.webkit.messageHandlers.goBusinessHome.postMessage(id)
    }
  },
  goToHelpVideo() {
    call('Android', 'jsToAndroidCall', '', 7)
    // if (!!window.webkit) {
    //   window.webkit.messageHandlers.goHelpVideoInfo.postMessage(id)
    // }
  },
  getTitle(title) {
    const jsonStr = JSON.stringify({
      'title': title
    })
    call('WebJSObject', 'getTitle', jsonStr)
    if (!!window.webkit) {
      window.webkit.messageHandlers.getTitle.postMessage(jsonStr)
    }
  },
  goToCart() {},
  share(URL, title, text, img) {
    const jsonStr = JSON.stringify({
      text: text,
      title: title,
      img: img,
      URL: URL,
      type: 'share'
    })
    call('Android', 'jsToAndroidCall', jsonStr, 8)
    call('WebJSObject', 'share', jsonStr)
    if (!!window.webkit) {
      window.webkit.messageHandlers.share.postMessage(jsonStr)
    }
  },
  refreshWebView() {
    call('Android', 'jsToAndroidCall', '', 10)
    call('WebJSObject', 'refreshWebView', JSON.stringify({}))
    if (!!window.webkit) {
      window.webkit.messageHandlers.refreshWebView.postMessage(JSON.stringify({}))
    }
  },
  toSwapDetail(id, type) {
    const jsonStr1 = JSON.stringify({
      code: id,
      type: type
    })
    const jsonStr2 = JSON.stringify({
      userID: id,
      type: type
    })
    call('Android', 'jsToAndroidCall', jsonStr1, 10)
    call('WebJSObject', 'gotoSpecialView', jsonStr2)
    if (!!window.webkit) {
      window.webkit.messageHandlers.gotoSpecialView.postMessage(jsonStr2)
    }
  },
  toRefund() {
    call('Android', 'jsToAndroidCall', '', 11)
    call('WebJSObject', 'gotoAfterSalesView', JSON.stringify({}))
    if (!!window.webkit) {
      window.webkit.messageHandlers.gotoAfterSalesView.postMessage(JSON.stringify({}))
    }
  },
  gotoActivityView() {
    call('WebJSObject', 'gotoActivityView', JSON.stringify({}))
    if (!!window.webkit) {
      window.webkit.messageHandlers.gotoActivityView.postMessage(JSON.stringify({}))
    }
  },
  loginOrLogout(token) {
    const jsonStr = JSON.stringify({
      'token': token
    })
    call('Android', 'jsToAndroidCall', token, 2)
    if (!!window.webkit) {
      window.webkit.messageHandlers.getLoginToken.postMessage(jsonStr)
    }
  }
}

Vue.prototype.$native = native
