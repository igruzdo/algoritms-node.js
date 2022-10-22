// Вася реализовал функцию, которая переводит целое число из десятичной системы в двоичную. 
// Но, кажется, она получилась не очень оптимальной.

// Попробуйте написать более эффективную программу.

// Не используйте встроенные средства языка по переводу чисел в бинарное представление.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let number;

rl.on('line', (input) => {
    number = parseInt(input).toString(2)
});

rl.on('close', () => {
    process.stdout.write(number);
})