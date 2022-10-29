/*
Реализуйте класс StackMaxEffective, поддерживающий операцию определения максимума среди элементов в стеке. 
Сложность операции должна быть O(1). Для пустого стека операция должна возвращать None. При этом push(x) и 
pop() также должны выполняться за константное время.

Формат ввода
В первой строке записано одно число — количество команд, оно не превосходит 100000. Далее идут команды по 
одной в строке. Команды могут быть следующих видов:

push(x) — добавить число x в стек;
pop() — удалить число с вершины стека;
get_max() — напечатать максимальное число в стеке;
Если стек пуст, при вызове команды get_max нужно напечатать «None», для команды pop — «error».
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
let max = [];

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
                    process.stdout.write(`${max[max.length - 1]}`);
                    process.stdout.write('\n');
                }
                break
            case 'push':
                let number = parseInt(string[1]);
                if(max.length === 0 || number >= max[max.length - 1]) max.push(number);
                stack.push(number);
                console.log('stak', stack)
                console.log('max', max)
                break;
            case 'pop':
                if(stack.length === 0) {
                    process.stdout.write('error');
                    process.stdout.write('\n');
                } else {
                    let lastValue = stack.pop();
                    if(lastValue === max[max.length - 1]) max.pop();
                }
                console.log('stak', stack)
                console.log('max', max)
                break
        }
    }
    phase++
});
