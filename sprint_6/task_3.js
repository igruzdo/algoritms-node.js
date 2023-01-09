/*
Задан неориентированный граф. Обойдите с помощью DFS все вершины, достижимые из заданной вершины s, и выведите их 
в порядке обхода, если начинать обход из s.

Формат ввода
В первой строке дано количество вершин n (1 ≤ n ≤ 105) и рёбер m (0 ≤ m ≤ 105). Далее в m строках описаны рёбра 
графа. Каждое ребро описывается номерами двух вершин u и v (1 ≤ u, v ≤ n). В последней строке дан номер стартовой 
вершины s (1 ≤ s ≤ n). В графе нет петель и кратных рёбер.

Формат вывода
Выведите вершины в порядке обхода, считая что при запуске от каждой конкретной вершины её соседи будут 
рассматриваться в порядке возрастания (то есть если вершина 2 соединена с 1 и 3, то сначала обход пойдёт 
 в 1, а уже потом в 3).
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let listNeighbors = [];
let phase = 0;

let numberV;
let numberE;
let start;
let color = []

rl.on('line', (input) => {
    if(phase === 0) {
        numberV = +input.split(' ')[0]
        numberE = +input.split(' ')[1]
    }
    if(phase > 0 && phase <= numberE) {
        const parsedInputArray = input.split(' ')
        if(listNeighbors[parsedInputArray[0]]) {
            listNeighbors[parsedInputArray[0]].push(+parsedInputArray[1])
        } else {
            listNeighbors[parsedInputArray[0]] = [+parsedInputArray[1]]
        }

        if(listNeighbors[parsedInputArray[1]]) {
            listNeighbors[parsedInputArray[1]].push(+parsedInputArray[0])
        } else {
            listNeighbors[parsedInputArray[1]] = [+parsedInputArray[0]]
        }

        if(!color[parsedInputArray[0]]) {
            color[parsedInputArray[0]] = 'white';
        }
        if(!color[parsedInputArray[1]]) {
            color[parsedInputArray[1]] = 'white';
        }
    }

    if(phase === numberE + 1) {
        start = +input;
    }

    // if(phase > numberE) {
    //     rl.emit('close')
    // }
    phase++
});

rl.on('close', () => {
    process.stdout.write(`${DFS(start)} `);
})

function DFS(startVertex) {
    const stack = [];
    stack.push(startVertex);
    let str = '';
    if(listNeighbors.length === 0 || !listNeighbors[startVertex]) {
        return `${startVertex}`
    }

    while(stack.length > 0) {
        const v = stack.pop()
        if(color[v] === 'white') {
            color[v] = 'gray';
            str += `${v} `
            stack.push(v);
            if(listNeighbors[v]) {
                listNeighbors[v].sort((a, b) => b - a).forEach(neighbor => {
                    if(color[neighbor] === 'white') {
                        stack.push(neighbor)
                    }
                })
            }
        } else if(color[v] === 'gray') {
            color[v] = 'black';
        }
    }
    return str;
}