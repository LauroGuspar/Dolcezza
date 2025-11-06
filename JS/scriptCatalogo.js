function rutaBase() {
   const path = window.location.pathname.split('#')[0].split('?')[0];
   const partes = path.split('/').filter(Boolean);

   const iHtml = partes.indexOf('html');

   if (iHtml === -1) return 'html/';

   const esArchivo = partes[partes.length - 1].includes('.');
   const dirs = esArchivo ? partes.slice(0, -1) : partes;

   const profundidad = dirs.length - (iHtml + 1);

   return profundidad > 0 ? '../'.repeat(profundidad) : '';
}
const base = rutaBase();
const Postres = [
   //Chocolateria
   {
      id: "Chocolateria",
      img: "/img/Catálogo/Postres/Chocolateria/Brownie.jpg",
      data_nombre: "Brownie",
      data_precio: "10",
      data_descripcion: "Delicioso brownie con trozos de chocolate.",
   },

   {
      id: "Chocolateria",
      img: "/img/Catálogo/Postres/Chocolateria/Chocochip.jpg",
      data_nombre: "Galleta de Chocochip",
      data_precio: "5",
      data_descripcion: "Deliciosas galletas con chispas de chocolate."
   },
   {
      id: "Chocolateria",
      img: "/img/Catálogo/Postres/Chocolateria/Chocotejas.webp",
      data_nombre: "Chocotejas Artesanales",
      data_precio: "3",
      data_descripcion: "Deliciosas Chocotejas artesanales rellenas.",
   },

   {
      id: "Chocolateria",
      img: "/img/Catálogo/Postres/Chocolateria/Torta_Chocolate.jpg",
      data_nombre: "Torta Húmeda De Chocolate",
      data_precio: "15",
      data_descripcion: "Deliciosa Torta Húmeda de Chocolate.",
   },

   {
      id: "Chocolateria",
      img: "/img/Catálogo/Postres/Chocolateria/trufas.jpg",
      data_nombre: "Trufas Con Relleno De Coco",
      data_precio: "3",
      data_descripcion: "Deliciosas trufas con relleno de coco.",
   },

   //Dulces
   {
      id: "Dulces",
      img: "/img/Catálogo/Postres/Dulces/Pastel_Blanco.jpg",
      data_nombre: "Pastel con relleno de Chocolate Blanco",
      data_precio: "15",
      data_descripcion: "Deliciosa Torta húmeda de Chocolate",
   },

   {
      id: "Dulces",
      img: "/img/Catálogo/Postres/Dulces/Cheesecake_Fresa.webp",
      data_nombre: "Cheesecake de Fresa",
      data_precio: "12",
      data_descripcion: "Delicioso cheesecake con cobertura de fresa.",
   },

   {
      id: "Dulces",
      img: "/img/Catálogo/Postres/Dulces/Cheesecake_Maracuyá.jpg",
      data_nombre: "Cheesecake de Maracuyá",
      data_precio: "12",
      data_descripcion: "Delicioso cheesecake con cobertura de maracuyá.",
   },

   {
      id: "Dulces",
      img: "/img/Catálogo/Postres/Dulces/Macarrones.jpeg",
      data_nombre: "Macarrones",
      data_precio: "10",
      data_descripcion: "Deliciosos macarrones de diferentes sabores.",
   },

   //Salados
   {
      id: "Salados",
      img: "/img/Catálogo/Postres/Salados/canapes.jpg",
      data_nombre: "Canapes",
      data_precio: "10",
      data_descripcion: "Deliciosos canapés variados.",
   },

   {
      id: "Salados",
      img: "/img/Catálogo/Postres/Salados/empanadas.jpg",
      data_nombre: "Empanadas de jamón y queso",
      data_precio: "15",
      data_descripcion: "Deliciosas empanadas rellenas de jamón y queso.",
   },

   {
      id: "Salados",
      img: "/img/Catálogo/Postres/Salados/frutos_secos.jpg",
      data_nombre: "Barra de Frutos Secos",
      data_precio: "8",
      data_descripcion: "Deliciosa barra de frutos secos.",
   },

   {
      id: "Salados",
      img: "/img/Catálogo/Postres/Salados/tarta_queso.jpg",
      data_nombre: "Tarta De Queso",
      data_precio: "15",
      data_descripcion: "Deliciosa tarta de queso.",
   },

   {
      id: "Salados",
      img: "/img/Catálogo/Postres/Salados/cheesecake_azul.jpg",
      data_nombre: "Cheesecake Con Queso Azul",
      data_precio: "15",
      data_descripcion: "Delicioso cheesecake con queso azul.",
   },

   {
      id: "Salados",
      img: "/img/Catálogo/Postres/Salados/cheesecake-salado.jpg",
      data_nombre: "Cheesecake Salado",
      data_precio: "15",
      data_descripcion: "Delicioso cheesecake salado.",
   },

   /*
   {
      id: "",
      img: "/img/Catálogo/",
      data_nombre: "",
      data_precio: "",
      data_descripcion: "",
   },
   */

];

function renderGalery() {
   const container = document.getElementById("galery-container");

   // obtener el ID de la categoría desde el <main>
   const main = document.querySelector("main.productos");
   const categoria = main ? main.id : "";

   // limpiar galería antes de renderizar
   container.innerHTML = "";

   // filtrar los productos que coinciden con la categoría
   const filtrados = (categoria === "General") ? Postres : Postres.filter(producto => {
      if (Array.isArray(producto.id)) {
         return producto.id.includes(categoria);
      }
      return producto.id === categoria;
   });

   // renderizar solo los productos filtrados
   filtrados.forEach(producto => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
         <div class="producto-img">
            <img src="${base}${producto.img}" alt="${producto.data_nombre}" class="img-producto"
               data-nombre="${producto.data_nombre}"
               data-precio="${producto.data_precio}"
               data-img="${base}${producto.img}"
               data-descripcion="${producto.data_descripcion}" />
            <p>${producto.data_nombre}</p>
            <p>S/${producto.data_precio}.00</p>
            <button class="boton agregar-carrito" data-nombre="${producto.data_nombre}" data-precio="${producto.data_precio}" data-img="${base}${producto.img}">Agregar al carrito</button>
         </div>
      `;
      container.appendChild(div);
   });

   document.querySelectorAll(".img-producto").forEach(img => {
      img.addEventListener("click", function () {
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

   document.querySelectorAll(".agregar-carrito").forEach(boton => {
      boton.addEventListener("click", function () {
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
}

// Cerrar el modal
function cerrarModalProducto() {
   document.getElementById("modal-producto").style.display = "none";
}

// --- Botón "Agregar al carrito" dentro del modal ---
document.getElementById("modal-btn-carrito").addEventListener("click", function () {
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


document.addEventListener("DOMContentLoaded", () => {
   renderGalery();
});