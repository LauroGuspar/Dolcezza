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
//        CARUSEL
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
    {
        "url": "img/Carrusel/img4.jpg",
        "nombre": " Crema Volteada",
        "descripcion": " Postre popular en Perú y Latinoamérica, similar al flan español y al crème caramel francés."

    },
    {
        "url": "img/Carrusel/img5.jpg",
        "nombre": "Torta de Tres Leches",
        "descripcion": "Un postre tradicional de la cocina latinoamericana, especialmente popular en México y América Central."

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

// ============================
//             MODAL
// ============================

const producto = document.querySelectorAll(".producto");

function abrirModal(imageData) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const modalButton = document.getElementById("modal-button-details");
    const modalDescription = document.getElementById("modal-description");
    const modalTitle = document.getElementById("modal-title");

    modal.classList.add('show');
    document.body.classList.add('modal-open');

    modalImage.src = imageData.src;
    modalDescription.textContent = imageData.dataset.description;
    modalButton.href = imageData.dataset.detailsLink;
    modalTitle.textContent = imageData.dataset.title;
}

function cerrarModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
}

producto.forEach(card => {
    card.addEventListener('click', () => {
        const image = card.querySelector(".Catalg_img");
        if (image) abrirModal(image);
    });
});

document.querySelectorAll(".close-btn").forEach(btn => {
    btn.addEventListener('click', cerrarModal);
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById("modal");
    if (event.target === modal) cerrarModal();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") cerrarModal();
});