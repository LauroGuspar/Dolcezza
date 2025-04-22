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
document.querySelectorAll('.carrusel-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carrusel-track');
    const btnIzq = wrapper.querySelector('.btn-izq');
    const btnDer = wrapper.querySelector('.btn-der');
    const items = wrapper.querySelectorAll('.postres');

    const visibleItems = 4;
    const itemWidth = items[0].getBoundingClientRect().width + 20;
    let scrollIndex = 0;
    const maxScrollIndex = Math.max(0, items.length - visibleItems);

    function updateButtons() {
        btnIzq.style.display = scrollIndex <= 0 ? 'none' : 'block';
        btnDer.style.display = scrollIndex >= maxScrollIndex ? 'none' : 'block';
    }

    btnIzq.addEventListener('click', () => {
        if (scrollIndex > 0) {
            scrollIndex--;
            track.style.transform = `translateX(-${scrollIndex * itemWidth}px)`;
            updateButtons();
        }
    });

    btnDer.addEventListener('click', () => {
        if (scrollIndex < maxScrollIndex) {
            scrollIndex++;
            track.style.transform = `translateX(-${scrollIndex * itemWidth}px)`;
            updateButtons();
        }
    });

    track.style.animation = 'none';
    updateButtons();
});