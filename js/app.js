let db = firebase.firestore();

async function login() {
  let correo = document.getElementById("email").value;
  let contrasena = document.getElementById("contrasena").value;
  let userEmail = "";
  let userContrasena = "";
  let rol = "";

  if (correo != "" && contrasena != "") {
    if (validarEmail(correo)) {
      const usersRef = db.collection("users");

      let query = await usersRef.where("Correo", "==", correo).get();

      query.forEach((item) => {
        userEmail = item.data().Correo;
        userContrasena = item.data().Contraseña;
        rol = item.data().Rol;

        console.log(userEmail);
        console.log(userContrasena);
        console.log(rol);
      });

      if (userEmail === correo && userContrasena === contrasena && rol === "comprador") {
        location.href = "usuario.html";
        localStorage.setItem("rol", `${rol}`);
      } else if (userEmail === correo && userContrasena === contrasena && rol === "administrador") {
        location.href = "administracion.html";
        localStorage.setItem("rol", `${rol}`);
      } else {
        loginNoExitoso();
      }
    } else {
      alert("El email ingresado no es valido");
    }
  } else {
    alert("todos los datos son obligatorios");
  }
}

function crearUsuario() {
  let nombre = document.getElementById("nombre").value;
  let telefono = document.getElementById("telefono").value;
  let direccion = document.getElementById("direccion").value;
  let correo = document.getElementById("correo").value;
  let contrasena = document.getElementById("contrasena").value;

  if (validarDatos(nombre, telefono, direccion, correo, contrasena)) {
    if (validarEmail(correo)) {
      adicionarUsuario(nombre, telefono, direccion, correo, contrasena);
    } else {
      alert("El email ingresado no es válido");
    }
  }
}

function validarEmail(email) {
  let validaEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (validaEmail.test(email)) {
    return true;
  }
}

function validarDatos(nombre, telefono, direccion, correo, contrasena) {
  if (nombre != "" && telefono != "" && direccion != "" && correo != "" && contrasena != "") {
    return true;
  } else {
    alert("Todos los campos son obligatorios.");
  }
}

async function adicionarUsuario(nombre, telefono, direccion, correo, contrasena) {
  let bandera = false;
  let rol = "comprador";

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
        Rol: rol,
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
    text: "Tú registro en nuestra plataforma fué exitoso, ya puedes iniciar sesión!",
  }).then(function () {
    location.href = "login.html";
  });
}

function registroNoExitoso() {
  Swal.fire({
    icon: "error",
    title: "Error en el registro",
    text: "La dirección de correo ingresada ya existe en nuestra base de datos",
  }).then(function () {
    document.getElementById("correo").value = "";
  });
}

function loginNoExitoso() {
  Swal.fire({
    icon: "error",
    title: "Error al inicial sesión",
    text: "La dirección de correo ingresada o la contraseña no son correctas",
  }).then(function () {
    document.getElementById("email").value = "";
    document.getElementById("contrasena").value = "";
  });
}
