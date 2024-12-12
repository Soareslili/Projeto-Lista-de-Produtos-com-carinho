

const products = [
    { id: 1, name: 'Arroz ', price: 25.0 },
    { id: 2, name: 'Feijão ', price: 6.0 },
    { id: 3, name: 'Açúcar ', price: 3.0 },
    { id: 4, name: 'Sal ', price: 4.0 },
    { id: 5, name: 'Café ', price: 18.0 },
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('productList');
    const cartList = document.getElementById('cartList');
    const orderModal = document.getElementById('orderModal');
    const closeModal = document.querySelector('.close');

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <span>${product.name} - R$${product.price.toFixed(2)}</span>
            <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        `;
        productList.appendChild(productItem);
    });

    document.getElementById('newOrderBtn').addEventListener('click', resetOrder);
    document.getElementById('confirmOrderBtn').addEventListener('click', confirmOrder);
    closeModal.addEventListener('click', () => { orderModal.style.display = 'none'; });
    window.onclick = (event) => { if (event.target === orderModal) { orderModal.style.display = 'none'; } };
});

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.product.id === productId);
    
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    renderCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    renderCart();
}

function updateQuantity(productId, quantity) {
    const cartItem = cart.find(item => item.product.id === productId);
    if (cartItem) {
        cartItem.quantity = quantity;
        if (cartItem.quantity <= 0) {
            removeFromCart(productId);
        } else {
            renderCart();
        }
    }
}

function renderCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${item.product.name} - R$${item.product.price.toFixed(2)} x ${item.quantity}</span>
            <div>
                <button onclick="updateQuantity(${item.product.id}, ${item.quantity - 1})">-</button>
                <button onclick="updateQuantity(${item.product.id}, ${item.quantity + 1})">+</button>
                <button onclick="removeFromCart(${item.product.id})">Remover</button>
            </div>
        `;
        cartList.appendChild(cartItem);
    });
}

function confirmOrder() {
    const orderModal = document.getElementById('orderModal');
    orderModal.style.display = 'block';
}

function resetOrder() {
    cart = [];
    renderCart();
}
