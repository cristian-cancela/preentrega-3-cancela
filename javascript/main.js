



let contenedorDeProductos = document.getElementById('contenido-de-productos');

for (const producto of productos) {

  let div = document.createElement('div');

  div.className = 'col';

  div.innerHTML = `
             
          <div class="card" style="width: 18rem;">

              <img src="${producto.img}" class="card-img-top" alt="${producto.marca} ${producto.nombre}">
              
              <div class="card-body">

                  <h5 class="card-title">${producto.marca}</h5>
                 
                  <p>"${producto.nombre}"</p>

                  <p class="card-text">${producto.descripcion}</p>

                  <p>Precio: $${producto.precio}</p>
                  
                  <button id = "${producto.id}" class="btn btn-primary">¡LO QUIERO!</button>
             </div>
          </div>
         

      `;
  contenedorDeProductos.querySelector('.row').appendChild(div);
}

// ------introduzco la funcion obtener carrito del local storage------

const carrito = obtenerCarritoLocalStorage();

let botones = document.getElementsByClassName('btn');

for (const boton of botones) {

  boton.onclick = (e) => {

    const idProductoSeleccionado = parseInt(e.target.id);

    let productoSeleccionado = productos.find((producto) => producto.id === idProductoSeleccionado);

    const productoEnCarrito = carrito.find((producto) => producto.id === idProductoSeleccionado);

    productoEnCarrito ? productoEnCarrito.cantidad++ : carrito.push({ ...productoSeleccionado, cantidad: 1 });

    // ---- para pasar el texto a minúscula-----

    const marca = productoSeleccionado.marca.toLowerCase();
    const nombre = productoSeleccionado.nombre.toLowerCase();
    
    swal("¡Gran compra!", `La ${marca} ${nombre} te espera en tu carrito`, "success");

    // Guardar el carrito en el LocalStorage después de cada modificación

    guardarEnLocalStorage();
  };
}

let botonCarrito = document.getElementById('boton-carrito');

botonCarrito.onclick = () => {

  if (carrito.length === 0) { 

    swal("Carrito Vacío", "El carrito está vacío.", "info");

  } else {

    let carritoContenido = "Contenido del carrito:\n\n";

    for (const producto of carrito) {

      carritoContenido += `${producto.marca} ${producto.nombre} - Cantidad: ${producto.cantidad}\n`;
    }
    swal("Contenido del Carrito", carritoContenido, "info");
  }
};

function obtenerCarritoLocalStorage() {

  const carritoGuardado = localStorage.getItem('carrito');

  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function guardarEnLocalStorage() {
  
  localStorage.setItem('carrito', JSON.stringify(carrito));
}