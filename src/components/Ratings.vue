<template>
  <!-- 使用:
    参数: simple: 简略版, 默认详细版
  -->
  <div class="ratings">
    <!-- tabs -->
    <div class="ratings-tabs">
      <div
        class="tab-item"
        :class="tabIndex === index ? 'active' : ''"
        v-for="(tab, index) in tabs"
        :key="tab.name"
        @click="tabRatings(index)"
      >
        {{ tab.name }}<span class="tab-item-num">{{ tab.content.length }}</span>
      </div>
    </div>

    <!-- select: 只看有内容的评价 -->
    <div class="ratings-select" @click="select">
      <van-icon
        class="icon"
        :class="selectActive ? 'active' : ''"
        name="success"
      />
      只看有内容的评价
    </div>

    <!-- 详细版 -->
    <div class="ratings-content ratings-content-detailed" v-if="!simple">
      <ul class="rating-list">
        <li
          class="rating-list-item"
          v-for="(rating, index) in tabs[tabIndex].content"
          :key="index"
        >
          <div class="avatar">
            <img :src="rating.avatar" :alt="rating.avatar" />
          </div>

          <div class="rating-list-item-main">
            <div class="head">
              <div class="username">{{ rating.username }}</div>
              <div class="date">{{ rating.rateTime | formatDate }}</div>
            </div>

            <div class="desc">
              <van-rate
                v-model="rating.score"
                disabled-color="#ff9900"
                disabled
                size=".16rem"
              />
              <span class="assist">{{ rating.deliveryTime | formatTime }}</span>
            </div>

            <p class="text">{{ rating.text }}</p>

            <div class="recommend">
              <i
                class="iconfont"
                :class="rating.rateType === 0 ? 'icon-like' : 'icon-unlike'"
              ></i>

              <ul class="recommend-list">
                <li
                  class="recommend-list-item ellipsis"
                  v-for="(item, index) in rating.recommend"
                  :key="index"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 简略版 -->
    <div class="ratings-content ratings-content-simple" v-else>
      <ul class="rating-list">
        <li
          class="rating-list-item"
          v-for="(rating, index) in tabs[tabIndex].content"
          :key="index"
        >
          <div class="rating-list-item-head">
            <div>{{ rating.rateTime | formatDate }}</div>

            <div class="user">
              <span class="user-name">{{ rating.username }}</span>
              <div class="user-avatar">
                <img :src="rating.avatar" :alt="rating.username" />
              </div>
            </div>
          </div>
          <div class="content">
            <i
              class="iconfont"
              :class="rating.rateType === 0 ? 'icon-like' : 'icon-unlike'"
            ></i>
            <p>{{ rating.text }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ratings',

  data() {
    return {
      tabIndex: 0,
      selectActive: false,
      // 用于切换 只看有内容的评价
      initRatings: this.ratings,
    };
  },

  computed: {
    // 好评: rateType === 0 差评: rateType === 1
    goodRatings() {
      return this.initRatings.filter((rating) => rating.rateType === 0);
    },
    badRatings() {
      return this.initRatings.filter((rating) => rating.rateType === 1);
    },
    allRatings() {
      return this.initRatings;
    },
    tabs() {
      return [
        {
          name: '全部',
          content: this.allRatings,
        },
        {
          name: this.simple ? '推荐' : '满意',
          content: this.goodRatings,
        },
        {
          name: this.simple ? '吐槽' : '不满意',
          content: this.badRatings,
        },
      ];
    },
  },

  props: {
    ratings: {
      type: Array,
      required: true,
    },
    simple: {
      type: Boolean,
      default: false,
    },
  },

  filters: {
    /**
     * 输入: 时间戳
     * 输出格式: 2016-07-23 21:52:44
     */
    formatDate(timestamp) {
      const myDate = new Date(timestamp);
      const year = myDate.getFullYear();
      const month =
        myDate.getMonth() + 1 < 10
          ? '0' + (myDate.getMonth() + 1)
          : myDate.getMonth() + 1;
      const day =
        myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
      const hour =
        myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours();
      const minutes =
        myDate.getMinutes() < 10
          ? '0' + myDate.getMinutes()
          : myDate.getMinutes();
      const seconds =
        myDate.getSeconds() < 10
          ? '0' + myDate.getSeconds()
          : myDate.getSeconds();
      return (
        year +
        '-' +
        month +
        '-' +
        day +
        ' ' +
        hour +
        ':' +
        minutes +
        ':' +
        seconds
      );
    },
    // 1小时30分钟送达
    formatTime(min) {
      if (!min) return '';
      const h = parseInt(min / 60);
      if (h) {
        return `${h}小时${min % 60}分钟送达`;
      } else {
        return `${min}分钟送达`;
      }
    },
  },

  methods: {
    // 切换: 只看有内容的评价
    select() {
      this.selectActive = !this.selectActive;
      this.initRatings = this.selectActive
        ? this.ratings.filter((rating) => rating.text.length)
        : this.ratings;
    },

    tabRatings(index) {
      this.tabIndex = index;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~assets/style/var.less";

.ratings {
  // ratings-tabs
  &-tabs {
    display: flex;
    margin-top: 1.5 * @space;
    padding-bottom: 1.5 * @space;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);

    .tab-item {
      margin-right: 0.16rem;
      padding: 0.16rem 0.24rem;
      border-radius: 4px;
      font-size: @size_text;
      color: #515a62;
      background-color: #ccecf8;

      &.active {
        color: @white;
        background-color: @blue;
      }

      &-num {
        font-size: 0.16rem;
      }

      &:last-child {
        margin-right: 0;
        background-color: #e9ebec;

        &.active {
          color: @white;
          background-color: #666;
        }
      }
    }
  }

  // ratings-select
  &-select {
    display: flex;
    align-items: center;
    padding: @space 1.5 * @space;
    color: #b7bbbf;
    font-size: @size_text;
    border-bottom: 2px solid #e6e7e8;

    .icon {
      margin-right: 0.08rem;
      border-radius: 50%;
      font-size: 0.48rem;
      color: @white;
      background-color: #e6e7e8;

      &.active {
        background-color: @green;
      }
    }
  }

  // ratings-content-simple
  &-content-simple {
    padding: 0 1.5 * @space;

    .rating-list {
      &-item {
        padding: 0.32rem 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);

        &:last-child {
          border-bottom: none;
        }

        &-head {
          display: flex;
          justify-content: space-between;
          font-size: @size_assist;
          color: @color_assist;

          .user {
            display: flex;
            align-items: center;

            &-avatar {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-left: 0.12rem;
              width: 0.24rem;
              height: 0.24rem;
              border-radius: 50%;
              overflow: hidden;

              img {
                width: 100%;
              }
            }
          }
        }

        .content {
          display: flex;
          align-items: center;
          margin-top: 0.32rem;

          .iconfont {
            margin-right: 0.08rem;
            font-size: 0.28rem;
            color: @color_assist;

            &.icon-like {
              color: @blue;
            }

            // 选了两个大小不一样的图标...
            &.icon-unlike {
              font-size: 0.24rem;
            }
          }

          p {
            font-size: @size_text;
            color: rgb(7, 17, 27);
          }
        }
      }
    }
  }

  // ratings-content-detailed
  &-content-detailed {
    .rating-list {
      &-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 0.36rem 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);

        &:last-child {
          border-bottom: none;
        }

        .avatar {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 0 0 0.56rem;
          // width: 0.56rem;
          height: 0.56rem;
          border-radius: 50%;
          overflow: hidden;

          img {
            width: 100%;
          }
        }

        &-main {
          flex: 1;
          margin-left: @space;

          .head {
            display: flex;
            justify-content: space-between;

            .username {
              font-size: @size_assist;
              color: @color_text;
            }

            .date {
              font-size: @size_assist;
              color: @color_assist;
            }
          }

          .desc {
            margin-top: 0.08rem;

            .assist {
              margin-left: 0.12rem;
              color: @color_assist;
              font-size: @size_assist;
            }
          }

          .text {
            margin-top: 0.16rem;
            font-size: @size_text;
            color: @color_text;
          }

          .recommend {
            display: flex;
            align-items: flex-start;

            .icon-like {
              margin-top: 0.16rem;
              font-size: 0.28rem;
              color: @blue;
            }

            .icon-unlike {
              margin-top: 0.16rem;
              color: @color_assist;
              font-size: 0.24rem;
            }

            &-list {
              display: flex;
              flex-wrap: wrap;

              &-item {
                margin-left: 0.16rem;
                margin-top: 0.16rem;
                padding: 0 0.12rem;
                max-width: 1.26rem;
                border: 1px solid rgba(7, 17, 27, 0.1);
                font-size: 0.18rem;
                color: @color_assist;
              }
            }
          }
        }
      }
    }
  }
}
</style>
