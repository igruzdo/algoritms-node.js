/*
У Гоши есть любимое число S. Помогите ему найти все уникальные четвёрки чисел в массиве, которые в сумме дают заданное число S.

Формат ввода
В первой строке дано общее количество элементов массива n (0 ≤ n ≤ 1000).

Во второй строке дано целое число S  .

В третьей строке задан сам массив. Каждое число является целым и не превосходит по модулю 109.

Формат вывода
В первой строке выведите количество найденных четвёрок чисел.

В последующих строках выведите найденные четвёрки. Числа внутри одной четверки должны быть упорядочены по возрастанию. 
Между собой четвёрки упорядочены лексикографически.

Пример 1
Ввод	
8
10
2 3 2 4 1 10 3 0
Вывод
3
0 3 3 4
1 2 3 4
2 2 3 3
Пример 2
Ввод	
6
0
1 0 -1 0 2 -2
Вывод
3
-2 -1 1 2
-2 0 0 2
-1 0 0 1
Пример 3
Ввод	
5
4
1 1 1 1 1
Вывод
1
1 1 1 1
*/



const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});
let phase = 0;
let lengthOne;
let searchSumm;
let array;
const triples = [];


rl.on('line', (input) => {
    if(phase === 0) {
        lengthOne = parseInt(input);
    }
    if(phase === 1) {
        searchSumm = parseInt(input);
    }
    if(phase === 2) {
        array = input.split(' ').sort((a, b) => a - b);

        for(let m = 0; m < lengthOne - 3; m++) {
            let history = new Set()
            for(let i = m + 1; i < array.length - 1; i++) {
                for(let j = i + 1; j < array.length; j++) {
                    let targret = searchSumm - array[m] - array[i] - array[j];
                    if(history.has(`${targret}`)) {
                        const res = [array[m], targret, array[i],  array[j]]
                        triples[res.join(' ')] = res;
                    }
                }
                history.add(array[i])
            }
        }

        const res = Object.values(triples);
        res.sort((a, b) => {
            if(a[0] !== b[0]) {
                return a[0] - b[0]
            } else if(a[1] !== b[1]) {
                return a[1] - b[1]
            } else if(a[2] !== b[2]) {
                return a[2] - b[2]
            } else {
                return a[3] - b[3]
            }
        })


        process.stdout.write(`${res.length}` + '\n');

        res.forEach(item => {
            process.stdout.write(`${item.join(' ')}` + '\n');
        })

    }

    phase++
});