/*
Гоша любит играть в игру «Подпоследовательность»: даны 2 строки, и нужно понять, является ли первая из них 
подпоследовательностью второй. Когда строки достаточно длинные, очень трудно получить ответ на этот вопрос, 
просто посмотрев на них. Помогите Гоше написать функцию, которая решает эту задачу.

Формат ввода
В первой строке записана строка s.

Во второй —- строка t.

Обе строки состоят из маленьких латинских букв, длины строк не превосходят 150000. Строки не могут быть пустыми.

Формат вывода
Выведите True, если s является подпоследовательностью t, иначе —– False.
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let str = [];
let phase = 0;

rl.on('line', (input) => {
    str.push(input)
    if(phase === 1) {
        const result = isStrTrue(str[0], str[1]);
        process.stdout.write(`${result}`);
    }
    phase++
});

// function isStrTrue(strOne, strTwo) {
//     if(strOne.length > strTwo.length) {
//         return 'False';
//     }
//     const indx = strTwo.indexOf(strOne[0]);
//     if(indx >= 0) {
//         if(strOne.length === 1) {
//             return 'True';
//         } else {
//             return isStrTrue(strOne.slice(1), strTwo.slice(indx + 1))
//         }
//     } else {
//         return 'False';
//     }
// }

function isStrTrue(strOne, strTwo) {
    let newStr = strTwo;
    for(let char of strOne) {
        const indx = newStr.indexOf(char);

        if(indx < 0) {
            return 'False';
        }

        newStr = newStr.slice(indx + 1);

        if((newStr.length < newStr.length)) {
            return 'False';
        }
    }
    return 'True';
}

rl.on('close', () => {
    process.stdout.write(`${isStrTrue(str[0], str[1])}`);
})