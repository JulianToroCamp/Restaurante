var db = firebase.firestore();

function comprobarSesion() {
  let rol = localStorage.getItem("rol");
  console.log(rol);
  if (rol != "comprado") {
    location.href = "login.html";
  }
}

function cerrarSesion() {
  localStorage.clear();
}

comprobarSesion();

function mostrar_formulario(dato) {
  switch (dato) {
    case 1:
      document.getElementById("insertar").style.display = "block";
      break;
    case 2:
      document.getElementById("insertar").style.display = "none";
      break;
  }
}

async function insertar_producto(precio) {
  let bebidas = document.getElementById("bebidas").value;
  let nombre = document.getElementById("producto").value;
  let domicilio = document.getElementById("domicilios").value;
  let valorCompra = await consultarPrecioPizza(nombre);
  let precioBebida = await consultarPrecioBebidas(bebidas);
  let preciodomicilio = await consultarPrecioDomicilio(domicilio);
  let valorTotal = parseInt(valorCompra) + parseInt(precioBebida) + parseInt(preciodomicilio);

  Swal.fire({
    title: "¿Confirmar pedido?",
    html: `${nombre} $${valorCompra} <br>
	${bebidas} $${precioBebida} <br>
	${domicilio} $${preciodomicilio}<br>
	Valor total: $${valorTotal}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      db.collection("ventas")
        .add({
          Nombre: nombre,
          Bebidas: bebidas,
          PrecioDomicilio: preciodomicilio,
          PrecioBebida: precioBebida,
          Domicilio: domicilio,
          ValorCompra: valorCompra,
          ValorTotal: valorTotal,
        })
        .then((docRef) => {
          Finalizar();
        })
        .catch((error) => {
          console.error("Error no guardo: ", error);
        });
    }
  });
}

function Finalizar() {
  Swal.fire({
    icon: "success",
    title: "tu pedido ha sido realizado!",
    text: "Por favor estar pendiente de su numero de contacto",
  }).then(function () {
    location.href = "index.html";
  });
}
async function cargarProducto() {
  const query = await db.collection("productos").get();

  query.forEach((item) => {
    document.getElementById("producto").innerHTML += `
	  <option value="${item.data().Nombre}">${item.data().Nombre}</option>`;
  });
}

cargarProducto();

async function consultarPrecioPizza(nombre) {
  const menuventaref = db.collection("productos");

  let query = await menuventaref.where("Nombre", "==", nombre).get();

  let precio = 0;

  query.forEach((item) => {
    precio = item.data().ValorCompra;
  });

  return precio;
}

async function cargarBebidas() {
  const query = await db.collection("bebidas").get();

  query.forEach((item) => {
    document.getElementById("bebidas").innerHTML += `
		<option value="${item.data().Nombre}">${item.data().Nombre}</option>`;
  });
}

cargarBebidas();

async function consultarPrecioBebidas(nombre) {
  const menuventaref = db.collection("bebidas");

  let query = await menuventaref.where("Nombre", "==", nombre).get();

  let precio = 0;

  query.forEach((item) => {
    precio = item.data().Precio;
  });

  return precio;
}

async function cargarDomicilios() {
  const query = await db.collection("domicilios").get();

  query.forEach((item) => {
    document.getElementById("domicilios").innerHTML += `
		  <option value="${item.data().Typo}">${item.data().Typo}</option>`;
  });
}

cargarDomicilios();

async function consultarPrecioDomicilio(domicilio) {
  const menuventaref = db.collection("domicilios");

  let query = await menuventaref.where("Typo", "==", domicilio).get();

  let precio = 0;

  query.forEach((item) => {
    precio = item.data().Valor;
  });

  return precio;
}
