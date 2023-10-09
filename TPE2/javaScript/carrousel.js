"use strict";

//PANTALLA DE CARGA
function cargar() {
  if (progreso < 100) {
    progreso += 1;
    spinnerInner.style.transform = `rotate(${progreso * 3.6}deg)`;
    progressBar.style.width = `${progreso}%`;
    percentage.textContent = `${progreso}%`;
    setTimeout(cargar, 20); // Simula la carga
  }
  if(progreso == 100) spinner.classList.add("hide")
}

let spinner = document.querySelector(".spinner-container");
let progreso = 0;
const spinnerInner = document.getElementById("spinnerInner");
const progressBar = document.getElementById("progressBar");
const percentage = document.getElementById("percentage");


//MENU USUARIO
let btnUsuario = document.querySelector("#btn-usuario");
let menuUsuario = document.querySelector(".menu-usuario");
btnUsuario.addEventListener("click", () => {
    menuUsuario.classList.toggle("desapareser")
});





// FUNCION DE CARRUSEL
const carruseles = document.querySelectorAll(".carrusel");
carruseles.forEach((carrusel) => {
  const prevBtn = carrusel.querySelector(".prevBtn");
  const nextBtn = carrusel.querySelector(".nextBtn");
  const cardsContainer = carrusel.querySelector(".cardsContainer");
  const cards = carrusel.querySelectorAll(".card", ".cardEspecial");
  let currentIndex = 0;
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });
  nextBtn.addEventListener("click", () => {
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






