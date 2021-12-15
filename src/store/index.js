import Vue from "vue";

export const state = Vue.observable({
  cartSet: [],
  goods: [],
  seller: {},
  ratings: [],
});

export const mutations = {
  // cartSet
  updateCartSet(food, count) {
    const idx = this.cartSet.findIndex((item) => food.name === item.name);

    // 添加 food 或 count +1
    if (idx === -1) {
      Vue.set(food, "count", count);
      state.cartSet.push(food);
    } else {
      // state.cartSet[idx].count = count;
      Vue.set(state.cartSet[idx], "count", count);
      // 数量为0时去除
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

  // goods
  setGoods(goods) {
    state.goods = goods;
  },

  // seller
  setSeller(seller) {
    state.seller = seller;
  },

  // ratings
  setRatings(ratings) {
    state.ratings = ratings;
  },
};
