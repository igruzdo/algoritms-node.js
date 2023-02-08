/*
Лепреконы в данной задаче появились по соображениям общей морали, так как грабить банки — нехорошо.

Вам удалось заключить неплохую сделку с лепреконами, поэтому они пустили вас в своё хранилище золотых слитков. 
Все слитки имеют единую пробу, то есть стоимость 1 грамма золота в двух разных слитках одинакова. В хранилище есть 
n слитков, вес i-го слитка равен wi кг. У вас есть рюкзак, вместимость которого M килограмм.

Выясните максимальную суммарную массу золотых слитков, которую вы сможете унести.

Формат ввода
В первой строке дано число слитков —– натуральное число n (1 ≤ n ≤ 1000) и вместимость рюкзака –— целое число M 
(0 ≤ M ≤ 104). Во второй строке записано n натуральных чисел wi (1 ≤ wi ≤ 104) -— массы слитков.

Формат вывода
Выведите единственное число — максимальную массу, которую можно забрать с собой.

Пример 1
Ввод	
5 15
3 8 1 2 5
Вывод
15
Пример 2
Ввод	
5 19
10 10 7 7 4
Вывод
18
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let bagWeight;
let picesOfGold;
let weightsOfGold = [];
let phase = 0;

rl.on('line', (input) => {
    if(phase === 0) {
        let parsedInput = input.split(' ').map(item => +item);
        picesOfGold = parsedInput[0];
        bagWeight = parsedInput[1];
    }

    if(phase === 1) {
        weightsOfGold = input.split(' ').map(item => +item);
        // rl.emit('close')
    }
    phase++
});

rl.on('close', () => {

    let result = knapsack(weightsOfGold, bagWeight);
    process.stdout.write(`${result}` + '\n');  
    
})


function knapsack(weights, capacity) {
    const n = weights.length;
    const dp = Array(capacity + 1).fill(0);
  
    for (let i = 0; i < n; i++) {
        for (let j = capacity; j >= weights[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - weights[i]] + weights[i]);
        }
    }
  
    return dp[capacity];
}