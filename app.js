// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

//Crear un array para almacenar los nombres
let amigos = [];
let listaAmigosUl = document.getElementById("listaAmigos");

let listaVacia = document.getElementById("borrarLista");
let formatearNombre;

//Función para agregar amigos.
function agregarAmigo() {
  let regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ]+(\s[A-Za-záéíóúÁÉÍÓÚñÑ]+)*$/;
  let nombreAmigo = document.getElementById("amigo").value;

  //Validar la entrada.
  if (nombreAmigo === "") {
    alert("Por favor, digite un nombre.");
    return;
  }

  if (amigos.some((amigo) => nombreAmigo.toLowerCase() === amigo.toLowerCase())) {
    alert(`El nombre ${nombreAmigo.toUpperCase()} ya fué agregado a la lista, ingrese el segundo nombre o el apellido.`);
    document.getElementById("amigo").value = "";
    return;
  }

  if (document.getElementById("amigo").value.match(/\d/)) {
    alert("Escriba un nombre válido, no puede contener números.");
    document.getElementById("amigo").value = "";
    return;
  }

  if (!regex.test(nombreAmigo)) {
    alert("Escriba un nombre válido, no puede contener caracteres especiales y/o espacio al final.");
    document.getElementById("amigo").value = "";
    return;
  }

  function formatearNombre(nombre) {
    return nombre.split(" ").map(function (palabra) {
        // Para cada palabra, se convierte la primera letra en mayúscula y el resto en minúscula.
        return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
      }).join(" ");
  }

  // Se llama a la función para formatear el nombre
  let nombreFormateado = formatearNombre(nombreAmigo);

  // Agregar nombre al array y limpiar campo de entrada.
  amigos.push(nombreFormateado);
  document.getElementById("amigo").value = "";

  actualizarListaAmigos();
  desactivarBotonReset();
}

//Crear elemento en la lista.
function actualizarListaAmigos() {
  listaAmigosUl.innerHTML = "";
  amigos.forEach(function (list) {
    let li = document.createElement("li");
    li.textContent = list;
    listaAmigosUl.appendChild(li);
  });
}

function sortearAmigo() {
  if (amigos.length === 0) {
    alert("Necesita agregar nombres a la lista para llevar a cabo el Juego del Amigo Secreto.");
    return;
  }

  if (amigos.length < 2) {
    alert("Agrega otro nombre, se necesitan mínimo dos amigos para jugar.");
    return;
  }

  //Generar indice aleatorio.
  let indiceAleatorio = Math.floor(Math.random() * amigos.length);

  //Obtener el nombre sorteado.
  let amigoSeleccionado = amigos[indiceAleatorio];

  //Mostrar el resultado.
  document.getElementById("resultado").innerHTML = `El amigo sorteado es: ${amigoSeleccionado}`;
}

//Al presionar ENTER agrega los nombres a la lista.
document.getElementById("amigo").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); 
    agregarAmigo(); 
  }
});

function resetList() {
  if (amigos.length === 0) {
  }
  amigos = [];
  limpiarListaAmigo();
  limpiarListaSorteado();
  desactivarBotonReset();
}

function limpiarListaAmigo() {
  while (listaAmigosUl.firstChild) {
    listaAmigosUl.removeChild(listaAmigosUl.firstChild);
  }
}

function limpiarListaSorteado() {
  let listaSorteado = document.getElementById("resultado");
  while (listaSorteado.firstChild) {
    listaSorteado.removeChild(listaSorteado.firstChild);
  }
}

function desactivarBotonReset() {
  if (amigos.length === 0) {
    listaVacia.disabled = true;
  } else {
    listaVacia.disabled = false;
  }
}


