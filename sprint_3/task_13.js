/*
Задача повышенной сложности

На каждом острове в архипелаге Алгосы живёт какое-то количество людей или же остров необитаем 
(тогда на острове живёт 0 людей). Пусть на i-м острове численность населения составляет ai. 
Тимофей захотел найти медиану среди всех значений численности населения.

Определение: Медиана (https://ru.wikipedia.org/wiki/Медиана_(статистика)) массива чисел a_i —– 
это такое число, что половина чисел из массива не больше него, а другая половина не меньше. 
В общем случае медиану массива можно найти, отсортировав числа и взяв среднее из них. 
Если количество чисел чётно, то возьмём в качестве медианы полусумму соседних средних чисел, 
(a[n/2] + a[n/2 + 1])/2.

У Тимофея уже есть отдельно данные по северной части архипелага и по южной, причём значения 
численности населения в каждой группе отсортированы по неубыванию.

Определите медианную численность населения по всем островам Алгосов.

Подсказка: Если n –— число островов в северной части архипелага, а m –— в южной, то ваше решение 
должно работать за .

Формат ввода
В первой строке записано натуральное число n, во второй —– натуральное число m. Они не превосходят 10 000.

Далее в строку через пробел записаны n целых неотрицательных чисел, каждое из которых не превосходит 10 000, 
–— значения численности населения в северной части Алгосов.

В последней строке через пробел записаны m целых неотрицательных чисел, каждое из которых не превосходит 10 000 
–— значения численности населения в южной части Алгосов.

Значения в третьей и четвёртой строках упорядочены по неубыванию.

Формат вывода
Нужно вывести одной число — найденную медиану.
*/



const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});
let phase = 0;
let lengthOne;
let lengthTwo;
let arrayOne;
let arrayTwo;
let result;

rl.on('line', (input) => {
    if(phase === 0) {
        lengthOne = parseInt(input);
    }
    if(phase === 1) {
        lengthTwo = parseInt(input);
    }
    if(phase === 2) {
        arrayOne = input.split(' ').map(item => parseInt(item));
    }
    if(phase === 3) {
        arrayTwo = input.split(' ').map(item => parseInt(item));
        result = findMediane();
        console.log(result);
    }
    phase++
});

function findMediane() {
    let arr = [...arrayOne, ... arrayTwo].sort((a, b) => a - b);
    let medianIdx = Math.ceil((lengthOne + lengthTwo - 2) / 2);
    let isEven = (lengthOne + lengthTwo) % 2 === 0;
    return isEven ? (parseInt(arr[medianIdx]) + parseInt(arr[medianIdx + 1])) / 2 : parseInt(arr[medianIdx]);
}

// function findMediane() {

//     let isEven = (lengthOne + lengthTwo) % 2 === 0;
//     let medianIdx = Math.ceil((lengthOne + lengthTwo - 2) / 2);

//     if(lengthOne + lengthTwo === 3) return [...arrayOne, ...arrayTwo].sort((a,b) => a - b)[1];

//     if(arrayOne[0] >= arrayTwo[lengthTwo - 1]) {
//         if(medianIdx === lengthTwo - 1) {
//             return isEven ? (arrayTwo[lengthTwo - 1] + arrayOne[0]) / 2 : arrayTwo[lengthTwo - 1];
//         } else if(medianIdx < lengthTwo - 1) {
//             return isEven ? (arrayTwo[medianIdx] + arrayTwo[medianIdx - 1]) / 2 : arrayTwo[medianIdx];
//         } else {
//             return isEven ? (arrayOne[medianIdx - lengthTwo] + arrayOne[medianIdx - lengthTwo - 1]) / 2 : arrayOne[medianIdx - lengthTwo];
//         }
//     } else if(arrayTwo[0] >= arrayOne[lengthOne - 1]) {
//         if(medianIdx === lengthOne - 1) {
//             return isEven ? (arrayOne[lengthOne - 1] + arrayTwo[0]) / 2 : arrayOne[lengthOne - 1];
//         } else if(medianIdx < lengthOne - 1) {
//             // console.log('medianIdx', medianIdx);

//             return isEven ? (arrayOne[medianIdx] + arrayOne[medianIdx - 1]) / 2 : arrayOne[medianIdx];
//         } else {
//             return isEven ? (arrayTwo[medianIdx - lengthOne] + arrayTwo[medianIdx - lengthOne - 1]) / 2 : arrayTwo[medianIdx - lengthOne];
//         }
//     } else {
//         let startOne = 0;
//         let endOne = lengthOne - 1;

//         while(endOne - startOne > 1) {

//             let middle = Math.ceil((endOne + startOne) / 2);
//             let valueOne = arrayOne[middle];
//             let valueTwoPrev = arrayTwo[medianIdx - middle - 1];
//             let valueTwoNext = arrayTwo[medianIdx - middle];
            
//             console.log('valueOne', valueOne);
//             console.log('valueTwoPrev', valueTwoPrev);
//             console.log('valueTwoNext', valueTwoNext);
//             console.log('middle', middle);

//             if(valueTwoPrev <= valueOne && valueTwoNext >= valueOne) {
//                 console.log('special 1');
//                 const res = [valueOne, valueTwoNext, valueTwoPrev].sort((a, b) => a - b)
//                 return isEven ? (res[1] + res[2]) / 2 : res[1];
//             } else if(valueTwoPrev === valueOne && valueTwoNext === valueOne) {
//                 return valueOne;
//             } else if (valueTwoPrev < valueOne && valueTwoNext < valueOne) {
//                 endOne = middle;
//             } else if(valueTwoPrev > valueOne && valueTwoNext > valueOne) {
//                 startOne = middle;
//             }
//         }
//     }
// }


rl.on('close', () => {
    process.stdout.write(`${result}`);
})