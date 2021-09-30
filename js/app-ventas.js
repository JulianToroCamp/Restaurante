var db = firebase.firestore();

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

async function leerproducto() {
  //document.getElementById("leerprod").innerHTML = '';

  db.collection("ventas").onSnapshot((querySnapshot) => {
    let productos = false;

    if (!productos) {
      document.getElementById("productos-vacio").style.display = "block";
      document.getElementById("tabla-productos").style.display = "none";
    }
    document.getElementById("leerprod").innerHTML = "";
    querySnapshot.forEach((doc) => {
      if (doc.data()) {
        document.getElementById("productos-vacio").style.display = "none";
        document.getElementById("tabla-productos").style.display = "table";
        document.getElementById("leerprod").innerHTML += `
		      <tr>
		       	 	<td>${doc.data().Nombre}</td>
						  <td>$ ${doc.data().ValorCompra}</td>
						  <td> ${doc.data().Bebidas}</td>
                          <td>$ ${doc.data().PrecioBebida}</td>
                          <td>$ ${doc.data().PrecioDomicilio}</td>
                          <td>$ ${doc.data().ValorTotal}</td>
					</tr>`;
      }
    });
  });
}

leerproducto();
