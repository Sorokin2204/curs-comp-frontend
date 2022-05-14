import { updateQuantity } from '../redux/slices/cart.slice';
import { store } from '../redux/store';

export const deleteFromCart = (productId) => {
  let oldCart = JSON.parse(localStorage.getItem('cart'));

  if (oldCart) {
    let newCart = oldCart.filter((cartItem) => cartItem.id !== productId);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }
  store.dispatch(updateQuantity());

  return;
};
