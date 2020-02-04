<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <el-form
      :model="contentForm"
      :rules="rules"
      ref="contentForm"
      label-width="110px"
    >

      <el-form-item
        label="标题"
        prop="title"
      >
        <el-input
          v-model="contentForm.title"
          :maxlength="60"
          placeholder="请输入标题，60字以内"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item
        label="内容来源"
        prop="contentSource"
      >
        <el-input
          v-model="contentForm.contentSource"
          :maxlength="20"
          placeholder="请输入内容来源，20字以内"
        ></el-input>
      </el-form-item> -->

      <el-form-item label="关键字">
        <el-input
          v-model="contentForm.keyword"
          :maxlength="10"
          placeholder="请输入关键字，用/隔开，最多输入10个字"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="简介"
        prop="brief"
      >
        <el-input
          v-model="contentForm.brief"
          type="textarea"
          :maxlength="200"
          :rows="3"
          placeholder="请输入简介，200字以内"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="所属栏目"
        prop="columnId"
      >
        <el-radio-group v-model="contentForm.columnId">
          <el-radio
            v-for="item in columnList"
            :key="item.id"
            :label="item.id"
          >{{item.columnName}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- <el-form-item label="所属标签">
        <el-radio-group v-model="contentForm.labelId">
          <el-radio
            v-for="item in labelList"
            :key="item.id"
            :label="item.id"
          >{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item> -->

      <el-form-item
        label="类型"
        prop="type"
      >
        <el-radio-group
          v-model="contentForm.type"
          @change="typeChangeHandler"
        >
          <el-radio
            v-for="item in typeList"
            :key="item.id"
            :label="item.id"
          >{{item.menu}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="缩略图"
        prop="thumbnail"
        v-if="contentForm.type == 1"
      >
        <el-card
          v-if="contentForm.thumbnail"
          style="width:250px;"
          :body-style="{ padding: '0px' }"
        >
          <img
            :src="contentForm.thumbnail"
            class="image"
            width="100%"
          >
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-button
                type="text"
                class="button"
                @click="contentForm.thumbnail = ''"
              >删除</el-button>
            </div>
          </div>
        </el-card>
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
          :width="500"
          :height="500"
          :prefix="prefix"
          @crop-upload-success="uploadSuccess"
        />
      </el-form-item>

      <el-form-item
        label="正文内容"
        prop="content"
        v-if="contentForm.type == 1"
      >
        <Tinymce
          :height="500"
          ref="editor"
          v-model="contentForm.content"
        ></Tinymce>
      </el-form-item>

      <el-form-item
        label="上传视频"
        prop="content"
        v-if="contentForm.type == 2"
      >
        <video
          controls="controls"
          v-if="contentForm.content"
          style="width: 450px; height: 250px;"
          :src="contentForm.content"
        >
          您的浏览器不支持 html5 video 属性，下载视频查看：
          <el-button
            size="mini"
            type="text"
          >
            <a
              :href="contentForm.content"
              target="_blank"
            >下载视频</a>
          </el-button>
        </video>
        <el-button
          v-if="contentForm.content"
          type="text"
          @click="contentForm.content = ''"
        >删除视频</el-button>
        <template v-else>
          <video-upload
            @success="videoUploadScccess"
            :tips="tips"
          />
        </template>
      </el-form-item>

      <el-form-item
        label="是否允许评论"
        prop="allowComment"
      >
        <el-radio-group v-model="contentForm.allowComment">
          <el-radio
            v-for="item in allowCommentList"
            :key="item.id"
            :label="item.id"
          >{{item.menu}}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="推荐"
        prop="recommendType"
      >
        <el-radio-group
          v-model="contentForm.recommendType"
          @change="recommendTypeChangeHandler"
        >
          <el-radio
            v-for="item in recommendTypeList"
            :key="item.id"
            :label="item.id"
          >{{item.menu}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 选择商品 -->
      <el-form-item v-if="contentForm.recommendType == 1">

        <el-button
          type="danger"
          plain
          class="btn select-btn"
          v-if="contentForm.type == 1 && contentForm.contentToGoodsDTOS.length < 5"
          @click="openGoodsDialog"
        >选择商品</el-button>
        <el-button
          type="danger"
          plain
          class="btn select-btn"
          v-else-if="contentForm.type == 2 && contentForm.contentToGoodsDTOS.length < 1"
          @click="openGoodsDialog"
        >选择商品</el-button>
        <span
          style="color:#f56c6c;"
          v-if="contentForm.type == 1"
        >最多可以添加5个</span>
        <span
          style="color:#f56c6c;"
          v-if="contentForm.type == 2"
        >最多可以添加1个</span>
        <div v-if="contentForm.contentToGoodsDTOS && contentForm.contentToGoodsDTOS.length">
          <div
            class="selected-goods"
            v-for="(item, i) in contentForm.contentToGoodsDTOS"
            :key="i"
          >
            <i
              class="el-icon-close goods-edit"
              @click="delSelectedGoods(i)"
            ></i>
            <img :src="item.imgUrl" />
            <div class="goods-info">
              <div class="goods-name">{{item.goodsName}}</div>
              <div>
                <span
                  class="goods-brand"
                  v-if="item.brandName"
                >{{item.brandName}}</span>
                <span
                  class="goods-catgory"
                  v-if="item.categoryName"
                >{{item.categoryName}}</span>
              </div>
              <div>
                <span class="goods-price">￥{{item.lowPrice}}~￥{{item.highPrice}}</span>
                <span class="goods-stock">库存：{{item.stockNum}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>

      <!-- 选择店铺 -->
      <el-form-item v-if="contentForm.recommendType == 2">

        <el-button
          type="danger"
          plain
          class="btn select-btn"
          v-if="contentForm.type == 1 && contentForm.contentToMerchantDTOS.length < 5"
          @click="openEnterpriseDialog"
        >选择店铺</el-button>
        <el-button
          type="danger"
          plain
          class="btn select-btn"
          v-else-if="contentForm.type == 2 && contentForm.contentToMerchantDTOS.length < 1"
          @click="openEnterpriseDialog"
        >选择店铺</el-button>
        <span
          style="color:#f56c6c;"
          v-if="contentForm.type == 1"
        >最多可以添加5个</span>
        <span
          style="color:#f56c6c;"
          v-if="contentForm.type == 2"
        >最多可以添加1个</span>
        <div v-if="contentForm.contentToMerchantDTOS && contentForm.contentToMerchantDTOS.length">
          <div
            class="selected-goods"
            v-for="(item, i) in contentForm.contentToMerchantDTOS"
            :key="i"
          >
            <i
              class="el-icon-close goods-edit"
              @click="delSelectedEnterprise(i)"
            ></i>
            <img :src="item.logo" />
            <div class="goods-info">
              <div class="goods-name">{{item.name}}</div>
              <div class="main-categories">
                主营：
                <template v-if="item.categoryList && item.categoryList.length">
                  <span
                    v-for="(citem, ci) in item.categoryList"
                    :key="ci"
                  >
                    {{citem.secondCatName}}
                    <template v-if="ci < item.categoryList.length - 1">、</template>
                  </span>
                </template>
              </div>
              <div>
                <span>销量：{{item.goodsSaleCount || 0}}</span>
                <span class="goods-stock">商品数：{{item.goodsCount || 0}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-form-item>

      <!-- 添加外链 -->
      <el-form-item v-if="contentForm.recommendType == 3">
        <el-button
          type="danger"
          plain
          class="btn select-btn"
          v-if="contentForm.type == 1 && contentForm.contentToExternalLinks.length < 5"
          @click="openExternalLinkDialog"
        >添加外链</el-button>
        <el-button
          type="danger"
          plain
          class="btn select-btn"
          v-else-if="contentForm.type == 2 && contentForm.contentToExternalLinks.length < 1"
          @click="openExternalLinkDialog"
        >添加外链</el-button>
        <span
          style="color:#f56c6c;"
          v-if="contentForm.type == 1"
        >最多可以添加5个</span>
        <span
          style="color:#f56c6c;"
          v-if="contentForm.type == 2"
        >最多可以添加1个</span>
        <div v-if="contentForm.contentToExternalLinks && contentForm.contentToExternalLinks.length">
          <el-table
            :data="contentForm.contentToExternalLinks"
            border
            fit
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column
              width="200px"
              align="center"
              label="名称"
            >
              <template slot-scope="{ row }">
                <span>{{row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="200px"
              align="center"
              label="移动端缩略图"
            >
              <template slot-scope="{ row }">
                <span
                  class="imgcard"
                  v-if="row.mobilePicture"
                  @click="lookImg(row.mobilePicture)"
                ><img
                    :src="row.mobilePicture"
                    title="查看大图"
                    width="180px"
                  /></span>
              </template>
            </el-table-column>
            <el-table-column
              width="200px"
              align="center"
              label="PC端缩略图"
            >
              <template slot-scope="{ row }">
                <span
                  class="imgcard"
                  v-if="row.pcPicture"
                  @click="lookImg(row.pcPicture)"
                ><img
                    :src="row.pcPicture"
                    title="查看大图"
                    width="180px"
                  /></span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="移动端链接"
            >
              <template slot-scope="{ row }">
                <span>{{row.mobileUrl}}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="PC端链接"
            >
              <template slot-scope="{ row }">
                <span>{{row.pcUrl}}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="200px"
              fixed="right"
              align="left"
              label="操作"
            >
              <template slot-scope="{ row, $index }">
                <!-- <el-button
                  class="auditBtn"
                  size="small"
                  type="primary"
                  @click="openExternalLinkDialog(JSON.stringify(row))"
                >修改</el-button> -->
                <el-button
                  class="auditBtn"
                  size="small"
                  type="warning"
                  @click="delSelectedExternalLinks($index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="save"
        >提交</el-button>
        <el-button
          type="primary"
          @click="preView"
        >预览</el-button>
        <el-button
          type="primary"
          @click="saveDraft()"
        >保存到草稿箱</el-button>
        <el-button
          type="primary"
          @click="back"
        >返回</el-button>
      </el-form-item>

    </el-form>
    <el-dialog
      :visible.sync="dialogVisible"
      width="375px"
      center
      class="preview-dialog"
    >
      <div
        class="preview-bg img"
        v-if="contentForm.type == 1"
      >
        <div class="main">
          <h3>{{contentForm.title}}</h3>
          <p>
            <!-- <span>{{contentForm.contentSource}}</span> -->
            <span>{{time | formatDate('yyyy-MM-dd hh:mm')}}</span>
          </p>
          <div class="author-info">
            <img
              :src="contentForm.authorLogo"
              width="35"
            />
            <span>{{contentForm.authorName}}</span>
            <span class="concern"><i class="el-icon-plus"></i>关注</span>
          </div>
          <div
            class="preview-content"
            v-html="contentForm.content"
          ></div>
          <div style="margin-bottom: 10px;font-size: 18px;">相关推荐</div>
          <div v-if="contentForm.contentToGoodsDTOS && contentForm.contentToGoodsDTOS.length">
            <div class="recommend-detail-img">
              <img :src="contentForm.contentToGoodsDTOS[0].imgUrl" />
              <div>
                <div class="name">{{contentForm.contentToGoodsDTOS[0].goodsName}}</div>
                <div class="sub">￥{{contentForm.contentToGoodsDTOS[0].lowPrice}}~￥{{contentForm.contentToGoodsDTOS[0].highPrice}}</div>
              </div>
            </div>
          </div>
          <div v-if="contentForm.contentToMerchantDTOS && contentForm.contentToMerchantDTOS.length">
            <div class="recommend-detail-img">
              <img :src="contentForm.contentToMerchantDTOS[0].logo" />
              <div>
                <div class="name">{{contentForm.contentToMerchantDTOS[0].name}}</div>
                <div
                  class="sub"
                  v-if="contentForm.contentToMerchantDTOS[0].categoryList && contentForm.contentToMerchantDTOS[0].categoryList.length"
                >
                  主营：<span
                    v-for="(categoryItem, categoryI) in contentForm.contentToMerchantDTOS[0].categoryList"
                    :key="categoryI"
                  >{{categoryItem.secondCatName}} </span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="contentForm.contentToExternalLinks && contentForm.contentToExternalLinks.length">
            <div
              class="recommend-detail-img"
              style="padding: 0;"
            >
              <img
                :src="contentForm.contentToExternalLinks[0].mobilePicture"
                style="width: 355px!important;height: 86px;border: 0;"
              />
            </div>
          </div>
        </div>
        <div class="footer">
          <span>
            <img src="../../../assets/image/edit.png" />说点什么...
          </span>
          <span>
            <img src="../../../assets/image/like.png" />0
          </span>
          <span>
            <img src="../../../assets/image/collect.png" />0
          </span>
          <span>
            <img src="../../../assets/image/comments.png" />0
          </span>
        </div>
      </div>
      <div
        class="preview-bg video"
        v-else
      >
        <div class="preview-content">
          <video
            id="videoDialog"
            v-if="contentForm.content && contentForm.content.includes('<s>')"
            :src="contentForm.content.match(/<span>(\S*)<\/p>/)[1]"
          ></video>
          <video
            id="videoDialog"
            v-else-if="contentForm.content"
            :src="contentForm.content"
          ></video>
        </div>
        <div class="recommend-info">
          <div class="author-info">
            <img
              :src="contentForm.authorLogo"
              width="35"
            />
            <span>{{contentForm.authorName}}</span>
            <span class="concern"><i class="el-icon-plus"></i>关注</span>
          </div>
          <div v-if="contentForm.contentToGoodsDTOS && contentForm.contentToGoodsDTOS.length">
            <div class="recommend-detail">
              <span>{{contentForm.contentToGoodsDTOS[0].goodsName}}</span>
              <span>查看详情<i class="el-icon-d-arrow-right"></i></span>
            </div>
          </div>
          <div v-if="contentForm.contentToMerchantDTOS && contentForm.contentToMerchantDTOS.length">
            <div class="recommend-detail">
              <span>{{contentForm.contentToMerchantDTOS[0].name}}</span>
              <span>查看详情<i class="el-icon-d-arrow-right"></i></span>
            </div>
          </div>
          <div v-if="contentForm.contentToExternalLinks && contentForm.contentToExternalLinks.length">
            <div class="recommend-detail">
              <span>{{contentForm.contentToExternalLinks[0].name}}</span>
              <span>查看详情<i class="el-icon-d-arrow-right"></i></span>
            </div>
          </div>
        </div>
        <div class="footer">
          <span>
            <img src="../../../assets/image/vedit.png" />说点什么...
          </span>
          <span>
            <img src="../../../assets/image/vlike.png" />0
          </span>
          <span>
            <img src="../../../assets/image/vcollect.png" />0
          </span>
          <span>
            <img src="../../../assets/image/vcomments.png" />0
          </span>
        </div>
      </div>
    </el-dialog>

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

    <goods-dialog
      ref="goodsDialog"
      @selectGoods="selectGoods"
    ></goods-dialog>
    <enterprise-dialog
      ref="enterpriseDialog"
      @selectEnterprise="selectEnterprise"
    ></enterprise-dialog>
    <external-link-dialog
      ref="externalLinkDialog"
      @selectExternalLink="selectExternalLink"
    ></external-link-dialog>
  </div>
</template>

<script>
import { jewelryContentList, jewelryColumnList, contentLabelList, updateJewelryContent } from '@/api/public/jewelryRing'
import waves from '@/directive/waves' // 水波纹指令
import Tinymce from '@/components/Tinymce'
import ImageCropper from '@/components/ImageCropper'
import VideoUpload from '@/components/VideoUpload'
import goodsDialog from './chooseGoods'
import enterpriseDialog from './chooseEnterprise'
import externalLinkDialog from './chooseExternalLink'

export default {
  directives: {
    waves
  },
  components: {
    Tinymce,
    ImageCropper,
    VideoUpload,
    goodsDialog,
    enterpriseDialog,
    externalLinkDialog
  },
  data() {
    return {
      tips: '建议大小20M以内；建议视频格式：MP4',
      dialogVisible: false,
      dialogImgVisible: false,
      fullscreen: true,
      bigImgSrc: '',
      id: this.$route.query.id,
      type: 'add',
      isDraft: this.$route.query.isDraft,
      cropShow: false,
      prefix: 'thumbnail',
      loading: false,
      time: '',
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
      allowCommentList: [
        {
          id: 1,
          menu: '是'
        },
        {
          id: 0,
          menu: '否'
        }
      ],
      recommendTypeList: [
        {
          id: '',
          menu: '暂无推荐'
        },
        {
          id: 1,
          menu: '商品'
        },
        {
          id: 2,
          menu: '店铺'
        },
        {
          id: 3,
          menu: '外链'
        }
      ],
      columnList: [],
      labelList: [],
      contentForm: {
        id: undefined,
        title: undefined,
        // contentSource: '中宝协（云平台）',
        keyword: undefined,
        brief: undefined,
        columnId: undefined,
        labelId: undefined,
        type: 1, /* 类型：1、图文，2、视频 */
        thumbnail: undefined,
        content: '',
        allowComment: 1, /* 是否允许评论：1、是，0、否  */
        recommendType: 0, /* 推荐类型：0、暂无推荐，1、商品，2、店铺，3、外链  */
        contentToGoodsDTOS: [],
        contentToMerchantDTOS: [],
        contentToExternalLinks: [],
        contentStatus: 0 /* 提交0 存草稿4 */
      },
      rules: {
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }
        ],
        /* contentSource: [
          {
            required: true,
            message: '请输入内容来源',
            trigger: 'blur'
          }
        ], */
        brief: [
          {
            required: true,
            message: '请输入简介',
            trigger: 'blur'
          }
        ],
        columnId: [
          {
            required: true,
            message: '请选择一个栏目',
            trigger: 'change' }
        ],
        type: [
          {
            required: true,
            message: '请选择一个类型',
            trigger: 'change' }
        ],
        thumbnail: [
          {
            required: true,
            message: '请上传图片',
            trigger: 'blur' }
        ],
        content: [
          {
            required: true,
            message: '请上传视频或者填写正文内容',
            trigger: 'blur'
          }
        ],
        allowComment: [
          {
            required: true,
            message: '请选择是否允许评论',
            trigger: 'change' }
        ]
      },
      editStatus: true
    }
  },
  created() {
    if (this.id) {
      jewelryContentList({ id: this.id }, this.isDraft).then(data => {
        this.contentForm = data.data.records[0]
      })
      this.type = 'update'
    }
    this.getColumnList()
    this.getLabelList()
  },
  beforeRouteLeave(to, from, next) {
    this.onbeforeunloadHandler(next)
  },
  methods: {
    typeChangeHandler() {
      this.contentForm.thumbnail = ''
      this.contentForm.content = ''
    },
    recommendTypeChangeHandler() {
      this.contentForm.contentToGoodsDTOS = []
      this.contentForm.contentToMerchantDTOS = []
      this.contentForm.contentToExternalLinks = []
    },
    // 选择商品弹框
    openGoodsDialog() {
      this.$refs.goodsDialog.dialogTableVisible = true
      this.$refs.goodsDialog.getList()
    },
    selectGoods(selectedObj) {
      if (!selectedObj) { return }
      const arr = this.contentForm.contentToGoodsDTOS.map(item => item.id)
      if (!arr.includes(selectedObj.id)) {
        this.contentForm.contentToGoodsDTOS.push(selectedObj)
      } else {
        this.$notify({
          title: '提示',
          message: '不可添加重复商品',
          type: 'warning'
        })
      }
    },
    delSelectedGoods(index) {
      this.contentForm.contentToGoodsDTOS.splice(index, 1)
    },
    // 选择店铺弹框
    openEnterpriseDialog() {
      this.$refs.enterpriseDialog.dialogTableVisible = true
      this.$refs.enterpriseDialog.getList()
    },
    selectEnterprise(selectedObj) {
      if (!selectedObj) { return }
      const arr = this.contentForm.contentToMerchantDTOS.map(item => item.id)
      if (!arr.includes(selectedObj.id)) {
        this.contentForm.contentToMerchantDTOS.push(selectedObj)
      } else {
        this.$notify({
          title: '提示',
          message: '不可添加重复店铺',
          type: 'warning'
        })
      }
    },
    delSelectedEnterprise(index) {
      this.contentForm.contentToMerchantDTOS.splice(index, 1)
    },
    // 选择外链弹框
    openExternalLinkDialog(row) {
      this.$refs.externalLinkDialog.dialogTableVisible = true
      this.$refs.externalLinkDialog.resetForm(row)
    },
    selectExternalLink(selectedObj) {
      this.contentForm.contentToExternalLinks.push(selectedObj)
    },
    delSelectedExternalLinks(index) {
      this.contentForm.contentToExternalLinks.splice(index, 1)
    },
    getColumnList() {
      jewelryColumnList().then(data => {
        this.columnList = data.data.records
        this.columnList = this.columnList.filter(function(obj) {
          return obj.id !== '1000'
        })
      })
    },
    getLabelList() {
      contentLabelList().then(data => {
        this.labelList = data.data.records
        this.labelList = [{ id: '', name: '无' }].concat(this.labelList)
      })
    },
    preView() {
      this.dialogVisible = true
      this.time = new Date()
      if (!document.querySelector('#videoDialog')) {
        return
      }
      setTimeout(() => {
        const vW = document.querySelector('#videoDialog').videoWidth
        const vH = document.querySelector('#videoDialog').videoHeight
        if (vW > vH) {
          document.querySelector('#videoDialog').style.top = '50%'
          document.querySelector('#videoDialog').style.transform = 'translateY(-50%)'
        }
      }, 100)
    },
    add() {
      this.loading = true
      this.contentForm.contentStatus = this.contentForm.contentStatus === 4 ? 4 : 0
      updateJewelryContent(this.contentForm).then(data => {
        this.editStatus = false
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        if (this.contentForm.contentStatus === 4) {
          this.$router.push({
            name: 'jccontentDraftManage'
          })
        } else {
          this.$router.push({
            name: 'jccontentManage'
          })
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    update() {
      this.loading = true
      this.contentForm.contentStatus = this.contentForm.contentStatus === 4 ? 4 : 0
      updateJewelryContent(this.contentForm).then(data => {
        this.editStatus = false
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success',
          duration: 2000
        })
        if (this.contentForm.contentStatus === 4) {
          this.$router.push({
            name: 'jccontentDraftManage'
          })
        } else {
          this.$router.push({
            name: 'jccontentManage'
          })
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    saveDraft() {
      if (!this.contentForm.title) {
        this.$notify({
          title: '提示',
          message: '存草稿时，内容标题必填',
          type: 'warning'
        })
        return
      }
      this.contentForm.contentStatus = 4
      if (this.type === 'add') {
        this.add()
      } else {
        this.update()
      }
    },
    save(isDraft) {
      const set = this.$refs
      this.contentForm.contentStatus = 0
      set.contentForm.validate(valid => {
        if (valid) {
          if (this.type === 'add') {
            this.add()
          } else {
            this.update()
          }
        } else {
          this.$notify({
            title: '警告',
            message: '请务必填写必选项',
            type: 'warning'
          })
          return false
        }
      })
    },
    reset() {
      this.$refs.contentForm.resetFields()
    },
    uploadSuccess(imgs) {
      this.contentForm.thumbnail = imgs
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    },
    videoUploadScccess(key) {
      this.contentForm.content = key
    },
    onbeforeunloadHandler(next) {
      if (this.editStatus) {
        if (window.confirm('确定要放弃当前的操作吗？')) {
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    },

    lookImg(imgSrc) {
      this.dialogImgVisible = true
      this.bigImgSrc = imgSrc
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
/* img {
  width: 100% !important;
} */
.image {
  max-width: 80%;
  max-height: 100%;
  display: block;
  margin: 10px auto 0;
}
// 预览样式
.preview-bg {
  position: relative;
  width: 375px;
  height: 667px;
  padding-bottom: 50px;
  text-align: center;
  & .main {
    height: 617px;
    padding: 0 10px;
    text-align: left;
    color: #606266;
    overflow-x: hidden;
    overflow-y: auto;
  }
  & .preview-content {
    text-align: left;
    padding: 0 10px;
    & /deep/ img {
      width: 350px !important;
      height: auto;
    }
  }
  & p {
    & img {
      width: 100% !important;
    }
  }
  & img {
    width: 350px !important;
  }
  & .recommend-info {
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;
    padding: 0 10px;
  }
  & .author-info {
    margin-bottom: 10px;
    text-align: left;
    img {
      width: 35px !important;
      vertical-align: middle;
    }
    .concern {
      float: right;
      color: #df735a;
      border: 1px solid;
      border-radius: 15px;
      padding: 0 10px;
      margin-top: 5px;
    }
  }
  & .recommend-detail {
    & span {
      display: inline-block;
      text-align: left;
      &:first-child {
        width: 240px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 18px;
      }
      &:last-child {
        vertical-align: top;
        text-align: right;
        width: 100px;
        color: #fb746e;
      }
    }
  }
  & .recommend-detail-img {
    padding: 10px;
    width: 100%;
    height: 86px;
    background: #f2f2f2;
    border-radius: 6px;
    & > img {
      float: left;
      width: 66px !important;
      border: 3px solid #fff;
    }
    & > div {
      margin-left: 76px;
      overflow: hidden;
      & .name {
        padding: 9px 0;
        font-size: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & .sub {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #fb746e;
      }
    }
  }
  & .footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    line-height: 30px;
    padding: 9px;
    display: flex;
    background: #ffffff;
    border-top: 1px solid #e5e5e5;
    & span {
      flex: 1;
      &:first-child {
        flex: 2;
        text-align: left;
        padding-left: 15px;
        width: 150px;
        color: #aaaaaa;
        background: #f2f2f2;
        border-radius: 16px;
      }
      & img {
        max-width: 17px;
        margin-right: 4px;
        vertical-align: middle;
      }
    }
  }
  &.video {
    background: #000000;
    & .preview-content {
      padding: 0;
      & video {
        position: absolute;
        width: 100%;
        height: 100%;
        max-height: 667px;
      }
    }
    & .footer {
      background: rgba(0, 0, 0, 0.5);
      & span {
        color: #fff;
        &:first-child {
          color: #fff;
          background: rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}
/* 已选择商品 */
.select-btn {
  margin: 10px;
}
.selected-goods {
  display: inline-block;
  position: relative;
  background: #f2f2f2;
  width: 420px;
  overflow: hidden;
  margin: 0 10px;
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
// 已添加外链
.imgcard {
  display: block;
  position: relative;
  width: 180px;
  line-height: 1;
  cursor: pointer;
  &::after {
    content: "查看大图";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.6);
    text-align: center;
    height: 24px;
    line-height: 24px;
  }
}
/deep/ .preview-dialog .el-dialog--center .el-dialog__body {
  padding: 25px 0 0;
}
</style>
