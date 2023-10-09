"use strict";

// let destacados
// let gratuitos
// let especiales = []

// let carrusel = document.querySelector(".carrusel")


const carruseles = document.querySelectorAll('.carrusel');
carruseles.forEach((carrusel) => {
    const prevBtn = carrusel.querySelector('.prevBtn');
    const nextBtn = carrusel.querySelector('.nextBtn');
    const cardsContainer = carrusel.querySelector('.cardsContainer');
    const cards = carrusel.querySelectorAll('.card', '.cardEspecial');
    let currentIndex = 0;
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const translateX = -currentIndex * cardWidth;
        cardsContainer.style.transform = `translateX(${translateX}px)`;
    }
});