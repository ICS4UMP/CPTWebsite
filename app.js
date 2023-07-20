const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

// Adds click functionality to navbar button
menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});  

// Adding items to cart
const cart = [];

// Check and update display to add to cart
function addToCart(itemName, itemPrice) {
    const item = { name: itemName, price: itemPrice };

    const existingItem = cart.find(cartItem => cartItem.name === itemName);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        item.quantity = 1;
        cart.push(item);
    }

    renderCart();
}

// Check and update display to remove from cart
function removeFromCart(itemName) {
    const index = cart.findIndex(cartItem => cartItem.name === itemName);

    if (index !== -1) {
        const item = cart[index];
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart.splice(index, 1);
        }
    }

    renderCart();
}

// Creates cart with values
function renderCart() {
    const cartContainer = document.querySelector('.cart');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cartContainer.innerHTML = `
            <h2>Cart</h2>
            <div class="cart-items">
                ${cart.map(item => `
                     <div class="cart-item">
                        <h3>${item.name}</h3>
                        <div class="quantity">${item.quantity}</div>
                        <p>$${(item.price * item.quantity).toFixed(2)}</p>
                        <button onclick="removeFromCart('${item.name}')">Remove</button>
                      </div>
                `).join('')}
            </div>
            <div class="cart-total">
                Total: $${calculateCartTotal().toFixed(2)}
            </div>
        `;
    }
}

function calculateCartTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

renderCart();