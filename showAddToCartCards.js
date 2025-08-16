import products from "./api/products.json";
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS";
import { getCartProductFromLS } from "./getCartProducts";
import { incrementDecrement } from "./incrementDecrement";
import { removeProdFromCart } from "./removeProdFromCart";
import { updateCartProductTotal } from "./updateCartProductTotal";

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((curProd) => {
  return cartProducts.some((curElem) => curElem.id === curProd.id);
});

console.log(filterProducts);

// -----------------------------------------------------
// to update the addToCart page
// --------------------------------------------------------
const cartElement = document.querySelector("#productCartContainer");  // Container to hold all cart items
const templateContainer = document.querySelector("#productCartTemplate");  // Template for a single cart item

// -----------------------------------------------------
// Function to show all products in the cart
// --------------------------------------------------------

const showCartProduct = () => {
  filterProducts.forEach((curProd) => {
    const { category, id, image, name, stock, price } = curProd;

     // Clone the template for each product
    let productClone = document.importNode(templateContainer.content, true);
    // Fetch the actual quantity and total price for this product from localStorage
    const lSActualData = fetchQuantityFromCartLS(id, price); 
     // Update the cloned template with actual product data
    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);
    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image;

    productClone.querySelector(".productQuantity").textContent = lSActualData.quantity; // Set quantity from localStorage
    productClone.querySelector(".productPrice").textContent = lSActualData.price; // Set price from localStorage

     // -----------------------------------------------------
    // Event listeners for increment/decrement buttons
    // --------------------------------------------------------
    productClone
      .querySelector(".stockElement").addEventListener("click", (event) => {
        incrementDecrement(event, id, stock, price);  // Updates quantity in UI and localStorage when user clicks + or -
      });

   // Removes product from cart and updates UI & localStorage
    productClone.querySelector(".remove-to-cart-button").addEventListener("click", () => removeProdFromCart(id));

    // Append the fully updated clone to the cart container
    cartElement.appendChild(productClone);
  });
};

// -----------------------------------------------------
// Call the function to render cart products on page load
// --------------------------------------------------------
showCartProduct();

// -----------------------------------------------------
// Update the total price for all products in cart
// This function calculates the sum of all product totals
// --------------------------------------------------------
updateCartProductTotal();
