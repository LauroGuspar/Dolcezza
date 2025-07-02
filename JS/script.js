//---- Menu Hamburger -------
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// --- Carrito ---
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".agregar-carrito").forEach(boton => {
    boton.addEventListener("click", function() {
      const nombre = this.getAttribute("data-nombre");
      const precio = parseFloat(this.getAttribute("data-precio"));
      const img = this.getAttribute("data-img");

      let cantidad = prompt(`¿Cuántos "${nombre}" deseas agregar?`, "1");
      cantidad = parseInt(cantidad);

      if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingresa una cantidad válida.");
        return;
      }

      let carrito = obtenerCarrito();
      let existente = carrito.find(item => item.nombre === nombre);

      if (existente) {
        existente.cantidad += cantidad;
      } else {
        carrito.push({ nombre, precio, cantidad, img });
      }

      guardarCarrito(carrito);
      alert(`¡Agregaste ${cantidad} "${nombre}" al carrito!`);
    });
  });
});


// ------ Mostrar el carrito ------

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

function mostrarCarrito() {
  const carrito = obtenerCarrito();
  const contenedor = document.getElementById('carrito-contenido');
  const totalSpan = document.getElementById('total');

  contenedor.innerHTML = '';

  let total = 0;

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>El carrito está vacío.</p>";
    totalSpan.textContent = "0.00";
    return;
  }

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${item.nombre}</strong> - S/${item.precio.toFixed(2)} x ${item.cantidad} = <b>S/${subtotal.toFixed(2)}</b>
    `;
    contenedor.appendChild(div);
  });

  totalSpan.textContent = total.toFixed(2);
}

// ----- Botón para vaciar el carrito ------
function vaciarCarrito() {
  localStorage.removeItem('carrito');
  mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);

// ----- Modal-Tarjeta -------
function pagar() {
  const metodo = document.querySelector('input[name="pago"]:checked');
  if (!metodo) {
    alert("Por favor selecciona un método de pago");
    return;
  }

  if (metodo.value === "tarjeta") {
    abrirModal('modal-tarjeta');
    document.getElementById("form-tarjeta").reset();
  } else if (metodo.value === "yape") {
    abrirModal('modal-yape');
  }
}

// ----- Abrir/cerrar modal -------
function abrirModal(id) {
  document.getElementById(id).style.display = "flex";
}
function cerrarModal(id) {
  document.getElementById(id).style.display = "none";
}

// Validación del form Tarjeta
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("form-tarjeta").onsubmit = function(e) {
    e.preventDefault();

    alert("Pago realizado con éxito");
    cerrarModal('modal-tarjeta');
    vaciarCarrito();
  };
});

// --- Modal del Producto ---
document.querySelectorAll(".img-producto").forEach(img => {
  img.addEventListener("click", function() {
    // Info dentro de la imagen
    const nombre = this.getAttribute("data-nombre");
    const precio = parseFloat(this.getAttribute("data-precio"));
    const imgSrc = this.getAttribute("data-img");
    const descripcion = this.getAttribute("data-descripcion");

    document.getElementById("modal-img-producto").src = imgSrc;
    document.getElementById("modal-img-producto").alt = nombre;
    document.getElementById("modal-nombre-producto").innerText = nombre;
    document.getElementById("modal-desc-producto").innerText = descripcion;
    document.getElementById("modal-precio-producto").innerText = `S/${precio.toFixed(2)}`;

    // Guarda datos para el botón
    const btn = document.getElementById("modal-btn-carrito");
    btn.setAttribute("data-nombre", nombre);
    btn.setAttribute("data-precio", precio);
    btn.setAttribute("data-img", imgSrc);

    document.getElementById("modal-producto").style.display = "flex";
  });
});

// Cerrar el modal
function cerrarModalProducto() {
  document.getElementById("modal-producto").style.display = "none";
}

// --- Botón "Agregar al carrito" dentro del modal ---
document.getElementById("modal-btn-carrito").addEventListener("click", function() {
  const nombre = this.getAttribute("data-nombre");
  const precio = parseFloat(this.getAttribute("data-precio"));
  const img = this.getAttribute("data-img");

  let cantidad = prompt(`¿Cuántos "${nombre}" deseas agregar?`, "1");
  cantidad = parseInt(cantidad);

  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Por favor, ingresa una cantidad válida.");
    return;
  }

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let existente = carrito.find(item => item.nombre === nombre);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, cantidad, img });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(`¡Agregaste ${cantidad} "${nombre}" al carrito!`);
  cerrarModalProducto();
});

// -------------- Carrusel de Productos --------------

let current = 0;
const items = document.querySelectorAll('.carousel-item');
let interval = null;

// Movil/Tablet
function isMobile() {
  return window.innerWidth <= 900;
}

// Evento para pantalla pequeñas
function addMobileClick() {
  items.forEach(item => {
    item.onclick = null;
    if (item.classList.contains('active') && isMobile()) {
      item.onclick = function(e) {
        const bounds = this.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        if (x < bounds.width / 2) {
          // Click lado izquierdo
          resetAutoCarousel();
          moveCarousel(-1);
        } else {
          // Click lado derecho
          resetAutoCarousel();
          moveCarousel(1);
        }
      }
      item.style.cursor = "pointer";
    }
  });
}

// Carrusel para escritorio
function addDesktopClick() {
  items.forEach((item, idx) => {
    item.onclick = null;
    item.style.cursor = "default";
    if (!isMobile()) {
      if (idx === (current - 1 + items.length) % items.length) {
        item.onclick = () => {
          resetAutoCarousel();
          moveCarousel(-1);
        };
        item.style.cursor = "pointer";
      }
      else if (idx === (current + 1) % items.length) {
        item.onclick = () => {
          resetAutoCarousel();
          moveCarousel(1);
        };
        item.style.cursor = "pointer";
      }
    }
  });
}

function updateCarousel() {
  items.forEach((item, idx) => {
    item.classList.remove('active', 'left', 'right', 'hidden');
    if (idx === current) {
      item.classList.add('active');
    } else if (idx === (current - 1 + items.length) % items.length) {
      item.classList.add('left');
    } else if (idx === (current + 1) % items.length) {
      item.classList.add('right');
    } else {
      item.classList.add('hidden');
    }
  });

  if (isMobile()) {
    addMobileClick();
  } else {
    addDesktopClick();
  }
}

// Animación automática
function moveCarousel(dir) {
  current = (current + dir + items.length) % items.length;
  updateCarousel();
}

function autoCarousel() {
  interval = setInterval(() => {
    moveCarousel(1);
  }, 30000);
}

function resetAutoCarousel() {
  clearInterval(interval);
  autoCarousel();
}

// Detecta cambio de tamaño
window.addEventListener('resize', updateCarousel);

updateCarousel();
autoCarousel();