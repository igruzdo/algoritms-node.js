/*
Дан ациклический ориентированный граф (так называемый DAG, directed acyclic graph). Найдите его топологическую 
сортировку, то есть выведите его вершины в таком порядке, что все рёбра графа идут слева направо. У графа может 
быть несколько подходящих перестановок вершин. Вам надо найти любую топологическую сортировку.

Формат ввода
В первой строке даны два числа – количество вершин n (1 ≤ n ≤ 105) и количество рёбер m (0 ≤ m ≤ 105). В каждой 
из следующих m строк описаны рёбра по одному на строке. Каждое ребро представлено парой вершин (from, to), 1≤ from, 
to ≤ n, соответственно номерами вершин начала и конца.

Формат вывода
Выведите номера вершин в требуемом порядке.

Пример 1
Ввод	
5 3
3 2
3 4
2 5
Вывод
1 3 2 4 5
Пример 2
Ввод	
6 3
6 4
4 1
5 1
Вывод
2 3 5 6 4 1
Пример 3
Ввод	Вывод
4 0
Вывод
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
let time = -1;
let color = [];
let entry = [];
let order = [];

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
    for(let i = 1; i <= numberV; i++) {
        topSort(i)
    }
    let res = entry.sort((a, b) => a.time - b.time).map(item => item.v)
    process.stdout.write(`${res.join(' ')}`);
})

function topSort(startVertex) {
    const stack = [];
    stack.push(startVertex);

    while(stack.length > 0) {
        const v = stack.pop()
        time += 1
        entry[v] = {v, time};
        if(listNeighbors[v]) {
            listNeighbors[v].forEach(neighbor => {
                stack.push(neighbor)
            })
        }
        order.push(v)
    }
}