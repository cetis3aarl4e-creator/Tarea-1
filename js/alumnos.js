// Obtener elementos del HTML
const formulario = document.getElementById("formulario");
const numeroControl = document.getElementById("numeroControl");
const apellidoPaterno = document.getElementById("apellidoPaterno");
const apellidoMaterno = document.getElementById("apellidoMaterno");
const nombre = document.getElementById("nombre");
const carrera = document.getElementById("carrera");
const lista = document.getElementById("lista");
const mensaje = document.getElementById("mensaje");


// Obtener los alumnos guardados
let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];


// Mostrar los alumnos al cargar la pagina
mostrarAlumnos();


// Evento del formulario
formulario.addEventListener("submit", function (evento) {

    // Evitar que la pagina se recargue
    evento.preventDefault();

    // El numero de control se guarda en mayusculas y sin espacios
    const control = numeroControl.value.trim().toUpperCase();

    // Validar que el numero de control solo tenga letras y numeros
    if (!/^[A-Z0-9]+$/.test(control)) {
        mensaje.textContent = "El numero de control solo puede tener letras y numeros.";
        return;
    }

    // Validar que el numero de control no este repetido
    const repetido = alumnos.some(function (alumno) {
        return alumno.numeroControl === control;
    });

    if (repetido) {
        mensaje.textContent = "Ese numero de control ya esta registrado.";
        return;
    }

    // Crear un objeto alumno
    const alumno = {
        numeroControl: control,
        apellidoPaterno: apellidoPaterno.value.trim(),
        apellidoMaterno: apellidoMaterno.value.trim(),
        nombre: nombre.value.trim(),
        carrera: carrera.value.trim()
    };

    // Agregar el alumno al arreglo
    alumnos.push(alumno);

    // Guardar en localStorage
    localStorage.setItem(
        "alumnos",
        JSON.stringify(alumnos)
    );

    // Mostrar nuevamente la lista
    mostrarAlumnos();

    mensaje.textContent = "Alumno guardado correctamente.";

    // Limpiar formulario
    formulario.reset();

    // Regresar el cursor al primer campo
    numeroControl.focus();

});


// Quitar el mensaje cuando se empieza a escribir otra vez
formulario.addEventListener("input", function () {
    mensaje.textContent = "";
});


// Funcion para mostrar alumnos
function mostrarAlumnos() {

    lista.innerHTML = "";

    // Si todavia no hay alumnos
    if (alumnos.length === 0) {

        const vacio = document.createElement("p");

        vacio.classList.add("mensaje");
        vacio.textContent = "Todavia no hay alumnos registrados.";

        lista.appendChild(vacio);

        return;
    }

    alumnos.forEach(function (alumno) {

        const elemento = document.createElement("div");

        elemento.classList.add("alumno");

        elemento.innerHTML = `
            <strong>${alumno.numeroControl} - ${alumno.apellidoPaterno} ${alumno.apellidoMaterno} ${alumno.nombre}</strong>
            <p>Carrera: ${alumno.carrera}</p>
        `;

        lista.appendChild(elemento);

    });

}
