const types = ["decrease", "discount", "special", "invoice", "guarantee"];
/**
 * typeName(0,1) => decrease_1
 * 作用: 用于 Brand 组件的 icon 名
 * @param {Number} type 0 - 4
 * @param {Number} size 1 2
 * @returns Brand name
 */
export const typeName = (type, size) => {
  return types[type] + "_" + size;
};
