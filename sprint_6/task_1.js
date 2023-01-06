/**
 * Алла пошла на стажировку в студию графического дизайна, где ей дали такое задание: для очень большого числа 
 * ориентированных графов преобразовать их список рёбер в список смежности. Чтобы побыстрее решить эту задачу, 
 * она решила автоматизировать процесс.

Помогите Алле написать программу, которая по списку рёбер графа будет строить его список смежности.

Формат ввода
В первой строке дано число вершин n (1 ≤ n ≤ 100) и число ребер m (1 ≤ m ≤ n(n-1)). В следующих m строках заданы 
ребра в виде пар вершин (u,v), если ребро ведет от u к v.

Формат вывода
Выведите информацию о рёбрах, исходящих из каждой вершины.

В строке i надо написать число рёбер, исходящих из вершины i, а затем перечислить вершины, в которые ведут эти 
рёбра –— в порядке возрастания их номеров.
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let listNeighbors = [];
let phase = 0;

let number;

rl.on('line', (input) => {
    // if(phase === 0) {
    //     number = +input.split(' ')[1]
    // }
    if(phase > 0) {
        const parsedInputArray = input.split(' ')
        if(listNeighbors[parsedInputArray[0]]) {
            listNeighbors[parsedInputArray[0]].push(parsedInputArray[1])
        } else {
            listNeighbors[parsedInputArray[0]] = [parsedInputArray[1]]
        }   
    }

    // if(phase === number) {
    //     rl.emit('close')
    // }
    phase++
});

rl.on('close', () => {
    for(let i = 1; i < listNeighbors.length; i++) {
        if(listNeighbors[i]) {
            process.stdout.write(`${listNeighbors[i].length} `);
            process.stdout.write(`${listNeighbors[i].sort((a, b) => a - b).join(' ')}`+'\n');
        } else {
            process.stdout.write(`0` +'\n');
        }
    }
})