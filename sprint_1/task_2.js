//Представьте себе онлайн-игру для поездки в метро: игрок нажимает на кнопку, 
// и на экране появляются три случайных числа. Если все три числа оказываются одной 
// чётности, игрок выигрывает.
// Напишите программу, которая по трём числам определяет, выиграл игрок или нет.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let result;

rl.on('line', (input) => {
    let values = input.split(" ").map(item => parseInt(item) % 2 === 0);
    result = [...new Set(values)].length === 1 ? "WIN" : 'FAIL'
});

rl.on('close', () => {
    process.stdout.write(result.toString());
})