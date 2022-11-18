/* 
Рита по поручению Тимофея наводит порядок в правильных скобочных последовательностях (ПСП), состоящих только из круглых скобок (). 
Для этого ей надо сгенерировать все ПСП длины 2n в алфавитном порядке —– алфавит состоит из ( и ) и открывающая скобка идёт раньше 
закрывающей.

Помогите Рите —– напишите программу, которая по заданному n выведет все ПСП в нужном порядке.

Рассмотрим второй пример. Надо вывести ПСП из четырёх символов. Таких всего две:

(())
()()
(()) идёт раньше ()(), так как первый символ у них одинаковый, а на второй позиции у первой ПСП стоит (, который идёт раньше ).
Формат ввода
На вход функция принимает n — целое число от 0 до 10.

Формат вывода
Функция должна напечатать все возможные скобочные последовательности заданной длины в алфавитном 
(лексикографическом) порядке.


Пример 1
Ввод	
3
Вывод
((()))
(()())
(())()
()(())
()()()
Пример 2
Ввод
Вывод
2
(())
()()
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let number;

rl.on('line', (input) => {
    number = parseInt(input);
    // let res = getBracketsArray(number).filter(item => item.length === number*2);
    let res = getBracketsArray(number * 2, '');
    // console.log(res)
    // for(let i = 1; i < number; i++) {
    //     res.push(...getBracketsArray(i), ...getBracketsArray(number - i))
    // }
    // res = [...new Set([...res])]
    // process.stdout.write(`${res.join('\n')}`);
    // process.stdout.write(`${res.length}`);
});

// function getBracketsArray(steps) {

//     if(steps === 1) {
//         return ['()']
//     } else {
//         let result = [];

//         for(let i = 1; i < steps; i++) {
//             let first = getBracketsArray(i);
//             // console.log('first', first)
//             first.forEach(item => {
//                 result.push(`(${item})`, `${item}()`, `()${item}`)
//             })
//             let second = getBracketsArray(steps - i);
//             // console.log('second', second)
//             second.forEach(item => {
//                 result.push(`(${item})`, `${item}()`, `()${item}`)
//             })

//             first.forEach(firstItem => {
//                 second.forEach(secondItem => {
//                     result.push(firstItem.concat(secondItem));
//                 })
//             })
//         }
//         return [...new Set([...result.sort()])];
//     }
// }

function getBracketsArray(steps, prefix) {

    if(steps === 0) {
        console.log(prefix)
    } else {
        getBracketsArray(steps - 1, prefix + '(');
        getBracketsArray(steps - 1, prefix + ')');
    }
}