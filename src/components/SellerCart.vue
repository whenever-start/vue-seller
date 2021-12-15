<template>
  <div class="seller-cart">
    <!-- bar -->
    <div class="seller-cart-bar" @click="openPopup">
      <!-- left -->
      <div class="seller-cart-bar-left">
        <div class="box-icon" :class="cartSet.length ? 'active' : ''">
          <div class="badge" v-show="totalCount > 0">{{ totalCount }}</div>

          <i class="iconfont icon-gouwuche"></i>
        </div>

        <div class="price" :class="cartSet.length ? 'active' : ''">
          &yen; {{ totalPrice }}
        </div>
      </div>

      <!-- mid -->
      <div class="seller-cart-bar-mid">
        <span>另需配送费&yen;{{ seller.deliveryPrice }}元</span>
      </div>

      <!-- right -->
      <div
        class="seller-cart-bar-right"
        :class="totalPrice >= seller.minPrice ? 'active' : ''"
        @click.stop.prevent="pay"
      >
        <span>{{ payText }}</span>
      </div>
    </div>

    <!-- popup -->
    <van-overlay :show="show" @click="show = !show">
      <transition name="popup-slide-bottom">
        <div class="box-cart-list" v-show="show" ref="popupContent" @click.stop>
          <div class="cart-list-header">
            <span>购物车</span>

            <span class="cart-list-header--blue" @click="empty">清空</span>
          </div>
          <ul class="cart-list">
            <li class="cart-list-item" v-for="food in cartSet" :key="food.name">
              <div class="item-left">{{ food.name }}</div>

              <div class="item-right">
                <span class="price">&yen;{{ food.count * food.price }}</span>

                <Counter
                  :count="food.count"
                  @get-count="updateCount(arguments, food)"
                />
              </div>
            </li>
          </ul>
        </div>
      </transition>
    </van-overlay>
  </div>
</template>

<script>
import Counter from "components/Counter";
import { state, mutations } from "store";
export default {
  name: "SellerCart",
  components: {
    Counter,
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    cartSet: () => state.cartSet,
    seller: () => state.seller,

    totalPrice() {
      return this.cartSet.reduce(function (acc, food) {
        return acc + food.count * food.price;
      }, 0);
    },

    totalCount() {
      return this.cartSet.reduce(function (acc, food) {
        return acc + food.count;
      }, 0);
    },

    payText() {
      const totalPrice = this.totalPrice;
      const minPrice = this.seller.minPrice;
      if (totalPrice === 0) {
        return `￥${minPrice}起送`;
      } else if (totalPrice < minPrice && totalPrice > 0) {
        return `还差￥${minPrice - totalPrice}起送`;
      } else {
        return "去结算";
      }
    },
  },

  watch: {
    cartSet(newVal) {
      if (newVal.length === 0) {
        this.show = false;
      }
    },
  },
  methods: {
    updateCartSet: mutations.updateCartSet,
    emptyCarSet: mutations.emptyCarSet,

    openPopup() {
      if (!this.cartSet.length) return;
      this.show = !this.show;
    },

    updateCount(args, food) {
      const count = args[0];
      this.updateCartSet(food, count);
    },

    pay() {
      if (this.totalPrice < this.seller.minPrice) return;
      this.$dialog({
        title: "支付",
        message: `您需要支付${this.totalPrice}元`,
      });
    },

    empty() {
      this.$dialog
        .confirm({
          message: "确认要清空?",
        })
        .then(() => {
          this.emptyCarSet();
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/style/var.less";

.seller-cart {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.24rem;
  line-height: 0.96rem;
  text-align: center;

  // 使在 Food.vue 页面也能看见购物车列表
  .van-overlay {
    z-index: 1000;
  }

  // seller-cart-bar
  &-bar {
    position: relative;
    z-index: 1999;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 0.96rem;

    &-left,
    &-mid,
    &-right {
      height: 100%;
    }

    &-left {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex: 1 0 auto;
      background-color: #131d26;

      .box-icon {
        position: absolute;
        top: -0.16rem;
        left: 0.36rem;
        width: 1.12rem;
        height: 1.12rem;
        text-align: center;
        line-height: 1.12rem;
        border-radius: 50%;
        background-color: #131d26;

        .badge {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 0.32rem;
          height: 0.32rem;
          line-height: 0.32rem;
          border-radius: 50%;
          background-color: @red;
          color: @white;
          font-size: @size_assist;
        }

        i {
          padding: 0.2rem;
          border-radius: 50%;
          background-color: #2b343d;
          font-size: 0.48rem;
          color: #808589;
        }

        &.active {
          i {
            color: @white;
            background-color: @blue;
          }
        }
      }

      .price {
        margin-right: 0.24rem;
        margin-left: 1.6rem;
        font-size: @size_title;
        font-weight: bold;

        &.active {
          color: @white;
        }
      }

      &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 0.44rem;
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    &-mid {
      flex: 11 0 auto;

      background-color: #131d26;
    }

    &-right {
      flex: 0 0 2.1rem;
      background-color: #2b343b;

      &.active {
        background-color: @green;
        color: @white;
      }
    }
  }

  .box-cart-list {
    position: absolute;
    z-index: 1;
    bottom: 0.96rem;
    left: 0;
    width: 100%;
    color: #07111b;
    font-size: @size_text;
    transition: 0.2s ease-out;

    .cart-list-header {
      display: flex;
      justify-content: space-between;
      padding: 0 @space;
      background-color: #f3f5f7;

      &--blue {
        color: @blue;
      }
    }

    .cart-list {
      background-color: @white;
      max-height: 5rem;
      overflow: auto;

      &-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 @space;
        height: 0.96rem;

        .item-right {
          display: flex;
          align-items: center;

          .price {
            color: @red;
            margin-right: @space;
          }
        }
      }
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  // transition: height 5s;
  transition: all 1s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0;
  background-color: red;
}
.slide-enter-to,
.slide-leave {
  height: auto;
  background-color: pink;
}

.popup-slide-bottom-enter,
.popup-slide-bottom-leave-active {
  transform: translateY(100%);
}
</style>
