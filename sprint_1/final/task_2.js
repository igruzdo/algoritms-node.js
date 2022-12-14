/*B. Ловкость рук
Ограничение времени	1 секунда
Ограничение памяти	64Mb
Ввод	стандартный ввод или input.txt
Вывод	стандартный вывод или output.txt
Игра «Тренажёр для скоростной печати» представляет собой поле из клавиш 4x4. В нём на каждом раунде появляется конфигурация цифр и точек.
На клавише написана либо точка, либо цифра от 1 до 9.

В момент времени t игрок должен одновременно нажать на все клавиши, на которых написана цифра t. Гоша и Тимофей могут нажать в один момент 
времени на k клавиш каждый. Если в момент времени t нажаты все нужные клавиши, то игроки получают 1 балл.

Найдите число баллов, которое смогут заработать Гоша и Тимофей, если будут нажимать на клавиши вдвоём.



Формат ввода
В первой строке дано целое число k (1 ≤ k ≤ 5).

В четырёх следующих строках задан вид тренажёра –— по 4 символа в каждой строке. Каждый символ —– либо точка, либо цифра от 1 до 9. Символы 
одной строки идут подряд и не разделены пробелами.

Формат вывода
Выведите единственное число –— максимальное количество баллов, которое смогут набрать Гоша и Тимофей.

Пример 1
Ввод	
3
1231
2..2
2..2
2..2
Вывод
2
Пример 2
Ввод	
4
1111
9999
1111
9911
Вывод
1
Пример 3
Ввод	Вывод
4
1111
1111
1111
1111
Вывод
0

ссылка на отчет в контесте https://contest.yandex.ru/contest/22450/run-report/73031562/
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let phase = 0;
let fingers;
let str = '';
let result = 0;
const dictionary = Array(8)

rl.on('line', (input) => {
    if(phase === 0) {
        fingers = +input * 2;
    }
    if(phase > 0) {
        str += input
    }
    phase++
});

rl.on('close', () => {
    [...str].forEach(item => {
        if(item !== '.') {
            const value =  dictionary[item]
            value ? dictionary[item] = value + 1  : dictionary[item] = 1;
        }
    })

    dictionary.forEach(value => {
        value <= fingers ? result++ : null
    })

    process.stdout.write(result.toString());
})