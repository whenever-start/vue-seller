<template>
  <div class="seller-ratings">
    <!-- header -->
    <div class="seller-ratings-header">
      <div class="header-left">
        <div class="score">{{ seller.score }}</div>

        <div>综合评分</div>

        <div class="desc">高于周边商家{{ seller.rankRate }}%</div>
      </div>

      <div class="header-right">
        <div class="right-item">
          <span class="right-item-text">服务态度</span>
          <van-rate
            disabled
            disabled-color="#ff9900"
            size=".3rem"
            v-model="seller.serviceScore"
          />
          <span class="right-item-score">{{ seller.serviceScore }}</span>
        </div>

        <div class="right-item">
          <span class="right-item-text">商品评分</span>
          <van-rate
            disabled
            disabled-color="#ff9900"
            size=".3rem"
            v-model="seller.foodScore"
          />
          <span class="right-item-score">{{ seller.foodScore }}</span>
        </div>

        <div class="right-item">
          <span class="right-item-text">送达时间</span>
          <span class="right-item-desc">{{
            seller.deliveryTime | formatTime
          }}</span>
        </div>
      </div>
    </div>

    <!-- ratings -->
    <div class="seller-ratings-content">
      <Ratings :ratings="ratings" />
    </div>
  </div>
</template>

<script>
import Ratings from "components/Ratings";
import { state } from "store";

export default {
  name: "SellerRatings",

  components: { Ratings },

  computed: {
    seller: () => state.seller,
    ratings: () => state.ratings,
  },

  filters: {
    formatTime(min) {
      const h = parseInt(min / 60);
      if (h) {
        return `${h}小时${min % 60}分钟`;
      } else {
        return `${min}分钟`;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/style/var.less";

.seller-ratings {
  &-header {
    display: flex;
    background-color: @white;

    // header-left
    .header-left {
      position: relative;
      padding: 0.36rem 0;
      width: 2.75rem;
      text-align: center;
      color: @color_text;
      font-size: @size_text;

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        width: 1px;
        height: 1.58rem;
        background-color: rgba(7, 17, 27, 0.1);
      }

      .score {
        margin-bottom: 0.12rem;
        color: #ff9900;
        font-size: 0.48rem;
      }

      .desc {
        margin-top: 0.16rem;
        color: @color_assist;
        font-size: @size_assist;
      }
    }

    // header-right
    .header-right {
      padding: 0.36rem 0.48rem;

      .right-item {
        margin-top: 0.16rem;

        &:first-child {
          margin-top: 0;
        }

        &-text {
          font-size: @size_text;
          color: @size_text;
          margin-right: @space;
        }

        &-score {
          margin-left: @space;
          color: #ff9900;
          font-size: @size_text;
        }

        &-desc {
          color: @color_assist;
          font-size: @size_text;
        }
      }
    }
  }

  &-content {
    margin-top: 1.5 * @space;
    padding: 1.5 * @space;
    background-color: @white;
  }
}
</style>
