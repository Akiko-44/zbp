
<template>
  <div
    class="app-container calendar-list-container"
    v-if="!listLoading"
  >
    <template v-if="list.length && list">
      <div class="has-customized">
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
      </div>
    </template>
    <template v-else>
      <div class="no-customized">
        <p>您还没有发布定制商品</p>
        <el-button
          type="primary"
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
          :src="preViewObj.imgUrlList[0]"
          class="work-pic"
          alt=""
        >
        <div class="right-box">
          <p class="goodsName">{{preViewObj.caseName}}</p>
          <p class="price"><span>￥</span>{{preViewObj.price.toFixed(2)}}</p>
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
      listParams: {
        offset: 1,
        limit: 20
      },
      preViewObj: {},
      auditStateMap: {
        0: '待审核',
        1: '审核通过',
        2: '未通过',
        3: '上架',
        4: '下架',
        5: '平台下架'
      },
      saleCount: undefined,
      sellAmount: undefined
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
          this.list = []
          this.preViewObj = data.data
          this.saleCount = data.data.saleCount
          this.sellAmount = data.data.sellAmount
          this.list.push(data.data)
          this.listLoading = false
        })
    },
    opusOnOrOff(row, index, type, state) {
      this.$confirm(`确定执行当前操作？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
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
              this.list[index].auditState = state === 4 ? 3 : 4
              this.getList()
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
  font-size: 14px;
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
  background-image: url("../../../assets/image/customGoods.jpg");
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
</style>
