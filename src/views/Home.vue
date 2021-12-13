<template>
  <div class="home">
    <div class="home-header">
      <SellerHeader :seller="seller" />
    </div>

    <div class="home-content">
      <div class="home-content-tab">
        <ul class="tab">
          <li
            v-for="(item, index) in tabs"
            :key="item"
            :class="index === tabIndex ? 'active' : ''"
            @click="switchTab(index)"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="home-content-main">
        <SellerGoods v-show="curTab === 'SellerGoods'" :goods="goods" />
        <SellerRatings v-show="curTab === 'SellerRatings'" />
        <SellerInfo v-show="curTab === 'SellerInfo'" />
      </div>
    </div>

    <div class="home-footer">
      <SellerCart :seller="seller" />
    </div>
  </div>
</template>

<script>
import SellerHeader from "components/SellerHeader";
import SellerGoods from "components/SellerGoods";
import SellerRatings from "components/SellerRatings";
import SellerInfo from "components/SellerInfo";
import SellerCart from "components/SellerCart";
const data = require("../../data.json");

export default {
  name: "Home",
  components: {
    SellerHeader,
    SellerGoods,
    SellerRatings,
    SellerInfo,
    SellerCart,
  },

  data() {
    return {
      curTab: "SellerGoods",
      goods: data.goods,
      seller: data.seller,
      ratings: data.ratings,
      tabs: ["商品", "评价", "商家"],
      tabIndex: 0,
    };
  },

  created() {
    console.log("goods:", this.goods);
    console.log("seller:", this.seller);
    console.log("ratings:", this.ratings);
  },

  methods: {
    switchTab(index) {
      const moduleNames = ["SellerGoods", "SellerRatings", "SellerInfo"];
      this.tabIndex = index;
      this.curTab = moduleNames[index];
    },
  },
};
</script>
<style lang="less">
@import "~assets/style/var.less";
.home {
  height: 100%;
  display: flex;
  flex-direction: column;

  &-header {
    flex: 0 0 auto;
    background-color: rgba(7, 17, 27, 0.5);
    overflow: hidden;
  }

  &-content {
    overflow-y: scroll;
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    // overflow: hidden;

    &-tab {
      flex: 0 0 0.8rem;

      .tab {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: @size_subtitle;
        color: #4d555d;

        li {
          text-align: center;

          &.active {
            color: @red;
          }
        }
      }
    }

    &-main {
      flex: 1;
      flex: 1 1 0%;
      overflow-y: auto;
    }
  }

  &-footer {
    flex: 0 0 0.96rem;
    background-color: #141d27;
  }
}
</style>
