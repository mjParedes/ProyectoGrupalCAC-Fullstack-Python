
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



// apikey = '423718fb69e09b5072a5bdd3cd65caa1';
// url = 'https://gnews.io/api/v4/search?q='temaActual'&lang=en&country=us&max=10&apikey=' + apikey;



//Cantida de noticias que se cargaran cada vez que se presione siguiente (5 + 1)
let cantidadNoticias = 11;
let pageFinal = cantidadNoticias;
let pageInicial = 0;
let temaActual = "entertainment+music+artist";

let noticias = {
    "apiKey": "f3798e116eb342b2bae58e7f0cbd9c11",
    fetchNoticias: function (categoria) {
        fetch(
            "https://newsapi.org/v2/everything?q="
            + categoria +
            "&languaje=es&apiKey=" + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayNoticias(data));
    },
    displayNoticias: function (data) {
        //elimino todo si ha seleccionado un nuevo tema
        if (pageInicial == 0) {
            document.querySelector(".container-noticias").textContent = "";
        }


        for (i = pageInicial; i <= pageFinal; i++) {
            const { title } = data.articles[i];
            let h2 = document.createElement("h2");
            h2.textContent = title;

            const { urlToImage } = data.articles[i];
            let img = document.createElement("img");
            img.setAttribute("src", urlToImage);

            let info_item = document.createElement("div");
            info_item.className = "info_item";
            const { publishedAt } = data.articles[i];
            let fecha = document.createElement("span");
            let date = publishedAt;
            date = date.split("T")[0].split("-").reverse().join("-");
            fecha.className = "fecha";
            fecha.textContent = date;

            const { name } = data.articles[i].source;
            let fuente = document.createElement("span");
            fuente.className = "fuente";
            fuente.textContent = name;

            info_item.appendChild(fecha);
            info_item.appendChild(fuente);

            const { url } = data.articles[i];

            let item = document.createElement("div");
            item.className = "item";
            item.appendChild(h2);
            item.appendChild(img);
            item.appendChild(info_item);
            item.setAttribute("onclick", "location.href='" + url + "'");
            document.querySelector(".container-noticias").appendChild(item);
        }

        let btnSiguiente = document.createElement("span");
        btnSiguiente.id = "btnSiguiente";
        btnSiguiente.textContent = "Ver más";
        btnSiguiente.setAttribute("onclick", "siguiente()");
        document.querySelector(".container-noticias").appendChild(btnSiguiente);
    }
}



function buscar(cat) {
    pageInicial = 0;
    pageFinal = cantidadNoticias;
    temaActual = cat;
    noticias.fetchNoticias(cat);
}

function buscarTema() {
    pageInicial = 0;
    pageFinal = cantidadNoticias;

    let tema = document.querySelector("#busqueda").value;
    temaActual = tema;
    noticias.fetchNoticias(temaActual);
}

function siguiente() {
    pageInicial = pageFinal + 1;
    pageFinal = pageFinal + cantidadNoticias + 1;
    //eliminamos el botón siguiente
    document.querySelector("#btnSiguiente").remove();
    noticias.fetchNoticias(temaActual);

}

noticias.fetchNoticias(temaActual);

