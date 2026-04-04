'use strict';

const burgerButton = document.querySelector('.js-burger-button');

burgerButton.addEventListener('click', toggleBurgerMenu);

function toggleBurgerMenu() {
    burgerButton.closest('.menu').classList.toggle('_active');
    document.body.classList.toggle('_lock');
}