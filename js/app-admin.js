function comprobarSesion() {
  let rol = localStorage.getItem("rol");
  console.log(rol);
  if (rol != "administrador") {
    location.href = "login.html";
  }
}

function cerrarSesion() {
  localStorage.clear();
}

comprobarSesion();
