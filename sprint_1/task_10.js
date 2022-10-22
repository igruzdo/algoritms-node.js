// Основная теорема арифметики говорит: любое число раскладывается на произведение простых множителей единственным образом, 
// с точностью до их перестановки. Например:

// Число 8 можно представить как 2 × 2 × 2.
// Число 50 –— как 2 × 5 × 5 (или 5 × 5 × 2, или 5 × 2 × 5). Три варианта отличаются лишь порядком следования множителей.
// Разложение числа на простые множители называется факторизацией числа.

// Напишите программу, которая производит факторизацию переданного числа.

// Формат ввода
// В единственной строке дано число n (2 ≤ n ≤ 109), которое нужно факторизовать.

// Формат вывода
// Выведите в порядке неубывания простые множители, на которые раскладывается число n.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let number;

rl.on('line', (input) => {
    number = parseInt(input)
});

rl.on('close', () => {
    
    let i = 2;
    let result = [];
    let sqrt = Math.ceil(Math.sqrt(number))

    while (sqrt >= i) {
        if(number % i === 0) {
            result.push(i);
            number = number / i;
            sqrt = Math.ceil(Math.sqrt(number))
            i = 2;
        } else {
            i++
        }
    }
    if(number !== 1) {
        result.push(number);
    }

    process.stdout.write(result.join(' '));
})