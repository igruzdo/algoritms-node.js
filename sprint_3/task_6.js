/*
Перед сном Рита решила поиграть в игру на телефоне. Дан массив целых чисел, в котором каждый элемент 
обозначает длину стороны треугольника. Нужно определить максимально возможный периметр треугольника, 
составленного из сторон с длинами из заданного массива. Помогите Рите скорее закончить игру и пойти спать.

Напомним, что из трёх отрезков с длинами a ≤ b ≤ c можно составить треугольник, если выполнено неравенство 
треугольника: c < a + b

Разберём пример:
даны длины сторон 6, 3, 3, 2. Попробуем в качестве наибольшей стороны выбрать 6. Неравенство треугольника 
не может выполниться, так как остались 3, 3, 2 —– максимальная сумма из них равна 6.

Без шестёрки оставшиеся три отрезка уже образуют треугольник со сторонами 3, 3, 2. Неравенство выполняется: 
3 < 3 + 2. Периметр равен 3 + 3 + 2 = 8.
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});
let phase = 0;
let length = 0;
let sidesArr;
let result;

rl.on('line', (input) => {
    if(phase === 0) {
        length = parseInt(input);
    }
    if(phase === 1) {
        sidesArr = input.split(' ').sort((a, b) => b - a);
        // console.log(sidesArr);

        for(let i = 0; i < length; i++) {
            let max = parseInt(sidesArr[i])
            let middle = parseInt(sidesArr[i + 1]);
            let min = parseInt(sidesArr[i + 2]);
            if(max < middle + min) {
                result = max + min + middle;
                break;
            }
        }

        // console.log(result)
    }
    phase++
});


rl.on('close', () => {
    process.stdout.write(`${result}`);
})