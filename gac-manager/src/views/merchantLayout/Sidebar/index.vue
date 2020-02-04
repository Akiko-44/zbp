<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu mode="vertical"
             :show-timeout="200"
             :default-active="$route.path"
             :collapse="isCollapse"
             background-color="#304156"
             text-color="#bfcbd9"
             active-text-color="#409EFF">
      <sidebar-item v-for="menu in merchantMenus"
                    :key="menu.name"
                    :item="menu"
                    :base-path="menu.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Cookies from 'js-cookie'

export default {
  components: { SidebarItem },
  data() {
    return {
      // 1珠宝店 2设计师 3制造间
      merchantType: Cookies.get('merchantType'),
      merchantMenus: [],
      makeMenus: [
        {
          path: '/merchantInfos',
          name: 'merchantInfos',
          meta: {
            title: '制造间商家信息管理'
          },
          children: [
            {
              path: 'merchantInfo',
              name: 'merchantInfo',
              authority: 'merchantInfo',
              meta: {
                title: '商家信息'
              }
            },
            {
              path: 'merchantCenter',
              name: 'merchantCenter',
              meta: {
                title: '个人信息'
              }
            },
            {
              path: 'updatePwd',
              name: 'updatePwd',
              meta: {
                title: '修改密码'
              }
            },
            {
              path: 'moneyMake',
              name: 'moneyMake',
              meta: {
                title: '对公打款认证'
              }
            }
          ]
        },
        {
          path: '/merchantWorks',
          name: 'merchantWorks',
          meta: {
            title: '设计师商品管理'
          },
          children: [
            {
              path: 'makeWorkList',
              name: 'makeWorkList',
              meta: {
                title: '商品列表'
              }
            }
          ]
        },
        {
          path: '/merchantStatistics',
          name: 'merchantStatistics',
          meta: {
            title: '统计管理'
          },
          children: [
            {
              path: 'orderStatistics',
              name: 'orderStatistics',
              meta: {
                title: '订单统计'
              }
            }
          ]
        },
        {
          path: '/makeMerchantCraft',
          name: 'craft',
          meta: {
            title: '工艺管理'
          },
          children: [
            {
              path: 'list',
              name: 'craftList',
              meta: {
                title: '工艺列表'
              }
            }
          ]
        },
        {
          path: '/merchantOrder',
          name: 'merchantOrder',
          meta: {
            title: '订单管理'
          },
          children: [
            {
              path: 'makeOrderList',
              name: 'makeOrderList',
              meta: {
                title: '制造间订单列表'
              }
            },
            {
              path: 'makeCancelList',
              name: 'makeCancelList',
              meta: {
                title: '取消订单管理'
              }
            },
            {
              path: 'refund',
              name: 'refundList',
              meta: {
                title: '售后管理'
              }
            }
          ]
        },
        {
          path: '/merchantFund',
          name: 'merchantFund',
          meta: {
            title: '资金管理'
          },
          children: [
            {
              path: 'kitingRecords',
              name: 'kitingRecords',
              meta: {
                title: '提现记录'
              }
            },
            {
              path: 'report',
              name: 'report',
              meta: {
                title: '报表'
              }
            }
          ]
        },
        {
          path: '/comment',
          name: 'comment',
          meta: {
            title: '评论管理'
          },
          children: [
            {
              path: 'list',
              name: 'commentList',
              meta: {
                title: '评论列表'
              }
            },
            {
              path: 'detail',
              name: 'commentDetail',
              meta: {
                title: '评论详情'
              },
              hidden: true
            }
          ]
        },
        {
          path: '/discounts',
          name: 'discounts',
          meta: {
            title: '优惠券管理'
          },
          children: [
            {
              path: 'index',
              name: 'discountsList',
              meta: {
                title: '优惠券列表'
              }
            },
            {
              path: 'detail',
              name: 'discountsDetail',
              meta: {
                title: '优惠券详情'
              },
              hidden: true
            },
            {
              path: 'add',
              name: 'discountsAdd',
              meta: {
                title: '添加/修改优惠券'
              },
              hidden: true
            }
          ]
        },
        {
          path: '/message',
          name: 'message',
          meta: {
            title: '消息提示'
          },
          children: [
            {
              path: 'makeMsglist',
              name: 'makeMsglist',
              meta: {
                title: '系统通知'
              }
            },
            {
              path: 'makeOmsglist',
              name: 'makeOmsglist',
              meta: {
                title: '订单消息列表'
              }
            },
            {
              path: 'makeOthermsgList',
              name: 'makeOthermsgList',
              meta: {
                title: '其他通知'
              }
            }
          ]
        },
        {
          path: '/decorationShop',
          name: 'decorationShop',
          meta: {
            title: '店铺装修'
          },
          children: [
            {
              path: 'list',
              name: 'decorationList',
              meta: {
                title: '店铺装修'
              }
            }
          ]
        },
        {
          path: '/made',
          name: 'made',
          meta: {
            title: '定制'
          },
          hidden: true,
          children: [
            {
              path: 'list',
              name: 'madeList',
              meta: {
                title: '定制列表'
              }
            }
          ]
        },
        {
          path: '/kefu',
          name: 'kefu',
          meta: {
            title: '客服'
          },
          children: [
            {
              path: 'kefuIndex',
              name: 'kefuIndex',
              meta: {
                title: '客服'
              }
            }
          ]
        },
        {
          path: '/mid',
          name: 'mid',
          meta: {
            title: '商编'
          },
          children: [
            {
              path: 'midIndex',
              name: 'midIndex',
              meta: {
                title: '商编'
              }
            }
          ]
        },
        {
          path: '/dmRefundAddr',
          name: 'dmRefundAddr',
          meta: {
            title: '退货地址'
          },
          children: [
            {
              path: 'dmRefundAddrIndex',
              name: 'dmRefundAddrIndex',
              meta: {
                title: '退货地址'
              }
            }
          ]
        }
      ],
      designMenus: [
        {
          path: '/merchantInfos',
          name: 'merchantInfos',
          meta: {
            title: '设计师商家信息管理'
          },
          children: [
            {
              path: 'merchantInfo',
              name: 'merchantInfo',
              meta: {
                title: '商家信息'
              }
            },
            {
              path: 'merchantCenter',
              name: 'merchantCenter',
              meta: {
                title: '个人信息'
              }
            },
            {
              path: 'updatePwd',
              name: 'updatePwd',
              meta: {
                title: '修改密码'
              }
            },
            {
              path: 'moneyMake',
              name: 'moneyMake',
              meta: {
                title: '对公打款认证'
              }
            }
          ]
        },
        {
          path: '/merchantWorks',
          name: 'merchantWorks',
          meta: {
            title: '商品管理'
          },
          children: [
            {
              path: 'designWorkList',
              name: 'designWorkList',
              meta: {
                title: '商品列表'
              }
            }
          ]
        },
        {
          path: '/designerManage',
          name: 'designer',
          meta: {
            title: '设计师管理'
          },
          children: [
            {
              path: 'list',
              name: 'designerList',
              meta: {
                title: '设计师列表'
              }
            }
          ]
        },
        {
          path: '/merchantOrder',
          name: 'merchantOrder',
          meta: {
            title: '订单管理'
          },
          children: [
            {
              path: 'designOrderList',
              name: 'designOrderList',
              meta: {
                title: '设计师订单'
              }
            },
            {
              path: 'designCancelList',
              name: 'designCancelList',
              meta: {
                title: '取消订单管理'
              }
            },
            {
              path: 'refund',
              name: 'refundList',
              meta: {
                title: '售后管理'
              }
            }
          ]
        },
        {
          path: '/merchantFund',
          name: 'merchantFund',
          meta: {
            title: '资金管理'
          },
          children: [
            {
              path: 'kitingRecords',
              name: 'kitingRecords',
              meta: {
                title: '提现记录'
              }
            },
            {
              path: 'report',
              name: 'report',
              meta: {
                title: '报表'
              }
            }
          ]
        },
        {
          path: '/comment',
          name: 'comment',
          meta: {
            title: '评论管理'
          },
          children: [
            {
              path: 'list',
              name: 'commentList',
              meta: {
                title: '评论列表'
              }
            },
            {
              path: 'detail',
              name: 'commentDetail',
              meta: {
                title: '评论详情'
              },
              hidden: true
            }
          ]
        },
        {
          path: '/message',
          name: 'message',
          meta: {
            title: '消息提示'
          },
          children: [
            {
              path: 'designMsglist',
              name: 'designMsglist',
              meta: {
                title: '系统通知'
              }
            },
            {
              path: 'designOmsglist',
              name: 'designOmsglist',
              meta: {
                title: '订单消息列表'
              }
            },
            {
              path: 'designOthermsgList',
              name: 'designOthermsgList',
              meta: {
                title: '其他通知'
              }
            }
          ]
        },
        {
          path: '/kefu',
          name: 'kefu',
          meta: {
            title: '客服'
          },
          children: [
            {
              path: 'kefuIndex',
              name: 'kefuIndex',
              meta: {
                title: '客服'
              }
            }
          ]
        },
        {
          path: '/mid',
          name: 'mid',
          meta: {
            title: '商编'
          },
          children: [
            {
              path: 'midIndex',
              name: 'midIndex',
              meta: {
                title: '商编'
              }
            }
          ]
        },
        {
          path: '/dmRefundAddr',
          name: 'dmRefundAddr',
          meta: {
            title: '退货地址'
          },
          children: [
            {
              path: 'dmRefundAddrIndex',
              name: 'dmRefundAddrIndex',
              meta: {
                title: '退货地址'
              }
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'routers'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    if (this.merchantType === '1') {
      this.merchantMenus = []
    } else if (this.merchantType === '2') {
      this.merchantMenus = this.designMenus
    } else if (this.merchantType === '3') {
      this.merchantMenus = this.makeMenus
    }
  }
}
</script>
