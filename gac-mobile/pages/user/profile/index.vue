<template>
  <AppView title="账号管理">
    <!--<div slot="nav-bar-right">保存</div>-->
    <!-- <div class="img-upload">
			<img v-if="form.userLogo" :src="form.userLogo | setImg({ w: 150 })">
			<img v-else src="http://image.gacjc.com/work_1KyFQUiR6eQkt3u_284_284.png">
			<i class="ico-edit"></i>
			<VUpload @success="uploadSuccess" />
		</div> -->

    <validator
      :rules="rules"
      :model="form"
      ref="form"
    >
      <van-cell-group>
        <van-cell
          title="头像"
          is-link
        >
          <div class="img-upload">
            <img
              v-if="form.userLogo"
              :src="form.userLogo | setImg({ w: 37 })"
            />
            <img
              v-else
              src="http://image.gacjc.com/work_1KyFQUiR6eQkt3u_284_284.png"
            />
            <!-- <i class="ico-edit"></i> -->
            <VUpload
              @success="uploadSuccess"
              :width="400"
              :height="400"
            />
          </div>
        </van-cell>
        <van-field
          v-model="form.id"
          label="用户ID"
          readonly
        />
        <van-field
          v-model="form.nickname"
          label="昵称"
          placeholder=""
          maxlength="20"
          @click-icon="form.nickname = ''"
        />
        <van-cell
          title="手机号码"
          v-model="form.mobilePhone"
          is-link
          @click="handlerMobilePhone"
        />
        <van-field
          value="会员"
          label="角色"
          readonly
        />
        <van-cell
          title="个性签名"
          is-link
          @click="$router.push({ name: 'user-profile-signature',query: {userBrief:form.userBrief} })"
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell
          title="真实姓名"
          v-model="form.realname"
          is-link
          @click="$router.push({ name: 'user-auth', query: { id: id } })"
        />
        <van-cell
          title="性别"
          v-model="sexMap[form.sex]"
          is-link
          @click="sexPickerShow = true"
        />
        <van-cell
          title="出生年月"
          :value="form.birthday"
          is-link
          @click="birthdayPickerShow = true"
        />
        <van-cell
          title="所在城市"
          :value="form.region"
          is-link
          @click="cityPickerShow = true"
        />
        <van-cell
          title="是否已婚"
          v-model="marMap[form.marriageState]"
          is-link
          @click="marPickerShow = true"
        />
        <van-cell
          title="结婚纪念日"
          :value="form.weddingDate"
          is-link
          @click="weddingPickerShow = true"
        />
        <!--:value="form.wechatUnionid"-->
        <!-- <van-cell
          title="微信"
          value="已绑定"
          v-if="form.wechatUnionid"
          @click="undindDialog(2)"
        /> -->
        <!--form.qunionid-->
        <!-- <van-cell
          title="QQ"
          value="已绑定"
          v-if="form.qunionid"
          @click="undindDialog(1)"
        />
        <van-cell
          title="微博"
          value="已绑定"
          v-if="form.weiboUnionid"
          @click="undindDialog(3)"
        /> -->
      </van-cell-group>
      <van-cell-group>
        <van-cell
          title="职业"
          :value="form.occupation"
          is-link
          @click="occPickerShow = true"
        />
        <van-field
          v-model="form.hobby"
          label="爱好"
          placeholder=""
          @click-icon="form.hobby = ''"
        />
        <van-cell
          title="注册时间"
          :value="form.createTime"
        />
      </van-cell-group>
    </validator>

    <van-button
      @click="submit"
      :loading="loading"
      type="primary"
      block
      class="primary-btn submit-btn"
    >保存</van-button>

    <van-popup
      v-model="birthdayPickerShow"
      position="bottom"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @cancel="birthdayPickerShow = false"
        @confirm="birthdayPickerConfirm"
      />
    </van-popup>
    <van-popup
      v-model="weddingPickerShow"
      position="bottom"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @cancel="weddingPickerShow = false"
        @confirm="weddingPickerConfirm"
      />
    </van-popup>
    <van-popup
      v-model="sexPickerShow"
      position="bottom"
    >
      <van-picker
        :columns="sexColumns"
        show-toolbar
        @cancel="sexPickerShow = false"
        @confirm="sexPickerConfirm"
      />
    </van-popup>
    <van-popup
      v-model="marPickerShow"
      position="bottom"
    >
      <van-picker
        :columns="marColumns"
        show-toolbar
        @cancel="marPickerShow = false"
        @confirm="marPickerConfirm"
      />
    </van-popup>
    <van-popup
      v-model="occPickerShow"
      position="bottom"
    >
      <van-picker
        :columns="occColumns"
        show-toolbar
        @cancel="occPickerShow = false"
        @confirm="occPickerConfirm"
      />
    </van-popup>
    <van-popup
      v-model="cityPickerShow"
      position="bottom"
    >
      <van-area
        :area-list="areaList"
        @cancel="cityPickerShow = false"
        @confirm="cityPickerConfirm"
      />
    </van-popup>
    <van-dialog
      title="解除绑定"
      message="是否解除绑定？"
      v-model="unbindShow"
      show-cancel-button
      @confirm="unbind"
    ></van-dialog>
    <BindPhone
      :isCityEnter="isCityEnterFlag"
      @listenToChild="showFromParent"
      @changeMobileSuccessEvent="changeMobileSuccessEvent"
    />
  </AppView>
</template>

<script>
import BindPhone from "~/components/common/bindPhone";
import { formatDate } from "~/utils/time";
import VUpload from "~/components/common/upload/base";
import Validator from "~/components/common/validator";
import areaList from "~/assets/data/areaList";
import { setToken, getToken } from "~/utils/auth";

const dateType = {
  year: "年",
  month: "月",
  day: "日"
};

export default {
  components: {
    BindPhone,
    Validator,
    VUpload
  },
  middleware: "auth",
  beforeMount() {
    this.$store.dispatch("user/checkLogin", this.$router);
    this.$loading(this.$store.dispatch("user/getUserInfo"));
  },
  computed: {
    user() {
      return this.$store.state.user.info;
    }
  },
  watch: {
    user: {
      handler: function handler(value) {
        this.form = Object.assign({}, this.form, value);
        this.id = this.form.id;
      },
      immediate: true
    }
  },
  data() {
    if (this.$data) return;
    return {
      id: "",
      isCityEnterFlag: false,
      form: {
        userLogo: "",
        nickname: "",
        realname: "",
        mobilePhone: "",
        birthday: "",
        sex: "",
        marriageState: "",
        region: "",
        occupation: "",
        hobby: "",
        createTime: ""
      },
      rules: {},
      areaList,
      loading: false,
      birthdayPickerShow: false,
      weddingPickerShow: false,
      sexPickerShow: false,
      marPickerShow: false,
      occPickerShow: false,
      cityPickerShow: false,
      unbindShow: false,
      unbindType: "",
      currentDate: new Date(1970, 1, 1),
      minDate: new Date(1930, 1, 1),
      maxDate: new Date(),
      sexColumns: ["男", "女"],
      sexMap: {
        0: "男",
        1: "女"
      },
      marColumns: ["未婚", "已婚"],
      marMap: {
        0: "未婚",
        1: "已婚"
      },
      occColumns: [
        "IT",
        "通信",
        "电子",
        "销售",
        "客服",
        "技术支撑",
        "会计",
        "金融",
        "银行",
        "保险",
        "生产",
        "营运",
        "采购",
        "物流",
        "生物",
        "制药",
        "医疗",
        "护理",
        "广告",
        "市场",
        "媒体",
        "艺术",
        "建筑",
        "房地产",
        "人事",
        "行政",
        "高级管理",
        "咨询",
        "法律",
        "教育",
        "科研",
        "服务生",
        "演员",
        "模特",
        "公务员",
        "翻译",
        "其他"
      ]
    };
  },
  methods: {
    clickLeft() {
      history.back();
    },
    formatter(type, value) {
      return value + dateType[type];
    },
    birthdayPickerConfirm(value) {
      this.form.birthday = formatDate(value, "yyyy-MM-dd");
      this.birthdayPickerShow = false;
    },
    weddingPickerConfirm(value) {
      this.form.weddingDate = formatDate(value, "yyyy-MM-dd");
      this.weddingPickerShow = false;
    },
    sexPickerConfirm(value, index) {
      this.form.sex = index;
      this.sexPickerShow = false;
    },
    marPickerConfirm(value, index) {
      this.form.marriageState = index;
      this.marPickerShow = false;
    },
    occPickerConfirm(value, index) {
      this.form.occupation = value;
      this.occPickerShow = false;
    },
    cityPickerConfirm(value, index) {
      let city = [];
      value.forEach((item, i) => {
        city.push(item.name);
      });
      this.form.region = city.join("");
      this.cityPickerShow = false;
    },
    uploadSuccess(key) {
      this.form.userLogo = key;
    },
    submit() {
      if (this.$refs.form.checkAll(error => this.$toast(error[0]))) {
        this.loading = true;
        this.$service("userInfoUpdate", {
          data: this.form
        })
          .then(this.success)
          .catch(this.fail);
      }
    },
    success(result) {
      this.$toast({
        type: "success",
        message: "修改成功"
      });
      this.loading = false;
      this.$router.go(-1);
    },
    fail() {
      this.loading = false;
    },
    handlerMobilePhone() {
      this.$service("isCityEnter")
        .then(data => {
          this.$router.push({
            name: "user-mobile-modify",
            query: { id: this.id }
          });
        })
        .catch(data => {
          if (!data.success) {
            this.isCityEnterFlag = true;
          }
        });
    },
    showFromParent(data) {
      this.isCityEnterFlag = data;
    },
    changeMobileSuccessEvent(data) {
      this.$store.commit("user/setToken", data);
      setToken(data);
      this.$toast({
        type: "success",
        message: "成功"
      });
      this.$router.go(0);
    },
    undindDialog(unbindType) {
      this.unbindShow = true;
      this.unbindType = unbindType;
    },
    unbind() {
      this.$service("thirdUnbind", {
        data: {
          mobilePhone: this.form.mobilePhone,
          loginType: this.unbindType
        }
      })
        .then(() => {
          this.$toast("解除绑定成功");
          this.$router.go(0);
        })
        .catch(() => { });
    }
  }
};
</script>

<style lang="postcss" scoped>
>>> .van-cell-group {
  margin: 10px;
  border-radius: 6px;
  overflow: hidden;
  &:after {
    border-top: none;
  }
  & .van-cell {
    padding: 10px;
    height: 59px;
    line-height: 37px;
    font-size: 17px;
  }
  & .van-cell__value {
    font-size: 14px;
  }
  & .van-cell__right-icon {
    margin-top: 7px;
  }
  & .van-cell:not(:last-child)::after {
    left: 0;
  }
}

.validator {
  padding-bottom: 45px;
}

.img-upload {
  display: inline-block;
  width: 37px;
  height: 37px;
  border-radius: 50%;
  background-color: var(--light-gray);
  & img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  & i {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}

.inline {
  display: inline;
}

>>> .sex .van-cell__title {
  flex: 2;
}

>>> .van-field__control {
  text-align: right;
}

.van-cell-text {
  padding-right: 38px;
}

>>> .crop-handle {
  top: 0;
}

.primary-btn {
  position: fixed;
  bottom: 0;
  background: #df7359;
  border-color: #df7359;
}
.submit-btn {
  background: #d57e6a;
  border-color: #d57e6a;
}
</style>
