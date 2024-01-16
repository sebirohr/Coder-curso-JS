//////
// Hice un Quiz que 

// Interacción confirm
const inicio = confirm("Bienvenido, esto es un quiz donde tenés que adivinar el ingrediente faltante de una receta gastronómica \n\n ¿Querés jugar?")

// Plato
const risotto = ["Risotto",["Arroz", "Manteca", "Queso", "Cebolla", "Vino blanco"]];

// Seteo del juego
let intentos = 0;
let respuesta = "";

// Adivinanzas. Acá intenté hacerlo por fórmula pero me entraba en el bucle y me restaba un ingrediente a cada error
const adivinanza1 = risotto[1].shift()

// Funcion juego
function juego(plato) {
    respuesta = prompt(`El ${plato[0]} tiene ${plato[1].join(", ")} \n\n ¿Qué ingrediente falta?`);
  }

// Do While Juego
if (inicio === true){
do {
  juego(risotto);
  intentos++;}
  while (respuesta.toLowerCase() !== adivinanza1.toLowerCase() & intentos<3)

  if (respuesta.toLowerCase() == adivinanza1.toLowerCase()) {alert ("Ganaste cra")}
else {alert ("Perdiste :(")}} 
else {alert ("Nos vemos la próxima")}

console.log("Fin del juego")