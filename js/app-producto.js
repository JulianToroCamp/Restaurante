var db = firebase.firestore();

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

function insertar_producto() {
  let nombre = document.getElementById("nombre").value;
  let valorCompra = document.getElementById("valorCompra").value;

  db.collection("productos")
    .add({
      Nombre: nombre,
      ValorCompra: valorCompra,
    })
    .then((docRef) => {
      alert("El producto fué insertado exitosamente");
    })
    .catch((error) => {
      console.error("Error no guardo: ", error);
    });

  document.getElementById("nombre").value = "";
  document.getElementById("valorCompra").value = "";
}

async function leerproducto() {
  //document.getElementById("leerprod").innerHTML = '';

  db.collection("productos").onSnapshot((querySnapshot) => {
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
						  <td>$ ${doc.data().ValorCompra} Cop</td>
						  <td><button onclick="">Editar</button></td>
						  <td><button onclick="eliminarproducto('${doc.id}')">Borrar</button></td>
					</tr>`;
      }
    });
  });
}

leerproducto();

function eliminarproducto(id) {
  //pregunto si voy a borrar
  if (confirm("Esta seguro de eliminar el registro")) {
    db.collection("productos")
      .doc(id)
      .delete()
      .then(function () {
        alert("El producto fúe borrado exitosamente");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  } else {
    console.log("no se borro");
  }
}
