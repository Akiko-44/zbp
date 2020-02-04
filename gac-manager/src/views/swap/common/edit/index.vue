<template>
<div class="app-container" style="padding-right: 40px">
  <el-form :model="form" :rules="rules" ref="form" label-width="100px">

    <el-form-item label="商品名称" prop="goodsName">
      <el-input v-model="form.goodsName" placeholder="请输入商品名称"></el-input>
    </el-form-item>

    <el-form-item label="商品分类" prop="categoryId">
      <el-cascader
        :options="categories"
        v-model="selectedCategory"
        @change="handleChange"
        :props="{value: 'id', label: 'name'}"
      >
      </el-cascader>
    </el-form-item>

    <el-form-item label="商品品牌" prop="brandId">
      <el-select v-model="form.brandId" placeholder="商品品牌">
        <el-option
          v-for="item in brands"
          :key="item.id"
          :label="item.brandName"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="新旧程度" prop="deprecition">
      <el-select v-model="form.deprecition" placeholder="新旧程度">
        <el-option
          v-for="item in deprecitionStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item v-if="type === 'sales'" label="原价" prop="price">
      <el-input v-model.number="form.marketPrice" type="number" maxlength="10" placeholder="请输入期望价格"></el-input>
    </el-form-item>

    <el-form-item :label="type === 'sales' ? '销售价' : '期望价格'" prop="price">
      <el-input v-model.number="form.price" type="number" maxlength="10" placeholder="请输入期望价格"></el-input>
    </el-form-item>

    <el-form-item v-if="type === 'exchange'" label="互换需求" prop="swapRemark">
      <el-input v-model="form.swapRemark" placeholder="请简要描述您的交换需求，20个汉字以内"></el-input>
    </el-form-item>
    
    <GoodsSpec :goodsSpec="goodsSpecData" :goodsSpecTable="goodsSpecTableData" @exChange="getExChange"></GoodsSpec>
    
    <el-form-item label="商品图片" prop="imgs">
      <el-row class="row" v-show="form.imgs.length">
        <el-col class="col" :span="6" v-for="(item, index) in form.imgs" :key="index">
          <el-card :body-style="{ padding: '0px' }">
            <a target="_blank" :href="item.imgUrl | setImg" class="image" :style="getImageStyle(item)"></a>
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-tag v-if="item.imgType === 1">封面</el-tag>
                <el-button v-else type="text" @click="setCover(item)">设为封面</el-button>
                <el-button type="text" icon="el-icon-delete" @click="handleDelete(index)"></el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
       <ImageUpload
        :multiple="true"
        prefix="swap"
        @successCBK="goodsUploadSuccess"
      />
    </el-form-item>

    <el-form-item label="鉴定证书">
      <el-card v-if="form.hsMark.hsMarkUrl" style="width:250px;" :body-style="{ padding: '0px' }">
        <img :src="form.hsMark.hsMarkUrl | setImg" width="100%">
        <div style="padding: 14px;">
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="form.hsMark.hsMarkUrl = ''">删除</el-button>
          </div>
        </div>
      </el-card>
      <ImageUpload
        v-show="!form.hsMark.hsMarkUrl"
        :multiple="false"
        prefix="swap"
        @successCBK="cerUploadSuccess"
      />
    </el-form-item>

    <el-form-item label="视频介绍">
      <video controls="controls" v-if="form.videoUrl" style="width: 450px; height: 250px;" :src="domain + '/' + form.videoUrl">
          您的浏览器不支持 html5 video 属性，下载视频查看：
          <el-button
                  size="mini"
                  type="text"
          >
              <a :href="domain + '/' + form.videoUrl" target="_blank">下载视频</a>
          </el-button>
      </video>
      <el-button v-if="form.videoUrl" type="text" @click="form.videoUrl = ''">删除视频</el-button>
      <template v-else>
          <video-upload
                  @success="videoUploadScccess"
          />
      </template>
    </el-form-item>

    <el-form-item label="商品描述" prop="goodsDesc">
      <Tinymce :height="500" ref="editor" v-model="form.goodsDesc"></Tinymce>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading" @click="save">保存</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import GoodsSpec from '@/components/GoodsSpec'
import ImageUpload from '@/components/Upload'
import VideoUpload from '@/components/VideoUpload'
import Tinymce from '@/components/Tinymce'
import { domain } from '@/api/qiniu'
import { page as getBrands } from '@/api/swap/brand'
import { getObj, putObj, getGoodsDesc } from '@/api/swap/goods'
import store from '@/store'
import { deprecitionState, category } from '@/utils/mixins/swap'
import { setImg } from '@/filters'

export default {
  directives: {
    waves
  },
  computed: {
    brands() {
      return this.$store.state.data.swapBrands.records
    },
    deprecitionStatus() {
      return Object.keys(deprecitionState).map(key => {
        return { value: key, label: deprecitionState[key] }
      })
    }
  },
  data() {
    const type = this.$route.query.type
    const rules = {
      goodsName: [
        {
          required: true,
          message: '请输入商品名称',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '长度在 2 到 20 个字符',
          trigger: 'blur'
        }
      ],
      categoryId: [
        {
          required: true,
          message: '请选择商品分类',
          trigger: 'blur'
        }
      ],
      brandId: [
        {
          required: true,
          message: '请选择商品品牌',
          trigger: 'blur'
        }
      ],
      deprecition: [
        {
          required: true,
          message: '请选择新旧程度',
          trigger: 'blur'
        }
      ],
      swapRemark: [
        {
          required: true,
          message: '请输入互换需求',
          trigger: 'blur'
        }
      ],
      imgs: [
        {
          required: true,
          message: '请上传商品图片',
          trigger: 'blur'
        }
      ],
      'hsMark.hsMarkName': [
        {
          required: true,
          message: '请输入鉴定机构',
          trigger: 'blur'
        }
      ],
      'hsMark.hsMarkUrl': [
        {
          required: true,
          message: '请上传鉴定证书',
          trigger: 'blur'
        }
      ],
      goodsDesc: [
        {
          required: true,
          message: '请填写商品描述',
          trigger: 'blur'
        }
      ]
    }

    if (type === 'exchange') {
      rules.price = [
        {
          required: true,
          message: '请输入期望价格',
          trigger: 'blur'
        }
      ]
    }

    return {
      domain,
      rules,
      type,
      categories: [],
      selectedCategory: [],
      loading: false,
      form: {
        id: undefined,
        categoryId: undefined,
        goodsName: undefined,
        brandId: undefined,
        deprecition: undefined,
        price: undefined,
        swapRemark: '',
        videoUrl: '',
        imgs: [],
        hsMark: {
          hsMarkUrl: '',
          hsMarkName: 'default'
        },
        goodsDesc: '',
      },
      goodsSpecData: [],
      goodsSpecTableData: [],
      editStatus: true
    }
  },
  async beforeRouteEnter(to, from, next) {
    const queue = [
      store.dispatch('data/get', { name: 'swapBrands', service: getBrands }),
      category.get()
    ]
    if (to.query.id) {
      queue.push(getObj(to.query.id).then(data => data.data))
      queue.push(getGoodsDesc(to.query.id).then(data => data.data ? data.data.goodsDesc : ''))
    }
    const [, categories, form, goodsDesc] = await Promise.all(queue)
    next(vm => {
      setTimeout(() => {
        vm.categories = categories
        if (form) {
          vm.form = form
          vm.form.goodsDesc = goodsDesc
          if(vm.form.hsMark=='') {
            vm.form.hsMark={
              hsMarkUrl: '',
              hsMarkName: 'default'
            }
          }
          vm.selectedCategory = category.getParentId(vm.form.categoryId)
          vm.goodsSpecData = form.goodsSpecs
          vm.goodsSpecTableData = form.goodsSkus
        }
      }, 10)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.onbeforeunloadHandler(next)
  },
  watch: {
      goodsSpecData: {
        handler(curVal, oldVal) {　　　　　　　　　　　　
//          this.doExchange()　　　　　　　　　
        },
        deep: true
      }
    },
  methods: {
    getExChange(goodsSpecData,goodsSpecTableData){
      this.form.goodsSpecs = goodsSpecData
      this.form.goodsSkus = goodsSpecTableData
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
    handleDelete(index) {
      this.form.imgs.splice(index, 1)
    },
    getImageStyle(item) {
      return {
        backgroundImage: 'url(' + setImg(item.imgUrl, { w: 500 }) + ')'
      }
    },
    goodsUploadSuccess(imgs) {
      imgs.forEach(img => {
        this.form.imgs.push({ imgUrl: img.key, imgType: 2 })
      })
      if (this.form.imgs.length === 1) {
        // 设置一张为封面
        this.form.imgs[0].imgType = 1
      }
    },
    cerUploadSuccess(imgs) {
      this.form.hsMark.hsMarkUrl = imgs[0].key
    },
    videoUploadScccess(key) {
      this.form.videoUrl = key
    },
    save() {
      const set = this.$refs
      set.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.form.swapble = +this.form.swapble
          if(this.form.hsMark==''){this.form.hsMark={}}
          putObj(this.form).then(data => {
            this.editStatus = false
            this.$notify({
              title: '成功',
              message: '提交成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({ name: this.type + 'Info' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
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
    async setCover(img) {
      this.form.imgs.forEach(item => {
        if (item.imgType === 1) {
          item.imgType = 2
        }
      })
      img.imgType = 1
    },
    handleChange(data) {
      this.form.categoryId = data[data.length - 1]
    }
  },
  components: {
    ImageUpload,
    Tinymce,
    VideoUpload,
    GoodsSpec
  }
}
</script>

<style scoped>
.image{
  display: block;
  max-width: 100%;
  padding-bottom: 100%;
  height: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.row {
  position: relative;
  left: -20px;
  margin-top: 10px;
}
.col {
  margin-bottom: 20px;
  margin-left: 20px;
  max-width: 22.8%;
  max-height: 400px;
}
</style>
