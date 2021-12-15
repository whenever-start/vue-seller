<template>
  <div class="seller-info">
    <!-- header -->
    <div class="seller-info-header">
      <div class="seller-info-header-top">
        <div>
          <div class="head">{{ seller.name }}</div>

          <div class="assist">
            <van-rate
              disabled
              disabled-color="#ff9900"
              size=".36rem"
              v-model="seller.score"
            />

            <span class="rating-count">({{ seller.ratingCount }})</span>
            <span class="sell-count">月售{{ seller.sellCount || 0 }}单</span>
          </div>
        </div>

        <div class="collect">
          <van-icon size=".48rem" color="#f01414" name="like" />
          <span class="label">已收藏</span>
        </div>
      </div>

      <div class="seller-info-header-bot">
        <div class="bot-item">
          <span class="assist-text">起送价</span>
          <div class="text">
            <span class="num">{{ seller.minPrice }}</span>
            元
          </div>
        </div>

        <div class="bot-item">
          <span class="assist-text">商家配送</span>
          <div class="text">
            <span class="num">{{ seller.deliveryPrice }}</span>
            元
          </div>
        </div>

        <div class="bot-item">
          <span class="assist-text">平均配送时间</span>
          <div class="text">
            <span class="num">{{ seller.deliveryTime }}</span>
            元
          </div>
        </div>
      </div>
    </div>

    <!-- bulletin -->
    <div class="seller-info-bulletin">
      <div class="head">公告与活动</div>

      <p class="bulletin-text">{{ seller.bulletin }}</p>

      <ul class="support-list">
        <li
          class="support-list-item"
          v-for="(support, index) in seller.supports"
          :key="index"
        >
          <Brand
            :name="typeName(support.type, 4)"
            width=".32rem"
            height=".32rem"
          />
          <span class="label">{{ support.description }}</span>
        </li>
      </ul>
    </div>

    <!-- image-show -->
    <div class="seller-info-image-show">
      <div class="head">商家实景</div>

      <ul class="show-list">
        <li class="thumb" v-for="(pic, index) in seller.pics" :key="index">
          <img :src="pic" alt="商家实景" />
        </li>
      </ul>
    </div>

    <!-- info -->
    <div class="seller-info-info">
      <div class="head">商家信息</div>

      <ul class="info-list">
        <li
          class="info-list-item"
          v-for="(info, index) in seller.infos"
          :key="index"
        >
          {{ info }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { state } from "store";
import Brand from "components/Brand";
import { typeName } from "assets/js/config";

export default {
  name: "SellerInfo",

  components: { Brand },

  computed: {
    seller: () => state.seller,
  },

  methods: {
    typeName: typeName,
  },
};
</script>

<style lang="less" scoped>
@import "~assets/style/var.less";

.seller-info {
  &-header,
  &-bulletin,
  &-image-show,
  &-info {
    padding: 1.5 * @space;
    background-color: @white;

    .head {
      font-size: @size_subtitle;
      color: @color_title;
      font-weight: bold;
    }
  }

  // seller-info-header
  &-header {
    // top
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 1.5 * @space;

      .assist {
        display: flex;
        align-items: center;
        margin-top: 0.16rem;
        font-size: @size_assist;
        color: @color_subtitle;

        .rating-count {
          margin-left: 0.16rem;
        }
        .sell-count {
          margin-left: 0.24rem;
        }
      }

      .collect {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 0.9rem;

        .label {
          font-size: @size_assist;
          color: @color_subtitle;
        }
      }
    }

    // bot
    &-bot {
      display: flex;
      padding-top: 0.36rem;
      border-top: 1px solid rgba(7, 17, 27, 0.1);

      .bot-item {
        flex: 1;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;

        &:last-child {
          border-right: none;
        }

        .assist-text {
          color: @color_assist;
          font-size: @size_assist;
        }

        .text {
          color: @color_title;
          font-size: @size_assist;

          .num {
            font-size: 0.48rem;
          }
        }
      }
    }
  }

  // seller-info-bulletin
  &-bulletin {
    margin-top: 0.32rem;

    .bulletin-text {
      padding: 0.16rem @space 0.32rem;
      font-size: @size_text;
      line-height: 0.48rem;
      color: @red;
    }

    .support-list {
      &-item {
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        padding: 0.32rem @space;
        line-height: 0.32rem;

        &:last-child {
          padding-bottom: 0;
        }

        .brand {
          vertical-align: middle;
        }
        .label {
          margin-left: 0.12rem;
          font-size: @size_text;
          color: @color_title;
          vertical-align: middle;
        }
      }
    }
  }

  // seller-info-show
  &-image-show {
    margin-top: 0.32rem;

    .show-list {
      max-width: 100%;
      display: flex;
      overflow-x: auto;
      margin-top: @space;

      &::-webkit-scrollbar {
        display: none;
      }

      .thumb {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1 0 2.4rem;
        height: 1.8rem;
        overflow: hidden;
        background-color: @gray;
        margin-left: 0.12rem;

        &:first-child {
          margin-left: 0;
        }

        img {
          width: 100%;
        }
      }
    }
  }

  // seller-info-info
  &-info {
    margin-top: 0.32rem;

    .info-list {
      margin-top: @space;
      &-item {
        padding: 0.32rem @space;
        font-size: @size_text;
        line-height: 0.32rem;
        color: @color_title;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
      }
    }
  }
}
</style>
