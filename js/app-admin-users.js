var db = firebase.firestore();

function limpiarCampos() {
  document.getElementById("nombre").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("direccion").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("contrasena").value = "";
}

function validarEmail(email) {
  let validaEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (validaEmail.test(email)) {
    return true;
  }
}

function validarDatos(nombre, telefono, direccion, correo, contrasena) {
  if (nombre != "" && telefono != "" && direccion != "" && correo != "" && contrasena != "") {
    if (validarEmail(correo)) {
      return true;
    } else {
      alert("El correo electrónico no es valido");
    }
  } else {
    alert("Todos los campos deben ser ingresados");
  }
}
function agregarUsuario() {
  let nombre = document.getElementById("nombre").value;
  let telefono = document.getElementById("telefono").value;
  let direccion = document.getElementById("direccion").value;
  let correo = document.getElementById("correo").value;
  let contrasena = document.getElementById("contrasena").value;

  if (validarDatos(nombre, telefono, direccion, correo, contrasena)) {
    db.collection("users")
      .add({
        Nombre: nombre,
        Teléfono: telefono,
        Dirección: direccion,
        Correo: correo,
        Contrasena: contrasena,
      })
      .then((docRef) => {
        alert("El usuario fué creado exitosamente");
        limpiarCampos();
      })
      .catch((error) => {
        alert("No se puedo crear el usuario");
      });

    document.getElementById("nombre").value = "";
  }
}

async function leerUsuario() {
  //document.getElementById("leerprod").innerHTML = '';

  db.collection("users").onSnapshot((querySnapshot) => {
    let users = false;

    if (!users) {
      document.getElementById("usuarios-vacio").style.display = "block";
      document.getElementById("tabla-usuarios").style.display = "none";
    }
    document.getElementById("leerUsuarios").innerHTML = "";
    querySnapshot.forEach((doc) => {
      if (doc.data()) {
        document.getElementById("usuarios-vacio").style.display = "none";
        document.getElementById("tabla-usuarios").style.display = "table";
        document.getElementById("leerUsuarios").innerHTML += `
		      <tr>
		       	 	<td>${doc.data().Nombre}</td>
						  <td>${doc.data().Teléfono}</td>
              <td>${doc.data().Dirección}</td>
              <td>${doc.data().Correo}</td>
						  <td><button onclick="cargarDatosUsuario('${doc.id}')">Editar</button></td>
						  <td><button onclick="eliminarUsuario('${doc.id}')">Borrar</button></td>
					</tr>`;
      }
    });
  });
}

leerUsuario();

function eliminarUsuario(id) {
  if (confirm("Esta seguro de eliminar el registro")) {
    db.collection("users")
      .doc(id)
      .delete()
      .then(function () {
        alert("El usuario fúe borrado exitosamente");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  } else {
    console.log("Ocurrió un error al eliminar el usuario");
  }
}

async function cargarDatosUsuario(id) {
  let identificador = id;
  $botonCrearUsuario = document.getElementById("guardar");
  $botonCrearUsuario.removeAttribute("onclick");
  $botonCrearUsuario.textContent = "Editar";

  const userRef = db.collection("users");

  let query = await userRef.doc(id).get();

  document.getElementById("nombre").value = `${query.data().Nombre}`;
  document.getElementById("telefono").value = `${query.data().Teléfono}`;
  document.getElementById("direccion").value = `${query.data().Dirección}`;
  document.getElementById("correo").value = `${query.data().Correo}`;
  document.getElementById("contrasena").style.display = "none";
  document.getElementById("fila-botones").classList.remove("justify-content-center");

  $botonCrearUsuario.addEventListener(
    "click",
    function () {
      editarUsuario(identificador);
    },
    false
  );
}

function editarUsuario(id) {
  let nombre = document.getElementById("nombre").value;
  let telefono = document.getElementById("telefono").value;
  let direccion = document.getElementById("direccion").value;
  let correo = document.getElementById("correo").value;

  db.collection("users")
    .doc(id)
    .update({
      Nombre: nombre,
      Telefóno: telefono,
      Dirección: direccion,
      Correo: correo,
    })
    .then(() => {
      alert("Usuario actualizado correctamente");
      location.reload();
    })
    .catch(() => {
      alert("Se presentó un error");
    });
}
