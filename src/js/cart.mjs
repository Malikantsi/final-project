import { formatPrice, setLocalStorage, getLocalStorage, updateCartCount } from './utils.mjs';

const cartItems = getLocalStorage('cart');
const groupedCart = {};
cartItems.forEach(item => {
    const title = item.product_title;
    if (!groupedCart[title]) {
        groupedCart[title] = { ...item, quantity: 1, total: item.product_price.replace("$", "") };
        console.log(`IF: ${item.product_price}`);
    } else {
        groupedCart[title].quantity++;
        groupedCart[title].total = groupedCart[title].quantity * groupedCart[title].product_price.replace("$", "");
        console.log(`Else: ${groupedCart[title].product_price}`);
    }
});

const cartArray = Object.values(groupedCart);

// Display cart
function displayCart(items) {
    const cartList = document.querySelector(".cart-items-list");
    cartList.innerHTML = "";

    let subtotal = 0;

    items.forEach(item => {
        subtotal += Number(item.total);
        const cartRow = document.createElement("div");
        cartRow.classList.add("cart-item");
        cartRow.innerHTML = `
          <div>${item.product_title.substring(0, 20)}</div>
          <div>${item.product_price}</div>
          <div>${item.quantity}</div>
          <div>${item.total}</div>
          <div><button class="remove-btn" data-title="${item.product_title}">✖</button></div>
        `;
        cartList.appendChild(cartRow);
    });

    // Update summary
    const shipping = 5.99;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    console.log(subtotal);
    document.getElementById("subtotal").textContent = `${formatPrice(subtotal)}`;
    document.getElementById("shipping").textContent = `${formatPrice(shipping)}`;
    document.getElementById("tax").textContent = `${formatPrice(tax)}`;
    document.getElementById("total").textContent = `${formatPrice(total)}`;
    const OrderSum = [];
    OrderSum.push(formatPrice(subtotal));
    OrderSum.push(formatPrice(shipping));
    OrderSum.push(formatPrice(tax));
    OrderSum.push(formatPrice(total));
    localStorage.setItem('OrderSummary', JSON.stringify(OrderSum));
}

// Clear cart
document.getElementById("clear-cart").addEventListener("click", () => {
    document.querySelector(".cart-items-list").innerHTML = "";
    document.getElementById("subtotal").textContent = formatPrice("0.00");
    document.getElementById("total").textContent = formatPrice("0.00");
});

displayCart(cartArray);
