/*
На вход подается строка. Нужно определить длину наибольшей подстроки, которая не содержит повторяющиеся символы.

Формат ввода
Одна строка, состоящая из строчных латинских букв. Длина строки не превосходит 10 000.

Формат вывода
Выведите натуральное число —– ответ на задачу.

Пример 1
Ввод	
abcabcbb
Вывод
3
Пример 2
Ввод	
bbbbb
Вывод
1
*/



const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});
let max = 0;
rl.on('line', (input) => {
    let str = '';
    for(let i = 0; i< input.length; i++) {
        if(str.includes(input[i])) {
            str = str.slice(str.indexOf(input[i]) + 1) + input[i];
        } else {
            str = str + input[i]
        }
        max = str.length > max ? str.length : max;
    }
    process.stdout.write(`${max}`)
});
