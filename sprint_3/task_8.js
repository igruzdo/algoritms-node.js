/*
Формат ввода
В первой строке дано количество студентов в списке —– n (1 ≤ n ≤ 15 000).

Во второй строке через пробел записаны n целых чисел —– ID вуза каждого студента. Каждое из чисел находится в диапазоне от 0 до 10 000.

В третьей строке записано одно число k.

Формат вывода
Выведите через пробел k ID вузов с максимальным числом участников. Они должны быть отсортированы по убыванию популярности (по количеству 
гостей от конкретного вуза). Если более одного вуза имеет одно и то же количество учащихся, то выводить их ID нужно в порядке возрастания.

Пример 1
Ввод	
7
1 2 3 1 2 3 4
3
Вывод
1 2 3
Пример 2
Ввод	Вывод
6
1 1 1 2 2 3
Вывод
1

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});
let phase = 0;
let length = 0;
let k = 0;
const result = [];
let map = new Map();
let arr;


rl.on('line', (input) => {
    if(phase === 0) {
        length = parseInt(input);
    }
    if(phase === 1) {
        input.split(' ').forEach(item => {
            if(map.has(item)) {
                map.set(item, map.get(item) + 1);
            } else {
                map.set(item, 1);
            }
        });
    }
    if(phase === 2) {
        k = parseInt(input);
        arr = [...map.entries()].sort((a, b) => b[1] - a[1]);

        for(let i = 0; i < k; i++) {
            result.push(arr[i][0]);
        }
    }
    phase++
});

rl.on('close', () => {
    process.stdout.write(`${result.join(' ')}`);
});