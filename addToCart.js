import { getCartProductFromLS } from "./getCartProducts";
import { updateCartValue } from "./updateCartValue";

// -----------------------------------------------------
// to get the cart data from localStorage
// to update the cart value and also to get the data always ready from localStorage
// --------------------------------------------------------
getCartProductFromLS();

// -----------------------------------------------------
// to add the data into localStorage
// --------------------------------------------------------
export const addToCart = (event, id, stock) => {
  let arrLocalStorageProduct = getCartProductFromLS();

  const currentProdElem = document.querySelector(`#card${id}`);
  let quantity = currentProdElem.querySelector(".productQuantity").innerText;
  let price = currentProdElem.querySelector(".productPrice").innerText;
  //   console.log(quantity, price);
  price = price.replace("₹", "");

  // Check if product already exists: 
  let existingProd = arrLocalStorageProduct.find((curProd) => curProd.id === id);

  console.log(existingProd);

  // if the quantity is incrementing then do something
  if (existingProd && quantity > 1) {
    quantity = Number(existingProd.quantity) + Number(quantity);
    price = Number(price * quantity);
    let updatedCart = { id, quantity, price };
    
    // Using .map() creates a new array instead of modifying the old one in place.
    updatedCart = arrLocalStorageProduct.map((curProd) => {
      return curProd.id === id ? updatedCart : curProd;
    });
    console.log(updatedCart);
    
    localStorage.setItem("cartProductLS", JSON.stringify(updatedCart));
  }

  // If product already exists (duplicate click) → Do nothing:
  if (existingProd) {
    return false;
  }

  // If product is new → Push to array & save in Local Storage:
  price = Number(price * quantity);
  quantity = Number(quantity);

  arrLocalStorageProduct.push({ id, quantity, price });
  localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

  //update the cart button value
  updateCartValue(arrLocalStorageProduct);

};
