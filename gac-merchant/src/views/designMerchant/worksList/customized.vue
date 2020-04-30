
<template>
  <div
    class="page-container"
    v-loading="listLoading"
  >
    <template v-if="list && list.id">
      <!-- <div class="has-customized">
        <el-table
          :data="list"
          v-loading.body="listLoading"
          fit
          highlight-current-row
          style="width: 100%"
        >

          <el-table-column
            align="center"
            label="商品"
          >
            <template slot-scope="{ row }">
              <div
                class="info"
                @click="preView()"
              >
                <img :src="row.imgUrl" />
                <div>
                  <p class="blue">{{row.caseName}}</p>
                  <p>ID：{{row.id}}</p>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            width="200px"
            align="center"
            label="价格"
          >
            <template slot-scope="{ row }">
              <span>￥{{row.price}}</span>
            </template>
          </el-table-column>

          <el-table-column
            width="110px"
            align="center"
            label="状态"
          >
            <template slot-scope="{ row }">
              <span>{{auditStateMap[row.auditState]}}</span>
              <span
                v-if="row.auditState === 2"
                @click="reson(row)"
                style="cursor: pointer;"
              ><i class="el-icon-warning"></i></span>
            </template>
          </el-table-column>

          <el-table-column
            width="200px"
            align="center"
            label="上架时间"
            prop="createTime"
          ></el-table-column>

          <el-table-column
            width="200px"
            align="left"
            label="操作"
          >
            <template slot-scope="{ row, $index }">
              <el-button
                size="small"
                type="primary"
                @click="opusOnOrOff(row, $index, 0, 3)"
                v-if="row.auditState == 1 || row.auditState == 4"
              >
                立即上架
              </el-button>
              <el-button
                size="small"
                type="primary"
                @click="opusOnOrOff(row, $index, 0, 4)"
                v-if="row.auditState == 3"
              >
                立即下架
              </el-button>
              <el-button
                v-if="row.auditState !== 5"
                size="small"
                type="success"
                @click="$router.push({ name: 'addCustomized'})"
              >
                编辑商品
              </el-button>
            </template>
          </el-table-column>

        </el-table>
        <div class="total">
          <span>累计销售数量 {{saleCount ? saleCount : 0}}</span>
          <span>累计销售金额 ￥{{sellAmount ? sellAmount : 0}}</span>
        </div>
      </div> -->
      <div class="table-container">
        <div class="table-header d-flex a-center">
          <span class="goods-name">商品</span>
          <span class="price">价格</span>
          <span class="status">状态</span>
          <span class="creatTime">发布时间</span>
          <span class="options">操作</span>
        </div>
        <div class="table-body">
          <div class="table-item font-12">
            <div class="d-flex text-gray">
              <img
                :src="list.imgUrl"
                width="80"
                height="80"
                class="pointer mr"
                @click="preView()"
              >
              <div class="goods-container d-flex">
                <div class="goods-info d-flex flex-column j-sb">
                  <p class="text-black line-h-md">{{list.caseName}}</p>
                  <p class="text-light-gray">ID：{{list.id}}</p>
                </div>
                <div class="price d-flex j-center a-center">
                  ￥{{list.price}}
                </div>
                <div class="status d-flex j-center a-center">
                  {{auditStateMap[list.auditState]}}
                  <span
                    v-if="list.auditState === 2"
                    @click="reson(list)"
                    style="cursor: pointer;"
                  ><i class="el-icon-warning"></i></span>
                </div>
                <div class="creatTime d-flex j-center a-center">
                  {{list.createTime}}
                </div>
                <div class="options d-flex flex-column j-center a-center">
                  <el-button
                    size="small"
                    type="primary"
                    class="option-btn"
                    @click="opusOnOrOff(list, 0, 3)"
                    v-if="list.auditState == 1 || list.auditState == 4"
                  >
                    立即上架
                  </el-button>
                  <el-button
                    size="small"
                    type="primary"
                    class="option-btn"
                    @click="opusOnOrOff(list, 0, 4)"
                    v-if="list.auditState == 3"
                  >
                    立即下架
                  </el-button>
                  <el-button
                    v-if="list.auditState !== 5"
                    size="small"
                    class="option-btn"
                    @click="$router.push({ name: 'addCustomized'})"
                  >
                    编辑商品
                  </el-button>
                </div>
              </div>
            </div>
            <div class="goods-num d-flex j-end text-light-gray">
              <span class="ml-4">累计销售数量 {{list.saleCount || 0}}</span>
              <span class="ml-4">累计销售金额 ￥{{list.sellAmount || 0}}</span>
            </div>
          </div>
        </div>
      </div>

    </template>
    <template v-else>
      <div class="no-customized">
        <p class="pt-5 font-16 text-gray">您还没有发布定制商品</p>
        <el-button
          type="primary"
          class="primary-btn-big my-3"
          @click="$router.push({name: 'addCustomized'})"
        >
          立即发布
        </el-button>
        <p class="tips">*温馨提示：每位设计师都可以发布一件定制商品，在与用户沟通好定制需求、定制费用后，请在待付款订单中修改订单金额</p>
      </div>
    </template>

    <el-dialog :visible.sync="dialogVisible">
      <div class="preview-bg">
        <img
          v-if="preViewObj && preViewObj.imgUrlList"
          :src="preViewObj.imgUrlList[0]"
          class="work-pic"
          alt=""
        >
        <div class="right-box">
          <p class="goodsName">{{preViewObj.caseName}}</p>
          <p
            class="price"
            v-if="preViewObj.price"
          ><span>￥</span>{{preViewObj.price.toFixed(2)}}</p>
        </div>
        <div
          class="work-info"
          v-html="preViewObj.caseInfo"
        >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  opusOnOrOff,
  auditReson,
  customDetail
} from '@/api/designMerchant/works'
import waves from '@/directive/waves' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      dialogVisible: false,
      preViewObj: {},
      auditStateMap: {
        0: '待审核',
        1: '审核通过',
        2: '未通过',
        3: '上架',
        4: '下架',
        5: '平台下架'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      customDetail()
        .then(data => {
          // this.list = []
          this.preViewObj = data.data
          // this.saleCount = data.data.saleCount
          // this.sellAmount = data.data.sellAmount
          this.list = data.data
          // this.list.push(data.data)
          this.listLoading = false
        })
    },
    opusOnOrOff(row, type, state) {
      const text = state === 4 ? '下架' : '上架'
      this.$confirm(`确认${text}选中的商品？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'custom-confirm-sm'
      })
        .then(() => {
          opusOnOrOff({
            caseId: row.id,
            type: type,
            isCheckSale: state
          })
            .then(() => {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success',
                duration: 2000
              })
              this.list.auditState = state === 4 ? 3 : 4
              // this.getList()
            })
        })
    },
    reson(row) {
      auditReson(row.id)
        .then(data => {
          this.$alert(data.data, '未通过原因', {
            confirmButtonText: '确定'
          })
        })
    },
    preView() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.has-customized {
  border: 1px solid #999;
}
.total {
  margin: 10px;
  color: #666;
  font-size: 14px;
}
.total > span {
  display: inline-block;
  margin-right: 20px;
}
.no-customized {
  text-align: center;
}
.no-customized .tips {
  color: red;
  font-size: 12px;
}
.info {
  cursor: pointer;
}
.info img {
  width: 100px;
  vertical-align: top;
}
.info > div {
  display: inline-block;
}
.info .blue {
  color: #409eff;
}
/deep/ .el-dialog {
  width: 1200px;
}
/deep/ .el-dialog__body {
  padding: 30px 0 0;
}
.preview-bg {
  position: relative;
  width: 1200px;
  min-height: 883px;
  background-image: url('../../../assets/image/customGoods.jpg');
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #f5f2f5;
  & .work-pic {
    position: absolute;
    top: 6px;
    left: 10px;
    width: 500px;
    height: 496px;
  }
  & .right-box {
    position: absolute;
    right: 7px;
    padding: 0 40px;
    width: 684px;
    height: 495px;
    & .goodsName {
      font-size: 20px;
      margin-bottom: 10px;
      line-height: 25px;
    }
    & .price {
      margin-left: 10px;
      color: #fb746e;
      font-size: 24px;
      font-weight: bold;
      margin-top: 90px;
      & span {
        font-size: 12px;
        font-weight: normal;
      }
    }
  }
  & .work-info {
    padding-top: 620px;
    margin-left: 280px;
    width: 900px;
    height: 100%;
    /deep/ & img {
      max-width: 100%;
    }
  }
}
.table-container {
  .table-header {
    margin-bottom: 30px;
    height: 40px;
    background: #f2f2f2;
    span {
      text-align: center;
    }
  }
  .table-item {
    margin-bottom: 20px;
    padding: 20px 20px 0 14px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(223, 236, 255, 1);
    box-shadow: -1px 2px 13px 0px rgba(224, 236, 255, 0.86);
    border-radius: 6px;
  }
  .goods-container {
    padding-left: 10px;
    border-bottom: 1px solid #e0e0e0;
  }
  .goods-info {
    margin-bottom: 20px;
    width: 260px;
    .brand {
      margin-right: 10px;
      padding: 0 6px;
      line-height: 20px;
      background: rgba(61, 135, 253, 0.1);
    }
    .category {
      padding: 0 6px;
      line-height: 20px;
      background: #f2f2f2;
    }
  }
  .goods-name {
    width: 370px;
  }
  .price {
    width: 150px;
  }
  .stock {
    width: 100px;
  }
  .status {
    width: 100px;
  }
  .creatTime {
    width: 200px;
  }
  .options {
    width: 100px;
  }
  .option-btn {
    margin-left: 0;
    margin-bottom: 14px;
    width: 70px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    border-color: #3d87fd;
    color: #3d87fd;
    background: #ffffff;
    padding: 0;
    text-align: center;
    border-radius: 4px;
  }
  .option-btn-text {
    margin-left: 0;
    margin-bottom: 10px;
    width: 70px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    padding: 0;
    text-align: center;
    color: #3d87fd;
  }
  .goods-num {
    line-height: 44px;
  }
}
</style>
