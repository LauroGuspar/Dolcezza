//Menu Hamburger
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// --- Carrito con LocalStorage y data-atributos ---
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


// ------ Lógica para mostrar el carrito en la página de compras ------

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

// Botón para vaciar el carrito
function vaciarCarrito() {
  localStorage.removeItem('carrito');
  mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);

//Modal-Tarjeta
function pagar() {
  // Verifica qué radio está seleccionado
  const metodo = document.querySelector('input[name="pago"]:checked');
  if (!metodo) {
    alert("Por favor selecciona un método de pago");
    return;
  }

  if (metodo.value === "tarjeta") {
    abrirModal('modal-tarjeta');
    // Opcional: limpiar el formulario
    document.getElementById("form-tarjeta").reset();
  } else if (metodo.value === "yape") {
    abrirModal('modal-yape');
  }
}

// Abrir/cerrar modal (usando display block/none)
function abrirModal(id) {
  document.getElementById(id).style.display = "flex";
}
function cerrarModal(id) {
  document.getElementById(id).style.display = "none";
}

// Validación básica del formulario de tarjeta
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById("form-tarjeta").onsubmit = function(e) {
    e.preventDefault();
    // Puedes agregar aquí más validaciones si quieres
    alert("Pago realizado con éxito (demo) 😃");
    cerrarModal('modal-tarjeta');
    // Opcional: aquí podrías vaciar el carrito o redirigir
  };
});
