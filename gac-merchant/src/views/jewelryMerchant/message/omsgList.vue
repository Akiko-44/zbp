
<template>
  <div class="page-container">
    <!-- <h4 id="BaseInfo">订单消息：</h4> -->
    <div class="radio-box">
      <el-radio-group v-model="radio">
        <el-radio :label="1">全部消息</el-radio>
        <el-radio :label="2">仅显示未读</el-radio>
        <el-radio :label="3">仅显示已读</el-radio>
      </el-radio-group>
    </div>
    <div class="msg-list mt-3">
      <div class="list-item p-1">
        <div class="d-flex j-sb a-center text-gray pb-1">
          <div class="d-flex a-center j-center">
            <span class="read-tip"></span>
            <span>退款成功</span>
          </div>
          <span>2019-05-25 11:09</span>
        </div>
        <div class="d-flex px-1">
          <img
            src="http://219.134.137.178:85/group1/M00/00/44/wKgI5l6V4dKAa0mhAAEL4drHZFM211.jpg"
            alt="商品图片"
            width="60"
            height="60"
          >
          <div class="goods-info d-flex flex-column j-sb ml-1">
            <div class="text-black line-h-md">
              <p>香港代购周大福黄金牛仔侧身链百搭素链足金扁平16寸18寸基础项链</p>
              <p><span class="mr-2">共1件商品</span><span>合计￥2652.00</span></p>
            </div>
            <span class="link-type">查看详情>></span>
          </div>
        </div>
      </div>
      <div class="list-item p-1">
        <div class="d-flex j-sb a-center text-gray pb-1">
          <div class="d-flex a-center j-center">
            <span class="no-read read-tip"></span>
            <span>退款成功</span>
          </div>
          <span>2019-05-25 11:09</span>
        </div>
        <div class="d-flex px-1">
          <img
            src="http://219.134.137.178:85/group1/M00/00/44/wKgI5l6V4dKAa0mhAAEL4drHZFM211.jpg"
            alt="商品图片"
            width="60"
            height="60"
          >
          <div class="goods-info d-flex flex-column j-sb ml-1">
            <div class="text-black line-h-md">
              <p>香港代购周大福黄金牛仔侧身链百搭素链足金扁平16寸18寸基础项链</p>
              <p><span class="mr-2">共1件商品</span><span>合计￥2652.00</span></p>
            </div>
            <span class="link-type">查看详情>></span>
          </div>
        </div>
      </div>
      <div class="list-item d-flex j-sb a-center py-2 pl-1 pr-3 text-gray border-bottom">
        <div class="d-flex a-center j-center">
          <span class="no-read read-tip"></span>
          <span>你的宝贝被12.12选中了，点开领取专属流量奖励！</span>
        </div>
        <span>2019-05-25 11:09</span>
      </div>
      <div class="list-item d-flex j-sb a-center py-2 pl-1 pr-3 text-gray border-bottom">
        <div class="d-flex a-center j-center">
          <span class="read-tip"></span>
          <span>你的宝贝被12.12选中了，点开领取专属流量奖励！</span>
        </div>
        <span>2019-05-25 11:09</span>
      </div>

    </div>
    <!-- <el-table
      :key='tableKey'
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label="消息内容"
      >
        <template slot-scope="{ row }">
          <span v-if="row.isCommented === 2">{{row.buyUserName}}对{{row.orderNumber}}进行了评价</span>
          <span v-if="row.state === 2">
            {{row.buyUserName}}购买了
            <template v-for="goods in row.orderGoodVOList">
              {{goods.skuName}}，
            </template>
          </span>
          <span v-else-if="row.state === 6">{{row.orderNumber}}已送达{{row.buyUserName}}手中</span>
          <span v-else-if="row.state === 8">{{row.buyUserName}}取消了订单{{row.orderNumber}}</span>
          <span v-else-if="row.state === 13">{{row.buyUserName}}申请退货退款，请及时处理</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
        </template>
      </el-table-column>

    </el-table> -->

    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.offset"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      > </el-pagination>
    </div>

  </div>
</template>

<script>
import {
  orderPage
} from '@/api/jewelryMerchant/message'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'index',
  directives: {
    waves
  },
  data() {
    return {
      list: [],
      total: null,
      listLoading: true,
      listQuery: {
        offset: 1,
        limit: 20
      },
      radio: 1,
      tableKey: 0,
      state: undefined
    }
  },
  watch: {

  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      orderPage(this.listQuery)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.getList()
    }
  }
}
</script>

<style scoped>
.el-collapse-item:last-child {
  margin-bottom: 0;
}
.list-item:hover {
  background: #f2f2f2;
}
.read-tip {
  margin-right: 2px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.read-tip.no-read {
  background: rgba(255, 0, 0, 1);
}
</style>

