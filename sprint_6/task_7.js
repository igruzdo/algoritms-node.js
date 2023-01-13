/*
Под расстоянием между двумя вершинами в графе будем понимать длину кратчайшего пути между ними в рёбрах. 
Для данной вершины s определите максимальное расстояние от неё до другой вершины неориентированного графа.

Формат ввода
В первой строке дано количество вершин n (1 ≤ n ≤ 105) и рёбер m (0 ≤ m ≤ 105). Далее в m строках описаны 
рёбра графа. Каждое ребро описывается номерами двух вершин u и v (1 ≤ u, v ≤ n). В 
последней строке дан номер вершины s (1 ≤ s ≤ n). Гарантируется, что граф связный и что в нём нет петель и кратных рёбер.

Формат вывода
Выведите длину наибольшего пути от s до одной из вершин графа.
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
let color = [];
let distance = [];
let previous = [];

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

    if(phase > numberE) {
        rl.emit('close')
    }
    phase++
});

rl.on('close', () => {
    process.stdout.write(`${BFS(start)}`);
})

function BFS(s) {
    const planned  = new Queque();
    planned.push(s);
    color[s] = 'gray';
    distance[s] = 0;
    let max = 0;
    
    while(planned.getSize() > 0) {
        const u = planned.pop();
        if(listNeighbors[u]) {
            listNeighbors[u].sort((a, b) => a - b).forEach(neighbor => {
                if(color[neighbor] === 'white') {
                    distance[neighbor] = distance[u] + 1;
                    max = max > distance[neighbor] ? max : distance[neighbor];
                    previous[neighbor] = u;
                    color[neighbor] = 'gray';
                    planned.push(neighbor);
                }
            });
        }
        color[u] = 'black';
    }
    return max;
}



class Queque {
    constructor(start = null, end = null) {
        this.start = start;
        this.end = end;
        this.counter = 0;
    }

    getSize() {
        return this.counter;
    }

    push(value) {
        if(this.start && this.end) {
            let newItem = {
                value,
                prev: null,
                next: this.end,
            }
            this.end.prev = newItem;
            this.end = newItem;
            this.counter++;
        } else {
            let newItem = {
                value,
                prev: null,
                next: null,
            }
            this.end = newItem;
            this.start = newItem;
            this.counter++;
        }
    }

    pop() {
        if(this.counter === 1) {
            let value = this.start.value;
            this.start = null;
            this.end = null;
            this.counter--;
            return value;
        } else {
            let value = this.start.value;
            this.start = this.start.prev;
            this.start.next = null;
            this.counter--;
            return value;
        }
    }
}
