// Validación de formulario
var formulario = document.getElementsByName('formulario')[0],  //[0] Primer elemento, el formulario en si mismo.
      boton = document.getElementById('b1') // El botón

var validarNombre = function (x) {
    if (formulario.nombre.value == 0) {
        alert("Complete el campo Nombre")
        x.preventDefault()
    }
}

var validarApellido = function (x) {
    if (formulario.apellido.value == 0) {
        alert("Complete el campo Apellido")
        x.preventDefault()
    }
}

var validarRadio = function (x) {
    if (formulario.genero[0].checked == true ||
        formulario.genero[1].checked == true ||
        formulario.genero[2].checked == true ||
        formulario.genero[3].checked == true ||
        formulario.genero[4].checked == true ||
        formulario.genero[5].checked == true ||
        formulario.genero[6].checked == true) {
    } else {
        alert("Seleccione un Género Musical")
        x.preventDefault()
    }
}

var validarTelefono = function (x) {
    if (formulario.telefono.value == 0) {
        alert("Ingrese su teléfono: sólo números sin espacios ni caracteres especiales")
        x.preventDefault()
    }
}

var validarEmail = function (x) {
    if (formulario.correo.value == 0) {
        alert("Ingrese su Correo Electrónico")
        x.preventDefault()
    }
}

var validarComentario = function (x) {
    if (formulario.consulta.value == 0) {
        alert("Ingrese su Comentario o Consulta")
        x.preventDefault()
    }
}

var validar = function (x) {
    validarNombre(x)
    validarApellido(x)
    validarRadio(x)
    validarTelefono(x)
    validarEmail(x)
    validarComentario(x)
}

formulario.addEventListener("submit", validar)
