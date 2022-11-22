/*
Алла захотела, чтобы у неё под окном были узкие клумбы с тюльпанам. 
На схеме земельного участка клумбы обозначаются просто горизонтальными 
отрезками, лежащими на одной прямой. Для ландшафтных работ было нанято n садовников. 
Каждый из них обрабатывал какой-то отрезок на схеме. Процесс был организован не очень 
хорошо, иногда один и тот же отрезок или его часть могли быть обработаны сразу несколькими 
садовниками. Таким образом, отрезки, обрабатываемые двумя разными садовниками, сливаются в один. 
Непрерывный обработанный отрезок затем станет клумбой. Нужно определить границы будущих клумб.
Рассмотрим примеры.

Формат вывода
Нужно вывести координаты каждой из получившихся клумб в отдельных строках. Данные должны 
выводится в отсортированном порядке —– сначала клумбы с меньшими координатами, затем —– с бОльшими.
Пример 1
Ввод
4
7 8
7 8
2 3
6 10
Вывод
2 3
6 10
Пример 2
Ввод	
4
2 3
5 6
3 4
3 4
Вывод
2 4
5 6
Пример 3
Ввод	
6
1 3
3 5
4 6
5 6
2 4
7 10
Вывод
1 6
7 10

*/

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});
let phase = 0;

let start = [];
let numberOfClumbs = 0;
let end = [];
let result = []

rl.on('line', (input) => {
    if(phase === 0) {
        numberOfClumbs = parseInt(input);
    }
    if(phase > 0 && phase <= numberOfClumbs) {
        let str = input.split(' ').map(item => parseInt(item));
        start.push(str[0]);
        end.push(str[1]);
    } 
   
    phase++
});


rl.on('close', () => {
    let counter = 0;
    start.sort((a, b) => b - a);
    end.sort((a, b) => b - a);
    let startCord;
    let endCord;
    while((start.length + end.length) > 0) {
        if(start[start.length - 1] < end[end.length - 1] && start.length > 0) {
            counter++
            let startPop = start.pop();
            if(startCord === null || startCord === undefined) {
                startCord = startPop;
            }
        } else if(start[start.length - 1] > end[end.length - 1] || start.length === 0) {
            counter--
            endCord = end.pop();
        } else {
            start.pop();
            end.pop();
        }

        if (counter === 0) {
            result.push([startCord, endCord]);
            startCord = null;
            endCord = null;
        }
    }
    result.forEach(item => {
        process.stdout.write(`${item.join(' ')}` + '\n');
    })

})