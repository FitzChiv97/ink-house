'use strict';

let cartData = [];
const burgerButton = document.querySelector('.js-burger-button');
const logo = document.querySelector('.js-logo');
const menu = document.querySelector('.js-menu');
const headerLinks = document.querySelectorAll('.js-menu-link');
const cart = document.querySelector('.js-cart-button');
const cartCloseButton = document.querySelector('.js-cart-close-button');
const cartOverlay = document.querySelector('.js-cart-overlay');
const cartDrawer = document.querySelector('.js-cart-drawer');
const cartList = document.querySelector('.js-cart-drawer-list');
const tabsButtons = document.querySelectorAll('.js-products-button');
const productsGrid = document.querySelector('.js-products-grid');
const countryLinks = document.querySelectorAll('.js-country-link');

const initialProducts = products.filter(product => product.country === 'Франция');

burgerButton.addEventListener('click', toggleMenu);
logo.addEventListener('click', checkActiveMenu);
cart.addEventListener('click', openCartDrawer);
cartOverlay.addEventListener('click', closeByOverlay);
cartCloseButton.addEventListener('click', closeCartDrawer);
productsGrid.addEventListener('click', addToCart);
headerLinks.forEach(link => link.addEventListener('click', checkActiveMenu));
tabsButtons.forEach(btn => btn.addEventListener('click', switchCountry));
countryLinks.forEach(link => link.addEventListener('click', switchCountry));

renderProducts(initialProducts); // initial call to avoid empty products section

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

function switchCountry(e) {
    const selectedCountry = e.target.dataset.country;

    // make selected country tab-button active
    tabsButtons.forEach(btn => btn.classList.remove('_active'));
    const activeButton = [...tabsButtons].find(btn => btn.dataset.country === selectedCountry);
    activeButton.classList.add('_active');

    // render products by selected country
    const filteredProducts = products.filter(product => product.country === selectedCountry);

    renderProducts(filteredProducts);
}

function renderProducts(products) {
    productsGrid.innerHTML = '';

    products.forEach(product => {
        productsGrid.innerHTML += renderCard(product);
    })
}

function renderCard(product) {
    let card = `
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

    return card;
}

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

function CartItem(id, title, price, img) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.img = img;
    this.count = 1;
}

function addToCart(e) {
    let btn = e.target.closest('.js-add-to-cart'); // check click on add-to-cart button

    if(!btn) return; // Guard Clause

    // collect clicked card data
    const card = btn.closest('.js-card'); 
    const cardId = card.dataset.id;
    const cardTitle = card.querySelector('.js-card-title').innerText;
    const cardPrice = parseInt(card.querySelector('.js-card-price').innerText.replace(/\s/g, ''));
    const cardImage = card.querySelector('.js-card-image').getAttribute('src');

    // add product info to cart 
    const existingItem = cartData.find(el => el.id === cardId);

    if(existingItem){
        existingItem.count++;
    } else {
        const item = new CartItem(cardId, cardTitle, cardPrice, cardImage);
        cartData.push(item);
    }

    renderCartList(cartData);
}

function renderCartList(cartData) {
    cartList.innerHTML = cartData.reduce((acc, item) => {
        return acc += renderCartItem(item); 
    }, '');
}

function renderCartItem(item) {
    let cartItem = `
        <li class="cart-drawer__item item js-cart-drawer-item" data-id="${item.id}">
            <div class="item__row">
                <button class="item__delete-btn">
                    <svg class="item__delete-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                    </svg>
                </button>
                <div class="item__image-block">
                    <img src="${item.img}" alt="${item.title}" class="item__image">
                </div>
                <div class="item__info">
                    <div class="item__name">${item.title}</div>
                    <div class="item__price js-item-price">${item.price * item.count} руб</div>
                </div>
                <div class="item__qty">
                    <div class="item__qty-text">Количество:</div>
                    <div class="item__qty-controls">
                        <button type="button" class="item__qty-btn">
                            <svg class="item__qty-icon" xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="currentColor">
                                <path d="M200-440v-80h560v80H200Z"/>
                            </svg>
                        </button>
                        <span class="item__qty-num">${item.count}</span>
                        <button type="button" class="item__qty-btn">
                            <svg class="item__qty-icon" xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="currentColor">
                                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    `;

    return cartItem;
}