<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listParams" :rules="rules" ref="paramsForm" label-width="101px">
        <el-form-item label="订单编号:" prop="orderNumber">
          <el-input @keyup.enter.native="handleFilter" :maxlength="20" style="width: 195px;" v-model="listParams.orderNumber"> </el-input>
        </el-form-item>
        <el-form-item label="订单状态:">
          <el-select v-model="listParams.orderState" @change="handleFilter" clearable placeholder="订单状态" style="width: 120px;">
            <el-option
              v-for="item in orderStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
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
        />
        <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      </el-form>
    </div>
    <div class="statistics-container" v-if="fixtotalData">
      <div>汇总统计
        <el-tooltip placement="right" effect="light">
          <i class="el-icon-info"></i>
          <div slot="content">
            <p><strong>累计订单数：</strong>全部状态订单数量总和；</p>
            <!--<p><strong>累计交易流水(GMV)：</strong>全部订单金额总和，包含互换坊拍卖、互换的保证金；</p>-->
            <p><strong>累计交易流水(GMV)：</strong>全部订单金额总和；</p>
            <p><strong>退款/货订单数：</strong>全部退款、退货订单数量总和；</p>
            <p><strong>退款/货订单金额：</strong>全部退款、退货订单金额总和；</p>
          </div>
        </el-tooltip>
      </div>
      <ul>
        <li>累计订单数:<span>{{fixtotalData.cumuOrderNum || 0}}</span></li>
        <li>累计交易流水(GMV):<span>￥{{fixtotalData.cumuTradeFlow || 0}}</span></li>
        <li>待付款订单数:<span>{{fixtotalData.cumuWaitPayOrderNum || 0}}</span></li>
        <li>待付款订单金额:<span>￥{{fixtotalData.cumuWaitPayOrderAmount || 0}}</span></li>
        <li>待确认订单数:<span>{{fixtotalData.cumuWaitConfirmOrderNum || 0}}</span></li>
        <li>待确认订单金额:<span>￥{{fixtotalData.cumuWaitConfirmOrderAmount || 0}}</span></li>
      </ul>
      <ul>
        <li>待发货订单数:<span>{{fixtotalData.cumuWaitDeliverOrderNum || 0}}</span></li>
        <li>待发货订单金额:<span>￥{{fixtotalData.cumuWaitDeliverOrderAmount || 0}}</span></li>
        <li>待收货订单数:<span>{{fixtotalData.cumuWaitReceiveOrderNum || 0}}</span></li>
        <li>待收货订单金额:<span>￥{{fixtotalData.cumuWaitReceiveOrderAmount || 0}}</span></li>
        <li>已收货订单数:<span>{{fixtotalData.cumuReceiveOrderNum || 0}}</span></li>
        <li>已收货订单金额:<span>￥{{fixtotalData.cumuReceiveOrderAmount || 0}}</span></li>
      </ul>
      <ul>
        <li>已完成订单数:<span>{{fixtotalData.cumuFinishOrderNum || 0}}</span></li>
        <li>已完成订单金额:<span>￥{{fixtotalData.cumuFinishOrderAmount || 0}}</span></li>
        <li>已取消订单数:<span>{{fixtotalData.cumuCancelOrderNum || 0}}</span></li>
        <li>已取消订单金额:<span>￥{{fixtotalData.cumuCancelOrderAmount || 0}}</span></li>
        <li>退款/货订单数:<span>{{fixtotalData.cumuRefundOrderNum || 0}}</span></li>
        <li>退款/货订单金额:<span>￥{{fixtotalData.cumuRefundOrderAmount || 0}}</span></li>
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
          <ul>
            <li>累计订单数:<span>{{totalData.cumuOrderNum || 0}}</span></li>
            <li>累计交易流水(GMV):<span>￥{{totalData.cumuTradeFlow || 0}}</span></li>
            <li>待付款订单数:<span>{{totalData.cumuWaitPayOrderNum || 0}}</span></li>
            <li>待付款订单金额:<span>￥{{totalData.cumuWaitPayOrderAmount || 0}}</span></li>
            <li>待确认订单数:<span>{{totalData.cumuWaitConfirmOrderNum || 0}}</span></li>
            <li>待确认订单金额:<span>￥{{totalData.cumuWaitConfirmOrderAmount || 0}}</span></li>
          </ul>
          <ul>
            <li>待发货订单数:<span>{{totalData.cumuWaitDeliverOrderNum || 0}}</span></li>
            <li>待发货订单金额:<span>￥{{totalData.cumuWaitDeliverOrderAmount || 0}}</span></li>
            <li>待收货订单数:<span>{{totalData.cumuWaitReceiveOrderNum || 0}}</span></li>
            <li>待收货订单金额:<span>￥{{totalData.cumuWaitReceiveOrderAmount || 0}}</span></li>
            <li>已收货订单数:<span>{{totalData.cumuReceiveOrderNum || 0}}</span></li>
            <li>已收货订单金额:<span>￥{{totalData.cumuReceiveOrderAmount || 0}}</span></li>
          </ul>
          <ul>
            <li>已完成订单数:<span>{{totalData.cumuFinishOrderNum || 0}}</span></li>
            <li>已完成订单金额:<span>￥{{totalData.cumuFinishOrderAmount || 0}}</span></li>
            <li>已取消订单数:<span>{{totalData.cumuCancelOrderNum || 0}}</span></li>
            <li>已取消订单金额:<span>￥{{totalData.cumuCancelOrderAmount || 0}}</span></li>
            <li>退款/货订单数:<span>{{totalData.cumuRefundOrderNum || 0}}</span></li>
            <li>退款/货订单金额:<span>￥{{totalData.cumuRefundOrderAmount || 0}}</span></li>
          </ul>
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
            <el-table-column align="center" label="订单编号">
              <template slot-scope="{ row }">
                <span>{{row.orderNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="收货人">
              <template slot-scope="{ row }">
                <span>{{row.consignee}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="手机号码">
              <template slot-scope="{ row }">
                <span>{{row.mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="收货地址">
              <template slot-scope="{ row }">
                <span>{{row.shippingAddress}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商家名称">
              <template slot-scope="{ row }">
                <span>{{row.merchantName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品数量">
              <template slot-scope="{ row }">
                <span>{{row.goodsNumber || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="单价" :sortable="true" sort-by="unitPrice">
              <template slot-scope="{ row }">
                <span>￥{{row.unitPrice || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="优惠金额" :sortable="true" sort-by="couponsPrice">
              <template slot-scope="{ row }">
                <span>￥{{row.couponsPrice || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="运费">
              <template slot-scope="{ row }">
                <span>￥{{row.freightMoney || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单金额" :sortable="true" sort-by="payMoney">
              <template slot-scope="{ row }">
                <span>￥{{row.payMoney || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单状态">
              <template slot-scope="{ row }">
                <span>{{orderState[row.state]}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="下单时间" :sortable="true" sort-by="createTime">
              <template slot-scope="{ row }">
                <span>{{row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="支付时间" :sortable="true" sort-by="payTime">
              <template slot-scope="{ row }">
                <span>{{row.payTime}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else-if="editableTabsValue2 == 2 || editableTabsValue2 == 3">
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
            <el-table-column align="center" label="订单编号">
              <template slot-scope="{ row }">
                <span>{{row.orderNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="收货人">
              <template slot-scope="{ row }">
                <span>{{row.consignee}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="手机号码">
              <template slot-scope="{ row }">
                <span>{{row.mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="收货地址">
              <template slot-scope="{ row }">
                <span>{{row.shippingAddress}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商家名称">
              <template slot-scope="{ row }">
                <span>{{row.merchantName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="经营主体">
              <template slot-scope="{ row }">
                <span>{{registerType[row.registerType]}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品数量">
              <template slot-scope="{ row }">
                <span>{{row.goodsNumber || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="单价" :sortable="true" sort-by="unitPrice">
              <template slot-scope="{ row }">
                <span>￥{{row.unitPrice || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="优惠金额" :sortable="true" sort-by="couponsPrice">
              <template slot-scope="{ row }">
                <span>￥{{row.couponsPrice || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="运费">
              <template slot-scope="{ row }">
                <span>￥{{row.freightMoney || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单金额" :sortable="true" sort-by="payMoney">
              <template slot-scope="{ row }">
                <span>￥{{row.payMoney || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单状态">
              <template slot-scope="{ row }">
                <span>{{orderState[row.state]}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="下单时间" :sortable="true" sort-by="createTime">
              <template slot-scope="{ row }">
                <span>{{row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="支付时间" :sortable="true" sort-by="payTime">
              <template slot-scope="{ row }">
                <span>{{row.payTime}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else-if="editableTabsValue2 == 4">
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
            <el-table-column align="center" label="订单编号">
              <template slot-scope="{ row }">
                <span>{{row.orderNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="换入人">
              <template slot-scope="{ row }">
                <span>{{row.swapinUserName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="换入人手机号码">
              <template slot-scope="{ row }">
                <span>{{row.swapinMobile}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="换入人收货地址">
              <template slot-scope="{ row }">
                <span>{{row.swapinShippingAddress}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="换入商品保证金">
              <template slot-scope="{ row }">
                <span>{{row.swapinCautionMoney}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="换出人">
              <template slot-scope="{ row }">
                <span>{{row.swapoutUserName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="换出人手机号码">
              <template slot-scope="{ row }">
                <span>{{row.swapoutMobile}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="换出人收货地址">
              <template slot-scope="{ row }">
                <span>{{row.swapoutShippingAddress}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="换出商品保证金">
              <template slot-scope="{ row }">
                <span>￥{{row.swapoutCautionMoney}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单状态">
              <template slot-scope="{ row }">
                <span>{{orderState[row.state]}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="下单时间" :sortable="true" sort-by="createTime">
              <template slot-scope="{ row }">
                <span>{{row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="支付时间" :sortable="true" sort-by="payTime">
              <template slot-scope="{ row }">
                <span>{{row.payTime}}</span>
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
            <el-table-column align="center" label="订单编号">
              <template slot-scope="{ row }">
                <span>{{row.orderNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="收货人">
              <template slot-scope="{ row }">
                <span>{{row.consignee}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="手机号码">
              <template slot-scope="{ row }">
                <span>{{row.mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="收货地址">
              <template slot-scope="{ row }">
                <span>{{row.shippingAddress}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商家名称">
              <template slot-scope="{ row }">
                <span>{{row.merchantName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="经营主体">
              <template slot-scope="{ row }">
                <span>{{registerType[row.registerType]}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品数量">
              <template slot-scope="{ row }">
                <span>{{row.goodsNumber || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="单价" :sortable="true" sort-by="unitPrice">
              <template slot-scope="{ row }">
                <span>￥{{row.unitPrice || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="优惠金额" :sortable="true" sort-by="couponsPrice">
              <template slot-scope="{ row }">
                <span>￥{{row.couponsPrice || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="运费">
              <template slot-scope="{ row }">
                <span>￥{{row.freightMoney || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单金额" :sortable="true" sort-by="payMoney">
              <template slot-scope="{ row }">
                <span>￥{{row.payMoney}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单类型">
              <template slot-scope="{ row }">
                <span>{{row.orderType}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单状态">
              <template slot-scope="{ row }">
                <span>{{orderState[row.state]}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="下单时间" :sortable="true" sort-by="createTime">
              <template slot-scope="{ row }">
                <span>{{row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="支付时间" :sortable="true" sort-by="payTime">
              <template slot-scope="{ row }">
                <span>{{row.payTime}}</span>
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
            <el-table-column align="center" label="订单编号">
              <template slot-scope="{ row }">
                <span>{{row.orderNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="收货人">
              <template slot-scope="{ row }">
                <span>{{row.consignee}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="手机号码">
              <template slot-scope="{ row }">
                <span>{{row.mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="收货地址">
              <template slot-scope="{ row }">
                <span>{{row.shippingAddress}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商家名称">
              <template slot-scope="{ row }">
                <span>{{row.merchantName}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="经营主体">
              <template slot-scope="{ row }">
                <span>{{registerType[row.registerType]}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品数量">
              <template slot-scope="{ row }">
                <span>{{row.goodsNumber || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="单价" :sortable="true" sort-by="unitPrice">
              <template slot-scope="{ row }">
                <span>￥{{row.unitPrice || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="优惠金额" :sortable="true" sort-by="couponsPrice">
              <template slot-scope="{ row }">
                <span>￥{{row.couponsPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="运费">
              <template slot-scope="{ row }">
                <span>￥{{row.freightMoney || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单金额" :sortable="true" sort-by="payMoney">
              <template slot-scope="{ row }">
                <span>￥{{row.payMoney || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单类型">
              <template slot-scope="{ row }">
                <span>{{row.orderType}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单状态">
              <template slot-scope="{ row }">
                <span>{{orderState[row.state]}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="下单时间" :sortable="true" sort-by="createTime">
              <template slot-scope="{ row }">
                <span>{{row.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="支付时间" :sortable="true" sort-by="payTime">
              <template slot-scope="{ row }">
                <span>{{row.payTime}}</span>
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
  orderDataList,
  orderDataTotal
} from '@/api/public/statistics'
import waves from '@/directive/waves' // 水波纹指令
import { orderState } from '@/utils/mixins/order'

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
        /*type: 1,
        isExport: 0,*/
        startTime: '',
        endTime: '',
        orderState: '',
        orderNumber: undefined
      },
      orderState,
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
      }, /* {
        title: '互换坊',
        name: '2'
      }, */{
        title: '设计师',
        name: '5'
      }, {
        title: '制造间',
        name: '6'
      }],
      editableTabs2: [{
        title: '珠宝店',
        name: '1'
      }, /* {
        title: '互换坊-销售',
        name: '2'
      }, {
        title: '互换坊-拍卖',
        name: '3'
      },{
        title: '互换坊-互换',
        name: '4'
      },*/ {
        title: '设计师',
        name: '5'
      }, {
        title: '制造间',
        name: '6'
      }],
      registerTypeData: [
        {
          1: '个人'
        },{
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
      rules: {        
        orderNumber: [
          { pattern: /^[0-9]*$/, message: '订单编号需为纯数字', trigger: 'blur' }
        ]
      },
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
      //导出文件
      outFile: '',  // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [{
        orderNumber: '订单编号',
        consignee: '收货人',
        mobilePhone: '手机号码',
        shippingAddress: '收货地址',
        merchantName: '商家名称',
        goodsNumber: '商品数量',
        unitPrice: '单价',
        couponsPrice: '优惠金额',
        freightMoney: '运费',
        payMoney: '订单金额',
        createTime: '下单时间',
        payTime: '支付时间'
      }]
    }
  },
  computed: {
    orderStatus() {
      return Object.keys(this.orderState).map(key => {
        return { value: key, label: +key === 3 ? '设计中' : this.orderState[key] }
      })
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
    /*this.getTotalData(0)*/
    
  },
  mounted () {
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    getFixTotalData(){
      orderDataTotal(0)
        .then(succ => {
          this.fixtotalData = succ.data
          this.getListData(1, 0)
        })
    },
    getTotalData(type, params){
      orderDataTotal(type, params)
        .then(succ => {
          this.totalData = succ.data
        })
    },
    getListData(type, isExport, params){
      this.listLoading = true
      orderDataList(type, isExport, params)
        .then(succ => {
          this.listData = succ.data.records
          this.total = succ.data.total
          this.listLoading = false
        })
    },
    getExportList(){
      orderDataList(this.editableTabsValue2, 1, {
        startTime: this.listParams.startTime,
        endTime: this.listParams.endTime
      }).then(data => {
        this.exportList = data.data.records
        this.downloadFile()
      })
    },
    handleFilter() {
      if(this.startTime != undefined){
        this.isSummary = true
      }else{
        this.isSummary = false
      }
      
      this.listParams.startTime = this.startTime
      this.listParams.endTime = this.endTime
      this.listParams.offset = 1
      this.$refs['paramsForm'].validate((valid) => {
        if (valid) {
          this.getTotalData(0, this.listParams)
          this.getListData(this.editableTabsValue2, 0, this.listParams)
        } else {
          return false
        }
      })
      
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
      this.listParams.offset = 0
      this.getTotalData(this.editableTabsValue, this.listParams)
    },
    handleClick2(tab, event) {
      this.listParams.offset = 0
      this.getListData(this.editableTabsValue2, 0, this.listParams)
    },
    downloadFile () { // 点击导出按钮
      let listData = this.exportList
      let data = this.excelTitle.concat(listData)
      this.downloadExl(data, '统计')
    },
    downloadExl (json, downName, type) {  // 导出到excel
      let keyMap = [] // 获取键
      for (let k in json[0]) {
        keyMap.push(k)
      }
      let tmpdata = [] // 用来保存转换好的json
      json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
      }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
        tmpdata[v.position] = {
          v: v.v
        }
      })
      let outputPos = Object.keys(tmpdata)  // 设置区域,比如表格从A1到D10
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
      let tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
        {bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary'} // 这里的数据是用来定义导出的格式类型
      ))], {
        type: ''
      })  // 创建二进制对象写入转换好的字节流
      var href = URL.createObjectURL(tmpDown)  // 创建对象超链接
      this.outFile.download = downName + '.xlsx'  // 下载名称
      this.outFile.href = href  // 绑定a标签
      this.outFile.click()  // 模拟点击实现下载
      setTimeout(function () {  // 延时释放
        URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
      }, 100)
    },
    s2ab (s) { // 字符串转字符流
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF
      }
      return buf
    },
    getCharCol (n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
      let s = ''
      let m = 0
      while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
      }
      return s
    },
    fixdata (data) {  // 文件流转BinaryString
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