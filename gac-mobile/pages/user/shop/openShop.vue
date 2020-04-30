<template>
  <AppView
    class="shop"
    :title="title"
    :clickLeft="clickLeft"
  >
    <div
      class="type"
      v-if="!success && loadData"
    >
      <validator
        :rules="rules"
        :model="form"
        ref="form"
      >
        <van-cell-group class="margin">
          <van-field
            class="van-cell--required"
            v-model="form.name"
            label="店铺名称"
            placeholder="请输入店铺名称，30字以内"
            maxlength="30"
            rows="1"
            autosize
          />
          <van-cell
            class="van-cell--required"
            title="店铺类型"
            is-link
            :value="form.type"
            @click="typePickerShow = true"
          />
          <van-collapse
            v-model="activeNames"
            v-if="form.merchantType == 2"
          >
            <van-collapse-item
              name="1"
              title-class="van-cell--required"
            >
              <div slot="title">设计师类型（可多选）</div>
              <ul class="designmanuCategoryList">
                <li
                  class="items"
                  :class="{ selected: item.selected }"
                  :designerCatId="item.id"
                  v-for="(item, index) in designmanuCategoryList"
                  :key="index"
                  @click="selectedItem(index, $event)"
                >
                  <p>
                    <span>{{ item.name }}</span>
                  </p>
                </li>
              </ul>
            </van-collapse-item>
          </van-collapse>
        </van-cell-group>
        <!-- <van-cell-group> -->
        <!-- <van-cell
            class="van-cell--required"
            title="店铺LOGO"
            label="尺寸500*500，大小1.5M（兆）以内，支持jpg/jpeg/png/gif格式"
            title-class="min-width"
          >
            <div class="img-upload">
              <img
                v-if="form.logo"
                :src="form.logo | setImg({ w: 150 })"
              >
              <img
                v-else
                src="../../../assets/images/uploadImg.png"
              >
              <VUpload
                :width="400"
                :height="400"
                @success="uploadSuccessLogo"
              />
            </div>
          </van-cell> -->
        <div class="common-area">
          <div class="upload-area">
            <div class="">
              <img
                v-if="form.logo"
                :src="form.logo | setImg(form.logo, { w: 150 })"
              />
              <i
                class="icon"
                v-else
              ></i>
            </div>
            <VUpload
              @success="uploadSuccessLogo"
              :width="400"
              :height="400"
              :maxSize="1.5"
            />
          </div>
          <div class="right-area">
            店铺LOGO
          </div>
        </div>
        <p class="tips">尺寸500*500，大小1.5M（兆）以内，支持jpg/jpeg/png/gif格式</p>
        <div class="common-area">
          <div class="upload-area">
            <div class="">
              <img
                class="top22"
                v-if="form.backgroundImg"
                :src="form.backgroundImg | setImg(form.backgroundImg, { w: 150 })"
              />
              <i
                class="icon"
                v-else
              ></i>
            </div>
            <VUpload
              :width="355"
              :height="175"
              :maxSize="1.5"
              @success="uploadSuccessBg"
            />
          </div>
          <div class="right-area">
            店铺背景图
          </div>
        </div>
        <p class="tips">尺寸710*350，大小1.5M（兆）以内，支持jpg/jpeg/png/gif格式</p>
        <!-- <van-cell
          class="van-cell--required"
          title="店铺背景图"
          label="尺寸710*350，大小1.5M（兆）以内，支持jpg/jpeg/png/gif格式"
          title-class="min-width"
        >
          <div class="img-upload">
            <img
              v-if="form.backgroundImg"
              :src="form.backgroundImg | setImg({ w: 150 })"
            >
            <img
              v-else
              src="../../../assets/images/uploadImg.png"
            >
            <VUpload
              :width="355"
              :height="175"
              @success="uploadSuccessBg"
            />
          </div>
        </van-cell> -->
        <!-- </van-cell-group> -->
        <van-cell-group>
          <van-field
            v-model="form.companyName"
            label="企业名称"
            placeholder="30字以内，与营业执照上保持一致"
            rows="3"
            autosize
          />
        </van-cell-group>
      </validator>
      <van-popup
        v-model="typePickerShow"
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="typeColumns"
          @cancel="typeCancel"
          @confirm="typeConfirm"
        />
      </van-popup>
      <van-button
        type="primary"
        block
        class="primary-btn submit-btn block"
        @click="submit"
      >提交</van-button>
    </div>
    <div
      class="success-container"
      v-if="success  && loadData"
    >
      <img
        src="../../../assets/images/submitSuccess.png"
        width="200"
      />
      <div class="info">
        <p>恭喜您成功开通店铺！</p>
        <p>复制下方链接，在电脑端登录商家后台发布商品吧</p>
      </div>
      <p
        class="link"
        v-if="form.merchantType === 1"
      >http://admin.gacjc.com/usrManager/jewelry/</p>
      <p
        class="link"
        v-if="form.merchantType === 2"
      >http://admin.gacjc.com/designMerchant.html</p>
      <p
        class="link"
        v-if="form.merchantType === 3"
      >http://admin.gacjc.com/makeMerchant.html </p>
      <div class="fix-bottom"><span class="red">*</span>温馨提示：完成<span
          class="link blue"
          @click="linkTo"
        >企业认证</span>可以提升店铺信任噢</div>
    </div>
  </AppView>
</template>

<script>
import VUpload from '~/components/common/upload/base'
import Validator from '~/components/common/validator'
export default {
  head() {
    return {
      title: this.title
    }
  },
  components: {
    VUpload,
    Validator
  },
  data() {
    return {
      // merchantType: '',
      // errorMessage: '',
      // hasMerchantType: false,
      // failPassed: false,
      // loadData: false,
      success: false,
      loadData: false,
      title: '我要开店',
      // chooseShow: false,
      typePickerShow: false,
      typeColumns: ['珠宝店', '设计师', '制造间'],
      activeNames: ['1'],
      designmanuCategoryList: [],
      form: {
        name: '',
        merchantType: 1,
        companyName: '',
        logo: '',
        backgroundImg: '',
        designerCategeryId: [],
        setshopType: 4 //开店入口方式：1APP-安卓、2APP-苹果、3PC、4H5、5招商短信
      },
      rules: {
        name: [
          { required: true, message: '请填写店铺名称' }
        ],
        merchantType: [
          { required: true, message: '请选择店铺类型' }
        ],
        logo: [
          { required: true, message: '请上传店铺logo' }
        ],
        backgroundImg: [
          { required: true, message: '请上传店铺背景图' }
        ],
        designerCategeryId: [
          { validator: this.validateDesignerCategeryId }
        ]
      },
    }
  },
  middleware: 'auth',
  beforeMount() {
    this.$store.dispatch('user/checkLogin', this.$router)
  },
  activated() {
    this.$service("userInfo").then(result => {
      this.loadData = true
      if (result.data.userType === 4) {
        this.success = true
        this.form.merchantType = result.data.merchantType
      } else if (result.data.userType === 2) {
        this.$router.push({
          name: 'user-shop-createShop'
        })
      }
    }).catch(err => { })
    this.$service("designmanuCategoryList", { data: { flag: 0 } }).then(result => {
      this.designmanuCategoryList = result.data
      this.designmanuCategoryList.map(item => {
        item.selected = false
      })
    }).catch(err => { })
  },
  methods: {
    selectedItem(index, e) {
      let designerCatId = e.currentTarget.getAttribute("designerCatId");
      this.designmanuCategoryList[index].selected = !this.designmanuCategoryList[index].selected;
      if (this.designmanuCategoryList[index].selected) {
        this.form.designerCategeryId.push(designerCatId);
      } else {
        this.form.designerCategeryId = this.form.designerCategeryId.filter(i => {
          return i !== designerCatId;
        });
      }
      this.$forceUpdate();
    },
    submit() {
      if (!!window.Android) {
        this.form.setshopType = 1
      } else if (!!window.webkit) {
        this.form.setshopType = 2
      } else if (this.$route.query.setshopType === 5) {
        this.form.setshopType = 5
      }
      if (this.$refs.form.checkAll(error => this.$toast(error[0]))) {
        console.log(this.form)
        this.$loading(this.$service('openShop', { data: this.form }))
          .then(() => {
            this.success = true
            this.$forceUpdate();
          }).catch()
      }
    },
    linkTo() {
      this.$router.push({
        name: 'user-shop-createShop',
        query: {
          type: '4'
        }
      })
    },
    typeCancel() {
      this.typePickerShow = false
    },
    typeConfirm(val, index) {
      this.form.type = val
      this.form.merchantType = index + 1
      this.typePickerShow = false
    },
    uploadSuccessLogo(key) {
      this.form.logo = key
    },
    uploadSuccessBg(key) {
      this.form.backgroundImg = key
    },
    clickLeft() {
      this.$router.push({ name: 'user-shop' })
    },
    validateDesignerCategeryId(rule, value) {
      if (this.form.merchantType == 2) {
        if (value.length === 0) {
          return "请选择设计师类型";
        }
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.type {
  padding: 10px;
  & >>> .van-cell-group {
    border-radius: 6px;
    overflow: hidden;
  }
  & >>> .van-cell:not(:last-child)::after {
    left: 0;
  }
  & >>> .van-cell {
    padding: 18px 15px;
    font-size: 17px;
  }
  & >>> .van-cell__value {
    font-size: 13px;
  }
  & >>> .van-button.van-button--primary.block,
  & >>> .van-button.primary-btn.block {
    height: 44px;
    line-height: 44px;
    font-size: 15px;
  }

  /* 拍照上传 */
  & .common-area {
    display: flex;
    & .right-area {
      font-size: 15px;
      margin-left: 30px;
      line-height: 84px;
    }
  }
  & .tips {
    font-size: 14px;
    color: #999;
    margin: 5px 0 20px;
  }
  & .upload-area {
    position: relative;
    width: 84px;
    height: 84px;
    background-color: #ffffff;
    text-align: center;
    & img {
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
    }
    & .top22 {
      top: 22px;
    }
    & .icon {
      position: absolute;
      top: 50%;
      margin-top: -25px;
      left: 50%;
      margin-left: -25px;
      width: 50px;
      height: 50px;
      background-image: url(../../../assets/images/icon_uploadadd.png);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
    & p {
      color: var(--dark-gray);
      padding-top: 15px;
      font-weight: bold;
      font-size: 14px;
    }
  }
}
.success-state {
  text-align: center;
  & .imgwrap {
    padding-top: 95px;
    & img {
      width: 146px;
    }
  }
  & .text {
    margin: 30px auto 16px;
    width: 100%;
    color: var(--black);
    width: 100%;
    font-size: 18px;
    font-weight: bold;
  }
  & p {
    padding: 0 20px;
    line-height: 20px;
    font-size: 15px;
    color: var(--gray);
  }
  & button {
    margin-top: 20px;
    background: #d57e6a;
  }
}
.margin {
  margin-bottom: 15px;
}
.upload-area {
  float: right;
}
.block {
  margin-top: 50px;
}
.min-width {
  min-width: 220px;
}
.img-upload {
  float: right;
  width: 100px;
  & img {
    width: 100%;
  }
}
.submit-btn {
  background: #d57e6a;
  border-color: #d57e6a;
}
.success-container {
  padding: 40px 0;
  text-align: center;
  font-size: 14px;
  & .info {
    margin-top: 20px;
    line-height: 30px;
  }
  & .link {
    /* color: #2d69c3; */
    margin-top: 30px;
  }
  & .fix-bottom {
    /* position: fixed;
    bottom: 20px;
    left: 0;
    right: 0; */
    margin-top: 30px;
    & .link {
      font-size: 18px;
    }
  }
  & .red {
    color: red;
  }
  & .blue {
    color: #2d69c3;
  }
}
/* 设计师类型选择 */
.designmanuCategoryList {
  & .items {
    display: inline-table;
    position: relative;
    margin: 0 3px 5px;
    min-width: 65px;
    padding: 5px;
    font-size: 12px;
    vertical-align: middle;
    text-align: center;
    color: #aaaaaa;
    background: #f0f0f1;
    border-radius: 5px;
    &.selected {
      color: white;
      background: #d57e6a;
    }
    & p {
      display: table-cell;
      vertical-align: middle;
      & span {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
    & .ico-close {
      position: absolute;
      right: 0;
      bottom: 0;
      opacity: 0;
    }
    &.active {
      color: white;
      background: #f4b1a4;
      & .ico-close {
        opacity: 1;
      }
    }
  }
}
</style>
