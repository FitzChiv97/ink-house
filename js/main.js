'use strict';

const burgerButton = document.querySelector('.js-burger-button');
const tabsContainer = document.querySelector('.js-products-tabs');
const tabsButtons = tabsContainer.querySelectorAll('.js-products-button');
const productsGrid = document.querySelector('.js-products-grid');

const initialProducts = products.filter(product => product.country === 'Франция');

burgerButton.addEventListener('click', toggleBurgerMenu);
tabsContainer.addEventListener('click', switchCountry);

renderProducts(initialProducts); // initial call to avoid empty products section

function toggleBurgerMenu() {
    burgerButton.closest('.menu').classList.toggle('_active');
    document.body.classList.toggle('_lock');
}

function switchCountry(e) {
    if(!e.target.classList.contains('js-products-button')) return; // handle clicks on empty space
 
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