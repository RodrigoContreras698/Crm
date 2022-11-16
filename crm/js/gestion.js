var g_id_gestion = "";

function agregarGestion() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var id_usuario = document.getElementById("id_usuario").value;
  var id_cliente = document.getElementById("id_cliente").value;
  var id_tipo_gestion = document.getElementById("id_tipo_gestion").value;
  var id_resultado = document.getElementById("id_resultado").value;
  var comentarios = document.getElementById("comentarios").value;


  var raw = JSON.stringify({
    "id_usuario": id_usuario,
    "id_cliente": id_cliente,
    "id_tipo_gestion": id_tipo_gestion,
    "id_resultado": id_resultado,
    "comentarios": comentarios,

  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  console.log(requestOptions)
  fetch("http://frontend171.com:3000/api/gestion/", requestOptions)
    .then(response => {
      if (response.status == 200) {
        alert("Gestion agregada");
        location.href = "listagestion.html";
      } else {
        alert("Error al agregar");
      }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function obtenerlistagestion() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/gestion/", requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completartabla)
    )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function completartabla(element, index, arr) {
  arr[index] = document.querySelector('#tbl_gestion tbody').innerHTML +=
    `<tr>
      <td>${element.id_gestion}</td>
      <td>${element.id_usuario}</td>
      <td>${element.id_cliente}</td>
      <td>${element.id_tipo_gestion}</td>
      <td>${element.id_resultado}</td>
      <td>${element.comentarios}</td>
      <td>${element.fecha_registro}</td>
      <td><a href='eliminargestion.html?id=${element.id_gestion}'><img src='../img/borrar24x24.png' with='24' height='24'></img></a><a href='actualizargestion.html?id=${element.id_gestion}'><img src='../img/actualizar24x24.png' with='24' height='24' ></img></a></td>
      
  </tr>`
};

function obtenerIDGestionEliminacion() {

  var queryString = window.location.search;

  var urlParams = new URLSearchParams(queryString)

  var p_id_gestion = urlParams.get("id")
  alert;
  g_id_gestion = p_id_gestion;

  obtenerDatosGestion(p_id_gestion)

}
function obtenerDatosGestion(p_id_gestion) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/gestion/" + p_id_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completar_Datos)
    )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
function completar_Datos(element, index, arr) {
  arr[index] = document.querySelector('#gestion').innerHTML =
    ` 
      <div class="alert alert-danger" role = "alert">id_usuario: ${element.id_usuario}</div>
      <div class="alert alert-danger" role = "alert">id_cliente: ${element.id_cliente}</div>
      <div class="alert alert-danger" role = "alert">id_tipo_gestion: ${element.id_tipo_gestion}</div>
      <div class="alert alert-danger" role = "alert">id_resultado: ${element.id_resultado}</div>
      <div class="alert alert-danger" role = "alert">comentarios: ${element.comentarios}</div>`

};
function obtenerIDGestionEliminar() {

  var queryString = window.location.search;

  var urlParams = new URLSearchParams(queryString)

  var p_id_gestion = urlParams.get("id")

  eliminar_gestion(p_id_gestion)
}
function eliminar_gestion(p_id_gestion) {

  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/gestion/" + p_id_gestion, requestOptions)
  .then(response => {
      if (response.status == 200) {
        alert("Gestion Eliminada");
        location.href = "listagestion.html";
      } else {
        alert("Error al eliminar");
      }
    })
    .then(result => console.log(result))
    .catch(error => console.log('error', error))
    ;
}
 
function obtenerIDGestionActualizar() {

  var queryString = window.location.search;

  var urlParams = new URLSearchParams(queryString)

  var p_id_gestion = urlParams.get("id")
  g_id_gestion = p_id_gestion;

  obtenerDatosGestionActualizar(p_id_gestion)
}


function obtenerDatosGestionActualizar(p_id_gestion) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/gestion/" + p_id_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completar_Datos_Actualizar)
    )
    .then(result => console.log(result))
    .catch(error => console.log('error', error));


}
function completar_Datos_Actualizar(element) {
  var id_usuario = element.id_usuario;
  var id_cliente = element.id_cliente;
  var id_tipo_gestion = element.id_tipo_gestion;
  var id_resultado = element.id_resultado;
  var comentarios = element.comentarios;


  document.getElementById("id_usuario").value = id_usuario;
  document.getElementById("id_cliente").value = id_cliente;
  document.getElementById("id_tipo_gestion").value = id_tipo_gestion;
  document.getElementById("id_resultado").value = id_resultado;
  document.getElementById("comentarios").value = comentarios;


}
function actualizarGestion() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var id_usuario = document.getElementById("id_usuario").value;
  var id_cliente = document.getElementById("id_cliente").value;
  var id_tipo_gestion = document.getElementById("id_tipo_gestion").value;
  var id_resultado = document.getElementById("id_resultado").value;
  var comentarios = document.getElementById("comentarios").value;



  var raw = JSON.stringify({
    "id_usuario": id_usuario,
    "id_cliente": id_cliente,
    "id_tipo_gestion": id_tipo_gestion,
    "id_resultado": id_resultado,
    "comentarios": comentarios,

  });

  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/gestion/" + g_id_gestion, requestOptions)
  .then(response => {
    if (response.status == 200) {
      alert("Gestion Actualizada");
      location.href = "listagestion.html";
    } else {
      alert("Error al actualizar");
    }
  })
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

var espacio = " ";

window.onload = function () {

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://frontend171.com:3000/api/usuario", requestOptions)
    .then((response) => response.json())

    .then(result =>

      result.forEach(function (valor, indice, array) {
        var select = document.getElementById("id_usuario");
        var option1 = document.createElement("option");
        option1.setAttribute("value", valor.id_usuario);
        var option1Texto = document.createTextNode(valor.nombres.concat(espacio).concat(valor.apellidos));
        option1.appendChild(option1Texto);

        select.appendChild(option1);

      })
    )
    .catch(error => console.log('error', error));




  fetch("http://frontend171.com:3000/api/cliente", requestOptions)
    .then((response) => response.json())

    .then(result =>

      result.forEach(function (valor, indice, array) {
        var select = document.getElementById("id_cliente");
        var option1 = document.createElement("option");
        option1.setAttribute("value", valor.id_cliente);
        var option1Texto = document.createTextNode(valor.nombres.concat(espacio).concat(valor.apellidos));
        option1.appendChild(option1Texto);

        select.appendChild(option1);

      })
    )
    .catch(error => console.log('error', error));


  fetch("http://frontend171.com:3000/api/tipo_gestion", requestOptions)
    .then((response) => response.json())

    .then(result =>

      result.forEach(function (valor, indice, array) {
        var select = document.getElementById("id_tipo_gestion");
        var option1 = document.createElement("option");
        option1.setAttribute("value", valor.id_tipo_gestion);
        var n = new Date(valor.fecha_registro);
        var y = n.getFullYear();
        var m = n.getMonth() + 1;
        var d = n.getDate();

        var Fecha = " -- " + m + "/" + d + "/" + y;
        var option1Texto = document.createTextNode(valor.nombre_tipo_gestion.concat(espacio).concat(Fecha));
        option1.appendChild(option1Texto);

        select.appendChild(option1);

      })
    )
    .catch(error => console.log('error', error));

  fetch("http://frontend171.com:3000/api/resultado", requestOptions)
    .then((response) => response.json())

    .then(result =>

      result.forEach(function (valor, indice, array) {
        var select = document.getElementById("id_resultado");
        var option1 = document.createElement("option");
        option1.setAttribute("value", valor.id_resultado);
        var n = new Date(valor.fecha_registro);
        var y = n.getFullYear();
        var m = n.getMonth() + 1;
        var d = n.getDate();

        var Fecha = " -- " + m + "/" + d + "/" + y;
        var option1Texto = document.createTextNode(valor.nombre_resultado.concat(espacio).concat(Fecha));
        option1.appendChild(option1Texto);

        select.appendChild(option1);

      })
    )
    .catch(error => console.log('error', error));

}









