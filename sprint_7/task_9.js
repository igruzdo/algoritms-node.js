/*
Теперь черепашке Кондратине надо узнать не только, сколько цветочков она может собрать, но и как ей построить свой маршрут 
для этого. Помогите ей!

Напомним, что Кондратине надо дойти от левого нижнего до правого верхнего угла, а передвигаться она умеет только вверх и вправо.

Формат ввода
В первой строке даны размеры поля n и m (через пробел). Оба числа лежат в диапазоне от 1 до 1000. В следующих n строках задано 
поле. Каждая строка состоит из m символов 0 или 1 и завершается переводом строки. Если в клетке записана единица, то в ней растет 
цветочек.

Формат вывода
Выведите в первой строке максимальное количество цветочков, которое сможет собрать Кондратина. Во второй строке выведите маршрут 
в виде последовательности символов «U» и «R», где «U» означает передвижение вверх, а «R» – передвижение вправо.

Если возможных оптимальных путей несколько, то выведите любой.

Пример 1
Ввод	
2 3
101
110
Вывод
3
URR
Пример 2
Ввод	
3 3
100
110
001
Вывод
2
UURR
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

    if(phase === n) {
        rl.emit('close')
    }
    phase++
});

rl.on('close', () => {
    if(n === 1 & m === 1) {
        process.stdout.write(`${field[0][0]}`);   
    } else {
        let result = maxFlower(field.reverse());
        process.stdout.write(`${result.max}` + '\n');  
        process.stdout.write(`${result.path.join('')}` + '\n');  
    }
})


function maxFlower(field) {
    
    let n = field.length;
    let m = field[0].length;
    let path = [];
    let dp = Array(n + 1)
      .fill(0)
      .map(() =>  Array(m + 1).fill(0));

  
    for (let i = 1; i <= n ; i++) {
      for (let j = 1; j <= m; j++) {
        dp[i][j] = +field[i - 1][j - 1] + Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }

    let newN = n;
    let newM = m;


    while(newN !== 1 || newM !== 1) {

        if(newN === 1 || dp[newN - 1][newM] < dp[newN][newM - 1]) {
            path.push('R');
            newM--
        } else {
            path.push('U');
            newN--
        }
    }

    return {
        max: dp[n][m],
        path: path.reverse(),
    };
}