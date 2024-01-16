// Esto es un quiz donde hay que adivinar el ingrediente faltante de una receta //

//// En primer lugar ingreso la clase que va a incluir: Nombre del plato, Pais de origen (por una idea futura para el juego), e ingredientes. 
//// A partir de funciones obtenemos el ingrediente faltante a adivinar y los ingredientes restantes para que sean el dato del Quiz.
//// Tambien sumo la función presentación para jugar

class Receta{
    constructor(nombre, pais, ingredientes){
        this.nombre = nombre;
        this.pais = pais;
        this.ingredientes = ingredientes;
        this.ingredienteFaltante = () => {return ingredientes.shift()}
        this.ingredientesRestantes = () => {
            const ingredientesOriginal = [...this.ingredientes];
            ingredientesOriginal.shift();
            return ingredientesOriginal;
        }
        this.Presentacion = () => {return `El ${this.nombre} tiene ${this.ingredientesRestantes().join(", ")}
        `}
        this.puntaje = 0
    }
}

const recetas = [
    new Receta('Risotto', 'Italia', ["Arroz", "Manteca", "Queso", "Cebolla", "Vino blanco"]),
    new Receta('Tortilla', 'España', ["Huevos", "Cebolla", "Papa", "Chorizo"]),
    new Receta('Locro', 'Argentina', ["Maíz Blanco", "Porotos", "Zapallo", "Chorizo", "Carne"])
];


// Me traigo el elemento HTML que sera contenedor de recetas
let recetasContainer = document.getElementById("recetasContainer");

let recetaDiv = document.createElement("div");

// Acá armo el .forEach que permite presentar todas las recetas
recetas.forEach(function (receta) {
    // Creo un nuevo elemento

    // Presentación de la receta
    recetaDiv.innerHTML += `<h2>${receta.nombre}</h2>`;
    recetaDiv.innerHTML += `<p>${receta.Presentacion()}</p>`;

    /////// En formato Lista de ingredientes por si quiero hacerlo de otra manera
    // let listaIngredientes = document.createElement("ul");
    // receta.ingredientesRestantes().forEach(function (ingrediente) {
    //     let li = document.createElement("li");
    //     li.appendChild(document.createTextNode(ingrediente));
    //     listaIngredientes.appendChild(li);
    // });
    // recetaDiv.appendChild(listaIngredientes);


    // Sumo el elemento input para que ingresen las respuesta por ingrediente
 let labelinputIngrediente = document.createElement("label")
 labelinputIngrediente.for = "Respuesta"
 labelinputIngrediente.textContent = "¿Qué ingrediente falta?"
 recetaDiv.appendChild(labelinputIngrediente);


 let inputIngrediente = document.createElement("input");
 inputIngrediente.type = "text";
 inputIngrediente.name = `${receta.nombre}`;
 inputIngrediente.id = "Respuesta";
 inputIngrediente.placeholder = "Respuesta";
 recetaDiv.appendChild(inputIngrediente);

 // formularioRespuesta.appendChild(document.createElement("br"));

    // Agrego el div de receta al contenedor de recetas

 recetasContainer.appendChild(recetaDiv);

});



///// Acá comienzon con la parte del puntaje. Es acá donde empiezo a tener problemas

/// Me traigo el nodo de formulario y seteo el puntaje inicial en 0

let formularioRespuesta = document.getElementById("formulario");
let puntajeTotal = [];

// Event Listener para obtener el array de respuestas
// Agrego un eventListener al formulario para capturar el evento submit
formularioRespuesta.addEventListener("submit", function (event) {
    // Evito que el formulario se envíe (para que no se recargue la página)
    event.preventDefault();
    // Obtengo todos los inputs dentro del formulario
    const informacion = new FormData(event.target)
    const respuestasUsuario = Object.fromEntries(informacion);

    // Comparo las respuestas del usuario con los ingredientes faltantes reales
    const puntajeReceta = recetas.map(receta => {
        const respuestaUsuario = respuestasUsuario[receta.nombre] || "";
        const ingredienteFaltanteReal = receta.ingredienteFaltante();

        return {
            Plato: receta.nombre,
            RespuestaUsuario: respuestaUsuario,
            IngredienteFaltanteReal: ingredienteFaltanteReal,
            Correcto: respuestaUsuario.toLowerCase() === ingredienteFaltanteReal.toLowerCase()
        };

    });

    // Calculo el puntaje total
    const puntajeTotal = puntajeReceta.filter(item => item.Correcto).length;
    recetaDiv.innerHTML += `Puntaje total: ${puntajeTotal}`;

    });





