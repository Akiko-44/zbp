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
        label="主题"
        prop="name"
      >
        <span v-if="type">{{form.name}}</span>
        <el-input
          v-else
          v-model.trim="form.name"
          placeholder="请输入开屏广告主题名称"
        ></el-input>
      </el-form-item>

      <!-- <el-form-item
        label="类型"
        prop="category"
      >
        <span v-if="type">{{form.name}}</span>
        <el-radio-group
          v-else
          v-model="form.category"
          @change="categoryChangeHandler"
        >
          <el-radio
            v-for="item in typeList"
            :key="item.id"
            :label="item.id"
          >{{item.menu}}</el-radio>
        </el-radio-group>
      </el-form-item> -->

      <el-form-item
        label="上传图片"
        prop="mobilePicture"
        v-if="form.category == 1"
      >
        <!-- <img
          width="375"
          v-if="type"
          :src="form.mobilePicture"
        />  v-else-->
        <template>
          <el-card
            v-if="form.mobilePicture"
            style="width:250px;"
            :body-style="{ padding: '0px' }"
          >
            <img
              :src="form.mobilePicture"
              class="image"
              width="100%"
            >
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-button
                  type="text"
                  class="button"
                  v-if="!type"
                  @click="$delete(form, 'mobilePicture')"
                >删除</el-button>
              </div>
            </div>
          </el-card>
          <ImageUpload
            v-else
            :multiple="false"
            :limit="1"
            @successCBK="uploadSuccess"
            tips="1张，大小5M以内，支持jpg/jpeg/png/gif格式"
          />
          <!--
          <el-button
            v-else
            @click="cropShow = true"
            type="primary"
          >上传</el-button>
          <ImageCropper
            ref="cropper"
            v-model="cropShow"
            :noCircle="true"
            :noSquare="true"
            :withCredentials="true"
            imgFormat="jpg"
            :width="1125"
            :height="1698"
            :maxSize="2"
            :prefix="prefix"
            @crop-upload-success="uploadSuccess"
            tips="尺寸375*566，大小2M以内，支持jpg/jpeg/png/gif格式"
          /> -->
        </template>
      </el-form-item>

      <el-form-item
        label="上传视频"
        prop="mobilePicture"
        v-if="form.category == 2"
      >
        <video
          controls="controls"
          v-if="form.mobilePicture"
          style="width: 450px; height: 250px;"
          :src="form.mobilePicture"
        >
          您的浏览器不支持 html5 video 属性，下载视频查看：
          <el-button
            size="mini"
            type="text"
          >
            <a
              :href="form.mobilePicture"
              target="_blank"
            >下载视频</a>
          </el-button>
        </video>
        <el-button
          v-if="form.mobilePicture"
          type="text"
          @click="form.mobilePicture = ''"
        >删除视频</el-button>
        <template v-else>
          <video-upload @success="videoUploadScccess" />
        </template>
      </el-form-item>

      <el-form-item
        label="链接类型"
        prop="linkType"
      >
        <el-radio-group
          v-model="form.linkType"
          @change="changeLinkType"
          :disabled="type"
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
          >{{form.category === 3 ? '选择作品' : '选择商品'}}</el-button>
          <div
            class="selected-goods"
            v-if="form.linkTypeId && Object.keys(selectedGoods).length"
          >
            <i
              class="el-icon-edit-outline goods-edit"
              @click="openGoodsDialog"
              v-if="!type"
            ></i>
            <img :src="selectedGoods.imgUrl || selectedGoods.imageUrl" />
            <div class="goods-info">
              <div class="goods-name">{{selectedGoods.goodsName || selectedGoods.caseName}}</div>
              <div>
                <span
                  class="goods-brand"
                  v-if="selectedGoods.brandName"
                >{{selectedGoods.brandName}}</span>
                <span
                  class="goods-brand"
                  v-if="selectedGoods.tag"
                >{{selectedGoods.tag}}</span>
                <span
                  class="goods-catgory"
                  v-if="selectedGoods.categoryName"
                >{{selectedGoods.categoryName}}</span>
                <span
                  class="goods-catgory"
                  v-if="selectedGoods.worksCategories"
                >{{selectedGoods.worksCategories}}</span>
              </div>
              <div v-if="form.category !== 3">
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
          >{{form.category === 3 ? '选择设计师' : '选择店铺'}}</el-button>
          <div
            class="selected-goods"
            v-if="form.linkTypeId && Object.keys(selectedEnterprise).length"
          >
            <i
              class="el-icon-edit-outline goods-edit"
              @click="openEnterpriseDialog"
              v-if="!type"
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
              v-if="!type"
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
              v-if="!type"
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
          label="移动端地址"
          prop="mobileUrl"
        >
          <el-input
            style="width: 600px;"
            :disabled="checkedMobileUrl || type"
            v-model="form.mobileUrl"
            placeholder="请输入链接地址，链接地址需加上“http://或https://”"
          ></el-input>
          <el-checkbox
            v-model="checkedMobileUrl"
            :disabled="type"
          >无</el-checkbox>
        </el-form-item>
      </template>
      <el-form-item
        label="有效期"
        prop="showStartDate"
      >
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          start-placeholder="开始"
          end-placeholder="结束"
          style="width:380px"
          v-model="createTime"
          @change="timeHandler"
          :disabled="type"
        ></el-date-picker>
        <div class="tip">（不同开屏页的有效时间不可重叠）</div>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancel('form')">返 回</el-button>
        <el-button
          v-if="!type"
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
import ImageUpload from '@/components/Upload'
import VideoUpload from '@/components/VideoUpload'
import { getCompaniesByName, openingPageDetail, saveOrUpdateOpeningPage } from '@/api/public/system'
import { jewelryColumnList, associatedGoodsList, jewelryContentList } from '@/api/public/jewelryRing'
import { designWork } from '@/api/public/dm'
import { getWeMedia } from '@/api/public/merchant'
import goodsDialog from '@/components/app/chooseLink/chooseGoods'
import enterpriseDialog from '@/components/app/chooseLink/chooseEnterprise'
import contentDialog from '@/components/app/chooseLink/chooseContent'
import weMediaDialog from '@/components/app/chooseLink/chooseWeMedia'
import Cookies from 'js-cookie'

export default {
  components: {
    ImageCropper,
    ImageUpload,
    VideoUpload,
    goodsDialog,
    enterpriseDialog,
    contentDialog,
    weMediaDialog
  },
  data() {
    return {
      prefix: 'advertisement',
      cropShow: false,
      loading: false,
      type: false,
      form: {
        id: undefined,
        name: '',
        mobilePicture: '',
        category: 1,
        mobileUrl: '',
        linkType: 1,
        linkTypeId: '',
        showStartDate: '',
        showEndDate: ''
      },
      createTime: [],
      selectedGoods: {},
      selectedEnterprise: {},
      selectedContent: {},
      selectedWeMedia: {},
      checkedMobileUrl: false,
      typeList: [
        {
          id: 1,
          menu: '图文'
        },
        {
          id: 2,
          menu: '视频'
        }
      ],
      categoryList: [
        {
          value: 1,
          label: '首页'
        }, {
          value: 2,
          label: '去哪儿买'
        }, {
          value: 3,
          label: '寻代工'
        }, {
          value: 4,
          label: '找设计师'
        }
      ],
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
        mobileUrl: [
          { message: '请输入移动端链接地址', trigger: 'blur' },
          { pattern: /^(https?:\/\/(([a-zA-Z0-9]+-?)+\.)+[a-zA-Z0-9]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/, message: '请输入正确的链接地址' }
        ],
        mobilePicture: [
          { required: true, message: '请上传图片或视频', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入广告名称', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择广告类别', trigger: 'blur' }
        ],
        linkType: [
          { required: true, message: '请选择链接类型', trigger: 'blur' }
        ],
        showStartDate: [
          { required: true, message: '请选择有效期', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    if (this.$route.query.type) {
      this.type = true
    }
    if (this.$route.query.id) {
      openingPageDetail({ id: this.$route.query.id }).then(data => {
        this.form = data.data
        this.createTime = [this.form.showStartDate, this.form.showEndDate]
        if (this.form.category === 3) {
          this.linkTypeList = [
            {
              value: 1,
              label: '作品'
            }, {
              value: 2,
              label: '设计师'
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
          ]
        }
        if (this.form.linkType === 1) {
          if (this.form.category === 3) {
            designWork({ id: this.form.linkTypeId }).then(data => {
              this.selectedGoods = data.data.records.length === 0 ? {} : data.data.records[0]
            })
          } else {
            associatedGoodsList({ contentId: this.form.linkTypeId }).then(data => {
              this.selectedGoods = data.data.records.length === 0 ? {} : data.data.records[0]
            })
          }
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
        } else {
          this.checkedMobileUrl = !this.form.mobileUrl
        }
      })
    }
    jewelryColumnList({ offset: 1, limit: 999 }).then(data => {
      const jewelryColumnList = []
      data.data.records.map(item => {
        jewelryColumnList.push({
          value: Number(item.id),
          label: item.columnName
        })
      })
      this.categoryList = this.categoryList.concat(jewelryColumnList)
      this.categoryList = this.categoryList.filter(function (obj) {
        return obj.value !== '1000'
      })
    })
  },
  watch: {
    'checkedMobileUrl': function (newValue, oldValue) {
      if (newValue) {
        this.form.mobileUrl = ''
      }
    }
  },
  methods: {
    categoryChangeHandler() {
      this.form.mobilePicture = ''
    },
    changeLinkType() {
      this.form.linkTypeId = ''
    },
    timeHandler(value) {
      this.createTime = value
      if (this.createTime && this.createTime.length) {
        this.form.showStartDate = this.createTime.length ? this.createTime[0] : ''
        this.form.showEndDate = this.createTime.length ? this.createTime[1] : ''
      }
    },
    // 选择商品弹框
    openGoodsDialog() {
      this.$refs.goodsDialog.dialogTableVisible = true
      this.$refs.goodsDialog.getList(this.form.category)
    },
    selectGoods(selectedObj) {
      this.form.linkTypeId = selectedObj.id
      this.selectedGoods = selectedObj
    },
    // 选择店铺弹框
    openEnterpriseDialog() {
      this.$refs.enterpriseDialog.dialogTableVisible = true
      this.$refs.enterpriseDialog.getList(this.form.category)
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
          saveOrUpdateOpeningPage(this.form).then(() => {
            this.loading = false
            this.$notify({
              title: '成功',
              message: '保存成功',
              type: 'success',
              duration: 2000
            })
            this.$router.go(-1)
          })
        } else {
          return false
        }
      })
    },
    uploadSuccess(imgs) {
      // 处理图片上传成功视图不更新
      this.$delete(this.form, 'mobilePicture')
      this.$set(this.form, 'mobilePicture', imgs[0])
      // this.cropShow = false
      // this.$refs.cropper.setStep(1)
    },
    videoUploadScccess(key) {
      this.form.mobilePicture = key
      console.log('video', this.form.mobilePicture)
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

