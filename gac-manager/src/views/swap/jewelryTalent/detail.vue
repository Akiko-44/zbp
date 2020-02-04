<template>
  <div class="detail">
  	<div class="title">
    		<a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回  </i></a>
    		<span>|</span>
    		<span>珠宝达人详情</span>
    	</div>
    <el-tabs type="border-card" :detail="detail" style="margin-top: 10px;">
      <el-tab-pane label="详情">
        <h4>
          <template v-if="detail.userType != 4">个人</template>
          <template v-else-if="detail.userType == 4">商家</template>
        </h4>
        <template v-if="detail.userType != 4">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="姓名">
              <span>{{ detail.userName }}</span>
            </el-form-item>
            <el-form-item label="头像">
              <span class="userlogo" v-if="!detail.userLogo"><img src="../../../assets/avatar_images/avatar.jpg"/></span>
              <span class="userlogo" v-else><img :src="detail.userLogo"/></span>
            </el-form-item>
            <el-form-item label="身份证号">
              <span>{{ detail.idNumber }}</span>
            </el-form-item>
            <el-form-item label="辅助材料">
		          <img :src="detail.material"/>
		        </el-form-item>
          </el-form>
        </template>
        <template v-if="detail.userType == 4">
          <el-form label-position="left" inline class="table-expand">
            <el-form-item label="企业名称">
              <span>{{ detail.companyName }}</span>
            </el-form-item>
            <el-form-item label="头像">
              <span class="userlogo" v-if="!detail.userLogo"><img src="../../../assets/avatar_images/avatar.jpg"/></span>
              <span class="userlogo" v-else><img :src="detail.userLogo"/></span>
            </el-form-item>
            <el-form-item label="企业注册号">
              <span>{{ detail.taxNumber }}</span>
            </el-form-item>
            <el-form-item label="店铺名称">
              <span>{{ detail.shopName }}</span>
            </el-form-item>
            <el-form-item label="法人姓名">
              <span>{{ detail.userName }}</span>
            </el-form-item>
            <el-form-item label="法人身份证号">
              <span>{{ detail.idNumber }}</span>
            </el-form-item>
	        	<el-form-item label="营业执照">
		          <img :src="detail.licenceUrl"/>
		        </el-form-item>
		        <el-form-item label="开户许可证电子版">
		          <img :src="detail.electronicUrl"/>
		        </el-form-item>
		        <el-form-item label="税务登记号">
		          <span> {{detail.taxNumber}} </span>
		        </el-form-item>
		      </el-form>
	     	</template>
	     	<el-form label-position="left" inline class="table-expand">
	     	  <el-form-item label="性别">
	          <span v-if="detail.sex == 0"> 男   </span>
	          <span v-else> 女   </span>
	        </el-form-item>
	        <el-form-item label="邮箱地址">
	          <span> {{detail.email}} </span>
	        </el-form-item>
	        <el-form-item label="开户行账号">
	          <span> {{detail.bankAccount}} </span>
	        </el-form-item>
	        <el-form-item label="开户行行号">
	          <span> {{detail.bankNumber}} </span>
	        </el-form-item>
	        <el-form-item label="开户姓名">
	          <span> {{detail.realName}} </span>
	        </el-form-item>
	        <el-form-item label="开户行名称">
	          <span> {{detail.bankName}} </span>
	        </el-form-item>
	        <el-form-item label="地址">
	          <span> {{detail.provinceName}} {{detail.cityName}} </span>
	        </el-form-item>
	        <el-form-item label="营业区名称">
	          <span> {{detail.countryName}} </span>
	        </el-form-item>
	        <el-form-item label="详细地址">
	          <span> {{detail.address}} </span>
	        </el-form-item>
	        <el-form-item label="自拍照">
	          <img :src="detail.selfie"/>
	        </el-form-item>
	        <el-form-item label="门头牌照">
	          <img :src="detail.doorPhotos"/>
	        </el-form-item>
	        <el-form-item label="室内照片">
	          <img :src="detail.idroomPic"/>
	        </el-form-item>
	        <el-form-item label="门牌号">
	          <span> {{detail.houseNumber}} </span>
	        </el-form-item>
	        <el-form-item label="身份证正面">
	          <img :src="detail.idPicFront"/>
	        </el-form-item>
	        <el-form-item label="身份证反面">
	          <img :src="detail.idPicBack"/>
	        </el-form-item>
	        
	      </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane label="操作记录">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import { getObj } from '@/api/swap/jewelryTalent'

export default {
  components: {

  },
  data() {
    return {
      detail: {
        
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    const { data } = await getObj(to.query.id)
    next(vm => {
      vm.detail = data
    })
  },
  methods: {}
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
img{
	width: 300px;
}
.userlogo{
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}
.userlogo img{
  width: 100%;
}
</style>

