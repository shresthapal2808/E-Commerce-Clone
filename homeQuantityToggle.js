export const homeQuantityToggle = (event, id, stock) => {
    // Uses document.querySelector(#card${id}) so only the clicked card changes.
    const currentCardElement = document.querySelector(`#card${id}`);  
    //   console.log(currentCardElement);
  
    const productQuantity = currentCardElement.querySelector(".productQuantity");
    //   console.log(productQuantity);

    // Read the current quantity from a hidden data-quantity attribute (default is 1). [getAttribute will be shown in the console panel while inspecting]
    let quantity = parseInt(productQuantity.getAttribute("data-quantity")) || 1;
  
    if (event.target.className === "cartIncrement") {
      if (quantity < stock) {
        quantity += 1;
      } else if (quantity === stock) {
        quantity = stock;
      }
    }
  
    if (event.target.className === "cartDecrement") {
      if (quantity > 1) {
        quantity -= 1;
      }
    }


    // updating the visible quantity (innertext) to show the change in the DOM
    productQuantity.innerText = quantity;
    console.log(quantity);

    // updating the hidden quantity so the future clicks know the latest no.
    productQuantity.setAttribute("data-quantity", quantity.toString());
    return quantity;
  };
