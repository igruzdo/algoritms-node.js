/*
К Васе в гости пришли одноклассники. Его мама решила угостить ребят печеньем.

Но не всё так просто. Печенья могут быть разного размера. А у каждого ребёнка есть фактор жадности —– минимальный размер печенья, которое он возьмёт. Нужно выяснить, сколько ребят останутся довольными в лучшем случае, когда они действуют оптимально.

Каждый ребёнок может взять не больше одного печенья.

Формат ввода
В первой строке записано n —– количество детей.

Во второй —– n чисел, разделённых пробелом, каждое из которых –— фактор жадности ребёнка. Это натуральные числа, не превосходящие 1000.

В следующей строке записано число m –— количество печенек.

Далее —– m натуральных чисел, разделённых пробелом —– размеры печенек. Размеры печенек не превосходят 1000.

Оба числа n и m не превосходят 10000.

Формат вывода
Нужно вывести одно число –— количество детей, которые останутся довольными

Пример 1
Ввод	
2
1 2
3
2 1 3
Вывод
2

Пример 2
Ввод	
3
2 1 3
2
1 1
Вывод
1
*/

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
});

let greedFactor;
let cookiesNumber;
let result = 0;
let phase = 0;
rl.on('line', (input) => {
    switch (phase) {
        case 1:
            greedFactor = input.split(' ').sort((a, b) => b - a);
            break;
        case 2:
            cookiesNumber = Number(input);
            break;
        case 3:
            const inputCookies = input.split(' ').sort((a, b) => b - a)


            for(let i = 0; i < cookiesNumber; i++) {
                if(inputCookies[inputCookies.length - 1] - greedFactor[greedFactor.length - 1] >= 0) {
                    result++
                    inputCookies.pop();
                    greedFactor.pop()
                } else {
                    inputCookies.pop();
                }
                if(greedFactor.length === 0) break;
            }
            process.stdout.write(`${result}`);
            break;
    };
    phase++
});