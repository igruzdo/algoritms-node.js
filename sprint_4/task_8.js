/*
Жители Алгосского архипелага придумали новый способ сравнения строк. Две строки считаются равными, если 
символы одной из них можно заменить на символы другой так, что первая строка станет точной копией второй строки. 
При этом необходимо соблюдение двух условий:

Порядок вхождения символов должен быть сохранён.
Одинаковым символам первой строки должны соответствовать одинаковые символы второй строки. Разным символам —– разные.
Например, если строка s = «abacaba», то ей будет равна строка t = «xhxixhx», так как все вхождения «a» заменены на «x», 
«b» –— на «h», а «c» –— на «i». Если же первая строка s=«abc», а вторая t=«aaa», то строки уже не будут равны, так как 
разные буквы первой строки соответствуют одинаковым буквам второй.

Формат ввода
В первой строке записана строка s, во второй –— строка t. Длины обеих строк не превосходят 106. Обе строки содержат 
хотя бы по одному символу и состоят только из маленьких латинских букв.

Строки могут быть разной длины.

Формат вывода
Выведите «YES», если строки равны (согласно вышеописанным правилам), и «NO» в ином случае.
*/



const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});
let phase = 0;
let phraseOne;
const mapOne = {};
let phraseTwo;
const mapTwo = {};

rl.on('line', (input) => {
    if(phase === 0) {
        phraseOne = input.split('');
        phraseOne.forEach((letter, idx) => {
            if(mapOne[letter]) {
                mapOne[letter] += idx;
            } else {
                mapOne[letter] = idx;
            }
        })
    }
    if(phase === 1) {
        const arrOne = Object.values(mapOne);
        delete mapOne;
        phraseTwo = input.split('');
        phraseTwo.forEach((letter, idx) => {
            if(mapTwo[letter]) {
                mapTwo[letter] += idx;
            } else {
                mapTwo[letter] = idx;
            }
        })
        const arrTwo = Object.values(mapTwo);
        delete mapTwo;


        if(Object.keys(mapOne).length !== Object.keys(mapTwo).length || phraseOne.length !== phraseTwo.length) {
            process.stdout.write(`NO`);
        } else {
            for(let i = 0; i < arrOne.length; i++) {
                if(arrOne[i] !== arrTwo[i]) {
                    process.stdout.write(`NO`);
                    return;
                }
            }
            process.stdout.write(`YES`);
        }

    }
    phase++
});