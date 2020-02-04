<template>
  <div class="detail">
  	<div class="title">
    		<a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回  </i></a>
    		<span>|</span>
    		<span>信息详情</span>
    	</div>
    <div class="actions" style="margin-top: 10px;">
      <!--<el-button
        size="small"
        @click="$router.push({ name: 'auctionEdit', query: { id: detail.id } })"
      >
        修改
      </el-button>-->

      <el-button size="small" type="danger" @click="handleDelete">删除</el-button>
      
      <el-button v-if="detail.goodsStatus == 1 || detail.goodsStatus == 3" size="small" type="primary" @click="audit(2)">审核通过</el-button>
      <el-button v-if="detail.goodsStatus == 1" size="small" type="warning" @click="audit(3)">审核拒绝</el-button>
    </div>
    <br />
    <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane label="基本信息">
        <el-form ref="form" label-width="100px">
          <el-form-item label="商品名称：">
            {{detail.goodsName}}
          </el-form-item>
          <el-form-item label="商品编号：">
            {{detail.id}}
          </el-form-item>
          <el-form-item label="拍卖状态：">
            {{goodsState[detail.goodsStatus]}}
          </el-form-item>
          <el-form-item label="商品分类：">
            {{detail.categoryName}}
          </el-form-item>
          <el-form-item label="商品品牌：">
            {{detail.brandName}}
          </el-form-item>
          <el-form-item label="参数设置：">
            <el-table
              style="width: 540px;margin-bottom: 10px;"
              :data="detail.goodsAttrs"
              border
            >
              <el-table-column align="center" label="参数名称">
                <template slot-scope="{ row }">
                  <span>{{row.attrName}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="参数值">
                <template slot-scope="{ row }">
                  <span>{{row.attrValue}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="新旧程度：">
            {{deprecitionState[detail.deprecition]}}
          </el-form-item>
          <el-form-item label="当前价：">
            {{detail.presentPrice}}
          </el-form-item>
          <el-form-item label="起拍价：">
            {{detail.upsetPrice}}
          </el-form-item>
          <el-form-item label="保证金价：">
            {{detail.deposit}}
          </el-form-item>
          <el-form-item label="加价幅度：">
            {{detail.skipPrice}}
          </el-form-item>
          <el-form-item label="保留价：">
            {{detail.reservePrice}}
          </el-form-item>
          <el-form-item label="竞拍时间：">
            {{detail.auctionStartTime}} 至 {{detail.auctionEndTime}}
          </el-form-item>
          <template v-if="detail.hsMark">
            <el-form-item label="鉴定机构：">
              {{detail.hsMark.hsMarkName}}
            </el-form-item>
            <el-form-item label="机构证书：">
              <a :href="detail.hsMark.hsMarkUrl | setImg" target="_blank">
                <img :src="detail.hsMark.hsMarkUrl | setImg" height="300" >
              </a>
            </el-form-item>
          </template>
          <el-form-item label="来源：">
            {{srcState[detail.src]}}
          </el-form-item>
          <el-form-item label="发布时间：">
            {{detail.createTime}}
          </el-form-item>
          <el-form-item label="更新时间：">
            {{detail.updateTime}}
          </el-form-item>
          <el-form-item label="商家名称：">
            {{detail.userName}}
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="信息图片">
        <el-row>
          <el-col :span="8" v-for="img in detail.imgs" :key="img.id">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="img.imgUrl | setImg" width="100%">
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="回收描述" v-html="goodsDesc"></el-tab-pane>
      <!-- <el-tab-pane label="操作记录">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { getGoodsDesc } from '@/api/swap/goods'
import { delObj, audit, getObj } from '@/api/swap/auctionInfo'
import { goodsState, srcState, auditState, deprecitionState } from '@/utils/mixins/swap'

export default {
  data() {
    return {
      goodsState, srcState, auditState, deprecitionState,
      goodsDesc: '',
      detail: {}
    }
  },
  async beforeRouteEnter(to, from, next) {
    const { data } = await getObj(to.query.id)
    next(vm => {
      vm.detail = data
    })
  },
  methods: {
    tabClick(tab) {
      if (tab.label === '回收描述' && !this.goodsDesc) {
        getGoodsDesc(this.$route.query.id).then(res => res.data || {}).then(data => {
          this.goodsDesc = data.goodsDesc
        })
      }
    },
    handleDelete() {
      this.$confirm(`确定删除当前信息？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj(this.detail.id)
            .then(() => {
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              this.$router.go(-1)
            })
        })
    },
    audit(state) {
      this.$confirm(`确定执行当前操作？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          audit(state).then(data => {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this.detail.goodsStatus = state
          })
        })
    }
  }
}
</script>

<style scoped>
.detail {
  margin:20px 14px;
}
.detail .el-form-item {
  margin-bottom: 5px;
}
</style>

