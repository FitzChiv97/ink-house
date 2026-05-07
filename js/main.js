'use strict';

// data
let cartData = [];
const initialProducts = products.filter(product => product.country === 'Франция');

// navigation
const burgerButton = document.querySelector('.js-burger-button');
const logo = document.querySelector('.js-logo');
const menu = document.querySelector('.js-menu');
const headerLinks = document.querySelectorAll('.js-menu-link');

// products
const tabsButtons = document.querySelectorAll('.js-products-button');
const productsGrid = document.querySelector('.js-products-grid');
const countryLinks = document.querySelectorAll('.js-country-link');

// cart
const cart = document.querySelector('.js-cart-button');
const cartItemsCount = document.querySelector('.js-cart-count');
const cartCloseButton = document.querySelector('.js-cart-close-button');
const cartOverlay = document.querySelector('.js-cart-overlay');
const cartDrawer = document.querySelector('.js-cart-drawer');
const cartList = document.querySelector('.js-cart-drawer-list');
const cartTotal = document.querySelector('.js-order-total');


// navigation events
burgerButton.addEventListener('click', toggleMenu);
logo.addEventListener('click', checkActiveMenu);
headerLinks.forEach(link => link.addEventListener('click', checkActiveMenu));

// products events
tabsButtons.forEach(btn => btn.addEventListener('click', switchCountry));
countryLinks.forEach(link => link.addEventListener('click', switchCountry));
productsGrid.addEventListener('click', addToCart);

// cart events
cart.addEventListener('click', openCartDrawer);
cartCloseButton.addEventListener('click', closeCartDrawer);
cartOverlay.addEventListener('click', closeByOverlay);
cartList.addEventListener('click', handleCartListClick);


// initial calls
renderProducts(initialProducts); // avoid empty products section
updateCartState();


// navigation functions
function toggleMenu() {
    menu.classList.toggle('_active');
    document.body.classList.toggle('_lock');
}

function closeMenu() {
    menu.classList.remove('_active');
    document.body.classList.remove('_lock');
}

function checkActiveMenu() {
    if(menu.classList.contains('_active')) closeMenu();
}


// products logic functions
function switchCountry(e) {
    // Guard Clause
    const selectedCountry = e.target.dataset.country;
    if(!selectedCountry) return; 

    // update active country tab state
    tabsButtons.forEach(btn => btn.classList.remove('_active'));
    const activeButton = [...tabsButtons].find(btn => btn.dataset.country === selectedCountry);

    // use optional chaining in case tab button is not found (e.g. click from footer)
    activeButton?.classList.add('_active');

    // filter and render selected category
    const filteredProducts = products.filter(product => product.country === selectedCountry);

    renderProducts(filteredProducts);
}


// products rendering funcitons
function renderProducts(products) {
    productsGrid.innerHTML = products.reduce((acc, product) => acc + renderCard(product), '');
}

function renderCard(product) {
    return `
        <div class="products__card card js-card" data-id="${product.id}">
            <div class="card__image-block">
                <img src="${product.image}" alt="${product.title} - ${product.author}" class="card__image js-card-image">
            </div>
            <p class="card__author">${product.author}</p>
            <h3 class="card__name js-card-title">${product.title}</h3>
            <p class="card__features">${product.features}</p>
            <span class="card__price js-card-price">${product.price} руб</span>
            <button type="button" class="card__button btn js-add-to-cart">В корзину</button>
        </div>`;
}


// cart logic functions
function openCartDrawer() {
    document.body.classList.add('_lock');
    cartOverlay.classList.add('_active');
    cartDrawer.classList.add('_active');
}

function closeCartDrawer() {
    document.body.classList.remove('_lock');
    cartOverlay.classList.remove('_active');
    cartDrawer.classList.remove('_active');
}

function closeByOverlay(e) {
    if(e.target.classList.contains('js-cart-overlay')) closeCartDrawer();
}

function addToCart(e) {
    // Guard Clause
    const btn = e.target.closest('.js-add-to-cart');
    if(!btn) return;

    // collect product data
    const card = btn.closest('.js-card');
    const productData = getProductData(card);

    // add product data to cart 
    const existingItem = cartData.find(el => el.id === productData.id);
    existingItem ? existingItem.count++: cartData.push({...productData, count: 1});

    renderCartList(cartData);
}

function getProductData(card) {
    return {
        id: card.dataset.id,
        title: card.querySelector('.js-card-title').innerText,
        price: parseInt(card.querySelector('.js-card-price').innerText.replace(/\s/g, '')),
        img: card.querySelector('.js-card-image').src,
    };
}

function updateCartItemCount() {
    const count = cartData.reduce((sum, item) => sum + item.count, 0);

    if(count) {
        cartItemsCount.classList.add('_active');
        cartItemsCount.textContent = count;
    } else {
        cartItemsCount.classList.remove('_active');
    }
}

function updateCartTotal() {
    cartTotal.innerHTML = cartData.reduce((acc, item) => acc + (item.price * item.count), 0).toLocaleString('ru-RU') + ' руб';
}

function updateCartState() {
    updateCartItemCount();
    updateCartTotal();
}


// cart list logic functions
function deleteCartItem(e) {
    const btn = e.target.closest('.js-delete-btn');
    if(!btn) return;

    const deleteId = btn.closest('.js-cart-drawer-item').dataset.id;
    cartData = cartData.filter(el => el.id !== deleteId);

    renderCartList(cartData);
}

function changeCartItemQty(e) {
    const btn = e.target.closest('.js-cart-minus-btn, .js-cart-plus-btn');
    if(!btn) return;

    // find item by id
    const id = btn.closest('.js-cart-drawer-item').dataset.id; 
    const item = cartData.find(item => item.id === id);
    if(!item) return;
    
    // change item qty
    btn.classList.contains('js-cart-minus-btn') ? item.count--: item.count++;

    // or delete item if qty is 0
    if(item.count < 1) cartData = cartData.filter(item => item.id !== id);

    renderCartList(cartData);
}

function handleCartListClick(e) {
    deleteCartItem(e);
    changeCartItemQty(e);
}


// cart rendering functions
function renderCartList(cartData) {
    cartList.innerHTML = cartData.reduce((acc, item) => acc + renderCartItem(item), '');
    updateCartState();
}

function renderCartItem(item) {
    return `
        <li class="cart-drawer__item item js-cart-drawer-item" data-id="${item.id}">
            <div class="item__row">
                <button class="item__delete-btn js-delete-btn">
                    <svg class="item__delete-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
                <div class="item__image-block">
                    <img src="${item.img}" alt="${item.title}" class="item__image">
                </div>
                <div class="item__info">
                    <div class="item__name">${item.title}</div>
                    <div class="item__price">${(item.price * item.count).toLocaleString('ru-RU')} руб</div>
                </div>
                <div class="item__qty">
                    <div class="item__qty-text">Количество:</div>
                    <div class="item__qty-controls">
                        <button type="button" class="item__qty-btn js-cart-minus-btn">
                            <svg class="item__qty-icon" xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="currentColor">
                                <path d="M200-440v-80h560v80H200Z"/>
                            </svg>
                        </button>
                        <span class="item__qty-num">${item.count}</span>
                        <button type="button" class="item__qty-btn js-cart-plus-btn">
                            <svg class="item__qty-icon" xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="currentColor">
                                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    `;
}