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

const greedFactor = new Map();
let minGreed = 1000;
let cookiesNumber;
let result = 0;

let phase = 0;

rl.on('line', (input) => {
    switch (phase) {
        case 0:
            numberOfChildren = parseInt(input);
            break;
        case 1:
            input.split(' ').forEach(item => {
                let parseItem = parseInt(item);
                minGreed = parseItem < minGreed ? parseItem : minGreed;

                let existingCount = greedFactor.get(item);

                if(!existingCount) {
                    greedFactor.set(item, 1);
                } else {
                    greedFactor.set(item, existingCount + 1);
                }
            });
            break;
        case 2:
            cookiesNumber = parseInt(input);
            break;
        case 3:
            const inputCookies = input.split(' ');
            for(let i = 0; i < cookiesNumber; i++) {
                if(greedFactor.size === 0) {
                    break;
                }

                let cookie = parseInt(inputCookies[i]);
                if(cookie >= minGreed) {
                    let diff = 1000;
                    let greedMemo;
                    for(let greed of greedFactor.keys()) {
                        let parseGreed = parseInt(greed);
                        if(parseGreed <= cookie) {
                            if(parseGreed === cookie) {
                                result++;
                                let childrenCount = greedFactor.get(greed);
                                if(childrenCount === 1) {
                                    greedFactor.delete(greed)
                                } else {
                                    greedFactor.set(greed, childrenCount - 1);
                                };
                                diff = 1000;
                                greedMemo = null;
                                break;
                            } else {
                                if((cookie - parseGreed) <  diff) {
                                    diff = cookie - parseGreed;
                                    greedMemo = greed;
                                }
                            }
                        }
                    }
                    if(greedMemo) {
                        result++;
                        let childsCount = greedFactor.get(greedMemo);
                        if(childsCount === 1) {
                            greedFactor.delete(greedMemo)
                        } else {
                            greedFactor.set(greedMemo, childsCount - 1);
                        }
                        
                    }
                }
            }
            break;
    };
    phase++
});

rl.on('close', () => {
    process.stdout.write(`${result}`);
})