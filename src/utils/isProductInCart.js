export const isProductInCart = (id) => {
  if (id) {
    return JSON.parse(localStorage.getItem('cart'))?.find((cartItem) => cartItem.id === id);
  }
  return false;
};
