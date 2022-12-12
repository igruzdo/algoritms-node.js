/*
Гоша увлёкся хоккеем и часто смотрит трансляции матчей. Чтобы более-менее разумно оценивать силы команд, он сравнивает очки, набранные во всех матчах каждой командой.

Гоша попросил вас написать программу, которая по результатам игр двух выбранных команд найдёт наибольший по длине отрезок матчей, когда эти команды зарабатывали одинаковые очки.

Рассмотрим первый пример:

Результаты первой команды: [1 2 3 2 1].

Результаты второй команды: [3 2 1 5 6].

Наиболее продолжительный общий отрезок этих массивов имеет длину 3 –— это [3 2 1].

Формат ввода
В первой строке находится число n (1 ≤ n ≤ 105) –— количество матчей, которые были сыграны первой командой.

Во второй строке записано n целых чисел –— очки в этих играх.

В третьей строке дано число m (1 ≤ m ≤ 105) —– количество матчей, которые сыграла вторая команда.

В четвертой строке заданы m целых чисел —– результаты второй команды.

Число очков, заработанных в одной игре, лежит в диапазоне от 0 до 255.

Формат вывода
Выведите целое неотрицательное число —– максимальное количество матчей подряд, в которых команды зарабатывали одинаковые очки.

Пример 1
Ввод	
5
1 2 3 2 1
5
3 2 1 5 6

Вывод
3
Пример 2
Ввод	
5
1 2 3 4 5
3
4 5 9

Вывод
2
*/



const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});
let phase = 0;
let lengthOne;
let lengthTwo;
let strOne;
let strTwo;

rl.on('line', (input) => {
    if(phase === 0) {
        lengthOne = parseInt(input);
    }
    if(phase === 1) {
        strOne = input;
    }
    if(phase === 2) {
        lengthTwo = parseInt(input);
    }
    if(phase === 3) {
        strTwo = input;
    }
    if(phase === 3) {
        let max;
        if(lengthOne > lengthTwo) {
            max = comparator(strTwo, strOne)
        } else {
            max = comparator(strOne, strTwo)
        }
        // console.log(max)
        process.stdout.write(`${max}`);

    }
    phase++
});

function comparator(firstStr, secondStr) {
    // console.log('firstStr', firstStr)
    // console.log('secondStr', secondStr)

    let start = 0;
    let finish = 0;
    let max = 0;
    for(let i = 0; i < firstStr.length; i++) {
        if(firstStr[i + 1] === ' ' || i === firstStr.length  - 1) {
            // console.log('pice', firstStr.slice(start, i + 1).split(''))

            if(secondStr.includes(firstStr.slice(start, i + 1))) {
                // console.log('yes!!!')
                finish = i;
                max = (finish - start) > max ? (finish - start) : max;
            } else {
                if(firstStr[i] !== ' ') {
                    start = i;
                    finish = i;
                }
            }
            // console.log('start', start)
            // console.log('finish', finish)
            // console.log('max', max)
        }
    }
    return (max) - (max/2) + 1;
}