var g_idtipo_gestion_eliminar = "";
var g_idtipo_gestion_actualizar = "";
var g_puerto = 3000;
function agregar_tipo_gestion() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;

    var raw = JSON.stringify({
        "nombre_tipo_gestion": nombre_tipo_gestion
    })

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/tipo_gestion", requestOptions)
        .then(response => {
            if (response.status == 200) {
                alert("Tipo gestion agregado")
                location.href = "listatipo_gestion.html";
            } else {
                alert("Error al agregar");
            }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


function obtener_datos_tipo_gestion() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/tipo_gestion?_size=100", requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarFila)
        )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
function completarFila(element, index, arr) {
    arr[index] = document.querySelector('#tbl_tipo_gestion tbody').innerHTML +=
        `<tr>
        <td>${element.id_tipo_gestion}</td>
        <td>${element.nombre_tipo_gestion}</td>
        <td>${element.fecha_registro}</td>
        <td><a href='eliminartipo_gestion.html?id=${element.id_tipo_gestion}'><img src='../img/borrar24x24.png' with='24' height='24'></img></a><a href='actualizartipo_gestion.html?id=${element.id_tipo_gestion}'><img src='../img/actualizar24x24.png' with='24' height='24' ></img></a></td>
        

    </tr>`
};
function obtenerIdEliminacion() {


    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const p_id_tipo_gestion = urlParams.get('id');
    g_idtipo_gestion_eliminar = p_id_tipo_gestion;

    consultar_datos_tipo_gestion(p_id_tipo_gestion);

}
function consultar_datos_tipo_gestion(p_id_tipo_gestion) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/tipo_gestion/" + p_id_tipo_gestion, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(CompletarDatostipogestion)
        )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}
function CompletarDatostipogestion(element, index, arr) {
    arr[index] = document.querySelector('#cnt_datostipo_gestion').innerHTML +=
        `<h2>¿Desea Eliminar esta tipo de gestion?</h2>
        <div class="alert alert-danger" role = "alert"> ${element.id_tipo_gestion} ${element.nombre_tipo_gestion}</div>`
}
function eliminartipo_gestion() {
    var raw = "";

    var requestOptions = {
        method: 'DELETE',
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/tipo_gestion/" + g_idtipo_gestion_eliminar, requestOptions)
        .then(response => {
            if (response.status == 200) {
                alert("Tipo gestion elminada")
                location.href = "listatipo_gestion.html";
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

    const p_id_tipo_gestion = urlParams.get('id');
    g_idtipo_gestion_actualizar = p_id_tipo_gestion;

    consultar_datos_tipo_gestion_actualizar(p_id_tipo_gestion);
}
function consultar_datos_tipo_gestion_actualizar(p_id_tipo_gestion) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(CompletarFolmulario)
        )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}
function CompletarFolmulario(element, index, arr){
    var id_tipo_gestion = element.id_tipo_gestion;
    var nombre_tipo_gestion= element.nombre_tipo_gestion;
    document.getElementById("txt_id_tipo_gestion").value = id_tipo_gestion;
    document.getElementById("txt_nombre_tipo_gestion").value = nombre_tipo_gestion;
    
}
function actualizar_tipo_gestion() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
     var id_tipo_gestion = document.getElementById("txt_id_tipo_gestion").value;
     var nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;

    var raw = JSON.stringify({
        "nombre_tipo_gestion": nombre_tipo_gestion
    });

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/tipo_gestion/"+id_tipo_gestion, requestOptions)
        .then(response => {
            if (response.status == 200) {
                alert("Tipo gestion actualizada")
                location.href = "listatipo_gestion.html";
            } else {
                alert("Error al actualizar");
            }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}