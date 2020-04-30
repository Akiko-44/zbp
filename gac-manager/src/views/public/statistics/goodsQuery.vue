<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        :rules="rules"
        ref="paramsForm"
        label-width="115px"
        class="listParamsForm"
      >
        <el-form-item prop="goodsId">
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 120px;"
            v-model="listParams.goodsId"
            placeholder="请输入商品ID"
          > </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            v-model="listParams.goodsName"
            placeholder="请输入商品名称"
          > </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            v-model="listParams.merchantName"
            placeholder="请输入商家名称"
          > </el-input>
        </el-form-item>
        <el-form-item label="所在城市:">
          <v-city
            @change="cityChange"
            ref="city"
          />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="listParams.goodsState"
            clearable
            placeholder="请选择商品状态"
          >
            <el-option
              v-for="(value, key) in goodsStateMap"
              :key="key"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
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
        </el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          v-waves
          @click="handleFilter"
        >查询</el-button>
      </el-form>
    </div>
    <div
      class="statistics-container"
      v-if="fixtotalData"
    >
      <div>汇总统计
        <el-tooltip
          placement="right"
          effect="light"
        >
          <i class="el-icon-info"></i>
          <div slot="content">
            <p><strong>累计销售商品数：</strong>所有销售商品数总和；</p>
            <p><strong>累计定制商品数：</strong>所有定制成功商品数总和；</p>
            <p><strong>库存总数：</strong>所有商品的库存总数；</p>
            <p><strong>待审核商品数：</strong>所有待审核商品数总和；</p>
            <p><strong>待上架商品数：</strong>所有待上架商品数总和；</p>
            <p><strong>已售罄商品数：</strong>所有已售罄商品数总和；</p>
            <p><strong>商品收藏数：</strong>所有商品被收藏次数总和；</p>
          </div>
        </el-tooltip>
      </div>
      <ul>
        <li>累计销售商品数:<span>{{fixtotalData.cumuSaleGoodsNum || 0}}</span></li>
        <li>累计定制商品数:<span>{{fixtotalData.cumuCustomGoodsNum || 0}}</span></li>
        <li>库存总数:<span>{{fixtotalData.cumuGoodsStockNum || 0}}</span></li>
        <li>待审核商品数:<span>{{fixtotalData.cumuWaitAuditGoodsNum || 0}}</span></li>
        <li>待上架商品数:<span>{{fixtotalData.cumuWaitSaleGoodsNum || 0}}</span></li>
        <li>已售罄商品数:<span>{{fixtotalData.cumuSaleOutGoodsNum || 0}}</span></li>
      </ul>
      <ul>
        <li>商品收藏数:<span>{{fixtotalData.cumuGoodsCollectNum || 0}}</span></li>
      </ul>
    </div>
    <div
      class="statistics-container"
      v-if="isSummary && totalData"
    >
      <div>查询汇总：{{listParams.startTime}}至{{listParams.endTime}}</div>
      <el-tabs
        v-model="editableTabsValue"
        @tab-click="handleClick"
      >
        <el-tab-pane
          :key="item.name"
          v-for="(item) in editableTabs"
          :label="item.title"
          :name="item.name"
        >
          <template v-if="editableTabsValue == 0">
            <ul>
              <li>销售商品数:<span>{{totalData.cumuSaleGoodsNum || 0}}</span></li>
              <li>定制商品数:<span>{{totalData.cumuCustomGoodsNum || 0}}</span></li>
              <li>库存总数:<span>{{totalData.cumuGoodsStockNum || 0}}</span></li>
              <li>待审核商品数:<span>{{totalData.cumuWaitAuditGoodsNum || 0}}</span></li>
              <li>待上架商品数:<span>{{totalData.cumuWaitSaleGoodsNum || 0}}</span></li>
              <li>已售罄商品数:<span>{{totalData.cumuSaleOutGoodsNum || 0}}</span></li>
            </ul>
            <ul>
              <li>商品收藏数:<span>{{totalData.cumuGoodsCollectNum || 0}}</span></li>
            </ul>
          </template>
          <template v-else-if="editableTabsValue == 1">
            <ul>
              <li>销售商品数:<span>{{totalData.cumuSaleGoodsNum || 0}}</span></li>
              <li>库存总数:<span>{{totalData.cumuGoodsStockNum || 0}}</span></li>
              <li>待审核商品数:<span>{{totalData.cumuWaitAuditGoodsNum || 0}}</span></li>
              <li>待上架商品数:<span>{{totalData.cumuWaitSaleGoodsNum || 0}}</span></li>
              <li>已售罄商品数:<span>{{totalData.cumuSaleOutGoodsNum || 0}}</span></li>
              <li>商品收藏数:<span>{{totalData.cumuGoodsCollectNum || 0}}</span></li>
            </ul>
          </template>
          <template v-else-if="editableTabsValue == 2">
            <ul>
              <li>销售商品数:<span>{{totalData.cumuSaleGoodsNum || 0}}</span></li>
              <li>库存总数:<span>{{totalData.cumuGoodsStockNum || 0}}</span></li>
              <li>待审核商品数:<span>{{totalData.cumuWaitAuditGoodsNum || 0}}</span></li>
              <li>待上架商品数:<span>{{totalData.cumuWaitSaleGoodsNum || 0}}</span></li>
              <li>已售罄商品数:<span>{{totalData.cumuSaleOutGoodsNum || 0}}</span></li>
              <li>商品收藏数:<span>{{totalData.cumuGoodsCollectNum || 0}}</span></li>
            </ul>
          </template>
          <template v-else-if="editableTabsValue == 5 || editableTabsValue == 6">
            <ul>
              <li>销售商品数:<span>{{totalData.cumuSaleGoodsNum || 0}}</span></li>
              <li>定制商品数:<span>{{totalData.cumuCustomGoodsNum || 0}}</span></li>
              <li>库存总数:<span>{{totalData.cumuGoodsStockNum || 0}}</span></li>
              <li>待审核商品数:<span>{{totalData.cumuWaitAuditGoodsNum || 0}}</span></li>
              <li>待上架商品数:<span>{{totalData.cumuWaitSaleGoodsNum || 0}}</span></li>
              <li>已售罄商品数:<span>{{totalData.cumuSaleOutGoodsNum || 0}}</span></li>
            </ul>
            <ul>
              <li>商品收藏数:<span>{{totalData.cumuGoodsCollectNum || 0}}</span></li>
            </ul>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-tabs
      v-model="editableTabsValue2"
      @tab-click="handleClick2"
    >
      <el-tab-pane
        :key="item2.name"
        v-for="(item2, index2) in editableTabs2"
        :label="item2.title"
        :name="item2.name"
      >
        <template v-if="editableTabsValue2 == 1">
          <div class="filter-list">
            <el-button
              class="button fr"
              type="primary"
              @click="getExportList"
            >导出</el-button>
            <a id="downlink"></a>
            <!--错误信息提示-->
            <el-dialog
              title="提示"
              v-model="errorDialog"
              size="tiny"
            >
              <span>{{errorMsg}}</span>
              <span
                slot="footer"
                class="dialog-footer"
              >
                <el-button
                  type="primary"
                  @click="errorDialog=false"
                >确认</el-button>
              </span>
            </el-dialog>
          </div>
          <el-table
            :key='tableKey'
            :data="listData"
            v-loading.body="listLoading"
            border
            fit
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column
              align="center"
              label="商品ID"
            >
              <template slot-scope="{ row }">
                <span>{{row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商品名称"
            >
              <template slot-scope="{ row }">
                <span>{{row.goodsName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商品分类"
            >
              <template slot-scope="{ row }">
                <span>{{row.catName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="品牌"
            >
              <template slot-scope="{ row }">
                <span>{{row.brandName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商家名称"
            >
              <template slot-scope="{ row }">
                <span>{{row.merchantName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="所在城市"
            >
              <template slot-scope="{ row }">
                <span>{{row.cityName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="销售数量"
            >
              <template slot-scope="{ row }">
                <span>{{row.saleNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="销售金额"
              :sortable="true"
              sort-by="saleAmount"
            >
              <template slot-scope="{ row }">
                <span>￥{{row.saleAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="库存总数"
            >
              <template slot-scope="{ row }">
                <span>{{row.stockNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="收藏数"
              :sortable="true"
              sort-by="collectNum"
            >
              <template slot-scope="{ row }">
                <span>{{row.collectNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="评论数"
              :sortable="true"
              sort-by="commentNum"
            >
              <template slot-scope="{ row }">
                <span>{{row.commentNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="状态"
            >
              <template slot-scope="{ row }">
                <span>{{goodsStateMap[row.goodsState]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="添加/编辑时间"
              :sortable="true"
              sort-by="time"
            >
              <template slot-scope="{ row }">
                <span>{{row.time}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else-if="editableTabsValue2 == 2">
          <div class="filter-list">
            <el-button
              class="button fr"
              type="primary"
              @click="getExportList"
            >导出</el-button>
            <a id="downlink"></a>
            <!--错误信息提示-->
            <el-dialog
              title="提示"
              v-model="errorDialog"
              size="tiny"
            >
              <span>{{errorMsg}}</span>
              <span
                slot="footer"
                class="dialog-footer"
              >
                <el-button
                  type="primary"
                  @click="errorDialog=false"
                >确认</el-button>
              </span>
            </el-dialog>
          </div>
          <el-table
            :key='tableKey'
            :data="listData"
            v-loading.body="listLoading"
            border
            fit
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column
              align="center"
              label="商品ID"
            >
              <template slot-scope="{ row }">
                <span>{{row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商品名称"
            >
              <template slot-scope="{ row }">
                <span>{{row.goodsName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商品分类"
            >
              <template slot-scope="{ row }">
                <span>{{row.catName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="品牌"
            >
              <template slot-scope="{ row }">
                <span>{{row.brandName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商家名称"
            >
              <template slot-scope="{ row }">
                <span>{{row.merchantName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="所在城市"
            >
              <template slot-scope="{ row }">
                <span>{{row.cityName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="销售数量"
            >
              <template slot-scope="{ row }">
                <span>{{row.saleNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="销售金额"
              :sortable="true"
              sort-by="saleAmount"
            >
              <template slot-scope="{ row }">
                <span>￥{{row.saleAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="库存总数"
            >
              <template slot-scope="{ row }">
                <span>{{row.stockNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="收藏数"
              :sortable="true"
              sort-by="collectNum"
            >
              <template slot-scope="{ row }">
                <span>{{row.collectNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="评论数"
              :sortable="true"
              sort-by="commentNum"
            >
              <template slot-scope="{ row }">
                <span>{{row.commentNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="状态"
            >
              <template slot-scope="{ row }">
                <span>{{goodsStateMap2[row.goodsState]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="添加/编辑时间"
              :sortable="true"
              sort-by="time"
            >
              <template slot-scope="{ row }">
                <span>{{row.time}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else-if="editableTabsValue2 == 3">
          <div class="filter-list">
            <el-button
              class="button fr"
              type="primary"
              @click="getExportList"
            >导出</el-button>
            <a id="downlink"></a>
            <!--错误信息提示-->
            <el-dialog
              title="提示"
              v-model="errorDialog"
              size="tiny"
            >
              <span>{{errorMsg}}</span>
              <span
                slot="footer"
                class="dialog-footer"
              >
                <el-button
                  type="primary"
                  @click="errorDialog=false"
                >确认</el-button>
              </span>
            </el-dialog>
          </div>
          <el-table
            :key='tableKey'
            :data="listData"
            v-loading.body="listLoading"
            border
            fit
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column
              align="center"
              label="商品ID"
            >
              <template slot-scope="{ row }">
                <span>{{row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商品名称"
            >
              <template slot-scope="{ row }">
                <span>{{row.goodsName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商品分类"
            >
              <template slot-scope="{ row }">
                <span>{{row.catName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="品牌"
            >
              <template slot-scope="{ row }">
                <span>{{row.brandName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商家名称"
            >
              <template slot-scope="{ row }">
                <span>{{row.merchantName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="所在城市"
            >
              <template slot-scope="{ row }">
                <span>{{row.cityName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="竞拍人数"
            >
              <template slot-scope="{ row }">
                <span>{{row.joinCount || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="保证金"
              :sortable="true"
              sort-by=""
            >
              <template slot-scope="{ row }">
                <span>￥{{row.deposit || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="起拍价"
              :sortable="true"
              sort-by=""
            >
              <template slot-scope="{ row }">
                <span>￥{{row.upsetPrice || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="保留价"
              :sortable="true"
              sort-by=""
            >
              <template slot-scope="{ row }">
                <span>￥{{row.reservePrice || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="成交价"
              :sortable="true"
              sort-by=""
            >
              <template slot-scope="{ row }">
                <span>￥{{row.dealPrice || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="状态"
            >
              <template slot-scope="{ row }">
                <span>{{goodsStateMap2[row.goodsState]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="添加/编辑时间"
              :sortable="true"
              sort-by="time"
            >
              <template slot-scope="{ row }">
                <span>{{row.time}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else-if="editableTabsValue2 == 4">
          <div class="filter-list">
            <el-button
              class="button fr"
              type="primary"
              @click="getExportList"
            >导出</el-button>
            <a id="downlink"></a>
            <!--错误信息提示-->
            <el-dialog
              title="提示"
              v-model="errorDialog"
              size="tiny"
            >
              <span>{{errorMsg}}</span>
              <span
                slot="footer"
                class="dialog-footer"
              >
                <el-button
                  type="primary"
                  @click="errorDialog=false"
                >确认</el-button>
              </span>
            </el-dialog>
          </div>
          <el-table
            :key='tableKey'
            :data="listData"
            v-loading.body="listLoading"
            border
            fit
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column
              align="center"
              label="商品ID"
            >
              <template slot-scope="{ row }">
                <span>{{row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商品名称"
            >
              <template slot-scope="{ row }">
                <span>{{row.goodsName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商品分类"
            >
              <template slot-scope="{ row }">
                <span>{{row.catName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="品牌"
            >
              <template slot-scope="{ row }">
                <span>{{row.brandName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商家名称"
            >
              <template slot-scope="{ row }">
                <span>{{row.merchantName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="所在城市"
            >
              <template slot-scope="{ row }">
                <span>{{row.cityName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="保证金"
              :sortable="true"
              sort-by=""
            >
              <template slot-scope="{ row }">
                <span>￥{{row.deposit || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="状态"
            >
              <template slot-scope="{ row }">
                <span>{{goodsStateMap2[row.goodsState]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="添加/编辑时间"
              :sortable="true"
              sort-by="time"
            >
              <template slot-scope="{ row }">
                <span>{{row.time}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else-if="editableTabsValue2 == 5">
          <div class="filter-list">
            <el-button
              class="button fr"
              type="primary"
              @click="getExportList"
            >导出</el-button>
            <a id="downlink"></a>
            <!--错误信息提示-->
            <el-dialog
              title="提示"
              v-model="errorDialog"
              size="tiny"
            >
              <span>{{errorMsg}}</span>
              <span
                slot="footer"
                class="dialog-footer"
              >
                <el-button
                  type="primary"
                  @click="errorDialog=false"
                >确认</el-button>
              </span>
            </el-dialog>
          </div>
          <el-table
            :key='tableKey'
            :data="listData"
            v-loading.body="listLoading"
            border
            fit
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column
              align="center"
              label="商品ID"
            >
              <template slot-scope="{ row }">
                <span>{{row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商品名称"
            >
              <template slot-scope="{ row }">
                <span>{{row.goodsName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商品分类"
            >
              <template slot-scope="{ row }">
                <span>{{row.catName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商品类型"
            >
              <template slot-scope="{ row }">
                <span>{{goodsTypeMap[row.goodsType]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商家名称"
            >
              <template slot-scope="{ row }">
                <span>{{row.merchantName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="经营主体"
            >
              <template slot-scope="{ row }">
                <span>{{registerType[row.registerType]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="所在城市"
            >
              <template slot-scope="{ row }">
                <span>{{row.cityName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="销售数量"
            >
              <template slot-scope="{ row }">
                <span>{{row.saleNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="销售金额"
              :sortable="true"
              sort-by="saleAmount"
            >
              <template slot-scope="{ row }">
                <span>￥{{row.saleAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="库存总数"
            >
              <template slot-scope="{ row }">
                <span>{{row.stockNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="收藏数"
              :sortable="true"
              sort-by="collectNum"
            >
              <template slot-scope="{ row }">
                <span>{{row.collectNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="评论数"
              :sortable="true"
              sort-by="commentNum"
            >
              <template slot-scope="{ row }">
                <span>{{row.commentNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="状态"
            >
              <template slot-scope="{ row }">
                <span>{{goodsStateMap3[row.goodsState]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="添加/编辑时间"
              :sortable="true"
              sort-by="time"
            >
              <template slot-scope="{ row }">
                <span>{{row.time}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else-if="editableTabsValue2 == 6">
          <div class="filter-list">
            <el-button
              class="button fr"
              type="primary"
              @click="getExportList"
            >导出</el-button>
            <a id="downlink"></a>
            <!--错误信息提示-->
            <el-dialog
              title="提示"
              v-model="errorDialog"
              size="tiny"
            >
              <span>{{errorMsg}}</span>
              <span
                slot="footer"
                class="dialog-footer"
              >
                <el-button
                  type="primary"
                  @click="errorDialog=false"
                >确认</el-button>
              </span>
            </el-dialog>
          </div>
          <el-table
            :key='tableKey'
            :data="listData"
            v-loading.body="listLoading"
            border
            fit
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column
              align="center"
              label="商品ID"
            >
              <template slot-scope="{ row }">
                <span>{{row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商品名称"
            >
              <template slot-scope="{ row }">
                <span>{{row.goodsName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商品分类"
            >
              <template slot-scope="{ row }">
                <span>{{row.catName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商品类型"
            >
              <template slot-scope="{ row }">
                <span>{{goodsTypeMap[row.goodsType]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="商家名称"
            >
              <template slot-scope="{ row }">
                <span>{{row.merchantName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="所在城市"
            >
              <template slot-scope="{ row }">
                <span>{{row.cityName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="销售数量"
            >
              <template slot-scope="{ row }">
                <span>{{row.saleNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="销售金额"
              :sortable="true"
              sort-by="saleAmount"
            >
              <template slot-scope="{ row }">
                <span>￥{{row.saleAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="库存总数"
            >
              <template slot-scope="{ row }">
                <span>{{row.stockNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="收藏数"
              :sortable="true"
              sort-by="collectNum"
            >
              <template slot-scope="{ row }">
                <span>{{row.collectNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="评论数"
              :sortable="true"
              sort-by="commentNum"
            >
              <template slot-scope="{ row }">
                <span>{{row.commentNum || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="状态"
            >
              <template slot-scope="{ row }">
                <span>{{goodsStateMap3[row.goodsState]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="添加/编辑时间"
              :sortable="true"
              sort-by="time"
            >
              <template slot-scope="{ row }">
                <span>{{row.time}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
    </el-tabs>

    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listParams.offset"
        :page-sizes="[10,20,30,50]"
        :page-size="listParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      > </el-pagination>
    </div>
  </div>
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import {
  goodsDataList,
  goodsDataTotal
} from '@/api/public/statistics'
import waves from '@/directive/waves' // 水波纹指令
import VCity from '@/components/app/city/getPCR'

export default {
  directives: {
    waves
  },
  components: {
    VCity
  },
  data() {
    return {
      type: 0,
      listParams: {
        offset: 1,
        limit: 20,
        isExport: 0,
        goodsId: undefined,
        goodsName: '',
        categoryId: undefined,
        brandId: undefined,
        userId: undefined,
        merchantName: '',
        cityId: undefined,
        goodsState: undefined,
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
        }, {
          2: '公司'
        }
      ],
      registerType: {
        1: '个人',
        2: '公司'
      },
      goodsTypeMap: {
        1: '现货',
        2: '定制'
      },
      goodsStateMap: {
        3: '上架',
        4: '下架',
        5: '已售罄'
      },
      goodsStateMap1: {
        0: '上架',
        1: '下架'
      },
      goodsStateMap2: {
        0: '下架',
        1: '待上架',
        2: '在售',
        3: '不通过',
        4: '已删除',
        10: '拍卖中',
        11: '竞拍成功',
        12: '竞拍失败'
      },
      goodsStateMap3: {
        0: '待审核',
        1: '审核通过',
        2: '未通过',
        3: '上架',
        4: '下架'
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
      rules: {
        goodsId: [
          { pattern: /^[0-9]*$/, message: '请输入正确的商品ID', trigger: 'blur' }
        ]
      },
      // 导出文件
      outFile: '', // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [{
        id: '商品ID',
        goodsName: '商品名称',
        catName: '商品分类',
        brandName: '品牌',
        merchantName: '商家名称',
        cityName: '所在城市',
        saleNum: '销售数量',
        saleAmount: '销售金额',
        stockNum: '库存总数',
        collectNum: '收藏数',
        commentNum: '评论数',
        time: '添加/编辑时间'
      }]
    }
  },
  watch: {
    dateValue(value) {
      this.startTime = value ? value[0] : undefined
      this.endTime = value ? value[1] : undefined
    },
    editableTabsValue2(value) {
      if (value == 1) {
        this.excelTitle = [{
          id: '商品ID',
          goodsName: '商品名称',
          catName: '商品分类',
          brandName: '品牌',
          merchantName: '商家名称',
          cityName: '所在城市',
          saleNum: '销售数量',
          saleAmount: '销售金额',
          stockNum: '库存总数',
          collectNum: '收藏数',
          commentNum: '评论数',
          time: '添加/编辑时间'
        }]
      } else if (value == 5) {
        this.excelTitle = [{
          id: '商品ID',
          goodsName: '商品名称',
          catName: '商品分类',
          merchantName: '商家名称',
          cityName: '所在城市',
          saleNum: '销售数量',
          saleAmount: '销售金额',
          stockNum: '库存总数',
          collectNum: '收藏数',
          commentNum: '评论数',
          time: '添加/编辑时间'
        }]
      } else if (value == 6) {
        this.excelTitle = [{
          id: '商品ID',
          goodsName: '商品名称',
          catName: '商品分类',
          merchantName: '商家名称',
          cityName: '所在城市',
          saleNum: '销售数量',
          saleAmount: '销售金额',
          stockNum: '库存总数',
          collectNum: '收藏数',
          commentNum: '评论数',
          time: '添加/编辑时间'
        }]
      }
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
      goodsDataTotal(0)
        .then(succ => {
          this.fixtotalData = succ.data
        })
    },
    getTotalData(type, params) {
      goodsDataTotal(type, params)
        .then(succ => {
          this.totalData = succ.data
        })
    },
    getListData(type, isExport, params) {
      this.listLoading = true
      goodsDataList(type, isExport, params)
        .then(succ => {
          this.listData = succ.data.records
          this.total = succ.data.total
          this.listLoading = false
        })
    },
    getExportList() {
      goodsDataList(this.editableTabsValue2, 1, {
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
    cityChange(cities) {
      this.listParams.cityId = cities[cities.length - 1]
    },
    downloadFile() { // 点击导出按钮
      const listData = this.exportList
      const downloadData = this.excelTitle.concat(listData)
      this.downloadExl(downloadData, '统计')
    },
    downloadExl(json, downName, type) { // 导出到excel
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
      const outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
      const tmpWB = {
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
.statistics-container {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #a1a1a1;
  color: #666666;
  border-radius: 10px;
}
.statistics-container ul,
.statistics-container li {
  list-style: none;
  font-size: 14px;
  padding: 0;
}
.statistics-container li {
  display: inline-block;
  width: 16%;
  vertical-align: text-top;
}
.statistics-container li span {
  color: #ff0000;
}
</style>
