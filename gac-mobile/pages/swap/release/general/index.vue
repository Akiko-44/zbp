<template>
  <AppView class="Release">
    <Validator :model="form" :rules="rules" ref="validator">
      <van-cell-group>
        <van-field
          v-model.trim="form.goodsName"
          label="商品名称"
          type="input"
          placeholder="请输入商品名称"
          required
        />

        <van-cell
          title="商品分类"
          :value="categoryText"
          required
          is-link
          @click="$refs.categoryCascader.show = true"
        />

        <van-cell
          title="商品品牌"
          :value="brandText"
          required
          is-link
          @click="brandPickerShow = true"
        />

        <van-cell
          title="新旧程度"
          :value="finenessText"
          required
          is-link
          @click="finenessPickerShow = true"
        />

        <van-field
          v-model.number="form.marketPrice"
          label="原价"
          type="number"
          placeholder="请输入原价"
          required
        />

        <van-field
          v-model.number="form.price"
          :label="priceFieldName"
          type="number"
          :placeholder="'请输入' + priceFieldName"
          required
        />

        <van-field
          v-model.number="form.freightPrice"
          label="运费"
          type="number"
          placeholder="请输入运费"
          required
        />

        <van-field
          v-if="type === 1"
          v-model.trim="form.swapRemark"
          label="互换需求"
          type="textarea"
          placeholder="请输入互换需求"
          rows="1"
          autosize
          required
        />

        <!-- <van-field
          v-model.number="message"
          label="库存数量"
          type="input"
          placeholder="请输入库存数量"
          required
        /> -->

        <van-cell required>
          <template slot="title">
            <div class="upload-title">商品图片</div>
            <VUpload
              ref="picUploader"
              :imgs="form.imgs"
              :props="{src: 'imgUrl'}"
              :extend-fields="[{imgType: 2}]"
              @success="img => { img.imgType = form.imgs.length <= 1 ? 1 : 2 }"
            >
              <div
                v-if="item.imgType !== 1"
                @click="setCover(item)"
                class="upload-item-cover"
                slot="item"
                slot-scope="{ item }"
              >
                设为封面
              </div>
            </VUpload>
          </template>
        </van-cell>

        <van-cell required v-if="form.hsMark">
          <template slot="title">
            <div class="upload-title">鉴定证书</div>
            <VUpload
              ref="hsMarkUploader"
              :limit="1"
              :imgs="form.hsMark.hsMarkUrl ? [{src: form.hsMark.hsMarkUrl, progress: 100}] : []"
              @success="img => form.hsMark.hsMarkUrl = img.src"
              @remove="form.hsMark.hsMarkUrl = ''"
            />
          </template>
        </van-cell>

        <van-field
          v-model.trim="form.goodsDesc"
          label="商品描述"
          type="textarea"
          placeholder="请输入商品描述"
          rows="1"
          autosize
          required
        />
      </van-cell-group>
    </Validator>

    <van-popup v-model="finenessPickerShow" position="bottom">
      <van-picker
        class="picker"
        :columns="fineness"
        show-toolbar
        @cancel="finenessPickerShow = false"
        @confirm="finenessConfirm"
      />
    </van-popup>

    <van-popup v-model="brandPickerShow" position="bottom">
      <van-picker
        class="picker"
        :columns="brands"
        show-toolbar
        @cancel="brandPickerShow = false"
        @confirm="brandConfirm"
        value-key="brandName"
      />
    </van-popup>

    <Cascader
      :options="categories"
      v-model="form.categoryId"
      @confirm="categoryConfirm"
      :props="{value: 'id', label: 'catName'}"
      ref="categoryCascader"
    />

    <div class="actions">
      <van-button
        :loading="releasing"
        @click="release"
        class="primary-btn fixed-btn"
        type="primary"
      >
        立即发布
      </van-button>
    </div>
  </AppView>
</template>

<script>
import VUpload from '~/components/common/upload'
import Validator from '~/components/common/validator'
import Cascader from '~/components/common/cascader'
import { finenessState } from '~/utils/status'

export default {
  components: {
    VUpload,
    Validator,
    Cascader
  },
  data () {
    const type = +this.$route.query.type
    const text = {
      title: ['', '互换', '销售'],
      priceName: ['', '期望价格', '销售价']
    }
    const title = text.title[type]
    const priceFieldName = text.priceName[type]
    const rules = {
      goodsName: [{ required: true, message: '请输入商品名称' }],
      brandId: [{ required: true, message: '请选择商品品牌' }],
      deprecition: [{ required: true, message: '请选择新旧程度' }],
      marketPrice: [{ required: true, message: '请输入原价' }],
      price: [{ required: true, message: `请输入${priceFieldName}` }],
      imgs: [{ required: true, message: '请上传图片' }],
      freightPrice: [{ required: true, message: '请输入运费' }],
      goodsDesc: [{ required: true, message: '请输入商品描述' }],
      'hsMark.hsMarkUrl': [{ required: true, message: '请上传鉴定证书' }]
    }
    if (type === 1) rules.swapRemark = [{ required: true, message: '请输入互换需求' }]
    return {
      type,
      title,
      priceFieldName,
      rules,
      complete: false,
      releasing: false,
      form: {
        id: undefined,
        swapble: type === 2 ? undefined : 1,
        goodsName: '',
        brandId: '',
        categoryId: '',
        deprecition: '',
        marketPrice: '',
        price: '',
        freightPrice: '',
        swapRemark: '',
        goodsDesc: '',
        imgs: [],
        hsMark: {
          hsMarkName: '中宝平',
          hsMarkUrl: ''
        },
        src: 2
      },
      finenessPickerShow: false,
      finenessText: '',
      brandPickerShow: false,
      brandText: '',
      categoryText: ''
    }
  },
  computed: {
    fineness () {
      return Object.keys(finenessState).map(key => {
        return {
          text: finenessState[key],
          value: +key
        }
      })
    },
    brands () {
      return this.$store.state.data.swapBrands
    },
    categories () {
      return this.$store.state.data.swapCategories
    }
  },
  beforeMount () {
    this.$store.dispatch('data/get', {
      name: 'swapCategories',
      service: this.$service('swapCategories')
    })
    this.$store.dispatch('data/get', {
      name: 'swapBrands',
      service: this.$service('swapBrands')
    })
  },
  activated () {
    const id = this.$route.query.id
    if (id) {
      this.$loading(this.$service('swapUserSaleDetail', {resources: [id]}))
        .then(result => {
          const data = result.data
          const form = {}
          Object.keys(data).forEach(key => {
            if (this.form.hasOwnProperty(key)) {
              form[key] = data[key]
            }
          })
          form.goodsDesc = form.goodsDesc.goodsDesc
          form.swapble = this.type === 2 ? undefined : 1
          this.form = form
          this.categoryText = data.categoryName
          this.brandText = data.brandName
          this.finenessText = finenessState[data.deprecition]
        })
    }
  },
  beforeRouteLeave (to, from, next) {
    if (!this.complete) {
      this.$dialog.confirm({
        message: '是否放弃当前的发布？',
        beforeClose (action, done) {
          if (action === 'confirm') {
            next()
          }
          done()
        }
      })
      next(false)
    } else {
      next()
    }
  },
  methods: {
    check () {
      const picUploader = this.$refs.picUploader
      const hsMarkUploader = this.$refs.hsMarkUploader
      const validator = this.$refs.validator
      return (
        hsMarkUploader.check() &&
        picUploader.check() &&
        validator.checkAll(errors => this.$toast(errors[0]))
      )
    },
    release () {
      if (this.check()) {
        this.releasing = true
        this.$service('swapSaleGoodsSave', { data: this.form })
          .then(() => {
            this.releasing = false
            this.success(`您的${this.title}信息已发布成功，系统会在2个工作日内进行审核！`)
          })
          .catch(() => { this.releasing = false })
      }
    },
    success (message) {
      const self = this
      this.complete = true
      this.$dialog.confirm({
        message,
        cancelButtonText: '立即查看',
        confirmButtonText: '返回继续发布',
        beforeClose (action, done) {
          if (action === 'cancel') {
            // 立即查看
            const name = this.type === 1 ? 'swap-mine-info-exchange' : 'swap-mine-info-sales'
            self.$router.push({name})
          } else {
          // 返回继续发布
            self.$router.go(-1)
          }
          done()
        }
      })
    },
    finenessConfirm (item) {
      this.form.deprecition = item.value
      this.finenessText = item.text
      this.finenessPickerShow = false
    },
    brandConfirm (item) {
      this.form.brandId = item.id
      this.brandText = item.brandName
      this.brandPickerShow = false
    },
    categoryConfirm (items) {
      const item = items[items.length - 1]
      this.form.categoryId = item.id
      this.categoryText = item.catName
    },
    setCover (curImg) {
      const imgs = this.$refs.picUploader.imgs
      const index = imgs.indexOf(curImg)

      imgs.forEach((img, i) => {
        img.imgType = index === i ? 1 : 2
      })
    }
  }
}
</script>

<style lang="postcss">
.Release {
  & .upload-title {
    margin-bottom: 5px;
  }
  & .van-field__control {
    line-height: inherit;
  }
  & .actions {
    height: 100px;
  }
  & .upload-item-cover {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 5;
  }
}
</style>
