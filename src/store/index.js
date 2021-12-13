import Vue from "vue";

export const state = Vue.observable({
  cartSet: [],
});

export const mutations = {
  updateCartSet(food, count) {
    const idx = this.cartSet.findIndex((item) => food.name === item.name);

    // 添加 food 或 count +1
    if (idx === -1) {
      state.cartSet.push(food);
    } else {
      // 数量为0时去除
      state.cartSet[idx].count = count;
      if (count === 0) {
        state.cartSet.splice(idx, 1);
      }
    }
  },
  emptyCarSet() {
    state.cartSet.forEach((food) => {
      food.count = 0;
    });
    state.cartSet = [];
  },
};
