# TP2 - Inteligencia Artificial 

##  Universidad Siglo 21

Implementación ejecutable de los métodos:

- **BFS (Breadth-First Search)**: búsqueda exhaustiva/no informada.
- **A\***: búsqueda heurística.

El prototipo representa cada posición horizontal como un estado numérico.
Cada movimiento representa un pequeño desplazamiento horizontal `ΔH`.

```text
B = 0
A = 5

0 -> 1 -> 2 -> 3 -> 4 -> 5
```

## 1. Relación con la situación problemática

La situación plantea una línea industrial de montaje de motores donde una
pequeña desviación puede impedir el montaje correcto de una pieza.

Para el TP2 se simplifica el problema y se representa solamente el
desplazamiento horizontal.

La información del relieve y de las coordenadas de contacto pertenece al
escenario real. En este prototipo esa información se representa de forma
simplificada mediante estados numéricos y, en A*, mediante una heurística.

---

## 2. BFS - Búsqueda en Anchura

BFS explora los estados por niveles y utiliza una cola FIFO.

Proceso:

1. Coloca el estado inicial en la cola.
2. Extrae el primer estado.
3. Comprueba si es el objetivo.
4. Genera los estados vecinos.
5. Los agrega al final de la cola.
6. Continúa hasta encontrar el objetivo.

Como todos los movimientos del prototipo tienen el mismo costo, BFS encuentra
una trayectoria con la menor cantidad de movimientos.

Se utiliza porque el robot no conoce inicialmente si debe desplazarse hacia
la izquierda o hacia la derecha.

---

## 3. A* - Búsqueda heurística

A* utiliza:

```text
f(n) = g(n) + h(n)
```

Donde:

- `g(n)`: costo acumulado desde el inicio.
- `h(n)`: estimación del costo restante.
- `f(n)`: costo estimado total.

La heurística utilizada en el prototipo es:

```text
h(n) = |objetivo - estado_actual|
```

Representa la distancia horizontal restante hasta el objetivo.

En un sistema real, la información del relieve y las coordenadas de contacto
podrían utilizarse para orientar esta estimación. Aquí se utiliza una
representación simplificada porque el profesor limita el prototipo al
movimiento horizontal.

---

## 4. Estructura

```text
TP2_Busqueda_IA/
├── bfs.js
├── astar.js
├── package.json
├── .gitignore
└── README.md
```

No se necesitan dependencias externas.

---

## 5. Requisitos

Instalar Node.js.

Comprobar:

```bash
npm --version
```

Instalar:

```bash
npm install
```

---

## 6. Ejecución

### BFS

```bash
node bfs.js
```

También:

```bash
npm run bfs
```

El programa solicita:

```text
Ingrese el punto inicial B: 0
Ingrese el punto objetivo A: 5
```

Y muestra:

```text
========== RESULTADO BFS ==========
Trayectoria encontrada: 0 -> 1 -> 2 -> 3 -> 4 -> 5
Cantidad de pasos/movimientos: 5
Nodos evaluados/expandidos: ...
===================================
```

### A*

```bash
node astar.js
```

También:

```bash
npm run astar
```

Ejemplo:

```text
Ingrese el punto inicial B: 0
Ingrese el punto objetivo A: 5
```

Salida:

```text
========== RESULTADO A* ==========
Trayectoria encontrada: 0 -> 1 -> 2 -> 3 -> 4 -> 5
Cantidad de pasos/movimientos: 5
Nodos evaluados/expandidos: ...
Costo total g(n): 5
==================================
```

Los valores de nodos evaluados deben tomarse de la ejecución real del programa.

---

## 7. Pruebas sugeridas

### Prueba 1

```text
Inicial: 0
Objetivo: 5
```

### Prueba 2

```text
Inicial: 10
Objetivo: 4
```

Resultado esperado de trayectoria:

```text
10 -> 9 -> 8 -> 7 -> 6 -> 5 -> 4
```

### Prueba 3

```text
Inicial: -3
Objetivo: 2
```

Resultado esperado:

```text
-3 -> -2 -> -1 -> 0 -> 1 -> 2
```

### Prueba 4

```text
Inicial: 5
Objetivo: 5
```

No se requieren movimientos.

---

## 8. Métricas mostradas

Ambos programas informan:

- Trayectoria encontrada.
- Cantidad de pasos/movimientos.
- Nodos evaluados/expandidos.

A* además informa:

- Costo total `g(n)`.

Estas métricas permiten comparar el comportamiento de ambos métodos.

---

## 9. Comparación

| Característica | BFS | A* |
|---|---|---|
| Tipo | Exhaustiva | Heurística |
| Usa heurística | No | Sí |
| Usa `g(n)` | No explícitamente | Sí |
| Usa `h(n)` | No | Sí |
| Función `f(n)` | No | `g(n)+h(n)` |
| Estructura | Cola FIFO | Lista de abiertos/cerrados |
| Prototipo | Movimiento horizontal | Movimiento horizontal |

En este prototipo todos los movimientos tienen el mismo costo y la heurística
de A* representa la distancia horizontal al objetivo.

---

## 10. Relación con el problema industrial

El prototipo no controla un robot industrial real. Representa el proceso de
búsqueda de una posición correcta dentro de un espacio de estados.

```text
Situación real:
Posición inicial
      ↓
Información del robot
      ↓
Evaluación de posiciones
      ↓
Búsqueda
      ↓
Posición objetivo
```

```text
Prototipo:
Punto inicial
      ↓
Estados horizontales
      ↓
BFS / A*
      ↓
Trayectoria
      ↓
Punto objetivo
```

La diferencia es que el sistema real requeriría integrar la información de
medición/contacto correspondiente, mientras que el prototipo utiliza números
para representar las posiciones.

---

## 11. Evidencia para la entrega

Se recomienda ejecutar ambos algoritmos y tomar capturas donde se vea:

1. Punto inicial ingresado.
2. Punto objetivo ingresado.
3. Trayectoria encontrada.
4. Cantidad de movimientos.
5. Nodos evaluados/expandidos.
6. En A*, costo `g(n)`.

Esto sirve como evidencia de que los algoritmos fueron realmente
implementados y ejecutados.

---

## 12. Comandos rápidos

```bash
node bfs.js
node astar.js
```

o:

```bash
npm run bfs
npm run astar
```