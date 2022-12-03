/*
Гоша написал программу, которая сравнивает строки исключительно по их хешам. Если хеш равен, то и строки равны. 
Тимофей увидел это безобразие и поручил вам сломать программу Гоши, чтобы остальным неповадно было.

В этой задаче вам надо будет лишь найти две различные строки, которые для заданной хеш-функции будут давать одинаковое значение.

Гоша использует следующую хеш-функцию:


для a = 1000 и m = 123 987 123.
В данной задаче необходимо использовать в качестве значений отдельных символов их коды в таблице ASCII.

Формат ввода
В задаче единственный тест без ввода

Формат вывода
Отправьте две строки, по одной в строке. Строки могут состоять только из маленьких латинских букв и не должны превышать в длину 1000 
знаков каждая. Код отправлять не требуется. Строки из примера использовать нельзя.

Пример вывода:

ezhgeljkablzwnvuwqvp

gbpdcvkumyfxillgnqrv

*/

const map = {}

function getHash(input) {
    let str = [...input];

        if(str.length === 2) {
            summ = str[0].charCodeAt(0) * 1000 + str[1].charCodeAt(0);
            return summ % 123987123;
        }

        if(str.length === 1) {
            return str[0].charCodeAt(0) % 123987123;
        }

        summ = str[0].charCodeAt(0) * 1000 + str[1].charCodeAt(0);

        for(let i = 2; i < str.length; i++) {
            summ = (summ % 123987123) * 1000 + str[i].charCodeAt(0);
        }

        return summ % 123987123;
}

let start = 'a';
let alfabet = 'abcdefghijklmnopqrstuvwxyz';

function getAllStrings(steps, prefix) {

    if(steps === 0) {
        let hash = getHash(prefix);
        if(map[hash]) {
            console.log('dic', map[hash]);
            console.log('prefix', prefix);
            return;
        } else {
            map[hash] = prefix;
        }
    } else {
        for(let i = 0; i < alfabet.length; i++) {
            getAllStrings(steps - 1, prefix + alfabet[i]);
        }
    }
}

// for(let i = 900; i <= 1000; i++) {
//     getAllStrings(i, '');
// }

getAllStrings(10, '');
