<template>
  <div class="app-container">
  	<div class="title">
    		<a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回  </i></a>
    		<span>|</span>
    		<span>认证详情</span>
    	</div>
  	<h4>姓名</h4> 
  	<div>{{ form.name }}</div>
  	<h4>身份证</h4> 
  	<div>{{ form.idNumber }}</div>
  	<h4>身份证照片</h4> 
  	<div v-if="form.idPicBack">
  		<img :src="form.idPicBack | setImg" width="150" style="margin-right: 10px;"/>
  		<img :src="form.idPicFront | setImg" width="150"/>
  	</div>
  </div>
</template>

<script>
import {
  detail
} from '@/api/public/auditCenter'
import { setImg } from '@/filters'
export default {
  data() {
    return {
      form: {}
    }
  },
  async beforeRouteEnter(to, from, next) {
    const form = await detail(to.query.id).then(data => data.data)
    next(vm => {
      setTimeout(() => {
        vm.form = form
      }, 10)
    })
  },
  methods: {
  	
  }
}
</script>
<style lang="scss" scoped>

</style>


