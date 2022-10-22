// Напишите программу, которая определяет, будет ли положительное целое число степенью четвёрки.

// Подсказка: степенью четвёрки будут все числа вида 4n, где n – целое неотрицательное число.

// Формат ввода
// На вход подаётся целое число в диапазоне от 1 до 10000.

// Формат вывода
// Выведите «True», если число является степенью четырёх, «False» –— в обратном случае.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let number;

rl.on('line', (input) => {
    number = parseInt(input)
});

rl.on('close', () => {
    process.stdout.write((Math.log(number) / Math.log(4)) % 1 === 0 ? 'True' : 'False');
})