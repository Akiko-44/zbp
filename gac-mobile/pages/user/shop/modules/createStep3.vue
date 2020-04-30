<template>
  <div class="main">
    <!--<h4 class="title">第二步 资质认证</h4>-->
    <div
      class="title"
      :class="{ h5class: inH5 }"
    >
      <div class="step active">
        <div class="step-circle">1</div>
        <div class="step-title">基本信息</div>
      </div>
      <div class="step active">
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
        <van-field
          class="van-cell--required"
          v-model="form.taxNumber"
          label="纳税人识别号"
          placeholder="与营业执照上保持一致"
          maxlength="20"
          label-width="106px"
          rows="1"
          autosize
          v-if="
            registType == 2 || form.registType == 2 || form3.registType == 2
          "
          @input="taxNumberChange"
        />
        <van-field
          v-model="form.realName"
          label="开户名称"
          :placeholder="
            registType == 2 || form.registType == 2 || form3.registType == 2
              ? '即开户许可证上的企业名称'
              : '即开户人的真实姓名，与实名认证者保持一致'
          "
          maxlength="30"
          rows="1"
          autosize
          required
        />
        <van-field
          v-model="form.bankAccount"
          label="开户账号"
          :placeholder="
            registType == 2 || form.registType == 2 || form3.registType == 2
              ? '即对公账户的银行账号'
              : '即个人银行卡号'
          "
          maxlength="25"
          type="number"
          rows="1"
          autosize
          required
        />
        <van-field
          v-model="form.bankName"
          label="开户银行"
          :placeholder="
            registType == 2 || form.registType == 2 || form3.registType == 2
              ? '即对公账户的开户行名称，具体到支行'
              : '即个人银行卡的开户行名称，具体到支行'
          "
          rows="1"
          maxlength="30"
          autosize
          required
        />
        <van-field
          v-model="form.bankNumber"
          center
          clearable
          label="开户行联行号"
          placeholder="由12位数字组成的联行号"
          maxlength="12"
          label-width="106px"
          required
        >
          <span
            slot="button"
            @click="query"
            style="color:#2D69C3;"
          >立即查询</span>
          <!-- <van-button
            slot="button"
            size="small"
            type="primary"
            @click="query"
            style="margin-right: 8px;"
          >立即查询</van-button> -->
        </van-field>
      </van-cell-group>
      <!-- <van-cell
        class="van-cell--required"
        title-class="min-width"
        v-if="registType == 2 || form.registType == 2 || form3.registType == 2"
      >
        <template slot="title">
          <span class="custom-title">银行开户证明图片</span>
          <span class="van-cell__label">(请上传开户许可证照片或由银行提供的开户证明照片，需加盖本公司公章。支持jpg、jpeg、png格式，大小1.5兆以内，尺寸不限)</span>
        </template>
        <div class="img-upload">
          <CUpload
            @success="uploadmaterials"
            :src="form.materials[0]"
          />
        </div>
      </van-cell> -->
      <template v-if="registType == 2 || form.registType == 2 || form3.registType == 2">
        <div class="common-area">
          <div class="upload-area">
            <CUpload
              @success="uploadmaterials"
              :src="form.materials[0]"
              :maxSize="1.5"
            />
          </div>
          <div class="right-area">
            银行开户证明图片
          </div>
        </div>
        <p class="tips">
          请上传开户许可证照片或由银行提供的开户证明照片，需加盖本公司公章。支持jpg、jpeg、png格式，大小1.5兆以内，尺寸不限
        </p>
      </template>
      <template v-if="registType == 2 || form.registType == 2 || form3.registType == 2">
        <div class="common-area">
          <div class="upload-area">
            <CUpload
              @success="uploadBusinessLicense"
              :src="form.businessLicense"
              :maxSize="1.5"
            />
          </div>
          <div class="right-area">
            营业执照
          </div>
        </div>
        <p class="tips">1.5兆（M）以内，1张，格式支持jpg\jpeg\png，尺寸不限</p>
      </template>

      <template v-if="registType == 2 || form.registType == 2 || form3.registType == 2">
        <div class="common-area">
          <div class="upload-area">
            <CUpload
              @success="uploadLegalPersonPic"
              :src="form.legalPersonPic"
              :maxSize="1.5"
            />
          </div>
          <div
            class="right-area"
            style="line-height:20px;margin-top:22px;"
          >
            银联商务自由划付业务承诺书
            <br />
            <span @click.stop="download">
              （下载模板）
            </span>
          </div>
        </div>
        <p class="tips">
          填写相关资料并签字盖章，然后以拍照或扫描件的形式上传；1.5兆（M）以内，1张，格式支持jpg\jpeg\png，尺寸不限
        </p>
      </template>

      <div class="common-area">
        <div class="upload-area">
          <CUpload
            @success="uploadDoorPhotos"
            :src="form.doorPhotos"
            :maxSize="1.5"
          />
        </div>
        <div class="right-area">
          门店招牌图片
        </div>
      </div>
      <p class="tips">1.5兆（M）以内，1张，格式支持jpg\jpeg\png，尺寸不限</p>

      <div class="common-area">
        <div class="upload-area">
          <CUpload
            @success="uploadIdroomPic"
            :src="form.idroomPic"
            :maxSize="1.5"
          />
        </div>
        <div class="right-area">
          店铺内部图片
        </div>
      </div>
      <p class="tips">1.5兆（M）以内，1张，格式支持jpg\jpeg\png，尺寸不限</p>

      <!-- <van-cell
          class="van-cell--required"
          title="辅助材料(包括但不限于营业场所租赁协议或者产权证明、集中经营场所管理方出具的证明文件等能够反映小微商户真实、合法从事商品或服务交易活动的材料)"
          label="支持jpg、gif、png格式，1.5m以内"
          title-class="min-width"
          v-if="registType == 1 || form.registType == 1 || form3.registType == 1"
        >
          <div class="img-upload">
            <CUpload
              @success="uploadmaterials"
              :src="form.materials"
            />
          </div>
        </van-cell> -->

      <template v-if="registType == 1 || form.registType == 1 || form3.registType == 1">
        <p style="margin-bottom:10px;">辅助材料</p>
        <van-uploader
          v-model="imgs"
          :max-count="5"
          :before-read="beforeRead"
          :after-read="afterRead"
          :before-delete="beforeDelete"
        >
          <div class="uploadbg"></div>
        </van-uploader>
        <p class="tips">
          银行卡正反面照片各一张；经营场所的租赁合同、或产权证明、或个体商户营业执照图片三者至少上传一张；格式支持jpg/jpeg/png，单张照片大小1.5M以内
        </p>
      </template>
      <!-- <van-cell
        class="van-cell--required"
        title="辅助材料(银行卡正反面照片各一张；经营场所的租赁合同、或产权证明、或个体商户营业执照图片三者至少上传一张；格式支持jpg/jpeg/png，单张照片大小1.5M以内)"
        title-class="min-width"
        v-if="registType == 1 || form.registType == 1 || form3.registType == 1"
      >

      </van-cell>
      <div
        class="imglist-upload"
        v-if="registType == 1 || form.registType == 1 || form3.registType == 1"
      >
        <van-uploader
          v-model="imgs"
          :max-count="5"
          :before-read="beforeRead"
          :after-read="afterRead"
          :before-delete="beforeDelete"
        />
      </div> -->
    </validator>
    <div class="block">
      <van-button
        type="primary"
        block
        class="primary-btn"
        @click="submit"
      >下一步</van-button>
    </div>
    <van-dialog
      v-model="imgDialog"
      confirmButtonText="我知道了"
      className="img-dialog"
    >
      <div>
        <div>图片大小不得超过1.5M（兆）</div>
        <div>点击下方链接可对图片进行压缩</div>
        <div><a
            href="https://www.tuhaokuai.com/"
            target="_blank"
          >https://www.tuhaokuai.com/</a></div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import CUpload from "~/components/common/upload/custom";
import Validator from "~/components/common/validator";
import { customUpload, getKey, uploadSectionFile } from "~/utils/qiniu";

export default {
  props: {
    merchantType: [String, Number],
    registType: [String, Number],
    form3: {
      Type: Object,
      default: () => {
        return {
          taxNumber: "",
          realName: "",
          bankAccount: "",
          bankName: "",
          bankNumber: "",
          businessLicense: "",
          legalPersonPic: "",
          doorPhotos: "",
          idroomPic: "",
          materials: []
        };
      }
    }
  },
  data() {
    return {
      imgDialog: false,
      imgs: [],
      form: {
        taxNumber: "",
        realName: "",
        bankAccount: "",
        bankName: "",
        bankNumber: "",
        businessLicense: "",
        legalPersonPic: "",
        doorPhotos: "",
        idroomPic: "",
        materials: []
      },
      rules: {
        taxNumber: [{ validator: this.validateTaxNumber }],
        realName: [{ required: true, message: "请填写开户名称" }],
        bankAccount: [
          {
            required: true,
            message: "请填写开户账号",
            validator: this.validateBankAccount
          }
        ],
        bankName: [{ required: true, message: "请填写开户银行" }],
        bankNumber: [
          {
            required: true,
            message: "请填写开户行联行号",
            validator: this.validateBankNumber
          }
        ],
        businessLicense: [{ validator: this.validateBusinessLicense }],
        legalPersonPic: [{ validator: this.validateLegalPersonPic }],
        doorPhotos: [{ required: true, message: "请上传门店招牌图片" }],
        idroomPic: [{ required: true, message: "请上传店铺内部图片" }],
        materials: [{ validator: this.validatematerials }]
      },
      inH5: true
    };
  },
  components: {
    CUpload,
    Validator
  },
  watch: {
    form3: {
      handler(newValue, oldValue) {
        Object.assign(this.form, newValue);
      },
      deep: true
    },
    form: {
      handler(newValue, oldValue) {
        Object.assign(this.form3, this.form);
      },
      deep: true
    },
    'form.materials': {
      handler(newValue, oldValue) {
        if (this.form.materials && this.form.materials.length > 1) {
          this.imgs = [];
          this.form.materials.map(item => {
            this.imgs.push({
              url: item
            })
          })
        }
      },
      deep: true
    },
  },
  activated() {
    //	判断微信和app
    if (
      this.$native.isApp() ||
      window.navigator.userAgent.includes("MicroMessenger")
    ) {
      this.inH5 = false;
    }
    let form2 = JSON.parse(localStorage.getItem("form"));
    Object.assign(this.form, form2);
    setTimeout(() => {
      if (this.form.materials && this.form.materials.length) {
        this.imgs = [];
        this.form.materials.map(item => {
          this.imgs.push({
            url: item
          })
        })
      }
    }, 1000);
    this.$forceUpdate()
  },
  methods: {
    beforeRead(file) {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/gif"
      ) {
        this.$toast("请上传 jpg/png/gif 格式图片");
        return false;
      }

      // if (file.size > 1.5 * 1024 * 1024) {
      //   this.$toast("图片大小不得超过1.5兆（M）");
      //   this.imgDialog = true
      //   return false;
      // }
      return true;
    },
    afterRead(file) {
      uploadSectionFile(file.file, 1.5).then((res) => {
        customUpload(res)
          .then(response => {
            const result = response.data;
            this.picUrl = result.data.picUrl;
            this.form.materials.push(this.picUrl);
            this.imgs = [...new Set(this.imgs)];
          })
          .catch(() => {
            this.$toast({ type: "fail", message: "上传错误" });
          });
      })
    },
    beforeDelete(file, detail) {
      let index;
      this.imgs.map((item, i) => {
        if (item.file && item.file.name == file.file.name) {
          index = i;
        } else if (item.url && item.url == file.url) {
          index = i;
        }
      });
      this.imgs.splice(index, 1);
      this.form.materials.splice(index, 1);
    },
    uploadBusinessLicense(key) {
      this.form.businessLicense = key;
    },
    uploadLegalPersonPic(key) {
      this.form.legalPersonPic = key;
    },
    uploadDoorPhotos(key) {
      this.form.doorPhotos = key;
    },
    uploadIdroomPic(key) {
      this.form.idroomPic = key;
    },
    uploadmaterials(key) {
      this.form.materials = [key];
    },
    distinct(a, b) {
      let arr = a.concat(b);
      let result = [];
      let obj = {};
      for (let i of arr) {
        if (!obj[i] && i !== undefined) {
          result.push(i);
          obj[i] = 1;
        }
      }

      return result;
    },
    submit() {
      if (this.imgs.length < 3 && this.registType == 1) {
        this.$toast("辅助资料至少上传3张图片");
        return;
      }
      if (this.$refs.form.checkAll(error => this.$toast(error[0]))) {
        this.imgs.forEach(data => {
          this.form.materials.push(data.url);
        });
        this.form.materials = this.distinct(this.form.materials);
        localStorage.setItem("form", JSON.stringify(this.form));
        this.$emit("submit", this.form, 3);
      }
    },
    query() {
      let form2 = JSON.parse(localStorage.getItem("form"));
      localStorage.setItem(
        "form",
        JSON.stringify(Object.assign(form2, this.form))
      );
      this.form = form2;
      this.$router.push({
        name: "user-shop-linkPage",
        query: { url: "https://www.icvio.cn" }
      });
    },
    validateTaxNumber(rule, value) {
      if (this.registType == 2) {
        if (value == "") {
          return "请填写纳税人识别号";
        } else {
          return /^[0-9a-zA-Z]+$/.test(value)
            ? ""
            : "纳税人识别号仅限输入15位或18位或20位数字和字母";
        }
      }
    },
    taxNumberChange(value) {
      this.form.taxNumber = value.replace(/[^\w\/]/gi, "");
    },
    validateBusinessLicense(rule, value) {
      if (this.registType == 2) {
        if (value == "") {
          return "请上传营业执照";
        }
      }
    },
    validateLegalPersonPic(rule, value) {
      if (this.registType == 2) {
        if (value == "") {
          return "请上传银联商务自由划付业务承诺书";
        }
      }
    },
    validatematerials(rule, value) {
      if (this.registType == 1) {
        if (value.length == 0) {
          return "请上传辅助材料";
        }
      }
    },
    validateBankAccount(rule, value) {
      return /^[0-9]+$/.test(value) ? "" : "开户账号仅限25位以内的数字";
    },
    validateBankNumber(rule, value) {
      return /^[0-9]+$/.test(value) ? "" : "开户行联行号仅限12位数字";
    },
    download() {
      let src =
        "http://app.gacjc.com/app/download/help/letterOfUndertaking.docx";
      let form = document.createElement("form");
      form.action = src;
      document.getElementsByTagName("body")[0].appendChild(form);
      form.submit();
    }
  }
};
</script>

<style lang="postcss" scoped>
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
      font-size: 15px;
      margin-left: 30px;
      line-height: 84px;
    }
  }
  & .tips {
    font-size: 12px;
    line-height: 18px;
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
.uploadbg {
  width: 84px;
  height: 84px;
  background: #fff url(../../../../assets/images/icon_uploadadd.png) no-repeat
    center;
  background-size: 50px;
}
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
  width: 100px;
  & img {
    width: 100%;
  }
}
.imglist-upload {
  padding: 16px;
  background: #ffffff;
}
.download {
  background: #c2a374;
}
>>> .img-dialog {
  padding-top: 16px;
  font-size: 14px;
  line-height: 28px;
  & .van-button {
    color: #1989fa;
    background: transparent;
    border-color: transparent;
  }
}
</style>
