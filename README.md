# TP2 - Búsqueda en Inteligencia Artificial

Prototipo desarrollado en **JavaScript con Node.js** para implementar dos estrategias de búsqueda aplicadas al problema de desplazamiento horizontal de un robot en una línea de ensamblaje industrial:

- **BFS (Breadth-First Search)**: búsqueda exhaustiva.
- **A\***: búsqueda heurística.

El prototipo representa de forma simplificada el desplazamiento horizontal desde una posición inicial **B** hasta una posición objetivo **A**.

---

## 1. Descripción del problema

En el escenario planteado, un robot de una línea de ensamblaje debe corregir una pequeña desviación de la posición teórica para poder realizar correctamente el montaje de una pieza.

Para el prototipo se simplifica el problema considerando únicamente el desplazamiento horizontal.

Cada posición representa un estado posible del robot:

```text
... -2 -1 0 1 2 3 4 5 6 ...

Desde cada estado el robot puede desplazarse una unidad hacia la izquierda o hacia la derecha.

Por ejemplo:

B = 0
A = 5

Una posible trayectoria es:

0 -> 1 -> 2 -> 3 -> 4 -> 5

2. Tecnologías utilizadas

JavaScript
Node.js
npm
Visual Studio Code

No se utilizan dependencias externas para los algoritmos. Se utilizan funcionalidades incorporadas de Node.js.

3. Requisitos previos

Antes de ejecutar el proyecto es necesario tener instalado:

Node.js
npm
Visual Studio Code (opcional, pero recomendado)

npm se instala automáticamente junto con Node.js.

Se recomienda utilizar una versión LTS reciente de Node.js.

Para verificar que Node.js está instalado correctamente:

node --version

Para verificar npm:

npm --version

Si ambos comandos muestran una versión, la instalación es correcta.

4. Instalación del proyecto

4.1 Descargar o clonar el proyecto

Descargar el proyecto y descomprimirlo, o clonarlo desde el repositorio.

La carpeta del proyecto debe tener una estructura similar a:

TP2_Busqueda_IA_JavaScript/
4.2 Abrir el proyecto en Visual Studio Code

Abrir Visual Studio Code y seleccionar:

Archivo → Abrir carpeta

Luego seleccionar:

TP2_Busqueda_IA_JavaScript

También se puede abrir desde una terminal:

cd TP2_Busqueda_IA
code .

5. Instalar el proyecto con npm

Una vez abierta la carpeta del proyecto en Visual Studio Code, abrir una terminal:

Terminal → Nueva terminal

o mediante el atajo:

Ctrl + Ñ

Verificar que la terminal se encuentre ubicada dentro de la carpeta del proyecto.

Luego ejecutar:

npm install

Este comando lee el archivo:

package.json

y prepara el proyecto instalando las dependencias declaradas.

En este proyecto no se necesitan paquetes externos para ejecutar BFS ni A*, por lo que npm install no requiere instalar librerías adicionales.

Al ejecutar npm install, npm puede generar el archivo:

package-lock.json

y, cuando existen dependencias instaladas, la carpeta:

node_modules/

6. Estructura del proyecto

TP2_Busqueda_IA/
│
├── bfs.js
├── astar.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

bfs.js

Contiene la implementación del algoritmo Breadth-First Search (BFS).

astar.js

Contiene la implementación del algoritmo de búsqueda heurística A*.

package.json

Contiene la configuración del proyecto y los scripts utilizados para ejecutar los algoritmos.

package-lock.json

Registra la información de las dependencias gestionadas por npm.

.gitignore

Indica archivos y carpetas que no deben incorporarse al repositorio, como node_modules.

README.md

Contiene la documentación del proyecto, instalación, ejecución y explicación general.

7. Ejecución del algoritmo BFS

BFS corresponde a una estrategia de búsqueda exhaustiva.

Para ejecutarlo directamente con Node.js:

node bfs.js

También puede ejecutarse mediante el script definido en package.json:

npm run bfs

El programa solicitará:

Ingrese el punto inicial B:
Ingrese el punto objetivo A:

Por ejemplo:

Ingrese el punto inicial B: 0
Ingrese el punto objetivo A: 5

El programa mostrará la trayectoria encontrada, la cantidad de movimientos y la cantidad de nodos evaluados.

Ejemplo:

========== RESULTADO BFS ==========
Trayectoria encontrada: 0 -> 1 -> 2 -> 3 -> 4 -> 5
Cantidad de pasos/movimientos: 5
Nodos evaluados/expandidos: ...
===================================

8. Ejecución del algoritmo A*

A* corresponde a una estrategia de búsqueda heurística.

Para ejecutarlo directamente con Node.js:

node astar.js

También puede ejecutarse mediante npm:

npm run astar

El programa solicitará el punto inicial y el punto objetivo.

Por ejemplo:

Ingrese el punto inicial B: 0
Ingrese el punto objetivo A: 5

El resultado mostrará la trayectoria, cantidad de movimientos, nodos evaluados y costo total.

Ejemplo:

========== RESULTADO A* ==========
Trayectoria encontrada: 0 -> 1 -> 2 -> 3 -> 4 -> 5
Cantidad de pasos/movimientos: 5
Nodos evaluados/expandidos: ...
Costo total g(n): 5
==================================

9. Funcionamiento de la heurística

Para el algoritmo A* se utiliza:

f(n) = g(n) + h(n)

Donde:

g(n) representa el costo acumulado desde el estado inicial.
h(n) representa una estimación de la distancia hasta el objetivo.
f(n) representa el costo estimado total.

En este prototipo la heurística se calcula mediante la distancia horizontal:

h(n) = |objetivo - estado_actual|

Por ejemplo, si el robot se encuentra en 2 y el objetivo es 5:

h(2) = |5 - 2| = 3

Esta función permite orientar la búsqueda hacia el objetivo.

10. Relación con el problema industrial

El prototipo representa únicamente una simplificación del problema planteado para la línea de ensamblaje.

En el escenario real, el robot debe detectar una desviación respecto de la posición teórica y encontrar una nueva posición de montaje.

La búsqueda exhaustiva mediante BFS representa el proceso de exploración de diferentes posiciones mediante pequeños desplazamientos horizontales.

La búsqueda A* incorpora una función heurística para estimar qué estados se encuentran más próximos al objetivo.

En una implementación industrial completa existirían otros elementos, como información de los puntos de contacto, relieve de la superficie, coordenadas y desplazamientos en diferentes dimensiones. Estos elementos no forman parte de la implementación de este prototipo, que se limita al desplazamiento horizontal solicitado para el ejercicio.

11. Casos de prueba

Caso 1
Inicio: 0
Objetivo: 5

Resultado esperado:

0 -> 1 -> 2 -> 3 -> 4 -> 5
Caso 2
Inicio: 10
Objetivo: 4

Resultado esperado:

10 -> 9 -> 8 -> 7 -> 6 -> 5 -> 4
Caso 3
Inicio: -3
Objetivo: 2

Resultado esperado:

-3 -> -2 -> -1 -> 0 -> 1 -> 2
Caso 4: mismo punto inicial y objetivo
Inicio: 5
Objetivo: 5

En este caso el algoritmo debe reconocer que el objetivo ya fue alcanzado.

12. Comparación de los algoritmos
Característica	BFS	A*
Tipo de búsqueda	Exhaustiva	Heurística
Utiliza heurística	No	Sí
Explora estados	Por niveles	Según f(n)
Función utilizada	No requiere	f(n) = g(n) + h(n)
Objetivo del prototipo	Encontrar el camino	Orientar la búsqueda hacia el objetivo
Implementación	bfs.js	astar.js

En este problema simplificado, ambos algoritmos pueden encontrar una trayectoria hasta el objetivo. La diferencia principal está en la estrategia utilizada para seleccionar los estados que se exploran.

13. Comandos principales
Comando	Función
node --version	Verifica la versión de Node.js
npm --version	Verifica la versión de npm
npm install	Instala/prepara las dependencias del proyecto
node bfs.js	Ejecuta BFS
npm run bfs	Ejecuta BFS mediante npm
node astar.js	Ejecuta A*
npm run astar	Ejecuta A* mediante npm
14. Solución de problemas
Node.js no está instalado

Si al ejecutar:

node bfs.js

aparece un mensaje indicando que node no se reconoce como comando, es necesario instalar Node.js.

Después de instalarlo, cerrar y volver a abrir Visual Studio Code.

Verificar nuevamente:

node --version
npm install no funciona

Primero comprobar que la terminal está ubicada dentro de la carpeta del proyecto.

Se puede ejecutar:

dir

En Windows deberían aparecer archivos como:

bfs.js
astar.js
package.json
README.md

Luego ejecutar nuevamente:

npm install
No se encuentra package.json

Verificar que la terminal está abierta en la carpeta:

TP2_Busqueda_IA_JavaScript

El archivo package.json debe encontrarse en esa misma carpeta.

15. Conclusión

El proyecto implementa dos estrategias de búsqueda estudiadas en el módulo:

BFS, utilizada como estrategia de búsqueda exhaustiva.
A*, utilizada como estrategia de búsqueda heurística.

Ambas se aplican sobre un espacio de estados simplificado que representa el desplazamiento horizontal de un robot desde una posición inicial hasta una posición objetivo.

El objetivo del prototipo es mostrar de manera ejecutable cómo diferentes estrategias de búsqueda pueden abordar el problema planteado en el contexto de una línea de ensamblaje industrial.