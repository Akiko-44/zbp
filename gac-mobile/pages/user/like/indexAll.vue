<template>
  <AppView
    title="喜欢的内容"
    class="Info"
    :clickLeft="clickLeft"
  >
    <div v-if="showList && hasLoad">
      <p class="edit-box">
        <span>你喜欢了 <span class="red">{{ total }}</span> 条内容</span>
        <span
          class="fr edit-btn"
          @click="edit"
        >{{
          active ? "完成" : "编辑"
        }}</span>
      </p>
      <div
        class="list-box"
        ref="listBox"
        id="listBox"
        :class="active ? 'active-list-box' : ''"
      >
        <div
          class="collect-block-item vertical"
          v-for="(goods, i) in goodsList"
          :key="i"
        >
          <van-checkbox
            v-show="active"
            class="checkbox"
            @click.native="goodsItemClick(goods.checked, i)"
            v-model="goods.checked"
          ></van-checkbox>
          <AppCard
            :class="active ? 'edit-card-item' : ''"
            :data="{
              imgUrl: goods.thumbnail,
              title: goods.title,
              brief: goods.brief,
              columnName: goods.columnName,
              likeNumber: goods.likeNumber
            }"
            @click.native="toDetail(goods.type, goods.id)"
          />
        </div>
      </div>
      <div
        class="height-span"
        v-if="active"
      >
        <div class="cart-footer van-hairline--top row-between vertical">
          <div class="select-all item-center">
            <van-checkbox
              class="checkbox"
              v-model="allChecked"
              @click.native="checkAll"
            ></van-checkbox>
            <span class="select-all-text">全选（{{ total }}条）</span>
          </div>
          <div class="clearing item-center">
            <van-button
              @click="remove"
              class="primary-btn"
              type="primary"
            >
              删除
            </van-button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="no-content"
      v-if="!showList && hasLoad"
    >
      <img
        src="../../../assets/images/no-content.png"
        alt=""
      />
      <p>您还没有喜欢的内容</p>
      <p>快去<span class="red">珠宝圈</span>逛逛吧</p>
      <van-button
        type="danger"
        class="link-jewelry-circle"
        @click.native="linkJewelryCircle"
      >去逛逛吧</van-button>
    </div>
  </AppView>
</template>

<script>
import AppCard from "./item";
import AppList from "~/components/common/list";

export default {
  data() {
    return {
      // dataLoading: true,
      active: false,
      showList: false,
      postData: {
        offset: 1,
        limit: 20
      },
      query: {
        offset: 1,
        limit: 20
      },
      goodsList: [],
      total: 0,
      allChecked: false,
      hasLoad: false
    }
  },
  components: {
    AppList,
    AppCard
  },
  // activated() {
  //   this.getList();
  //   if (this.$native.isApp()) {
  //     this.$native.getTitle("喜欢的内容");
  //   }
  // },
  created() {
    this.getList();
    if (this.$native.isApp()) {
      this.$native.getTitle("喜欢的内容");
    }
  },
  deactivated() {
    this.$destroy();
  },
  head() {
    return {
      title: "喜欢的内容"
    };
  },
  methods: {
    getList() {
      // this.dataLoading = true
      this.$toast.loading({
        message: '加载中',
        duration: 0
      })
      this.$service("userLikeList")
        .then(result => {
          this.$toast.clear()
          this.hasLoad = true;
          this.goodsList = result.data;
          // this.dataLoading = false;
          if (result.data.total) {
            this.showList = true;
            this.goodsList = result.data.records;
            this.total = result.data.total;
            this.goodsList.forEach(goods => {
              goods.checked = false;
            });
          } else {
            this.showList = false;
          }
        })
        .catch(() => {
          // this.dataLoading = false;
          this.$toast.clear()
        });
    },
    clickLeft() {
      if (this.$native.isApp()) {
        this.$native.goToHome();
      } else {
        this.$router.go(-1);
      }
    },
    goodsItemClick(value, index) {
      this.goodsList[index].checked = !value;
      let flag = true
      this.goodsList.map((item, i) => {
        if (item.checked === false) {
          flag = false
        }
      })
      if (flag) {
        this.allChecked = true
      } else {
        this.allChecked = false
      }
      this.$forceUpdate();
    },
    checkAll() {
      this.allChecked = !this.allChecked;
      this.goodsList.forEach(goods => {
        goods.checked = this.allChecked;
      });
      this.$forceUpdate();
    },
    edit() {
      this.active = !this.active;
      this.goodsList.forEach(goods => {
        goods.checked = false;
      });
    },
    linkJewelryCircle() {
      if (this.$native.isApp()) {
        this.$native.goToJewelryCircle();
      } else {
        this.$router.push({ name: "news-jewelryCircle" });
      }
    },
    toDetail(type, id) {
      if (type === 1) {
        this.$router.push({
          name: "news-jewelryCircle-detail",
          query: { id: id }
        });
      } else {
        if (this.$native.isApp()) {
          this.$native.goToJewelryVideo(id);
        } else {
          this.$router.push({
            name: "news-jewelryCircle-videoDetail",
            query: { id: id }
          });
        }
      }
    },
    remove() {
      let removeGoodsList = this.goodsList.filter(item => item.checked);
      let checked = [];
      if (removeGoodsList.length == 0) {
        this.$toast("请至少选择一项");
      } else {
        removeGoodsList.forEach(item => {
          checked.push(item.id);
        });
        this.$service("userDeleteLike", {
          data: { ids: checked.join(",") }
        }).then(result => {
          this.$toast("取消点赞成功");
          this.getList();
        });
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.no-content {
  padding-top: 70px;
  text-align: center;
  font-size: 15px;
  color: #999;
  & img {
    width: 330px;
  }
  & p {
    margin-bottom: 15px;
  }
  & .link-jewelry-circle {
    width: 110px;
    height: 44px;
    background: #df735a;
    border-color: #df735a;
  }
}
.edit-box {
  position: fixed;
  /* top: 0; */
  width: calc(100% - 40px);
  padding: 0 20px;
  line-height: 30px;
  color: #999;
  font-size: 12px;
  z-index: 9;
  background: #f2f2f2;
  & .edit-btn {
    color: #2d68c2;
  }
}
.list-box {
  padding-top: 30px;
}
.list-box.active-list-box {
  padding-bottom: 44px;
}
.collect-block-item {
  background: white;
  position: relative;
  margin-bottom: 1px;
  & .animate {
    position: relative;
    transition: transform 0.3s;
    transform: translate3d(0, 0, 0);
    z-index: 2;
    &.active {
      transform: translate3d(-60px, 0, 0);
    }
  }
  & .checkbox {
    margin-left: 10px;
    margin-right: 10px;
    width: 20px;
  }
  & .app-card-item {
    /* flex: 1; */
    width: 355px;
    &.edit-card-item {
      width: 324px;
      padding-left: 0;
    }
  }
}
.cart-footer {
  padding-left: 10px;
  background: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  & .select-all-text {
    display: inline-block;
    margin-left: 10px;
  }
}
.primary-btn {
  width: 100px;
  background: #fb746e;
  border-color: #fb746e;
  border-radius: 0;
}
</style>
