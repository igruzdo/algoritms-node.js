/*
Гоша долго путешествовал и измерил площадь каждого из n островов Алгосов, но ему этого мало! Теперь он захотел оценить, 
насколько разнообразными являются острова в составе архипелага.

Для этого Гоша рассмотрел все пары островов (таких пар, напомним, n * (n-1) / 2) и посчитал попарно разницу площадей 
между всеми островами. Теперь он собирается упорядочить полученные разницы, чтобы взять k-ую по порядку из них.

Помоги Гоше найти k-ю минимальную разницу между площадями эффективно.

Пояснения к примерам

Пример 1

Выпишем все пары площадей и найдём соответствующие разницы

|2 - 3| = 1
|3 - 4| = 1
|2 - 4| = 2
Так как нам нужна 2-я по величине разница, то ответ будет 1.

Пример 2

У нас есть два одинаковых элемента в массиве —– две единицы, поэтому минимальная (первая) разница равна нулю.

Формат ввода
В первой строке записано натуральное число n –— количество островов в архипелаге (2 ≤ n ≤ 100 000).

В следующей строке через пробел записаны n площадей островов — n натуральных чисел, каждое из которых не превосходит 1 000 000.

В последней строке задано число k. Оно находится в диапазоне от 1 до n(n - 1) / 2.

Формат вывода
Выведите одно число –— k-ую минимальную разницу.

Пример 1
Ввод
3
2 3 4
2
Вывод
1
Пример 2
Ввод	
3
1 3 1
1
Вывод
0
Пример 3
Ввод
3
1 3 5
3
Вывод
4
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});
let phase = 0;

let ilends;
let additionalIlends = [];
let fastResult = [];
let addLength
let quantityOnDiff;
let result;
let maximum;

rl.on('line', (input) => {
    if(phase === 1) {
        ilends = input.split(' ').sort((a, b) => a - b);
    }
    if(phase === 2) {
        quantityOnDiff = parseInt(input);

        if(quantityOnDiff <= 100) {
            while(ilends.length > 0) {
                let ilend = ilends.pop();
                for(let j = 0; j < ilends.length; j++) {
                    fastResult.push(`${Math.abs(ilend - ilends[j])}`)
                }
            }

            fastResult.sort((a, b) => a - b);
            process.stdout.write(`${fastResult[quantityOnDiff - 1]}`);
            return;
        }
        
        let counter = 0;
        for(let i = 1; i < ilends.length; i++) {
            for(let j = 0; j < ilends.length; j++) {
                if(i + j === ilends.length) break;
                if(counter < quantityOnDiff) {
                    let temp = Math.abs(ilends[j] - ilends[j + i]);
                    if(maximum === undefined) {
                        maximum = temp;
                    } else {
                        maximum = maximum < temp ? temp : maximum;
                    }
                }
                if(counter >= quantityOnDiff) {
                    let temp = Math.abs(ilends[j] - ilends[j + i]);
                    if(maximum > temp) {
                        additionalIlends.push(temp)
                    }
                }
                counter++
                if(counter > quantityOnDiff * 3) break;
            }
            if(counter > quantityOnDiff * 3) break;
        }

        additionalIlends.push(maximum)
        additionalIlends.sort((a, b) => a - b);
        addLength = additionalIlends.length;
        counter = 0;

        for(let i = 1; i < ilends.length; i++) {
            for(let j = 0; j < ilends.length; j++) {
                if(i + j === ilends.length) break;
                counter++
                if(counter < quantityOnDiff) {
                    let temp = Math.abs(ilends[j] - ilends[j + i]);
                    if(additionalIlends[0] < temp) {
                        additionalIlends.push(temp)
                    }
                }
                if(counter >= quantityOnDiff) break;
            }
            if(counter > quantityOnDiff) break;
        }

        additionalIlends.sort((a, b) => a - b);
        if((additionalIlends.length - addLength - 1) > 0) {
            result = additionalIlends[additionalIlends.length - addLength];
        } else {
            result = maximum;
        }
        process.stdout.write(`${result}`);
    }
   
    phase++
});