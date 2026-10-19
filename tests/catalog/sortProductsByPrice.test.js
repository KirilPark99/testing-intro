const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test("'asc' сортирует все товары по возрастанию цены", () => {
    const result = sortProductsByPrice(products, 'asc');
    expect(result.map((product) => product.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('без направления сортирует все товары по возрастанию цены', () => {
    const result = sortProductsByPrice(products);
    expect(result.map((product) => product.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("'asc' сортирует товары [1, 3, 4] как [3, 4, 1]", () => {
    const catalog = [products[0], products[2], products[3]];
    const result = sortProductsByPrice(catalog, 'asc');
    expect(result.map((product) => product.id)).toEqual([3, 4, 1]);
  });

  test("'desc' сортирует все товары по убыванию цены", () => {
    const result = sortProductsByPrice(products, 'desc');
    expect(result.map((product) => product.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("'desc' сортирует товары [3, 1, 4] как [1, 4, 3]", () => {
    const catalog = [products[2], products[0], products[3]];
    const result = sortProductsByPrice(catalog, 'desc');
    expect(result.map((product) => product.id)).toEqual([1, 4, 3]);
  });

  test("'desc' сортирует товары [5, 2, 6] как [2, 5, 6]", () => {
    const catalog = [products[4], products[1], products[5]];
    const result = sortProductsByPrice(catalog, 'desc');
    expect(result.map((product) => product.id)).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const catalog = [products[0], products[2], products[3]];
    sortProductsByPrice(catalog, 'asc');
    expect(catalog.map((product) => product.id)).toEqual([1, 3, 4]);
  });

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const catalog = [products[0], products[2], products[3]];
    sortProductsByPrice(catalog, 'desc');
    expect(catalog.map((product) => product.id)).toEqual([1, 3, 4]);
  });

  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    sortProductsByPrice(products);
    expect(products.map((product) => product.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
