/*
-- УСЛОВИЕ ЗАДАЧИ --
В стране X есть n городов, которым присвоены номера от 1 до n. Столица страны имеет номер n. Между городами проложены железные дороги.

Однако дороги могут быть двух типов по ширине полотна. Любой поезд может ездить только по одному типу полотна. Условно один тип дорог помечают как R, 
а другой как B. То есть если маршрут от одного города до другого имеет как дороги типа R, так и дороги типа B, то ни один поезд не сможет по этому 
маршруту проехать. От одного города до другого можно проехать только по маршруту, состоящему исключительно из дорог типа R или только из дорог типа B.

Но это ещё не всё. По дорогам страны X можно двигаться только от города с меньшим номером к городу с большим номером. Это объясняет большой приток 
жителей в столицу, у которой номер n.

Карта железных дорог называется оптимальной, если не существует пары городов A и B такой, что от A до B можно добраться как по дорогам типа R, так 
и по дорогам типа B. Иными словами, для любой пары городов верно, что от города с меньшим номером до города с бОльшим номером можно добраться по 
дорогам только какого-то одного типа или же что маршрут построить вообще нельзя. Выясните, является ли данная вам карта оптимальной.

Формат ввода
В первой строке дано число n (1 ≤ n ≤ 5000) — количество городов в стране. Далее задана карта железных дорог в следующем формате.

Карта задана n-1 строкой. В i-й строке описаны дороги из города i в города i+1, i+2, ..., n. В строке записано n - i символов, каждый из которых 
либо R, либо B. Если j-й символ строки i равен «B», то из города i в город i + j идет дорога типа «B». Аналогично для типа «R».

Формат вывода
Выведите «YES», если карта оптимальна, и «NO» в противном случае.

Пример 1
Ввод	
3
RB
R

Вывод
NO

Пример 2
Ввод	
4
BBB
RB
B

Вывод
YES

Пример 3
Ввод	
5
RRRB
BRR
BR
R

Вывод
NO



-- ПРИНЦИП РАБОТЫ --
Всё просто до нельзя. Это обычны обход в глубину с модификацией. Если в процессе обхода встречаем серую вершину, то значит есть цикл, 
всё прерываем и выводим результат.
Если нет, то продолжаем обход и так по порядку по всем белым вершинам.
Вместо цветов хранил массив из цифр, чтобы памяти ело меньше: 0 - белый, 1 - серый, 2 - черный.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --consoleroutesNumber
    Временная сложность в худшем случае O(E + V), когда надо обойти все вершины и все ребра, обычно это происходит, когда цикла нет. Е - ребра, V - вершины.
-- АСИМПТОТИЧЕСКАЯ СЛОЖНОСТЬ --
    O(E + 2V), так как нужно хранить массив цветов, каждое ребро и исходящую вершину. 
-- Посылка --
    https://contest.yandex.ru/contest/25070/run-report/80955586/
*/

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
});

let listNeighbors = [];
let phase = 0;

let numberV;
let routesNumber;
let color = [];
let isCycle = false;
const messageErr = "NO";
const messageOK = "YES";

rl.on("line", (input) => {
  if (phase === 0) {
    numberV = +input;
    routesNumber = +input - 1;
    for (let i = 1; i <= numberV; i++) {
      color[i] = 0;
    }
  }
  if (phase > 0 && phase <= routesNumber) {
    const parsedInputArray = input.split("");

    for (let i = 0; i <= routesNumber - phase; i++) {
      if (parsedInputArray[i] === "B") {
        if (listNeighbors[phase]) {
          listNeighbors[phase].push(i + phase + 1);
        } else {
          listNeighbors[phase] = [i + phase + 1];
        }
      } else {
        if (listNeighbors[i + phase + 1]) {
          listNeighbors[i + phase + 1].push(phase);
        } else {
          listNeighbors[i + phase + 1] = [phase];
        }
      }
    }
  }

  if (phase >= routesNumber) {
    rl.emit("close");
  }
  phase++;
});

rl.on("close", () => {
  for (let i = 1; i < color.length; i++) {
    if (isCycle) break;

    if (color[i] === 0) {
      DFS(i);
    }
  }

  process.stdout.write(`${isCycle ? messageErr : messageOK}`);
});

function DFS(startVertex) {
  const stack = [];
  stack.push(startVertex);

  while (stack.length > 0 && !isCycle) {
    const v = stack.pop();

    if (color[v] === 0) {
      color[v] = 1;
      stack.push(v);

      if (listNeighbors[v]) {
        listNeighbors[v].forEach((neighbor) => {
          if (color[neighbor] === 0) {
            stack.push(neighbor);
            color[neighbor] === 1;
          } else if (color[neighbor] === 1) {
            isCycle = true;
            return;
          }
        });
      }
    } else if (color[v] === 1) {
      color[v] = 2;
    }
  }
}
