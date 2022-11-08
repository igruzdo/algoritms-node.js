/*
-- УСЛОВИЕ ЗАДАЧИ --
Задание связано с обратной польской нотацией. Она используется для парсинга арифметических выражений. Еще её иногда называют постфиксной нотацией.

В постфиксной нотации операнды расположены перед знаками операций.

Пример 1:
3 4 +
означает 3 + 4 и равно 7

Пример 2:
12 5 /
Так как деление целочисленное, то в результате получим 2.

Пример 3:
10 2 4 * -
означает 10 - 2 * 4 и равно 2

реализовать калькулятор с обратной польской нотацией

-- ПРИНЦИП РАБОТЫ --
1. Парсим строку от пользователя и создаем массив операндов;
2. Пробегаемся по массиву-строке от пользователя: если элемент - число, то добавляем его в массив операндов, если это математический оператор - берем два элемента из
массива операндов и делаем с ними соответствующие действия, записываем результат действия в массив операндов.
3. После завершения цикла - возвращаем результат.
4. Proffit

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
сложность O(n), пробегаемся по строке всего один раз

-- Посылка --
    https://contest.yandex.ru/contest/22781/run-report/74179784/
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

rl.on('line', (input) => {
    let string = input.split(' ');
    let operandStak = [];

    for(let i = 0; i < string.length; i ++) {
        switch (string[i]) {
            case '*':
            case '+':
            case '-':
                let oneBase = operandStak.pop();
                let twoBase = operandStak.pop();
                let str = `${twoBase} ${string[i]} ${oneBase}`

                operandStak.push(eval(str));
                break;
            case '/':
                let one = operandStak.pop();
                let two = operandStak.pop();
                
                operandStak.push(Math.floor(two / one));
                break;
            default: 
                operandStak.push(string[i]);
                break;
        }
    }
    operandStak.length > 1 ? process.stdout.write(`${operandStak[operandStak.length - 1]}`) : process.stdout.write(`${operandStak[0]}`);
});
