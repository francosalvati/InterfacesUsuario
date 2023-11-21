"use strict";

if (window.location.pathname.split("/").pop() == "login.html") {

    let form = document.querySelector(".form-login");

    function logueado(e) {
        e.submitter.classList.toggle("success")

        setTimeout(() => {
            window.location.href = "home.html"
        }, 500);
    }

    function goLogin() {
        let loginForm = `<img src="./imagenes/Logo.png" class="logo" alt="">
    <div class="flex column w-90 a-center">
        <div class="input-container">
            <input type="text" id="input-dinamico" class="input-login" placeholder="">
            <label for="input-dinamico" class="input-label">Correo electronico</label>
        </div>
        <div class="input-container">
        <input type="password" id="input-dinamico" class="input-login" placeholder="">
        <label for="input-dinamico" class="input-label">Contraseña</label>
        </div>
        <button class="btn btn-texto" id="login">Iniciar Sesíon</button>
        </div>
        
        <button class="input-rapido flex a-center">
    
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path
            d="M27.2569 12.5519H26.25V12.5H15V17.5H22.0644C21.0338 20.4106 18.2644 22.5 15 22.5C10.8581 22.5 7.5 19.1419 7.5 15C7.5 10.8581 10.8581 7.5 15 7.5C16.9119 7.5 18.6513 8.22125 19.9756 9.39937L23.5112 5.86375C21.2787 3.78312 18.2925 2.5 15 2.5C8.09688 2.5 2.5 8.09688 2.5 15C2.5 21.9031 8.09688 27.5 15 27.5C21.9031 27.5 27.5 21.9031 27.5 15C27.5 14.1619 27.4137 13.3438 27.2569 12.5519Z"
                fill="#FFC107" />
            <path
            d="M3.94128 9.18187L8.04816 12.1937C9.15941 9.4425 11.8507 7.5 15 7.5C16.9119 7.5 18.6513 8.22125 19.9757 9.39937L23.5113 5.86375C21.2788 3.78312 18.2925 2.5 15 2.5C10.1988 2.5 6.03503 5.21062 3.94128 9.18187Z"
            fill="#FF3D00" />
            <path
                d="M15 27.5C18.2287 27.5 21.1625 26.2644 23.3806 24.255L19.5118 20.9813C18.2147 21.9677 16.6296 22.5013 15 22.5C11.7487 22.5 8.98808 20.4269 7.94808 17.5338L3.87183 20.6744C5.94058 24.7225 10.1418 27.5 15 27.5Z"
                fill="#4CAF50" />
                <path
                d="M27.2569 12.5519H26.25V12.5H15V17.5H22.0644C21.5714 18.8853 20.6833 20.0957 19.51 20.9819L19.5119 20.9806L23.3806 24.2544C23.1069 24.5031 27.5 21.25 27.5 15C27.5 14.1619 27.4137 13.3438 27.2569 12.5519Z"
                fill="#1976D2" />
                </svg>
                <span class="btn-texto">
                Iniciar sesion con Google
                </span>
                </button>
                <button class="input-rapido flex a-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <g clip-path="url(#clip0_435_137)">
                <path
                d="M30 15C30 6.71578 23.2842 0 15 0C6.71578 0 0 6.71566 0 15C0 22.4869 5.48531 28.6925 12.6562 29.8178V19.3359H8.84766V15H12.6562V11.6953C12.6562 7.93594 14.8957 5.85938 18.3219 5.85938C19.9631 5.85938 21.6797 6.15234 21.6797 6.15234V9.84375H19.7883C17.9248 9.84375 17.3438 11 17.3438 12.1863V15H21.5039L20.8389 19.3359H17.3438V29.8178C24.5147 28.6925 30 22.487 30 15Z"
                    fill="#1877F2" />
                    <path
                    d="M20.8389 19.3359L21.5039 15H17.3438V12.1863C17.3438 10.9999 17.9249 9.84375 19.7883 9.84375H21.6797V6.15234C21.6797 6.15234 19.9631 5.85938 18.3219 5.85938C14.8957 5.85938 12.6562 7.93594 12.6562 11.6953V15H8.84766V19.3359H12.6562V29.8178C13.4316 29.9393 14.2152 30.0002 15 30C15.7848 30.0002 16.5684 29.9393 17.3438 29.8178V19.3359H20.8389Z"
                    fill="white" />
                    </g>
                    <defs>
                    <clipPath id="clip0_435_137">
                    <rect width="30" height="30" fill="white" />
                    </clipPath>
                    </defs>
                    </svg>
                    <span class="btn-texto">
            Iniciar sesion con Facebook
            </span>
            </button>
            <div class="flex between a-center my-20b ">
            <div class="linea"></div>
        <div class="medio"></div>
        <div class="linea"></div>
        </div>
    <div class="flex w-90 a-center between">
        <a href="">olvidaste tu contraseña?</a>
        <button class="btn-2 btn-texto" id="goRegistro">Crear cuenta</button>
        </div>`
        form.innerHTML = loginForm
    }

    function goRegistro() {
        let registroForm = `<img src="./imagenes/Logo.png" class="logo" alt="">
<div class="flex column w-90 a-center">
    <div class="input-container">
        <input type="text" id="input-dinamico" class="input-login" placeholder="">
        <label for="input-dinamico" class="input-label">Nombre*</label>
    </div>
    <div class="input-container">
        <input type="text" id="input-dinamico" class="input-login" placeholder="">
        <label for="input-dinamico" class="input-label">Apellido*</label>
    </div>
    <div class="input-container">
        <input type="text" id="input-dinamico" class="input-login" placeholder="">
        <label for="input-dinamico" class="input-label">Nombre usuario</label>
    </div>
    <div class="input-container">
        <input type="email" id="input-dinamico" class="input-login" placeholder="">
        <label for="input-dinamico" class="input-label">Correo electronico*</label>
    </div>
    <div class="input-container">
        <input type="password" id="input-dinamico" class="input-login" placeholder="">
        <label for="input-dinamico" class="input-label">Contraseña*</label>
    </div>
    <div class="input-container">
        <input type="password" id="input-dinamico" class="input-login" placeholder="">
        <label for="input-dinamico" class="input-label">Repita la contraseña</label>
    </div>
    <div class="input-container">
        <input type="date" id="input-dinamico" class="input-login" placeholder="">
        <label for="input-dinamico" class="input-label">Fecha de nacimiento</label>
    </div>
    <small class="texto-chico">*Campos Obligatorios</small>
    <button class="btn btn-texto" id="login">Registrarse</button>
</div>
<div class="flex between a-center my-20b ">
    <div class="linea"></div>
    <div class="medio"></div>
    <div class="linea"></div>
</div>
<div class="flex w-90 a-center between">
    <a href="">olvidaste tu contraseña?</a>
    <button class="btn-3 btn-texto" id="goLogin">Crear cuenta</button>
        </div>`
        form.innerHTML = registroForm
    }
    function borroso() {
        form.classList.add("borroso")
        setTimeout(() => {
            form.classList.remove("borroso")
        }, 500);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(e.submitter)
        let condicion = e.submitter.id
        switch (condicion) {
            case "login":
                logueado(e)
                break;
            case "goLogin":
                goLogin();
                break;
            case "goRegistro":
                goRegistro()
                break;
            default:
                borroso();
        }
    });
    goLogin();

}

// LOADER

console.log(window.location.pathname)
if(window.location.pathname.split("/").pop() == "home.html"){
    
}

