<template>
  <transition name="slide-left">
    <div class="food">
      <!-- back -->
      <van-icon
        class="food-back"
        @click="$emit('input', !value)"
        name="arrow-left"
      />

      <!-- image -->
      <div class="food-image">
        <img :src="food.image" :alt="food.name" />
      </div>

      <!-- info -->
      <div class="food-mod-wrap">
        <div class="food-info">
          <div class="food-info-title">{{ food.name }}</div>

          <div class="food-info-desc">
            <span>月售{{ food.sellCount }}份</span>
            <span>好评率{{ food.rating }}%</span>
          </div>

          <div class="food-info-bot">
            <div class="price">
              <span class="price-main"
                ><span class="price-main-symbol">&yen;</span
                >{{ food.price }}</span
              >
              <span class="price-assist" v-if="food.oldPrice"
                >&yen;{{ food.oldPrice }}</span
              >
            </div>

            <van-button
              class="food-info-bot-btn"
              v-show="!food.count"
              round
              color="#00a0dc"
              size="small"
              @click="addToCart"
              >加入购物车</van-button
            >

            <Counter
              :count="food.count"
              isDrop
              v-show="food.count"
              @get-count="updateCount(arguments, food)"
            />
          </div>
        </div>
      </div>

      <!-- introduction -->
      <div class="food-mod-wrap">
        <div class="food-introduction">
          <div class="food-mod-wrap-head">商品介绍</div>
          <p class="food-introduction-text">{{ food.info }}</p>
        </div>
      </div>

      <!-- ratings -->
      <div class="food-mod-wrap">
        <div class="food-mod-wrap-head">商品评价</div>

        <!-- v-if: ratings 避免未有数据时报错 -->
        <Ratings v-if="ratings" :ratings="ratings" simple />
      </div>
    </div>
  </transition>
</template>

<script>
import Counter from "components/Counter";
import Ratings from "components/Ratings";
import { state, mutations } from "store";

export default {
  name: "Food",

  components: {
    Counter,
    Ratings,
  },

  computed: {
    cartSet: () => state.cartSet,
    ratings() {
      return this.food.ratings;
    },
  },

  props: {
    food: {
      type: Object,
      default() {
        return {};
      },
    },
    value: {
      type: Boolean,
    },
  },

  methods: {
    updateCartSet: mutations.updateCartSet,

    addToCart() {
      this.updateCartSet(this.food, 1);
    },

    updateCount(args, food) {
      this.updateCartSet(food, args[0]);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/style/var.less";

.food {
  position: fixed;
  top: 0;
  bottom: 0.96rem;
  left: 0;
  z-index: 999;
  width: 100%;
  background-color: #f3f5f7;
  overflow-y: auto;

  // food-back
  &-back {
    position: absolute;
    top: @space;
    left: @space;
    padding: 2px;
    font-size: 0.56rem;
    color: @white;
    background-color: rgba(7, 17, 27, 0.1);
  }

  // food-image
  &-image {
    width: 100%;
    height: 7.5rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  // food-mod-wrap
  &-mod-wrap {
    padding: 1.5 * @space;
    background-color: @white;
    margin-bottom: 0.32rem;

    &-head {
      font-size: @size_subtitle;
      color: @color_title;
    }
  }

  // food-info
  &-info {
    &-title {
      font-size: @size_subtitle;
      color: @color_title;
      font-weight: bold;
    }

    &-desc {
      margin-top: 0.16rem;
      font-size: @size_assist;
      color: @color_assist;

      &:first-child {
        margin-right: @space;
      }
    }

    &-bot {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 1.5 * @space;

      .price {
        &-main {
          font-weight: bold;
          font-size: 0.28rem;
          color: @red;

          &-symbol {
            font-size: @size_assist;
          }
        }

        &-assist {
          margin-left: @space;
          font-size: @size_assist;
          color: @color_assist;
          text-decoration: line-through;
        }
      }

      &-btn {
        font-size: @size_assist;
        height: 0.48rem;
      }
    }
  }

  // food-introduction
  &-introduction {
    &-text {
      margin-top: 0.12rem;
      padding: 0 0.16rem;
      font-size: @size_text;
      color: @color_assist;
    }
  }
}

.slide-left-enter,
.slide-left-leave-to {
  transform: translateX(100%);
}
.slide-left-leave,
.slide-left-enter-to {
  transform: translateX(0%);
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: 0.3s linear;
}
</style>
