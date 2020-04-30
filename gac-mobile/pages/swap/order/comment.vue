<template>
  <AppView title="评价">
    <div class="Order-comment-page">
      <div
        v-for="(goodsItem, index) in data.orderGoodVOList"
        :key="index"
        v-if="goodsItem.isCommented != 2"
      >
        <div class="skuGoods">
          <img :src="goodsItem.skuMainPic | setImg" />
          <span>{{ goodsItem.skuName }}</span>
        </div>
        <div class="input-box">
          <van-cell-group>
            <van-field
              type="textarea"
              v-model="goodsItem.content"
              autosize
              style="height:108px;"
              placeholder="说说你的使用心得，分享给想买的人吧
"
            />
          </van-cell-group>

          <van-cell>
            <template slot="title">
              <!-- <van-uploader
                v-model="imgs[index]"
                :max-count="9"
                :name="index"
                :before-read="beforeRead"
                :after-read="afterRead"
                :before-delete="beforeDelete"
              >
                <div class="bg"></div>
              </van-uploader> -->
              <CUploadList
                ref="picUploader"
                :imgs="imgs[index]"
                :index="index"
                :limit=9
                :props="{src: 'imgUrl'}"
                @success="uploadSuccess"
              >
              </CUploadList>
            </template>
          </van-cell>
          <div class="tip">9张以内，支持jpg、gif、png格式，大小：5m以内</div>
        </div>

        <div class="store-score-bar">
          <ul>
            <li>
              <span>宝贝描述</span>
              <van-rate
                class="rate"
                color="#D57E6A"
                v-model="goodsItem.spmxxfScore"
              />
            </li>
            <li>
              <span>卖家服务</span>
              <van-rate
                class="rate"
                color="#D57E6A"
                v-model="goodsItem.mjfwtdScore"
              />
            </li>
            <li>
              <span>物流速度</span>
              <van-rate
                class="rate"
                color="#D57E6A"
                v-model="goodsItem.wlfhsdScore"
              />
            </li>
          </ul>
        </div>

        <!--<div class="anonymous-comment-bar">
	        <van-checkbox v-model="checked">匿名</van-checkbox>
	        <span class="tips">你写的评论会以匿名的形式展现</span>
	      </div>-->
      </div>

      <van-button
        :loading="submiting"
        @click="submit"
        class="submit-btn primary-btn"
        type="primary"
      >
        提交
      </van-button>
    </div>
  </AppView>
</template>

<script>
import { setImg } from "~/utils/qiniu";
import CUploadList from '~/components/common/upload/customList'
import { customUpload, getKey, uploadSectionFile } from "~/utils/qiniu";
export default {
  components: {
    CUploadList
  },
  data() {
    return {
      data: {},
      form: {
        orderId: this.$route.query.id,
        gcList: []
      },
      imgs: [],
      checked: true,
      submiting: false
    };
  },
  deactivated() {
    this.$destroy()
  },
  beforeMount() {
    this.$loading(this.$service("orderCommentGoodVOList", {
      resources: [this.$route.query.orderNumber]
    })).then(data => {
      this.data = data.data
      this.data.orderGoodVOList.map((item, index) => {
        this.$set(item, "content", "");
        this.$set(item, "spmxxfScore", 5)
        this.$set(item, "mjfwtdScore", 5)
        this.$set(item, "wlfhsdScore", 5)
        this.$set(item, "gallerys", [])
        // this.$set(item, "imgs", [])
        this.imgs.push([])
      })
    })
  },
  methods: {
    submit() {
      this.submiting = true;
      this.data.orderGoodVOList.forEach(data => {
        if (
          data.content ||
          data.spmxxfScore ||
          data.mjfwtdScore ||
          data.wlfhsdScore ||
          data.gallerys.length
        ) {
          this.form.gcList.push({
            content: data.content,
            spmxxfScore: data.spmxxfScore,
            mjfwtdScore: data.mjfwtdScore,
            wlfhsdScore: data.wlfhsdScore,
            goodsId: data.goodId,
            gallerys: data.gallerys
          });
        }
      });
      if (this.form.gcList.length == 0) {
        this.$toast("请填写评价");
        this.submiting = false;
        return false;
      }
      this.$service("orderCommentAdd", {
        data: this.form
      })
        .then(data => {
          this.submiting = false
          this.$toast({ type: "success", message: "评价成功" });
          if (this.$native.isApp()) {
            this.$native.goToHome();
          } else {
            this.$router.go(-1);
          }
        })
        .catch(() => {
          this.submiting = false;
        });
    },
    uploadImgs(key, index) {
      console.log(key, index)
      this.data.orderGoodVOList[index].gallerys.push(key)
    },
    uploadSuccess(imgs, index) {
      this.data.orderGoodVOList[index].gallerys = imgs
    },
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

      /* if (file.size > 3 * 1024 * 1024) {
        this.$toast("图片大小不得超过3兆（M）");
        return false;
      } */
      return true;
    },
    afterRead(file, detail) {
      uploadSectionFile(file.file, 3).then((res) => {
        customUpload(res)
          .then(response => {
            const result = response.data
            this.data.orderGoodVOList[detail.name].gallerys.push(result.data.picUrl)
            this.imgs[detail.name] = [...new Set(this.imgs[detail.name])];
          })
          .catch(() => {
            this.$toast({ type: "fail", message: "上传错误" });
          })
      })
    },
    beforeDelete(file, detail) {
      let index;
      this.imgs[detail.name].map((item, i) => {
        if (item.file && item.file.name == file.file.name) {
          index = i;
        } else if (item == file.url) {
          index = i;
        }
      })
      this.imgs[detail.name].splice(index, 1)
      this.data.orderGoodVOList[detail.name].gallerys.splice(index, 1);
      this.$forceUpdate()
    }

  }
};
</script>

<style lang="postcss">
.Order-comment-page {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 6px;
  & .comment-results {
    background: #fff;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    & li {
      font-size: 15px;
      & strong {
        margin-left: 8px;
        vertical-align: middle;
      }
    }
    & .commodity-img {
      width: 50px;
      height: 50px;
      background: url("https://o818xvhxo.qnssl.com/o_1cfc7utrqp6gktc3j5hf318lc9.jpg");
      background-size: 100% 100%;
    }
    & .comment {
      flex-grow: 1;
      text-align: center;
      & strong {
        color: #999;
      }
      & strong.active {
        color: #e34959;
      }
    }
  }
  & .store-score-bar {
    background: #fff;
    margin: 10px 0;
    font-size: 14px;
    color: #333;
    border-radius: 6px;
    & .store-score {
      padding: 0 20px;
      line-height: 50px;
      & i {
        margin-right: 10px;
      }
      & strong {
        vertical-align: middle;
      }
    }
    & ul li {
      padding: 10px;
      line-height: 20px;
      display: flex;
      & span {
        vertical-align: middle;
        margin-right: 30px;
      }
      & .rate svg {
        vertical-align: middle;
        line-height: 30px;
        margin: 0 5px;
      }
    }
  }
  & .anonymous-comment-bar {
    background: #fff;
    display: flex;
    line-height: 40px;
    position: relative;
    padding: 0 15px;
    & .tips {
      color: #ccc;
      font-size: 12px;
      vertical-align: middle;
      position: absolute;
      right: 15px;
    }
  }
}
.skuGoods {
  background: #ffffff;
  padding: 10px;
  border-bottom: 1px solid #f4f4f4;
  & img {
    margin-right: 8px;
    width: 31px;
    height: 31px;
    border-radius: 50%;
    vertical-align: middle;
  }
  & span {
    width: 260px;
    line-height: 31px;
    vertical-align: middle;
    display: inline-block;
    font-size: 15px;
  }
}
.VUpload-area.min {
  width: 73px !important;
  height: 73px !important;
}
.tip {
  padding: 0 10px 12px;
  font-size: 12px;
  color: #aaaaab;
  background: #fff;
}
.van-cell {
  font-size: 12px;
  padding: 10px;
}
.van-button.submit-btn {
  /* position: fixed; */
  /* bottom: 37px; */
  /* left: 12px; */
  /* right: 12px; */
  margin-top: 100px;
  width: 351px;
  border-radius: 4px;
  font-size: 16px;
  z-index: 99;
  border-color: #df735a;
  background: #df735a;
}
.bg {
  width: 84px;
  height: 84px;
  background: #fff url(../../../assets/images/icon_uploadadd.png) no-repeat
    center;
  background-size: 50px;
}
/* .skuGoods {
  position: relative;
  background: #ffffff;
  padding: 3px 16px;
  padding-left: 36px;
  border-bottom: 1px solid #F4F4F4;
  & img {
    width: 31px;
    height: 31px;
    position: absolute;
    left: 16px;
    top: 3px;
    border-radius: 50%;
  }
  & span {
    width: 260px;
    line-height: 1.2;
  }
}*/
</style>
