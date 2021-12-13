<template>
  <div class="seller-goods">
    <div class="seller-goods-aside">
      <ul class="nav" ref="categoryScroll">
        <li
          v-for="(category, index) in goods"
          ref="categoryItem"
          :key="index"
          :class="categoryIndex === index ? 'active' : ''"
          @click="tabCategory(index)"
        >
          <div class="box-item">
            <div class="box-item-inner">
              <Brand
                v-if="category.type !== -1"
                :name="getTypeName(category.type, 4)"
                width=".32rem"
                height=".32rem"
              />
              {{ category.name }}
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="seller-goods-content" ref="contentScroll" @scroll="onscroll">
      <div
        class="seller-goods-content-item"
        v-for="(category, index) in goods"
        :key="index"
      >
        <div class="header" ref="stickyHeader">{{ category.name }}</div>

        <div
          class="box-content"
          v-for="(food, index) in category.foods"
          :key="index"
        >
          <div class="thumb">
            <img :src="food.icon ? food.icon : food.image" :alt="food.name" />
          </div>

          <div class="text-container">
            <div class="title">{{ food.name }}</div>

            <div class="assist" v-if="food.description">
              {{ food.description }}
            </div>

            <div class="assist">
              <span>月售{{ food.sellCount }}份</span>
              <span>好评率{{ food.rating }}%</span>
            </div>

            <div class="price">
              <span class="price-cur">
                <span class="price-symbol">&yen;</span>
                <span>{{ food.price }}</span>
              </span>

              <span class="price-old" v-if="food.oldPrice">
                <span class="price-symbol">&yen;</span>
                <span>{{ food.oldPrice }}</span>
              </span>
            </div>
          </div>

          <!-- 加减控件 -->
          <div class="controller">
            <Counter
              isDrop
              :count="food.count"
              @get-count="updateCount(arguments, food)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Brand from "./Brand.vue";
import Counter from "components/Counter";
import { typeName } from "assets/js/config";
import { state, mutations } from "store";
export default {
  components: { Brand, Counter },
  data() {
    return {
      categoryIndex: 0,
      contentOffsetTops: [], // stickyHeader 的 offsetTop 集合
      categoryOffsetTops: [], // tabItem 的 offsetTop 集合
    };
  },

  computed: {
    cartSet() {
      return state.cartSet;
    },
  },

  props: {
    goods: {
      type: Array,
      required: true,
    },
  },

  mounted() {
    // 获取所有置顶元素的 offsetTop
    this.$refs.stickyHeader.forEach((el) => {
      this.contentOffsetTops.push(el.offsetTop);
    });
    // 获取所有 categoryItem 的 offsetTop
    this.$refs.categoryItem.forEach((el) => {
      this.categoryOffsetTops.push(el.offsetTop);
    });
  },

  methods: {
    updateCartSet: mutations.updateCartSet,

    getTypeName(type) {
      return typeName(type, 2);
    },

    // 切换 tab
    tabCategory(index) {
      this.categoryIndex = index;

      // 切换 tab 时内容随着滚动
      this.$refs.contentScroll.scrollTo(0, this.contentOffsetTops[index]);
    },

    // 内容滚动
    onscroll(e) {
      const scrollTop = e.target.scrollTop;
      const lastScrollTop =
        this.contentOffsetTops[this.contentOffsetTops.length - 1];
      const index =
        scrollTop >= lastScrollTop
          ? this.contentOffsetTops.length - 1
          : this.contentOffsetTops.findIndex(
              (value, idx) => value > scrollTop
            ) - 1;

      this.categoryIndex = index;

      // category 滚动
      this.$refs.categoryScroll.scrollTo(0, this.categoryOffsetTops[index]);
    },
    /**
     * 更新购物车
     * @param {Array} args count = count
     * @param {Object} item food = item
     */
    updateCount(args, food) {
      const count = args[0];

      Vue.set(food, "count", count);
      this.updateCartSet(food, count);
    },
  },
};
</script>

<style lang="less">
@import "~assets/style/var.less";

.seller-goods {
  height: 100%;
  display: flex;

  &-aside {
    flex: 0 0 1.6rem;
    height: 100%;

    .nav {
      position: relative;
      height: 100%;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }

      li {
        padding: 0 @space;
        background-color: #f3f5f7;

        &.active {
          background-color: #fff;

          & + li {
            .box-item {
              border-top: none;
            }
          }

          .box-item {
            border-top: none;
          }
        }

        .box-item {
          display: flex;
          align-items: center;

          height: 1.08rem;
          font-size: @size_text;
          color: #373f48;
          border-top: 2px solid #e5e8ea;

          &-inner {
            i {
              float: left;
            }
          }
        }
      }
    }
  }

  &-content {
    position: relative;
    // overflow-y: auto;
    overflow: auto;
    flex: 1 1 0%;
    background-color: #fff;

    .header {
      position: sticky;
      top: 0;
      z-index: 1;
      line-height: 0.52rem;
      color: #9ea4a9;
      font-size: @size_text;
      border-left: 4px solid #d9dde1;
      background-color: #f3f5f7;
      padding-left: 0.28rem;
    }

    .box-content {
      position: relative;
      padding: @space*1.5;
      border-bottom: 1px solid #e4e7ea;
      display: flex;

      .thumb {
        width: 1.14rem;
        height: 1.14rem;
        overflow: hidden;
        margin-right: 0.2rem;
        flex: 0 0 auto;

        img {
          width: 100%;
          // height: 100%;
        }
      }

      .text-container {
        flex: 1 1 0%;

        .title {
          font-size: @size_subtitle;
          color: @color_subtitle;
          line-height: 1em;
        }

        .assist {
          color: @color_assist;
          font-size: @size_assist;
          margin-top: 0.16rem;

          span {
            margin-left: @space;

            &:first-child {
              margin-left: 0;
            }
          }
        }

        .price {
          // margin-top: 0.16rem;
          font-size: @size_subtitle;
          font-weight: bold;

          &-cur {
            color: @red;
          }

          &-old {
            margin-left: 0.16rem;
            color: #93999f;
            text-decoration: line-through;
          }

          &-symbol {
            display: inline-block;
            font-size: 0.4rem;
            transform: scale(0.5, 0.5) translateY(0.12rem);
          }
        }
      }

      .controller {
        position: absolute;
        bottom: 0.36rem;
        right: 0.36rem;
      }
    }
  }
}
</style>
