"use strict";

if (window.location.pathname.split("/").pop() == "index.html" || window.location.pathname.split("/").pop() == "") {
  window.location.href = "login.html"
}

//MENU USUARIO
const btnUsuario = document.querySelector("#btn-usuario");
const menuUsuario = document.querySelector(".menu-usuario");
btnUsuario.addEventListener("click", () => {
  menuUsuario.classList.toggle("desapareser")
  btnUsuario.children[1].classList.toggle("rotar")
});

const btnHamburguesa = document.querySelector('.btn-menu');
const menuHamb = document.querySelector('.hambMenu')
btnHamburguesa.addEventListener('click', () => {
  btnHamburguesa.children[0].src.split("/").pop() == "hamburguesa.svg" ? btnHamburguesa.children[0].src = "./imagenes/cruz.svg" : btnHamburguesa.children[0].src = "./imagenes/hamburguesa.svg"
  menuHamb.classList.toggle("desapareser")
  btnHamburguesa.classList.toggle("rotar")
});


//PANTALLA DE CARGAif
if (window.location.pathname.split("/").pop() == "home.html" || window.location.pathname.split("/").pop() == "") {

  function cargar() {
    if (progreso < 100) {
      progreso += 1;
      percentage.textContent = `${progreso}%`;
      setTimeout(cargar, 20);
    }
    if (progreso == 100) spinner.classList.add("hide")
  }

  let spinner = document.querySelector(".spinner-container");
  let progreso = 0;
  const percentage = document.getElementById("percentage");

  cargar();





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


}

