/*
Вы приехали на архипелаг Алгосы (наконец-то!). Здесь есть n достопримечательностей. 
Ваша лодка может высадить вас у одной из них, забрать у какой-то другой, возможно, той же самой 
достопримечательности и увезти на материк.

Чтобы более тщательно спланировать свой маршрут, вы хотите узнать расстояния между каждой 
парой достопримечательностей Алгосов. Некоторые из них соединены мостами, по которым вы можете 
передвигаться в любую сторону. Всего мостов m.

Есть вероятность, что карта архипелага устроена так, что нельзя добраться от какой-то одной 
достопримечательности до другой без использования лодки.

Найдите кратчайшие расстояния между всеми парами достопримечательностей.

Формат ввода
В первой строке даны числа n (1 ≤ n ≤ 100) и m (0 ≤ m ≤ n (n-1)/2). В следующих m строках описаны мосты. 
Каждый мост задаётся номерами двух достопримечательностей 1 ≤ u, v ≤ n и длиной дороги 1 ≤ L ≤ 103.

Формат вывода
Выведите матрицу n × n кратчайших расстояний. На пересечении i-й строки и j-го столбца должно стоять 
расстояние от i-й до j-й достопримечательности. Если между какой-то парой нет пути, то в соответствующей клетке поставьте -1.
Пример 1
Ввод	
4 4
1 2 1
2 3 3
3 4 5
1 4 2
Вывод
0 1 4 2 
1 0 3 3 
4 3 0 5 
2 3 5 0 
Пример 2
Ввод	
3 2
1 2 1
1 2 2
Вывод
0 1 -1 
1 0 -1 
-1 -1 0 
Пример 3
Ввод	
2 0
Вывод
0 -1 
-1 0 
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let listNeighbors = [];
let phase = 0;

let numberV;
let numberE;
let previous = [];
let dist = [];
let vertices = [];
let visited = [];

rl.on('line', (input) => {
    if(phase === 0) {
        numberV = +input.split(' ')[0]
        numberE = +input.split(' ')[1]
        for(let i = 1; i <= numberV; i++) {
            vertices[i] = false;
        }
    }
    if(phase > 0 && phase <= numberE) {
        const parsedInputArray = input.split(' ')
        if(listNeighbors[parsedInputArray[0]]) {
            let edge = listNeighbors[parsedInputArray[0]].find(item => item.vertex === parsedInputArray[1]);
            if(edge) {
                edge.weight = parsedInputArray[2] < edge.weight ? parsedInputArray[2] : edge.weight;
            } else {
                listNeighbors[parsedInputArray[0]].push({
                    vertex: +parsedInputArray[1],
                    weight: +parsedInputArray[2],
                }) 
            }
        } else {
            listNeighbors[parsedInputArray[0]] = [{
                vertex: +parsedInputArray[1],
                weight: +parsedInputArray[2],
            }]
        }

        if(listNeighbors[parsedInputArray[1]]) {
            let edge = listNeighbors[parsedInputArray[1]].find(item => item.vertex === parsedInputArray[0]);
            if(edge) {
                edge.weight = parsedInputArray[2] < edge.weight ? parsedInputArray[2] : edge.weight;
            } else {
                listNeighbors[parsedInputArray[1]].push({
                    vertex: +parsedInputArray[0],
                    weight: +parsedInputArray[2],
                }) 
            }
        } else {
            listNeighbors[parsedInputArray[1]] = [{
                vertex: +parsedInputArray[0],
                weight: +parsedInputArray[2],
            }]
        }
    }

    if(phase >= numberE) {
        rl.emit('close')
    }
    phase++
});

rl.on('close', () => {
    for(let i = 1; i <= numberV; i++) {
        process.stdout.write(`${Dijkstra(i).join(' ')}` + '\n');
    }
})


function relax(u, v) {
    let weight = listNeighbors[u].find(el => el.vertex === v).weight;
    if(dist[v] > dist[u] + weight) {
        dist[v] = dist[u] + weight;
        previous[v] = u 
    }
}

function getMinDistNotVisitedVertex() {
    let currentMinimum = Infinity;
    let currentMinimumVertex = null;

    for(let i = 1; i <= numberV; i++) {
        if(!visited[i] && (dist[i] < currentMinimum)) {
            currentMinimum = dist[i];
            currentMinimumVertex = i;
        }
    }
    return currentMinimumVertex;
}

function Dijkstra(s) {
    for(let i = 1; i <= numberV; i++) {
        dist[i] = Infinity;
        previous[i] = null;
        visited[i] = false;
    }

    dist[s] = 0;

    while(isUnvisitedVExist()) {
        let u = getMinDistNotVisitedVertex();
        visited[u] = true;
        let neighbours = listNeighbors[u];
        if(neighbours) {
            neighbours.forEach(v => {
                relax(u, v.vertex)
            })
        }
    }
    return dist.splice(1).map(el => el === Infinity ? -1 : el);
}

function isUnvisitedVExist() {
    let res = false;
    for(let i = 1; i < visited.length; i++) {
        if(visited[i] === false && dist[i] !== Infinity) {
            res = true;
            break; 
        }
    }
    return res;
}