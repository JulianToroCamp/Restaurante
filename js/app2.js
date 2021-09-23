var db = firebase.firestore();

function mostrar_formulario(dato) {
	switch(dato) {
		case 1:
			document.getElementById('insertar').style.display = "block";
			break;
		case 2:
			document.getElementById('insertar').style.display = "none";
			break;
	}
}


function insertar_producto() {
	
	var codigo = document.getElementById('codigo').value;	
	var nombre = document.getElementById('nombre').value;
	var proveedor = document.getElementById('proveedor').value;
	var marca = document.getElementById('marca').value;
	var v_compra = document.getElementById('v_compra').value;
	var v_venta = document.getElementById('v_venta').value;
	var stock = document.getElementById('stock').value;
	
	db.collection("producto").add({
    Nombre: nombre,
    Codigo: codigo,
    Proveedor: proveedor,
    Marca: marca,
    V_compra: v_compra,
    V_venta: v_venta,
    Stock: stock
	})
	.then((docRef) => {
	    console.log("El documento fue guardado con el id: ", docRef.id);
	})
	.catch((error) => {
	    console.error("Error no guardo: ", error);
	});
	
	document.getElementById('codigo').value = "";	
	document.getElementById('nombre').value = "";
	document.getElementById('proveedor').value = "";
	document.getElementById('marca').value = "";
	document.getElementById('v_compra').value = "";
	document.getElementById('v_venta').value = "";
	document.getElementById('stock').value = "";	
	
}


function leerproducto() {
	
	//document.getElementById("leerprod").innerHTML = '';
	
	db.collection("producto").onSnapshot((querySnapshot) => {
	
	document.getElementById('leerprod').innerHTML = '';		
		
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        document.getElementById('leerprod').innerHTML += `
		       	 <tr>
		       	 	<td>${doc.data().Codigo}</td>
						<td>${doc.data().Nombre}</td>
						<td>${doc.data().Marca}</td>
						<td>$ ${doc.data().V_compra}.oo</td>
						<td>$ ${doc.data().V_venta}.oo</td>
						<td><button onclick="">Ver</button></td>
						<td><button onclick="">Editar</button></td>
						<td><button onclick="eliminarproducto('${doc.id}')">Borrar</button></td>
					</tr> 
		        `;  
        
    });
});

}

leerproducto();

function eliminarproducto(id) {
	//pregunto si voy a borrar
	if(confirm("Esta seguro de eliminar el registro")){
			
			db.collection("producto").doc(id).delete().then(function() {
			    console.log("Document successfully deleted!");
			    alert('El producto fue borrado');
			}).catch(function(error) {
			    console.error("Error removing document: ", error);
			});

	}else {
		console.log("no se borro");
	}
}










