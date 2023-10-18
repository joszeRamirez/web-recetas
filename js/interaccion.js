// Obtener referencia al formulario y la sección de recetas
const formularioReceta = document.getElementById('form1');
const seccionRecetas = document.getElementById('recetas');

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
            <h3>${receta.nombre}</h3>
            <p><strong>Ingredientes:</strong> ${receta.ingredientes}</p>
            <p><strong>Instrucciones:</strong> ${receta.instrucciones}</p>
            <p><strong>Autor:</strong> ${receta.autor}</p>
        </div>
    `).join('');

    // Mostrar las recetas en la sección correspondiente
    
    const recetasContainer = document.getElementById('recetas');
    recetasContainer.innerHTML = htmlRecetas;
}

// Mostrar las recetas existentes al cargar la página --> mostrarRecetas();

function limpieza() {
    // Vaciar localStorage     localStorage.clear();
    localStorage.removeItem('recetas');

    // Mostrar las recetas (puedes llamar a mostrarRecetas directamente si es necesario)
    mostrarRecetas();
}
