<template>
  <div class="main">
    <!--<h4 class="title">第一步 基本信息</h4>-->
    <div
      class="title"
      :class="{ h5class: inH5 }"
    >
      <div class="step active">
        <div class="step-circle">1</div>
        <div class="step-title">基本信息</div>
      </div>
      <div class="step">
        <div class="step-circle">2</div>
        <div class="step-line"></div>
        <div class="step-title">资质信息</div>
      </div>
      <div class="step">
        <div class="step-circle">3</div>
        <div class="step-line"></div>
        <div class="step-title">实名信息</div>
      </div>
      <div class="step">
        <div class="step-circle">4</div>
        <div class="step-line"></div>
        <div class="step-title">验证手机号</div>
      </div>
    </div>
    <validator
      :rules="rules"
      :model="form"
      ref="form"
      class="step-wrap"
    >
      <van-cell-group class="margin">
        <!-- 20字以内，请勿使用营销推广意图的字样 -->
        <van-field
          class="van-cell--required"
          v-model="form.name"
          :label="labelName"
          placeholder=""
          maxlength="20"
          rows="1"
          autosize
        />
        <van-collapse v-model="activeNames">
          <van-collapse-item
            name="1"
            title-class="van-cell--required"
          >
            <div slot="title">主营类目（可多选）</div>
            <ul class="secondCategoryList">
              <li
                class="items"
                :class="{ selected: item.selected }"
                :secondCatId="item.id"
                v-for="(item, index) in secondCategoryList"
                :key="index"
                @click="selectedItem(index, $event)"
              >
                <p>
                  <span>{{ item.catName }}</span>
                </p>
              </li>
            </ul>
          </van-collapse-item>
        </van-collapse>
      </van-cell-group>
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
          />
        </div>
        <div class="right-area van-cell--required">
          店铺LOGO
        </div>
      </div>
      <p class="tips">
        尺寸500*500，大小1.5M（兆）以内，支持jpg/jpeg/png/gif格式
      </p>
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
            @success="uploadSuccessBg"
          />
        </div>
        <div class="right-area van-cell--required">
          店铺背景图
        </div>
      </div>
      <p class="tips">
        尺寸710*350，大小1.5M（兆）以内，支持jpg/jpeg/png/gif格式
      </p>
      <!-- <van-cell-group>
        <van-cell
          class="van-cell--required"
          title="店铺LOGO"
          label="1.5兆（M）以内，1张，格式支持jpg\jpeg\png，尺寸400*400px（正方形图片），可使用系统裁剪器进行裁剪"
          title-class="min-width"
        >
          <div class="img-upload">
            <img
              v-if="form.logo"
              :src="form.logo | setImg({ w: 150 })"
            >
            <img
              v-else
              src="../../../../assets/images/uploadImg.png"
            >
            <VUpload
              :width="400"
              :height="400"
              @success="uploadSuccessLogo"
            />
          </div>
        </van-cell>
        <van-cell
          class="van-cell--required"
          title="店铺背景图"
          label="1.5兆（M）以内，1张，格式支持jpg\jpeg\png，尺寸710*350px（长方形图片），可使用系统裁剪器进行裁剪"
          title-class="min-width"
        >
          <div class="img-upload">
            <img
              v-if="form.backgroundImg"
              :src="form.backgroundImg | setImg({ w: 150 })"
            >
            <img
              v-else
              src="../../../../assets/images/uploadImg.png"
            >
            <VUpload
              :width="355"
              :height="175"
              @success="uploadSuccessBg"
            />
          </div>
        </van-cell>
      </van-cell-group> -->
      <van-cell-group>
        <!-- ，内容完整通畅、无特殊符号或者微信、QQ、微博、手机号等联系方式 -->
        <van-field
          v-model="form.merchantExplain"
          label="店铺简介"
          type="textarea"
          placeholder="300字以内"
          maxlength="300"
          rows="3"
          autosize
          required
        />
        <van-field
          class="van-cell--required"
          v-model="form.companyName"
          label="企业名称"
          placeholder="30字以内，与营业执照上保持一致"
          rows="3"
          autosize
          v-if="
            registType == 2 || form2.registType == 2 || form.registType == 2
          "
        />
        <van-cell
          class="van-cell--required"
          title="所在地区"
          is-link
          :value="form.region"
          @click="cityPickerShow = true"
        />
        <van-field
          v-model="form.address"
          label="详细地址"
          type="textarea"
          placeholder="与营业执照上保持一致，50字以内"
          maxlength="50"
          rows="2"
          autosize
          required
        />
        <van-field
          v-model="form.houseNumber"
          label="门牌号"
          placeholder="实体店铺的门牌号，6个字以内"
          maxlength="6"
          rows="1"
          autosize
          required
        />
        <van-field
          v-model="form.email"
          label="邮箱地址"
          placeholder="用于接收信息提醒"
          rows="1"
          autosize
          required
        />
      </van-cell-group>
    </validator>
    <van-popup
      v-model="cityPickerShow"
      position="bottom"
    >
      <van-area
        :area-list="areaList"
        :columns-num="3"
        @cancel="cityPickerShow = false"
        @confirm="cityPickerConfirm"
      />
    </van-popup>
    <div class="block">
      <van-button
        type="primary"
        block
        class="primary-btn"
        @click="submit"
      >下一步</van-button>
    </div>
  </div>
</template>

<script>
import VUpload from "~/components/common/upload/base";
import Validator from "~/components/common/validator";
import areaList from "~/assets/data/areaList";

export default {
  props: {
    merchantType: [String, Number],
    //  registType: [String, Number],
    form2: {
      Type: Object,
      default: () => {
        return {
          name: "",
          categoryDTOList: [],
          logo: "",
          backgroundImg: "",
          merchantExplain: "",
          companyName: "",
          region: "",
          provinceId: "",
          provinceName: "",
          cityId: "",
          cityName: "",
          countryId: "",
          countryName: "",
          address: "",
          houseNumber: ""
        };
      }
    }
  },
  data() {
    return {
      areaList,
      cityPickerShow: false,
      registType: "",
      form: {
        name: "",
        categoryDTOList: [],
        logo: "",
        backgroundImg: "",
        merchantExplain: "",
        companyName: "",
        region: "",
        provinceId: "",
        provinceName: "",
        cityId: "",
        cityName: "",
        countryId: "",
        countryName: "",
        address: "",
        houseNumber: "",
        email: ""
      },
      rules: {
        name: [{ required: true, message: "请填写店铺名称" }],
        categoryDTOList: [{ required: true, message: "请选择主营类目" }],
        logo: [{ required: true, message: "请上传店铺logo" }],
        backgroundImg: [{ required: true, message: "请上传店铺背景图" }],
        merchantExplain: [{ required: true, message: "请填写店铺简介" }],
        companyName: [{ validator: this.validateCompanyName }],
        region: [{ required: true, message: "请选择地址" }],
        address: [{ required: true, message: "请填写详细地址" }],
        houseNumber: [{ required: true, message: "请填写门牌号" }],
        email: [
          {
            required: true,
            message: "请填写email",
            validator: this.validateEmail
          }
        ]
      },
      labelName: "店铺名称",
      activeNames: [],
      secondCategoryList: [],
      isCurrent: false,
      inH5: true
    };
  },
  components: {
    VUpload,
    Validator
  },
  mounted() {
    if (this.merchantType == 2) {
      this.labelName = "设计师名称";
    }
  },
  watch: {
    form2: {
      handler(newValue, oldValue) {
        //				this.form = newValue
        Object.assign(this.form, newValue);
      },
      deep: true
    },
    form: {
      handler(newValue, oldValue) {
        Object.assign(this.form2, this.form);
      },
      deep: true
    }
  },
  activated() {
    //	判断微信和app
    if (
      this.$native.isApp() ||
      window.navigator.userAgent.includes("MicroMessenger")
    ) {
      this.inH5 = false;
    }
    this.registType = JSON.parse(localStorage.getItem("form")).registType;
    // setTimeout(() => {
    //   this.$service("getSecondCategoryList").then(result => {
    //     this.secondCategoryList = result.data;
    //     console.log(365);
    //     this.form.region =
    //       this.form.provinceName + this.form.cityName + this.form.countryName;
    //     this.secondCategoryList.map(item => {
    //       item.selected = false;
    //       if (this.form.categoryDTOList && this.form.categoryDTOList.length) {
    //         this.form.categoryDTOList.map(citem => {
    //           if (item.id == citem.secondCatId) {
    //             item.selected = true;
    //           }
    //         });
    //       }
    //     });
    //   });
    // }, 200);
  },
  created() { },
  methods: {
    getSecondCategoryList() {
      this.$service("getSecondCategoryList").then(result => {
        this.secondCategoryList = result.data;
        this.form.region =
          this.form.provinceName + this.form.cityName + this.form.countryName;
        this.secondCategoryList.map(item => {
          item.selected = false;
          if (this.form.categoryDTOList && this.form.categoryDTOList.length) {
            this.form.categoryDTOList.map(citem => {
              if (item.id == citem.secondCatId) {
                item.selected = true;
              }
            });
          }
        });
      });
    },
    uploadSuccessLogo(key) {
      this.form.logo = key;
    },
    uploadSuccessBg(key) {
      this.form.backgroundImg = key;
    },
    cityPickerConfirm(value, index) {
      this.form.provinceId = value[0].code;
      this.form.provinceName = value[0].name;
      this.form.cityId = value[1].code;
      this.form.cityName = value[1].name;
      this.form.countryId = value[2].code;
      this.form.countryName = value[2].name;
      let city = [];
      value.forEach((item, i) => {
        city.push(item.name);
      });
      this.form.region = city.join("");
      this.cityPickerShow = false;
    },
    validateEmail(rule, value) {
      return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
        ? ""
        : "请输入正确的邮箱";
    },
    validateCompanyName(rule, value) {
      if (this.registType == 2) {
        if (value == "") {
          return "请填写企业名称";
        }
      }
    },
    selectedItem(index, e) {
      let secondCatId = e.currentTarget.getAttribute("secondCatId");
      let secondCatName = e.currentTarget.textContent;
      this.secondCategoryList[index].selected = !this.secondCategoryList[index]
        .selected;
      if (this.secondCategoryList[index].selected) {
        this.form.categoryDTOList.push({
          secondCatId: secondCatId,
          secondCatName: secondCatName
        });
      } else {
        this.form.categoryDTOList = this.form.categoryDTOList.filter(i => {
          return i.secondCatId !== secondCatId;
        });
      }
      this.$forceUpdate();
    },
    submit() {
      if (this.$refs.form.checkAll(error => this.$toast(error[0]))) {
        this.$emit("submit", this.form, 2);
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
/*.main {
  background-color: var(--bg);
}*/
.margin {
  margin-bottom: 15px;
}
.upload-area {
  float: right;
}
.block {
  margin: 50px 10px 0;
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
.step-wrap {
  padding: 0 10px;
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
      position: relative;
      font-size: 15px;
      margin-left: 15px;
      padding-left: 15px;
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
      background-image: url(../../../../assets/images/icon_uploadadd.png);
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
.secondCategoryList {
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
