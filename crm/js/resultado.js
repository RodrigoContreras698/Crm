var g_idresultadoeliminar = "";
var g_idresultado_actualizar = "";
function agregar_resultado() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var nombre_resultado = document.getElementById("txt_nombre_resultado").value;

    var raw = JSON.stringify({
        "nombre_resultado": nombre_resultado
    })

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/resultado", requestOptions)
        .then(response => {
            if (response.status == 200) {
                alert("Resultado agregado")
                location.href = "listaresultado.html";
            } else {
                alert("Error al agregar");
            }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


function obtener_datos_resultado() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/resultado?_size=100", requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarFila)
        )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
function completarFila(element, index, arr) {
    arr[index] = document.querySelector('#tbl_resultado tbody').innerHTML +=
        `<tr>
        <td>${element.id_resultado}</td>
        <td>${element.nombre_resultado}</td>
        <td>${element.fecha_registro}</td>
        <td><a href='eliminar_resultado.html?id=${element.id_resultado}'><img src='../img/borrar24x24.png' with='24' height='24'></img></a><a href='actualizar_resultado.html?id=${element.id_resultado}'><img src='../img/actualizar24x24.png' with='24' height='24' ></img></a></td>
        

    </tr>`
};
function obtenerIdEliminacion() {


    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const p_id_resultado = urlParams.get('id');
    g_idresultadoeliminar = p_id_resultado;

    consultar_datos_resultado(p_id_resultado);

}
function consultar_datos_resultado(p_id_resultado) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/resultado/" + p_id_resultado, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(CompletarDatosResultado)
        )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}
function CompletarDatosResultado(element, index, arr) {
    arr[index] = document.querySelector('#cnt_resultado').innerHTML +=
        `<h2>¿Desea Eliminar este resultado?</h2>
        <div class="alert alert-danger" role = "alert">${element.id_resultado}${element.nombre_resultado}</div>`
}
function eliminarresultado() {
    var raw = "";

    var requestOptions = {
        method: 'DELETE',
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/resultado/" + g_idresultadoeliminar, requestOptions)
        .then(response => {
            if (response.status == 200) {
                alert("Resultado elminado")
                location.href = "listaresultado.html";
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

    const p_id_resultado = urlParams.get('id');
    g_idresultado_actualizar = p_id_resultado;

    consultar_datos_resultado(p_id_resultado);
}
function consultar_datos_resultado(p_id_resultado) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/resultado/"+p_id_resultado, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(CompletarFolmulario)
        )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}
function CompletarFolmulario(element, index, arr){
    var id_resultado = element.id_resultado;
    var nombre_resultado= element.nombre_resultado;
    document.getElementById("txt_id_resultado").value = id_resultado;
    document.getElementById("txt_nombre_resultado").value = nombre_resultado;
    
}
function actualizar_resultado() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
     var id_resultado = document.getElementById("txt_id_resultado").value;
     var nombre_resultado = document.getElementById("txt_nombre_resultado").value;

    var raw = JSON.stringify({
        "nombre_resultado": nombre_resultado
    });

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/resultado/" + id_resultado, requestOptions)
        .then(response => {
            if (response.status == 200) {
                alert("Resultado actualizar")
                location.href = "listaresultado.html";
            } else {
                alert("Error al actualizar");
            }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
