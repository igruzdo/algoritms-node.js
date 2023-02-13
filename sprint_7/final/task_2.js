/*
-- УСЛОВИЕ ЗАДАЧИ --
На Алгосах устроили турнир по настольному теннису. Гоша выиграл n партий, получив при этом некоторое количество 
очков за каждую из них.

Гоше стало интересно, можно ли разбить все заработанные им во время турнира очки на две части так, чтобы сумма 
в них была одинаковой.

Формат ввода
В первой строке записано целое число n (0 ≤ n ≤ 300) –— количество выигранных партий.

Во второй строке через пробел записано n целых неотрицательных чисел, каждое из которых не превосходит 300 –— 
заработанные в партиях очки.

Формат вывода
Нужно вывести True, если произвести такое разбиение возможно, иначе —– False

Пример 1
Ввод	
4
1 5 7 1
Вывод
True

Пример 2
Ввод	
3
2 10 9
Вывод
False


-- ПРИНЦИП РАБОТЫ --
    В каждой последующей ячейке мы проверяем значение по следующему условию:
    Если сумма больше рассматриваемого числа из списка чисел, то проверяем предыдущее значение в динамическом массиве. 
    Если возможно получить разницу текущего элемента и расматриваемой суммы используя набор чисел (от 0 до i), 
    то значит получить сумму j тоже возможно.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
    O(n*summ) в худшем случае, где summ - целевая сумма.
-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
   O(summ) - массив всегда будет размером не больше summ.
-- Посылка --
    https://contest.yandex.ru/contest/25597/run-report/82171686/
*/

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
});

let length;
let numberArray;
let phase = 0;
const failMsg = 'False';
const successMsg = 'True';

rl.on("line", (input) => {

if (phase === 0) {
    length = +input;
    }

  if (phase === 1) {
    numberArray = input.split(" ").map(item => +item);
  }

  phase++;
});

rl.on("close", () => {
    canSplit(length, numberArray);
});

/**
 * функция поиска ответа можно ли разделить массив на две части с одинаковой суммой
 * @param {number} n  - длина массива чисел
 * @param {Array<number>} points  - массив с числами
 * @returns {void}
 */

function canSplit(n, points) {
    const target = points.reduce((a, b) => a + b) / 2;
    if (target % 1 !== 0) {
        process.stdout.write(`${failMsg}` + "\n");
        return;
    }
    const dp = Array(target + 1).fill(false);
    dp[0] = true;

    for (let i = 0; i < n; i++) {
        for (let j = target; j >= points[i]; j--) {
            dp[j] = dp[j] || dp[j - points[i]];
        }
    }

    process.stdout.write(`${dp[target] ? successMsg : failMsg}` + "\n");
}
