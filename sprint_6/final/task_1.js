/*
-- УСЛОВИЕ ЗАДАЧИ --
Тимофей решил соединить все компьютеры в своей компании в единую сеть. Для этого он придумал построить минимальное остовное дерево, чтобы эффективнее использовать ресурсы.

Но от начальства пришла новость о том, что выделенный на сеть бюджет оказался очень большим и его срочно надо израсходовать. Поэтому Тимофея теперь интересуют не минимальные, а максимальные остовные деревья.

Он поручил вам найти вес такого максимального остовного дерева в неориентированном графе, который задаёт схему офиса.

Формат ввода
В первой строке дано количество вершин n и ребер m графа (1 ≤ n ≤ 1000, 0 ≤ m ≤ 100000).

В каждой из следующих m строк заданы рёбра в виде троек чисел u, v, w. u и v — вершины, которые соединяет это ребро. w — его вес ( 1 ≤ u, v ≤ n, 0 ≤ w ≤ 10000). В графе могут быть петли и кратные ребра. Граф может оказаться несвязным.

Формат вывода
Если максимальное остовное дерево существует, то выведите его вес. Иначе (если в графе несколько компонент связности) выведите фразу «Oops! I did it again».

Пример 1
Ввод	
4 4
1 2 5
1 3 6
2 4 8
3 4 3
Вывод
19
Пример 2
Ввод	
3 3
1 2 1
1 2 2
2 3 1
Вывод
3
Пример 3
Ввод	
2 0
Вывод
Oops! I did it again



-- ПРИНЦИП РАБОТЫ --
В данной работе был реализован алгоритм Прима с приоритетной очередью. Для этого пришлось реализовать класс с приоритетной очередью с просеиванием вниз и вверх.
Когда добавляем элемент в очередь - просеиваем вверх, удаляем - просеиваем вниз.
Сам алгоритм Прима реализован согласно теории из учебника:
- добавляем исходящие ребра в очередь и помечаем исходящую вершину как посещенную, удалив ее из мапы notAdded.
- извлекаем из очереди ребро с максимальным весом, добавляем все ребра из вершины конца добавленного ребра.
- и так по кругу, пока не закончатся ребра в очереди или не опустеет notAdded.
Если же после опустения очереди останутся вершины в notAdded, то граф считается несвязанным и выводится ошибка.


-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
    Не учитывая процесс ввода данных временная сложность O(|E| * lov|V|), где Е - ребра, V - вершины.
-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
    Так как нам нужно хранить весь граф, очередь, массив notAdded, то я бы оценил сложность в O(E + V). 
-- Посылка --
    https://contest.yandex.ru/contest/25070/run-report/80931731/
    Посылка немного отличается в нейминге меодов, так как я для понимания внес более понятные имена, в остальном всё 100% идентично. 
*/
class PriorityQueue {
  constructor() {
    this.heap = [];
  }
  /**
   * добавить ребро в приоритетную очередь
   * @param {[string, number]} edge - ребро с концом и весом
   * @returns {void}
   */
  enqueue(edge) {
    this.heap.push(edge);
    this._siftUp();
  }
  /**
   * извлечь ребро из приоритетной очереди с последующим удалением
   * @returns {[string, number]} - ребро с концом и весом
   */
  dequeue() {
    const max = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._siftDown();
    }
    return max;
  }
  /**
   * выполняет просеивание вверх
   * @returns {void}
   */
  _siftUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index][1] <= this.heap[parentIndex][1]) break;
      [this.heap[index], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[index],
      ];
      index = parentIndex;
    }
  }
  /**
   * выполняет просеивание вниз
   * @returns {void}
   */
  _siftDown() {
    let index = 0;
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swapIndex = null;

      if (leftChildIndex < this.heap.length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild[1] > this.heap[index][1]) {
          swapIndex = leftChildIndex;
        }
      }

      if (rightChildIndex < this.heap.length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swapIndex === null && rightChild[1] > this.heap[index][1]) ||
          (swapIndex !== null && rightChild[1] > leftChild[1])
        ) {
          swapIndex = rightChildIndex;
        }
      }

      if (swapIndex === null) break;
      [this.heap[index], this.heap[swapIndex]] = [
        this.heap[swapIndex],
        this.heap[index],
      ];
      index = swapIndex;
    }
  }
  /**
   * возвращает текущее количество элементов в очереди
   * @returns {number}
   */
  size() {
    return this.heap.length;
  }
}

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
});

let listNeighbors = {};
let phase = 0;

let numberV;
let numberE;
let notAdded = new Set();
let edges = new PriorityQueue();
const errorMessage = "Oops! I did it again";

rl.on("line", (input) => {
  if (phase === 0) {
    numberV = +input.split(" ")[0];
    numberE = +input.split(" ")[1];
    for (let i = 1; i <= numberV; i++) {
      notAdded.add(i);
    }
  }
  if (phase > 0 && phase <= numberE) {
    const parsedInputArray = input.split(" ");
    const parsedStart = +parsedInputArray[0];
    const parsedEnd = +parsedInputArray[1];
    const parsedUnputWeight = +parsedInputArray[2];

    if (parsedStart !== parsedEnd) {
      if (listNeighbors[parsedStart]) {
        const graph = listNeighbors[parsedStart];
        const weight = graph[parsedEnd];

        if (weight >= 0) {
          graph[parsedEnd] =
            weight < parsedUnputWeight ? parsedUnputWeight : weight;
        } else {
          graph[parsedEnd] = parsedUnputWeight;
        }
      } else {
        listNeighbors[parsedStart] = {
          [parsedEnd]: parsedUnputWeight,
        };
      }

      if (listNeighbors[parsedEnd]) {
        const graph = listNeighbors[parsedEnd];
        const weight = graph[parsedStart];

        if (weight >= 0) {
          graph[parsedStart] =
            weight < parsedUnputWeight ? parsedUnputWeight : weight;
        } else {
          graph[parsedStart] = parsedUnputWeight;
        }
      } else {
        listNeighbors[parsedEnd] = {
          [parsedStart]: parsedUnputWeight,
        };
      }
    }
  }

  if (phase >= numberE) {
    rl.emit("close");
  }
  phase++;
});

rl.on("close", () => {
  process.stdout.write(`${findMST()}`);
});

/**
 * @param {string} v - вершина графа
 * @returns {void}
 */
function addVertex(v) {
  notAdded.delete(+v);

  if (listNeighbors[v]) {
    let graph = listNeighbors[v];

    for (let key in graph) {
      if (notAdded.has(Number(key))) {
        edges.enqueue([key, graph[key]]);
      }
    }
  }
}

/**
 * @returns {number | `${errorMessage}`}
 */

function findMST() {
  let maximumSpanningWeight = 0;
  let v = 1;

  addVertex(v);

  while (notAdded.size > 0 && edges.size() > 0) {
    let e = edges.dequeue();

    if (notAdded.has(+e[0])) {
      maximumSpanningWeight += e[1];
      addVertex(e[0]);
    }
  }

  if (notAdded.size > 0) {
    return errorMessage;
  } else {
    return maximumSpanningWeight;
  }
}
