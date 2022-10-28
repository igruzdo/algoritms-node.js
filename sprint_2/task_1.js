/*Алла получила задание, связанное с мониторингом работы различных серверов. Требуется понять, 
сколько времени обрабатываются определённые запросы на конкретных серверах. Эту информацию нужно хранить в матрице, 
где номер столбца соответствуют идентификатору запроса, а номер строки — идентификатору сервера. Алла перепутала 
строки и столбцы местами. С каждым бывает. Помогите ей исправить баг.

Есть матрица размера m × n. Нужно написать функцию, которая её транспонирует.

Транспонированная матрица получается из исходной заменой строк на столбцы.

Формат ввода
В первой строке задано число n — количество строк матрицы.
Во второй строке задано m — число столбцов, m и n не превосходят 1000. В следующих n строках задана матрица. 
Числа в ней не превосходят по модулю 1000.

Формат вывода
Напечатайте транспонированную матрицу в том же формате, который задан во входных данных. Каждая строка матрицы 
выводится на отдельной строке, элементы разделяются пробелами.

Пример 1
Ввод	
4
3
1 2 3
0 2 6
7 4 1
2 7 0
Вывод
1 0 7 2
2 2 4 7
3 6 1 0
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let phase = 0;
let rows;
let collumns;
let array;

let collumnsCount = 0;

rl.on('line', (input) => {
    if(phase === 0) {
        collumns = +input;
    }
    if(phase === 1) {
        rows = +input;
        array = Array(rows)
        for(let i = 0; i < rows; i++) {
            array[i] = Array(collumns)
        }
    }
    if(phase > 1 && phase <= 2 + collumns) {
        const str = input.split(' ')
        if(collumnsCount < collumns) {
            for(let i = 0; i < rows; i++) {
                array[i][collumnsCount] = str[i]
            }
            collumnsCount++
        }
    }
    phase++
});

rl.on('close', () => {
    array.forEach((item, index) => {
        if(index < array.length - 1) {
            process.stdout.write(item.join(' '));
            process.stdout.write('\n');
        } else {
            process.stdout.write(item.join(' '));
        }
    })
})