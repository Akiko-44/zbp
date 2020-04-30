<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <div class="title">
      <a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回 </i></a>
      <span>|</span>
      <span>商户详情</span>
    </div>
    <el-form label-width="170px">

      <el-form-item label="店铺名称">
        <span>{{ form.name }}</span>
      </el-form-item>

      <!--<el-form-item
        label="店铺类别"
        v-if="form.merchantType == 1 && form.registType == 2"
      >
        <span v-if="form.type === '1'">品牌商家</span>
        <span v-else-if="form.type === '2'">平台商家</span>
        <span v-else-if="form.type === '3'">区域旗舰店</span>
      </el-form-item>

      <el-form-item
        label="店铺类别"
        v-if="form.merchantType == 2"
      >
        <span v-if="form.type === '1'">首饰设计</span>
        <span v-else-if="form.type === '2'">玉石雕刻</span>
      </el-form-item>

      <el-form-item
        label="店铺类别"
        v-if="form.merchantType == 3"
      >
        <span>{{designcategory}}</span>
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
      <el-form-item label="店铺logo">
        <span
          class="card"
          v-if="form.logo"
        ><img
            :src="form.logo"
            title="双击查看大图"
            @dblclick="lookImg(form.logo)"
          /></span>
      </el-form-item>
      <el-form-item label="店铺背景图">
        <span
          class="card"
          v-if="form.backgroundImg"
        ><img
            :src="form.backgroundImg"
            title="双击查看大图"
            @dblclick="lookImg(form.backgroundImg)"
          /></span>
      </el-form-item>
      <el-form-item
        label="室内图片"
        v-if="form.idroomPic"
      >
        <span
          class="card"
          v-if="form.idroomPic"
        ><img
            :src="form.idroomPic"
            title="双击查看大图"
            @dblclick="lookImg(form.idroomPic)"
          /></span>
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

      <el-form-item
        label="企业名称"
        v-if="form.registType == 2"
      >
        <span>{{ form.companyName }}</span>
      </el-form-item>

      <el-form-item label="中宝协会员等级">
        <span>{{ levelList[form.merchantLevel - 1] }}</span>
        <el-button
          style="margin-left:20px;"
          @click="dialogVisible = true"
        >修改</el-button>
      </el-form-item>

      <el-form-item
        label="组织机构代码证/营业执照"
        v-if="!((form.merchantType == 1 || form.merchantType == 2) && form.registType == 1)"
      >
        <span
          class="card"
          v-if="form.businessLicense"
        ><img
            :src="form.businessLicense"
            title="双击查看大图"
            @dblclick="lookImg(form.businessLicense)"
          /></span>
      </el-form-item>

      <el-form-item
        label="银联商务T+N自由划付业务（提现业务）承诺书"
        v-if="!((form.merchantType == 1 || form.merchantType == 2) && form.registType == 1)"
      >
        <span
          class="card"
          v-if="form.legalPersonPic"
        ><img
            :src="form.legalPersonPic"
            title="双击查看大图"
            @dblclick="lookImg(form.legalPersonPic)"
          /></span>
      </el-form-item>

      <el-form-item label="所在地">
        <span>{{ form.provinceName }}{{ form.cityName }}{{ form.countryName }}{{ form.address }}</span>
      </el-form-item>

      <el-form-item
        label="纳税人识别号"
        v-if="!((form.merchantType == 1 || form.merchantType == 2) && form.registType == 1)"
      >
        <span>{{ form.taxNumber }}</span>
      </el-form-item>

      <!--<el-form-item label="税务登记证" v-if="!(form.merchantType == 2 && form.registType == 1)">
      <span class="card"><img :src="form.taxPic"/></span>
    </el-form-item>-->

      <el-form-item label="开户姓名">
        <span>{{ form.realName }}</span>
      </el-form-item>

      <el-form-item label="开户行账号">
        <span>{{ form.bankAccount }}</span>
      </el-form-item>

      <el-form-item label="开户行名称">
        <span>{{ form.bankName }}</span>
      </el-form-item>

      <el-form-item label="开户行行号">
        <span>{{ form.bankNumber }}</span>
      </el-form-item>

      <el-form-item
        label="银行开户证明图片"
        v-if="form.materials && (form.merchantType == 3 || form.registType == 2)"
      >
        <span class="card"><img
            :src="form.materials[0]"
            title="双击查看大图"
            @dblclick="lookImg(form.materials[0])"
          /></span>
      </el-form-item>

      <!-- <el-form-item
        label="银行开户许可证电子版"
        v-if="!((form.merchantType == 1 || form.merchantType == 2) && form.registType == 1)"
      >
        <span class="card"><img
            :src="form.bankPermissionUrl"
            title="双击查看大图"
            @dblclick="lookImg(form.bankPermissionUrl)"
          /></span>
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
                <span
                  class="idcard"
                  v-if="row.facePhoto"
                ><img
                    :src="row.facePhoto"
                    title="双击查看大图"
                    @dblclick="lookImg(row.facePhoto)"
                  /></span>
                <span
                  class="idcard"
                  v-if="row.backPhoto"
                ><img
                    :src="row.backPhoto"
                    title="双击查看大图"
                    @dblclick="lookImg(row.backPhoto)"
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

      <el-form-item label="邮箱">
        <span class="card">{{ form.email }}</span>
      </el-form-item>

      <el-form-item label="已绑定手机号">
        <span>{{ form.mobilePhone }}</span>
      </el-form-item>

      <el-form-item label="自拍照">
        <span
          class="card"
          v-if="form.selfie"
        ><img
            :src="form.selfie"
            title="双击查看大图"
            @dblclick="lookImg(form.selfie)"
          /></span>
      </el-form-item>

      <el-form-item label="门头牌照">
        <span
          class="card"
          v-if="form.doorPhotos"
        ><img
            :src="form.doorPhotos"
            title="双击查看大图"
            @dblclick="lookImg(form.doorPhotos)"
          /></span>
      </el-form-item>

      <el-form-item
        label="辅助材料"
        v-if="form.materials && (form.merchantType == 2 || form.registType == 1)"
      >
        <!-- <span class="card"><img
            :src="form.materials"
            title="双击查看大图"
            @dblclick="lookImg(form.materials)"
          /></span> -->
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

    <el-dialog
      class="level-dialog"
      title="修改中宝协会员等级"
      :visible.sync="dialogVisible"
    >
      <div style="text-align: center;">
        <el-select
          v-model="merchantLevel"
          placeholder="请选择"
        >
          <el-option
            v-for="(item,index) in levelList"
            :key="index"
            :label="item"
            :value="index+1"
          ></el-option>
        </el-select>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updateMerchantLevel"
        >保存</el-button>
      </div>
    </el-dialog>
    <!--<div onClick="javascript :history.back(-1);">返回</div>-->

  </div>
</template>

<script>
import { getInfo, designcategory, saveMerchantLevel } from '@/api/public/merchant'

export default {
  data() {
    return {
      merchantLevel: 5,
      form: {},
      designcategory: '',
      dialogImgVisible: false,
      dialogVisible: false,
      fullscreen: true,
      bigImgSrc: '',
      types: {
        1: '珠宝店',
        2: '设计室',
        3: '制造间',
        4: '服务商'
      },
      levelList: ['副会长单位', '常务理事单位', '理事单位', '普通单位会员', '无']
    }
  },
  async beforeRouteEnter(to, from, next) {
    const form = await getInfo(to.query.id).then(data => data.data)

    next(vm => {
      setTimeout(() => {
        vm.form = form
        vm.merchantLevel = form.merchantLevel
        if (form.merchantType == 3) {
          designcategory({ flag: 1 }).then(data => {
            data.data.forEach(item => {
              if (item.id == form.type) {
                vm.designcategory = item.name
              }
            })
          })
        }
      }, 10)
    })
  },
  methods: {
    lookImg(imgSrc) {
      this.dialogImgVisible = true
      this.bigImgSrc = imgSrc
    },
    updateMerchantLevel() {
      saveMerchantLevel({
        merchantLevel: this.merchantLevel,
        id: this.form.id
      }).then(data => {
        this.dialogVisible = false
        this.form.merchantLevel = this.merchantLevel
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      })
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
.card img {
  max-width: 300px;
  width: 100%;
}
.idcard img {
  width: 100%;
}
.materials-list .card {
  width: 20%;
  margin: 10px;
}
/deep/ .el-select-dropdown {
  z-index: 30002 !important;
}
/deep/ .level-dialog .el-dialog {
  width: 500px;
}
</style>


