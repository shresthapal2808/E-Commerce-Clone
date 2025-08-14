// 

import { updateCartValue } from "./updateCartValue";

export const getCartProductFromLS = () => {
  let cartProducts = localStorage.getItem("cartProductLS"); // get cart products from the LS
  if (!cartProducts) {
    return [];            // if empty return empty array
  }
  cartProducts = JSON.parse(cartProducts);        // since, Local Storage only stores strings. JSON.parse turns it back into a usable JS array.

  //update the cart button value
  updateCartValue(cartProducts);  

  return cartProducts;
};
