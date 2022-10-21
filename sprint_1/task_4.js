// Метеорологическая служба вашего города решила исследовать погоду новым способом.

// Под температурой воздуха в конкретный день будем понимать максимальную температуру в этот день.
// Под хаотичностью погоды за n дней служба понимает количество дней, в которые температура строго больше, 
// чем в день до (если такой существует) и в день после текущего (если такой существует). 
// Например, если за 5 дней максимальная температура воздуха составляла [1, 2, 5, 4, 8] градусов, то 
// хаотичность за этот период равна 2: в 3-й и 5-й дни выполнялись описанные условия.
// Определите по ежедневным показаниям температуры хаотичность погоды за этот период.

// Заметим, что если число показаний n=1, то единственный день будет хаотичным.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
});

let result = 0;
let phase = 0;
let array;

rl.on('line', (input) => {
    if(phase === 1) {
        array = input.split(" ");

        return;
    }
    phase++
});

rl.on('close', () => {
    if([...new Set(array)].length === 1 && array.length > 1) {
        process.stdout.write('0');
        return
    }
    if(array.length === 1)  {
        process.stdout.write('1');
        return
    }
    array.forEach((item, index) => {
        if(index === 0) {
            +item > +(array[index + 1]) ? result++ : null;
        } else if(index === array.length - 1) {
            +item > +(array[index - 1]) ? result++ : null;
        } else {
            (+item > +(array[index + 1])) && (+item > +(array[index - 1])) ? result++ : null;
        }
    })
    process.stdout.write(result.toString());
})