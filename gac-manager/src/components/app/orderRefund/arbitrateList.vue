
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-form :inline="true"
               :model="listQuery"
               :rules="rules"
               ref="arbitrateQueryForm"
               label-width="115px"
               class="listQueryForm">
        <el-form-item label="仲裁编号:"
                      prop="id">
          <el-input class="search-input"
                    placeholder="请输入仲裁编号"
                    @keyup.enter.native="handleFilter"
                    v-model="listQuery.id"> </el-input>
        </el-form-item>
        <el-form-item label="订单编号:"
                      prop="orderNo">
          <el-input class="search-input"
                    placeholder="请输入订单编号"
                    @keyup.enter.native="handleFilter"
                    v-model="listQuery.orderNo"> </el-input>
        </el-form-item>
        <el-form-item label="申请人名称:">
          <el-input class="search-input"
                    placeholder="请输入申请人名称"
                    @keyup.enter.native="handleFilter"
                    v-model="listQuery.applicantName"> </el-input>
        </el-form-item>
        <el-form-item label="申请人手机号:"
                      prop="applicantMobile">
          <el-input class="search-input"
                    placeholder="请输入申请人手机号码"
                    @keyup.enter.native="handleFilter"
                    v-model="listQuery.applicantMobile"> </el-input>
        </el-form-item>
        <el-form-item label="被仲裁人名称:">
          <el-input class="search-input"
                    placeholder="请输入被仲裁人名称"
                    @keyup.enter.native="handleFilter"
                    v-model="listQuery.arbitrateName"> </el-input>
        </el-form-item>
        <el-form-item label="被仲裁人手机号:"
                      prop="arbitrateMobile">
          <el-input class="search-input"
                    placeholder="请输入被仲裁人手机号码"
                    @keyup.enter.native="handleFilter"
                    v-model="listQuery.arbitrateMobile"> </el-input>
        </el-form-item>
        <el-form-item label="订单状态:">
          <el-select class="search-input"
                     v-model="listQuery.orderState"
                     placeholder="请选择订单状态"
                     @change="handleFilter">
            <el-option v-for="item in orderStateList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="仲裁状态:">
          <el-select class="search-input"
                     v-model="listQuery.auditState"
                     placeholder="请选择仲裁状态">
            <el-option v-for="item in arbitrateStateList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请人角色:">
          <el-select class="search-input"
                     v-model="listQuery.arbitrationType"
                     placeholder="请选择申请人角色"
                     @change="handleFilter">
            <el-option v-for="item in roleList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间:">
          <el-date-picker style="width: 390px"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          start-placeholder="开始"
                          end-placeholder="结束"
                          v-model="listQuery.createTime">
          </el-date-picker>
        </el-form-item>
        <el-button class="search-button"
                   type="primary"
                   v-waves
                   icon="el-icon-search"
                   @click="handleFilter">查询</el-button>
        <el-button type="text"
                   @click="resetQuery">清空条件</el-button>
      </el-form>
    </div>

    <el-table :key='tableKey'
              :data="list"
              v-loading.body="listLoading"
              border
              fit
              highlight-current-row
              style="width: 100%">

      <!--<el-table-column type="expand">
      <template slot-scope="{ row }">
        <el-table :data="row.revoList" border style="width: 100%">
          <el-table-column width="110px" align="center" label="商品ID">
            <template slot-scope="props">
              <span>{{props.row.goodId}}</span>
            </template>
          </el-table-column>
          <el-table-column width="110px" align="center" label="商品名">
            <template slot-scope="props">
              <span>{{props.row.skuName}}</span>
            </template>
          </el-table-column>
          <el-table-column width="110px" align="center" label="图片">
            <template slot-scope="props">
              <img :src="props.row.skuMainPic | setImg" style="max-width: 100%" />
            </template>
          </el-table-column>
          <el-table-column width="110px" align="center" label="单价">
            <template slot-scope="props">
              <span>{{props.row.unitPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column width="110px" align="center" label="数量">
            <template slot-scope="props">
              <span>x{{props.row.goodsNumber}}</span>
            </template>
          </el-table-column>
        </el-table>
      </template>
     </el-table-column>-->

      <el-table-column width="100px"
                       align="center"
                       label="仲裁编号">
        <template slot-scope="{ row }">
          <span>{{row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="170px"
                       align="center"
                       label="订单编号">
        <template slot-scope="{ row }">
          <span @click="$router.push({ name: detailRouteName, query: { id: row.id } })">{{row.orderNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px"
                       align="center"
                       label="申请人">
        <template slot-scope="{ row }">
          <span>{{row.applicantName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px"
                       align="center"
                       label="申请人角色">
        <template slot-scope="{ row }">
          <span>{{arbitrationRole[row.arbitrationType]}}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px"
                       align="center"
                       label="申请人手机号">
        <template slot-scope="{ row }">
          <span>{{row.applicantMobile}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px"
                       align="center"
                       label="被仲裁人">
        <template slot-scope="{ row }">
          <span>{{row.arbitrateName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px"
                       align="center"
                       label="被仲裁人手机号">
        <template slot-scope="{ row }">
          <span>{{row.arbitrateMobile}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px"
                       align="center"
                       label="退款金额">
        <template slot-scope="{ row }">
          <span>{{row.refundAmount}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px"
                       align="center"
                       label="申请仲裁原因">
        <template slot-scope="{ row }">
          <span>{{row.arbitationReason}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px"
                       align="center"
                       label="申请时间">
        <template slot-scope="{ row }">
          <span>{{row.arbitrationTime}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px"
                       align="center"
                       label="商家是否同意退货">
        <template slot-scope="{ row }">
          <span>{{agreeDeliverState[row.isAgreeDeliver]}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px"
                       align="center"
                       label="订单状态">
        <template slot-scope="{ row }">
          <span>{{refundState[row.refundType]}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px"
                       align="center"
                       label="仲裁状态">
        <template slot-scope="{ row }">
          <span>{{auditState[row.auditState]}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right"
                       align="left"
                       label="操作"
                       width="300">
        <template slot-scope="{ row, $index }">
          <el-button style="margin-bottom: 5px;"
                     type="primary"
                     size="small"
                     @click="$router.push({ name: detailRouteName, query: { id: row.id } })">
            仲裁详情
          </el-button>
          <el-button type="success"
                     size="small"
                     @click="audit(row.id, 1, $index)"
                     v-if="row.refundType === 1 && row.auditState === 7 || row.auditState === 12">
            同意退款
          </el-button>
          <el-button type="danger"
                     size="small"
                     @click="audit(row.id, 2, $index)"
                     v-if="row.refundType === 1 && row.auditState === 7  || row.auditState === 12">
            拒绝退款
          </el-button>

          <el-button type="success"
                     size="small"
                     @click="audit(row.id, 1, $index)"
                     v-if="row.refundType === 2 && row.auditState === 7">
            同意退货
          </el-button>
          <el-button type="danger"
                     size="small"
                     @click="audit(row.id, 2, $index)"
                     v-if="row.refundType === 2 && row.auditState === 7">
            拒绝退货
          </el-button>
          <!-- <el-button type="success"
                     size="small"
                     @click="refunAmountC(row.id)"
                     v-if="row.refundType === 2 && row.auditState === 2">
            确认收货
          </el-button>
          <el-button type="danger"
                     size="small"
                     @click="audit(row.id, 2, $index)"
                     v-if="row.refundType === 2 && row.auditState === 2">
            拒绝收货
          </el-button> -->
          <!--<el-button
        	type="warning"
          size="small"
          @click="audit(row.id, 3, $index)"
          v-if="row.auditState === 7"
        >
          退回
        </el-button>-->
          <el-button v-if="row.refundType === 2 && row.auditState === 2"
                     type="primary"
                     size="small"
                     @click="expressLook(row.id)">
            查看物流
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <!--<audit-dialog ref="auditDialog" @success="auditSuccess" />-->
    <arbitrate-dialog ref="arbitrateDialog"
                      @success="getList" />

    <div v-show="!listLoading"
         class="pagination-container">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="listParams.offset"
                     :page-sizes="[10,20,30,50]"
                     :page-size="listParams.limit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"> </el-pagination>
    </div>

    <el-dialog title="物流详情"
               :visible.sync="dialogExpressVisible">
      <p>物流公司：{{orderExpressData.com}}</p>
      <p>物流单号：{{orderExpressData.nu}}</p>
      <el-table :data="orderExpressData.data"
                border>
        <el-table-column align="center"
                         label="时间"
                         width="200px">
          <template slot-scope="{ row }">
            <span>{{row.time}}</span>
          </template>
        </el-table-column>
        <el-table-column label="物流信息">
          <template slot-scope="{ row }">
            <span>{{row.context}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import { orderState, payType } from '@/utils/mixins/order'
import { page } from '@/api/designMerchant/refundAddr'
import { refunAmount, lookRefundExpress } from '@/api/common/order'
import arbitrateDialog from './arbitrateDialog'

const getInitQuery = () => {
  return {
    id: undefined,
    orderNo: undefined,
    applicantName: undefined,
    applicantMobile: undefined,
    arbitrateName: undefined,
    arbitrateMobile: undefined,
    auditState: undefined,
    orderState: undefined,
    orderType: undefined,
    arbitrationType: undefined,
    startTime: '',
    endTime: ''
  }
}

export default {
  props: {
    getPage: Function,
    detailRouteName: String,
    orderType: Number
  },
  directives: {
    waves
  },
  components: {
    arbitrateDialog
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      createTime: [],
      listParams: {
        offset: 1,
        limit: 20
      },
      listQuery: getInitQuery(),
      tableKey: 0,
      orderState,
      payType,
      auditState: {
        0: '审核中',
        1: '买家待发货',
        2: '买家已发货',
        3: '退款/货成功',
        4: '退款/货失败',
        5: '用户取消订单',
        6: '审核拒绝',
        7: '待仲裁',
        8: '仲裁通过',
        9: '仲裁拒绝',
        10: '仲裁退回',
        11: '商家拒绝收货',
        12: '退款成功',
        13: '退款失败',
        14: '退货成功',
        15: '退货失败',
        16: '退款待审核',
        17: '退货待审核'
      },
      arbitrationRole: {
        1: '用户',
        2: '商家'
      },
      refundState: {
        1: '待收货',
        2: '已收货'
      },
      agreeDeliverState: {
        0: '否',
        1: '是'
      },
      orderStateList: [{
        value: undefined,
        label: '全部'
      }, {
        value: 5,
        label: '待收货'
      }, {
        value: 6,
        label: '已收货'
      }, {
        value: 7,
        label: '已完成'
      }],
      arbitrateStateList: [{
        value: undefined,
        label: '全部'
      }, {
        value: 7,
        label: '仲裁中'
      }, {
        value: 8,
        label: '仲裁通过'
      }, {
        value: 9,
        label: '仲裁拒绝'
      }, {
        value: 10,
        label: '仲裁退回'
      }],
      roleList: [{
        value: undefined,
        label: '全部'
      }, {
        value: 1,
        label: '用户'
      }, {
        value: 2,
        label: '商家'
      }],
      dialogExpressVisible: false,
      orderExpressData: {},
      //    isAddr: false
      rules: {
        id: [
          { pattern: /^[0-9]*$/, message: '仲裁编号需为纯数字', trigger: 'blur' }
        ],
        orderNo: [
          { pattern: /^[0-9]*$/, message: '订单编号需为纯数字', trigger: 'blur' }
        ],
        applicantMobile: [
          { pattern: /^[0-9]*$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        arbitrateMobile: [
          { pattern: /^[0-9]*$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    orderStatus() {
      return Object.keys(this.orderState).map(key => {
        return { value: key, label: this.orderState[key] }
      })
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  created() {
    this.listQuery.orderType = this.orderType
    //  this.getList()
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listParams.offset = +this.$route.query.page || 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      this.listQuery.startTime = this.createTime ? this.createTime[0] : ''
      this.listQuery.endTime = this.createTime ? this.createTime[1] : ''
      this.getPage(this.listQuery, this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
          this.list.forEach((item) => {
            if (item.refundType == 1) {
              if (item.auditState == 0) {
                item.auditState = 16
              } else if (item.auditState == 6) {
                item.auditState = 13
              } else if (item.auditState == 8) {
                item.auditState = 12
              } else if (item.auditState == 9) {
                item.auditState = 13
              }
            } else {
              if (item.auditState == 0) {
                item.auditState = 17
              } else if (item.auditState == 6) {
                item.auditState = 15
              } else if (item.auditState == 8) {
                item.auditState = 14
              } else if (item.auditState == 9) {
                item.auditState = 15
              }
            }
          })
        })
    },
    handleFilter() {
      this.$refs['arbitrateQueryForm'].validate((valid) => {
        if (valid) {
          this.getList()
        } else {
          return false
        }
      })
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      //    this.listParams.offset = val
      //    this.getList()
      var routerName = this.orderType === 6 ? 'makerArbitrate' : 'arbitrate'
      this.$router.replace({ name: routerName, query: { page: val }})
    },
    resetQuery() {
      this.listQuery = getInitQuery()
      this.createTime = []
      this.listQuery.orderType = this.orderType
      this.$refs['arbitrateQueryForm'].resetFields()
      var routerName = this.orderType === 6 ? 'makerArbitrate' : 'arbitrate'
      this.$router.replace({ name: routerName })
      this.getList()
    },
    audit(id, state, index) {
      const dialog = this.$refs.arbitrateDialog
      dialog.title = state === 1 ? '仲裁通过' : '仲裁拒绝'
      dialog.dialogFormVisible = true
      dialog.form.refundId = id
      dialog.form.auditState = state
      dialog.resetForm('form')
      this.index = index
    },
    auditSuccess(form) {
      this.list[this.index].auditState = form.auditState
    },
    handleCommand({ row, state, $index }) {
      this.audit(row, state, $index)
    },
    refunAmountC(id) {
      refunAmount(id).then(data => {
        this.$notify({
          title: '成功',
          message: '确认成功',
          type: 'success'
        })
        this.getList()
      })
    },
    expressLook(orderId) {
      lookRefundExpress(orderId).then(data => {
        const res = JSON.parse(data.data)
        console.log(res)
        if (res.message == 'ok') {
          this.orderExpressData = res
          this.dialogExpressVisible = true
        } else {
          this.$notify.error({
            title: '错误',
            message: res.message
          })
        }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.search-input {
  width: 210px;
  /*margin-bottom: 10px;*/
}
</style>
