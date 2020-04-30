<template>
  <div class="app-container calendar-list-container">
  	<h3>商家简介</h3>
    <el-input type="textarea" :autosize="{ minRows: 12, maxRows: 20}" size="medium" v-model.trim="merchantExplain"></el-input>
    <el-button type="primary" :loading="loading" @click="put" style="margin-top: 20px;">确认</el-button>
  </div>
</template>

<script>
import { getMerchantExplain, putMerchantExplain } from '@/api/makeMerchant/center'

export default {
  data() {
    return {
    	loading: false,
      merchantExplain: ''
    }
  },
  async beforeRouteEnter(to, from, next) {
    const data = await getMerchantExplain()
    next(vm => {
      vm.merchantExplain = data.data
    })
  },
  methods: {
    put(){
    	if(this.merchantExplain == ""){
    		this.$message({
          message: '简介不可为空',
          type: 'warning'
        })
    		return false
    	}
    	this.loading = true
    	putMerchantExplain({merchantExplain:this.merchantExplain}).then(data => {
    		this.loading = false
    		this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
				this.$router.push({
          name: 'merchantInfo'
       	})
    	}).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>

