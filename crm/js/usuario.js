var g_idusuario_eliminar = "";
var g_idusuario_actualizar = "";
function agregar_usuario() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var id_usuario = document.getElementById("txt_usuario").value;
    var dv = document.getElementById("txt_dv").value;
    var nombres = document.getElementById("txt_nombres").value;
    var apellidos = document.getElementById("txt_apellidos").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;
    var username = document.getElementById("txt_username").value;
    var password = document.getElementById("txt_password").value;

    var raw = JSON.stringify({
        "id_usuario": id_usuario,
        "dv": dv,
        "nombres": nombres,
        "apellidos": apellidos,
        "email": email,
        "celular": celular,
        "username": username,
        "password": password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/usuario", requestOptions)
        .then(response => {
            if (response.status == 200) {
                alert("Usuario agregado");
                location.href = "listausuario.html";
            } else {
                alert("Error al agregar o usuario ya existente");
            }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}


function obtener_datos_usuario() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/usuario", requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(completarFila)
        )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
function completarFila(element, index, arr) {
    arr[index] = document.querySelector('#tbl_usuario tbody').innerHTML +=
        `<tr>
        <td>${element.id_usuario}-${element.dv}</td>
        <td>${element.nombres}</td>
        <td>${element.apellidos}</td>
        <td>${element.email}</td>
        <td>${element.celular}</td>
        <td>${element.username}</td>
        <td>${element.password}</td>
        <td>${element.fecha_registro}</td>
        <td><a href='eliminarusuario.html?id=${element.id_usuario}'><img src='../img/borrar24x24.png' with='24' height='24'></img></a><a href='actualizarusuario.html?id=${element.id_usuario}'><img src='../img/actualizar24x24.png' with='24' height='24' ></img></a></td>
        

    </tr>`
};
function obtenerIdEliminacion() {

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const p_id_usuario = urlParams.get('id');
    g_idusuario_eliminar = p_id_usuario;

    consultar_datos_cliente(p_id_usuario);

}
function consultar_datos_cliente(p_id_usuario) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/usuario/" + p_id_usuario, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(CompletarDatosUsuario)
        )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}
function CompletarDatosUsuario(element, index, arr) {
    arr[index] = document.querySelector('#cnt_datosusuario').innerHTML +=
        `<h2>¿Desea Eliminar a este usuario?</h2>
        <div class="alert alert-danger" role = "alert">${element.id_usuario} ${element.username}</div>`
}
function eliminarusuario() {
    var raw = "";

    var requestOptions = {
        method: 'DELETE',
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/usuario/" + g_idusuario_eliminar, requestOptions)
        .then(response => {
            if (response.status == 200) {
                alert("Usuario eliminado");
                location.href = "listausuario.html";
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

    const p_id_usuario = urlParams.get('id');
    g_idusuario_actualizar = p_id_usuario;

    consultar_datos_usuario_actualizar(p_id_usuario);
}
function consultar_datos_usuario_actualizar(p_id_usuario) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/usuario/" + p_id_usuario, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(CompletarFolmulario)
        )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}
function CompletarFolmulario(element, index, arr) {
    var id_usuario = id_usuario
    var dv = dv
    var nombres = nombres
    var apellidos = apellidos
    var email = email
    var celular = celular
    var username = username
    var password = password

    document.getElementById("txt_usuario").value = element.id_usuario;
    document.getElementById("txt_nombres").value = element.nombres;
    document.getElementById("txt_apellidos").value = element.apellidos;
    document.getElementById("txt_email").value = element.email;
    document.getElementById("txt_celular").value = element.celular;
    document.getElementById("txt_username").value= element.username
    document.getElementById("txt_password").value= element.password
}
function actualizar_usuario() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var  id_usuario = document.getElementById("txt_usuario").value;
    var nombres = document.getElementById("txt_nombres").value;
    var apellidos = document.getElementById("txt_apellidos").value;
    var email = document.getElementById("txt_email").value;
    var celular = document.getElementById("txt_celular").value;
    var username = document.getElementById("txt_username").value;
    var password =document.getElementById("txt_password").value;


    var raw = JSON.stringify({
        "nombres": nombres,
        "apellidos": apellidos,
        "email": email,
        "celular": celular,
        "username": username,
        "password": password
    });

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://frontend171.com:3000/api/usuario/" + id_usuario, requestOptions)
        .then(response => {
            if (response.status == 200) {
                alert("Usuario actualizado");
                location.href = "listausuario.html";
            } else {
                alert("Error al actualizar");
            }
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}
