<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="130px"
    >
      <el-form-item
        label="广告名称"
        prop="name"
      >
        <el-input
          v-model.trim="form.name"
          placeholder="请输入广告名称"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="封面图"
        prop="picture"
      >
        <el-card
          v-if="form.picture"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.picture | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'picture')"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <el-button
          v-else
          @click="mobileCropShow = true;PorM = 2"
          type="primary"
        >上传</el-button>
        <ImageCropper
          ref="cropper"
          v-model="mobileCropShow"
          :noCircle="true"
          :noSquare="true"
          :withCredentials="true"
          imgFormat="jpg"
          :width="500"
          :height="500"
          :prefix="prefix"
          @crop-upload-success="uploadSuccess"
        />
        <div class="tip">尺寸500*500，大小2M以内，支持jpg/jpeg/png/gif格式</div>
      </el-form-item>

      <el-form-item
        label="广告位置"
        prop="location"
      >
        <el-radio-group v-model="form.location">
          <el-radio
            :label="item.value"
            v-for="(item,i) in locationList"
            :key="i"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- <el-form-item
        label="PC端banner"
        prop="pcPicture"
      >
        <el-card
          v-if="form.pcPicture"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="form.pcPicture | setImg"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="$delete(form, 'pcPicture')"
              >删除</el-button>
            </div>
          </div>
        </el-card>
        <el-button
          v-else
          @click="cropShow = true;PorM = 1"
          type="primary"
        >上传</el-button>
        <ImageCropper
          ref="cropper"
          v-model="cropShow"
          :noCircle="true"
          :noSquare="true"
          :withCredentials="true"
          imgFormat="jpg"
          :width="1200"
          :height="460"
          :prefix="prefix"
          @crop-upload-success="uploadSuccess"
        />
        <div class="tip">尺寸1200*460，大小2M以内，支持jpg/jpeg/png/gif格式</div>
      </el-form-item> -->

      <el-form-item
        label="链接类型"
        prop="linkType"
      >
        <el-radio-group
          v-model="form.linkType"
          @change="changeLinkType"
        >
          <el-radio
            :label="item.value"
            v-for="(item,i) in linkTypeList"
            :key="i"
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="linkTypeId">
        <!-- 选择商品 -->
        <template v-if="form.linkType == 1">
          <el-button
            type="primary"
            class="btn select-btn"
            v-if="!form.linkTypeId || !Object.keys(selectedGoods).length"
            @click="openGoodsDialog"
          >选择商品</el-button>
          <div
            class="selected-goods"
            v-if="form.linkTypeId && Object.keys(selectedGoods).length"
          >
            <i
              class="el-icon-edit-outline goods-edit"
              @click="openGoodsDialog"
            ></i>
            <img :src="selectedGoods.imgUrl" />
            <div class="goods-info">
              <div class="goods-name">{{selectedGoods.goodsName}}</div>
              <div>
                <span
                  class="goods-brand"
                  v-if="selectedGoods.brandName"
                >{{selectedGoods.brandName}}</span>
                <span
                  class="goods-catgory"
                  v-if="selectedGoods.categoryName"
                >{{selectedGoods.categoryName}}</span>
              </div>
              <div>
                <span class="goods-price">￥{{selectedGoods.lowPrice}}~￥{{selectedGoods.highPrice}}</span>
                <span class="goods-stock">库存：{{selectedGoods.stockNum}}</span>
              </div>
            </div>
          </div>
        </template>
        <!-- 选择店铺 -->
        <template v-if="form.linkType == 2">
          <el-button
            type="primary"
            class="btn select-btn"
            v-if="!form.linkTypeId || !Object.keys(selectedEnterprise).length"
            @click="openEnterpriseDialog"
          >选择店铺</el-button>
          <div
            class="selected-goods"
            v-if="form.linkTypeId && Object.keys(selectedEnterprise).length"
          >
            <i
              class="el-icon-edit-outline goods-edit"
              @click="openEnterpriseDialog"
            ></i>
            <img :src="selectedEnterprise.logo" />
            <div class="goods-info">
              <div class="goods-name">{{selectedEnterprise.name}}</div>
              <div class="main-categories">
                主营：
                <template v-if="selectedEnterprise.categoryList && selectedEnterprise.categoryList.length">
                  <span
                    v-for="(item, i) in selectedEnterprise.categoryList"
                    :key="i"
                  >
                    {{item.secondCatName}}<template v-if="i < selectedEnterprise.categoryList.length - 1">、</template>
                  </span>
                </template>
              </div>
              <div>
                <span>销量：{{selectedEnterprise.goodsSaleCount || 0}}</span>
                <span class="goods-stock">商品数：{{selectedEnterprise.goodsCount || 0}}</span>
              </div>
            </div>
          </div>
        </template>
        <!-- 选择内容 -->
        <template v-if="form.linkType == 3">
          <el-button
            type="primary"
            class="btn select-btn"
            v-if="!form.linkTypeId || !Object.keys(selectedContent).length"
            @click="openContentDialog"
          >选择内容</el-button>
          <div
            class="selected-goods"
            v-if="form.linkTypeId && Object.keys(selectedContent).length"
          >
            <i
              class="el-icon-edit-outline goods-edit"
              @click="openContentDialog"
            ></i>
            <img :src="selectedContent.thumbnail" />
            <div class="goods-info">
              <div class="goods-name">{{selectedContent.title}}</div>
              <div class="main-content">{{selectedContent.brief}}</div>
              <div>
                <span class="column-name">{{selectedContent.columnName}}</span>
                <span class="like-num">喜欢数：{{selectedContent.likeNumber || 0}}</span>
              </div>
            </div>
          </div>
        </template>

        <!-- 选择自媒体 -->
        <template v-if="form.linkType == 4">
          <el-button
            type="primary"
            class="btn select-btn"
            v-if="!form.linkTypeId"
            @click="openWeMediaDialog"
          >选择自媒体</el-button>
          <div
            class="selected-goods"
            v-if="form.linkTypeId && Object.keys(selectedWeMedia).length"
          >
            <i
              class="el-icon-edit-outline goods-edit"
              @click="openWeMediaDialog"
            ></i>
            <img :src="selectedWeMedia.userLogo" />
            <div class="goods-info">
              <div class="goods-name">{{selectedWeMedia.name}}</div>
              <div class="main-content">{{selectedWeMedia.jewelryContentNumber || 0}}条内容</div>
            </div>
          </div>
        </template>
      </el-form-item>

      <!-- 外部链接 -->
      <template v-if="form.linkType == 5">
        <el-form-item
          label="PC端地址"
          prop="pcUrl"
        >
          <el-input
            style="width: 600px;"
            :disabled="checkedPcUrl"
            v-model="form.pcUrl"
            placeholder="请输入链接地址，链接地址需加上“http://或https://”"
          ></el-input>
          <el-checkbox v-model="checkedPcUrl">无</el-checkbox>
        </el-form-item>
        <el-form-item
          label="移动端地址"
          prop="mobileUrl"
        >
          <el-input
            style="width: 600px;"
            :disabled="checkedMobileUrl"
            v-model="form.mobileUrl"
            placeholder="请输入链接地址，链接地址需加上“http://或https://”"
          ></el-input>
          <el-checkbox v-model="checkedMobileUrl">无</el-checkbox>
        </el-form-item>
      </template>
      <el-form-item
        label="排序"
        prop="sortOrder"
      >
        <el-input
          type="number"
          placeholder="请输入序号，1表示排在第1位"
          v-model.number="form.sortOrder"
        > </el-input>
      </el-form-item>
      <el-form-item
        label="是否启用"
        prop="usedStatus"
      >
        <el-radio-group v-model="form.usedStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="update('form')"
        >确 定</el-button>
      </el-form-item>
    </el-form>
    <goods-dialog
      ref="goodsDialog"
      @selectGoods="selectGoods"
    ></goods-dialog>
    <enterprise-dialog
      ref="enterpriseDialog"
      @selectEnterprise="selectEnterprise"
    ></enterprise-dialog>
    <content-dialog
      ref="contentDialog"
      @selectContent="selectContent"
    ></content-dialog>

    <we-media-dialog
      ref="weMediaDialog"
      @selectWeMedia="selectWeMedia"
    ></we-media-dialog>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import { getAdvertising, saveOrUpdateAdvertising } from '@/api/dm/homeSettings'
import { getCompaniesByName } from '@/api/public/system'
import { jewelryColumnList, associatedGoodsList, jewelryContentList } from '@/api/public/jewelryRing'
import { getWeMedia } from '@/api/public/merchant'
import goodsDialog from './chooseGoods'
import enterpriseDialog from './chooseEnterprise'
import contentDialog from './chooseContent'
import weMediaDialog from './chooseWeMedia'
import Cookies from 'js-cookie'

export default {
  components: {
    ImageCropper,
    goodsDialog,
    enterpriseDialog,
    contentDialog,
    weMediaDialog
  },
  data() {
    return {
      prefix: 'banner',
      cropShow: false,
      mobileCropShow: false,
      loading: false,
      PorM: 2,
      form: {
        id: undefined,
        name: '',
        location: '',
        pcUrl: '',
        mobileUrl: '',
        pcPicture: '',
        picture: '',
        usedStatus: 1,
        sortOrder: '',
        linkType: 1,
        linkTypeId: ''
      },
      selectedGoods: {},
      selectedEnterprise: {},
      selectedContent: {},
      selectedWeMedia: {},
      checkedPcUrl: false,
      checkedMobileUrl: false,
      locationList: [],
      linkTypeList: [
        {
          value: 1,
          label: '商品'
        }, {
          value: 2,
          label: '店铺'
        }, {
          value: 3,
          label: '内容'
        }, {
          value: 4,
          label: '自媒体主页'
        }, {
          value: 5,
          label: '外部链接'
        }
      ],
      rules: {
        pcUrl: [
          { message: '请输入链接地址', trigger: 'blur' },
          { pattern: /^(https?:\/\/(([a-zA-Z0-9]+-?)+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/, message: '请输入正确的链接地址' }
        ],
        mobileUrl: [
          { message: '请输入移动端链接地址', trigger: 'blur' }
          // { pattern: /^(https?:\/\/(([a-zA-Z0-9]+-?)+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/, message: '请输入正确的移动端链接地址' }
        ],
        pcPicture: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        picture: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择链接类型', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入banner名称', trigger: 'blur' }
        ],
        location: [
          { required: true, message: '请选择banner类别', trigger: 'blur' }
        ],
        linkType: [
          { required: true, message: '请选择banner类别', trigger: 'blur' }
        ],
        usedStatus: [
          { required: true, message: '请选择是否启用', trigger: 'change' }
        ],
        sortOrder: [
          { validator: this.validateSort, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      this.form.id = this.$route.query.id
      getAdvertising(this.form.id).then(data => {
        this.form = data.data
        if (this.form.linkType === 1) {
          associatedGoodsList({ contentId: this.form.linkTypeId }).then(data => {
            this.selectedGoods = data.data.records.length === 0 ? {} : data.data.records[0]
          })
        } else if (this.form.linkType === 2) {
          getCompaniesByName({ id: this.form.linkTypeId }).then(data => {
            this.selectedEnterprise = data.data.records.length === 0 ? {} : data.data.records[0]
          })
        } else if (this.form.linkType === 3) {
          jewelryContentList({ id: this.form.linkTypeId, userType: Cookies.get('userType') }, 0).then(data => {
            this.selectedContent = data.data.records.length === 0 ? {} : data.data.records[0]
          })
        } else if (this.form.linkType === 4) {
          getWeMedia({ id: this.form.linkTypeId }).then(data => {
            this.selectedWeMedia = data.data
          })
        }
      })
    }
    /* if (this.$route.query.data) {
      this.form = JSON.parse(this.$route.query.data)

    } */
    jewelryColumnList({ offset: 1, limit: 999 }).then(data => {
      const jewelryColumnList = []
      data.data.records.map(item => {
        jewelryColumnList.push({
          value: Number(item.id),
          label: item.columnName
        })
      })
      this.locationList = this.locationList.concat(jewelryColumnList)
      this.locationList = this.locationList.filter(function (obj) {
        return obj.value !== 1000
      })
      console.log(this.locationList)
    })
  },
  watch: {
    'checkedPcUrl': function (newValue, oldValue) {
      if (newValue) {
        this.form.pcUrl = ''
      }
    },
    'checkedMobileUrl': function (newValue, oldValue) {
      if (newValue) {
        this.form.mobileUrl = ''
      }
    }
  },
  methods: {
    changeLinkType() {
      this.form.linkTypeId = ''
    },
    // 选择商品弹框
    openGoodsDialog() {
      this.$refs.goodsDialog.dialogTableVisible = true
      this.$refs.goodsDialog.getList()
    },
    selectGoods(selectedObj) {
      this.form.linkTypeId = selectedObj.id
      this.selectedGoods = selectedObj
    },
    // 选择店铺弹框
    openEnterpriseDialog() {
      this.$refs.enterpriseDialog.dialogTableVisible = true
      this.$refs.enterpriseDialog.getList()
    },
    selectEnterprise(selectedObj) {
      this.form.linkTypeId = selectedObj.id
      this.selectedEnterprise = selectedObj
    },
    // 选择内容弹框
    openContentDialog() {
      this.$refs.contentDialog.dialogTableVisible = true
      this.$refs.contentDialog.getList()
    },
    selectContent(selectedObj) {
      this.form.linkTypeId = selectedObj.id
      this.selectedContent = selectedObj
    },
    // 选择自媒体弹框
    openWeMediaDialog() {
      this.$refs.weMediaDialog.dialogTableVisible = true
      this.$refs.weMediaDialog.getList()
    },
    selectWeMedia(selectedObj) {
      this.form.linkTypeId = selectedObj.id
      this.selectedWeMedia = selectedObj
    },
    resetForm(formName, cb) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
        setTimeout(() => { cb && cb() })
      })
    },
    cancel() {
      this.$router.go(-1)
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          saveOrUpdateAdvertising(this.form).then(() => {
            this.loading = false
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            // this.$router.push({ name: 'banner' })
            this.$router.go(-1)
          })
        } else {
          return false
        }
      })
    },
    uploadSuccess(key) {
      if (this.PorM === 1) {
        this.form.pcPicture = key
        this.cropShow = false
      } else {
        this.form.picture = key
        this.mobileCropShow = false
      }
      this.$refs.cropper.setStep(1)
    },
    validateSort(rule, value, callback) {
      if (value === '') {
        return callback(new Error('此项不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入1-100的整数'))
        } else {
          if (value < 1 || value > 100) {
            callback(new Error('请输入1-100的整数'))
          } else {
            callback()
          }
        }
      }, 200)
    }
  }
}
</script>

<style scoped lang="scss">
.dateInput {
  display: inline-block;
}
.tip {
  /* margin-left: 20px; */
  font-size: 12px;
  color: #999;
}
/* 已选择商品 */
.selected-goods {
  position: relative;
  background: #f2f2f2;
  width: 420px;
  overflow: hidden;
  padding: 10px 20px 10px 10px;
  & .goods-edit {
    position: absolute;
    right: 12px;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    &:hover {
      color: #409eff;
    }
  }
  & img {
    float: left;
    width: 100px;
    margin-top: 4px;
  }
  & .goods-info {
    margin-left: 120px;
    color: #666666;
  }
  & .goods-name {
    width: 260px;
    font-size: 18px;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .goods-brand {
    background: #f38d45;
    color: #fff;
    padding: 2px 5px;
  }
  & .goods-catgory {
    background: #b9b5b2;
    color: #fff;
    padding: 2px 5px;
  }
  & .main-categories {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .goods-price {
    color: red;
    font-weight: bold;
  }
  & .goods-stock {
    color: #666;
    margin-left: 20px;
  }
  & .column-name {
    background: #b9b5b2;
    color: #fff;
    padding: 2px 5px;
  }
  & .main-content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.3;
  }
}
</style>

