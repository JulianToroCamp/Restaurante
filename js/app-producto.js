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
    case 6:
      document.getElementById("insertar1").style.display = "block";
      break;
    case 7:
      document.getElementById("insertar1").style.display = "none";
      break;
    case 8:
			document.getElementById('insertar1').style.display = "block";
			document.getElementById('guardar1').style.display = "none";
			document.getElementById('editar1').style.display = "block";
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
      location.href = "producto.html";
    })
    .catch((error) => {
      console.error("Error no guardo: ", error);
    });

  document.getElementById("nombre").value = "";
  document.getElementById("valorCompra").value = "";
}

  function leerproducto() {
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
        location.href = "producto.html";
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  } else {
    console.log("no se borro");
  }
}

//editar producto

  function recibirdatos(id, nombre, valorCompra) {
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
    location.href = "producto.html";
  });
}


function insertar_bebida() {
  let nombreBebida = document.getElementById("nombreBebida").value;
  let precio = document.getElementById("precio").value;

  db.collection("bebidas")
    .add({
    Nombre: nombreBebida,
    Precio: precio,
    })
    .then((docRef) => {
      alert("El producto fué insertado exitosamente");
      location.href = "producto.html";
    })
    .catch((error) => {
      console.error("Error no guardo: ", error);
    });

  document.getElementById("nombreBebida").value = "";
  document.getElementById("precio").value = "";
}

  function leerproducto1() {
  //document.getElementById("leerprod").innerHTML = '';

  db.collection("bebidas").onSnapshot((querySnapshot) => {
    let bebidas = false;

    if (!bebidas) {
      document.getElementById("productos-vacio1").style.display = "block";
      document.getElementById("tabla-productos1").style.display = "none";
    }
    document.getElementById("leerprod1").innerHTML = "";
    querySnapshot.forEach((doc) => {
      if (doc.data()) {
        document.getElementById("productos-vacio1").style.display = "none";
        document.getElementById("tabla-productos1").style.display = "table";
        document.getElementById("leerprod1").innerHTML += `
		      <tr>
		       	 	<td>${doc.data().Nombre}</td>
						  <td>$ ${doc.data().Precio} Cop</td>
						  <td><button onclick="recibirdatos1('${doc.id}','${doc.data().Nombre}','${doc.data().Precio}')">Editar</button></td>
						  <td><button onclick="eliminarbebida('${doc.id}')">Borrar</button></td>
					</tr>`;
      }
    });
  });
}

leerproducto1();

function eliminarbebida(id) {
  //pregunto si voy a borrar
  if (confirm("Esta seguro de eliminar el registro")) {
    db.collection("bebidas")
      .doc(id)
      .delete()
      .then(function () {
        alert("la bebida fúe borrada exitosamente");
        location.href = "producto.html";
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  } else {
    console.log("no se borro");
  }
}

//editar bebida

  function recibirdatos1(id, nombreBebida, precio) {
	document.getElementById('llave1').value = id;
	document.getElementById('nombreBebida').value = nombreBebida;
	document.getElementById('precio').value = precio;
	
	mostrar_formulario(8);	
}

function editarbebida() {
	
	var id = document.getElementById('llave1').value;
	var nombreBebida = document.getElementById('nombreBebida').value;
	var precio = document.getElementById('precio').value;

	
	//edita la información
	var productoRef = db.collection("bebidas").doc(id);

	// Set the "capital" field of the city 'DC'
	return productoRef.update({
    Nombre: nombreBebida,
    Precio: precio,
	})
	.then(() => {
	    console.log("El registro se guardo");
	    registroExitoso1();	
		 document.getElementById('nombreBebida').value = "";
		 document.getElementById('precio').value = "";
		 
	
	    mostrar_formulario(6);
	})
	.catch((error) => {
	    // The document probably doesn't exist.
	    console.error("Error editando el documento: ", error);
	    alert("Error editando el documento: ", error)
	});
	
	
}



function registroExitoso1() {
  Swal.fire({
    icon: "success",
    title: "Bebida editada!",
    text: "Tú registro se ha actualizado en la base de datos!",
  }).then(function () {
    location.href = "producto.html";
  });
}


