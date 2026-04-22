'use strict';

const burgerButton = document.querySelector('.js-burger-button');
const logo = document.querySelector('.js-logo');
const menu = document.querySelector('.js-menu');
const navLinks = document.querySelectorAll('.js-menu-link');
const tabsButtons = document.querySelectorAll('.js-products-button');
const productsGrid = document.querySelector('.js-products-grid');
const initialProducts = products.filter(product => product.country === 'Франция');

burgerButton.addEventListener('click', toggleMenu);
logo.addEventListener('click', checkActiveMenu);
navLinks.forEach(link => link.addEventListener('click', checkActiveMenu));
tabsButtons.forEach(btn => btn.addEventListener('click', switchCountry));

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
    tabsButtons.forEach(btn => btn.classList.remove('_active'));
    e.target.classList.add('_active'); 

    const country = e.target.dataset.country; // render products by selected country
    const filteredProducts = products.filter(product => product.country === country);

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
        <div class="products__card card">
            <div class="card__image-container">
                <img src="${product.image}" alt="${product.title} - ${product.author}" class="card__image">
            </div>
            <p class="card__author">${product.author}</p>
            <h3 class="card__name">${product.title}</h3>
            <p class="card__features">${product.features}</p>
            <span class="card__price">${product.price} руб</span>
            <button type="button" class="card__button btn">В корзину</button>
        </div>`;

    return card;
}