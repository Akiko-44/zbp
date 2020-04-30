<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        ref="paramsForm"
        label-width="115px"
        class="listParamsForm"
      >
      <el-date-picker
        v-model="dateValue"
        value-format="yyyy-MM-dd"
        type="daterange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['00:00:00', '23:59:59']"
        align="right"
      >
      </el-date-picker>
       <el-form-item prop="merchantName">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 180px;"
            v-model="listParams.merchantName"
            placeholder="请输入商家名称"
          > </el-input>
        </el-form-item>
      <el-button type="primary" icon="el-icon-search" v-waves @click="handleFilter">查询</el-button>
      </el-form>
    </div>
    <div class="statistics-container" v-if="fixtotalData">
      <div>汇总统计
        <el-tooltip placement="right" effect="light">
          <i class="el-icon-info"></i>
          <div slot="content">
            <p><strong>购买订单数：</strong>已付款-销售订单数量总和；</p>
            <p><strong>购买订单金额：</strong>已付款-销售订单金额总和；</p>
            <p><strong>定制订单数：</strong>已付款-定制订单数量总和；</p>
            <p><strong>定制订单金额：</strong>已付款-定制订单金额总和；</p>
            <!--<p><strong>互换订单数：</strong>所有状态-互换订单数量总和；</p>
            <p><strong>互换订单金额：</strong>所有状态-互换订单保证金总和；</p>
            <p><strong>拍卖订单数：</strong>所有状态-拍卖订单数量总和；</p>
            <p><strong>拍卖订单金额：</strong>所有状态-拍卖订单金额总和；</p>-->
            <p><strong>累计提现金额：</strong>所有提现成功的金额总和；</p>
            <p><strong>库存总数：</strong>所有商品的库存总数；</p>
            <p><strong>待上架商品数：</strong>所有待上架商品数总和；</p>
            <p><strong>已售罄商品数：</strong>所有已售罄商品数总和；</p>
            <p><strong>待审核商品数：</strong>所有待审核商品数总和；</p>
            <p><strong>待发货订单数：</strong>所有待发货订单数总和；</p>
            <p><strong>已收货订单数：</strong>所有已收货订单数总和；</p>
            <p><strong>退款/退货订单数：</strong>所有退款、退货订单数总和；</p>
            <p><strong>退款/退货订单金额：</strong>所有退款、退货订单金额总和；</p>
          </div>
        </el-tooltip>
      </div>
      <ul>
        <li>购买订单数:<span>{{fixtotalData.cumuBuyOrderNum || 0}}</span></li>
        <li>购买订单金额:<span>￥{{fixtotalData.cumuBuyOrderAmount || 0}}</span></li>
        <li>定制订单数:<span>{{fixtotalData.cumuCustomOrderNum || 0}}</span></li>
        <li>定制订单金额:<span>￥{{fixtotalData.cumuCustomOrderAmount || 0}}</span></li>
        <!--<li>互换订单数:<span>{{fixtotalData.cumuSwapOrderNum || 0}}</span></li>
        <li>互换订单保证金:<span>￥{{fixtotalData.cumuSwapOrderAmount || 0}}</span></li>
      </ul>
      <ul>
        <li>拍卖订单数:<span>{{fixtotalData.cumuAuctionOrderNum || 0}}</span></li>
        <li>拍卖订单金额:<span>￥{{fixtotalData.cumuAuctionOrderAmount || 0}}</span></li>-->
        <li>累计提现金额:<span>{{fixtotalData.cumuWithdrawAmount || 0}}</span></li>
        <li>累计手续费:<span>￥{{fixtotalData.cumuWithdrawServiceFee || 0}}</span></li>        
      </ul>
      <ul>
        <li>库存总数:<span>{{fixtotalData.cumuStockNum || 0}}</span></li>
        <li>待上架商品数:<span>{{fixtotalData.cumuWaitSaleGoodsNum || 0}}</span></li>
      	<li>已售罄商品数:<span>{{fixtotalData.cumuSaleOutGoodsNum || 0}}</span></li>
        <li>待审核商品数:<span>{{fixtotalData.cumuWaitAuditGoodsNum || 0}}</span></li>
        <li>待发货订单数:<span>{{fixtotalData.cumuWaitDeliverOrderNum || 0}}</span></li>
        <li>待收货订单数:<span>{{fixtotalData.cumuWaitReceiveOrderNum || 0}}</span></li>        
      </ul>
      <ul>
        <li>已收货订单数:<span>{{fixtotalData.cumuReceiveOrderNum || 0}}</span></li>
        <li>退款/货订单数:<span>{{fixtotalData.cumuRefundOrderNum || 0}}</span></li>
        <li>退款/货订单金额:<span>￥{{fixtotalData.cumuRefundOrderAmount || 0}}</span></li>
        <li>商品收藏数:<span>{{fixtotalData.cumuGoodsCollectNum || 0}}</span></li>
        <li>店铺收藏数:<span>{{fixtotalData.cumuShopCollectNum || 0}}</span></li>
        <li>评论数:<span>{{fixtotalData.cumuCommentNum || 0}}</span></li>
      </ul>
      <ul>
        <li>账户余额:<span>{{fixtotalData.cumuAccountBalance || 0}}</span></li>
      </ul>
    </div>
    <div class="statistics-container" v-if="isSummary && totalData">
      <div>查询汇总：{{listParams.startTime}}至{{listParams.endTime}}</div>
      <el-tabs v-model="editableTabsValue"  @tab-click="handleClick">
        <el-tab-pane
          :key="item.name"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.name"
        >
          <template v-if="editableTabsValue == 0">
            <ul>
              <li>购买订单数:<span>{{totalData.cumuBuyOrderNum || 0}}</span></li>
              <li>购买订单金额:<span>￥{{totalData.cumuBuyOrderAmount || 0}}</span></li>
              <li>定制订单数:<span>{{totalData.cumuCustomOrderNum || 0}}</span></li>
              <li>定制订单金额:<span>￥{{totalData.cumuCustomOrderAmount || 0}}</span></li>
              <li>累计提现金额:<span>{{totalData.cumuWithdrawAmount || 0}}</span></li>
              <li>累计手续费:<span>￥{{totalData.cumuWithdrawServiceFee || 0}}</span></li>        
			      </ul>
			      <ul>
              <li>已售罄商品数:<span>{{totalData.cumuSaleOutGoodsNum || 0}}</span></li>
              <li>待发货订单数:<span>{{totalData.cumuWaitDeliverOrderNum || 0}}</span></li>
              <li>待收货订单数:<span>{{totalData.cumuWaitReceiveOrderNum || 0}}</span></li>
              <li>已收货订单数:<span>{{totalData.cumuReceiveOrderNum || 0}}</span></li>
              <li>退款/货订单数:<span>{{totalData.cumuRefundOrderNum || 0}}</span></li>
              <li>退款/货订单金额:<span>￥{{totalData.cumuRefundOrderAmount || 0}}</span></li>
            </ul>
            <ul>
              <li>商品收藏数:<span>{{totalData.cumuGoodsCollectNum || 0}}</span></li>
              <li>店铺收藏数:<span>{{totalData.cumuShopCollectNum || 0}}</span></li>
              <li>评论数:<span>{{totalData.cumuCommentNum || 0}}</span></li>
              <li>账户余额:<span>{{totalData.cumuAccountBalance || 0}}</span></li>
            </ul>
          </template>
          <template v-else-if="editableTabsValue == 1">
            <ul>
              <li>购买订单数:<span>{{totalData.cumuBuyOrderNum || 0}}</span></li>
              <li>购买订单金额:<span>￥{{totalData.cumuBuyOrderAmount || 0}}</span></li>
              <li>累计提现金额:<span>{{totalData.cumuWithdrawAmount || 0}}</span></li>
              <li>累计手续费:<span>￥{{totalData.cumuWithdrawServiceFee || 0}}</span></li>
              <!--<li>库存总数:<span>{{totalData.cumuStockNum || 0}}</span></li>
              <li>待上架商品数:<span>{{totalData.cumuWaitSaleGoodsNum || 0}}</span></li>-->
              <li>已售罄商品数:<span>{{totalData.cumuSaleOutGoodsNum || 0}}</span></li>
              <!--<li>待审核商品数:<span>{{totalData.cumuWaitAuditGoodsNum || 0}}</span></li>-->
              <li>待发货订单数:<span>{{totalData.cumuWaitDeliverOrderNum || 0}}</span></li>
            </ul>
            <ul>
              <li>待收货订单数:<span>{{totalData.cumuWaitReceiveOrderNum || 0}}</span></li>
              <li>已收货订单数:<span>{{totalData.cumuReceiveOrderNum || 0}}</span></li>
              <li>退款/货订单数:<span>{{totalData.cumuRefundOrderNum || 0}}</span></li>
              <li>退款/货订单金额:<span>￥{{totalData.cumuRefundOrderAmount || 0}}</span></li>
              <li>商品收藏数:<span>{{totalData.cumuGoodsCollectNum || 0}}</span></li>
              <li>店铺收藏数:<span>{{totalData.cumuShopCollectNum || 0}}</span></li>
            </ul>
            <ul>
              <li>评论数:<span>{{totalData.cumuCommentNum || 0}}</span></li>
              <li>账户余额:<span>{{totalData.cumuAccountBalance || 0}}</span></li>
            </ul>
          </template>
          <template v-else-if="editableTabsValue == 2">
            <ul>
              <li>购买订单数:<span>{{totalData.cumuBuyOrderNum || 0}}</span></li>
              <li>购买订单金额:<span>￥{{totalData.cumuBuyOrderAmount || 0}}</span></li>
              <li>累计提现金额:<span>{{totalData.cumuWithdrawAmount || 0}}</span></li>
              <li>累计手续费:<span>￥{{totalData.cumuWithdrawServiceFee || 0}}</span></li>
              <li>已售罄商品数:<span>{{totalData.cumuSaleOutGoodsNum || 0}}</span></li>
              <li>待发货订单数:<span>{{totalData.cumuWaitDeliverOrderNum || 0}}</span></li>
            </ul>
            <ul>
              <li>待收货订单数:<span>{{totalData.cumuWaitReceiveOrderNum || 0}}</span></li>
              <li>已收货订单数:<span>{{totalData.cumuReceiveOrderNum || 0}}</span></li>
              <li>退款/货订单数:<span>{{totalData.cumuRefundOrderNum || 0}}</span></li>
              <li>退款/货订单金额:<span>￥{{totalData.cumuRefundOrderAmount || 0}}</span></li>
              <li>商品收藏数:<span>{{totalData.cumuGoodsCollectNum || 0}}</span></li>
              <li>店铺收藏数:<span>{{totalData.cumuShopCollectNum || 0}}</span></li>
            </ul>
            <ul>
              <li>评论数:<span>{{totalData.cumuCommentNum || 0}}</span></li>
              <li>账户余额:<span>{{totalData.cumuAccountBalance || 0}}</span></li>
            </ul>
          </template>
          <template v-else-if="editableTabsValue == 5 || editableTabsValue == 6">
            <ul>
              <li>购买订单数:<span>{{totalData.cumuBuyOrderNum || 0}}</span></li>
              <li>购买订单金额:<span>￥{{totalData.cumuBuyOrderAmount || 0}}</span></li>
              <li>定制订单数:<span>{{totalData.cumuCustomOrderNum || 0}}</span></li>
              <li>定制订单金额:<span>￥{{totalData.cumuCustomOrderAmount || 0}}</span></li>
              <li>累计提现金额:<span>{{totalData.cumuWithdrawAmount || 0}}</span></li>
              <li>累计手续费:<span>￥{{totalData.cumuWithdrawServiceFee || 0}}</span></li>
            </ul>
            <ul>
              <li>已售罄商品数:<span>{{totalData.cumuSaleOutGoodsNum || 0}}</span></li>
              <li>待发货订单数:<span>{{totalData.cumuWaitDeliverOrderNum || 0}}</span></li>
              <li>待收货订单数:<span>{{totalData.cumuWaitReceiveOrderNum || 0}}</span></li>
              <li>已收货订单数:<span>{{totalData.cumuReceiveOrderNum || 0}}</span></li>
              <li>退款/货订单数:<span>{{totalData.cumuRefundOrderNum || 0}}</span></li>
              <li>退款/货订单金额:<span>￥{{totalData.cumuRefundOrderAmount || 0}}</span></li>
            </ul>
            <ul>
              <li>商品收藏数:<span>{{totalData.cumuGoodsCollectNum || 0}}</span></li>
              <li>店铺收藏数:<span>{{totalData.cumuShopCollectNum || 0}}</span></li>
              <li>评论数:<span>{{totalData.cumuCommentNum || 0}}</span></li>
              <li>账户余额:<span>{{totalData.cumuAccountBalance || 0}}</span></li>
            </ul>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    
    <el-tabs v-model="editableTabsValue2"  @tab-click="handleClick2">
      <el-tab-pane
        :key="item2.name"
        v-for="(item2, index2) in editableTabs2"
        :label="item2.title"
        :name="item2.name"
      >
        <template v-if="editableTabsValue2 == 1">
          <div class="filter-list">
            <el-button class="button fr" type="primary" @click="getExportList">导出</el-button>
            <a id="downlink"></a>
            <!--错误信息提示-->
            <el-dialog title="提示" v-model="errorDialog" size="tiny">
              <span>{{errorMsg}}</span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="errorDialog=false">确认</el-button>
                </span>
            </el-dialog> 
          </div>
          <el-table :key='tableKey' :data="listData" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="商家ID">
              <template slot-scope="{ row }">
                <span>{{row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商家名称">
              <template slot-scope="{ row }">
                <span>{{row.userName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="手机号码">
              <template slot-scope="{ row }">
                <span>{{row.mobilePhone}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="所在城市">
              <template slot-scope="{ row }">
                <span>{{row.cityName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="销售商品数">
              <template slot-scope="{ row }">
                <span>{{row.saleGoodsNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单数量">
              <template slot-scope="{ row }">
                <span>{{row.orderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="销售金额" :sortable="true" sort-by="saleAmount">
              <template slot-scope="{ row }">
                <span>{{row.saleAmount || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="账户余额">
              <template slot-scope="{ row }">
                <span>{{row.accountBalance || 0}}</span>
              </template>
            </el-table-column>
            
            <el-table-column align="center" label="提现金额" :sortable="true" sort-by="withdrawAmount">
              <template slot-scope="{ row }">
                <span>{{row.withdrawAmount || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="提现手续费" :sortable="true" sort-by="withdrawServiceFee">
              <template slot-scope="{ row }">
                <span>{{row.withdrawServiceFee || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="库存总数">
              <template slot-scope="{ row }">
                <span>{{row.stockNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="待上架商品数">
              <template slot-scope="{ row }">
                <span>{{row.waitSaleGoodsNum}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="已售罄商品数">
              <template slot-scope="{ row }">
                <span>{{row.saleOutGoodsNum}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="待审核商品数">
              <template slot-scope="{ row }">
                <span>{{row.waitAuditGoodsNum}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="待发货订单数">
              <template slot-scope="{ row }">
                <span>{{row.waitDeliverOrderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="待收货订单数">
              <template slot-scope="{ row }">
                <span>{{row.waitReceiveOrderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="已收货订单数">
              <template slot-scope="{ row }">
                <span>{{row.receiveOrderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="退款/货订单数">
              <template slot-scope="{ row }">
                <span>{{row.refundOrderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="退款/货订单金额" :sortable="true" sort-by="refundOrderAmount">
              <template slot-scope="{ row }">
                <span>{{row.refundOrderAmount || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品收藏数">
              <template slot-scope="{ row }" :sortable="true" sort-by="goodsCollectNum">
                <span>{{row.goodsCollectNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="店铺收藏数">
              <template slot-scope="{ row }" :sortable="true" sort-by="shopCollectNum">
                <span>{{row.shopCollectNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="评论数">
              <template slot-scope="{ row }" :sortable="true" sort-by="commentNum">
                <span>{{row.commentNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="开通时间">
              <template slot-scope="{ row }" :sortable="true" sort-by="openTime">
                <span>{{row.openTime || 0}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else-if="editableTabsValue2 == 2">
          <div class="filter-list">
            <el-button class="button fr" type="primary" @click="getExportList">导出</el-button>
            <a id="downlink"></a>
            <!--错误信息提示-->
            <el-dialog title="提示" v-model="errorDialog" size="tiny">
              <span>{{errorMsg}}</span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="errorDialog=false">确认</el-button>
                </span>
            </el-dialog> 
          </div>
          <el-table :key='tableKey' :data="listData" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="商家ID">
              <template slot-scope="{ row }">
                <span>{{row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商家名称">
              <template slot-scope="{ row }">
                <span>{{row.userName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="手机号码">
              <template slot-scope="{ row }">
                <span>{{row.mobilePhone}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="经营主体">
              <template slot-scope="{ row }">
                <span>{{registerType[row.registerType]}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="所在城市">
              <template slot-scope="{ row }">
                <span>{{row.cityName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="销售商品数">
              <template slot-scope="{ row }">
                <span>{{row.saleGoodsNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单数量">
              <template slot-scope="{ row }">
                <span>{{row.orderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="销售金额" :sortable="true" sort-by="saleAmount">
              <template slot-scope="{ row }">
                <span>{{row.saleAmount || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="账户余额">
              <template slot-scope="{ row }">
                <span>{{row.accountBalance || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="互换商品数">
              <template slot-scope="{ row }">
                <span>{{row.swapGoodsNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="互换订单数">
              <template slot-scope="{ row }">
                <span>{{row.swapOrderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="互换保证金" :sortable="true" sort-by="swapOrderDeposit">
              <template slot-scope="{ row }">
                <span>{{row.swapOrderDeposit || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="拍卖商品数">
              <template slot-scope="{ row }">
                <span>{{row.auctionGoodsNum}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="拍卖订单数">
              <template slot-scope="{ row }">
                <span>{{row.auctionOrderNum}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="拍卖订单金额" :sortable="true" sort-by="auctionOrderAmount">
              <template slot-scope="{ row }">
                <span>{{row.auctionOrderAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="提现金额" :sortable="true" sort-by="withdrawAmount">
              <template slot-scope="{ row }">
                <span>{{row.withdrawAmount || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="手续费" :sortable="true" sort-by="withdrawServiceFee">
              <template slot-scope="{ row }">
                <span>{{row.withdrawServiceFee || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="库存总数">
              <template slot-scope="{ row }">
                <span>{{row.stockNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="待上架商品数">
              <template slot-scope="{ row }">
                <span>{{row.waitSaleGoodsNum}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="已售罄商品数">
              <template slot-scope="{ row }">
                <span>{{row.saleOutGoodsNum}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="待审核商品数">
              <template slot-scope="{ row }">
                <span>{{row.waitAuditGoodsNum}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="待发货订单数">
              <template slot-scope="{ row }">
                <span>{{row.waitDeliverOrderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="待收货订单数">
              <template slot-scope="{ row }">
                <span>{{row.waitReceiveOrderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="已收货订单数">
              <template slot-scope="{ row }">
                <span>{{row.receiveOrderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="退款/货订单数">
              <template slot-scope="{ row }">
                <span>{{row.refundOrderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="退款/货订单金额" :sortable="true" sort-by="refundOrderAmount">
              <template slot-scope="{ row }">
                <span>{{row.refundOrderAmount || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品收藏数">
              <template slot-scope="{ row }" :sortable="true" sort-by="goodsCollectNum">
                <span>{{row.goodsCollectNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="店铺收藏数">
              <template slot-scope="{ row }" :sortable="true" sort-by="shopCollectNum">
                <span>{{row.shopCollectNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="评论数">
              <template slot-scope="{ row }" :sortable="true" sort-by="commentNum">
                <span>{{row.commentNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="开通时间">
              <template slot-scope="{ row }" :sortable="true" sort-by="openTime">
                <span>{{row.openTime || 0}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else-if="editableTabsValue2 == 5">
          <div class="filter-list">
            <el-button class="button fr" type="primary" @click="getExportList">导出</el-button>
            <a id="downlink"></a>
            <!--错误信息提示-->
            <el-dialog title="提示" v-model="errorDialog" size="tiny">
              <span>{{errorMsg}}</span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="errorDialog=false">确认</el-button>
                </span>
            </el-dialog> 
          </div>
          <el-table :key='tableKey' :data="listData" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="商家ID">
              <template slot-scope="{ row }">
                <span>{{row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商家名称">
              <template slot-scope="{ row }">
                <span>{{row.userName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="经营主体">
              <template slot-scope="{ row }">
                <span>{{registerType[row.registerType]}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="手机号码">
              <template slot-scope="{ row }">
                <span>{{row.mobilePhone}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="所在城市">
              <template slot-scope="{ row }">
                <span>{{row.cityName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="销售商品数">
              <template slot-scope="{ row }">
                <span>{{row.saleGoodsNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单数量">
              <template slot-scope="{ row }">
                <span>{{row.orderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="销售金额" :sortable="true" sort-by="saleAmount">
              <template slot-scope="{ row }">
                <span>{{row.saleAmount || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="账户余额">
              <template slot-scope="{ row }">
                <span>{{row.accountBalance || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="提现金额" :sortable="true" sort-by="withdrawAmount">
              <template slot-scope="{ row }">
                <span>{{row.withdrawAmount || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="手续费" :sortable="true" sort-by="withdrawServiceFee">
              <template slot-scope="{ row }">
                <span>{{row.withdrawServiceFee || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="库存总数">
              <template slot-scope="{ row }">
                <span>{{row.stockNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="待上架商品数">
              <template slot-scope="{ row }">
                <span>{{row.waitSaleGoodsNum}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="已售罄商品数">
              <template slot-scope="{ row }">
                <span>{{row.saleOutGoodsNum}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="待审核商品数">
              <template slot-scope="{ row }">
                <span>{{row.waitAuditGoodsNum}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="待发货订单数">
              <template slot-scope="{ row }">
                <span>{{row.waitDeliverOrderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="待收货订单数">
              <template slot-scope="{ row }">
                <span>{{row.waitReceiveOrderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="已收货订单数">
              <template slot-scope="{ row }">
                <span>{{row.receiveOrderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="退款/货订单数">
              <template slot-scope="{ row }">
                <span>{{row.refundOrderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="退款/货订单金额" :sortable="true" sort-by="refundOrderAmount">
              <template slot-scope="{ row }">
                <span>{{row.refundOrderAmount || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品收藏数">
              <template slot-scope="{ row }" :sortable="true" sort-by="goodsCollectNum">
                <span>{{row.goodsCollectNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="店铺收藏数">
              <template slot-scope="{ row }" :sortable="true" sort-by="shopCollectNum">
                <span>{{row.shopCollectNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="评论数">
              <template slot-scope="{ row }" :sortable="true" sort-by="commentNum">
                <span>{{row.commentNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="开通时间">
              <template slot-scope="{ row }" :sortable="true" sort-by="openTime">
                <span>{{row.openTime || 0}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else-if="editableTabsValue2 == 6">
          <div class="filter-list">
            <el-button class="button fr" type="primary" @click="getExportList">导出</el-button>
            <a id="downlink"></a>
            <!--错误信息提示-->
            <el-dialog title="提示" v-model="errorDialog" size="tiny">
              <span>{{errorMsg}}</span>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="errorDialog=false">确认</el-button>
                </span>
            </el-dialog> 
          </div>
          <el-table :key='tableKey' :data="listData" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="商家ID">
              <template slot-scope="{ row }">
                <span>{{row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商家名称">
              <template slot-scope="{ row }">
                <span>{{row.userName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="手机号码">
              <template slot-scope="{ row }">
                <span>{{row.mobilePhone}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="所在城市">
              <template slot-scope="{ row }">
                <span>{{row.cityName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="销售商品数">
              <template slot-scope="{ row }">
                <span>{{row.saleGoodsNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单数量">
              <template slot-scope="{ row }">
                <span>{{row.orderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="销售金额" :sortable="true" sort-by="saleAmount">
              <template slot-scope="{ row }">
                <span>{{row.saleAmount || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="账户余额">
              <template slot-scope="{ row }">
                <span>{{row.accountBalance || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="提现金额" :sortable="true" sort-by="withdrawAmount">
              <template slot-scope="{ row }">
                <span>{{row.withdrawAmount || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="手续费" :sortable="true" sort-by="withdrawServiceFee">
              <template slot-scope="{ row }">
                <span>{{row.withdrawServiceFee || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="库存总数">
              <template slot-scope="{ row }">
                <span>{{row.stockNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="待上架商品数">
              <template slot-scope="{ row }">
                <span>{{row.waitSaleGoodsNum}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="已售罄商品数">
              <template slot-scope="{ row }">
                <span>{{row.saleOutGoodsNum}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="待审核商品数">
              <template slot-scope="{ row }">
                <span>{{row.waitAuditGoodsNum}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="待发货订单数">
              <template slot-scope="{ row }">
                <span>{{row.waitDeliverOrderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="待收货订单数">
              <template slot-scope="{ row }">
                <span>{{row.waitReceiveOrderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="已收货订单数">
              <template slot-scope="{ row }">
                <span>{{row.receiveOrderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="退款/货订单数">
              <template slot-scope="{ row }">
                <span>{{row.refundOrderNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="退款/货订单金额" :sortable="true" sort-by="refundOrderAmount">
              <template slot-scope="{ row }">
                <span>{{row.refundOrderAmount || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品收藏数">
              <template slot-scope="{ row }" :sortable="true" sort-by="goodsCollectNum">
                <span>{{row.goodsCollectNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="店铺收藏数">
              <template slot-scope="{ row }" :sortable="true" sort-by="shopCollectNum">
                <span>{{row.shopCollectNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="评论数">
              <template slot-scope="{ row }" :sortable="true" sort-by="commentNum">
                <span>{{row.commentNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="开通时间">
              <template slot-scope="{ row }" :sortable="true" sort-by="openTime">
                <span>{{row.openTime || 0}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
    </el-tabs>
    
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listParams.offset" :page-sizes="[10,20,30,50]" :page-size="listParams.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
  </div>
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import { 
  merchantDataList,
  merchantDataTotal
} from '@/api/public/statistics'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  components:{
    
  },
  data() {
    return {
      type: 0,
      listParams:{
        offset: 1,
        limit: 20,
        merchantName: '',
        startTime: '',
        endTime: ''
      },
      startTime: undefined,
      endTime: undefined,
      isSummary: false,
      tableKey: 0,
      editableTabsValue: '0',
      editableTabsValue2: '1',
      editableTabs: [{
        title: '全部',
        name: '0'
      }, {
        title: '珠宝店',
        name: '1'
      }, {
        title: '设计师',
        name: '5'
      }, {
        title: '制造间',
        name: '6'
      }],
      editableTabs2: [{
        title: '珠宝店',
        name: '1'
      }, {
        title: '设计师',
        name: '5'
      }, {
        title: '制造间',
        name: '6'
      }],
      registerTypeData: [
        {
          1: '个人'
        },
        {
          2: '公司'
        }
      ],
      registerType: {
        1: '个人',
        2: '公司'
      },
      tabIndex: 0,
      fixtotalData: undefined,
      totalData: undefined,
      listData: [],
      exportList: [],
      total: null,
      listLoading: true,
      dateValue: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      // 导出文件
      outFile: '', // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [{
        id: '商家ID',
        userName: '商家名称',
        mobilePhone: '手机号码',
        cityName: '所在城市',
        saleGoodsNum: '销售商品数',
        orderNum: '订单数量',
        saleAmount: '销售金额',
        accountBalance: '账户余额',
        withdrawAmount: '提现金额',
        withdrawServiceFee: '提现手续费',
        stockNum: '库存总数',
        waitSaleGoodsNum: '待上架商品数',
        saleOutGoodsNum: '已售罄商品数',
        waitAuditGoodsNum: '待审核商品数',
        waitDeliverOrderNum: '待发货订单数',
        waitReceiveOrderNum: '待收货订单数',
        receiveOrderNum: '已收货订单数',
        refundOrderNum: '退款/货订单数',
        refundOrderAmount: '退款/货订单金额',
        goodsCollectNum: '商品收藏数',
        shopCollectNum: '店铺收藏数',
        commentNum: '评论数',
        openTime: '开通时间'
      }]
    }
  },
  watch: {
    dateValue(value) {
      this.startTime = value ? value[0] : undefined
      this.endTime = value ? value[1] : undefined
    }
  },
  created() {
    this.getFixTotalData()
    this.getListData(1, 0, this.listParams)
  },
  mounted() {
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    getFixTotalData() {
      merchantDataTotal(0)
        .then(succ => {
          this.fixtotalData = succ.data
        })
    },
    getTotalData(type, params) {
      merchantDataTotal(type, params)
        .then(succ => {
          this.totalData = succ.data
        })
    },
    getListData(type, isExport, params) {
      this.listLoading = true
      merchantDataList(type, isExport, params)
        .then(succ => {
          this.listData = succ.data.records
          this.total = succ.data.total
          this.listLoading = false
        })
    },
    getExportList() {
      merchantDataList(this.editableTabsValue2, 1, {
        startTime: this.listParams.startTime,
        endTime: this.listParams.endTime
      }).then(data => {
        this.exportList = data.data.records
        this.downloadFile()
      })
    },
    handleFilter() {
      if (this.startTime !== undefined) {
        this.isSummary = true
      } else {
        this.isSummary = false
      }
      this.listParams.startTime = this.startTime
      this.listParams.endTime = this.endTime
      this.listParams.offset = 1
      this.getTotalData(0, this.listParams)
      this.getListData(this.editableTabsValue2, 0, this.listParams)
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.listParams.offset = 1
      this.getListData(this.editableTabsValue2, 0, this.listParams)
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getListData(this.editableTabsValue2, 0, this.listParams)
    },
    handleClick(tab, event) {
      this.getTotalData(this.editableTabsValue, this.listParams)
    },
    handleClick2(tab, event) {
      this.getListData(this.editableTabsValue2, 0, this.listParams)
    },
    downloadFile() { // 点击导出按钮
      const listData = this.exportList
      const data = this.excelTitle.concat(listData)
      this.downloadExl(data, '统计')
    },
    downloadExl(json, downName, type) {  // 导出到excel
      const keyMap = [] // 获取键
      for (const k in json[0]) {
        keyMap.push(k)
      }
      const tmpdata = [] // 用来保存转换好的json
      json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
      }))).reduce((prev, next) => prev.concat(next)).forEach(function(v) {
        tmpdata[v.position] = {
          v: v.v
        }
      })
      let outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
      let tmpWB = {
        SheetNames: ['mySheet'], // 保存的表标题
        Sheets: {
          'mySheet': Object.assign({},
            tmpdata, // 内容
            {
              '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
            })
        }
      }
      const tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
        { bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary' } // 这里的数据是用来定义导出的格式类型
      ))], {
        type: ''
      }) // 创建二进制对象写入转换好的字节流
      var href = URL.createObjectURL(tmpDown) // 创建对象超链接
      this.outFile.download = downName + '.xlsx' // 下载名称
      this.outFile.href = href // 绑定a标签
      this.outFile.click() // 模拟点击实现下载
      setTimeout(function() { // 延时释放
        URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
      }, 100)
    },
    s2ab(s) { // 字符串转字符流
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF
      }
      return buf
    },
    getCharCol(n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
      let s = ''
      let m = 0
      while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
      }
      return s
    },
    fixdata(data) { // 文件流转BinaryString
      var o = ''
      var l = 0
      var w = 10240
      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    }
  }
}
</script>
<style scoped>
.statistics-container{
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #a1a1a1;
  color: #666666;
  border-radius: 10px;
}
.statistics-container ul,
.statistics-container li{
  list-style: none;
  font-size: 14px;
  padding: 0;
}
.statistics-container li{
  display: inline-block;
  width: 16%;
  vertical-align: text-top;
}
.statistics-container li span{
  color: #FF0000;
}
</style>