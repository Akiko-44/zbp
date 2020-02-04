<template>
<div class="block">
  <h4>
    <span v-if="type === 1">品牌商家</span>
    <span v-if="type === 2">平台商家</span>
    <span v-if="type === 3">区域旗舰店</span>
  </h4>
  <el-form :model="form" ref="form" label-width="0px">
    <el-form-item>
      <el-table
        style="margin-bottom: 10px;"
        :data="form.data"
        border
        v-loading.body="listLoading"
      >
        <el-table-column width="150px" align="center" label="商家ID">
          <template slot-scope="{ row }">
          	<span> {{row.merchantId}} </span>
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
  
  <editMerchantDialog ref="editMerchantDialog" @success="success" />
</div>
</template>

<script>
import { 
	getJewelryGoods,
	getJewelryGoodsList,
	saveJewelryGoods,
	delJewelryGoods,
	pauseJewelryGoods,
	getJewelryMerchant,
	getJewelryMerchantList,
	saveJewelryMerchant,
	delJewelryMerchant,
	pauseJewelryMerchant
} from '@/api/dm/homeSettings'
import editMerchantDialog from './editMerchantDialog'

export default {
  components: {
	  editMerchantDialog
  },
  props: {
  	type: [String, Number],
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
	    getJewelryMerchantList(this.type).then(result => {
	      this.listLoading = false
	      this.form.data = result.data.records
	    }).catch(() => {
	      this.listLoading = false
	    })
  	},
    pause (id, status, index) {
    	pauseJewelryMerchant(id, status).then((data) => {
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
    	const dialog = this.$refs.editMerchantDialog
    	dialog.formTitle = '编辑商家'
      dialog.dialogFormVisible = true
      dialog.resetForm('editMerchantForm', () => {
        dialog.form = JSON.parse(JSON.stringify(data))
        dialog.form.id = data.id
      })
    },
    handleDelete(id, index) {
    	this.$confirm('确定删除此商家?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delJewelryMerchant(id).then(() => {
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
    	const dialog = this.$refs.editMerchantDialog
      dialog.formTitle = '添加商家'
      dialog.dialogFormVisible = true
      dialog.resetForm('editMerchantForm')
    },
    success (data) {
    	data.type = this.type
    	saveJewelryMerchant(data).then(() => {
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