/*
  This function ensures that the "Add to Cart" region reflects the latest 
  quantity and price of products that the user might have updated on the homepage.
  
  It takes:
    - id: the unique ID of the product
    - price: the default price of the product (from products.json)
  
  It returns an object with:
    - quantity: current quantity of the product in the cart
    - price: current total price of the product in the cart
*/

import { getCartProductFromLS } from "./getCartProducts";

export const fetchQuantityFromCartLS = (id, price) => {
  let cartProducts = getCartProductFromLS();   // Get all products currently present in the cart from localStorage

    // Check if this product already exists in the cart
  let existingProduct = cartProducts.find((curProd) => curProd.id === id);
  let quantity = 1;  // Default quantity is 1 (if not found in cart)

  // If product exists in cart, override default quantity and price
  if (existingProduct) {
    quantity = existingProduct.quantity; // Update with the stored quantity
    price = existingProduct.price;       // Update with the stored total price
  }

  return { quantity, price }; // Return the quantity and price for this product
};

