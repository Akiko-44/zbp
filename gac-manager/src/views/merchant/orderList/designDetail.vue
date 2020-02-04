<template>
    <div class="detail">
    	<div class="title">
    		<a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回  </i></a>
    		<span>|</span>
    		<span>订单详情</span>
    	</div>
        <div class="actions">
            <OrderOperation
                :detail="detail"
            />
        </div>
        <br />
        <el-tabs type="border-card">
            <el-tab-pane label="订单信息">
                <h4>基本信息</h4>
                <el-form label-position="left" inline class="table-expand">
                    <el-form-item label="订单编号">
                        <span>{{ detail.orderNumber }}</span>
                    </el-form-item>
                    <el-form-item label="订单创建时间">
                        <span>{{ detail.createTime }}</span>
                    </el-form-item>
                    <el-form-item label="订单状态">
                        <span>{{ orderState[detail.state] }}</span>
                    </el-form-item>
                    <el-form-item label="应付金额">
                        <span>￥{{ detail.payMoney }}</span>
                        <template v-if="detail.state == 1 || detail.state == 100">
                          <el-button v-if="detail.caseType == 2" type="text" @click="modify(detail)">修改订单价格</el-button>
                        </template>
                    </el-form-item>
                    <el-form-item label="运费金额">
                        <span>￥{{ detail.freightMoney }}</span>
                    </el-form-item>
                    <el-form-item label="优惠金额">
                        <span v-if="detail.userCouponsVO">￥{{ detail.userCouponsVO.couponsPrice }}</span>
                        <span v-else>￥0</span>
                    </el-form-item>
                    <el-form-item label="卖家">
                        <span>{{ detail.sellUserName }}</span>
                    </el-form-item>
                    <el-form-item label="买家">
                        <span>{{ detail.buyUserName }}</span>
                    </el-form-item>
                    <el-form-item label="订单类型">
                      <span v-if="detail.caseType == 1">商品销售</span>
                      <span v-else>商品定制</span>
                    </el-form-item>
                </el-form>

                <h4>收货人信息</h4>
                <el-form v-if="detail.userInfoVO" label-position="left" inline class="table-expand">
                    <el-form-item label="收货人">
                        <span>{{ detail.userInfoVO.username }}</span>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <span>{{ detail.userInfoVO.mobile }}</span>
                    </el-form-item>
                    <el-form-item label="收货地址">
                        <span>{{ detail.userInfoVO.shippingAddr }}</span>
                    </el-form-item>
                </el-form>
                <h4>商品信息</h4>
                <el-table :data="detail.orderGoodVOList" style="width: 100%">
                    <el-table-column width="180px" align="center" label="图片">
                        <template slot-scope="{ row }">
                            <img :src="row.skuMainPic | setImg" style="height: 100px;" />
                        </template>
                    </el-table-column>

                    <el-table-column width="200px" align="center" label="商品名称">
                        <template slot-scope="{ row }">
                            <span>{{row.skuName}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column width="110px" align="center" label="商品ID">
                        <template slot-scope="{ row }">
                            <span>{{row.skuId}}</span>
                        </template>
                    </el-table-column>
                    
                    <el-table-column width="110px" align="center" label="商品规格">
                        <template slot-scope="{ row }">
                            <p v-for="(item, i) in row.skuExplain" :key="i">{{item.specsName}}：{{item.attrValue}}</p>
                        </template>
                    </el-table-column>

                    <el-table-column width="110px" align="center" label="价格">
                        <template slot-scope="{ row }">
                            <span>{{row.unitPrice}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column width="110px" align="center" label="数量">
                        <template slot-scope="{ row }">
                            <span>{{row.goodsNumber}}</span>
                        </template>
                    </el-table-column>
                    
                </el-table>
                
                <h4>买家留言</h4>
                <el-form>
                    <el-form-item label="">
                        <span v-if="detail.message">{{ detail.message }}</span>
                        <span v-else>暂无</span>
                    </el-form-item>
                </el-form>
                
                <h4>发票信息</h4>
                <el-form label-position="left" inline class="table-expand" v-if="detail.orderInvoiceVO && detail.orderInvoiceVO.invoiceType != 0">
                    <el-form-item label="发票类型">
                        <span v-if="detail.orderInvoiceVO.invoiceType == 1">企业</span>
                        <span v-else>个人</span>
                    </el-form-item>
                    <el-form-item label="发票抬头">
                        <span>{{detail.orderInvoiceVO.invoiceTitle}}</span>
                    </el-form-item>
                    <el-form-item label="税号">
                        <span>{{detail.orderInvoiceVO.code}}</span>
                    </el-form-item>
                </el-form>
                
                <el-button v-if="detail.caseType == 2" type="text" @click="dialogTableVisible = true">查看电子合同</el-button>
                <el-dialog title="电子合同" :visible.sync="dialogTableVisible">
                    <p>用户{{ detail.buyUserName }}在{{ detail.sellUserName }}购买了如下商品：</p>
                    <el-table :data="detail.orderGoodVOList" border>
                        <el-table-column align="center" label="商品名称">
                            <template slot-scope="{ row }">
                                <span>{{row.skuName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="200px" align="center" label="原价">
                            <template slot-scope="{ row }">
                                <span>{{row.unitPrice}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="200px" align="center" label="下单时间">
                            <template slot-scope="{ row }">
                                <span>{{detail.createTime}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <p style="text-align: right;">订单金额￥{{ detail.payMoney }}，含运费￥{{ detail.freightMoney }}</p>
                    <h3>补充信息</h3>
                    <p style="height: 200px;overflow-y: scroll;">
                      <img src="../../../assets/contract_images/contract.png" style="width: 100%;"/>
                    </p>
                </el-dialog>
                <h4>支付信息</h4>
                <el-form label-position="left" inline class="table-expand">
                    <el-form-item label="支付方式">
                        <span>{{ payType[detail.payType] }}</span>
                    </el-form-item>
                    <el-form-item label="支付渠道">
                        <span>{{ detail.shop }}</span>
                    </el-form-item>
                    <el-form-item label="支付时间">
                        <span>{{ detail.payTime }}</span>
                    </el-form-item>
                    <el-form-item label="支付流水号">
                        <span>{{ detail.shopId }}</span>
                    </el-form-item>
                </el-form>

                <h4 v-if="detail.state != 4">
                                            物流信息
        			<template v-if="detail.orderExpress">
                  （<el-button type="text" @click="dialogExpressVisible = true">物流详情</el-button>）
                  （<el-button type="text" @click="dialogExpressNum = true">修改物流单号</el-button>）
                   </template>
                </h4>
                <el-form label-position="left" inline class="table-expand"  v-if="detail.state != 4">
                    <el-form-item label="快递公司">
                        <span v-if="status">{{ detail.orderExpress.expressCompany }}</span>
                    </el-form-item>
                    <el-form-item label="快递单号">
                        <span v-if="status">{{ detail.orderExpress.expressNum }}</span>
                    </el-form-item>
                    <el-form-item label="发货时间">
                        <span v-if="status">{{ detail.orderExpress.createTime }}</span>
                    </el-form-item>
                </el-form>
                
                <el-dialog title="物流详情" :visible.sync="dialogExpressVisible">
                    <p v-if="status">物流公司：{{ detail.orderExpress.expressCompany }}</p>
                    <p v-if="status">物流单号：{{ detail.orderExpress.expressNum }}</p>
                    <el-table :data="expressData.data" border>
                      <el-table-column align="center" label="时间" width="200px">
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
                
                <el-dialog title="修改物流单号" :visible.sync="dialogExpressNum">
                    <el-form :model="expressNumForm" :rules="rules" ref="expressNumForm" label-position="left">
                    	<el-form-item label="物流公司" prop="expressCompany">
				          <el-select v-model="expressNumForm.expressCompany" placeholder="请选择">
				            <el-option
				              v-for="item in options"
				              :key="item.value"
				              :label="item.label"
				              :value="item.label">
				            </el-option>
				          </el-select>
				        </el-form-item>
	                    <el-form-item label="物流单号" prop="expressNum">
	                        <el-input v-model="expressNumForm.expressNum" placeholder="请输入新的物流单号"></el-input>
	                    </el-form-item>
	                    <el-form-item label="  ">
	                    	<el-button @click="cancel">取消</el-button>
	                        <el-button type="primary" @click="updateExpress">确定</el-button>
	                    </el-form-item>
	                </el-form>
                </el-dialog>
            </el-tab-pane>
        </el-tabs>

        <modify-dialog ref="modifyDialog" />

    </div>
</template>

<script>
  import { orderInfo, getExpressCompanyInfo, updateExpressNum, express } from '@/api/common/order'
  import { orderState, payType } from '@/utils/mixins/order'
  import OrderOperation from './orderOperation'
  import modifyDialog from './modifyDialog'

  export default {
    components: {
      OrderOperation,
      modifyDialog
    },
    created(){
      this.status=false
    },
    data() {
      return {
        orderState, payType,
        toRouter: '',
        detail: {
          list: []
        },
        status:false,
        expressData: {},
        dialogTableVisible: false,
        dialogExpressVisible: false,
        dialogExpressNum: false,
        orderExp:'',        
        options: [],
        expressNumForm: {},
        expressNum: '',
        rules: {
        	expressCompany: [
	          { required: true, message: '请选择物流公司', trigger: 'blur' }
	        ],
        	expressNum: [
	            { required: true, message: '物流单号不能为空', trigger: 'blur' }
	        ]
        }
      }
    },
    async beforeRouteEnter(to, from, next) {
      const { data } = await orderInfo(to.query.id)
      next(vm => {
        vm.detail = data
        vm.orderExp = data.orderExpress
        vm.expressNumForm = data.orderExpress
        vm.expressNum = data.orderExpress.expressNum
        getExpressCompanyInfo(vm.orderExp.expressCode,vm.orderExp.expressNum).then(res => {
          vm.expressData = JSON.parse(res.data)
          vm.status = true
        })
      })
    },
    created() {
	    this.getExpress()
	},
    methods: {
    	async getExpress() {
	      const expressData = await express()
	      const _this = this
	      expressData.data.forEach(function(v, i){
	        _this.options.push({
	          value: i,
	          label: v
	        })
	      })
	    },
      modify(detail) {
        const dialog = this.$refs.modifyDialog
        dialog.dialogFormVisible = true
        dialog.form.orderId = detail.id
      },
      cancel() {
      	this.dialogExpressNum = false
      	this.expressNumForm.expressNum = this.expressNum
      },
      updateExpress() {
      	let self = this
      	this.$refs['expressNumForm'].validate((valid) => {
          if (valid) {
            updateExpressNum(this.expressNumForm).then(data => {
	      		self.dialogExpressNum = false
	      		self.status = false
	      		self.$notify({
		          title: '成功',
		          message: '修改成功',
		          type: 'success'
		        })
	      		getExpressCompanyInfo(self.orderExp.expressCode,self.orderExp.expressNum).then(res => {
		          self.expressData = JSON.parse(res.data)
		          self.status = true
		        })
	      	}).catch(() => {
	      		this.cancel()
	      	})
          } else {
            return false;
          }
        })
      	
      }
    }
  }
</script>

<style scoped>
    .detail {
        margin:20px 14px;
    }
    .table-expand {
        font-size: 0;
    }
    .table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 30%;
    }
    .el-button+.el-button{
      margin-left: 0;
    }
</style>

