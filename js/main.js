'use strict';

const burgerButton = document.querySelector('.js-burger-button');

burgerButton.addEventListener('click', toggleBurgerMenu);

function toggleBurgerMenu() {
    burgerButton.closest('.menu').classList.toggle('_active');
    document.body.classList.toggle('_lock');
}  

function renderProducts(products, selectedCountry) {
    let target = document.querySelector('.js-products-grid');
    target.innerHTML = '';

    for(let picture of products) {
        if(picture.country === selectedCountry) {
            target.innerHTML += renderCard(picture);
        }
    }
}

renderProducts(products, 'Германия');

function renderCard(picture) {
    let card = `
        <div class="products__card card">
            <div class="card__image-container">
                <img src="${picture.image}" alt="${picture.title} - ${picture.author}" class="card__image">
            </div>
            <p class="card__author">${picture.author}</p>
            <h3 class="card__name">${picture.title}</h3>
            <p class="card__features">${picture.features}</p>
            <span class="card__price">${picture.price} руб</span>
            <button type="button" class="card__button btn">В корзину</button>
        </div>`;

    return card;
}