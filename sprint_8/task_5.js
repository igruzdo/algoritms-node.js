/*
У Риты была строка s, Гоша подарил ей на 8 марта ещё n других строк ti, 1≤ i≤ n. Теперь Рита думает, куда их лучше поставить. 
Один из вариантов —– расположить подаренные строки внутри имеющейся строки s, поставив строку ti сразу после символа строки s 
с номером ki (в частности, если ki=0, то строка вставляется в самое начало s).

Помогите Рите и определите, какая строка получится после вставки в s всех подаренных Гошей строк.

Формат ввода
В первой строке дана строка s. Строка состоит из строчных букв английского алфавита, не бывает пустой и её длина не превышает 105 символов.

Во второй строке записано количество подаренных строк — натуральное число n, 1 ≤ n ≤ 105.

В каждой из следующих n строк через пробел записаны пары ti и ki. Строка ti состоит из маленьких латинских букв и не бывает пустой. 
ki — целое число, лежащее в диапазоне от 0 до |s|. Все числа ki уникальны. Гарантируется, что суммарная длина всех строк ti не превосходит 105.

Формат вывода
Выведите получившуюся в результате вставок строку.
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let phase = 0;
let mainStr;
let numberOfAddStrings;
let addStringsArr = [];
let result = '';
let usedNumber = 0;

rl.on('line', (input) => {
    if(phase === 0) {
        mainStr = input;
    }

    if(phase === 1) {
        numberOfAddStrings = +input;
        addStringsArr = Array(numberOfAddStrings);
    }

    if(phase > 1 && usedNumber < numberOfAddStrings) {
        const parsedStr = input.split(' ');
        addStringsArr.push({
            index: +parsedStr[1],
            text: parsedStr[0]
        })
        usedNumber++
    }

    if(usedNumber === numberOfAddStrings) {
        rl.emit('close')
    }
    phase++
});

rl.on('close', () => {
    let prevIdx = 0;
    addStringsArr.sort((a, b) => a.index - b.index).forEach((item) => {
        result += mainStr.slice(prevIdx, item.index)
        result += item.text;
        prevIdx = item.index;
    })

    if(prevIdx < mainStr.length) {
        result += mainStr.slice(prevIdx)
    }

    process.stdout.write(`${result}`);
})
