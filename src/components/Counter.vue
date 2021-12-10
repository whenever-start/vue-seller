<template>
  <div class="counter">
    <transition name="fade">
      <i class="iconfont icon-jianshao" v-show="num > 0" @click="decrease"></i>
    </transition>
    <span class="count">{{ num }}</span>
    <i class="iconfont icon-zengjia" @click="increase" ref="incBall"></i>

    <!-- ball -->
    <ul class="box-balls">
      <transition-group>
        <li
          v-for="(ball, index) in balls"
          :key="index"
          v-show="ball.show"
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
      num: this.count,
      idx: 0,
      ballBottom: "auto",
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false },
      ],
    };
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    decrease() {
      this.num = this.num === 0 ? 0 : this.num - 1;
    },
    increase() {
      this.num++;

      this.setBallBottom();

      this.$nextTick(() => {
        const idx = this.idx;
        this.balls[this.idx].show = true;
        setTimeout(() => {
          this.balls[idx].show = false;
        }, 300);
        this.idx = this.idx === this.balls.length - 1 ? 0 : this.idx + 1;
      });
    },

    /**
     * 设备高度 - 小球与视口顶部距离 = 小球与底部距离
     */
    setBallBottom() {
      const h = document.body.offsetHeight;
      const top = this.$refs.incBall.getBoundingClientRect().top;
      this.ballBottom = h - top + "px";
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
    opacity: 0;
  }
}
@keyframes drop-top {
  to {
    bottom: 0.48rem;
  }
}
</style>
