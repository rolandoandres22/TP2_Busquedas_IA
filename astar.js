// Importamos el módulo readline de Node.js.
const readline = require("readline");

// Creamos una interfaz para leer información ingresada por el usuario desde la entrada estándar.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función auxiliar para realizar preguntas por consola.
function preguntar(texto) {
  return new Promise(resolve => rl.question(texto, resolve));
}

// FUNCIÓN HEURÍSTICA
function heuristica(estado, objetivo) {
  return Math.abs(objetivo - estado);
}

// ALGORITMO A*
function aStar(inicio, objetivo) {

  // Lista de nodos abiertos.
  // Contiene los estados que todavía deben ser evaluados.
  const abiertos = [{
    estado: inicio,
    camino: [inicio],
    costo: 0,
    estimacion: heuristica(inicio, objetivo)
  }];

  // Guarda el menor costo conocido para llegar a cada estado.
  const mejoresCostos = new Map([[inicio, 0]]);

  // Conjunto de estados que ya fueron procesados.
  const cerrados = new Set();

  // Contador utilizado para conocer cuántos nodos fueron evaluados durante la búsqueda.
  let nodosExpandidos = 0;

  // Mientras existan nodos pendientes de analizar...
  while (abiertos.length > 0) {

    // Ordenamos los nodos abiertos según: f(n) = g(n) + h(n)
    // g(n) = costo acumulado.
    // h(n) = estimación de distancia al objetivo.
    // El primer elemento será el nodo con menor f(n).
    abiertos.sort((a, b) => {
      const fA = a.costo + a.estimacion;
      const fB = b.costo + b.estimacion;

      return fA - fB;
    });

    // Extraemos de la lista el nodo con menor f(n).
    const actual = abiertos.shift();

    // Si este estado ya fue procesado, lo ignoramos.
    if (cerrados.has(actual.estado)) continue;

    // Marcamos el estado actual como procesado.
    cerrados.add(actual.estado);

    // Aumentamos el contador de nodos evaluados.
    nodosExpandidos++;

    // Si el estado actual coincide con el objetivo, significa que encontramos una solución.
    if (actual.estado === objetivo) {

      // Devolvemos los datos de la solución encontrada.
      return {
        camino: actual.camino,

        // La cantidad de movimientos es la cantidad de
        // estados del camino menos el estado inicial.
        pasos: actual.camino.length - 1,

        // Cantidad de nodos evaluados durante la búsqueda.
        nodosExpandidos,

        // Costo acumulado g(n) de la solución.
        costoTotal: actual.costo
      };
    }

    // Generamos los dos movimientos posibles:
    // estado - 1 -> movimiento hacia la izquierda.
    // estado + 1 -> movimiento hacia la derecha.
    const vecinos = [actual.estado - 1, actual.estado + 1];

    // Analizamos cada estado vecino.
    for (const siguiente of vecinos) {

      // Si el vecino ya fue procesado, no lo volvemos a evaluar.
      if (cerrados.has(siguiente)) continue;

      // Cada movimiento tiene un costo de 1.
      const nuevoCosto = actual.costo + 1;

      // Obtenemos el mejor costo conocido para llegar al estado vecino.
      // Si todavía no existe, utilizamos Infinity.
      const mejorCostoConocido =
        mejoresCostos.has(siguiente)
          ? mejoresCostos.get(siguiente)
          : Infinity;

      // Si encontramos una ruta con menor costo, actualizamos la información del estado.
      if (nuevoCosto < mejorCostoConocido) {

        // Guardamos el nuevo mejor costo.
        mejoresCostos.set(siguiente, nuevoCosto);

        // Agregamos el nuevo estado a la lista de abiertos.
        abiertos.push({

          // Estado al que llegamos.
          estado: siguiente,

          // Copiamos el camino anterior y agregamos el nuevo estado.
          camino: [...actual.camino, siguiente],

          // Guardamos el costo acumulado g(n).
          costo: nuevoCosto,

          // Calculamos la heurística h(n) para el nuevo estado.
          estimacion: heuristica(siguiente, objetivo)
        });
      }
    }
  }

  // Si se vacía la lista de abiertos sin encontrar el objetivo, no existe una solución.
  return null;
}

// Función encargada de mostrar en la consola la información obtenida por el algoritmo.
function mostrarResultado(resultado) {

  console.log("\n========== RESULTADO A* ==========");

  // Muestra la trayectoria completa encontrada.
  console.log(
    `Trayectoria encontrada: ${resultado.camino.join(" -> ")}`
  );

  // Muestra la cantidad de movimientos realizados.
  console.log(
    `Cantidad de pasos/movimientos: ${resultado.pasos}`
  );

  // Muestra cuántos nodos fueron evaluados.
  console.log(
    `Nodos evaluados/expandidos: ${resultado.nodosExpandidos}`
  );

  // Muestra el costo total g(n).
  console.log(
    `Costo total g(n): ${resultado.costoTotal}`
  );

  console.log("==================================\n");
}

// Función principal del programa.
async function main() {

  console.log("==========================================");
  console.log(" BÚSQUEDA HEURÍSTICA - A*");
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

  // Validamos que ambos valores sean números enteros.
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

  // Ejecutamos el algoritmo A* utilizando el punto inicial y el objetivo ingresados.
  const resultado = aStar(inicio, objetivo);

  // Si se encontró una solución mostramos el resultado.
  if (resultado) {
    mostrarResultado(resultado);
  }

  rl.close();// Cerramos la interfaz de entrada.
}

main();// Iniciamos el programa ejecutando la función principal.