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
	
	
	let nombre = document.getElementById('nombre').value
	let v_venta = document.getElementById('v_venta').value;
	
	
	
	db.collection("menu de venta").add({
    Nombre: nombre,
    V_venta: v_venta,
    
	})
	.then((docRef) => {
	    console.log("El documento fue guardado con el id: ", docRef.id);
	})
	.catch((error) => {
	    console.error("Error no guardo: ", error);
	});
	
	
	document.getElementById('nombre').value = "";
	document.getElementById('v_venta').value = "";

}


function leerproducto() {
	
	//document.getElementById("leerprod").innerHTML = '';
	
	db.collection("menu de venta").onSnapshot((querySnapshot) => {
	
	document.getElementById('leerprod').innerHTML = '';		
		
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        document.getElementById('leerprod').innerHTML += `
		       	 <tr>
		       	 	<td>${doc.data().Nombre}</td>
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
			
			db.collection("menu de venta").doc(id).delete().then(function() {
			    console.log("Document successfully deleted!");
			    alert('El producto fue borrado');
			}).catch(function(error) {
			    console.error("Error removing document: ", error);
			});

	}else {
		console.log("no se borro");
	}
}










