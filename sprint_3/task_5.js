/*
Тимофей решил купить несколько домов на знаменитом среди разработчиков Алгосском архипелаге. 
Он нашёл n объявлений о продаже, где указана стоимость каждого дома в алгосских франках. 
А у Тимофея есть k франков. Помогите ему определить, какое наибольшее количество домов на 
Алгосах он сможет приобрести за эти деньги.

Формат ввода
В первой строке через пробел записаны натуральные числа n и k.

n — количество домов, которые рассматривает Тимофей, оно не превосходит 100000;

k — общий бюджет, не превосходит 100000;

В следующей строке через пробел записано n стоимостей домов. Каждое из чисел не превосходит 100000. 
Все стоимости — натуральные числа.

Формат вывода
Выведите одно число —– наибольшее количество домов, которое может купить Тимофей.
*/


const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let str = [];
let phase = 0;
let budget;
let houseNumbers;
let prices;
let counter = 0;

rl.on('line', (input) => {
    if(phase === 0) {
        budget = parseInt(input.split(' ')[1]);
        houseNumbers = parseInt(input.split(' ')[0]);
    }
    if(phase === 1) {
        prices = input.split(' ').sort((a, b) => a - b);
        console.log(prices);

        for(let i = 0; i < houseNumbers; i++) {
            if(parseInt(prices[i]) <= budget) {
                counter++;
                budget -= prices[i];
            } else {
                break;
            }
        }

        console.log(counter)
    }
    phase++
});


rl.on('close', () => {
    process.stdout.write(`${counter}`);
})