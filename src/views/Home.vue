<template>
  <div class="home">
    <!-- header -->
    <div class="home-header">
      <SellerHeader />
    </div>

    <!-- content -->
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
        <SellerGoods v-show="curTab === 'SellerGoods'" />
        <SellerRatings v-show="curTab === 'SellerRatings'" />
        <SellerInfo v-show="curTab === 'SellerInfo'" />
      </div>
    </div>

    <!-- footer -->
    <div class="home-footer">
      <SellerCart />
    </div>
  </div>
</template>

<script>
import SellerHeader from 'components/SellerHeader';
import SellerGoods from 'components/SellerGoods';
import SellerRatings from 'components/SellerRatings';
import SellerInfo from 'components/SellerInfo';
import SellerCart from 'components/SellerCart';
import { mutations } from 'store';
const data = require('../../data.json');

export default {
  name: 'Home',
  components: {
    SellerHeader,
    SellerGoods,
    SellerRatings,
    SellerInfo,
    SellerCart,
  },

  data() {
    return {
      curTab: 'SellerGoods',
      tabs: ['商品', '评价', '商家'],
      tabIndex: 0,
    };
  },

  created() {
    this.setGoods(data.goods);
    this.setSeller(data.seller);
    this.setRatings(data.ratings);
    console.log('goods:', data.goods);
    console.log('seller:', data.seller);
    console.log('ratings:', data.ratings);
  },

  methods: {
    setGoods: mutations.setGoods,
    setSeller: mutations.setSeller,
    setRatings: mutations.setRatings,

    switchTab(index) {
      const moduleNames = ['SellerGoods', 'SellerRatings', 'SellerInfo'];
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

  // home-header
  &-header {
    flex: 0 0 auto;
    background-color: rgba(7, 17, 27, 0.5);
    overflow: hidden;
  }

  // home-content
  &-content {
    overflow-y: scroll;
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    background-color: @gray;
    // overflow: hidden;

    &-tab {
      flex: 0 0 0.8rem;
      background-color: @white;
      border-bottom: 1px solid #e6e7e8;

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

  // home-footer
  &-footer {
    flex: 0 0 0.96rem;
    background-color: #141d27;
  }
}
</style>
