<template>
  <div class="seller-header">
    <div @click="show = !show">
      <div class="seller-header-content clearfix">
        <div class="thumb"><img :src="seller.avatar" alt="" /></div>

        <div class="seller-header-content-right">
          <div class="header">
            <Brand name="brand" />
            <h3 class="title">{{ seller.name }}</h3>
          </div>

          <p class="text">
            {{ seller.description }} / {{ seller.deliveryTime }}分钟送达
          </p>

          <div class="supports">
            <i :class="seller.supports[0].type"></i>
            <span class="desc">{{ seller.supports[0].description }}</span>
          </div>
        </div>

        <div class="rd-corner">
          {{ seller.supports.length }}个 <van-icon name="arrow" />
        </div>

        <!-- blur 层 -->
        <div
          class="blur"
          :style="{ backgroundImage: `url(${seller.avatar})` }"
        ></div>
      </div>

      <div class="seller-header-footer">
        <Brand name="bulletin" />
        <p class="van-ellipsis">{{ seller.bulletin }}</p>
        <van-icon name="arrow" />
      </div>
    </div>

    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      :overlay="false"
      :closeable="true"
      close-icon-position=""
      style="width: 100%; height: 100%; background-color: transparent"
    >
      <!-- 内容 -->
      <div class="section-promo">
        <div class="promo">
          <div class="promo-header">{{ seller.name }}</div>
          <div class="promo-rate">
            <van-rate
              v-model="seller.score"
              color="#ff9900"
              size=".48rem"
              gutter=".42rem"
            />
          </div>

          <div class="mod-box">
            <div class="mod-header">
              <div class="mod-header-text">优惠信息</div>
            </div>
            <div class="mod-content">
              <ul class="promo-info">
                <li v-for="(item, index) in seller.supports" :key="index">
                  <Brand
                    class="icon"
                    :name="getTypeName(item.type)"
                    width=".32rem"
                    height=".32rem"
                  />
                  {{ item.description }}
                </li>
              </ul>
            </div>
          </div>

          <div class="mod-box">
            <div class="mod-header">
              <div class="mod-header-text">商品信息</div>
            </div>
            <div class="mod-content">
              <p class="promo-text">
                {{ seller.bulletin }}
                {{ seller.bulletin }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- /内容 -->
    </van-popup>
  </div>
</template>

<script>
import { typeName } from "assets/js/config";
import Brand from "components/Brand";

export default {
  components: {
    Brand,
  },
  data() {
    return {
      show: false,
    };
  },

  props: {
    seller: {
      type: Object,
      required: true,
      default: function () {
        return {};
      },
    },
  },

  created() {
    console.log(window.devicePixelRatio);
  },

  methods: {
    getTypeName(type) {
      return typeName(type, 2);
    },
  },
};
</script>

<style lang="less">
@import "~assets/style/var.less";
.seller-header {
  &-content {
    position: relative;
    padding: @space*1.5;
    padding: @space*2 @space @space*1.5 @space*2;

    .thumb {
      width: 1.28rem;
      height: 1.28rem;
      border-radius: 4px;
      float: left;
      overflow: hidden;

      & img {
        background-color: cyan;
        width: 100%;
      }
    }

    &-right {
      float: left;
      margin-left: @space;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 1.28rem;
      color: @white;

      .header {
        display: flex;
        align-items: center;
      }

      .title {
        font-size: @size_title;
        font-weight: bold;
        margin-left: 0.12rem;
      }

      .text {
        font-size: @size_text;
      }

      .supports {
        .desc {
          font-size: @size_assist;
        }
      }
    }

    .rd-corner {
      position: absolute;
      right: @space + 0.14rem;
      bottom: @space + 0.14rem;
      color: @white;
      font-size: @size_assist;
      padding: 0 0.16rem;
      line-height: 2em;
      border-radius: 0.48rem;
      background-color: rgba(0, 0, 0, 0.2);
    }

    .blur {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      filter: blur(10px);
      z-index: -1;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  &-footer {
    padding: 0 @space;
    height: 0.56rem;
    display: flex;
    align-items: center;
    color: @white;
    font-size: @size_assist;
    background-color: rgba(7, 17, 27, 0.2);

    i {
      flex: 0 0 auto;
    }

    p {
      margin-left: 0.08rem;
      margin-right: 0.08rem;
    }
  }

  // van-popup
  .van-popup__close-icon {
    bottom: 0.64rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .section-promo {
    position: relative;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
    padding-top: 1.28rem;
    padding-bottom: 1.28rem;
    padding-left: 0.72rem;
    padding-right: 0.72rem;
    background-color: rgba(7, 17, 27, 0.8);

    .promo {
      font-size: @size_text;
      color: #fff;

      &-header {
        font-size: @size_title;
        font-weight: bold;
        text-align: center;
        line-height: 1em;
      }

      &-rate {
        display: flex;
        justify-content: center;
        margin-top: 0.32rem;
      }

      .mod-box {
        padding-top: 0.48rem;
        padding-bottom: 0.56rem;

        .mod-header {
          position: relative;

          &::before,
          &::after {
            content: "";
            position: absolute;
            height: 2px;
            width: 2.24rem;
            background-color: #61676d;
          }

          &::before {
            left: 0;
          }

          &::after {
            right: 0;
          }

          &-text {
            position: absolute;
            padding: 0 0.24rem;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
            font-size: @size_subtitle;
            font-weight: bold;
          }
        }

        .mod-content {
          margin-top: @space*2;

          .promo-info {
            li {
              height: 32px;
              display: flex;
              align-items: center;
              margin-top: @space;

              &:first-child {
                margin-top: 0;
              }

              .icon {
                width: 0.32rem;
                height: 0.32rem;
                border-radius: 4px;
                overflow: hidden;
                margin-right: @space*0.5;
              }
            }
          }

          .promo-text {
            line-height: 2em;
            color: #dedfdf;
            max-height: 3rem;
            overflow: hidden;
            // 多出省略
            // display: -webkit-box;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // -webkit-line-clamp: 6;
            // -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
</style>
