var g_idcliente_eliminar = "";
var g_idcliente_actualizar = "";

function agregar_cliente() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var id_cliente = document.getElementById("txt_rut").value;
    var dv = document.getElementById("txt_dv").value;
    var nombres = document.getElementById("txt_nombres").value;
    var apellidos = document.getElementById("txt_apellidos").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;

    var raw = JSON.stringify({
        "id_cliente": id_cliente,
        "dv": dv,
        "nombres": nombres,
        "apellidos": apellidos,
        "email": email,
        "celular": celular
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/cliente", requestOptions)
        .then(response => {
            if (response.status == 200) {
                alert("Registro agregado");
                location.href = "listacliente.html";
            } else {
                alert("Error al agregar o cliente existente");
            }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


function obtener_datos_clientes() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/cliente?_size=100", requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarFila)
        )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
function completarFila(element, index, arr) {
    arr[index] = document.querySelector('#tbl_clientes tbody').innerHTML +=
        `<tr>
        <td>${element.id_cliente}-${element.dv}</td>
        <td>${element.nombres}</td>
        <td>${element.apellidos}</td>
        <td>${element.email}</td>
        <td>${element.celular}</td>
        <td>${element.fecha_registro}</td>
        <td><a href='eliminarcliente.html?id=${element.id_cliente}'><img src='../img/borrar24x24.png' with='24' height='24'></img></a><a href='actualizarcliente.html?id=${element.id_cliente}'><img src='../img/actualizar24x24.png' with='24' height='24' ></img></a></td>
        

    </tr>`
};
function obtenerIdEliminacion() {

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const p_id_cliente = urlParams.get('id');
    g_idcliente_eliminar = p_id_cliente;

    consultar_datos_cliente(p_id_cliente);

}
function consultar_datos_cliente(p_id_cliente) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/cliente/" + p_id_cliente, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(CompletarDatosCLiente)
        )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}
function CompletarDatosCLiente(element, index, arr) {
    arr[index] = document.querySelector('#cnt_datosclientes').innerHTML +=
        `<h2>¿Desea Eliminar a este cliente?</h2>
        <div class="alert alert-danger" role = "alert"> ${element.nombres} ${element.apellidos}</div>`
}
function eliminarcliente() {
    var raw = "";

    var requestOptions = {
        method: 'DELETE',
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/cliente/" + g_idcliente_eliminar, requestOptions)
        .then(response => {
            if (response.status == 200) {
                alert("Cliente eliminado");
                location.href = "listacliente.html";
            } else {
                alert("Error al eliminar");
            }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
function obtenerIdactualizacion() {

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const p_id_cliente = urlParams.get('id');
    g_idcliente_actualizar = p_id_cliente;

    consultar_datos_cliente_actualizar(p_id_cliente);
}
function consultar_datos_cliente_actualizar(p_id_cliente) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/cliente/" + p_id_cliente, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(CompletarFolmulario)
        )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}
function CompletarFolmulario(element, index, arr) {
    var id_cliente = element.id_cliente;
    var dv = element.dv;
    var nombres = element.nombres;
    var apellidos = element.apellidos;
    var email = element.email;
    var celular = element.celular;
    var fecha_registro = element.fecha_registro;
    document.getElementById("txt_rut").value = id_cliente;
    document.getElementById("txt_dv").value = dv;
    document.getElementById("txt_nombres").value = nombres;
    document.getElementById("txt_apellidos").value = apellidos;
    document.getElementById("txt_email").value = email;
    document.getElementById("txt_celular").value = celular;
    document.getElementById("txt_fecha_registro").value = fecha_registro;
}
function actualizar_cliente() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var id_cliente = document.getElementById("txt_rut").value;
    var nombres = document.getElementById("txt_nombres").value;
    var apellidos = document.getElementById("txt_apellidos").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;

    var raw = JSON.stringify({
        "nombres": nombres,
        "apellidos": apellidos,
        "email": email,
        "celular": celular
    });

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/cliente/" + id_cliente, requestOptions)
        .then(response => {
            if (response.status == 200) {
                alert("Cliente actualizado");
                location.href = "listacliente.html";
            } else {
                alert("Error al actualizar");
            }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
