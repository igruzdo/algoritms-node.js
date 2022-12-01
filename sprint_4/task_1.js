/*
Алле очень понравился алгоритм вычисления полиномиального хеша. Помогите ей написать функцию, вычисляющую хеш строки s. 
В данной задаче необходимо использовать в качестве значений отдельных символов их коды в таблице ASCII.

Полиномиальный хеш считается по формуле:

Формат ввода
В первой строке дано число a (1 ≤ a ≤ 1000) –— основание, по которому считается хеш.

Во второй строке дано число m (1 ≤ m ≤ 109) –— модуль.

В третьей строке дана строка s (0 ≤ |s| ≤ 106), состоящая из больших и маленьких латинских букв.
*/



const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});
let phase = 0;
let base;
let mod;
let summ = 0;

rl.on('line', (input) => {
    if(phase === 0) {
        base = parseInt(input);
    }
    if(phase === 1) {
        mod = parseInt(input);
    }

    if(phase === 2) {
        let str = [...input];

        if(str.length === 2) {
            summ = str[0].charCodeAt(0) * base + str[1].charCodeAt(0);
            process.stdout.write(`${summ % mod}`);
            return;
        }

        if(str.length === 1) {
            process.stdout.write(`${str[0].charCodeAt(0) % mod}`);
            return;
        }

        if(str.length === 0) {
            process.stdout.write(`0`);
            return;
        }
        summ = str[0].charCodeAt(0) * base + str[1].charCodeAt(0);
        for(let i = 2; i < str.length; i++) {
            summ = (summ % mod) * base + str[i].charCodeAt(0);
        }

        process.stdout.write(`${summ % mod}`);
    }
    phase++
});