// This script dynamically creates the product cards from a data array, wires up event listeners for quantity control and cart functionality, 
// and appends everything to the page without manually writing HTML for each product


import { addToCart } from "./addToCart";
import { homeQuantityToggle } from "./homeQuantityToggle";

const productContainer = document.querySelector("#productContainer");   // where all the cards go
const productTemplate = document.querySelector("#productTemplate")   // a frame where the products will be held

export const showProductContainer = (products) => {
    if(! products){
        return ;
    }

    products.forEach((curProd) => {
        // destructuring or unpacking values from data structures 
        // const colors = ["red", "green", "blue"];
       // const [firstColor, secondColor, thirdColor] = colors;
        // console.log(firstColor); // Output: red
        const { brand, category, description, id, image, name, price, stock } =  curProd;

        // cloning the template
        const productClone = document.importNode(productTemplate.content, true);
    
        productClone.querySelector("#cardValue").setAttribute("id", `card${id}`);

        // updating the values
        productClone.querySelector(".category").textContent = category;
        productClone.querySelector(".productName").textContent = name;
        productClone.querySelector(".productImage").src = image;
        productClone.querySelector(".productImage").alt = name;
        productClone.querySelector(".productStock").textContent = stock;
        productClone.querySelector(".productDescription").textContent = description;
        productClone.querySelector(".productPrice").textContent = `₹${price}`;
        productClone.querySelector(".productActualPrice").textContent = `₹${price * 4}` ;
    
        // quantity manipulation
        productClone.querySelector(".stockElement").addEventListener("click", (event) => {
            homeQuantityToggle(event, id, stock);
          });
    
        productClone.querySelector(".add-to-cart-button").addEventListener("click", (event) => {
            addToCart(event, id, stock);
          });
    
        productContainer.append(productClone);
      });
  };
