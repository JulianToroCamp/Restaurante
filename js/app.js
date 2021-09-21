let db = firebase.firestore();

function crearUsuario() {
  let nombre = document.getElementById("nombre").value;
  let telefono = document.getElementById("telefono").value;
  let direccion = document.getElementById("direccion").value;
  let correo = document.getElementById("correo").value;
  let contrasena = document.getElementById("contrasena").value;

  if (validarEmail(correo)) {
    adicionarUsuario(nombre, telefono, direccion, correo, contrasena);
  } else {
    alert("El email ingresado no es válido");
  }
}

function validarEmail(email) {
  let validaEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (validaEmail.test(email)) {
    return true;
  }
}

async function adicionarUsuario(nombre, telefono, direccion, correo, contrasena) {
  let bandera = false;

  const query = await db.collection("users").get();

  query.forEach((el) => {
    if (el.data().Correo == correo) {
      bandera = true;
    }
  });

  if (!bandera) {
    db.collection("users")
      .add({
        Nombre: nombre,
        Teléfono: telefono,
        Dirección: direccion,
        Correo: correo,
        Contraseña: contrasena,
      })
      .then((docRef) => {
        alert("Registro exitoso");
      })
      .catch((error) => {
        alert("Ocurrió un error en el r egistro");
      });
  } else {
    alert("El usuario ya existe en el sistema");
  }
}
