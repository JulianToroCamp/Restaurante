let db = firebase.firestore();

function crearProveedor() {
  let empresa = document.getElementById("nit-empresa").value;
  let nombre = document.getElementById("nombre-empresa").value;
  let direccion = document.getElementById("direccion").value;
  let telefono = document.getElementById("telefono").value;
  let producto = document.getElementById("producto-proveedor").value;
  if (validarDatos(empresa, nombre, direccion, telefono, producto)) {
      adicionarProveedor(empresa, nombre, direccion, telefono, producto);
    } else {
      alert("El email ingresado no es válido");
    }
  }
  



function validarDatos(empresa, nombre, direccion, telefono, producto) {
  if (empresa != "" && nombre != "" && direccion != "" && telefono != "" && producto != "") {
    return true;
  } else {
    alert("Todos los campos son obligatorios.");
  }
}

async function adicionarProveedor(empresa, nombre, direccion, telefono, producto) {
  let bandera = false;

  const query = await db.collection("Proveedores").get();

  query.forEach((el) => {
    if (el.data().Nit == empresa) {
      bandera = true;
    }
  });

  if (!bandera) {
    db.collection("Proveedores")
      .add({
        Nit: empresa,
        Nombre: nombre,
        Dirección: direccion,
        Telefono: telefono,
        Producto: producto,
      })
      .then((docRef) => {
        registroExitoso();
      })
      .catch((error) => {
        alert("Ocurrió un error en el registro");
      });
  } else {
    registroNoExitoso();
  }
}

function registroExitoso() {
  Swal.fire({
    icon: "success",
    title: "Registro exitoso!",
    text: "El registro del proveedor fué exitoso",
  }).then(function () {
    location.href = "inventario.html";
  });
}

function registroNoExitoso() {
  Swal.fire({
    icon: "error",
    title: "Error en el registro",
    text: "El nit corresponde a un proveedor ya registrado",
  }).then(function () {
    document.getElementById("nit-empresa").value = "";
  });
}
