/*
  This function handles **incrementing or decrementing the quantity** of a product in the cart.
  It updates both **localStorage** and the **UI**.
  
  Parameters:
    - event: The click event (to check if increment or decrement)
    - id: Product ID
    - stock: Maximum stock available for this product
    - price: Original unit price of the product
*/

import { getCartProductFromLS } from "./getCartProducts";
import { updateCartProductTotal } from "./updateCartProductTotal";

export const incrementDecrement = (event, id, stock, price) => {
   // -----------------------------------------------------
  // Get references to the DOM elements for this product card
  // -----------------------------------------------------
  
  const currentCardElement = document.querySelector(`#card${id}`);
  const productQuantity = currentCardElement.querySelector(".productQuantity");
  const productPrice = currentCardElement.querySelector(".productPrice");

    // Default quantity and price
  let quantity = 1;
  let localStoragePrice = 0;

 // -----------------------------------------------------
  // Fetch the product from localStorage (if it exists)
  // -----------------------------------------------------
  let localCartProducts = getCartProductFromLS();
  let existingProd = localCartProducts.find((curProd) => curProd.id === id);

  if (existingProd) {
    quantity = existingProd.quantity;  // current quantity in cart
    localStoragePrice = existingProd.price;  // current total price in cart
  } else {
    localStoragePrice = price;   // fallback: use default price
    price = price;
  }

   // -----------------------------------------------------
  // Handle increment button click
  // -----------------------------------------------------
  if (event.target.className === "cartIncrement") {
    if (quantity < stock) {
      quantity += 1;
    } else if (quantity === stock) {
      quantity = stock;                   // cannot exceed stock
      localStoragePrice = price * stock;  // max price calculation
    }
  }

  // -----------------------------------------------------
  // Handle decrement button click
  // -----------------------------------------------------
  if (event.target.className === "cartDecrement") {
    if (quantity > 1) {
      quantity -= 1;
    }
  }

  // -----------------------------------------------------
  // Update price based on new quantity
  // -----------------------------------------------------
  localStoragePrice = price * quantity;
  localStoragePrice = Number(localStoragePrice.toFixed(2));

  // -----------------------------------------------------
  // Prepare updated product object
  // -----------------------------------------------------
  let updatedCart = { id, quantity, price: localStoragePrice };

  // Update the product in the array of cart products
  updatedCart = localCartProducts.map((curProd) => {
    return curProd.id === id ? updatedCart : curProd;
  });
  //   console.log(updatedCart);

  // Save updated cart back to localStorage
  localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));

  // -----------------------------------------------------
  // Reflect changes in the UI
  // -----------------------------------------------------
  productQuantity.innerText = quantity;
  productPrice.innerText = localStoragePrice;

  // -----------------------------------------------------
  // calculating the card total in our cartProducts page
  // --------------------------------------------------------
  updateCartProductTotal();
};
