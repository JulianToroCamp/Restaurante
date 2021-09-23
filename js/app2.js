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
	
	let bebidas = document.getElementById('bebidas').value;	
	let nombre = document.getElementById('nombre').value;
	let domicilio = document.getElementById('domicilio').value;
	let v_compra = document.getElementById('v_compra').value;
	let v_bebidas = document.getElementById('v_bebidas').value;
	let v_domicilio = document.getElementById('v_domicilio').value;
	let v_venta = parseInt (v_compra)+parseInt(v_bebidas)+parseInt (v_domicilio);
	
	
	db.collection("producto").add({
    Nombre: nombre,
	Bebidas: bebidas,
    V_domicilio: v_domicilio,
	V_bebidas: v_bebidas,
    Domicilio: domicilio,
    V_compra: v_compra,
    V_venta: v_venta,
    
	})
	.then((docRef) => {
	    console.log("El documento fue guardado con el id: ", docRef.id);
	})
	.catch((error) => {
	    console.error("Error no guardo: ", error);
	});
	
	document.getElementById('bebidas').value = "";	
	document.getElementById('nombre').value = "";
	document.getElementById('domicilio').value = "";
	document.getElementById('v_compra').value = "";
	document.getElementById('v_venta').value = "";
	document.getElementById('v_bebidas').value = "";
	document.getElementById('v_domicilio').value = "";	
	
}


function leerproducto() {
	
	//document.getElementById("leerprod").innerHTML = '';
	
	db.collection("producto").onSnapshot((querySnapshot) => {
	
	document.getElementById('leerprod').innerHTML = '';		
		
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        document.getElementById('leerprod').innerHTML += `
		       	 <tr>
		       	 	<td>${doc.data().Nombre}</td>
						<td>${doc.data().Domicilio}</td>
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










