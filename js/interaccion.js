// Obtener referencia al formulario y la sección de recetas
const formularioReceta = document.getElementById('form1');
const seccionRecetas = document.getElementById('recetas');
const recetasGuardadas = document.querySelector('.lista-recetas');

// Función para agregar una nueva receta
function agregarReceta() {
    // Obtener valores del formulario
    const nombreReceta = document.getElementById('nombre').value;
    const ingredientesReceta = document.getElementById('ingredientes').value;
    const instruccionesReceta = document.getElementById('instrucciones').value;
    const autorReceta = document.getElementById('autor').value;

    // Validar que se hayan ingresado valores
    if (nombreReceta && ingredientesReceta && instruccionesReceta && autorReceta ) {
        // Crear objeto de receta
        const receta = {
            nombre: nombreReceta,
            ingredientes: ingredientesReceta,
            instrucciones: instruccionesReceta,
            autor: autorReceta
        };

        // Obtener recetas existentes o inicializar array vacío
        const recetasGuardadas = JSON.parse(localStorage.getItem('recetas')) || [];

        // Agregar la nueva receta al array
        recetasGuardadas.push(receta);

        // Guardar el array actualizado en localStorage
        localStorage.setItem('recetas', JSON.stringify(recetasGuardadas));

        // Limpiar el formulario         formularioReceta.reset();

        // Mostrar las recetas        mostrarRecetas();
        alert('Carga realizada')
    } else {
        alert('Por favor, completa todos los campos del formulario.');
    }
}

// Función para mostrar las recetas almacenadas en localStorage
function mostrarRecetas() {
    // Obtener recetas del almacenamiento local
    const recetasGuardadas = JSON.parse(localStorage.getItem('recetas')) || [];

    // Construir el HTML para mostrar las recetas
    const htmlRecetas = recetasGuardadas.map(receta => `
        <div>
            <h3 class="top-1">${receta.nombre}</h3>
            <p><strong>Ingredientes:</strong> ${receta.ingredientes}</p>
            <p><strong>Instrucciones:</strong> ${receta.instrucciones}</p>
            <p><strong>Autor:</strong> ${receta.autor}</p>
        </div>
    `).join('');

    // Mostrar las recetas en la sección correspondiente
    
    const recetasContainer = document.getElementById('recetas');
    recetasContainer.innerHTML = htmlRecetas;

}

function detalleReceta(){

}
// Mostrar las recetas existentes al cargar la página --> mostrarRecetas();

function limpieza() {
    // Vaciar localStorage     localStorage.clear();
    localStorage.removeItem('recetas');

    // Mostrar las recetas (puedes llamar a mostrarRecetas directamente si es necesario)
    mostrarRecetas();
}
mostrarRecetas();

// Función para realizar la búsqueda de recetas por nombre
function buscarReceta() {
    // Obtener el valor de búsqueda desde el cuadro de texto
    const query = document.getElementById('search').value.toLowerCase();
    // Obtener recetas del almacenamiento local
    const recetasGuardadas = JSON.parse(localStorage.getItem('recetas')) || [];
    // Filtrar recetas por nombre según la consulta de búsqueda
    const recetasFiltradas = recetasGuardadas.filter(receta =>
        receta.nombre.toLowerCase().includes(query)
    );
    // Construir el HTML para mostrar las recetas filtradas
    const resultadosContainer = document.getElementById('resultados');
    const mensajeNoResultados = document.createElement('p');
    mensajeNoResultados.id = 'mensajeNoResultados';
    mensajeNoResultados.style.color = 'red';
    if (recetasFiltradas.length > 0) {
        const htmlRecetasFiltradas = recetasFiltradas.map(receta => `
            <div>
                <h3>${receta.nombre}</h3>
                <p><strong>Ingredientes:</strong> ${receta.ingredientes}</p>
                <p><strong>Instrucciones:</strong> ${receta.instrucciones}</p>
                <p><strong>Autor:</strong> ${receta.autor}</p>
            </div>
        `).join('');
        resultadosContainer.innerHTML = htmlRecetasFiltradas;
        mensajeNoResultados.textContent = '';  // Limpiar el mensaje si hubo resultados
    } else {
        resultadosContainer.innerHTML = '';  // Limpiar resultados si no hay coincidencias
        mensajeNoResultados.textContent = 'No se encontraron coincidencias.';
    }
    // Agregar el mensaje al contenedor de resultados
    resultadosContainer.appendChild(mensajeNoResultados);
    // Mostrar o esconder el contenedor de resultados y el mensaje de no resultados
    const resultadosBusqueda = document.getElementById('resultadosBusqueda');
    resultadosBusqueda.style.display = 'block';
}

