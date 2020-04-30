<template>
  <AppView
    title="喜欢"
    class="Info"
    :clickLeft="clickLeft"
  >
    <div v-if="showList && hasLoad">
      <div
        class="top-box"
        v-show="showTotal"
      >
        <p class="edit-box">
          <span>你喜欢了 <span class="red">{{ total }}</span> 条内容</span>
          <span
            class="edit-btn"
            @click="hideTotal"
          >
            <van-icon name="cross" /></span>
        </p>
      </div>

      <AppList
        name="userLikeList"
        :query="query"
        :isDisabled="true"
        :getData="
        () =>
          this.$service('userLikeList', {
            data: this.query
          })
      "
        ref="list"
      >
        <template slot-scope="{ list }">
          <div
            class="list-box"
            ref="listBox"
            id="listBox"
          >
            <div
              class="collect-block-item vertical"
              v-for="(goods, i) in list"
              :key="i"
            >
              <AppCard
                :data="{
                  id: goods.id,
                  imgUrl: goods.thumbnail,
                  title: goods.title,
                  brief: goods.brief,
                  columnName: goods.columnName,
                  likeNumber: goods.likeNumber
                }"
                @likeSuccess="likeSuccess"
                @click.native="toDetail(goods.type, goods.id)"
              />
            </div>
          </div>
        </template>
      </AppList>      
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
      hasLoad: false,
      showTotal: true
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
  },
  mounted() {
    if (this.$native.isApp()) {
      this.$native.getTitle("喜欢");
    }
  },
  deactivated() {
    this.$destroy();
  },
  head() {
    return {
      title: "喜欢"
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
    hideTotal(type) {
      this.showTotal = false
      document.querySelector('#listBox').style.paddingTop = 0
    },
    likeSuccess(type) {
      if (type) {
        this.total++
      } else {
        this.total--
      }
    },
    clickLeft() {
      if (this.$native.isApp()) {
        this.$native.goToHome();
      } else {
        this.$router.go(-1);
      }
    },
    linkJewelryCircle() {
      if (this.$native.isApp()) {
        this.$native.goToJewelryCircle();
      } else {
        this.$router.push({ name: "jewelryCircle" });
      }
    },
    toDetail(type, id) {
      if (type === 1) {
        if (this.$native.isApp()) {
          this.$native.goToJewelryDetail(id)
        } else {
          this.$router.push({
            name: "jewelryCircle-detail",
            query: { id: id }
          })
        }
      } else {
        if (this.$native.isApp()) {
          this.$native.goToJewelryVideo(id)
        } else {
          this.$router.push({
            name: "jewelryCircle-videoDetail",
            query: { id: id }
          })
        }
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.Info {
  background: #f2f2f2;
}
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
.top-box {
  position: fixed;
  z-index: 9;
  padding: 10px;
  width: calc(100% - 20px);
  background: #f2f2f2;
}
.edit-box {
  /* position: fixed;
  margin: 10px; */
  box-sizing: border-box;
  /* width: calc(100% - 20px); */
  padding: 0 20px;
  line-height: 45px;
  color: #333;
  font-size: 14px;
  /* z-index: 9; */
  background: #fff;
  border-radius: 5px;
  & .edit-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 8px;
    width: 17px;
    line-height: 27px;
  }
}
.list-box {
  padding-top: 65px;
}
.list-box.active-list-box {
  padding-bottom: 44px;
}
.collect-block-item {
  background: white;
  position: relative;
  margin: 10px;
  border-radius: 5px;
  overflow: hidden;
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
