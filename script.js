// script.js
document.addEventListener("DOMContentLoaded", () => {
const menuToggle = document.getElementById('menu-toggle');
const navList    = document.getElementById('nav-list');

// Mostrar/ocultar el menú al hacer clic en el botón
menuToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // Evitar que el clic se propague al documento
    navList.classList.toggle("active");
    });

    // Ocultar el menú al hacer clic fuera de él
    document.addEventListener("click", () => {
    if (navList.classList.contains("active")) {
        navList.classList.remove("active");
    }
    });

    // Evitar que el clic dentro del menú lo cierre
    navList.addEventListener("click", (e) => {
     e.stopPropagation();
    });
});

// ============================
//        MENÚ DESPLEGABLE
// ============================

function toggleSubmenu(event) {
    event.preventDefault();
    event.stopPropagation();

    const parentLi = event.currentTarget.parentElement;

    document.querySelectorAll('.has-submenu').forEach(item => {
        if (item !== parentLi) {
            item.classList.remove('open');
        }
    });

    parentLi.classList.toggle('open');
}

document.querySelectorAll('.has-submenu > a').forEach(link => {
    link.addEventListener('click', toggleSubmenu);
});

document.addEventListener('click', function (event) {
    const isSubmenu = event.target.closest('.has-submenu');
    const isLoginForm = event.target.closest('#login-form');
    const isLoginButton = event.target.closest('#login-btn');

    if (!isSubmenu && !isLoginForm && !isLoginButton) {
        document.querySelectorAll('.has-submenu').forEach(item => item.classList.remove('open'));
        document.getElementById('login-form').style.display = 'none';
    }
});

// ============================
//        MENÚ HAMBURGUESA
// ============================
const menuHamburguesa = document.querySelector('.menu-hamburguesa');

if (menuHamburguesa) {
    menuHamburguesa.addEventListener('click', () => {
        const nav = document.querySelector('nav');
        nav.classList.toggle('open');
    });
}

document.querySelectorAll("nav ul li").forEach(item => {
    item.addEventListener("click", () => {
        const submenu = item.querySelector(".submenu");
        if (submenu) {
            submenu.classList.toggle("open");
        }
    });
});

// ============================
//        CAROUSEL
// ============================
let imagenes = [
    {
        "url": "img/Carrusel/img1.jpg",
        "nombre": "Brownie",
        "descripcion": "Un postre de chocolate húmedo"

    },
    {
        "url": "img/Carrusel/img2.jpg",
        "nombre": "Torta de Chocolate",
        "descripcion": "Exclusiva para los amantes del chocolate"

    },
    {
        "url": "img/Carrusel/img3.jpg",
        "nombre": " Cheesecake de Maracuyá",
        "descripcion": "Para aquellos que les encanta el cítrico"

    },
]

let atras = document.getElementById('atras');
let adelante = document.getElementById('adelante');
let imagen = document.getElementById('img');
let puntos = document.getElementById('puntos');
let texto = document.getElementById('texto')
let actual = 0
posicionCarrusel()

atras.addEventListener('click', function(){
    actual -=1

    if (actual == -1){
        actual = imagenes.length - 1
    }

    imagen.innerHTML = ` <img class="img" src="${imagenes[actual].url}" alt="logo pagina" loading="lazy"></img>`
    texto.innerHTML = `
    <h3>${imagenes[actual].nombre}</h3>
    <p>${imagenes[actual].descripcion}</p>
    `
    posicionCarrusel()
})
adelante.addEventListener('click', function(){
    actual +=1

    if (actual == imagenes.length){
        actual = 0
    }

    imagen.innerHTML = ` <img class="img" src="${imagenes[actual].url}" alt="logo pagina" loading="lazy"></img>`
    texto.innerHTML = `
    <h3>${imagenes[actual].nombre}</h3>
    <p>${imagenes[actual].descripcion}</p>
    `
    posicionCarrusel()
})

function posicionCarrusel() {
    puntos.innerHTML = "";
    imagenes.forEach((_, i) => {
        const punto = document.createElement("span");
        punto.textContent = "●";
        punto.className = i === actual ? "activo" : "";
        punto.addEventListener("click", () => {
            actual = i;
            imagen.innerHTML = ` <img class="img" src="${imagenes[actual].url}" alt="logo pagina" loading="lazy"></img>`;
            texto.innerHTML = `
                <h3>${imagenes[actual].nombre}</h3>
                <p>${imagenes[actual].descripcion}</p>
            `;
            posicionCarrusel();
        });
        puntos.appendChild(punto);
    });
}

// ============================
//        CARRITO
// ============================

let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalTexto = document.getElementById("total-carrito");

    lista.innerHTML = "";
    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - S/${item.precio.toFixed(2)}`;
        lista.appendChild(li);
    });

    totalTexto.textContent = total.toFixed(2);
}