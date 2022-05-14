import { updateQuantity } from '../redux/slices/cart.slice';
import { store } from '../redux/store';

export const addToCart = (productId, quantity, isRewriteQuantity) => {
  let oldCart = JSON.parse(localStorage.getItem('cart'));
  let isFind = false;
  if (!oldCart) {
    oldCart = [];
  } else {
    oldCart = oldCart.map((cartItem) => {
      if (cartItem.id === productId) {
        isFind = true;
        return { id: cartItem.id, ...(isRewriteQuantity ? { quantity: quantity } : { quantity: parseInt(cartItem.quantity) + quantity }) };
      } else {
        return cartItem;
      }
    });
  }
  if (isFind) {
    localStorage.setItem('cart', JSON.stringify(oldCart));
  } else {
    localStorage.setItem('cart', JSON.stringify([{ id: productId, quantity }, ...oldCart]));
  }
  store.dispatch(updateQuantity());
};
