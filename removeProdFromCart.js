/*
  This function removes a product from the cart both in the UI and in localStorage.
  It also updates the cart total, cart value
*/

import { getCartProductFromLS } from "./getCartProducts";
import { updateCartProductTotal } from "./updateCartProductTotal";
import { updateCartValue } from "./updateCartValue";

export const removeProdFromCart = (id) => {
  let cartProducts = getCartProductFromLS(); // Step 1: Get all products currently in the cart
  cartProducts = cartProducts.filter((curProd) => curProd.id !== id); // Step 2: Remove the product with the given id from the cart
 
  // Step 3: Update localStorage with the new cart array
  localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));

 // Step 4: Remove the product's card from the UI
  let removeDiv = document.getElementById(`card${id}`);
  if (removeDiv) {
    removeDiv.remove();
  }

  // Step 5: Update the total price of all products in the cart
  updateCartProductTotal();

  // Step 6: Update the cart count or value in the UI (like a badge)
  updateCartValue(cartProducts);
};
