'use strict';

const burgerButton = document.querySelector('.js-burger-button');

burgerButton.addEventListener('click', toggleBurgerMenu);

function toggleBurgerMenu() {
    burgerButton.closest('.menu').classList.toggle('_active');
    document.body.classList.toggle('_lock');
}

const products = [
    {
        id: 1,
        country: 'Франция',
        author: 'Марсель Руссо',
        title: 'Охота Амура',
        features: 'Холст, масло (50х80)',
        price: '14 500',
        image: 'img/products/france/amurs-hunt.jpg',
    },
    {
        id: 2,
        country: 'Франция',
        author: 'Анри Селин',
        title: 'Дама с собачкой',
        features: 'Акрил, бумага (50х80)',
        price: '16 500',
        image: 'img/products/france/lady-with-the-dog.jpg',
    },
    {
        id: 3,
        country: 'Франция',
        author: 'Франсуа Дюпон',
        title: 'Процедура',
        features: 'Цветная литография (40х60)',
        price: '20 000',
        image: 'img/products/france/procedure.jpg',
    },
    {
        id: 4,
        country: 'Франция',
        author: 'Луи Детуш',
        title: 'Роза',
        features: 'Бумага, акрил (50х80)',
        price: '12 000',
        image: 'img/products/france/rose.jpg',
    },
    {
        id: 5,
        country: 'Франция',
        author: 'Франсуа Дюпон',
        title: 'Птичья трапеза',
        features: 'Цветная литография (40х60)',
        price: '22 500',
        image: 'img/products/france/birds-meal.jpg',
    },
    {
        id: 6,
        country: 'Франция',
        author: 'Пьер Моранж',
        title: 'Пейзаж с рыбой',
        features: 'Цветная литография (40х60) ',
        price: '20 000',
        image: 'img/products/france/landscape-with-fish.jpg',
    }
];  

function renderProducts(products, selectedCountry) {
    let target = document.querySelector('.js-products-grid');
    target.innerHTML = '';

    for(let picture of products) {
        if(picture.country === selectedCountry) {
            target.innerHTML += renderCard(picture);
        }
    }
}

renderProducts(products, 'Франция');

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