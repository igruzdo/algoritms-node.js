// Тимофей записал два числа в двоичной системе счисления и попросил Гошу вывести их сумму, также в двоичной системе. 
// Встроенную в язык программирования возможность сложения двоичных чисел применять нельзя. Помогите Гоше решить задачу.

// Решение должно работать за O(N), где N –— количество разрядов максимального числа на входе.

// Формат ввода
// Два числа в двоичной системе счисления, каждое на отдельной строке. Длина каждого числа не превосходит 10 000 символов.

// Формат вывода
// Одно число в двоичной системе счисления.


const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});
let summArr = [];
let finalyResult = ''
let memory;

function summ(a, b, memo) {
    console.log(a, b, memo)
    let result;

    if(b && a) {
        switch (a + b) {
            case '10':
            case '01':
                result = '1';
                break;
            case '00':
                result = '0';
                break;
            case '11':
                result = '10';
                break;
        }
    } else if(!b) {
        result = a
    } else {
        result = b
    }

    if(memo) {
        switch (result + memo) {
            case '10':
            case '01':
                result = '1';
                break;
            case '11':
                result = '10';
                break;
            case '101':
                result = '11';
                break;
        }
        memory = null;
    }
    console.log(result)
    return result;
}

rl.on('line', (input) => {
    summArr.push(input)
});

rl.on('close', () => {

    let arr1 = [...summArr[0]].reverse();
    let arr2 = [...summArr[1]].reverse();
    let length = arr1.length > arr2.length ? arr1.length : arr2.length;

    for(let i = 0; i < length; i++) {


        let resultOfSumm = summ(arr1[i] ?? null, arr2[i] ?? null, memory);
        
        if(i !== length - 1) {
            switch(resultOfSumm) {
                case '1':
                    finalyResult += '1';
                    break;
                case '0':
                    finalyResult += '0';
                    break;
                case '10':
                    finalyResult += '0';
                    memory = '1';
                    break;
                case '11':
                    finalyResult += '1';
                    memory = '1';
                    break;
            }
        } else {
            if(resultOfSumm === '10') {
                finalyResult += '01'
            } else if (resultOfSumm === '11') {
                finalyResult += '11'
            } else {
                finalyResult += resultOfSumm
            }
        }

    }

    process.stdout.write([...finalyResult].reverse().join(''));
})
