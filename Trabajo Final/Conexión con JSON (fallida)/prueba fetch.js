class Receta{
  constructor(nombre, pais, ingredientes){
      this.nombre = nombre;
      this.pais = pais;
      this.ingredientes = ingredientes;
      this.Presentacion = () => {return "Soy originario del país de la bandera y tengo estos ingredientes:"}
      this.puntaje = 0
  }
}

const recetas = JSON.parse(localStorage.getItem("recetas")) 



// Renderizar productos en el DOM
const renderizarRecetas = (arrayUtilizado)=>{
  const recetasContainer = document.getElementById("recetasContainer");
  arrayUtilizado.forEach(({nombre, pais, ingredienteFaltante, ingredientesRestantes, Presentacion}) => {
    const recetaDiv = document.createElement("div")
    recetaDiv.innerHTML = ` 
          <h2>${nombre}</h2>
          <p>${Presentacion()}</p>`;
  recetasContainer.appendChild(recetaDiv)
  });
}


const recetasPreexistentes = ()=>{
  // Si el array de productos esta vacio, utiliza el array de productos pre-existente
  if (recetas.length===0){
    recetas.forEach(rec=>{
          let dato = JSON.parse(JSON.stringify(rec))
              agregarProducto(dato)}
          )
  }
}

