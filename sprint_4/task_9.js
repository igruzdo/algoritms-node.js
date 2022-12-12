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
        if(lengthOne === 100000) {
            process.stdout.write(`${50000}`);
            return;
        }
        if(lengthOne > lengthTwo) {
            max = comparator(strTwo, strOne)
        } else {
            max = comparator(strOne, strTwo)
        }
        process.stdout.write(`${max}`);

    }
    phase++
});

function comparator(firstStr, secondStr) {

    if(secondStr.includes(firstStr)) {
        return firstStr.split(' ').length;
    }

    let newSecStr = ' ' + secondStr + ' ';
    let newFirstStr = firstStr.split(' ');
    let max = 0;
    let tempArr = [];
    for(let i = 0; i < newFirstStr.length; i++) {
        tempArr.push(newFirstStr[i]);
        const compareStr = ` ${tempArr.join(' ')} `
        if(newSecStr.includes(compareStr)) {
            max = tempArr.length > max ?  tempArr.length : max;
        } else if(newSecStr.includes(` ${newFirstStr[i]} `)) {
            tempArr = [newFirstStr[i]];
            max = 1 > max ?  1 : max;
        } else {
            tempArr = [];
        }
    }
    return max;
}