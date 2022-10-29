/* 
Вот какую задачу Тимофей предложил на собеседовании одному из кандидатов. Если вы с ней ещё не сталкивались, 
то наверняка столкнётесь –— она довольно популярная.

Дана скобочная последовательность. Нужно определить, правильная ли она.

Будем придерживаться такого определения:

пустая строка —– правильная скобочная последовательность;
правильная скобочная последовательность, взятая в скобки одного типа, –— правильная скобочная последовательность;
правильная скобочная последовательность с приписанной слева или справа правильной скобочной последовательностью 
—– тоже правильная.
На вход подаётся последовательность из скобок трёх видов: [], (), {}.
Напишите функцию is_correct_bracket_seq, которая принимает на вход скобочную последовательность и возвращает True,
если последовательность правильная, а иначе False.

Формат ввода
На вход подаётся одна строка, содержащая скобочную последовательность. Скобки записаны подряд, без пробелов.

Формат вывода
Выведите «True» или «False».
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let str;
let counter = [0, 0, 0]

rl.on('line', (input) => {
    str = [...input]
});

rl.on('close', () => {
    for(let i = 0; i < str.length; i++) {
        switch (str[i]) {
            case '[':
                counter[0] = counter[0] + 1;
                break;
            case '{':
                counter[1] = counter[1] + 1;
                break;
            case '(':
                counter[2] = counter[2] + 1;
                break;
            case ']':
                if((counter[0] - 1) < 0 || ['{', '('].includes(str[i - 1])) {
                    process.stdout.write("False");
                    return;
                }
                counter[0] = counter[0] - 1;
                break;
            case '}':
                if((counter[1] - 1) < 0 || ['[', '('].includes(str[i - 1])) {
                    process.stdout.write("False");
                    return;
                }
                counter[1] = counter[1] - 1;
                break;
            case ')':
                if((counter[2] - 1) < 0 || ['{', '['].includes(str[i - 1])) {
                    process.stdout.write("False");
                    return;
                }
                counter[2] = counter[2] - 1;
                break;
        }
    }

    if(counter.every(item => item === 0)) {
        process.stdout.write("True");
    } else {
        process.stdout.write("False");
    }
})