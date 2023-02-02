/*
Гуляя по одному из островов Алгосского архипелага, Гоша набрёл на пещеру, в которой лежат кучи золотого песка. К счастью, 
у Гоши есть с собой рюкзак грузоподъёмностью до M килограмм, поэтому он может унести с собой какое-то ограниченное количество золота.

Всего золотых куч n штук, и все они разные. В куче под номером i содержится mi килограммов золотого песка, а стоимость 
одного килограмма — ci алгосских франков.

Помогите Гоше наполнить рюкзак так, чтобы общая стоимость золотого песка в пересчёте на алгосские франки была максимальной.

Формат ввода
В первой строке задано целое число M — грузоподъёмность рюкзака Гоши (0 ≤ M ≤ 108).

Во второй строке дано количество куч с золотым песком — целое число n (1 ≤ n ≤ 105).

В каждой из следующих n строк описаны кучи: i-ая куча задаётся двумя целыми числами ci и mi, записанными через пробел 
(1 ≤ ci ≤ 107, 1 ≤ mi ≤ 108).

Формат вывода
Выведите единственное число —– максимальную сумму (в алгосских франках), которую Гоша сможет вынести из пещеры в своём рюкзаке.

Пример 1
Ввод	Вывод
10
3
8 1
2 10
4 5
36
Пример 2
Ввод	Вывод
10000
1
4 20
80
*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let phase = 0;
let numberOfBag;
let numberOfLoot;
let array = [];

rl.on('line', (input) => {
    if(phase === 0) {
        numberOfBag = +input;
    }

    if(phase === 1) {
        numberOfLoot = +input;
    }

    if(phase > 1) {
        array.push(input.split(' ').map(item => +item));
    }

    // if(phase === numberOfLoot + 1) {
    //     rl.emit('close')
    // }
    phase++
});

rl.on('close', () => {
    let result = scheduleTasks(array);
    process.stdout.write(`${result}`);    
})


function scheduleTasks(tasks) {
    
    tasks.sort((a, b) => {
        return b[0] - a[0];
    });

    let res = 0;
    for(let i = 0; i < tasks.length; i++) {
        if(numberOfBag === 0) {
            break;
        }

        if(tasks[i][1] <= numberOfBag) {
            res += tasks[i][0] * tasks[i][1];
            numberOfBag = numberOfBag - tasks[i][1];
        } else {
            res += tasks[i][0] * numberOfBag;
            break;
        }
    }
    return res;
}