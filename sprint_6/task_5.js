/*
Вам дан неориентированный граф. Найдите его компоненты связности.

Формат ввода
В первой строке дано количество вершин n (1≤ n ≤ 105) и рёбер m (0 ≤ m ≤ 2 ⋅ 105). В каждой из следующих 
m строк записано по ребру в виде пары вершин 1 ≤ u, v ≤ n.

Гарантируется, что в графе нет петель и кратных рёбер.

Формат вывода
Выведите все компоненты связности в следующем формате: в первой строке выведите общее количество компонент.

Затем на отдельных строках выведите вершины каждой компоненты, отсортированные по возрастанию номеров. 
Компоненты между собой упорядочивайте по номеру первой вершины.

Пример 1
Ввод	
6 3
1 2
6 5
2 3
Вывод
3
1 2 3 
4 
5 6 
Пример 2
Ввод	
2 0
Вывод
2
1 
2 
Пример 3
Ввод	
4 3
2 3
2 1
4 3
Вывод
1
1 2 3 4 
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
        for(let i = numberV; i > 0; i--) {
            color[i] = 'white';
        }
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
    }

    if(phase >= numberE) {
        rl.emit('close')
    }
    phase++
});

rl.on('close', () => {
    let res = [];
    for(let i = 1; i <= numberV; i++) {
        if(color.includes('white')) {
            let str = DFS(i);
            str.sort((a, b) => a - b)
            if(str.length > 0) {
                res.push(str);
            }
        } else {
            break;
        }
    }
    process.stdout.write(`${res.length}` + `\n`);
    res.forEach(item => {
        process.stdout.write(`${item.join(' ')}` + `\n`);
    })
})

function DFS(startVertex) {
    const stack = [];
    stack.push(startVertex);
    let str = [];
    if(listNeighbors.length === 0 || !listNeighbors[startVertex]) {
        return [startVertex];
    }

    while(stack.length > 0) {
        const v = stack.pop()
        if(color[v] === 'white') {
            color[v] = 'gray';
            str.push(v)
            stack.push(v);
            if(listNeighbors[v]) {
                listNeighbors[v].forEach(neighbor => {
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
