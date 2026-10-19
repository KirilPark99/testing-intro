function addToCart(cart, product, quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Количество должно быть положительным целым числом.');
  }

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    return changeQuantity(cart, product.id, existingItem.quantity + quantity);
  }

  if (quantity > product.stock) {
    throw new RangeError('Количество не может превышать остаток на складе.');
  }

  return [...cart, { ...product, quantity: quantity }];
}

function changeQuantity(cart, id, quantity) {
  const product = cart.find((item) => item.id === id);

  if (!product) {
    return cart;
  }

  if (!Number.isInteger(quantity) || quantity <= 0 || quantity > product.stock) {
    throw new RangeError('Количество должно быть целым числом от 1 до остатка на складе.');
  }

  return cart.map((item) => {
    if (item.id === id) {
      return { ...item, quantity: quantity };
    }
    return item;
  });
}

function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}

function calculateCartSubtotal(cart) {
  let subtotal = 0;

  for (const item of cart) {
    subtotal += item.price * item.quantity;
  }

  return subtotal;
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  let discount = 0;
  let delivery = 0;

  if (promoCode === 'SAVE10' && subtotal >= 20000) {
    discount = Math.round(subtotal * 0.1);
  }

  if (subtotal < 50000) {
    delivery = 30000;
  }

  const total = subtotal - discount + delivery;

  return {
    subtotal: subtotal,
    discount: discount,
    delivery: delivery,
    total: total,
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
