/* 
Получить число фибоначи и вывести последние n цифр в консоль.
*/
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let str;

rl.on('line', (input) => {
    str = input.split(' ').map(n => +n);
});

function fibonachiRemains(steps, modN) {
    if(steps <= 1) return 1;
    let a = 1;
    let b = 2;
    let mod = Math.pow(10, modN)

    for(let i = steps; i > 2; i--) {
        [a, b] = [Math.floor(b % mod), Math.floor(a % mod + b % mod)];
    }
    return b;
}

rl.on('close', () => {
    let resultNumber = fibonachiRemains(str[0], str[1]);
    let result = resultNumber.toString();
    if(result.length <= str[1]) {
        process.stdout.write(`${result}`);
        process.stdout.write(`\n`);
    } else {
        process.stdout.write(`${result.slice(1)}`);
        process.stdout.write(`\n`);
    }
})