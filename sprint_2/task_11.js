/* 
Решить задачу фибоначи. На вход получаем номер числа по порядку, на выход отдать число фибоначи.
*/
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let str;

rl.on('line', (input) => {
    str = parseInt(input)
});

function fibonachi(steps) {
    let counter = 2;
    if(steps <= 1) return 1;
    let result = summ(1, 1);
    function summ(a, b) {
        if(counter === steps) {
            return a + b;
        } else {
            counter++
            return summ(b, a + b);
        }
    }

    return result;
}

rl.on('close', () => {
    process.stdout.write(`${fibonachi(str)}`);
})