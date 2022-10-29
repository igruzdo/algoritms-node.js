/*
Нужно реализовать класс StackMax, который поддерживает операцию определения максимума среди всех элементов в стеке. 
Класс должен поддерживать операции push(x), где x – целое число, pop() и get_max().

Формат ввода
В первой строке записано одно число n — количество команд, которое не превосходит 10000. В следующих n строках 
идут команды. Команды могут быть следующих видов:

push(x) — добавить число x в стек;
pop() — удалить число с вершины стека;
get_max() — напечатать максимальное число в стеке;
Если стек пуст, при вызове команды get_max() нужно напечатать «None», для команды pop() — «error».

Формат вывода
Для каждой команды get_max() напечатайте результат её выполнения. Если стек пустой, для команды 
get_max() напечатайте «None». Если происходит удаление из пустого стека — напечатайте «error».
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let phase = 0;
let stack = [];

rl.on('line', (input) => {
    let string = input.split(' ');
    let comand = string[0];
    if(phase > 0) {
        switch (comand) {
            case 'get_max':
                if(stack.length === 0) {
                    process.stdout.write('None');
                    process.stdout.write('\n');
                } else {
                    process.stdout.write(Math.max(...stack).toString());
                    process.stdout.write('\n');
                }
                break
            case 'push':
                stack.push(parseInt(string[1]));
                break;
            case 'pop':
                if(stack.length === 0) {
                    process.stdout.write('error');
                    process.stdout.write('\n');
                } else {
                    stack.pop();
                }
                break
        }
    }
    phase++
});