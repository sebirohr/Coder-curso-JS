class Receta{
    constructor(nombre, pais, ingredientes){
        this.nombre = nombre;
        this.pais = pais;
        this.ingredientes = ingredientes;
        this.Presentacion = () => {return "Soy originario del país de la bandera y tengo estos ingredientes:"}
        this.puntaje = 0
    }
}


const recetasBase = [
    new Receta('Risotto', 'Italia', ["Arroz", "Manteca", "Queso", "Cebolla", "Vino blanco"]),
    new Receta('Tortilla', 'España', ["Huevos", "Cebolla", "Papa", "Chorizo"]),
    new Receta('Locro', 'Argentina', ["Maíz Blanco", "Porotos", "Zapallo", "Chorizo", "Carne"])
];

// Esta parte está floja, quiero guardar las recetas en el local storage pero no se si me sale ni se mucho cuál es el sentido
const recetas = JSON.parse(localStorage.getItem("recetasBase")) || recetasBase;


const recetaDiv = document.createElement("div")

// Renderizar productos en el DOM
const renderizarRecetas = (arrayUtilizado)=>{
    const recetasContainer = document.getElementById("contenedorRecetas")
    recetasContainer.innerHTML=""  
    arrayUtilizado.forEach(({nombre, pais, Presentacion, ingredientes}) => {
// Acá entiendo que estoy volviendo a crear una div identica a la de arriba. Si no lo hacía se me rompía pero tampoco entiendo bien
    const recetaDiv = document.createElement("div")
    recetaDiv.style = "width: 200px;height: 500px; margin:20px"
    recetaDiv.innerHTML = `
        <img src="./${pais}.png" class="card-img-top" alt="${pais}" width="150" height="100" style="margin-bottom: 10px;">  
        <p>${Presentacion()}</p>`
    let listaIngredientes = document.createElement("ul")
        ingredientes.forEach(function (ingrediente) {
             let li = document.createElement("li");
             li.appendChild(document.createTextNode(ingrediente));
             listaIngredientes.appendChild(li);
         });
         recetaDiv.appendChild(listaIngredientes);
    let inputIngrediente = document.createElement("input");
        inputIngrediente.type = "text";
        inputIngrediente.name = `${nombre}`;
        inputIngrediente.id = "Respuesta";
        inputIngrediente.placeholder = "Respuesta";
 recetaDiv.appendChild(inputIngrediente);
  recetasContainer.appendChild(recetaDiv)
  });
}

// Copio lo que veo en ciertos códigos pero no tengo un buen manejo del storage
localStorage.setItem('recetas', JSON.stringify(recetas))


// Acá comienzon con la parte del puntaje.

/// Me traigo el nodo de formulario y seteo el puntaje inicial en 0
let formularioRespuesta = document.getElementById("formulario");

// Event Listener para obtener el array de respuestas
// Agrego un eventListener al formulario para capturar el evento submit
formularioRespuesta.addEventListener("submit", function (event) {
    event.preventDefault();
    // Obtengo todos los inputs dentro del formulario
    const informacion = new FormData(event.target)
    const respuestasUsuario = Object.fromEntries(informacion);
    console.log(respuestasUsuario)
    // Comparo las respuestas del usuario con los nombres de los platos
    const puntajeReceta = recetasBase.map(receta => {
        const respuestaUsuario = respuestasUsuario[receta.nombre] || "";

        return {
            Plato: receta.nombre,
            RespuestaUsuario: respuestaUsuario,
            Correcto: respuestaUsuario.toLowerCase() === receta.nombre.toLowerCase()
        };
    });

      // Calculo el puntaje total
    const puntajeTotalActual = puntajeReceta.filter(item => item.Correcto).length;
      // Setear iconos segun puntajes posibles 
      let icono;
      if (puntajeTotalActual === 0) {
          icono = 'error';
      } else if (puntajeTotalActual === 1) {
          icono = 'warning';
      } else if (puntajeTotalActual === 2) {
          icono = 'success';
      } else if (puntajeTotalActual === 3) {
          icono = 'success';
      }
    
      // Uso de biblioteca sweet Aler 
      Swal.fire({
          icon: icono,
          title: 'Puntaje total',
          text: `Tu puntaje total es: ${puntajeTotalActual}`
      });
  });


// Testing
const app = ()=>{
    renderizarRecetas(recetas)
}

// Ejecuto mi aplicacion
app()
