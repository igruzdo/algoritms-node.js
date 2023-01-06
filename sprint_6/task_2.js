/**
Алла успешно справилась с предыдущим заданием, и теперь ей дали новое. 
На этот раз список рёбер ориентированного графа надо переводить в матрицу смежности. 
Конечно же, Алла попросила вас помочь написать программу для этого.

Формат ввода
В первой строке дано число вершин n (1 ≤ n ≤ 100) и число рёбер m (1 ≤ m ≤ n(n-1)). В следующих
 m строках заданы ребра в виде пар вершин (u,v), если ребро ведет от u к v.

Формат вывода
Выведите матрицу смежности n на n. На пересечении i-й строки и j-го столбца стоит единица, 
если есть ребро, ведущее из i в j.
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let listNeighbors = [];
let phase = 0;

let numberOfEdges;
let numberOfPeaks;

rl.on('line', (input) => {
    if(phase === 0) {
        [numberOfPeaks, numberOfEdges] = input.split(' ').map(item => parseInt(item));
    }
    if(phase > 0) {
        const parsedInputArray = input.split(' ')
        if(listNeighbors[parsedInputArray[0]]) {
            listNeighbors[parsedInputArray[0]][parsedInputArray[1]] = 1;
        } else {
            let arr = [];
            arr[parsedInputArray[1]] = 1;
            listNeighbors[parsedInputArray[0]] = arr
        }   
    }

    // if(phase === numberOfEdges) {
    //     rl.emit('close')
    // }
    phase++
});

rl.on('close', () => {
    for(let i = 1; i <= numberOfPeaks; i++) {
        if(listNeighbors[i]) {
            let str = '';
            for(let j = 1; j <= numberOfPeaks; j++) {
                if(listNeighbors[i][j]) {
                    if(j === numberOfPeaks) {
                        str += '1'
                    } else {
                        str += '1 '
                    }
                } else {
                    if(j === numberOfPeaks) {
                        str += '0'
                    } else {
                        str += '0 '
                    }
                }
            }

            process.stdout.write(`${str}`+'\n');
        } else {
            let str = '';

            for(let j = 1; j <= numberOfPeaks; j++) {
                    if(j === numberOfPeaks) {
                        str += '0'
                    } else {
                        str += '0 '
                    }
            }
            process.stdout.write(`${str}`+'\n');
        }
    }
})