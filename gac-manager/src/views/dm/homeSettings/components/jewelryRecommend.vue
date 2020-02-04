<template>
<div class="block">
  <h4>
    <span v-if="source == 4">品牌商家</span>
    <span v-if="source == 3">平台商家</span>
    <span v-if="source == 2">区域旗舰店</span>
    <span v-if="source == 1">专利饰品</span>
  </h4>
  <el-form :model="form" ref="form" label-width="0px">
    <el-form-item>
      <el-table
        style="margin-bottom: 10px;"
        :data="form.data"
        border
        v-loading.body="listLoading"
      >
        <el-table-column width="100px" align="center" label="排序">
          <template slot-scope="{ row }">
            <span> {{row.sortNumber}} </span>
          </template>
        </el-table-column>
        <el-table-column width="150px" align="center" label="商品ID">
          <template slot-scope="{ row }">
          	<span> {{row.goodsId}} </span>
          </template>
        </el-table-column>
        <el-table-column width="200px" align="center" label="商品名称">
          <template slot-scope="{ row }">
            <span> {{row.goodsName}} </span>
          </template>
        </el-table-column>
        <el-table-column width="200px" align="center" label="商家名称">
          <template slot-scope="{ row }">
            <span> {{row.merchantName}} </span>
          </template>
        </el-table-column>
        <el-table-column width="250px" align="center" label="缩略图">
          <template slot-scope="{ row, $index }">
            <el-card v-if="row.thumbnail" :body-style="{ padding: '0px' }">
              <img :src="row.thumbnail | setImg" class="image" width="100%">
            </el-card>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="状态">
	        <template slot-scope="scope">
	          <span>
	            {{statusMap[scope.row.status]}}
	          </span>
	        </template>
	      </el-table-column>
        <el-table-column align="left" label="操作">
          <template slot-scope="{ row, $index }">
          	<el-button v-if="row.status === 1" :loading="loading" @click="pause(row.id, 0, $index)">展示</el-button>
          	<el-button v-if="row.status === 0" :loading="loading" @click="pause(row.id, 1, $index)">暂停</el-button>
          	<el-button type="success" :loading="loading" @click="handleUpdate(row, $index)">编辑</el-button>
            <el-button type="danger" class="button" @click="handleDelete(row.id, $index)">删除</el-button>            
          </template>
        </el-table-column>
      </el-table>
      <el-button class="fr" icon="el-icon-plus" @click="handleAdd">添加</el-button>
    </el-form-item>
  </el-form>
  
  <editJewelryDialog ref="editDialog" @success="success" />
</div>
</template>

<script>
import { 
	getJewelryGoods,
	getJewelryGoodsList,
	saveJewelryGoods,
	delJewelryGoods,
	pauseJewelryGoods
} from '@/api/dm/homeSettings'
import editJewelryDialog from './editJewelryDialog'

export default {
  components: {
	  editJewelryDialog
  },
  props: {
    source: [String, Number]
  },
  data() {
    return {
      form: {
        data: []
      },
      cropShow: false,
      prefix: 'thumbnail',
      width: 235,
      height: 155,
      currentIndex: 1,
      loading: false,
      listLoading: false,
      statusMap: {
        0: '展示中',
        1: '暂停中'
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
  	getData() {
  		this.listLoading = true
	    getJewelryGoodsList().then(result => {
	      this.listLoading = false
	      this.form.data = result.data.records
	    }).catch(() => {
	      this.listLoading = false
	    })
  	},
    pause (id, status, index) {
    	pauseJewelryGoods(id, status).then((data) => {
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
        this.form.data[index].status = status
      })
    },
    handleUpdate(data, index) {
    	const dialog = this.$refs.editDialog
    	dialog.formTitle = '编辑商品'
      dialog.dialogFormVisible = true
      dialog.resetForm('editJewelryform', () => {
        dialog.form = JSON.parse(JSON.stringify(data))
        dialog.form.id = data.id
      })
    },
    handleDelete(id, index) {
    	this.$confirm('确定删除此商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delJewelryGoods(id).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.form.data.splice(index, 1)
        })
      }).catch(() => {})
    },
    handleAdd() {
    	const dialog = this.$refs.editDialog
      dialog.formTitle = '添加商品'
      dialog.dialogFormVisible = true
      dialog.resetForm('editJewelryform')
    },
    success (data) {
    	data.source = this.source
    	saveJewelryGoods(data).then(() => {
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          })
          this.getData()
        })
    }
  }
}
</script>


<style scoped>
.block {
  margin: 20px;
  width: 1260px;
}
</style>