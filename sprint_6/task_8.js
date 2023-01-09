/*
Вам дан ориентированный граф. Известно, что все его вершины достижимы из вершины s=1. 
Найдите время входа и выхода при обходе в глубину, производя первый запуск из вершины s. 
Считайте, что время входа в стартовую вершину равно 0. Соседей каждой вершины обходите в 
порядке увеличения номеров.

Формат ввода
В первой строке дано число вершин n (1 ≤ n ≤ 2⋅ 105) и рёбер (0 ≤ m ≤ 2 ⋅ 105). В каждой 
из следующих m строк записаны рёбра графа в виде пар (from, to), 1 ≤ from ≤ n — начало 
ребра, 1 ≤ to ≤ n — его конец. Гарантируется, что в графе нет петель и кратных рёбер.

Формат вывода
Выведите n строк, в каждой из которых записана пара чисел tini, touti — время входа и 
выхода для вершины i.
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let listNeighbors = [];
let phase = 0;

let numberV;
let numberE;
let time = -1;
let color = [];
let entry = []
let leave  = []

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

        if(!color[parsedInputArray[0]]) {
            color[parsedInputArray[0]] = 'white';
        }
        if(!color[parsedInputArray[1]]) {
            color[parsedInputArray[1]] = 'white';
        }
    }

    // if(phase === numberE + 1) {
    //     start = +input;
    // }

    // if(phase >= numberE) {
    //     rl.emit('close')
    // }
    phase++
});

rl.on('close', () => {
    if(numberE === 0) {
        process.stdout.write(`0 1` + '\n');
    } else {
        DFS(1)
        for(let i = 1; i < entry.length; i++) {
            process.stdout.write(`${entry[i]} ${leave[i]}` + '\n');
        }
    }
})

function DFS(startVertex) {
    const stack = [];
    stack.push(startVertex);

    while(stack.length > 0) {
        const v = stack.pop()
        if(color[v] === 'white') {
            color[v] = 'gray';
            time += 1
            entry[v] = time;
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
            time += 1
            leave[v] = time;
        }
    }
}