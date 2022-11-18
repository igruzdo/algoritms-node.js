/*
Вечером ребята решили поиграть в игру «Большое число».
Даны числа. Нужно определить, какое самое большое число можно из них составить.

Формат ввода
В первой строке записано n — количество чисел. Оно не превосходит 100.
Во второй строке через пробел записаны n неотрицательных чисел, каждое из которых не превосходит 1000.

Формат вывода
Нужно вывести самое большое число, которое можно составить из данных чисел.

Пример 1
Ввод	
3
15 56 2
Вывод
56215
Пример 2
Ввод	
3
1 783 2
Вывод
78321
Пример 3
Ввод	
5
2 4 5 2 10
Вывод
542210


*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});
let phase = 0;
let length = 0;
let arr;

rl.on('line', (input) => {
    if(phase === 0) {
        length = parseInt(input);
    }
    if(phase === 1) {
        arr = sorting(input.split(' '))
        console.log(arr)
    }
    phase++
});

function sorting(arr) {
    return arr.sort((a, b) => {
        let first = a + b;
        let second = b + a;
        return second - first;
    });
}


rl.on('close', () => {
    process.stdout.write(`${arr.join('')}`);
});