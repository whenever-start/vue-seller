<template>
  <!-- 使用
    <Counter :count="count" @get-count="..."/>
    参数: isDrop -- 是否显示小球掉落 默认 false
  -->
  <div class="counter">
    <transition name="fade">
      <i
        class="iconfont icon-jianshao"
        v-show="curCount > 0"
        @click.stop="decrease"
      ></i>
    </transition>

    <span class="count">{{ curCount }}</span>

    <i class="iconfont icon-zengjia" @click.stop="increase" ref="incBall"></i>

    <!-- ball -->
    <ul class="box-balls">
      <transition-group>
        <li
          v-for="ball in balls"
          :key="ball.num"
          v-show="ball.show && isDrop"
          :style="{ bottom: ballBottom }"
        ></li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curCount: this.count,
      idx: 0, // 当前drop小球的 index
      ballBottom: 'auto',
      // num 是为了作为 key 值
      balls: [
        { show: false, num: 1 },
        { show: false, num: 2 },
        { show: false, num: 3 },
        { show: false, num: 4 },
        { show: false, num: 5 },
        { show: false, num: 6 },
        { show: false, num: 7 },
      ],
    };
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
    isDrop: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    count(newVal) {
      this.curCount = newVal;
    },
  },

  methods: {
    decrease() {
      // <= 0 return
      if (this.curCount < 1) return;

      this.curCount--;
      this.$emit('get-count', this.curCount);
    },
    increase() {
      this.curCount++;
      this.setBallBottom();
      this.ballDisplay();
      this.$emit('get-count', this.curCount);
    },

    /**
     * 设备高度 - 小球与视口顶部距离 = 小球与底部距离
     */
    setBallBottom() {
      const h = document.body.offsetHeight;
      const top = this.$refs.incBall.getBoundingClientRect().top;
      this.ballBottom = h - top + 'px';
    },

    /**
     * 小球的显示与隐藏 -> 触发动画
     */
    ballDisplay() {
      const idx = this.idx;
      this.balls[this.idx].show = true;
      // delay 值设置为比 css 动画中的 duration 小
      // 如此, backwards 小球回到原位置时才能不显示
      setTimeout(() => {
        this.balls[idx].show = false;
      }, 300);
      this.idx = this.idx === this.balls.length - 1 ? 0 : this.idx + 1;
    },
  },
};
</script>

<style lang="less">
.counter {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .iconfont {
    font-size: 0.48rem;
    color: #00a0dc;
  }

  .count {
    width: 0.48rem;
    line-height: 0.48rem;
    text-align: center;
    font-size: 0.2rem;
    color: #93999f;
  }

  .box-balls {
    li {
      position: fixed;
      left: 6.62rem;
      z-index: 1999;
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 50%;
      background-color: #00a0dc;
      animation: drop-left 0.4s backwards linear,
        drop-top 0.4s backwards cubic-bezier(0.4, -0.6, 0.8, 0.8);
    }
  }
}

// 动画
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s linear;
}
.fade-enter {
  opacity: 0;
  transform: translateX(0.48rem) rotate(0deg);
}
.fade-enter-to {
  transform: rotate(180deg);
}
.fade-leave {
  transform: rotate(0deg);
}
.fade-leave-to {
  transform: translateX(0.96rem) rotate(-180deg);
}

@keyframes drop-left {
  to {
    left: 0.48rem;
    // opacity: 0;
  }
}
@keyframes drop-top {
  to {
    bottom: 0.48rem;
  }
}
</style>
