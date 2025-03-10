const lista = document.getElementById("listaAmigos");
const ulResultado = document.getElementById("resultado");
const botonSortear = document.getElementById("botonSortear");
const botonReiniciar = document.getElementById("reinicio");
const inputNombre = document.getElementById("amigo");
const mensaje = document.getElementById("mensaje");
const divInput = document.querySelector(".input-wrapper");
const titulo = document.querySelector(".section-title");
let listaAmigos = [];

function agregarAmigo() {
    const nombre = inputNombre.value.trim();
    
    if (!validarNombre(nombre)) return;
    
    listaAmigos.push(nombre);
    actualizarLista();
    mostrarMensaje("El nombre es válido", "green");
    inputNombre.value = "";
    inputNombre.focus();
    botonSortear.style.display = "flex";
}

function validarNombre(nombre) {
    if (!nombre) {
        mostrarMensaje("Campo vacío: Ingresa un nombre", "red");
        return false;
    }
    if (/\d/.test(nombre) || /[^A-Za-z\s]/.test(nombre)) {
        mostrarMensaje("Ingresa un nombre válido", "red");
        return false;
    }
    if (listaAmigos.includes(nombre)) {
        mostrarMensaje("Ese amigo ya está participando", "blue");
        return false;
    }
    return true;
}

function mostrarMensaje(texto, color) {
    mensaje.textContent = texto;
    mensaje.style.color = color;
}

function actualizarLista() {
    lista.innerHTML = "";
    listaAmigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${amigo}`;
        lista.appendChild(li);
    });
}

function sortearAmigo() {
    if (listaAmigos.length === 0) {
        alert("Debe agregar al menos un amigo para sortear");
        return;
    }
    
    const indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
    const ganador = listaAmigos.splice(indiceAleatorio, 1)[0];
    ulResultado.innerHTML = `<li>🎉 El ganador es: ${ganador} 🎉</li>`;
    actualizarLista();
    botonSortear.style.display = "none";
    botonReiniciar.style.display = "flex";
}

function reiniciarAplicacion() {
    listaAmigos = [];
    actualizarLista();
    ulResultado.innerHTML = "";
    mensaje.textContent = ""; // Limpiar mensaje
    botonSortear.style.display = "none";
    botonReiniciar.style.display = "none";
    divInput.style.display = "flex";
    titulo.style.display = "flex";
    inputNombre.focus();
}

inputNombre.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        agregarAmigo();
    }
});

botonReiniciar.onclick = reiniciarAplicacion;
