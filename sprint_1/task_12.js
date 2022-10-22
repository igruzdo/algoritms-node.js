// Васе очень нравятся задачи про строки, поэтому он придумал свою. Есть 2 строки s и t, состоящие 
// только из строчных букв. Строка t получена перемешиванием букв строки s и добавлением 1 буквы в 
// случайную позицию. Нужно найти добавленную букву.

// Формат ввода
// На вход подаются строки s и t, разделённые переносом строки. Длины строк не превосходят 1000 символов. 
// Строки не бывают пустыми.

// Формат вывода
// Выведите лишнюю букву.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let phase = 0;
let str1;
let str2;

rl.on('line', (input) => {
    if(phase === 0) {
        str1 = input;
    } else if (phase === 1) {
        str2 = input;
    }
    phase++
});

rl.on('close', () => {
    let arr1 = [...str1].sort()
    let arr2 = [...str2].sort()
    for(let i = 0; i < arr1.length; i++) {
        for(let j = 0; j < arr2.length; j++) {
            if(arr1[i] === arr2[j]) {
                arr2.splice(j, 1);
                break;
            }
        }
    }
    process.stdout.write(arr2[0]);
})