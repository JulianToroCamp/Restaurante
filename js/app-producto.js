var db = firebase.firestore();

function mostrar_formulario(dato) {
  switch (dato) {
    case 1:
      document.getElementById("insertar").style.display = "block";
      break;
    case 2:
      document.getElementById("insertar").style.display = "none";
      break;
    case 3:
			document.getElementById('insertar').style.display = "block";
			document.getElementById('guardar').style.display = "none";
			document.getElementById('editar').style.display = "block";
			break;
		case 4:
			document.getElementById('formproducto').style.display = "none";
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
						  <td><button onclick="recibirdatos('${doc.id}','${doc.data().Nombre}','${doc.data().ValorCompra}')">Editar</button></td>
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

//editar producto

async function recibirdatos(id, nombre, valorCompra) {
	document.getElementById('llave').value = id;
	document.getElementById('nombre').value = nombre;
	document.getElementById('valorCompra').value = valorCompra;
	
	mostrar_formulario(3);	
}

function editarproducto() {
	
	var id = document.getElementById('llave').value;
	var nombre = document.getElementById('nombre').value;
	var valorCompra = document.getElementById('valorCompra').value;

	
	//edita la información
	var productoRef = db.collection("productos").doc(id);

	// Set the "capital" field of the city 'DC'
	return productoRef.update({
    Nombre: nombre,
    ValorCompra: valorCompra,
	})
	.then(() => {
	    console.log("El registro se guardo");
	    registroExitoso ();	
		 document.getElementById('nombre').value = "";
		 document.getElementById('valorCompra').value = "";
		 
	
	    mostrar_formulario(2);
	})
	.catch((error) => {
	    // The document probably doesn't exist.
	    console.error("Error editando el documento: ", error);
	    alert("Error editando el documento: ", error)
	});
	
	
}



function registroExitoso() {
  Swal.fire({
    icon: "success",
    title: "Producto editado!",
    text: "Tú registro se ha actualizado en la base de datos!",
  }).then(function () {
    
  });
}



