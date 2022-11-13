/* 
На клавиатуре старых мобильных телефонов каждой цифре соответствовало несколько букв. 
Примерно так:

2:'abc',
3:'def',
4:'ghi',
5:'jkl',
6:'mno',
7:'pqrs',
8:'tuv',
9:'wxyz'

Вам известно в каком порядке были нажаты кнопки телефона, без учета повторов. Напечатайте все комбинации 
букв, которые можно набрать такой последовательностью нажатий.

Формат ввода
На вход подается строка, состоящая из цифр 2-9 включительно. Длина строки не превосходит 10 символов.

Формат вывода
Выведите все возможные комбинации букв через пробел.
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

const dictioanary = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
}

const result = [];

rl.on('line', (input) => {
    let lettersArr = input.split('').map(item => dictioanary[item]);
    concatString('', lettersArr);
    process.stdout.write(`${result.join(' ')}`+'\n');
});

function concatString(str, arr) {
    if(arr.length > 1) {
        [...arr[0]].forEach(letter => {
           concatString(str + letter, arr.slice(1));
        })
    } else {
        [...arr[0]].forEach(letter => result.push(str + letter))
    }
}
