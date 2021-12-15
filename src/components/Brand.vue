<template>
  <!-- 使用:
    1: 24px + 非实心背景
    2: 32px + 非实心背景
    3: 24px + 实心背景
    4: 32px + 实心背景
    <Brand :name="typeName(support.type, 4)" />
  -->
  <i class="brand" :style="spiritStyle"></i>
</template>

<script>
export default {
  name: "Brand",

  data() {
    return {
      nameMap2x: {
        star24_half: {
          width: ".20rem",
          height: ".19rem",
          backgroundPosition: "0 0",
        },
        star24_off: {
          width: ".20rem",
          height: ".19rem",
          backgroundPosition: "-.30rem 0",
        },
        star24_on: {
          width: ".20rem",
          height: ".19rem",
          backgroundPosition: "-.60rem 0",
        },
        bulletin: {
          width: ".44rem",
          height: ".24rem",
          backgroundPosition: "-.90rem 0",
        },
        decrease_1: {
          width: ".24rem",
          height: ".24rem",
          backgroundPosition: "-1.44rem 0",
        },
        decrease_3: {
          width: ".24rem",
          height: ".24rem",
          backgroundPosition: "-1.78rem 0",
        },
        discount_1: {
          width: ".24rem",
          height: ".24rem",
          backgroundPosition: "-2.12rem 0",
        },
        discount_3: {
          width: ".24rem",
          height: ".24rem",
          backgroundPosition: "-2.46rem 0",
        },
        guarantee_1: {
          width: ".24rem",
          height: ".24rem",
          backgroundPosition: "-2.80rem 0",
        },
        guarantee_3: {
          width: ".24rem",
          height: ".24rem",
          backgroundPosition: "-3.14rem 0",
        },
        invoice_1: {
          width: ".24rem",
          height: ".24rem",
          backgroundPosition: "-3.48rem 0",
        },
        invoice_3: {
          width: ".24rem",
          height: ".24rem",
          backgroundPosition: "-3.82rem 0",
        },
        special_1: {
          width: ".24rem",
          height: ".24rem",
          backgroundPosition: "-4.16rem 0",
        },
        special_3: {
          width: ".24rem",
          height: ".24rem",
          backgroundPosition: "-4.50rem 0",
        },
        star36_off: {
          width: ".30rem",
          height: ".29rem",
          backgroundPosition: "-4.84rem 0",
        },
        star36_half: {
          width: ".30rem",
          height: ".29rem",
          backgroundPosition: "-5.24rem 0",
        },
        star36_on: {
          width: ".30rem",
          height: ".29rem",
          backgroundPosition: "-5.64rem 0",
        },
        decrease_2: {
          width: ".32rem",
          height: ".32rem",
          backgroundPosition: "0 -.39rem",
        },
        decrease_4: {
          width: ".32rem",
          height: ".32rem",
          backgroundPosition: "-.42rem -.39rem",
        },
        discount_2: {
          width: ".32rem",
          height: ".32rem",
          backgroundPosition: "-.84rem -.39rem",
        },
        discount_4: {
          width: ".32rem",
          height: ".32rem",
          backgroundPosition: "-1.26rem -.39rem",
        },
        guarantee_2: {
          width: ".32rem",
          height: ".32rem",
          backgroundPosition: "-1.68rem -.39rem",
        },
        guarantee_4: {
          width: ".32rem",
          height: ".32rem",
          backgroundPosition: "-2.10rem -.39rem",
        },
        invoice_2: {
          width: ".32rem",
          height: ".32rem",
          backgroundPosition: "-2.52rem -.39rem",
        },
        invoice_4: {
          width: ".32rem",
          height: ".32rem",
          backgroundPosition: "-2.94rem -.39rem",
        },
        special_2: {
          width: ".32rem",
          height: ".32rem",
          backgroundPosition: "-3.36rem -.39rem",
        },
        special_4: {
          width: ".32rem",
          height: ".32rem",
          backgroundPosition: "-3.78rem -.39rem",
        },
        brand: {
          width: ".60rem",
          height: ".36rem",
          backgroundPosition: "-4.20rem -.39rem",
        },
        star48_half: {
          width: ".40rem",
          height: ".38rem",
          backgroundPosition: "-4.90rem -.39rem",
        },
        star48_on: {
          width: ".40rem",
          height: ".38rem",
          backgroundPosition: "-5.40rem -.39rem",
        },
        star48_off: {
          width: ".40rem",
          height: ".38rem",
          backgroundPosition: "0 -.87rem",
        },
      },
      nameMap3x: {
        star24_half: {
          width: ".30rem",
          height: ".29rem",
          backgroundPosition: "0 0",
        },
        star24_off: {
          width: ".30rem",
          height: ".29rem",
          backgroundPosition: "-.40rem 0",
        },
        star24_on: {
          width: ".30rem",
          height: ".29rem",
          backgroundPosition: "-.80rem 0",
        },
        discount_3: {
          width: ".36rem",
          height: ".36rem",
          backgroundPosition: "-1.20rem 0",
        },
        guarantee_1: {
          width: ".36rem",
          height: ".36rem",
          backgroundPosition: "-1.66rem 0",
        },
        guarantee_3: {
          width: ".36rem",
          height: ".36rem",
          backgroundPosition: "-2.12rem 0",
        },
        invoice_1: {
          width: ".36rem",
          height: ".36rem",
          backgroundPosition: "-2.58rem 0",
        },
        invoice_3: {
          width: ".36rem",
          height: ".36rem",
          backgroundPosition: "-3.04rem 0",
        },
        special_1: {
          width: ".36rem",
          height: ".36rem",
          backgroundPosition: "-3.50rem 0",
        },
        special_3: {
          width: ".36rem",
          height: ".36rem",
          backgroundPosition: "-3.96rem 0",
        },
        bulletin: {
          width: ".66rem",
          height: ".36rem",
          backgroundPosition: "-4.42rem 0",
        },
        decrease_1: {
          width: ".36rem",
          height: ".36rem",
          backgroundPosition: "-5.18rem 0",
        },
        decrease_3: {
          width: ".36rem",
          height: ".36rem",
          backgroundPosition: "-5.64rem 0",
        },
        discount_1: {
          width: ".36rem",
          height: ".36rem",
          backgroundPosition: "0 -.46rem",
        },
        star36_half: {
          width: ".45rem",
          height: ".44rem",
          backgroundPosition: "-.46rem -.46rem",
        },
        star36_off: {
          width: ".45rem",
          height: ".44rem",
          backgroundPosition: "-1.01rem -.46rem",
        },
        star36_on: {
          width: ".45rem",
          height: ".44rem",
          backgroundPosition: "-1.56rem -.46rem",
        },
        discount_2: {
          width: ".48rem",
          height: ".48rem",
          backgroundPosition: "-2.11rem -.46rem",
        },
        discount_4: {
          width: ".48rem",
          height: ".48rem",
          backgroundPosition: "-2.69rem -.46rem",
        },
        guarantee_2: {
          width: ".48rem",
          height: ".48rem",
          backgroundPosition: "-3.27rem -.46rem",
        },
        guarantee_4: {
          width: ".48rem",
          height: ".48rem",
          backgroundPosition: "-3.85rem -.46rem",
        },
        invoice_2: {
          width: ".48rem",
          height: ".48rem",
          backgroundPosition: "-4.43rem -.46rem",
        },
        invoice_4: {
          width: ".48rem",
          height: ".48rem",
          backgroundPosition: "-5.01rem -.46rem",
        },
        special_2: {
          width: ".48rem",
          height: ".48rem",
          backgroundPosition: "0 -1.04rem",
        },
        special_4: {
          width: ".48rem",
          height: ".48rem",
          backgroundPosition: "-.58rem -1.04rem",
        },
        decrease_2: {
          width: ".48rem",
          height: ".48rem",
          backgroundPosition: "-1.16rem -1.04rem",
        },
        decrease_4: {
          width: ".48rem",
          height: ".48rem",
          backgroundPosition: "-1.74rem -1.04rem",
        },
        brand: {
          width: ".90rem",
          height: ".54rem",
          backgroundPosition: "-2.32rem -1.04rem",
        },
        star48_half: {
          width: ".60rem",
          height: ".57rem",
          backgroundPosition: "-3.32rem -1.04rem",
        },
        star48_off: {
          width: ".60rem",
          height: ".57rem",
          backgroundPosition: "-4.02rem -1.04rem",
        },
        star48_on: {
          width: ".60rem",
          height: ".57rem",
          backgroundPosition: "-4.72rem -1.04rem",
        },
      },
    };
  },

  props: {
    width: {
      type: [String, Number],
    },
    height: {
      type: [String, Number],
    },
    name: {
      type: String,
      required: true,
    },
  },

  computed: {
    spiritStyle() {
      const nameMap =
        window.devicePixelRatio === 2 ? this.nameMap2x : this.nameMap3x;
      const curBrand = nameMap[this.name];

      // width height scale
      const width = parseFloat(this.width) || parseFloat(curBrand.width);
      const height = parseFloat(this.height) || parseFloat(curBrand.height);
      const scale = width / parseFloat(curBrand.width);

      // position
      const pos = nameMap[this.name].backgroundPosition.split(" ");
      const posX = parseFloat(pos[0]) * scale + "rem";
      const posY = parseFloat(pos[1]) * scale + "rem";

      // size
      const baseWidth = 6;
      const baseHeight = window.devicePixelRatio === 2 ? 1.25 : 1.61;
      const size = `${baseWidth * scale}rem ${baseHeight * scale}rem`;

      return {
        width: width + "rem",
        height: height + "rem",
        backgroundPosition: `${posX} ${posY}`,
        backgroundSize: size,
      };
    },
  },
};
</script>

<style lang="less">
.brand {
  display: inline-block;
  background: url("../assets/img/icon_@2x.png") no-repeat 9999px 9999px;
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background: url("../assets/img/icon_@3x.png") no-repeat 9999px 9999px;
  }
}
</style>
