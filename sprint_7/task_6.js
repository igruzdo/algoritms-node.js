/*
Алла хочет доказать, что она умеет прыгать вверх по лестнице быстрее всех. На этот раз соревнования будут проходить на 
специальной прыгательной лестнице. С каждой её ступеньки можно прыгнуть вверх на любое расстояние от 1 до k. Число k придумывает 
Алла.

Гоша не хочет проиграть, поэтому просит вас посчитать количество способов допрыгать от первой ступеньки до n-й. Изначально 
все стоят на первой ступеньке.

Формат ввода
В единственной строке даны два числа — n и k (1 ≤ n ≤ 1000, 1 ≤ k ≤ n).

Формат вывода
Выведите количество способов по модулю 109 + 7.

Пример 1
Ввод	
6 3
Вывод
13
Пример 2
Ввод	
7 7
Вывод
32
Пример 3
Ввод	
2 2
Вывод
1
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let steps;
let maxJump;

rl.on('line', (input) => {
    const paseData = input.split(' ');
    steps = +paseData[0];
    maxJump = +paseData[1];
    rl.emit('close');
});

rl.on('close', () => {
    let result = scheduleTasks(steps, maxJump);
    process.stdout.write(`${result}`);    
})


function scheduleTasks(steps, maxjump) {
    
    let arrayOfResults = Array(steps);
    arrayOfResults[steps - 1] = 1;

    for(let j = 1; j < steps; j++) {
        let result = 0;
        for(let i = 1; i <= maxjump; i++) {
            if(steps - j + i > arrayOfResults.length) {
                break;
            }

            if(arrayOfResults[steps - j + i - 1]) {

                result += arrayOfResults[steps - j + i - 1]
            }
        }
        arrayOfResults[steps - j - 1] = result % 1000000007;
    }

    return arrayOfResults[0];
}