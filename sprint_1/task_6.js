// Помогите Васе понять, будет ли фраза палиндромом‎. Учитываются только буквы и цифры, заглавные и строчные 
// буквы считаются одинаковыми.

// Решение должно работать за O(N), где N — длина строки на входе.

// Формат ввода
// В единственной строке записана фраза или слово. Буквы могут быть только латинские. Длина текста не превосходит 20000 символов.

// Фраза может состоять из строчных и прописных латинских букв, цифр, знаков препинания.

// Формат вывода
// Выведите «True», если фраза является палиндромом, и «False», если не является.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let array;
let reverseArray;

rl.on('line', (input) => {
    array = input.match(/[a-zA-Z]/g);
    reverseArray = [...array].reverse();
});

rl.on('close', () => {
    for(let i = 0; i < array.length; i++) {
        if(array[i].toLowerCase() !== reverseArray[i].toLowerCase()) {
            process.stdout.write('False');
            return;
        }
    }
    process.stdout.write('True');
})
