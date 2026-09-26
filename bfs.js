// Importamos el módulo readline de Node.js.
const readline = require("readline");

// Creamos una interfaz para poder leer datos desde la entrada estándar del programa.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función auxiliar para realizar preguntas al usuario.
function preguntar(texto) {
  return new Promise(resolve => rl.question(texto, resolve));
}

// Implementación del algoritmo Breadth-First Search (BFS).
function bfs(inicio, objetivo) {

  // Creamos la cola de búsqueda colocando únicamente el estado inicial.
  const cola = [[inicio]];

  // Conjunto que almacena los estados que ya fueron visitados.
  const visitados = new Set([inicio]);

  // Contador de nodos que fueron evaluados durante la búsqueda.
  let nodosExpandidos = 0;

  // Mientras existan caminos pendientes de analizar...
  while (cola.length > 0) {

    // Extraemos el primer camino de la cola.
    const camino = cola.shift();

    // Obtenemos el último estado del camino.
    const actual = camino[camino.length - 1];

    // Registramos que este nodo fue evaluado.
    nodosExpandidos++;

    // Comprobamos si el estado actual es el objetivo.
    if (actual === objetivo) {
      return {

        // Trayectoria completa desde B hasta A.
        camino,

        // Cantidad de movimientos realizados.
        pasos: camino.length - 1,

        // Cantidad de nodos evaluados.
        nodosExpandidos
      };
    }

    // Generamos los dos movimientos posibles:
    // actual - 1 -> movimiento hacia la izquierda.
    // actual + 1 -> movimiento hacia la derecha.
    const vecinos = [actual - 1, actual + 1];

    // Recorremos los estados vecinos.
    for (const siguiente of vecinos) {

      // Si el estado todavía no fue visitado, podemos agregarlo a la búsqueda.
      if (!visitados.has(siguiente)) {

        // Marcamos el estado como visitado para evitar procesarlo nuevamente.
        visitados.add(siguiente);

        // Agregamos a la cola una copia del camino actual incorporando el nuevo estado.
        cola.push([...camino, siguiente]);
      }
    }
  }

  // Si la cola queda vacía y nunca se encontró el objetivo, devolvemos null.
  return null;
}

// Función encargada de mostrar en la consola la información obtenida por BFS.
function mostrarResultado(resultado) {

  console.log("\n========== RESULTADO BFS ==========");

  // Mostramos la trayectoria completa encontrada.
  console.log(
    `Trayectoria encontrada: ${resultado.camino.join(" -> ")}`
  );

  // Mostramos la cantidad de movimientos realizados.
  console.log(
    `Cantidad de pasos/movimientos: ${resultado.pasos}`
  );

  // Mostramos la cantidad de nodos evaluados.
  console.log(
    `Nodos evaluados/expandidos: ${resultado.nodosExpandidos}`
  );

  console.log("===================================\n");
}

// Función principal del programa.
async function main() {

  console.log("==========================================");
  console.log(" BÚSQUEDA EXHAUSTIVA - BFS");
  console.log(" Prototipo de desplazamiento horizontal");
  console.log("==========================================");

  // Solicitamos al usuario la posición inicial B.
  const inicio = Number(
    await preguntar("Ingrese el punto inicial B: ")
  );

  // Solicitamos al usuario la posición objetivo A.
  const objetivo = Number(
    await preguntar("Ingrese el punto objetivo A: ")
  );

  // Comprobamos que ambos valores sean números enteros.
  if (
    !Number.isInteger(inicio) ||
    !Number.isInteger(objetivo)
  ) {

    console.log(
      "\nError: los puntos deben ser números enteros."
    );

    rl.close();// Cerramos la interfaz de entrada.

    return;// Finalizamos la función.
  }

  // Ejecutamos el algoritmo BFS utilizando el punto inicial y el objetivo ingresados.
  const resultado = bfs(inicio, objetivo);

  // Si BFS encontró una solución, mostramos el resultado en la consola.
  if (resultado) {
    mostrarResultado(resultado);
  }

  rl.close();// Cerramos la interfaz de entrada.
}

main();// Iniciamos la ejecución del programa.