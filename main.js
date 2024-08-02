import './style.css'
import products from "./api/products.json";
import { showProductContainer } from "./homeProductCards";


//define a function to show the product name
showProductContainer(products);