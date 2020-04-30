<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <el-button
      size="small"
      plain
      type="primary"
      @click="$router.push({ name: 'merchantExplain'})"
    >
      修改商家简介
    </el-button>
    <el-form label-width="170px">

      <el-form-item label="店铺名称">
        <span>{{ form.name }}</span>
      </el-form-item>

      <el-form-item label="店铺logo">
        <span class="card"><img :src="form.logo" /></span>
      </el-form-item>

      <el-form-item label="店铺背景图">
        <span class="card"><img :src="form.backgroundImg" /></span>
      </el-form-item>

      <!--<el-form-item label="店铺类别">
      <span v-if="form.type === '1'">首饰设计</span>
      <span v-else-if="form.type === '2'">玉石雕刻</span>
    </el-form-item>-->

      <el-form-item label="主营类目">
        <template v-if="form.categoryVOList && form.categoryVOList.length">
          <p
            v-for="item in form.categoryVOList"
            style="margin: 0;"
          >{{item}}</p>
        </template>
        <template v-else><span>{{ form.categoryDesc }}</span></template>
      </el-form-item>

      <el-form-item label="店铺简介">
        <span>{{ form.merchantExplain }}</span>
      </el-form-item>

      <template v-if="form.brandList !== undefined && form.brandList.length >0">
        <el-form-item label="经营品牌">
          <span>{{ form.brandList[0].brandName }}</span>
        </el-form-item>

        <el-form-item label="品牌授权书">
          <span>{{ form.brandList[0].brandAuthPic }}</span>
        </el-form-item>

        <el-form-item label="品牌使用期限">
          <span>{{ form.brandList[0].brandStartDate }}-{{ form.brandList[0].brandEndDate }}</span>
        </el-form-item>
      </template>

      <el-form-item label="企业名称">
        <span>{{ form.companyName }}</span>
      </el-form-item>

      <el-form-item label="中宝协会员等级">
        <span>{{ levelList[form.merchantLevel - 1] }}</span>
      </el-form-item>

      <el-form-item
        label="组织机构代码证/营业执照"
        v-if="form.registType == 2"
      >
        <span class="card"><img :src="form.businessLicense" /></span>
      </el-form-item>

      <el-form-item
        label="法人授权书扫描件"
        v-if="form.registType == 2"
      >
        <span class="card"><img :src="form.legalPersonPic" /></span>
      </el-form-item>

      <el-form-item label="所在地">
        <span>{{ form.provinceName }}{{ form.cityName }}{{ form.address }}</span>
      </el-form-item>

      <el-form-item
        label="税务登记号"
        v-if="form.registType == 2"
      >
        <span>{{ form.taxNumber }}</span>
      </el-form-item>

      <el-form-item
        label="税务登记证"
        v-if="form.registType == 2"
      >
        <span class="card"><img :src="form.taxPic" /></span>
      </el-form-item>

      <el-form-item label="开户行账号">
        <span class="card">{{ form.bankAccount }}</span>
      </el-form-item>

      <el-form-item label="开户行名称">
        <span>{{ form.bankName }}</span>
      </el-form-item>

      <el-form-item label="开户行行号">
        <span>{{ form.bankNumber }}</span>
      </el-form-item>

      <el-form-item
        label="辅助材料照片"
        v-if="form.materials && form.materials.length && form.registType == 1"
      >
        <div class="materials-list">
          <span
            class="card"
            v-for="item in form.materials"
          ><img
              :src="item"
              title="双击查看大图"
              @dblclick="lookImg(item)"
            /></span>
        </div>
      </el-form-item>

      <!-- <el-form-item
        label="银行开户许可证电子版"
        v-if="form.registType == 2"
      >
        <span><img :src="form.bankPermissionUrl" /></span>
      </el-form-item> -->

      <el-form-item label="联系人实名认证">
        <template v-if="form.linkmanList !== undefined && form.linkmanList.length >0">
          <el-table
            :data="form.linkmanList"
            border
            fit
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column
              width="100px"
              align="left"
              label="姓名"
              prop="linkName"
            ></el-table-column>
            <el-table-column
              width="100px"
              align="left"
              label="身份证号"
              prop="idCard"
            ></el-table-column>
            <el-table-column
              align="left"
              label="身份证照片"
            >
              <template slot-scope="{ row }">
                <span class="idcard"><img
                    :src="row.facePhoto"
                    title="双击查看大图"
                    @dblclick="lookImg(row.facePhoto)"
                    v-if="row.facePhoto"
                  /></span>
                <span class="idcard"><img
                    :src="row.backPhoto"
                    title="双击查看大图"
                    @dblclick="lookImg(row.backPhoto)"
                    v-if="row.backPhoto"
                  /></span>
              </template>
            </el-table-column>
            <!--<el-table-column width="100px" align="left" label="状态">
            <template slot-scope="{ row }">
              <span>{{ row.status == 0 ? '通过' : '未通过' }}</span>
            </template>
          </el-table-column>-->
          </el-table>
        </template>
      </el-form-item>

      <el-form-item label="已绑定手机号">
        <span>{{ form.mobilePhone }}</span>
      </el-form-item>

    </el-form>

    <el-dialog
      title="大图"
      fullscreen='fullscreen'
      :visible.sync="dialogImgVisible"
    >
      <div style="text-align: center;">
        <img
          :src="bigImgSrc"
          width="50%"
        />
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getInfo } from '@/api/designMerchant/designer'

export default {
  data() {
    return {
      dialogImgVisible: false,
      bigImgSrc: '',
      form: {},
      levelList: ['副会长单位', '常务理事单位', '理事单位', '普通单位会员', '无']
    }
  },
  /* async beforeRouteEnter(to, from, next) {
    const form = await getInfo().then(data => data.data)
    next(vm => {
      setTimeout(() => {
        vm.form = form
      }, 10)
    })
  }, */
  created() {
    getInfo().then(data => {
      this.form = data.data
      this.form.materials = this.form.material.split(',')
      // this.form.linkmanList = [this.form.linkmanList[0]]
    })
  },
  methods: {
    lookImg(imgSrc) {
      this.dialogImgVisible = true
      this.bigImgSrc = imgSrc
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  display: inline-block;
  max-width: 500px;
}
.idcard {
  display: inline-block;
  width: 100px;
}
.card img,
.idcard img {
  width: 100%;
}
.materials-list .card {
  width: 20%;
  margin: 10px;
}
</style>


