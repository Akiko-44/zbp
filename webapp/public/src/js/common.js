;
(function () {
  if (window.utils) {

    //是否登录
    utils.islogin = function () {
      return !!this.getCookie("token") ? true : false;
    }

    //评论输入框keyup事件
    utils.commentInputNum = function (self) {
      var val = $(self).val();
      $(".commentPost .inputLength").text(val.length);
    }

    //发表评论事件
    utils.postComment = function (params) {
      if (!utils.islogin()) {
        window.location.href = "../../login?from=" + encodeURIComponent(location.href);
      } else {
        var val = $.trim($(".commentPost textarea").val());
        if (val == "") {
          $(".errorText").text("请输入评论内容！");
        } else {
          utils.ajax({
            url: params.url,
            data: JSON.stringify(params.data),
            success: function (data) {
              data = data.data;
              var html = _template.commentList({
                data: data
              });
              $(".commentListWrap ul").prepend(html);
              $(".commentPost textarea").val("");
              $(".commentPost .errorText").text("");
              $(".commentPost .inputLength").text("0");

              params.success && params.success(data);
            }
          })
        }
      }
    }

    //评论列表
    utils.commentList = function (params) {
      utils.ajax({
        url: params.url,
        data: params.data,
        type: "get",
        success: function (data) {
          data = data.data;
          $(".loadMoreComment").data("curPage", 1).data("maxPage", data.pages);
          var html = "";
          for (var i = 0; i < data.records.length; i++) {
            html += _template.commentList({
              data: data.records[i]
            });
          }
          $(".commentListWrap ul").html(html);

          if (data.pages == 0) {
            //显示没有评论
          } else if (data.pages > 1) {
            //显示加载更多按钮
            $(".loadMoreComment").removeClass("hide");
          }
          params.success && params.success(data);
        }
      });
    }

    //加载更多评论
    utils.loadMoreComment = function (params) {
      var self = $(".loadMoreComment");
      var curPage = parseInt(self.data("curPage"));
      var maxPage = parseInt(self.data("maxPage"));
      utils.ajax({
        url: params.url,
        data: params.data,
        type: "get",
        success: function (data) {
          data = data.data;
          if (data.records.length > 0) {
            var html = "";
            for (var i = 0; i < data.records.length; i++) {
              html += _template.commentList({
                data: data.records[i]
              });
            }
            $(".commentListWrap ul").append(html);
            self.data("curPage", (curPage + 1));
          } else {
            $(".loadMoreComment").addClass("hide");
          }

          params.success && params.success(data);
        }
      })
    }

    //顶部登录状态显示
    utils.headerLoginStatus = function () {
      if (utils.getCookie("token")) {
        var name = utils.getCookie("nickName")
        var name = utils.getCookie("phone")
        if (name != '' && name != undefined) {
          $(".logined span").html('<a class="link" href="/user/acc_info">' + name + '<i class="el-icon-arrow-down"></i></a>');
          $('.userphone').html(name + '<i class="el-icon-arrow-down"></i></a>');
        } else if (phone != '' && phone != undefined) {
          $(".logined span").html('<a class="link" href="/user/acc_info">' + phone + '<i class="el-icon-arrow-down"></i></a>');
          $('.userphone').html(phone + '<i class="el-icon-arrow-down"></i></a>');
        }
        /*else{
        					$(".logined span").html('<a class="link" href="../../user/acc_info">会员【未命名】</a>，您好！');
        				}*/
        $(".nologin").addClass("hide")
        $(".logined").removeClass("hide")
      } else {
        $(".nologin").removeClass("hide")
        $(".logined").addClass("hide")
      }
    }

    //多图片上传
    utils.batchPicUploader = function () {
      utils.ajax({
        type: 'get',
        url: '/api/qiniu/token',
        success: function (data) {
          getLoader(data.data)
        }
      })

      function getLoader(token) {
        var uploader = Qiniu.uploader({
          disable_statistics_report: false,
          runtimes: 'html5,flash,html4',
          browse_button: 'pickfiles',
          container: 'batchPic',
          drop_element: 'batchPic',
          max_file_size: '1000mb',
          unique_names: false,
          save_key: true,
          //flash_swf_url: 'Moxie.swf',
          dragdrop: true,
          chunk_size: '4mb',
          uptoken: token,
          domain: g_const.domain,
          get_new_uptoken: false,
          auto_start: true,
          log_level: 5,
          init: {
            'BeforeChunkUpload': function (up, file) {

            },
            'FilesAdded': function (up, files) {
              var len = files.length + $('.goodsImg').length
              if (len > 4) {
                utils.alert("info", "图片上传不能超过4张");
              }
            },
            'BeforeUpload': function (up, file) {

            },
            'UploadProgress': function (up, file) {

            },
            'UploadComplete': function () {

            },
            'FileUploaded': function (up, file, info) {
              var len = $('.goodsImg').length
              if (len >= 4) {
                return null
              }

              var response = JSON.parse(info.response)
              var imgUrl = g_const.domain + response.hash
              var image = new Image();
              image.src = imgUrl;
              image.onload = function () {
                var width = image.width;
                var height = image.height;
                if (width / height != 1) {
                  utils.alert("info", "图片分辨率必须为1:1");
                } else {
                  $(".img").append('<div data-name="' + response.hash + '"><img class="goodsImg" src="' + imgUrl + '"/><div><a class="hide">设为封面</a>&ensp;<a class="delImgBtn">删除</a></div></div>');
                }
              }
            },
            'Error': function (up, err, errTip) {

            }
          }
        })
      }
    }

    /**
     * 订单消息提醒
     * */
    utils.unreadNumber = function () {
      utils.ajax({
        url: '/api/order/unread/number',
        data: JSON.stringify({
          orderType: 0,
          userType: 0
        }),
        success: function (data) {
          data = data.data
          if (data.jewelry > 0) {
            $('[data-warn=jewelryWarn]').text(data.jewelry).removeClass('hide');
          }
          if (data.design > 0) {
            $('[data-warn=designWarn]').text(data.design).removeClass('hide');
          }
          if (data.manufact > 0) {
            $('[data-warn=manufactureWarn]').text(data.manufact).removeClass('hide');
          }
          //互换坊
          if (data.buyOrder > 0) {
            $('[data-warn=exchangeBuyWarn]').text(data.buyOrder).removeClass('hide');
          }
          if (data.swapExchangeIn > 0) {
            $('[data-warn=exchangeSwapWarn]').text(data.swapExchangeIn).removeClass('hide');
          }
          if (data.myswapAuction > 0) {
            $('[data-warn=exchangeAuctionWarn]').text(data.myswapAuction).removeClass('hide');
          }
          if (data.swapSale > 0) {
            $('[data-warn=exchangeBuyOutWarn]').text(data.swapSale).removeClass('hide');
          }
          if (data.swapExchangeOut > 0) {
            $('[data-warn=exchangeSwapOutWarn]').text(data.swapExchangeOut).removeClass('hide');
          }
          if (data.swapAuction > 0) {
            $('[data-warn=exchangeAuctionOutWarn]').text(data.swapAuction).removeClass('hide');
          }
        }
      })
    }

    /**
     * 各版块订单消息提醒
     * orderType: 0全部 1珠宝店 2互换坊销售  3拍卖  5设计室 6制造间
     * userType: 1买家 2卖家
     * */
    utils.unreadNumberType = function (orderType, userType, callback) {
      var datas = JSON.stringify({
        orderType: orderType,
        userType: userType
      })
      utils.ajax({
        url: '/api/order/unread/number',
        data: datas,
        success: function (data) {
          data = data.data.unreadNum
          callback && callback(data)
        }
      })
    }


    utils.xiaoneng = function () {
      utils.setCookie('siteid', 'zd_1000', 365)
      var script = document.createElement('script');
      script.setAttribute('src', 'http://dl.ntalker.com/js/b2b/ntkfstat.js?siteid=zd_1000');
      script.onload = function () {
        alert(11)
        console.log('小能 is success....')
      }
      $("body").append(script);
    }

    //百度统计
    utils.baiduStatistics = function () {
      var _hmt = _hmt || [];
      (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?06e47e23d00717192b0c42942e2a4931";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    }

    utils.baiduStatisticsReg = function (obj) {
      var _hmt = _hmt || [];
      _hmt.push(['_setVisitTag', '6483', obj.mobilePhone]);
      _hmt.push(['_setVisitTag', '6484', obj.address]);
      _hmt.push(['_setVisitTag', '6485', obj.time]);
      (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?06e47e23d00717192b0c42942e2a4931";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    }

  }

  utils.baiduStatistics();

  setTimeout(function () {

  }, 10)

  $(document).on("click", ".logoutBtn", function () {
    utils.ajax({
      url: "/api/userCenter/logout",
      success: function (data) {
        utils.setCookie("token", "", -1);
        utils.setCookie("phone", "", -1);
        utils.setCookie("nickName", "", -1);
        utils.setCookie("userIdZBX", "", -1);
        sessionStorage.removeItem('userLogo')
        //链接直播
        utils.setDomainCookie("token", "", -1)
        utils.setDomainCookie("nickName", "", -1)
        utils.setDomainCookie("phone", "", -1)

        /*utils.setDomainCookie("authkey", "", -1)
        utils.setDomainCookie("userToken", "", -1)
        utils.setDomainCookie("userIdZBX", "", -1)*/
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('openid');
        $(".nologin").removeClass("hide")
        $(".logined").addClass("hide")
        setTimeout(function () {
          location.href = "../../login"
        }, 100)
      }
    })
  }).on('click', '.toSearch', function () {
    var search;
    for (var i = 0; i < $('.search').length - 1; i++) {
      if ($('.search').eq(i).val().trim()) {
        search = $('.search').eq(i).val().trim()
      }
    }
    if (!search) {
      location.href = "../../jewelry/goodsList";
    } else {
      location.href = "../../jewelry/goodsList?keyWord=" + search;
    }
  }).on('click', '.logo', function () {

  }).on('mouseenter', '.my-cart,.cart-list', function () {
    $('.my-cart').css({
      'border-color': '#df735a'
    })
    $('.cart-list').show()
  }).on('mouseleave', '.my-cart,.cart-list', function () {
    $('.my-cart').css({
      'border-color': '#e5e5e5'
    })
    $('.cart-list').hide()
  })
  document.onkeydown = function (e) {
    if (!e) e = window.event;
    if ((e.keyCode || e.which) == 13) {
      stopDefault(e)
      $('.toSearch').click()
    }
  }
}());

$(function () {
  utils.xiaoneng()
  utils.headerLoginStatus()
  var url_unreadNumber = window.location.href
  if (url_unreadNumber.indexOf('user/order') > -1) {
    utils.unreadNumber()
  }
})