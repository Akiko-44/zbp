
<template>
  <div class="page-container">

    <div class="filter-container pb-0">
      <el-form
        :inline="true"
        :model="listParams"
        ref="designWorkListParamsForm"
        label-width="80px"
        class="listParamsForm"
      >
        <el-form-item label="作品名称:">
          <el-input
            @keyup.enter.native="handleFilter"
            v-model.trim="listParams.caseName"
            placeholder="请输入作品名称"
          > </el-input>
        </el-form-item>
        <el-form-item label="商品状态:">
          <el-select
            v-model="listParams.auditState"
            clearable
            placeholder="请选择状态"
          >
            <el-option
              size="size"
              v-for="item in auditState"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间区间:">
          <el-date-picker
            v-model="onSaleTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            style="width: 200px;"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="filter-btn">
          <el-button
            type="primary"
            v-waves
            class="primary-btn-sm mr-1"
            @click="handleFilter"
          >查询</el-button>
          <el-button
            class="plain-btn-sm fr"
            type="primary"
            v-waves
            @click="addOpus"
          >发布作品</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      :data="list"
      highlight-current-row
      class="custom-table"
    >
      <el-table-column
        width="200px"
        align="center"
        label="作品名称"
      >
        <template slot-scope="{ row }">
          <span
            class="blue"
            @click="preView(row)"
          >{{row.caseName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="200px"
        align="center"
        label="分类"
        prop="worksCategories"
      ></el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="收藏数量"
      >
        <template slot-scope="{row}">
          <span>{{row.collectNumber || 0}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        align="center"
        label="浏览数量"
      >
        <template slot-scope="{row}">
          <span>{{row.viewNumber || 0}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="100px"
        align="center"
        label="商品状态"
      >
        <template slot-scope="{ row }">
          <span>{{auditStateMap[row.auditState]}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        align="center"
        label="上架时间"
        prop="createTime"
      ></el-table-column>

      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            v-if="row.auditState !== 5"
            size="small"
            type="text"
            @click="$router.push({ name: 'addOpus', query: { id: row.id } })"
          >
            修改
          </el-button>
          <el-button
            size="small"
            type="text"
            @click="opusOnOrOff(row, $index, 1, 3)"
            v-if="row.auditState == 1 || row.auditState == 4"
          >
            上架
          </el-button>
          <el-button
            size="small"
            type="text"
            @click="opusOnOrOff(row, $index, 1, 4)"
            v-if="row.auditState == 3"
          >
            下架
          </el-button>
        </template>
      </el-table-column>

    </el-table>

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
    <el-dialog :visible.sync="dialogVisible">
      <div class="preview-bg">
        <!-- <img
          :src="form.imgUrlList[0]"
          class="work-pic"
          alt=""
        > -->
        <div class="right-box">
          <p class="goodsName">{{preViewObj.caseName}}</p>
          <p class="category">{{preViewObj.worksCategories}}</p>
          <p class="num">
            <span>收藏量 {{preViewObj.collectNumber || 0}}</span>
            <span>浏览量 {{preViewObj.viewNumber || 0}}</span>
          </p>
          <div class="designerInfo">
            <img
              :src="preViewObj.designerLogo"
              alt=""
            >
            <div>
              <p>{{preViewObj.designerName}}</p>
              <p>综合评分<span style="margin-left:10px;color:#DF735A;">5.0</span></p>
            </div>
          </div>
        </div>
        <!-- <div
          class="work-info"
          v-html="form.caseInfo"
        >
        </div> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  opusList,
  opusOnOrOff,
  auditReson
} from '@/api/designMerchant/works'
import { goodsSource } from '@/utils/mixins/order'
import waves from '@/directive/waves' // 水波纹指令
import Cookies from 'js-cookie'

export default {
  directives: {
    waves
  },
  data() {
    return {
      categories: [],
      list: null,
      total: null,
      listLoading: true,
      onSaleTime: '',
      listParams: {
        offset: 1,
        limit: 10,
        type: 0,
        caseName: undefined,
        catId: undefined,
        auditState: undefined,
        startTime: undefined,
        endTime: undefined
      },
      auditState: [
        { value: 0, label: '待审核' },
        { value: 1, label: '审核通过' },
        { value: 2, label: '审核不通过' },
        { value: 3, label: '上架' },
        { value: 4, label: '下架' },
        { value: 5, label: '平台下架' }
      ],
      auditStateMap: {
        0: '待审核',
        1: '审核通过',
        2: '未通过',
        3: '上架',
        4: '下架',
        5: '平台下架',
        6: '草稿箱'
      },
      goodsSource,
      index: undefined,
      dialogVisible: false,
      preViewObj: {}
    }
  },
  watch: {
    '$route': 'fetchData',
    onSaleTime(value) {
      this.listParams.startTime = value ? value[0] : undefined
      this.listParams.endTime = value ? value[1] : undefined
    }
  },
  created() {
    //  this.getList()
    this.fetchData()
  },
  mounted() {
  },
  methods: {
    addOpus() {
      this.$router.push({ name: 'addOpus' })
    },
    fetchData() {
      this.listParams.offset = +this.$route.query.page || 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      opusList(this.listParams)
        .then(data => {
          this.list = data.data.records
          this.total = data.data.total
          this.listLoading = false
        })
    },
    handleFilter() {
      this.$refs['designWorkListParamsForm'].validate((valid) => {
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
      this.listParams.offset = val
      this.getList()
      // this.$router.replace({ name: 'worksList', query: { page: val }})
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
    preView(row) {
      this.dialogVisible = true
      this.preViewObj = row
      this.preViewObj.designerLogo = Cookies.get('logo')
      this.preViewObj.designerName = Cookies.get('nickName')
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
  background-image: url('../../../assets/image/opus.png');
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
    & .category {
      height: 24px;
    }
    & .num {
      margin-top: 146px;
      margin-left: 90px;
    }
    & .designerInfo {
      margin-top: 140px;
      & img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        vertical-align: top;
      }
      & > div {
        display: inline-block;
      }
      & p {
        margin: 0 10px;
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
.blue {
  cursor: pointer;
  color: #409eff;
}
</style>
