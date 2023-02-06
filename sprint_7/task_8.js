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

Ввод	
2 3
101
110
Вывод
3
Пример 2
Ввод	
3 3
100
110
001
Вывод
2
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let steps;
let maxJump;
let phase = 0;
let field = [];
let n;
let m;

rl.on('line', (input) => {
    if(phase === 0) {
        let parsedInput = input.split(' ').map(item => +item);
        n = parsedInput[0];
        m = parsedInput[1];
    }

    if(phase >= 1) {
        field.push(input.split(''));
    }

    // if(phase === n) {
    //     rl.emit('close')
    // }
    phase++
});

rl.on('close', () => {
    if(n === 1 & m === 1) {
        process.stdout.write(`${field[0][0]}`);   
    } else {
        let result = maxFlower(field.reverse());
        process.stdout.write(`${result}`);  
    }
  
})


function maxFlower(field) {
    
    let n = field.length;
    let m = field[0].length;
    let dp = Array(n + 1)
      .fill(0)
      .map(() =>  Array(m + 1).fill(0));

    // console.log('field', field);
    // console.log('dp', dp);
  
    for (let i = 1; i <= n ; i++) {
        // console.log('i++++++++++++++++++++', i);
      for (let j = 1; j <= m; j++) {
        
        // console.log('j-------------------', j);
        // console.log('field[i - 1][j - 1]', +field[i - 1][j - 1]);
        // console.log('dp[i - 1][j]', dp[i - 1][j]);
        // console.log('dp[i][j - 1]', dp[i][j - 1]);

        dp[i][j] = +field[i - 1][j - 1] + Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }

    // console.log('dp', dp);
  
    return dp[n][m];
}