/*
Алла не остановилась на достигнутом –— теперь она хочет научиться быстро вычислять хеши произвольных подстрок данной строки. Помогите ей!

На вход поступают запросы на подсчёт хешей разных подстрок. Ответ на каждый запрос должен выполняться за O(1). Допустимо в начале 
работы программы сделать предподсчёт для дальнейшей работы со строкой.

Напомним, что полиномиальный хеш считается по формуле


В данной задаче необходимо использовать в качестве значений отдельных символов их коды в таблице ASCII.

Формат ввода
В первой строке дано число a (1 ≤ a ≤ 1000) –— основание, по которому считается хеш. Во второй строке дано число m (1 ≤ m ≤ 107) –— модуль. 
В третьей строке дана строка s (0 ≤ |s| ≤ 106), состоящая из больших и маленьких латинских букв.

В четвертой строке дано число запросов t –— натуральное число от 1 до 105. В каждой из следующих t строк записаны через пробел два числа l и r 
–— индексы начала и конца очередной подстроки. (1 ≤ l ≤ r ≤ |s|).

Формат вывода
Для каждого запроса выведите на отдельной строке хеш заданной в запросе подстроки.

Пример 1
Ввод	
1000
1000009
abcdefgh
7
1 1
1 5
2 3
3 4
4 4
1 8
5 8
Вывод
97
225076
98099
99100
100
436420
193195
Пример 2
Ввод	
100
10
a
1
1 1
Вывод
7
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});
let phase = 0;
let base;
let mod;
let str;
const dictionaryHash = {};
const dictionaryPow = {};

rl.on('line', (input) => {
    if(phase === 0) {
        base = parseInt(input);
    }
    if(phase === 1) {
        mod = parseInt(input);
    }

    if(phase === 2) {
        str = [...input];
        for(let i = 0; i < str.length; i++) {
            if(i === 0) {
                dictionaryHash[i + 1] = str[0].charCodeAt(0) % mod;
                dictionaryPow[i] = 1;
            }

            if(i >= 1) {
                dictionaryHash[i + 1] = (dictionaryHash[i] * base + str[i].charCodeAt(0)) % mod;
                dictionaryPow[i] = (dictionaryPow[i-1] * base) % mod;
            }
        }

    }
    if(phase > 3) {
        let range = input.split(' ').map(item => parseInt(item));

        if(range[0] === 1) {
            process.stdout.write(`${dictionaryHash[range[1]]}` + '\n');
        } else {
            let result = (dictionaryHash[range[1]] - (dictionaryHash[range[0] - 1] * dictionaryPow[range[1] - range[0] + 1]) % mod + mod) % mod;
            process.stdout.write(`${result}` + '\n');
        }
    }
    phase++
});